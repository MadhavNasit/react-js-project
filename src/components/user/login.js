import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, FormGroup } from 'reactstrap';
import { setUserSession } from '../../security/auth';
import { trackPromise } from 'react-promise-tracker';
import { Link } from 'react-router-dom';
import { Textbox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';


class login extends React.Component {
    constructor(props) {

        super(props)
        this.state = {
            userName: '',
            password: ''
        }

        this.handleChange = this.handleChange.bind(this)
    }

    Authenticate = () => {
        var body = {
            userName: this.state.userName,
            password: this.state.password
        }
        trackPromise(
            axios.post('https://localhost:44306/api/User/authenticate', body)
                .then((res) => {
                    if(res.data.status === "success")
                    {
                        setUserSession(res.data.user.token);
                        sessionStorage.setItem('userName', res.data.user.username);
                        toast.success(res.data.message);
                        this.props.history.push('/projects')
                    }
                    else
                    {
                        toast.error(res.data.message);
                    }
                    
                })
                .catch((err) => {
                    toast.error('Somethig went Wrong!!');
                }));
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
            <div>
                <FormGroup className="mb-3">
                    <Textbox
                        attributesInput={{
                            id: 'userName',
                            name: 'userName',
                            type: 'text',
                            placeholder: 'Enter Email'
                        }}
                        value={this.state.userName}
                        onChange={(userName, e) => {
                            this.setState({ userName });
                        }}
                        onBlur={(e) => { console.log(e) }}
                        validationOption={{
                            name: 'User Email',
                            check: true,
                            required: true,
                            customFunc: email => {
                                const reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                                if (reg.test(String(email).toLowerCase())) {
                                    return true;
                                } else {
                                    return 'Enter valid email address';
                                }
                            }
                        }}
                    />
                </FormGroup>
                <FormGroup className="mb-2">
                    <Textbox
                        attributesInput={{
                            id: 'password',
                            name: 'password',
                            type: 'password',
                            placeholder: 'Enter Password'
                        }}
                        value={this.state.password}
                        onChange={(password, e) => {
                            this.setState({ password });
                        }}
                        onBlur={(e) => { console.log(e) }}
                        validationOption={{
                            name: 'Password',
                            check: true,
                            required: true
                        }}
                    />
                </FormGroup>
                <div className="text-right mb-2"><Link to="/forgotpassword">Forgot Password?</Link></div>
                <Button onClick={this.Authenticate}
                    color="primary" block>Login</Button>


            </div>
        );
    }

}

export default login;