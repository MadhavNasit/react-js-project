import React from 'react';  
import axios from 'axios';  
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { trackPromise } from 'react-promise-tracker';
import { Button, Card, CardBody, CardGroup, Col, Container, Form, Row, FormGroup } from 'reactstrap';
import { Link,NavLink } from 'react-router-dom';
import { Textbox } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';


class forgotpassword extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            Email: ''
        }
    }

    

    forgotPassword=()=>{
        var body = {Email: this.state.Email      
        }
        
        trackPromise(
        axios.post('https://localhost:44306/api/User/forgotpassword',body)
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
            toast.error('Somethig went Wrong!!');
        }));
    }

    handleChange= (e)=> {  
        this.setState({[e.target.name]:e.target.value});  
    }

    render() {  
        return (  
            <div className="app flex-row align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col md="9" lg="7" xl="6">
                        <CardGroup>
                            <Card className="p-2 user-card">
                                <CardBody>
                                    <Form>
                                    <div className="d-flex mb-3 nav-user">
                                        <NavLink to="/forgotpassword" className="flex-fill" activeClassName="active">Forgot Password</NavLink>
                                    </div>
                                    <FormGroup className="mb-3">
                                        <Textbox
                                            attributesInput={{
                                                id: 'Email',
                                                name: 'Email',
                                                type: 'text',
                                                placeholder: 'Enter Email'
                                            }}
                                            value={this.state.Email}
                                            onChange={(Email, e) => {
                                                this.setState({ Email });
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
                                        <div className="d-flex justify-content-center">
                                            <Button onClick={this.forgotPassword} className="mr-2" color="success">Send Mail</Button>
                                            <Link to="/login" className="btn btn-danger ml-2">Cancel</Link>
                                        </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        </div>
        );  
    }  
        
}

export default forgotpassword;