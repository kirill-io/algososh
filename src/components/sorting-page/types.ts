export type TStep = {
  currentArray: number[];
  elementA: number | null;
  elementB: number | null;
  sortedElements: number[];
};

export enum SortSelection {
  Selection = "selection",
  Bubble = "bubble",
}
