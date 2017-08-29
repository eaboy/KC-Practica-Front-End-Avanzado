
import ArticleManager from './ArticleManager';

export default class ArticlesListManager extends ArticleManager{
    
    constructor(articlesService, articlesUIManager, selector){
        super(articlesService, articlesUIManager);
        this.element = $(selector);
    }

    init(){
        this.loadArticles();
        $(".article-intro").dotdotdot({watch:true}); // Adds the ellipsis
        this.setLikeEventHandler();
    }

    loadArticles(){
        this.contentService.list( articles => { // Loads articles
            if (articles.length > 0) { // Checks if there are articles
                this.renderArticles(articles); 
                this.uiManager.setIdeal();
            } else {
                this.uiManager.setEmpty();
            }
        }, error => {
            this.uiManager.setError();
            console.log('Error:', error);
        })
    }

    renderArticles(articles){
        let html = '';

        for (let article of articles) {
            html += this.renderArticle(article);
        }

        this.uiManager.setIdealHtml(html);
    }

    renderArticle(article){

        return `<article class="article" data-id="${article.id}">      
                    ${this.getArticleMedia(article)}
                    <h2 class="title">${article.title}</h2>
                    <p class="article-intro">${article.intro_text}</p>
                    <div class="article-info">
                        <div class="article-publish-container">
                            <img src="./img/${super.getArticlePhoto(article.photo_name)}.png" alt="" class="author-photo">
                            <div class="publish-info">
                                <h5 class="author-name">${article.author}</h5>
                                <div class="publish-time">Published ${super.publishedFromNow(article.publish_date)}</div>
                            </div>
                        </div>
                        <div class="extras">
                            <div class="article-comments"><i class="fa fa-comment-o" aria-hidden="true"></i><span class="number-comments">${article.comments}</span></div>
                            <div class="like-icon"><i class="fa fa-heart-o" aria-hidden="true"></i></div>
                        </div>
                    </div>
                </article>`
    }

    getArticleMedia(article){
        
        if (article.video_name === '') {
            return super.getImageHtml(article.image_name);
        } else {
            return super.getVideoHtml(article.video_name);
        }
    }

    setLikeEventHandler() {
        this.element.on('click', '.like-icon', function() {
            console.log($(this).parents('.article')[0].dataset.id);
        });
    }

}