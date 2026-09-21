<?php
// contact.php - Ethical Genesis (Native PHP Mail - Admin Notification Only)

// 1. Setup CORS & Headers securely
$allowed_origins = [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://www.ethicalgenesis.ai',
    'https://ethicalgenesis.ai'
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

if (in_array($origin, $allowed_origins)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header("Access-Control-Allow-Origin: *"); // Fallback for local testing
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

// 3. Process Input
$rest_json = file_get_contents("php://input");
$input_data = json_decode($rest_json, true) ?? $_POST;

// 4. Honeypot Spam Check (Traps bots instantly)
if (!empty($input_data['honeypot'])) {
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Message sent."]);
    exit;
}

// 5. Sanitize and Validate
$name = isset($input_data["name"]) ? strip_tags(trim($input_data["name"])) : '';
$email = isset($input_data["email"]) ? filter_var(trim($input_data["email"]), FILTER_SANITIZE_EMAIL) : '';
$message = isset($input_data["message"]) ? strip_tags(trim($input_data["message"])) : '';

if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Invalid input. Please check your fields."]);
    exit;
}

$_SESSION['last_submit_time'] = time();

// ============================================================================
// EMAIL: SEND INQUIRY TO ETHICAL GENESIS ADMIN 
// ============================================================================
$admin_to = "info@ethicalgenesis.ai";
$admin_subject = "New Enterprise AI Inquiry from " . $name;

$admin_body = "You have received a new inquiry via the Ethical Genesis website.\n\n";
$admin_body .= "Name: " . $name . "\n";
$admin_body .= "Email: " . $email . "\n\n";
$admin_body .= "Message:\n" . $message . "\n";

// Strict anti-spam headers
$admin_headers = "MIME-Version: 1.0\r\n";
$admin_headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$admin_headers .= "From: Ethical Genesis Website <info@ethicalgenesis.ai>\r\n"; 
$admin_headers .= "Reply-To: " . $name . " <" . $email . ">\r\n";
$admin_headers .= "X-Mailer: PHP/" . phpversion();

// ============================================================================
// EXECUTE EMAIL (With Localhost Bypass for Testing)
// ============================================================================
$admin_sent = false;

// Check if we are running on localhost (127.0.0.1 or ::1)
if ($_SERVER['REMOTE_ADDR'] === '127.0.0.1' || $_SERVER['REMOTE_ADDR'] === '::1') {
    // FAKE SUCCESS FOR LOCAL TESTING (Bypasses the mail function since Windows has no SMTP server)
    $admin_sent = true; 
    error_log("Local Test: Email to Admin simulated successfully.");
} else {
    // REAL EXECUTION FOR PRODUCTION
    // The -f flag helps prevent GoDaddy emails from bouncing
    $admin_sent = mail($admin_to, $admin_subject, $admin_body, $admin_headers, "-finfo@ethicalgenesis.ai");
}

// Respond back to React
if ($admin_sent) {
    http_response_code(200);
    echo json_encode(["status" => "success", "message" => "Message sent successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Server failed to send email. Please check host configuration."]);
}
?>