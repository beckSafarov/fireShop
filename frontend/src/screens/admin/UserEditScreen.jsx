// libraries & methods
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Auth from '../../components/Auth';

// UI components
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Table, Button, DropdownButton, Dropdown } from 'react-bootstrap';
import Spinner from '../../components/Spinner';
import Exceptional from '../../components/Exceptional';

// redux actions
import { listUsers, deleteUser } from '../../actions/adminActions';

const UserEditScreen = ({ history, match }) => {
  const dispatch = useDispatch();
  // const {loading, } = useSelector(state=>state.)
  return <Auth history={history} adminOnly></Auth>;
};

export default UserEditScreen;
