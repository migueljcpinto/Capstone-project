import React from "react";
import styled from "styled-components";

const AddIconSvg = styled(AddIcon)`
  display: inline-flex;
  align-items: flex-start;
  gap: 23.443px;
  border-radius: 77.714px;
  background: #5584ed;
  box-shadow: 0px 15.94141px 83.69239px -7.9707px rgba(0, 0, 0, 0.17);
`;

export default function AddIcon(props) {
  return (
    <AddIconSvg
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
    >
      <path
        d="M19.9268 39.8535H59.7803"
        stroke="white"
        stroke-width="5.86081"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M39.8535 59.7803V19.9268"
        stroke="white"
        stroke-width="5.86081"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </AddIconSvg>
  );
}
