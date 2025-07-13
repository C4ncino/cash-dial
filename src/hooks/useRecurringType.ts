import { PLANNINGS_TYPES, PLANNINGS_TYPES_ID } from "@/db/ui";

const useRecurringType = (recurringType: PLANNINGS_TYPES_ID) => {
  return {
    details: PLANNINGS_TYPES[recurringType],
    isUnique: recurringType === PLANNINGS_TYPES_ID.UNIQUE,
    isDaily: recurringType === PLANNINGS_TYPES_ID.DAILY,
    isWeekly: recurringType === PLANNINGS_TYPES_ID.WEEKLY,
    isMonthly: recurringType === PLANNINGS_TYPES_ID.MONTHLY,
    isYearly: recurringType === PLANNINGS_TYPES_ID.YEARLY,
  };
};

export default useRecurringType;
