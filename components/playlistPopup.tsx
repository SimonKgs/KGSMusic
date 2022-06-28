/* eslint-disable prettier/prettier */
//  sera el popup que muestre las playlists del usuario en search, servira para añadirlas a la que seleccionemos
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";
import { List, ListItem } from "@chakra-ui/layout";
import Swal from "sweetalert2";
//  para obtener las listas del usuario actual
import { usePlaylist } from "../lib/hooks";
//  para las mutaciones
// import { addDeleteSongMode } from "../lib/mutations-add-delete-song";
import fetcherAddSong from "../lib/fetherAddSong";

// recibimos las props de /components/searchForm
export const PlaylistPopup = (props) => {
  //  extraemos el id de la cancion para saber que canción agregar y el estado del popup para poder cerrarlo
  const { songId, popupState } = props;
  //  viene de search form es el state, para poder manejarlo desde aquí
  const { popup, setPopup } = popupState;
  // obtenemos las listas del usuario
  const { playlists } = usePlaylist();
  //  para cambiar el estado del popup a false y que se cierre
  const close = () => setPopup(false);

  //  para añadir una canción a una lista
  const handleAddSongPlaylist = async (playlist) => {

    const  playlistId = playlist.id; 

    //  se envian los datos, se cierrar el popup y se muestra si la canción se ha agregado correctamente
    //  de lo contrario manejamos el error
    try {
      await fetcherAddSong(
        songId,
        playlistId,
      );

      close();
      Swal.fire({
        title: "cancion agregada",
        text: `cancion agregada a la lista ${playlist.name}`,
        icon: "success",
        timer: 2000,
      });
    } catch (error){
        throw new Error(error);
    }
  };

  return (
    //  manejará la apertura y cierre del popup
    <Modal isOpen={popup} onClose={() => close()}>
      <ModalOverlay />
      {/* TItulo y cuerpo del popup */}
      <ModalContent bg="black" color="white">
        <ModalHeader>Selecciona una lista y se agregara la cancion</ModalHeader>
        <ModalBody>
          {/* las listas del usuario para seleccionar la que queramos agregar la canción */}
          <List spacing={2}>
            {playlists.map((playlist) => (
              <ListItem
                paddingX="20px"
                key={playlist.id}
                cursor="pointer"
                onClick={() => handleAddSongPlaylist(playlist)}
                _hover={{ background: "green", color: "white" }}
              >
                {playlist.name}
              </ListItem>
            ))}
          </List>
        </ModalBody>
        {/* Para cerrar el popup sin agregar nada */}
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={close}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
