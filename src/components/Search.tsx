export const Search = ({ query, onChangeQuery, clearQuery, handleSubmit }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <button className="submitBtn" type="submit">
          Search
        </button>
        <input
          className="input"
          type="text"
          name="title"
          onChange={onChangeQuery}
          value={query}
        />
        <button className="clearBtn" type="button" onClick={clearQuery}>
          X
        </button>
      </form>
    </>
  );
};
