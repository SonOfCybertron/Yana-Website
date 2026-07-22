<?php
$rows = getDB()->query("SELECT id, title, slug, description, icon, image_url, features FROM services WHERE is_active=1 ORDER BY sort_order ASC")->fetchAll();
foreach ($rows as &$r) $r['features'] = $r['features'] ? json_decode($r['features']) : [];
jsonResponse(['data' => $rows]);
