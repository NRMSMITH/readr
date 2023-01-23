import './App.css';
import { useState, useEffect } from 'react'
import {supabase} from './client'

function App() {
  const [books, setBooks] = useState([])
  const [book, setBook] = useState({book_name: "", book_author: ""})
  const {book_name, book_author} = book;

  useEffect(() => {
    fetchBooks()
  }, [])


  async function fetchBooks() {
    const { data } = await supabase
    .from('book_list')
    .select()
    setBooks(data)
  }

  async function createBook() {
    await supabase
    .from('book_list')
    .insert([
      {book_name, book_author}
    ])
    .single()
    setBook({book_name: "", book_author: ""})
    fetchBooks()
  }

  async function deleteBook(bookId) {
    const { data, error } = await supabase
    .from('book_list')
    .delete()
    .eq('id', bookId)
    fetchBooks()

    if(error) {
      console.log(error)
    }

    if(data) {
      console.log(data)
    }
  }

  return (
    <section className="App">
      <input placeholder="nameOfBook"
      value={book_name}
      onChange={e => setBook({...book, book_name: e.target.value})}
      />
      <input placeholder="authorOfBook"
      value={book_author}
      onChange={e => setBook({...book, book_author: e.target.value})}
      />
      <button onClick={createBook}>add a book!</button>
      {books.map((book) => (
        <section key={book.id}>
          <h3>{book.book_name}</h3>
          <p>{book.book_author}</p>
          <button onClick={() => {deleteBook(book.id)}}>Read</button>
        </section>
      )
      )}
    </section>
  );
}

export default App;
