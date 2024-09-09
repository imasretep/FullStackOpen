import { useState } from "react";
import { useQuery } from "@apollo/client";
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries.js";
import { useMutation } from "@apollo/client";
import Select from "react-select";

const Authors = (props) => {
  if (!props.show) {
    return null;
  }

  const result = useQuery(ALL_AUTHORS);

  if (result.loading) {
    return <div>Loading...</div>;
  }

  const authors = result.data.allAuthors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <EditAuthor authors={authors} />
    </div>
  );
};

const EditAuthor = ({ authors }) => {
  const [author, setAuthor] = useState("");
  const [birthYear, setBirthYear] = useState("");

  const options = authors
    .filter((a) => a.born === null)
    .map((a) => ({ value: a.name, label: a.name }));

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const submit = async (event) => {
    event.preventDefault();

    editAuthor({
      variables: { name: author.value, setBornTo: Number(birthYear) },
    });

    setAuthor("");
    setBirthYear("");
  };

  return (
    <div>
      <h2> Set birthyear </h2>
      <form onSubmit={submit}>
        <div>
          <Select value={author} onChange={setAuthor} options={options} />
        </div>

        <div>
          Birthyear:
          <input
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  );
};

export default Authors;
