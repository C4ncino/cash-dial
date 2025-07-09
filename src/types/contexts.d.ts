type DateData = {
  day: number;
  week: number;
  month: number;
  year: number;
  timestamp: number;
};

interface SystemContextModel {
  isDark: boolean;
  categories: CategoryNode[];
  currentDateInfo: DateData;
}
