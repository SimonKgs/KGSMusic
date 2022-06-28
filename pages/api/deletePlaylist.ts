/* eslint-disable prettier/prettier */
//    endpoint para borrar listas de reproduccion
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //    id es único, con recibir eso borramos la lista correcta
  const { listId } = req.body;

  try {
    await prisma.playlist.delete({
      where: {
        id: listId,
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ error: "fallo borrando la lista" });
    return;
  }

  res.json(`lista ${listId} borrada con éxito`);
};
