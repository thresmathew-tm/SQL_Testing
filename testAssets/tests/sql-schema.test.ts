import { test, expect } from "@playwright/test";
import { runQuery } from "../testData/utils/db";

test.describe("schema validation",async()=>{
test("validating projects table has expected columns", async () => {
  const rows = await runQuery("DESCRIBE projects");
  const columns = rows.map((r: any) => r.Field);
  expect(columns).toEqual(["project_id", "project_name", "manager_id", "project_guid"]);
});


test("validating users table has expected columns",async()=>{
 const rows = await runQuery("DESCRIBE users");
  const columns = rows.map((r: any) => r.Field);
  expect(columns).toEqual(["user_id","first_name","last_name","email","password","role_id","created_at"]);
});


test("validating no duplicate project_guid in projects", async () => {
  const duplicates = await runQuery(`
    SELECT project_guid, COUNT(*) as count
    FROM projects
    GROUP BY project_guid
    HAVING count > 1
  `);
  expect(duplicates.length).toBe(0);
});

test("should update and verify project GUIDs for project_id 5", async () => {
    await runQuery(
      `UPDATE projects SET project_guid = ? WHERE project_id = ?`,
      ["10504P510", 5]
    );

    const results = await runQuery<{ project_id: number; project_guid: string }>(
      `SELECT project_id, project_guid FROM projects WHERE project_id = ?`,[5]
    );
    expect(results).toContainEqual({ project_id: 5, project_guid: "10504P510" });
  
  });

});



