import React, {useState} from 'react';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider,CalendarPicker } from '@mui/x-date-pickers';
import { useSelector } from 'react-redux';


export const CalendarForFlat = () => {

  const disableDate = useSelector((store) => store.toolkit.disableDates)

  const [date, setDate] = useState(dayjs(new Date()))

  const customRenderDate = (date) => {
    const dateToCompare = `${date.$y}-${date.$M + 1}-${date.$D}`
    const stopDates = disableDate.map((el) => (
      [el.startDate.slice(0,10), el.endDate.slice(0,10)]
    ))
    for (let i = 0; i < stopDates.length; i++) {
      console.log('stopDates[i]', stopDates[i]);
      if (dateToCompare >= stopDates[i][0] && dateToCompare <= stopDates[i][1]){
        return dateToCompare >= stopDates[i][0] && dateToCompare <= stopDates[i][1]
      }
    }
  }

    return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <CalendarPicker 
          date={date} 
          onChange={(newDate) => setDate(newDate)} 
          disablePast={true}
          shouldDisableDate={customRenderDate}
          />
        </Grid>
      </Grid>
    </LocalizationProvider>
    )
}



