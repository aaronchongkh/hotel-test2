import React from 'react';

interface IState {
    username: string; 
    password: string;
    fname: string; 
    lname: string; 
    email: string; 
    phoneno: string;
}

export class RegistrationForm extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            username: "",
            password: "",
            fname: "",
            lname: "",
            email: "",
            phoneno: ""
        }
    }

    public handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        this.setState({
            username: (this.refs.username as HTMLInputElement).value, 
            password: (this.refs.password as HTMLInputElement).value, 
            fname: (this.refs.fname as HTMLInputElement).value, 
            lname: (this.refs.lname as HTMLInputElement).value, 
            email: (this.refs.email as HTMLInputElement).value, 
            phoneno: (this.refs.phoneno as HTMLInputElement).value
        })
    }

    public render(): JSX.Element {
        console.log(this.state);
        return <div>
                <form onSubmit={(e) => this.handleSubmit(e)} noValidate={true}>
                <div className="container">
                    <div className="form-group banner">
                        <h2>Register</h2>
                        <p>Username: <input ref="username" type="text"></input></p>
                        <p>Password: <input ref="password" type="password"></input></p>
                        <p>First name: <input ref="fname" type="text"></input> Last name: <input ref="lname" type="text"></input></p>
                        <p>Email address: <input ref="email" type="text"></input></p>
                        <p>Phone number: <input ref="phoneno" type="string"></input></p>
                        <button className="btn-primary" type="submit">
                            Login
                        </button>
                    </div>
                </div>
            </form>
        </div>
    }
}

export default RegistrationForm;
