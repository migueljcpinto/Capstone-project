import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { mutate } from "swr";
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
    morningShift: [],
    afternoonShift: [],
    nightShift: [],
  });

  const [teamStats, setTeamStats] = useState({
    totalNurses: 0,
    availableNurses: 0,
    nursesOnVacation: 0,
  });
  const [error, setError] = useState(null);

  const router = useRouter();

  //The idea is to initiate all three API calls at the same time and, once they have all been completed, process the data.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [nurseData, absenceData, availabilityData] = await Promise.all([
          fetch("/api/nurses").then((response) => {
            if (!response.ok) throw new Error("Failed to fetch nurses.");
            return response.json();
          }),
          fetch("/api/absences").then((response) => {
            if (!response.ok) throw new Error("Failed to fetch absences.");
            return response.json();
          }),
          fetch("/api/availability").then((response) => {
            if (!response.ok) throw new Error("Failed to fetch availability.");
            return response.json();
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
          console.log("API response:", response);

          if (!response.ok) {
            throw new Error("Failed to fetch shifts.");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Shift data received:", data);

          setShifts({
            morningShift: data.morningShift || [],
            afternoonShift: data.afternoonShift || [],
            nightShift: data.nightShift || [],
          });
        })
        .catch((error) => {
          console.error("Error fetching shifts:", error);
          setError(error.message);
        });
    } else {
      console.log("No selected date.");

      setShifts({
        morningShift: [],
        afternoonShift: [],
        nightShift: [],
      });
    }
  }, [selectedDate]);

  function handleAddNurse(nurseId, shiftType) {
    console.log("Adding nurse with ID:", nurseId, "to shift type:", shiftType);
    if (!selectedDate) {
      console.error("Selected date is null or undefined.");
      return;
    }
    fetch(`/api/shifts/${selectedDate.toISOString()}`, {
      method: "PUT",
      body: JSON.stringify({ nurseId, shiftType }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Updated shift data from API:", data);
        if (
          data &&
          data.morningShift &&
          data.afternoonShift &&
          data.nightShift
        ) {
          setShifts({
            morningShift: data.morningShift,
            afternoonShift: data.afternoonShift,
            nightShift: data.nightShift,
          });
        } else {
          console.error("Unexpected data format from API:", data);
        }
        mutate(`/api/shifts?date=${selectedDate.toISOString()}`);
      })
      .catch((error) => {
        console.error("Error adding nurse:", error);
      });
  }

  function handleRemoveNurse(nurseId, shiftType) {
    if (!nurseId || !shiftType) {
      console.error("nurseId or shiftType is undefined");
      return;
    }
    fetch(`/api/shifts/${selectedDate.toISOString()}`, {
      method: "DELETE",
      body: JSON.stringify({ nurseId, shiftType }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
        setShifts({
          morningShift: data.morningShift || [],
          afternoonShift: data.afternoonShift || [],
          nightShift: data.nightShift || [],
        });
        mutate(`/api/shifts?date=${selectedDate.toISOString()}`);
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
        onAddNurse={handleAddNurse}
        onRemoveNurse={handleRemoveNurse}
      />

      <button onClick={() => router.push("/nurseteam")}>Team </button>
    </DashboardContainer>
  );
}
