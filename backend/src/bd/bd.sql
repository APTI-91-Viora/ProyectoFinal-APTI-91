CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE emergency_contacts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(120) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    priority BOOLEAN DEFAULT FALSE,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
);

CREATE TABLE danger_zones (
    id SERIAL PRIMARY KEY,

    latitude DECIMAL(10,7) NOT NULL,
    longitude DECIMAL(10,7) NOT NULL,

    risk_level INT NOT NULL CHECK (risk_level BETWEEN 1 AND 5),

    description TEXT,

    radius INT DEFAULT 300,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE reports (

    id SERIAL PRIMARY KEY,

    user_id INT,

    latitude DECIMAL(10,7),

    longitude DECIMAL(10,7),

    report_type VARCHAR(50),

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(user_id)
        REFERENCES users(id)
);

-- Modificación: agregar estado de validación a los reportes
ALTER TABLE reports
ADD COLUMN status VARCHAR(20) NOT NULL DEFAULT 'Pendiente'
CHECK (status IN ('Pendiente', 'Validado', 'Rechazado'));