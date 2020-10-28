import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Col, FormGroup, Label, Form, Input } from 'reactstrap';
import { Textbox, Textarea } from 'react-inputs-validation';
import 'react-inputs-validation/lib/react-inputs-validation.min.css';
import { trackPromise } from 'react-promise-tracker';


class addproject extends React.Component {
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
      this.AddProject();
    }
  }

  AddProject = () => {

    var body = {
      id: this.state.id,
      projectName: this.state.projectName,
      duration: this.state.duration,
      cost: this.state.cost,
      description: this.state.description,
    }
    trackPromise(
      axios.post('https://localhost:44306/api/Project', body)
        .then(res => {
          if (res.data.status === "success") {
            toast.success(res.data.message);
            this.props.history.push('/projects')
          }
          else {
            toast.error(res.data.message);
          }
        }).catch((err) => {
          toast.error('Somethig went Wrong!!');
        }));
  }

render() {
  const {
    validate
  } = this.state;
  return (
    <Container className="App">
      <h4 className="PageHeading mb-4 text-center">Enter Project Informations</h4>
      <Form className="form">
        <Col sm={8} className="offset-sm-2">
          <Input type="hidden" name="id" onChange={this.handleChange} value={this.state.id} />
          <FormGroup row>
            <Label for="projectName" sm={3} className="required">Project Name</Label>
            <Col sm={9}>
              <Textbox
                attributesInput={{
                  id: 'projectName',
                  name: 'projectName',
                  type: 'text',
                  placeholder: 'Enter Project Name'
                }}
                value={this.state.projectName}
                validate={validate}
                validationCallback={res =>
                  this.setState({ hasNameError: res, validate: false })
                }
                onChange={(projectName, e) => {
                  this.setState({ projectName });
                }}
                onBlur={(e) => { console.log(e) }}
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
                validate={validate}
                validationCallback={res =>
                  this.setState({ hasDurationError: res, validate: false })
                }
                onChange={(duration, e) => {
                  this.setState({ duration });
                }}
                onBlur={(e) => { console.log(e) }}
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
                validate={validate}
                validationCallback={res =>
                  this.setState({ hasCostError: res, validate: false })
                }
                onChange={(cost, e) => {
                  this.setState({ cost });
                }}
                onBlur={(e) => { console.log(e) }}
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
                validate={validate}
                validationCallback={res =>
                  this.setState({ hasDescriptionError: res, validate: false })
                }
                onChange={(description) => {
                  this.setState({ description });
                }}
                onBlur={(e) => { console.log(e) }}
                validationOption={{
                  name: 'Description',
                  check: true,
                  required: true,

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
              <button type="button" onClick={this.validateForm} className="btn btn-success">Submit</button>
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

export default addproject;