import React, { FC, useEffect } from 'react';

import DataStructureWrapper from '../../components/data-structure-wrapper/data-structure-wrapper';
import { LinkedListVisualisation } from '../../core/features/linked-list/linked-list.visualisation';

const CANVAS_ID = 'linked-list';
let linkedList: LinkedListVisualisation;

const LinkedList: FC = () => {
  useEffect(() => {
    linkedList = new LinkedListVisualisation({ elementId: CANVAS_ID });
  }, []);
  const addNodeValue = (value: string): void => {
    const nodeValue = Number.parseInt(value, 10);
    linkedList.insertNode(nodeValue);
  };

  return (
    <DataStructureWrapper title="Linked List" canvasId={CANVAS_ID} addNodeValue={addNodeValue} />
  );
};

export default LinkedList;
