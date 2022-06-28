/* eslint-disable prettier/prettier */
//  el menu en la barra superior
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import {
  MdHome,
  MdSearch,
  MdPlaylistAdd,
  MdDelete,
  MdMenu,
  MdConstruction,
} from "react-icons/md";
import React from "react";
import { useRouter } from "next/router";
import { useMe, usePlaylist } from "../lib/hooks";

export const SidebarCollapse = () => {
  //  para la navegación
  const router = useRouter();
  //    para obtener las listas del usuario actual
  const { playlists } = usePlaylist();

  const { user } = useMe();
  
  let role;

  if ( user ){
    role = user.role;
  }
  

  return (
    <Menu>
      {/* Boton que abrira y cerrar el menú */}
      <MenuButton
        bg="black"
        color="white"
        as={Button}
        rightIcon={<MdMenu />}
        _hover={{ background: "white", color: "black" }}
        _active={{ background: "black", color: "white" }}
      >
        KGSMusic
      </MenuButton>
      {/* contenido del menú */}
      { !user?.error &&
      
      <MenuList
        bg="black"
        color="white"
        height="60vh"
        marginTop="-1vh"
        overflowY="auto"
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
        <MenuItem
          _hover={{ background: "white", color: "black" }}
          icon={<MdHome />}
          onClick={() => router.push("/")}
        >
          Inicio
        </MenuItem>
        <MenuItem
          _hover={{ background: "white", color: "black" }}
          icon={<MdSearch />}
          onClick={() => router.push("/search")}
        >
          Buscar
        </MenuItem>
        <MenuItem
          _hover={{ background: "white", color: "black" }}
          icon={<MdPlaylistAdd />}
          onClick={() => router.push("/playlist/create")}
        >
          Crear lista
        </MenuItem>
        <MenuItem
          _hover={{ background: "white", color: "black" }}
          icon={<MdDelete />}
          onClick={() => router.push("/playlist/delete")}
          marginBottom="3px"
        >
          Borrar lista
        </MenuItem>
        { (role === "admin") &&
          <MenuItem
            _hover={{ background: "white", color: "black" }}
            icon={<MdConstruction />}
            onClick={() => router.push("/admin")}
            marginBottom="3px"
          >
            Administrar
          </MenuItem>
        }
        <hr />
        {/* recorremos las listas del usuario para que se muestren en el menu */}
        { !playlists.error && playlists?.map((playlist) => (
          <MenuItem
            key={playlist.id}
            _hover={{ background: "white", color: "black" }}
            onClick={() => router.push(`/playlist/${playlist.id}`)}
          >
            {playlist.name}
          </MenuItem>
        ))}
      </MenuList>
}
    </Menu>
  );
};
