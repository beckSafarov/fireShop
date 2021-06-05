// Methods
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Auth from '../../helpers/auth';

// UI components
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Table, Container, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

// -- REDUX RELATED IMPORTS --
import { getMyOrders } from '../../actions/orderActions';

const UserOrdersScreen = ({ location, history }) => {
  // -- redux stores --
  const dispatch = useDispatch();
  const myOrders = useSelector((state) => state.myOrders);

  // variables
  const auth = Auth();
  const cancelTokenSource = axios.CancelToken.source();
  let loading = myOrders.loading || auth.loading;

  useEffect(() => {
    if (auth.logged) dispatch(getMyOrders());

    if (auth.logged === false) history.push('/');

    return () => cancelTokenSource.cancel();
  }, [dispatch, auth.logged, history]);

  return (
    <>
      <Container>
        {loading ? (
          <Loader />
        ) : myOrders.error ? (
          <Message variant='danger'>{myOrders.error}</Message>
        ) : myOrders.orders.length === 0 ? (
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
                {myOrders.orders.map((order, index) => (
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
    </>
  );
};

export default UserOrdersScreen;
