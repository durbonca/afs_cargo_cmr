import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';
// import { Button } from '@material-ui/core'
import styled from 'styled-components';
// import { add, /* isSameDay */ } from 'date-fns';

const useStyles = makeStyles({
  date: {
    width: '80%',
    height: '48px',
    margin: '0px 15px 0 15px',
  },
});

const GroupFieldsContainer = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-right: 40px;
  &:nth-last-of-type(1) {
    margin-right: 0;
    margin-left: auto;
  }
`;

// const activeButtonStyle = { backgroundColor: '#0070D2', color: 'white', borderColor: '#0070D2' };
// const defaultButtonStyle = { backgroundColor: 'white', color: '#0070D2', borderColor: 'rgba(0, 0, 0, 0.23)' };

export default function DateRangePicker({ onChange, onSubmit, disableFuture, disablePast, handleErrors }) {
  // const today = new Date();
  // const last7Days = add(new Date(), { days: -7 });

  const defaultDateRange = { startDate: null, endDate: null };

  const [dateRange, setDateRange] = React.useState(defaultDateRange);
  const [errors, setErrors] = React.useState({ startDate: '', endDate: '' });

  // const rangeIsLast7Days = isSameDay(dateRange?.startDate, last7Days) && isSameDay(dateRange?.endDate, today);
  // const rangeIsToday = isSameDay(dateRange?.startDate, today) && isSameDay(dateRange?.endDate, today);

/*   const handleLast7DaysButton = (event) => {
    event.preventDefault();
    if (rangeIsLast7Days) {
      setDateRange(defaultDateRange);
    } else {
      setDateRange({ startDate: last7Days, endDate: today });
    }
  }; */

/*   const handleTodayButton = (event) => {
    event.preventDefault();
    if (rangeIsToday) {
      setDateRange(defaultDateRange);
    } else {
      setDateRange({ startDate: today.setHours(0, 0, 0, 0), endDate: today.setHours(23, 59, 59) });
    }
  }; */

  const handleStartDate = (date) => {
    setDateRange({ ...dateRange, startDate: date });
  };

  const handleEndDate = (date) => {
    setDateRange({ ...dateRange, endDate: date });
  };

  const onError = (error) => {
    if (error.error !== errors[error.name]) {
      setErrors({ ...errors, [error.name]: error.error });
    }
  };

  useEffect(() => {
    onChange(dateRange);
  }, [dateRange]);

  useEffect(() => {
      handleErrors(errors);
  }, [errors]);

  const handleDateKeyPress = (event) => {
    const { startDate, endDate } = dateRange;
    if (event.key === 'Enter' && startDate && endDate) onSubmit({ params: { startDate, endDate } });
  };

  return (
    <GroupFieldsContainer>
      {/* <Button
        dataCy="todayDateRangeButton"
        onClick={handleTodayButton}
        component="button"
        style={{
          width: '80%',
          flex: '1',
          margin: '0px 5px',
          padding: '8px',
          border: '1px solid #DDDBDA',
          boxShadow: 'none',
          ...(rangeIsToday ? activeButtonStyle : defaultButtonStyle),
        }}
      >Hoy</Button>
      <Button
        dataCy="last7DaysDateRangeButton"
        onClick={handleLast7DaysButton}
        component="button"
        style={{
          width: '80%',
          margin: '0px 5px',
          padding: '8px 20px',
          flex: '1',
          whiteSpace: 'nowrap',
          border: '1px solid #DDDBDA',
          boxShadow: 'none',
          ...(rangeIsLast7Days ? activeButtonStyle : defaultButtonStyle),
        }}
      >Últimos 7 dias</Button> */}
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
        <KeyboardDatePicker
          name="startDate"
          label="Desde"
          margin="normal"
          id="date-startpicker-dialog"
          format="dd/MM/yyyy"
          disableToolbar={true}
          value={dateRange.startDate}
          className={useStyles().date}
          onChange={handleStartDate}
          maxDate={dateRange.endDate}
          disableFuture={disableFuture}
          disablePast={disablePast}
          onKeyDown={handleDateKeyPress}
          onError={(error) => onError({ name: 'startDate', error: error })}
          variant="inline"
          autoOk={true}
          minDateMessage="Fecha invalida"
          invalidDateMessage="Fecha inválida"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
        <KeyboardDatePicker
          name="endDate"
          label="Hasta"
          margin="normal"
          id="date-endpicker-dialog"
          format="dd/MM/yyyy"
          disableToolbar={true}
          value={dateRange.endDate}
          className={useStyles().date}
          onChange={handleEndDate}
          minDate={dateRange.startDate}
          disableFuture={disableFuture}
          disablePast={disablePast}
          onKeyDown={handleDateKeyPress}
          onError={(error) => onError({ name: 'endDate', error: error })}
          minDateMessage="Fecha invalida"
          invalidDateMessage="Fecha inválida"
          autoOk={true}
          variant="inline"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>
    </GroupFieldsContainer>
  );
}

DateRangePicker.defaultProps = {
  disableFuture: false,
  disablePast: false,
};
