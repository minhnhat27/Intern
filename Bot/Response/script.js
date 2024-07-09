"use strict"

const baseURL = "https://autobotps.com/v1"

const api_auth = `${baseURL}/api/auth`
const api_signal = `${baseURL}/api/signal`
const api_logHistory = `${baseURL}/api/logHistory`
const api_profitLoss = `${baseURL}/api/profitLoss`

const scripts = `<script src="${baseURL}/assets/js/common.js"></script>
                <script src="${baseURL}/assets/js/signalr/dist/browser/signalr.js"></script>`

const timezone7 = 7 * 60 * 60 * 1000; //ms

const getISOStringNow = () => {
    var time = new Date().getTime() + timezone7;
    return new Date(time).toISOString();
}

const logHistory = (signal, priceBuy, profitPointTP, numberContract, isSL) => {
    const userId = getCurrentUser().userId
    const dateTime = getISOStringNow()
    const data = JSON.stringify({ signal, profitPointTP, priceBuy, numberContract, isSL, dateTime, userId })
    $.ajax({
        url: api_logHistory + "/add",
        method: "POST",
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },
        data: data,
    }).fail((_, error) => console.log(error))
}

const profitLoss = (price) => {
    const userId = getCurrentUser().userId
    const date = getISOStringNow()
    const data = JSON.stringify({ userId, date, price })
    $.ajax({
        url: api_profitLoss + "/add",
        method: "POST",
        headers: { 'Authorization': 'Bearer ' + getAccessToken() },
        data: data,
    }).fail((_, error) => console.log(error))
}

const add_logs = (text) => {
    var now = new Date()
    text = now.toLocaleTimeString('vi-VN') + ": " + text
    const bot_logs = $("#bot-logs");
    !bot_logs.text() ? bot_logs.text(text) : bot_logs.text(bot_logs.text() + '\n' + text);
}

const showTinHieu = (tinhieu) => {
    const date = tinhieu[0].split(" ")[2]
    const time = tinhieu[0].split(" ")[3]
    const signal = tinhieu[1].split(" ")[2].slice(0, -1);
    const price = parseFloat(tinhieu[2].split(':').pop().trim()).toFixed(2)

    const template = `<tr>
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
    $("#signal-header").after(template)
}

const getBotSignal = () => {
    $.ajax({
        url: api_signal,
        success: (data) => {
            const tbody = $("#bot-tbl-signals tbody")
            if (data.length > 0) {
                data.map((sig) => {
                    const dateTime = sig.dateTime.split(' ')
                    const date = dateTime[0]
                    const time = dateTime[1]
                    const signal = sig.signal;
                    const price = sig.price;

                    const template = `<tr>
                                <td class="text-left">
                                    <em><span class="date">${date}</span></em>
                                </td>
                                <td class="text-left">
                                    <b><span class="time">${time}</span></b>
                                </td>
                                <td class="signal text-center ${signal.toLowerCase()}">
                                    <span class="signal">${signal.toUpperCase()}</span>
                                </td>
                                <td class="text-right">
                                    <span class="price" text-center="">${price}</span>
                                </td>
                            </tr>`;
                    tbody.append(template)
                })
            }
        }
    })
}

const getCurrentUser = () => {
    const my_user = getCookie("bot_data")
    return my_user ? JSON.parse(my_user) : my_user
}

const getAccessToken = () => getCookie("auth_token")

const my_logout = () => {
    const refresh_token = getCurrentUser()?.refresh_token;
    const json = JSON.stringify({ refresh_token })
    $.ajax({
        url: api_auth + "/logout",
        method: "POST",
        data: json,
    }).done(() => {
        setCookie("auth_token", "", -1)
        setCookie("bot_data", "", -1)
        add_logs("Đã đăng xuất, trang sẽ được tải lại")
        window.location.reload()
    }).fail((_, error) => {
        error === 'timeout'
            ? add_logs("Mạng yếu, vui lòng thử lại.")
            : add_logs(error)
    })
}

const server_logout = () => {
    setCookie("auth_token", "", -1)
    setCookie("bot_data", "", -1)
    add_logs("Tài khoản đã bị đăng xuất, trang sẽ được tải lại")
    window.location.reload()
}

const refreshToken = () => {
    const refresh_token = getCurrentUser()?.refresh_token;
    const data = JSON.stringify({ refresh_token })

    $.ajax({
        url: api_auth + "/refresh-token",
        method: "POST",
        data: data
    }).done((data) => {
        if (data.access_token) {
            setCookie("auth_token", data.access_token, 5);
        }
    }).fail(() => {
        add_logs("error refresh token")
        //setCookie("bot_data", "", -1)
        //window.location.reload()
    })
}

var checkAdded
function checkTimeAndAddProfitLoss() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    
    if (hours > 14 || (hours === 14 && minutes >= 30)) {
        const today = now.toISOString().split('T')[0];
        const lastCalled = getCookie('lastCalledDate');
        if (lastCalled !== today) {
            profitLoss(parseFloat($("#vmAccInfo").text()));
            setCookie('lastCalledDate', today, 2 * 24 * 60);
            clearInterval(checkAdded)
        }
    }
}

const botSettings = {
    enable: false,
    trendType: "0",
    volume: {
        type: "0",
        value: 0
    }
}

$(document).ready(() => {
    $("body").append(scripts)
})

$(window).on('load', async () => {
    $.ajaxSetup({
        contentType: 'application/json',
        timeout: 20000
    })

    checkTimeAndAddProfitLoss()
    checkAdded = setInterval(checkTimeAndAddProfitLoss, 60000);

    const isDemo = window.location.href.includes("smarteasy.vps.com.vn")

    isDemo ? $(".btn.btn-block.btn-default.active.btn-cancel-all").addClass("text-white btn-warning")
        : $("#button_cancel_all_order_normal").addClass("text-white bg-warning")

    const web = $("div#orderPS.tab-pane.active")
    const root = $(packageHtml)
    web.append(root)
    root.append(loginFormHtml)

    async function loggingAndBot(isLogin = '') {
        //5m
        isLogin || refreshToken()
        setInterval(() => refreshToken(), 300000)

        const my_user = getCurrentUser()
        $("#my-name").text(my_user.name)

        $.ajaxSetup({
            headers: { 'Authorization': 'Bearer ' + getAccessToken() }
        })

        const extContent = $("#ext-content")
        extContent.children().replaceWith(loggingHtml)

        const ulPanel = $("#ulPanel")
        ulPanel.addClass("flex-nowrap")
        ulPanel.append(liPanel)

        $("#ngiaIndex").after(tabExtContent)

        add_logs("Khởi động hệ thống")
        $(".bot-history-clear").click(function () {
            $("#bot-logs").text('')
        })

        const botVolume = $("#bot-volume")
        const botVolumeValue = $("#bot-volume-value")
        const botAutoOrder = $("#bot-auto-order")
        const sucMua = $("#sucmua-int")
        var sohodong = $("#sohopdong")

        var settings = () => localStorage.getItem("autoBotSettings") && JSON.parse(localStorage.getItem("autoBotSettings"))

        const st = settings()
        if (st) {
            botAutoOrder.attr("checked", st.enable)
            $("#bot-trendTypes").val(st.trendType)
            botVolume.val(st.volume.type)
            botVolumeValue.val(st.volume.value)
        } else {
            botVolumeValue.val(parseInt(sucMua.text()))
            botAutoOrder.attr("checked", false)
        }
        botVolumeValue.attr("max", sucMua.text())

        botVolume.change(function () {
            if ($(this).val() === "0") {
                botVolumeValue.val(parseInt(sucMua.text()))
                if (botAutoOrder.is(":checked")) {
                    sohodong.val(botVolumeValue.val())
                }
            }
        })

        botVolumeValue.on("input", function () {
            let value = $(this).val()
            const max = parseInt($(this).attr('max'))
            if (value > max) {
                $(this).val(max)
            }
            botVolume.val("1")
            if (botAutoOrder.is(":checked")) {
                sohodong.val($(this).val())
            }

            localStorage.setItem("autoBotSettings", JSON.stringify({
                ...settings() ?? botSettings,
                volume: {
                    type: botVolume.val(),
                    value: $(this).val()
                }
            }))
        })

        if (botAutoOrder.is(":checked")) {
            sohodong.val(botVolumeValue.val())
        }

        botAutoOrder.on("change", function () {
            if ($(this).is(":checked")) {
                sohodong.val(botVolumeValue.val())
                add_logs("Đã bật bot hỗ trợ đặt lệnh")
                console.log("Đã bật bot hỗ trợ đặt lệnh");
            }
            else {
                sohodong.val(1)
                add_logs("Đã tắt bot hỗ trợ đặt lệnh")
                console.log("Đã tắt bot hỗ trợ đặt lệnh");
            }
            localStorage.setItem("autoBotSettings", JSON.stringify({
                ...settings() ?? botSettings,
                enable: $(this).is(":checked")
            }))
        })

        $("#bot-trendTypes").on("change", function () {
            add_logs("Khi có trend " + $(this).find(":selected").text())
            localStorage.setItem("autoBotSettings", JSON.stringify({
                ...settings() ?? botSettings,
                trendType: $(this).val()
            }))
        })

        botVolume.on("change", function () {
            add_logs($(this).find(":selected").text() + " " + botVolumeValue.val())
            localStorage.setItem("autoBotSettings", JSON.stringify({
                ...settings() ?? botSettings,
                volume: {
                    type: $(this).val(),
                    value: botVolumeValue.val()
                }
            }))
        })

        getBotSignal()
        const debouncedGetBotSignal = debounce(() => {
            $("#bot-tbl-signals tbody").empty();
            getBotSignal()
        }, 500);

        $(".bot-signal-refresh").click(debouncedGetBotSignal)

        $(".satbot-logout").click(() => {
            if (confirm("Nhấn Ok để xác nhận Hủy liên kết, No để trở lại")) {
                my_logout()
            }
        })

        const funcTheoDoiSucMua = () => {
            const sucmua = document.getElementById("sucmua-int")
            if (!sucmua) {
                setTimeout(funcTheoDoiSucMua, 1000)
            }
            else {
                const observer = new MutationObserver(function (mutationsList) {
                    for (let mutation of mutationsList) {
                        if (mutation.type === 'characterData' || mutation.type === 'childList') {
                            const newValue = parseInt(mutation.target.textContent) //sucMua.text()

                            botVolumeValue.attr("max", newValue)
                            if (newValue < botVolumeValue.val()) {
                                botVolumeValue.val(newValue)
                            }
                            else if (newValue > botVolumeValue.val() && botVolume.val() === "0") {
                                botVolumeValue.val(newValue)
                            }

                            localStorage.setItem("autoBotSettings", JSON.stringify({
                                ...settings() ?? botSettings,
                                volume: {
                                    type: botVolume.val(),
                                    value: botVolumeValue.val()
                                }
                            }))

                        }
                    }
                });
                observer.observe(sucmua, { characterData: true, childList: true, subtree: true });
            }
        }
        funcTheoDoiSucMua()

        const convertFloatToFixed = (value, fix = 1) => parseFloat(parseFloat(value.split(':').pop().trim()).toFixed(fix));

        const divideNumberBy2CeilToArray = (value) => {
            let a = Math.ceil(parseInt(value) / 2)
            let b = value - a
            return [a, b]
        }

        const runBotNormal = (tinhieu, giadat, hopdong) => {
            $('.cancel-all-confirm').css('display', '')
            $('#use_stopOrder').prop('checked', false)

            $('#modal_price').text(giadat)
            objConfig.CONFIRM_ORDER = false
            $("#right_price").val(giadat)

            $("#sohopdong").val(hopdong)

            tinhieu === "LONG" ? $('input[name="type"]').val("B") : $('input[name="type"]').val("S")
            
            isDemo
                ? saveOrder()
                : saveOrderNew()
                
            add_logs(`Đã đặt lệnh ${tinhieu} giá ${giadat} với ${hopdong} hợp đồng`)
        }

        const runBotStopOrder = (tinhieu, hopdong, stopOrderValue) => {
            $("#right_price").val("MTL")
            $("#sohopdong").val(hopdong)
            tinhieu === "LONG" ? $('input[name="type"]').val("B") : $('input[name="type"]').val("S")

            if (isDemo) {
                plusDivs(1)
                $('.cancel-all-confirm').css('display', '')
                $('#use_stopOrder').prop('checked', true)
                tinhieu === "LONG" ? $('#selStopOrderType').val("SOL") : $("#selStopOrderType").val("SOU")
                $('#soIndex').val(stopOrderValue)

                saveOrder()

                plusDivs(-1)
                $('#use_stopOrder').prop('checked', false)
            }
            else {
                changeSelectionType($("#select_condition_order_wrapper"))
                changeSelectOrder($('#select_order_type').children().eq(1)[0])

                $('#modal_price').text("MTL")
                objConfig.CONFIRM_ORDER = false

                $("#right_order_type").data("2")
                $("#right_stock_cd_code").data("3")

                tinhieu === "LONG" ? $('#right_selStopOrderType').val("SOL") : $("#right_selStopOrderType").val("SOU")

                $('#right_stopOrderIndex').val(stopOrderValue)

                saveOrderNew()

                changeSelectionType($("#select_normal_order_wrapper"))
            }
            add_logs(`Đã đặt lệnh ${tinhieu} Stop Order: ${stopOrderValue}, MTL với ${hopdong} hợp đồng`)
        }

        const huyLenhThuong = () => {
            $('.cancel-all-confirm').css('display', 'none')

            isDemo
                ? saveOrder()
                : saveOrderNew()

            $('.cancel-all-confirm').css('display', '')
            add_logs("Đã hủy tất cả lệnh thường")
        }

        const huyLenhDieuKien = () => {
            if (isDemo) {
                objOrderPanel.create = 0;
                objOrderPanel.showConditionOrderList()
                setTimeout(() => {
                    $("#tbodyContentCondition tr").each(function () {
                        const link = $(this).find('a[id^="btne_"]');
                        if (link.length > 0) {
                            const orderNo = $(this).children().eq(0).attr('id').split('_')[1]
                            $("#order_del_no_conf").val(orderNo)
                            cancelOrder("advance")
                        }
                    })
                }, 300)
            }
            else {
                $("#modal_stock_cd_cancel_all").val("ALL")
                $("#modal_account_cancel_all").val($("#right_account option:selected").val())
                $('#cancel_order_type').val("order_condition")
                cancelAllOrderPending()
            }
            add_logs("Đã hủy tất cả lệnh điều kiện chờ kích hoạt")
        }

        const huyViTheHienTai = () => {
            const vithe = parseInt($("#status-danhmuc-content").children().eq(0).children().eq(1).text())
            if (vithe) {
                vithe > 0
                    ? runBotNormal("SHORT", "MTL", Math.abs(vithe))
                    : runBotNormal("LONG", "MTL", Math.abs(vithe))
            }
        }

        const capNhatSoHopDong = () => {
            const li = ulPanel.children()
            li.eq(0).children().click()
            //li.eq(2).children().click()
        }

        const daoLenh = (tinhieu) => tinhieu === "LONG" ? "SHORT" : "LONG"

        let obs
        const botAutoClick = (arr, fullHopdong = parseInt(botVolumeValue.val()), isAdmin = false) => {
            let tinhieu = arr[1].includes("Tin hieu long: Manh") ? "LONG" : "SHORT"

            add_logs("Tính hiệu: " + tinhieu)

            let dadatTp1 = false
            let dadatTp2 = false
            let daHuyInitCancel = false
            let daHuyTp1Cancel = false

            const type = arr[arr.length - 1].split(" ")
            const daoChieu = arr[arr.length - 1] === "REVERSE" || type[0] === "REVERSE"

            const vithe = $("#status-danhmuc-content").children().eq(0).children().eq(1).text()

            let delay = 100

            let my_hd = fullHopdong

            const ngDat = parseInt(botVolumeValue.val())
            if (daoChieu) {
                add_logs("Tính hiệu đảo chiều!")

                const soViThe = parseInt(vithe)
                const soSucMua = parseInt(sucMua.text())

                if (botVolume.val() === "0") {
                    if (soViThe && !soSucMua) {
                        if (Math.abs(soViThe) >= fullHopdong) {

                            if (!isAdmin) {
                                my_hd = fullHopdong + Math.abs(soViThe) 
                            }

                            fullHopdong += Math.abs(soViThe)
                        }
                        else {
                            my_hd = Math.abs(soViThe)
                            fullHopdong = Math.abs(soViThe) * 2
                        }
                    }
                    else if (!soViThe && soSucMua) {
                        if (fullHopdong > ngDat) {
                            my_hd = ngDat
                            fullHopdong = ngDat
                        }
                    }
                    else if (soViThe && soSucMua) {
                        if ((Math.abs(soViThe) + ngDat) < fullHopdong) {
                            my_hd = (Math.abs(soViThe) + ngDat)
                            fullHopdong = Math.abs(soViThe) * 2 + ngDat // hoac (Math.abs(soViThe) + botVolumeValue.val()) + Math.abs(soViThe)
                        }
                        else {
                            my_hd = fullHopdong
                            fullHopdong += Math.abs(soViThe)

                            if (!isAdmin) {
                                my_hd = fullHopdong + Math.abs(soViThe)
                            }
                        }
                    }
                }
                else {
                    if (soViThe && !soSucMua) {
                        if (Math.abs(soViThe) >= fullHopdong) {
                            fullHopdong += Math.abs(soViThe)
                        }
                        else {
                            my_hd = Math.abs(soViThe)
                            fullHopdong = Math.abs(soViThe) * 2
                        }
                    }
                    else if (!soViThe && soSucMua) {
                        if (fullHopdong > ngDat) {
                            my_hd = ngDat
                            fullHopdong = ngDat
                        }
                    }
                    else if (soViThe && soSucMua) {
                        if (fullHopdong > ngDat) {
                            my_hd = ngDat
                            fullHopdong = ngDat + Math.abs(soViThe)
                        }
                        else {
                            fullHopdong += Math.abs(soViThe)
                        }
                    }
                }

                huyLenhThuong()
                huyLenhDieuKien()

                delay = 500
            }
            else {
                if (fullHopdong > ngDat) {
                    my_hd = ngDat
                    fullHopdong = ngDat
                }
            }

            let giamua = convertFloatToFixed(arr[2])
            tinhieu === "LONG"
                ? giamua += 0.2
                : giamua -= 0.2
            giamua = giamua.toFixed(1)

            let catLo = convertFloatToFixed(arr[7])
            tinhieu === "LONG"
                ? catLo -= 0.3
                : catLo += 0.3
            catLo = catLo.toFixed(1)

            const tp1 = convertFloatToFixed(arr[3])
            const tp2 = convertFloatToFixed(arr[4])
            
            const order50 = divideNumberBy2CeilToArray(my_hd)
            const order25 = divideNumberBy2CeilToArray(order50[1])

            const trendType = $("#bot-trendTypes").val()
            if (((trendType == "1" && tinhieu == "LONG") || (trendType == "2" && tinhieu == "SHORT") || trendType == "0")
                && fullHopdong > 0) {
                setTimeout(() => {
                    //Vo 100%
                    runBotNormal(tinhieu, giamua, fullHopdong)

                    //dao lenh
                    tinhieu = daoLenh(tinhieu)
                    runBotStopOrder(tinhieu, fullHopdong, catLo)

                    //Chot 50%
                    if (order50[0] > 0) {
                        runBotNormal(tinhieu, tp1, order50[0])
                    }

                    //Chot 25%
                    if (order25[0] > 0) {
                        runBotNormal(tinhieu, tp2, order25[0])
                    }

                    const funcTheoDoiGiaKhopLenh = () => {
                        const nodeGiaKhop = document.getElementById("tbodyPhaisinhContent").childNodes[0]?.childNodes[10]
                        if (!nodeGiaKhop) {
                            setTimeout(funcTheoDoiGiaKhopLenh, 1000)
                        }
                        else {
                            if (obs) {
                                obs.disconnect()
                            }
                            obs = new MutationObserver(function (mutationsList) {
                                for (let mutation of mutationsList) {
                                    if (mutation.type === 'characterData' || mutation.type === 'childList') {
                                        const giaKhopLenh = parseFloat(mutation.target.textContent)
                                        
                                        if (isNaN(giaKhopLenh)) continue;

                                        const isShort = tinhieu === "SHORT"

                                        const condition1 = isShort
                                            ? giaKhopLenh >= tp1 && giaKhopLenh < tp2
                                            : giaKhopLenh <= tp1 && giaKhopLenh > tp2

                                        const condition2 = isShort
                                            ? giaKhopLenh >= tp2
                                            : giaKhopLenh <= tp2

                                        //const lenhBanDau = daoLenh(tinhieu)

                                        if (condition1 && !dadatTp1 && order50[0] > 0) {
                                            huyLenhDieuKien()

                                            isDemo
                                                ? setTimeout(() => runBotStopOrder(tinhieu, order50[0], giamua), delay)
                                                : runBotStopOrder(tinhieu, order50[0], giamua)

                                            dadatTp1 = true
                                            logHistory(tinhieu, giamua, tp1, order50[0], false)
                                        }
                                        else if (condition2 && !dadatTp2 && order25[0] > 0) {
                                            huyLenhDieuKien()

                                            isDemo
                                                ? setTimeout(() => runBotStopOrder(tinhieu, order25[0], tp1), delay)
                                                : runBotStopOrder(tinhieu, order25[0], tp1)

                                            dadatTp1 = true
                                            dadatTp2 = true
                                            logHistory(tinhieu, tp1, tp2, order25[0], false)
                                        }

                                        const initCancelCondition = isShort
                                            ? giaKhopLenh <= catLo && !dadatTp1 && !dadatTp2
                                            : giaKhopLenh >= catLo && !dadatTp1 && !dadatTp2

                                        const tp1Condition = isShort
                                            ? giaKhopLenh <= giamua && dadatTp1 && !dadatTp2
                                            : giaKhopLenh >= giamua && dadatTp1 && !dadatTp2

                                        if (initCancelCondition && !daHuyInitCancel) {
                                            huyLenhThuong()

                                            daHuyInitCancel = true
                                            logHistory(tinhieu, giamua, catLo, my_hd, true)
                                        }
                                        else if (tp1Condition && !daHuyTp1Cancel) {
                                            huyLenhThuong()

                                            daHuyInitCancel = true
                                            daHuyTp1Cancel = true
                                            logHistory(tinhieu, giamua, tp1, (my_hd - parseInt(order50[0])), true)
                                        }
                                    }
                                }
                            });
                            
                            obs.observe(nodeGiaKhop, { characterData: true, childList: true, subtree: true })
                        }
                    }
                    funcTheoDoiGiaKhopLenh()
                }, delay)           
            }
            
        }

        
        var connection = new signalR.HubConnectionBuilder()
            .withUrl(`${baseURL}/realtimeSignal`)
            .withAutomaticReconnect()
            .build()

        connection.on("Signal", function (message) {
            const tinhieu = message.split("\n").map(line => line.trim())
            showTinHieu(tinhieu)

            if (botAutoOrder.is(":checked")) {
                capNhatSoHopDong()
                botAutoClick(tinhieu)
            }
        })

        connection.on("ServerMessage", function (message) {
            if (message == "LOGOUT") {
                server_logout()
            }
        })

        connection.on("AdminSignal", function (message) {
            if (botAutoOrder.is(":checked")) {
                capNhatSoHopDong()
                if (message == "CANCEL_ALL") {
                    add_logs(message)

                    huyLenhThuong()
                    huyLenhDieuKien()
                }
                else if (message == "CANCEL_VITHE") {
                    add_logs("Hủy vị thế hiện tại")

                    huyViTheHienTai()
                }
                else {
                    const arr = message.split("\n").map(line => line.trim())
                    showTinHieu(arr)
                    const type = arr[arr.length - 1].split(" ")

                    let hopdong = botVolumeValue.val()

                    if ((type[1] || type[2]) && (parseInt(type[1]) > 0 || parseInt(type[2]) > 0)) {
                        let hd = parseInt(type[1]) || parseInt(type[2])
                        hopdong = hd
                    }

                    if (type[0] === "NO_STOP_ORDER" || type[1] === "NO_STOP_ORDER") {
                        const tinhieu = arr[1] === "Tin hieu long: Manh" ? "LONG" : "SHORT"

                        let giamua = convertFloatToFixed(arr[2])
                        tinhieu === "LONG"
                            ? giamua += 0.2
                            : giamua -= 0.2
                        giamua = giamua.toFixed(1)

                        runBotNormal(tinhieu, giamua, hopdong)
                    }
                    else {
                        botAutoClick(arr, hopdong, true)
                    }
                }
            }
        })

        await connection.start().then(() => add_logs("Đã kết nối với tín hiệu bot")).catch((err) => console.error(err))

        $('a[data-original-title="Logout"]').click(function () {
            connection.stop()
        })

        add_logs("Hệ thống sẳn sàng")
    }

    if (getCurrentUser() && getCookie("USER")) {
        loggingAndBot()
    }
    else {
        $('#cb_showPassword').on('change', function () {
            const showPassword = $(this).is(':checked');
            $('#cb_password').attr('type', showPassword ? 'text' : 'password');
        });
        $('#cb_login').click(function () {
            const $statusElement = $('#cb_loginStatus');
            try {
                $statusElement.text('').removeClass('alert-danger alert-info');

                const username = $('#cb_username').val();
                if (!username) {
                    throw new Error("Vui lòng nhập tên đăng nhập");
                }
                const password = $('#cb_password').val();
                if (!password) {
                    throw new Error("Mật khẩu không được để trống");
                }
                $statusElement.removeClass('alert-danger').addClass('alert-info').text('Đang đăng nhập...');
                $(this).attr("disabled", true)

                const data = JSON.stringify({ username, password });
                $.ajax({
                    url: api_auth + "/login",
                    method: "POST",
                    data: data
                }).done((data) => {
                    if (data.access_token) {
                        setCookie("auth_token", data.access_token, 5);
                        delete data.access_token
                        setCookie("bot_data", JSON.stringify(data), 1 * 24 * 60)
                        loggingAndBot("login")
                    } else $statusElement.text(data.error).removeClass('alert-info').addClass('alert-danger')
                }).fail((e, error) => {
                    error === 'timeout'
                        ? $statusElement.text("Mạng yếu, vui lòng thử lại.").removeClass('alert-info').addClass('alert-danger')
                        : $statusElement.text(e.responseText ?? "Có lỗi xảy ra").removeClass('alert-info').addClass('alert-danger')
                    $(this).attr("disabled", false)
                })
            } catch (error) {
                $statusElement.text(error.message ?? "Có lỗi xảy ra").removeClass('alert-info').addClass('alert-danger');
                $(this).attr("disabled", false)
            }
        });
    }
})

//  ssh -R 80:localhost:5131 localhost.run