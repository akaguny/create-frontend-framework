import { init } from "./framework";
import { User } from "./src/user";

const firstName = "marvin"
const secondName = "frachet"

// init('#app', p`Hello ${firstName} ${secondName} !`)
init('#app', User({ firstName, secondName }))