/* eslint-disable prettier/prettier */
//  pantalla para borrar las playlists
import GradientLayout from "../../components/gradientLayout";
import PlaylistForm from "../../components/playlistForm";
import { getBGColor } from "../../lib/colors";

const DeletePlaylist = () => {
  const color = getBGColor();

  return (
    //  pasamos los datos necesarios al gradient para la cabecera

    <GradientLayout
      color={color}
      roundImage={false}
      title="Borrar lista"
      subtitle="Pulsa en una lista y se borrará"
      description=""
      image={`https://picsum.photos/400?random=${Math.floor(Math.random())}`}
    >
      {/* Y el modo al playlistform para la forma del cuerpo */}

      <PlaylistForm mode="deletePlaylist" />
    </GradientLayout>
  );
};

export default DeletePlaylist;
