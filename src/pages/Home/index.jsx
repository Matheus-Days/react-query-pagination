import { useState } from 'react';
import { useQuery } from 'react-query';
import './styles.css';

const getQuotes = async (page = 1) => {
  return fetch(
    `https://animechan.vercel.app/api/quotes/anime?title=naruto&page=${page}`
  ).then((res) => res.json());
};

export function Home() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = useQuery(
    ['getQuotes', page],
    () => {
      getQuotes(page);
    },
    {
      onSuccess: (data) => {
        console.log(data);
      },
    }
  );

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const nextPage = () => {
    setPage(page + 1);
  };

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error fetching the quotes...</div>;

  return (
    <div className="home">
      <h1>Anime Quotes</h1>
      <ul className="quotes-list">
        {data?.map((quote, i) => (
          <li key={i} className="quote">
            <h3>{quote.anime}</h3>
            <div>{quote.quote}</div>
          </li>
        ))}
      </ul>
      <div className="page">{page}</div>
      <button onClick={prevPage} className="prev-btn">
        Previous
      </button>
      <button onClick={nextPage} className="next-btn">
        Next
      </button>
    </div>
  );
}
