/* eslint-disable prettier/prettier */
//  este componente creara la tabla de canciones en cada lista
import { Box } from "@chakra-ui/layout";
import { Table, Thead, Td, Tr, Th, Tbody, IconButton } from "@chakra-ui/react";
import { BsFillPlayFill } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useStoreActions } from "easy-peasy";
import { formatTime } from "../lib/formatters";
// import { addDeleteSongMode } from "../lib/mutations-add-delete-song";
import fetchDelete from "../lib/fetchDelete";

const SongTable = ({ songs, playlist }) => {
  const router = useRouter();

  //  usamos el store para poder usar la acciones
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs);
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);

  //  manejamos el play para controlar la canción que debe cargar
  const handlePlay = (activeSong?) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  };

  //  controla el botón de borrar para quitar una canción de la lista
  const handleDelete = async (song) => {
    await fetchDelete("/deleteSongFromPlaylist", {
      songId: song.id,
      playlistId: playlist,
    });
    await Swal.fire({
      title: "Canción borrada",
      text: `${song.name} borrada`,
      timer: 2000,
    });
    router.reload();
  };

  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        {/* boton de play para reproducir toda la lista */}
        <Box marginBottom="30px" marginX="5px">
          <IconButton
            icon={<BsFillPlayFill fontSize="30px" />}
            aria-label="play"
            colorScheme="green"
            size="lg"
            isRound
            onClick={() => handlePlay()}
          />
        </Box>
        {/* headers de la tabla */}
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
            <Tr>
              <Th display={{ md: "block", sm: "none" }}>#</Th>
              <Th>Título</Th>
              <Th>
                <AiOutlineClockCircle fontSize="10px" />
              </Th>
              <Th>Borrar</Th>
            </Tr>
          </Thead>
          {/* datos de las canciones */}
          <Tbody>
            {songs.map((song, i) => (
              <Tr
                sx={{
                  transition: "all .3s",
                  "&:hover": {
                    bg: "rgba(255,255,255, 0.1)",
                  },
                }}
                key={song.id}
                cursor="pointer"
                onClick={() => handlePlay(song)}
              >
                <Td display={{ md: "block", sm: "none" }}>{i + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatTime(song.duration)}</Td>
                <Td
                  onClick={() => handleDelete(song)}
                  sx={{
                    transition: "all .3s",
                    "&:hover": {
                      bg: "rgba(255,255,255, 0.1)",
                    },
                  }}
                >
                  <MdDelete />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongTable;
