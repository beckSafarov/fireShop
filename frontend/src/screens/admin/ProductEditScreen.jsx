// libraries & methods
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

// UI components
import { Auth, FormContainer, Message, Spinner } from '../../components';
import { ProductUpdateForm } from '../../components/Forms';

// redux actions
import { updateProduct } from '../../actions/adminActions';
import { listProductDetails } from '../../actions/productActions';
import { PRODUCT_DETAILS_RESET } from '../../constants';

const ProductEditScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  const { loading, success, type, product, error } = useSelector(
    (state) => state.productDetails
  );
  const dataExists = product && product.name && product._id === match.params.id;

  // hooks
  const [updatedProduct, setUpdatedProduct] = useState(
    dataExists ? { ...product } : {}
  );
  const [change, setChange] = useState(false);
  const [flashMsg, setFlashMsg] = useState({});
  let newProduct;

  // variables
  const requestError = error && type === 'request' ? error : null;

  useEffect(() => {
    dataExists
      ? !updatedProduct.name && setUpdatedProduct({ ...product })
      : dispatch(listProductDetails(match.params.id));

    if ((success || error) && type === 'update') {
      success
        ? history.replace('/admin/productlist')
        : msgHandler(error, 'danger');
      dispatch({
        type: PRODUCT_DETAILS_RESET,
        payload: success ? 'success' : 'error',
      });
    }

    return () => axios.CancelToken.source().cancel();
  }, [dispatch, product, match, success, error]);

  const changesHandler = (e) => {
    e.persist();
    setChange(true);
    newProduct = { ...updatedProduct };
    newProduct[e.target.name] = e.target.value;
    setUpdatedProduct(newProduct);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ ...updatedProduct }));
    setChange(false);
  };

  const msgHandler = (msg, variant = 'success') => {
    setFlashMsg({ display: true, message: msg, variant });
    setTimeout(() => setFlashMsg({}), 3000);
  };

  const cancelChanges = () => window.location.reload();

  const values = { ...updatedProduct, change };
  const functions = { changesHandler, submitHandler, cancelChanges };

  return (
    <Auth history={history} adminOnly>
      <FormContainer>
        <h2>{product ? product.name : ''}</h2>
        {loading && <Spinner />}
        {requestError && <Message variant='danger'>{requestError}</Message>}
        {flashMsg.display && (
          <Message variant={flashMsg.variant}>{flashMsg.message}</Message>
        )}
        <div className='py-4'>
          <ProductUpdateForm values={values} functions={functions} />
        </div>
      </FormContainer>
    </Auth>
  );
};

export default ProductEditScreen;
