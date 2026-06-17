import { BucketedDeque } from "./deque.js";

class Queue {
    #data;
    #size = 0;

    constructor() {
        this.#data = new BucketedDeque()
    }

    enqueue(value) {
        this.#data.push_back(value);
        ++this.#size
    }

    dequeue() {
        this.#data.pop_front();
        --this.#size;
    }

    front() {
        return this.#data.front();
    }

    back() {
        return this.#data.back();
    }

    size() {
        return this.#size;
    }

    isEmpty() {
        return this.#size === 0;
    }

    clear() {
        this.#data = new BucketedDeque();
        this.#size = 0;
    }

    toArray() {
        return this.#data.toArray()
    }

    [Symbol.iterator]() {
        return this.#data[Symbol.iterator]();
    }

}