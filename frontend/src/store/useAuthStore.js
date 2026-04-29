import { create } from 'zustand';

export const useAuthStore = create((set) => ({
    authUser: null,
    isCheckingAuth: true,
    isLoggedIn: false,
    isLoading: false,

    login: () => {
        console.log("We just logged in")
    },
}))