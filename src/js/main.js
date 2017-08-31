window.$ = window.jQuery = require('jquery');
var dotdotdot = require('dotdotdot');

import Animations from './Animations';
import Header from './Header';
import APIService from './APIService';
import UIManager from './UIManager';
import ArticlesListManager from './ArticlesListManager';
import LStorage from './LStorage';
import Footer from './Footer';

const header = new Header(Animations);
const animation = new Animations();
const articlesService = new APIService('/articles');
const articlesUIManager = new UIManager('.articles-list');
const likesLStorage = new LStorage('likedArticles');
const footer = new Footer('.up-button', animation);

const articlesListManager = new ArticlesListManager(articlesService, articlesUIManager, '.articles-list', likesLStorage);
articlesListManager.init();

header.init();
footer.init();