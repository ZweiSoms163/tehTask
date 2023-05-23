import { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Filters from '../Filters/Filters';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setAuthor, setLocation } from '../../store/layoutSlice';

import '../../styles/layout/layout.css';

const Layout = () => {
  const [text, setText] = useState(''); // состояние ввода в input
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAuthorData = async () => {
      try {
        const response = await axios.get('https://test-front.framework.team/authors');
        const data = response.data;
        dispatch(setAuthor(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchAuthorData();
  }, [dispatch]);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const response = await axios.get('https://test-front.framework.team/locations');
        const data = response.data;
        dispatch(setLocation(data));
      } catch (error) {
        console.log(error);
      }
    };

    fetchLocationData();
  }, [dispatch]);

  return (
    <div className="container">
      <Header />
      <Filters text={text} handleInput={setText} />
    </div>
  );
};

export default Layout;
