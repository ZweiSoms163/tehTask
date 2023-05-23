import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setInputFrom, setInputBefore } from '../../store/FiltersSlice';

import '../../styles/filters/filters.css';

const FiltersCreated = () => {
  const [isOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();

  const darkTheme = useSelector((state) => state.theme.darkTheme);
  const inputFrom = useSelector((state) => state.filters.inputFrom); // получаю из redux  массив inputFrom
  const inputBefore = useSelector((state) => state.filters.inputBefore); // получаю из redux  массив useSelector

  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  }; // Переключение состояния открытия/закрытия выпадающего списка

  useEffect(() => {
    const handleOutsideClick = (event) => {
      // Проверяем, был ли клик вне выпадающего списка
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleOutsideClick);
    // Добавляем обработчик клика на весь документ

    return () => {
      // Удаляем обработчик при размонтировании компонента
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const onInputFromChange = (event) => {
    let numericInput = event.target.value.replace(/\D/g, ''); // Удаляем все символы, кроме цифр
    dispatch(setInputFrom(numericInput));
  }; // Обработчик изменения значения inputFrom и потом записываю в redux

  const onInputBeforeChange = (event) => {
    let numericInput = event.target.value.replace(/\D/g, ''); // Удаляем все символы, кроме цифр
    dispatch(setInputBefore(numericInput));
  }; // Обработчик изменения значения inputBefore и потом записываю в redux

  return (
    <div className={`${darkTheme ? 'custom-select' : 'custom-selectLight'}`} ref={dropdownRef}>
      <div
        className={`${darkTheme ? 'select-header' : 'select-headerLight'} ${isOpen ? 'open' : ''}`}
        onClick={toggleDropdown}>
        <span className="select-name">Created</span>
        <span className="select-arrow">
          <i className="ri-arrow-down-s-line"></i>
        </span>
      </div>
      {isOpen && (
        <div className={`${darkTheme ? 'select-options' : 'select-optionsLight'}`}>
          <div className={`${darkTheme ? 'input-wrapper' : 'input-wrapperLight'}`}>
            <input
              type="text"
              value={inputFrom}
              onChange={onInputFromChange}
              placeholder="From"
              pattern="[0-9]*" // Указываем паттерн для ввода только цифр
            />
          </div>
          <div>
            <div className={`${darkTheme ? 'horizontal-line' : 'horizontal-lineLight'}`} />
          </div>
          <div className={`${darkTheme ? 'input-wrapper' : 'input-wrapperLight'}`}>
            <input
              type="text"
              value={inputBefore}
              onChange={onInputBeforeChange}
              placeholder="Before"
              pattern="[0-9]*" // Указываем паттерн для ввода только цифр
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FiltersCreated;
