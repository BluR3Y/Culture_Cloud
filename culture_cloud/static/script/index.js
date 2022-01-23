

function searchImgCarousel() {
    var carouselCont = document.getElementsByClassName("mainSearchCont")[0];
    var imgItems = carouselCont.getElementsByClassName("searchImgItem");

    var imgIndex = (() => {
        for(var i=0; i < imgItems.length; i++){
            if(imgItems[i].classList.contains("showSearchImg")){
                return i;
            }
        }
        return -1;
    })();

    if(imgIndex === -1){
        imgItems[0].classList.add("showSearchImg");
        imgItems[0].style.animation = "slideIn 0.75s linear";
    }else{
        imgItems[imgIndex].classList.remove("showSearchImg");
        imgItems[imgIndex].style.animation = "slideOut 0.75s linear";
        imgItems[imgIndex+1].classList.add("showSearchImg");
        imgItems[imgIndex+1].style.animation = "slideIn 0.75s linear";
    }

    if(imgIndex !== (imgItems.length - 2)){
        setTimeout(() => {
            searchImgCarousel();
        }, 3000);
    }
}

var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = period;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.placeholder = this.txt;

    var that = this;
    var delta = 80;

    if (this.isDeleting) { delta /= 2; }

    if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 300;
    }

    if(this.toRotate[i] == this.toRotate[this.toRotate.length-1] && this.isDeleting){
        return;
    }

    setTimeout(function() {
    that.tick();
    }, delta);
};

function searchAnimation(){
    var searchBar = document.getElementsByClassName("mainSearchBar")[0];
    var searchExamples = ["Russian Architecture", "Mexico Beaches", "Thailandese Culture", "Hong Kong Attractions"];

    new TxtType(searchBar, searchExamples, 1000);
}

function showNavSearch(){
    var navBarCont = document.getElementsByClassName("searchCont")[0];

    navBarCont.classList.add("showNavSearch");
}

function mainSeachVisibility(){
    var searchCont = document.getElementsByClassName("mainSearchCont")[0]; 
    var rect = searchCont.getBoundingClientRect();
    var navBarCont = document.getElementsByClassName("searchCont")[0];

    if(rect.bottom < 0){
        navBarCont.classList.add("showNavSearch");
    }else{
        navBarCont.classList.remove("showNavSearch");
    }
}

window.addEventListener('load', function() {
    searchImgCarousel();
    searchAnimation();
    mainSeachVisibility();
})

window.addEventListener('scroll', function() {
    mainSeachVisibility();
})

document.getElementsByClassName("mainSearchForm")[0].addEventListener('submit', function(event) {
    event.preventDefault();
})