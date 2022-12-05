import React, { useCallback, useRef, useState } from 'react';
import './style.scss';
import Arrow from '../../assets/images/Arrow-down.svg';
import { useOnClickOutside } from 'usehooks-ts';

const List = ({ options }) => {
    const listRef = useRef();
    const [state, setState] = useState({
        selectedValue: '',
        showMenu: false,
        focusedItem: 0,
        items: options,
    });

    const handleInputClick = () => {
        setState((prevState) => ({
            showMenu: !prevState.showMenu,
            items: options,
        }));
    };

    const choosedItem = (option) => {
        setState((prevState) => ({
            selectedValue: option.label,
            showMenu: !prevState.showMenu,
        }));
    };

    const onSearch = (e) => {
        setState(() => ({
            items: options.filter(
                (option) =>
                    option.label
                        .toLowerCase()
                        .indexOf(e.target.value.toLowerCase()) >= 0
            ),
        }));
    };

    const onSearchCallback = useCallback(onSearch, [state.items]);

    const handleKeydown = () => {
        switch (event.key) {
            case 'ArrowUp': {
                if (state.focusedItem > 1) {
                    setState((prevState) => ({
                        focusedItem: prevState.focusedItem - 1,
                    }));
                    document.getElementById(state.focusedItem - 2).focus();
                    break;
                } else break;
            }
            case 'ArrowDown': {
                if (state.focusedItem < options.length) {
                    setState((prevState) => ({
                        focusedItem: prevState.focusedItem + 1,
                    }));
                    document.getElementById(state.focusedItem).focus();
                    break;
                } else break;
            }
            case 'Enter': {
                setState((prevState) => ({
                    showMenu: !prevState.showMenu,
                    selectedValue: options[state.focusedItem - 1].label,
                }));
                break;
            }
            default: {
                break;
            }
        }
    };

    const handleClickOutside = () => {
        setState(() => ({
            showMenu: false,
        }));
    };

    useOnClickOutside(listRef, handleClickOutside);

    return (
        <div className="menu-container" ref={listRef}>
            <div className="input-container" onClick={handleInputClick}>
                <input
                    onKeyDown={handleKeydown}
                    onChange={onSearchCallback}
                    placeholder={
                        state.showMenu
                            ? 'select'
                            : state.selectedValue
                            ? state.selectedValue
                            : 'type here '
                    }
                />
                <img
                    src={Arrow}
                    className={`arrow-down ${state.showMenu ? 'arrow-up' : ''}`}
                />
            </div>
            {state.showMenu && (
                <div className="list">
                    {state.items.map((option, index) => (
                        <div
                            id={index}
                            tabIndex={0}
                            key={option.value}
                            className="menu-item"
                            onClick={() => choosedItem(option)}
                            onKeyDown={handleKeydown}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default React.memo(List);
