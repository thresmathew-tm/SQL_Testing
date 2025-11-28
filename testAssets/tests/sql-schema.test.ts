import { test, expect } from "@playwright/test";
import { runQuery } from "../testData/utils/db";
import { QueryValidationPage } from "../pageObjects/queryValidationPage";

test.describe("schema validation",async()=>{
  const queryValidationPage = new QueryValidationPage();
// test("validating projects table has expected columns", async () => {
//   const rows = await runQuery("DESCRIBE projects");
//   const columns = rows.map((r: any) => r.Field);
//   expect(columns).toEqual(["project_id", "project_name", "manager_id", "project_guid"]);
// });

// test("validating users table has expected columns",async()=>{
//  const rows = await runQuery("DESCRIBE users");
//   const columns = rows.map((r: any) => r.Field);
//   expect(columns).toEqual(["user_id","first_name","last_name","email","password","role_id","created_at"]);
// });

// test("projects table has expected datatypes", async () => {
//   await queryValidationPage.validateTable("projects", queryValidationPage.expectedProjectsTypes);
// });
// test("users table has expected datatypes", async () => {
//   await queryValidationPage.validateTable("users", queryValidationPage.expectedUsersTypes);
// });

test("validate all table structures", async () => {
  await queryValidationPage.validateTable("roles", queryValidationPage.expectedRolesTypes);
  await queryValidationPage.validateTable("users", queryValidationPage.expectedUsersTypes);
  await queryValidationPage.validateTable("projects", queryValidationPage.expectedProjectsTypes);
  await queryValidationPage.validateTable("risks", queryValidationPage.expectedRisksTypes);
  await queryValidationPage.validateTable("controls", queryValidationPage.expectedControlsTypes);
  await queryValidationPage.validateTable("fs", queryValidationPage.expectedFsTypes);
  await queryValidationPage.validateTable("versions", queryValidationPage.expectedVersionsTypes);
  await queryValidationPage.validateTable("workflow_type", queryValidationPage.expectedWorkflowTypeTypes);
  await queryValidationPage.validateTable("project_teamrole", queryValidationPage.expectedProjectTeamroleTypes);
  await queryValidationPage.validateTable("teamrole_permissions", queryValidationPage.expectedTeamrolePermissionsTypes);
  await queryValidationPage.validateTable("teamrole_permission_map", queryValidationPage.expectedTeamrolePermissionMapTypes);
  await queryValidationPage.validateTable("role_permissions", queryValidationPage.expectedRolePermissionsTypes);
  await queryValidationPage.validateTable("user_projects", queryValidationPage.expectedUserProjectsTypes);
  await queryValidationPage.validateTable("logs", queryValidationPage.expectedLogsTypes);
  await queryValidationPage.validateTable("proj_details_map", queryValidationPage.expectedProjDetailsMapTypes);
});

test("validate all table columns and data types", async () => {
  const tables=queryValidationPage.schemas;

  for (let i=0; i<tables.length; i++) {
    const tableName=tables[i].table;
    const expectedSchema=tables[i].types;
    await queryValidationPage.validateTable(tableName, expectedSchema);
  }  

});

});



