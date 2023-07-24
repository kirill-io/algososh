import { Position } from "./types";
import { ElementStates } from "../../types/element-states";

export const prepend = (value: string, linkedList: any) => {
  const steps = [];

  steps.push({
    index: 0,
    value: value,
    list: linkedList.toArray(),
    state: [],
    direction: Position.Top,
    hideValue: []
  })

  steps.push({
    index: null,
    value: undefined,
    list: linkedList.prepend(value).toArray(),
    state: [ElementStates.Modified],
    direction: null,
    hideValue: []
  })

  steps.push({
    index: null,
    value: undefined,
    list: linkedList.toArray(),
    state: [],
    direction: null,
    hideValue: []
  })

  return steps;
};

export const append = (value: string, linkedList: any) => {
  const steps = [];

  steps.push({
    index: linkedList.toArray().length - 1,
    value: value,
    list: linkedList.toArray(),
    state: [],
    direction: Position.Top,
    hideValue: []
  })

  steps.push({
    index: null,
    value: undefined,
    list: linkedList.append(value).toArray(),
    state: Array(linkedList.toArray().length).fill(ElementStates.Modified, linkedList.toArray().length - 1),
    direction: null,
    hideValue: []
  })

  steps.push({
    index: null,
    value: undefined,
    list: linkedList.toArray(),
    state: [],
    direction: null,
    hideValue: []
  })

  return steps;
};

export const deleteHead = (linkedList: any) => {
  const steps = [];

  steps.push({
    index: 0,
    value: linkedList.head?.getValue,
    list: linkedList.toArray(),
    state: [],
    direction: Position.Bottom,
    hideValue: [true]
  })

  linkedList.deleteHead();

  steps.push({
    index: null,
    value: undefined,
    list: linkedList.toArray(),
    state: [],
    direction: null,
    hideValue: []
  })

  return steps;
};

export const deleteTail = (linkedList: any) => {
  const steps = [];

  steps.push({
    index: linkedList.toArray().length - 1,
    value: linkedList.tail?.getValue,
    list: linkedList.toArray(),
    state: [],
    direction: Position.Bottom,
    hideValue: Array(linkedList.toArray().length).fill(true, linkedList.toArray().length - 1)
  })

  linkedList.deleteTail();

  steps.push({
    index: null,
    value: undefined,
    list: linkedList.toArray(),
    state: [],
    direction: null,
    hideValue: []
  })

  return steps;
};

export const addByIndex = (value: string, index: number, linkedList: any) => {
  const steps = [];

  for (let i = 0; i <= index; i++) {
    steps.push({
      index: i,
      value: value,
      list: linkedList.toArray(),
      state: Array(i).fill(ElementStates.Changing),
      direction: Position.Top,
      hideValue: []
    });
  }

  steps.push({
    index: index,
    value: value,
    list: linkedList.addByIndex(value, index).toArray(),
    state: Array(index + 1).fill(ElementStates.Modified, index),
    direction: null,
    hideValue: []
  })

  steps.push({
    index: null,
    value: undefined,
    list: linkedList.toArray(),
    state: [],
    direction: null,
    hideValue: []
  })

  return steps;
};

export const deleteByIndex = (index: number, linkedList: any) => {
  const steps = [];

  for (let i = 0; i <= index; i++) {
    steps.push({
      index: null,
      value: undefined,
      list: linkedList.toArray(),
      state: Array(i + 1).fill(ElementStates.Changing),
      direction: null,
      hideValue: []
    })
  }

  steps.push({
    index: index,
    value: linkedList.toArray()[index].getValue,
    list: linkedList.toArray(),
    state: Array(index).fill(ElementStates.Changing),
    direction: Position.Bottom,
    hideValue: Array(index + 1).fill(true, index)
  });

  steps.push({
    index: null,
    value: undefined,
    list: linkedList.deleteByIndex(index).toArray(),
    state: [],
    direction: null,
    hideValue: []
  });

  return steps;
};