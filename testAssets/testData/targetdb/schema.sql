CREATE DATABASE IF NOT EXISTS targetdb;
USE targetdb;

CREATE TABLE tgt_department (
    dept_sk        INT AUTO_INCREMENT PRIMARY KEY,
    dept_code      VARCHAR(10),
    dept_name      VARCHAR(100),
    location       VARCHAR(50)
);

CREATE TABLE tgt_job (
    job_sk         INT AUTO_INCREMENT PRIMARY KEY,
    job_code       VARCHAR(10),
    job_title      VARCHAR(100),
    min_salary     DECIMAL(10,2),
    max_salary     DECIMAL(10,2)
);

CREATE TABLE tgt_employee (
    emp_sk         INT AUTO_INCREMENT PRIMARY KEY,
    emp_id         INT,                   -- Business key
    full_name      VARCHAR(150),
    email          VARCHAR(100),
    hire_date      DATE,
    job_sk         INT,
    dept_sk        INT,
    manager_sk     INT,
    current_flag   CHAR(1) DEFAULT 'Y',
    effective_date DATE,
    end_date       DATE,
    FOREIGN KEY (job_sk) REFERENCES tgt_job(job_sk),
    FOREIGN KEY (dept_sk) REFERENCES tgt_department(dept_sk)
);



CREATE TABLE tgt_fact_salary (
    fact_id        INT AUTO_INCREMENT PRIMARY KEY,
    emp_sk         INT,
    salary_date    DATE,
    salary_amount  DECIMAL(10,2),
    FOREIGN KEY (emp_sk) REFERENCES tgt_employee(emp_sk)
);

