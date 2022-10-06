import {
  Avatar,
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import Login from '../components/Authentication/Login';
import SignUp from '../components/Authentication/SignUp';

const HomePage = () => {
  return (
    <Container maxW={'xl'} centerContent>
      <Box
        display={'flex'}
        justifyContent={'center'}
        alignItems='center'
        p={3}
        bg='white'
        w='100%'
        m='40px 0 15px 0'
        borderRadius={'lg'}
        borderWidth='1px'
      >
        <Text
          fontSize={'4xl'}
          fontWeight='bold'
          fontFamily='Work sans'
          color={'black'}
        >
          Fat Cat
        </Text>
        <Avatar src='/images/fat_cat_logo.png' marginLeft={5} />
      </Box>
      <Box
        bg={'white'}
        w='100%'
        p={4}
        borderRadius='lg'
        color={'black'}
        borderWidth={'1px'}
      >
        <Tabs isFitted variant={'soft-rounded'}>
          <TabList mb='1em'>
            <Tab width={'50%'}>Login</Tab>
            <Tab width={'50%'}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default HomePage;
