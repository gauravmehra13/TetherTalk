import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";
import { useAuthStore } from "./useAuthStore";

export const useChatStore = create((set, get) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/messages/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  subscribeToMessages: () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;

    socket.on("newMessage", (newMessage) => {
      const isMessageSentFromSelectedUser = newMessage.senderId === selectedUser._id;
      if (!isMessageSentFromSelectedUser) return;

      set({
        messages: [...get().messages, newMessage],
      });
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off("newMessage");
    socket.off("messageDeleted");
    socket.off("conversationDeleted");
  },

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  deleteMessage: async (messageId) => {
    try {
      await axiosInstance.delete(`/messages/message/${messageId}`);
      set({ messages: get().messages.filter((message) => message._id !== messageId) });
      toast.success("Message deleted successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  deleteConversation: async () => {
    const { selectedUser } = get();
    if (!selectedUser) return;

    try {
      await axiosInstance.delete(`/messages/conversation/${selectedUser._id}`);
      set({ messages: [], selectedUser: null });
      toast.success("Conversation deleted successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  handleSocketEvents: () => {
    const socket = useAuthStore.getState().socket;
    const { selectedUser } = get();

    socket.on("messageDeleted", (messageId) => {
      set({ messages: get().messages.filter((message) => message._id !== messageId) });
    });

    socket.on("conversationDeleted", (deletedByUserId) => {
      if (selectedUser && selectedUser._id === deletedByUserId) {
        set({ messages: [], selectedUser: null });
        toast.info("This conversation was deleted by the other user");
      }
    });
  },
}));
