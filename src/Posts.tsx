import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDataContext } from './context';

const Posts: React.FC = () => {
  const { setUserData } = useDataContext();  // Context for setting user data
  const [comments, setComments] = useState<any[]>([]);  // State to hold comments

  useEffect(() => {
    // Fetch comments from db.json
    const fetchComments = async () => {
      try {
        const response = await fetch('./db.json');
        const data = await response.json();
        console.log('Fetched data:', data);
        setComments(data.comments || []);  // Set comments from the fetched data

        // Assuming you want to store user data from the JSON file in the context
        if (data.name || data.age || data.city) {
          setUserData({ name: data.name, age: data.age, city: data.city });
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);  // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <h2>Comments</h2>
      {comments.length > 0 ? (
        <ul>
          {comments.map((comment) => (
            <li key={comment.rpid}>
              {/* Hyperlink to the post details page */}
              <Link to={`/posts/${comment.rpid}`}>
                <strong>{comment.user.uname}</strong>: {comment.content}
              </Link>
              <p>Likes: {comment.like} | Posted at: {comment.ctime}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No comments available.</p>
      )}
    </div>
  );
};

export default Posts;
