import { useState } from "react";

function CommentBox({ onAddComment }) {

  const [comment, setComment] =
    useState("");

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!comment.trim()) {
      return;
    }

    onAddComment(comment.trim());

    setComment("");

  };

  return (
    <form
      className="comment-box"
      onSubmit={handleSubmit}
    >

      <textarea
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
      />

      <div className="comment-actions">

        <span>
          Comments are visible to support staff.
        </span>

        <button
          className="primary-button"
          type="submit"
        >
          Add Comment
        </button>

      </div>

    </form>
  );
}

export default CommentBox;