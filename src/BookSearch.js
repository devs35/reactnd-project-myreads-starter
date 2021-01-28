import Book from './Book'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom' 
import React from 'react'

class BookSearch extends React.Component {
    
    state = {
        books: [],
        query: ''
    }
    
    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))
        
        if (this.state.query.length > 0) {
            BooksAPI.search(query).then((books) => {
                if (books === undefined || books.error) {
                    books = []
                }
                
                this.setState(() => ({
                    books: books.filter((book) => {
                        return book.imageLinks !== undefined && book.authors !== undefined})
                }));
            });
        }
    }
    
    render() {
        const {books} = this.state;
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            books.map((book) => {
                              return (<li key={book.id}><Book switchShelf={this.props.switchShelf} instance={book}/></li>)
                            })
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookSearch