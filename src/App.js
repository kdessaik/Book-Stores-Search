
import './App.css';
import  Search  from  "./image/serchBooks.JPG"

import{useState} from "react"
import axios from 'axios';


function App() {
  const [book,setBook]=useState("")
  const [result,setResult]=useState([])
  const [error,setError]=useState("")
  //loading
  const [isLoading,setIsLoading]=useState(false)

  //for Api value
  const [apiKey,setApikey]=useState("AIzaSyBhYtzAmMog98UdQVvzFN28RE---nfhnl0")

  
  function handleChange(e){
    var book=e.target.value
  
     setBook(book)}
  
 
  function handleSubmit(event){
    event.preventDefault();
    async function FetchingData(){
      setIsLoading(true)
      await  axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+"&key="+apiKey+"&maxResults=5")
      
      .then((data)=>{
        setResult(data.data.items)
        console.log(data)
        
      })
      .catch((error)=>{
        setError(error);
        
    })
    setIsLoading(false)
    } FetchingData()

  }
  
  
  return (
    <div className="App">
      <header className="container mt-10">
      <section className='container'>
        <h1>Book Search</h1>
        <img src={Search} alt="search" />
        </section>
        

        <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} placeholder='enter Book Name' className='form-control mt-10' autoComplete='off' /><br/>
        <button  className='btn btn-danger'> Search Book</button>
        </form>
      </header>
      <div className='container' >
        <ol className='section1'>
         {isLoading ? (<img src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921' />) :(
           result.map(
            (book)=>{
              return(
                <div className='container'id='container1'>
                
              <li key={book.accessInfo.id} >
              <h4>{book.volumeInfo.title}</h4>
                
                <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title}/>
                
                </li>
                <p>Author : <span>{book.volumeInfo.authors.map((e)=>{return e})}</span></p>
            <p> Published by <span>{book.volumeInfo.publisher}</span></p>
              <a className='btn btn-primary' href={book.volumeInfo.previewLink}>Read This Book</a> 
                </div>
              )
            }
          )
         )}
          
          </ol>
       
      </div>
    </div>
  );
}

export default App;
