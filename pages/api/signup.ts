/* eslint-disable prettier/prettier */
//    sera la ruta para unirse a la app
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //    para encriptar el password
  const salt = bcrypt.genSaltSync();
  //    para crear al usuario necesitaremos estos datos
  const { email, password, firstName, lastName, role } = req.body;

  let user;

  //    creamos el usuario encriptando el password y almacenandolo en la db
  try {
    user = await prisma.user.create({
      data: {
        email,
        password: bcrypt.hashSync(password, salt),
        firstName,
        lastName,
        role,
      },
    });
  } catch (e) {
    res.status(401);
    res.json({ error: "El usuario ya éxiste" });
    return;
  }
  //    si se crea bien, generamos el token y lo guardamos en la cookie
  const token = jwt.sign(
    {
      email: user.email,
      id: user.id,
      time: Date.now(),
    },
    "TOK33__11!!",
    { expiresIn: "8h" }
  );
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
};
