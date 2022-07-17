export class BinaryTreeNodeModel {
  left?: BinaryTreeNodeModel;
  right?: BinaryTreeNodeModel;
  parent?: BinaryTreeNodeModel;
  x = 0;
  y = 0;
  direction: 'right' | 'left' | '';
  leftViewPort = 0;
  rightViewPort = 0;
  data: number;

  constructor(props: { data: number }) {
    const { data } = props;

    this.data = data;
    this.direction = '';
  }
}
