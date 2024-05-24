import { ChangeEvent, FC, FormEvent } from 'react';

interface ISearchProps {
  query: string;
  onChangeQuery(e: ChangeEvent<HTMLInputElement>): void;
  clearQuery(): void;
  handleSubmit(e: FormEvent): void;
}

export const Search: FC<ISearchProps> = ({
  query,
  onChangeQuery,
  clearQuery,
  handleSubmit,
}) => {
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
