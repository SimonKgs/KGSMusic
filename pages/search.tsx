/* eslint-disable prettier/prettier */
//  pantalla de las busquedas
import GradientLayout from "../components/gradientLayout";
import { SearchForm } from "../components/searchForm";
import { getBGColor } from "../lib/colors";

const Search = () => {
  const color = getBGColor();

  return (
    //    personalizamos la cabecera
    <GradientLayout
      color={color}
      roundImage={false}
      title="Buscar"
      subtitle=""
      description=""
      image=""
    >
      {/* E insertamos el componente con el cuerpo */}
      <SearchForm />
    </GradientLayout>
  );
};

export default Search;
