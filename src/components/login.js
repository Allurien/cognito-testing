import React from "react";
import './login.css';
import { Auth } from "aws-amplify";
import { Row, Col } from 'react-flexbox-grid';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange = (event) => {
            this.setState({
                [event.target.id]: event.target.value
            });
    }

    handleSubmit = async event => {
        event.preventDefault();
        try {
            await Auth.signIn(this.state.email, this.state.password);
            alert("Logged in");
            this.props.userHasAuthenticated(true);
            this.props.history.push("/");
        } catch (e) {
            console.log(e.message);
        }
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    render () {
        return(
            <div className="app-container">
                <Row lg={6}>
                    <Paper className="main-paper login-container">
                        <form onSubmit={this.handleSubmit}>
                            <Col lg={12} className="input-col">
                                <TextField
                                    id="email"
                                    name="email"
                                    label="Email Address"
                                    value={this.state.email}
                                    onChange={this.handleChange}
                                    margin="normal"
                                />
                                <TextField
                                    id="password"
                                    name="password"
                                    label="Password"
                                    type="password"
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    margin="normal"
                                />
                                <div className="submit-button-row">
                                    <Button className="submit" variant="contained" onClick={this.handleSubmit} disabled={!this.validateForm()}>
                                        Submit
                                    </Button>
                                </div>
                            </Col>
                        </form>
                    </Paper>
                </Row>
            </div>
        );
    };

}

export default Login;