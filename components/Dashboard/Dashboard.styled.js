import styled from "styled-components";
import Image from "next/image";
import Accordion from "../Accordion/Accordion";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0px 0px;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 20px;
`;

export const Welcome = styled.p`
  color: #838aa3;
  margin-left: 5px;
`;

export const ProfileName = styled.p`
  color: #414247;
`;

export const ProfileImage = styled(Image)`
  border-radius: 99.5px;
  margin-right: 10px;
  border: 2px solid grey;
`;

export const SVGSeach = styled.svg`
  width: 18.735px;
  height: 18.667px;
  cursor: pointer;
`;

export const TeamOverview = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

export const OverviewItem = styled.div`
  display: flex;
  width: 98px;
  height: 78px;
  padding: 5px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 2px;
  border-radius: 12px;
  background: var(--grayscale-100-white, #fff);
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

export const OverviewTopic = styled.h4`
  font-size: 13px;
  text-align: center;
  margin: 4px;
`;

export const OverviewNumber = styled.h5`
  font-size: 13px;
  margin: 4px;
`;

export const CalendarContainer = styled.section`
  display: flex;
  width: 354px;
  height: 101px;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  border: 2px solid #fafafc;
  border-radius: 18px;
  margin-top: 30px;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const ShiftsContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 354px;
`;

export const ShiftBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 340px;
  border-radius: 0 0 12px 12px;
  padding-bottom: 16px;
  line-height: 1.6;
`;

export const MorningShiftAccordion = styled(Accordion)`
  background: #fbf2ef;
  display: flex;
  align-items: center;
  width: 354px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 12px;
  gap: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  span {
    display: block;
    font-size: 14px;
    color: darkgray;
    margin-top: 5px;
  }
`;

export const AfternoonShiftAccordion = styled(Accordion)`
  background: #eff2f8;
  display: flex;
  align-items: center;
  width: 354px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 12px;
  gap: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  span {
    display: block;
    font-size: 14px;
    color: darkgray;
    margin-top: 5px;
  }
`;

export const NightShiftAccordion = styled(Accordion)`
  background: #fbf2ef;
  display: flex;
  align-items: center;
  width: 354px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 12px;
  gap: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  span {
    display: block;
    font-size: 14px;
    color: darkgray;
    margin-top: 5px;
  }
`;

export const Slot = styled.div`
  display: flex;
  flex-direction: rown;
  width: 330px;
  padding: 6px 12px 6px 6px;
  justify-content: space-around;
  align-items: center;
  border-radius: 18px;
  background: rgba(17, 179, 207, 0.05);
  margin: 6px;
`;

export const NurseImage = styled(Image)`
  border-radius: 42px;
  background: url(<path-to-image>), lightgray 50% / cover no-repeat;
`;
