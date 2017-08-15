const $ = require('jquery');

export default class Animations {

    constructor(selector) { 
        this.element = $(selector);
    }

    setAnimation(selector, animation) { // Initializes the animation
        $(document).on('click', selector, () => this[animation]() );
    }

    toggleItem() { // Slide toggle animation 
        this.element.slideToggle();
    }

}