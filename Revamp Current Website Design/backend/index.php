<?php
/**
 * Yana Chemodities Inc. — PHP REST API Router
 * Base URL: /api/
 *
 * Routes:
 *   GET    /api/products              List products (filterable, paginated)
 *   GET    /api/products/{id}         Single product with specs & images
 *   GET    /api/brands                All active brands
 *   GET    /api/categories            All active categories (with tree)
 *   GET    /api/equipment-types       All equipment types
 *   GET    /api/resources             Documents (filterable)
 *   GET    /api/faqs                  All FAQs
 *   GET    /api/testimonials          Active testimonials
 *   GET    /api/services              All active services
 *   GET    /api/contact-directory     Department contacts
 *   POST   /api/inquiries             Submit inquiry / quote / callback
 *   POST   /api/service-requests      Submit service request
 *   POST   /api/support-tickets       Submit support ticket
 *   POST   /api/career-notifications  Subscribe to career alerts
 */

declare(strict_types=1);

require_once __DIR__ . '/config/database.php';
require_once __DIR__ . '/middleware/cors.php';

setCorsHeaders();

$uri    = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri    = rtrim(preg_replace('#^/api#', '', $uri), '/');
$method = $_SERVER['REQUEST_METHOD'];

// Segment the URI: /products/5 → ['products', '5']
$segments = array_values(array_filter(explode('/', $uri)));
$resource = $segments[0] ?? '';
$id       = isset($segments[1]) ? (int)$segments[1] : null;

try {
    match (true) {
        // ── Products ────────────────────────────────────────────
        $resource === 'products' && $method === 'GET' && $id === null
            => require __DIR__ . '/api/products.php',

        $resource === 'products' && $method === 'GET' && $id > 0
            => require __DIR__ . '/api/product.php',

        // ── Lookup tables ────────────────────────────────────────
        $resource === 'brands'          && $method === 'GET' => require __DIR__ . '/api/brands.php',
        $resource === 'categories'      && $method === 'GET' => require __DIR__ . '/api/categories.php',
        $resource === 'equipment-types' && $method === 'GET' => require __DIR__ . '/api/equipment_types.php',
        $resource === 'services'        && $method === 'GET' => require __DIR__ . '/api/services.php',
        $resource === 'faqs'            && $method === 'GET' => require __DIR__ . '/api/faqs.php',
        $resource === 'testimonials'    && $method === 'GET' => require __DIR__ . '/api/testimonials.php',
        $resource === 'contact-directory' && $method === 'GET' => require __DIR__ . '/api/contact_directory.php',

        // ── Resources (documents) ────────────────────────────────
        $resource === 'resources' && $method === 'GET' => require __DIR__ . '/api/resources.php',

        // ── Form submissions ─────────────────────────────────────
        $resource === 'inquiries'             && $method === 'POST' => require __DIR__ . '/api/inquiries.php',
        $resource === 'service-requests'      && $method === 'POST' => require __DIR__ . '/api/service_requests.php',
        $resource === 'support-tickets'       && $method === 'POST' => require __DIR__ . '/api/support_tickets.php',
        $resource === 'career-notifications'  && $method === 'POST' => require __DIR__ . '/api/career_notifications.php',

        default => errorResponse('Endpoint not found', 404),
    };
} catch (PDOException $e) {
    error_log('DB Error: ' . $e->getMessage());
    errorResponse('Database error. Please try again later.', 500);
} catch (Throwable $e) {
    error_log('Error: ' . $e->getMessage());
    errorResponse('Internal server error.', 500);
}
