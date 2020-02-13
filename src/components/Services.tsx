import React, { Component } from 'react';
import { FaSmile, FaMicrochip, FaHome } from 'react-icons/fa';
import Title from './Title';

interface Service {
    icon: JSX.Element | string;
    title: string;
    info: string;
}

interface IStateServices {
    services: Service[];
}

export default class Services extends Component<{}, IStateServices> {

    public readonly state: Readonly<IStateServices> = {
        services: [
            {
                icon: <FaMicrochip />,
                title: "modern technologies",
                info: "Face recognition and voice-controlled system implementation in hotel rooms."
            },
            {
                icon: <FaHome />, 
                title: "premium stay", 
                info: "Providing a premium & comfortable stay for hotel guests"
            }, 
            {
                icon: <FaSmile />, 
                title: "good user experience", 
                info: "Implementing world-class modern technologies to enhance and provide better user experience"
            }
        ]
    }

    public render() {
        const { services } = this.state;
        return (
            <section className="services">
                <Title title="services" />
                <div className="services-center">
                    {services.map((item: Service, index: number) => {
                        return (
                            <article key={index} className="service">
                                <span>{item.icon}</span>
                                <h6>{item.title}</h6>
                                <p>{item.info}</p>
                            </article>
                        )
                    })}
                </div>
            </section>
        )
    }
}
