const $ = require('jquery');

export default class Animations {

    constructor(selector) { 
        this.element = $(selector);
    }

    setAnimation(selector, animation) { // Inicializa la animación
        $(document).on('click', selector, () => this[animation]() );
    }

    toggleItem() { // Animación slide toggle
        this.element.slideToggle();
    }

}