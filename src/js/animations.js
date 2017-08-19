const $ = require('jquery');

export default class Animations {

    constructor(selector) { 
        this.element = $(selector);
    }

    setAnimation(selector, selectorHide) { // Initializes the animation
        if(selectorHide){
            $(document).on('click', selector, () => this.slideUpItem(selectorHide) );
        } else {
            $(document).on('click', selector, () => this.toggleClass() );
        }
    }

    toggleItem() { // Slide toggle animation 
        this.element.slideToggle();
    }

    slideUpItem(selector) { // Hide element 
        $(selector).slideUp(this.toggleItem());
    }

    toggleClass() {
        this.element.toggleClass('show-menu');
    }

}