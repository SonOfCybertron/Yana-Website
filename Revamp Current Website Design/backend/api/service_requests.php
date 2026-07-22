<?php
/** POST /api/service-requests */

$body = json_decode(file_get_contents('php://input'), true) ?? [];

foreach (['name', 'email', 'concern'] as $f) {
    if (empty(trim($body[$f] ?? ''))) errorResponse("Field '$f' is required.");
}
if (!filter_var($body['email'], FILTER_VALIDATE_EMAIL)) errorResponse('Invalid email address.');

$db   = getDB();
$stmt = $db->prepare("
    INSERT INTO service_requests (name, company, email, phone, service_type, concern, preferred_date, ip_address)
    VALUES (:name, :company, :email, :phone, :service_type, :concern, :preferred_date, :ip)
");
$stmt->execute([
    ':name'           => substr(trim($body['name']),            0, 150),
    ':company'        => substr(trim($body['company'] ?? ''),   0, 200),
    ':email'          => substr(trim($body['email']),           0, 200),
    ':phone'          => substr(trim($body['phone'] ?? ''),     0, 50),
    ':service_type'   => substr(trim($body['service_type'] ?? ''), 0, 100),
    ':concern'        => trim($body['concern']),
    ':preferred_date' => !empty($body['preferred_date']) ? $body['preferred_date'] : null,
    ':ip'             => $_SERVER['REMOTE_ADDR'] ?? null,
]);

jsonResponse(['success' => true, 'message' => 'Service request submitted. Our team will contact you shortly.'], 201);
