import { BinaryTreeNodeModel } from './binary-tree-node.model';
import { binaryTreeConfig } from './binary-tree.config';
import { BinaryTree } from './binary-tree';

const DRAW_TIMEOUT = 500;
const ANGLE_COEF = 2;

export class BinaryTreeVisualisation extends BinaryTree {
  private readonly canvas: CanvasRenderingContext2D | null;

  constructor() {
    super();
    const canvasElement = document.getElementById('binary-tree') as HTMLCanvasElement;
    this.canvas = canvasElement.getContext('2d');

    this.setTextStyles();
  }

  insertNode(newNodeData: number): void {
    super.insertNode(newNodeData);
    this.drawTree();
  }

  drawTree(): void {
    if (!this.root) {
      return;
    }

    if (!this.newNode) {
      this.animateNewNode(this.root);
      return;
    }

    if (this.newNode.parent?.data !== this.root.data && this.areCoordinatesUpdated(this.newNode)) {
      this.reDrawTree();
    }

    this.animateNewNode(this.newNode);
  }

  private drawNode(node: BinaryTreeNodeModel, fillColor: string, strokeColor: string): void {
    if (!this.canvas) {
      return;
    }
    const { circleRadius } = binaryTreeConfig;

    this.canvas.beginPath();
    this.canvas.fillStyle = fillColor;
    this.canvas.strokeStyle = strokeColor;
    this.canvas.arc(node.x, node.y, circleRadius, 0, ANGLE_COEF * Math.PI, true);
    this.canvas.closePath();
    this.canvas.fill();
    this.canvas.stroke();
    this.canvas.strokeText(`${node.data}`, node.x, node.y);
  }

  private drawLink(node: BinaryTreeNodeModel): void {
    if (!this.canvas) {
      return;
    }

    if (node.parent) {
      this.canvas.beginPath();
      this.canvas.moveTo(node.parent.x, node.parent.y + binaryTreeConfig.circleRadius);
      this.canvas.lineTo(node.x, node.y);
      this.canvas.stroke();
    }
  }

  private animateNewNode(node: BinaryTreeNodeModel): void {
    const { activeFillColor, activeStrokeColor, circleFillColor, circleStrokeColor, circleRadius } =
      binaryTreeConfig;

    if (node.parent) {
      this.drawLink(node);
    }
    this.drawNode(node, activeFillColor, activeStrokeColor);

    setTimeout(() => {
      this.canvas?.clearRect(node.x, node.y, circleRadius, circleRadius);
      this.drawNode(node, circleFillColor, circleStrokeColor);
    }, DRAW_TIMEOUT);
  }

  private setTextStyles(): void {
    if (!this.canvas) {
      return;
    }
    this.canvas.textAlign = 'center';
    this.canvas.font = '15px sans-serif';
    this.canvas.textBaseline = 'middle';
  }

  private reDrawTree(): void {
    const { width, height } = binaryTreeConfig;
    this.canvas?.clearRect(0, 0, width, height);
    if (this.root) {
      this.drawAllNodes(this.root);
    }
  }

  private drawAllNodes(node: BinaryTreeNodeModel): void {
    const { circleFillColor, circleStrokeColor } = binaryTreeConfig;
    if (node?.parent) {
      this.drawLink(node);
    }

    this.drawNode(node, circleFillColor, circleStrokeColor);
    if (node.left != null) {
      this.drawAllNodes(node.left);
    }

    if (node.right != null) {
      this.drawAllNodes(node.right);
    }
  }

  private reSetChildCoordinateX(node: BinaryTreeNodeModel, indent: number): void {
    node.x += indent;
    node.leftViewPort += indent;
    node.rightViewPort += indent;

    if (node.left != null) {
      this.reSetChildCoordinateX(node.left, indent);
    }

    if (node.right != null) {
      this.reSetChildCoordinateX(node.right, indent);
    }
  }

  private areCoordinatesUpdated(node: BinaryTreeNodeModel): boolean {
    const { parallelNodeDirection, nodeViewPort } = binaryTreeConfig;
    let childBranchDirection = node.direction && parallelNodeDirection[node.direction];
    let currentNode: BinaryTreeNodeModel = node;
    let parentNode: BinaryTreeNodeModel | undefined = node.parent;
    let wasUpdated = false;
    while (parentNode) {
      const parallelNode =
        (childBranchDirection === 'right' || childBranchDirection === 'left') &&
        parentNode[childBranchDirection];

      if (parallelNode) {
        if (BinaryTreeVisualisation.areNodesIntersect(currentNode, parallelNode)) {
          let viewPort;
          const indent = this.getIndent(currentNode, parallelNode);

          if (
            (!this.isRight && currentNode.direction === 'left') ||
            (this.isRight && currentNode.direction === 'right')
          ) {
            this.moveChildNode(currentNode, indent);
            viewPort = nodeViewPort[currentNode.direction];
            if (viewPort === 'rightViewPort' || viewPort === 'leftViewPort') {
              this.updateViewPortOfAllParents(parentNode, viewPort, currentNode[viewPort]);
            }
          }

          if (
            (!this.isRight && currentNode.direction === 'right') ||
            (this.isRight && currentNode.direction === 'left')
          ) {
            // replaced parentNode[childBranchDirection] with parallelNode
            this.moveChildNode(parallelNode, indent);
            viewPort = parallelNode.direction && nodeViewPort[parallelNode.direction];
            if (viewPort === 'rightViewPort' || viewPort === 'leftViewPort') {
              this.updateViewPortOfAllParents(parentNode, viewPort, parallelNode[viewPort]);
            }
          }

          wasUpdated = true;
        }
      }

      childBranchDirection = parentNode.direction && parallelNodeDirection[parentNode.direction];
      currentNode = parentNode;
      parentNode = parentNode.parent;
    }

    return wasUpdated;
  }

  private getIndent(currentNode: BinaryTreeNodeModel, parallelNode: BinaryTreeNodeModel): number {
    let difference;
    if (currentNode.direction === 'right') {
      difference = this.isRight
        ? parallelNode.rightViewPort - currentNode.leftViewPort
        : currentNode.leftViewPort - parallelNode.rightViewPort;
    } else {
      difference = this.isRight
        ? currentNode.rightViewPort - parallelNode.leftViewPort
        : parallelNode.leftViewPort - currentNode.rightViewPort;
    }

    if (this.isRight) {
      return difference > this.indent ? difference : this.indent;
    }

    return difference < this.indent ? difference : this.indent;
  }

  private moveChildNode(node: BinaryTreeNodeModel, indent: number): void {
    this.reSetChildCoordinateX(node, indent);
  }

  private static areNodesIntersect(
    currentNode: BinaryTreeNodeModel,
    parallelNode: BinaryTreeNodeModel,
  ): boolean {
    if (currentNode.direction === 'right') {
      return currentNode.leftViewPort <= parallelNode.rightViewPort;
    }
    return currentNode.rightViewPort >= parallelNode.leftViewPort;
  }
}
