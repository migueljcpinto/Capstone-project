import styled from "styled-components";

export default function NavHomeIcon({ isActive }) {
  const StyledHomeIcon = styled.svg`
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 16px;
  `;

  return (
    <StyledHomeIcon
      xmlns="http://www.w3.org/2000/svg"
      width="55"
      height="55"
      fill="#fcfcfc"
      viewBox="0 0 256 256"
    >
      <path
        d="M216,115.54V208a8,8,0,0,1-8,8H160a8,8,0,0,1-8-8V160a8,8,0,0,0-8-8H112a8,8,0,0,0-8,8v48a8,8,0,0,1-8,8H48a8,8,0,0,1-8-8V115.54a8,8,0,0,1,2.62-5.92l80-75.54a8,8,0,0,1,10.77,0l80,75.54A8,8,0,0,1,216,115.54Z"
        opacity="0.2"
      ></path>
      <path d="M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z"></path>
    </StyledHomeIcon>
  );
}
