import { ReactNode, useState } from 'react';
import {
  Modal,
  ModalFooter,
  useDisclosure,
  ModalBody,
  Button,
  ModalContent,
  ModalOverlay,
  ModalHeader,
  FormControl,
  ModalCloseButton,
  Box,
  Input,
  useToast,
} from '@chakra-ui/react';
import UserListItem from '../User/UserListItem';
import useChatStore from '../../store/useChat';
import useUserStore from '../../store/useUser';
import UserBadgeItem from '../User/UserBadgeItem';
import { UserInfo } from '../../utils/interfaces/user.interface';

type Props = {
  children: ReactNode;
};

const GroupChatModal = ({ children }: Props) => {
  //states hooks
  const [groupChatName, setGroupChatName] = useState<string>('');
  //custom hook
  const { isOpen, onClose, onOpen } = useDisclosure();
  const toast = useToast();
  //zustand
  const { createGroupChat } = useChatStore((state) => state);
  const {
    searchUsers,
    users,
    loading,
    selectedUsers,
    setSelectedUsers,
    deleteSelectedUser,
  } = useUserStore((state) => state);

  //methods
  const handleSubmit = async () => {
    if (!groupChatName || !selectedUsers)
      return toast({
        title: 'Please fill all the feilds',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
    const newGroup = {
      name: groupChatName,
      users: JSON.stringify(selectedUsers.map((u) => u._id)),
    };
    createGroupChat(newGroup);
    onClose();
  };

  const handleGroup = (userToAdd: UserInfo) => {
    if (selectedUsers.includes(userToAdd)) {
      toast({
        title: 'User already added',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'top',
      });
      return;
    }

    setSelectedUsers([...selectedUsers, userToAdd]);
  };

  const handleSearch = (query: string) => {
    searchUsers(query);
  };
  const handleDelete = (userId: string) => {
    deleteSelectedUser(userId);
  };

  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize='35px'
            fontFamily='Work sans'
            display='flex'
            justifyContent='center'
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display='flex' flexDir='column' alignItems='center'>
            <FormControl>
              <Input
                placeholder='Chat Name'
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder='Add Users eg: John, Piyush, Jane'
                mb={1}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            <Box w='100%' d='flex' flexWrap='wrap'>
              {selectedUsers.map((u) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  handleFunction={() => handleDelete(u?._id)}
                />
              ))}
            </Box>
            {loading ? (
              // <ChatLoading />
              <div>Loading...</div>
            ) : (
              users
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit} colorScheme='blue'>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
