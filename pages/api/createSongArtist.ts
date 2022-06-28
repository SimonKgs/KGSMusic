/* eslint-disable prettier/prettier */
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //    debo comprobar si existe, y construirlo si no, tanto el artista como la canción
  const song = req.body;

  let songCreated;

  try {
    //    obtengo el artista
    const existsArtist = await prisma.artist.findUnique({
      where: {
        name: song.artist.name,
      },
    });

    //    si no existe lo creo
    if (existsArtist === null) {
      await prisma.artist.create({
        data: {
          name: song.artist.name,
        },
      });
    }

    //    ahora que ya existe el artista compruebo si ese artista tiene ya la cancion
    const existsSong = await prisma.song.findFirst({
      where: {
        name: song.name,
      },
    });

    //    si no existe la creamos
    if (existsSong === null) {
      songCreated = await prisma.song.create({
        data: {
          duration: song.duration,
          name: song.name,
          url: song.url,
          artist: {
            connect: {
              name: song.artist.name,
            },
          },
        },
      });
    } else {
      //    si ya existe devuelvo el la song existente
      res.status(200);
      return res.json({ existsSong });
    }
  } catch (e) {
    res.status(401);
    res.json({ error: "fallo obteniendo la canción" });
    return;
  }
  res.status(200);
  res.json({ songCreated });
  //   res.json({existsArtist, existsSong, songCreated});
};
