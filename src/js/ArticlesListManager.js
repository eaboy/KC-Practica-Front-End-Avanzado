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
        let photo = article.photo_name;
        if (photo === '') {
            photo = 'placeholder-male';
        }
        let articleMedia;
        if (article.video_name === ''){
            articleMedia = `<picture>
                                <source srcset="./img/${article.image_name}-s.jpg 500w, ./img/${article.image_name}-m.jpg 800w, ./img/${article.image_name}-l.jpg 1100w" media="(min-width: 768px)">
                                <img src="./img/${article.image_name}-s.jpg" alt="" class="article-image">
                            </picture>`;
        } else {
            articleMedia = `<video class="video" controls>
                                <source src="./videos/${article.video_name}.mp4" type="video/mp4">
                            </video>`
        }
        return `<article class="article">      
                    ${articleMedia}
                    <h2 class="title">${article.title}</h2>
                    <p class="article-intro">${article.intro_text}</p>
                    <div class="article-info">
                        <div class="article-publish-container">
                            <img src="./img/${photo}.png" alt="" class="author-photo">
                            <div class="publish-info">
                                <h5 class="author-name">${article.author}</h5>
                                <div class="publish-time">7 min ago</div>
                            </div>
                        </div>
                        <div class="extras">
                            <div class="article-comments"><i class="fa fa-comment-o" aria-hidden="true"></i><span class="number-comments">${article.comments}</span></div>
                            <div class="like-icon"><i class="fa fa-heart-o" aria-hidden="true"></i></div>
                        </div>
                    </div>
                </article>`
    }

}