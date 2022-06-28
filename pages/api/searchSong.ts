/* eslint-disable prettier/prettier */
//    endpoint para realizar las busquedas de cancion
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //    recibimos un nombre o un caracter, y devolvemos todas las canciones que lo tengan
  const { songName } = req.body;

  let songsLikeSongName;

  try {
    songsLikeSongName = await prisma.song.findMany({
      where: {
        name: {
          contains: songName,
          mode: "insensitive",
        },
      },
      include: {
        artist: {
          select: {
            name: true,
          },
        },
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ error: "fallo buscando las canciones" });
    return;
  }
  res.json(songsLikeSongName);
};
