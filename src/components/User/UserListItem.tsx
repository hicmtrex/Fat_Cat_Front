import { Avatar, Box, Text } from '@chakra-ui/react';
import { UserInfo } from '../../utils/interfaces/user.interface';

type Props = {
  user: UserInfo;
  handleFunction: () => void;
};

const UserListItem = ({ user, handleFunction }: Props) => {
  return (
    <>
      <Box
        onClick={handleFunction}
        cursor='pointer'
        bg='#E8E8E8'
        _hover={{
          background: '#38B2AC',
          color: 'white',
        }}
        w='100%'
        d='flex'
        alignItems='center'
        color='black'
        px={3}
        py={2}
        mb={2}
        borderRadius='lg'
      >
        <Avatar
          mr={2}
          size='sm'
          cursor='pointer'
          name={user.name}
          src={user.image}
        />
        <Box>
          <Text>{user.name}</Text>
          <Text fontSize='xs'>
            <b>Email : </b>
            {user.email}
          </Text>
        </Box>
      </Box>
    </>
  );
};

export default UserListItem;
