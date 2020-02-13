import React from 'react';
import Cover from '../components/Cover';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';
import { IState } from '../models/models';


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
    }

    public render(): JSX.Element {
        return <div>
        <Cover>
            <Banner 
            title="Alexis Suites"
            subtitle="Indulging a premium & smart stay"
            >
            </Banner>
        </Cover>
        <Services/>
        <FeaturedRooms />
    </div>
    }
}
