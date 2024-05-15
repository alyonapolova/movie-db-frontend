export const Search = ({ query, onChangeQuery, clearQuery, handleSubmit }) => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type="submit">Search</button>
        <input
          type="text"
          name="title"
          onChange={onChangeQuery}
          value={query}
        />
        <button type="button" onClick={clearQuery}>
          X
        </button>
      </form>
    </>
  );
};
