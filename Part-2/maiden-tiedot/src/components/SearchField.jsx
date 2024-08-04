const SearchField = ({ handleInputChange }) => {
    return (
      <div>
        Find countries <input onChange={handleInputChange} />
      </div>
    )
  }

  export default SearchField