export class Queue<T> {
  private _storage: Array<T> = [];
  private _head = 0;
  private _tail = 0;
  private _endQueue = false;

  constructor(array: Array<T>) {
    this._storage = array;
  }

  enqueue(item: T) {
    if (this._tail !== this._storage.length && !this._endQueue) {
      this._storage[this._tail] = item;
      this._tail++;
    } else {
      this._storage[this._tail] = item;
      this._tail++;
      this._endQueue = false;
    }
  }

  dequeue() {
    if (this._head < this._tail - 1) {
      delete this._storage[this._head];
      this._head++;
    } else {
      delete this._storage[this._head];
      this._endQueue = true;
      this._tail = this._head;
    }
  }

  clear() {
    this._storage = Array(7).fill(undefined);
    this._head = 0;
    this._tail = 0;
    this._endQueue = false;
  }

  get getQueue() {
    return this._storage;
  }

  get getHead() {
    return this._head;
  }

  get getTail() {
    return this._tail;
  }

  get getEndQueue() {
    return this._endQueue;
  }
}
