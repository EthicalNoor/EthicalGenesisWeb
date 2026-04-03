<?php
// contact.php - Production Ready

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// 1. Setup CORS & Headers securely
$allowed_origins = [
    'http://localhost:5173', // Vite local dev
    'https://www.ethicalgenesis.ai', // Your production domain
    'https://ethicalgenesis.ai'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    // If not in allowed list, reject CORS
    header("Access-Control-Allow-Origin: null");
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Accept");
header("Content-Type: application/json; charset=UTF-8");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// 2. Rate Limiting (Session based)
session_start();
$time_between_requests = 30; // seconds
if (isset($_SESSION['last_submit_time'])) {
    if (time() - $_SESSION['last_submit_time'] < $time_between_requests) {
        http_response_code(429);
        echo json_encode(["status" => "error", "message" => "Too many requests. Please wait a moment."]);
        exit;
    }
}

// 3. Process Input (Supports both application/json and multipart/form-data)
$input_data = [];
$content_type = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if (strpos($content_type, 'application/json') !== false) {
    $raw_input = file_get_contents('php://input');
    $input_data = json_decode($raw_input, true);
} else {
    $input_data = $_POST;
}

// 4. Honeypot Spam Check
if (!empty($input_data['honeypot'])) {
    // Silently accept to fool bots, but do nothing
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Message sent."]);
    exit;
}

// 5. Sanitize and Validate
$name = isset($input_data["name"]) ? strip_tags(trim($input_data["name"])) : '';
$email = isset($input_data["email"]) ? filter_var(trim($input_data["email"]), FILTER_SANITIZE_EMAIL) : '';
$message = isset($input_data["message"]) ? htmlspecialchars(trim($input_data["message"])) : '';

if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid input. Please check your fields."]);
    exit;
}

// Update last submit time for rate limiting
$_SESSION['last_submit_time'] = time();

// 6. Require PHPMailer (Ensure you ran `composer require phpmailer/phpmailer`)
require 'vendor/autoload.php';

$mail = new PHPMailer(true);

try {
    // Server settings
    $mail->isSMTP();
    $mail->Host       = 'smtp.yourprovider.com'; // e.g., smtp.gmail.com or smtp.zoho.com
    $mail->SMTPAuth   = true;
    $mail->Username   = 'noreply@ethicalgenesis.ai'; // SMTP username
    $mail->Password   = 'YOUR_APP_PASSWORD';         // SMTP password or App Password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;
    $mail->CharSet    = 'UTF-8';

    // --------------------------------------------------------
    // Email 1: To the Admin
    // --------------------------------------------------------
    $mail->setFrom('noreply@ethicalgenesis.ai', 'Ethical Genesis Website');
    $mail->addAddress('info@ethicalgenesis.ai', 'Ethical Genesis Admin');
    $mail->addReplyTo($email, $name);

    $mail->isHTML(true);
    $mail->Subject = 'New Enterprise AI Inquiry from ' . $name;
    $mail->Body    = "
        <h3>New Inquiry via Ethical Genesis</h3>
        <p><strong>Name:</strong> {$name}</p>
        <p><strong>Email:</strong> {$email}</p>
        <p><strong>Message:</strong></p>
        <blockquote style='border-left: 4px solid #3b82f6; padding-left: 10px;'>
            " . nl2br($message) . "
        </blockquote>
    ";
    
    $mail->send();

    // --------------------------------------------------------
    // Email 2: Auto-Reply to the User
    // --------------------------------------------------------
    $mail->clearAddresses();
    $mail->clearReplyTos();
    
    $mail->addAddress($email, $name);
    $mail->addReplyTo('info@ethicalgenesis.ai', 'Ethical Genesis Support');
    
    $mail->Subject = 'We have received your message - Ethical Genesis';
    $mail->Body    = "
        <div style='font-family: Arial, sans-serif; color: #111827; line-height: 1.6;'>
            <h2>Thank you for reaching out, {$name}.</h2>
            <p>This is an automated confirmation that we have received your inquiry regarding our enterprise AI solutions.</p>
            <p>Our engineering and consulting team is reviewing your message and will follow up with you shortly.</p>
            <br>
            <p>Best regards,<br><strong>The Ethical Genesis Team</strong></p>
            <p style='color: #6b7280; font-size: 12px;'>This email was automatically generated. Please do not reply directly to this address unless required.</p>
        </div>
    ";

    $mail->send();

    // Success Response
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Message sent successfully."]);

} catch (Exception $e) {
    // Log error to a secure file, do NOT expose detailed SMTP errors to the frontend
    error_log("Mail Error: {$mail->ErrorInfo}");
    
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "A server error occurred while sending your message. Please try again later."]);
}