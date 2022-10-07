import create from 'zustand';
import authApi from '../lib/fetch';
import { setError } from '../utils/error';
import { ChatData } from '../utils/interfaces/chat.interface';
import { customToast } from '../utils/toast';

interface ChatStore {
  chats: ChatData[];
  loading: boolean;
  error?: string;
  refetch: boolean;
  selectedChat?: ChatData;
  startChat: (userId: string) => void;
  getMyChat: () => void;
  setSelectedChat: (chat?: ChatData) => void;
  createGroupChat: (group?: { name: string; users: string }) => void;
  renameGroupChat: (chat: { chatName: string; _id: string }) => void;
  addUserToGroup: (chat: { userId: string; _id: string }) => void;
  removeUserFromGroup: (chatObj: { userId: string; chatId: string }) => void;
  setRefresh: () => void;
}

const useChatStore = create<ChatStore>((set) => ({
  chats: [],
  notification: [],
  refetch: false,
  selectedChat: undefined,
  loading: false,
  error: undefined,
  setRefresh: () => {
    set((state) => ({ refetch: !state.refetch }));
  },
  setSelectedChat: (chat) => {
    set({ selectedChat: chat });
  },
  startChat: async (userId) => {
    try {
      set({ loading: true });
      const { data } = await authApi.post('/chat', { userId });
      set((state) => {
        if (state.chats.find((c) => c._id === data._id)) {
          return {
            chats: [data, ...state.chats],
            loading: false,
            refetch: !state.refetch,
          };
        } else {
          return {
            selectedChat: data,
            loading: false,
            refetch: !state.refetch,
          };
        }
      });
    } catch (error: any) {
      const message = setError(error);
      set({ loading: false, error: message });
      customToast('error', message);
    }
  },
  getMyChat: async () => {
    try {
      set({ loading: true });
      const { data } = await authApi.get('/chat');
      set({ loading: false, chats: data });
    } catch (error: any) {
      const errorMessage = setError(error);
      set({ loading: false, error: errorMessage });
      customToast('error', errorMessage);
    }
  },
  createGroupChat: async (group) => {
    try {
      set({ loading: true });
      const res = await authApi.post('/chat/group', group);
      if (res.data) {
        set((state) => {
          return {
            chats: [res.data, ...state.chats],
            loading: false,
          };
        });
        customToast('success', 'New Group Chat Created!');
      }
    } catch (error: any) {
      const errorMessage = setError(error);
      set({ loading: false, error: errorMessage });
      customToast('error', errorMessage);
    }
  },
  renameGroupChat: async (chat) => {
    try {
      set({ loading: true });
      const { data } = await authApi.put(`/chat/${chat?._id}`, {
        chatName: chat?.chatName,
      });
      set((state) => {
        return {
          selectedChat: data,
          loading: false,
          refetch: !state.refetch,
        };
      });
    } catch (error: any) {
      const errorMessage = setError(error);
      set({ loading: false, error: errorMessage });
      customToast('error', errorMessage);
    }
  },
  addUserToGroup: async (chatObj) => {
    try {
      set({ loading: true });
      const { data } = await authApi.patch(`/chat/${chatObj?._id}`, {
        userId: chatObj?.userId,
      });
      set((state) => {
        return {
          selectedChat: data,
          loading: false,
          refetch: !state.refetch,
        };
      });
    } catch (error: any) {
      const errorMessage = setError(error);
      set({ loading: false, error: errorMessage });
      customToast('error', errorMessage);
    }
  },
  removeUserFromGroup: async (chatObj) => {
    try {
      set({ loading: true });
      const res = await authApi.put('/chat/remove', chatObj);
      if (res.data) {
        set((state) => ({
          refetch: !state.refetch,
          loading: false,
          selectedChat: res.data,
        }));
      }
    } catch (error: any) {
      const errorMessage = setError(error);
      set({ loading: false, error: errorMessage });
      customToast('error', errorMessage);
    }
  },
}));

export default useChatStore;
