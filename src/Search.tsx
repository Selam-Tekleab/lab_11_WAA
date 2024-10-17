import React, { useState } from 'react';
import axios from 'axios';


interface GithubUser {
	id: number;
	login: string;
	avatar_url: string;
	html_url: string;
  }
  

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<GithubUser[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query) return;

    setLoading(true);
    try {
      const response = await axios.get(`https://api.github.com/search/users?q=${query}`);
      setResults(response.data.items);
    } catch (error) {
      console.error('Error fetching data:', error);
      setResults([]);
    }
    setLoading(false);
  };

  return (
    <div className="album">
      <h2>Search GitHub Users</h2>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Enter username..."
        className="form-control"
      />
      <button onClick={handleSearch} className="btn btn-primary mt-2">
        Search
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="card">
          {results.map((user) => (
            <div key={user.id} className="card-text">
              <img
                src={user.avatar_url}
                alt={user.login}
                width="50"
                height="50"
                className="rounded-circle"
              />
              <a href={user.html_url} target="_blank" rel="noopener noreferrer">
                {user.login}
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;