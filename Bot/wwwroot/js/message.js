"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("https://180638be7100f9.lhr.life/signal").build();

//Disable the send button until connection is established.
//document.getElementById("sendButton").disabled = true;


const showTinHieu = (tinhieu) => {
    const tbody = $("#bot-tbl-signals tbody")
    var date = tinhieu[0].split(" ")[2]
    var time = tinhieu[0].split(" ")[3]
    var signal = tinhieu[1].split(" ")[2].slice(0, -1);
    var price = parseFloat(tinhieu[2].split(':').pop().trim()).toFixed(2)

    var template = `<tr>
                        <td class="text-left">
                            <em><span class="date">${date}</span></em>
                        </td>
                        <td class="text-left">
                            <b><span class="time">${time}</span></b>
                        </td>
                        <td class="signal text-center ${signal}">
                            <span class="signal">${signal.toUpperCase()}</span>
                        </td>
                        <td class="text-right">
                            <span class="price" text-center="">${price}</span>
                        </td>
                    </tr>`;
    tbody.append(template)
}
connection.on("Signal", function (message) {
    const tinhieu = message.split("\n").map(line => line.trim())
    console.log(tinhieu)
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
