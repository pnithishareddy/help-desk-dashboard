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

  /* =========================================
     TICKETS
  ========================================= */

  const [tickets, setTickets] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  /* =========================================
     PAGE / TICKET STATE
  ========================================= */

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


  /* =========================================
     TOAST
  ========================================= */

  const [toast, setToast] = useState({
    message: "",
    type: "success"
  });


  /* =========================================
     SIDEBAR

     IMPORTANT:
     Desktop  = open by default
     Mobile   = closed by default
  ========================================= */

  const [sidebarOpen, setSidebarOpen] = useState(() => {

    if (typeof window !== "undefined") {
      return window.innerWidth > 768;
    }

    return true;

  });


  /* =========================================
     RESPONSIVE SIDEBAR

     If screen changes from desktop to mobile,
     close the sidebar automatically.
  ========================================= */

  useEffect(() => {

    const handleResize = () => {

      if (window.innerWidth <= 768) {

        setSidebarOpen(false);

      } else {

        setSidebarOpen(true);

      }

    };


    window.addEventListener(
      "resize",
      handleResize
    );


    return () => {

      window.removeEventListener(
        "resize",
        handleResize
      );

    };

  }, []);


  /* =========================================
     LOAD TICKETS
  ========================================= */

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


  /* =========================================
     SAVE TICKETS
  ========================================= */

  useEffect(() => {

    if (!loading) {

      localStorage.setItem(
        "helpdesk_tickets",
        JSON.stringify(tickets)
      );

    }

  }, [tickets, loading]);


  /* =========================================
     TOAST TIMER
  ========================================= */

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


  /* =========================================
     SHOW TOAST
  ========================================= */

  const showToast = (
    message,
    type = "success"
  ) => {

    setToast({
      message,
      type
    });

  };


  /* =========================================
     CREATE TICKET
  ========================================= */

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


  /* =========================================
     UPDATE TICKET
  ========================================= */

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

    setSidebarOpen(false);


    showToast(
      "Ticket updated successfully."
    );

  };


  /* =========================================
     DELETE TICKET
  ========================================= */

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


  /* =========================================
     STATUS CHANGE
  ========================================= */

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


  /* =========================================
     ASSIGNEE CHANGE
  ========================================= */

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


  /* =========================================
     ADD COMMENT
  ========================================= */

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


  /* =========================================
     CREATE FORM
  ========================================= */

  const openCreateForm = () => {

    setEditingTicket(null);

    setShowForm(true);

    setSelectedTicket(null);

    setSidebarOpen(false);

  };


  /* =========================================
     EDIT FORM
  ========================================= */

  const openEditForm = (
    ticket
  ) => {

    setEditingTicket(ticket);

    setShowForm(true);

    setSelectedTicket(null);

    setSidebarOpen(false);

  };


  /* =========================================
     TICKET DETAILS
  ========================================= */

  const openTicketDetails = (
    ticket
  ) => {

    setSelectedTicket(ticket);

    setShowForm(false);

    setSidebarOpen(false);

  };


  /* =========================================
     CLOSE TICKET DETAILS
  ========================================= */

  const closeDetails = () => {

    setSelectedTicket(null);

  };


  /* =========================================
     PAGE CHANGE
  ========================================= */

  const handlePageChange = (
    page
  ) => {

    setActivePage(page);

    setSelectedTicket(null);

    setShowForm(false);

    setEditingTicket(null);

    /*
      This makes sure the sidebar closes
      after selecting a page on mobile.
    */
    setSidebarOpen(false);

  };


  /* =========================================
     CONTACT ADMIN
  ========================================= */

  const handleContactAdmin = () => {

    setActivePage(
      "Contact Admin"
    );

    setSelectedTicket(null);

    setShowForm(false);

    setEditingTicket(null);

    setSidebarOpen(false);

  };


  /* =========================================
     LOADING
  ========================================= */

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


  /* =========================================
     ERROR
  ========================================= */

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


  /* =========================================
     MAIN APPLICATION
  ========================================= */

  return (

    <div
      className={`app ${
        sidebarOpen
          ? "sidebar-visible"
          : "sidebar-hidden"
      }`}
    >

      {/* =====================================
          NAVBAR
      ===================================== */}

      <Navbar

        onMenuClick={() =>
          setSidebarOpen(
            (previous) =>
              !previous
          )
        }

      />


      {/* =====================================
          SIDEBAR
      ===================================== */}

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


      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <main className="main-content">


        {/* ===================================
            TICKET FORM
        =================================== */}

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


          /* =================================
             TICKET DETAILS
          ================================= */

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


          /* =================================
             DASHBOARD
          ================================= */

          <Dashboard

            tickets={tickets}

            onCreateTicket={
              openCreateForm
            }

          />

        ) : activePage ===
          "Tickets" ? (


          /* =================================
             TICKETS
          ================================= */

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


          /* =================================
             CONTACT ADMIN
          ================================= */

          <ContactAdmin

            onBack={() =>
              handlePageChange(
                "Dashboard"
              )
            }

          />

        ) : activePage ===
          "Profile" ? (


          /* =================================
             PROFILE
          ================================= */

          <Profile

            onBack={() =>
              handlePageChange(
                "Dashboard"
              )
            }

          />

        ) : activePage ===
          "Settings" ? (


          /* =================================
             SETTINGS
          ================================= */

          <Settings

            onBack={() =>
              handlePageChange(
                "Dashboard"
              )
            }

          />

        ) : null}

      </main>


      {/* =====================================
          DELETE MODAL
      ===================================== */}

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


      {/* =====================================
          TOAST
      ===================================== */}

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