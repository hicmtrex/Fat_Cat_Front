import { ChatData } from './chat.interface';
import { UserInfo } from './user.interface';

type Chat = {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: UserInfo[];
  latestMessage: string;
};

export interface MessageData {
  _id: string;
  sender: {
    _id: string;
    name: string;
    image?: string;
  };
  content: string;
  chat: ChatData;
}
