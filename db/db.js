

import mongoose from "mongoose";

class DB {
  static connection = null;
    static session = null;

 
  static async connect() {
     try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("DB connection error:", err);
    process.exit(1);
  }
  }

 
  static async insert(modelName, data) {
    try {
      const Model = mongoose.model(modelName);
      const doc = new Model(data);
      await doc.save();
      return true;
    } catch (err) {
      console.error("Insert Error:", err);
      return false;
    }
  }


  static async update(modelName, data, where) {
    try {
      const Model = mongoose.model(modelName);
      const result = await Model.updateMany(where, { $set: data });
      return result.modifiedCount;
    } catch (err) {
      console.error("Update Error:", err);
      return 0;
    }
  }

 
  static async delete(modelName, where) {
    try {
      const Model = mongoose.model(modelName);
      const result = await Model.deleteMany(where);
      return result.deletedCount;
    } catch (err) {
      console.error("Delete Error:", err);
      return 0;
    }
  }

 
  static async select(modelName, columns = null, where = {}, orderBy = {}, limit = 0) {
    try {
      const Model = mongoose.model(modelName);
      let query = Model.find(where);

      if (columns) query = query.select(columns.join(" "));
      if (Object.keys(orderBy).length) query = query.sort(orderBy);
      if (limit > 0) query = query.limit(limit);

      return await query.exec();
    } catch (err) {
      console.error("Select Error:", err);
      return [];
    }
  }

 
  static async query(modelName, query = {}) {
    try {
      const Model = mongoose.model(modelName);
      return await Model.find(query).exec();
    } catch (err) {
      console.error("Query Error:", err);
      return [];
    }
  }

 
  static async count(modelName, where = {}) {
    try {
      const Model = mongoose.model(modelName);
      return await Model.countDocuments(where);
    } catch (err) {
      console.error("Count Error:", err);
      return 0;
    }
  }

  
  static async exists(modelName, where = {}) {
    try {
      const Model = mongoose.model(modelName);
      return await Model.exists(where);
    } catch (err) {
      console.error("Exists Error:", err);
      return false;
    }
  }


  static async truncate(modelName) {
    try {
      const Model = mongoose.model(modelName);
      const result = await Model.deleteMany({});
      return result.deletedCount;
    } catch (err) {
      console.error("Truncate Error:", err);
      return 0;
    }
  }

 
  static async execute(command) {
    try {
      const db = mongoose.connection.db;
      const result = await db.command(command);
      return result;
    } catch (err) {
      console.error("Execute Error:", err);
      return null;
    }
  }


  static async beginTransaction() {
    const session = await mongoose.startSession();
    session.startTransaction();
    this.session = session;
  }

 
  static async commit() {
    if (this.session) {
      await this.session.commitTransaction();
      this.session.endSession();
    }
  }

 
  static async rollback() {
    if (this.session) {
      await this.session.abortTransaction();
      this.session.endSession();
    }
  }

 
  static async close() {
    await mongoose.connection.close();
    this.connection = null;
  }

 
  static isConnected() {
    return mongoose.connection.readyState === 1;
  }

 
  static sanitize(value) {
    if (typeof value === "string") {
      return value.replace(/[^\w\s@.-]/gi, ""); // basic clean
    }
    return value;
  }
}

export default DB;
