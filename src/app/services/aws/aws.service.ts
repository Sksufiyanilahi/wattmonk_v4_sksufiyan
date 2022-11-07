import { Injectable } from '@angular/core';
import { Credentials, S3 } from 'aws-sdk';
import { throwError } from 'rxjs';
import s3ParseUrl from 's3-url-parser';
import { _awsConfig } from '../constants';

@Injectable({
    providedIn: 'root'
})
export class AwsService {

    private readonly _awsConfig = _awsConfig;
    private _awsCredentials: Credentials;
    private _s3ClientConfig: S3.ClientConfiguration;
    private _s3: S3;

    uploadStatus: string = "(no upload yet)";
    expectEndpoint: string = '';
    actualEndpoint;

    constructor(

    ) {
        // Create an AWS S3 client
        this._awsCredentials = new Credentials(this._awsConfig.accessKeyId, this._awsConfig.secretAccessKey);
        this._s3ClientConfig = {
            credentials: this._awsCredentials,
            region: this._awsConfig.s3BucketRegion,
            sslEnabled: true
        };
        this._s3 = new S3(this._s3ClientConfig);

        // Set the expected and actual endpoints
        var isRegionUSEast: boolean = (this._awsConfig.s3BucketRegion).toLowerCase() == "us-east-1";
        var endpointHost: string = isRegionUSEast ? "s3" : "s3-" + this._awsConfig.s3BucketRegion
        this.expectEndpoint = endpointHost + ".amazonaws.com";
        this.actualEndpoint = this._s3.config.endpoint;
    }

    fileEvent(fileInput: any, path: string): Promise<any> {
        console.log('fileEvent');

        this.uploadStatus = "starting upload...";
        let result = { url: "", timestamp: null, height: null, width: null, key: null };
        const reader = new FileReader();
        console.log('reader', reader);

        reader.onloadend = function (e) {
            console.log('onloadend e', e);
            
            const img = document.createElement("img") as HTMLImageElement;
            img.onload = () => {
                result.width = img.naturalWidth;
                result.height = img.naturalHeight
                // dim.dimensions.push({"width": img.naturalWidth, "height": img.naturalHeight});
                // console.log(dim.dimensions[0].width);
            }
            img.src = reader.result as string;
        }

        // reader.addEventListener("load", function () {
        //     const img = document.createElement("img") as HTMLImageElement;
        //     img.onload = () => {
        //         result.width = img.naturalWidth;
        //         result.height = img.naturalHeight
        //         // dim.dimensions.push({"width": img.naturalWidth, "height": img.naturalHeight});
        //         // console.log(dim.dimensions[0].width);

        //     }
        //     img.src = reader.result as string;
        // }, false);

        reader.readAsDataURL(fileInput);

        let date = new Date();
        let dates = date.getTime();

        let key = path + "/" + fileInput.name.split(".")[0] + "_" + dates + "." + fileInput.name.split(".").reverse()[0];

        // get the file to upload
        let file: File = fileInput;

        result.timestamp = dates
        // upload file to S3
        let putObjectRequest: S3.PutObjectRequest = {
            Key: key,
            Bucket: this._awsConfig.s3BucketName,
            Body: file,
            ACL: "public-read",
            ContentType: fileInput.type
        };

        // use "that" to be able to reach component properties within the then/catch callback functions
        let that = this;

        // upload to S3
        return this._s3.upload(putObjectRequest).promise()
            .then(function (response: S3.ManagedUpload.SendData) {
                that.uploadStatus = response.Location;
                result.url = that.uploadStatus;
                result.key = response.Key;
                // alert(that.uploadStatus);


                return result;
            })
            .catch(function (err: Error) {
                var errMsg = "";
                errMsg += "upload failed.\n ";
                errMsg += "Error Message: " + err.message + "\n ";
                errMsg += "NOTE: an error message of 'Network Failure' may mean that you have the wrong region or the wrong bucket name.";
                that.uploadStatus = errMsg;
                result.url = that.uploadStatus
                return throwError("Error:" + err.message);
                // alert(errMsg);
            });


    }



    deleteAwsFile(data): Promise<any> {
        let result;
        let deleteObjectRequest: S3.DeleteObjectRequest = {
            Bucket: this._awsConfig.s3BucketName,
            Key: data
        };
        return this._s3.deleteObject(
            deleteObjectRequest
        ).promise().then((response: any) => {


            return result;
        })
            .catch(function (err: Error) {
                var errMsg = "";
                errMsg += "upload failed.\n ";
                errMsg += "Error Message: " + err.message + "\n ";
                errMsg += "NOTE: an error message of 'Network Failure' may mean that you have the wrong region or the wrong bucket name.";
                return result;
                // alert(errMsg);
            });

    }

    height(fileInput: any) {
        const reader = new FileReader();
        reader.onloadend = function (e) {
            const img = document.createElement("img") as HTMLImageElement;
            img.onload = () => {
                fileInput.width = img.naturalWidth;
                fileInput.height = img.naturalHeight
                // dim.dimensions.push({"width": img.naturalWidth, "height": img.naturalHeight});
                // console.log(dim.dimensions[0].width);
            }
            img.src = reader.result as string;
        }

        // reader.addEventListener("load", function () {
        //     const img = document.createElement("img") as HTMLImageElement;
        //     img.onload = () => {
        //         fileInput.width = img.naturalWidth;
        //         fileInput.height = img.naturalHeight
        //         // dim.dimensions.push({"width": img.naturalWidth, "height": img.naturalHeight});
        //         // console.log(dim.dimensions[0].width);

        //     }
        //     img.src = reader.result as string;
        // }, false);

        reader.readAsDataURL(fileInput);
    }

    getS3File(url) {
        const { bucket, region, key } = s3ParseUrl(url);
        let files: S3.GetObjectRequest = {
            Bucket: this._awsConfig.s3BucketName,
            Key: key
        };
        return this._s3.getObject(
            files
        ).promise().then((response: any) => {
            // console.log(response);
            return response
            // return new Promise(function (resolve, reject) {
            // S3.ListObjectsRequest
            //   var s3 = new AWS.S3();
            //   var params = {
            //     Bucket: config.providerOptions.params.Bucket,
            //     Key: fileKey,
            //   };
            //   s3.getObject(params, function (err, data) {
            //     if (err) {
            //       return reject(err);
            //     }
            //     else {
            //       return resolve(data);
            //     }
            //   });
            // });
        }).catch(function (err: Error) {
            var errMsg = "";
            errMsg += "upload failed.\n ";
            errMsg += "Error Message: " + err.message + "\n ";
            errMsg += "NOTE: an error message of 'Network Failure' may mean that you have the wrong region or the wrong bucket name.";
            return errMsg;
            // alert(errMsg);
        });
    }
}