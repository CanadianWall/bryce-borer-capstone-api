/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("user", (table) => {
        table.increments("id").primary();
        table.string("name").notNullable();
        table.string("email").notNullable();
        table.integer("age").notNullable();
        table.string("sex").notNullable();
        table.integer("height").notNullable();
        table.integer("weight").notNullable();
        table.integer("goal_weight").notNullable();
        table.integer("exercise_level").notNullable();
        table.integer("activity_level").notNullable();
        table.integer("tdee").notNullable();
        table.integer("ideal_carbs").notNullable();
        table.integer("ideal_protein").notNullable();
        table.integer("ideal_sugar").notNullable();
        table.string("food_name").notNullable();
        table.integer("portion").notNullable();
        table.integer("calories").notNullable();
        table.integer("carbs").notNullable();
        table.integer("protein").notNullable();
        table.integer("fat").notNullable();
        table.integer("sugar").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
        table
          .timestamp("updated_at")
          .defaultTo(knex.raw("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"));
      })
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable("user");
  };
  