import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../../store/useAuth';

const SignUp = () => {
  //states
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [image, setImage] = useState<string>('');
  const [show, setShow] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  //costom hooks
  const navigate = useNavigate();
  const toast = useToast();
  const {
    user,
    registerUser,
    loading: authLoading,
  } = useAuthStore((state) => state);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const updloadImage = (image: any) => {
    // check image require
    if (!image)
      return toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      //from data
      const data = new FormData();
      data.append('file', image);
      data.append('upload_preset', 'mernstack-chatapp');
      data.append('cloud_name', 'hicm');

      //post request to cloudinary
      setLoading(true);
      axios
        .post('https://api.cloudinary.com/v1_1/hicm/image/upload', data)
        .then((res) => {
          setLoading(false);
          setImage(res.data.url.toString());
        })
        .catch(() => {
          setLoading(false);
          toast({
            title: 'Something went wrong please try again!',
            status: 'warning',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
          });
        });
    } else {
      return toast({
        title: 'Please Select an Image!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
  };

  const submitHandler = () => {
    if (!formData.name || !formData.email || !formData.password) {
      return toast({
        title: 'Please Fill all the feilds',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }
    if (formData.password !== confirmPassword) {
      return toast({
        title: 'Password Not Match!',
        status: 'warning',
        duration: 5000,
        isClosable: true,
        position: 'bottom',
      });
    }

    registerUser({ ...formData, image });
  };

  useEffect(() => {
    if (user) navigate('/chat');
  }, [user]);

  return (
    <VStack spacing={'5px'} color='black'>
      <FormControl id='first-name' isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          placeholder={'Enter Your Name'}
          name='name'
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id='email' isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          placeholder={'Enter Your Name'}
          name='email'
          onChange={handleChange}
        />
      </FormControl>
      <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
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
      <FormControl id='confirm_password' isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? 'text' : 'password'}
            name='password'
            placeholder={`${show ? 'Enter Your Password' : '********'}`}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
      <FormControl id='image'>
        <FormLabel>Upload Your Picture</FormLabel>
        <Input
          type={'file'}
          p={1.5}
          apply='image/*'
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) return;
            updloadImage(e.target.files[0]);
          }}
        />
      </FormControl>
      <Button
        disabled={authLoading}
        colorScheme={'blue'}
        width='100%'
        style={{ marginTop: 15 }}
        onClick={submitHandler}
        isLoading={loading}
      >
        {authLoading ? <Spinner /> : 'Sign Up'}
      </Button>
    </VStack>
  );
};

export default SignUp;
