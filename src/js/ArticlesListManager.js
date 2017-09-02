
import ArticleManager from './ArticleManager';

export default class ArticlesListManager extends ArticleManager{

    init(){
        this.loadArticles();
        $(".article-intro").dotdotdot({watch:true}); // Adds the ellipsis
        this.setLikeEventHandler();
        this.videoControlsDisplay();
        this.paginationIconsHoverEffect();
        this.articleLinkEventHandler();
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
        let heartIconClass = '';
        if(this.isLiked(`${article.id}`)[0]){
            heartIconClass = 'fa-heart';
        } else {
            heartIconClass = 'fa-heart-o';
        }

        return `<article class="article" data-id="${article.id}">      
                    ${this.getArticleMedia(article)}
                    <h2 class="title">${article.title}</h2>
                    <p class="article-intro">${article.intro_text}</p>
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
                </article>`
    }

    getArticleMedia(article){
        
        if (article.video_name === '') {
            return this.getImageHtml(article.image_name);
        } else {
            return this.getVideoHtml(article.video_name);
        }
    }
    
    videoControlsDisplay() {
        $(document).on('mouseenter','.video', function () {
                this.setAttribute("controls","controls")
            }).on('mouseleave','.video', function () {
                this.removeAttribute("controls");
            }
        );
    }

    paginationIconsHoverEffect() {
        var self = this;

        $('.prev:not(.disabled)').on('mouseenter', function(){
            self.paginationHover(this,'left');
        }).on('mouseleave', function(){
            self.paginationHover(this,'left');
        });

        $('.next:not(.disabled)').on('mouseenter', function(){
            self.paginationHover(this,'right');
        }).on('mouseleave', function(){
            self.paginationHover(this,'right');
        });
    }

    paginationHover(selector,side) {
        $(selector).find('.fa-square, .fa-square-o').toggleClass('fa-square fa-square-o');
        $(selector).find(`.fa-chevron-${side}`).toggleClass('fa-inverse');
    }

    articleLinkEventHandler() {
        $(document).on('click', '.title, .article-intro', function() {
            window.location.href = `article.html?id=${$(this).parents('.article')[0].dataset.id}`;
        })
    }

}