<?php
/** POST /api/career-notifications */
$body = json_decode(file_get_contents('php://input'), true) ?? [];
if (empty($body['email']) || !filter_var($body['email'], FILTER_VALIDATE_EMAIL)) errorResponse('Valid email is required.');

$db   = getDB();
$stmt = $db->prepare("INSERT IGNORE INTO career_notifications (email) VALUES (:email)");
$stmt->execute([':email' => strtolower(trim($body['email']))]);
jsonResponse(['success' => true, 'message' => 'You will be notified when new positions open.'], 201);
