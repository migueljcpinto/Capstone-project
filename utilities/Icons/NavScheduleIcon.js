import styled, { keyframes } from "styled-components";
const hoverAnimation = keyframes`
0% {
    background-color: #70d2a9;
}
100% {
  background: rgba(250, 255, 0, 0.29);
}`;
export default function NavScheduleIcon() {
  const StyledScheduleIcon = styled.svg`
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
    <StyledScheduleIcon
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Nav Icons">
        <path
          id="Vector"
          d="M8.33337 10H16.3334"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_2"
          d="M3.33337 9.8C3.33337 8.11984 3.33337 7.27976 3.66035 6.63803C3.94797 6.07354 4.40691 5.6146 4.9714 5.32698C5.61313 5 6.45321 5 8.13337 5H16.5334C18.2136 5 19.0536 5 19.6954 5.32698C20.2599 5.6146 20.7188 6.07354 21.0064 6.63803C21.3334 7.27976 21.3334 8.11984 21.3334 9.8V16.2C21.3334 17.8802 21.3334 18.7202 21.0064 19.362C20.7188 19.9265 20.2599 20.3854 19.6954 20.673C19.0536 21 18.2136 21 16.5334 21H8.13337C6.45321 21 5.61313 21 4.9714 20.673C4.40691 20.3854 3.94797 19.9265 3.66035 19.362C3.33337 18.7202 3.33337 17.8802 3.33337 16.2V9.8Z"
          stroke="white"
          stroke-width="1.5"
        />
        <path
          id="Vector_3"
          d="M9.33337 7V3"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_4"
          d="M15.3334 7V3"
          stroke="white"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          id="Vector_5"
          d="M8.33337 16.0675H9.33895C9.51842 16.0675 9.60816 16.0675 9.68739 16.0402C9.75745 16.016 9.82127 15.9765 9.87422 15.9247C9.93409 15.866 9.97422 15.7858 10.0545 15.6252L10.8662 14.0018C11.165 13.4043 11.3143 13.1055 11.4919 13.0352C11.6458 12.9742 11.8198 12.9933 11.9568 13.0862C12.1149 13.1934 12.1959 13.5174 12.3579 14.1655L13.0573 16.963C13.2853 17.875 13.3993 18.331 13.5805 18.4372C13.7366 18.5288 13.9301 18.5288 14.0863 18.4372C14.2675 18.331 14.3815 17.875 14.6095 16.963L14.6819 16.6734C14.736 16.4568 14.7631 16.3485 14.8235 16.2678C14.8768 16.1966 14.9481 16.1409 15.0301 16.1065C15.123 16.0675 15.2347 16.0675 15.458 16.0675H17.3334"
          stroke="white"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </StyledScheduleIcon>
  );
}
