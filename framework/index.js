import { init as _init, eventListenersModule } from "snabbdom";

const patch = _init([eventListenersModule])

export const init = (selector, component) => {
    const app = document.querySelector(selector);
    // const newElement = document.createElement(component.type)
    // const newTextContent = document.createTextNode(component.template)

    // newElement.append(newTextContent);
    // app.append(newElement);

    patch(app, component.template)
}

let state = {};

export const createComponent = ({ template, methods = {}, initialState = {} }) => {
    state = initialState
    let currentVNode;

    const decorateMethods = props => Object.keys(methods).reduce((decoratedMethods, methodName) => {
        const decoratedMethod = (...args) => {
            state = methods[methodName](state, ...args);
            console.log(state);
            const nextVNode = template({
                ...props, ...state, methods: decorateMethods(props)
            })
            currentVNode = patch(currentVNode.template, nextVNode.template)
            currentVNode = nextVNode
            return state;
        };

        return {
            ...decoratedMethods,
            [methodName]: decoratedMethod
        }
    }, {})

    return props => {
        currentVNode = template({ ...props, ...state, methods: decorateMethods(props) });
        return currentVNode;
    }
}