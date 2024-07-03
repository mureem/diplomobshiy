import React from 'react';
import './file.css';
import dirLogo from '../../../../../src/assets/img/dir.svg';
import fileLogo from '../../../../../src/assets/img/file.svg';
import { pushToStack, setCurrentDir } from '../../../../reducers/fileReducer.js';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFile, downloadFile } from '../../../../actions/file.js';
import sizeFormat from "../../../../utils/sizeFormat.js";

const File = ({ file }) => {
    const dispatch = useDispatch();
    const currentDir = useSelector(state => state.files.currentDir);

    const openDirHandler = () => {
        if (file.type === 'dir') {
            dispatch(pushToStack(currentDir));
            dispatch(setCurrentDir(file._id));
        }
    }

    function downloadClickHandler(e) {
        e.stopPropagation()
        downloadFile(file)
    }

    function deleteClickHandler(e) {
        e.stopPropagation()
        dispatch(deleteFile(file))
    }

    return (
        <div className="file" onClick={openDirHandler}>
            <img src={file.type === 'dir' ? dirLogo : fileLogo} alt="" className="file__img" />
            <div className="file__name">{file.name}</div>
            <div className="file__date">{file.date.slice(0, 10)}</div>
            <div className="file__size">{sizeFormat(file.size)}</div>
            {file.type !== 'dir' && (
                <button onClick={downloadClickHandler} className="file__btn file__download">download</button>
            )}
            <button onClick={(e) => deleteClickHandler(e)} className="file__btn file__delete">delete</button>
        </div>
    );
};

export default File;
