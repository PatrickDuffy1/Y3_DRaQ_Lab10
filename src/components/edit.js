import React from 'react';
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

export default function Edit(props) {

    // The useParams hook returns an object of key/value pairs of
    // the dynamic params from the current URL that were matched by
    //the <Route path>.
    let { id } = useParams();

    // update arrays using the React useState()
    // and without the Array objects push() method
    const[title, setTitle] = useState(""); // Set book title
    const[cover, setCover] = useState(""); // Set book cover
    const[author, setAuthor] = useState(""); // Set book author

    // useNavigate return a function that we can use to navigate
    const navigate = useNavigate();

    //useEffect Hook is similar componentDidMount
    useEffect(() => {

        //axios is a promised based web client
        //make a HTTP Request with GET method and pass as part of the url.
        axios.get('http://localhost:4000/api/book/' + id)
            .then((response) => {
                // Assign Response data to the arrays using useState.
                setTitle(response.data.title);
                setCover(response.data.cover);
                setAuthor(response.data.author);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, []);

    // Sets the book data based on the data inputted in the form
    const handleSubmit = (event) => {
        event.preventDefault();

        // Set new values for edited book
        const newBook = {
            id: id,
            title: title,
            cover: cover,
            author: author
        };

        // Put the new book data to the server JSON
        axios.put('http://localhost:4000/api/book/' + id, newBook)
            .then((res) => {
                console.log(res.data);
                navigate('/read');
            });
    }

    // Returns HTML form for editing book
    return (
        <div>

            {/* Sends data to handleSubit when form is submitted */}
            <form onSubmit={handleSubmit}>

                {/* Input for adding book title */}
                <div className="form-group">
                    <label>Add Book Title: </label>
                    <input type="text"
                        className="form-control"
                        value={title} // Sets value of input box to title
                        onChange={(e) => setTitle(e.target.value)} // Update title when value in input box changed
                    />
                </div>

                {/* Input for adding book cover */}
                <div className="form-group">
                <label>Add Poster Url: </label>
                    <input type="text"
                        className="form-control"
                        value={cover} // Sets value of input box to cover
                        onChange={(e) => setCover(e.target.value)} // Update cover when value in input box changed
                    />
                </div>

                {/* Input for adding book author */}
                <div className="form-group">
                    <label>Add Author: </label>
                    <input type="text"
                        className="form-control"
                        value={author} // Sets value of input box to author
                        onChange={(e) => setAuthor(e.target.value)} // Update author when value in input box changed
                    />
                </div>

                {/* Calls handleSubmit when clicked */}
                <div className="form-group">
                    <input type="submit" value="Edit Book" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}
