import { Engine } from "json-rules-engine";
import QuestionDataTransformer from "./dataTransformer";

let singletonInstance = null;

let supportedOperators = {
  equals: "equal",
  "one-of": "in",
  includes: "equal",
  none: "none"
};

class QuestionRuleEngine {
  constructor() {
    this.dataTransformer = new QuestionDataTransformer();
    this.engine = new Engine();

    if (!singletonInstance) {
      singletonInstance = this;
    }
    // Returns singleton instance
    return singletonInstance;
  }

  parseRules(questions) {
    let configuredRules = this.dataTransformer.transform(questions);
    configuredRules.map(configuredRule => {
      let ruleDefinition = {};
      //if multiple rules - response to q1 is 1 and q2 is 2
      if (
        configuredRule.rule &&
        typeof configuredRule.rule.ruleMatch !== "undefined"
      ) {
        let nestedRule = {};
        nestedRule.conditions = {};
        let ruleMatch = configuredRule.rule.ruleMatch;
        nestedRule.conditions[ruleMatch] = [];

        configuredRule.rule.rules.map(r => {
          r.responseSelected.map(response => {
            nestedRule.conditions[ruleMatch].push(
              this.createCondition(r, response)
            );
          });
        });
        nestedRule.event = {
          type: "next-question-id",
          params: { nextQuestionId: configuredRule.id }
        };
        console.log('--nestedRule--', nestedRule);
        this.engine.addRule(nestedRule);
      } else {
        ruleDefinition = this.createRuleDefinition(
          configuredRule.rule || {},
          configuredRule.id
        );
         console.log('--ruleDefinition--', ruleDefinition);
        this.engine.addRule(ruleDefinition);
      }
    });

    this.addDefaultState();
  }

  addDefaultState() {
    let questionResponses = (params, engine) => {
      return engine.factValue("questionResponses").then(defaultState => {
        if (defaultState[params.questionId]) {
          return defaultState[params.questionId];
        }
      });
    };

    this.engine.addFact("responseId", questionResponses);
  }

  createCondition(rule, value) {
    let condition = {};
    let isDefaultQuestion = rule.operator == "none"; // first question with no matching condition
    condition.fact = isDefaultQuestion ? "currentQuestionIndex" : "responseId"; //an identifier for the fact
    condition.params = { questionId: rule.linkedQuestionId };
    condition.operator = isDefaultQuestion
      ? "equal"
      : supportedOperators[rule.operator];
    condition.value = isDefaultQuestion ? 0 : value;

    return condition;
  }

  createRuleDefinition(rule, questionId) {
    /* Input rule format:
     * {"linkedQuestionId":"1","operator":"one-of","responseSelected":["4","5"]}
     */
    let ruleDefinition = {};
    ruleDefinition.conditions = {};
    let ruleMatch = "any";

    if (rule.operator === "contains" && rule.responseSelected.length > 1) {
      ruleMatch = "any";
    } else if (
      rule.operator === "equals" &&
      rule.responseSelected.length == 1
    ) {
      ruleMatch = "all";
    }

    ruleDefinition.conditions[ruleMatch] = [];
    rule.responseSelected &&
      rule.responseSelected.map(response => {
        let condition = this.createCondition(rule, response);
        ruleDefinition.conditions[ruleMatch].push(condition);
      });

    ruleDefinition.event = {
      type: "next-question-id",
      params: { nextQuestionId: questionId }
    };

    return ruleDefinition;
  }

  run(currentState, callback) {
    this.engine
      .run(currentState)
      .then(results => {
        if (results.events.length === 0) {
          return callback(null);
        }
        let answeredQuestions = Object.keys(currentState && currentState.questionResponses || {});
        let nextQuestion = results.events.find(
          event =>
            answeredQuestions.indexOf(
              `${(event.params && event.params.nextQuestionId) || ""}`
            ) === -1
        );
        if (
          currentState != null &&
          currentState.hasOwnProperty("currentQuestionId") &&
          nextQuestion
        ) {
          callback(
            (nextQuestion.params && nextQuestion.params.nextQuestionId) || null
          );
        } else {
          return callback(null);
        }
      })
      .catch(err => {
        console.log(
          "Question:: RuleEngine :: run :: Error running engine",
          err
        );
      });
  }

  hasNextRule(currentState, callback) {
    this.engine
      .run(currentState)
      .then(results => {
        if (results.events.length === 0) {
          callback(false);
          return;
        }
        let answeredQuestions = Object.keys(currentState && currentState.questionResponses || {});
        let nextQuestion = results.events.find(
          event =>
            answeredQuestions.indexOf(
              `${(event.params && event.params.nextQuestionId) || ""}`
            ) === -1
        );
        if (
          currentState != null &&
          currentState.hasOwnProperty("currentQuestionId") &&
          nextQuestion
        ) {
          callback(true);
          return;
        }
      })
      .catch(err => {
        console.log(
          "Question:: RuleEngine :: run :: Error running engine",
          err
        );
      });
    callback(false);
  }
}

export default QuestionRuleEngine;
