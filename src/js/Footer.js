export default class Footer {
    
    constructor(selector, animation) { 
        this.element = $(selector);
        this.animation = animation;
    }

    init() {
        this.setUpButtonEventHandler();
    }

    setUpButtonEventHandler(){
        this.element.on('click', ( ) => this.animation.scrollToTop());
    }

}