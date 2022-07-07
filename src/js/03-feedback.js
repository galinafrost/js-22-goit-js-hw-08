import localstorageApi from "./localstorage"
import throttle from 'lodash.throttle';

const FEEDBACK_FORM_STATE = "formdate"
const contactFormEl = document.querySelector('.feedback-form')
const formDate = {}

const fillContactFormElements = form => {

    const formDateFromLocalStorag = localstorageApi.load(FEEDBACK_FORM_STATE)
    
    const formElemements = form.elements

    for (const key in formDateFromLocalStorag) {
        if (formDateFromLocalStorag.hasOwnProperty(key)) {
            formElemements[key].value = formDateFromLocalStorag[key]
        }
    }
}

fillContactFormElements(contactFormEl)

const onContactFormElInput = event => {

    const { target } = event;
    const contactFormElValue = target.value;
    const contactFormElName = target.name;

    formDate[contactFormElName] = contactFormElValue

    localstorageApi.save(FEEDBACK_FORM_STATE, formDate)

}

const onContactFormElSubmit = event => {
    event.preventDefault()
    
    localstorageApi.remove(FEEDBACK_FORM_STATE)

    event.currentTarget.reset()
}

contactFormEl.addEventListener('input', throttle(onContactFormElInput, 500))
contactFormEl.addEventListener('submit', onContactFormElSubmit)