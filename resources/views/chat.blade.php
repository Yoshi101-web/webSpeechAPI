<!DOCTYPE html>
<html lang="ja">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>Chatapp</title>
<style>
    .name {
        font-size: 10px;
    }

    .text {
        font-size: 16px;
    }

    .msg_main {
        display: flex;
        padding: 0 0 0 5px;
        justify-content: space-between;
        align-items: center;
    }

    .msg_left {
        display: flex;
        align-items: center;
    }

    .msg_right {
        display: flex;
        margin: 0 15px 0 0;
    }

    .icon {
        border-radius: 50%;
    }

    .name {
        font-size: 12px;
        opacity: 0.4;
    }

    .msg {
        padding: 0 5px 0 5px;
    }

    .time {
        font-size: 10px;
        margin: 10px 0 0 0;
    }

    .text {
        font-size: 16px;
        font-weight: lighter;
        border-radius: 10px;
        padding: 5px 5px 5px 5px;
    }

    #output {
        width: 300px;
    }
</style>
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

//Msg送信準備
const newPostRef = firebase.database();
let room = "room1";

const send = document.getElementById("send");
const username = document.getElementById("username");
const text = document.getElementById("text");
const output = document.getElementById("output");

function time() {
    var date = new Date();
    var hh = ("0"+date.getHours()).slice(-2);
    var min = ("0"+date.getMinutes()).slice(-2);
    var sec = ("0"+date.getSeconds()).slice(-2);

    var time = hh + ":" + min + ":" + sec;
    return time;
}

//Msg送信処理
send.addEventListener('click', function() {
    newPostRef.ref(room).push({
        username: username.value, 
        text: text.value,
        time: time()
    });
    text.value = "";
});

  //Msg受信処理
newPostRef.ref(room).on("child_added", function(data) {
    const v = data.val(); //データ取得
    const k = data.key;  //ユニークkey取得
    let str = "";

    str += '<div id="'+ k +'" class="msg_main">'
    str += '<div class="msg_left">'; 
    str += '<div class=""><img src="images/icon_person.png" alt="" class="icon '+ v.username +'" width="30"></div>';
    str += '<div class="msg">';
    str += '<div class="name">'+ v.username +'</div>';
    str += '<div class="text">'+ v.text +'</div>';
    str += '</div>';
    str += '</div>';
    str += '<div class="msg_right">';
    str += '<div class="time">'+ v.time +'</div>';
    str +='</div>';
    str +='</div>';

    output.innerHTML += str;
});
</script>
</body>
</html>