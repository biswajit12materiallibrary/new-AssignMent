import axios from "axios";

const POST = async (URL: string, data = {}, options?: any) => {
  try {
    const response = await axios.post(URL, data, options);
    return response;
  } catch (error) {
    return error.response;
  }
};

const GET = async (URL: string, options?: any) => {
  try {
    const response = await axios.get(URL, options);
    return response;
  } catch (error) {
    return error.response;
  }
};

const PATCH = async (URL: string, data: any, options?: any) => {
  try {
    const response = await axios.patch(URL, data, options);
    return response;
  } catch (error) {
    return error.response;
  }
};

const PUT = async (URL: string, data: any, options?: any) => {
  try {
    const response = await axios.put(URL, data, options);
    return response;
  } catch (error) {
    return error.response;
  }
};

const DELETE = async (URL: string, options?: any) => {
  try {
    const response = await axios.delete(URL, options);
    return response;
  } catch (error) {
    return error.response;
  }
};

export { POST, PUT, GET, PATCH, DELETE };
