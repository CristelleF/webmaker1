import React, { Component } from 'react';
import {Link} from "react-router-dom";
import Axios from "axios";

export default class PageNew extends Component {
  
  state = {
    uid: "",
    wid: "",
    name: "",
    title: ""
}

componentDidMount() {
    this.setState({
        uid: this.props.match.params.uid,
        wid: this.props.match.params.wid
    })    
}

onChange = async e => {
    this.setState({
      [e.target.name]: e.target.value
  })
}

onSubmit = async e => {
  e.preventDefault();
  const newPage = {
      name: this.state.name,
      websiteId: this.state.wid,
      title: this.state.title
  }
  await Axios.post("/api/page", newPage);
  this.props.history.push(`/user/${this.state.uid}/website/${this.state.wid}/page`)
}

render() {
  const {uid, wid, name, title} = this.state;
    return (
      <div>
       <nav className="navbar fixed-top navbar-light bg-light">
        <Link className="color-black" to={`/user/${uid}/website/${wid}/page`}>
        <i className="fas fa-chevron-left"/></Link>
        <span className="navbar-brand">New Page</span>
        <button className="color-black btn" form="newPageForm"> <i className="fas fa-check"/>
        </button>
    </nav>
    <div className="container">
            <form id="newPageForm" onSubmit={this.onSubmit}>
                <div className="form-group">
                 <label htmlFor="name"> 
                <b>Name</b>
                </label>
                  <input placeholder="Enter page name here..."
                   className="form-control" 
                   onChange={this.onChange}
                   value={name}
                   type="text" id="name" name="name"/>
                   </div>
<div className="form-group">
  <label htmlFor="title"><b>Title</b>
  </label>
  <input placeholder="Enter page title here..." 
  className="form-control"
  onChange={this.onChange} 
  value={title}
  type="text" id="title" name="title"/>
  </div>
  <Link to={`/user/${uid}/website/${wid}/page`} 
  className="btn btn-lg btn-warning">
            Cancel</Link>
        <button
            className="btn btn-lg btn-success float-right">
            Submit
        </button>
</form>
</div>
<footer className="navbar navbar-light bg-light">
<div className="full-width">
          <Link className="color-black float-right" to={`/user/${uid}`}>
            <i className="fas fa-user"/></Link>
          </div></footer> 
      </div>
    );
  }
}
