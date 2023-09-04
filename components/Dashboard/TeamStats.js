import {
  TeamOverview,
  OverviewItem,
  OverviewTopic,
  OverviewNumber,
} from "@/components/Dashboard/Dashboard.styled";

export default function TeamStats({ stats }) {
  return (
    <TeamOverview>
      <OverviewItem>
        <OverviewTopic>Total Nurses</OverviewTopic>{" "}
        <OverviewNumber>{stats.totalNurses}</OverviewNumber>
      </OverviewItem>
      <OverviewItem>
        <OverviewTopic>Available Nurses</OverviewTopic>{" "}
        <OverviewNumber>{stats.availableNurses}</OverviewNumber>
      </OverviewItem>
      <OverviewItem>
        <OverviewTopic>Nurses on Vacation</OverviewTopic>{" "}
        <OverviewNumber>{stats.nursesOnVacation}</OverviewNumber>
      </OverviewItem>
    </TeamOverview>
  );
}
