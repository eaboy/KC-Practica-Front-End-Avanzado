const $ = require('jquery');

export default class Animations {

    constructor(selector) { 
        this.element = $(selector);
    }

    setAnimation(selector, selectorHide) { // Initializes the animation
        $(document).on('click', selector, () => this.slideUpItem(selectorHide) );
    }

    toggleItem() { // Slide toggle animation 
        this.element.slideToggle();
    }

    slideUpItem(selector) { // Hide element 
        $(selector).slideUp(this.toggleItem());
    }

}