import { useMemo } from "react";

const useDate = (timestamp: number) => {
  const dateObject = useMemo(() => new Date(timestamp), [timestamp]);
  const date = dateObject.toLocaleDateString();
  const time = dateObject.toLocaleTimeString();

  return {
    date,
    time,
  };
};

export default useDate;
