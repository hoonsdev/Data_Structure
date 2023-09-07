// 바이너리 트리 만드는거는 그냥 트리에서 children 배열을 left, right로 바꿔주면 끝!
// 나보다 작은 애들이 왼쪽, 큰 애들이 오른쪽

export class BinarySearchTree {
  root = null;
  length = 0;
  // hw: tree의 노드 개수 구하기

  #insert(node, value) {
    if (node.value > value) {
      // 재귀로 만든다 -> 서브트리한테 삽입 행위를 맡김(위임)
      // 만약 값이 들어왔는데 내 값보다 크다 -> 오른쪽 서브 트리에 value 넘김 -> 니가 판단해
      // 루트노드보다 작은 값이면
      if (node.left) {
        this.#insert(node.left, value);
      } else {
        node.left = new Node(value);
      }
    } else {
      // 루트노드보다 큰 값이면
      if (node.right) {
        this.#insert(node.right, value);
      } else {
        node.right = new Node(value);
      }
    }
  }
  insert(value) {
    if (!this.root) {
      this.root = new Node(value);
    } else {
      this.#insert(this.root, value);
    }
    // 같은 코드
    // if (this.root.value > value) {
    //   // this.root.left.insert(value);
    //   this.#insert(this.root.left, value);
    // } else {
    //   this.#insert(this.root.right, value);
    // }
  }
  // insert 숙제 : 같은 값을 넣은 경우 에러

  #search(node, value) {
    if (node.value > value) {
      // 더 작은 값 찾을 때
      if (!node.left) {
        return null;
      }
      if (node.left.value === value) {
        return node.left;
      }
      return this.#search(node.left, value);
    } else {
      if (!node.right) {
        return null;
      }
      if (node.right.value === value) {
        return node.right;
      }
      return this.#search(node.right, value);
    }
  }
  search(value) {
    // 어떤 값을 찾으려 할 때, 일단 어디에 있는지 모르겠다
    // 그래서 왼팔, 오른팔한테 맡김 -> 다음으로 넘겨서 니가 찾아
    // 찾으면 그 노드 return, 못 찾으면 null return
    if (!this.root) {
      return null;
    }
    if (this.root.value === value) {
      return this.root;
    }
    return this.#search(this.root, value);
  }
  // 수정하는거는 search 해서 바꿔주기만 하면 돼서 필요 없음!

  #remove(node, value) {
    if (!node) {
      // 왼팔 오른팔 없음 -> 자식 없음 -> 제거할 값이 bst에 존재하지 않음
      return null; // 지울 값이 존재하지 않으면 null return
    }
    if (node.value === value) {
      // 지울 값을 찾은 경우
      // --> 자식 입장(자식의 범위 내에서 찾아서 제거한다, 즉 제거가 수행되는 곳이 자식)
      if (!node.left && !node.right) {
        // leaf
        return null; // 부모한테 말한다 -> 나 잘라줘~~
      } else if (!node.left) {
        // 왼팔만 없는 경우
        return node.right;
      } else if (!node.right) {
        // 오른팔만 없는 경우
        return node.left;
      } else {
        // 둘다 있는 경우
        let exchange = node.left;
        while (exchange.right) {
          exchange = exchange.right;
        }
        let temp = node.value;
        node.value = exchange.value;
        exchange.value = temp.value;
        node.left = this.#remove(node.left, exchange.value);
        return node;
      }
    } else {
      // 찾아보려 했는데 값이 없음... 부모 입장으로, 자식에게 위임하는 행위 일어남!
      // else 뒤로는 자식에게 넘기는 주체가 부모!
      if (node.value > value) {
        node.left = this.#remove(node.left, value); // 재귀 함수가 실행되어 리턴 받은 값을 할당 ... 재귀의 개념 잘 이해하기!
        return node;
      } else {
        node.right = this.#remove(node.right, value);
        return node;
      }
    }
  }
  remove(value) {
    // 1. leaf(양팔 다 없음) -> 제거
    // 2. leaf x, 왼팔 없는 경우 -> 오른팔 끌어올림
    // 3. leaf x, 오른팔 없는 경우 -> 왼팔 끌어올림
    // 4. leaf x, 만약 왼 오 둘다 있는 노드일 경우
    // 왼쪽 중에 가장 오른쪽 한칸만 밑으로 내려가서(자기보다 작음) 계속 오른쪽 방향으로 쭉 트리 타면 나옴
    // 걔를 기존 노드와 자리 바꾸고 leaf 에 달린 기존 노드를 제거
    this.root = this.#remove(this.root, value);
    return; // 숙제로 length return 하게
  }
}
class Node {
  left = null;
  right = null;
  constructor(value) {
    this.value = value;
  }
}

const bst = new BinarySearchTree();
bst.insert(8);
bst.insert(10);
bst.insert(3);
bst.insert(1);
bst.insert(14);
bst.insert(6);
bst.insert(7);
bst.insert(4);
bst.insert(13);
// 막 넣어도 고정된 모양이 나온다
// 넣는 순서만 같으면 같지만, 순서가 달라지면 노드가 달라져서 구조 달라짐!
