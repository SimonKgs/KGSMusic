/* eslint-disable prettier/prettier */
//    endpoint para borrar listas de reproduccion
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //    id es único, con recibir eso borramos la lista correcta
  const { id } = req.body;
    
  let users;
  try {
    await prisma.user.delete({
      where: {
        id,
      },
    });

    users = await prisma.user.findMany({});
    
  } catch (e) {
    res.status(401);
    res.json({ error: "fallo eliminando al usuario" });
    return;
  }

  res.json({users});
};
