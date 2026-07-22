<?php
/**
 * GET /api/products
 *
 * Query params:
 *   search    string   Full-text keyword
 *   brand     string   Brand slug
 *   category  string   Category slug
 *   type      string   Equipment type slug
 *   tag       string   'Featured' | 'Best Seller' | 'New'
 *   page      int      Default 1
 *   limit     int      Default 20, max 100
 */

['page' => $page, 'limit' => $limit, 'offset' => $offset] = getPaginationParams();

$db     = getDB();
$where  = ['p.is_active = 1'];
$params = [];

if (!empty($_GET['search'])) {
    $where[]         = 'MATCH(p.name, p.description, p.short_description) AGAINST(:search IN BOOLEAN MODE)';
    $params[':search'] = $_GET['search'] . '*';
}
if (!empty($_GET['brand'])) {
    $where[]          = 'b.slug = :brand';
    $params[':brand'] = $_GET['brand'];
}
if (!empty($_GET['category'])) {
    $where[]             = 'cat.slug = :category';
    $params[':category'] = $_GET['category'];
}
if (!empty($_GET['type'])) {
    $where[]        = 'et.slug = :type';
    $params[':type'] = $_GET['type'];
}
if (!empty($_GET['tag'])) {
    $where[]       = 'p.tag = :tag';
    $params[':tag'] = $_GET['tag'];
}

$whereClause = 'WHERE ' . implode(' AND ', $where);

// Count total
$countSql = "
    SELECT COUNT(*) FROM products p
    JOIN brands b      ON b.id = p.brand_id
    JOIN categories cat ON cat.id = p.category_id
    LEFT JOIN equipment_types et ON et.id = p.equipment_type_id
    $whereClause
";
$countStmt = $db->prepare($countSql);
$countStmt->execute($params);
$total = (int)$countStmt->fetchColumn();

// Fetch page
$sql = "
    SELECT
        p.id, p.sku, p.name, p.slug, p.tag,
        p.short_description AS description,
        b.name  AS brand,  b.slug  AS brand_slug,
        cat.name AS category, cat.slug AS category_slug,
        et.name  AS equipment_type,
        pi.url   AS image
    FROM products p
    JOIN brands b         ON b.id  = p.brand_id
    JOIN categories cat   ON cat.id = p.category_id
    LEFT JOIN equipment_types et ON et.id = p.equipment_type_id
    LEFT JOIN product_images  pi ON pi.product_id = p.id AND pi.is_primary = 1
    $whereClause
    ORDER BY p.sort_order ASC, p.id DESC
    LIMIT :limit OFFSET :offset
";

$stmt = $db->prepare($sql);
foreach ($params as $key => $val) {
    $stmt->bindValue($key, $val);
}
$stmt->bindValue(':limit',  $limit,  PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();
$products = $stmt->fetchAll();

jsonResponse([
    'data' => $products,
    'meta' => [
        'total'       => $total,
        'page'        => $page,
        'limit'       => $limit,
        'total_pages' => (int)ceil($total / $limit),
    ],
]);
