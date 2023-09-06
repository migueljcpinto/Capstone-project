import { useState, useEffect } from "react";
import { useRouter } from "next/router";
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
    morning: [],
    afternoon: [],
    night: [],
  });
  const [teamStats, setTeamStats] = useState({
    totalNurses: 0,
    availableNurses: 0,
    nursesOnVacation: 0,
  });
  const [error, setError] = useState(null);
  const router = useRouter();
  console.log("Shifts on component mount:", shifts);

  //The idea is to initiate all three API calls at the same time and, once they have all been completed, process the data.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nurseData, absenceData, availabilityData] = await Promise.all([
          fetch("/api/nurses").then((res) => {
            if (!res.ok) throw new Error("Failed to fetch nurses.");
            return res.json();
          }),
          fetch("/api/absences").then((res) => {
            if (!res.ok) throw new Error("Failed to fetch absences.");
            return res.json();
          }),
          fetch("/api/availability").then((res) => {
            if (!res.ok) throw new Error("Failed to fetch availability.");
            return res.json();
          }),
        ]);

        const totalNurses = nurseData.length;
        const vacationAbsences = absenceData.filter(
          (absence) => absence.type === "VACATION"
        );
        const workingNurses = availabilityData.length;
        const availableNurses =
          totalNurses - workingNurses - vacationAbsences.length;

        setTeamStats({
          totalNurses,
          availableNurses,
          nursesOnVacation: vacationAbsences.length,
        });
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (selectedDate) {
      fetch(`/api/shifts?date=${selectedDate.toISOString()}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch shifts.");
          }
          return response.json();
        })
        .then((data) => {
          setShifts({
            morning: data.morningShift || [],
            afternoon: data.afternoonShift || [],
            night: data.nightShift || [],
          });
        })
        .catch((error) => {
          console.error("Error fetching shifts:", error);
          setError(error.message);
        });
    } else {
      setShifts({
        morning: [],
        afternoon: [],
        night: [],
      });
    }
  }, [selectedDate]);

  function handleAddNurse(nurseId, shiftType) {
    fetch(`/api/shifts/${selectedDate.toISOString()}`, {
      method: "PUT",
      body: JSON.stringify({ nurseId, shiftType }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setShifts({
          morning: data.morningShift || [],
          afternoon: data.afternoonShift || [],
          night: data.nightShift || [],
        });
      })
      .catch((error) => {
        console.error("Error adding nurse:", error);
      });
  }

  function handleRemoveNurse(nurseId, shiftType) {
    fetch(`/api/shifts/${selectedDate.toISOString()}`, {
      method: "PUT",
      body: JSON.stringify({ nurseId, shiftType, action: "remove" }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setShifts({
          morning: data.morningShift || [],
          afternoon: data.afternoonShift || [],
          night: data.nightShift || [],
        });
      })
      .catch((error) => {
        console.error("Error removing nurse:", error);
      });
  }

  return (
    <DashboardContainer>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Profile />
      <TeamStats stats={teamStats} />
      <CalendarContainer>
        <HorizontalCalendar
          selectedDate={selectedDate}
          onDateChange={setSelectedDate}
        />
      </CalendarContainer>
      <ShiftDetails
        shifts={shifts}
        onAddNurseClick={handleAddNurse}
        onRemoveNurse={handleRemoveNurse}
      />

      <button onClick={() => router.push("/nurseteam")}>Team </button>
    </DashboardContainer>
  );
}
