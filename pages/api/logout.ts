/* eslint-disable prettier/prettier */
//    endpoint para sacar al usuario, eliminara el token

import cookie from "cookie";
import { NextApiRequest, NextApiResponse } from "next";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  //  si no llegase como post en vercel dará fallo, no nos permite borrar directamente
  if (req.method !== "POST")
    return res
      .status(405)
      .json({ status: "Fallo", message: "Metodo no permitido" });
  //  con lo que tendremos que modificar el token con un valor no valido, como false
  try {
    res.setHeader("Set-Cookie", [
      cookie.serialize("KGS_ACCESS_TOKEN", "false", {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: true,
        maxAge: 5,
        path: "/",
      }),
    ]);

    return res.status(200).json({ auth: false });
  } catch {
    return res
      .status(400)
      .json({ status: "Fallo", message: "petición incorrecta" });
  }
};

//  Modo dev funcionaba así, lo dejo como ejemplo, pero en vercel tiene que ser como arriba
// try{
//     res.setHeader('Set-Cookie', 'KGS_ACCESS_TOKEN=deleted; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT');
//     res.send({});
// } catch(e) {
//     res.json("There is no cookies");
// }
// }
