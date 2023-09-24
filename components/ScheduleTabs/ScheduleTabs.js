import { useState } from "react";
import {
  ScheduleContainer,
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
  const [openAccordion, setOpenAccordion] = useState(null);

  function handleTabActive(index) {
    setActiveTab((prevTab) => (prevTab === index ? null : index));
  }

  function handleAccordionToggle(index) {
    setOpenAccordion((prevIndex) => (prevIndex === index ? null : index));
  }

  return (
    <ScheduleContainer>
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
              Add Vacations, at least two days in a row. For just one day,
              choose a day off!{" "}
            </Paragraph>
            <Accordion
              title="Set your Vacation"
              isOpen={openAccordion === 1}
              onToggle={() => handleAccordionToggle(1)}
            >
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
            <Accordion
              title="Your Vacation"
              isOpen={openAccordion === 2}
              onToggle={() => handleAccordionToggle(2)}
            >
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
            <Accordion
              title="Set your Days-Off"
              isOpen={openAccordion === 3}
              onToggle={() => handleAccordionToggle(3)}
            >
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
            <Accordion
              title="Your Days-Off"
              isOpen={openAccordion === 4}
              onToggle={() => handleAccordionToggle(4)}
            >
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
            <Accordion
              title="Set your Availability"
              isOpen={openAccordion === 5}
              onToggle={() => handleAccordionToggle(5)}
            >
              <AvailabilityForm
                onAvailabilitySubmit={onAvailabilitySubmit}
                excludeDates={excludeDates}
              />
            </Accordion>
            <Separator />
            <Paragraph>Nurses availability. Ensure it is current.</Paragraph>
            <Accordion
              title="Your Availability"
              isOpen={openAccordion === 6}
              onToggle={() => handleAccordionToggle(6)}
            >
              <AvailabilityDatesDisplay
                availabilityData={availabilityData}
                availabilityDates={availabilityDates}
                onAvailabilityRemove={onAvailabilityRemove}
              />{" "}
            </Accordion>
          </Content>
        </ContentTabs>
      </TabContainer>
    </ScheduleContainer>
  );
}
