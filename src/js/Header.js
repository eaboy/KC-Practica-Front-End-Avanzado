
export default class Header {

    constructor(Animation){
        this.searchAnimations = new Animation('.search-box');
        this.signRegister = new Animation('.sign-box');
        this.toggleMenu = new Animation('.nav-bar, .container');
    }

    init() {
        this.searchAnimations.setAnimation('.search','.sign-box');
        this.signRegister.setAnimation('.sign-in','.search-box');
        this.toggleMenu.setAnimation('.menu-button');
    }

}