import create from 'zustand';
import authApi from '../lib/fetch';
import { setError } from '../utils/error';
import { UserInfo } from '../utils/interfaces/user.interface';
import { customToast } from '../utils/toast';

interface UserStore {
  users: UserInfo[];
  selectedUsers: UserInfo[];
  loading: boolean;
  error?: string;
  searchUsers: (search: string) => void;
  setSelectedUsers: (user: UserInfo[]) => void;
  deleteSelectedUser: (userId: string) => void;
}

const useUserStore = create<UserStore>((set) => ({
  users: [],
  selectedUsers: [],
  loading: false,
  error: undefined,
  setSelectedUsers: (user) => {
    set({ selectedUsers: user });
  },
  deleteSelectedUser: (userId: string) => {
    set((state) => {
      return {
        selectedUsers: state.selectedUsers.filter((u) => u._id !== userId),
      };
    });
  },
  searchUsers: async (search) => {
    try {
      set({ loading: true });
      const { data } = await authApi.get(`/users?search=${search}`);
      set({ loading: false, users: data });
    } catch (error: any) {
      const errorMessage = setError(error);
      set({ loading: false, error: errorMessage });
      customToast('error', errorMessage);
    }
  },
}));

export default useUserStore;
