let singletonInstance = null;

class QuestionDataTransformer {

  constructor() {
    if (!singletonInstance) {
      singletonInstance = this;
    }
    // Returns singleton instance

    return singletonInstance;
  }

  //Reads a list of questions, and generates
  //set of rules for input to rule engine
  transform(questions) {
    questions = questions.map((q) => {
        console.log('--q--', {id: q['id'], rule: q['display_rule']});
        return {id: q['unique_id'], rule: q['display_rule']};
    });
    return questions;
  }

}

export default QuestionDataTransformer;