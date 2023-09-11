// 숙제: minHeap 구하기, maxHeap <-> minHeap
// reheapUp, reheapDown, heapify 만 잘 수정하면 될듯?

class minHeap {
  // 최대힙
  // 완전 이진 트리 -> 넣어준 순서대로 트리 구성 -> 배열을 통해 힙 구현
  arr = [];

  #reheapUp(index) {
    // 힙 정렬하는 함수
    // 값을 추가했을 때 부모랑 비교해서 자리 바꾸고, 또 그 값을 부모랑 비교해서 자리 바꿈
    if (index > 0) {
      // index > 0 -> 루트가 아닐 경우!
      // 넣어주는 요소의 인덱스가 index -> parentIndex는 부모 요소 인덱스
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.arr[index] < this.arr[parentIndex]) {
        // 부모보다 값이 작다면 값 바꾸기
        const temp = this.arr[index];
        this.arr[index] = this.arr[parentIndex];
        this.arr[parentIndex] = temp;
        // 바꾼 요소에 대해서 다시 한번 재귀적으로 reheapUp 실행
        this.#reheapUp(parentIndex);
      }
    }
  }
  insert(value) {
    const index = this.arr.length;
    this.arr[index] = value;
    // 배열의 끝에 새로운 값 추가
    this.#reheapUp(index);
    // 힙을 다시 정렬
  }
  #reheapDown(index) {
    const leftIndex = index * 2 + 1; // 왼쪽 자식 요소
    if (leftIndex < this.arr.length) {
      // 자식의 index가 전체 길이보다 작다! -> 자식이 있을 경우까지만 반복
      const rightIndex = index * 2 + 2; // 오른쪽 자식 요소
      const smaller =
        this.arr[leftIndex] < this.arr[rightIndex] ? leftIndex : rightIndex; // 왼쪽 자식 요소와 오른쪽 자식 요소 중 작은 값
      if (this.arr[index] > this.arr[smaller]) {
        // index의 요소가 왼, 오 중 더 큰 값(=자식 요소)보다 작다면!
        // 자리바꿈
        const temp = this.arr[index];
        this.arr[index] = this.arr[smaller];
        this.arr[smaller] = temp;
        this.#reheapDown(smaller); // 위로 올라온
      }
    }
  }
  remove() {
    // 루트 삭제
    if (this.arr.length === 0) {
      return false;
    }
    if (this.arr.length === 1) {
      // 루트만 있을 경우 제거한 대상을 반환
      return this.arr.pop();
    }
    const root = this.arr[0];
    this.arr[0] = this.arr.pop(); // 마지막꺼 뽑아서 루트에 삽입. 루트만 있을 경우 다시 넣으면 의미 없음.
    this.#reheapDown(0); // 루트부터 시작해서 자식 요소 값이랑 무한히 비교해서 힙 정렬. 값 뽑아버리면 올라와서 내려가고... 이 과정 반복하는 느낌
    // 삭제 후 루트의 값을 반환
    return root;
  }
  sort() {
    // 힙 정렬
    // 원래 힙에 있던거 루트 제거해서 출력, 제거 출력 반복하면 정렬된 형태로 출력됨
    const sortedArray = [];
    while (this.arr.length > 0) {
      // 제거하는 행위를 배열의 길이만큼 해줌
      sortedArray.push(this.remove());
    }
    // 정렬된 배열 반환
    return sortedArray;
  }
  search(value) {
    // 검색
    for (let i = 0; i < this.arr.length; i++) {
      if (this.arr[i] === value) {
        // i번째 요소가 찾는 value 이면 인덱스 반환
        return i;
      }
    }
    // 못찾으면 null 반환
    return null;
  }
  update(value, newValue) {
    const index = this.search(value); // 특정 요소를 일단 찾아 -> 인덱스 반환
    if (index === null) {
      // 찾는 요소 없을 때
      return false;
    }
    this.arr[index] = newValue; // 새로운 요소를 arr의 index번째 요소로 수정
    for (let i = Math.floor(this.arr.length / 2 - 1); i >= 0; i--) {
      // O(1/2n)
      this.#heapify(i); // 힙이 깨지면 heapify로 힙으로 돌려줌 -> O(1)
    }
  }
  removeValue(value) {
    // 특정 값 삭제
    const index = this.search(value);
    if (index === null) {
      return false;
    }
    // this.arr[index] = this.arr.pop(); 이건 잘 이해를 못하겠다
    this.arr.splice(index, 1); // index에 해당하는 요소를 없애버림
    for (let i = Math.floor(this.arr.length / 2 - 1); i >= 0; i--) {
      // 마지막 요소 index = this.arr.length -> Math.floor(this.arr.length / 2 - 1) 은 leaf가 아닌 행에 있는 것 중 가장 오른쪽에 있는 놈
      // 이놈부터 시작해서 루트까지 heapify 반복
      // O(1/2n)
      this.#heapify(i); // O(1)
    }
  }
  #heapify(index) {
    // 특정 값을 수정하거나 삭제할 때 내부적으로 쓰이는 함수 -> 찾고 값 바꾸는거 자체는  O(1)
    // leaf가 아닌 마지막 기준으로 첫번째에 있는 애들(트리 기준으로 같은 행(depth)에 있는 애들)을 찾고
    // 걔네들이랑 자식 요소랑 비교 -> 값 바꿀 수 있으면 바꿈 (여기서 행에 있는 모든 요소에 대해서 시행됨)
    // 그리고 나서 위로 올라가서 또 자식이랑 비교하고... 루트까지!
    // 이 행위가 O(n/2) 인데 이건 O(n)과 같다
    const leftIndex = index * 2 + 1;
    const rightIndex = index * 2 + 2;
    const smaller =
      (this.arr[leftIndex] || 0) < (this.arr[rightIndex] || 0)
        ? leftIndex
        : rightIndex; // undefined랑 값을 비교하면 false가 나와서 값이 있으면 그냥 그 값이고, 없으면 0으로 비교
    console.log(index, this.arr[index], this.arr[smaller]);
    if (this.arr[index] > this.arr[smaller]) {
      const temp = this.arr[index];
      this.arr[index] = this.arr[smaller];
      this.arr[smaller] = temp;
    }
  }
}

const heap = new minHeap();
heap.insert(8);
heap.insert(19);
heap.insert(23);
heap.insert(32);
heap.insert(45);
heap.insert(56);
heap.insert(78);
heap.update(23, 90);
heap.removeValue(32);
console.log('힙 소트 결과는 >> ', heap.sort());
