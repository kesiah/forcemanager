import React, { Component } from 'react';
// import axios from 'axios';
import { Redirect } from 'react-router-dom';

class EditCompany extends Component {
  state = {
    title: '',
    content: '',
    author: 'Max',
    submitted: false,
  }

  // componentDidMount() {
  //   console.log(this.props);
  // }

  // postDataHandler = () => {
  //   const data = {
  //     title: this.state.title,
  //     body: this.state.content,
  //     author: this.state.author
  //   };
  //   // axios.post('/posts', data)
  //   //   .then(response => {
  //   //     console.log(response);
  //   //     this.props.history.replace('/posts');
  //   //     // this.setState( { submitted: true } );
  //   //   });
  // }

  render() {
    const { id } = this.props.match.params;
    console.log(this.props.match, id);
    // let redirect = null;
    // if (this.state.submitted) {
    //   redirect = <Redirect to="/posts" />;
    // }
    return (
      <div className="EditCompany">
        {/* {redirect} */}
        <h1>Edit company</h1>
        <label>Title</label>
        <input type="text" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} />
        <label>Content</label>
        <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({ content: event.target.value })} />
        <label>Author</label>
        <select value={this.state.author} onChange={(event) => this.setState({ author: event.target.value })}>
          <option value="Max">Max</option>
          <option value="Manu">Manu</option>
        </select>
        <button onClick={this.postDataHandler}>Add Post</button>
      </div>
    );
  }
}

export default EditCompany;
