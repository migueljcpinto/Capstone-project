import React, { useEffect } from "react";
import { LoadingLineHigh, LoadingLineLow } from "./LoaderLine.styled";

export default function LoaderLine() {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.reload(); // refresh the page
    }, 5000); // after 5 sec.

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LoadingLineLow />
      <LoadingLineHigh />
    </>
  );
}
