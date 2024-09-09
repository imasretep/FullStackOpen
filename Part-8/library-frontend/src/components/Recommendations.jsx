import { GET_FAVORITE_GENRE, ALL_BOOKS_GENRE } from "../queries.js";
import { useQuery } from "@apollo/client";

const Recommendations = (props) => {
  const userFavGenre = useQuery(GET_FAVORITE_GENRE);

  const favoriteGenre = userFavGenre?.data?.me?.favoriteGenre;

  const result = useQuery(ALL_BOOKS_GENRE, {
    variables: { genre: favoriteGenre },
  });

  //const books = result?.data?.allBooks;
  if (result.loading) {
    <div>Loading...</div>;
  }

  if (!props.show) {
    return null;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>Recommendations</h2>
      <div>
        Books in your favorite genre <strong>{favoriteGenre}</strong>
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
    </div>
  );
};

export default Recommendations;
