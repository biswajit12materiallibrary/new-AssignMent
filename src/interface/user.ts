import exp from "constants";

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
  role?: "user" | "admin"; // Optional, defaults to 'user'
}

export interface loginUserRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: "user" | "admin"; // Optional
}

export interface CustomRequest extends Request {
  userId?: string; // User ID might be optional depending on your logic
  skip?: number; // Skip for pagination
  limit?: number; // Limit for pagination
  search?: string; // Search term
  sort?: object; // Sorting criteria
  filter?: any[]; // Filter criteria
}

export function setDefaultValues(req: CustomRequest): Required<CustomRequest> {
  return {
    ...req, // Spread the existing properties of req
    userId: req.userId ?? "", // Default to empty string if undefined
    skip: req.skip ?? 0, // Default to 0 if undefined
    limit: req.limit ?? 10, // Default to 10 if undefined
    search: req.search ?? "", // Default to empty string if undefined
    sort: req.sort ?? { _id: -1 }, // Default to sorting by `_id` descending
    filter: req.filter ?? [], // Default to an empty object if undefined
  };
}
export interface MyUserRequest extends Request {
  user?: any;
  files?: any;
}

export interface updateUserI extends Request {
  name?: string; // Add name
  email?: string; // Add email
  role: string; // Add role
  userId: string;
}

export interface deleteUserI extends Request {
  userId?: string;
}
