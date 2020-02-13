import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent } from '*.svg';

interface IState {
    username: string; 
    password: string;
}

export class LoginForm extends React.Component<{}, IState> {
    constructor(props: {}) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleUsername = this.handleUsername.bind(this);

        this.state = {
            username: "",
            password: ""
        }
    }

    public handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
        e.preventDefault();
        this.setState({
            username: (this.refs.username as HTMLInputElement).value, 
            password: (this.refs.password as HTMLInputElement).value
        })
        console.log(this.state.username);
    }

    public handleUsername(e: any): void {
        // e.preventDefault();
        this.setState({
            username: e
        })
    }

    public render(): JSX.Element {
        console.log(this.state);
        return <div>
            <form onSubmit={(e) => this.handleSubmit(e)} noValidate={true}>
            <div className="container">
                <div className="form-group banner">
                    <p>Username: <input ref='username' placeholder= "Enter username" type="text" onChange={(e) => this.handleUsername(e.target.value)}></input></p>
                    <p>Password: <input ref='password' placeholder= "Enter password" type="password"></input></p>
                    <p><Link to="/register">Not a user? Register here</Link></p>
                    <button className="btn-primary" type="submit">Login</button>
                </div>
            </div>
        </form>
        </div>
    }
}

export default LoginForm;
