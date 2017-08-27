const $ = require('jquery');

export default class APIService {

    constructor(url) {
        this.url = url;
    }

    // Get all items from API url
    list(successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            success: successCallback,
            error: errorCallback
        });
    }

}