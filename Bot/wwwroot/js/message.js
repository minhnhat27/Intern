
var connection = new signalR.HubConnectionBuilder()
    .withUrl("https://9d84021fe6bc5d.lhr.life/signal")
    .withAutomaticReconnect()
    .build();

//Disable the send button until connection is established.
//document.getElementById("sendButton").disabled = true;


connection.on("Signal", function (message) {
    add_logs(message)
    const tinhieu = message.split("\n").map(line => line.trim())
    showTinHieu(tinhieu)
    if ($("#bot-auto-order").is(":checked")) {
        botAutoClick(tinhieu)
    }
});

connection.start().then(function () {
    //document.getElementById("sendButton").disabled = false;
    console.log("Connected")
}).catch(function (err) {
    return console.error(err.toString());
});

//async function start() {
//    try {
//        await connection.start();
//    } catch (err) {
//        console.error('Connection failed', err);
//        setTimeout(() => start(), 2000);
//    }
//}
//start();


//document.getElementById("sendButton").addEventListener("click", function (event) {
//    var user = document.getElementById("userInput").value;
//    var message = document.getElementById("messageInput").value;
//    connection.invoke("SendMessage", user, message).catch(function (err) {
//        return console.error(err.toString());
//    });
//    event.preventDefault();
//});
