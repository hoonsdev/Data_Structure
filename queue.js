export class Queue {
  arr = [];

  enqueue(value) {
    return this.arr.push(value); // push 하고 난 다음 length 반환
  }

  dequeue() {
    return this.arr.shift(); // 마지막에 pop한 요소를 반환
  }

  peek() {
    return this.arr[0];
  }

  get length() {
    return this.arr.length;
  }
}

const queue = new Queue();
queue.enqueue(1);
queue.enqueue(3);
queue.enqueue(5);
queue.enqueue(2);
queue.enqueue(4);
console.log(queue.length); // 5
queue.dequeue(); // 1
console.log(queue.peek()); // 3
