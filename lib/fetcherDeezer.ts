/* eslint-disable prettier/prettier */
/* eslint-disable no-console */
//    helper para realizar los fetch solo para post y get
export default function fetcherDeezer(search: string, limit = 5) {
    const limitString = limit.toString();
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'deezerdevs-deezer.p.rapidapi.com',
            'X-RapidAPI-Key': 'ee6f7422cbmshee52f5c6d1f411bp1544c8jsncb84b59214b0'
        }
    };
    
    return fetch(`https://deezerdevs-deezer.p.rapidapi.com/search?q=${search}&limit=${limitString}`, options)
        .then(response => response.json())
        .then(response => response)
        .catch(err => console.error(err));
  }