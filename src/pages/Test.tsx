import React from 'react';
import DatePicker from 'react-datepicker';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
// import S3FileUpload from 'aws-s3';
// import AWS from 'aws-sdk';
// const S3FileUpload = require('react-s3');
import AWS, { DynamoDB } from 'aws-sdk';
import Webcam from 'react-webcam';
const S3 = require('react-aws-s3');

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
AWS.config.update({accessKeyId: 'AKIA2FBSYGBOR6A3TQGL', secretAccessKey: 'myA5ldaLfSkcCwYKF6DiG4q5nG4lMkXmJCoyRKSp', region: 'us-east-2'});
const dynamoDb = new AWS.DynamoDB.DocumentClient({accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey, region: config.region});

const S3FileUpload = new S3(config);

export default class Test extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.handleImage = this.handleImage.bind(this);
        this.addTries = this.addTries.bind(this);

        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            roomType: "", 
            success: false, 
            url: "", 
            photoInput: false,
            test: "", 
            tries: 0
        }
    }

    handleChange = (date: any) => {
        this.setState({
            startDate: date
        });
    };

    public handleRoomType = (selectedRoom: any) => {
        setTimeout(() => {

        this.setState({
            roomType: selectedRoom.value
        })
        console.log(this.state.roomType);
        }, 300)
    }

    // public handleTakePhoto (dataUri) {
    //     console.log('takePhoto');
    // }

    public showlmao() {
        let arrylmao: Array<JSX.Element> = [];
        for(let i = 0; i < 5; i++) {
            // arrylmao = arrylmao + <button></button>
            var btnName = "btn" + i;
            arrylmao.push(<div><button ref={btnName} onChange={this.addTries}>ksdjfljskdflksjdf</button></div>)
        }
        return arrylmao
    }

    public renderlmao() {
        return <div>
            {this.showlmao()}
        </div>
    }

    public handleImage(e: any) { //Converting index_face from Python to JS for easier development on web
        let file = e.target.files[0];
        let reader = new FileReader();

        if (e.target.files.length === 0) {
            return;
        }

        console.log(e.target.files[0]);
        reader.onloadend = (e) => {
            this.setState({
                previewImg: [reader.result]
            });
        }
        const file_name = "testname";

        S3FileUpload.uploadFile(e.target.files[0], file_name).then((data: any) => console.log(data), window.alert("Uploaded")).catch((err: any) => console.error(err));

        const abc = reader.readAsDataURL(file);

        this.setState({
            photoInput: true
        })
    }

    public addTries() {
        var tries1 = this.state.tries;
        tries1 = tries1 + 1;
        console.log(tries1);
        this.setState({
            tries: tries1
        })
    }
    public isButtonDisabled(): boolean {
        if(this.state.tries >= 5) {
            return true;
        }
        else {
            return false;
        }
    }

    public dynamicInput(e: any): void {
        this.setState({
            test: e
        })
    }

    public dbtry() {
        setTimeout(() => {
            var params = {
                TableName: 'test1234', 
                Item: {
                    number: "123", 
                    word: "what is this?"
                }
            }

            dynamoDb.put(params, (err, data) => {
                if (err) {
                    console.log("Error", err);
                } else {
                    console.log("Success", data);
                }
            })
        }, 300)


    }

    public render(): JSX.Element {
        const options = [
            { value: 'single-standard', label: 'Single Standard' },
            { value: 'single-deluxe', label: 'Single Deluxe' },
            { value: 'double-standard', label: 'Double Standard' },
            { value: 'double-deluxe', label: 'Double Deluxe' }, 
            { value: 'family-standard', label: 'Family Standard' },
            { value: 'family-deluxe', label: 'Family Deluxe' }, 
            { value: 'presidential', label: 'Presidential' }
        ]
        const defaultOption = options[0]
        console.log(this.state);
        //window.alert(this.state.startDate.toDateString());
        return <div>
            <DatePicker 
            selected={this.state.startDate}
            onChange={this.handleChange}/>
        <Dropdown options={options} onChange={this.handleRoomType} value={this.state.roomType} placeholder="Select an option" />
        {this.renderlmao()}
        <div>
            <button className="btn-primary">Select photo</button>
            <input disabled={this.isButtonDisabled()} type="file" name="file" onChange={this.handleImage}/>
            <p id="infoCount" ref="infoCount">This is customer: {this.state.tries + 1} </p>
            <button disabled={this.isButtonDisabled()} onClick={this.addTries}>jfjfjf</button>
            <h1>Preview</h1>
            <h1>lksdjfldsjlfkdjsf</h1>
            <img src={this.state.previewImg} alt="" />
        </div>
        <div>
            <button onClick={this.dbtry}>DynamoDB try</button>
        </div>
        <Webcam
        height={360}
        />
        <input type="name" onChange={(e) => this.dynamicInput(e.target.value)} placeholder="Try to dynamic input"></input>
        </div>
    }
}
