/* eslint-disable prettier/prettier */
/* eslint-disable no-else-return */
/* eslint-disable no-console */
//  este componente seran las paginas de signin and signup

import { Box, Flex, Input, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { auth } from "../lib/mutations";

//  dependiendo de a que página se acceda escogera unas opciones o otras
const AuthForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  //  controlo los estados de los formularios
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  //  para controlar la carga
  const [isLoading, setIsLoading] = useState(false);
  //  para la navegación
  const router = useRouter();

  // para prohibir nav con backbutton?
  useEffect(() => {
    const url = router.pathname;
    // console.log(url);
    window.history.pushState({}, "", url);
    window.history.replaceState({}, '', url);

  }, [router.pathname, router]);

  const role = "user";
  //  maneja el envio del formulario en función al modo
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      //  para el signin, llama a /lib/auth
      if (mode === "signin") {
        await auth(mode, { email, password, role });
      }
      //  para el signup, si llega hasta el final llama a /lib/auth
      else {
        if (firstName.length > 10 || lastName.length > 10) {
          setIsLoading(false);
          Swal.fire({
            title: "Nombre o apellido incorrecto",
            text: "Máximo 10 caracteres",
            timer: 2000,
          });
          return;
        } else if (password.length < 8) {
          setIsLoading(false);
          Swal.fire({
            title: "Password no valido",
            text: "Debe tener al menos 8 caracteres",
            timer: 2000,
          });
          return;
        }

        await auth(mode, { firstName, lastName, email, password, role });
      }
    } catch (error) {
      //      controla el error
      setIsLoading(false);
      Swal.fire({
        title: "error",
        text: "el usuario o el password es incorrecto",
        timer: 2000,
      });
      return;
    }
    setIsLoading(false);
    //  si todo fue bien llevamos al usuario al home
    router.push("/");
  };

  return (
    //  aquí se crean ambas pantallas de manera condicional
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <h1 color="white">KGSMusic</h1>
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box padding="50px" bg="gray.900" borderRadius="6px">
          <form onSubmit={handleSubmit}>
            {/* Si estamos en el signup, para registrarse necesitamos 2 campos mas el nombre y el apellido */}
            {mode === "signup" && (
              <>
                <Input
                  placeholder="Tu nombre"
                  type="text"
                  autoComplete="off"
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
                <Input
                  placeholder="Tu apellido"
                  type="text"
                  autoComplete="off"
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </>
            )}
            {/* Los demas campos se comparten en las 2 pantallas con lo que los reutilizo */}
            <Input
              placeholder="Tu correo"
              type="email"
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              placeholder="Tu password"
              type="password"
              autoComplete="off"
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <Button
              marginTop="10px"
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                "&:hover": {
                  bg: "green.400",
                },
              }}
            >
              {mode}
            </Button>
          </form>
          {/* Esto servirá para cambiar entre las dos pantallas de manera condicional y cambiando el mensaje */}
          <Box marginTop="10px">
            <a href={`/${mode === "signin" ? "signup" : "signin"}`}>
              {mode === "signin"
                ? "¿Aún no tienes una cuenta? Pulsa aquí"
                : "¿Ya tienes una cuenta? Pulsa aquí"}
            </a>
          </Box>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
