/* eslint-disable prettier/prettier */

//   para sacar el numero de listas del usuario actual
import { validateRoute } from "../../lib/auth";
import prisma from "../../lib/prisma";

//    se recibirá como handler en /lib/auth
export default validateRoute(async (req, res, user) => {
  const playlistsCount = await prisma.playlist.count({
    where: {
      userId: user.id,
    },
  });

  res.json({ ...user, playlistsCount });
});
