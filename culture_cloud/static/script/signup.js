

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

document.getElementById('signupForm').addEventListener('submit', (el) => {
    el.preventDefault();

    var form = document.getElementById("signupForm");
    var inputConts = document.getElementsByClassName("inputContainer");
    var username = inputConts[0].querySelector('input').value;
    var email = inputConts[1].querySelector('input').value;
    var pword = inputConts[2].querySelector('input').value;
    var csrfToken = form.getElementsByTagName("input")[0].value;

    if(username.length < 3) {
        var usernameCont = inputConts[0];
        var messageCont = usernameCont.querySelector('h1');
        var errorMsg = usernameCont.querySelector('span');

        usernameCont.style.border = "2px solid red";
        messageCont.style.display = "block";
        errorMsg.innerHTML = "Username Too Short";
        return;
    }
    if(!validateEmail(email)) {
        var usernameCont = inputConts[1];
        var messageCont = usernameCont.querySelector('h1');
        var errorMsg = usernameCont.querySelector('span');

        usernameCont.style.border = "2px solid red";
        messageCont.style.display = "block";
        errorMsg.innerHTML = "Invalid Email Address";
        return;
    }
    if(pword.length < 5) {
        var usernameCont = inputConts[2];
        var messageCont = usernameCont.querySelector('h1');
        var errorMsg = usernameCont.querySelector('span');

        usernameCont.style.border = "2px solid red";
        messageCont.style.display = "block";
        errorMsg.innerHTML = "Password Too Short";
        return;
    }

    var userFormData = {
        'username': username,
        'email': email,
        'password':pword,
    }

    var url = '/createUser'
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
        if(data['status'] === "failed"){
            var usernameCont = inputConts[1];
            var messageCont = usernameCont.querySelector('h1');
            var errorMsg = usernameCont.querySelector('span');
    
            usernameCont.style.border = "2px solid red";
            messageCont.style.display = "block";
            errorMsg.innerHTML = "Email Address Taken";
            return;
        }else{
            window.location.href = "/";
        }
    })
})

const validateEmail = (email) => {
    return email.match(
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};


// AJAX request and response via POST

// var userFormData = {
//     'username':username,
//     'email':email,
//     'password':pword,
// }
// var secondData = {
//     'fName':'John',
//     'lName':'Doe',
//     'age': 23,
// }

// var url = '/createUser';
// fetch(url, {
//     method: 'POST',
//     headers: {
//         'Content-Type':'application/json',
//         'X-CSRFToken':csrfToken,
//     },
//     body:JSON.stringify({'form':userFormData, 'form2':secondData})
// })
// .then((response) => response.json())
// .then((data) => {
//     console.log(data);
// })