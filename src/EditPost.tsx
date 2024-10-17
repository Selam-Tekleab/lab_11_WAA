import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import commentsData from './db.json';  // Import the comments data

const EditPost = () => {
  const { id } = useParams<{ id: string }>();  // Get the comment ID from the URL params and type it as string
  const navigate = useNavigate();

  // State for the comment, initially set to null
  const [comment, setComment] = useState<{
    rpid: number;
    user: { uid: string; avatar: string; uname: string };
    content: string;
    like: number;
  } | null>(null);

  // Initialize state for content and likes, setting default values initially
  const [content, setContent] = useState<string>('');
  const [likes, setLikes] = useState<number>(0);

  // Use useEffect to fetch the comment data when the component mounts
  useEffect(() => {
    const foundComment = commentsData.comments.find((comment) => comment.rpid === parseInt(id || '', 10));
    
    if (foundComment) {
      setComment(foundComment);
      setContent(foundComment.content);  // Set the initial content
      setLikes(foundComment.like);  // Set the initial likes
    }
  }, [id]);

  // If comment is not found, display an error message
  if (!comment) return <h2>Comment not found</h2>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updated Comment:', { content, likes });
    // Normally, you'd submit the updated comment data to a backend API here.
    navigate(`/posts/${comment.rpid}`);  // Navigate back to the comment details page
  };

  return (
    <div>
      <nav>
        <Link to="/">Back to Comments List</Link> {/* Navigation link to go back */}
      </nav>
      <h2>Edit Comment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Content:</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
        </div>
        <div>
          <label>Likes:</label>
          <input
            type="number"
            value={likes}
            onChange={(e) => setLikes(Number(e.target.value))}
          />
        </div>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditPost;
