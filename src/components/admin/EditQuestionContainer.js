import React, {useContext, useState} from "react";
import {Button, FormGroup, Label, Modal,} from "reactstrap";
import {deleteQuestionFirestore} from "../../config/initFirebase";
import {AnswersContainer} from "../form/AnswersContainer";
import {MyModal} from "./MyModal";
import {AdminContext} from "./Admin";

export function EditQuestionContainer({question}) {
    const [editedQuestion] = useState(question);
    const [modal, setModal] = useState(false);
    const { deleteQuestion } = useContext(AdminContext);

    // Delete question in firestore and reload the page (to be sure of the removal)
    const handleDelete = (deletedQuestion) => {
         deleteQuestionFirestore(deletedQuestion).then(questionRef => {
            if(questionRef != null){
                console.log("DELETE QUESTION SUCCESSFUL, id : " + questionRef.id);
                deletedQuestion.id = questionRef.id;
                deleteQuestion(deletedQuestion);
            }}
        )
    }

    const handleModal = () => {
        setModal(!modal);
    }

    return (
        <>
            <FormGroup>
                <Label tag="h6">{editedQuestion.label}</Label>
                {<AnswersContainer question={editedQuestion}
                                   uniqueAnswer={editedQuestion.uniqueAnswer}
                                   isDisplayMode={false}/>}
                <Button color="danger" style={{margin:5}} onClick={() => handleDelete(editedQuestion)}>Supprimer</Button>
                <Button type="submit" color="primary" style={{margin:5}} onClick={handleModal}>Modifier</Button>
            </FormGroup>
            <Modal isOpen={modal}
                   toggle={handleModal}>
                    <MyModal questionExisting={editedQuestion} answersExisting={editedQuestion.answers} handleModal={handleModal} />
            </Modal>
        </>
    );
}