window.$ = window.jQuery = require('jquery');
require('dotdotdot');

import Animations from './animations.js';
import Header from './header.js';

const header = new Header(Animations);
const animation = new Animations();

animation.init();
header.init();