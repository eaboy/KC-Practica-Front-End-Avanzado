window.$ = window.jQuery = require('jquery');

import Animations from './animations.js';
import Header from './header.js';

const header = new Header(Animations);
header.init();