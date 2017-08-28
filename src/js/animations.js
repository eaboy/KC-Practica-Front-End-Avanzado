const $ = require('jquery');

export default class Animations {

    constructor(selector) { 
        this.element = $(selector);
    }

    dotdot() {
        $(".article-intro").dotdotdot({watch:true}); // Adds the ellipsis
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
        return false; // Prevents the navigation to top behavior (because it's an a element with # in the href)
    }

    toggleClass() { // Toggle class to show/hide menu
        this.element.toggleClass('show-menu');
    }

}