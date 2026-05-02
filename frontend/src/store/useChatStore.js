import { create } from 'zustand';
import toast from 'react-hot-toast';

import {axiosInstance} from '../lib/axios'

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled") === true),

    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled)
        set({isSoundEnabled: !get().isSoundEnabled})
    },

    setActiveTab: (tab) => set({activeTab: tab}),
    setSelectedUser: (user) => set({selectedUser: user}),

    getAllContacts: async () => {
        set({isUsersLoading: true})
        try {
            const res = await axiosInstance.get("/messages/contacts")
            set({allContacts: res.data})
        } catch (error) {
            console.log("Error in getting contacts", error)
            const message = error?.response?.data?.message || "Signup failed. Please try again."
            toast.error(message)
            set({allContacts: []})
        } finally {
            set({isUsersLoading: false})
        }
    },

    getMyChatPartners: async () => {
        set({isUsersLoading: true})
        try {
            const res = axiosInstance.get("/messages/chats");
            set({chats: res.data})
        } catch (error) {
            console.log("Error in getting contacts", error)
            const message = error?.response?.data?.message || "Signup failed. Please try again."
            toast.error(message)
            set({allContacts: []})
        } finally {
            set({isUsersLoading: false})
        }
    }
}))