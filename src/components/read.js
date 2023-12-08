import { useEffect, useState } from "react";
import Books from "./books";
import axios from "axios";

function Read()
{
    // Set book data
    const[data, setData] = useState([]); 
    
    // React hook
    useEffect(
        ()=>{

            
            // Asynchronously make http request to localhost:4000 (which has the book JSON) to get book data
            axios.get('http://localhost:4000/api/books')
            .then( // Callback function
                (response)=>{
                    setData(response.data) // Store books data if api call was succsessful
                }
            )
            .catch( // Callback function
                (error)=>{
                    console.log(error); // Display error message to console if api call was unsuccsessful
                }
            );

        },[]
    )

    // Automatically reload the read component
    const Reload = (e)=>{

        // Asynchronously make http request to localhost:4000 (which has the book JSON) to get book data
        axios.get('http://localhost:4000/api/books')
        .then( // Callback function
            (response)=>{
                setData(response.data) // Store books data if api call was succsessful
            }
        )
        .catch( // Callback function
            (error)=>{
                console.log(error); // Display error message to console if api call was unsuccsessful
            }
        );
    }

    return(
        <div>
            {/* Display the Books component and passing the data variable to it*/}
            <Books myBooks={data} ReloadData={Reload}></Books>
        </div>
    );
}

export default Read;