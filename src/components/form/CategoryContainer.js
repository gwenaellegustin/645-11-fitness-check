import {QuestionContainer} from "./QuestionContainer";
import {FormGroup} from "reactstrap";

/**
 * Component to display a specific category
 *
 * @param category linked to this container
 * @param questions linked to this category
 * @param isDisplayMode for edit or read-only mode
 * @param completedAnswersId for read-only mode in order to select answered answers
 *
 * @author Antony
 */
export function CategoryContainer({category, questions, isDisplayMode, completedAnswersId}) {

    //Return a question container with the question object (containing the label, answers, isUniqueAnswer)
    return (
        <FormGroup className="text-start">
            {questions.length > 0 ?
                <div key={category.id}>
                    <legend>{category.label}</legend>
                    <hr/>
                    {questions
                        .sort((a, b) => a.label.localeCompare(b.label)) //Sort alphabetically by label
                        .map(question => (
                            <QuestionContainer key={question.id} question={question} isDisplayMode={isDisplayMode}
                                               completedAnswersId={completedAnswersId}/>
                        ))}
                </div>
                : null}
        </FormGroup>
    )
}