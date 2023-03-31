import { BaseAnswerDefinition } from './base-answer.definition';
import { TaskTypesEnum } from '../tasks-definition/base-task.definition';
import { IsNotEmpty, validateSync } from 'class-validator';

export class MultipleChoiceAnswer {
  @IsNotEmpty()
  answerContent: any;

  constructor(answerContent: any) {
    this.answerContent = answerContent;
  }

  public validator() {
    const validation = validateSync(this);

    if (validation.length) {
      const errors =
        validation
          .map(({ constraints }) => Object.values(constraints).join('; '))
          .join('; ') + ';';

      throw new Error(`AnswerErrors: ${errors}`);
    }
  }
  public clone() {
    return new MultipleChoiceAnswer(this.answerContent);
  }
}
export class MultipleChoiceAnswerDefinition extends BaseAnswerDefinition<MultipleChoiceAnswer> {
  constructor(id: string, taskId: string, answerContent: any) {
    super(id, taskId, TaskTypesEnum.MULTIPLE_CHOICE, answerContent);
  }
}
