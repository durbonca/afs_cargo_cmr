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
}) {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils} locale={esLocale}>
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
          invalidDateMessage="Fecha inválida / Requerida"
          okLabel="Seleccionar"
          cancelLabel="Cancelar"
          inputVariant="outlined"
          size="small"
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
    </MuiPickersUtilsProvider>
  );
}
DatePicker.defaultProps = {
  maxDateMessage: 'Fecha inválida',
  minDateMessage: 'Fecha inválida',
};

DatePicker.propTypes = {

  maxDateMessage: PropTypes.string,
  minDateMessage: PropTypes.string,
};
