import ArticleManager from './ArticleManager';
require('waypoints/lib/noframework.waypoints');

export default class ArticleViewManager extends ArticleManager{

    constructor(contentService, uiManager, selector, likesStorage, commentsService, pubSub){
        super(contentService, uiManager, selector, likesStorage, commentsService);
        this.pubSub = pubSub;
    }

    init(){
        this.loadArticle();
        this.setLikeEventHandler();
        this.pubSub.subscribe('count-comments', () => this.setNumberComments());
    }

    loadArticle(){
        let articleId = window.location.search.substring(4);
        if(isNaN(articleId)){
            this.uiManager.setError();
            return false;
        }
        this.contentService.getItem(articleId, article => { // Loads articles
            let html = this.renderArticle(article);
            this.uiManager.setIdealHtml(html);
            this.uiManager.setIdeal();
            this.setNumberComments();
            this.watchToShowComments();
        }, error => {
            this.uiManager.setError();
            console.log('Error:', error);
        })
    }

    renderArticle(article){
        let heartIconClass = '';
        if(this.isLiked(`${article.id}`)[0]){
            heartIconClass = 'fa-heart';
        } else {
            heartIconClass = 'fa-heart-o';
        }

        return `<article class="article" data-id="${article.id}">
                    <h2 class="title">${article.title}</h2>      
                    ${this.getImageHtml(article.image_name)}
                    <div class="article-info">
                        <div class="article-publish-container">
                            <img src="./img/${this.getArticlePhoto(article.photo_name)}.png" alt="" class="author-photo">
                            <div class="publish-info">
                                <h5 class="author-name">${article.author}</h5>
                                <div class="publish-time">Published ${this.publishedFromNow(article.publish_date)}</div>
                            </div>
                        </div>
                        <div class="extras">
                            <div class="article-comments"><a href="#comments-section"><i class="fa fa-comment-o" aria-hidden="true"></i><span class="number-comments">0</span></a></div>
                            <div class="like-icon"><i class="fa ${heartIconClass}" aria-hidden="true"></i></div>
                        </div>
                    </div>
                    <div class="article-text">${article.full_article}</div>
                </article>`;
    }

    watchToShowComments(){
        if($('.comments').length === 0) {
            return;
        }
        var waypoint = new Waypoint({
            element: $('.comments')[0],
            handler: () => {
                this.pubSub.publish('load-comments');
                Waypoint.destroyAll();
            },
            offset: '100%'
        })
    }
}

90 18 140