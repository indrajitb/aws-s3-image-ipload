/*
 * @Author: Indrajit Bhattacharya 
 * @Date: 2020-09-13 17:26:30 
 * @Last Modified by: Indrajit Bhattacharya
 * @Last Modified time: 2020-09-13 17:32:23
 */
import AWS from 'aws-sdk';

export const albumBucketName = "s3-photo-album";
export const bucketRegion = "us-east-2";
export const IdentityPoolId = "us-east-2:b00c1e18-ba2d-4be1-bf41-ccbd9169e9d8";

AWS.config.region = bucketRegion; // Region
AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: IdentityPoolId
});

AWS.config.credentials.get(function(err) {
    if (err) console.log('Error getting credentials. ' + err);
   
});

export const s3 = new AWS.S3({
    apiVersion: "2006-03-01",
    params: { Bucket: albumBucketName }
});
