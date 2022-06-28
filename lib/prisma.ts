/* eslint-disable prettier/prettier */

//    para no crear un prisma en cada ruta lo creamos aqui y lo importamos donde queramos usarlo
import { PrismaClient } from "@prisma/client";

export default new PrismaClient();
