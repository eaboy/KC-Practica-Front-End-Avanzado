export default class ArticlesListManager{

    constructor(articlesService, uiManager){
        this.articlesService = articlesService;
        this.uiManager = uiManager;
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
        console.log('renedering',articles);
    }

    renderArticle(article){

    }

}