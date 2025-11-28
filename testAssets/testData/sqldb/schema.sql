-- Create Database
CREATE DATABASE IF NOT EXISTS sqldb;
USE sqldb;

-- =========================
-- 1. ROLES
-- =========================
CREATE TABLE roles (
  role_id INT PRIMARY KEY,
  role_name VARCHAR(50)
);

-- =========================
-- 2. USERS
-- =========================
CREATE TABLE users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  email VARCHAR(100) UNIQUE,
  password VARCHAR(255),
  role_id INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (role_id) REFERENCES roles(role_id)
);

-- =========================
-- 3. LOGS
-- =========================
CREATE TABLE logs (
  log_id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  time_stamp DATETIME DEFAULT CURRENT_TIMESTAMP,
  ip_address VARCHAR(45),
  device_info VARCHAR(55),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- =========================
-- 4. PERMISSIONS + ROLE PERMISSIONS
-- =========================
CREATE TABLE permissions (
  permission_id INT PRIMARY KEY AUTO_INCREMENT,
  permission_name VARCHAR(50)
);

CREATE TABLE role_permissions (
  role_id INT,
  permission_id INT,
  FOREIGN KEY (role_id) REFERENCES roles(role_id),
  FOREIGN KEY (permission_id) REFERENCES permissions(permission_id)
);

-- =========================
-- 5. PROJECTS
-- =========================
CREATE TABLE projects (
  project_id INT PRIMARY KEY AUTO_INCREMENT,
  project_name VARCHAR(50),
  manager_id INT,
  project_guid VARCHAR(50)
);

ALTER TABLE projects
ADD CONSTRAINT fk_manager_id
FOREIGN KEY (manager_id)
REFERENCES users(user_id);

-- =========================
-- 6. USER PROJECT MAP
-- =========================
CREATE TABLE user_projects(
  user_id INT,
  project_id INT,
  FOREIGN KEY (user_id) REFERENCES users(user_id),
  FOREIGN KEY (project_id) REFERENCES projects(project_id)
);

-- =========================
-- 7. RISKS
-- =========================
CREATE TABLE risks(
  risk_id INT PRIMARY KEY AUTO_INCREMENT,
  risk_title VARCHAR(50),
  risk_description VARCHAR(50)
);

-- =========================
-- 8. CONTROLS
-- =========================
CREATE TABLE controls(
  control_id INT PRIMARY KEY AUTO_INCREMENT,
  control_title VARCHAR(50),
  control_description VARCHAR(50)
);

-- =========================
-- 9. FS TABLE
-- =========================
CREATE TABLE fs (
  fs_id INT PRIMARY KEY AUTO_INCREMENT,
  fs_process VARCHAR(50),
  fs_business_process VARCHAR(50),
  risk_id INT,
  control_id INT,
  FOREIGN KEY (risk_id) REFERENCES risks(risk_id),
  FOREIGN KEY (control_id) REFERENCES controls(control_id)
);

-- =========================
-- 10. WORKFLOW TYPE
-- =========================
CREATE TABLE workflow_type(
  workflow_type_id INT PRIMARY KEY AUTO_INCREMENT,
  workflow_name VARCHAR(50),
  workflow_description VARCHAR(50)
);

-- =========================
-- 11. TEAM ROLES
-- =========================
CREATE TABLE project_teamrole(
  teamrole_id INT PRIMARY KEY AUTO_INCREMENT,
  teamrole_name VARCHAR(50)
);

-- =========================
-- 12. VERSION TABLE
-- =========================
CREATE TABLE versions(
  version_id INT PRIMARY KEY AUTO_INCREMENT,
  version_name VARCHAR(50),
  version_date DATE
);

-- =========================
-- 13. TEAMROLE PERMISSIONS + MAP
-- =========================
CREATE TABLE teamrole_permissions(
  teamrole_permission_id INT PRIMARY KEY AUTO_INCREMENT,
  teamrole_permission_name VARCHAR(50)
);

CREATE TABLE teamrole_permission_map(
  teamrole_id INT,
  teamrole_permission_id INT,
  FOREIGN KEY (teamrole_id) 
      REFERENCES project_teamrole(teamrole_id),
  FOREIGN KEY (teamrole_permission_id) 
      REFERENCES teamrole_permissions(teamrole_permission_id)
);

-- =========================
-- 14. PROJECT DETAILS MAP
-- =========================
CREATE TABLE proj_details_map(
  project_id INT,
  workflow_type_id INT,
  version_id INT,
  fs_id INT,
  control_id INT,
  risk_id INT,
  teamrole_id INT,
  FOREIGN KEY (teamrole_id) REFERENCES project_teamrole(teamrole_id),
  FOREIGN KEY (risk_id) REFERENCES risks(risk_id),
  FOREIGN KEY (control_id) REFERENCES controls(control_id),
  FOREIGN KEY (project_id) REFERENCES projects(project_id),
  FOREIGN KEY (workflow_type_id) REFERENCES workflow_type(workflow_type_id),
  FOREIGN KEY (fs_id) REFERENCES fs(fs_id),
  FOREIGN KEY (version_id) REFERENCES versions(version_id)
);



