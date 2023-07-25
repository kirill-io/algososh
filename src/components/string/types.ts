import { ElementStates } from "../../types/element-states";

export type TReversingStringResult = {
  steps: string[][];
  state:
    | ElementStates.Default[][]
    | ElementStates.Modified[][]
    | ElementStates.Changing[][];
};
