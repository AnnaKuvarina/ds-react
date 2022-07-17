import { DefaultBlock, NodeCoordinates, VisualisedLinkedListNode } from './linked-list.model';

import { linkedListConfig } from './linked-list.config';
import { LinkedList } from './linked-list';

export class LinkedListVisualisation extends LinkedList {
  private readonly canvas: CanvasRenderingContext2D | null;
  private headBlock: DefaultBlock = {
    x: 50,
    y: 50,
    textX: 70,
    textY: 62,
    text: 'head',
    linkX: 70,
    linkY: 75,
  };

  private tailBlock: DefaultBlock = {
    x: 50,
    y: 500,
    textX: 70,
    textY: 512,
    text: 'tail',
    linkX: 70,
    linkY: 500,
  };

  private defaultBlocks = [this.headBlock, this.tailBlock];

  constructor(props: { elementId: string }) {
    super();
    const canvasElement = document.getElementById(props.elementId) as HTMLCanvasElement;
    this.canvas = canvasElement.getContext('2d');

    this.setTextStyles();
    this.drawDefaultBlocks();
  }

  insertNode(value: number): void {
    super.insertNode(value);
    this.setCoordinatesToNode();
  }

  private setCoordinatesToNode(): void {
    const { headX, headY, indentY, indentX } = linkedListConfig;

    if (!this.head) {
      return;
    }

    if (this.head === this.tailNode) {
      this.head.x = headX;
      this.head.y = headY;
      this.head.linkPrevX = this.headBlock.linkX;
      this.head.linkPrevY = this.headBlock.linkY;
      this.head.linkToX = this.head.x + indentX;
      this.head.linkToY = this.head.y;
      this.head.linkFromX = this.head.linkToX;
      this.head.linkFromY = this.head.y + indentY;
      this.drawNode(this.head);
    } else if (this.tailNode) {
      const parentNode = this.getParent(this.tailNode);
      if (!parentNode) {
        return;
      }

      const { nodeX, nodeY } = LinkedListVisualisation.getCoordinates(parentNode);
      this.tailNode.x = nodeX;
      this.tailNode.y = nodeY;
      this.tailNode.linkPrevX = parentNode.linkFromX || 0;
      this.tailNode.linkPrevY = parentNode.linkFromY || 0;
      this.tailNode.linkToX = this.tailNode.x;
      this.tailNode.linkToY = this.tailNode.y + indentY;
      this.tailNode.linkFromX = this.tailNode.x + indentX;
      this.tailNode.linkFromY = this.tailNode.y + indentY;
      this.reDrawTailNodes(parentNode);
    }
  }

  private getParent(node: VisualisedLinkedListNode): VisualisedLinkedListNode | null {
    let parentNode = { ...this.head } as VisualisedLinkedListNode | null;
    while (parentNode?.next !== node) {
      parentNode = parentNode?.next || null;
    }

    return parentNode;
  }

  private reDrawTailNodes(node: VisualisedLinkedListNode): void {
    this.clearAreaUnderNode(node);
    const { nodeWidth, nodeHeight } = linkedListConfig;
    this.canvas?.clearRect(node.x, node.y, nodeWidth, nodeHeight);
    this.drawNode(node);
    this.drawNode(this.tailNode);
  }

  private static getCoordinates(prevNode: VisualisedLinkedListNode): NodeCoordinates {
    const { nodeIndent, extremeX, rowIndent, headX } = linkedListConfig;
    const newCoordinateX = prevNode.x + nodeIndent;
    let nodeX = newCoordinateX;
    let nodeY = prevNode.y;

    if (newCoordinateX >= extremeX) {
      nodeX = headX;
      nodeY = prevNode.y + rowIndent;
    }

    return { nodeX, nodeY };
  }

  private clearAreaUnderNode(node: VisualisedLinkedListNode): void {
    const { canvasWidth, nodeWithBorderHeight, canvasClearHeight } = linkedListConfig;
    const clearHeight = canvasClearHeight - node.y;
    this.canvas?.clearRect(0, node.y + nodeWithBorderHeight, canvasWidth, clearHeight);
  }

  private drawTailLink(node: VisualisedLinkedListNode): void {
    if (!this.canvas) {
      return;
    }
    const { nodeHeight, indentX } = linkedListConfig;
    this.canvas.beginPath();
    this.canvas.strokeStyle = '#3a3f53';
    this.canvas.moveTo(this.tailBlock.linkX, this.tailBlock.linkY);
    this.canvas.lineTo(node.x + indentX, node.y + nodeHeight);
    this.canvas.stroke();
  }

  private drawDefaultBlocks(): void {
    const { strokeColor, defaultBlockWidth, defaultBlockHeight } = linkedListConfig;
    this.defaultBlocks.forEach((block) => {
      if (!this.canvas) {
        return;
      }
      this.canvas.beginPath();
      this.canvas.strokeStyle = strokeColor;
      this.canvas.rect(block.x, block.y, defaultBlockWidth, defaultBlockHeight);
      this.canvas.stroke();
      this.canvas.closePath();
      this.canvas.fillText(block.text, block.textX, block.textY);
    });
  }

  private drawNode(node: VisualisedLinkedListNode | null): void {
    if (!node) {
      return;
    }

    const {
      innerRectWidth,
      innerRectIndent,
      nodeWidth,
      nodeHeight,
      strokeColor,
      indentTextX,
      indentTextY,
    } = linkedListConfig;
    const innerRect = {
      x: node.x + innerRectIndent,
      y: node.y,
      width: innerRectWidth,
      topRightX: node.x + nodeWidth,
      bottomLeftY: node.y + nodeHeight,
    };

    if (!this.canvas) {
      return;
    }
    this.canvas.strokeStyle = strokeColor;
    this.canvas.rect(node.x, node.y, nodeWidth, nodeHeight);
    this.canvas.stroke();
    this.canvas.fillText(`${node.data}`, node.x + indentTextX, node.y + indentTextY);
    this.canvas.rect(innerRect.x, innerRect.y, innerRect.width, nodeHeight);
    this.canvas.stroke();

    if (!node.next) {
      this.canvas.beginPath();
      this.canvas.moveTo(innerRect.x, innerRect.bottomLeftY);
      this.canvas.lineTo(innerRect.topRightX, innerRect.y);
      this.canvas.stroke();
      this.drawTailLink(node);
    }

    this.drawLink(node);
  }

  private drawLink(node: VisualisedLinkedListNode): void {
    const { strokeColor } = linkedListConfig;
    if (!this.canvas) {
      return;
    }
    this.canvas.beginPath();
    this.canvas.strokeStyle = strokeColor;
    this.canvas.moveTo(node.linkToX, node.linkToY);
    this.canvas.lineTo(node.linkPrevX, node.linkPrevY);
    this.canvas.stroke();
  }

  private setTextStyles(): void {
    if (!this.canvas) {
      return;
    }
    this.canvas.textAlign = 'center';
    this.canvas.font = '15px sans-serif';
    this.canvas.textBaseline = 'middle';
  }
}
