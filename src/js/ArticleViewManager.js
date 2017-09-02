import ArticleManager from './ArticleManager';

export default class ArticleViewManager extends ArticleManager{
    
    constructor(articlesService, articleUIManager, selector, likesStorage){
        super(articlesService, articleUIManager);
        this.element = $(selector);
        this.likesStorage = likesStorage;
    }

    init(){
        this.loadArticle();
        this.setLikeEventHandler();
    }

    loadArticle(){
        this.contentService.getItem(3, article => { // Loads articles
            let html = this.renderArticle(article);
            this.uiManager.setIdealHtml(html);
            this.uiManager.setIdeal();
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
                            <div class="article-comments"><i class="fa fa-comment-o" aria-hidden="true"></i><span class="number-comments">${article.comments}</span></div>
                            <div class="like-icon"><i class="fa ${heartIconClass}" aria-hidden="true"></i></div>
                        </div>
                    </div>
                    <div class="article-text">${article.full_article}</div>
                </article>`
    }
}