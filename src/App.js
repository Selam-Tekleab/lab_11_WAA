import React from 'react';
import Posts from './Posts';
import Comments from './Comments';
import { DataProvider } from './context';
import Todo from './Todo';
import Search from './Search';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import PostDetails from './PostDetails';
import EditPost from './EditPost';

function App() {
  return (
    <DataProvider>
      <Router>
        <div>
          <h1>Welcome to Selam's App</h1>
          <nav>
            {/* Navigation Menu */}
            <ul>
              <li>
                <Link to="/">Posts List</Link>
              </li>
              <li>
                <Link to="/comments">Comments</Link>
              </li>
            </ul>
          </nav>

          <Search />
          <Todo />

          {/* Routing */}
          <Routes>
            <Route path="/" element={<Posts />} />
            <Route path="/posts/:id" element={<PostDetails />} />
            <Route path="/posts/:id/edit" element={<EditPost />} />
            <Route path="/comments" element={<Comments />} />
          </Routes>
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;
