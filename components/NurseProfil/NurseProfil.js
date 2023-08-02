import useSWR from "swr";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";

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
      <Image
        width={76.8}
        height={76.8}
        src={data.image}
        alt={`${data.name} Nurse Photo`}
      />
      <h1>{data.name} </h1>
      <Link href="/">Back to all</Link>
    </>
  );
}
