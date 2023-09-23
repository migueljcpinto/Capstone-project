import {
  ConstructionIcon,
  Container,
  Message,
  Title,
} from "./TeamSchedule.styled";

export default function TeamSchedule() {
  return (
    <Container>
      <Title>Team Schedule</Title>
      <Message>
        <ConstructionIcon>🚧</ConstructionIcon>
        This page is currently under construction. Please check back later!
      </Message>
    </Container>
  );
}
