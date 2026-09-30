import { useMemo, useState } from "react";
import Pagination from "./Pagination";

function TicketList({
  tickets,
  onCreateTicket,
  onViewTicket,
  onEditTicket,
  onDeleteTicket,
  onBack
}) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const filteredTickets = useMemo(() => {
    let result = [...tickets];

    if (search.trim()) {
      const searchText = search.toLowerCase();

      result = result.filter(
        (ticket) =>
          ticket.title
            .toLowerCase()
            .includes(searchText) ||
          String(ticket.id).includes(searchText) ||
          ticket.customer
            .toLowerCase()
            .includes(searchText)
      );
    }

    if (statusFilter !== "All") {
      result = result.filter(
        (ticket) =>
          ticket.status === statusFilter
      );
    }

    if (priorityFilter !== "All") {
      result = result.filter(
        (ticket) =>
          ticket.priority === priorityFilter
      );
    }

    if (sortBy === "newest") {
      result.sort(
        (a, b) => b.id - a.id
      );
    } else if (sortBy === "oldest") {
      result.sort(
        (a, b) => a.id - b.id
      );
    } else if (sortBy === "priority") {
      const order = {
        Critical: 1,
        High: 2,
        Medium: 3,
        Low: 4
      };

      result.sort(
        (a, b) =>
          order[a.priority] -
          order[b.priority]
      );
    }

    return result;
  }, [
    tickets,
    search,
    statusFilter,
    priorityFilter,
    sortBy
  ]);

  const totalPages = Math.ceil(
    filteredTickets.length /
      itemsPerPage
  );

  const startIndex =
    (currentPage - 1) *
    itemsPerPage;

  const visibleTickets =
    filteredTickets.slice(
      startIndex,
      startIndex + itemsPerPage
    );

  const handleFilterChange = (
    setter,
    value
  ) => {
    setter(value);
    setCurrentPage(1);
  };

  const getStatusClass = (
    status
  ) => {
    if (status === "Open")
      return "status-open";

    if (status === "In Progress")
      return "status-progress";

    if (status === "Resolved")
      return "status-resolved";

    return "status-closed";
  };

  const getPriorityClass = (
    priority
  ) => {
    if (priority === "Critical")
      return "priority-critical";

    if (priority === "High")
      return "priority-high";

    if (priority === "Medium")
      return "priority-medium";

    return "priority-low";
  };

  const getSlaClass = (
    ticket
  ) => {
    if (
      ticket.status === "Resolved" ||
      ticket.status === "Closed"
    ) {
      return "sla-good";
    }

    if (
      ticket.priority === "Critical" ||
      ticket.priority === "High"
    ) {
      return "sla-warning";
    }

    return "sla-good";
  };

  return (
    <div className="ticket-page">

      <div className="page-header">

        <div>

          <button
            className="back-link"
            onClick={onBack}
          >
            ← Back to Dashboard
          </button>

          <h1>
            Tickets
          </h1>

          <p>
            Manage and track all support tickets.
          </p>

        </div>

        <button
          className="primary-button"
          onClick={onCreateTicket}
        >
          + Create Ticket
        </button>

      </div>


      <div className="filter-card">

        <div className="search-box">

          <span>🔍</span>

          <input
            type="text"
            placeholder="Search by ticket, title or customer..."
            value={search}
            onChange={(e) => {
              setSearch(
                e.target.value
              );

              setCurrentPage(1);
            }}
          />

        </div>


        <select
          value={statusFilter}
          onChange={(e) =>
            handleFilterChange(
              setStatusFilter,
              e.target.value
            )
          }
        >

          <option value="All">
            All Status
          </option>

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


        <select
          value={priorityFilter}
          onChange={(e) =>
            handleFilterChange(
              setPriorityFilter,
              e.target.value
            )
          }
        >

          <option value="All">
            All Priority
          </option>

          <option value="Critical">
            Critical
          </option>

          <option value="High">
            High
          </option>

          <option value="Medium">
            Medium
          </option>

          <option value="Low">
            Low
          </option>

        </select>


        <select
          value={sortBy}
          onChange={(e) => {
            setSortBy(
              e.target.value
            );

            setCurrentPage(1);
          }}
        >

          <option value="newest">
            Newest
          </option>

          <option value="oldest">
            Oldest
          </option>

          <option value="priority">
            Priority
          </option>

        </select>

      </div>


      <div className="table-card">

        {visibleTickets.length === 0 ? (

          <div className="empty-state">

            <div className="empty-icon">
              🎫
            </div>

            <h3>
              No tickets found
            </h3>

            <p>
              Try changing your filters or create a new ticket.
            </p>

            <button
              className="primary-button"
              onClick={onCreateTicket}
            >
              Create Ticket
            </button>

          </div>

        ) : (

          <div className="table-wrapper">

            <table>

              <thead>

                <tr>

                  <th>ID</th>
                  <th>Ticket</th>
                  <th>Customer</th>
                  <th>Category</th>
                  <th>Priority</th>
                  <th>Status</th>
                  <th>Assignee</th>
                  <th>SLA</th>
                  <th>Actions</th>

                </tr>

              </thead>


              <tbody>

                {visibleTickets.map(
                  (ticket) => (

                    <tr key={ticket.id}>

                      <td>
                        <strong>
                          #{ticket.id}
                        </strong>
                      </td>


                      <td>

                        <div className="ticket-title">

                          <strong>
                            {ticket.title}
                          </strong>

                          <small>
                            {ticket.createdAt}
                          </small>

                        </div>

                      </td>


                      <td>

                        <div>
                          {ticket.customer}
                        </div>

                        <small>
                          {ticket.email}
                        </small>

                      </td>


                      <td>

                        <span className="category-badge">
                          {ticket.category}
                        </span>

                      </td>


                      <td>

                        <span
                          className={`badge ${getPriorityClass(
                            ticket.priority
                          )}`}
                        >
                          {ticket.priority}
                        </span>

                      </td>


                      <td>

                        <span
                          className={`badge ${getStatusClass(
                            ticket.status
                          )}`}
                        >
                          {ticket.status}
                        </span>

                      </td>


                      <td>
                        {ticket.assignedTo}
                      </td>


                      <td>

                        <span
                          className={`sla-badge ${getSlaClass(
                            ticket
                          )}`}
                        >

                          {ticket.status ===
                            "Resolved" ||
                          ticket.status ===
                            "Closed"
                            ? "✓ Met"
                            : `${ticket.slaHours}h left`}

                        </span>

                      </td>


                      <td>

                        <div className="action-buttons">

                          <button
                            title="View"
                            onClick={() =>
                              onViewTicket(
                                ticket
                              )
                            }
                          >
                            👁
                          </button>

                          <button
                            title="Edit"
                            onClick={() =>
                              onEditTicket(
                                ticket
                              )
                            }
                          >
                            ✏️
                          </button>

                          <button
                            className="delete-button"
                            title="Delete"
                            onClick={() =>
                              onDeleteTicket(
                                ticket
                              )
                            }
                          >
                            🗑
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}


        {filteredTickets.length > 0 && (

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={
              setCurrentPage
            }
          />

        )}

      </div>

    </div>
  );
}

export default TicketList;