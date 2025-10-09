import dotenv from "dotenv";
dotenv.config();

import Migrator from "../migrator.js"; // ✅ correct relative path
 // correct relative path
import DB from "../db/db.js";

(async () => {
  try {
    const tables = {
      participants: "users.sql", // key: collection name, value: SQL file
    };

    const result = await Migrator.migrate(tables);

    console.log("Migration Result:");
    console.log(result);
  } catch (err) {
    console.error("Migration Error:", err);
  }
})();
