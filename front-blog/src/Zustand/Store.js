import { create } from "zustand";
import axios from "axios";

const useStore = create((set) => ({
  posts: [],
  filter: '',
  search: '',
  results: [],
  statusResponse: '',

  setStatusResponse: (status) => set({ statusResponse: status }),
  setPosts: (newPosts) => set({ posts: newPosts }),

  getAllPosts: async () => {
    try {
      const response = await axios.get(`http://localhost:3000/posts`);
      // console.log(response.data);
      set({ posts: response.data });

    } catch (error) {
      console.error(`Error al obtener los posts ${error}`);
    }

  },

  getPostById: async (postId) => {
    try {
      const response = await axios.get(`http://localhost:3000/posts/${postId}`);
      // const postById = await response.json();
      return response.data;
    } catch (error) {
      console.error('Error finding this post:', error);
    }
  },

  createNewPost: async (newPost) => {
    try {
      const response = await axios.post('http://localhost:3000/posts', newPost, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const createdPost = response.data;
      set((state) => ({ posts: [...state.posts, createdPost] }));
      console.log(response.statusText, ' <=== statusText')
      set({ statusResponse: response.statusText });
    } catch (error) {
      console.error('Error creating new post:', error);
    }
  },
  updatePost: async (postId, postToUpdate) => {
    // console.log(postId, ' <=== postId')
    try {
      const response = await axios.put(`http://localhost:3000/posts/${postId}`, postToUpdate, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const updatedPost = await response.data;
      set((state) => ({
        posts: state.posts.map((post) => {
          if (post.id === postId) {
            return updatedPost;
          }
          return post;
        }),
      }));

      set({ statusResponse: response.statusText });        
      console.log(response.statusText, ' <=== statusText')
      
    } catch (error) {
      console.error('Error updating post:', error);
    }
  },

  deletePost: async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`);
      set((state) => ({
        posts: state.posts.filter((post) => post.id !== postId),
      }));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  },

  setFilter: (filter) => set({ filter }),
  setSearch: (search) => set({ search }),
  setResults: (results) => set({ results }),

  filterPostsByTitle: async (searchTitle) => {
    try {
      if (searchTitle === '') {
        set({ posts: [] });
        return;
      }
      const response = await fetch(`http://localhost:3000/filters/byTitle?title=${searchTitle}`);
      const filteredPosts = await response.json();
      set({ posts: filteredPosts });
    } catch (error) {
      console.error('Error filtering posts by title:', error);
    }
  },

  filterPostsByAuthor: async (searchTitle) => {
    try {
      if (searchTitle === '') {
        set({ posts: [] });
        return;
      }
      const response = await fetch(`http://localhost:3000/filters/byAuthor?author=${searchTitle}`);
      const filteredPosts = await response.json();
      set({ posts: filteredPosts });
    } catch (error) {
      console.error('Error filtering posts by author:', error);
    }
  },
  filterPostsByContent: async (searchTitle) => {
    try {
      if (searchTitle === '') {
        set({ posts: [] });
        return;
      }
      const response = await fetch(`http://localhost:3000/filters/byContent?content=${searchTitle}`);
      const filteredPosts = await response.json();
      set({ posts: filteredPosts });
    } catch (error) {
      console.error('Error filtering posts by content:', error);
    }
  },
}));


export default useStore;
