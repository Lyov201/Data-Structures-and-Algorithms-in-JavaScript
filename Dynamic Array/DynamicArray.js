class DArray {
    #size = 0;
    #capacity = 0;
    #arr = null;
    #CAP_EXPONENT = 2;
    constructor(initialCapacity = 8) {
        if (!Number.isInteger(initialCapacity)) throw new Error("capacity must be integer");
        if (initialCapacity <= 0) throw new Error("capacity must be positive");

        this.#capacity = initialCapacity;
        this.#arr = new Int32Array(initialCapacity);
    }

    empty() {
        return this.#size === 0;
    }
    at(index) {
        if (!Number.isInteger(index)) throw new Error("Index must be an integer");
        if (index < 0 || index >= this.#size) throw new Error("Index Error: Out of range.");

        return this.#arr[index];
    }

    #resize(newCapacity, fill = 0) {
        if (newCapacity <= 0 || !Number.isInteger(newCapacity)) {
            throw new Error("wrong capacity");
        }
        let newArr = new Int32Array(newCapacity).fill(fill);
        for (let i = 0; i < this.#size; ++i) {
            newArr[i] = this.#arr[i];
        }
        this.#capacity = newCapacity;
        this.#arr = newArr;
    }

    push_back(elem) {
        if (!Number.isInteger(elem)) {
            throw new Error("element must be integer");
        }
        if (this.#size == this.#capacity) {
            let newCap = this.#capacity * this.#CAP_EXPONENT;
            this.#resize(newCap);
        }
        this.#arr[this.#size++] = elem;
    }
    pop_back() {
        if (this.empty()) throw new Error("Array is empty");
        this.#arr[this.#size - 1] = 0;
        this.#size--;
    }
    erase(index) {
        if (this.at(index));
        for (let i = index; i < this.#size - 1; ++i) {
            this.#arr[i] = this.#arr[i + 1];
        }
        this.#size--;
    }

    clear() {
        this.#size = 0;
    }

    setValue(i, value) {
        if (!Number.isInteger(i) || !Number.isInteger(value)) {
            throw new Error("index and value must be positive ");
        }
        if (i < 0 || i >= this.#size) throw new Error("index out of range");
        this.#arr[i] = value;
    }

    front() {
        if (this.empty()) {
            throw new Error("Array is empty");
        }
        return this.#arr[0];
    }

    back() {
        if (this.empty()) {
            throw new Error("Array is empty");
        }
        return this.#arr[this.#size - 1];
    }

    size() {
        return this.#size;
    }

    capacity() {
        return this.#capacity;
    }

    [Symbol.iterator]() {
        let i = 0;
        let arr = this.#arr;
        let size = this.#size;

        return {
            next() {
                if (i < size) {
                    return { value: arr[i++], done: false };
                }
                return { done: true };
            }
        };
    }

    reserve(n) {
        if (n > this.#capacity) {
            this.#resize(n);
        }
    }

    shrinkToFit() {
        this.#resize(this.#size);
    }

    toArray() {
        let newArr = new Array(this.#size);
        for (let i = 0; i < this.#size; ++i) {
            newArr[i] = this.#arr[i];
        }
        return newArr
    }

    insert(pos, value) {
        if (this.at(pos));
        if (!Number.isInteger(value)) throw new Error("value must be integer");
        if (this.#size === this.#capacity) {
            let newCap = this.#capacity * this.#CAP_EXPONENT;
            this.#resize(newCap);
        }

        for (let i = this.#size; i > pos; --i) {
            this.#arr[i] = this.#arr[i - 1];
        }
        this.#arr[pos] = value;
        this.#size ++;

    }

    swap(i, j) {
        if (this.at(i) || this.at(j));

        [this.#arr[i], this.#arr[j]] = [this.#arr[i], this.#arr[j]];
    }

    *values() {
        for (let i = 0; i < this.#size; ++i) {
            yield this.#arr[i];
        }
    }

    *keys() {
        for (let i = 0; i < this.#size; ++i) {
            yield i;
        }
    }

    *entries() {
        for (let i = 0; i < this.#size; ++i) {
            yield [i, this.#arr[i]];
        }
    }

    forEach(callback, thisArg) {
        for (let i = 0; i < this.#size; ++i) {
            callback.call(thisArg, this.#arr[i], i, this.#arr);
        }
    }

    map(callback, thisArg) {
        let newArr = new DArray(this.#size);
        for (let i = 0; i < this.#size; ++i) {
            newArr.push_back(callback.call(thisArg, this.#arr[i], i, this.#arr));
        }
        return newArr;
    }

    filter(callback, thisArg) {
        let newArr = new DArray(this.#size);
        for (let i = 0; i < this.#size; ++i) {
            if (callback.call(thisArg, this.#arr[i], i, this.#arr)) {
                newArr.push_back(this.#arr[i]);
            }
        }
        return newArr;
    }

    reduce(callback, initialValue) {
        if (initialValue !== undefined) {
            var accumlator = initialValue;
            var start = 0;
        } else {
            var accumlator = this.#arr[0];
            var start = 1;
        }
        for (let i = start; i < this.#size; ++i) {
            accumlator = callback(accumlator, this.#arr[i], i, this.#arr);
        }
        return accumlator;
    }

    some(callback, thisArg) {
        for (let i = 0; i < this.#size; ++i) {
            if (callback.call(thisArg, this.#arr[i], i, this.#arr)) {
                return true;
            }
        }
        return false;
    }

    every(callback, thisArg) {
        for (let i = 0; i < this.#size; ++i) {
            if (!callback.call(thisArg, this.#arr[i], i, this.#arr)) {
                return false;
            }
        }
        return true;
    }

    find(callback, thisArg) {
        for (let i = 0; i < this.#size; ++i) {
            if (callback.call(thisArg, this.#arr[i], i, this.#arr)) {
                return this.#arr[i];
            }
        }
        return undefined;
    }

    findIndex(callback, thisArg) {
        for (let i = 0; i < this.#size; ++i) {
            if (callback.call(thisArg, this.#arr[i], i, this.#arr)) {
                return i;
            }
        }
        return undefined;
    }
    includes(value) {
        for (let i = 0; i < this.#size; ++i) {
            if (this.#arr[i] === value) return true;
        }
        return false;
    }

    sort(compareFn) {
        if (this.empty()) throw new Error("array is empty");

        if (!compareFn) {
            compareFn = (a, b) => a - b;
        }

        const partition = (low, high) => {
            let pivot = this.#arr[high];
            let i = low - 1;

            for (let j = low; j < high; ++j) {
                if (compareFn(this.#arr[j], pivot) < 0) {
                    this.swap(++i, j);
                }
            }

            this.swap(i + 1, high);
            return i + 1;
        };

        const quick = (low, high) => {
            if (low >= high) return;

            let p = partition(low, high);
            quick(low, p - 1);
            quick(p + 1, high);
        };

        quick(0, this.#size - 1);
    }

}


