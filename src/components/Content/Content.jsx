import React, { useEffect, useState } from 'react';
import '../../styles/content/content.css';
import axios from 'axios';
import PaginationUi from '../Pagination/PaginationUi';

import { useSelector } from 'react-redux';

const Content = ({ text }) => {
  /*
  Что осталось доделать: 
  1. убрать EsLint
  2. еще раз перепроверить адаптивность 
  3. посмотреть,можно ли поменять иконки на react select в filters
   */

  const [appState, setAppState] = useState([]);
  const author = useSelector((state) => state.layout.author);
  const location = useSelector((state) => state.layout.location);

  const selectedLocation = useSelector((state) => state.filters.selectedLocation);
  const selectedAuthor = useSelector((state) => state.filters.selectedAuthor);

  const setInputFrom = useSelector((state) => state.filters.inputFrom);
  const setInputBefore = useSelector((state) => state.filters.inputBefore);

  const page = useSelector((state) => state.pagination.page);

  useEffect(() => {
    let Url = `https://test-front.framework.team/paintings?q=${text}&_limit=12`;

    if (selectedAuthor.value) {
      Url += `&authorId=${selectedAuthor.value}`; // добавляю фильтрацию при выборе автора в selcet
    }
    if (selectedLocation.value) {
      Url += `&locationId=${selectedLocation.value}`; // добавляю фильтрацию при выборе Локации в selcet
    }
    if (setInputFrom) {
      Url += `&created_gte=${setInputFrom}`; // добавляю фильтрацию при выборе года от в input
    }
    if (setInputBefore) {
      Url += `&created_lte=${setInputBefore}`; // добавляю фильтрацию при выборе года до в input
    }
    if (page) {
      Url += `&_page=${page}`; // добавляет номер страницы, который был выбран в пагинации
    }
    console.log(Url);

    const fetchData = async () => {
      try {
        const response = await axios.get(Url);
        const allInfo = response.data;
        setAppState(allInfo);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [text, selectedAuthor, selectedLocation, setInputFrom, setInputBefore, page]); // зависимотси при изменении которых будет перерендер
  return (
    <div className="wrapper">
      <div className="content">
        {appState.length === 0 ? (
          <div>Loading...</div>
        ) : (
          appState.map((state) => (
            <div key={state.id} className="content-box">
              <img
                alt={state.name}
                className="content-img"
                src={`https://test-front.framework.team/${state.imageUrl}`}
              />
              <div className="content-info">
                <div className="content-name">{state.name}</div>
                <div className="content-img_info">
                  <span className="content-img-text">Author: </span>
                  <span className="content-img-name">
                    {author.find((a) => a.id === state.authorId)?.name}
                  </span>
                  {/* добовляю в массив appState поиск по массиву author для отображения имени автора  */}
                </div>
                <div className="content-img_info">
                  <span className="content-img-text">Created: </span>
                  {state.created}
                </div>
                <div className="content-img_info">
                  <span className="content-img-text">Location: </span>
                  <span className="content-img-name">
                    {location.find((a) => a.id === state.locationId)?.location}
                  </span>
                  {/* добовляю в массив appState поиск по массиву author для отображения имени локации  */}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <PaginationUi />
    </div>
  );
};

export default Content;
