import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button, Card, CardContent, Typography, CardMedia, CardActions } from '@mui/material';

import { homeCards } from '../../core/configs/home-cards.config';

import styles from './home.module.scss';

const Home: FC = () => {
  const navigate = useNavigate();
  const navigateByPath = (path: string): void => {
    navigate(path);
  };

  return (
    <div className={styles.home}>
      <h1 className={styles.homeTitle}>Data structure visualizations</h1>
      <p className={styles.homeContent}>
        A data structure is a particular way of organizing data in a computer so that it can be used
        effectively.
      </p>
      <div className={styles.homeCards}>
        {homeCards.map((card) => (
          <Card className={styles.card} sx={{ minWidth: 275 }} key={card.title}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {card.title}
              </Typography>
              <CardMedia component="img" height="140" image={card.img} alt={card.title} />
              <div className={styles.cardDescription}>{card.description}</div>
            </CardContent>
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
