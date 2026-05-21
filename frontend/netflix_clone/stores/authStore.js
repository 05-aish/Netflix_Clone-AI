import { create } from 'zustand';
import axios from "axios";

axios.defaults.withCredentials = true;

export const useAuthStore = create((set) => ({
    //initial state
    user: null,
    loading: false,
    error: null,
    message: null,
    isFetching: true,

    //setters
    signUp: async (username, email, password) => {set({
        loading: true,
        message: null
    })
    try {
        const response = await axios.post('http://localhost:3001/api/signup', {
            username, email, password
        }) 

        //user is userDoc
        set({
            user: response.data.user, 
            loading: false
        })
    } catch (error) {
        
        set({
            loading: false,
            error: error.response.data.message || 'Error Signing Up.'
        })

        throw error;
    }

    },

    login: async(username, password) => {set({
        loading: true,
        message: null,
        error: null
    })
    try {
        const response = await axios.post("http://localhost:3001/api/login", {
            username,
            password,
        })
        
        const { user, message } = response.data;
        set({
            user,
            message,
            loading: false
        });

        return { user, message };

    } catch (error) {
        set({
            loading: false,
            error: error.response.data.message || 'Error Logging in.'
        })

        throw error;
    }
    },

    fetchUser: async () => {
        set({
            isFetching: true,
            error: null
        })

        try {
            const response = await axios.get("http://localhost:3001/api/fetch");

            set({
                user: response.data.user,
                isFetching: false 
            })
        } catch (error) {
            set({
                isFetching: false,
                error: error.response?.data?.message || 'Error fetching user.'
            })
            throw error;
        }
    },

    logout: async () => {
        set({
            loading: true,
            error: null,
            message: null
        })

        try {
          const response = await axios.post("http://localhost:3001/api/logout");
          const {message} = response.data;

          set({
            message,
            loading: false,
            user: null,
            error: null
          })

          return { message };

        } catch (error) {
             set({
            loading: false,
            error: error.response?.data?.message || 'Error Logging out.'
             })

            throw error;
        }
    }
}))
