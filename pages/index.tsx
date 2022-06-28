/* eslint-disable prettier/prettier */
//  El home de nuestra app
import { Box, Text, Flex } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import prisma from "../lib/prisma";
import GradientLayout from "../components/gradientLayout";
import { useMe } from "../lib/hooks";

//  recibimos los artistas de este mismo archivo en getServerSideProps
const Home = ({ artists }) => {
  //  necesitamos al user para personalizar la parte superior
  const { user } = useMe();

  return (
    <GradientLayout
      color="blue"
      roundImage
      subtitle="Perfil"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} listas privadas`}
      image="./logo.jpg"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top 3 artistas
          </Text>
          <Text fontSize="md">Visible para todos</Text>
        </Box>
        <Flex>
          {/* Y los 3 artistas que serán el top del mes */}
          {artists.map((artist) => (
            <Box
              paddingX="10px"
              width={{ lg: "18%", md: "25%" }}
              key={artist.id}
            >
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                  src={`https://picsum.photos/400?random=${artist.id}`}
                  borderRadius="100%"
                />
                <Box marginTop="10px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artista</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};
//  para retornar los datos como si fuera desde el servidor, retornado al home como props
//  sacamos los artistas para el componente, solo queremos 3
export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({
    take: 3,
  });

  return {
    props: { artists },
  };
};

export default Home;
