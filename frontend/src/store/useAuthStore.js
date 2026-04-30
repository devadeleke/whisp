import { create } from 'zustand';
import toast from 'react-hot-toast';

import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check-auth");
            set({ authUser: res.data})
        } catch (error) {
            console.log("Error in Authcheck", error)
            set({ authUser: null})
        } finally {
            set({isCheckingAuth: false})
        }
    }, 

    signup: async (data) => {
        set({isSigningUp: true})
        try {
            const res = await axiosInstance.post("/auth/signup", data)
            set({authUser: res.data})

            //notification
            toast.success("Signup successful! Welcome to Whisp.")
        } catch (error) {
            console.log("Error in signup", error)
            const message = error?.response?.data?.message || "Signup failed. Please try again."
            toast.error(message)
        } finally {
            set({isSigningUp: false})
        }
    },

    login: async (data) => {
        set({isLoggingIn: false})
        try {
            const res = await axiosInstance.post("/auth/login", data)
            set({authUser: res.data})
        } catch (error) {
            console.log("Error in signup", error)
            const message = error?.response?.data?.message || "Login failed. Please try again."
            toast.error(message)
        } finally {
            set({isLoggingIn: false})
        }
    },

    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout")
            set({ authUser: null})
            toast.success("Logged out successfully")
        } catch (error) {
            toast.error("Error logging out")
            console.log("Error Logging out", error)
        }
    }
}))