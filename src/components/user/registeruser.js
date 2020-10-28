import React from 'react';  
import axios from 'axios';  
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, FormGroup } from 'reactstrap';
import { Textbox } from 'react-inputs-validation';
import { trackPromise } from 'react-promise-tracker';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';


class registeruser extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            UserName: '',
            FirstName: '',
            LastName: '',
            Password: '',
            ConfirmPassword: ''
        }
    }

    Register=()=>{
            var body = {
                UserName: this.state.UserName,
                FirstName: this.state.FirstName,
                LastName: this.state.LastName,      
                Password: this.state.Password
            }
            trackPromise(
            axios.post('https://localhost:44306/api/User/register',body)
            .then((res) => {
                if(res.data.status === "success")
                {
                    toast.success(res.data.message);
                    this.props.history.push('/login')
                }
                else
                {
                    toast.error(res.data.message);
                }
                
            })
            .catch((err) => {
                toast.error('Something went wrong!!');
            }));
    }

    render() {  
        return (  
            <div>                        
                <FormGroup className="mb-3">
                    <Textbox
                        attributesInput={{
                            id: 'UserName',
                            name: 'UserName',
                            type: 'text',
                            placeholder: 'Enter Email'
                        }}
                        value={this.state.UserName}
                        onChange={(UserName, e) => {
                            this.setState({ UserName });
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
                <FormGroup className="mb-3">
                    <Textbox
                        attributesInput={{
                            id: 'FirstName',
                            name: 'FirstName',
                            type: 'text',
                            placeholder: 'Enter FirstName'
                        }}
                        value={this.state.FirstName}
                        onChange={(FirstName, e) => {
                            this.setState({ FirstName });
                        }}
                        onBlur={(e) => { console.log(e) }}
                        validationOption={{
                            name: 'FirstName',
                            check: true,
                            required: true
                        }}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Textbox
                        attributesInput={{
                            id: 'LastName',
                            name: 'LastName',
                            type: 'text',
                            placeholder: 'Enter LastName'
                        }}
                        value={this.state.LastName}
                        onChange={(LastName, e) => {
                            this.setState({ LastName });
                        }}
                        onBlur={(e) => { console.log(e) }}
                        validationOption={{
                            name: 'LastName',
                            check: true,
                            required: true
                        }}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Textbox
                        attributesInput={{
                            id: 'Password',
                            name: 'Password',
                            type: 'password',
                            placeholder: 'Enter Password'
                        }}
                        value={this.state.Password}
                        onChange={(Password, e) => {
                            this.setState({ Password });
                        }}
                        onBlur={(e) => { console.log(e) }}
                        validationOption={{
                            name: 'Password',
                            check: true,
                            required: true
                        }}
                    />
                </FormGroup>
                <FormGroup className="mb-3">
                    <Textbox
                        attributesInput={{
                            id: 'ConfirmPassword',
                            name: 'ConfirmPassword',
                            type: 'password',
                            placeholder: 'Confirm Password'
                        }}
                        value={this.state.ConfirmPassword}
                        onChange={(ConfirmPassword, e) => {
                            this.setState({ ConfirmPassword });
                        }}
                        onBlur={(e) => { console.log(e) }}
                        validationOption={{
                            name: 'Confirm Password',
                            check: true,
                            required: true,
                            customFunc: confirmPassword => {
                                const password = this.state.Password;
                                if (password === confirmPassword) {
                                    return true;
                                } else {
                                    return 'Password Does not match';
                                }
                            }
                        }}
                    />
                </FormGroup>
                <Button onClick={this.Register} color="success" block>Add User</Button>                    
        </div> 
        );  
    }  
        
}

export default registeruser;