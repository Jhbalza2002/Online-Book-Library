import { useEffect } from "react";
import { useGetAccountDetailsQuery, useReturnBookMutation } from "./AccountSlice";
import { useNavigate } from "react-router-dom";
import "./Account.css"
const Account = () => {
  const {
    data: accountDetails,
    error,
    isLoading,
    isSuccess,
    refetch
  } = useGetAccountDetailsQuery({ count: 4 });

  useEffect(() => {
    refetch()
  },[isSuccess])

  const [returnBook] = useReturnBookMutation();
  const navigate = useNavigate();

  const handleReturnBook = async (reservationId) => {
    try {
      await returnBook(reservationId).unwrap();
      alert("Book returned successfully!");
      refetch();
      navigate('/account');
    } catch (error) {
      console.error("Failed to return the book:", error);
      alert("Failed to return the book. Please try again.");
    }
    window.location.reload ()
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    const token = window.sessionStorage.getItem("Token");
    if (!token) {
      navigate("/login");
      return <div>Redirecting to login...</div>;
    }}

  if (!accountDetails) {
    return <div>No account details found.</div>;
  }

  return (
    <section className="AccountDetailsMain">
      <h2 className="AccountDetails">Account Details</h2>
      <p className="Email"><strong>Email:</strong> {accountDetails.email ?? "N/A"}</p>
      <p className="Fname"><strong>First name:</strong> {accountDetails.firstname ?? "N/A"}</p>
      <p className="Lname"><strong>Last name:</strong> {accountDetails.lastname ?? "N/A"}</p>
      <h3 className="CheckBooks">Checked Out Books</h3>
      {accountDetails.books?.length > 0 ? (
        <ul className="Ulist">
          {accountDetails.books.map((book) => (
            <li className="List" key={book.id}>
              <div className="Returnablebooks">
              <img
            className="ImageAccount"
            src={book.coverimage}
            alt={`${book.title} cover`}
          />
              <strong>Author:</strong> {book.title} 
            <br>
            </br>
            <button className="Return" onClick={() => handleReturnBook(book.id)}>Return Book</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="Nobookcheck">No books checked out</p>
      )}
    </section>
  );
};

export default Account;
