# Data Structures in JavaScript

This project contains implementations of three fundamental data structures:

## 1. BucketedDeque

A double-ended queue implemented using a bucketed storage strategy. It supports efficient insertion and removal from both the front and the back.

### Operations

* `push_front`
* `push_back`
* `pop_front`
* `pop_back`
* `front`
* `back`
* `size`
* `isEmpty`
* `clear`
* `toArray`
* Iteration with `Symbol.iterator`

## 2. Queue

A FIFO (First In, First Out) data structure implemented using `BucketedDeque`.

### Operations

* `enqueue`
* `dequeue`
* `front`
* `back`
* `size`
* `isEmpty`
* `clear`
* `toArray`
* Iterator support

## 3. Stack

A LIFO (Last In, First Out) data structure implemented using `BucketedDeque`.

### Operations

* `push`
* `pop`
* `peek`
* `size`
* `isEmpty`
* `clear`
* `toArray`
* Iterator support

## Implementation Idea

The `BucketedDeque` serves as the core data structure. Both `Queue` and `Stack` are lightweight wrappers around it:

* Queue uses back insertion and front removal.
* Stack uses back insertion and back removal.

This design avoids duplicating storage logic and demonstrates code reuse through composition.
