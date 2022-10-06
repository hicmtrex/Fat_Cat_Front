import create from 'zustand';
import { MessageData } from '../utils/interfaces/message.interface';

interface MessageStore {
  notification: MessageData[];
  setNotification: (n: any) => void;
}

const useMessageStore = create<MessageStore>((set) => ({
  notification: [],

  setNotification: (n) => {
    set((state) => ({ notification: n }));
  },
}));

export default useMessageStore;
