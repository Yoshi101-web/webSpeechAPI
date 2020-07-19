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
</body>
</html>