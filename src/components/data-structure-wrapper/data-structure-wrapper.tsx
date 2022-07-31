import React, { FC } from 'react';

import DataForm from '../data-form/data-form';
import styles from './data-structure-wrapper.module.scss';

const DataStructureWrapper: FC<Props> = ({ title, canvasId, addNodeValue }) => (
  <main>
    <h2 className={styles.title}>{title}</h2>
    <DataForm addNodeValue={addNodeValue} />

    <canvas id={canvasId} width="900" height="550" className="visualisation-field" />
  </main>
);

type Props = {
  title: string;
  canvasId: string;
  addNodeValue: (value: string) => void;
};

export default DataStructureWrapper;
