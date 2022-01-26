function highlightCont(el) {
    var parentEl = el.parentElement;
    var messageCont = parentEl.querySelector('h1');
    var errorMsg = parentEl.querySelector('span');

    parentEl.style.border = "2px solid blue";
    if(messageCont.style.display === "block"){
        messageCont.style.display = "none";
        errorMsg.innerHTML = "";
    }
}
function defaultCont(el) {
    parentEl = el.parentElement;
    parentEl.style.border = "2px solid rgb(193, 226, 255)";
}

document.getElementById('signinForm').addEventListener('submit', (el) => {
    el.preventDefault();

    var form = document.getElementById("signinForm");
    var inputConts = document.getElementsByClassName("inputContainer");
    var username = inputConts[0].querySelector('input').value;
    var pword = inputConts[1].querySelector('input').value;
    var csrfToken = form.getElementsByTagName("input")[0].value;
    var inputType = (() => {
        if(validateEmail(username)) {
            return 'email';
        }else{
            return 'username';
        }
    })();

    var userFormData = {
        'primaryInput': username,
        'inputType': inputType,
        'password':pword,
    }

    var url = '/signinUser'
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json',
            'X-CSRFToken':csrfToken,
        },
        body: JSON.stringify({'userForm':userFormData})
    })
    .then((response) => response.json())
    .then((data) => {

        if(data['status'] === "failed") {
            if(data['reason'] === "userDNE") {
                var usernameCont = inputConts[0];
                var messageCont = usernameCont.querySelector('h1');
                var errorMsg = usernameCont.querySelector('span');
        
                usernameCont.style.border = "2px solid red";
                messageCont.style.display = "block";
                errorMsg.innerHTML = "User Does Not Exist";
                return;
            }else if(data['reason'] === "invalidPword") {
                var usernameCont = inputConts[1];
                var messageCont = usernameCont.querySelector('h1');
                var errorMsg = usernameCont.querySelector('span');
        
                usernameCont.style.border = "2px solid red";
                messageCont.style.display = "block";
                errorMsg.innerHTML = "Invalid Password";
                return;
            }
        }else {
            userStorage = window.localStorage;
            localStorage.setItem('user_id',data['user_id']);
            localStorage.setItem('user_name',data['user_name']);
            window.location.href = "/";
        }
    })
})

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};