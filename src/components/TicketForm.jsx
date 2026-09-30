import { useEffect, useState } from "react";

function TicketForm({
  ticket,
  onSave,
  onCancel
}) {

  const isEditing = Boolean(ticket);

  const [title, setTitle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [priority, setPriority] =
    useState("");

  const [status, setStatus] =
    useState("Open");

  const [assignedTo, setAssignedTo] =
    useState("Unassigned");

  const [customer, setCustomer] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [attachment, setAttachment] =
    useState("");

  const [errors, setErrors] =
    useState({});

  useEffect(() => {

    if (ticket) {

      setTitle(ticket.title);
      setDescription(ticket.description);
      setCategory(ticket.category);
      setPriority(ticket.priority);
      setStatus(ticket.status);
      setAssignedTo(ticket.assignedTo);
      setCustomer(ticket.customer);
      setEmail(ticket.email);
      setAttachment(ticket.attachment || "");

    }

  }, [ticket]);

  const validate = () => {

    const newErrors = {};

    if (!title.trim()) {
      newErrors.title =
        "Ticket title is required";
    }

    if (!description.trim()) {
      newErrors.description =
        "Description is required";
    }

    if (!category) {
      newErrors.category =
        "Please select a category";
    }

    if (!priority) {
      newErrors.priority =
        "Please select priority";
    }

    if (!customer.trim()) {
      newErrors.customer =
        "Customer name is required";
    }

    if (!email.trim()) {
      newErrors.email =
        "Email is required";
    } else if (
      !email.includes("@")
    ) {
      newErrors.email =
        "Enter a valid email";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {

    e.preventDefault();

    if (!validate()) {
      return;
    }

    const ticketData = {

      title: title.trim(),

      description: description.trim(),

      category,

      priority,

      status,

      assignedTo,

      customer: customer.trim(),

      email: email.trim(),

      attachment

    };

    onSave(ticketData);

  };

  return (
    <div className="form-page">

      <div className="page-header">

        <div>

          <h1>
            {isEditing
              ? "Edit Ticket"
              : "Create Ticket"}
          </h1>

          <p>
            {isEditing
              ? "Update ticket information."
              : "Create a new support ticket."}
          </p>

        </div>

        <button
          className="secondary-button"
          onClick={onCancel}
        >
          ← Back
        </button>

      </div>

      <form
        className="ticket-form"
        onSubmit={handleSubmit}
      >

        <div className="form-section">

          <h3>Ticket Information</h3>

          <div className="form-grid">

            <div className="form-group full-width">

              <label>
                Ticket Title *
              </label>

              <input
                type="text"
                placeholder="Enter ticket title"
                value={title}
                onChange={(e) =>
                  setTitle(e.target.value)
                }
              />

              {errors.title && (
                <span className="error-text">
                  {errors.title}
                </span>
              )}

            </div>

            <div className="form-group full-width">

              <label>
                Description *
              </label>

              <textarea
                rows="5"
                placeholder="Describe the issue..."
                value={description}
                onChange={(e) =>
                  setDescription(
                    e.target.value
                  )
                }
              />

              {errors.description && (
                <span className="error-text">
                  {errors.description}
                </span>
              )}

            </div>

            <div className="form-group">

              <label>
                Category *
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
              >
                <option value="">
                  Select Category
                </option>

                <option value="Technical">
                  Technical
                </option>

                <option value="Account">
                  Account
                </option>

                <option value="Billing">
                  Billing
                </option>

                <option value="Performance">
                  Performance
                </option>

                <option value="General">
                  General
                </option>
              </select>

              {errors.category && (
                <span className="error-text">
                  {errors.category}
                </span>
              )}

            </div>

            <div className="form-group">

              <label>
                Priority *
              </label>

              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value)
                }
              >
                <option value="">
                  Select Priority
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

              {errors.priority && (
                <span className="error-text">
                  {errors.priority}
                </span>
              )}

            </div>

            <div className="form-group">

              <label>
                Status
              </label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(e.target.value)
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

            <div className="form-group">

              <label>
                Assign To
              </label>

              <select
                value={assignedTo}
                onChange={(e) =>
                  setAssignedTo(e.target.value)
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

          </div>

        </div>

        <div className="form-section">

          <h3>Customer Information</h3>

          <div className="form-grid">

            <div className="form-group">

              <label>
                Customer Name *
              </label>

              <input
                type="text"
                placeholder="Customer name"
                value={customer}
                onChange={(e) =>
                  setCustomer(e.target.value)
                }
              />

              {errors.customer && (
                <span className="error-text">
                  {errors.customer}
                </span>
              )}

            </div>

            <div className="form-group">

              <label>
                Email *
              </label>

              <input
                type="email"
                placeholder="customer@example.com"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              {errors.email && (
                <span className="error-text">
                  {errors.email}
                </span>
              )}

            </div>

          </div>

        </div>

        <div className="form-section">

          <h3>Attachment</h3>

          <div className="attachment-upload">

            <input
              type="file"
              onChange={(e) => {

                const file =
                  e.target.files[0];

                if (file) {
                  setAttachment(file.name);
                }

              }}
            />

            {attachment && (
              <div className="selected-file">
                📎 {attachment}
              </div>
            )}

          </div>

        </div>

        <div className="form-actions">

          <button
            type="button"
            className="secondary-button"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="primary-button"
          >
            {isEditing
              ? "Update Ticket"
              : "Create Ticket"}
          </button>

        </div>

      </form>

    </div>
  );
}

export default TicketForm;