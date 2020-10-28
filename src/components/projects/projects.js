import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { trackPromise } from 'react-promise-tracker';
import { Card, CardBody } from 'reactstrap';

export default class projects extends Component {
  constructor(props) {
    super(props);
    this.state = { projectList: [] };
  }

  componentDidMount() {
    this.getProjects();
  }

  getProjects() {
    trackPromise(
      axios.get('https://localhost:44306/api/Project')
        .then(res => {
          console.log(res);
          if (res.data.status !== "failed") {
            
            this.setState({ projectList: res.data });
          }
          else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          toast.error('Somethig went Wrong!!');
        }));
  }

  tabRow() {
    return this.state.projectList.map((object, i) =>
      <tr key={i}>
        <td>
          {i + 1}
        </td>
        <td>
          {object.projectName}
        </td>
        <td>
          {object.duration}
        </td>
        <td>
          {object.cost}
        </td>
        <td>
          {object.projectDate}
        </td>
        <td>
          {object.description}
        </td>
        <td>
          <Link to={"/updateproject/" + object.id} className="btn btn-success btn-sm">Edit</Link>
        </td>
        <td>
          <button type="button" onClick={() => {this.DeleteProject(object.id)}} className="btn btn-danger btn-sm">Delete</button>
        </td>
      </tr>
    );
  }

  DeleteProject=(id)=> {
    const originalState = this.state.projectList;
    const projects = this.state.projectList.filter(p => id !== p.id);
    this.setState({ projectList : projects });
    trackPromise(
      axios.delete('https://localhost:44306/api/Project/' + id)
        .then(res => {
          if (res.data.status === "success") {
            toast.error("Record deleted successfully!!");
          }
          else {
            this.setState({ projectList : originalState });
            toast.error(res.data.message);
          }
        }).catch((err) => {
          toast.error('Somethig went Wrong!!');
        }));
  }

  logout() {
    localStorage.setItem('loggedIn', 'false');
  }

  render() {
    return (
      <div>
        <h3 align="center" className="mb-4">CRUD Example</h3>
        <div style={{ display: "flex" }}>
          <Link to={"/addproject"} className="btn btn-primary btn-sm" style={{ marginLeft: "auto" }}>Add Project</Link>
        </div>
        <Card style={{ marginTop: 10 }}>
          <CardBody style={{ padding: 0 }}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Project Name</th>
                  <th>Duration</th>
                  <th>Cost</th>
                  <th>Date</th>
                  <th>Description</th>
                  <th colSpan="4">Action</th>
                </tr>
              </thead>
              <tbody>
                {this.tabRow()}
              </tbody>
            </table>
          </CardBody>
        </Card>

      </div>
    );
  }
}