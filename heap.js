class maxHeap {
  // 최대 힙
  // 숙제: 최소 힙 구현
  arr = [];

  #reheapUp(index) {
    // 자리 바꾸는 메커니즘
    if (index > 0) {
      // 부모 인덱스
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.arr[index] > this.arr[parentIndex]) {
        // 추가한 값이 더 크면 부모랑 값 바꾸기
        const temp = this.arr[index];
        this.arr[index] = this.arr[parentIndex];
        this.arr[parentIndex] = temp;
        // 부모 자리에서 재귀적으로 한번 더 실행
        this.#reheapUp(parentIndex);
      }
    }
  }
  insert(value) {
    const index = this.arr.length;
    // 배열의 마지막에 값 넣어줌
    this.arr[index] = value;
    // 추가한 값이 더 크면 ~~~ 메커니즘으로 값 변경
    this.#reheapUp(index);
  }
  #reheapDown(index) {
    const leftIndex = index * 2 + 1;
    if (leftIndex < this.arr.length) {
      // 자식이 있음!
      const rightIndex = index * 2 + 2;
      const bigger =
        this.arr[leftIndex] > this.arr[rightIndex] ? leftIndex : rightIndex;
      if (this.arr[index] < this.arr[bigger]) {
        const temp = this.arr[index];
        this.arr[index] = this.arr[bigger];
        this.arr[bigger] = temp;
        this.#reheapDown(bigger);
      }
    }
  }
  remove() {
    // root 만 remove
    if (this.arr.length === 0) {
      return false;
    }
    if (this.arr.length === 1) {
      return this.arr.pop();
    }
    const root = this.arr[0];
    this.arr[0] = this.arr.pop();
    this.#reheapDown();
    return root;
  }
  sort() {
    // 힙 정렬
    const sortedArr = [];
    while (this.arr.length === 0) {
      sortedArr.push(this.remove());
    }
    return sortedArr;
  }
  search(value) {
    for (let i = 0; i < this.arr.length; i++) {
      if (arr[i] === value) {
        // 값 존재하면 인덱스 리턴
        return i;
      }
    }
    // 없으면 null 리턴
    return null;
  }
  update(value, newValue) {
    const index = this.search(value);
    if (index === null) {
      return false;
    }
    this.arr[index] = newValue;
    for (let i = Math.floor(this.arr.length / 2 - 1); i >= 0; i--) {
      // O(1/2n)
      this.#heapify(i); // O(1)
    }
  }
  removeValue(value) {
    // 특정 값 삭제
    const index = this.search(value);
    if (index === null) {
      return false;
    }
    this.arr.splice(index, 1);
    for (let i = Math.floor(this.arr.length / 2 - 1); i >= 0; i--) {
      // O(1/2n)
      this.#heapify(i); // O(1)
    }
  }
  #heapify(index) {
    const leftIndex = index * 2 + 1;
    const rightIndex = index * 2 + 2;
    const bigger =
      (this.arr[leftIndex] || 0) > (this.arr[rightIndex] || 0)
        ? leftIndex
        : rightIndex;
    console.log(index, this.arr[index], this.arr[bigger]);
    if (this.arr[index] < this.arr[bigger]) {
      const temp = this.arr[index];
      this.arr[index] = this.arr[bigger];
      this.arr[bigger] = temp;
    }
  }
}

const heap = new maxHeap();
heap.insert(8);
heap.insert(19);
heap.insert(23);
heap.insert(32);
heap.insert(78);
heap.insert(56);
heap.insert(46);
heap;
heap.remove();
heap.remove();
heap.remove();
heap.remove();
heap.remove();
heap.remove();
heap.remove();
console.log(heap.sort());
