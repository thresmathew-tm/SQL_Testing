import { expect } from "@playwright/test";
import { runQuery } from "../testData/utils/db";

export class EtlValidationPage {


tables = {
      table_source:["src_employee","src_department","src_job"],
      table_target:["tgt_employee","tgt_department","tgt_job","tgt_fact_salary"],
      both_tables:["src_employee","src_department","src_job","tgt_employee","tgt_department","tgt_job","tgt_fact_salary"],
      tc10:["1. Validate job_sk mapping","2. Validate dept_sk mapping","3. Validate manager_sk mapping"],
      tc03:["tgt_employee table","tgt_department table","tgt_job table","tgt_fact_salary table"]
} as const;

queryV={
  qcount2:["v1","v2"],//8
  qcount3:["v1","v2","v3"],//1,4,5,6,10,17
  qcount4:["v1","v2","v3","v4"],//2,7,15,16
  qcount7:["sv1","sv2","sv3","tv1","tv2","tv3","tv4"],
} as const;

resultKeys={ 
  TC06:{
    v1: "distinct_emp_sk",
    v2: "distinct_dept_sk",
    v3: "distinct_job_sk"
  },
  TC01:{
    v1:["emp_id", "first_name", "last_name","email","hire_date","job_code","dept_code","salary","manager_id"],
    v2:["dept_code","dept_name","location"],
    v3:["job_code","job_title","min_salary","max_salary"]
  },
  TC02:{
    v1:["emp_sk","emp_id", "full_name","email","hire_date","job_sk","dept_sk","manager_sk","current_flag","effective_date","end_date"],
    v2:["dept_sk","dept_code","dept_name","location"],  
    v3:["job_sk","job_code","job_title","min_salary","max_salary"],
    v4:["fact_id","emp_sk","salary_date","salary_amount"]
  },
  TC03:{
    v1: ["emp_sk", "job_sk", "dept_sk"],
    v2: ["dept_sk"], 
    v3: ["job_sk"],
    v4: ["fact_id", "emp_sk"]}

}as const;

ExpectedTypes = {
  ExpectedTypes :{
    sv1: {emp_id: "int",first_name: "varchar(50)",last_name: "varchar(50)",email: "varchar(100)",hire_date: "date",job_code: "varchar(10)",dept_code: "varchar(10)",salary: "decimal(10,2)",manager_id: "int"},
    sv2: {dept_code: "varchar(10)",dept_name: "varchar(100)",location: "varchar(50)"},
    sv3: {job_code: "varchar(10)",job_title: "varchar(100)",min_salary: "decimal(10,2)",max_salary: "decimal(10,2)"},
    tv1: {emp_sk: "int",emp_id: "int",full_name: "varchar(150)",email: "varchar(100)",hire_date: "date",job_sk: "int",dept_sk: "int",manager_sk: "int",current_flag: "char(1)",effective_date: "date",end_date: "date"},
    tv2: {dept_sk: "int",dept_code: "varchar(10)",dept_name: "varchar(100)",location: "varchar(50)"},
    tv3: {job_sk: "int",job_code: "varchar(10)",job_title: "varchar(100)",min_salary: "decimal(10,2)",max_salary: "decimal(10,2)"},
    tv4: {fact_id: "int",emp_sk: "int",salary_date: "date",salary_amount: "decimal(10,2)"}
  },
  srcExpectedTypes : {
    v1: {emp_id: "int",first_name: "varchar(50)",last_name: "varchar(50)",email: "varchar(100)",hire_date: "date",job_code: "varchar(10)",dept_code: "varchar(10)",salary: "decimal(10,2)",manager_id: "int"},
    v2: {dept_code: "varchar(10)",dept_name: "varchar(100)",location: "varchar(50)"},
    v3: {job_code: "varchar(10)",job_title: "varchar(100)",min_salary: "decimal(10,2)",max_salary: "decimal(10,2)"}
  },
   tgtExpectedTypes : {
    v1: {emp_sk: "int",emp_id: "int",full_name: "varchar(150)",email: "varchar(100)",hire_date: "date",job_sk: "int",dept_sk: "int",manager_sk: "int",current_flag: "char(1)",effective_date: "date",end_date: "date"},
    v2: {dept_sk: "int",dept_code: "varchar(10)",dept_name: "varchar(100)",location: "varchar(50)"},
    v3: {job_sk: "int",job_code: "varchar(10)",job_title: "varchar(100)",min_salary: "decimal(10,2)",max_salary: "decimal(10,2)"},
    v4: {fact_id: "int",emp_sk: "int",salary_date: "date",salary_amount: "decimal(10,2)"}
  }
}as const;

async isInt(val: any): Promise<boolean> {
  return val === null || Number.isInteger(Number(val));
}

async isVarchar(val: any): Promise<boolean> {
  return val === null || typeof val === "string";
}

async isChar1(val: any): Promise<boolean> {
  return val === null || (typeof val === "string" && val.length === 1);
}

async isDate(val: any): Promise<boolean> {
  if (val === null) return true;
  return !isNaN(Date.parse(val));
}

async isDecimal(val: any): Promise<boolean> {
  return val === null || !isNaN(parseFloat(val));
}
async isBoolean(val: any): Promise<boolean> {
  return val === null || typeof val === "boolean" || val === 0 || val === 1;
}   
async validateValueByType(value: any, expectedType: string): Promise<boolean> {
  if (expectedType.startsWith("varchar")) 
    {return await this.isVarchar(value);}
  if (expectedType.startsWith("char")) 
    {return await this.isChar1(value);}
  if (expectedType.startsWith("decimal")) 
    {return await this.isDecimal(value);}
  if (expectedType === "int") 
    {return await this.isInt(value);}
  if (expectedType === "date") 
    {return await this.isDate(value);}

  return false; // unknown type
}
async testDataType( expectedColumns: string[], 
  queryV: readonly string[], 
  tableData: Record<string, any>[],
  ExpectedTypes: Record<string, Record<string, string>>,i: number) {

  for (const col of expectedColumns) {
        const expectedType = (ExpectedTypes[queryV[i]] as Record<string, string>)[col];
        console.log(`Validating column: ${col} (expected: ${expectedType})`);

        for (const row of tableData) {
          const value = row[col];
          const isValid = etlValidationPage.validateValueByType(value, expectedType); 
            if (!isValid) {
            console.log(` Invalid value for ${col}:`, value);
          }
            expect(isValid).toBeTruthy();
        }
    }
  

}

async validateQueryResultLength(result: any,len:number)
{
        expect(result.length).toBe(len);
                if(result.length==len){
                   if(result.length==0){
                  console.log(`Expected result - ${result.length} Empty `);
                  }
                  else{
                    console.log(`Expected result length ${len}, and got ${result.length}`);
                    console.log("Result :",result);
                  }
                }
                else if(result.length!==len){
                  throw new Error(`Expected result length ${len}, but got ${result.length}`); 
                }
              
}
}
export const etlValidationPage = new EtlValidationPage(); 
