import { Dispatch, SetStateAction } from "react";
import { TodayDataType } from "../redux/api/rest";

export interface ListProps {
  data: TodayDataType<string>[] | undefined;
  set: Dispatch<SetStateAction<string>>;
  dateAct: string | undefined;
  min: string;
  max: string;
  get: (date: string) => void;
}
