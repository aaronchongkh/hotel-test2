import React from 'react';
import Cover from '../components/Cover';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';
import { IState } from '../models/models';

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
    }

    handleStartDateChange = (date: Date) => {
        const nextDay = new Date(); 
        nextDay.setDate(date.getDate() + 1);
        this.setState({
            startDate: date, 
            endDate: nextDay
        });
    };

    public render(): JSX.Element {
        return <div>
        <Cover>
            <Banner 
            title="Alexis Suites"
            subtitle="Thanks for staying with us!"
            >
            </Banner>
        </Cover>
        <Services/>
        <FeaturedRooms />
    </div>
    }
}
