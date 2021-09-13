import React from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const ErrorMessage = styled(Typography)``;

const Error = (props) => {
  return <ErrorMessage {...props} color="error" />;
};

export default Error;
