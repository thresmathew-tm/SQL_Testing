use sqldb;
-- =========================
-- 1. ROLES
-- =========================
INSERT INTO roles (role_id, role_name) 
VALUES (1, 'Admin');
INSERT INTO roles (role_id, role_name) 
VALUES (2, 'Manger');
INSERT INTO roles (role_id, role_name) 
VALUES (3, 'Tester');
INSERT INTO roles (role_id, role_name) 
VALUES (4, 'Developer');

-- =========================
-- 2. USERS
-- =========================

INSERT INTO users (user_id, first_name, last_name, email, password, role_id, created_at) 
VALUES (1, 'Levi', 'King', 'levking@gmail.com', 'astridclifford', 1, '2023-10-01');
INSERT INTO users (user_id, first_name, last_name, email, password, role_id, created_at) 
VALUES (2, 'Aiden', 'King', 'kingaiden00@gmail.com', 'steelprincess', 3, '2023-11-10');
INSERT INTO users (user_id, first_name, last_name, email, password, role_id, created_at) 
VALUES (3, 'Xander', 'Knight', 'xanderknight@gmail.com', 'green0123', 3, '2023-11-23');
INSERT INTO users (user_id, first_name, last_name, email, password, role_id, created_at) 
VALUES (4, 'Cole', 'Nash', 'colenash@gmail.com', 'butterfly33', 2, '2023-11-23');
INSERT INTO users (user_id, first_name, last_name, email, password, role_id, created_at) 
VALUES (5, 'Ronan', 'Aster', 'royalityRemi@gmail.com', 'gothdoll888', 4, '2023-12-17');
INSERT INTO users (user_id, first_name, last_name, email, password, role_id, created_at) 
VALUES (6, 'Eli', 'King', 'eli@gmail.com', 'eliking1091', 3, '2023-10-01');
INSERT INTO users (user_id, first_name, last_name, email, password, role_id, created_at) 
VALUES (7, 'Landon', 'K', 'landon@gmail.com', 'lanking0110', 4, '2023-11-10');
INSERT INTO users (user_id, first_name, last_name, email, password, role_id, created_at) 
VALUES (8, 'Brandon', 'K', 'brandon@gmail.com', 'branking0101', 2, '2023-11-23');
INSERT INTO users (user_id, first_name, last_name, email, password, role_id, created_at) 
VALUES (9, 'Remington', 'A', 'remington@gmail.com', 'remiaster6996', 3, '2023-11-23');
INSERT INTO users (user_id, first_name, last_name, email, password, role_id, created_at) 
VALUES (10, 'Creighton', 'K', 'creighton@gmail.com', 'creighking6', 4, '2023-12-17');
INSERT INTO users (user_id, first_name, last_name, email, password, role_id, created_at) 
VALUES (11, 'Nikolai', 'Sokolov', 'nikolai@gmail.com', 'nikosoko69', 4, '2023-10-01');
INSERT INTO users (user_id, first_name, last_name, email, password, role_id, created_at) 
VALUES (12, 'Jeremy', 'Vokov', 'jeremy@gmail.com', 'jerevok111', 4, '2023-11-10');
INSERT INTO users (user_id, first_name, last_name, email, password, role_id, created_at) 
VALUES (13, 'Killian', 'Carson', 'killian@gmail.com', 'killcar0000', 2, '2023-11-23');
INSERT INTO users (user_id, first_name, last_name, email, password, role_id, created_at) 
VALUES (14, 'Gareth', 'Carson', 'gareth@gmail.com', 'garethcarson', 4, '2023-11-23');
INSERT INTO users (user_id, first_name, last_name, email, password, role_id, created_at) 
VALUES (15, 'Vahn', 'V', 'vahn@gmail.com', 'vvahn080', 4, '2023-12-17');
-- =========================
-- 3. LOGS
-- =========================
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 

VALUES (1, 1, '2023-11-01 09:15:00', '192.168.1.45', 'Windows 10 · Chrome');
 
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 

VALUES (2, 3, '2023-11-01 10:04:00', '192.168.1.62', 'macOS · Safari');
 
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 

VALUES (3, 5, '2023-11-02 14:33:00', '10.0.0.27', 'Android · Chrome');
 
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 

VALUES (4, 2, '2023-11-03 11:21:00', '172.16.5.92', 'Windows 11 · Edge');
 
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 

VALUES (5, 9, '2023-11-03 15:08:00', '192.168.1.78', 'iPhone · Safari');
 
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 

VALUES (6, 14, '2023-11-04 08:57:00', '10.0.0.31', 'macOS · Firefox');
 
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 

VALUES (7, 5, '2023-11-05 15:12:00', '10.0.0.27', 'Android · Chrome');
 
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 

VALUES (8, 5, '2023-11-06 12:22:00', '10.0.0.27', 'Android · Chrome');
 
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 

VALUES (9, 11, '2023-11-06 20:10:00', '10.0.0.29', 'macOS · Chrome');
 
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 

VALUES (10, 2, '2023-11-06 22:08:00', '192.168.1.79', 'iPhone · Safari');
 
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 

VALUES (11, 3, '2023-11-07 08:57:00', '10.0.0.21', 'macOS · Firefox');
 
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 

VALUES (12, 12, '2023-11-07 10:10:00', '10.0.0.25', 'macOS · Chrome');
 
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 

VALUES (13, 10, '2023-11-08 08:57:00', '10.0.0.31', 'macOS · Firefox');
 
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 
VALUES (14, 7, '2023-11-09 15:08:00', '192.168.1.78', 'iPhone · Safari'); 
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 
VALUES (15, 7, '2023-11-09 21:08:00', '192.168.1.78', 'iPhone · Safari');
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info)
VALUES (16, 4, '2023-11-09 22:10:00', '10.0.0.29', 'macOS · Chrome');
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 
VALUES (17, 7, '2023-11-10 08:21:00', '172.16.5.92', 'Windows 11 · Edge');
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 
VALUES (18, 6, '2023-11-10 09:21:00', '10.0.0.29', 'macOS · Chrome');
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 
VALUES (19, 13, '2023-11-10 10:21:00', '10.0.0.31', 'macOS · Firefox');
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 
VALUES (20, 7, '2023-11-10 12:21:00', '172.16.5.92', 'Windows 11 · Edge');
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 
VALUES (21, 4, '2023-11-10 13:21:00', '172.16.5.92', 'Windows 11 · Edge');
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 
VALUES (22, 4, '2023-11-10 16:21:00', '10.0.0.29', 'macOS · Chrome');
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 
VALUES (23, 7, '2023-11-11 08:57:00', '10.0.0.31', 'macOS · Firefox');
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 
VALUES (24, 13, '2023-11-11 09:57:00', '192.168.1.78', 'iPhone · Safari'); 
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 
VALUES (25, 7, '2023-11-11 11:57:00', '10.0.0.31', 'macOS · Firefox');
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 
VALUES (26, 6, '2023-11-11 15:57:00', '10.0.0.29', 'macOS · Chrome'); 
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 
VALUES (27, 7, '2023-11-11 18:57:00', '10.0.0.29', 'macOS · Chrome'); 
INSERT INTO logs (log_id, user_id, time_stamp, ip_address, device_info) 
VALUES (28, 4, '2023-11-11 22:57:00', '10.0.0.29', 'macOS · Chrome');


-- =========================
-- 4. PERMISSIONS + ROLE PERMISSIONS
-- =========================
INSERT INTO permissions (permission_id, permission_name) 

VALUES (1, 'CREATE_USER');
 
INSERT INTO permissions (permission_id, permission_name) 

VALUES (2, 'READ_USER');
 
INSERT INTO permissions (permission_id, permission_name) 

VALUES (3, 'UPDATE_USER');
 
INSERT INTO permissions (permission_id, permission_name) 

VALUES (4, 'DELETE_USER');
 
INSERT INTO permissions (permission_id, permission_name) 

VALUES (5, 'CREATE_PROJECT');
 
INSERT INTO permissions (permission_id, permission_name) 

VALUES (6, 'READ_PROJECT');
 
INSERT INTO permissions (permission_id, permission_name) 

VALUES (7, 'UPDATE_PROJECT');
 
INSERT INTO permissions (permission_id, permission_name) 

VALUES (8, 'DELETE_PROJECT');
 
INSERT INTO permissions (permission_id, permission_name) 

VALUES (9, 'VIEW_LOGS');

 
INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 1);

INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 2);

INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 3);

INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 4);

INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 5);

INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 6);

INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 7);

INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 8);

INSERT INTO role_permissions (role_id, permission_id) VALUES (1, 9);
 
INSERT INTO role_permissions (role_id, permission_id) VALUES (2, 1);

INSERT INTO role_permissions (role_id, permission_id) VALUES (2, 2);

INSERT INTO role_permissions (role_id, permission_id) VALUES (2, 3);

INSERT INTO role_permissions (role_id, permission_id) VALUES (2, 4);

INSERT INTO role_permissions (role_id, permission_id) VALUES (2, 5);

INSERT INTO role_permissions (role_id, permission_id) VALUES (2, 6);

INSERT INTO role_permissions (role_id, permission_id) VALUES (2, 7);

INSERT INTO role_permissions (role_id, permission_id) VALUES (2, 9);
 
INSERT INTO role_permissions (role_id, permission_id) VALUES (3, 1);

INSERT INTO role_permissions (role_id, permission_id) VALUES (3, 2);

INSERT INTO role_permissions (role_id, permission_id) VALUES (3, 3);

INSERT INTO role_permissions (role_id, permission_id) VALUES (3, 6);

INSERT INTO role_permissions (role_id, permission_id) VALUES (3, 7);
 
INSERT INTO role_permissions (role_id, permission_id) VALUES (4, 1);

INSERT INTO role_permissions (role_id, permission_id) VALUES (4, 2);

INSERT INTO role_permissions (role_id, permission_id) VALUES (4, 3);

INSERT INTO role_permissions (role_id, permission_id) VALUES (4, 6);

INSERT INTO role_permissions (role_id, permission_id) VALUES (4, 7);


-- =========================
-- 5. PROJECTS
-- =========================

INSERT INTO projects (project_id, project_name, manager_id, project_guid) 
VALUES (1, 'PROJ_001', 8, '10108P001');
INSERT INTO projects (project_id, project_name, manager_id, project_guid) 
VALUES (2, 'PROJ_010', 4, '10204P010');
INSERT INTO projects (project_id, project_name, manager_id, project_guid) 
VALUES (3, 'PROJ_111', 13, '10313P111');
INSERT INTO projects (project_id, project_name) 
VALUES (4, 'PROJ_100');
INSERT INTO projects (project_id, project_name) 
VALUES (5, 'PROJ_011');
INSERT INTO projects (project_id, project_name) 
VALUES (6, 'PROJ_101');

-- =========================
-- 6. USER PROJECT MAP
-- =========================
INSERT INTO user_projects (user_id, project_id) VALUES (1, 1);

INSERT INTO user_projects (user_id, project_id) VALUES (1, 2);

INSERT INTO user_projects (user_id, project_id) VALUES (1, 3);

INSERT INTO user_projects (user_id, project_id) VALUES (2, 1);

INSERT INTO user_projects (user_id, project_id) VALUES (2, 3);

INSERT INTO user_projects (user_id, project_id) VALUES (3, 1);

INSERT INTO user_projects (user_id, project_id) VALUES (3, 2);

INSERT INTO user_projects (user_id, project_id) VALUES (3, 3);

INSERT INTO user_projects (user_id, project_id) VALUES (4, 2);

INSERT INTO user_projects (user_id, project_id) VALUES (5, 1);

INSERT INTO user_projects (user_id, project_id) VALUES (5, 2);

INSERT INTO user_projects (user_id, project_id) VALUES (6, 3);

INSERT INTO user_projects (user_id, project_id) VALUES (7, 2);

INSERT INTO user_projects (user_id, project_id) VALUES (7, 3);

INSERT INTO user_projects (user_id, project_id) VALUES (8, 1);

INSERT INTO user_projects (user_id, project_id) VALUES (9, 2);

INSERT INTO user_projects (user_id, project_id) VALUES (10, 3);

INSERT INTO user_projects (user_id, project_id) VALUES (11, 1);

INSERT INTO user_projects (user_id, project_id) VALUES (11, 3);

INSERT INTO user_projects (user_id, project_id) VALUES (12, 1);

INSERT INTO user_projects (user_id, project_id) VALUES (12, 2);

INSERT INTO user_projects (user_id, project_id) VALUES (13, 3);

INSERT INTO user_projects (user_id, project_id) VALUES (14, 2);

INSERT INTO user_projects (user_id, project_id) VALUES (15, 1);

 
-- =========================
-- 7. RISKS
-- =========================
INSERT INTO risks (risk_id, risk_title, risk_description) VALUES
(1, 'risk_one', 'description for risk one'),
(2, 'risk_two', 'description for risk two'),
(3, 'risk_three', 'description for risk three'),
(4, 'risk_four', 'description for risk four'),
(5, 'risk_five', 'description for risk five'),
(6, 'Data Breach', 'Unauthorized access to sensitive data'),
(7, 'Operational Failure', 'System or process breakdown'),
(8, 'Regulatory Non-Compliance', 'Failure to comply with industry standards'),
(9, 'Fraud Risk', 'Potential financial or data fraud activities');


-- =========================
-- 8. CONTROLS
-- =========================
INSERT INTO controls (control_id, control_title, control_description) VALUES
(1, 'control_one', 'description for control one'),
(2, 'control_two', 'description for control two'),
(3, 'control_three', 'description for control three'),
(4, 'control_four', 'description for control four'),
(5, 'control_five', 'description for control five'),
(6, 'control_six', 'description for control six'),
(7, 'Encrypt Sensitive Data', 'Implement encryption for data'),
(8, 'Access Control Policy', 'Restrict user access based on role'),
(9, 'Incident Response Plan', 'Documented response procedures for breaches'),
(10, 'Compliance Monitoring', 'Periodic monitoring for compliance'),
(11, 'Audit Logs', 'Maintain logs for all system activities'),
(12, 'Regular Backups', 'Ensure frequent and secure data backups'),
(13, 'User Training', 'Conduct awareness programs for employees');


-- =========================
-- 9. FS TABLE
-- =========================
INSERT INTO fs (fs_id, fs_process, fs_business_process, risk_id, control_id) 
VALUES (1, 'Process_One', 'Business_Process_One', 2, 6);
INSERT INTO fs (fs_id, fs_process, fs_business_process, risk_id, control_id) 
VALUES (2, 'Process_Two', 'Business_Process_Two', 3, 5);
INSERT INTO fs (fs_id, fs_process, fs_business_process, risk_id, control_id) 
VALUES (3, 'Process_Three', 'Business_Process_Three', 4, 1); 
INSERT INTO fs (fs_id, fs_process, fs_business_process, risk_id, control_id) 
VALUES (4, 'Process_Four', 'Business_Process_Four', 1, 2);
INSERT INTO fs (fs_id, fs_process, fs_business_process, risk_id, control_id) 
VALUES (5, 'Process_Five', 'Business_Process_Five', 5, 3);

-- =========================
-- 10. WORKFLOW TYPE
-- =========================
INSERT INTO workflow_type (workflow_type_id, workflow_name, workflow_description) VALUES
(1, 'enhanced', 'desc'),
(2, 'generic', 'desc'),
(3, 'single audit', 'desc'),
(4, 'soc', 'desc');

-- =========================
-- 11. INDUSTRY TABLE 
-- =========================
INSERT INTO industry (industry_id, industry_name, industry_description) VALUES
(1, 'banking', 'desc for banking'),
(2, 'finance', 'desc for banking'),
(3, 'automobile', 'desc for banking'),
(4, 'aviation', 'desc for banking');
-- =========================
-- 12. WORKFLOW TYPE - INDUSTRY MAP 
-- =========================

INSERT INTO workflow_ind_map (workflow_type_id, industry_id) 
VALUES (1, 1);
INSERT INTO workflow_ind_map (workflow_type_id, industry_id) 
VALUES (1, 2);
INSERT INTO workflow_ind_map (workflow_type_id, industry_id) 
VALUES (1, 3); 
INSERT INTO workflow_ind_map (workflow_type_id, industry_id) 
VALUES (1, 4);
INSERT INTO workflow_ind_map (workflow_type_id, industry_id) 
VALUES (2, 2);
INSERT INTO workflow_ind_map (workflow_type_id, industry_id)
VALUES (3, 4); 
INSERT INTO workflow_ind_map (workflow_type_id, industry_id) 
VALUES (4, 1);
INSERT INTO workflow_ind_map (workflow_type_id, industry_id) 
VALUES (4, 2);

-- =========================
-- 13. TEAM ROLES
-- =========================

INSERT INTO project_teamrole (teamrole_id, teamrole_name) 
VALUES (1, 'Partner');
INSERT INTO project_teamrole (teamrole_id, teamrole_name) 
VALUES (2, 'Lead Partner');
INSERT INTO project_teamrole (teamrole_id, teamrole_name) 
VALUES (3, 'Reviewer');
INSERT INTO project_teamrole (teamrole_id, teamrole_name) 
VALUES (4, 'Manager');
INSERT INTO project_teamrole (teamrole_id, teamrole_name) 
VALUES (5, 'Lead Manager');

-- =========================
-- 14. VERSION TABLE
-- =========================
INSERT INTO versions (version_id, version_name, version_date) 
VALUES (1, '23.1', '2023-01-01'); 
INSERT INTO versions (version_id, version_name, version_date) 
VALUES (2, '23.2', '2023-02-01'); 
INSERT INTO versions (version_id, version_name, version_date) 
VALUES (3, '24.1', '2024-01-01'); 
INSERT INTO versions (version_id, version_name, version_date) 
VALUES (4, '24.2', '2024-02-01'); 
INSERT INTO versions (version_id, version_name, version_date) 
VALUES (5, '25.1', '2025-01-01');

-- =========================
-- 15. STANDARDS TABLE    
-- =========================

INSERT INTO standards (standard_id, standard_title) 
VALUES (1, 'US_GAAP');
INSERT INTO standards (standard_id, standard_title) 
VALUES (2, 'IFRS');
INSERT INTO standards (standard_id, standard_title) 
VALUES (3, 'ACIP');




-- =========================
-- 16. INDUSTRY STANDARD MAP
-- =========================
INSERT INTO industry_standard_map (industry_id, standard_id) 
VALUES (1, 2);
INSERT INTO industry_standard_map (industry_id, standard_id) 
VALUES (1, 3);
INSERT INTO industry_standard_map (industry_id, standard_id) 
VALUES (2, 1); 
INSERT INTO industry_standard_map (industry_id, standard_id) 
VALUES (3, 1);
INSERT INTO industry_standard_map (industry_id, standard_id) 
VALUES (3, 2);
INSERT INTO industry_standard_map (industry_id, standard_id) 
VALUES (3, 3); 
INSERT INTO industry_standard_map (industry_id, standard_id) 
VALUES (4, 1);
INSERT INTO industry_standard_map (industry_id, standard_id) 
VALUES (4, 3);

-- =========================
-- 17. TEAMROLE PERMISSIONS + MAP
-- =========================
INSERT INTO teamrole_permissions (teamrole_permission_id, teamrole_permission_name) 
VALUES (1, 'sign off'); 
INSERT INTO teamrole_permissions (teamrole_permission_id, teamrole_permission_name) 
VALUES (2, 'prepare'); 
INSERT INTO teamrole_permissions (teamrole_permission_id, teamrole_permission_name) 
VALUES (3, 'review');


INSERT INTO teamrole_permission_map (teamrole_id, teamrole_permission_id) 
VALUES (1, 1);
INSERT INTO teamrole_permission_map (teamrole_id, teamrole_permission_id) 
VALUES (1, 2);
INSERT INTO teamrole_permission_map (teamrole_id, teamrole_permission_id) 
VALUES (1, 3);
INSERT INTO teamrole_permission_map (teamrole_id, teamrole_permission_id) 
VALUES (2, 1);
INSERT INTO teamrole_permission_map (teamrole_id, teamrole_permission_id) 
VALUES (2, 2); 
INSERT INTO teamrole_permission_map (teamrole_id, teamrole_permission_id) 
VALUES (2, 3);
INSERT INTO teamrole_permission_map (teamrole_id, teamrole_permission_id) 
VALUES (3, 1);
INSERT INTO teamrole_permission_map (teamrole_id, teamrole_permission_id) 
VALUES (3, 2); 
INSERT INTO teamrole_permission_map (teamrole_id, teamrole_permission_id) 
VALUES (3, 3); 
INSERT INTO teamrole_permission_map (teamrole_id, teamrole_permission_id) 
VALUES (4, 1); 
INSERT INTO teamrole_permission_map (teamrole_id, teamrole_permission_id) 
VALUES (4, 2); 
INSERT INTO teamrole_permission_map (teamrole_id, teamrole_permission_id) 
VALUES (4, 3); 
INSERT INTO teamrole_permission_map (teamrole_id, teamrole_permission_id) 
VALUES (5, 1); 
INSERT INTO teamrole_permission_map (teamrole_id, teamrole_permission_id) 
VALUES (5, 2); 
INSERT INTO teamrole_permission_map (teamrole_id, teamrole_permission_id) 
VALUES (5, 3);



-- =========================
-- 18. PROJECT DETAILS MAP
-- =========================

INSERT INTO proj_details_map (project_id, workflow_type_id, version_id, fs_id, risk_id, control_id, teamrole_id) 
VALUES (2, 2, 4, 2, 8, 3, 2); 
INSERT INTO proj_details_map (project_id, workflow_type_id, version_id, fs_id, risk_id, control_id, teamrole_id) 
VALUES (3, 3, 5, 3, 1, 4, 3);
INSERT INTO proj_details_map (project_id, workflow_type_id, version_id, fs_id, risk_id, control_id, teamrole_id) 
VALUES (1, 1, 2, 1, 6, 2, 1); 
INSERT INTO proj_details_map (project_id, workflow_type_id, version_id, fs_id, risk_id, control_id, teamrole_id) 
VALUES (2, 2, 3, 2, 5, 3, 1); 
INSERT INTO proj_details_map (project_id, workflow_type_id, version_id, fs_id, risk_id, control_id, teamrole_id) 
VALUES (3, 3, 5, 3, 9, 4, 1); 
INSERT INTO proj_details_map (project_id, workflow_type_id, version_id, fs_id, risk_id, control_id, teamrole_id) 
VALUES (4, 1, 1, 4, 7, 6, 2);
INSERT INTO proj_details_map (project_id, workflow_type_id, version_id, fs_id, risk_id, control_id, teamrole_id) 
VALUES (5, 2, 2, 5, 8, 7, 3);
INSERT INTO proj_details_map (project_id, workflow_type_id, version_id, fs_id, risk_id, control_id, teamrole_id) 
VALUES (6, 3, 3, 3, 9, 8, 1);
INSERT INTO proj_details_map (project_id, workflow_type_id, version_id, fs_id, risk_id, control_id, teamrole_id) 
VALUES (7, 1, 4, 2, 10, 9, 2); 
INSERT INTO proj_details_map (project_id, workflow_type_id, version_id, fs_id, risk_id, control_id, teamrole_id) 
VALUES (8, 2, 5, 1, 11, 6, 3);


 


 


 


 


 


 


 


 


 



 

 


 




