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
    
    // Get one item from API url
    getItem(id, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}/${id}`,
            success: successCallback,
            error: errorCallback
        });
    }
    
    // Get all items from API url filtered
    listFiltered(filter, successCallback, errorCallback) {
        $.ajax({
            url: `${this.url}/${filter}`,
            success: successCallback,
            error: errorCallback
        });
    }
    
    // Saves an item
    save(item, successCallback, errorCallback) {
        $.ajax({
            url: this.url,
            method: 'post',
            data: item,
            success: successCallback,
            error: errorCallback
        });
    }

}