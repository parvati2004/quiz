import fs from "fs";
import DB from "./db/db.js";
// Make sure DB class is already created as per previous code

class Migrator {
  /**
   * Migrate tables
   *
   * @param {Object} tables - An object with table names as keys and SQL filenames as values.
   * @returns {Object} - Contains output, error status, and error messages.
   */
  static async migrate(tables) {
    const errors = {};
    const errorMsgs = {};
    let error = false;
    const output = [];

    // Connect to the database
    await DB.connect();

    for (const [table, sqlFile] of Object.entries(tables)) {
      output.push(`Migrating table: ${table}`);

      try {
        // Check if collection already exists
        const collections = await DB.connection.db
          .listCollections({ name: table })
          .toArray();

        if (collections.length > 0) {
          errors[table] = true;
          errorMsgs[table] = "Table already exists";
        } else {
          // Read SQL file content (optional: we can convert SQL to Mongo commands)
          const sql = fs.readFileSync(`models/${sqlFile}`, "utf8");

          // Execute SQL content - in MongoDB, you need to manually create collection if required
          await DB.connection.db.createCollection(table);

          output.push(`Migrated table: ${table}`);
        }
      } catch (err) {
        errors[table] = true;
        errorMsgs[table] = err.message;
      }
    }

    // Close the database connection
    await DB.close();

    // Aggregate error flag
    for (const count of Object.values(errors)) {
      error += count;
    }

    return {
      output,
      error: error ? true : false,
      errorMsgs,
    };
  }
}

export default Migrator;
