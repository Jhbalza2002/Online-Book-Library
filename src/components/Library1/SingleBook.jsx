import {
  useGetSingleBookQuery,
  useBookCheckoutMutation,
} from "./SingleBookSlice";
import { useParams, useNavigate } from "react-router-dom";
import "./SingleBook.css";
export default function SingleBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: book = {},
    error,
    isLoading,
    refetch,
  } = useGetSingleBookQuery(id);
  const [checkoutBook] = useBookCheckoutMutation();

  const handleCheckout = async () => {
    try {
      await checkoutBook(id).unwrap();
      alert("Book checked out successfully!");
      refetch();
      navigate("/books");
    } catch (error) {
      console.error("Failed to checkout the book:", error);
      alert("Failed to checkout the book. Please Log in or Register");
      navigate("/login");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="SingleBookContainer">
      <div className="LeftPage">
        <div className="BookImageContainer">
          <img
            className="SingleCoverImage"
            src={book.book.coverimage}
            alt={`${book.book.title} cover`}
          />
        </div>
      </div>
      <div className="RightPage">
        <div className="SingleBookDetails">
          <h2 className="SingleBookTitle">{book.book.title}</h2>
          <h3 className="SingleBookAuthor">Author: {book.book.author}</h3>
          <h4 className="SingleBookDescriptionTitle">Description:</h4>
          <p className="SingleBookDescription">{book.book.description}</p>{" "}
          <div className="SingleBookButtons">
            <div className="CheckOutButton">
              {book.book.available && (
                <button onClick={handleCheckout}>Checkout Book</button>
              )}
              <button className="BackButton" onClick={() => navigate("/books")}>
                Back to Books
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
