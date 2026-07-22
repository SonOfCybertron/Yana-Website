<?php
/** GET /api/products/{id} — Single product with specs, images, documents */

$db = getDB();

$stmt = $db->prepare("
    SELECT
        p.id, p.sku, p.name, p.slug, p.tag,
        p.description, p.short_description,
        b.name AS brand,  b.slug AS brand_slug,
        cat.name AS category, cat.slug AS category_slug,
        et.name  AS equipment_type
    FROM products p
    JOIN brands b         ON b.id   = p.brand_id
    JOIN categories cat   ON cat.id = p.category_id
    LEFT JOIN equipment_types et ON et.id = p.equipment_type_id
    WHERE p.id = :id AND p.is_active = 1
");
$stmt->execute([':id' => $id]);
$product = $stmt->fetch();

if (!$product) {
    errorResponse('Product not found', 404);
}

// Images
$imgStmt = $db->prepare("
    SELECT url, alt_text, is_primary
    FROM product_images
    WHERE product_id = :id
    ORDER BY is_primary DESC, sort_order ASC
");
$imgStmt->execute([':id' => $id]);
$product['images'] = $imgStmt->fetchAll();

// Specs
$specStmt = $db->prepare("
    SELECT spec_key AS `key`, spec_value AS `value`
    FROM product_specs
    WHERE product_id = :id
    ORDER BY sort_order ASC
");
$specStmt->execute([':id' => $id]);
$product['specs'] = $specStmt->fetchAll();

// Documents (datasheets, manuals, brochures)
$docStmt = $db->prepare("
    SELECT title, doc_type, file_url, file_size, file_format, published_at
    FROM product_documents
    WHERE product_id = :id AND is_public = 1
    ORDER BY doc_type ASC
");
$docStmt->execute([':id' => $id]);
$product['documents'] = $docStmt->fetchAll();

jsonResponse(['data' => $product]);
