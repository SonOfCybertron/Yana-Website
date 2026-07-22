<?php
/** POST /api/support-tickets */

$body = json_decode(file_get_contents('php://input'), true) ?? [];

foreach (['name', 'email', 'description'] as $f) {
    if (empty(trim($body[$f] ?? ''))) errorResponse("Field '$f' is required.");
}
if (!filter_var($body['email'], FILTER_VALIDATE_EMAIL)) errorResponse('Invalid email address.');

// Generate ticket number: YC-YYYYMMDD-XXXXX
$ticketNo = 'YC-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -5));

$allowed   = ['Low', 'Medium', 'High'];
$priority  = in_array($body['priority'] ?? '', $allowed, true) ? $body['priority'] : 'Medium';

$db   = getDB();
$stmt = $db->prepare("
    INSERT INTO support_tickets (ticket_no, priority, category, name, email, description, ip_address)
    VALUES (:ticket_no, :priority, :category, :name, :email, :description, :ip)
");
$stmt->execute([
    ':ticket_no'   => $ticketNo,
    ':priority'    => $priority,
    ':category'    => substr(trim($body['category'] ?? 'General'), 0, 100),
    ':name'        => substr(trim($body['name']),  0, 150),
    ':email'       => substr(trim($body['email']), 0, 200),
    ':description' => trim($body['description']),
    ':ip'          => $_SERVER['REMOTE_ADDR'] ?? null,
]);

jsonResponse([
    'success'   => true,
    'ticket_no' => $ticketNo,
    'message'   => "Support ticket $ticketNo submitted. We will respond within 1 business day.",
], 201);
