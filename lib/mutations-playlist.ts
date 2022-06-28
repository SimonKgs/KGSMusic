/* eslint-disable prettier/prettier */
//    otro helper para ayudarme con el fetcher en este caso para las mutaciones del playlist
//    obtendrá el mode y para ver que usar y lo enviará junto con el payload al luegar correspondiente
import fetchDelete from "./fetchDelete";
import fetcher from "./fetcher";

export const playlistMode = (
  mode: "createPlaylist" | "deletePlaylist",
  body: { name?: string; userId?: number; listId?: number }
) => {
  if (mode === "createPlaylist") {
    return fetcher(`/${mode}`, body);
  }
  // eslint-disable-next-line no-else-return
  else {
    return fetchDelete(`/${mode}`, body);
  }
};
