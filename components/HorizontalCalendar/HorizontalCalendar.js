import React from "react";
import { Datepicker } from "@meinefinsternis/react-horizontal-date-picker";
import { startOfMonth, endOfMonth, addMonths, subMonths } from "date-fns";
import { de } from "date-fns/locale";

export default function HorizontalCalendar({ selectedDate, onDateChange }) {
  const monthsToShow = 2;
  const currentMonthStart = startOfMonth(new Date());
  const currentMonthEnd = endOfMonth(new Date());

  const startDate = subMonths(currentMonthStart, monthsToShow);
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
