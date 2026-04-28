const ENDPOINTS = {
  POST: {
    INDEX: "/posts",
    DETAIL: (id) => `/posts/${id}`,
  },
};
export default ENDPOINTS;
