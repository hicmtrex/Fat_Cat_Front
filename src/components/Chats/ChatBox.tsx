import { Box } from '@chakra-ui/react';
import useChatStore from '../../store/useChat';
import SingleChat from './SingleChat';

const ChatBox = () => {
  const { selectedChat } = useChatStore((state) => state);
  return (
    <Box
      display={{ base: selectedChat ? 'flex' : 'none', md: 'flex' }}
      alignItems='center'
      flexDir='column'
      p={3}
      bg='white'
      w={{ base: '100%', md: '68%' }}
      borderRadius='lg'
      borderWidth={'1px'}
    >
      <SingleChat />
    </Box>
  );
};

export default ChatBox;
