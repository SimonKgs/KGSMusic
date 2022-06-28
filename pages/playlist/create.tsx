/* eslint-disable prettier/prettier */
//  pantalla para crear las listas
import GradientLayout from "../../components/gradientLayout";
import PlaylistForm from "../../components/playlistForm";
import { getBGColor } from "../../lib/colors";

const CreatePlaylist = () => {
  const color = getBGColor();
  return (
    //  pasamos los datos necesarios al gradient para la cabecera
    <GradientLayout
      color={color}
      roundImage={false}
      title="Nueva lista"
      subtitle="Escriba el nombre para crear una lista"
      description=""
      image={`https://picsum.photos/400?random=${Math.floor(Math.random())}`}
    >
      {/* Y el modo al playlistform para la forma del cuerpo */}
      <PlaylistForm mode="createPlaylist" />
    </GradientLayout>
  );
};

export default CreatePlaylist;
