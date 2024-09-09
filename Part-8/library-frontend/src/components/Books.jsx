import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS, ALL_BOOKS_GENRE } from "../queries.js";

const Books = (props) => {
  const [uniqueGenres, setUniqueGenres] = useState([]);
  const [books, setBooks] = useState([]);
  const [genre, setGenre] = useState(null);

  const result = useQuery(ALL_BOOKS_GENRE, {
    variables: { genre: null },
  });

  const refetchGenres = (selGenre) => {
    result.refetch({ genre: selGenre });
    setGenre(selGenre);
  };

  useEffect(() => {
    if (!result.loading && result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result.data, result.loading]);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const genres = () => {
    let allGenres = books.flatMap((g) => g.genres);

    allGenres.forEach((genre) => {
      if (!uniqueGenres.includes(genre)) {
        setUniqueGenres(uniqueGenres.concat(genre));
      }
    });
  };

  genres();

  return (
    <div>
      <h2>books</h2>
      <div>
        in genre: <strong> {genre === null ? "all genres" : genre} </strong>{" "}
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        {uniqueGenres.map((g, i) => (
          <button onClick={() => refetchGenres(g)} key={i}>
            {g}
          </button>
        ))}
      </div>
      <button onClick={() => refetchGenres(null)}>all genres</button>
    </div>
  );
};

export default Books;
