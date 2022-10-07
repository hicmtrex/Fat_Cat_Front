import {
  Box,
  Button,
  FormControl,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  Text,
  useToast,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useState, KeyboardEvent, useEffect, ChangeEvent } from 'react';
import useChatStore from '../../store/useChat';
import useAuthStore from '../../store/useAuth';
import ProfileModal from '../Modal/ProfileModal';
import { getSender, getSenderFull } from '../../lib/chat';
import UpdateGroupChatModal from '../Modal/UpdateGroupChatModal';
import ScrollableChat from './ScrollableChat';
import authApi, { baseUrl } from '../../lib/fetch';
import { MessageData } from '../../utils/interfaces/message.interface';
import { io, Socket } from 'socket.io-client';
import Lottie from 'react-lottie';
import animationData from '../../assets/animation.json';
import useMessageStore from '../../store/useMessage';
import EmojiPicker from 'emoji-picker-react';

let selectedChatCompare: any;
let socket: Socket;

const SingleChat = () => {
  //states
  const { user } = useAuthStore((state) => state);
  const [messages, setMessages] = useState<any>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [showEmoji, setShowEmoji] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [socketConnected, setSocketConnected] = useState<boolean>(false);
  const [typing, setTyping] = useState<boolean>(false);
  const [istyping, setIsTyping] = useState<boolean>(false);

  //custom hooks
  const { notification, setNotification } = useMessageStore((state) => state);
  const { selectedChat, setSelectedChat } = useChatStore((state) => state);
  const toast = useToast();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  // functions
  const getMessages = async () => {
    if (!selectedChat) return;
    try {
      setLoading(true);
      const { data } = await authApi.get(`/message/${selectedChat?._id}`);
      setMessages(data);
      setLoading(false);
      socket.emit('join chat', selectedChat?._id);
    } catch (error) {
      toast({
        title: 'Error Occured!',
        description: 'Failed to Load the Messages',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  const sendMessage = async (event: KeyboardEvent<HTMLImageElement>) => {
    const m = { content: newMessage, chatId: selectedChat };
    if (event.key === 'Enter' && newMessage) {
      socket.emit('stop typing', selectedChat?._id);
      try {
        setNewMessage('');
        const { data } = await authApi.post('/message', m);
        if (data) {
          socket.emit('new message', data);
          setMessages([...messages, data]);
        }
      } catch (error) {
        toast({
          title: 'Error Occured!',
          description: 'Failed to send the Message',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom',
        });
      }
    }
  };

  const typingHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);

    if (!socketConnected || !selectedChat) return;

    if (!typing) {
      setTyping(true);
      socket.emit('typing', selectedChat._id);
    }
    const lastTypingTime = new Date().getTime();
    const timerLength = 3000;
    setTimeout(() => {
      const timeNow = new Date().getTime();
      const timeDiff = timeNow - lastTypingTime;
      if (timeDiff >= timerLength && typing) {
        socket.emit('stop typing', selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const onEmojiClick = (event: any) => {
    setShowEmoji(false);
    setNewMessage(`${newMessage} ${event.emoji}`);
  };

  //lifecyle

  useEffect(() => {
    getMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    socket = io(baseUrl);
    socket.emit('setup', user);
    socket.on('connected', () => setSocketConnected(true));
    socket.on('typing', () => setIsTyping(true));
    socket.on('stop typing', () => setIsTyping(false));
  }, []);

  useEffect(() => {
    socket.on('message recieved', (newMessageRecieved: MessageData) => {
      if (
        !selectedChatCompare || // if chat is not selected or doesn't match current chat
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
        if (!notification.includes(newMessageRecieved)) {
          setNotification([newMessageRecieved, ...notification]);
        }
      } else {
        setMessages([...messages, newMessageRecieved]);
      }
    });
  });

  return (
    <>
      {selectedChat ? (
        <>
          <Text
            fontSize={{ base: '28px', md: '30px' }}
            pb={3}
            px={2}
            w='100%'
            fontFamily='Work sans'
            display='flex'
            justifyContent={{ base: 'space-between' }}
            alignItems='center'
          >
            <IconButton
              aria-label=''
              display={{ base: 'flex', md: 'none' }}
              icon={<ArrowBackIcon />}
              onClick={() => setSelectedChat(undefined)}
            />
            {messages &&
              user &&
              (!selectedChat.isGroupChat ? (
                <>
                  {getSender(user._id, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user?._id, selectedChat.users)}
                  />
                </>
              ) : (
                <>
                  {selectedChat.chatName.toUpperCase()}
                  <UpdateGroupChatModal />
                </>
              ))}
          </Text>
          <Box
            display='flex'
            flexDir='column'
            justifyContent='flex-end'
            p={3}
            bg='#E8E8E8'
            w='100%'
            h='100%'
            borderRadius='lg'
            overflowY='hidden'
          >
            {showEmoji && <EmojiPicker onEmojiClick={onEmojiClick} />}

            {loading ? (
              <Spinner
                size='xl'
                w={20}
                h={20}
                alignSelf='center'
                margin='auto'
              />
            ) : (
              <div className='messages'>
                {!showEmoji && <ScrollableChat messages={messages} />}
              </div>
            )}

            <FormControl
              onKeyDown={sendMessage}
              id='first-name'
              isRequired
              mt={3}
            >
              {istyping ? (
                <div>
                  <Lottie
                    options={defaultOptions}
                    width={70}
                    style={{ marginBottom: 15, marginLeft: 0 }}
                  />
                </div>
              ) : (
                <></>
              )}
              <InputGroup>
                <Input
                  variant='filled'
                  bg='#fff'
                  placeholder='Enter a message..'
                  value={newMessage}
                  onChange={typingHandler}
                />
                <InputRightElement>
                  {!showEmoji && (
                    <Button onClick={() => setShowEmoji(true)}>😃</Button>
                  )}
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </Box>
        </>
      ) : (
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          h='100%'
        >
          <Text fontSize='3xl' pb={3} fontFamily='Work sans'>
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;
