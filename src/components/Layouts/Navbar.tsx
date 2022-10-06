import {
  Avatar,
  Box,
  Button,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
} from '@chakra-ui/react';
import { BellIcon, ChevronDownIcon, SearchIcon } from '@chakra-ui/icons';
import useAuthStore from '../../store/useAuth';
import useChatStore from '../../store/useChat';
import { getSender } from '../../lib/chat';
import NotificationBadge, { Effect } from 'react-notification-badge';
import useMessageStore from '../../store/useMessage';
import { MessageData } from '../../utils/interfaces/message.interface';
import MyProfileModal from '../Modal/MyProfile';

type Props = {
  onOpen: () => void;
};

const Navbar = ({ onOpen }: Props) => {
  const { user, logoutUser } = useAuthStore((state) => state);
  const { setSelectedChat } = useChatStore((state) => state);
  const { notification, setNotification } = useMessageStore((state) => state);

  const logoutHandler = () => {
    logoutUser();
  };

  return (
    <Box
      display={'flex'}
      justifyContent='space-between'
      bg='white'
      w={'100%'}
      p='5px 10px 5px 10px'
      borderWidth={'5px'}
    >
      <Tooltip label='Search Users to chat' hasArrow placement='bottom-end'>
        <Button variant={'ghost'} onClick={onOpen}>
          <SearchIcon />
          <Text display={{ base: 'none', md: 'flex' }} px={4}>
            Search User
          </Text>
        </Button>
      </Tooltip>
      <Box display={'flex'} alignItems='center'>
        <Text
          fontSize={'2xl'}
          fontWeight='bold'
          fontFamily='Work sans'
          marginRight={3}
        >
          Fat Cat
        </Text>
        <Avatar src='/images/fat_cat_logo.png' size={'sm'} />
      </Box>
      <div>
        <Menu>
          <MenuButton p={1}>
            <NotificationBadge
              count={notification.length}
              effect={Effect.SCALE}
            />
            <BellIcon fontSize={'2xl'} m={1} />
          </MenuButton>
          <MenuList pl={2}>
            {notification.length ? (
              notification.map((n: MessageData) => (
                <MenuItem
                  key={n._id}
                  onClick={() => {
                    setSelectedChat(n?.chat);
                    setNotification(notification.filter((no: any) => no !== n));
                  }}
                >
                  {n.chat.isGroupChat
                    ? `New Message in ${n.chat.chatName}`
                    : `New Message from ${getSender(user?._id, n.chat.users)}`}
                </MenuItem>
              ))
            ) : (
              <MenuItem>No new Messages</MenuItem>
            )}
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton p={1} as={Button} rightIcon={<ChevronDownIcon />}>
            <Avatar
              src={user?.image}
              size='sm'
              cursor={'pointer'}
              name={user?.name}
            />
          </MenuButton>
          <MenuList>
            {user && <MyProfileModal user={user} />}

            <MenuDivider />
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </Box>
  );
};

export default Navbar;
