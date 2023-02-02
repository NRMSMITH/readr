import {supabase} from '../client';

const SearchBar = ({book, fetchBooks, setBook}) => {
    const {book_name, book_author} = book



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

    return (
        <section>
        <input placeholder="nameOfBook"
      value={book_name}
      onChange={e => setBook({...book, book_name: e.target.value})}
      />
      <input placeholder="authorOfBook"
      value={book_author}
      onChange={e => setBook({...book, book_author: e.target.value})}
      />
      <button onClick={createBook}>add a book!</button>
      </section>
    )
}

export default SearchBar;