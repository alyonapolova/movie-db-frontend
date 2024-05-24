import { useEffect, useState } from 'react';
import { useAppSelector } from '../store';
import { pageSelector, totalPagesSelector } from '../features/redux/selectors';
import { setPage } from '../features/redux/slice';
import { useDispatch } from 'react-redux';

const paginatorLength = 8;

type PaginatorItem = number | '...';

const calcItems = (page: number, totalPages: number): Array<PaginatorItem> => {
  const items: PaginatorItem[] = [];

  for (let i = 0; i < totalPages; i += 1) {
    items.push(i + 1);
  }

  if (totalPages <= paginatorLength) {
    return items;
  }

  if (page <= paginatorLength - 2) {
    return [...items.slice(0, paginatorLength - 2), '...', totalPages];
  } else if (totalPages - paginatorLength + 2 < page) {
    return [1, '...', ...items.slice(-paginatorLength + 2)];
  }

  const from = Math.max(2, page - Math.floor((paginatorLength - 4) / 2));
  const to = Math.min(
    totalPages - 1,
    page + Math.floor((paginatorLength - 4) / 2)
  );
  return [1, '...', ...items.slice(from - 1, to), '...', totalPages];
};

export const Paginator = () => {
  const dispatch = useDispatch();
  const [items, setItems] = useState<PaginatorItem[]>([]);

  const page = useAppSelector(pageSelector);
  const totalPages = useAppSelector(totalPagesSelector);

  const onPrev = () => {
    if (page > 1) {
      dispatch(setPage(page - 1));
    }
  };

  const onNext = () => {
    if (page < totalPages) {
      dispatch(setPage(page + 1));
    }
  };

  const select = (value: PaginatorItem) => {
    if (value !== '...') {
      dispatch(setPage(value));
    }
  };

  useEffect(() => {
    setItems(calcItems(page, totalPages));
  }, [page, totalPages]);

  return (
    <div>
      <button onClick={onPrev} aria-label="previous">
        {'<'}
      </button>
      <div>
        {items.map((item, index) => (
          <button
            key={index}
            onClick={() => select(item)}
            aria-label={`page ${item}`}
            role="button"
          >
            {item}
          </button>
        ))}
      </div>
      <button onClick={onNext} aria-label="next">
        {'>'}
      </button>
    </div>
  );
};
