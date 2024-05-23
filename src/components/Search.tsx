export const Search = ({ query, onChangeQuery, clearQuery, handleSubmit }) => {
  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        <input
          className="input"
          type="text"
          name="title"
          onChange={onChangeQuery}
          value={query}
        />
        <button className="submitBtn" type="submit">
          &#128269;
        </button>
        <button className="clearBtn" type="button" onClick={clearQuery}>
          X
        </button>
      </form>
    </>
  );
};
