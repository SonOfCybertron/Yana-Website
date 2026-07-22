<?php
$rows = getDB()->query("SELECT id, question, answer, category FROM faqs WHERE is_active=1 ORDER BY sort_order ASC")->fetchAll();
jsonResponse(['data' => $rows]);
