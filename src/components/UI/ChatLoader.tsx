import { Skeleton, Stack } from '@chakra-ui/react';

const ChatLoader = () => {
  return (
    <Stack>
      <Skeleton height={45} />
      <Skeleton height={45} />
      <Skeleton height={45} />
      <Skeleton height={45} />
      <Skeleton height={45} />
      <Skeleton height={45} />
      <Skeleton height={45} />
      <Skeleton height={45} />
      <Skeleton height={45} />
    </Stack>
  );
};

export default ChatLoader;
