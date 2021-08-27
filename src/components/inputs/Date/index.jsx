import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

export default function DatePicker({ onChange, attr, style }) {
  const classes = style();
  const [selectedDate, setSelectedDate] = React.useState(attr.initialDate);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    onChange({ target: { name: attr.name, value: date } });
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
      <KeyboardDatePicker
        name={attr.name}
        label={attr.label}
        format="dd/MM/yyyy"
        value={selectedDate}
        className={classes.date}
        InputProps={{ className: classes.input }}
        onChange={handleDateChange}
        minDate={attr.minDate}
        maxDate={attr.maxDate}
        minDateMessage="Fecha inválida"
        inputVariant="outlined"
        okLabel="Seleccionar"
        cancelLabel="Cancelar"
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }}
      />
    </MuiPickersUtilsProvider>
  );
}
