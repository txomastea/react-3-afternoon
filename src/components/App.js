import React, { Component } from 'react';
import axios from 'axios';
import Post from './Post/Post';
import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then( results => {
      console.log(results)
      this.setState({ posts: results.data });
    });
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`,{text}).then( results => {
      console.log(results.data)
      this.setState({ posts: results.data });
    });
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${id}`).then( results => {
      console.log(results)
      this.setState({ posts: results.data });
    });
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`,{ text }).then( results => {
      console.log(results)
      this.setState({ posts: results.data });
    });
  }

handleChange() {
  
}


  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />


        <section className="App__content">
          <input type="text" onChange={this.handleChange}/>
          <Compose createPostFn={this.createPost}/>
          {
            posts.map(post => (
              <Post key={post.id} 
                    text={post.text} 
                    date={post.date}
                    updatePostFn={this.updatePost}
                    id={post.id}
                    deletePostFn={this.deletePost}
              />
            ))
          
          }
        </section>
      </div>
    );
  }
}

export default App;
