import { BinaryTreeNodeModel } from './binary-tree-node.model';
import { binaryTreeConfig } from './binary-tree.config';

export class BinaryTree {
  root: BinaryTreeNodeModel | null = null;
  newNode: BinaryTreeNodeModel | null = null;
  isRight = false;
  indent = 0;

  insertNode(newNodeData: number): void {
    const node = new BinaryTreeNodeModel({
      data: newNodeData,
    });

    const { rootX, rootY, indentY, indentX, circleRadius, moveIndentX } = binaryTreeConfig;
    let currentNode;

    if (!this.root) {
      this.root = node;
      this.root.x = rootX;
      this.root.y = rootY;
      this.root.leftViewPort = rootX - circleRadius;
      this.root.rightViewPort = rootX + circleRadius;
    } else {
      currentNode = this.root;
      this.isRight = this.root.data < newNodeData;
      this.indent = this.root.data < newNodeData ? moveIndentX : -moveIndentX;

      while (currentNode) {
        if (newNodeData > currentNode.data) {
          if (!currentNode.right) {
            currentNode.right = node;
            const nodeX = currentNode.x + indentX;
            currentNode.right.x = nodeX;
            currentNode.right.y = currentNode.y + indentY;
            currentNode.right.direction = 'right';
            currentNode.right.rightViewPort = nodeX + circleRadius;
            currentNode.right.leftViewPort = nodeX - circleRadius;

            if (currentNode.parent) {
              this.updateViewPortOfAllParents(
                currentNode,
                'rightViewPort',
                currentNode.right.rightViewPort,
              );
            } else {
              currentNode.rightViewPort = currentNode.right.rightViewPort;
            }

            currentNode.right.parent = currentNode;
            this.newNode = currentNode.right;

            break;
          } else {
            currentNode = currentNode.right;
          }
        } else if (!currentNode.left) {
          currentNode.left = node;
          const nodeX = currentNode.x - indentX;
          currentNode.left.x = nodeX;
          currentNode.left.direction = 'left';
          currentNode.left.y = currentNode.y + indentY;
          currentNode.left.rightViewPort = nodeX + circleRadius;
          currentNode.left.leftViewPort = nodeX - circleRadius;

          if (currentNode.parent) {
            this.updateViewPortOfAllParents(
              currentNode,
              'leftViewPort',
              currentNode.left.leftViewPort,
            );
          } else {
            currentNode.leftViewPort = currentNode.left.leftViewPort;
          }

          currentNode.left.parent = currentNode;
          this.newNode = currentNode.left;

          break;
        } else {
          currentNode = currentNode.left;
        }
      }
    }
  }

  updateViewPortOfAllParents(
    parentNode: BinaryTreeNodeModel,
    viewport: string,
    value: number,
  ): void {
    if (parentNode.parent) {
      if (
        (viewport === 'leftViewPort' && parentNode[viewport] > value) ||
        (viewport === 'rightViewPort' && parentNode[viewport] < value)
      ) {
        parentNode[viewport] = value;
      }

      this.updateViewPortOfAllParents(parentNode.parent, viewport, value);
    }
  }
}
