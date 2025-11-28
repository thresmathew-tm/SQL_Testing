import { expect } from "@playwright/test";
import { runQuery } from "../testData/utils/db";
import queryData from "../testData/queryData.json";


export class QueryValidationPage {

  expectedProjectsTypes: Record<string, string> = {
    project_id: "int",
    project_name: "varchar(50)",
    manager_id: "int",
    project_guid: "varchar(50)",
  } as const;

  expectedUsersTypes: Record<string, string> = {
    user_id: "int",
    first_name: "varchar(50)",
    last_name: "varchar(50)",
    email: "varchar(100)",
    password: "varchar(255)",
    role_id: "int",
    created_at: "datetime",
  } as const;
  expectedRolesTypes: Record<string, string> = {
    role_id: "int",
    role_name: "varchar(50)",
  } as const;
  expectedLogsTypes: Record<string, string> = {
    log_id: "int",
    user_id: "int",
    time_stamp: "datetime",
    ip_address: "varchar(45)",
    device_info: "varchar(55)",
  } as const;
  expectedPermissionsTypes: Record<string, string> = {
    permission_id: "int",
    permission_name: "varchar(50)",
  } as const;
  expectedRolePermissionsTypes: Record<string, string> = {
    role_id: "int",
    permission_id: "int",
  } as const;
  expectedUserProjectsTypes: Record<string, string> = {
    user_id: "int",
    project_id: "int",
  } as const;
  expectedRisksTypes: Record<string, string> = {
    risk_id: "int",
    risk_title: "varchar(50)",
    risk_description: "varchar(50)",
  } as const;
  expectedControlsTypes: Record<string, string> = {
    control_id: "int",
    control_title: "varchar(50)",
    control_description: "varchar(50)",
  } as const;
  expectedFsTypes: Record<string, string> = {
    fs_id: "int",
    fs_process: "varchar(50)",
    fs_business_process: "varchar(50)",
    risk_id: "int",
    control_id: "int",
  } as const;
  expectedWorkflowTypeTypes: Record<string, string> = {
    workflow_type_id: "int",
    workflow_name: "varchar(50)",
    workflow_description: "varchar(50)",
  } as const;
  expectedProjectTeamroleTypes: Record<string, string> = {
    teamrole_id: "int",
    teamrole_name: "varchar(50)",
  } as const;
  expectedVersionsTypes: Record<string, string> = {
    version_id: "int",
    version_name: "varchar(50)",
    version_date: "date",
  } as const;
  expectedTeamrolePermissionsTypes: Record<string, string> = {
    teamrole_permission_id: "int",
    teamrole_permission_name: "varchar(50)",
  } as const;
  expectedTeamrolePermissionMapTypes: Record<string, string> = {
    teamrole_id: "int",
    teamrole_permission_id: "int",
  } as const;
  expectedProjDetailsMapTypes: Record<string, string> = {
    project_id: "int",
    workflow_type_id: "int",
    version_id: "int",
    fs_id: "int",
    control_id: "int",
    risk_id: "int",
    teamrole_id: "int",
  } as const;

schemas = [
    { table: "roles", 
      types: this.expectedRolesTypes },
    { table: "users", 
      types: this.expectedUsersTypes },
    { table: "projects", 
      types: this.expectedProjectsTypes },
    { table: "risks", 
      types: this.expectedRisksTypes },
    { table: "controls", 
      types: this.expectedControlsTypes },
    { table: "fs", 
      types: this.expectedFsTypes },
    { table: "versions", 
      types: this.expectedVersionsTypes },
    { table: "workflow_type", 
      types: this.expectedWorkflowTypeTypes },
    { table: "project_teamrole", 
      types: this.expectedProjectTeamroleTypes },
    { table: "teamrole_permissions", 
      types: this.expectedTeamrolePermissionsTypes },
    { table: "teamrole_permission_map", 
      types: this.expectedTeamrolePermissionMapTypes },
    { table: "role_permissions", 
      types: this.expectedRolePermissionsTypes },
    { table: "user_projects", 
      types: this.expectedUserProjectsTypes },
    { table: "logs", 
      types: this.expectedLogsTypes },
    { table: "proj_details_map", 
      types: this.expectedProjDetailsMapTypes },
  ];


    async queryOutputColumns(query_no:string ){
      const query = await runQuery(query_no);
        const colnames = query[0];
        const columns=Object.keys(colnames);
        return columns;

  }
async queryOutputRows(query_no: string) {
  const query = await runQuery(query_no);
  return query; // returns array of rows
}


    async queryOutputColumnsParam(query_no: string, params: any[] = []){
      const query = await runQuery(query_no,params);
        const colnames = query[0];
        const columns=Object.keys(colnames);
        return columns;

  }
  async queryLengthValidation(query_no:string){
    const query = await runQuery(query_no);
    return query.length;
  }

  async queryLengthValidationParams(query_no:string,params:any[]=[]){
    const query = await runQuery(query_no,params);
    return query.length;
  }

  async getColValue(query_no:string,col_name:any){
    const query=await runQuery(query_no);
    const colVal=query.every(query=>query.user_name===col_name);
    return colVal;
  }

  async  validateTable(tableName: string, expectedTypes: Record<string, string>) {
      const rows = await runQuery(`DESCRIBE ${tableName}`);
      const actualColumns = rows.map((r: any) => r.Field);
      const expectedColumns = Object.keys(expectedTypes);

      expect(actualColumns).toEqual(expectedColumns);
      for (const row of rows) {
        const columnName = row.Field;
        const actualType = row.Type;
        const expectedType = expectedTypes[columnName];

        expect(expectedType).toBeDefined();
        expect(actualType).toBe(expectedType);
      }
}

}
