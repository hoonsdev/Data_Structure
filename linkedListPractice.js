class LinkedList {
  length = 0;
  head = null;
  tail = null;

  add(value) {
    if (this.head) {
      // tail의 next로 새로운 노드 추가
      this.tail.next = new Node(value);
      // 현재 head를 prev로 설정
      this.tail.prev = this.tail;
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
      return this.length;
    } else if (current) {
      // prev가 없을 때 -> index가 0일 때
      // head를 current의 다음 노드에 연결시켜주면 됨!
      this.head = current.next;
      this.length--;
      return this.length;
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

const ll = new LinkedList();
ll.length;
ll.add(1); // 1
ll.add(2); // 2
ll.add(3); // 3
ll.add(4); // 4
ll.add(5); // 5
ll.add(6); // 6
console.log(ll.search(3)); // 4
console.log(ll.search(5)); // 6
console.log(ll.search(7)); // undefined

ll.search(4);
ll.search(7); // null
ll.remove(4);
ll.search(4); // null
ll.remove(4); // null
console.log(ll.search(10));
