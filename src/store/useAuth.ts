import create from 'zustand';
import { devtools } from 'zustand/middleware';
import { fetchApi } from '../lib/fetch';
import { setError } from '../utils/error';
import { UserInfo } from '../utils/interfaces/user.interface';
import { customToast } from '../utils/toast';

type RegisterUser = {
  name: string;
  email: string;
  password: string;
  image?: string;
};

type loginUser = {
  email: string;
  password: string;
};

interface AuthStore {
  user: UserInfo | null;
  token: string | null;
  error?: string;
  loading: boolean;
  refreshLoading: boolean;
  registerUser: (user: RegisterUser) => void;
  loginUser: (user: loginUser) => void;
  logoutUser: () => void;
  refreshToken: () => void;
}

const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    user: null,
    token: null,
    error: undefined,
    loading: false,
    refreshLoading: false,
    registerUser: async (user) => {
      try {
        set({ loading: true });
        const { data } = await fetchApi.post('/auth/register', user);
        set({ loading: false, user: data.user, token: data.token });
      } catch (err: unknown | any) {
        const message = setError(err);
        set({ loading: false, error: message });
        customToast('error', message);
      }
    },
    loginUser: async (user) => {
      try {
        set({ loading: true });
        const { data } = await fetchApi.post('/auth/login', user);
        set({ loading: false, user: data.user, token: data.token });
      } catch (err: unknown | any) {
        const message = setError(err);
        set({ loading: false, error: message });
        customToast('error', message);
      }
    },
    refreshToken: async () => {
      try {
        set({ refreshLoading: true });
        const { data } = await fetchApi.get('/auth/refresh-token');
        set({ refreshLoading: false, user: data.user, token: data.token });
      } catch (err: unknown | any) {
        const message = setError(err);
        set({ refreshLoading: false, error: message });
      }
    },
    logoutUser: async () => {
      await fetchApi.post('/auth/logout');
      set({ user: null, token: null });
     // document.location.href = '/auth';
    },
  }))
);

export default useAuthStore;
