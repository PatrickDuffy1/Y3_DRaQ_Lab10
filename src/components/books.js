import { render } from "@testing-library/react";
import BooksItem from "./bookItem";

function Books(props)
{
    // Creates map out of myBooks
    return props.myBooks.map
    (
        // book is an argument
        (book)=>
        {
            return <BooksItem myBook={book} key={book._id} Reload={()=>{props.ReloadData()}}></BooksItem> // Passes the current book to BooksItem and sets the _id as the key, and reloads page
        }
    );
}

export default Books;
    