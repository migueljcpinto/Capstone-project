import React from "react";
import { Datepicker } from "@meinefinsternis/react-horizontal-date-picker";
import { endOfMonth, subDays, addMonths } from "date-fns";
import { de } from "date-fns/locale";

export default function HorizontalCalendar({ selectedDate, onDateChange }) {
  const daysToSubtract = 2;
  const monthsToShow = 1;
  const currentDate = new Date();
  const currentMonthEnd = endOfMonth(currentDate);

  const startDate = subDays(currentDate, daysToSubtract);
  const endDate = addMonths(currentMonthEnd, monthsToShow);

  function handleChange(d) {
    const [newSelectedDate] = d;
    if (
      selectedDate &&
      newSelectedDate &&
      newSelectedDate.toISOString().split("T")[0] ===
        selectedDate.toISOString().split("T")[0]
    ) {
      onDateChange(null);
    } else {
      onDateChange(newSelectedDate);
    }
  }

  return (
    <Datepicker
      onChange={handleChange}
      locale={de}
      startValue={selectedDate}
      startDate={startDate}
      endDate={endDate}
    />
  );
}
