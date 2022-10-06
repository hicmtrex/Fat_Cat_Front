import { Spinner } from '@chakra-ui/react';

const Loader = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        background: 'linear-gradient(#36d1dc, #5b86e5)',
      }}
    >
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='black.500'
        size='xl'
        display={'flex'}
        justifyContent='center'
        alignItems={'center'}
        margin='auto'
      />
    </div>
  );
};

export default Loader;
