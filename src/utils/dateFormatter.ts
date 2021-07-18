import { format } from "date-fns";

export const dateformatter = (date: Date): string => {
  return format(new Date(date), "dd/MM/yyyy");
};
