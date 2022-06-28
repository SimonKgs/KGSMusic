/* eslint-disable prettier/prettier */
//    otro helper para ayudarme con el fetcher
//    fijara el modo y obtendra el payload, el email y el password ya sea de signin or signup
import fetcher from "./fetcher";


export const auth = (
  
  mode: "signin" | "signup",
  body: {
    email: string;
    password: string;
    firstName?: string;
    lastName?: string;
    role: string;
  }
) => {
  return fetcher(`/${mode}`, body);
};
