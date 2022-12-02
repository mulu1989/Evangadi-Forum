const pool = require("../../config/database");

module.exports={
    addAnswer: (data, callback) => {
        //inserting data to question table
        pool.query(
          `INSERT INTO answer(answer,user_id,question_id)VALUES(?,?,?)`,
          [data.answer, data.userId,data.questionId],
          (err, result) => {
            if (err) {
              return callback(err);
            }
            return callback(null, result);
          }
        );
      },
      answerById: (id, callback) => {
        
        pool.query(
          `SELECT answer.answer_id,answer,user_id,question_id FROM answer  WHERE answer.question_id = ?`,
          [id],
          (err, result) => {
            if (err) {
              return callback(err);
            }
            return callback(null, result);
          }
        );
      },
}