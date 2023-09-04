import styled from "styled-components";
import Image from "next/image";
import { Datepicker } from "@meinefinsternis/react-horizontal-date-picker";

export const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;
`;

export const Welcome = styled.p`
  color: #838aa3;
  margin-left: 10px;
`;

export const ProfileName = styled.p`
  margin-left: 10px;
  color: #414247;
`;

export const ProfileImage = styled(Image)`
  border-radius: 99.5px;
  margin-right: 10px;
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
  padding: 12px;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
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

const ShiftBox = styled.div`
  display: flex;
  align-items: center;
  width: 354px;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 12px;
  gap: 20px;
`;

export const MorningShiftBox = styled(ShiftBox)`
  background: #fbf2ef;
`;

export const AfternoonShiftBox = styled(ShiftBox)`
  background: #eff2f8;
`;

export const NightShiftBox = styled(ShiftBox)`
  background: #fbf2ef;
`;
