

export default class CommentForm {
    
    constructor(selector, commentService, uiManager, pubSub){
        this.element = $(selector);
        this.commentService = commentService;
        this.uiManager = uiManager;
        this.pubSub = pubSub;
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
        const inputs = this.element.find('input, textarea');
        for (let input of inputs) {
            if (input.checkValidity() === false) {
                const errorMessage = input.validationMessage;
                input.focus();
                this.uiManager.setErrorHtml(errorMessage);
                this.uiManager.setError();
                return false;
            }
        }
        if(this.element.find('textarea').val().match(/\S+/g).length > 120) {
            this.uiManager.setErrorHtml('120 word maximum allowed.');
            this.uiManager.setError();
            return false;
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
            this.resetForm();
            this.uiManager.setIdeal();
            this.pubSub.publish('load-comments');
            this.pubSub.publish('count-comments');
        }, error => {
            this.uiManager.setErrorHtml('An error has occured when saving the comment to server, please try again later.');
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

}