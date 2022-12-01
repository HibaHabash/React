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
                    {getOptions().map((option, i) => (
                        <div
                            id={i}
                            tabIndex={0}
                            key={option.value}
                            className="menu-item"
                            onClick={() => choosedItem(option)}
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
