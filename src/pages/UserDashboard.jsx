import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import DataTable from "react-data-table-component";

function UserDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [user_id, setUserId] = useState(localStorage.getItem("user_id") || null);
  const [newAppointment, setNewAppointment] = useState({ date: "", time: "", service: "" });
  const [visit_type, setVisitType] = useState("lab");
  const [userName, setUserName] = useState("");
  const [view, setView] = useState("list");
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showModal, setShowModal] = useState(false);
    const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
    const [searchTerm, setSearchTerm] = useState(""); 
  

  const openRescheduleModal = (appointmentId) => {
    setSelectedAppointmentId(appointmentId);
    setShowModal(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase()); // Convert to lowercase for case-insensitive search
  };

  const filteredAppointments = appointments.filter((row) => {
    // Combine all fields in each row and check if the search term exists
    const rowValues = Object.values(row).join(" ").toLowerCase();
    return rowValues.includes(searchTerm);
  });

  useEffect(() => {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) {
      alert("You must be logged in to access the dashboard.");
      navigate("/login"); // Redirect to login if not logged in
      return;
    }

    // Fetch the appointments and userName for the user
    const fetchAppointments = async () => {

      const user_id = localStorage.getItem("user_id");
    console.log("Retrieved userId:", user_id); // Should not be null or undefined

    if (!user_id) {
      alert("User ID is not found!");
      return;
  }

  try{
      const response = await fetch(`http://localhost:5000/user-dashboard?user_id=${user_id}`);
      if (!response.ok) {
        const errorData = await response.json();
        alert(`Error: ${errorData.error || "Failed to fetch appointments"}`);
        return;
    }
    const data = await response.json();
        if (data) {
            setAppointments(data.appointments);
            setUserName(data.username);  // Set the user name from the response
        }
      } catch(error){
        console.error("Error:", error);
        alert("An error occurred while fetching appointments.");
      }
    };

    if (user_id) {
      fetchAppointments();
      const intervalId = setInterval(fetchAppointments, 10000);
      return () => clearInterval(intervalId);
    }
  }, [user_id]);

    const [formData, setFormData] = useState({
      // name: "",
      // email: "",
      mobile: "",
      service: "Pathology Testing",
      visit_type: "lab",
     address: "",
      message: "",
      appointment_date: "",
    });
  
    console.log("Submitting data:", formData);
    
    const handleVisitTypeChange = (e) => {
      const value = e.target.value;
      setVisitType(value);
      setFormData({ ...formData, visit_type: value });
    };
  
    const handleChange = (e) => {
      const { id, value } = e.target;
      setFormData({ ...formData, [id]: value });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const user_id = localStorage.getItem("user_id");
      console.log("Retrieved userId:", user_id); // Should not be null or undefined
      
      if (!user_id) {
        alert("User ID is missing. Please log in again.");
        return;
      }
      try {
        const response = await fetch("http://localhost:5000/book-appointment", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...formData, user_id }),
        });
    
        if (response.ok) {
          alert("Appointment booked successfully! A confirmation email has been sent.");
          setFormData({
            mobile: "",
            service: "",
            visit_type: "",
            address: "",
            message: "",
            appointment_date: "", // Clear the date field
          });
        } else {
          alert("Error booking appointment. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while booking the appointment.");
      }
      setView("list"); // Switch to list view after booking
      // fetchAppointments(); // Refresh appointments list
    };

    const handleLogout = () => {
      localStorage.removeItem("user_id");
      localStorage.removeItem("token");
      navigate("/login"); // Redirect to login page
    };

    const columns = [
      {
        name: "No.",
        selector: (row, index) => index + 1,
        sortable: true,
        width: "80px",
      },
      {
        name: "Service",
        selector: (row) => row.service,
        sortable: true,
      },
      {
        name: "Visit Type",
        selector: (row) => row.visit_type,
        sortable: true,
        width: "150px",
        cell: (row) => (
          <span className="truncate" style={{ display: "inline-block", maxWidth: "150px" }}>
            {row.visit_type}
          </span>
        ),
      },      
      {
        name: "Status",
        selector: (row) => (
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full ${
              row.status === "completed"
                ? "bg-green-100 text-green-600"
                : row.report_path
                ? "bg-blue-100 text-blue-600"
                : "bg-yellow-100 text-yellow-600"
            }`}
          >
            {row.status === "completed" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M5 13l4 4L19 7"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            ) : row.report_path ? (
              <svg
  xmlns="http://www.w3.org/2000/svg"
  className="h-5 w-5 mr-1"
  viewBox="0 0 32 24" /* Adjusted width for side-by-side ticks */
  fill="none"
  stroke="currentColor"
>
  <path
    d="M5 13l4 4L19 7" /* First tick */
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5} /* Thinner stroke */
  />
  <path
    d="M12 13l4 4L26 7" /* Second tick shifted to the right */
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={1.5} /* Thinner stroke */
  />
</svg>

            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M8 9l3 3-3 3m5-6l3 3-3 3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                />
              </svg>
            )}
            {row.status === "completed"
              ? "Completed"
              : row.report_path
              ? "Report Generated"
              : "Pending"}
          </span>
        ),
        sortable: true,
      },  
      {
        name: "Appointment Date",
        selector: (row) =>
          new Date(row.appointment_date).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }),
        sortable: true,
      },
      {
        name: "Actions",
        cell: (row) => (
          <>
            {row.report_path ? (
              <a
                href={`http://localhost:5000/reports/${row.report_path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 n0-underline mr-2"
              > <button className="px-2 py-2 mt-1 mb-1 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-300 transition duration-300"
>Download Report</button>
              </a>
              
            ) : (
              <span className="text-red-500 mr-2">Report Not Generated</span>
            )}
                  <>
        {row.status === "pending" ? (
          <button
            onClick={() => openRescheduleModal(row.id)} 
            className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-300 transition duration-300"
          >
            Reschedule
          </button>
        ) : (
          <span className="text-muted">Cannot Reschedule</span>
        )}
      </>
          </>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
        button: true,
  width: "250px", // Increase column width
      },
    ];
    
    const isToday = (dateString) => {
      const today = new Date();
      const date = new Date(dateString);
    
      return (
        today.getDate() === date.getDate() &&
        today.getMonth() === date.getMonth() &&
        today.getFullYear() === date.getFullYear()
      );
    };

    const conditionalRowStyles = [
      {
        when: (row) => isToday(row.appointment_date),
        style: {
          backgroundColor: "#FFFD74", // Highlight color (yellow)
          color: "#000", // Text color
        },
      },
    ];

    const handleReschedule = (appointmentId) => {
    // const newDate = prompt(
    //   "Enter a new date (YYYY-MM-DD) for the appointment:",
    //   ""
    // );
    
      if (!selectedDate) {
        alert("No date provided. Rescheduling canceled.");
        return;
      }
    
      const today = new Date();
      const newDate = new Date(selectedDate);
    
      if (newDate < today.setHours(0, 0, 0, 0)) {
        alert("You can only reschedule to today's date or a future date.");
        return;
      }
    
      // Send the request to the backend
      fetch(`http://localhost:5000/reschedule-appointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointment_id: selectedAppointmentId, // Correct appointment ID passed here
          new_date: selectedDate,
        }),
      })
        .then((response) => {
          if (response.ok) {
            alert("Appointment rescheduled successfully!");
            setShowModal(false);
          setSelectedAppointmentId(null);
          setSelectedDate("");
            // Optionally refresh appointments
            // fetchAppointments();
          } else {
            response.json().then((data) => {
              console.error("Backend error response:", data);
              alert(data.error || "Failed to reschedule the appointment.");
            });
          }
        })
        .catch((error) => {
          console.error("Error rescheduling appointment:", error);
          alert("An error occurred. Please try again.");
        });     
    };     
    
    // const DatePickerModal = ({ onClose, onConfirm }) => {
    //   const [selectedDate, setSelectedDate] = useState("");
    
    //   return (
    //     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    //       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
    //         <h2 className="text-xl font-bold mb-4">Select a New Date</h2>
    //         <label htmlFor="date" className="block text-sm font-medium text-gray-700">
    //           Date
    //         </label>
    //         <input
    //           type="date"
    //           id="date"
    //           value={selectedDate}
    //           onChange={(e) => setSelectedDate(e.target.value)}
    //           className="mt-2 mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
    //         />
    //         <div className="flex justify-end space-x-4">
    //           <button
    //             onClick={onClose}
    //             className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
    //           >
    //             Cancel
    //           </button>
    //           <button
    //             onClick={() => {
    //               if (selectedDate) {
    //                 onConfirm(selectedDate);
    //               } else {
    //                 alert("Please select a date.");
    //               }
    //             }}
    //             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
    //           >
    //             Confirm
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   );
    // };
    

  return (
      <div className="w-full">
        <nav className="w-100 bg-blue-600">
    <div className="container mx-auto flex justify-between items-center">
      {/* <a href="/" className="text-white text-xl font-bold  no-underline">
        Lab<span className="text-gray-200">sky</span>
      </a> */}
        <img src="/LabSky.png" alt="My Logo" className="w-40 h-20 object-contain"/>
{/* Hamburger Button */}
<button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="text-white md:hidden"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      <div className="flex space-x-6">
        <a href="/" className="text-white hover:text-gray-300 no-underline">Home</a>
        <Link to="/about" className="text-white hover:text-gray-300 no-underline">About</Link>  
        <Link to="/service" className="text-white hover:text-gray-300 no-underline">Services</Link>      
        <Link to="/contact" className="text-white hover:text-gray-300 no-underline">Contact</Link> 
        {localStorage.getItem("token") ? (
        <button onClick={handleLogout} className="text-white hover:text-gray-300 no-underline">Logout</button>
    ) : (
      <Link to="/login" className="text-white hover:text-gray-300 no-underline">Login</Link>
    )}
      </div>
    </div>
    {/* Mobile Menu */}
    {isMenuOpen && (
        <div className="md:hidden bg-blue-500">
          <div className="flex flex-col space-y-4 p-4">
            <a href="/" className="text-white hover:text-gray-300 no-underline">
              Home
            </a>
            <Link
              to="/about"
              className="text-white hover:text-gray-300 no-underline"
            >
              About
            </Link>
            <Link
              to="/service"
              className="text-white hover:text-gray-300 no-underline"
            >
              Services
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-gray-300 no-underline"
            >
              Contact
            </Link>
            {localStorage.getItem("token") ? (
              <button
                onClick={handleLogout}
                className="text-white hover:text-gray-300 no-underline"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-white hover:text-gray-300 no-underline"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
  </nav>
      <h2>Welcome, {userName}!</h2>
      <div className="d-flex justify-content-end">
        <button
          className={`btn btn-${view === "list" ? "primary" : "outline-primary"} me-2`}
          onClick={() => setView("list")}
        >
          Appointments List
        </button>
        <button
          className={`btn btn-${view === "form" ? "primary" : "outline-primary"}`}
          onClick={() => setView("form")}
        >
          Book Appointment
        </button>
      </div>

      {view === "list" ? (
        <>
              <div className=" mt-2 mb-4 w-1/2">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control w-1/2"
        />
      </div>
          <h4>Your Appointments:</h4>
          {appointments.length === 0 ? (
            <p>You have not booked any appointments yet.</p>
          ) : (
            <div className="flex justify-center items-center mt-4 mb-4 bg-white-100">
            <div className="w-11/12 max-w-6xl bg-white p-4 shadow-lg rounded-lg">
              <DataTable
                columns={columns}
                data={filteredAppointments}
                pagination
                highlightOnHover
                defaultSortField="appointment_date"
                defaultSortAsc={false}
                conditionalRowStyles={conditionalRowStyles}
              />
            </div>
          </div>                  
          )}
          {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Reschedule Appointment</h2>
            <label htmlFor="date" className="px-4 py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 focus:ring focus:ring-blue-300 transition duration-300"
            >
              Select New Date
            </label>
            <input
              type="date"
              id="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="mt-2 mb-4 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleReschedule}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
             <Footer/>
        </>
      ) : (
        <>
<div className="container-fluid py-5">
<div className="container">
  <div className="row g-5">
    <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.1s">
      <h1 className="display-6 mb-4 text-blue-600 font-bold">
        We Ensure You Will Always Get The Best Result
      </h1>
      <p>
      Our team of skilled professionals is dedicated to providing top-notch laboratory services. We prioritize accuracy, efficiency, and patient satisfaction in every test we perform
      </p>
      <p className="mb-4">
      We understand the importance of timely results. That's why we use the latest technology and adhere to the highest standards to ensure you receive the best possible care and reliable test outcomes.
      </p>
      <div className="d-flex align-items-start wow fadeIn" data-wow-delay="0.3s">
        <div className="icon-box-primary">
          <i className="bi bi-geo-alt text-dark fs-1"></i>
        </div>
        <div className="ms-3">
          <h5 className="font-bold">Office Address</h5>
          <span>Malad, Mumbai</span>
        </div>
      </div>
      <hr />
      <div className="d-flex align-items-start wow fadeIn" data-wow-delay="0.4s">
        <div className="icon-box-primary">
          <i className="bi bi-clock text-dark fs-1"></i>
        </div>
        <div className="ms-3">
          <h5 className="font-bold">Office Time</h5>
          <span>Mon-Sun : 9am-5pm</span>
        </div>
      </div>
    </div>
      <div className="col-lg-6 wow fadeInUp" data-wow-delay="0.5s">
        <h2 className="mb-4">Online Appointment</h2>
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            {/* <div className="col-sm-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="name">Your Name</label>
              </div>
            </div> */}
            {/* <div className="col-sm-6">
              <div className="form-floating">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="email">Your Email</label>
              </div>
            </div> */}
            <div className="col-sm-6">
              <div className="form-floating">
                <input
                  type="text"
                  className="form-control"
                  id="mobile"
                  placeholder="Your Mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="mobile">Your Mobile</label>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="service"
                  value={formData.service}
                  onChange={handleChange}
                >
                  <option>Pathology Testing</option>
                  <option>Microbiology Tests</option>
                  <option>Biochemistry Tests</option>
                  <option>Histopathology Tests</option>
                  <option>Urine Tests</option>
                  <option>Blood Tests</option>
                  <option>Fever Tests</option>
                  <option>Allergy Tests</option>
                </select>
                <label htmlFor="service">Choose A Service</label>
              </div>
            </div>
            <div className="col-sm-6">
          <div className="form-floating">
            <input
              type="date"
              className="form-control"
              id="appointment_date"
              value={formData.appointment_date}
              onChange={handleChange}
              required
            />
            <label htmlFor="appointment_date">Appointment Date</label>
          </div>
        </div>
            <div className="col-sm-6">
              <div className="form-floating">
                <select
                  className="form-select"
                  id="visit_type"
                  value={formData.visit_type}
                  onChange={handleVisitTypeChange}
                >
                  <option value="lab">Visit Lab</option>
                  <option value="home">Home Visit</option>
                </select>
                <label htmlFor="visit_type">Select Visit Type</label>
              </div>
            </div>
            {visit_type === "home" && (
              <div className="col-12">
                <div className="form-floating">
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    placeholder="Your Address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                  <label htmlFor="address">Your Address</label>
                </div>
              </div>
            )}
            <div className="col-12">
              <div className="form-floating">
                <textarea
                  className="form-control"
                  placeholder="Leave a message here"
                  id="message"
                  style={{ height: "130px" }}
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
                <label htmlFor="message">Message</label>
              </div>
            </div>
            <div className="col-12 text-center">
              <button className="btn btn-primary w-100 py-3" type="submit">
                Submit Now
              </button>
            </div>
          </div>
        </form>
      </div>
  </div>
</div>
</div>     
<Footer /> 
</>
      )}
    </div>
  );
};

export default UserDashboard;
