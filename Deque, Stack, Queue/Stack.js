import { BucketedDeque } from "./deque.js";

class Stack {
    #data;
    #size = 0;

    constructor() {
        this.#data = new BucketedDeque()
    }

    push(value) {
        this.#data.push_back(value);
        ++this.#size;
    }

    pop() {
        this.#data.pop_back();
        --this.#size
    }

    peek() {
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
        return this.#data.toArray();
    }

    *[Symbol.iterator]() {
        let arr = this.#data.toArray();
        let i = 0;
        let j = arr.length - 1;

        while(i < j) {
            [arr[i], arr[j]] = [arr[j], arr[i]]

            ++i;
            --j;
        }

        for(let i = 0; i < arr.length; ++i) {
            yield arr[i];
        }
    }

}
