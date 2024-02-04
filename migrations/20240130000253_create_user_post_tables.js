/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema
      .createTable("user", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.integer("age").notNullable().defaultTo(0);
        table.string("sex").notNullable();
        table.integer("height").notNullable().defaultTo(0);
        table.integer("weight").notNullable().defaultTo(0);
        table.integer("goal_weight").notNullable().defaultTo(0);
        table.integer("exercise_level").notNullable().defaultTo(0);
        table.integer("activity_level").notNullable().defaultTo(0);
        table.integer("tdee").notNullable().defaultTo(0);
        table.integer("ideal_carbs").notNullable().defaultTo(0);
        table.integer("ideal_protein").notNullable().defaultTo(0);
        table.integer("ideal_fat").notNullable().defaultTo(0);
        table.integer("ideal_sugar").notNullable().defaultTo(0);
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      })
      .createTable("post", (table) => {
        table.increments("id").primary();
        table.string("food_name").notNullable();
        table.integer("portion").notNullable().defaultTo(0);
        table.integer("calories").notNullable().defaultTo(0);
        table.integer("carbs").notNullable().defaultTo(0);
        table.integer("protein").notNullable().defaultTo(0);
        table.integer("fat").notNullable().defaultTo(0);
        table.integer("sugar").notNullable().defaultTo(0);
        table
          .integer("user_id")
          .unsigned()
          .references("user.id")
          .onUpdate("CASCADE")
          .onDelete("CASCADE");
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      });
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("post").dropTable("user");
  };
  