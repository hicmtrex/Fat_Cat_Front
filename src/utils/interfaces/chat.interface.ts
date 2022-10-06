import { UserInfo } from './user.interface';

type LatestMessage = {
  _id: string;
  sender: UserInfo;
  content: string;
  chat: string;
};

export interface ChatData {
  _id: string;
  chatName: string;
  isGroupChat: boolean;
  users: UserInfo[];
  latestMessage: LatestMessage;
  groupAdmin?: UserInfo;
}
