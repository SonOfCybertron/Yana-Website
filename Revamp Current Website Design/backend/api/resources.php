<?php
/**
 * GET /api/resources
 * Query: search, type (Manual|Certificate|Datasheet|Product Document), brand (slug), page, limit
 */

['page' => $page, 'limit' => $limit, 'offset' => $offset] = getPaginationParams();

$db    = getDB();
$where = ['d.is_public = 1'];
$params = [];

if (!empty($_GET['search'])) {
    $where[]          = 'MATCH(d.title) AGAINST(:search IN BOOLEAN MODE)';
    $params[':search'] = $_GET['search'] . '*';
}
if (!empty($_GET['type'])) {
    $where[]       = 'd.doc_type = :type';
    $params[':type'] = $_GET['type'];
}
if (!empty($_GET['brand'])) {
    $where[]          = 'b.slug = :brand';
    $params[':brand'] = $_GET['brand'];
}

$whereClause = 'WHERE ' . implode(' AND ', $where);

$countSql  = "SELECT COUNT(*) FROM product_documents d LEFT JOIN brands b ON b.id = d.brand_id $whereClause";
$countStmt = $db->prepare($countSql);
$countStmt->execute($params);
$total     = (int)$countStmt->fetchColumn();

$sql  = "
    SELECT d.id, d.title, d.doc_type AS type, d.file_url, d.file_size AS size,
           d.file_format AS format, DATE_FORMAT(d.published_at, '%Y-%m') AS date,
           b.name AS brand, b.slug AS brand_slug
    FROM product_documents d
    LEFT JOIN brands b ON b.id = d.brand_id
    $whereClause
    ORDER BY d.doc_type ASC, d.published_at DESC
    LIMIT :limit OFFSET :offset
";
$stmt = $db->prepare($sql);
foreach ($params as $key => $val) $stmt->bindValue($key, $val);
$stmt->bindValue(':limit',  $limit,  PDO::PARAM_INT);
$stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
$stmt->execute();

jsonResponse([
    'data' => $stmt->fetchAll(),
    'meta' => ['total' => $total, 'page' => $page, 'limit' => $limit, 'total_pages' => (int)ceil($total / $limit)],
]);
