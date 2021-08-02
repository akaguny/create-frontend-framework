import { createComponent } from "../framework";
import { div } from "../framework/element";
import { onClick } from "../framework/event";


const template = ({ firstName, secondName, methods }) => div`${onClick(() => { methods.changeName('Tomas') })} Hellow ${firstName} ${secondName} !`
const methods = {
    changeName: (state, firstName) => ({ ...state, firstName })
}
const initialState = { firstName: "Marvin", lastName: "Frachet" };

export const User = createComponent({ template, methods, initialState })
