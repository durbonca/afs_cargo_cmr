import React from 'react';
import PropTypes from 'prop-types';
import { TextField as InputField } from '@material-ui/core';

const TextField = ({
  disabled,
  defaultValue,
  name,
  handleChange,
  handleBlur,
  onKeyPress,
  label,
  fullWidth,
  width,
  helperText,
  error,
  className,
  type,
}) => {
  return (
    <InputField
      disabled={disabled}
      className={className}
      onChange={handleChange}
      onBlur={handleBlur}
      name={name}
      label={label}
      defaultValue={defaultValue}
      onKeyPress={onKeyPress}
      helperText={helperText}
      error={error}
      width={width}
      inputProps={{ min: '0', max: '10', step: '1' }}
      type={type}
      fullWidth={fullWidth}
      variant="outlined"
      size="small"
    />
  );
};

TextField.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string,
  fullWidth: PropTypes.bool,
  helperText: PropTypes.string,
};

TextField.defaultProps = {
  disabled: false,
  handleChange: () => {},
  defaultValue: '',
  error: false,
  fullWidth: true,
  name: '',
  label: '',
  helperText: null,
};

export default TextField;
