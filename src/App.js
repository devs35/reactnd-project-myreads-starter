import './App.css'
import * as BooksAPI from './BooksAPI'
import BookSearch from './BookSearch'
import Bookshelves from './Bookshelves'
import {Link, Route} from 'react-router-dom'
import React from 'react'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books 
      }));
    });  
  }
  
  switchShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      BooksAPI.getAll().then((books) => {
        this.setState(() => ({
          books
        }));
      });
    });
  };
  
  render() {
    return (
      <div className="app">
        <Route exact path="/search" render={({history}) => (
          <BookSearch switchShelf={this.switchShelf}/>
        )}/>
        <Route exact path="/" render={() => (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div>
              <Bookshelves getBooks={BooksAPI.getAll} switchShelf={this.switchShelf} books={this.state.books} />
            </div>
            <div className="open-search">
              <Link to="/search" className="open-search"><button>Add a book</button></Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp