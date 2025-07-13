-- =====================================================
-- IPO Web Application Database Setup Script
-- PostgreSQL Database Script for pgAdmin
-- =====================================================

-- Create Database (Run this separately if database doesn't exist)
-- CREATE DATABASE ipo_platform;

-- Connect to the database and run the following:

-- =====================================================
-- DROP EXISTING TABLES (if they exist)
-- =====================================================
DROP TABLE IF EXISTS documents CASCADE;
DROP TABLE IF EXISTS ipos CASCADE;
DROP TABLE IF EXISTS companies CASCADE;

-- =====================================================
-- CREATE TABLES
-- =====================================================

-- 1. Companies Table
CREATE TABLE companies (
                           company_id SERIAL PRIMARY KEY,
                           company_name VARCHAR(255) NOT NULL UNIQUE,
                           company_logo VARCHAR(255),
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. IPOs Table
CREATE TABLE ipos (
                      ipo_id SERIAL PRIMARY KEY,
                      company_id INTEGER NOT NULL,
                      price_band VARCHAR(50) NOT NULL,
                      open_date DATE NOT NULL,
                      close_date DATE NOT NULL,
                      issue_size VARCHAR(100) NOT NULL,
                      issue_type VARCHAR(50) NOT NULL,
                      listing_date DATE,
                      status VARCHAR(20) NOT NULL CHECK (status IN ('upcoming', 'ongoing', 'listed', 'closed')),
                      ipo_price DECIMAL(10,2),
                      listing_price DECIMAL(10,2),
                      current_market_price DECIMAL(10,2),
                      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Foreign Key Constraint
                      CONSTRAINT fk_company FOREIGN KEY (company_id) REFERENCES companies(company_id) ON DELETE CASCADE
);

-- 3. Documents Table
CREATE TABLE documents (
                           document_id SERIAL PRIMARY KEY,
                           ipo_id INTEGER NOT NULL,
                           rhp_pdf VARCHAR(255),
                           drhp_pdf VARCHAR(255),
                           created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                           updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    -- Foreign Key Constraint
                           CONSTRAINT fk_ipo FOREIGN KEY (ipo_id) REFERENCES ipos(ipo_id) ON DELETE CASCADE
);

-- =====================================================
-- CREATE INDEXES FOR BETTER PERFORMANCE
-- =====================================================

-- Index on company_name for search functionality
CREATE INDEX idx_companies_name ON companies(company_name);

-- Index on IPO status for filtering
CREATE INDEX idx_ipos_status ON ipos(status);

-- Index on open_date and close_date for date filtering
CREATE INDEX idx_ipos_open_date ON ipos(open_date);
CREATE INDEX idx_ipos_close_date ON ipos(close_date);

-- Index on listing_date
CREATE INDEX idx_ipos_listing_date ON ipos(listing_date);

-- Composite index for company and status
CREATE INDEX idx_ipos_company_status ON ipos(company_id, status);

-- =====================================================
-- CREATE VIEWS FOR EASY DATA RETRIEVAL
-- =====================================================

-- View for complete IPO information with company details
CREATE VIEW ipo_complete_view AS
SELECT
    i.ipo_id,
    c.company_name,
    c.company_logo,
    i.price_band,
    i.open_date,
    i.close_date,
    i.issue_size,
    i.issue_type,
    i.listing_date,
    i.status,
    i.ipo_price,
    i.listing_price,
    i.current_market_price,
    -- Calculate listing_gain
    CASE
        WHEN i.ipo_price IS NOT NULL AND i.listing_price IS NOT NULL THEN
            ROUND(((i.listing_price - i.ipo_price) / i.ipo_price) * 100, 2)
        ELSE NULL
        END AS listing_gain,
    -- Calculate current_return
    CASE
        WHEN i.ipo_price IS NOT NULL AND i.current_market_price IS NOT NULL THEN
            ROUND(((i.current_market_price - i.ipo_price) / i.ipo_price) * 100, 2)
        ELSE NULL
        END AS current_return,
    d.rhp_pdf,
    d.drhp_pdf
FROM ipos i
         JOIN companies c ON i.company_id = c.company_id
         LEFT JOIN documents d ON i.ipo_id = d.ipo_id;

-- =====================================================
-- INSERT DUMMY DATA
-- =====================================================

-- Insert Companies
INSERT INTO companies (company_name, company_logo) VALUES
                                                       ('TechCorp Solutions', 'logos/techcorp.png'),
                                                       ('Green Energy Ltd', 'logos/greenenergy.png'),
                                                       ('FinanceHub Inc', 'logos/financehub.png'),
                                                       ('HealthCare Plus', 'logos/healthcare.png'),
                                                       ('AutoMotive Pro', 'logos/automotive.png'),
                                                       ('FoodChain Express', 'logos/foodchain.png'),
                                                       ('EduTech Innovations', 'logos/edutech.png'),
                                                       ('RealEstate Ventures', 'logos/realestate.png'),
                                                       ('CyberSecurity Shield', 'logos/cybersecurity.png'),
                                                       ('Renewable Solar', 'logos/solar.png');

-- Insert IPOs
INSERT INTO ipos (company_id, price_band, open_date, close_date, issue_size, issue_type, listing_date, status, ipo_price, listing_price, current_market_price) VALUES
                                                                                                                                                                   (1, '₹100-120', '2025-07-20', '2025-07-22', '₹500 Cr', 'Fresh Issue', '2025-07-25', 'upcoming', 110.00, NULL, NULL),
                                                                                                                                                                   (2, '₹80-95', '2025-07-15', '2025-07-17', '₹300 Cr', 'OFS', '2025-07-20', 'ongoing', 87.50, NULL, NULL),
                                                                                                                                                                   (3, '₹150-180', '2025-06-10', '2025-06-12', '₹750 Cr', 'Fresh Issue + OFS', '2025-06-15', 'listed', 165.00, 198.50, 210.75),
                                                                                                                                                                   (4, '₹200-250', '2025-05-20', '2025-05-22', '₹1200 Cr', 'Fresh Issue', '2025-05-25', 'listed', 225.00, 270.00, 285.50),
                                                                                                                                                                   (5, '₹75-90', '2025-07-25', '2025-07-27', '₹400 Cr', 'OFS', '2025-07-30', 'upcoming', 82.50, NULL, NULL),
                                                                                                                                                                   (6, '₹60-75', '2025-06-01', '2025-06-03', '₹250 Cr', 'Fresh Issue', '2025-06-06', 'listed', 67.50, 81.25, 78.90),
                                                                                                                                                                   (7, '₹300-350', '2025-08-01', '2025-08-03', '₹900 Cr', 'Fresh Issue + OFS', '2025-08-06', 'upcoming', 325.00, NULL, NULL),
                                                                                                                                                                   (8, '₹120-140', '2025-07-12', '2025-07-14', '₹600 Cr', 'Fresh Issue', '2025-07-17', 'ongoing', 130.00, NULL, NULL),
                                                                                                                                                                   (9, '₹180-220', '2025-05-15', '2025-05-17', '₹800 Cr', 'OFS', '2025-05-20', 'listed', 200.00, 176.50, 195.25),
                                                                                                                                                                   (10, '₹90-110', '2025-08-10', '2025-08-12', '₹350 Cr', 'Fresh Issue', '2025-08-15', 'upcoming', 100.00, NULL, NULL);

-- Insert Documents
INSERT INTO documents (ipo_id, rhp_pdf, drhp_pdf) VALUES
                                                      (1, 'docs/techcorp_rhp.pdf', 'docs/techcorp_drhp.pdf'),
                                                      (2, 'docs/greenenergy_rhp.pdf', 'docs/greenenergy_drhp.pdf'),
                                                      (3, 'docs/financehub_rhp.pdf', 'docs/financehub_drhp.pdf'),
                                                      (4, 'docs/healthcare_rhp.pdf', 'docs/healthcare_drhp.pdf'),
                                                      (5, 'docs/automotive_rhp.pdf', 'docs/automotive_drhp.pdf'),
                                                      (6, 'docs/foodchain_rhp.pdf', 'docs/foodchain_drhp.pdf'),
                                                      (7, 'docs/edutech_rhp.pdf', 'docs/edutech_drhp.pdf'),
                                                      (8, 'docs/realestate_rhp.pdf', 'docs/realestate_drhp.pdf'),
                                                      (9, 'docs/cybersecurity_rhp.pdf', 'docs/cybersecurity_drhp.pdf'),
                                                      (10, 'docs/solar_rhp.pdf', 'docs/solar_drhp.pdf');

-- =====================================================
-- CREATE FUNCTIONS FOR COMMON OPERATIONS
-- =====================================================

-- Function to update timestamp on record update
CREATE OR REPLACE FUNCTION update_updated_at_column()
    RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updating timestamps
CREATE TRIGGER update_companies_updated_at BEFORE UPDATE ON companies
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_ipos_updated_at BEFORE UPDATE ON ipos
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_documents_updated_at BEFORE UPDATE ON documents
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if tables were created successfully
SELECT
    schemaname,
    tablename,
    tableowner
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN ('companies', 'ipos', 'documents');

-- Check row counts
SELECT
    'companies' as table_name, COUNT(*) as row_count FROM companies
UNION ALL
SELECT
    'ipos' as table_name, COUNT(*) as row_count FROM ipos
UNION ALL
SELECT
    'documents' as table_name, COUNT(*) as row_count FROM documents;

-- Test the complete view
SELECT * FROM ipo_complete_view LIMIT 3;

-- =====================================================
-- USEFUL QUERIES FOR DEVELOPMENT
-- =====================================================

-- Get all upcoming IPOs
-- SELECT * FROM ipo_complete_view WHERE status = 'upcoming' ORDER BY open_date;

-- Get all ongoing IPOs
-- SELECT * FROM ipo_complete_view WHERE status = 'ongoing' ORDER BY open_date;

-- Get all listed IPOs with gains
-- SELECT * FROM ipo_complete_view WHERE status = 'listed' ORDER BY listing_gain DESC;

-- Search IPOs by company name
-- SELECT * FROM ipo_complete_view WHERE company_name ILIKE '%tech%';

-- Get IPOs by date range
-- SELECT * FROM ipo_complete_view WHERE open_date BETWEEN '2025-07-01' AND '2025-07-31';

-- =====================================================
-- PERMISSIONS (Optional - for production use)
-- =====================================================

-- Create a user for the Django application (uncomment if needed)
-- CREATE USER django_user WITH PASSWORD 'your_secure_password';
-- GRANT ALL PRIVILEGES ON DATABASE ipo_platform TO django_user;
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO django_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO django_user;

-- =====================================================
-- SCRIPT COMPLETION MESSAGE
-- =====================================================
DO $$
    BEGIN
        RAISE NOTICE 'IPO Database setup completed successfully!';
        RAISE NOTICE 'Tables created: companies, ipos, documents';
        RAISE NOTICE 'Sample data inserted: 10 companies, 10 IPOs, 10 documents';
        RAISE NOTICE 'Views created: ipo_complete_view';
        RAISE NOTICE 'Ready for Django integration!';
    END $$;




select * from ipos;