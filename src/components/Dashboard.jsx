function Dashboard({ tickets, onCreateTicket }) {

  const total = tickets.length;

  const open = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const progress = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolved = tickets.filter(
    (ticket) =>
      ticket.status === "Resolved" ||
      ticket.status === "Closed"
  ).length;

  const critical = tickets.filter(
    (ticket) => ticket.priority === "Critical"
  ).length;

  const high = tickets.filter(
    (ticket) => ticket.priority === "High"
  ).length;

  const medium = tickets.filter(
    (ticket) => ticket.priority === "Medium"
  ).length;

  const low = tickets.filter(
    (ticket) => ticket.priority === "Low"
  ).length;

  const statusData = [
    {
      label: "Open",
      value: open
    },
    {
      label: "In Progress",
      value: progress
    },
    {
      label: "Resolved",
      value: resolved
    }
  ];

  const priorityData = [
    {
      label: "Critical",
      value: critical
    },
    {
      label: "High",
      value: high
    },
    {
      label: "Medium",
      value: medium
    },
    {
      label: "Low",
      value: low
    }
  ];

  const getPercentage = (value, max) => {
    if (max === 0) return 0;

    return Math.round((value / max) * 100);
  };

  return (
    <div className="dashboard">

      <div className="page-header">

        <div>
          <h1>Dashboard</h1>

          <p>
            Welcome back! Here's your support overview.
          </p>
        </div>

        <button
          className="primary-button"
          onClick={onCreateTicket}
        >
          + Create Ticket
        </button>

      </div>

      <div className="stats-grid">

        <div className="stat-card">
          <div className="stat-icon blue">
            🎫
          </div>

          <div>
            <span>Total Tickets</span>
            <strong>{total}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">
            🔓
          </div>

          <div>
            <span>Open Tickets</span>
            <strong>{open}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon purple">
            ⏳
          </div>

          <div>
            <span>In Progress</span>
            <strong>{progress}</strong>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">
            ✓
          </div>

          <div>
            <span>Resolved</span>
            <strong>{resolved}</strong>
          </div>
        </div>

      </div>

      <div className="charts-grid">

        <div className="chart-card">

          <div className="card-heading">
            <div>
              <h3>Ticket Status</h3>
              <p>Current ticket distribution</p>
            </div>
          </div>

          <div className="bar-chart">

            {statusData.map((item) => (
              <div
                className="bar-row"
                key={item.label}
              >

                <div className="bar-label">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>

                <div className="bar-background">

                  <div
                    className="bar"
                    style={{
                      width: `${getPercentage(
                        item.value,
                        total
                      )}%`
                    }}
                  />

                </div>

              </div>
            ))}

          </div>

        </div>

        <div className="chart-card">

          <div className="card-heading">
            <div>
              <h3>Priority Distribution</h3>
              <p>Tickets by priority</p>
            </div>
          </div>

          <div className="priority-chart">

            {priorityData.map((item) => (
              <div
                className="priority-item"
                key={item.label}
              >

                <div className="priority-circle">
                  {item.value}
                </div>

                <div>
                  <strong>{item.label}</strong>

                  <div className="mini-progress">

                    <div
                      style={{
                        width: `${getPercentage(
                          item.value,
                          total
                        )}%`
                      }}
                    />

                  </div>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

      <div className="dashboard-info">

        <div className="info-card">

          <h3>Support Summary</h3>

          <div className="summary-row">
            <span>Critical tickets</span>
            <strong>{critical}</strong>
          </div>

          <div className="summary-row">
            <span>High priority</span>
            <strong>{high}</strong>
          </div>

          <div className="summary-row">
            <span>Medium priority</span>
            <strong>{medium}</strong>
          </div>

          <div className="summary-row">
            <span>Low priority</span>
            <strong>{low}</strong>
          </div>

        </div>

        <div className="info-card">

          <h3>SLA Overview</h3>

          <div className="sla-overview">

            <div>
              <span>Tickets within SLA</span>
              <strong>
                {Math.max(total - critical, 0)}
              </strong>
            </div>

            <div>
              <span>Needs attention</span>
              <strong>{critical}</strong>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;