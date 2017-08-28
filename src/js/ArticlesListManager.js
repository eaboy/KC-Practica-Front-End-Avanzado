
var moment = require('moment');

export default class ArticlesListManager{
    
    constructor(articlesService, uiManager, animation){
        this.articlesService = articlesService;
        this.uiManager = uiManager;
        this.animation = animation;
    }

    init(){
        this.loadArticles();
    }

    loadArticles(){
        this.articlesService.list( articles => { // Loads articles
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
        this.animation.dotdot(); // Call function to add ellipsis to intro text
    }

    renderArticle(article){

        return `<article class="article">      
                    ${this.getMediaHtml(article)}
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
                            <div class="like-icon"><i class="fa fa-heart-o" aria-hidden="true"></i></div>
                        </div>
                    </div>
                </article>`
    }

    publishedFromNow(date) { // Returns the publish date from now if is less than a day ago, the publish day if is less than a week ago otherwise the publish date

        let daysFromPublish = moment().diff(moment(date,'YYYY/MM/DD hh:mm:ss'), 'days'); // Get the number of days from published date

        if (daysFromPublish > 6 ) {
            return moment(date).format('YYYY/MM/DD'); 
        } else if (daysFromPublish < 1) {
            return moment(date).fromNow();
        } else {
            return `last ${moment(date).format('dddd')}`;
        }
    }

    getMediaHtml(article) { // Checks if there is no video for the article, if not returns the html for images and the image, else returns the html for videos and the video
        
        if (article.video_name === ''){ 
            return `<picture>
                                <source srcset="./img/${article.image_name}-s.jpg 500w, ./img/${article.image_name}-m.jpg 800w, ./img/${article.image_name}-l.jpg 1100w" media="(min-width: 768px)">
                                <img src="./img/${article.image_name}-s.jpg" alt="" class="article-image">
                            </picture>`;
        } else {
            return `<video class="video" controls>
                                <source src="./videos/${article.video_name}.mp4" type="video/mp4">
                            </video>`
        }
    }

    getArticlePhoto(photo) { // Checks if there is no author photo, if not returns the default placeholder photo

        if (photo === '') {
            return 'placeholder-male';
        } else {
            return photo;
        }

    }

}