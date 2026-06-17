export class BucketedDeque {
    // === State ===
    #everyBucketsLength = 8;
    #bucketSize = 4;
    #buckets;
    #frontBucket;
    #backBucket;
    #frontIndex;
    #backIndex;
    #size = 0;
    #INIT_SIZE = 4;

    constructor() {
        this.#init();
    }


    #init() {
        this.#buckets = new Array(this.#bucketSize);

        for (let i = 0; i < this.#bucketSize; ++i) {
            this.#buckets[i] = new Array(this.#everyBucketsLength);
        }

        this.#frontBucket = this.#bucketSize / 2 - 1;
        this.#backBucket = this.#bucketSize / 2;

        this.#frontIndex = this.#everyBucketsLength - 1;
        this.#backIndex = 0;
    }

    // === Core operations ===


    push_front(value) {
        if (this.#frontIndex == - 1) {
            if (this.#frontBucket == 0) {
                this._ensureBucket();
                this.#frontBucket -= 1;
                this.#frontIndex = this.#everyBucketsLength - 1;
                this.#buckets[this.#frontBucket][this.#frontIndex] = value;
                this.#frontIndex -= 1;
                ++this.#size
                return;
            } else {
                this.#frontBucket -= 1;
                this.#frontIndex = this.#everyBucketsLength - 1;
                this.#buckets[this.#frontBucket][this.#frontIndex] = value;
                this.#frontIndex -= 1;
                ++this.#size
                return;
            }
        }
        this.#buckets[this.#frontBucket][this.#frontIndex] = value;
        this.#frontIndex -= 1;
        ++this.#size;
    }


    push_back(value) {
        if (this.#backIndex === this.#everyBucketsLength) {
            if (this.#backBucket == this.#bucketSize - 1) {
                this._ensureBucket();
                this.#backBucket += 1;
                this.#backIndex = 0;
                this.#buckets[this.#backBucket][this.#backIndex] = value;
                ++this.#backIndex;
                ++this.#size;
                return;
            } else {
                this.#backBucket += 1;
                this.#backIndex = 0;
                this.#buckets[this.#backBucket][this.#backIndex] = value;
                ++this.#backIndex;
                ++this.#size
                return;
            }
        }
        this.#buckets[this.#backBucket][this.#backIndex] = value;
        ++this.#backIndex;
        ++this.#size;
    }

    pop_front() {
        if (this.#size === 0) throw new Error("Bucket is empty");

        if (this.#frontIndex === this.#everyBucketsLength - 1) {
            this.#frontIndex = 0;
            this.#frontBucket += 1
        } else {
            this.#frontIndex += 1;
        }
        let val = this.#buckets[this.#frontBucket][this.#frontIndex];
        this.#buckets[this.#frontBucket][this.#frontIndex] = 0;

        --this.#size;
        return val;
    }

    pop_back() {
        if (this.#size === 0) throw new Error("Bucket is empty");

        if (this.#backIndex === 0) {
            this.#backIndex = this.#everyBucketsLength - 1;
            this.#backBucket -= 1;
        } else {
            this.#backIndex -= 1;
        }

        let val = this.#buckets[this.#backBucket][this.#backIndex];
        this.#buckets[this.#backBucket][this.#backIndex] = 0;
        --this.#size;
        return val;
    }

    // === Access ===

    front() {
        if (this.#size === 0) return undefined;
        return this.at(0);
    }

    back() {
        if (this.#size === 0) return undefined;
        return this.at(this.#size - 1);
    }

    // === Utilities ===


    clear() {
        this.#init();
    }

    size() {
        return this.#size;
    }


    isEmpty() {
        return this.#size === 0;
    }


    toArray() {
        let arr = []

        for (let i = 0; i < this.#size; ++i) {
            arr.push(this.at(i));
        }

        return arr;
    }


    at(globalIndex) {
        let { localIdx, buckIdx } = this._bucketIndex(globalIndex);
        return this.#buckets[buckIdx][localIdx];
    }

    // === Iterator ===

    [Symbol.iterator]() {
        let index = 0;

        return {
            next: () => {
                if (index < this.#size) {
                    return { value: this.at(index++), done: false };
                }
                return { done: true };
            }
        };
    }

    // === Internal methods (optional) ===

    _ensureBucket() {
        this.#bucketSize += this.#INIT_SIZE;
        let arr = new Array(this.#bucketSize);

        let i = 0;
        let j = this.#bucketSize - 1;

        while (i != 2) {
            arr[i] = new Array(this.#everyBucketsLength);
            arr[j] = new Array(this.#everyBucketsLength);
            ++i;
            --j;
        }

        j = 0;

        while (j < this.#buckets.length) {
            arr[i] = this.#buckets[j];
            ++j;
            ++i;
        }
        this.#backBucket += 2;
        this.#frontBucket += 2;
        this.#buckets = arr;

    }


    _bucketIndex(globalIndex) {
        if (!Number.isInteger(globalIndex) || globalIndex < 0 || globalIndex >= this.#size) {
            return undefined;
        }
        let absoluteIndex = (this.#frontIndex + 1) + globalIndex;
        let localIdx = absoluteIndex % this.#everyBucketsLength;
        let buckIdx = this.#frontBucket + Math.floor(absoluteIndex / this.#everyBucketsLength);

        return { localIdx, buckIdx };
    }
}


const dq = new BucketedDeque();

// console.log("===== TEST 1: Empty =====");
// console.log(dq.isEmpty());
// console.log(dq.size());
// console.log(dq.front());
// console.log(dq.back());

// try {
//     dq.pop_front();
// } catch(e) {
//     console.log("pop_front() throws");
// }

// try {
//     dq.pop_back();
// } catch(e) {
//     console.log("pop_back() throws");
// }

// console.log("\n===== TEST 2: push_back =====");

// dq.push_back(1);
// dq.push_back(2);
// dq.push_back(3);

// console.log(dq.front());
// console.log(dq.back());
// console.log(dq.size());
// console.log(dq.toArray());

// console.log(dq.pop_front());
// console.log(dq.pop_front());
// console.log(dq.pop_front());

// console.log(dq.isEmpty());

// console.log("\n===== TEST 3: push_front =====");

// dq.push_front(1);
// dq.push_front(2);
// dq.push_front(3);

// console.log(dq.front());
// console.log(dq.back());
// console.log(dq.toArray());

// console.log(dq.pop_back());
// console.log(dq.pop_back());
// console.log(dq.pop_back());

// console.log(dq.isEmpty());

// console.log("\n===== TEST 4: Mixed =====");

// dq.push_front(1);
// dq.push_back(2);
// dq.push_front(3);
// dq.push_back(4);

// console.log(dq.toArray());

// console.log(dq.pop_front());
// console.log(dq.pop_back());

// console.log(dq.toArray());

// console.log("\n===== TEST 5: Bucket crossing push_back =====");

// for (let i = 0; i < 20; ++i) {
//     dq.push_back(i)
// }

// console.log(dq.front());
// console.log(dq.back());
// console.log(dq.size());

// while(!dq.isEmpty()) {
//     console.log(dq.pop_front());
// }
// console.log("\n===== TEST 6: Bucket crossing push_front =====");

// for(let i=0;i<20;i++)
//     dq.push_front(i);

// console.log(dq.front());
// console.log(dq.back());
// console.log(dq.size());

// while(!dq.isEmpty()) {
//     console.log(dq.pop_back());
// }
// console.log("\n===== TEST 7: EnsureBucket back =====");

// for(let i=0;i<100;i++) {
//     dq.push_back(i);
// }
// console.log(dq.front());
// console.log(dq.back());
// console.log(dq.size());

// console.log("\n===== TEST 8: EnsureBucket front =====");

// dq.clear();

// for(let i=0;i<100;i++)
//     dq.push_front(i);

// console.log(dq.front());
// console.log(dq.back());
// console.log(dq.size());

// console.log("\n===== TEST 9: at() =====");

// dq.clear();

// for(let i=0;i<30;i++)
//     dq.push_back(i);

// for(let i=0;i<dq.size();i++) {
//     console.log(dq.at(i));
// }
// console.log("\n===== TEST 10: Iterator =====");

// for (const x of dq) {
//     console.log(x)
// }
// console.log("\n===== TEST 11: clear() =====");

// dq.clear();

// console.log(dq.isEmpty());
// console.log(dq.size());
// console.log(dq.front());
// console.log(dq.back());

// dq.push_back(100);

// console.log(dq.front());
// console.log(dq.back());


// dq.clear();

// for(let i=0;i<50;i++)
//     dq.push_back(i);

// for(let i=0;i<25;i++)
//     dq.pop_front();

// for(let i=50;i<100;i++)
//     dq.push_back(i);

// for(let i=0;i<20;i++)
//     dq.pop_back();

// for(let i=0;i<20;i++)
//     dq.push_front(-i);

// console.log(dq.front());
// console.log(dq.back());
// console.log(dq.size());
// console.log(dq.toArray());

// console.log("\n===== TEST 14: Empty -> Reuse =====");

// dq.clear();

// dq.push_back(1);
// console.log(dq.pop_back());

// dq.push_front(2);
// console.log(dq.pop_front());

// dq.push_back(3);
// dq.push_front(4);

// console.log(dq.toArray());

// console.log("\n===== ALL TESTS FINISHED =====");