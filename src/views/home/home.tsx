import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardActions, CardContent, CardHeader, CardMedia } from '@mui/material';

import { homeCards } from '../../core/configs/home-cards.config';

import styles from './home.module.scss';

const Home: FC = () => {
  const navigate = useNavigate();
  const navigateByPath = (path: string): void => {
    navigate(path);
  };

  return (
    <div className={styles.home}>
      <h1 className="home-title">Data structure visualizations</h1>
      <p className="home-content">
        A data structure is a particular way of organizing data in a computer so that it can be used
        effectively.
      </p>
      <div className={styles.homeCards}>
        {homeCards.map((card) => (
          <Card sx={{ minWidth: 275 }} key={card.title}>
            <CardHeader>{card.title}</CardHeader>
            <CardContent>{card.description}</CardContent>
            <CardMedia>
              <img src={card.img} alt={card.title} />
            </CardMedia>
            <CardActions>
              <Button onClick={() => navigateByPath(card.path)}>Try it</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
