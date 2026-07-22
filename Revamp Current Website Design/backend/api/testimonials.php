<?php
$rows = getDB()->query("SELECT quote, author, role, company FROM testimonials WHERE is_active=1 ORDER BY sort_order ASC")->fetchAll();
jsonResponse(['data' => $rows]);
