import { TeamUp, TeamUpContainer } from "./TeamUpLogo.styled";

export default function TeamUpLogo() {
  return (
    <TeamUpContainer>
      <TeamUp src="/TeamUp.gif" alt="TeamUp App" width={200} height={200} />
      <br />
      <h1>TeamUp</h1>
    </TeamUpContainer>
  );
}
