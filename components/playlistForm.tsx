/* eslint-disable prettier/prettier */
//  este nos permitira crear o borrar las listas

//  FC para darle el modo a typeScript
import { FC, useState } from "react";
import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { List, ListItem, ListIcon, Text } from "@chakra-ui/layout";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
//  hooks personalizados para obtener el usuario actual y las playlists
import { useMe, usePlaylist } from "../lib/hooks";
//  para las mutaciones del componente
import { playlistMode } from "../lib/mutations-playlist";

// el componente que mutará en función al modo
const PlaylistForm: FC<{ mode: "createPlaylist" | "deletePlaylist" }> = ({
  mode,
}) => {
  //  para controlar el nombre de la lista
  const [name, setName] = useState("");
  //  para obtener el usuario actual
  const { user } = useMe();
  let userId;

  // si no tenemos un usuario pondremos el valor de -1 para indicarlo como inexistente
  if (user) {
    userId = +user.id || -1;
  }
  // devuelve las playlists del usuario actual
  const { playlists } = usePlaylist();
  //  para las cargas
  const [isLoading, setIsLoading] = useState(false);
  //  para navegación
  const router = useRouter();

  //  en modo createPlaylist manejará el submit de la nueva lista
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    //  si no cumple esta condicion alertamos al usuario y paramos
    if (name.length < 2 || name.length > 9) {
      setIsLoading(false);
      Swal.fire({
        title: "Error creando la lista",
        text: "La lista debe tener entre 2 y 9 caracteres",
        timer: 2000,
      });
      return;
    }
    // comprobamos el modo
    if (mode === "createPlaylist") {
      try {
        //  llamamos al playlistmode donde se hará la mutación, en /lib/mutations-playlist
        await playlistMode(mode, { name, userId });
        await Swal.fire({
          title: "Lista creada",
          text: "Lista creada correctamente",
          timer: 2000,
        });
        router.reload();
      } catch (error) {
        Swal.fire({ title: "Algo fallo", text: error, timer: 2000 });
      }
    }

    setIsLoading(false);
  };

  //  para borrar las listas
  const handleDelete = async (listId) => {
    try {
      //  llamamos al playlistmode donde se hará la mutación, en /lib/mutations-playlist
      await playlistMode(mode, { listId });
      await Swal.fire({
        title: "Lista borrada",
        text: "se ha borrado la lista correctamente",
        timer: 2000,
      });
      router.reload();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`fallo al borrar: ${error}`);
    }
  };

  return (
    <Box bg="transparent" color="white">
      <Flex justify="center" align="center" height="calc(60vh - 100px)">
        {/* Si estamos creando una lista creamos un formulario para recoger y enviar los datos */}
        {mode === "createPlaylist" ? (
          <Box padding="50px" bg="gray.900" borderRadius="6px">
            <form onSubmit={handleSubmit}>
              <Input
                placeholder="Introduzca un nombre para la lista"
                type="text"
                textAlign="center"
                autoComplete="off"
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                type="submit"
                bg="green.500"
                isLoading={isLoading}
                marginTop="5px"
                paddingX="10%"
                marginX="23%"
                sx={{
                  "&:hover": {
                    bg: "green.400",
                  },
                }}
              >
                Crear nueva lista
              </Button>
            </form>
          </Box>
        ) : (
          //  si estamos en modo delete queremos ver las listas del usuario, las motramos
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
              {playlists.map((playlist) => (
                <ListItem
                  paddingX="20px"
                  key={playlist.id}
                  onClick={() => handleDelete(playlist.id)}
                  sx={{
                    "&:hover": {
                      bg: "rgba(255,255,255, 0.1)",
                    },
                  }}
                >
                  <Flex justify="space-around">
                    <Text width="30%">{playlist.name}</Text>
                    <ListIcon as={MdDelete} color="white" marginRight="20px" />
                  </Flex>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default PlaylistForm;
