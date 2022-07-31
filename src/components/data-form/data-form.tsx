import React, { ChangeEvent, FC, useState } from 'react';
import { Button, TextField } from '@mui/material';

import styles from './data-form.module.scss';

const DataForm: FC<Props> = ({ addNodeValue }) => {
  const [nodeValue, setNodeValue] = useState('');

  const onNodeValueChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setNodeValue(event.target.value);
  };

  const handleClick = (): void => {
    addNodeValue(nodeValue);
    setNodeValue('');
  };

  return (
    <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
      <TextField
        onChange={onNodeValueChange}
        value={nodeValue}
        label="Node value"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
      />
      <Button type="submit" disabled={!nodeValue} onClick={handleClick}>
        Add item
      </Button>
    </form>
  );
};

type Props = {
  addNodeValue: (nodeValue: string) => void;
};

export default DataForm;
