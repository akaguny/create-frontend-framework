import { h } from "snabbdom";

// 1 iter
// const div = (strings, ...args) => strings.reduce(
//     (previousValue, currentValue, currentIndex) => {
//         const result = previousValue + currentValue;
//         const templateSubstitution = args[currentIndex];
//         const isAfterThisShouldAddSubstitution = Boolean(templateSubstitution);
//         if (isAfterThisShouldAddSubstitution) {
//             return result + templateSubstitution
//         } else {
//             return result
//         }
//     }
//     , "")

// 2 iter масштабирование
// const createElement = tagName => (strings, ...args) => ({
//     type: tagName,
//     template: strings.reduce(
//         (previousValue, currentValue, currentIndex) => {
//             const result = previousValue + currentValue;
//             const templateSubstitution = args[currentIndex];
//             const isAfterThisShouldAddSubstitution = Boolean(templateSubstitution);
//             if (isAfterThisShouldAddSubstitution) {
//                 return result + templateSubstitution
//             } else {
//                 return result
//             }
//         }
//         , "")
// })

const initialState = {
    template: '',
    on: {}
}

function createFrameworkComponentToTemplateNormalizer(args) {
    return (template, currentString, currentIndex) => {
        const templateSubstitution = args[currentIndex];
        const isAfterThisShouldAddSubstitution = templateSubstitution !== undefined;
        const isTemplateSubstitutionEvent = isAfterThisShouldAddSubstitution && templateSubstitution.type === 'event';
        const textResult = template.template + currentString;
        if(!isAfterThisShouldAddSubstitution){
            return template
        }
        return isTemplateSubstitutionEvent ? { ...template, on: { click: templateSubstitution.click } } :
                { ...template, template: textResult + templateSubstitution }
    };
}

// 3 iter использование общей имплементации
const createElement = tagName => (strings, ...args) => {
    const { template, on } = strings.reduce(
        createFrameworkComponentToTemplateNormalizer(args)
        , initialState)

    return {
        type: 'element',
        template: h(tagName, { on }, template)
    }
}

// const firstName = "marvin"
// const secondName = "frachet"

// const template = div`Hello ${firstName} ${secondName} !`;

export const div = createElement('div')
export const p = createElement('p')



// const { template, type } = p`Hello ${firstName} ${secondName} !`

// console.log(template);
// console.log(type);