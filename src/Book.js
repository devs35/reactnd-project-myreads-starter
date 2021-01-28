import PropTypes from 'prop-types'
import React from 'react'

class Book extends React.Component {
    
    static propTypes = {
        switchShelf: PropTypes.func.isRequired
    }
    
    render() {
        
        const {instance, switchShelf} = this.props;
        
        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{width: 128, height: 193, backgroundImage: `url(${instance.imageLinks.thumbnail})` }} ></div>
                    <div className="book-shelf-changer">
                        <select value={instance.shelf} onChange={(e) => switchShelf(instance, e.target.value)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{instance.title}</div>
                <div className="book-authors">{instance.authors}</div>
            </div>
        )
    }
}

export default Book