import { Box, useDisclosure } from '@chakra-ui/react';
import Navbar from '../components/Layouts/Navbar';
import SlideDrawer from '../components/Layouts/SlideDrawer';
import MyChats from '../components/Chats/MyChats';
import ChatBox from '../components/Chats/ChatBox';
import useAuthStore from '../store/useAuth';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ChatPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useAuthStore((state) => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) navigate('/auth');
  }, [user]);
  return (
    <div style={{ width: '100%' }}>
      <Navbar onOpen={onOpen} />
      <SlideDrawer isOpen={isOpen} onClose={onClose} />
      <Box
        display={'flex'}
        justifyContent='space-between'
        w={'100%'}
        h='91.5vh'
        p={10}
      >
        {user && <MyChats />}
        {user && <ChatBox />}
      </Box>
    </div>
  );
};

export default ChatPage;
