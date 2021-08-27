import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TextField } from '@material-ui/core';
import idFormat from '../../../helpers/idFormat';

const Input = styled(TextField)`
    background-color: 'white';
`;

const RutField = ({ classes, handleChange, handleBlur, onKeyPress, defaultValue, fullWidth, name, label }) => {
  const [value, setValue] = useState(defaultValue);

  const onChange = (event) => {
    const rut = idFormat.unFormat(event.target.value);
    if (idFormat.newCharIsValid(rut)) setValue(idFormat.format(rut));
    event.target.value = rut;
    handleChange(event);
  };

  const onBlur = (event) => {
    event.target.value = idFormat.unFormat(event.target.value);
    handleBlur(event);
  };

  return (
    <Input
      name={name}
      label={label}
      className={classes.inputs}
      onChange={onChange}
      onBlur={onBlur}
      value={value}
      onKeyPress={onKeyPress}
      fullWidth={fullWidth}
      size="small"
      variant="outlined"
    />
  );
};

RutField.propTypes = {
  defaultValue: PropTypes.string,
  fullWidth: PropTypes.bool,
  name: PropTypes.string,
};

RutField.defaultProps = {
  handleChange: () => {},
  classes: { inputs: {} },
  name: '',
  fullWidth: true,
  defaultValue: '',
};

export default RutField;
