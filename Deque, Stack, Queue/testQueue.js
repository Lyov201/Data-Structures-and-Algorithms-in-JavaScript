import { CircularQueue } from "./circularQueue.js";

function assertEqual(actual, expected, msg) {
    const ok = JSON.stringify(actual) === JSON.stringify(expected);
    if (!ok) {
        console.error("❌", msg);
        console.error("Expected:", expected);
        console.error("Got     :", actual);
    } else {
        console.log("✅", msg);
    }
}

/* ================= 1. BASIC ================= */

let q = new CircularQueue(5);

q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

assertEqual(q.front(), 1, "front check");
assertEqual(q.back(), 3, "back check");
assertEqual(q.size(), 3, "size check");

/* ================= 2. DEQUEUE ================= */

q.dequeue();
assertEqual(q.front(), 2, "dequeue front update");
assertEqual(q.size(), 2, "size after dequeue");

/* ================= 3. WRAP AROUND ================= */

q.enqueue(4);
q.enqueue(5);
q.enqueue(6); // wrap case

assertEqual(q.toArray(), [2, 3, 4, 5, 6], "wrap-around order");

/* ================= 4. GROW TEST ================= */

q = new CircularQueue(3);

q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
q.enqueue(4); // grow

assertEqual(q.toArray(), [1, 2, 3, 4], "grow keeps order");

/* ================= 5. GROW + WRAP ================= */

q.dequeue();
q.dequeue();

q.enqueue(5);
q.enqueue(6);
q.enqueue(7);

assertEqual(q.toArray(), [3, 4, 5, 6, 7], "grow + wrap combo");

/* ================= 6. ITERATOR ================= */

const arr1 = [...q];
const arr2 = q.toArray();

assertEqual(arr1, arr2, "iterator matches toArray");

/* ================= 7. EMPTY BEHAVIOR ================= */

q = new CircularQueue(2);

q.enqueue(10);
q.dequeue();

assertEqual(q.isEmpty(), true, "isEmpty after operations");

/* ================= 8. STRESS TEST ================= */

q = new CircularQueue(4);

for (let i = 0; i < 1000; i++) q.enqueue(i);
for (let i = 0; i < 500; i++) q.dequeue();
for (let i = 1000; i < 1500; i++) q.enqueue(i);

assertEqual(q.size(), 1000, "stress size check");