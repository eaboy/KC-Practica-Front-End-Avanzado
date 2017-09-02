export default class Comments {

    constructor(contentService, uiManager){
        this.contentService = contentService;
        this.uiManager = uiManager;
    }

    init(){
        this.loadComments();
    }

    loadComments(){
        let articleId = window.location.search.substring(4);
        if(isNaN(articleId)){
            this.uiManager.setError();
            return false;
        }
        this.contentService.listFiltered(`?article_id=${articleId}`, comments => { // Loads comments
            if (comments.length > 0) { // Checks if there are articles
                this.renderComments(comments); 
                this.uiManager.setIdeal();
            } else {
                this.uiManager.setEmpty();
            }
        }, error => {
            this.uiManager.setError();
            console.log('Error:', error);
        })
    }

    renderComments(comments){
        let html = '';

        for (let comment of comments) {
            html += this.renderComment(comment);
        }

        this.uiManager.setIdealHtml(html);
    }

    renderComment(comment){
        return `<article class="comment-content">
                    <div class="comment-author">
                        <h4 class="author">${comment.name} ${comment.last_name}:</h4>
                    </div>
                    <p class="comment">${comment.comment}</p>
                </article>`;
    }
}