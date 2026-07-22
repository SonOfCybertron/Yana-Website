<?php
$rows = getDB()->query("SELECT id, name, slug, logo_url, website FROM brands WHERE is_active=1 ORDER BY sort_order ASC")->fetchAll();
jsonResponse(['data' => $rows]);
