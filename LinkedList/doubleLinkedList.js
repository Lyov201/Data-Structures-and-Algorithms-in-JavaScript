class Node {
    value;
    next;
    prev;
    constructor(value, next = null, prev = null) {
        this.value = value;
        this.next = next;
        this.prev = prev;
    }
}

class DoubleLinkedList {
    #head;
    #tail;
    constructor(head = null, tail = null) {
        this.#head = head;
        this.#tail = tail;
    }

    isEmpty() {
        return this.#head === null;
    }

    get Tail() {
        return this.#tail;
    }

    size() {
        let count = 0;
        let curr = this.#head;

        while (curr) {
            curr = curr.next;
            ++count;
        }

        return count;
    }

    clear() {
        this.#head = null;
        this.#tail = null;
    }

    front() {
        if (this.isEmpty()) throw new Error("List is empty");

        return this.#head.value;
    }

    back() {
        if (this.isEmpty()) throw new Error("List is empty");

        return this.#tail.value;
    }

    at(index) {
        if (!Number.isInteger(index)) throw new Error("index must be integer");
        if (index >= this.size() || index < 0) throw new Error("invalid index");
        let count = this.size() - 1;
        if (index > Math.floor(this.size() / 2)) {
            let curr = this.#tail;

            while (count > index) {
                curr = curr.prev;
                --count;
            }
            return curr.value;
        }
        let curr = this.#head;
        while (index) {
            curr = curr.next;
            --index;
        }
        return curr.value;
    }

    pushFront(value) {
        let node = new Node(value);
        if (this.isEmpty()) {
            this.#head = node;
            this.#tail = node;
            return;
        }

        this.#head.prev = node;
        node.next = this.#head;
        this.#head = node;
    }

    pushBack(value) {
        let node = new Node(value);
        if (this.isEmpty()) {
            this.#tail = node;
            this.#head = node;
            return;
        }
        this.#tail.next = node;
        node.prev = this.#tail;
        this.#tail = node;
    }

    popFront() {
        if (this.isEmpty()) throw new Error("List is empty");
        if (this.#head == this.#tail) {
            let res = this.#head.value;
            this.#head = null;
            this.#tail = null;
            return res;
        }
        let res = this.#head.value;
        this.#head = this.#head.next;
        this.#head.prev = null;
        return res;
    }

    popBack() {
        if (this.isEmpty()) throw new Error("List is empty");
        if (this.#head == this.#tail) {
            let res = this.#head.value;
            this.#head = null;
            this.#tail = null;
            return res;
        }
        let res = this.#tail.value;
        this.#tail = this.#tail.prev;
        this.#tail.next = null;

        return res;
    }

    insert(index, value) {
        if (!Number.isInteger(index)) throw new Error("index must be integer");
        if (index > this.size() || index < 0) throw new Error("invalid index");

        if (this.isEmpty()) {
            this.pushBack(value);
            return;
        }
        if (index === 0) {
            this.pushFront(value);
            return;
        }
        if (index === this.size()) {
            this.pushBack(value);
            return;
        }
        let node = new Node(value);
        let curr = this.#head;

        while (index != 1) {
            curr = curr.next;
            --index;
        }
        let tmp = curr.next;
        curr.next = node;
        node.next = tmp;
        node.prev = curr;
        tmp.prev = node;

    }

    erase(index) {
        if (!Number.isInteger(index)) throw new Error("index must be integer");
        if (index > this.size() || index < 0) throw new Error("invalid index");

        if (index === 0) {
            this.popFront();
            return;
        }
        if (index === this.size() - 1) {
            this.popBack();
            return;
        }

        let curr = this.#head;
        while (index != 0) {
            curr = curr.next;
            --index;
        }
        curr.prev.next = curr.next;
        curr.next.prev = curr.prev;

    }

    find(value) {
        let idx = 0;
        let curr = this.#head;

        while (curr) {
            if (curr.value === value) {
                return idx;
            }
            ++idx;
            curr = curr.next;
        }
        return -1;
    }

    contains(value) {
        let curr = this.#head;

        while (curr) {
            if (curr.value === value) {
                return true;
            }
            curr = curr.next;
        }
        return false;
    }

    toArray() {
        let res = new Array(this.size());
        let curr = this.#head;
        let i = 0;

        while (curr) {
            res[i++] = curr.value;
            curr = curr.next;
        }
        return res;
    }

    reverse() {
        if (!this.#head || !this.#head.next) return this.#head;
        let pr = this.#head;
        let curr = this.#head.next;
        pr.next = null;

        while (curr) {
            let tmp = curr.next ?? null;
            curr.next = pr;
            pr.prev = curr;
            curr.prev = tmp;
            pr = curr;
            curr = tmp;
        }
        this.#tail = this.#head;
        this.#head = pr
        return this.#head;
    }

    sort() {
        this.#head = this.#mergeSort(this.#head);
    }


    #mergeSort(head) {
        if (!head || !head.next) return head;
        let mid = this.#getMid(head);
        let rightHead = mid.next;
        mid.next = null;

        head = this.#mergeSort(head);
        rightHead = this.#mergeSort(rightHead);

        return this.#merge(head, rightHead);
    }

    #merge(left, right) {
        let dummy = new Node(0);
        let curr = dummy;
        while (left && right) {
            if (left.value < right.value) {
                curr.next = left;
                left.prev = curr;
                left = left.next;
            } else {
                curr.next = right;
                right.prev = curr;
                right = right.next;
            }
            curr = curr.next;
        }
        curr.next = right || left;

        if (curr.next) {
            curr.next.prev = curr;
        }
        return dummy.next;
    }

    #getMid(head) {
        let slow = head;
        let fast = head.next;

        while (fast && fast.next) {
            fast = fast.next.next;
            slow = slow.next;
        }
        slow.prev = null;
        return slow;
    }


}

