/* eslint-disable prettier/prettier */
//    para entrar una vez registrado
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //    necesitamos el email y el password
  const { email, password } = req.body;

  //    Buscamos el email
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  //    si no existe salimos
  if (!user) {
    res.json("el usario no éxiste");
    return;
  }
  //    si existe comparamos el password contra el password del user encriptado con bcryp
  if (user && bcrypt.compareSync(password, user.password)) {
    //    si pasa creamos un token para el usuario
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        time: Date.now(),
      },
      "TOK33__11!!",
      {
        expiresIn: "8h",
      }
    );
    //    y lo guardamos en la cookie
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("KGS_ACCESS_TOKEN", token, {
        httpOnly: true,
        maxAge: 8 * 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
      })
    );
    res.json(user);
  } else {
    res.status(401);
    res.json({ error: "Email o password incorrecto" });
  }
};
