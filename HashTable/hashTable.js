import { Node, LinkedList } from "./list.js";

class HashTable {
    #table;
    #capacity;
    #size;
    #loadFactor;

    constructor(capacity = 7, loadFactor = 1.0) {
        if (!Number.isInteger(capacity)) throw new Error("Capacity must be integer");
        if (capacity <= 0) throw new Error("Capacity must be positive");
        if (loadFactor > 1 || loadFactor <= 0) throw new Error("loadFactor must be in range og (0,1]");
        if (capacity < 7) {
            capacity = 7;
        }
        this.#size = 0;
        this.#capacity = capacity;
        this.#loadFactor = loadFactor;
        this.#table = [];

        for (let i = 0; i < this.#capacity; ++i) {
            this.#table.push(new LinkedList());
        }
    }

    /* ================= Basic State ================= */

    size() {
        return this.#size;
    }

    capacity() {
        return this.#capacity;
    }

    isEmpty() {
        return this.#size === 0;
    }

    clear() {
        let tmpTable = [];
        for (let i = 0; i < this.#capacity; ++i) {
            tmpTable.push(new LinkedList);
        }

        this.#size = 0;
        this.#table = tmpTable;

    }

    /* ================= Hashing ================= */

    #hash(key) {
        let hash = 5381;
        if (typeof key === 'number') {
            let num = Math.abs(key);
            while (num > 0) {
                hash = (hash << 5) + hash + (num % 10);
                num = Math.floor(num / 10);
            }
        } else if (typeof key === 'string') {
            for (let ch of key) {
                hash = (hash << 5) + hash + ch.charCodeAt(0);
            }
        } else {
            throw new Error("Invalid key");
        }
        return (hash >>> 0) % this.#capacity;
    }

    /* ================= Core Operations ================= */

    put(key, value) {
        if (this.loadFactor() >= this.#loadFactor) {
            this.#resize(this.#capacity * 2);
        }
        let index = this.#hash(key);
        let bucket = this.#table[index];

        let cur = bucket.head;
        while (cur) {
            if (cur.key === key) {
                cur.value = value;
                return;
            }
            cur = cur.next;
        }

        let nd = new Node(key, value);
        if (bucket.isEmpty()) {
            bucket.head = nd;
            ++this.#size;
            ++bucket.size;
            return
        }
        nd.next = bucket.head;
        bucket.head = nd;
        ++this.#size;
        ++bucket.size;

    }

    get(key) {
        let index = this.#hash(key);
        let bucket = this.#table[index];
        let curr = bucket.head;
        while (curr) {
            if (curr.key === key) {
                return curr.value;
            }
            curr = curr.next;
        }
        return undefined;
    }

    remove(key) {
        if (this.isEmpty()) return undefined;
        let index = this.#hash(key);
        let bucket = this.#table[index];

        if (bucket.isEmpty()) return undefined

        if (bucket?.head?.next === null  && bucket.head.key === key) {
            let value = bucket.head.value;
            --this.#size;
            --bucket.size;
            bucket.head = null;
            return value;
        }

        let curr = bucket.head;
        if (curr.key === key) {
            let value = curr.value;
            bucket.head = curr.next;
            --this.#size;
            --bucket.size;
            return value;
        }
        while (curr.next) {
            if (curr.next.key === key) {
                let value = curr.next.value;
                curr.next = curr.next.next;
                --this.#size;
                --bucket.size;
                return value;
            }
            curr = curr.next;
        }
        return undefined;
    }

    containsKey(key) {
        let index = this.#hash(key);
        let bucket = this.#table[index];
        let curr = bucket.head;

        while (curr) {
            if (curr.key === key) {
                return true;
            }
            curr = curr.next
        }
        return false;
    }

    containsValue(value) {
        for (let bucket of this.#table) {
            if (bucket.head === null) continue;
            let curr = bucket.head;
            while (curr) {
                if (curr.value === value) {
                    return true;
                }
                curr = curr.next;
            }
        }
        return false;
    }

    /* ================= Resize / Rehash ================= */

    #resize(newCapacity) {
        let oldTable = this.#table;
        this.#table = []
        this.#capacity = newCapacity;
        this.#size = 0;
        for (let i = 0; i < newCapacity; ++i) {
            this.#table.push(new LinkedList());
        }

        for (let bucket of oldTable) {
            let curr = bucket.head
            while (curr) {
                this.put(curr.key, curr.value);
                curr = curr.next;
            }
        }
        // this.#size = oldTable.size;
    }

    loadFactor() {
        return this.#size / this.#capacity;
    }

    /* ================= Entry Views ================= */

    keys() {
        if (this.isEmpty()) return [];
        let res = [];
        for (let bucket of this.#table) {
            if (!bucket.head) continue;
            let curr = bucket.head;
            while (curr) {
                res.push(curr.key);
                curr = curr.next
            }
        }
        return res;
    }

    values() {
        if (this.isEmpty()) return [];
        let res = [];
        for (let bucket of this.#table) {
            if (!bucket.head) continue;
            let curr = bucket.head;
            while (curr) {
                res.push(curr.value);
                curr = curr.next
            }
        }
        return res;
    }

    *entries() {
        for (let bucket of this.#table) {
            if (!bucket.head) continue;
            let curr = bucket.head;
            while (curr) {
                yield [curr.key, curr.value];
                curr = curr.next;
            }
        }
    }

    /* ================= Iteration ================= */

    *[Symbol.iterator]() {
        for (let bucket of this.#table) {
            if (!bucket.head) continue;
            let curr = bucket.head;
            while (curr) {
                yield curr.value;
                curr = curr.next;
            }
        }
    }

    /* ================= Debug ================= */

    bucketSizes() {
        let res = [];
        for (let bucket of this.#table) {
            res.push(bucket.size)
        }

        return res;
    }

    print() {
        for (let i = 0; i < this.#capacity; i++) {
            let result = `Bucket ${i}: `;
            let current = this.#table[i].head;

            while (current) {
                result += `(${current.key}: ${current.value}) -> `;
                current = current.next;
            }

            result += "null";

            console.log(result);
        }
    }
}

