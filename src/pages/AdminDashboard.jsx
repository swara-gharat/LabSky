import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import DataTable from "react-data-table-component";
// import DataTableExtensions from "react-data-table-component-extensions";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [statusUpdate, setStatusUpdate] = useState({ id: null, status: "" });
  const [messages, setMessages] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [selectedView, setSelectedView] = useState("appointments");
  const [searchTerm, setSearchTerm] = useState(""); 
  const [inquiries, setInquiries] = useState([]);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [response, setResponse] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
  };

  const filteredAppointments = appointments.filter((row) => {
    // Combine all fields in each row and check if the search term exists
    const rowValues = Object.values(row).join(" ").toLowerCase();
    return rowValues.includes(searchTerm);
  });

  const filteredContacts = messages.filter((row) => {
    // Combine all fields in each row and check if the search term exists
    const rowValues = Object.values(row).join(" ").toLowerCase();
    return rowValues.includes(searchTerm);
  });

  const filteredInquiries = inquiries.filter((row) => {
    // Combine all fields in each row and check if the search term exists
    const rowValues = Object.values(row).join(" ").toLowerCase();
    return rowValues.includes(searchTerm);
  });

     // Fetch contact messages
  const fetchMessages = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin/contact-messages");
      if (!response.ok) {
        throw new Error("Failed to fetch messages");
      }
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
      alert("Error fetching messages.");
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin-dashboard");
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Failed to fetch appointments.");
    }
  };

  const fetchInquiries = async () => {
    try {
      const response = await fetch("http://localhost:5000/admin-dashboard/inquiries");
      const data = await response.json();
      setInquiries(data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert("Failed to fetch appointments.");
    }
  };

  // Update status
  const updateStatus = async (id, status, appointment_date) => {
    if (!id) {
      alert("Invalid appointment ID. Please try again.");
      return;
    }
    const today = new Date();
  const appointment = new Date(appointment_date);

  if ((status === "completed" || status === "report_generated") && today < appointment) {
    alert("You can only set the status to 'completed' or 'report generated' on or after the appointment date.");
    return;
  }

    try {
      const response = await fetch(`http://localhost:5000/admin/update-status/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) {
        throw new Error("Failed to update status");
      }
      alert("Status updated successfully!");
      fetchAppointments();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Error updating status.");
    }
  };

  // Upload report
  const uploadReport = async (id, user_id) => {
    if (!user_id) {
      alert("Please select a user");
      return;
    }

    if (!selectedFile) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
formData.append("report", selectedFile); // Adds the file to the form
formData.append("user_id", user_id); // Make sure selectedUserId is not undefined

console.log("File:", selectedFile);
console.log("user_id", user_id);

    try {
      const response = await fetch("http://localhost:5000/admin/upload-report", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("Failed to upload report");
      }
      alert("Report uploaded successfully!");
      fetchAppointments();
    } catch (error) {
      console.error("Error uploading report:", error);
      alert("Error uploading report.");
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
  
    try {
      const response = await fetch(`http://localhost:5000/admin/contact-messages/${id}`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error("Failed to update message status");
      }
      alert("Message deleted successfully!");
      fetchMessages(); // Refresh the messages
    } catch (error) {
      console.error("Error updating message status:", error);
      alert("Error updating message status.");
    }
  };

  const deleteInquiry = async (id) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
  
    try {
      const response = await fetch(`http://localhost:5000/admin/inquiry/${id}`, {
        method: "PUT",
      });
      if (!response.ok) {
        throw new Error("Failed to update message status");
      }
      alert("Message deleted successfully!");
      fetchMessages(); // Refresh the messages
    } catch (error) {
      console.error("Error updating message status:", error);
      alert("Error updating message status.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn"); // Remove admin session flag
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    navigate("/login"); // Redirect to login after logout
  };
  
  useEffect(() => {
    fetchMessages();
    fetchInquiries();
    fetchAppointments();
  const intervalId = setInterval(fetchAppointments, 10000);
  return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn");

    if (!isAdminLoggedIn) {
      navigate("/admin-dashboard"); 
    }

    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = ""; // Standard for modern browsers
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [navigate]);

  const columns = [
    {
      name: "User Name",
      selector: (row) => row.user_name,
      grow: 2,  // Allows column to take more space
    wrap: true,
    },
    {
      name: "User Email",
      selector: (row) => row.user_email,
      grow: 2,  // Allows column to take more space
      wrap: true,
    },
    // {
    //   name: "Appointment ID",
    //   selector: (row) => row.appointment_id,
    //   sortable: true,
    // },
    // {
    //   name: "User ID",
    //   selector: (row) => row.user_id,
    //   sortable: true,
    // },
    {
      name: "Contact",
      selector: (row) => row.mobile,
      grow: 2,  // Allows column to take more space
    wrap: true,
    },
    {
      name: "Service",
      selector: (row) => row.service,
      grow: 2,  // Allows column to take more space
    wrap: true,
    },
    {
      name: "Visit Type",
      selector: (row) => row.visit_type,
    },
    {
      name: "Address",
      selector: (row) => row.address || "N/A",
      grow: 2,  // Allows column to take more space
      wrap: true,
    },
    {
      name: "Message",
      selector: (row) => row.message || "N/A",
      grow: 2,  // Allows column to take more space
      wrap: true,
    },
    {
      name: "Appointment Date",
      selector: (row) => {
        const appointmentDate = row.appointment_date;
        return appointmentDate ? new Date(appointmentDate).toLocaleDateString("en-GB") : "Not Available";
      },
      sortable: true,
      grow: 2,  // Allows column to take more space
      wrap: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      grow: 2,  // Allows column to take more space
    wrap: true,
    },
    {
      name: "Report",
      selector: (row) => (
        <div>
          {row.report_path && row.report_path.trim() !== "" ? (
            <a
              href={`http://localhost:5000/reports/${row.report_path}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500"
            >
              <button className="px-2 py-1 rounded-md bg-blue-500 text-white">
                Download Report
              </button>
            </a>
          ) : (
            <span className="text-red-500">Report Not Uploaded Yet</span>
          )}
        </div>
      ),
      grow: 2,
      wrap: true,
    },    
    {
  name: "Actions",
  cell: (row) => (
    <div>
      <select
        value={statusUpdate.id === row.appointment_id ? statusUpdate.status : ""}
        onChange={(e) =>
          setStatusUpdate({ id: row.appointment_id, status: e.target.value })
        }
      >
        <option value="">Change Status</option>
        <option value="pending">Pending</option>
        <option value="completed">Completed</option>
        <option value="report_generated">Report Generated</option>
      </select>
      <button
        onClick={() => updateStatus(row.appointment_id, statusUpdate.status, row.appointment_date)}
        className="ml-2 px-3 py-1 rounded-md bg-blue-500 text-white"
      >
        Update
      </button>
      {row.status === "report_generated" && (
        <div className="mt-2">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setSelectedFile(e.target.files[0])}
            className="block"
          />
          <button
            onClick={() => uploadReport(row.appointment_id, row.user_id)}
            className="mt-1 px-3 py-1 rounded-md bg-green-500 text-white"
          >
            Upload Report
          </button>
        </div>
      )}
    </div>
  ),
},

  ];

  const aexportCSV = () => {
    // Ensure `userList` is used for exporting
    const csvData = [
      ["User Name", "User Email", "Contact", "Service", "Visit Type", "Address", "Message", "Appointment Date", "Status"], // Headers
      ...appointments.map((row) => [
        row.user_name || "",
        row.user_email || "",
        row.mobile || "",
        row.service || "",
        row.visit_type || "",
        row.address || "",
        row.message || "",
        row.appointment_date || "",
        row.status || "",
      ]), // Data rows
    ];
  
    // Convert array to CSV string
    const csvContent = csvData.map((e) => e.join(",")).join("\n");
  
    // Create a Blob and trigger download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "appointments.csv");
  };
  
  const aexportPDF = () => {
    const doc = new jsPDF();
  
    // Define table headers and data
    const tableColumns = ["User Name", "User Email", "Contact", "Service", "Visit Type", "Address", "Message", "Appointment Date", "Status"];
    const tableRows = appointments.map((row) => [
      row.user_name || "",
        row.user_email || "",
        row.mobile || "",
        row.service || "",
        row.visit_type || "",
        row.address || "",
        row.message || "",
        row.appointment_date || "",
        row.status || "",
    ]);
  
    // Add title
    doc.text("appointments", 14, 16);
  
    // Generate table
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 20,
    });
  
    // Save PDF
    doc.save("appointments.pdf");
  };

  const aexportExcel = () => {
    // Prepare data for Excel
    const excelData = [
      ["User Name", "User Email", "Contact", "Service", "Visit Type", "Address", "Message", "Appointment Date", "Status"], // Headers, // Headers
      ...appointments.map((row) => [
        row.user_name || "",
        row.user_email || "",
        row.mobile || "",
        row.service || "",
        row.visit_type || "",
        row.address || "",
        row.message || "",
        row.appointment_date || "",
        row.status || "",
      ]),
    ];
  
    // Create a workbook and worksheet
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "User Data");
  
    // Save Excel file
    XLSX.writeFile(workbook, "appointments.xlsx");
  };
  
  const aprintPDF = () => {
    const doc = new jsPDF();
  
    // Define table headers and data
    const tableColumns =       ["User Name", "User Email", "Contact", "Service", "Visit Type", "Address", "Message", "Appointment Date", "Status"]   ;
    const tableRows = appointments.map((row) => [
      row.user_name || "",
        row.user_email || "",
        row.mobile || "",
        row.service || "",
        row.visit_type || "",
        row.address || "",
        row.message || "",
        row.appointment_date || "",
        row.status || "",
    ]);
  
    // Add title
    doc.text("appointments", 14, 16);
  
    // Generate table
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 20,
    });
  
    // Open print dialog
    window.open(doc.output("bloburl"));
  };

  const acopyToClipboard = () => {
    const csvData = [
      ["User Name", "User Email", "Contact", "Service", "Visit Type", "Address", "Message", "Appointment Date", "Status"], // Headers
      ...appointments.map((row) => [
        row.user_name || "",
        row.user_email || "",
        row.mobile || "",
        row.service || "",
        row.visit_type || "",
        row.address || "",
        row.message || "",
        row.appointment_date || "",
        row.status || "",
      ]),
    ];
  
    const csvContent = csvData.map((e) => e.join(",")).join("\n");
  
    // Copy to clipboard
    navigator.clipboard
      .writeText(csvContent)
      .then(() => alert("Data copied to clipboard!"))
      .catch((err) => console.error("Error copying to clipboard: ", err));
  };

  const contact_columns = [
    {
      name: "No.",
      selector: (row, index) => index + 1,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
      grow: 2,  // Allows column to take more space
      wrap: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      grow: 2,  // Allows column to take more space
      wrap: true,
    },
    {
      name: "Contact",
      selector: (row) => row.mobile,
      grow: 2,  // Allows column to take more space
      wrap: true,
    },
    {
      name: "Subject",
      selector: (row) => row.subject || "N/A",
      grow: 2,  // Allows column to take more space
      wrap: true,
    },
    {
      name: "Message",
      selector: (row) => row.message,
      grow: 2,  // Allows column to take more space
      wrap: true,
    },
    {
      name: "Created At",
      selector: (row) => new Date(row.created_at).toLocaleString(),
      sortable: true,
      grow: 2,  // Allows column to take more space
      wrap: true,
    },
    {
      name: "Response Added",
      selector: (row) => row.response || "N/A",
      grow: 3,  
      wrap: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="btn btn-danger btn-sm"
          onClick={() => deleteMessage(row.id)}
        >
          Delete
        </button>
      ),
    },
    {
      name: "Response",
      cell: (row) => (
        <button
          className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition"
          onClick={() => handleAddResponse(row.id)}
        >
          Add
        </button>
      ),
    },
  ];

  const tableData = {
    columns,
    data: messages,
  };
  
  // Repeat similar functions for Messages and Inquiries
  
  const exportMessagesCSV = () => {
    const csvData = [
      ["Name", "Email", "Subject", "Message", "Created At"], // Headers
      ...messages.map((row) => [
        row.name || "",
        row.email || "",
        row.subject || "",
        row.message || "",
        row.created_at || "",
      ]),
    ];
  
    const csvContent = csvData.map((e) => e.join(",")).join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "Messages.csv");
  };
  
  const exportMessagesPDF = () => {
    const doc = new jsPDF();
    const tableColumns = ["Name", "Email", "Subject", "Message", "Created At"];
    const tableRows = messages.map((row) => [
      row.name || "",
      row.email || "",
      row.subject || "",
      row.message || "",
      row.created_at || "",
    ]);
  
    doc.text("Messages", 14, 16);
  
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 20,
    });
  
    doc.save("Messages.pdf");
  };
  
  const exportMessagesExcel = () => {
    const excelData = [
      ["Name", "Email", "Subject", "Message", "Created At"], // Headers
      ...messages.map((row) => [
        row.name || "",
        row.email || "",
        row.subject || "",
        row.message || "",
        row.created_at || "",
      ]),
    ];
  
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Messages");
  
    XLSX.writeFile(workbook, "Messages.xlsx");
  };
  
  const printMessagesPDF = () => {
    const doc = new jsPDF();
    const tableColumns = ["Name", "Email", "Subject", "Message", "Created At"];
    const tableRows = messages.map((row) => [
      row.name || "",
      row.email || "",
      row.subject || "",
      row.message || "",
      row.created_at || "",
    ]);
  
    doc.text("Messages", 14, 16);
  
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 20,
    });
  
    window.open(doc.output("bloburl"));
  };
  
  const copyMessagesToClipboard = () => {
    const csvData = [
      ["Name", "Email", "Subject", "Message", "Created At"],
      ...messages.map((row) => [
        row.name || "",
        row.email || "",
        row.subject || "",
        row.message || "",
        row.created_at || "",
      ]),
    ];
  
    const csvContent = csvData.map((e) => e.join(",")).join("\n");
  
    navigator.clipboard
      .writeText(csvContent)
      .then(() => alert("Messages data copied to clipboard!"))
      .catch((err) => console.error("Error copying to clipboard: ", err));
  };
  
  // Similarly for Inquiries
  
  const exportInquiriesCSV = () => {
    const csvData = [
      ["Inquiry ID", "Name", "Email", "Message", "Created At"], // Headers
      ...inquiries.map((row) => [
        row.id || "",
        row.test_name || "",
        row.email || "",
        row.query || "",
        row.created_at || "",
      ]),
    ];
  
    const csvContent = csvData.map((e) => e.join(",")).join("\n");
  
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "Inquiries.csv");
  };
  
  const exportInquiriesPDF = () => {
    const doc = new jsPDF();
    const tableColumns = ["Inquiry ID", "Name", "Email", "Message", "Created At"];
    const tableRows = inquiries.map((row) => [
      row.id || "",
        row.test_name || "",
        row.email || "",
        row.query || "",
        row.created_at || "",
    ]);
  
    doc.text("Inquiries", 14, 16);
  
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 20,
    });
  
    doc.save("Inquiries.pdf");
  };
  
  const exportInquiriesExcel = () => {
    const excelData = [
      ["Inquiry ID", "Name", "Email", "Message", "Created At"], // Headers
      ...inquiries.map((row) => [
        row.id || "",
        row.test_name || "",
        row.email || "",
        row.query || "",
        row.created_at || "",
      ]),
    ];
  
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inquiries");
  
    XLSX.writeFile(workbook, "Inquiries.xlsx");
  };
  
  const printInquiriesPDF = () => {
    const doc = new jsPDF();
    const tableColumns = ["Inquiry ID", "Name", "Email", "Message", "Created At"];
    const tableRows = inquiries.map((row) => [
      row.id || "",
        row.test_name || "",
        row.email || "",
        row.query || "",
        row.created_at || "",
    ]);
  
    doc.text("Inquiries", 14, 16);
  
    doc.autoTable({
      head: [tableColumns],
      body: tableRows,
      startY: 20,
    });
  
    window.open(doc.output("bloburl"));
  };
  
  const copyInquiriesToClipboard = () => {
    const csvData = [
      ["Inquiry ID", "Name", "Email", "Message", "Created At"],
      ...inquiries.map((row) => [
        row.id || "",
        row.test_name || "",
        row.email || "",
        row.query || "",
        row.created_at || "",
      ]),
    ];
  
    const csvContent = csvData.map((e) => e.join(",")).join("\n");
  
    navigator.clipboard
      .writeText(csvContent)
      .then(() => alert("Inquiries data copied to clipboard!"))
      .catch((err) => console.error("Error copying to clipboard: ", err));
  };  

        const inquiry_columns = [
          {
            name: 'Inquiry ID',
            selector: row => row.id,
            sortable: true,
          },
          {
            name: 'Test Name',
            selector: row => row.test_name,
            grow: 2,  // Allows column to take more space
            wrap: true,
          },
          {
            name: 'Name',
            selector: row => row.name,
            grow: 2,  // Allows column to take more space
            wrap: true,
          },
          {
            name: 'Email',
            selector: row => row.email,
            grow: 2,  // Allows column to take more space
            wrap: true,
          },
          {
            name: 'Contact',
            selector: row => row.mobile,
            grow: 2,  // Allows column to take more space
            wrap: true,
          },
          {
            name: 'Query',
            selector: row => row.query,
            sortable: false,
            grow: 2,  // Allows column to take more space
            wrap: true,
          },
          {
            name: "Date",
            selector: (row) => {
              const appointmentDate = row.created_at;
              return appointmentDate ? new Date(appointmentDate).toLocaleDateString("en-GB") : "Not Available";
            },
            sortable: true,
            grow: 2,  // Allows column to take more space
            wrap: true,
          },
          {
            name: "Response Added",
            selector: (row) => row.response || "N/A",
            grow: 3,  
            wrap: true,
          },
          {
            name: "Actions",
            cell: (row) => (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteInquiry(row.id)}
              >
                Delete
              </button>
            ),
          },
          {
            name: "Response",
            cell: (row) => (
              <button
                className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 transition"
                onClick={() => handleInquiryResponse(row.id)}
              >
                Add
              </button>
            ),
          },
        ];

        const handleInquiryResponse = (id) => {
          setSelectedUserId(id);
          setShowModal(true);
        };
      
        const handleSubmitInquiryResponse = () => {
          if (!response) {
            alert("Response cannot be empty.");
            return;
          }
      
          fetch("http://localhost:5000/add-inquiry_response", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: selectedUserId, response }),
          })
            .then((res) => res.json())
            .then((data) => {
              if (data.error) {
                alert(data.error);
              } else {
                alert("Response added successfully!");
                setShowModal(false);
                setResponse(""); // Clear input
                // Optionally refresh the table data
                fetchInquiries();
              }
            })
            .catch((error) => {
              console.error("Error adding response:", error);
              alert("An error occurred. Please try again.");
            });
        };
        
          const handleAddResponse = (id) => {
            setSelectedUserId(id);
            setShowModal(true);
          };
        
          const handleSubmitResponse = () => {
            if (!response) {
              alert("Response cannot be empty.");
              return;
            }
        
            fetch("http://localhost:5000/add-response", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ id: selectedUserId, response }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.error) {
                  alert(data.error);
                } else {
                  alert("Response added successfully!");
                  setShowModal(false);
                  setResponse(""); // Clear input
                  // Optionally refresh the table data
                  fetchMessages();
                }
              })
              .catch((error) => {
                console.error("Error adding response:", error);
                alert("An error occurred. Please try again.");
              });
          };

        // useEffect(() => {
        //   if (selectedView === "inquiries") {
        //     fetch('/api/inquiries')
        //       .then((response) => response.json())
        //       .then((data) => setInquiries(data))
        //       .catch((error) => console.error("Error fetching inquiries:", error));
        //   }
        // }, [selectedView]);
        
  return (
    <div>
      <nav className="bg-blue-600">
    <div className="container mx-auto px-4 flex justify-between items-center py-4">
      <a href="/" className="text-white text-xl font-bold  no-underline">
        Lab<span className="text-gray-200">sky</span>
      </a>
      {localStorage.getItem("token") && (
  <button onClick={handleLogout} className="text-white hover:text-gray-300 no-underline">
    Logout
  </button>
)}
    </div>
  </nav>
  {/* <div className="d-flex justify-content-end mb-3">
  <button
    className={`mt-2 btn btn-${selectedView === "appointments" ? "primary" : "outline-primary"} me-2`}
    onClick={() => setSelectedView("appointments")}
  >
    Appointments
  </button>
  <button
    className={`mt-2 btn btn-${selectedView === "form" ? "primary" : "outline-primary"} me-2`}
    onClick={() => setSelectedView("contact")}
  >
    Contact Us
  </button>
  <button
    className={`mt-2 btn btn-${selectedView === "inquiries" ? "primary" : "outline-primary"} me-2`}
    onClick={() => setSelectedView("inquiries")}
  >
    Inquiries
  </button>
</div>
      
      {selectedView === "appointments" ? (
        <>
        <div className="mb-3">
        <button
  onClick={aexportCSV}
  className="btn btn-primary mx-2 bg-blue-500 hover:bg-yellow-500 text-white px-4 py-2 rounded">
  Export as CSV
</button>
            <button onClick={aexportExcel} className="btn btn-primary mx-2 bg-blue-500 hover:bg-yellow-500 text-white px-4 py-2 rounded">
              Export as Excel
            </button>
            <button onClick={aexportPDF} className="btn btn-primary mx-2 bg-blue-500 hover:bg-yellow-500 text-white px-4 py-2 rounded">
              Export as PDF
            </button>
            <button onClick={aprintPDF} className="btn btn-primary mx-2 bg-blue-500 hover:bg-yellow-500 text-white px-4 py-2 rounded">
              Print
            </button>
            <button onClick={acopyToClipboard} className="btn btn-primary mx-2 bg-blue-500 hover:bg-yellow-500 text-white px-4 py-2 rounded">
              Copy
            </button>
          </div>
          <div className="mb-4 w-1/2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control w-1/2"
        />
      </div>
      <div>
    <h2>Appointments</h2>
    <DataTable
      columns={columns}
      data={filteredAppointments}
      pagination
      highlightOnHover
      defaultSortField="appointment_id"
    />
  </div>
      <Footer/>
      </>
      ) : (
        <>
        <div className="mb-3">
        <button
  onClick={exportCSV}
  className="btn btn-primary mx-2 bg-blue-500 hover:bg-yellow-500 text-white px-4 py-2 rounded">
  Export as CSV
</button>
            <button onClick={exportExcel} className="btn btn-primary mx-2 bg-blue-500 hover:bg-yellow-500 text-white px-4 py-2 rounded">
              Export as Excel
            </button>
            <button onClick={exportPDF} className="btn btn-primary mx-2 bg-blue-500 hover:bg-yellow-500 text-white px-4 py-2 rounded">
              Export as PDF
            </button>
            <button onClick={printPDF} className="btn btn-primary mx-2 bg-blue-500 hover:bg-yellow-500 text-white px-4 py-2 rounded">
              Print
            </button>
            <button onClick={copyToClipboard} className="btn btn-primary mx-2 bg-blue-500 hover:bg-yellow-500 text-white px-4 py-2 rounded">
              Copy
            </button>
          </div>
          <div className="mb-4 w-1/2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control w-1/2"
        />
      </div>
       <div>
      <h2>Contact Messages</h2>
      {messages.length > 0 ? (
        // <DataTableExtensions {...tableData}>
        <DataTable
          columns={contact_columns}
          data={filteredContacts}
          pagination
          highlightOnHover
          defaultSortField="name"
        />
        // </DataTableExtensions>
      ) : (
        <p>No contact messages found.</p>
      )}
    </div>
      <Footer />
      </>
      
      ) } : (
        <>
        <div className="mb-3">
        <button
  onClick={exportCSV}
  className="btn btn-primary mx-2 bg-blue-500 hover:bg-yellow-500 text-white px-4 py-2 rounded">
  Export as CSV
</button>
            <button onClick={exportExcel} className="btn btn-primary mx-2 bg-blue-500 hover:bg-yellow-500 text-white px-4 py-2 rounded">
              Export as Excel
            </button>
            <button onClick={exportPDF} className="btn btn-primary mx-2 bg-blue-500 hover:bg-yellow-500 text-white px-4 py-2 rounded">
              Export as PDF
            </button>
            <button onClick={printPDF} className="btn btn-primary mx-2 bg-blue-500 hover:bg-yellow-500 text-white px-4 py-2 rounded">
              Print
            </button>
            <button onClick={copyToClipboard} className="btn btn-primary mx-2 bg-blue-500 hover:bg-yellow-500 text-white px-4 py-2 rounded">
              Copy
            </button>
          </div>
          <div className="mb-4 w-1/2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control w-1/2"
        />
      </div>
       <div>
      <h2>Inquiries</h2>
      {messages.length > 0 ? (
        // <DataTableExtensions {...tableData}>
        <DataTable
        columns={inquiry_columns}
        data={inquiries}
        pagination
        highlightOnHover
        defaultSortField="inquiry_id"
      />
        // </DataTableExtensions>
      ) : (
        <p>No inquiries found.</p>
      )}
    </div>
      <Footer />
      </>
      ) */}
      <div className="d-flex justify-content-end mb-3">
  <button
    className={`mt-2 btn btn-${selectedView === "appointments" ? "primary" : "outline-primary"} me-2`}
    onClick={() => setSelectedView("appointments")}
  >
    Appointments
  </button>
  <button
    className={`mt-2 btn btn-${selectedView === "form" ? "primary" : "outline-primary"} me-2`}
    onClick={() => setSelectedView("contact")}
  >
    Contact Us
  </button>
  <button
    className={`mt-2 btn btn-${selectedView === "inquiries" ? "primary" : "outline-primary"} me-2`}
    onClick={() => setSelectedView("inquiries")}
  >
    Inquiries
  </button>
</div>
{selectedView === "appointments" && (
  <div>
   <div className="d-flex justify-content-between align-items-center">
  <div>
    <button className="mt-2 mb-4 btn btn-outline-primary me-2" onClick={aexportCSV}>
      Export CSV
    </button>
    <button className="mt-2 mb-4 btn btn-outline-primary me-2" onClick={aexportPDF}>
      Export PDF
    </button>
    <button className="mt-2 mb-4 btn btn-outline-primary me-2" onClick={aexportExcel}>
      Export Excel
    </button>
    <button className="mt-2 mb-4 btn btn-outline-primary me-2" onClick={aprintPDF}>
      Print
    </button>
    <button className="mt-2 mb-4 btn btn-outline-primary me-2" onClick={acopyToClipboard}>
      Copy to Clipboard
    </button>
  </div>
  <div className="mt-2 mb-4 mr-2 w-1/2">
    <input
      type="text"
      placeholder="Search..."
      value={searchTerm}
      onChange={handleSearchChange}
      className="form-control"
    />
  </div>
</div>
    {/* Appointments Code */}
    <h2>Appointments</h2>
    <div className="flex justify-center items-center mt-4 mb-4 bg-white-100">
    <div className="w-11/12 max-w-6xl bg-white p-4 shadow-lg rounded-lg">
    <DataTable
      columns={columns}
      data={filteredAppointments}
      pagination
      highlightOnHover
      defaultSortField="appointment_id"
    />
    </div>
    </div>
    <Footer />
  </div>
)}

{selectedView === "contact" && (
  <div>
    <div className="d-flex justify-content-between align-items-center">
    <div>
      <button className="mt-2 mb-4 btn btn-outline-primary me-2" onClick={exportMessagesCSV}>Export CSV </button>
  <button className="mt-2 mb-4 btn btn-outline-primary me-2" onClick={exportMessagesPDF}>Export PDF </button>
  <button className="mt-2 mb-4 btn btn-outline-primary me-2" onClick={exportMessagesExcel}>Export Excel </button>
  <button className="mt-2 mb-4 btn btn-outline-primary me-2" onClick={printMessagesPDF}>Print </button>
  <button className="mt-2 mb-4 btn btn-outline-primary me-2" onClick={copyMessagesToClipboard}>Copy to Clipboard</button>
  </div>
  <div className="mt-2 mb-4 mr-2 w-1/2 outline-primary ">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control w-1/2"
        />
      </div>
      </div>
    {/* Contact Us Code */}
    <h2>Contact Messages</h2>
    <div className="flex justify-center items-center mt-4 mb-4 bg-white-100">
    <div className="w-11/12 max-w-6xl bg-white p-4 shadow-lg rounded-lg">
    <DataTable
      columns={contact_columns}
      data={filteredContacts}
      pagination
      highlightOnHover
      defaultSortField="name"
    />
    </div>
    </div>
    {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add Response</h3>
            <textarea
              className="w-full border rounded px-3 py-2 mb-4"
              rows="4"
              placeholder="Enter your response"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                onClick={handleSubmitResponse}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 transition"
              >
                Submit
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    <Footer />
  </div>
)}

{selectedView === "inquiries" && (
  <div>
    <div className="d-flex justify-content-between align-items-center">
    <div>
    <button className="mt-2 mb-4 btn btn-outline-primary me-2" onClick={exportInquiriesCSV}>Export CSV </button>
  <button className="mt-2 mb-4 btn btn-outline-primary me-2" onClick={exportInquiriesPDF}>Export PDF </button>
  <button className="mt-2 mb-4 btn btn-outline-primary me-2" onClick={exportInquiriesExcel}>Export Excel </button>
  <button className="mt-2 mb-4 btn btn-outline-primary me-2" onClick={printInquiriesPDF}>Print </button>
  <button className="mt-2 mb-4 btn btn-outline-primary me-2" onClick={copyInquiriesToClipboard}>Copy to Clipboard </button>
</div>
<div className="mt-2 mb-4 mr-2 w-1/2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control w-1/2"
        />
      </div>
      </div>
    <h2>Inquiries</h2>
    {inquiries.length > 0 ? (
          <div className="flex justify-center items-center mt-4 mb-4 bg-white-100">
    <div className="w-11/12 max-w-6xl bg-white p-4 shadow-lg rounded-lg">
      <DataTable
        columns={inquiry_columns}
        data={filteredInquiries}
        pagination
        highlightOnHover
        defaultSortField="inquiry_id"
      />
      </div>
      </div> 
    ) : (
      <p>No inquiries found.</p> 
    )}
     {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Add Response</h3>
            <textarea
              className="w-full border rounded px-3 py-2 mb-4"
              rows="4"
              placeholder="Enter your response"
              value={response}
              onChange={(e) => setResponse(e.target.value)}
            />
            <div className="flex justify-end">
              <button
                onClick={handleSubmitInquiryResponse}
                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600 transition"
              >
                Submit
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    <Footer />
  </div>
)}
    </div>
  );
};

export default AdminDashboard;
