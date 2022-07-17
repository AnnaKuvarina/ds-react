import { VisualisedLinkedListNode } from './linked-list.model';

export class LinkedList {
  head: VisualisedLinkedListNode | null = null;
  tailNode: VisualisedLinkedListNode | null = null;

  insertNode(value: number): void {
    const node: VisualisedLinkedListNode = {
      data: value,
      next: null,
      x: 0,
      y: 0,
      linkPrevX: 0,
      linkPrevY: 0,
      linkFromX: 0,
      linkFromY: 0,
      linkToX: 0,
      linkToY: 0,
    };

    if (!this.head) {
      this.head = node;
    }

    if (this.tailNode) {
      this.tailNode.next = node;
    }

    this.tailNode = node;
  }
}
