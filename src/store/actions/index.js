import authActions from './AuthActions';

import JogoAction from './JogoActions';
import AmigoAction from './AmigoActions';
/**
 * Concatena todos os actions
 */

const actions = Object.assign(authActions,
    JogoAction, AmigoAction);

export default actions;
