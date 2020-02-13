import React from 'react';
import '../assets/styles/sass/index.scss';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Home from '../pages/Home';
import Rooms from '../pages/Rooms';
import About from '../pages/About';
import Booking from '../pages/Booking';
import SingleRoom from '../pages/SingleRoom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ErrorPage from '../pages/ErrorPage';
import Test from '../pages/Test';
import RoomSelection from '../pages/RoomSelection';
import BookingComplete from '../pages/BookingComplete';

const App: React.FC = () => {
  return (
    <React.Fragment>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/rooms/" component={Rooms} />
        <Route exact path="/rooms/:slug" component={SingleRoom} />
        <Route exact path="/about" component={About} />
        <Route exact path="/booking" component={Booking} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/test" component={Test} />
        <Route exact path="/roomselection" component={RoomSelection} />
        <Route exact path="/bookingcomplete" component={BookingComplete} />
        <Route component={ErrorPage} />
      </Switch>
    </React.Fragment>
  );
}

export default App;
