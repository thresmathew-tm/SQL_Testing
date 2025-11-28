import { test, expect } from "@playwright/test";
import { runQuery } from "../testData/utils/db";
import { JoinValidationPage } from "../pageObjects/joinValidation";

test.describe("testing the working of sql join queries on sqldb",async()=>{
    const dbName = process.env.DB_NAME || "sqldb";
    const joinValPage=new JoinValidationPage(dbName);

    test("join of tables ",async()=>{
        const joins:{
            level:number,query:string,validate:(rows: any[]) => void,tables:string[];}[]=[
            {level:1,query:joinValPage.q1,validate:joinValPage.v1,tables:["projects", "proj_details_map"]},
            {level:2,query:joinValPage.q2,validate:joinValPage.v2,tables:["projects", "proj_details_map", "controls"]},
            // {level:3,query:q3,validate:v3},
            // {level:4,query:q4,validate:v4},
            // {level:5,query:q5,validate:v5} 
        ];

 for (const join of joins) {
      console.log(`\nRunning JOIN level ${join.level}`);
      const results = await runQuery<any>(join.query);

      console.log(`Level ${join.level} — Rows Returned: ${results.length}`);
      console.table(results.slice(0, 3));
      join.validate(results);
     await joinValPage.validateJoin(join.level,join.query,join.tables);
    }
  });
});