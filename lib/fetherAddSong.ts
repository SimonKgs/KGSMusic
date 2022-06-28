/* eslint-disable prettier/prettier */

//    Se  ha creado este fetcher a parte para evitar un error que daba el de las mutaciones
//    cuando se agregaba la canción, con este es todo correcto
export default function fetcherAddSong(songId: number, playlistId: number) {
    return fetch(`${window.location.origin}/api/addSongToPlaylist`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({songId, playlistId}),
    })
  }