class Stack {
  ll = new LinkedList();
  // 연결 리스트로 구현해보기 -> tail 필요

  push(value) {
    return this.ll.add(value); // push 하고 난 다음 length 반환
  }

  pop() {
    return this.ll.remove(this.ll.length - 1); // 마지막에 pop한 요소를 반환
  }

  top() {
    return this.ll.tail.value;
    // this.arr[this.arr.length - 1] 과 같은 코드
  }

  get length() {
    // getter -> 메서드가 아니라서 stack.length 와 같이 사용 가능
    return this.ll.length;
  }
}

class LinkedList {
  length = 0;
  head = null;
  tail = null;

  add(value) {
    if (this.head) {
      // tail의 next로 새로운 노드 추가
      this.tail.next = new Node(value);
      // 현재 head를 prev로 설정
      this.tail.next.prev = this.tail;
      // 새로 추가한 노드를 tail로 설정
      this.tail = this.tail.next;
    } else {
      // 맨 처음 추가되는 경우
      this.head = new Node(value);
      // 맨 처음 추가될 때는 head = tail
      this.tail = this.head;
    }
    this.length++;
    return this.length;
  }
  search(index) {
    return this.#search(index)[1] && this.#search(index)[1].value;
  }
  // 리팩토링 -> private 클래스
  #search(index) {
    // index는 몇번 넘기는지를 의미함!
    let count = 0;
    let prev;
    let current = this.head;
    while (count < index) {
      prev = current;
      current = current?.next;
      // 옵셔널 체이닝 -> 평가 대상이 null이나 undefined면 undefined 반환
      // 아예 실행되지 않는 경우를 방어 -> 에러로 처리
      count++;
    }
    return [prev, current];
  }
  remove(index) {
    // 예외처리: 1. 아무값도 추가되지 않았는데 삭제하려 할 때 2. 존재하지 않는 인덱스를 삭제하려 할 때
    // prev, current, current.next라 할 때 current를 지우면 prev.next = current.next로!
    const [prev, current] = this.#search(index);
    if (prev && current) {
      prev.next = current.next;
      this.length--;
      return current.value;
    } else if (current) {
      // prev가 없을 때 -> index가 0일 때
      // head를 current의 다음 노드에 연결시켜주면 됨!
      this.head = current.next;
      this.length--;
      return current.value;
    }
    // current가 없음! -> 삭제하고자 하는 대상이 없을 때
    // 1. this.head가 undefined -> 연결 리스트에 아무것도 없을 때
    // 2. current?.next가 undefined -> 찾고자 하는 대상이 없을 때
    // --> 아무것도 안함!
  }
}

class Node {
  next = null;
  prev = null;
  constructor(value) {
    // 외부에서 전달받을 값은 constructor 사용!
    this.value = value;
  }
}

const stack = new Stack();
stack.push(1);
stack.push(3);
stack.push(5);
stack.push(2);
stack.push(4);
stack.length; // 5
console.log(stack.pop()); // 4
console.log(stack.top()); // 2
