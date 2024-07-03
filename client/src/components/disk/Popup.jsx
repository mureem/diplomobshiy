import React, { useState } from 'react';
import Input from "../../utils/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { setPopupDisplay } from "../../reducers/fileReducer.js";
import { createDir } from "../../actions/file.js";

const Popup = ({ createHandler }) => {
    const [dirName, setDirName] = useState('');
    const popupDisplay = useSelector(state => state.files.popupDisplay);
    const currentDir = useSelector(state => state.files.currentDir);
    const dispatch = useDispatch();

    function handleCreate() {
        dispatch(createDir(currentDir, dirName));
        createHandler && createHandler(); // Call the passed handler if provided
    }

    return (
        <div className="popup" onClick={() => dispatch(setPopupDisplay('none'))} style={{display: popupDisplay}}>
            <div className="popup__content" onClick={(event => event.stopPropagation())}>
                <div className="popup__header">
                    <div className="popup__title">Создать новую папку</div>
                    <button className="popup__close" onClick={() => dispatch(setPopupDisplay('none'))}>×</button>
                </div>
                <Input
                    className="popup__input"
                    type="text"
                    placeholder="Введите название папки..."
                    value={dirName}
                    setValue={setDirName}
                />
                <button className="popup__create" onClick={handleCreate}>Создать</button>
            </div>
        </div>
    );
};

export default Popup;
