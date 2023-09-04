import { useState, useEffect } from "react";
import {
  DashboardContainer,
  CalendarContainer,
} from "@/components/Dashboard/Dashboard.styled";
import HorizontalCalendar from "@/components/HorizontalCalendar/HorizontalCalendar";
import Profile from "@/components/Dashboard/ProfileDashboard";
import TeamStats from "@/components/Dashboard/TeamStats";
import ShiftDetails from "@/components/Dashboard/ShiftsDetails";

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [shifts, setShifts] = useState({
    morning: null,
    afternoon: null,
    night: null,
  });
  const [teamStats, setTeamStats] = useState({
    totalNurses: 0,
    availableNurses: 0,
    nursesOnVacation: 0,
  });

  useEffect(() => {
    fetch("/api/nurses")
      .then((response) => response.json())
      .then((data) => {
        const total = data.length;
        return { ...teamStats, totalNurses: total };
      })
      .then((stats) => {
        return fetch("/api/absences")
          .then((response) => response.json())
          .then((data) => {
            const vacationAbsences = data.filter(
              (absence) => absence.type === "VACATION"
            );
            return { ...stats, nursesOnVacation: vacationAbsences.length };
          });
      })
      .then((stats) => {
        return fetch("/api/availability")
          .then((response) => response.json())
          .then((data) => {
            const workingNurses = data.length;
            const available =
              stats.totalNurses - workingNurses - stats.nursesOnVacation;
            setTeamStats({ ...stats, availableNurses: available });
          });
      })
      .catch((error) => {
        console.error("Erro ao buscar estatísticas dos enfermeiros:", error);
      });
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetch(`/api/shifts?date=${selectedDate.toISOString()}`)
        .then((response) => response.json())
        .then((data) => {
          setShifts(data);
        });
    } else {
      setShifts({
        morning: null,
        afternoon: null,
        night: null,
      });
    }
  }, [selectedDate]);
  return (
    <DashboardContainer>
      <Profile />
      <TeamStats stats={teamStats} />
      <CalendarContainer>
        <HorizontalCalendar
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </CalendarContainer>
      <ShiftDetails shifts={shifts} />
    </DashboardContainer>
  );
}
