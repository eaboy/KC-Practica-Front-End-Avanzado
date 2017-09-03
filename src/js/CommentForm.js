

export default class CommentForm {
    
    constructor(selector, commentService, uiManager){
        this.element = $(selector);
        this.commentService = commentService;
        this.uiManager = uiManager;
    }

    init(){
        this.setupSubmitEventHandler();
    }
    
    setupSubmitEventHandler() {
        this.element.on('submit', () => {
            this.validateAndSendData();
            return false; // en jQuery se hace un preventDefault() haciendo un return false
        });
    }

    validateAndSendData() {
        if(this.isValid()) {
            this.send()
        }
    }

    isValid(){
        const inputs = this.element.find('input');
        for (let input of inputs) {
            if (input.checkValidity() === false) {
                const errorMessage = input.validationMessage;
                input.focus();
                this.uiManager.setErrorHtml(errorMessage);
                this.uiManager.setError();
                return false;
            }
        }
        this.uiManager.setIdeal();
        return true;
    }

    send(){
        this.uiManager.setLoading();
        const comment = {
            article_id: window.location.search.substring(4),
            name: this.element.find('#name').val(),
            last_name: this.element.find('#lastName').val(),
            email: this.element.find('#email').val(),
            comment: this.element.find('#comment').val()
        }

        this.commentService.save(comment, success => {
            // TODO: recargar el listado de canciones
            this.resetForm();// Resetea el form
            this.uiManager.setIdeal();
            this.addComment(comment);
        }, error => {
            this.uiManager.setErrorHtml('Se ha producido un error al guardar la canción en el servidor.');
            this.uiManager.setError();
        });
    }

    resetForm() {
        this.element[0].reset();
    }

    disableFormControls() {
        this.element.find('input, button').attr('disabled', true);
    }

    enableFormControls() {
        this.element.find('input, button').attr('disabled', false);
    }
    
    addComment(comment){
        let html = `<article class="comment-content">
                        <div class="comment-author">
                            <h4 class="author">${comment.name} ${comment.last_name}:</h4>
                        </div>
                        <p class="comment">${comment.comment}</p>
                    </article>`;

        $('.comments').find('.ui-status.ideal').append(html);
    }

}