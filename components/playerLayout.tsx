/* eslint-disable prettier/prettier */
//  este sera la pagina principal donde tendremos todo el contenido y sufrira las modificaciones necesarias en el children
import { Box } from "@chakra-ui/layout";
import PlayerBar from "./playerBar";
import { SidebarCollapse } from "./sidebarCollapse";

const PlayerLayout = ({ children }) => {
  return (
    <Box width="100vw" height="100vh">
      {/* Barra superior */}
      <Box bg="black">
        {/* menu barra superior */}
        <SidebarCollapse />
      </Box>
      {/* Pagina interna */}
      <Box marginBottom="100px" bg="black">
        <Box
          height="calc(100vh - 100px)"
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
          {children}
        </Box>
      </Box>
      {/* espacio del reproductor de musica */}
      <Box position="absolute" left="0" bottom="0">
        <PlayerBar />
      </Box>
    </Box>
  );
};

export default PlayerLayout;
