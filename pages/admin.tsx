/* eslint-disable prettier/prettier */
//  pantalla de administracion

import { Flex, Text } from "@chakra-ui/layout";
import { AdminForm } from "../components/adminForm";
import GradientLayout from "../components/gradientLayout";
import { getBGColor } from "../lib/colors";
import { useMe } from "../lib/hooks";
import prisma from "../lib/prisma";

const Admin = ({ users }) => {
  const color = getBGColor();
  const { user } = useMe();
  

  return (
    //    personalizamos la cabecera
    <GradientLayout
      color={color}
      roundImage={false}
      title="Administrar"
      subtitle=""
      description="Si necesita borrar algún usuario haga click en su nombre"
      image=""
    >
      {/* E insertamos el componente con el cuerpo */}
      {/* por si algun usuario intentase acceder por barra de direcciones, si no es el admin mostramos el texto */}
      { user?.role === "admin" ? 
          <AdminForm users={users}/>
        :
        <Flex justify="center" alignItems="center" color="white">
            <Text>No hay nada aquí para ti usuario</Text>
        </Flex>
      }
    </GradientLayout>
  );
};

//  obtenemos todos los usaurios menos el admin y los mandamos a adminForm como props
export const getServerSideProps = async () => {
  const users = await prisma.user.findMany({
    where: {
      id: {
        not: 1
      }
    }
  });

  return {
    props: { users },
  };
};

export default Admin;
