import { useState } from "react";
import {
  TabContainer,
  BlocTabs,
  Tabs,
  Content,
  ContentTabs,
  Separator,
  Paragraph,
} from "./ScheduleTabs.styled";
import AvailabilityForm from "../WorkScheduleForm/AvailabilityForm";
import DaysOffForm from "../WorkScheduleForm/DaysOffForm";
import VacationForm from "../WorkScheduleForm/VacationForm";
import VacationDatesDisplay from "../WorkDatesDisplay/VacationDatesDisplay";
import DaysOffDatesDisplay from "../WorkDatesDisplay/DaysOffDatesDisplay";
import AvailabilityDatesDisplay from "../WorkDatesDisplay/AvailabilityDatesDisplay";
import Accordion from "../Accordion/Accordion";
import NurseNavBar from "../NavBar/NurseNavBar";

export default function ScheduleTabs({
  onVacationSubmit,
  onDaysOffSubmit,
  onAvailabilitySubmit,
  nurseId,
  nurseData,
  availabilityDates,
  daysOff,
  setDaysOff,
  excludeDates,
  absencesData,
  availabilityData,
  onAbsenceRemove,
  onAvailabilityRemove,
}) {
  const [activeTab, setActiveTab] = useState(1);

  function handleTabActive(index) {
    setActiveTab((prevTab) => (prevTab === index ? null : index));
  }

  return (
    <>
      <NurseNavBar nurseData={nurseData} />
      <TabContainer>
        <h3>Work Schedule</h3>
        <BlocTabs>
          <Tabs $isactive={activeTab === 1} onClick={() => handleTabActive(1)}>
            Vacations
          </Tabs>
          <Tabs $isactive={activeTab === 2} onClick={() => handleTabActive(2)}>
            Days-off
          </Tabs>
          <Tabs $isactive={activeTab === 3} onClick={() => handleTabActive(3)}>
            Availability
          </Tabs>
        </BlocTabs>

        <ContentTabs>
          <Content active={activeTab === 1 ? "true" : undefined}>
            <Separator />
            <Paragraph>
              Add or remove vacation dates for team members here.
            </Paragraph>
            <Accordion title="Set your Vacation">
              <VacationForm
                onVacationSubmit={onVacationSubmit}
                nurseId={nurseId}
                excludeDates={excludeDates}
                absencesData={absencesData}
              />
            </Accordion>
            <Separator />
            <Paragraph>
              Overview of upcoming vacations. Check for accuracy.
            </Paragraph>
            <Accordion title="Your Vacation">
              <VacationDatesDisplay
                absencesData={absencesData}
                onAbsenceRemove={onAbsenceRemove}
              />
            </Accordion>
          </Content>

          <Content active={activeTab === 2 ? "true" : undefined}>
            <Separator />
            <Paragraph>
              Log regular off-days for nurses. Adjust as needed.
            </Paragraph>
            <Accordion title="Set your Days-Off">
              <DaysOffForm
                absencesData={absencesData}
                onDaysOffSubmit={onDaysOffSubmit}
                daysOff={daysOff}
                setDaysOff={setDaysOff}
                excludeDates={excludeDates}
              />
            </Accordion>
            <Separator />
            <Paragraph>
              Summary of regular off-days. Update discrepancies.
            </Paragraph>
            <Accordion title="Your Days-Off">
              <DaysOffDatesDisplay
                absencesData={absencesData}
                onAbsenceRemove={onAbsenceRemove}
              />
            </Accordion>
          </Content>

          <Content active={activeTab === 3 ? "true" : undefined}>
            <Separator />
            <Paragraph>
              Indicate when each nurse can work, with a limit of 5 days.
            </Paragraph>
            <Accordion title="Set your Availability">
              <AvailabilityForm
                onAvailabilitySubmit={onAvailabilitySubmit}
                excludeDates={excludeDates}
              />
            </Accordion>
            <Separator />
            <Paragraph>Nurses availability. Ensure it is current.</Paragraph>
            <Accordion title="Your Availability">
              <AvailabilityDatesDisplay
                availabilityData={availabilityData}
                availabilityDates={availabilityDates}
                onAvailabilityRemove={onAvailabilityRemove}
              />{" "}
            </Accordion>
          </Content>
        </ContentTabs>
      </TabContainer>
    </>
  );
}
