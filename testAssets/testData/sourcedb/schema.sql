
CREATE DATABASE IF NOT EXISTS sourcedb;
USE sourcedb;


CREATE TABLE src_department (
    dept_code      VARCHAR(10) PRIMARY KEY,
    dept_name      VARCHAR(100),
    location       VARCHAR(50)
);

CREATE TABLE src_job (
    job_code       VARCHAR(10) PRIMARY KEY,
    job_title      VARCHAR(100),
    min_salary     DECIMAL(10,2),
    max_salary     DECIMAL(10,2)
);

CREATE TABLE src_employee (
    emp_id         INT PRIMARY KEY,
    first_name     VARCHAR(50),
    last_name      VARCHAR(50),
    email          VARCHAR(100),
    hire_date      DATE,
    job_code       VARCHAR(10),
    dept_code      VARCHAR(10),
    salary         DECIMAL(10,2),
    manager_id     INT,
    FOREIGN KEY (job_code) REFERENCES src_job(job_code),
    FOREIGN KEY (dept_code) REFERENCES src_department(dept_code)
);

