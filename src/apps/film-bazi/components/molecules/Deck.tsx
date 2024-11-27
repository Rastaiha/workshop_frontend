import React, { FC, useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { CardType } from 'apps/film-bazi/types';
import DeckCard from '../organisms/cards/DeckCard';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';


type DeckPropsType = {
  cards: CardType[];
  setCards?: any;
  onCardClick?: any;
  onRemoveCard?: any;
}

const Deck: FC<DeckPropsType> = ({
  cards,
  setCards,
  onCardClick,
  onRemoveCard,
}) => {

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const dndBackend = isMobile ? TouchBackend : HTML5Backend;

  const moveCard = (dragIndex: number, dropIndex: number) => {
    setCards((prevCards) => {
      const updatedCards = [...prevCards];
      const [draggedCard] = updatedCards.splice(dragIndex, 1);
      updatedCards.splice(dropIndex, 0, draggedCard);
      return updatedCards;
    });
  };

  return (
    <Stack
      spacing={2}
      direction={'row'}
      overflow={'auto'}
      sx={{
        height: 230,
        width: '100%',
        paddingBottom: 1,
        '::-webkit-scrollbar': {
          height: '8px',
        },
        '::-webkit-scrollbar-thumb': {
          backgroundColor: '#b0bec5',
          borderRadius: '8px',
        },
        '::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#90a4ae',
        },
      }}
    >
      <DndProvider backend={dndBackend}>
        {cards.map((card, index) => (
          <Box key={index} sx={{ flex: '0 0 auto' }}>
            <DeckCard
              index={index}
              card={card}
              onCardClick={onCardClick}
              onRemoveCard={onRemoveCard}
              moveCard={moveCard}
              isDraggable={onRemoveCard ? true : false}
            />
          </Box>
        ))}
      </DndProvider>
      {cards.length === 0 &&
        <Typography>
          {'کارتی وجود ندارد'}
        </Typography>
      }
    </Stack>
  );
};

export default Deck;
