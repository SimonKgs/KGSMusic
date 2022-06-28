/* eslint-disable prettier/prettier */
//  este componente contendra digamos el main, y sufrira las modificaciones necesarias en funcion a la ruta elegida
//  lo aplicaremos en nuestra pagina index
import { Box, Flex, Text } from "@chakra-ui/layout";
import { Button, Image } from "@chakra-ui/react";
import { useStoreActions } from "easy-peasy";
import { useRouter } from "next/router";
import fetcher from "../lib/fetcher";

//  lo atributos que necesitará, las props, sirven para las mutaciones del componente
const GradientLayout = ({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
}) => {
  //  para navegación
  const router = useRouter();

  //  usamos el store para poder usar la acciones que las usaremos aquí para que no quede cargada la canción al salir
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs);
  const setActiveSong = useStoreActions((store: any) => store.changeActiveSong);

  //  para sacar al usuario, llama a /lib/fetcher
  const handleLogout = async () => {
    setActiveSong(null);
    playSongs([]);
    await fetcher(`/logout`, { logout: "logout" });
    router.push("/signin");
  };
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
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
      {/* parte superior del main, user data / song data¿? */}
      <Flex
        bg={`${color}.600`}
        justify="space-around"
        padding="40px"
        align="end"
      >
        {/* El logo */}
        {image !== "" && (
          <Box padding="20px" display={{ md: "flex", sm: "none" }}>
            <Image
              boxSize="160px"
              boxShadow="2xl"
              src={image}
              borderRadius={roundImage ? "100%" : "3px"}
            />
          </Box>
        )}
        {/* Subtitulo */}
        <Box padding="20px" color="whiteAlpha.700">
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          {/* titulo/nombre */}
          <Text fontSize="6xl">{title}</Text>
          {/* Descripción */}
          <Text fontSize="x-small">{description}</Text>
        </Box>
        {/* Boton para salir */}
        <Box>
          <Button
            bg="black"
            color="white"
            onClick={handleLogout}
            _hover={{ background: "red", color: "white" }}
          >
            Salir
          </Button>
        </Box>
      </Flex>
      {/* Aquí el children sera cualquiera de los distintos componentes, se modifica en función a la ruta */}
      <Box paddingY="50px">{children}</Box>
    </Box>
  );
};

export default GradientLayout;
