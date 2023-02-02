import './App.css';
import { useState, useEffect } from 'react'
import {supabase} from './client'
import Header from './components/Header'
import SearchBar from './components/SearchBar'

function App() {
  const [books, setBooks] = useState([])
  const [book, setBook] = useState({book_name: "", book_author: ""})
  const [readBooks, setReadBooks] = useState([])
  const [bookList, setBookList] = useState([])

  useEffect(() => {
    fetchBooks()
  }, [])

async function fetchBooks() {
    const { data } = await supabase
    .from('book_list')
    .select()
    setBooks(data)
  }

  async function deleteBook(bookId) {
    const { data, error } = await supabase
    .from('book_list')
    .delete()
    .eq('id', bookId)
    fetchBooks()
    if(error) console.log(error)
    if(data) console.log(data)
  }

  async function fetchReadBooks() {
    const { data } = await supabase
    .from('books_read')
    .select()
    setReadBooks(data)
  }

  async function deleteBookFromRead(readBookID) {
    const {data, error} = await supabase
    .from('books_read')
    .delete()
    .eq('id', readBookID)
    fetchReadBooks()
    if(error) console.log(error)
    if(data) console.log(data)
  }
  

 async function moveBook(book) {
  const bookId = parseInt(book.id)
    const {error} = await supabase
    .from('books_read')
    .insert([{id: bookId, book_name: book.book_name, book_author: book.book_author}])
    if(error) console.log(error)
    else {
      setReadBooks((books) => {
        const newlyReadBooks = [
          ...books,
          {id: bookId, book_name: book.book_name, book_author: book.book_author}
        ]
        return newlyReadBooks;
      })
      deleteBook(book.id)
    }
  }


  return (
    <section className="App">
      <Header/>
      <SearchBar book={book} setBook={setBook} fetchBooks={fetchBooks} setBookList={setBookList}/>
      <section className="grid-container">
        <section className="grid-item">
      <h3>Bookshelf:</h3>
      {books.map((book) => (
        <section key={book.id}>
          <h3>{book.book_name}</h3>
          <p>{book.book_author}</p>
          <button onClick={() => {deleteBook(book.id)}}>Delete</button>
          <button onClick={() => {moveBook(book)}}>Read</button>
        </section>
      )
      )}
      </section>
      <section className="grid-item">

      <h3>Books Read:</h3>
      {readBooks.map((readbook) => (
        <section key={readbook.id}>
          <h3>{readbook.book_name}</h3>
          <p>{readbook.book_author}</p>
          <button onClick={() => {deleteBookFromRead(readbook.id)}}>Delete</button>
          </section>
      )
      )}
      </section>
      </section>
    </section>
  );
}

export default App;
