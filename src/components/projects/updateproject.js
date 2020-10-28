import React from 'react';   
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Col, Form, FormGroup, Label, Input } from 'reactstrap';  
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Textbox, Textarea } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import { trackPromise } from 'react-promise-tracker';

class updateproject extends React.Component {  
    constructor(props) {  
        super(props)  
    
        this.state = {
          id: 0,
          projectName: '',
          duration: '',
          cost: '',
          description: '',
          hasNameError: true,
          hasDurationError: true,
          hasCostError: true,
          hasDescriptionError: true,
          validate: false
        }
        this.validateForm = this.validateForm.bind(this);
    }  
  componentDidMount() {
    trackPromise(  
      axios.get('https://localhost:44306/api/Project/'+this.props.match.params.id)  
          .then(res => { 
            if(res.data.status === "success")
            {
              this.setState({   
                id: res.data.project.id,
                projectName: res.data.project.projectName,   
                duration: res.data.project.duration,  
                cost: res.data.project.cost,  
                description: res.data.project.description }); 
            }
            else
            {
              toast.error(res.data.message);
            }   
        }).catch((err) => {
          toast.error('Somethig went Wrong!!');
      })); 
    }

    toggleValidating(validate) {
      this.setState({ validate });
    }
  
    validateForm() {
      this.toggleValidating(true);
      const {
        hasNameError,
        hasDurationError,
        hasCostError,
        hasDescriptionError
      } = this.state;
  
      if (!hasNameError && !hasNameError && !hasNameError && !hasNameError) {
        this.updateProject();
      }
    }

    updateProject=()=>{  
        const obj = {  
            id:this.props.match.params.id,  
            projectName: this.state.projectName,  
            duration: this.state.duration,  
            cost: this.state.cost,  
            description: this.state.description  
        }; 
        trackPromise(
        axios.put('https://localhost:44306/api/Project/'+this.props.match.params.id, obj)  
        .then(res => {
          if(res.data.status === "success")
          {
            this.props.history.push('/projects');
            toast.success(res.data.message);
          }
          else
          {
              toast.error(res.data.message);
          }
        }).catch((err) => {
          toast.error('Somethig went Wrong!!');
      }));
    }  

    render() {  
        return (  
            <Container className="App">  
             <h4 className="PageHeading mb-4">Update Project Informations</h4>  
              <Form className="form">  
              <Col sm={8} className="offset-sm-2">  
                <Input type="hidden" name="id" onChange={(id, e) => {
                        this.setState({ id });
                      }} value={this.state.id}/>
                <FormGroup row>  
                  <Label for="projectName" sm={3}>Project Name</Label>  
                  <Col sm={9}>
                    <Textbox
                      attributesInput={{
                        id: 'projectName',
                        name: 'projectName',
                        type: 'text',
                        placeholder: 'Enter Project NAme',
                      }}
                      value={this.state.projectName}
                      onChange={(projectName, e) => {
                        this.setState({ projectName });
                      }}
                      onBlur={(e) => {console.log(e)}}
                      validationOption={{
                        name: 'Project Name', 
                        check: true, 
                        required: true 
                      }}
                    />
                  </Col>  
                </FormGroup>  
                <FormGroup row>  
                  <Label for="duration" className="required" sm={3}>Duration</Label>  
                  <Col sm={9}>
                    <Textbox
                      attributesInput={{
                        id: 'duration',
                        name: 'duration',
                        type: 'text',
                        placeholder: 'Enter Duration in Weeks',
                      }}
                      value={this.state.duration}
                      onChange={(duration, e) => {
                        this.setState({ duration });
                      }}
                      onBlur={(e) => {console.log(e)}}
                      validationOption={{
                        name: 'Duration', 
                        check: true, 
                        required: true,
                        type: 'number',
                        max: 1000
                      }}
                    />
                  </Col>  
                </FormGroup>  
                <FormGroup row>  
                  <Label for="cost" className="required" sm={3}>Cost</Label>  
                  <Col sm={9}>  
                  <Textbox
                      attributesInput={{
                        id: 'cost',
                        name: 'cost',
                        type: 'text',
                        placeholder: 'Enter Cost',
                      }}
                      value={this.state.cost}
                      onChange={(cost, e) => {
                        this.setState({ cost });
                      }}
                      onBlur={(e) => {console.log(e)}}
                      validationOption={{
                        name: 'Cost', 
                        check: true, 
                        type: 'number',
                        required: true
                      }}
                    />
                  </Col>  
                </FormGroup>  
                <FormGroup row>  
                  <Label for="description" className="required" sm={3}>Description</Label>  
                  <Col sm={9}>  
                  <Textarea
                      attributesInput={{
                        id: 'description',
                        name: 'description',
                        type: 'text',
                        placeholder: 'Enter Description',
                      }}
                      value={this.state.description}
                      onChange={(description) => {
                        this.setState({ description });
                      }}
                      onBlur={(e) => {console.log(e)}}
                      validationOption={{
                        name: 'Description', 
                        check: true, 
                        required: true,
                        max: 2000
                      }}
                    />
                  </Col>  
                </FormGroup>  
              </Col>  
              <Col className="my-4">  
                <FormGroup row>  
                  <Col sm={6}>  
                  </Col>  
                  <Col sm={1}>  
                  <button type="button" onClick={this.updateProject} className="btn btn-success">Submit</button>  
                  </Col>  
                  <Col sm={1}>  
                    <Link to='/projects' className="btn btn-danger">Cancel</Link> 
                  </Col>  
                  <Col sm={4}>  
                  </Col>  
                </FormGroup>  
              </Col>  
            </Form> 
            </Container>  
        );  
    }  
}  
export default updateproject;
