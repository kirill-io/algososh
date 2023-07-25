import { SortDirection } from "./types";

export const selectionSort = (array: number[], sortDirection: string) => {
  const steps = [];
  const sortedElements = [];

  for (let i = 0; i < array.length - 1; i++) {
    let index = i;

    for (let j = i + 1; j < array.length; j++) {
      if (sortDirection === SortDirection.Increase ? array[j] < array[index] : array[j] > array[index]) {
        index = j;
      }

      steps.push({
        currentArray: [...array],
        elementA: i,
        elementB: j,
        sortedElements: [...sortedElements]
      })
    }

    if (index !== i) {
      let tmp = array[i];
      array[i] = array[index];
      array[index] = tmp;
    }
    sortedElements.push(i);
  }

  sortedElements.push(array.length - 2, array.length - 1);
  steps.push({
    currentArray: [...array],
    elementA: null,
    elementB: null,
    sortedElements: [...sortedElements]
  })

  return steps;
};

export const bubbleSort = (array: number[], sortDirection: string) => {
  const steps = [];
  const sortedElements = [];

  for (let i = 0; i < array.length; i++) {
    if (i > 0) {
      sortedElements.push(array.length - i);
    }      

    for (let j = 0; j < array.length - i - 1; j++) { 
      if (sortDirection === SortDirection.Increase ? array[j] > array[j + 1] : array[j] < array[j + 1]) {
        let tmp = array[j];
        array[j] = array[j + 1];
        array[j + 1] = tmp;
      }

      steps.push({
        currentArray: [...array],
        elementA: j,
        elementB: j + 1,
        sortedElements: [...sortedElements]
      })
    }
  }

  sortedElements.push(0);
  steps.push({
    currentArray: [...array],
    elementA: null,
    elementB: null,
    sortedElements: [...sortedElements]
  })

  return steps;
};