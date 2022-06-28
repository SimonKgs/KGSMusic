/* eslint-disable prettier/prettier */
//    hooks personalizados para obtener el usuario y las playlist del usuario
import useSWR from "swr";
import fetcher from "./fetcher";

//    para obtener el usuario
export const useMe = () => {
  const { data, error } = useSWR("/me", fetcher);
  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};
//    para obtener las listas del usuario
export const usePlaylist = () => {
  const { data, error } = useSWR("/playlist", fetcher);

  return {
    playlists: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  };
};