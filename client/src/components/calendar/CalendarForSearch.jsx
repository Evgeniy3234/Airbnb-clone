import React, { useState } from 'react';
import './Calendar.css';
import dayjs from 'dayjs';
import {
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Typography,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';

import Stack from '@mui/material/Stack';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDisableDates } from '../../RTKSlice/rtkslice';

export function CalendarForSearch({ guests, cost }) {
  const { id } = useParams();
  const [checkin, setCheckin] = useState(dayjs(new Date()));
  const [checkout, setCheckOut] = useState(dayjs(new Date()));
  const [person, setPerson] = useState();
  const [bookCost, setBookCost] = useState(1);
  const [duration, setDuration] = useState(0);

  const dispatch = useDispatch();
  const user = useSelector((store) => store.toolkit.user);
  const userId = user.id;

  useEffect(() => {
    disableDate();
  }, []);

  const disable = useSelector((store) => store.toolkit.disableDates);

  const disableDate = () => {
    axios
      .get(`http://localhost:3001/flat/booking/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch(getDisableDates(res.data));
      });
    return false;
  };

  const handleChange = (event) => {
    setPerson(event.target.value);
    const dur = (checkout - checkin) / (60 * 60 * 24 * 1000);
    setDuration(dur);
    setBookCost(dur * cost);
  };

  const handleBooking = () => {
    axios.post(
      `http://localhost:3001/flat/booking/${id}`,
      { id, checkin, checkout, bookCost, duration, person, userId },
      { withCredentials: true }
    );
  };

  const customRenderDate = (date) => {
    const dateToCompare = `${date.$y}-${date.$M + 1}-${date.$D}`;
    const stopDates = disable.map((el) => [
      el.startDate.slice(0, 10),
      el.endDate.slice(0, 10),
    ]);
    for (let i = 0; i < stopDates.length; i++) {
      console.log('stopDates[i]', stopDates[i]);
      if (
        dateToCompare >= stopDates[i][0] &&
        dateToCompare <= stopDates[i][1]
      ) {
        return (
          dateToCompare >= stopDates[i][0] && dateToCompare <= stopDates[i][1]
        );
      }
      //   return false
    }
  };

  return (
    <Box
      marginTop="20px"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        width="300px"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <DatePicker
              disablePast="true"
              label="Прибытие"
              renderInput={(params) => <TextField {...params} />}
              value={checkin}
              onChange={(value) => {
                setCheckin(value);
              }}
              shouldDisableDate={customRenderDate}
            />
          </Stack>
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack spacing={3}>
            <DatePicker
              minDate={checkin}
              disablePast="true"
              label="Выезд"
              renderInput={(params) => <TextField {...params} />}
              value={checkout}
              onChange={(value) => {
                setCheckOut(value);
              }}
              shouldDisableDate={customRenderDate}
            />
          </Stack>
        </LocalizationProvider>
      </Box>
      <FormControl sx={{ m: 1, minWidth: 300 }}>
        <InputLabel id="demo-simple-select-helper-label">Гостей</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={person}
          label="Гостей"
          onChange={handleChange}
        >
          <MenuItem value={1}>1 гость</MenuItem>
          <MenuItem value={2}>2 гостя</MenuItem>
          <MenuItem value={3}>3 гостя</MenuItem>
          <MenuItem value={4}>4 гостя</MenuItem>
        </Select>
      </FormControl>
      <Button
        sx={{ width: '300px', height: '40px' }}
        variant="contained"
        onClick={() => {
          handleBooking();
          // navigate(`/favorite/${userId}`)
          window.location.reload();
        }}
      >
        Забронировать
      </Button>
      <Box
        style={{ display: 'flex', justifyContent: 'space-around', width: 250 }}
      >
        <Typography
          style={{
            paddingTop: '10px',
            color: 'grey',
            textDecoration: 'underline',
          }}
        >
          {`${duration} ночей x ${cost} руб`}
        </Typography>
        {bookCost > 2 ? (
          <>
            <Typography style={{ paddingTop: '10px', color: 'grey' }}>
              {`${bookCost} руб`}
            </Typography>
          </>
        ) : (
          <></>
        )}
      </Box>
      <Typography style={{ paddingTop: '10px', color: 'grey' }}>
        Пока вы ничего не платите
      </Typography>
    </Box>
  );
}
