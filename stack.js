export class Stack {
  arr = [];
  // 연결 리스트로 구현해보기 -> tail 필요

  push(value) {
    return this.arr.push(value); // push 하고 난 다음 length 반환
  }

  pop() {
    return this.arr.pop(); // 마지막에 pop한 요소를 반환
  }

  top() {
    return this.arr.at(-1);
    // this.arr[this.arr.length - 1] 과 같은 코드
  }

  get length() {
    // getter -> 메서드가 아니라서 stack.length 와 같이 사용 가능
    return this.arr.length;
  }
}

const stack = new Stack();
stack.push(1);
stack.push(3);
stack.push(5);
stack.push(2);
stack.push(4);
stack.length; // 5
stack.pop(); // 4
console.log(stack.top()); // 2
