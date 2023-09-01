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

export default function ScheduleTabs({
  onVacationSubmit,
  onDaysOffSubmit,
  onAvailabilitySubmit,
  nurseData,
  nurseId,
  absenceDates,
  availabilityDates,
  daysOff,
  setDaysOff,
  excludeDates,
  absencesData,
  availabilityData,
  onAbsenceRemove,
  onAvailabilityRemove,
}) {
  const [activeTab, setActiveTab] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  function handleTabActive(index) {
    if (activeTab === index) {
      setActiveTab(null); //From each Tab Index, close the tab if clicked twice
    } else {
      setActiveTab(index);
    }
  }

  return (
    <>
      <TabContainer>
        <h3>Work Schedule</h3>
        <BlocTabs>
          <Tabs
            isactive={activeTab === 1 ? "true" : undefined}
            onClick={() => handleTabActive(1)}
          >
            Vacations
          </Tabs>
          <Tabs
            isactive={activeTab === 2 ? "true" : undefined}
            onClick={() => handleTabActive(2)}
          >
            Days-off
          </Tabs>
          <Tabs
            isactive={activeTab === 3 ? "true" : undefined}
            onClick={() => handleTabActive(3)}
          >
            Availability
          </Tabs>
        </BlocTabs>

        <ContentTabs>
          <Content active={activeTab === 1 ? "true" : undefined}>
            <Separator />
            <Accordion title="Set your Vacation">
              <VacationForm
                onVacationSubmit={onVacationSubmit}
                nurseId={nurseId}
                excludeDates={excludeDates}
                absencesData={absencesData}
              />
            </Accordion>
            <Separator />
            <Accordion title="Your Vacation">
              <VacationDatesDisplay
                absencesData={absencesData}
                onAbsenceRemove={onAbsenceRemove}
              />
            </Accordion>
          </Content>

          <Content active={activeTab === 2 ? "true" : undefined}>
            <Separator />
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
            <Accordion title="Your Days-Off">
              <DaysOffDatesDisplay
                absencesData={absencesData}
                onAbsenceRemove={onAbsenceRemove}
              />
            </Accordion>
          </Content>

          <Content active={activeTab === 3 ? "true" : undefined}>
            <Separator />
            <Accordion title="Set your Availability">
              <AvailabilityForm
                onAvailabilitySubmit={onAvailabilitySubmit}
                excludeDates={excludeDates}
              />
            </Accordion>
            <Separator />
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
