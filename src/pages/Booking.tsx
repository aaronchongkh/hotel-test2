import React from 'react';
import Cover from '../components/Cover';
import BookingForm from '../components/BookingForm';
import { Link, RouteComponentProps } from 'react-router-dom';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';
import { IState } from '../models/models';

export default class Booking extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);

        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            noOfPeople: 1,
            roomType: "",
            fname: "", 
            lname: "",
            email: "",
            phoneno: ""
        }
    }

    componentDidMount() {
        setTimeout(() => {
            const { startDate, endDate, noOfPeople, roomType } = this.props.location.state;
        console.log(startDate);
        console.log(endDate);
        console.log(noOfPeople);
        console.log(roomType);

        this.setState({
            startDate: startDate,
            endDate: endDate,
            noOfPeople: noOfPeople,
            roomType: roomType
        })
        console.log(this.state.noOfPeople);
        console.log(this.state.roomType);
        }, 500)
    }

    public render() {
        return <div>
            <Cover>
                <BookingForm {...this.state} >
                </BookingForm>
            </Cover>
        </div>
    }
}
