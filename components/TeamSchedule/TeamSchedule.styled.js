import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
  padding: 20px;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 20px;
`;

export const Message = styled.p`
  font-size: 1.2rem;
  color: #666;
`;

export const ConstructionIcon = styled.span`
  font-size: 2rem;
  margin-right: 10px;
`;
