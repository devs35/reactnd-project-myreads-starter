import Book from './Book'
import * as BooksAPI from './BooksAPI'
import {Link} from 'react-router-dom'
import React from 'react'

class BookSearch extends React.Component {
       
    state = {
        books: [],
        query: '',
        shelvedBooks: []
    }
    
    componentDidMount() {
        BooksAPI.getAll().then((books) => {
            this.setState(() => ({
                shelvedBooks: books
            }));
        });
    }
    
    updateQuery = (query) => {
        this.setState(() => ({
            query: query
        }))
        
        this.bookSearch(query);
    };
    
    bookSearch = (query) => {
        if (query.length > 0) {
            BooksAPI.search(query).then((books) => {
                (books !== undefined && books.error !== 'empty query') ? this.checkStatus(books) : this.setState({books: []})
            })
        } else {
            this.setState({
                books: []
            });
        }
    };
    
    checkStatus(books) {
        books.map((book => {
            book.shelf = "none";
            const shelvedBooks = this.state.shelvedBooks.find((b) => b.id === book.id);
            if (shelvedBooks) { 
                book.shelf = shelvedBooks.shelf;
                return book;
            }
            return book;
        }));
        this.setState({
            books: books.filter((book) => {
                return book.imageLinks !== undefined && book.authors !== undefined
            })
        });
    }
    
    render() {
        const {books} = this.state;
        
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/"><button className="close-search">Close</button></Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author. See SEARCH_TERMS.md for accepted queries" value={this.state.query} onChange={(event) => this.updateQuery(event.target.value)}/>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {
                            books.map((book) => (
                              (<li key={book.id}><Book switchShelf={this.props.switchShelf} instance={book}/></li>)
                            ))
                        }
                    </ol>
                </div>
            </div>
        );
    }
}

export default BookSearch