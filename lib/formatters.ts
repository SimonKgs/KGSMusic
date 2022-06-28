/* eslint-disable prettier/prettier */

//    helper para formatear tanto las fechas y el tiempo a segundos
//    tras hacer cambios no uso el de las fechas pero lo mantengo
import formatDuration from "format-duration";

export const formatTime = (timeInSeconds = 0) => {
  return formatDuration(timeInSeconds * 1000); //
};

export const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
