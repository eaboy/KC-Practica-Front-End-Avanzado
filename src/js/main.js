window.$ = window.jQuery = require('jquery');
require('dotdotdot');

import Animations from './animations.js';
import Header from './header.js';

const header = new Header(Animations);
header.init();

$(".article-intro").dotdotdot({watch:'window'});