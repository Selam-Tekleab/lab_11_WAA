import React from 'react';
import { useParams, Link } from 'react-router-dom';
import commentsData from './db.json'; // Import the comments data

const PostDetails: React.FC = () => {
  const { id } = useParams();  // Get the comment ID from the URL params
  const comment = commentsData.comments?.find(comment => comment.rpid === parseInt(id || ''));

  if (!comment) return <h2>Comment not found</h2>;

  return (
    <div>
      <nav>
        <Link to="/">Back to Comments List</Link> {/* Navigation link to go back */}
      </nav>
      <h2>Comment Details</h2>
      <p><strong>User:</strong> {comment?.user?.uname}</p>
      <p><strong>Content:</strong> {comment?.content}</p>
      <p><strong>Likes:</strong> {comment?.like}</p>
      <p><strong>Posted on:</strong> {comment?.ctime}</p>
      <Link to={`/posts/${comment?.rpid}/edit`}>Edit</Link>  {/* Link to edit page */}
    </div>
  );
};

export default PostDetails;
