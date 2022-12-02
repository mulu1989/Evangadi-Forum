const pool = require("../../config/database");

module.exports={

    addQuestion: (data, callback) => {
        //inserting data to question table
        pool.query(
          `INSERT INTO question(question,question_description,user_id)VALUES(?,?,?)`,
          [data.question, data.questionDescription, data.userId],
          (err, result) => {
            if (err) {
              return callback(err);
            }
            return callback(null, result);
          }
        );
      },

        //getting all questions from the database
  getAllQuestions: (callback) => {
    pool.query(
      ` SELECT question_id,question,question_description,user_id FROM question`,
      [],
      (err, result) => {
        if (err) {
          return callback(err);
        }
        return callback(null, result);
      }
    );
  },
}