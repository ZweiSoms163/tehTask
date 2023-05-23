import React from 'react';
import { useState } from 'react';
import Select from 'react-select';

import '../../styles/filters/filters.css';
import Content from '../Content/Content';
import FiltersCreated from '../FiltersCreated/FiltersCreated';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedAuthor, setSelectedLocation } from '../../store/FiltersSlice';

const Filters = ({ text, handleInput }) => {
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const author = useSelector((state) => state.layout.author); // получаю из redux массив author
  const location = useSelector((state) => state.layout.location); // получаю из redux массив location

  const [isClearable] = useState(true); // добавление кнопки удаления в slect
  const [isSearchable] = useState(false); // отключение поиска в slect

  const handleSelectChangeAuthor = (option) => {
    if (option) {
      dispatch(setSelectedAuthor(option));
    } else {
      dispatch(setSelectedAuthor(''));
    }
  }; // тут проверка идет на то,чтобы не было null после удаления

  const handleSelectChangeLocation = (option) => {
    if (option) {
      dispatch(setSelectedLocation(option));
    } else {
      dispatch(setSelectedLocation(''));
    }
  }; // тут проверка идет на то,чтобы не было null после удаления

  const optionsAuthor = author.map((option) => {
    return {
      value: option.id,
      label: option.name,
    };
  });
  const optionsLocation = location.map((data) => {
    return {
      value: data.id,
      label: data.location,
    };
  }); // добавление массива author в options Для react select
  const selectClassNamePrefix = darkTheme ? 'custom-select' : 'custom-selectLight';

  return (
    <div className="wrapper">
      <div className="search">
        <input
          onChange={(e) => handleInput(e.target.value)}
          value={text}
          className={`search-input ${darkTheme ? 'dark' : 'light'}`}
          placeholder="Name"
        />
        <Select
          defaultValue=""
          onChange={handleSelectChangeAuthor}
          isClearable={isClearable}
          options={optionsAuthor}
          isSearchable={isSearchable}
          placeholder="Author"
          className={`search-select ${darkTheme ? 'dark' : 'light'}`}
          classNamePrefix={selectClassNamePrefix}
        />

        <Select
          onChange={handleSelectChangeLocation}
          isClearable={isClearable}
          options={optionsLocation}
          isSearchable={isSearchable}
          placeholder="Location"
          className={`search-select ${darkTheme ? 'dark' : 'light'}`}
          classNamePrefix={selectClassNamePrefix}
        />
        <FiltersCreated />
      </div>
      <div className="content">
        <Content text={text} />
      </div>
    </div>
  );
};

export default Filters;
