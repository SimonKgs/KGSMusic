/* eslint-disable prettier/prettier */
//  sera la pagina de signin que se crea a partir del authForm
import AuthForm from "../components/authForm";

const Signin = () => {
  return <AuthForm mode="signin" />;
};
//  para que nos permita separar este contenido del la "rama" principal, y nos permita acceder sin auth
Signin.authPage = true;

export default Signin;
