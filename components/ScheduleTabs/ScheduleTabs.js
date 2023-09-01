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
import WorkDatesDisplay from "@/components/WorkDatesDisplay/WorkDatesDisplay";
import WorkScheduleForm from "@/components/WorkScheduleForm/WorkScheduleForm";

export default function ScheduleTabs() {
  const [activeTab, setActiveTab] = useState(null);

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

            <Separator />
          </Content>

          <Content active={activeTab === 2 ? "true" : undefined}>
            <Separator />

            <Separator />
            <Paragraph>Your Days-off:</Paragraph>
          </Content>

          <Content active={activeTab === 3 ? "true" : undefined}>
            <Separator />

            <Separator />
            <Paragraph>Your Availability:</Paragraph>
          </Content>
        </ContentTabs>
      </TabContainer>
    </>
  );
}
