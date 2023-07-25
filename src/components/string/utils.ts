import { ElementStates } from "../../types/element-states";
import { TReversingStringResult } from "./types";

export const reversingString = (
  initialString: string,
): TReversingStringResult => {
  const initialStringSymbols = initialString.split("");
  const stringLength = initialString.length;
  const initialState = Array(stringLength).fill(ElementStates.Default);
  const result: TReversingStringResult = {
    steps: [[...initialStringSymbols]],
    state: [[...initialState]],
  };

  const middle = Math.floor(initialString.length / 2);

  if (stringLength === 1) {
    result.state[stringLength - 1][stringLength - 1] = ElementStates.Modified;
    return result;
  }

  for (let i = 0; i < middle; i++) {
    let tmp = initialStringSymbols[i];
    initialStringSymbols[i] =
      initialStringSymbols[initialStringSymbols.length - 1 - i];
    initialStringSymbols[initialStringSymbols.length - 1 - i] = tmp;
    result.steps.push([...initialStringSymbols]);

    if (i === 0) {
      result.state[i][i] = ElementStates.Changing;
      result.state[i][stringLength - 1] = ElementStates.Changing;
    } else {
      initialState[i] = ElementStates.Changing;
      initialState[stringLength - 1 - i] = ElementStates.Changing;
      initialState[i - 1] = ElementStates.Modified;
      initialState[stringLength - i] = ElementStates.Modified;
      result.state.push([...initialState]);
    }
  }

  result.state.push([...Array(stringLength).fill(ElementStates.Modified)]);

  return result;
};
