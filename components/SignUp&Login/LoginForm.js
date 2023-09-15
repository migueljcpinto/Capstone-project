import LogoGithub from "@/utilities/Icons/LogoGithub";
import Link from "next/link";
import { useState } from "react";
import {
  AuthButton,
  AuthInput,
  AuthSec,
  AuthText,
  EnjoyText,
  ErrorMessage,
} from "./SignUp&Login.styled";

export default function LoginForm({ onGithubLogin, onSubmit, errorMessage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleFormSubmit(event) {
    event.preventDefault();
    onSubmit({ name, email, password });
  }

  return (
    <AuthSec>
      <AuthText>Log in</AuthText>
      <form onSubmit={handleFormSubmit}>
        <AuthInput
          type="text"
          placeholder=" Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <AuthInput
          type="email"
          placeholder=" Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput
          type="password"
          placeholder=" Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <AuthButton type="submit">Log in</AuthButton>
      </form>

      <hr />
      <AuthButton onClick={onGithubLogin}>
        <LogoGithub />
        <br />
        Log in with GitHub
      </AuthButton>
      <br />
      <EnjoyText>
        Do you want to create an account? <Link href="/signup">Sign Up</Link>
      </EnjoyText>
    </AuthSec>
  );
}
