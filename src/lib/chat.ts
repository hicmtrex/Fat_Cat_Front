import { MessageData } from '../utils/interfaces/message.interface';
import { UserInfo } from '../utils/interfaces/user.interface';


//
export const isSameSenderMargin = (
  messages: MessageData[],
  m: MessageData,
  i: number,
  userId: string
) => {
  if (
    i < messages.length - 1 &&
    messages[i + 1].sender._id === m.sender._id &&
    messages[i].sender._id !== userId
  )
    return 33;
  else if (
    (i < messages.length - 1 &&
      messages[i + 1].sender._id !== m.sender._id &&
      messages[i].sender._id !== userId) ||
    (i === messages.length - 1 && messages[i].sender._id !== userId)
  )
    return 0;
  else return 'auto';
};

export const isSameUser = (
  messages: MessageData[],
  m: MessageData,
  i: number
) => {
  return i > 0 && messages[i - 1].sender._id === m.sender._id;
};

export const getSender = (userId: string | undefined, users: UserInfo[]) => {
  return users[0]._id === userId ? users[1].name : users[0].name;
};

export const isLastMessage = (
  messages: MessageData[],
  i: number,
  userId: string
) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const getSenderFull = (userId: string, users: UserInfo[]) => {
  return users[0]._id === userId ? users[1] : users[0];
};
