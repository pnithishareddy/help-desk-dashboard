import { useEffect, useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import TicketList from "./components/TicketList";
import TicketForm from "./components/TicketForm";
import TicketDetails from "./components/TicketDetails";
import Modal from "./components/Modal";
import Toast from "./components/Toast";
import ContactAdmin from "./components/ContactAdmin";
import Profile from "./components/Profile";
import Settings from "./components/Settings";

import initialTickets from "./data/initialTickets.jsx";


function App() {

  const [tickets, setTickets] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [activePage, setActivePage] =
    useState("Dashboard");

  const [selectedTicket, setSelectedTicket] =
    useState(null);

  const [editingTicket, setEditingTicket] =
    useState(null);

  const [showForm, setShowForm] =
    useState(false);

  const [deleteTicket, setDeleteTicket] =
    useState(null);

  const [toast, setToast] = useState({
    message: "",
    type: "success"
  });

  const [sidebarOpen, setSidebarOpen] =
    useState(true);


  useEffect(() => {

    try {

      const savedTickets =
        localStorage.getItem(
          "helpdesk_tickets"
        );

      if (savedTickets) {

        setTickets(
          JSON.parse(savedTickets)
        );

      } else {

        setTickets(initialTickets);

        localStorage.setItem(
          "helpdesk_tickets",
          JSON.stringify(initialTickets)
        );

      }

    } catch (err) {

      console.error(err);

      setError(
        "Unable to load tickets."
      );

    } finally {

      setTimeout(() => {
        setLoading(false);
      }, 500);

    }

  }, []);


  useEffect(() => {

    if (!loading) {

      localStorage.setItem(
        "helpdesk_tickets",
        JSON.stringify(tickets)
      );

    }

  }, [tickets, loading]);


  useEffect(() => {

    if (!toast.message) {
      return;
    }

    const timer = setTimeout(() => {

      setToast({
        message: "",
        type: "success"
      });

    }, 3000);

    return () =>
      clearTimeout(timer);

  }, [toast]);


  const showToast = (
    message,
    type = "success"
  ) => {

    setToast({
      message,
      type
    });

  };


  const handleCreateTicket = (
    ticketData
  ) => {

    const newId =
      tickets.length > 0
        ? Math.max(
            ...tickets.map(
              (ticket) => ticket.id
            )
          ) + 1
        : 1001;

    const now =
      new Date().toLocaleString();

    const newTicket = {

      id: newId,

      ...ticketData,

      createdAt:
        new Date()
          .toISOString()
          .split("T")[0],

      slaHours:
        ticketData.priority ===
        "Critical"
          ? 1
          : ticketData.priority ===
            "High"
          ? 2
          : ticketData.priority ===
            "Medium"
          ? 5
          : 10,

      comments: [],

      activities: [
        {
          id: Date.now(),
          text: "Ticket created",
          date: now
        }
      ]

    };

    setTickets(
      (previous) => [
        newTicket,
        ...previous
      ]
    );

    setShowForm(false);

    setEditingTicket(null);

    setActivePage("Tickets");

    setSidebarOpen(false);

    showToast(
      `Ticket #${newId} created successfully.`
    );

  };


  const handleUpdateTicket = (
    ticketData
  ) => {

    const now =
      new Date().toLocaleString();

    setTickets(
      (previous) =>
        previous.map(
          (ticket) => {

            if (
              ticket.id !==
              editingTicket.id
            ) {
              return ticket;
            }

            return {

              ...ticket,

              ...ticketData,

              activities: [

                ...ticket.activities,

                {
                  id: Date.now(),
                  text:
                    "Ticket information updated",
                  date: now
                }

              ]

            };

          }
        )
    );

    setEditingTicket(null);

    setShowForm(false);

    setActivePage("Tickets");

    showToast(
      "Ticket updated successfully."
    );

  };


  const handleDeleteTicket = () => {

    if (!deleteTicket) {
      return;
    }

    setTickets(
      (previous) =>
        previous.filter(
          (ticket) =>
            ticket.id !==
            deleteTicket.id
        )
    );

    setDeleteTicket(null);

    showToast(
      `Ticket #${deleteTicket.id} deleted.`,
      "success"
    );

  };


  const handleStatusChange = (
    ticketId,
    newStatus
  ) => {

    const now =
      new Date().toLocaleString();

    setTickets(
      (previous) =>
        previous.map(
          (ticket) => {

            if (
              ticket.id !== ticketId
            ) {
              return ticket;
            }

            return {

              ...ticket,

              status: newStatus,

              activities: [

                ...ticket.activities,

                {
                  id: Date.now(),
                  text:
                    `Status changed to ${newStatus}`,
                  date: now
                }

              ]

            };

          }
        )
    );


    setSelectedTicket(
      (previous) => {

        if (!previous) {
          return previous;
        }

        return {

          ...previous,

          status: newStatus,

          activities: [

            ...previous.activities,

            {
              id: Date.now(),
              text:
                `Status changed to ${newStatus}`,
              date: now
            }

          ]

        };

      }
    );


    showToast(
      "Ticket status updated."
    );

  };


  const handleAssigneeChange = (
    ticketId,
    newAssignee
  ) => {

    const now =
      new Date().toLocaleString();

    setTickets(
      (previous) =>
        previous.map(
          (ticket) => {

            if (
              ticket.id !== ticketId
            ) {
              return ticket;
            }

            return {

              ...ticket,

              assignedTo: newAssignee,

              activities: [

                ...ticket.activities,

                {
                  id: Date.now(),
                  text:
                    `Ticket assigned to ${newAssignee}`,
                  date: now
                }

              ]

            };

          }
        )
    );


    setSelectedTicket(
      (previous) => {

        if (!previous) {
          return previous;
        }

        return {

          ...previous,

          assignedTo: newAssignee,

          activities: [

            ...previous.activities,

            {
              id: Date.now(),
              text:
                `Ticket assigned to ${newAssignee}`,
              date: now
            }

          ]

        };

      }
    );


    showToast(
      "Ticket assignment updated."
    );

  };


  const handleAddComment = (
    ticketId,
    text
  ) => {

    const now =
      new Date().toLocaleString();

    const newComment = {

      id: Date.now(),

      user: "Admin",

      text,

      date: now

    };


    setTickets(
      (previous) =>
        previous.map(
          (ticket) => {

            if (
              ticket.id !== ticketId
            ) {
              return ticket;
            }

            return {

              ...ticket,

              comments: [
                ...ticket.comments,
                newComment
              ],

              activities: [

                ...ticket.activities,

                {
                  id: Date.now() + 1,
                  text:
                    "New comment added",
                  date: now
                }

              ]

            };

          }
        )
    );


    setSelectedTicket(
      (previous) => {

        if (!previous) {
          return previous;
        }

        return {

          ...previous,

          comments: [
            ...previous.comments,
            newComment
          ],

          activities: [

            ...previous.activities,

            {
              id: Date.now() + 1,
              text:
                "New comment added",
              date: now
            }

          ]

        };

      }
    );


    showToast(
      "Comment added successfully."
    );

  };


  const openCreateForm = () => {

    setEditingTicket(null);

    setShowForm(true);

    setSelectedTicket(null);

    setSidebarOpen(false);

  };


  const openEditForm = (
    ticket
  ) => {

    setEditingTicket(ticket);

    setShowForm(true);

    setSelectedTicket(null);

    setSidebarOpen(false);

  };


  const openTicketDetails = (
    ticket
  ) => {

    setSelectedTicket(ticket);

    setShowForm(false);

    setSidebarOpen(false);

  };


  const closeDetails = () => {

    setSelectedTicket(null);

  };


  const handlePageChange = (
    page
  ) => {

    setActivePage(page);

    setSelectedTicket(null);

    setShowForm(false);

    setEditingTicket(null);

    setSidebarOpen(false);

  };


  const handleContactAdmin = () => {

    setActivePage(
      "Contact Admin"
    );

    setSelectedTicket(null);

    setShowForm(false);

    setEditingTicket(null);

    setSidebarOpen(false);

  };


  if (loading) {

    return (

      <div className="loading-screen">

        <div className="spinner" />

        <h3>
          Loading Helpdesk...
        </h3>

      </div>

    );

  }


  if (error) {

    return (

      <div className="error-screen">

        <div className="error-icon">
          !
        </div>

        <h2>
          Something went wrong
        </h2>

        <p>
          {error}
        </p>

        <button
          className="primary-button"
          onClick={() =>
            window.location.reload()
          }
        >
          Try Again
        </button>

      </div>

    );

  }


  return (

    <div
      className={`app ${
        sidebarOpen
          ? "sidebar-visible"
          : "sidebar-hidden"
      }`}
    >

      <Navbar
        onMenuClick={() =>
          setSidebarOpen(
            (previous) =>
              !previous
          )
        }
      />


      <Sidebar

        activePage={activePage}

        setActivePage={
          handlePageChange
        }

        isOpen={sidebarOpen}

        onClose={() =>
          setSidebarOpen(false)
        }

        onContactAdmin={
          handleContactAdmin
        }

      />


      <main className="main-content">

        {showForm ? (

          <TicketForm

            ticket={editingTicket}

            onSave={
              editingTicket
                ? handleUpdateTicket
                : handleCreateTicket
            }

            onCancel={() => {

              setShowForm(false);

              setEditingTicket(null);

            }}

          />

        ) : selectedTicket ? (

          <TicketDetails

            ticket={selectedTicket}

            onBack={closeDetails}

            onStatusChange={
              (status) =>
                handleStatusChange(
                  selectedTicket.id,
                  status
                )
            }

            onAssigneeChange={
              (assignee) =>
                handleAssigneeChange(
                  selectedTicket.id,
                  assignee
                )
            }

            onAddComment={
              (text) =>
                handleAddComment(
                  selectedTicket.id,
                  text
                )
            }

          />

        ) : activePage ===
          "Dashboard" ? (

          <Dashboard

            tickets={tickets}

            onCreateTicket={
              openCreateForm
            }

          />

        ) : activePage ===
          "Tickets" ? (

          <TicketList

            tickets={tickets}

            onCreateTicket={
              openCreateForm
            }

            onViewTicket={
              openTicketDetails
            }

            onEditTicket={
              openEditForm
            }

            onDeleteTicket={
              setDeleteTicket
            }

            onBack={() =>
              handlePageChange(
                "Dashboard"
              )
            }

          />

        ) : activePage ===
          "Contact Admin" ? (

          <ContactAdmin

            onBack={() =>
              handlePageChange(
                "Dashboard"
              )
            }

          />

        ) : activePage ===
          "Profile" ? (

          <Profile

            onBack={() =>
              handlePageChange(
                "Dashboard"
              )
            }

          />

        ) : activePage ===
          "Settings" ? (

          <Settings

            onBack={() =>
              handlePageChange(
                "Dashboard"
              )
            }

          />

        ) : null}

      </main>


      {deleteTicket && (

        <Modal

          title="Delete Ticket?"

          message={
            `Are you sure you want to delete ticket #${deleteTicket.id}? This action cannot be undone.`
          }

          onConfirm={
            handleDeleteTicket
          }

          onCancel={() =>
            setDeleteTicket(null)
          }

        />

      )}


      <Toast

        message={toast.message}

        type={toast.type}

        onClose={() =>
          setToast({
            message: "",
            type: "success"
          })
        }

      />

    </div>

  );

}

export default App;