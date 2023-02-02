import {supabase} from '../client';
import axios from "axios";
import { useEffect, useState } from 'react';

function SearchBar({book, fetchBooks, setBookList}) {
    const {book_name, book_author} = book
    const [searchTerm, setSearchTerm] = useState('');
    

    const baseURL = `https://www.googleapis.com/books/v1/volumes`
    const handleSubmit = (e) => {
      e.preventDefault()
      axios
      .get(baseURL, {params: {q: searchTerm, maxResults: 10}})
      .then(({data}) => {
        console.log(data)
        //write a utils function that removes unnecessary data and returns as an array of objects
        setBookList(data)
      })
    }
  


    async function createBook() {
        await supabase
        .from('book_list')
        .insert([
          {book_name, book_author}
        ])
        .single()
        setSearchTerm({book_name: "", book_author: ""})
        fetchBooks()
      }

    return (
        <form onSubmit={handleSubmit}>
        <input placeholder="Title/Author"
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      />
      <button>find a book!</button>
      </form>
    )
}

export default SearchBar;