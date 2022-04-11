import {Validator} from 'fluentvalidation-ts';
import {IMessage} from '../models/message';

export class MessageRuleset extends Validator<IMessage> {
  constructor() {
    super();

    this.ruleFor('name')
      .notEmpty()
      .withMessage('Name is required')
      .maxLength(100)
      .withMessage('Name must be no more than 100 characters');

    this.ruleFor('age')
      .must(age => !isNaN(Number(age)))
      .withMessage('Age must be a number')
      .greaterThanOrEqualTo(0)
      .withMessage('Age must be a non-negative number');
  }
}
