import { useEffect } from "react";
import { useGetAccountDetailsQuery, useReturnBookMutation } from "./AccountSlice";
import { useNavigate } from "react-router-dom";

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
    <section>
      <h2>Account Details</h2>
      <p>First name: {accountDetails.firstname ?? "N/A"}</p>
      <p>Last name: {accountDetails.lastname ?? "N/A"}</p>
      <p>Email: {accountDetails.email ?? "N/A"}</p>
      <h3>Checked Out Books</h3>
      {accountDetails.books?.length > 0 ? (
        <ul>
          {accountDetails.books.map((book) => (
            <li key={book.id}>
              <div>
              {book.title} 
            <br></br>
            <button onClick={() => handleReturnBook(book.id)}>Return Book</button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No books checked out</p>
      )}
    </section>
  );
};

export default Account;
