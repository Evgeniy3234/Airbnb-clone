import * as React from 'react';
import './Calculator.css';
import { Box, Typography } from '@mui/material';
import axios from 'axios';
import CurrencyRubleIcon from '@mui/icons-material/CurrencyRuble';
import { CalendarForSearch } from '../calendar/CalendarForSearch';
import { useEffect, useState } from 'react';

export const Calculator = ({ id }) => {
  const [cost, setCost] = useState('');
  const [rate, setRate] = useState(0);
  const [guests, setGuests] = useState(0);

  useEffect(() => {
    flatHandler();
  }, []);

  const flatHandler = () => {
    axios
      .post(
        `http://localhost:3001/flat/${id}`,
        { id },
        { withCredentials: true }
      )
      .then((res) => {
        setCost(res.data.jsonFlat);
        const avgRate = res.data.review.reduce((acc, el) => acc + el.rate, 0);
        setRate(Math.floor((avgRate / res.data.review.length) * 10) / 10);
        setGuests(res.data.jsonFlat.guestsQty);
      });
  };

  return (
    <Box className="calc">
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Typography
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
          variant="h5"
        >
          {cost.costPerNight}
          <CurrencyRubleIcon />
        </Typography>
      </Box>
      <CalendarForSearch
        id={id}
        guests={guests}
        cost={cost.costPerNight}
      />
    </Box>
  );
};
