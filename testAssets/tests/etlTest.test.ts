import { test, expect } from "@playwright/test";
import { runQuery } from "../testData/utils/db";
import queryData from "../testData/etlScriptValQuery.json";
import { QueryValidationPage } from "../pageObjects/queryValidationPage";
import { etlValidationPage } from "../pageObjects/etlValPage.page";

test.describe("validation",async()=>{
    
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
