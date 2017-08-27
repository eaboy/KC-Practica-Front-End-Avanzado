const $ = require('jquery');

export default class UIManager {

    constructor(selector) {
        this.uiStateClasses = 'empty loading error partial ideal'; // Set all state classes
        this.element = $(selector); // Selects the element
    }

    setEmpty() {
        this.element.removeClass(this.uiStateClasses).addClass('empty');
    }

    setLoading() {
        this.element.removeClass(this.uiStateClasses).addClass('loading');
    }

    setError() {
        this.element.removeClass(this.uiStateClasses).addClass('error');
    }

    setPartial() {
        this.element.removeClass(this.uiStateClasses).addClass('partial');
    }

    setIdeal() {
        this.element.removeClass(this.uiStateClasses).addClass('ideal');
    }

    setIdealHtml(html) {
        // Searches for the child of the element that has the ui-status and ideal classes and assigns it an html
        this.element.find('.ui-status.ideal').html(html);
    }
}