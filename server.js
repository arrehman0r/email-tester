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
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Validate form data
    if (!name || !email || !message) {
      throw new Error("Invalid form data");
    }

    // Create a Nodemailer transporter for Trekhills mail server
    const transporter = nodemailer.createTransport({
      host: "trekhills.com.kaamkahani.com",
      port: 465,
      secure: true, // Use SSL/TLS
      auth: {
        user: "info@trekhills.com.kaamkahani.com",
        pass: "CiuxQiQ8gwPr78B", // Replace with the actual password
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
      subject: "Test Email",
      text: `Hello ${name},\n\nThis is a test email from your local server.\n\nBest regards,\nThe Team`,
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);

    // Send a success response
    res.json({ message: "Form submitted successfully" });
  } catch (error) {
    console.error("Error:", error);

    // Send an error response
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
