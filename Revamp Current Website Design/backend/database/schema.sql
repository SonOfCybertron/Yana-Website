-- ============================================================
-- YANA CHEMODITIES INC. — MySQL Database Schema
-- Engine: InnoDB | Charset: utf8mb4
-- ============================================================

CREATE DATABASE IF NOT EXISTS yana_chemodities
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE yana_chemodities;

-- ─── BRANDS ──────────────────────────────────────────────────
CREATE TABLE brands (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  slug        VARCHAR(100) NOT NULL UNIQUE,
  logo_url    VARCHAR(500),
  website     VARCHAR(500),
  description TEXT,
  is_active   TINYINT(1) NOT NULL DEFAULT 1,
  sort_order  SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_slug (slug),
  INDEX idx_active (is_active)
);

-- ─── CATEGORIES ──────────────────────────────────────────────
CREATE TABLE categories (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(150) NOT NULL,
  slug        VARCHAR(150) NOT NULL UNIQUE,
  parent_id   INT UNSIGNED DEFAULT NULL,
  description TEXT,
  image_url   VARCHAR(500),
  is_active   TINYINT(1) NOT NULL DEFAULT 1,
  sort_order  SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL,
  INDEX idx_parent (parent_id),
  INDEX idx_slug (slug)
);

-- ─── EQUIPMENT TYPES ─────────────────────────────────────────
CREATE TABLE equipment_types (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(150) NOT NULL,
  slug       VARCHAR(150) NOT NULL UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── PRODUCTS ────────────────────────────────────────────────
CREATE TABLE products (
  id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  sku              VARCHAR(100) UNIQUE,
  name             VARCHAR(300) NOT NULL,
  slug             VARCHAR(300) NOT NULL UNIQUE,
  brand_id         INT UNSIGNED NOT NULL,
  category_id      INT UNSIGNED NOT NULL,
  equipment_type_id INT UNSIGNED DEFAULT NULL,
  description      TEXT,
  short_description VARCHAR(500),
  tag              ENUM('Featured','Best Seller','New','') DEFAULT '',
  is_active        TINYINT(1) NOT NULL DEFAULT 1,
  sort_order       SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (brand_id)          REFERENCES brands(id)          ON DELETE RESTRICT,
  FOREIGN KEY (category_id)       REFERENCES categories(id)      ON DELETE RESTRICT,
  FOREIGN KEY (equipment_type_id) REFERENCES equipment_types(id) ON DELETE SET NULL,
  INDEX idx_brand    (brand_id),
  INDEX idx_category (category_id),
  INDEX idx_tag      (tag),
  INDEX idx_active   (is_active),
  FULLTEXT idx_search (name, description, short_description)
);

-- ─── PRODUCT IMAGES ──────────────────────────────────────────
CREATE TABLE product_images (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id INT UNSIGNED NOT NULL,
  url        VARCHAR(500) NOT NULL,
  alt_text   VARCHAR(300),
  is_primary TINYINT(1) NOT NULL DEFAULT 0,
  sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product  (product_id),
  INDEX idx_primary  (is_primary)
);

-- ─── PRODUCT SPECIFICATIONS ──────────────────────────────────
CREATE TABLE product_specs (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id INT UNSIGNED NOT NULL,
  spec_key   VARCHAR(150) NOT NULL,
  spec_value VARCHAR(300) NOT NULL,
  sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
  INDEX idx_product (product_id)
);

-- ─── PRODUCT DOCUMENTS (datasheets, manuals, brochures) ──────
CREATE TABLE product_documents (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id  INT UNSIGNED DEFAULT NULL,
  brand_id    INT UNSIGNED DEFAULT NULL,
  title       VARCHAR(300) NOT NULL,
  doc_type    ENUM('Manual','Certificate','Datasheet','Product Document') NOT NULL,
  file_url    VARCHAR(500) NOT NULL,
  file_size   VARCHAR(20),
  file_format VARCHAR(10) DEFAULT 'PDF',
  is_public   TINYINT(1) NOT NULL DEFAULT 1,
  published_at DATE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
  FOREIGN KEY (brand_id)   REFERENCES brands(id)   ON DELETE SET NULL,
  INDEX idx_product  (product_id),
  INDEX idx_brand    (brand_id),
  INDEX idx_doc_type (doc_type),
  FULLTEXT idx_search (title)
);

-- ─── SERVICES ────────────────────────────────────────────────
CREATE TABLE services (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(200) NOT NULL,
  slug        VARCHAR(200) NOT NULL UNIQUE,
  description TEXT,
  icon        VARCHAR(50),
  image_url   VARCHAR(500),
  features    JSON,
  is_active   TINYINT(1) NOT NULL DEFAULT 1,
  sort_order  SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── FAQS ────────────────────────────────────────────────────
CREATE TABLE faqs (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  question   TEXT NOT NULL,
  answer     TEXT NOT NULL,
  category   VARCHAR(100) DEFAULT 'General',
  sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  is_active  TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_category (category),
  FULLTEXT idx_search (question, answer)
);

-- ─── TESTIMONIALS ────────────────────────────────────────────
CREATE TABLE testimonials (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  quote      TEXT NOT NULL,
  author     VARCHAR(150) NOT NULL,
  role       VARCHAR(200),
  company    VARCHAR(200),
  is_active  TINYINT(1) NOT NULL DEFAULT 1,
  sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── CONTACT DIRECTORY ───────────────────────────────────────
CREATE TABLE contact_directory (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  department VARCHAR(150) NOT NULL,
  email      VARCHAR(200),
  phone      VARCHAR(50),
  description VARCHAR(300),
  sort_order SMALLINT UNSIGNED NOT NULL DEFAULT 0,
  is_active  TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── INQUIRIES (Contact / Product Inquiry / Quote Requests) ──
CREATE TABLE inquiries (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  type         ENUM('Product Inquiry','Request Quote','Service Request','Request Consultation','General Inquiry','Callback') NOT NULL DEFAULT 'General Inquiry',
  status       ENUM('new','in_progress','resolved','closed') NOT NULL DEFAULT 'new',
  name         VARCHAR(150) NOT NULL,
  company      VARCHAR(200),
  email        VARCHAR(200) NOT NULL,
  phone        VARCHAR(50),
  address      TEXT,
  product_id   INT UNSIGNED DEFAULT NULL,
  product_name VARCHAR(300),
  message      TEXT NOT NULL,
  preferred_time VARCHAR(50),
  priority     ENUM('Low','Medium','High') DEFAULT 'Medium',
  ip_address   VARCHAR(45),
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE SET NULL,
  INDEX idx_type      (type),
  INDEX idx_status    (status),
  INDEX idx_email     (email),
  INDEX idx_created   (created_at)
);

-- ─── SERVICE REQUESTS ────────────────────────────────────────
CREATE TABLE service_requests (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  status       ENUM('new','scheduled','in_progress','completed','cancelled') NOT NULL DEFAULT 'new',
  service_id   INT UNSIGNED DEFAULT NULL,
  name         VARCHAR(150) NOT NULL,
  company      VARCHAR(200),
  email        VARCHAR(200) NOT NULL,
  phone        VARCHAR(50),
  service_type VARCHAR(100),
  concern      TEXT NOT NULL,
  preferred_date DATE DEFAULT NULL,
  ip_address   VARCHAR(45),
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (service_id) REFERENCES services(id) ON DELETE SET NULL,
  INDEX idx_status  (status),
  INDEX idx_created (created_at)
);

-- ─── SUPPORT TICKETS ─────────────────────────────────────────
CREATE TABLE support_tickets (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  ticket_no   VARCHAR(20) NOT NULL UNIQUE,
  status      ENUM('open','in_progress','resolved','closed') NOT NULL DEFAULT 'open',
  priority    ENUM('Low','Medium','High') NOT NULL DEFAULT 'Medium',
  category    VARCHAR(100),
  name        VARCHAR(150) NOT NULL,
  email       VARCHAR(200) NOT NULL,
  description TEXT NOT NULL,
  resolved_at TIMESTAMP NULL,
  ip_address  VARCHAR(45),
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_ticket_no (ticket_no),
  INDEX idx_status    (status),
  INDEX idx_email     (email)
);

-- ─── NEWSLETTER / CAREER NOTIFICATIONS ───────────────────────
CREATE TABLE career_notifications (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  email      VARCHAR(200) NOT NULL UNIQUE,
  is_active  TINYINT(1) NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ─── ADMIN USERS ─────────────────────────────────────────────
CREATE TABLE admin_users (
  id            INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name          VARCHAR(150) NOT NULL,
  email         VARCHAR(200) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  role          ENUM('admin','editor','viewer') NOT NULL DEFAULT 'editor',
  is_active     TINYINT(1) NOT NULL DEFAULT 1,
  last_login    TIMESTAMP NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ─── SEED: BRANDS ────────────────────────────────────────────
INSERT INTO brands (name, slug, sort_order) VALUES
  ('Advantech', 'advantech', 1),
  ('Asecos',    'asecos',    2),
  ('Atago',     'atago',     3),
  ('Brand',     'brand',     4),
  ('Corning',   'corning',   5),
  ('Elma',      'elma',      6),
  ('Miele',     'miele',     7),
  ('Metrohm',   'metrohm',   8),
  ('Sartorius', 'sartorius', 9),
  ('Thermo Fisher', 'thermo-fisher', 10);

-- ─── SEED: CATEGORIES ────────────────────────────────────────
INSERT INTO categories (name, slug, sort_order) VALUES
  ('Equipments',                      'equipments',                       1),
  ('Laboratory Glass & Plastic Wares','laboratory-glass-plastic-wares',   2),
  ('Industrial Line',                 'industrial-line',                  3),
  ('Chemicals',                       'chemicals',                        4),
  ('Miscellaneous',                   'miscellaneous',                    5);

-- ─── SEED: EQUIPMENT TYPES ───────────────────────────────────
INSERT INTO equipment_types (name, slug) VALUES
  ('Analytical Instruments', 'analytical-instruments'),
  ('Centrifuges',             'centrifuges'),
  ('Dispensers & Burettes',   'dispensers-burettes'),
  ('Filtration',              'filtration'),
  ('Measuring & Monitoring',  'measuring-monitoring'),
  ('Sieves & Shakers',        'sieves-shakers'),
  ('Sonicators',              'sonicators'),
  ('Storage Cabinets',        'storage-cabinets');

-- ─── SEED: SERVICES ──────────────────────────────────────────
INSERT INTO services (title, slug, description, icon, sort_order) VALUES
  ('Calibration',           'calibration',           'ISO 17025-accredited calibration services for all analytical instruments.',           'Gauge',         1),
  ('Testing and Certification', 'testing-certification', 'Comprehensive testing and certification programs against ISO, ASTM, and Philippine standards.', 'Shield',    2),
  ('Repair',                'repair',                'Expert repair services by factory-trained technicians with genuine spare parts.',      'Wrench',        3),
  ('Preventive Maintenance','preventive-maintenance','Scheduled programs to maximize equipment uptime and maintain GMP/GLP compliance.',     'CheckCircle',   4);

-- ─── SEED: FAQS ──────────────────────────────────────────────
INSERT INTO faqs (question, answer, category, sort_order) VALUES
  ('How do I request a product quote?',
   'Click "Request Quote" on any product page, use our Quick Access panel, or contact our sales team directly. We respond within 24 business hours.',
   'Sales', 1),
  ('Do you offer after-sales support and warranties?',
   'Yes. All products come with manufacturer warranties. We also offer calibration, repair, preventive maintenance, and testing services.',
   'Support', 2),
  ('Which areas in the Philippines do you serve?',
   'We have offices in Quezon City (Manila) and Cebu City. Technical and delivery services cover all of Luzon, Visayas, and Mindanao.',
   'General', 3),
  ('Can I download product datasheets and manuals?',
   'Yes. Product datasheets, brochures, and safety documents are available in our Resource Library.',
   'Resources', 4),
  ('How do I schedule a calibration service?',
   'Visit our Services page and fill out the service request form, or contact our service department directly.',
   'Services', 5),
  ('Do you carry genuine brand products?',
   'Yes. We are an authorized distributor for all brands we carry, sourced directly from manufacturers.',
   'General', 6),
  ('What is your lead time for orders?',
   'In-stock items ship within 1–3 business days. Imported or made-to-order equipment: 2–8 weeks.',
   'Sales', 7),
  ('Can you provide ISO certification documents?',
   'Yes. ISO calibration certificates, test reports, and compliance documentation are available upon request.',
   'Services', 8);

-- ─── SEED: TESTIMONIALS ──────────────────────────────────────
INSERT INTO testimonials (quote, author, role, company, sort_order) VALUES
  ('Yana has been our trusted supplier for over 15 years. Their technical expertise and after-sales support are unmatched in the Philippines.',
   'Dr. Maria Santos', 'Lab Manager', 'University of Santo Tomas', 1),
  ('The calibration team is exceptionally professional. Our instruments are always returned on time and in perfect condition.',
   'Engr. Jose Reyes', 'QC Head', 'San Miguel Corporation', 2),
  ('Competitive pricing, genuine products, and responsive sales team. Yana Chemodities is our go-to for all lab equipment needs.',
   'Ms. Christine Lim', 'Procurement Manager', 'Philippine Heart Center', 3);

-- ─── SEED: CONTACT DIRECTORY ─────────────────────────────────
INSERT INTO contact_directory (department, email, phone, description, sort_order) VALUES
  ('Product Sales',      'sales@yanachemodities.com',    '+63 927 794 3497', 'Product inquiries, quotations, and orders',                      1),
  ('Technical Service',  'service@yanachemodities.com',  '+63 956 235 5483', 'Calibration, repair, and maintenance scheduling',                2),
  ('Customer Support',   'support@yanachemodities.com',  '+63 956 235 5484', 'After-sales support, complaints, and general concerns',          3),
  ('Finance / Billing',  'finance@yanachemodities.com',  '8781-1048',        'Invoice queries, payments, and billing concerns',                4),
  ('Manila Office',      'manila@yanachemodities.com',   '8732-0171',        '151 Kaliraya Street, Quezon City',                               5),
  ('Cebu Office',        'cebu@yanachemodities.com',     '+63 945 847 9543', 'Cebu City Branch',                                               6);
