import React, { useState } from "react";
import "./CommentsModal.css";
import Comment from './Comment/Comment'
import { CommentType } from '../../../types/types'

interface Props{
  comments: CommentType[];
  setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
  onClose: ()=> void;
  onAddComment: (content: string)=> void;
}

const CommentsModal: React.FC<Props> = ({ comments, onClose, onAddComment, setRefresh }) => {
  
  const [newComment, setNewComment] = useState("");

  const handleAddComment = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("")
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} dir='rtl'>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <form className="modal-header" onSubmit={handleAddComment}>
            <input
            type="text"
            placeholder="أضف تعليقًا..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <input type="submit" value="نشر" />
        </form>
        <div className="comments-list">
          {comments.length > 0 ? (
            comments.map((comment) => (
              <Comment key={comment.id} {...{comment, setRefresh}}/>
            ))
          ) : (
            <p dir='rtl'>ليس هناك تعليقات</p>
          )}
        </div>
        <button className="close-btn" onClick={onClose}>
          إغلاق
        </button>
      </div>
    </div>
  );
};

export default CommentsModal;