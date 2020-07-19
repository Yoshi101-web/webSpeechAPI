<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Chatapp</title>
</head>
<body>
    <div> 
        <div>
            <input type="text" id="username">
        </div>
        <div>
            <textarea id="text" rows="5"></textarea>
            <button id="send">send</button>
        </div>
        <div id="output"></div>
    </div>
<!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-auth.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-database.js"></script> 

<!-- TODO: Add SDKs for Firebase products that you want to use
    https://firebase.google.com/docs/web/setup#available-libraries -->
<script src="https://www.gstatic.com/firebasejs/7.16.1/firebase-analytics.js"></script>

<script>
// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyD8YCC2jpsLVEppVOpjjjOR93eRCX2gyLM",
    authDomain: "webspeechapi-1760c.firebaseapp.com",
    databaseURL: "https://webspeechapi-1760c.firebaseio.com",
    projectId: "webspeechapi-1760c",
    storageBucket: "webspeechapi-1760c.appspot.com",
    messagingSenderId: "1038562880957",
    appId: "1:1038562880957:web:d153b95c36d56e3847b6d4",
    measurementId: "G-D8W8GJ7JCX"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
</script>
</body>
</html>