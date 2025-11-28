import { expect } from "@playwright/test";
import { runQuery } from "../testData/utils/db";
import queryData from "../testData/queryData.json";


export class QueryValidationPage {

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
}