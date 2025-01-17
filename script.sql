-- Create `users` table
CREATE TABLE form_data (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL,
    user_type ENUM('user', 'admin') DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create `appointments` table
CREATE TABLE appointments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    service VARCHAR(255) NOT NULL,
    visit_type ENUM('lab', 'home') NOT NULL,
    address TEXT DEFAULT NULL,
    status ENUM('pending', 'completed', 'report_generated') NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    mobile VARCHAR(15) DEFAULT NULL,
    message TEXT DEFAULT NULL,
    appointment_date DATE NOT NULL DEFAULT '2025-01-01',
    report_path VARCHAR(255) DEFAULT NULL,
    FOREIGN KEY (user_id) REFERENCES users(d) ON DELETE CASCADE
);

-- Create `contact_us` table
CREATE TABLE contact_messages (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    subject VARCHAR(255) DEFAULT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TINYINT DEFAULT 1,
    mobile BIGINT DEFAULT NULL,
    response TEXT DEFAULT NULL
);

-- Create `test_queries` table
CREATE TABLE inquiries (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    test_name VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    query TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status TINYINT DEFAULT 1,
    mobile BIGINT DEFAULT NULL,
    response TEXT DEFAULT NULL
);
