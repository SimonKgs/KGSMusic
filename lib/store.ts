/* eslint-disable prettier/prettier */

//    En este archivo controlaremos las canciones que se estan reproduciendo
//    primero declaro los valores por defecto de los datos
//    despues las acciones
import { createStore, action } from "easy-peasy";

export const store = createStore({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action((state: any, payload) => {
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state: any, payload) => {
    state.activeSong = payload;
  }),
});