import localstorageApi from "./localstorage";
import throttle from 'lodash.throttle';

const FEEDBACK_FORM_STATE = "formdate";
const contactFormEl = document.querySelector('.feedback-form');

const fillContactFormElements = form => {

    const formDateFromLocalStorag = localstorageApi.load(FEEDBACK_FORM_STATE)
    const formElemements = form.elements

    const keys = Object.keys(formDateFromLocalStorag)

    for (const key of keys) {
        formElemements[key].value = formDateFromLocalStorag[key]
    }
}

fillContactFormElements(contactFormEl)

const onContactFormElInput = event => {

    const { name, value } = event.target;

    let oldDate = localstorageApi.load(FEEDBACK_FORM_STATE)

    if (oldDate) {
        oldDate[name] = value
    } else {
        oldDate = {}
    }

    localstorageApi.save(FEEDBACK_FORM_STATE, oldDate)

    console.log(oldDate);
}

const onContactFormElSubmit = event => {
    event.preventDefault()
    
    localstorageApi.remove(FEEDBACK_FORM_STATE)

    event.currentTarget.reset()
}

contactFormEl.addEventListener('input', throttle(onContactFormElInput, 500))
contactFormEl.addEventListener('submit', onContactFormElSubmit)