import React, {useState} from 'react';
import LoadingIndicator from './LoadingIndicator';

const FileUploadBtn = (props) => {
    const [isLoading, setIsLoading] = useState(false);
    let loader = null;

    const handleFile =() => {
        
        let files = document.getElementById("photoupload").files;
        if (!files.length) {
            //return alert("Please choose a file to upload first.");
            //return;
        }
        let file = files[0];
        loader = <LoadingIndicator />;
        setIsLoading(true);
        props.addPhotoToS3(file);
        setIsLoading(false);
        loader = null;
    }

    return (
        <React.Fragment>
            <label className="btn btn-default btn-sm center-block btn-file">
                <i className="fa fa-upload fa-2x" aria-hidden="true"></i>
                <input id="photoupload" type="file" accept="image/*" style={{display: "none"}}
                 onChange={handleFile}></input>
            </label>
            {loader}
        </React.Fragment>
       
    )
}

export default FileUploadBtn;
