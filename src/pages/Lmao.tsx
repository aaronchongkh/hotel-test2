import React from 'react';
import AWS, {DynamoDB} from 'aws-sdk';
import Webcam, { WebcamProps } from 'react-webcam';
const S3 = require('react-aws-s3')

interface IState {
    startDate: Date;
    endDate: Date;
    roomType: string;
    previewImg?: any;
    success: boolean; 
    url: string;
    photoInput: boolean;
    test: string;
    tries: number;
}

const config = {
    bucketName: 'facerecogdata2',
    //dirName: 'media', /* optional */
    region: 'us-east-2',
    accessKeyId: 'AKIA2FBSYGBOR6A3TQGL',
    secretAccessKey: 'myA5ldaLfSkcCwYKF6DiG4q5nG4lMkXmJCoyRKSp',
    // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
}
var s3Bucket = new AWS.S3( { params: {Bucket: 'facerecogdata2'} } );
AWS.config.update({accessKeyId: 'AKIA2FBSYGBOR6A3TQGL', secretAccessKey: 'myA5ldaLfSkcCwYKF6DiG4q5nG4lMkXmJCoyRKSp', region: 'us-east-2'});
const dynamoDb = new AWS.DynamoDB.DocumentClient({accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey, region: config.region});

const S3FileUpload = new S3(config);

export default class Lmao extends React.Component<{}, IState> {
    private webcamRef: React.RefObject<Webcam> & React.RefObject<HTMLVideoElement>;
    constructor(props: {}) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.handleUpload = this.handleUpload.bind(this);
        this.webcamRef = React.createRef();
        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            roomType: "", 
            success: false, 
            url: "", 
            photoInput: false,
            test: "", 
            previewImg: null,
            tries: 0
        }
    }

    handleClick = () => {
        var lmao = this.webcamRef.current.getScreenshot();
        this.setState({ 
            previewImg: lmao
         });
        const file_name = "testname";

        // const buf = new Buffer(this.state.previewImg.imageBinary.replace(/^data:image\/\w+;base64,/, ""),'base64')
        // var data = {
        //     Key: "1234", 
        //     Body: buf,
        //     ContentEncoding: 'base64',
        //     ContentType: 'image/jpeg'
        // };

        // var image1 = new Image();
        // image1.src = this.state.previewImg;

        // S3FileUpload.uploadFile(data).then((data: any) => console.log(data), window.alert("Uploaded")).catch((err: any) => console.error(err));
    }

    handleUpload = () => {
        // var buf = Buffer.from(this.state.previewImg.imageBinary.toString().replace(/^data:image\/\w+;base64,/, ""), 'base64')
        // var binary = this.state.previewImg.toString().split(',')[1];
        const buffer = Buffer.from(this.state.previewImg.replace(/^data:image\/\w+;base64,/, ""),'base64');
        console.log(buffer);
        var data = {
            Key: "1234.jpeg", 
            Body: buffer,
            ContentEncoding: 'base64',
            ContentType: 'image/jpeg', 
            Bucket: 'facerecogdata2'
        };  
        s3Bucket.putObject(data, function(err, data){
            if (err) { 
                console.log(err);
                console.log('Error uploading data: ', data); 
            } else {
                console.log('succesfully uploaded the image!');
            }
        });
    }

    showlmao = () => {
        var image1 = new Image();
        image1.src = this.state.previewImg;
        return <div>
            document.body.appendChild(image);
        </div>
    }

    public render(): JSX.Element {
        console.log(this.state)
        return <div>
            <h1>lkjsfdlkj</h1>
            <Webcam
            height={360}
            width={1280}
            screenshotFormat="image/jpeg"
            audio={false}
            ref={this.webcamRef}
            />
            <button onClick={this.handleClick}>Capture pic</button>
            <button onClick={this.handleUpload}>Upload</button>
            <div>
            <img src={this.state.previewImg} />
            </div>
        </div>
    }
}