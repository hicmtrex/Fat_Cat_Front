import { ViewIcon } from '@chakra-ui/icons';
import {
  Button,
  IconButton,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { UserInfo } from '../../utils/interfaces/user.interface';

type Props = {
  user: UserInfo;
};

const ProfileModal = ({ user }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <IconButton
        aria-label=''
        display={{ base: 'flex' }}
        icon={<ViewIcon />}
        onClick={onOpen}
      />

      <Modal size='lg' onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h='410px'>
          <ModalHeader
            fontSize='40px'
            fontFamily='Work sans'
            d='flex'
            justifyContent='center'
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d='flex'
            flexDir='column'
            alignItems='center'
            justifyContent='space-between'
          >
            <Image
              borderRadius='full'
              boxSize='150px'
              src={user.image}
              alt={user.name}
            />
            <Text
              fontSize={{ base: '28px', md: '30px' }}
              fontFamily='Work sans'
            >
              Email: {user.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
