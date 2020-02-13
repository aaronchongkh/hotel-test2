import React from 'react';
import Cover from '../components/Cover';
import Banner from '../components/Banner';
import { Link } from 'react-router-dom';
import Services from '../components/Services';
import FeaturedRooms from '../components/FeaturedRooms';

const About: React.FC = () => {
    return (
        <React.Fragment>
            <Cover>
                <Banner 
                title="About us"
                subtitle="The story of us"
                >
                    <article>
                        <h5>As one of the hotels which aims to provide better services to customers, we are impletmenting technologies which makes everything easier for you. </h5>
                    </article>
                </Banner>
            </Cover>
            <Services />
        </React.Fragment>
    )
}

export default About
