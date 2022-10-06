import { Avatar, Tooltip } from '@chakra-ui/react';
import ScrollableFeed from 'react-scrollable-feed';
import { isLastMessage, isSameSenderMargin, isSameUser } from '../../lib/chat';
import useAuthStore from '../../store/useAuth';
import { MessageData } from '../../utils/interfaces/message.interface';

type Props = {
  messages: MessageData[];
};

const ScrollableChat = ({ messages }: Props) => {
  const { user } = useAuthStore((state) => state);
  return (
    <ScrollableFeed>
      {user &&
        messages &&
        messages.map((m: MessageData, i: number) => (
          <div style={{ display: 'flex' }} key={m._id}>
            {(isSameUser(messages, m, i) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement='bottom-start' hasArrow>
                <Avatar
                  mt='7px'
                  mr={1}
                  size='sm'
                  cursor='pointer'
                  name={m.sender.name}
                  src={m.sender.image}
                />
              </Tooltip>
            )}
            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? '#BEE3F8' : '#B9F5D0'
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i) ? 3 : 10,
                borderRadius: '20px',
                padding: '5px 15px',
                maxWidth: '75%',
              }}
            >
              {m.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
