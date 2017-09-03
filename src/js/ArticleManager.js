
var moment = require('moment');

export default class ArticleManager{

    constructor(contentService, uiManager, selector, likesStorage, commentsService){
        this.contentService = contentService;
        this.uiManager = uiManager;
        this.element = $(selector);
        this.likesStorage = likesStorage;
        this.commentsService = commentsService;
    }


    publishedFromNow(date) { // Returns the publish date from now if is less than a day ago, the publish day if is less than a week ago otherwise the publish date
        
        let formatedDate = moment(date,'YYYY/MM/DD hh:mm:ss');
        let daysFromPublish = moment().diff(formatedDate, 'days'); // Get the number of days from published date

        if (daysFromPublish > 6 ) {
            return formatedDate.format('YYYY/MM/DD'); 
        } else if (daysFromPublish < 1) {
            return formatedDate.fromNow();
        } else {
            return `last ${formatedDate.format('dddd')}`;
        }
    }

    getImageHtml(imageName) { // Returns the html for images and the image
        
        return `<picture>
                    <source srcset="./img/${imageName}-s.jpg 500w, ./img/${imageName}-m.jpg 800w, ./img/${imageName}-l.jpg 1100w" media="(min-width: 768px)">
                    <img src="./img/${imageName}-s.jpg" alt="" class="article-image">
                </picture>`;
    }

    getVideoHtml(videoName) { // Returns the html for videos and the video
        return `<video class="video">
                    <source src="./videos/${videoName}.mp4" type="video/mp4">
                </video>`;
    }

    getArticlePhoto(photo) { // Checks if there is no author photo, if not returns the default placeholder photo

        if (photo === '') {
            return 'placeholder-male';
        } else {
            return photo;
        }

    }
    
    setLikeEventHandler() {
        var self = this;
        this.element.on('click', '.like-icon', function() {
            self.likeClicked($(this).parents('.article')[0].dataset.id);
            self.likeIconChange($(this));
        });
    }

    likeClicked(articleId) {
        this.likesStorage.saveData(this.isLiked(articleId)[1]);
    }

    isLiked(articleId){
        let likedArticles = this.likesStorage.readData();
        let isInLikedStorage;

        if(likedArticles === null || likedArticles === '') {
            likedArticles = articleId;
            isInLikedStorage = false;            
        } else {
            likedArticles = likedArticles.split(',');
            if(likedArticles.indexOf(articleId) === -1) {
                likedArticles.push(articleId);
                isInLikedStorage = false;
            } else {
                likedArticles.splice(likedArticles.indexOf(articleId), 1);
                isInLikedStorage = true;
            }
        }
        return [isInLikedStorage,likedArticles];
    }

    likeIconChange(clickedElement) {
        clickedElement.children().toggleClass('fa-heart fa-heart-o');
    }
    
    setNumberComments() {
        let elements = $('.article');
        for(let element of elements){
            this.commentsService.listFiltered(`?article_id=${element.dataset.id}`, comments => { // Loads comments
                $(element).find('.number-comments').text(comments.length);
            }, error => {
                console.log('Error:', error);
            });
        }
    }
        
}