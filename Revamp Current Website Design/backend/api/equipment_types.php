<?php
$rows = getDB()->query("SELECT id, name, slug FROM equipment_types ORDER BY name ASC")->fetchAll();
jsonResponse(['data' => $rows]);
