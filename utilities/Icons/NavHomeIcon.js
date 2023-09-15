import styled from "styled-components";

export default function NavHomeIcon({ isActive }) {
  const StyledHomeIcon = styled.svg`
    width: 76px;
    height: 50px;
    padding: 10px;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
    border-radius: 16px;
  `;

  return (
    <StyledHomeIcon
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      isActive={isActive}
    >
      <g id="Nav Icons">
        <path
          id="Vector"
          d="M3 11.5689C3 10.6296 3 10.16 3.12945 9.73377C3.24406 9.3564 3.43194 9.00534 3.68236 8.70065C3.96523 8.35649 4.35597 8.096 5.13744 7.57502L9.33744 4.77502C10.2997 4.1335 10.7808 3.81275 11.3009 3.68813C11.7605 3.578 12.2395 3.578 12.6991 3.68813C13.2192 3.81275 13.7003 4.1335 14.6626 4.77502L18.8626 7.57502C19.644 8.096 20.0348 8.35649 20.3176 8.70065C20.5681 9.00534 20.7559 9.3564 20.8705 9.73377C21 10.16 21 10.6296 21 11.5689V16.2C21 17.8801 21 18.7202 20.673 19.3619C20.3854 19.9264 19.9265 20.3854 19.362 20.673C18.7202 21 17.8802 21 16.2 21H7.8C6.11984 21 5.27976 21 4.63803 20.673C4.07354 20.3854 3.6146 19.9264 3.32698 19.3619C3 18.7202 3 17.8801 3 16.2V11.5689Z"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          id="Vector_2"
          d="M9 15C9 13.3431 10.3431 12 12 12C13.6569 12 15 13.3431 15 15V21H9V15Z"
          stroke="white"
          strokeWidth="1.5"
        />
      </g>
    </StyledHomeIcon>
  );
}
