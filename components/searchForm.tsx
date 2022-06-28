/* eslint-disable prettier/prettier */
//  este archivo nos permite realizar busquedas de canciones
import React, { useEffect, useState } from "react";
import { Box, Flex } from "@chakra-ui/layout";
import { Input, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useStoreActions } from "easy-peasy";
import Swal from "sweetalert2";
import { MdAdd, MdSearch } from "react-icons/md";
import fetcher from "../lib/fetcher";
import { PlaylistPopup } from "./playlistPopup";
import fetcherDeezer from "../lib/fetcherDeezer";

export const SearchForm = () => {
  //  controla el nombre introducido en la busqueda
  const [songName, setSongName] = useState("");
  //  las acciones del storage para que se cree el reproductor si seleccionamos una canción
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs);
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);
  //  serán todas las canciones que devuelva la busqueda
  const [songs, setSongs] = useState([]);

  //  marcara cuantas canciones traemos de Deezer
  const [limite, setLimite] = useState(10);

  //  si se cambia el nombre de la busqueda volvemos el limite a su valor inicial
  useEffect(() => {
    setLimite(10);
  }, [songName]);

  let songsRes;

  //  para manejar la busqueda
  const handleSearch = async () => {
    //  evitamos la busqueda si no hay nada introducido
    if (songName === "") {
      await Swal.fire({
        title: "Error",
        text: "la busqueda debe tener al menos 1 caracter",
        timer: 1500,
      });
      return;
    }

    // recogemos los datos de la API de Deezer y aplico el formato para guardarlos en mi DB

    songsRes = await fetcherDeezer(songName, limite);

    //  si no tenemos un error aumentaremos el limete en 10
    if (!songsRes.error) {
      setLimite(limite + 10);
    }

    let arregloDeezer;

    if (!songsRes.error) {
      arregloDeezer = songsRes.data.map((song) => {
        //  Uso la desestructuracion de la respuesta para obtener el formato que tendra en mi DB

        const {
          //  uso desestructuración anidada, para sacar solo el nombre del artista que esta un objeto 
          //  dentro de la canción y lo renombro
          artist: { name: artistName },
          duration,
          id,
          preview: url,
          title: name,
        } = song;

        //  vuelvo a crear el objeto artista para introducirlo como tal en mi DB, para mantener el formato
        const artist = { name: artistName };

        return { artist, id, duration, url, name };
      });

      setSongs(arregloDeezer);
    }
  };

  //  para que se renderice de nuevo si se hace una busqueda
  useEffect(() => {}, [songsRes, songs]);

  const handlePlay = (activeSong?) => {
    setActiveSong(activeSong || songs[0]);
    playSongs(songs);
  };

  //  para controlar el popup, este valor será a /components/playlistPopup para que se pueda manejar la acción desde allí
  const [popup, setPopup] = useState(false);
  const [songToPopUp, setSongToPopUp] = useState();

  //  pasará la canción al popup
  const addSongToPlayListHandler = async (song) => {
    const songData = await fetcher("/createSongArtist", song);
    if (songData?.existsSong){
      await setSongToPopUp(songData.existsSong.id);
    } else if ((songData?.songCreated)) {
      await setSongToPopUp(songData.songCreated.id);
    }
    setPopup(!popup);
  };

  //  para renderizar el popup si hay cambios en el state
  useEffect(() => {}, [popup]);

  return (
    // el componente
    <Box bg="transparent" color="white">
      {/* Icono y barra de busqueda */}
      <Flex
        justify="center"
        align="center"
        height="calc(20vh - 100px)"
        width="60vw"
        marginX="20%"
      >
        <Box width={{ lg: "10vw", sm: "5vw" }} marginEnd="2vw">
          <MdSearch size={30} cursor="pointer" onClick={() => handleSearch()} />
        </Box>
        <Box width={{ lg: "40vw", sm: "50vw" }}>
          <Input
            placeholder="Escriba la canción o el artista que desea"
            type="text"
            textAlign="center"
            autoComplete="off"
            onChange={(e) => setSongName(e.target.value)}
          />
        </Box>
      </Flex>
      {/* Serán las canciones, que devuelva la busqueda, solo se mostrará si hay alguna */}
      {songs.length !== 0 && (
        <>
          <Table
            variant="unstyled"
            height="calc(40vh - 100px)"
            overflowY="auto"
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
            {/* cabeceras para la tabla */}
            <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
              <Tr>
                <Th>Título</Th>
                <Th>artista</Th>
                <Th>Agrega la canción a la lista</Th>
              </Tr>
            </Thead>
            {/* datos de las canciones */}
            <Tbody>
              {songs.length !== 0 &&
                songs.map((song) => (
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
                    <Td>{song.name}</Td>
                    <Td>{song.artist.name}</Td>
                    <Td
                      onClick={() => addSongToPlayListHandler(song)}
                      sx={{
                        transition: "all .3s",
                        "&:hover": {
                          bg: "rgba(255,255,255, 0.1)",
                        },
                      }}
                    >
                      <MdAdd />
                    </Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
          <Flex
            bg="red"
            height="4vh"
            border="1px solid white"
            justifyContent="center"
            alignContent="center"
            marginTop="1vh"
            bgColor="transparent"
            cursor="pointer"
            _hover={{
              background: "rgb(35, 51, 51)",
              color: "white",
              fontSize: "large",
            }}
            onClick={() => handleSearch()}
          >
            Más canciones
          </Flex>
        </>
      )}
      {/* Mostrara las listas, para seleccionar a que lista lo añadimos */}
      {popup && (
        <PlaylistPopup songId={songToPopUp} popupState={{ popup, setPopup }} />
      )}
    </Box>
  );
};
