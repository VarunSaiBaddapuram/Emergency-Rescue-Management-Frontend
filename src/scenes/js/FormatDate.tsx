import React from "react";

interface FormatDateProps {
  date: Date;
}

const FormatDate: React.FC<FormatDateProps> = ({ date }) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const day = days[date.getDay()];
  let hours: string | number = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes: string | number = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  
  return (
    <div>
      {day} {hours}:{minutes}
    </div>
  );
};

export default FormatDate;
