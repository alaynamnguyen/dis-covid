/* Test code to get and display data from firestore */
//element in index.html that is present onload
const testList = document.querySelector('#test-list');

//create element and render test
function renderTest(doc){
    //create elements in which data will be displayed
    let li = document.createElement('li');
    let day = document.createElement('span');
    let time = document.createElement('span');
    let cross = document.createElement('div');
   

    li.setAttribute('data-id', doc.id); //first parameter is attribute name, id property is second parameter (we use document id in firestore for this)
    
    //set text content of each span attribute
    day.textContent = doc.data().day;
    time.textContent = doc.data().time;
    
    li.appendChild(day);
    li.appendChild(time);
    if(doc.data().day == "wednesday"){ //test for only specific elements (for example posts made by one user)
        cross.textContent = 'x';
        li.appendChild(cross); 
    }
    
    //append new created list to the element that is present in index.html onload
    testList.appendChild(li);

    //deleting data
    if(doc.data().day == "wednesday"){ //test for only specific elements (for example posts made by one user)
        cross.addEventListener('click', (e) => {
            e.stopPropagation();
            let id = e.target.parentElement.getAttribute('data-id'); //get the document doc.id from this 
            db.collection('test').doc(id).delete(); //find desired document with id found in line above. .delete() deletes document from database
        })
    }
}


//get data from firestore
//.where('day', '==', 'Monday')
db.collection('test').orderBy('time').get().then((snapshot)=>{ //get() returns a promise, so we need to use .then(). .where() is used for queries (first parameter is field. second parameter is operation. third paraeter is value)
    snapshot.docs.forEach(doc => {
    console.log(doc.data()); //doc.data() used to view specific data
    renderTest(doc); 
    })
})


/* Test code to add data to firestore */
//create a constant to represent the form in which data is inputted 
const form = document.querySelector('#add-test-form');

//listen for a submit event when the user clicks "submit" on the form
form.addEventListener('submit', (e) => {
    e.preventDefault(); //prevents page from refreshing
    db.collection('test').add({ //adds info to firestore
        day: form.day.value, //we use this structor for each variable. Separate each catagory with a ","
        time: form.time.value
    });
    form.day.value = "";
    form.time.value = "";
})







/*
(function () {// Your web app's Firebase configuration
    var firebaseConfig = {
        apiKey: "AIzaSyDAquTNfqjwa8bMBSzmyO_sEaeKhhq0rWQ",
        authDomain: "dis-covid.firebaseapp.com",
        databaseURL: "https://dis-covid.firebaseio.com",
        projectId: "dis-covid",
        storageBucket: "dis-covid.appspot.com",
        messagingSenderId: "93140684291",
        appId: "1:93140684291:web:b740d37d012982f706c836",
        measurementId: "G-ZNYK27S4Z4"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    // Getting elements
    const txtEmail = document.getElementById('txtEmail');
    const txtPassword = document.getElementById('txtPassword');
    const btnLogin = document.getElementById('btnLogin');
    const btnSignUp = document.getElementById('btnSignUp');
    const btnLogout = document.getElementById('btnLogout');

    // Login event when users click the login button
    btnLogin.addEventListener('click', e => {
        // Get email and password
        const email = txtEmail.value;
        const password = txtPassword.value;
        const auth = firebase.auth();
        // Signing in
        const promise = auth.signInWithEmailAndPassword(email, password);
        promise.catch(e => console.log(e.message));
    });

    // Sign up event when uses click the sign up button

    btnSignUp.addEventListener(click, e => {
        const email = txtEmail.value;
        const password = txtPassword.value;
        firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = "Sign up failed";
            // ...

            console.log(errorMessage);
          });
    });
}());
*/