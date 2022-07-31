import React, { FC, useEffect } from 'react';

import { BinaryTreeVisualisation } from '../../core/features/binary-tree';
import DataStructureWrapper from '../../components/data-structure-wrapper/data-structure-wrapper';

let tree: BinaryTreeVisualisation;
const BinaryTree: FC = () => {
  useEffect(() => {
    tree = new BinaryTreeVisualisation();
  }, []);

  const addNodeValue = (value: string): void => {
    if (value) {
      const nodeValue = Number.parseInt(value, 10);
      tree.insertNode(nodeValue);
    }
  };

  return (
    <DataStructureWrapper title="Binary Tree" canvasId="binary-tree" addNodeValue={addNodeValue} />
  );
};

export default BinaryTree;
