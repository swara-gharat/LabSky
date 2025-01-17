const express = require("express");
const mysql = require("mysql2");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const app = express();
const nodemailer = require("nodemailer");

const PORT = 5000;

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json()); // Built-in middleware for JSON parsing
app.use(express.urlencoded({ extended: true })); // Built-in middleware for URL encoding
app.use("/reports", express.static(path.join(__dirname, "/")));
app.use('/reports', express.static(path.join(__dirname, 'uploads', 'reports')));


// Database Connection
const db = mysql.createConnection({
  host: "localhost", // Replace with your DB host
  user: "",      // Replace with your DB username
  password: "",      // Replace with your DB password
  database: "" // Replace with your DB name
});

db.connect((err) => {
  if (err) throw err;
  console.log("Database connected!");
});

// Set up Multer for file uploads
const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/reports"); // Destination folder
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); // Use the original file name
    },
  }),
});

// User Registration
const crypto = require("crypto");

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
 
  console.log(req.body);
  const hashedPassword = await bcrypt.hash(password, 10);

  try{
  const query = "INSERT INTO form_data (name, email, password, user_type) VALUES (?, ?, ?, 'user')";
  await db.execute(query,[name,email,hashedPassword]);
  res.status(200).json({ message: "Registration successful" });

  } catch(error) {
    res.status(500).send("Error registering user");
  }
  });

// User/Admin Login
app.post("/login", (req, res) => {
    const { email, password, user_type } = req.body;
  
    // Admin login without JWT
    if (user_type === "admin") {
      if (email === "admin@example.com" && password === "admin123") {
        return res.status(200).json({ message: "Admin login successful", role: "admin" });
      } else {
        return res.status(401).send("Invalid admin credentials");
      }
    }
  
    // User login with password comparison
    const query = "SELECT * FROM form_data WHERE email = ?";
    db.query(query, [email], async (err, results) => {
      if (err) return res.status(500).send("Server error");
      if (results.length === 0) return res.status(404).send("User not found");
  
      const user = results[0];
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (isValidPassword) {
        res.json({ message: "Login successful", user_id: user.id });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    });
  });  

// Fetch Appointments (Admin)
app.get("/admin-dashboard", (req, res) => {
  const query = `
    SELECT 
      form_data.name AS user_name,
      form_data.email AS user_email,
      appointments.id AS appointment_id,
      appointments.user_id,
      appointments.mobile,
      appointments.service,
      appointments.visit_type,
      appointments.address,
      appointments.message,
      appointments.appointment_date,
      appointments.status,
      appointments.report_path
    FROM form_data
    LEFT JOIN appointments ON form_data.id = appointments.user_id
    ORDER BY form_data.id, appointments.appointment_date
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching appointments:", err);
      return res.status(500).send("Error fetching appointments.");
    }
    res.status(200).json(results);
  });
});

app.put("/admin/update-status/:id", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  const query = "UPDATE appointments SET status = ? WHERE id = ?";
  db.query(query, [status, id], (err, results) => {
    if (err) {
      console.error("Error updating appointment status:", err);
      return res.status(500).send("Error updating appointment status.");
    }

    if (results.affectedRows === 0) {
      return res.status(404).send("Appointment not found.");
    }

    res.status(200).send("Status updated successfully.");
  });
});

// Upload report and update appointment status
app.post("/admin/upload-report", upload.single("report"), (req, res) => {
  console.log("Request Body:", req.body); // Check if user_id is received
  console.log("Uploaded File:", req.file); // Check if file is uploaded

  if (!req.body.user_id) {
    return res.status(400).send("User ID is required");
  }

  const filePath = `uploads/reports/${req.file.filename}`; // Use the file's name that was uploaded

  // Query to update the report path in the database
  const updateQuery = `UPDATE appointments SET report_path = ? WHERE user_id = ? AND status = 'report_generated'`;

  db.query(updateQuery, [filePath, req.body.user_id], (err, updateResults) => {
    if (err) {
      console.error("Error updating report path in database:", err);
      return res.status(500).send("Error saving report path");
    }

    if (updateResults.affectedRows === 0) {
      return res.status(404).send("No appointment found for the given user_id with status 'report_generated'");
    }

    // Fetch user details to send an email
    const fetchQuery = `SELECT form_data.email, form_data.name, appointments.service, appointments.report_path
                        FROM appointments
                        JOIN form_data ON appointments.user_id = form_data.id
                        WHERE appointments.user_id = ? AND appointments.status = 'report_generated'`;

    db.query(fetchQuery, [req.body.user_id], (err, fetchResults) => {
      if (err) {
        console.error("Error fetching user details:", err);
        return res.status(500).send("Error fetching user details");
      }

      if (fetchResults.length === 0) {
        return res.status(404).send("User details not found for the given user_id");
      }

      const userDetails = fetchResults[0];
      console.log("Fetched User Details:", userDetails);

      // Send email notification
      const emailDetails = {
        email: userDetails.email,
        name: userDetails.name,
        service: userDetails.service,
        reportPath: userDetails.report_path,
      };

      sendReportEmail(emailDetails)
        .then(() => {
          res.status(200).send("Report uploaded, saved, and email sent successfully");
        })
        .catch((emailError) => {
          console.error("Error sending email:", emailError);
          res.status(500).send("Report uploaded and saved, but email notification failed");
        });
    });
  });
});

const sendReportEmail = async (emailDetails) => {
  const { email, name, service, reportPath } = emailDetails;

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "", // Replace with your email
      pass: "",    // Replace with your app password
    },
  });

  // Prepare email content
  const mailOptions = {
    from: "",
    to: email,
    subject: "LabSky Report Upload Confirmation",
    html: `
      <h1>Report Upload Confirmation</h1>
      <p>Hello ${name},</p>
      <p>Your report for the service <strong>${service}</strong> has been uploaded successfully. You can download your report using the link below:</p>
      <p><a href="http://localhost:5000/reports/${reportPath}" target="_blank">Download Report</a></p>
      <p>If you have any questions, please feel free to contact us.</p>
      <p>Thank you for choosing LabSky!</p>
    `,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Report upload email sent successfully to:", email);
  } catch (error) {
    console.error("Error sending report email:", error);
    throw error; // Propagate the error to handle it in the main flow
  }
};

app.get("/admin/contact-messages", (req, res) => {
  const query = "SELECT * FROM contact_messages WHERE status = 1 ORDER BY created_at DESC";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching contact messages:", err);
      return res.status(500).send("Error fetching contact messages");
    }
    res.status(200).json(results);
  });
});

app.put("/admin/contact-messages/:id", (req, res) => {
  const { id } = req.params;
  const query = "UPDATE contact_messages SET status = 0 WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error updating message status:", err);
      return res.status(500).send("Error updating message status");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Message not found");
    }
    res.status(200).send("Message status updated successfully");
  });
});

app.put("/admin/inquiry/:id", (req, res) => {
  const { id } = req.params;
  const query = "UPDATE inquiries SET status = 0 WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error updating message status:", err);
      return res.status(500).send("Error updating message status");
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("Message not found");
    }
    res.status(200).send("Message status updated successfully");
  });
});


app.post("/book-appointment", (req, res) => {
    const { mobile, service, visit_type, address, message, user_id, appointment_date} = req.body;
    console.log("Headers:", req.headers);
    console.log("Received data:", req.body);  // Log incoming data
  
    // Check if all required fields are provided
    if (!user_id || !service || !visit_type || !appointment_date) {
      return res.status(400).send("Missing required fields.");
    }
  
    const today = new Date().toISOString().split("T")[0];
    if (appointment_date < today) {
      return res.status(400).send("Cannot book appointments for past dates.");
    }

    // Fetch the user information from form_data table using the user_id
    const userQuery = "SELECT name, email FROM form_data WHERE id = ?";
    db.query(userQuery, [user_id], (err, results) => {
      if (err) {
        console.error("Error fetching user data:", err);
        return res.status(500).send("Error fetching user data.");
      }
  
      if (results.length === 0) {
        return res.status(404).send("User not found.");
      }
  
      const user = results[0];  // Get user data
      console.log("User data fetched:", user);

      // Prepare the SQL query to insert the appointment data (exclude name and email)
    const query = `
      INSERT INTO appointments (user_id, service, visit_type, address, status, created_at, mobile, message, appointment_date)
      VALUES (?, ?, ?, ?, 'pending', NOW(), ?, ?, ?)
    `;

    // Insert the data into the appointments table
    db.query(query, [
      user_id,
      service,
      visit_type,
      address || null,
      mobile,
      message || null,
      appointment_date,
    ], async (err, results) => {
      if (err) {
        console.error("Error booking appointment:", err);
        return res.status(500).send("Error booking appointment.");
      }

      console.log("Appointment booked successfully:", results);

      // Create the appointment object to pass to sendEmail
      const appointment = {
        name: user.name,
        email: user.email,
        mobile,
        service,
        visit_type,
        address: address || "Not provided",
        message: message || "No message",
        appointment_date,
      };

      try {
        // Send confirmation email
        await sendEmail(appointment);
        res.status(200).json({ message: "Appointment booked and email sent successfully!" });
      } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: "Appointment booked but failed to send email." });
      }
    });
  });
});
  
const sendEmail = async (appointment) => {
  const { name, email, service, visit_type, address, appointment_date } = appointment;

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "swaragharat7@gmail.com", // Replace with your Gmail
      pass: "pesg kxij zgyi gjea",   // Replace with your App Password
    },
  });

  // Prepare email content
  const mailOptions = {
    from: "swaragharat7@gmail.com",
    to: email,
    subject: "LabSky Appointment Confirmation",
    html: `
      <h1>Appointment Confirmation</h1>
      <p>Hello ${name},</p>
      <p>Your appointment has been successfully booked. Here are the details:</p>
      <ul>
        <li><strong>Service:</strong> ${service}</li>
        <li><strong>Visit Type:</strong> ${visit_type}</li>
        <li><strong>Address:</strong> ${address}</li>
        <li><strong>Appointment Date:</strong> ${appointment_date}</li>
      </ul>
      <p>You can reschedule your appointment by visiting our site. After the test is completed, you can view the report on the portal.</p>
      <p>Thank you for choosing our service!</p>
    `,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", email);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error; // Propagate the error to handle it in the booking flow
  }
};

module.exports = sendEmail;

// Fetch User Appointments
app.get("/user-dashboard", (req, res) => {
  res.setHeader("Cache-Control", "no-store");
    const { user_id } = req.query;

    if (!user_id) {
      return res.status(400).json({ error: "user_id is required" });
  }

    const userQuery = "SELECT name FROM form_data WHERE id = ?";
    db.query(userQuery, [user_id], (err, userResults) => {
      if (err) return res.status(500).send("Error fetching user data");

      if (userResults.length === 0) {
        return res.status(404).json({ error: "User not found" });
    }
      
      const user = userResults[0];
    const username = user.name;  // Extract username from result
  
      const appointmentsQuery = "SELECT * FROM appointments WHERE user_id = ?";
      db.query(appointmentsQuery, [user_id], (err, appointmentResults) => {
        if (err) return res.status(500).send("Error fetching appointments");
  
        res.status(200).json({ username, appointments: appointmentResults });
      });
    });
  });
  

// Route to handle contact form submission
app.post("/contact", (req, res) => {
  const { name, email, mobile, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !mobile || !message) {
    return res.status(400).json({ error: "Name, email, mobile and message are required" });
  }

  // Insert the data into the database
  const query = `
    INSERT INTO contact_messages (name, email, mobile, subject, message)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.query(query, [name, email, mobile, subject, message], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Failed to submit message" });
    }

    res.status(200).json({ message: "Message submitted successfully" });
  });
});

// POST endpoint to submit inquiry
app.post('/api/inquiries', (req, res) => {
  const { test_name, name, email, mobile, query } = req.body;

  if (!test_name || !name || !email || !mobile || !query) {
    return res.status(400).send('All fields are required.');
  }

  const sql = 'INSERT INTO inquiries (test_name, name, email, mobile, query) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [test_name, name, email, mobile, query], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).send('Error saving inquiry.');
    }
    res.status(201).send('Inquiry saved successfully.');
  });
});

app.get('/admin-dashboard/inquiries', (req, res) => {
    const query = 'SELECT * FROM inquiries WHERE status = 1 ORDER BY created_at DESC'; 
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching inquiries:", err);
        return res.status(500).send("Error fetching inquiries.");
      }
      res.status(200).json(results);
    });
});

// app.post("/reschedule-appointment", (req, res) => {
//   const { appointment_id, new_date } = req.body;

//   // Validate input fields
//   if (!appointment_id || !new_date) {
//     return res.status(400).json({ error: "Missing appointment_id or new_date" });
//   }

//   // Validate new_date in backend (check if it's today or future date)
//   const today = new Date();
//   const selectedDate = new Date(new_date);

//   if (selectedDate < today.setHours(0, 0, 0, 0)) {
//     return res.status(400).json({ error: "Invalid date. Must be today or later." });
//   }

//   console.log("appointment_id:", appointment_id, "new_date:", new_date);


//   const query = "UPDATE appointments SET appointment_date = ? WHERE id = ?";

//   db.execute(query, [new_date, appointment_id], (err, results) => {
//     if (err) {
//       console.error("Error updating appointment:", err);
//       return res.status(500).json({ error: "Failed to reschedule appointment" });
//     }

//     if (results.affectedRows === 0) {
//       return res.status(404).json({ error: "Appointment not found" });
//     }

//     const appointment = results[0]; // Get the existing appointment details
//     console.log("Fetched appointment details:", appointment);

//     res.status(200).json({ message: "Appointment rescheduled successfully" });

//     const rescheduledAppointment = {
//       email: appointment.email,
//       name: appointment.name,
//       service: appointment.service,
//       visit_type: appointment.visit_type,
//       old_date,
//       new_date,
//     };

//     try {
//       // Send reschedule confirmation email
//       sendRescheduleEmail(rescheduledAppointment);
//       res.status(200).json({ message: "Appointment rescheduled and email sent successfully" });
//     } catch (emailError) {
//       console.error("Error sending reschedule email:", emailError);
//       res.status(500).json({ error: "Appointment rescheduled but failed to send email" });
//     }
//   });
// });

app.post("/reschedule-appointment", (req, res) => {
  const { appointment_id, new_date } = req.body;

  // Validate input fields
  if (!appointment_id || !new_date) {
    return res.status(400).json({ error: "Missing appointment_id or new_date" });
  }

  // Validate new_date in the backend (check if it's today or future date)
  const today = new Date();
  const selectedDate = new Date(new_date);

  if (selectedDate < today.setHours(0, 0, 0, 0)) {
    return res.status(400).json({ error: "Invalid date. Must be today or later." });
  }

  console.log("appointment_id:", appointment_id, "new_date:", new_date);

  // Fetch the appointment details
  const fetchQuery = `
    SELECT appointments.id, appointments.service, appointments.visit_type, appointments.appointment_date AS old_date, 
           form_data.name, form_data.email
    FROM appointments
    JOIN form_data ON appointments.user_id = form_data.id
    WHERE appointments.id = ?
  `;

  db.execute(fetchQuery, [appointment_id], (err, results) => {
    if (err) {
      console.error("Error fetching appointment details:", err);
      return res.status(500).json({ error: "Error fetching appointment details" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Appointment not found" });
    }

    const appointment = results[0]; // Get the appointment details
    console.log("Fetched appointment details:", appointment);

    // Update the appointment with the new date
    const updateQuery = "UPDATE appointments SET appointment_date = ? WHERE id = ?";

    db.execute(updateQuery, [new_date, appointment_id], async (err, updateResults) => {
      if (err) {
        console.error("Error updating appointment:", err);
        return res.status(500).json({ error: "Failed to reschedule appointment" });
      }

      if (updateResults.affectedRows === 0) {
        return res.status(404).json({ error: "Appointment not found" });
      }

      console.log("Appointment rescheduled successfully");

      // Add the new date to the appointment object
      const rescheduledAppointment = {
        ...appointment,
        new_date,
      };

      try {
        // Send reschedule confirmation email
        await sendRescheduleEmail(rescheduledAppointment);
        res.status(200).json({ message: "Appointment rescheduled and email sent successfully" });
      } catch (emailError) {
        console.error("Error sending reschedule email:", emailError);
        res.status(500).json({ error: "Appointment rescheduled but failed to send email" });
      }
    });
  });
});

const sendRescheduleEmail = async (appointment) => {
  const { email, name, service, visit_type, old_date, new_date } = appointment;

  // Configure Nodemailer
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "swaragharat7@gmail.com", // Replace with your Gmail
      pass: "pesg kxij zgyi gjea",    // Replace with your App Password
    },
  });

  // Prepare email content
  const mailOptions = {
    from: "swaragharat7@gmail.com",
    to: email,
    subject: "LabSky Appointment Rescheduling Confirmation",
    html: `
      <h1>Appointment Rescheduling Confirmation</h1>
      <p>Hello ${name},</p>
      <p>Your appointment has been successfully rescheduled. Here are the updated details:</p>
      <ul>
        <li><strong>Service:</strong> ${service}</li>
        <li><strong>Visit Type:</strong> ${visit_type}</li>
        <li><strong>Previous Date:</strong> ${old_date}</li>
        <li><strong>New Date:</strong> ${new_date}</li>
      </ul>
      <p>If you have any further questions, feel free to contact us.</p>
      <p>Thank you for choosing our service!</p>
    `,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    console.log("Reschedule email sent successfully to:", email);
  } catch (error) {
    console.error("Error sending reschedule email:", error);
    throw error; // Propagate the error to handle it in the main flow
  }
};

app.post("/add-response", (req, res) => {
  const { id, response } = req.body;

  // Validate input fields
  if (!id || !response) {
    return res.status(400).json({ error: "Missing id or response" });
  }

  console.log("Received response:", response, "for message ID:", id);

  // Fetch the contact message to verify it exists
  const fetchQuery = "SELECT * FROM contact_messages WHERE id = ?";
  db.execute(fetchQuery, [id], (err, results) => {
    if (err) {
      console.error("Error fetching contact message:", err);
      return res.status(500).json({ error: "Error fetching contact message" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Contact message not found" });
    }

    const message = results[0];
    console.log("Fetched contact message:", message);

    // Update the contact message with the response
    const updateQuery = "UPDATE contact_messages SET response = ? WHERE id = ?";
    db.execute(updateQuery, [response, id], (err, updateResults) => {
      if (err) {
        console.error("Error updating response:", err);
        return res.status(500).json({ error: "Failed to add response" });
      }

      if (updateResults.affectedRows === 0) {
        return res.status(404).json({ error: "Contact message not found" });
      }

      console.log("Response added successfully");
      res.status(200).json({ message: "Response added successfully" });
    });
  });
});

app.post("/add-inquiry_response", (req, res) => {
  const { id, response } = req.body;

  // Validate input fields
  if (!id || !response) {
    return res.status(400).json({ error: "Missing id or response" });
  }

  console.log("Received response:", response, "for message ID:", id);

  // Fetch the contact message to verify it exists
  const fetchQuery = "SELECT * FROM inquiries WHERE id = ?";
  db.execute(fetchQuery, [id], (err, results) => {
    if (err) {
      console.error("Error fetching inquiry:", err);
      return res.status(500).json({ error: "Error fetching inquiry" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Inquiry not found" });
    }

    const inquiry = results[0];
    console.log("Fetched inquiry:", inquiry);

    // Update the contact message with the response
    const updateQuery = "UPDATE inquiries SET response = ? WHERE id = ?";
    db.execute(updateQuery, [response, id], (err, updateResults) => {
      if (err) {
        console.error("Error updating response:", err);
        return res.status(500).json({ error: "Failed to add response" });
      }

      if (updateResults.affectedRows === 0) {
        return res.status(404).json({ error: "Inquiry not found" });
      }

      console.log("Response added successfully");
      res.status(200).json({ message: "Response added successfully" });
    });
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
