import { useMemo } from "react";

import { lang, clockFormat } from "@/utils/formatters";

const useDate = (timestamp: number) => {
  const dateObject = useMemo(() => new Date(timestamp), [timestamp]);
  const dateShort = dateObject.toLocaleDateString();
  const dateLong = dateObject.toLocaleDateString(lang, { year: "numeric", weekday: "long", month: "long", day: "numeric" });
  const time = dateObject.toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit", hour12: !clockFormat });

  return {
    dateObject,
    dateShort,
    dateLong,
    time,
  };
};

export default useDate;
