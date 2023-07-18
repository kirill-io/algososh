export class Stack<T extends string> {
  private _storage: Array<T> = [];
  private _size = 0;

  push(item: T) {
    this._size++;
    this._storage.push(item);
  }

  pop() {
    if (this._size) {
      this._size--;
      this._storage.pop();
    }
  }

  clear() {
    this._storage = [];
    this._size = 0;
  }

  get getStack() {
    return this._storage;
  }

  get getSize() {
    return this._size;
  }
}