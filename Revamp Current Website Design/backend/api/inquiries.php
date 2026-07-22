<?php
/**
 * POST /api/inquiries
 * Handles: Product Inquiry, Request Quote, Callback, General Inquiry, Consultation
 *
 * Body (JSON):
 *   type*        string
 *   name*        string
 *   email*       string
 *   company      string
 *   phone        string
 *   address      string
 *   product_id   int
 *   product_name string
 *   message*     string
 *   preferred_time string  (for callbacks)
 */

$body = json_decode(file_get_contents('php://input'), true) ?? [];

// Validate required fields
$required = ['name', 'email', 'message'];
foreach ($required as $field) {
    if (empty(trim($body[$field] ?? ''))) {
        errorResponse("Field '$field' is required.");
    }
}
if (!filter_var($body['email'], FILTER_VALIDATE_EMAIL)) {
    errorResponse('Invalid email address.');
}

$allowedTypes = ['Product Inquiry','Request Quote','Service Request','Request Consultation','General Inquiry','Callback'];
$type = in_array($body['type'] ?? '', $allowedTypes, true) ? $body['type'] : 'General Inquiry';

$db   = getDB();
$stmt = $db->prepare("
    INSERT INTO inquiries
        (type, name, company, email, phone, address, product_id, product_name, message, preferred_time, ip_address)
    VALUES
        (:type, :name, :company, :email, :phone, :address, :product_id, :product_name, :message, :preferred_time, :ip)
");

$stmt->execute([
    ':type'           => $type,
    ':name'           => substr(trim($body['name']),         0, 150),
    ':company'        => substr(trim($body['company'] ?? ''), 0, 200),
    ':email'          => substr(trim($body['email']),        0, 200),
    ':phone'          => substr(trim($body['phone'] ?? ''),  0, 50),
    ':address'        => trim($body['address']       ?? ''),
    ':product_id'     => !empty($body['product_id']) ? (int)$body['product_id'] : null,
    ':product_name'   => substr(trim($body['product_name'] ?? ''), 0, 300),
    ':message'        => trim($body['message']),
    ':preferred_time' => substr(trim($body['preferred_time'] ?? ''), 0, 50),
    ':ip'             => $_SERVER['REMOTE_ADDR'] ?? null,
]);

// TODO: Send notification email via PHPMailer/SMTP
// sendNotificationEmail($type, $body);

jsonResponse([
    'success' => true,
    'message' => 'Your inquiry has been submitted. We will get back to you within 24 hours.',
    'id'      => (int)$db->lastInsertId(),
], 201);
