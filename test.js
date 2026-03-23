class Node {
  constructor(id, green, red, lane) {
    this.id = id;
    this.green = green;
    this.red = red;
    this.lane = lane;
    this.prev = null;
    this.next = null;
  }
}

class DoublyCircularLinkedList {
  constructor() {
    this.head = null;
  }

  insertAtEnd(arrayRef, green, red, lane) {
    const newNode = new Node(arrayRef, green, red, lane);

    if (!this.head) {
      this.head = newNode;
      newNode.next = newNode;
      newNode.prev = newNode;
    } else {
      const lastNode = this.head.prev;

      newNode.next = this.head;
      newNode.prev = lastNode;

      lastNode.next = newNode;
      this.head.prev = newNode;
    }
  }
  displayList() {
    if (!this.head) {
      console.log("The list is empty.");
      return;
    }

    let current = this.head;
    do {
      console.log(`Node:${current.id},${current.green},${current.red}`);
      current = current.next;
    } while (current !== this.head);
  }
}

const dcll = new DoublyCircularLinkedList();

Arraylist1 = [[], []];
Arraylist2 = [[], []];
Arraylist3 = [[], []];
Arraylist4 = [[], []];

dcll.insertAtEnd(Arraylist1, 10, 0, "lane1");
dcll.insertAtEnd(Arraylist2, 10, 10, "lane2");
dcll.insertAtEnd(Arraylist3, 10, 20, "lane3");
dcll.insertAtEnd(Arraylist4, 0, 30, "lane4");

function update(current) {
  let n = 0;
  n = current.prev.id[1].length;
  let newGreenTime = Math.floor((n/2) + 5);
  newGreenTime = Math.min(newGreenTime, 30);
  current.prev.green = newGreenTime;
  current.red = current.prev.red + newGreenTime - current.green;
}

function removevehicles() {
  Arraylist1[0].pop();
  Arraylist2[0].pop();
  Arraylist3[0].pop();
  Arraylist4[0].pop();
}

function lane1(i) {
  for (let j = 1; j <= i; j++) {
    const randomNumber = Math.floor(Math.random() * 2 + 1);
    if (randomNumber == 1) {
      Arraylist1[0].push(1);
    } else if (randomNumber == 2) {
      Arraylist1[1].push(1);
    }
  }
}

function lane2(i) {
  for (let j = 1; j <= i; j++) {
    const randomNumber = Math.floor(Math.random() * 2 + 1);
    if (randomNumber == 1) {
      Arraylist2[0].push(1);
    } else if (randomNumber == 2) {
      Arraylist2[1].push(1);
    } 
  }
}
function lane3(i) {
  for (let j = 1; j <= i; j++) {
    const randomNumber = Math.floor(Math.random() * 2 + 1);
    if (randomNumber == 1) {
      Arraylist3[0].push(1);
    } else if (randomNumber == 2) { 
      Arraylist3[1].push(1);
    } 
  }
}
function lane4(i) {
  for (let j = 1; j <= i; j++) {
    const randomNumber = Math.floor(Math.random() * 2 + 1);
    if (randomNumber == 1) {
      Arraylist4[0].push(1);
    } else if (randomNumber == 2) {
      Arraylist4[1].push(1);
    } 
  }
}

function generateRandomNumber() {
  const randomNumber1 = Math.floor(Math.random() * 2);
  lane1(randomNumber1);
  console.log(`Generated number: ${randomNumber1}`);
  console.log(Arraylist1);
  const randomNumber2 = Math.floor(Math.random() * 2);
  lane2(randomNumber2);
  console.log(`Generated number: ${randomNumber2}`);
  console.log(Arraylist2);
  const randomNumber3 = Math.floor(Math.random() * 2);
  lane3(randomNumber3);
  console.log(`Generated number: ${randomNumber3}`);
  console.log(Arraylist3);
  const randomNumber4 = Math.floor(Math.random() * 2);
  lane4(randomNumber4);
  console.log(`Generated number: ${randomNumber4}`);
  console.log(Arraylist4);
}

function runTrafficCycle() {
  if (!dcll.head) return;
  const current = dcll.head;
  let timeRemaining = current.green;

  let elapsed = 0;
  console.log(
    `\nTraffic Light at Node ${current.lane} is GREEN for ${timeRemaining} seconds.`
  );
  const interval = setInterval(() => {
    elapsed++;
    timeRemaining--;
    removevehicles();
    if (timeRemaining - 3 >= 0) {
      current.id[1].pop();
      current.id[1].pop();

    }
    generateRandomNumber();
    if (timeRemaining <= 0) {
      clearInterval(interval);

      update(current);

      dcll.head = current.next;

      runTrafficCycle();
    }
  }, 1000);
}

console.log("Starting Traffic Control System...");
runTrafficCycle();
