var contentLoop;
var videoItem;

function carouselInterval(){
    var timer = false;
    var contentTimer = false;
    var isPaused = false;
    var timeLeft = 10;
    this.start = function(){
        if(!this.isRunning()){
            timer = setInterval(function(){
                if(!isPaused){
                    nextBannerImg();
                }
            }, 11000);
            contentTimer = setInterval(function() {
                if(!isPaused){
                    displayTimer(timeLeft);
                    timeLeft--;
                }
            },1000)
        }
        displayTimer(timeLeft--);
    };
    this.stop = function(){
        clearInterval(timer);
        timer = false;
        clearInterval(contentTimer);
        contentTimer = false;
        timeLeft = 10;
    };
    this.pause = function(){
        isPaused = true;
        this.stop();
    };
    this.resume = function(){
        isPaused = false;
        this.start();
    };
    this.isRunning = function(){
        return timer !== false;
    };
    this.isPaused = function(){
        return isPaused !== false;
    };
}

function videoCtrl(passedVideo){
    var unmuteBtn = document.getElementById("unmuteBtn");
    var muteBtn = document.getElementById("muteBtn");
    var playBtn = document.getElementById("playBtn");
    var pauseBtn = document.getElementById("pauseBtn");
    var video = passedVideo;
    var displayTime = false;
    var isPaused = false;
    var isMuted = video.muted;

    this.play = function(){
        video.play();
        displayTime = setInterval(function(){
            if(!isPaused){
                updateVideoTime(video.currentTime, video.duration);
            }
        },500);
        document.getElementsByClassName("videoSlider")[0].value = 0;
        if(playBtn.style.display !== "none"){
            playBtn.style.display = "none";
        }
        if(pauseBtn.style.display !== "block"){
            pauseBtn.style.display = "block";
        }
        if(!isMuted){
            if(muteBtn.style.display !== "none"){
                muteBtn.style.display = "none";
            }
            if(unmuteBtn.style.display !== "block"){
                unmuteBtn.style.display = "block";
            }
        }
    };
    this.stop = function(){
        clearInterval(displayTime);
        video.pause();
        video.currentTime = 0;
    }
    this.pause = function(){
        video.pause();
        isPaused = true;
        playBtn.style.display = "block";
        pauseBtn.style.display = "none";
    };
    this.resume = function(){
        video.play();
        isPaused = false;
        pauseBtn.style.display = "block";
        playBtn.style.display = "none";
    }
    this.mute = function(){
        video.muted = true;
        muteBtn.style.display = "block";
        unmuteBtn.style.display = "none";
    };
    this.unmute = function(){
        video.muted = false;
        unmuteBtn.style.display = "block";
        muteBtn.style.display = "none";
    };
    this.updateTime = function(newTime){
        video.currentTime = newTime * video.duration;
        video.play();
    };
}

function displayTimer(timeLeft){
    var timerText = document.getElementsByClassName("carouselCtrl")[0].querySelector("h1");

    timerText.innerHTML = timeLeft;
}

function nextBannerImg(){
    var bannerCont = document.getElementsByClassName("mainContent")[0];
    var contentCont = bannerCont.getElementsByClassName("contentCont");
    var videoCtrlCont = document.getElementsByClassName("videoCtrl")[0];

    if(!contentLoop.isPaused()){
        contentLoop.stop();
        contentLoop.start();
    }

    var currentContentIndex = function(){
        for(var i = 0; i < contentCont.length; i++){
            if(contentCont[i].classList.contains("currentContent")){
                return i;
            }
        }
    }();

    var currentContent = contentCont[currentContentIndex];
    var nextContent;

    if(currentContentIndex !== contentCont.length - 1){
        nextContent = contentCont[currentContentIndex + 1];
    }else{
        nextContent = contentCont[0];
    }
    var currentContItem = currentContent.getElementsByClassName("contentItem")[0];
    var nextContItem = nextContent.getElementsByClassName("contentItem")[0];

    currentContent.style.animation = "slideOutLeft 1s ease";
    nextContent.classList.add("currentContent");

    if(nextContItem.tagName === "VIDEO"){
        videoItem = new videoCtrl(nextContItem);
        videoItem.play();

        if(videoCtrlCont.style.display !== "flex"){
            videoCtrlCont.style.display = "flex";
        }
    }else{
        if(videoCtrlCont.style.display !== "none"){
            videoCtrlCont.style.display = "none";
        }
    }

    nextContent.style.animation = "slideInLeft 1s ease";

    setTimeout(() => {
        if(currentContItem.tagName === "VIDEO"){
            videoItem.stop();
        }
        currentContent.classList.remove("currentContent");
    }, 900);
}

function prevBannerImg(){
    var bannerCont = document.getElementsByClassName("mainContent")[0];
    var contentCont = bannerCont.getElementsByClassName("contentCont");
    var videoCtrlCont = document.getElementsByClassName("videoCtrl")[0];

    if(!contentLoop.isPaused()){
        contentLoop.stop();
        contentLoop.start();
    }

    var currentContentIndex = function(){
        for(var i = 0; i < contentCont.length; i++){
            if(contentCont[i].classList.contains("currentContent")){
                return i;
            }
        }
    }();

    var currentContent = contentCont[currentContentIndex];
    var prevContent;

    if(currentContentIndex !== 0){
        prevContent = contentCont[currentContentIndex - 1];
    }else{
        prevContent = contentCont[contentCont.length - 1];
    }
    var currentContItem = currentContent.getElementsByClassName("contentItem")[0];
    var prevContItem = prevContent.getElementsByClassName("contentItem")[0];

    currentContent.style.animation = "slideOutRight 1s ease";
    prevContent.classList.add("currentContent");

    
    if(prevContItem.tagName === "VIDEO"){
        videoItem = new videoCtrl(prevContItem);
        videoItem.play();

        if(videoCtrlCont.style.display !== "flex"){
            videoCtrlCont.style.display = "flex";
        }
    }else{
        if(videoCtrlCont.style.display !== "none"){
            videoCtrlCont.style.display = "none";
        }
    }

    prevContent.style.animation = "slideInRight 1s ease";

    setTimeout(() => {
        if(currentContItem.tagName === "VIDEO"){
            videoItem.stop();
        }
        currentContent.classList.remove("currentContent");
    }, 900);
}

function carouselScrollOff(){
    if(contentLoop.isRunning() === true){
        contentLoop.stop();
    }
    var videoCont = document.getElementsByClassName("mainContent")[0].getElementsByClassName("currentContent")[0];
    var contentItem = videoCont.getElementsByClassName("contentItem")[0];

    if(contentItem.tagName === "VIDEO"){
        contentItem.pause();
    }
}
function carouselScrollOn(){
    if(contentLoop.isRunning() !== true){
        contentLoop.start();
    }

    var videoCont = document.getElementsByClassName("mainContent")[0].getElementsByClassName("currentContent")[0];
    var contentItem = videoCont.getElementsByClassName("contentItem")[0];

    if(contentItem.tagName === "VIDEO"){
        contentItem.play();
    }
}

function carouselControl(){
    var timerText = document.getElementsByClassName("carouselCtrl")[0].querySelector("h1");
    var continueBtn = document.getElementsByClassName("carouselCtrl")[0].querySelector("i");

    if(!contentLoop.isPaused()) {
        timerText.style.display = "none";
        continueBtn.style.display = "block";
        contentLoop.pause();
    }else {
        continueBtn.style.display = "none";
        timerText.style.display = "block";
        contentLoop.resume();
    }
}

function mainContentVisibility(){
    var mainContent = document.getElementsByClassName("mainContent")[0];
    var windowHeight = window.innerHeight;
    var bodyScrollAmount = window.scrollY;

    if(bodyScrollAmount > windowHeight){
        carouselScrollOff();
    }else{
        carouselScrollOn();
    }
}

function displayContInfo() {
    var contentItem = document.getElementsByClassName("currentContent")[0];
    var closeBtn = contentItem.getElementsByClassName("closeBtn")[0];
    var infoBtn = contentItem.getElementsByClassName("infoBtn")[0];
    var contentInfo = contentItem.getElementsByClassName("contentInfo")[0];

    if(!contentInfo.classList.contains('hideContInfo')) {
        contentInfo.classList.add('hideContInfo');
        closeBtn.style.display = "none";
        infoBtn.style.display = "block";
    }else{
        contentInfo.classList.remove('hideContInfo');
        infoBtn.style.display = "none";
        closeBtn.style.display = "block";
    }
}

function expandVideoCtrl(){
    var videoCtrl = document.getElementsByClassName("videoCtrl")[0];
    var expandBtn = document.getElementById("visibilityOpen");
    var closeBtn = document.getElementById("visibilityClose");

    videoCtrl.classList.add("expandVideoCtrl");

    expandBtn.style.display = "none";
    closeBtn.style.display = "block";
}
function closeVideoCtrl(){
    var videoCtrl = document.getElementsByClassName("videoCtrl")[0];
    var expandBtn = document.getElementById("visibilityOpen");
    var closeBtn = document.getElementById("visibilityClose");

    videoCtrl.classList.remove("expandVideoCtrl");

    closeBtn.style.display = "none";
    expandBtn.style.display = "block";
}

function updateVideoTime(time, videoLength){
    var sliderCont = document.getElementsByClassName("videoSliderCont")[0];
    var videoSlider = sliderCont.getElementsByClassName("videoSlider")[0];
    var videoTime = document.getElementById("videoTime");
    var formattedTime = "";

    videoSlider.value = (time / videoLength) * videoSlider.max;

    if(time > 3599){
        var amount = parseInt(time / 3600);
        time -= amount * 3600;
        if(amount > 9){
            formattedTime += `${amount}:`;
        }else{
            formattedTime += `0${amount}:`;
        }
    }
    
    if(time > 59){
        var amount = parseInt(time / 60);
        time -= amount * 60;
        if(amount > 9){
            formattedTime += `${amount}:`;
        }else{
            formattedTime += `0${amount}:`;
        }
    }else{
        formattedTime += "00:";
    }

    if(time > 9){
        formattedTime += String(parseInt(time));
    }else{
        formattedTime += `0${parseInt(time)}`;
    }

    videoTime.innerHTML = formattedTime;
}

function changeVideoTime(){
    var sliderCont = document.getElementsByClassName("videoSliderCont")[0];
    var videoSlider = sliderCont.getElementsByClassName("videoSlider")[0];
    videoItem.updateTime(videoSlider.value/videoSlider.max);
}

window.addEventListener("load", function(){
    contentLoop = new carouselInterval();
    contentLoop.start();
});

window.addEventListener("scroll", function(){
    mainContentVisibility();
});