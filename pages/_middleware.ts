/* eslint-disable prettier/prettier */
//    el middleware colocado aqui se ejecutara antes de acceder a cualquier ruta, en la capa de red
//    comprobara la auth y si no es valida sacamos al signin

import { NextResponse } from "next/server";

//  para que se ejecute siempre antes de acceder a una de estas paginas
const signedinPages = ["/", "/playlist", "/playlist/[id]", "/playlist/create", "/playlist/delete", "/search", "/admin"];

export default function middleware(req) {
  if (signedinPages.find((p) => p === req.nextUrl.pathname)) {
    const token = req.cookies.KGS_ACCESS_TOKEN;
    //  para sacar al usuario si no esta autenticado
    if (!token || token === "false") {
      return NextResponse.redirect("/signin");
    }
  } 

}
