/* eslint-disable prettier/prettier */
//  este componente para dibujar todo el reproductor, nombre cancion, reproductor, etc
import { Box, Flex, Text } from "@chakra-ui/layout";
import { useStoreState } from "easy-peasy";
import Player from "./player";

const PlayerBar = () => {
  //  referencia a las acciones en el store
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);

  return (
    <Box height="100px" width="100vw" bg="gray.900" padding="10px">
      <Flex align="center">
        {/* si tenemos cancion activa renderizamos los datos, si no nada */}
        {activeSong ? (
          <Box
            padding="20px"
            color="white"
            width={{ md: "30vw", sm: "30vw" }}
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
            <Text fontSize={{ md: "large", sm: "small" }}>
              {activeSong.name}
              {/* {activeSong} */}
            </Text>
          </Box>
        ) : null}
        <Box width={{ md: "40vw", sm: "60vw" }}>
          {/* PASAMOS LAS PROPS AL PLAYER USANDO LAS ACCIONES */}
          {activeSong ? <Player songs={songs} activeSong={activeSong} /> : null}
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
