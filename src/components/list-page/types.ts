import { ElementStates } from "../../types/element-states";

export enum Position {
  Top = "top",
  Bottom = "bottom",
}

export enum Operation {
  AddHead = "addHead",
  AddTail = "addTail",
  DeleteHead = "deleteHead",
  DeleteTail = "deleteTail",
  AddByIndex = "addByIndex",
  DeleteByIndex = "deleteByIndex",
}

export interface ILinkedListNode<T> {
  _value: T;
  next: ILinkedListNode<T> | null;

  get getValue(): T;
  set setValue(value: T);  
}

export interface ILinkedList<T> {
  head: ILinkedListNode<T> | null;
  tail: ILinkedListNode<T> | null;

  toArray(): ILinkedListNode<T>[];
  prepend(value: T): ILinkedList<T>;
  append(value: T): ILinkedList<T>;
  deleteHead(): void;
  deleteTail(): void;
  addByIndex(value: T, index: number): ILinkedList<T>;
  deleteByIndex(vindex: number): ILinkedList<T>;
}

export type TSteps = {
  index: number | null;
  value: string | undefined;
  list: ILinkedListNode<string>[];
  state: ElementStates[];
  direction: Position | null;
  hideValue: boolean[];
}