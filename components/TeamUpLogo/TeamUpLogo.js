import Image from "next/image";
import { TeamUpContainer } from "./TeamUpLogo.styled";

export default function TeamUpLogo() {
  return (
    <TeamUpContainer>
      <Image src="/TeamUp.gif" alt="TeamUp App" width={180} height={180} />
      <br />
    </TeamUpContainer>
  );
}
