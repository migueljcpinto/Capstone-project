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

export default function DashboardPage({ session, signOut }) {
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

  //fecthing the dates...

  useEffect(() => {
    const fetchData = async () => {
      if (!selectedDate) return;
      try {
        const formattedDate = selectedDate.toISOString().split("T")[0];
        const response = await fetch(`/api/shifts/${formattedDate}`);

        if (response.status === 404) {
          setShifts({
            morningShift: [],
            afternoonShift: [],
            nightShift: [],
          });
          return;
        }

        if (!response.ok) {
          throw new Error(await response.text());
        }

        const data = await response.json();
        setShifts({
          morningShift: data.morningShift || [],
          afternoonShift: data.afternoonShift || [],
          nightShift: data.nightShift || [],
        });
      } catch (error) {
        console.error("Error fetching shifts:", error.message);
        setError(error.message);
      }
    };

    fetchData();
  }, [selectedDate]);

  function handleAddNurse(nurseId, shiftType) {
    if (!selectedDate) {
      console.error("Selected date is null or undefined.");
      return;
    }
    const formattedDate = selectedDate.toISOString().split("T")[0];

    fetch(`/api/shifts/${formattedDate}`, {
      method: "PUT",
      body: JSON.stringify({ nurseId, shiftType }),
      headers: { "Content-Type": "application/json" },
    })
      .then((response) => response.json())
      .then((data) => {
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
        mutate(`/api/shifts/${formattedDate}`);
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
    const formattedDate = selectedDate.toISOString().split("T")[0];

    fetch(`/api/shifts/${formattedDate}`, {
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
        mutate(`/api/shifts/${formattedDate}`);
      })
      .catch((error) => {
        console.error("Error removing nurse:", error);
      });
  }
  console.log("dashboard", session);

  return (
    <DashboardContainer>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <TeamStats stats={teamStats} />
      <Profile session={session} signOut={signOut} />
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
    </DashboardContainer>
  );
}
