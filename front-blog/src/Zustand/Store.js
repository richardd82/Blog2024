import { create } from "zustand";
// import { devtools } from 'zustand/middleware';
import axios from "axios";

const useStore = create((set) => ({
  posts: [],

  setPosts: (newPosts) => set({ posts: newPosts }),

  getAllPosts: async () => {
    try {
      const response = await axios.get(`http://localhost:3000/allPosts`);
      // console.log(response.data);
      set({ posts: response.data });

    } catch (error) {
      console.error(`Error al obtener los posts ${error}`);
    }

  },

  getPostById: async (postId) => {
    try {
      const response = await axios.get(`http://localhost:3000/post/${postId}`);
      // const postById = await response.json();
      return response.data;
    } catch (error) {
      console.error('Error finding this post:', error);
    }
  },

  createNewPost: async (newPost) => {
    try {
      const response = await axios.post('http://localhost:3000/newPost', newPost, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const createdPost = response.data;
      set((state) => ({ posts: [...state.posts, createdPost] }));
    } catch (error) {
      console.error('Error creating new post:', error);
    }
  },
  // updatePost: async (postId, updatedPost) => {
  //   try {
  //     const response = await axios.put(`/updatePost/${postId}`, updatedPost, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //     });
  //     const updatedPost = response.data;
  //     set((state) => ({
  //       posts: state.posts.map((post) => {
  //         if (post.id === postId) {
  //           return updatedPost;
  //         }
  //         return post;
  //       }),
  //     }));
  //   } catch (error) {
  //     console.error('Error updating post:', error);
  //   }
  // },

  filterPostsByTitle: async (searchTitle) => {
    try {
      const response = await fetch(`http://localhost:3000/filters/byTitle?title=${searchTitle}`);
      const filteredPosts = await response.json();
      set({ posts: filteredPosts });
    } catch (error) {
      console.error('Error filtering posts by title:', error);
    }
  },

  filterPostsByAuthor: async (searchTitle) => {
    try {
      const response = await fetch(`http://localhost:3000/filters/byAuthor?author=${searchTitle}`);
      const filteredPosts = await response.json();
      set({ posts: filteredPosts });
    } catch (error) {
      console.error('Error filtering posts by author:', error);
    }
  },
  filterPostsByContent: async (searchTitle) => {
    try {
      const response = await fetch(`http://localhost:3000/filters/byContent?content=${searchTitle}`);
      const filteredPosts = await response.json();
      set({ posts: filteredPosts });
    } catch (error) {
      console.error('Error filtering posts by content:', error);
    }
  },
}));


export default useStore;
