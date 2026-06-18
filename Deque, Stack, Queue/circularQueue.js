import { DArray } from "../Dynamic Array/DynamicArray.js"

export class CircularQueue {
    #data;
    #front;
    #GROWTH = 2;



    constructor(capacity = 8, fill = 0) {
        if (!Number.isInteger(capacity)) throw new Error('capasity must be integer');
        if (capacity <= 0) throw new Error('capacity must be positive number');

        this.#data = new DArray(capacity, fill);
        // this.#size = this.#data.size
        this.#front = 0;
    }

    /* ================= Basic State ================= */

    size() {
        return this.#data.size;
    }

    capacity() {
        return this.#data.capacity;
    }

    isEmpty() {
        return this.#data.size === 0;
    }

    clear() {
        this.#data = new DArray();
        this.#data.size = 0;
    }

    /* ================= Core Queue Operations ================= */

    enqueue(value) {
        if (this.#data.size == this.#data.capacity) {
            this.#grow()
        }
        let rare = (this.#data.size + this.#front) % this.#data.capacity;
        this.#data[rare] = value;
        ++this.#data.size;
    }

    dequeue() {
        let val = this.#data[this.#front];
        this.#data[this.#front] = 0;
        this.#front = (this.#front + 1) % this.#data.capacity;
        --this.#data.size;
        return val;
    }

    front() {
        if (this.isEmpty()) throw new Error("queue is emtpy");

        return this.#data[this.#front];
    }

    back() {
        if (this.isEmpty()) throw new Error("queue is emtpy");

        return this.#data[(this.#front + this.#data.size) % this.#data.capacity];
    }

    /* ================= Internal Resize ================= */

    #grow() {
        let cap = this.#data.capacity * this.#GROWTH;
        let newData = new DArray(cap);
        newData.size = this.#data.size

        for (let i = 0; i < this.#data.size; ++i) {
            let rare = (this.#front + i) % this.#data.capacity;
            newData[i] = this.#data[rare];
        }
        this.#data = newData;
        this.#front = 0
    }

    /* ================= Utilities ================= */

    toArray() {
        let res = [];
        let j = 0
        for (let i = this.#front; i < this.#data.size + this.#front; ++i, ++j) {
            let tmp = i % this.#data.capacity
            res[j] = this.#data[tmp]
        }
        return res;
    }

    toString() {
        return this.#data.toArray().toString();
    }

    [Symbol.iterator]() {
        let index = 0;
        return {
            next: () => {
                if (index < this.#front + this.#data.size) {
                    return { value: this.#data[(this.#front + index++) % this.#data.capacity], done: false };
                } else {
                    return { value: undefined, done: true };
                }
            }
        }
    }

}



