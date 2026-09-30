const initialTickets = [
  {
    id: 1001,
    title: "Unable to login",
    description:
      "Customer is unable to login to the application after changing the password.",
    category: "Technical",
    priority: "High",
    status: "Open",
    assignedTo: "John",
    customer: "Rahul Sharma",
    email: "rahul@example.com",
    createdAt: "2026-09-29",
    slaHours: 2,
    comments: [
      {
        id: 1,
        user: "John",
        text: "I will check the login service.",
        date: "2026-09-29 10:30"
      }
    ],
    activities: [
      {
        id: 1,
        text: "Ticket created",
        date: "2026-09-29 10:00"
      },
      {
        id: 2,
        text: "Ticket assigned to John",
        date: "2026-09-29 10:10"
      }
    ],
    attachment: ""
  },

  {
    id: 1002,
    title: "Password reset request",
    description:
      "Customer requested a password reset link.",
    category: "Account",
    priority: "Medium",
    status: "In Progress",
    assignedTo: "David",
    customer: "Priya Kumar",
    email: "priya@example.com",
    createdAt: "2026-09-28",
    slaHours: 5,
    comments: [],
    activities: [
      {
        id: 1,
        text: "Ticket created",
        date: "2026-09-28 09:00"
      },
      {
        id: 2,
        text: "Status changed to In Progress",
        date: "2026-09-28 10:00"
      }
    ],
    attachment: ""
  },

  {
    id: 1003,
    title: "Application is slow",
    description:
      "The application takes more than 10 seconds to load.",
    category: "Performance",
    priority: "Critical",
    status: "Open",
    assignedTo: "Sarah",
    customer: "Arun Kumar",
    email: "arun@example.com",
    createdAt: "2026-09-27",
    slaHours: 1,
    comments: [],
    activities: [
      {
        id: 1,
        text: "Ticket created",
        date: "2026-09-27 08:30"
      }
    ],
    attachment: ""
  },

  {
    id: 1004,
    title: "Cannot download report",
    description:
      "PDF report download is not working.",
    category: "Technical",
    priority: "Low",
    status: "Resolved",
    assignedTo: "John",
    customer: "Vijay Singh",
    email: "vijay@example.com",
    createdAt: "2026-09-25",
    slaHours: 8,
    comments: [],
    activities: [
      {
        id: 1,
        text: "Ticket created",
        date: "2026-09-25 09:00"
      },
      {
        id: 2,
        text: "Ticket resolved",
        date: "2026-09-25 14:00"
      }
    ],
    attachment: ""
  },

  {
    id: 1005,
    title: "Update account details",
    description:
      "Customer wants to update their phone number.",
    category: "Account",
    priority: "Medium",
    status: "Closed",
    assignedTo: "David",
    customer: "Anjali Reddy",
    email: "anjali@example.com",
    createdAt: "2026-09-24",
    slaHours: 10,
    comments: [],
    activities: [
      {
        id: 1,
        text: "Ticket created",
        date: "2026-09-24 09:00"
      },
      {
        id: 2,
        text: "Ticket closed",
        date: "2026-09-24 15:00"
      }
    ],
    attachment: ""
  }
];

export default initialTickets;