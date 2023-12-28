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
  console.log("Form Data:", { name, email, message });

  // Create a Nodemailer transporter
  const transporter = nodemailer.createTransport({
    host: "trekhills.com.kaamkahani.com",
    port: 465,
    secure: false, // Use SSL/TLS
    auth: {
      user: "info@trekhills.com.kaamkahani.com",
      pass: "CiuxQiQ8gwPr78B",
    },
  });

  // Check if email is provided
  if (!email) {
    console.error("No email address provided");
    return res.status(400).json({ message: "No email address provided" });
  }

  // Email content
  let mailOptions = {
    from: "info@trekhills.com.kaamkahani.com",
    to: email,
    subject: "Confirmation Email",
    text: `Hello ${name},\n\nThank you for your message. We have received your inquiry and will get back to you soon.\n\nBest regards,\nThe Team`,
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      res.status(500).json({ message: "Error sending email" });
    } else {
      console.log("Email sent:", info.response);
      res.json({ message: "Form submitted successfully" });
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
