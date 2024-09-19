import { useEffect } from "react";
import {
  useGetAccountDetailsQuery,
  useReturnBookMutation,
} from "./AccountSlice";
import { useNavigate } from "react-router-dom";
import "./Account.css";

const Account = () => {
  const {
    data: accountDetails,
    error,
    isLoading,
    isSuccess,
    refetch,
  } = useGetAccountDetailsQuery({ count: 4 });

  const navigate = useNavigate();
  const [returnBook] = useReturnBookMutation();

  useEffect(() => {
    refetch();
  }, [isSuccess]);

  const handleReturnBook = async (reservationId) => {
    try {
      await returnBook(reservationId).unwrap();
      alert("Book returned successfully!");
      refetch();
      navigate("/account");
    } catch (error) {
      console.error("Failed to return the book:", error);
      alert("Failed to return the book. Please try again.");
    }
  };

  useEffect(() => {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("Token");
    if (!token) {
      navigate("/login");
    }
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("Token");
    if (!token) {
      navigate("/login");
      return <div>Redirecting to login...</div>;
    }
  }

  if (!accountDetails) {
    return <div>No account details found.</div>;
  }

  return (
    <section className="AccountDetailsMain">
      <h2 className="AccountDetails">Account Details</h2>
      <p className="Email">
        <strong>Email:</strong> {accountDetails.email ?? "N/A"}
      </p>
      <p className="Fname">
        <strong>First name:</strong> {accountDetails.firstname ?? "N/A"}
      </p>
      <p className="Lname">
        <strong>Last name:</strong> {accountDetails.lastname ?? "N/A"}
      </p>
      <h3 className="CheckBooks">Checked Out Books</h3>
      {accountDetails.books?.length > 0 ? (
        <div className="Containers">
          {accountDetails.books.map((book) => (
            <div className="Books-Account" key={book.id}>
              <div className="Returnablebooks">
                <img
                  className="ImageAccount"
                  src={book.coverimage}
                  alt={`${book.title} cover`}
                />
                <div className="BookInfo">
                <strong className="Author">Author: {book.author} </strong>
                <strong className="Tittle">Tittle: {book.title} </strong>
                </div>
                <button
                  className="Return"
                  onClick={() => handleReturnBook(book.id)}
                >
                  Return Book
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="Nobookcheck">No books checked out</p>
      )}
    </section>
  );
};

export default Account;
