import React from 'react';
import { Row, Col } from 'react-bootstrap';

const ListRow = ({ label, value, sign = '' }) => {
  return (
    <Row>
      <Col>{label}</Col>
      <Col>
        {sign ? sign + ' ' : ''}
        {value}
      </Col>
    </Row>
  );
};

export default ListRow;
