/* eslint-disable prettier/prettier */
//    endpoint para crear nuevas playlists
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //    necesitamos un nombre para la lista y un usuario que es el propietario
  const { name, userId } = req.body;

  let playlist;

  try {
    //    creamos la nueva lista para el usuario
    playlist = await prisma.playlist.create({
      data: {
        name,
        userId,
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ error: "fallo creando la lista" });
    return;
  }

  res.json(playlist);
};
