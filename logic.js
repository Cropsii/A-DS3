/**
 * последний-пришел-первым-ушел
 */
export class Stack {
  constructor() {
    this.stack = [];
  }
  push(value) {
    this.stack.push(value);
    return this.stack;
  }
  pop() {
    return this.stack.pop();
  }
  peek() {
    return this.stack.at(-1);
  }
  size() {
    return this.stack.length;
  }
  isEmpty() {
    return this.stack.length < 1;
  }
}

/**
 * первым пришел, первым ушел
 */
export class Queue {
  constructor(value) {
    this.queue = [];
    this.maxSize = value;
  }

  enqueue(value) {
    if(this.size == this.maxSize){
      return
    }
    this.queue.push(value);
    return this.queue;
  }
  /**
   * удаление элемента из начала очереди
   */
  dequeue() {
    return this.queue.shift();
  }

  peek() {
    return this.queue[0];
  }

  get isEmpty() {
    return this.queue.length < 1;
  }
  get size() {
    return this.queue.length;
  }
}
export class Task {
  static nextId = 1;
  constructor(arrivalTime, timeP0, timeP1) {
    this.id = Task.nextId++;
    this.arrivalTime = arrivalTime ?? Math.floor(Math.random() * 15);
    this.timeP0 = timeP0 ?? Math.floor(Math.random() * 5) + 1;
    this.timeP1 = timeP1 ?? Math.floor(Math.random() * 5) + 1;

    this.remainingTime = 0;
  }
}

export class Processor {
  constructor(name, currentTask = null) {
    this.name = name;
    this.currentTask = currentTask;
  }

  isFree() {
    return this.currentTask === null;
  }
  assignTask(task, timeNeeded) {
    task.remainingTime = timeNeeded;
    this.currentTask = task;
  }
  tick() {
    if (!this.currentTask) {
      return;
    }
    this.currentTask.remainingTime--;
    if (this.currentTask.remainingTime <= 0) {
      const temp = this.currentTask;
      this.currentTask = null;
      return temp;
    }
  }
}
console.log("hello");
