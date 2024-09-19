import { useState, useRef } from "react";
import { useGetBooksQuery } from "./BookSlice";
import { Link } from "react-router-dom";
import "./Books.css";
import booknotfound from "../../assets/nbfound.png"

export default function Books() {
  const { data: books = [], error, isLoading } = useGetBooksQuery();
  const [searchTerm, setSearchTerm] = useState("");
  const scrollRef = useRef(null);

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredBooks = books.books.filter((book) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const matchesAuthor = book.author
      .toLowerCase()
      .includes(lowerCaseSearchTerm);
    const matchesTitle = book.title.toLowerCase().includes(lowerCaseSearchTerm);
    return matchesAuthor || matchesTitle;
  });

  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -690,
        behavior: "smooth",
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 690,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="Main-Container">
      <div className="SearchBar">
      <div className="SearchBarText">Filter by Author or Title:</div>
        <label>
          <input 
            className="SearchBox"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by author or title..."
          />
        </label>
      </div>
      <div className="BooksBackground">
        <div
          className="BooksScrollableContainer"
          ref={scrollRef}
          style={{ overflow: "hidden" }}
        >
          <button
            className="ScrollButton LeftButton"
            onClick={handleScrollLeft}
          >
            &lt;
          </button>
          <div className="BooksContainer">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <div className="Books" key={book.id}>
                  <h3 className="BookTitle">{book.title}</h3>
                  <img
                    className="CoverImage"
                    src={book.coverimage}
                    alt={`${book.title} cover`}
                  />
                  <p className="BookAuthor">
                    <strong>Author: </strong>
                    {book.author}
                  </p>
                  <div className="BookDetails">
                    <Link to={`/books/${book.id}`} className="DetailsButton">
                      View Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="NoBooksFound">
                <h2 className="NotFoundText">No books found.</h2>
                <img
                  className="NotFoundImg"
                  src={booknotfound}
                  alt="Book Not Found"
                />
                <h3 className="NoFoundText2">Try looking for something else</h3>
              </div>
            )}
          </div>
          <button
            className="ScrollButton RightButton"
            onClick={handleScrollRight}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}
