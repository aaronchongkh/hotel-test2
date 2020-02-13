import React from 'react';
import Cover from '../components/Cover';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';
import DatePicker from 'react-datepicker';
import NumericInput from "react-numeric-input";
import { IState } from '../models/models';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'


// interface IState {
//     startDate: Date;
//     endDate: Date;
//     noOfPeople: number;
// }

export default class Home extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);

        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);

        this.state = {
            startDate: today,
            endDate: tomorrow,
            noOfPeople: 1
        }
        this.handleNoOfPeopleChange = this.handleNoOfPeopleChange.bind(this);
    }

    handleStartDateChange = (date: Date) => {
        const nextDay = new Date(); 
        nextDay.setDate(date.getDate() + 1);
        this.setState({
            startDate: date, 
            endDate: nextDay
        });
    };

    handleEndDateChange = (date: Date) => {
        this.setState({
            endDate: date
        });
    };

    handleNoOfPeopleChange(new_value: any) {
        this.setState({
            noOfPeople: new_value
        });
    };

    public render(): JSX.Element {
        console.log(this.state);
        const options = [
            { value: '1', label: '1' },
            { value: '2', label: '2' },
            { value: '3', label: '3' },
            { value: '4', label: '4' }, 
            { value: '5', label: '5' }
        ]
        return <div>
        <Cover>
            <Banner 
            title="Alexis Suites"
            subtitle="Indulging a premium & smart stay"
            >
                Start date: <DatePicker 
                selected={this.state.startDate}
                minDate={this.state.startDate}
                onChange={this.handleStartDateChange}/> 
                End date: <DatePicker 
                selected={this.state.endDate}
                minDate={this.state.endDate}
                onChange={this.handleEndDateChange}/>
                People: <NumericInput min={1} max={6}
                onChange={this.handleNoOfPeopleChange}/>
            <Link to={{pathname:"/roomselection", state: { startDate: this.state.startDate, endDate: this.state.endDate, noOfPeople: this.state.noOfPeople } }} className="btn-primary">book now</Link>
            </Banner>
        </Cover>
        <Services/>
        <FeaturedRooms />
    </div>
    }
}
