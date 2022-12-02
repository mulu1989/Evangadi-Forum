  
const { addQuestion,getAllQuestions } = require("./question.service");


module.exports={
  createQuestion: (req, res) => {
        const {question,questionDescription} = req.body;
    
        //validation
        if (!question || !questionDescription)
          return res
            .status(400)
            .json({ msg: "Not all fields have been provided!" });
       
              //sending data to addQuestion
              addQuestion(req.body, (err, results) => {
                if (err) {
                  console.log(err);
                  return res.status(500).json({ msg: "database connection err" });
                }
    
                      return res.status(200).json({
                        msg: "New question added successfully",
                        data: results,
                      });
                    });
    },
  getQuestions: (req, res) => {
    getAllQuestions((err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ msg: "database connection err" });
      }
      if(!results){
        return res
        .status(404)
        .json({ msg: "No questions available" });
      }
      return res.status(200).json({ data: results });
    });
    },
       
}