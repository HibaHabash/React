import React, { useRef, useState } from 'react';
import './style.scss';
import Arrow from '../../assets/images/Arrow-down.svg';

const List = ({ options }) => {
    const listRef = useRef();
    const [State, setState] = useState({
        showMenu: false,
        searchValue: '',
    });

    const handleInputClick = (e) => {
        e.stopPropagation();
        setState((prevState) => ({
            ...prevState,
            showMenu: !prevState.showMenu,
        }));
    };

    const onSearch = (e) => {
        setState((prevState) => ({
            ...prevState,
            searchValue: e.target.value,
        }));
    };

    const getOptions = () => {
        if (!State.searchValue) {
            return options;
        }

        return options.filter(
            (option) =>
                option.label
                    .toLowerCase()
                    .indexOf(State.searchValue.toLowerCase()) >= 0
        );
    };

    return (
        <div className="menu-container">
            <div className="input-container" onClick={handleInputClick}>
                <input
                    onChange={onSearch}
                    placeholder={State.showMenu ? 'select' : 'type here'}
                />
                <img
                    src={Arrow}
                    className={`arrow-down ${State.showMenu ? 'arrow-up' : ''}`}
                />
            </div>
            {State.showMenu && (
                <div className="list" ref={listRef}>
                    {getOptions().map((option, i) => (
                        <div
                            id={i}
                            tabIndex={0}
                            key={option.value}
                            className="menu-item"
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
