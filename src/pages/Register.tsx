import React from 'react';
import Cover from '../components/Cover';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import RegistrationForm from '../components/RegistrationForm';
import FeaturedRooms from '../components/FeaturedRooms';

const Register: React.FC = () => {
    return (
        <React.Fragment>
            <Cover>
                <RegistrationForm>
                </RegistrationForm>
            </Cover>
        </React.Fragment>
    )
}

export default Register
