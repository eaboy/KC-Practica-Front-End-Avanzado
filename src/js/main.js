window.$ = window.jQuery = require('jquery');
var dotdotdot = require('dotdotdot');
var moment = require('moment');

import Animations from './animations';
import Header from './header';
import APIService from './APIService';
import UIManager from './UIManager';
import ArticlesListManager from './ArticlesListManager';

const header = new Header(Animations);
const animation = new Animations();
const articlesService = new APIService('/articles');
const articlesUIManager = new UIManager('.articles-list');

const articlesListManager = new ArticlesListManager(articlesService, articlesUIManager, animation);
articlesListManager.init();

header.init();