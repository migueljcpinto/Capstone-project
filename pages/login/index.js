import LoginForm from "@/components/SignUp&Login/LoginForm";
import { AuthContainer } from "@/components/SignUp&Login/SignUp&Login.styled";
import { signIn, signOut } from "next-auth/react";

export default function LoginPage() {
  async function handleGithubLogin() {
    signIn();
  }

  return (
    <AuthContainer>
      <LoginForm signIn={signIn} onGithubLogin={handleGithubLogin} />
    </AuthContainer>
  );
}
