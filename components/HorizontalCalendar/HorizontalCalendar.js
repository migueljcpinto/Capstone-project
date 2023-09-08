import React from "react";
import { Datepicker } from "@meinefinsternis/react-horizontal-date-picker";
import { startOfMonth, endOfMonth } from "date-fns";
import { de } from "date-fns/locale";

export default function HorizontalCalendar({ selectedDate, onDateChange }) {
  const currentMonthStart = startOfMonth(new Date());
  const currentMonthEnd = endOfMonth(new Date());

  const handleChange = (d) => {
    const [newSelectedDate] = d;
    if (
      selectedDate &&
      newSelectedDate &&
      newSelectedDate.toISOString() === selectedDate.toISOString()
    ) {
      onDateChange(null);
    } else {
      onDateChange(newSelectedDate);
    }
  };

  return (
    <Datepicker
      onChange={handleChange}
      locale={de}
      startValue={selectedDate}
      startDate={currentMonthStart}
      endDate={currentMonthEnd}
    />
  );
}
