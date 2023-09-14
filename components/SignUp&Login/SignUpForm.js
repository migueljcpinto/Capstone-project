import Link from "next/link";
import {
  EnjoyText,
  AuthButton,
  AuthInput,
  AuthSec,
  AuthText,
} from "./SignUp&Login.styled";

export default function SignUpForm({}) {
  return (
    <AuthSec>
      <AuthText>Create An Account</AuthText>
      <EnjoyText>
        Create an account to enjoy managing your dream team!
      </EnjoyText>
      <label htmlFor="username"></label>
      <AuthInput
        type="text"
        id="username"
        /*           value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })} */
        placeholder="username"
      />

      <label htmlFor="email"></label>
      <AuthInput
        id="email"
        type="text"
        /*           value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })} */
        placeholder="email"
      />

      <label htmlFor="password"></label>
      <AuthInput
        id="password"
        type="password"
        /*           value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })} */
        placeholder="password"
      />
      <AuthButton>Create Accont</AuthButton>
      <EnjoyText>
        Already Have An Account? <Link href={"/login"}> Sign In </Link>
      </EnjoyText>
    </AuthSec>
  );
}
