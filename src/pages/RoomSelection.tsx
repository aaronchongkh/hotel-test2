import React from 'react';
import Cover from '../components/Cover';
import Banner from '../components/Banner';
import { Link, RouteComponentProps } from 'react-router-dom';
import RoomsContainer from '../containers/RoomsContainer';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css'
import { IState } from '../models/models';

// interface IState {
//     startDate: Date; 
//     endDate: Date; 
//     noOfPeople: number; 
//     roomType: string;
// }

export default class RoomSelection extends React.Component<RouteComponentProps, IState> {
    constructor(props: RouteComponentProps) {
        super(props);
        this.handleRoomType = this.handleRoomType.bind(this);

        this.state = {
            startDate: new Date(),
            endDate: new Date(),
            noOfPeople: 1,
            roomType: ""
        }
    }
    
    componentDidMount() {
        setTimeout(() => {
            const { startDate, endDate, noOfPeople } = this.props.location.state;
        console.log(startDate);
        console.log(endDate);
        console.log(noOfPeople);

        this.setState({
            startDate: startDate,
            endDate: endDate,
            noOfPeople: noOfPeople
        })
        console.log(this.state.noOfPeople);
        }, 1000)
    }

    public handleRoomType = (selectedRoom: any) => {
        setTimeout(() => {
            this.setState({
                roomType: selectedRoom.value
            })
            console.log(this.state.roomType);
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
        return <div>
        <Cover coverClass="roomsHero">
            <Banner 
            title="our rooms"
            >
            <Link to="/" className="btn-primary">return home</Link>
            </Banner>
        </Cover>
        <div style={{ padding: "100px" }}>
            <h3>Choose your preferred room</h3>
            <Dropdown options={options} onChange={this.handleRoomType} value={this.state.roomType} placeholder="Select an option" />
            <Link to={{pathname:"/booking", state: { startDate: this.state.startDate, endDate: this.state.endDate, noOfPeople: this.state.noOfPeople, roomType: this.state.roomType } }} className="btn-primary">select</Link>
        </div>
        <RoomsContainer />
        </div>
    }
}