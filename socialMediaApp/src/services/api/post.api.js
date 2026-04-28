import { successHandler, errorHandler } from "../handler";
import ENDPOINTS from "../endpoint";
import Post from "../../helpers/post";

export const getPosts = async (params) => {
  try {
    const response = await Post({
      method: "get",
      url: ENDPOINTS.POST.INDEX,
      params,
    });

    return successHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
};

export const getPostById = async (id) => {
  try {
    const response = await Post({
      method: "get",
      url: ENDPOINTS.POST.DETAIL(id),
    });
    return successHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
  
}

export const createPost = async (data) => {
  try {
    const response = await Post({
      method: "post",
      url: ENDPOINTS.POST.INDEX,
      data,
    });

    return successHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
};

export const updatePostById = async (id, data) => {
  try {
    const response = await Post({
      method: "put",
      url: ENDPOINTS.POST.DETAIL(id),
      data,
    });

    return successHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
};

export const patchPostById = async (id, data) => {
  try {
    const response = await Post({
      method: "patch",
      url: ENDPOINTS.POST.DETAIL(id),
      data,
    });

    return successHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
};

export const deletePostById = async (id) => {
  try {
    const response = await Post({
      method: "delete",
      url: ENDPOINTS.POST.DETAIL(id),
    });

    return successHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
};

export const deleteAllPosts = async () => {
  try {
    const response = await Post({
      method: "delete",
      url: ENDPOINTS.POST.INDEX,

    });
    return successHandler(response);
  } catch (error) {
    return errorHandler(error);
  }
};
