import CommentBox from "./CommentBox";

function TicketDetails({
  ticket,
  onBack,
  onStatusChange,
  onAssigneeChange,
  onAddComment
}) {

  const getStatusClass = (status) => {

    if (status === "Open")
      return "status-open";

    if (status === "In Progress")
      return "status-progress";

    if (status === "Resolved")
      return "status-resolved";

    return "status-closed";
  };

  const getPriorityClass = (priority) => {

    if (priority === "Critical")
      return "priority-critical";

    if (priority === "High")
      return "priority-high";

    if (priority === "Medium")
      return "priority-medium";

    return "priority-low";
  };

  return (
    <div className="details-page">

      <div className="page-header">

        <div>

          <button
            className="back-link"
            onClick={onBack}
          >
            ← Back to Tickets
          </button>

          <h1>
            #{ticket.id} {ticket.title}
          </h1>

          <p>
            Created on {ticket.createdAt}
          </p>

        </div>

        <div className="details-status">

          <span
            className={`badge ${getStatusClass(
              ticket.status
            )}`}
          >
            {ticket.status}
          </span>

          <span
            className={`badge ${getPriorityClass(
              ticket.priority
            )}`}
          >
            {ticket.priority}
          </span>

        </div>

      </div>

      <div className="details-grid">

        <div className="details-main">

          <div className="detail-card">

            <h3>Ticket Description</h3>

            <p className="description">
              {ticket.description}
            </p>

          </div>

          <div className="detail-card">

            <h3>Comments</h3>

            {ticket.comments.length === 0 ? (

              <div className="small-empty">
                No comments yet.
              </div>

            ) : (

              <div className="comments-list">

                {ticket.comments.map(
                  (comment) => (

                    <div
                      className="comment"
                      key={comment.id}
                    >

                      <div className="comment-avatar">
                        {comment.user.charAt(0)}
                      </div>

                      <div className="comment-content">

                        <div className="comment-header">

                          <strong>
                            {comment.user}
                          </strong>

                          <small>
                            {comment.date}
                          </small>

                        </div>

                        <p>
                          {comment.text}
                        </p>

                      </div>

                    </div>

                  )
                )}

              </div>
            )}

            <CommentBox
              onAddComment={onAddComment}
            />

          </div>

          <div className="detail-card">

            <h3>Activity Timeline</h3>

            <div className="timeline">

              {ticket.activities.map(
                (activity) => (

                  <div
                    className="timeline-item"
                    key={activity.id}
                  >

                    <div className="timeline-dot">
                      ✓
                    </div>

                    <div>

                      <strong>
                        {activity.text}
                      </strong>

                      <small>
                        {activity.date}
                      </small>

                    </div>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

        <div className="details-sidebar">

          <div className="detail-card">

            <h3>Ticket Information</h3>

            <div className="detail-row">

              <span>Category</span>

              <strong>
                {ticket.category}
              </strong>

            </div>

            <div className="detail-row">

              <span>Priority</span>

              <strong>
                {ticket.priority}
              </strong>

            </div>

            <div className="detail-row">

              <span>Customer</span>

              <strong>
                {ticket.customer}
              </strong>

            </div>

            <div className="detail-row">

              <span>Email</span>

              <strong>
                {ticket.email}
              </strong>

            </div>

          </div>

          <div className="detail-card">

            <h3>Assignment</h3>

            <label className="detail-label">
              Assigned Agent
            </label>

            <select
              value={ticket.assignedTo}
              onChange={(e) =>
                onAssigneeChange(
                  e.target.value
                )
              }
            >

              <option value="Unassigned">
                Unassigned
              </option>

              <option value="John">
                John
              </option>

              <option value="David">
                David
              </option>

              <option value="Sarah">
                Sarah
              </option>

              <option value="Michael">
                Michael
              </option>

            </select>

          </div>

          <div className="detail-card">

            <h3>Update Status</h3>

            <label className="detail-label">
              Ticket Status
            </label>

            <select
              value={ticket.status}
              onChange={(e) =>
                onStatusChange(
                  e.target.value
                )
              }
            >

              <option value="Open">
                Open
              </option>

              <option value="In Progress">
                In Progress
              </option>

              <option value="Resolved">
                Resolved
              </option>

              <option value="Closed">
                Closed
              </option>

            </select>

          </div>

          <div className="detail-card sla-card">

            <h3>SLA</h3>

            <div className="sla-big">

              <span>⏱</span>

              <div>

                <strong>
                  {ticket.status === "Resolved" ||
                  ticket.status === "Closed"
                    ? "SLA Met"
                    : `${ticket.slaHours} hours`}
                </strong>

                <small>
                  Response target
                </small>

              </div>

            </div>

            <div className="sla-progress">

              <div
                style={{
                  width:
                    ticket.status === "Resolved" ||
                    ticket.status === "Closed"
                      ? "100%"
                      : "65%"
                }}
              />

            </div>

          </div>

          <div className="detail-card">

            <h3>Attachment</h3>

            {ticket.attachment ? (

              <div className="file-card">
                📎
                <span>
                  {ticket.attachment}
                </span>
              </div>

            ) : (

              <div className="small-empty">
                No attachment.
              </div>

            )}

          </div>

        </div>

      </div>

    </div>
  );
}

export default TicketDetails;