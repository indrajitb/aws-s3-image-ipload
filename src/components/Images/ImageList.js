/*
 * @Author: Indrajit Bhattacharya 
 * @Date: 2020-09-13 17:23:22 
 * @Last Modified by: Indrajit Bhattacharya
 * @Last Modified time: 2020-09-13 17:43:56
 */
import React from 'react';
import  './ImageList.css';

const ImageList = (props) => {
  
    return (
        <React.Fragment>
            <h2>Images</h2>
            <div><i>Click on an image to delete</i></div>
 
                {props.images !== null
                ? props.images.map(ig => (

                    <span key={ig.photoKey}>
                        <img src={ig.photoUrl} className="img-wrap" key={ig.photoKey}
                        onClick={() => props.delete(ig.photoKey)} alt=""/>
                        
                    </span>
                        
                    )) : null
                }
                   
        </React.Fragment>
        
    )

}

export default ImageList;