import { test, expect } from "@playwright/test";
import { runQuery } from "../testData/utils/db";
import queryData from "../testData/etlScriptValQuery.json";
import { QueryValidationPage } from "../pageObjects/queryValidationPage";
import { etlValidationPage } from "../pageObjects/etlValPage.page";

test.describe("ETL Validation Tests", async () => {
    
test("TC-01.validating all source table has expected columns", async () => {
    await test.step("1.src_employee table",async()=>{
        const rows = await runQuery(queryData["validation 1"].query.v1);
        const columns = rows.map((r: any) => r.Field);
        console.log("src_employee table");
        expect(columns).toEqual(["emp_id", "first_name", "last_name","email","hire_date","job_code","dept_code","salary","manager_id"]);
    });
    await test.step("2.src_department table",async()=>{
        const rows = await runQuery(queryData["validation 1"].query.v2);
        const columns = rows.map((r: any) => r.Field);
        console.log("src_department table");
        expect(columns).toEqual(["dept_code","dept_name","location"]);
    });
    await test.step("3.src_job table",async()=>{
        const rows = await runQuery(queryData["validation 1"].query.v3);
        const columns = rows.map((r: any) => r.Field);
        console.log("src_job table");
        expect(columns).toEqual(["job_code","job_title","min_salary","max_salary"]);
    });
});

test("TC-02.validating all target table has expected columns", async () => {
    await test.step("1.tgt_employee table",async()=>{
        const rows = await runQuery(queryData["validation 2"].query.v1);
        const columns = rows.map((r: any) => r.Field);
        console.log("tgt_employee table");
        expect(columns).toEqual(["emp_sk","emp_id", "full_name","email","hire_date","job_sk","dept_sk","manager_sk","current_flag","effective_date","end_date"]);
    });
    await test.step("2.tgt_department table",async()=>{
        const rows = await runQuery(queryData["validation 2"].query.v2);
        const columns = rows.map((r: any) => r.Field);
        console.log("tgt_department table");
        expect(columns).toEqual(["dept_sk","dept_code","dept_name","location"]);
    });
    await test.step("3.tgt_job table",async()=>{
        const rows = await runQuery(queryData["validation 2"].query.v3);
        const columns = rows.map((r: any) => r.Field);
        console.log("tgt_job table");
        expect(columns).toEqual(["job_sk","job_code","job_title","min_salary","max_salary"]);
    });
    await test.step("4.tgt_fact_salary table",async()=>{
        const rows = await runQuery(queryData["validation 2"].query.v4);
        const columns = rows.map((r: any) => r.Field);
        console.log("tgt_fact_salary table");
        expect(columns).toEqual(["fact_id","emp_sk","salary_date","salary_amount"]);
    });
});

test("TC-03: Validate Indexes on SK and FK Columns", async () => {
        const queryValPage=new QueryValidationPage();
           const expectedIndexes = {
            tgt_employee: ["emp_sk", "job_sk", "dept_sk"],
            tgt_department: ["dept_sk"],
            tgt_job: ["job_sk"],
            tgt_fact_salary: ["fact_id", "emp_sk"]
        } as const;
         const tables: TableName[] = [
            "tgt_employee",
            "tgt_department",
            "tgt_job",
            "tgt_fact_salary"
        ];
        type TableName = keyof typeof expectedIndexes;

        for (const table of Object.keys(expectedIndexes) as TableName[]) 
            {
                console.log(`\nChecking indexes for table: ${table}`);
                const result: any = await runQuery(`SHOW INDEX FROM targetdb.${table}`);
                //const result: any = await runQuery(queryData["validation 3"].query.v1);
                const indexColumns = result.map((r: any) => r.Column_name);
                const expectedColumns = expectedIndexes[table];
                  console.log("Expected:", expectedColumns);
                  console.log("Actual:", indexColumns);
                expectedColumns.forEach(col => {
                    expect(indexColumns).toContain(col);
                     })
            }
});

test("TC-04: Source vs target count validation",async()=>{
             const queryV=etlValidationPage.queryV.qcount3;
             for (let i=0;i<queryV.length;i++){
                const result = await runQuery(queryData["validation 4"].query[queryV[i]]);
                etlValidationPage.validateQueryResultLength(result,2);

                const srcCount = result[0].cnt;
                const tgtCount = result[1].cnt;

                console.log("Source Count:", srcCount);
                console.log("Target Count:", tgtCount);
                expect(srcCount).toBe(tgtCount);
             }

});

test("TC-05: Check for duplicates in source",async()=>{
     const queryV=etlValidationPage.queryV.qcount3;
         for (let i=0;i<queryV.length;i++){
                //const result1 = await runQuery(queryData["validation 7"].query.v1);
                const result = await runQuery(queryData["validation 5"].query[queryV[i]]);
                console.log("running query :",`v${i+1}`);
                etlValidationPage.validateQueryResultLength(result,0);
         }
         

});

test("TC-06: Check surrogate key uniqueness",async()=>{
        const queryV=etlValidationPage.queryV.qcount3;
        const resultKeys = etlValidationPage.resultKeys.TC06;

         for (let i=0;i<queryV.length;i++){
        const result = await runQuery(queryData["validation 6"].query[queryV[i]]);
        const totalRows = result[0].total_rows;
        const distinctRows = result[0][resultKeys[queryV[i]]];
        console.log("Total Rows:", totalRows);
        console.log("Distinct emp_sk:", distinctRows);
        expect(totalRows).toBe(distinctRows);
        }
});

test("TC-07: Check mandatory columns for NULL",async()=>{
         const queryV=etlValidationPage.queryV.qcount4;
         for (let i=0;i<queryV.length;i++){
                //const result1 = await runQuery(queryData["validation 7"].query.v1);
                const result = await runQuery(queryData["validation 7"].query[queryV[i]]);
                console.log("running query :",`v${i+1}`);
                etlValidationPage.validateQueryResultLength(result,0);
         }
         
         
});

test("TC-08 Confirm date formats & salary precision, )", async()=>{
        const queryV=etlValidationPage.queryV.qcount2;
        for (let i=0;i<queryV.length;i++){
                const result = await runQuery(queryData["validation 8"].query[queryV[i]]);
                console.log("running query :",`v${i+1}`);
                etlValidationPage.validateQueryResultLength(result,0);
        }
    
});

test("TC-09: Validate full_name transformation",async()=>{
    const result=await runQuery(queryData["validation 9"].query);
    console.log("result table :",result);
    for(let i=0;i<result.length;i++){
        const full_name = result[i].full_name;
        const expected_full_name=result[i].expected_full_name;
        console.log("full_name : ",full_name," expected_full_name : ",expected_full_name);
        expect(full_name).toBe(expected_full_name);
    }

});

test("TC-10: Validate sk mapping",async()=>{
            const queryV=etlValidationPage.queryV.qcount3;
            const step=etlValidationPage.tables.tc10;
            for(let i=0;i<queryV.length;i++){
                console.log("executing step : ",step[i]);
                const result=await runQuery(queryData["validation 10"].query[queryV[i]]);
                etlValidationPage.validateQueryResultLength(result,0);
            }  
});

test("TC-11: Validate salary fact load table for any salary mismatch" ,async()=>{

                const result=await runQuery(queryData["validation 11"].query);
                etlValidationPage.validateQueryResultLength(result,0);
});

test("TC-12: Validate SCD Type-2 logic",async()=>{
                const result=await runQuery(queryData["validation 12"].query);
                etlValidationPage.validateQueryResultLength(result,0);

});

test("TC-13: Validate foreign keys",async()=>{
                const result=await runQuery(queryData["validation 13"].query);
                etlValidationPage.validateQueryResultLength(result,0);

});

test("TC-14: Validate manager hierarchy",async()=>{

                const result=await runQuery(queryData["validation 14"].query);
               etlValidationPage.validateQueryResultLength(result,0);
});

test("TC-15: Full data comparison - validation of all etl transformations :  return mismatch records",async()=>{

            const queryV=etlValidationPage.queryV.qcount4;
            for(let i=0;i<queryV.length;i++){
                const result=await runQuery(queryData["validation 15"].query[queryV[i]]);
                console.log("executing : ",queryV[i]);
              etlValidationPage.validateQueryResultLength(result,0);
            }


});

test("TC-01-AGAIN.validating all source table has expected columns", async () => {
    const queryV=etlValidationPage.queryV.qcount3;
    const val=etlValidationPage.resultKeys.TC01;
    const expectedTypes =etlValidationPage.ExpectedTypes.srcExpectedTypes;
    const step=etlValidationPage.tables.table_source;
    for (let i=0;i<queryV.length;i++){
        const results = await runQuery(queryData["validation 1"].query[queryV[i]]);
        const columns = results.map((r: any) => r.Field);
        console.log("executing : ",step[i]);
        expect(columns).toEqual(val[queryV[i]]);
        for(let j=0;j<results.length;j++){
            const columnName = String(results[j].Field);
            const dataType = String(results[j].Type);
            const expectedType = (expectedTypes[queryV[i]] as Record<string, string>)[columnName];
            console.log(`Column: ${columnName}, Expected Type: ${expectedType}, Actual Type: ${dataType}`);
            expect(dataType).toBe(expectedType);
        }   
    }


});

test("TC-02-AGAIN.validating all target table has expected columns", async () => {
    const queryV=etlValidationPage.queryV.qcount4;
    const val=etlValidationPage.resultKeys.TC02;
    const tgtExpectedTypes = etlValidationPage.ExpectedTypes.tgtExpectedTypes;
    const step=etlValidationPage.tables.table_target;
    for (let i=0;i<queryV.length;i++){
        const results = await runQuery(queryData["validation 2"].query[queryV[i]]);
        const columns = results.map((r: any) => r.Field);
        console.log("executing : ",step[i]);
        expect(columns).toEqual(val[queryV[i]]);
        for(let j=0;j<results.length;j++){
            const columnName = String(results[j].Field);
            const dataType = String(results[j].Type);
            const expectedType = (tgtExpectedTypes[queryV[i]] as Record<string, string>)[columnName];
            console.log(`Column: ${columnName}, Expected Type: ${expectedType}, Actual Type: ${dataType}`);
            expect(dataType).toBe(expectedType);
        }  
    }
});

test("TC-03-AGAIN: Validate Indexes on SK and FK Columns", async () => {
        const queryV=etlValidationPage.queryV.qcount4;
        const expectedIndexes =etlValidationPage.resultKeys.TC03;
        const step=etlValidationPage.tables.tc03;
        for (let i=0;i<queryV.length;i++){
               const result: any = await runQuery(queryData["validation 3"].query[queryV[i]]);
                const indexColumns = result.map((r: any) => r.Column_name);// map loops every row and extracts Column_name from each row
                //const indexColumns=result[i].Column_name;
                const expectedColumns = expectedIndexes[queryV[i]];
                  console.log("executing : ",step[i]);
                  console.log("Expected:", expectedColumns);
                  console.log("Actual:", indexColumns); 
                expect (indexColumns).toStrictEqual(expectedColumns);
            }               
});

test("TC-16 Schema validation for target tables", async () => {

    const queryV=etlValidationPage.queryV.qcount4;
    const tables =etlValidationPage.tables.table_target;
    const tgtExpectedTypes =etlValidationPage.ExpectedTypes.tgtExpectedTypes;
    for (let i = 0; i < queryV.length; i++) {
    console.log("\nValidating table:", tables[i]);
    const schemaRows = await runQuery(queryData["validation 2"].query[queryV[i]]);
    const actualColumns = schemaRows.map((r: any) => r.Field);
    const expectedColumns = Object.keys(tgtExpectedTypes[queryV[i]]as Record<string, string>);
    expect(actualColumns).toEqual(expectedColumns);

    const tableData = await runQuery(queryData["validation 16"].query[queryV[i]]);
    console.log("table data",tableData);
    await etlValidationPage.testDataType( expectedColumns, queryV, tableData, tgtExpectedTypes,i);
    console.log("Datatype validation successful for:", tables[i]);
  }
});

test("TC-17 Schema validation for source tables", async () => {
    const queryV=etlValidationPage.queryV.qcount3;
    const tables = etlValidationPage.tables.table_source;
    const srcExpectedTypes = etlValidationPage.ExpectedTypes.srcExpectedTypes;
    for (let i = 0; i < queryV.length; i++) {
    console.log("\nValidating table:", tables[i]);
    const schemaRows = await runQuery(queryData["validation 1"].query[queryV[i]]);
    const actualColumns = schemaRows.map((r: any) => r.Field);
    const expectedColumns = Object.keys(srcExpectedTypes[queryV[i]]as Record<string, string>);
    expect(actualColumns).toEqual(expectedColumns);
    const tableData = await runQuery(queryData["validation 17"].query[queryV[i]]);
    console.log("table data",tableData);
    await etlValidationPage.testDataType( expectedColumns, queryV, tableData, srcExpectedTypes,i);
    console.log("Datatype validation successful for:", tables[i]);
  }

});

test("TC-18 Schema validation for source and target tables", async()=>{
    const queryV=etlValidationPage.queryV.qcount7;
    const tables = etlValidationPage.tables.both_tables;
    const ExpectedTypes = etlValidationPage.ExpectedTypes.ExpectedTypes;
    for (let i = 0; i < queryV.length; i++) {
    console.log("\nValidating table:", tables[i]);
    const schemaRows = await runQuery(queryData["validation 19"].query[queryV[i]] );
    const actualColumns = schemaRows.map((r: any) => r.Field);
    const expectedColumns = Object.keys(ExpectedTypes[queryV[i]]as Record<string, string>);
    expect(actualColumns).toEqual(expectedColumns);
    const tableData = await runQuery(queryData["validation 18"].query[queryV[i]]);
    console.log("table data",tableData);
    await etlValidationPage.testDataType( expectedColumns, queryV, tableData, ExpectedTypes,i);
    console.log("Datatype validation successful for:", tables[i]);
}

});

test("TC-19: Schema Validation for both tables", async () => {
    type ConfigItem = {
            name: string;
            queryV: readonly string[];    
            tables: readonly string[];
            ExpectedTypes: Record<string, Record<string, string>>;  
            schema_query: Record<string, string>;   
            table_data_query: Record<string, string>;          
};
const config :ConfigItem[]=[
    {
        name: "source_config",
        queryV: etlValidationPage.queryV.qcount3,
        tables: etlValidationPage.tables.table_source,
        ExpectedTypes: etlValidationPage.ExpectedTypes.srcExpectedTypes,
        schema_query: queryData["validation 1"].query,
        table_data_query: queryData["validation 17"].query
    },
    {
        name: "target_config",
        queryV: etlValidationPage.queryV.qcount4,
        tables: etlValidationPage.tables.table_target,
        ExpectedTypes: etlValidationPage.ExpectedTypes.tgtExpectedTypes,
        schema_query: queryData["validation 2"].query,
        table_data_query: queryData["validation 16"].query
    }
] as const;
    
for (let i = 0; i < config.length; i++) {
    const current= config[i];
    console.log(`\nValidating configuration: ${current.name}`);
    for (let j = 0; j < current.queryV.length; j++) {
        console.log("\nValidating table:", current.tables[j]);
        const queryKey=current.queryV[j];
        const schemaRows = await runQuery(current.schema_query[queryKey]);
        const actualColumns = schemaRows.map((r: any) => r.Field);
        const expectedColumns = Object.keys(current.ExpectedTypes[queryKey] as Record<string, string>);
        expect(actualColumns).toEqual(expectedColumns);
        const tableData = await runQuery(current.table_data_query[queryKey]);
        console.log("table data", tableData);
        await etlValidationPage.testDataType(expectedColumns, current.queryV, tableData, current.ExpectedTypes, j);
        console.log("Datatype validation successful for:", current.tables[j]);
    }
}



});
});