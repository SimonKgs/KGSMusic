/* eslint-disable prettier/prettier */

import { Box, Flex } from "@chakra-ui/react";
import { List, ListItem, ListIcon, Text } from "@chakra-ui/layout";
import { useRouter } from "next/router";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import fetchDelete from "../lib/fetchDelete";

export const AdminForm = ({ users }) => {
  const router = useRouter();

  //  para borrar las listas
  const handleDelete = async (id) => {
    try {
      //  llamamos al fetch donde se borrará al usuario
      await fetchDelete("/deleteUser", { id });
      await Swal.fire({
        title: "usuario borrado",
        text: `se ha borrado con id: ${id}`,
        timer: 2000,
      });
      router.reload();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`fallo al borrar: ${error}`);
    }
  };

  return (
    <Box
      height="60%"
      width="80vw"
      overflowY="auto"
      paddingY="20px"
      cursor="pointer"
      css={{
        "&::-webkit-scrollbar": {
          width: "4px",
        },
        "&::-webkit-scrollbar-track": {
          width: "6px",
        },
        "&::-webkit-scrollbar-thumb": {
          background: "gray",
          borderRadius: "24px",
        },
      }}
    >
      <List spacing={2}>
        {users?.map((user) => (
          <ListItem
            paddingX="20px"
            key={user?.id}
            onClick={() => handleDelete(user.id)}
            sx={{
              "&:hover": {
                bg: "rgba(255,255,255, 0.1)",
              },
            }}
          >
            <Flex justify="space-around" color="white">
              <Text width="30%">{user?.firstName}</Text>
              <Text width="30%">{user?.lastName}</Text>
              <ListIcon as={MdDelete} color="white" marginRight="20px" />
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
