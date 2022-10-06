import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import useAuthStore from '../../store/useAuth';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [show, setShow] = useState(false);

  //hooks
  const toast = useToast();
  const navigate = useNavigate();
  const { user, loginUser, loading } = useAuthStore((state) => state);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitHandler = () => {
    if (!formData.email || !formData.password) {
      return toast({
        title: 'Please Fill all the feilds',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
    loginUser(formData);
  };

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user]);

  return (
    <VStack spacing={'5px'} color='black'>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          value={formData.email}
          placeholder={'Enter Your Name'}
          name='email'
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            value={formData.password}
            type={show ? 'text' : 'password'}
            name='password'
            placeholder={`${show ? 'Enter Your Password' : '********'}`}
            onChange={handleChange}
          />
          <InputRightElement>
            <Button
              h='1.75rem'
              size={'sm'}
              onClick={() => setShow((prev) => !prev)}
            >
              {show ? <ViewOffIcon /> : <ViewIcon />}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        isLoading={loading}
        colorScheme={'blue'}
        width='100%'
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
