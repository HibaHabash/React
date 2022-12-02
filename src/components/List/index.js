import React, { useRef, useState } from 'react';
import './style.scss';
import Arrow from '../../assets/images/Arrow-down.svg';
import { useOnClickOutside } from 'usehooks-ts';

const List = ({ options }) => {
    const listRef = useRef();
    const [state, setState] = useState({
        selected: false,
        showMenu: false,
        searchValue: '',
        inputValue: '',
        focusedItem: 0,
    });

    const handleInputClick = (e) => {
        e.stopPropagation();
        setState((prevState) => ({
            ...prevState,
            showMenu: !prevState.showMenu,
        }));
    };

    const choosedItem = (option) => {
        setState((prevState) => ({
            ...prevState,
            selected: true,
            showMenu: !prevState.showMenu,
            inputValue: option.label,
        }));
    };

    const onSearch = (e) => {
        setState((prevState) => ({
            ...prevState,
            searchValue: e.target.value,
        }));
    };

    const getOptions = () => {
        if (!state.searchValue) {
            return options;
        }

        return options.filter(
            (option) =>
                option.label
                    .toLowerCase()
                    .indexOf(state.searchValue.toLowerCase()) >= 0
        );
    };

    const handleKeydown = (event) => {
        switch (event.key) {
            case 'ArrowUp': {
                if (state.focusedItem > 1) {
                    setState((prevState) => ({
                        ...prevState,
                        focusedItem: prevState.focusedItem - 1,
                    }));
                    document.getElementById(state.focusedItem - 2).focus();
                    break;
                } else break;
            }
            case 'ArrowDown': {
                if (state.focusedItem < options.length) {
                    setState((prevState) => ({
                        ...prevState,
                        focusedItem: prevState.focusedItem + 1,
                    }));
                    document.getElementById(state.focusedItem).focus();
                    break;
                } else break;
            }
            case 'Enter': {
                setState((prevState) => ({
                    ...prevState,
                    selected: true,
                    showMenu: !prevState.showMenu,
                    inputValue: options[state.focusedItem - 1].label,
                }));
                break;
            }
            default: {
                break;
            }
        }
    };

    const handleClickOutside = () => {
        setState((prevState) => ({
            ...prevState,
            showMenu: false,
        }));
    };

    useOnClickOutside(listRef, handleClickOutside);

    return (
        <div className="menu-container" ref={listRef}>
            <div className="input-container" onClick={handleInputClick}>
                <input
                    onKeyDown={handleKeydown}
                    onChange={onSearch}
                    placeholder={
                        state.showMenu
                            ? 'select'
                            : state.selected
                            ? state.inputValue
                            : 'type here'
                    }
                />
                <img
                    src={Arrow}
                    className={`arrow-down ${state.showMenu ? 'arrow-up' : ''}`}
                />
            </div>
            {state.showMenu && (
                <div className="list">
                    {getOptions().map((option, index) => (
                        <div
                            id={index}
                            tabIndex={0}
                            key={option.value}
                            className="menu-item"
                            onClick={() => choosedItem(option)}
                            onKeyDown={() => handleKeydown(event)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
export default List;
