const { addAnswer,answerById } = require("./answer.service");

module.exports={
    createAnswer: (req, res) => {
        const {answer, userId,questionId} = req.body;
    
        //validation
        if (!answer)
          return res
            .status(400)
            .json({ msg: "answer is not provided" });
       
              //sending data to addAnswer
              addAnswer(req.body, (err, results) => {
                if (err) {
                  console.log(err);
                  return res.status(500).json({ msg: "database connection err" });
                }
    
                      return res.status(200).json({
                        msg: "New answer added successfully",
                        data: results,
                      });
                    });
    },
    getAnswerByQuestionId: (req, res) => {
        
        answerById(req.query.questionId, (err, results) => {
            if (err) {
                console.log(err);
                return res
                    .status(500)
                    .json({ msg: "database connection err" })
            }
            if (!results) {
                return res.status(404).json({ msg: "Record not found " });
            }
            return res.status(200).json({ data: results })
        })
      },
}