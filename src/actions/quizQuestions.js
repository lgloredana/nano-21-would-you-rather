import {hideLoading, showLoading} from "react-redux-loading";
import {_getQuizQuestions} from "../utils/_DATA";
import {openDB} from "idb";

export const GET_QUIZ_QUESTIONS = 'GET_QUIZ_QUESTIONS';

function getQuizQuestions(quizQuestions) {
    return {
        type: GET_QUIZ_QUESTIONS,
        quizQuestions
    }
}


export function handleGetQuizQuestions(){
    return (dispatch) => {
        dispatch(showLoading());
        _getQuizQuestions()
            .then((response) => {
                dispatch(getQuizQuestions(response));
                dispatch(hideLoading());
                if (!('indexedDB' in window)) {
                    console.warn('IndexedDB not supported');
                }else{
                    console.log('IndexDB is available!');
                    const name = 'sea-movers';
                    const version = 1;
                    const quizQuestionTableName = 'quizQuestions';
                    const dbPromise =  openDB(name, version, {

                        upgrade(db, oldVersion, newVersion, transaction) {
                            switch (oldVersion) {
                                case 0:
                                // a placeholder case so that the switch block will
                                // execute when the database is first created
                                // (oldVersion is 0)
                                case 1:
                                    console.log('Creating the quizQuestions object store');
                                    db.createObjectStore(quizQuestionTableName, {keyPath: 'id'});
                                    break;
                                default:
                                    console.log('default');
                            }
                            if (!db.objectStoreNames.contains(quizQuestionTableName)){
                                db.createObjectStore(quizQuestionTableName, {keyPath: 'id'});
                            }
                        }
                    });

                    dbPromise.then( db => {
                        const tx = db.transaction(quizQuestionTableName, 'readwrite');
                        const quizQuestionsStore = tx.objectStore(quizQuestionTableName);
                        const quizKeys = Object.keys(response);
                        Promise.all(quizKeys.map( quizKey => {
                            console.log('Adding quiz', response[quizKey]);
                            quizQuestionsStore.add(response[quizKey]);
                        })).then( () => {
                            console.log('----successful added item to questions ---');
                        }).catch( (e) => {
                            tx.abort();
                            console.log('!!!!!!error added item to questions !!!!', e);
                        });
                    })
                }

            })
    }
}