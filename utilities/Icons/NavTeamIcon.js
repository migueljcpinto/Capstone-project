import styled from "styled-components";
export default function NavTeamIcon() {
  const StyledTeamIcon = styled.svg`
    display: flex;
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
    <StyledTeamIcon
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Nav Icons">
        <path
          id="Vector"
          d="M12.6667 3.53513C13.2408 3.21655 13.9636 3 14.6667 3C16.8758 3 18.6667 4.79086 18.6667 7C18.6667 9.20914 16.8758 11 14.6667 11C13.9381 11 13.255 10.8052 12.6667 10.4649M12.6667 10.4649C13.8623 9.77325 14.6667 8.48056 14.6667 7C14.6667 4.79086 12.8758 3 10.6667 3C8.45761 3 6.66675 4.79086 6.66675 7C6.66675 9.20914 8.45761 11 10.6667 11C11.3953 11 12.0784 10.8052 12.6667 10.4649Z"
          stroke="white"
          strokeWidth="1.5"
        />
        <path
          id="Vector_2"
          d="M12.6668 14.2899C13.3005 14.1013 13.9718 14 14.6668 14C17.4946 14 19.9307 15.6768 21.0352 18.0903C21.7246 19.5969 20.3236 21 18.6668 21H7.66672M4.29822 18.0903C5.40272 15.6768 7.8389 14 10.6667 14C13.4946 14 15.9308 15.6768 17.0353 18.0903C17.7247 19.5969 16.3236 21 14.6668 21H6.66672C5.00986 21 3.60876 19.5969 4.29822 18.0903Z"
          stroke="white"
          strokeWidth="1.5"
        />
      </g>
    </StyledTeamIcon>
  );
}
