import { useEffect } from 'react';
import { Box, Button, Stack, Text } from '@chakra-ui/react';
import { getSender } from '../../lib/chat';
import useAuthStore from '../../store/useAuth';
import useChatStore from '../../store/useChat';
import GroupChatModal from '../Modal/GroupChatModal';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoader from '../UI/ChatLoader';

const MyChats = () => {
  const { user } = useAuthStore((state) => state);
  const { chats, refetch, getMyChat, selectedChat, setSelectedChat, loading } =
    useChatStore((state) => state);

  useEffect(() => {
    getMyChat();
  }, [refetch]);

  return (
    <Box
      display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDir='column'
      alignItems='center'
      p={3}
      bg='white'
      w={{ base: '100%', md: '31%' }}
      borderRadius='lg'
      borderWidth={1}
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: '28px', md: '30px' }}
        fontFamily='Work sans'
        display='flex'
        w='100%'
        justifyContent='space-between'
        alignItems='center'
      >
        My Chats
        <GroupChatModal>
          <Button
            display='flex'
            fontSize={{ base: 17, md: 10, lg: 17 }}
            rightIcon={<AddIcon />}
          >
            {' '}
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      {loading ? (
        <ChatLoader />
      ) : (
        <Box
          display='flex'
          flexDir='column'
          p={3}
          bg='#F8F8F8'
          w='100%'
          h='100%'
          borderRadius='lg'
          overflowY='hidden'
        >
          {chats.length > 0 ? (
            <Stack overflowY={'scroll'}>
              {chats.map((chat) => (
                <Box
                  onClick={() => setSelectedChat(chat)}
                  cursor='pointer'
                  bg={selectedChat === chat ? '#38B2AC' : '#E8E8E8'}
                  color={selectedChat === chat ? 'white' : 'black'}
                  px={3}
                  py={2}
                  borderRadius='lg'
                  key={chat._id}
                >
                  <Text>
                    {chat.isGroupChat
                      ? chat.chatName
                      : getSender(user?._id, chat.users)}
                  </Text>
                  {chat?.latestMessage && (
                    <Text fontSize='xs'>
                      <b>{chat?.latestMessage.sender.name} : </b>
                      {chat?.latestMessage.content.length > 50
                        ? chat?.latestMessage.content.substring(0, 51) + '...'
                        : chat?.latestMessage.content}
                    </Text>
                  )}
                </Box>
              ))}
            </Stack>
          ) : null}
        </Box>
      )}
    </Box>
  );
};

export default MyChats;
