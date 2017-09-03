window.$ = window.jQuery = require('jquery');
var dotdotdot = require('dotdotdot');

import Animations from './Animations';
import Header from './Header';
import APIService from './APIService';
import UIManager from './UIManager';
import LStorage from './LStorage';
import ArticlesListManager from './ArticlesListManager';
import ArticleViewManager from './ArticleViewManager';
import CommentsViewManager from './Comments';
import Footer from './Footer';

const header = new Header(Animations);
const animation = new Animations();
const articlesService = new APIService('/articles');
const commentsService = new APIService('/comments');
const likesLStorage = new LStorage('likedArticles');
const articlesUIManager = new UIManager('.articles-list');
const articleUIManager = new UIManager('.article-view');
const commentsUIManager = new UIManager('.comments');
const footer = new Footer('.up-button', animation);

const articlesListManager = new ArticlesListManager(articlesService, articlesUIManager, '.articles-list', likesLStorage, commentsService);
const articleViewManager = new ArticleViewManager(articlesService, articleUIManager, '.article-view', likesLStorage, commentsService);
const commentsViewManager = new CommentsViewManager(commentsService, commentsUIManager);
articlesListManager.init();
articleViewManager.init();
commentsViewManager.init();

header.init();
footer.init();