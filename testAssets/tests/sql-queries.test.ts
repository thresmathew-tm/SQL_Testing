import { test, expect } from "@playwright/test";
import { runQuery } from "../testData/utils/db";
import queryData from "../testData/queryData.json";
import { QueryValidationPage } from "../pageObjects/queryValidationPage";

test.describe("testing of working of sql queries",async()=>{
    const queryValPage=new QueryValidationPage();
    test("1.List all projects with manager names",async()=>{
      
        // const query = await runQuery(queryData.query1.query);
        // const colnames = query[0];
        // const columns=Object.keys(colnames);
        // expect(columns).toEqual(["project_id","project_name","manager_name"]);
        // expect(query.length).toEqual(8);

        const cols=await queryValPage.queryOutputColumns(queryData.query1.query);
        expect(cols).toEqual(["project_id","project_name","manager_name"]);
        const q_len=await queryValPage.queryLengthValidation(queryData.query1.query);
        expect(q_len).toEqual(8);

    });

    test("2.list of projects where levi king is a partner",async()=>{
        console.log("executing 2....");
        const user_name1='Levi King';
        const team_role='Partner';
        const query=await runQuery(queryData.query2.query,[team_role,user_name1]);//array of row objects
        //console.log(query);
            const colnames = query[0];// first column-col having names/titles
            //console.log(colnames);
            const columns=Object.keys(colnames);//col names from the row object
            //console.log(columns);
            //const val=Object.values(colnames);console.log(val);
            expect(columns).toEqual(["user_name","project_name","project_guid","project_id","teamrole_name"]);
            expect(query.length).toEqual(3);
            const allNames=query.every(query=>query.user_name===user_name1);
            expect(allNames).toBeTruthy();
            const allRoles=query.every(query=>query.teamrole_name===team_role);
            expect(allRoles).toBeTruthy();
            console.log('all names are same as:',`${user_name1}`);
            console.log('all team roles are same as',`${team_role}`);

    });
    test("3.find the project names and guid of the projects that are linked to the control activities that are linked to the any particular risk-Data Breach",async()=>{
        const risk_name='Data Breach';
        const query=await runQuery(queryData.query3.query,[risk_name]);
        const column_names= query[0];
        const columns=Object.keys(column_names);
        expect(columns).toEqual(["project_name","project_guid","control_title","risk_title"]);
        expect(query.length).toEqual(2);
        const allrisks=query.every(query=>query.risk_title===risk_name);
        expect(allrisks).toBeTruthy();
        console.log('all risks are :',`${risk_name}`);
    });


    test("4.list each user and their roles",async()=>{
            const q4=await queryValPage.queryOutputColumns(queryData.query4.query);
        expect(q4).toEqual(["user_id","full_name","role_name"]);
        const q4l=await queryValPage.queryLengthValidation(queryData.query4.query);
        expect(q4l).toBeGreaterThan(0);

    });

    test("5.Show which users are assigned to which projects",async()=>{
            const q5=await queryValPage.queryOutputColumns(queryData.query5.query);
        expect(q5).toEqual(["first_name","last_name","project_name"]);
        const q5l=await queryValPage.queryLengthValidation(queryData.query5.query);
        expect(q5l).toBeGreaterThan(0);
        
    });
     test("6.Show logs with user full name and role",async()=>{
        const q6=await queryValPage.queryOutputColumns(queryData.query6.query);
        expect(q6).toEqual(["log_id","user_name","role_name","time_stamp","device_info"]);
        const q6l=await queryValPage.queryLengthValidation(queryData.query6.query);
        expect(q6l).toBeGreaterThan(0);
        
    });
    test("7.Show each projects workflow, version, FS, risk, control, and team role",async()=>{
        const q7=await queryValPage.queryOutputColumns(queryData.query7.query);
        expect(q7).toEqual(["project_name","workflow_name","version_name","fs_process","risk_title","control_title","teamrole_name"]);
        const ql7=await queryValPage.queryLengthValidation(queryData.query7.query);
        expect(ql7).toBeGreaterThanOrEqual(1);
    });
    test("8.List industries and associated standards",async()=>{
         const q8=await queryValPage.queryOutputColumns(queryData.query8.query);
        expect(q8).toEqual(["industry_name","standard_title"]);
        const ql8=await queryValPage.queryLengthValidation(queryData.query8.query);
        expect(ql8).toBeGreaterThanOrEqual(1);
    });
    test("9.Show workflow types associated with each industry",async()=>{
         const q9=await queryValPage.queryOutputColumns(queryData.query9.query);
        expect(q9).toEqual(["industry_name","workflow_name"]);
        const ql9=await queryValPage.queryLengthValidation(queryData.query9.query);
        expect(ql9).toBeGreaterThanOrEqual(1);
    });
    test("10.List team roles and their allowed permissions",async()=>{
         const q10=await queryValPage.queryOutputColumns(queryData.query10.query);
        expect(q10).toEqual(["teamrole_name","teamrole_permission_name"]);
        const ql10=await queryValPage.queryLengthValidation(queryData.query10.query);
        expect(ql10).toBeGreaterThanOrEqual(1);
    });
    test("11.Count users per role",async()=>{
         const q11=await queryValPage.queryOutputColumns(queryData.query11.query);
        expect(q11).toEqual(["role_name","user_count"]);
        const ql11=await queryValPage.queryLengthValidation(queryData.query11.query);
        expect(ql11).toBeGreaterThanOrEqual(1);
    });
    // test("12.",async()=>{
        
    // });
//     test("validating no duplicate project_guid in projects", async () => {
//   const duplicates = await runQuery(`
//     SELECT project_guid, COUNT(*) as count
//     FROM projects
//     GROUP BY project_guid
//     HAVING count > 1
//   `);
//   expect(duplicates.length).toBe(0);
// });

// test("should update and verify project GUIDs for project_id 5", async () => {
//     await runQuery(
//       `UPDATE projects SET project_guid = ? WHERE project_id = ?`,
//       ["10504P510", 5]
//     );

//     const results = await runQuery<{ project_id: number; project_guid: string }>(
//       `SELECT project_id, project_guid FROM projects WHERE project_id = ?`,[5]
//     );
//     expect(results).toContainEqual({ project_id: 5, project_guid: "10504P510" });
  
//   });
});
