/* eslint-disable prettier/prettier */
//    endpoint para agregar canciones a lista
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //    necesito el id de la playlist y el id de la cancion, para agregarala a la playlist que corresponda
  const { playlistId, songId } = req.body;

  try {
    //    obtengo las playlists de las que forma parte la canción
    const song = await prisma.song.findUnique({
      select: {
        playlists: true,
      },
      where: {
        id: +songId,
      },
    });
    //    obtengo de las playlists todos sus ids en formato id: id
    const songPlaylistsIds = song.playlists.map((playlist) => ({
      id: playlist.id,
    }));
    //    ahora creo un nuevo arreglo con lo obtenido, mas lo que quiero agregar
    const playlists = [...songPlaylistsIds, { id: playlistId }];

    //    recorro el arreglo creado, playlist, y esos serán los nuevos valores que almacenara song.playlists
    await prisma.song.update({
      where: { id: +songId },
      data: {
        playlists: {
          set: playlists.map((playlistSong) => ({ ...playlistSong })),
        },
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ error: "fallo creando la lista" });
    return;
  }
  res.status(200);
  res.json(`se ha agregado la canción ${songId} a la playlist ${playlistId} `);
};
