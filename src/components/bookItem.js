import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';

function BooksItem(props)
{
    return(

        <div>
            <center>
            {/* Display Book as card */}
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={props.myBook.cover} /> {/* Display book image */}
                <Card.Body>
                    <Card.Title>{props.myBook.title}</Card.Title> {/* Display book title */}
                    <Card.Text>{props.myBook.author}</Card.Text> {/* Display one book author */}
                </Card.Body>
                <Link to={'/edit/' + props.myBook._id} className='btn btn-primary'>Edit</Link> {/* When clicked changes url to the url of the book */}

                {/* Deletes the book when clicked*/}
                <Button variant='danger' onClick={(e)=>{
                    axios.delete('http://localhost:4000/api/book/' + props.myBook._id)
                    .then((res)=>{
                        let reload = props.Reload(); // Invoke the reload fuction tat was passed from read to bookItem
                    })
                    .catch();
                }}>Delete</Button> 
            </Card>
            </center>
        </div>
    );
}

export default BooksItem;