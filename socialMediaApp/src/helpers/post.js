import axios from "axios";

const Post = axios.create({
  baseURL: "https://blog-api-t6u0.onrender.com/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout:5000,
});

// async function getPosts() {
//   try {
//     const response = await Post.get("/posts");
//     return { result: true, data: response.data };
//   }
//   catch (error) {
//     console.error("Error fetching posts:", error);
//     return { result: false, error };
//   }
// }

// console.log(await getPosts());
export default Post;

