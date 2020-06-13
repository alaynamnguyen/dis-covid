db.collection('test').get.then((snapshot)=>{
    console.log(test.docs);
});



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
}());