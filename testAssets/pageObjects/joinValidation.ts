import { expect } from "@playwright/test";
import { runQuery } from "../testData/utils/db";

export class JoinValidationPage {
  constructor(private dbName: string) {}
  //queries
  q1='SELECT p.project_name, pdm.workflow_type_id FROM projects p JOIN proj_details_map pdm ON p.project_id = pdm.project_id;';
  q2='SELECT * FROM projects p JOIN proj_details_map pdm ON p.project_id = pdm.project_id JOIN controls c ON pdm.control_id = c.control_id;';

//validations
   v1= (rows: any[]) => {expect(rows.length).toBeGreaterThan(0); for (const row of rows) {expect(row).toHaveProperty("project_name");expect(row).toHaveProperty("workflow_type_id");}};
   v2=(rows: any[]) => {expect(rows.length).toBeGreaterThan(0);for (const row of rows) {expect(row).toHaveProperty("project_name"); expect(row).toHaveProperty("control_title");}};

  //  Get column count for a single table
  async getColumnCount(table: string): Promise<number> {
    const result = await runQuery<{ count: number }>(
      `SELECT COUNT(*) as count FROM INFORMATION_SCHEMA.COLUMNS 
       WHERE TABLE_NAME = ? AND TABLE_SCHEMA = ?`,
      [table, this.dbName]
    );
    return result[0].count;
  }

  // Get output column count from query results
  getOutputColumnCount(rows: any[]): number {
    return rows.length > 0 ? Object.keys(rows[0]).length : 0;
  }

  // Validate column count
  async validateJoin(level: number, query: string, tables: string[]) {
    console.log(`\nRunning JOIN level ${level}`);

    // Run the join query
    const rows = await runQuery<any>(query);
    expect(rows.length).toBeGreaterThan(0);
    const outputColumns = this.getOutputColumnCount(rows);

    // Sum source column counts
    let totalSourceColumns = 0;
    for (const table of tables) {
      const count = await this.getColumnCount(table);
      totalSourceColumns += count;
    }

    console.log(`Level ${level}:
        - Source Tables: ${tables.join(", ")}
        - Total Source Columns: ${totalSourceColumns}
        - Output Columns: ${outputColumns}`);
    expect(outputColumns).toBeLessThanOrEqual(totalSourceColumns);
    expect(outputColumns).toBeGreaterThan(0);
  }
}
