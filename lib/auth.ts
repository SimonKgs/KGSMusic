/* eslint-disable prettier/prettier */

//    helper para comprobar si se esta autenticado
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "./prisma";

//    comprobamos el token del usuario, que se correcto y que corresponda al usuario
export const validateRoute = (handler) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    const { KGS_ACCESS_TOKEN: token } = req.cookies;

    if (token) {
      let user;

      try {
        const { id } = jwt.verify(token, "TOK33__11!!");
        user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new Error("No hay usuario");
        }
      } catch (error) {
        res.status(401);
        res.json({ error: "No autorizado" });
        return;
      }

      return handler(req, res, user);
    }

    res.status(401);
    res.json({ error: "No autorizado" });
  };
};

export const validateToken = (token) => {
  const user = jwt.verify(token, "TOK33__11!!");
  return user;
};
