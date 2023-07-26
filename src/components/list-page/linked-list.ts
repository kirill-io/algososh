import { ILinkedListNode, ILinkedList } from "./types";

export class LinkedListNode<T> implements ILinkedListNode<T> {
  _value;
  next;

  constructor(value: T, next: ILinkedListNode<T> | null = null) {
    this._value = value;
    this.next = next;
  }

  get getValue() {
    return this._value;
  }

  set setValue(value: T) {
    this._value = value;
  }
}

export class LinkedList<T> implements ILinkedList<T> {
  head: ILinkedListNode<T> | null;
  tail: ILinkedListNode<T> | null;

  constructor(values: T[]) {
    this.head = null;
    this.tail = null;
    values.forEach((value) => this.append(value));
  }

  toArray() {
    const linkedListArray = [];
    let currentNode = this.head;

    while (currentNode) {
      linkedListArray.push(currentNode);
      currentNode = currentNode.next;
    }

    return linkedListArray;
  }

  prepend(value: T) {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    if (!this.tail) {
      this.tail = newNode;
    }

    return this;
  }

  append(value: T) {
    const newNode = new LinkedListNode(value);

    if (!this.head || !this.tail) {
      this.head = newNode;
      this.tail = newNode;

      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;

    return this;
  }

  deleteHead() {
    if (this.head) {
      this.head = this.head.next;

      if (!this.head?.next) {
        this.tail = this.head;
      }
    }
  }

  deleteTail() {
    if (this.tail) {
      let currentNode = this.head;

      if (currentNode && this.head !== this.tail) {
        while (currentNode.next) {
          if (!currentNode.next.next) {
            this.tail = currentNode;
            currentNode.next = null;
          } else {
            currentNode = currentNode.next;
          }
        }
      } else {
        this.head = null;
        this.tail = null;
      }
    }
  }

  addByIndex(value: T, index: number) {
    if (index === 0) {
      this.prepend(value);
    }

    const newNode = new LinkedListNode(value);
    let currentNode = this.head;

    if (currentNode) {
      for (let i = 0; currentNode.next; i++) {
        if (index === i + 1) {
          newNode.next = currentNode.next;
          currentNode.next = newNode;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    return this;
  }

  deleteByIndex(index: number) {
    if (index === 0) {
      this.deleteHead();
      return this;
    }

    let currentNode = this.head;

    if (currentNode) {
      for (let i = 0; currentNode.next; i++) {
        if (index === i + 1) {
          if (currentNode.next === this.tail) {
            this.tail = currentNode;
          }

          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    return this;
  }
}
