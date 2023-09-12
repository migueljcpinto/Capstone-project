import styled, { keyframes } from "styled-components";
const hoverAnimation = keyframes`
0% {
    background-color: #70d2a9;
}
100% {
    background: rgba(250, 255, 0, 0.29);
}`;
export default function NavProfileIcon() {
  const StyledProfileIcon = styled.svg`
    display: flex;
    width: 76px;
    height: 50px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 16px;
    &:hover {
      animation: ${hoverAnimation} 0.3s forwards;
    }
  `;
  return (
    <StyledProfileIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Nav Icons">
        <path
          id="Vector"
          d="M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
          stroke="white"
          stroke-width="1.5"
        />
        <path
          id="Vector_2"
          d="M12 14C9.17215 14 6.73597 15.6768 5.63147 18.0903C4.94201 19.5969 6.34311 21 7.99997 21H16C17.6568 21 19.0579 19.5969 18.3685 18.0903C17.264 15.6768 14.8278 14 12 14Z"
          stroke="white"
          stroke-width="1.5"
        />
      </g>
    </StyledProfileIcon>
  );
}
