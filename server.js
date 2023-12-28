const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve HTML file and static files
app.use(express.static(__dirname));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Handle form submission and send confirmation email
// Handle form submission and send confirmation email
app.post("/send-email", (req, res) => {
  const { name, email, message } = req.body;

  // Log form data for debugging
  console.log("Form Data from server:", { name, email, message });

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "arrehman1g@gmail.com", // Your Gmail email address
      pass: "afsd1423", // Your Gmail password or an app-specific password
    },
  });

  // Check if email is provided
  if (!email) {
    console.error("No email address provided");
    return res.status(400).json({ message: "No email address provided" });
  }

  // Email content
  let mailOptions = {
    from: "arrehman1g@gmail.com",
    to: email,
    subject: "Confirmation Email",
    text: `Hello ${name},\n\nThank you for your message. We have received your inquiry and will get back to you soon.\n\nBest regards,\nThe Team`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email yessss:", error);
      res.status(500).json({ message: "Error sending email yess" });
    } else {
      console.log("Email sent:", info.response);
      res.json({ message: "Form submitted successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
