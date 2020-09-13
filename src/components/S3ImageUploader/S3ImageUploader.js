/*
 * @Author: Indrajit Bhattacharya 
 * @Date: 2020-09-13 17:24:12 
 * @Last Modified by: Indrajit Bhattacharya
 * @Last Modified time: 2020-09-13 17:48:31
 */
import React, {useState} from 'react';
import uuid from 'react-uuid';
import {s3} from '../../AWS/AWS';
import Card from '../../components/UI/Card';
import './S3ImageUploader.css';
import * as awsProps from '../../AWS/AWS';
import LoadingIndicator from '../UI/LoadingIndicator';
import FileUploadBtn from '../UI/FileUploadBtn';
import ImageList from '../Images/ImageList';
import { useComponentWillMount } from '../hooks/useComponentWillMount';


const S3ImageUploader = () => {

    const [images, setImages] = useState([]);
    let listOfImages = [];
    const [isLoading, setIsLoading] = useState(false);

    const fetchImagesFromS3 = () => {
        let params = {
            Bucket: awsProps.albumBucketName,
            Prefix: 'images/'
         };
        let bucketName = awsProps.albumBucketName;
        setIsLoading(true);
      
       listOfImages = [];
        
        s3.listObjectsV2(params, function(err, data) {
            if (err) {
                return alert("There was an error viewing your images: " + err.message);
            } else {
                let href = this.request.httpRequest.endpoint.href;
                let bucketUrl = href + bucketName + "/";

                data.Contents.map(function(photo) {
                    let photoKey = photo.Key;
                    let photoUrl = bucketUrl + encodeURIComponent(photoKey);
                    listOfImages.push({photoUrl: photoUrl, photoKey: photoKey});
                    
                });

                setImages([...listOfImages]);
               
            }
    });
    setIsLoading(false);
}

useComponentWillMount(() => {
      fetchImagesFromS3();
});
    
const  getPresignedUploadUrl = (bucket, directory) => {
     
    let params = {Bucket: bucket, Key: `${directory}/${uuid()}`, Expires: 120};
   
    s3.getSignedUrl('putObject', params, function(err, url) {
        if(err) {
            console.log('Error in getting signed URL');
            return null;
        }
       
        return url;
        
    });
    
}
  
const handleAddPhoto = (inputFile) => {
    let key = 'images/' + uuid();
    let params = {
        Body: inputFile, 
        Bucket: awsProps.albumBucketName, 
        Key: key, 
        ACL: "public-read"
    }
        
    setIsLoading(true);
    awsProps.s3.putObject(params, function(err, data) {
        if(err) {
            alert('Error uploading image. ' + err);
            return;
        } else {
            fetchImagesFromS3();
            setIsLoading(false);
        }
       
    });

    
}

const handleDeletePhoto = (photoKey) => {

    setIsLoading(true);

    s3.deleteObject({ Key: photoKey }, function(err, data) {
        if (err) {
            return alert("There was an error deleting your photo: ", err.message);
        }
       
        setIsLoading(false);
        fetchImagesFromS3();
    });
      
}


    let content = isLoading ? <LoadingIndicator /> : <ImageList images={images} delete={handleDeletePhoto}/>;
    return (
        
        <React.Fragment>
            
            <section className="s3-image-uploader">
                <Card>
                    <h4>Upload Images to AWS S3 Bucket</h4>
                    <FileUploadBtn 
                        url={getPresignedUploadUrl(awsProps.albumBucketName, 'images/')}
                        addPhotoToS3={handleAddPhoto}>
                    </FileUploadBtn>
                    {content}
                </Card>

            </section>
        </React.Fragment>
        
    )

}

export default S3ImageUploader;