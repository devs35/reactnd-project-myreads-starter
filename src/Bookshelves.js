import Book from './Book'
import React from 'react'


class Bookshelves extends React.Component {
    
    bookshelf = {
        sectionTitle: ['Currently Reading', 
                       'Want to Read', 
                       'Read'],
        stringValue: ['currentlyReading', 
                      'wantToRead', 
                      'read']
    }
    
    
    componentDidMount() {
        this.props.getBooks();
    }
    
    render() {
        return (
            <div className="list-books-content">
                <div>
                    {this.bookshelf.sectionTitle.map((shelf, index) => (
                        <li key={index}>
                            <div className="bookshelf">
                                <h2 className="bookshelf-title">{this.bookshelf.sectionTitle[index]}</h2>
                                <div className="bookshelf-books">
                                    <ol className="books-grid">
                                        {
                                            this.props.books.filter((book) => book.shelf === this.bookshelf.stringValue[index]).map((book) => (
                                                (<li key={book.id}><Book switchShelf={this.props.switchShelf} instance={book}/></li>)
                                            ))
                                        }
                                    </ol>
                                </div>
                            </div>
                        </li>
                    ))}
                </div>
            </div>
        )
    }
}

export default Bookshelves