<?php
$rows = getDB()->query("SELECT id, name, slug, parent_id FROM categories WHERE is_active=1 ORDER BY sort_order ASC")->fetchAll();
jsonResponse(['data' => $rows]);
