/* eslint-disable prettier/prettier */
//  raiz de la app
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { StoreProvider } from "easy-peasy";
import PlayerLayout from "../components/playerLayout";

import "reset-css";
import "../styles/globals.css";
import { store } from "../lib/store";

//  no permitira realizar modificaciones de color a lo largo de todos los archivos hijo
const theme = extendTheme({
  colors: {
    gray: {
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  //  para que los componentes de la app tengan este estilo
  components: {
    Button: {
      variants: {
        link: {
          ":focus": {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
    },
  },
});

const MyApp = ({ Component, pageProps }) => {
  return (
    //  debemos envolver todo en chakra para que se aplique y podemas usarlo en toda la pagina
    <ChakraProvider theme={theme}>
      {/* Ademas debemos envolver todo con el store para lo mismo, es donde esta el reproductor  */}
      <StoreProvider store={store}>
        {/* Estas serán las paginas sin autenticación */}
        {Component.authPage ? (
          <Component {...pageProps} />
        ) : (
          //  y estas con auth
          <PlayerLayout>
            <Component {...pageProps} />
          </PlayerLayout>
        )}
      </StoreProvider>
    </ChakraProvider>
  );
};

export default MyApp;
