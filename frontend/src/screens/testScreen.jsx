import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Auth from '../components/Auth';
import { useLocation } from 'react-router-dom';
import secret from '../secrets.json';

const TestScreen = ({ location, history, match }) => {
  const [person, setPerson] = useState({
    name: 'unnamed',
    age: 0,
    occupation: 'unknown',
  });
  const [car, setCar] = useState({
    name: 'ferrari',
    age: 10,
    price: '1000k',
  });
  const persons = [
    'Begzod',
    'Robin',
    'Thomas',
    'Edley',
    'Joshua',
    'Arthur',
    'Stephan',
  ];
  const [people, setPeople] = useState([]);
  useEffect(() => {
    console.log(car);
  }, [car]);

  const consoleLocs = () => {
    console.log('match below');
    console.log(match);
    console.log('loc below');
    console.log(location);
  };

  const changeValues = () => {
    if (person.name !== 'Begzod') {
      setPerson({ name: 'Begzod', age: 21, occupation: 'student' });
    } else {
      clearValues();
    }
  };

  const clearValues = () => {
    setPerson({ name: 'unknown', age: 0, occupation: 'unknown' });
  };

  const addPeople = () => {
    var val = Math.floor(Math.random() * 6);

    if (people.length === 0) {
      let firstValue = [];
      firstValue.push(persons[val]);
      setPeople(firstValue);
    } else {
      setPeople([...people, persons[val]]);
    }
  };

  const defineColor = () => {
    let currCar = car;
    Object.defineProperty(currCar, 'color', { value: 'red' });
    setCar(currCar);
    console.log(currCar);
  };

  return (
    <>
      <h1>Welcome to auth component</h1>
      <p>Name: {person.name}</p>
      <p>Age: {person.age}</p>
      <p>Occupation: {person.occupation}</p>
      <br />
      <button className='btn btn-info' onClick={changeValues}>
        Press to change the values
      </button>

      {/* <div className='mb-5'>
        <button onClick={addPeople} className='btn btn-info'>
          Add person
        </button>
        {people.map((person, index) => (
          <p key={index}>{person}</p>
        ))}
      </div> */}
      <button className='btn btn-success' onClick={defineColor}>
        Define car color
      </button>
    </>
  );
};

export default TestScreen;
