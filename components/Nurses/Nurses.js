import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import { NurseCard } from "./NurseTeam.styled";
import { StyledLink } from "../Link/Link.styled";

export default function Nurses() {
  const router = useRouter();
  const { id } = router.query;

  const { data, isLoading } = useSWR(`/api/nurses/${id}`);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!data) {
    return <h1>Data not found</h1>; // or any other appropriate message
  }

  return (
    <NurseCard>
      <small>ID: {id}</small>
      <h1>{data.firstName}</h1>
      <Link href="/">Back to all</Link>
    </NurseCard>
  );
}
