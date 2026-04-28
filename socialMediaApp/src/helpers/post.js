import axios from "axios";

const Post = axios.create({
  baseURL: "https://blog-api-t6u0.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout:5000,
});

export default Post;

