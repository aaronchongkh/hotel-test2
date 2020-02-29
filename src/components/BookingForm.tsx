import React, { Props } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import { ReactComponent } from '*.svg';
import { IState } from '../models/models';
import Moment from 'react-moment';
import dynamo from 'dynamodb';
import AWS, { DynamoDB } from 'aws-sdk';
// const AWS = require('aws-sdk');
const S3 = require('react-aws-s3');

interface LState {
    startDate: Date;
    endDate: Date;
    noOfPeople: number;
    roomType?: string;
    fname?: string; 
    lname?: string; 
    email?: string; 
    phoneno?: string; 
}

const config = {
    bucketName: 'facerecogdata2',
    //dirName: 'media', /* optional */
    region: 'us-east-2',
    accessKeyId: 'AKIA2FBSYGBOR6A3TQGL',
    secretAccessKey: 'myA5ldaLfSkcCwYKF6DiG4q5nG4lMkXmJCoyRKSp',
    // s3Url: 'https:/your-custom-s3-url.com/', /* optional */
}

// AWS.config = new AWS.config();
// AWS.config.accessKeyId = config.accessKeyId; 
// AWS.config.secretAccessKey = config.secretAccessKey;
// AWS.config.region = config.region

AWS.config.update({accessKeyId: 'AKIA2FBSYGBOR6A3TQGL', secretAccessKey: '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', region: 'us-east-2'});
const dynamoDb = new AWS.DynamoDB.DocumentClient({accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey, region: config.region});

// dynamo.AWS.config.update({accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey, region: config.region});

const S3FileUpload = new S3(config);
// const ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

export class BookingForm extends React.Component<LState, IState> {
    constructor(props: Readonly<LState>) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)

        this.state = {
            startDate: new Date(), 
            endDate: new Date(),
            noOfPeople: 1, 
            roomType: "",
            fname: "",
            lname: "", 
            email: "", 
            phoneno: "", 
            previewImg: "", 
            photoInput: false,
            bookingRedirect: false
        }
    }

    componentDidMount() {
        setTimeout(() => {
            // const { startDate, endDate, noOfPeople, roomType } = this.props.location.state;
            // console.log(startDate);
            // console.log(endDate);
            // console.log(noOfPeople);
            // console.log(roomType);

        this.setState({
            startDate: this.props.startDate,
            endDate: this.props.endDate,
            noOfPeople: this.props.noOfPeople,
            roomType: this.props.roomType,
            fname: this.props.fname,
            lname: this.props.lname,
            email: this.props.email,
            phoneno: this.props.phoneno
        })
        console.log(this.state.noOfPeople);
        console.log(this.state.roomType);
        console.log(this.state.startDate);
        console.log(this.state.endDate);
        }, 1000)
    }

    public photoSelection() {
        let numOfSel: Array<JSX.Element> = [];
        for(let i = 1; i <= this.props.noOfPeople; i++) {
            numOfSel.push(<div>Person number {i}: <button>Import picture</button></div>)
        }
        return numOfSel;
    }

    public renderPhotoSelection() {
        
        return <div>
            {this.photoSelection()}
        </div>
    }

    public handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        this.setState({
            fname: (this.refs.fname as HTMLInputElement).value, 
            lname: (this.refs.lname as HTMLInputElement).value,
            email: (this.refs.email as HTMLInputElement).value, 
            phoneno: (this.refs.phoneno as HTMLInputElement).value
        })
        console.log(this.state.fname);

        var fnameString = this.state.fname; 
        var lnameString = this.state.lname; 
        var cusFullName = fnameString + "_" + lnameString; 
        var endDateString = this.state.endDate.toDateString().split(' ').slice(1).join(' ');
        var startDateString = this.state.startDate.toDateString().split(' ').slice(1).join(' ');
        var emailString = this.state.email;
        var phonenoString = this.state.phoneno;
        var roomTypeString = this.state.roomType;
        var noOfPeopleString = this.state.noOfPeople;

        console.log(this.state);
        console.log(cusFullName);
        

        var params = {
            TableName: 'HotelCustomer', 
            Item: {
                // 'fName': {"S": this.state.fname}, 
                // 'lName': {"S": this.state.lname}, 
                // 'startDate': {"S": this.state.startDate.toISOString()}, 
                // 'endDate': {"S": this.state.endDate.toISOString()}, 
                // 'roomType': {"S": this.state.roomType}, 
                // 'fullName': {"S": cusFullName}, 
                // 'email': {"S": this.state.email}, 
                // 'phoneno': {"S": this.state.phoneno},
                // 'noOfPeople': {"S": this.state.noOfPeople}
                fName: fnameString,
                lName: lnameString,
                email: emailString, 
                endDate: endDateString, 
                fullName: cusFullName, 
                phoneno: phonenoString, 
                roomType: roomTypeString, 
                startDate: startDateString, 
                noOfPeople: noOfPeopleString, 
                roomNumber: 0
            }
        }; 

        dynamoDb.put(params, (err, data) => {
            if (err) {
                console.log("Error", err); 
                window.alert("Can't upload data, please try again. ")
            } else {
                console.log("Success", data);
                this.setState({
                    bookingRedirect: true
                })  
            }
        });

        

        // setTimeout(() => {
        //     //bac
        // }, 300)
    }

    public handleFirstName(e: string): void {
        this.setState({
            fname: e
        })
    }

    public handleLastName(e: string): void {
        this.setState({
            lname: e
        })
    }

    public handleEmail(e: string): void {
        this.setState({
            email: e
        })
    }

    public handlePhone(e: string): void {
        this.setState({
            phoneno: e
        })
    }

    public handlePhotoUpload(e: any): void {
        var fnameString = this.state.fname; 
        var lnameString = this.state.lname; 
        var fullName = fnameString + "_" + lnameString; 

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
        const file_name = fullName;

        S3FileUpload.uploadFile(e.target.files[0], file_name).then((data: any) => console.log(data), window.alert("Uploaded")).catch((err: any) => console.error(err));

        const abc = reader.readAsDataURL(file);

        this.setState({
            photoInput: true
        })
    }

    public render(): JSX.Element {
        const bookingRedirect = this.state.bookingRedirect;
        console.log(this.state);
        
        if (bookingRedirect) {
            return <Redirect to='/bookingcomplete' />
        }
        else {
            return <div>
            <div className="banner">
                <h2>Room details: </h2>
                <p>Room type selected: {this.props.roomType}</p>
                <p>Start date: {this.props.startDate.toDateString()}</p>
                <p>End date: {this.props.endDate.toDateString()}</p>
            </div>
            <form onSubmit={(e) => this.handleSubmit(e)} noValidate={true}>
            <div className="container">
                <div className="form-group">
                    <p>First Name: <input ref='fname' placeholder= "Enter first name" type="text" onChange={e => this.handleFirstName(e.target.value)}></input> Last Name: <input ref='lname' placeholder= "Enter last name" type="text" onChange={e => this.handleLastName(e.target.value)}></input></p>
                    <p>Email address: <input ref='email' placeholder="Enter email address" type="email" onChange={e => this.handleEmail(e.target.value)}></input></p>
                    <p>Phone number: <input ref='phoneno' placeholder="Enter phone number" type="number" onChange={e => this.handlePhone(e.target.value)}></input></p>
                    {this.renderPhotoSelection()}
                    <button className="btn-primary" type="submit">Finish booking</button>
                </div>
            </div>
            </form>
            </div>
        }
    }
}

export default BookingForm;
