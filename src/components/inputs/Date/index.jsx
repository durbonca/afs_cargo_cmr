import React from 'react';
import DateFnsUtils from '@date-io/date-fns';
import esLocale from 'date-fns/locale/es';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import PropTypes from 'prop-types';

export default function DatePicker({
  handleChange,
  name,
  label,
  value,
  minDate,
  maxDate,
  maxDateMessage,
  minDateMessage,
  notShowDate,
}) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
      {!notShowDate ? (
        <KeyboardDatePicker
          name={name}
          label={label}
          format="dd/MM/yyyy"
          value={value}
          onChange={handleChange}
          minDate={minDate}
          maxDate={maxDate}
          maxDateMessage={maxDateMessage}
          minDateMessage={minDateMessage}
          invalidDateMessage="Fecha inválida"
          okLabel="Seleccionar"
          cancelLabel="Cancelar"
          inputVariant="outlined"
          size="small"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      ) : (
        <KeyboardDatePicker
          name={name}
          label={label}
          format="MM/yyyy"
          value={value}
          onChange={handleChange}
          minDate={minDate}
          maxDate={maxDate}
          views={['year', 'month']}
          maxDateMessage="Fecha inválida"
          minDateMessage="Fecha inválida"
          invalidDateMessage="Fecha inválida"
          okLabel="Seleccionar"
          cancelLabel="Cancelar"
          inputVariant="outlined"
          size="small"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      )}
    </MuiPickersUtilsProvider>
  );
}
DatePicker.defaultProps = {
  notShowDate: false,
  maxDateMessage: 'Fecha inválida',
  minDateMessage: 'Fecha inválida',
};

DatePicker.propTypes = {
  notShowDate: PropTypes.bool,
  maxDateMessage: PropTypes.string,
  minDateMessage: PropTypes.string,
};
