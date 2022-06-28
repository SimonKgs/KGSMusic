/* eslint-disable prettier/prettier */

//    endpoint para borrar canciones de una lista
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //    para borrar una cancion de una lista es similar a agregarla
  //    necesitaremos el id de la lista y el id de la canción
  const { playlistId, songId } = req.body;

  let songPlaylistsIds;

  try {
    //    obtenemos todas las canciones de la misma
    const song = await prisma.song.findUnique({
      select: {
        playlists: true,
      },
      where: {
        id: +songId,
      },
    });
    //    obtenemos un nuevo arreglo donde no este esa canción
    songPlaylistsIds = song.playlists.filter(
      (playlist) => playlist.id !== playlistId
    );
    //    cuando la hayamos sacado creamos la carga id: id
    songPlaylistsIds = songPlaylistsIds.map((playlist) => ({
      id: playlist.id,
    }));

    //    introducimos todas las canciones de nuevo quedando eliminada la cancion con el id songId
    await prisma.song.update({
      where: { id: +songId },
      data: {
        playlists: {
          set: songPlaylistsIds.map((playlistSong) => ({ ...playlistSong })),
        },
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ error: "fallo eliminado la canción" });
    return;
  }
  res.json(
    `se ha eliminado la canción ${songId} de la playlist ${playlistId} `
  );
};
