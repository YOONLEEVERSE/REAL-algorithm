class HashTable {
  constructor(size = 53) {
    this.keyMap = new Array(size);
  }

  _hash(key) {
    let hash = 0;
    for (let char of key) {
      hash = (hash * 31 + char.charCodeAt(0)) % this.keyMap.length;
    }
    return hash;
  }

  set(key, value) {
    const idx = this._hash(key);
    if (!this.keyMap[idx]) this.keyMap[idx] = [];
    this.keyMap[idx].push([key, value]);
  }

  get(key) {
    const idx = this._hash(key);
    const bucket = this.keyMap[idx];
    if (!bucket) return undefined;
    for (const [k, v] of bucket) {
      if (k === key) return v;
    }
    return undefined;
  }

  has(key) {
    return this.get(key) !== undefined;
  }
}
