import {
  CreateUserRequest,
  CustomRequest,
  deleteUserI,
  loginUserRequest,
  setDefaultValues,
  updateUserI,
} from "../interface/user";
import UserSchema from "../model/userModel";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/jsonToken";
import mongoose, { ObjectId } from "mongoose"; // Correct import

export const createUser = async (req: CreateUserRequest) => {
  try {
    const { name, email, role, password } = req;

    const existingUser = await UserSchema.findOne({ email });
    if (existingUser) {
      throw new Error("Email already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = await UserSchema.create({
      name: name,
      password: hashedPassword,
      role: role || "user",
      email: email,
    });

    if (!createUser) {
      throw new Error("Signup failed");
    }
    return {
      success: true,
      data: {},
      message: "Sign Up Successfully",
      statusCode: 200,
    };
  } catch (err) {
    return {
      success: false,
      data: {},
      message: err.message,
      statusCode: 404,
    };
  }
};
export const login = async (req: loginUserRequest) => {
  try {
    const { email, password } = req;

    const existingUser = await UserSchema.findOne({ email, isDeleted: false });
    if (!existingUser) {
      throw new Error("Email does not exists");
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      throw new Error("Invalid Password");
    }
    let payload = {
      userId: existingUser._id,
      email: existingUser.email,
      name: existingUser.name,
      role: existingUser.role,
      isLogin: true,
    };
    return {
      success: true,
      data: {
        email: existingUser.email,
        name: existingUser.name,
        token: generateToken(payload),
        isLogin: true,
      },
      message: "Login Successfully",
      statusCode: 200,
    };
  } catch (err) {
    return {
      success: false,
      data: {},
      message: err.message,
      statusCode: 404,
    };
  }
};

export const getProfileById = async (req: CustomRequest) => {
  try {
    const { userId } = req;

    const existingUser = await UserSchema.findOne(
      {
        _id: userId,
        isDeleted: false,
      },
      { role: 0, password: 0 }
    );
    if (!existingUser) {
      throw new Error("User not found");
    }

    return {
      success: true,
      data: existingUser,
      message: "Profile get Successfully",
      statusCode: 200,
    };
  } catch (err) {
    return {
      success: false,
      data: {},
      message: err.message,
      statusCode: 404,
    };
  }
};

export const getAlluser = async (req: CustomRequest) => {
  try {
    const { userId, skip, limit, search, sort } = setDefaultValues(req);
    let strictQuery: any = {
      isDeleted: false,
      role: { $ne: "admin" },
    };

    if (userId && mongoose.isValidObjectId(userId)) {
      strictQuery._id = new mongoose.Types.ObjectId(userId);
    }
    if (search) {
      strictQuery.$or = [
        {
          name: {
            $regex: new RegExp(`^${search}`, "i"),
          },
          email: {
            $regex: new RegExp(`^${search}`, "i"),
          },
        },
      ];
    }

    const existingUser = await UserSchema.aggregate([
      {
        $match: strictQuery,
      },
      {
        $sort: {
          ...sort,
        },
      },
      {
        $facet: {
          metadata: [
            { $count: "total" },
            {
              $addFields: {
                total_page: { $ceil: { $divide: ["$total", limit] } },
              },
            },
          ],
          data: [
            { $skip: skip },
            { $limit: limit },
            {
              $project: {
                password: 0,
              },
            },
          ],
        },
      },
    ]);

    if (!existingUser?.[0].data?.length) {
      throw new Error("User not found");
    }

    return {
      success: true,
      data: existingUser,
      message: "Profile get Successfully",
      statusCode: 200,
    };
  } catch (err) {
    return {
      success: false,
      data: {},
      message: err.message,
      statusCode: 404,
    };
  }
};

export const updateUser = async (req: updateUserI) => {
  try {
    const { name, email, role, userId } = req;

    const userQuery = await UserSchema.findOne({
      $or: [
        {
          _id: userId,
          isDeleted: false,
        },
        {
          email: email,
          _id: { $ne: userId },
        },
      ],
    });

    // Check if a user was found
    if (!userQuery) {
      throw new Error("User Not Found");
    }

    // Check if the email belongs to a different user
    if (userQuery?.email === email) {
      throw new Error("This email already exists");
    }
    const updateData: { [key: string]: string } = {};

    // Conditionally add properties to the object
    if (name) {
      updateData.name = name;
    }

    if (email) {
      updateData.email = email;
    }

    if (["admin", "user"].includes(role?.toLowerCase())) {
      updateData.role = role;
    }
    const upadateData = await UserSchema.findOneAndUpdate(
      { _id: userId, isDeleted: false },
      updateData,
      { new: true }
    );

    return {
      success: true,
      data: {},
      message: "Updated Successfully",
      statusCode: 200,
    };
  } catch (err) {
    return {
      success: false,
      data: {},
      message: err.message,
      statusCode: 404,
    };
  }
};

export const deleteUser = async (req: deleteUserI) => {
  try {
    const { userId } = req;

    const data = await UserSchema.findOneAndUpdate(
      { _id: userId },
      { isDeleted: true }
    );
    if (!data) {
      throw new Error("User Not Found");
    }
    return {
      success: true,
      data: {},
      message: "Deleted  Successfully",
      statusCode: 200,
    };
  } catch (err) {
    return {
      success: false,
      data: {},
      message: err.message,
      statusCode: 404,
    };
  }
};
