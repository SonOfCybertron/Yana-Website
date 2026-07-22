<?php
$rows = getDB()->query("SELECT department, email, phone, description FROM contact_directory WHERE is_active=1 ORDER BY sort_order ASC")->fetchAll();
jsonResponse(['data' => $rows]);
