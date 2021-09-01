import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const Container = styled.div`
  width: ${(props) => props.width}px;
  height: auto;
  margin-right: 25px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

const Item = ({ children, width }) => {
  return <Container width={width}>{children}</Container>;
};

Item.propTypes = {
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node.isRequired,
};

Item.defaultProps = {
  width: 222,
};

export default Item;
