import { test, expect } from "@playwright/test";
import { runQuery } from "../testData/utils/db";
import queryData from "../testData/queryData.json";
import { QueryValidationPage } from "../pageObjects/queryValidationPage";
import path from "path";
import excelToJson from "convert-excel-to-json";


test.describe("validation with excel sheet ",async()=>{
    
    test("1.List all projects with manager names",async()=>{
       
    const queryValPage=new QueryValidationPage();   
        const excelResult = excelToJson({
             sourceFile: path.join(__dirname, "../testData/SQL.xlsx"),
             sheets:["Q1"],
            header: { rows: 1 },
            range:"A1:C10",
            columnToKey: {
                A: "project_id",
                B: "project_name",
                C: "manager_name"
            },
            includeEmptyLines:false,

        });
        const excelData=excelResult["Q1"];
        console.log("Data from excel sheet:",excelData);
        const dbColNames=await queryValPage.queryOutputColumns(queryData.query1.query);
        const dbRowVals=await queryValPage.queryOutputRows(queryData.query1.query);
        console.log("col names:",dbColNames);
        const excelColumns=Object.keys(excelData[0]);
        console.log("excel col names:",excelColumns);
        expect(dbColNames).toEqual(excelColumns);
        console.log("no of rows from excel: ",excelData.length);
        console.log("no of rows from db : ",dbRowVals.length);
        expect(dbRowVals.length).toEqual(excelData.length);
            for(let i=0;i< excelData.length;i++){
                const dbRow=dbRowVals[i];
                const excelRow=excelData[i];
 
                for (const col of excelColumns as any) {    //loop through each col name - project_id, project_name, manager_name
                     expect(dbRow[col]).toBeDefined();// to check col value exist 
                     expect(String(dbRow[col])).toBe(String(excelRow[col]));
                     console.log("the db row value            : ",dbRow[col]); 
                     console.log("matches the excel row value : ",excelRow[col]);
                   
                     
            }
        }

    });
    test("2.list of projects where levi king is a partner",async()=>{

        const queryValPage=new QueryValidationPage();   
        const excelResult = excelToJson({
             sourceFile: path.join(__dirname, "../testData/SQL.xlsx"),
             sheets:["Q2"],
            header: { rows: 1 },
            range:"A1:E5",
            columnToKey: {
                A: "user_name",
                B: "project_name",
                C: "project_guid",
                D: "project_id",
                E: "teamrole_name"
            },
            includeEmptyLines:false,

        });
        console.log("Data from excel sheet:",excelResult);
        const user_name1='Levi King';
        const team_role='Partner';
        const query=await runQuery(queryData.query2.query,[team_role,user_name1]);//array of row objects
        console.log("data from db: ",query);
        const dbColumns=Object.keys(query[0]);//col names from the row object
        console.log("db Columns :",dbColumns);
        const dbVal=Object.values(query[0]);
        console.log("db Values :",dbVal);
        const excelData=excelResult["Q2"];
        const excelColNames=excelData[0];
        console.log("excel col names :",excelColNames);
        const excelColumns=Object.keys(excelColNames);
        console.log(excelColumns);
        expect(dbColumns).toEqual(excelColumns);
      
        

    });

});
