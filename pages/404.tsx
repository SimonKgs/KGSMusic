/* eslint-disable prettier/prettier */
import { Box, Flex } from '@chakra-ui/layout';
import Link from 'next/link';

const MyCustom404Page = () => {
  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
        direction='column'
      >
        <h1 color="white">404</h1>
        <h2>
        <Link href="/signin" >
            Go To SignIn
        </Link>
      </h2>
      <p>Sorry, the content you are looking for cuould not be found.</p>
      </Flex>
    </Box>
  );
};

export default MyCustom404Page;