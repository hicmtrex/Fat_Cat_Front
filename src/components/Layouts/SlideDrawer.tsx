import { useState, ChangeEvent } from 'react';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import useUserStore from '../../store/useUser';
import ChatLoader from '../UI/ChatLoader';
import UserListItem from '../User/UserListItem';
import useChatStore from '../../store/useChat';

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

const SlideDrawer = ({ isOpen, onClose }: Props) => {
  const [search, setSearch] = useState<string>('');
  const { loading, users, searchUsers } = useUserStore((state) => state);
  const { startChat } = useChatStore((state) => state);
  const toast = useToast();
  const loadingChat = false;

  const handleSearch = () => {
    if (!search)
      return toast({
        title: 'Please Enter something in search',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top-left',
      });
    searchUsers(search);
  };

  const handleFunction = (userId: string) => {
    startChat(userId);
    onClose();
  };

  return (
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth={1}>Search Users</DrawerHeader>
        <DrawerBody>
          <Box display={'flex'} pb={2}>
            <Input
              placeholder='Search by name or email'
              mr={2}
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
            />
            <Button onClick={handleSearch}>Go</Button>
          </Box>
          {loading ? (
            <ChatLoader />
          ) : (
            <>
              {users.map((u) => (
                <UserListItem
                  user={u}
                  key={u._id}
                  handleFunction={() => handleFunction(u._id)}
                />
              ))}
            </>
          )}
          {loadingChat && <Spinner ml='auto' d='flex' />}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default SlideDrawer;
