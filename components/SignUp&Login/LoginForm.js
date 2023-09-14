import LogoGithub from "@/utilities/Icons/LogoGithub";
import {
  AuthButton,
  AuthInput,
  AuthSec,
  AuthText,
} from "./SignUp&Login.styled";

export default function LoginForm({ signIn, onGithubLogin }) {
  return (
    <AuthSec>
      <AuthText>Log in</AuthText>
      <AuthInput type="email" placeholder="Email" />
      <AuthInput type="password" placeholder="Password" />
      <AuthButton>Log in</AuthButton>
      <hr />
      <AuthButton onClick={onGithubLogin}>
        <LogoGithub />
        <br />
        Log in with GitHub
      </AuthButton>
    </AuthSec>
  );
}
