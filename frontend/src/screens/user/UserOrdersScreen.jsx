// Methods
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Auth from '../../components/Auth';
// UI components
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Table, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
// Redux related imports
import { getMyOrders } from '../../actions/orderActions';

const UserOrdersScreen = ({ history }) => {
  // -- redux stores --
  const dispatch = useDispatch();
  const { loading, orders, error } = useSelector((state) => state.myOrders);

  useEffect(() => {
    if (orders && orders.length === 0) dispatch(getMyOrders());
    return () => axios.CancelToken.source().cancel();
  }, [dispatch, orders]);

  return (
    <Auth history={history}>
      <Container>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : orders === null ? (
          <h3>You have no orders yet</h3>
        ) : (
          <>
            <h3 className='mb-5'>Your orders</h3>
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>NAME</th>
                  <th>DATE</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>
                      {order.paidAt
                        ? order.paidAt.substring(0, 10)
                        : 'undefined'}
                    </td>
                    <td>{order.totalPrice}</td>
                    <td>
                      {
                        /*if order delievered, put delivery date, if no delivery date than undefined */
                        order.isDelievered ? (
                          order.deliveredAt ? (
                            order.deliveredAt.substring(0, 10)
                          ) : (
                            'undefined'
                          )
                        ) : (
                          /* if order not delivered */
                          <div className='text-center'>
                            <i
                              className='fas fa-times'
                              style={{ color: 'red' }}
                            ></i>
                          </div>
                        )
                      }
                    </td>
                    <td>
                      <LinkContainer to={`/myorders/${order._id}`}>
                        <Button className='btn-sm' variant='light'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        )}
      </Container>
    </Auth>
  );
};

export default UserOrdersScreen;
