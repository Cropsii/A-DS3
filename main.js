import { Stack, Processor, Queue, Task } from "./logic.js";

let queueLength = 5;
const waiting = [];
let time = 0;
let queueMain = new Queue(queueLength);
const stack = new Stack();
const P0 = new Processor("P0");
const P1 = new Processor("P1");

const manualButton = document.getElementById("manual");
const autoButton = document.getElementById("auto");
const closeButton = document.getElementById("close");
const stepButton = document.getElementById("step");
const queueLengthInput = document.getElementById("queueLengthInput");
const manualTask = document.getElementById("manualTask");
const queueBlock = document.getElementById("queue");
const waitingBlock = document.getElementById("waiting");
const p0Block = document.getElementById("P0");
const p1Block = document.getElementById("P1");
const stackBlock = document.getElementById("stack");
const manualForm = manualTask.querySelector("form");


manualForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const arrivalTime = Number(manualForm.arrivalTime.value);
  const timeP0 = Number(manualForm.timeP0.value);
  const timeP1 = Number(manualForm.timeP1.value);

  const newTask = new Task(arrivalTime, timeP0, timeP1);
  waiting.push(newTask);

  render(waiting, waitingBlock);

  manualForm.reset();
  manualTask.classList.remove("show");
});
manualButton.addEventListener("click", () => {
  manualTask.classList.toggle("show");
});
closeButton.addEventListener("click", () => {
  manualTask.classList.remove("show");
});

autoButton.addEventListener("click", () => {
  const newTask = new Task();
  waiting.push(newTask);
  render(waiting, waitingBlock);
});

queueLengthInput.addEventListener("change", (e) => {
  queueLength = e.target.value;
  queueMain = new Queue(queueLength);
});

function render(items, target, title = "") {
  target.innerHTML = "";
  for (const data of items) {
    const div = document.createElement("div");
    div.innerText = JSON.stringify(data);
    div.classList = "flow";
    target.appendChild(div);
  }
}

stepButton.addEventListener("click", () => {
  time++;
  stepButton.innerText = `Шаг ${time}`;

  for (let i = 0; i < waiting.length; i++) {
    const task = waiting[i];
    if (task.arrivalTime <= time && queueMain.size < queueLength) {
      queueMain.enqueue(task);
      waiting.splice(i, 1);
      i--;
    }
  }

  const finishedP0 = P0.tick();
  if (finishedP0) stack.push(finishedP0);
  if (!queueMain.isEmpty && P0.isFree()) {
    const task = queueMain.dequeue();
    P0.assignTask(task, task.timeP0);
  }

  const finishedP1 = P1.tick();
  if (!stack.isEmpty() && P1.isFree()) {
    const task = stack.pop();
    P1.assignTask(task, task.timeP1);
  }

  render(waiting, waitingBlock);
  render(queueMain.queue, queueBlock);
  render([P0.currentTask].filter(Boolean), p0Block);
  render([P1.currentTask].filter(Boolean), p1Block);
  render(stack.stack, stackBlock);
});
