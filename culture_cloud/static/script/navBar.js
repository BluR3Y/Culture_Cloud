
function displayBackDrop(){     
    var blur = document.getElementsByClassName("pageBackDrop")[0];     
    
    if(!blur.classList.contains("displayBackDrop")){    
        blur.classList.add("displayBackDrop");     
    }else{                                           
        blur.classList.remove("displayBackDrop");   
    }
}
function clickedBackDrop(){         
    var blur = document.getElementsByClassName("pageBackDrop")[0];     
    var sideMenu = document.getElementsByClassName("sideMenu")[0];     
    var menuBtn = document.getElementsByClassName("headerMenuBtn")[0];

    blur.classList.remove("displayBackDrop");       

    if(sideMenu.classList.contains("showSideMenu")){    
        sideMenu.classList.remove("showSideMenu");  
    }

    if(menuBtn.classList.contains('openMenu')){
        menuBtn.classList.remove('openMenu');
    }
}

function showSideMenu(){       
    var sideMenu = document.getElementsByClassName("sideMenu")[0];  
    var btnCont = document.getElementsByClassName("headerMenuBtn")[0];  

    if(!btnCont.classList.contains('openMenu')){    
        btnCont.classList.add('openMenu');          
    }else{                                         
        btnCont.classList.remove('openMenu');       
    }

    if(!sideMenu.classList.contains("showSideMenu")){   
        sideMenu.classList.add("showSideMenu");         
    }else{                                              
        sideMenu.classList.remove("showSideMenu");      
    }
    displayBackDrop();      
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
    var searchBar = document.getElementsByClassName("searchInput")[0];
    var searchExamples = ["Russian Architecture", "Mexico Beaches", "Hong Kong Attractions", "Thailandese Culture"];

    new TxtType(searchBar, searchExamples, 1000);
}

function logOutUser() {
    localStorage.clear();
    location.reload();
}

window.addEventListener('load', function() {
    searchAnimation();
})
