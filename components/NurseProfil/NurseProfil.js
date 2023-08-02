import useSWR from "swr";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  DeleteButtonStyled,
  GoBackLinkStyled,
  StyledNurseProfil,
  UpdateButtonStyled,
} from "./NurseProfil.styled";

export default function NurseProfil() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(`/api/nurses/${id}`);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>Maybe he resigned without warning! 🤬</div>;
  }

  return (
    <>
      <StyledNurseProfil>
        <Image
          width={76.8}
          height={76.8}
          src={data.image}
          alt={`${data.name} Nurse Photo`}
        />
        <h2>{data.name} </h2>
        <h3>{data.role}</h3>
      </StyledNurseProfil>
      <GoBackLinkStyled href="/">Back to all</GoBackLinkStyled>
      <DeleteButtonStyled href="/" type="button">
        Delete
      </DeleteButtonStyled>
      <UpdateButtonStyled href="/" type="button">
        Update
      </UpdateButtonStyled>
    </>
  );
}
