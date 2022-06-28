/* eslint-disable prettier/prettier */
//  aqui tenemos las rutas para las distintas playlists
//  la ruta es /playlist/cualquierId que sera de la playlist seleccionada
import GradientLayout from "../../components/gradientLayout";
import SongTable from "../../components/songsTable";
import { validateToken } from "../../lib/auth";
import prisma from "../../lib/prisma";
import { getBGColor } from "../../lib/colors";

//  playlist recibidas de getServerSideProps en este archivo
const Playlist = ({ playlist }) => {
  const color = getBGColor();
  return (
    //  los datos enviados a la cabecera para que cree la forma que tendra en la lista
    <GradientLayout
      color={color}
      roundImage={false}
      title={playlist.name}
      subtitle="playlist"
      description={`${playlist.songs.length} canciones`}
      image={`https://picsum.photos/400?random=${playlist.id}`}
    >
      {/* El cuerpo de la lista */}
      <SongTable songs={playlist.songs} playlist={playlist.id} />
    </GradientLayout>
  );
};

//  validamos al usaurio y obtenemos sus listas
//  getServerSideProps devolvera el playlist
export const getServerSideProps = async ({ query, req }) => {
  let user;
  try {
    user = validateToken(req.cookies.KGS_ACCESS_TOKEN);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }

  const [playlist] = await prisma.playlist.findMany({
    where: {
      id: +query.id,
      userId: user.id,
    },
    include: {
      songs: {
        include: {
          artist: {
            select: {
              name: true,
              id: true,
            },
          },
        },
      },
    },
  });
  return {
    props: { playlist },
  };
};

export default Playlist;
