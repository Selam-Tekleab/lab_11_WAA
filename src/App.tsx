import './App.scss';
import avatar from './images/bozai.png';
import { useEffect, useState } from 'react';

interface User {
  uid: string;
  avatar: string;
  uname: string;
}

interface Comment {
  rpid: number;
  user: User;
  content: string;
  ctime: string;
  like: number;
}

const App = () => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeTab, setActiveTab] = useState('hot');
  const [newComment, setNewComment] = useState('');

  // Fetch comments from json-server
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch('http://localhost:5000/comments');
        if (!response.ok) {
          throw new Error('Failed to fetch comments');
        }
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments(); 
  }, []); 

  const sortComments = (type: 'hot' | 'newest') => {
    let sortedComments = [...comments];

    if (type === 'hot') {
      sortedComments.sort((a, b) => b.like - a.like);
    } else if (type === 'newest') {
      sortedComments.sort(
        (a, b) => new Date(b.ctime).getTime() - new Date(a.ctime).getTime()
      );
    }

    setComments(sortedComments);
    setActiveTab(type);
  };

  const handlePostComment = () => {
    const newCommentObj = {
      rpid: comments.length + 1,
      user: { uid: '30009257', avatar: '', uname: 'John' },
      content: newComment,
      ctime: new Date().toLocaleDateString(),
      like: 0,
    };

    setComments([newCommentObj, ...comments]);
    setNewComment('');
  };

  return (
    <div className="app">
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">Comments</span>
            <span className="total-reply">{comments.length}</span>
          </li>
          <li className="nav-sort">
            <span
              className={`nav-item ${activeTab === 'hot' ? 'active' : ''}`}
              onClick={() => sortComments('hot')}
            >
              Top
            </span>
            <span
              className={`nav-item ${activeTab === 'newest' ? 'active' : ''}`}
              onClick={() => sortComments('newest')}
            >
              Newest
            </span>
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        <div className="box-normal">
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="Profile" />
            </div>
          </div>
          <div className="reply-box-wrap">
            <textarea
              className="reply-box-textarea"
              placeholder="Tell something..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <div className="reply-box-send" onClick={handlePostComment}>
              <div className="send-text">Post</div>
            </div>
          </div>
        </div>

        <div className="reply-list">
          {comments.map((comment) => (
            <div className="reply-item" key={comment.rpid}>
              <div className="root-reply-avatar">
                <div className="bili-avatar">
                  <img
                    className="bili-avatar-img"
                    src={comment.user.avatar || avatar}
                    alt={comment.user.uname}
                  />
                </div>
              </div>
              <div className="content-wrap">
                <div className="user-info">
                  <div className="user-name">{comment.user.uname}</div>
                </div>
                <div className="root-reply">
                  <span className="reply-content">{comment.content}</span>
                  <div className="reply-info">
                    <span className="reply-time">{comment.ctime}</span>
                    <span className="reply-time">Like: {comment.like}</span>
                    <span className="delete-btn">Delete</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
