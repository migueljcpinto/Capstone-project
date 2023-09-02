import styled from "styled-components";

export const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #fcfafb;
  width: 500px;
  padding: 40px 60px;
  border-radius: 10px;
`;

export const BlocTabs = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
`;

export const Tabs = styled.div`
  cursor: pointer;
  padding: 10px;
  border-radius: 7px;
  background-color: ${({ isactive }) => (isactive ? "#fff4e6" : "white")};
  border-bottom: ${({ isactive }) =>
    isactive ? "1px solid #222" : "1px solid transparent"};
`;

export const ContentTabs = styled.div`
  flex-grow: 1;
`;

export const Content = styled.div`
  background: #fcfafb;
  padding: 25px;
  width: 400px;
  display: ${({ active }) => (active ? "block" : "none")};
`;

export const Separator = styled.hr`
  width: 100px;
  height: 2px;
  background: #222;
  margin-bottom: 5px;
`;
export const Paragraph = styled.p`
  font-size: 14px;
  color: #483d8b;
  margin-top: 5px;
`;
