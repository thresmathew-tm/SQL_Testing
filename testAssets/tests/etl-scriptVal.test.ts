// import { test, expect } from "@playwright/test";
// import { runQuery } from "../testData/utils/db";
// import queryData from "../testData/etlScriptValQuery.json";
// import { QueryValidationPage } from "../pageObjects/queryValidationPage";

// test.describe("validation",async()=>{
// test("TC-01.validating all source table has expected columns", async () => {
//     await test.step("1.src_employee table",async()=>{
//         const rows = await runQuery(queryData["validation 1"].query.v1);
//         const columns = rows.map((r: any) => r.Field);
//         console.log("src_employee table");
//         expect(columns).toEqual(["emp_id", "first_name", "last_name","email","hire_date","job_code","dept_code","salary","manager_id"]);
//     });
//     await test.step("2.src_department table",async()=>{
//         const rows = await runQuery(queryData["validation 1"].query.v2);
//         const columns = rows.map((r: any) => r.Field);
//         console.log("src_department table");
//         expect(columns).toEqual(["dept_code","dept_name","location"]);
//     });
//     await test.step("3.src_job table",async()=>{
//         const rows = await runQuery(queryData["validation 1"].query.v3);
//         const columns = rows.map((r: any) => r.Field);
//         console.log("src_job table");
//         expect(columns).toEqual(["job_code","job_title","min_salary","max_salary"]);
//     });
// });
// test("TC-02.validating all target table has expected columns", async () => {
//     await test.step("1.tgt_employee table",async()=>{
//         const rows = await runQuery(queryData["validation 2"].query.v1);
//         const columns = rows.map((r: any) => r.Field);
//         console.log("tgt_employee table");
//         expect(columns).toEqual(["emp_sk","emp_id", "full_name","email","hire_date","job_sk","dept_sk","manager_sk","current_flag","effective_date","end_date"]);
//     });
//     await test.step("2.tgt_department table",async()=>{
//         const rows = await runQuery(queryData["validation 2"].query.v2);
//         const columns = rows.map((r: any) => r.Field);
//         console.log("tgt_department table");
//         expect(columns).toEqual(["dept_sk","dept_code","dept_name","location"]);
//     });
//     await test.step("3.tgt_job table",async()=>{
//         const rows = await runQuery(queryData["validation 2"].query.v3);
//         const columns = rows.map((r: any) => r.Field);
//         console.log("tgt_job table");
//         expect(columns).toEqual(["job_sk","job_code","job_title","min_salary","max_salary"]);
//     });
//     await test.step("4.tgt_fact_salary table",async()=>{
//         const rows = await runQuery(queryData["validation 2"].query.v4);
//         const columns = rows.map((r: any) => r.Field);
//         console.log("tgt_fact_salary table");
//         expect(columns).toEqual(["fact_id","emp_sk","salary_date","salary_amount"]);
//     });
// });
//         //validation of queries
//     test("TC-03: Validate Indexes on SK and FK Columns", async () => {
//         const queryValPage=new QueryValidationPage();
//            const expectedIndexes = {
//             tgt_employee: ["emp_sk", "job_sk", "dept_sk"],
//             tgt_department: ["dept_sk"],
//             tgt_job: ["job_sk"],
//             tgt_fact_salary: ["fact_id", "emp_sk"]
//         } as const;
//          const tables: TableName[] = [
//             "tgt_employee",
//             "tgt_department",
//             "tgt_job",
//             "tgt_fact_salary"
//         ];
//         type TableName = keyof typeof expectedIndexes;

//         for (const table of Object.keys(expectedIndexes) as TableName[]) 
//             {
//                 console.log(`\nChecking indexes for table: ${table}`);
//                 const result: any = await runQuery(`SHOW INDEX FROM targetdb.${table}`);
//                 //const result: any = await runQuery(queryData["validation 3"].query.v1);
//                 const indexColumns = result.map((r: any) => r.Column_name);
//                 const expectedColumns = expectedIndexes[table];
//                   console.log("Expected:", expectedColumns);
//                   console.log("Actual:", indexColumns);
//                 expectedColumns.forEach(col => {
//                     expect(indexColumns).toContain(col);
//                      })
//             }
//         });

//     test("TC-07: Check mandatory columns for NULL",async()=>{
//          const queryV=["v1","v2","v3","v4"] as const;
//          for (let i=0;i<queryV.length;i++){
//                 //const result1 = await runQuery(queryData["validation 7"].query.v1);
//                 const result = await runQuery(queryData["validation 7"].query[queryV[i]]);
//                 console.log("running query :",`v${i+1}`);
//                 console.log("result :",result);
//                 expect(result.length).toBe(0);
//          }
         
         
//     });
    
   
//      test("TC-04: Source vs target count validation",async()=>{
//                 const result = await runQuery(queryData["validation 4"].query.v1);
//                 expect(result.length).toBe(2);

//                 const srcCount = result[0].cnt;
//                 const tgtCount = result[1].cnt;

//                 console.log("Source Count:", srcCount);
//                 console.log("Target Count:", tgtCount);
//                 expect(srcCount).toBe(tgtCount);

//             });
//     });

// //     test("TC-05: Check for duplicates in source",async()=>{

// //     });
// //     test("TC-06: Check surrogate key uniqueness",async()=>{

// //     });

// //   test("TC-08: Confirm date formats & precision",async()=>{

// //     });
//     // test("TC-09: Validate full_name transformation",async()=>{

//     // });
//     // test("TC-10: Validate sk mapping",async()=>{
//     //     test.step("1. Validate job_sk mapping",async()=>{

//     //     });
//     //     test.step("2. Validate dept_sk mapping",async()=>{

//     //     });
//     //     test.step("3. Validate manager_sk mapping",async()=>{

//     //     });
//     // });
//     // test("TC-11: Validate salary fact load table for any salary mismatch" ,async()=>{

//     // });

//     // test("TC-12: Validate SCD Type-2 logic",async()=>{

//     // });
//     // test("TC-13: Validate foreign keys",async()=>{

//     // });
//     // test("TC-14: Validate manager hierarchy",async()=>{

//     // });
//     // test("TC-15: Full data comparison - validation of all etl transformations :  return mismatch records",async()=>{

//     // });

