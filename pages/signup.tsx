/* eslint-disable prettier/prettier */
//  pantalla de signup
import AuthForm from "../components/authForm";

const Signup = () => {
  return <AuthForm mode="signup" />;
};

//  para acceder sin auth
Signup.authPage = true;

export default Signup;