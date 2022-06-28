/* eslint-disable prettier/prettier */
//    maneja la conexion a la db y la semilla inicial
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { artistsData } from "./songsData";

const prisma = new PrismaClient();

const run = async () => {
  //    crea o actuliza el artista
  await Promise.all(
    artistsData.map(async (artist) => {
      return prisma.artist.upsert({
        where: { name: artist.name },
        update: {},
        create: {
          name: artist.name,
          songs: {
            create: artist.songs.map((song) => ({
              name: song.name,
              duration: song.duration,
              url: song.url,
            })),
          },
        },
      });
    })
  );
  // para encriptar el pass del usuario
  const salt = bcrypt.genSaltSync();
  // crea o actualiza el usuario
  const user = await prisma.user.upsert({
    where: { email: "simon@admin.adm" },
    update: {},
    create: {
      email: "simon@admin.adm",
      password: bcrypt.hashSync("!!KGsim33_?!d", salt),
      firstName: "Simon",
      lastName: "Quiros",
      role: "admin",
    },
  });
  //    par la inicial simulamos la inserccion de 10 listas que se llamaran Playlist X
  const songs = await prisma.song.findMany({});
  await Promise.all(
    new Array(10).fill(1).map(async (_, i) => {
      return prisma.playlist.create({
        data: {
          name: `Playlist #${i + 1}`,
          user: {
            connect: { id: user.id },
          },
          songs: {
            connect: songs.map((song) => ({
              id: song.id,
            })),
          },
        },
      });
    })
  );
};
run()
  .catch(() => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
