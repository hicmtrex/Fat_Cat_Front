import { ViewIcon } from '@chakra-ui/icons';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  FormControl,
  Input,
  useToast,
  Box,
  IconButton,
} from '@chakra-ui/react';
import { useState, ChangeEvent } from 'react';
import useAuthStore from '../../store/useAuth';
import useChatStore from '../../store/useChat';
import useUserStore from '../../store/useUser';
import { UserInfo } from '../../utils/interfaces/user.interface';
import UserBadgeItem from '../User/UserBadgeItem';
import UserListItem from '../User/UserListItem';

const UpdateGroupChatModal = () => {
  const [groupChatName, setGroupChatName] = useState<string>('');

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  //zustand
  const { user: logginUser } = useAuthStore((state) => state);
  const { users, searchUsers } = useUserStore((state) => state);
  const {
    loading: chatLoading,
    selectedChat,
    renameGroupChat,
    addUserToGroup,
    removeUserFromGroup,
  } = useChatStore((state) => state);

  //functions
  const handleSearch = (val: string) => {
    if (val === '') return;
    searchUsers(val);
  };

  const handleRename = () => {
    if (!selectedChat) return;
    renameGroupChat({ _id: selectedChat._id, chatName: groupChatName });
    setGroupChatName('');
    onClose();
  };

  const handleAddUser = (user1: UserInfo) => {
    if (!selectedChat || !logginUser) return;

    if (selectedChat.users.find((u) => u._id === user1._id))
      return toast({
        title: 'User Already in group',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

    if (selectedChat.groupAdmin?._id !== logginUser._id)
      return toast({
        title: 'Only admins can add someone!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    const addedUser = { _id: selectedChat._id, userId: user1._id };
    addUserToGroup(addedUser);
  };

  const handleRemove = (u: UserInfo) => {
    if (!selectedChat || !u) return;
    if (selectedChat?.groupAdmin?._id !== logginUser?._id)
      return toast({
        title: 'Only admins can remove someone!',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

    const removeObj = { chatId: selectedChat._id, userId: u?._id };
    removeUserFromGroup(removeObj);
    onClose();
  };

  return (
    <>
      <IconButton
        aria-label=''
        display={{ base: 'flex' }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize='35px'
            fontFamily='Work sans'
            display='flex'
            justifyContent='center'
          >
            {selectedChat?.chatName}
          </ModalHeader>

          <ModalCloseButton />
          <ModalBody d='flex' flexDir='column' alignItems='center'>
            <Box w='100%' d='flex' flexWrap='wrap' pb={3}>
              {selectedChat?.users.map((u: UserInfo) => (
                <UserBadgeItem
                  key={u._id}
                  user={u}
                  admin={selectedChat?.groupAdmin}
                  handleFunction={() => handleRemove(u)}
                />
              ))}
            </Box>
            <FormControl d='flex'>
              <Input
                placeholder='Chat Name'
                mb={3}
                value={groupChatName}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setGroupChatName(e.target.value)
                }
              />
              <Button
                variant='solid'
                colorScheme='teal'
                ml={1}
                isLoading={chatLoading}
                onClick={handleRename}
              >
                Update
              </Button>
            </FormControl>
            <FormControl>
              <Input
                placeholder='Add User to group'
                mb={1}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleSearch(e.target.value)
                }
              />
            </FormControl>

            {users?.splice(0, 4).map((user) => (
              <UserListItem
                key={user._id}
                user={user}
                handleFunction={() => handleAddUser(user)}
              />
            ))}
          </ModalBody>
          <ModalFooter>
            {logginUser && (
              <Button
                onClick={() => handleRemove(logginUser)}
                colorScheme='red'
              >
                Leave Group
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateGroupChatModal;
