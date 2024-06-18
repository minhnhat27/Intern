﻿"use strict";

const baseURL = "https://06fc7f560a65b2.lhr.life"

const api_auth = `${baseURL}/api/auth`
const api_signal = `${baseURL}/api/signal`

const scripts = `<script src="${baseURL}/assets/js/common.js"></script>
        <script src="${baseURL}/js/signalr/dist/browser/signalr.js"></script>`

const packageHtml = `
    <div id='sat-content'>
        <link rel="stylesheet" href="${baseURL}/assets/bootstrap-table.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-table@1.22.6/dist/bootstrap-table.min.css">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
        <style>
            .modal-backdrop {
                z-index: -1;
            }

         .bot-section .row,
         .bot-section .col {
             margin: 0;
             padding: 0;
         }

         .text-long,
         .text-buy {
             color: #3a9d5d;
         }

         .btn-long,
         td.long,
         td.buy {
             background: #3a9d5d;
         }

         .text-short {
             color: #f63c3a;
         }

         .btn-short,
         td.short {
             background: #f63c3a;
         }

         td.sell,
         td.cover {
             background: #e1c608;
         }

         #tbl-bot-signals td.long,
         #tbl-bot-signals td.buy,
         #tbl-bot-signals td.short,
         #tbl-bot-signals td.sell,
         #tbl-bot-signals td.cover {
             font-weight: bold !important;
             color: white !important;
         }

         #tbl-bot-signals span.time {
             font-size: 0.9rem;
         }

         #tbl-bot-signals span.price {
             font-weight: 600;
         }

         #ulPanel a.nav-link {
             white-space: nowrap;
             overflow: hidden;
             text-overflow: ellipsis;
         }

         label.form-label {
             font-size: 0.75rem;
             margin-bottom: 0;
             margin-top: 0.5rem;
         }
     </style>
     <style>
        td.bot-img,
        td.bot-img img {
            width: 80px;
        }

        td.bot-item {
            vertical-align: top !important;
        }

        div.updated {
            font-size: 0.75rem;
            font-style: italic;
            color: var(--gray-400);
            display: flex;
            align-items: end;
        }

        div.search.btn-group {
            width: 100%;
        }

        .modal-title {
            color: black;
        }

        .modal .close {
            font-size: 2rem !important;
        }

        #bot-select .tab-content {
            background-color: transparent;
            height: auto;
        }

        #bot-select .nav-item {
            padding: 0;
            font-size: 1rem;
            text-transform: uppercase;
        }

        .bot-item {
            color: black;
            padding: 4px 0 4px 0 !important;
        }

        .bot-item .text-info {
            color: #262cef !important;
        }

        .bot-item .text-warning {
            color: #d9be00 !important;
        }

        .bot-item .text-danger {
            color: #b00006 !important;
        }

        .star-yellow {
            color: #ffc107 !important;
        }

        .bot-item img.thumb {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 0px;
            box-shadow: 0 0 5px 5px #e7e7e7;
        }

        .bot-item .title {
            font-weight: bold;
            font-size: 1rem;
        }

        .bot-item .subtitle {
            display: flex;
            flex-wrap: nowrap;
            align-items: baseline;
        }

        .bot-item .subtitle .small {
            font-size: 90%;
        }

        .bot-item .result {
            padding-top: 0.25rem;
            padding-bottom: 0.25rem;
            display: flex;
            justify-content: center;
            font-size: 0.95rem;
        }

        .bot-item .result span {
            font-weight: bold;
        }

        .bot-item .description {
            color: #333;
            text-align: justify;
            font-size: 0.9rem;
        }

        .bot-item .price {
            font-size: 1rem;
        }

        .bot-item .link {
            font-size: 0.9rem;
        }

        .bot-activate-message,
        .bot-extend-message {
            text-align: center;
            font-size: 1rem;
        }

        #bot-select div.fixed-table-container {
            max-height: 50vh !important;
        }
    </style>
    </div>
`

const loginFormHtml = `
<div id='ext-content' class='list-group-item list-group-item-accent-danger m-0 p-1'>
        <div id="bot-account-link" class="text-center py-2">
            <div class="text-center">
                <div id="cb_loginStatus" class="alert alert-info">
                    Đăng nhập để liên kết với Tài khoản ...
                </div>
            </div>
            <div class="form-group mb-1">
                <label for="cb_username">Tên đăng nhập</label><br>
                <input id="cb_username" type="text" value="" class="form-control">
            </div>
            <div class="form-group mb-1">
                <label for="cb_password">Mật khẩu</label><br>
                <input id="cb_password" type="password" value="" class="form-control">
            </div>
            <div class="form-group mb-1">
                <input id="cb_showPassword" type="checkbox">
                <label for="cb_showPassword">Hiện mật khẩu</label>
            </div>
            <div class="form-group mb-1">
                <button id="cb_login" type="button" class="btn btn-primary">Đăng nhập</button>
            </div>
            <div class="form-group mb-1">
                <a href="https://tradingbot-beta.vercel.app/register" target="_blank" title="Đăng ký tài khoản mới">
                    Chưa có tài khoản? Đăng ký tại đây
                </a>
            </div>
            <div class="form-group mb-1">
                <a href="https://tradingbot-beta.vercel.app/forget-password" target="_blank" title="Quên mật khẩu? Click vào đây">
                    Quên mật khẩu?
                </a>
            </div>
        </div>
     </div>`

const loggingHtml = `
         <div class="text-left border-bottom mb-2">
             <div class="d-flex">
                 <div class="mr-auto">
                     <i class="fa fa-copy"></i>
                     <a href="https://tradingbot-beta.vercel.app" target="_blank" title="Bot phân tán thực hiện bởi ...">....vn</a> <small>2024</small>
                 </div>
                 <div class="px-2">
                     <a href="javascript:void(0)" class="satbot-settings" title="Cài đặt">
                         <i class="fa fa-cog"></i>
                     </a>
                     <a href="javascript:void(0)" class="satbot-logout" title="Đăng xuất">
                         <i class="fa fa-sign-out"></i>
                     </a>
                 </div>
             </div>
         </div>

         <div id="ext-test" class="d-none bot-test text-center py-2">
             <div class="row justify-content-center">
                 <div class="col">
                     <button type="button" class="btn btn-success btn-test-buy px-2">BUY</button>
                     <button type="button" class="btn btn-danger btn-test-sell px-2">SELL</button>
                     <button type="button" class="btn btn-danger btn-test-short px-2">SHORT</button>
                     <button type="button" class="btn btn-success btn-test-cover px-2">COVER</button>
                 </div>
             </div>
             <div class="row justify-content-center py-2">
                 <div class="col">
                     <button type="button" class="btn btn-warning btn-test-wait px-2">WAIT</button>
                     <button type="button" class="btn btn-warning btn-test-activate px-2">Kích hoạt</button>
                     <button type="button" class="btn btn-danger btn-test-reset px-2">Reset</button>
                 </div>
             </div>
         </div>

         <div class="d-none bot-expired alert alert-danger text-center">
             Bot đã hết hạn sử dụng <br> Vui lòng đăng ký lại.
             <br>
             <a href="https://tradingbot-beta.vercel.app" type="button" class="btn btn-primary">Đăng ký</a>
         </div>

         <div class="text-left border-bottom d-flex">
             <div class="mr-auto">
                 <i class="fa fa-list"></i>
                 Nhật ký hệ thống
             </div>
             <div class="px-2">
                 <a href="javascript:void(0)" title="Xóa nhật ký" class="bot-history-clear">
                     <i class="fa fa-trash"></i>
                 </a>
             </div>
         </div>
         <div class="container-fluid m-0 p-0">
             <textarea id="bot-logs" class="form-controls w-100" rows="10" readonly="" style="font-size: 0.75rem;font-style:italic;border-color:#c8ced3;color:var(--gray-700) !important;"></textarea>
         </div>
    `

const tabExtContent = `
<div id="tab-ext" class="div-tab tab-pane fade in text-white" role="tabpanel">
    <div id="ext-tab-content">
         <div id="bot-settings" class="container-fluid m-0 p-2 bot-section">

             <div class="d-flex justify-content-between border-bottom ">
                 <div class="d-flex align-items-center">
                     <i class="fa fa-list mr-1"></i>
                     <b>Hỗ trợ Đặt lệnh</b>
                 </div>
                 <div class="text-right">
                     <label class="switch switch-label switch-label-panel switch-pill switch-success switch-sm float-right">
                         <input class="switch-input st-bot-config bot-settings" name="bot-auto-order" id="bot-auto-order" type="checkbox">
                         <span class="switch-slider" data-checked="On" data-unchecked="Off" id="bot-auto-order_sl"></span>
                     </label>
                 </div>
             </div>
             <div id="bot-settings-content" class="m-0 p-0">
                 <div class="row my-1 pr-2">
                     <label for="bot-trendTypes">Khi có trend</label>
                     <select id="bot-trendTypes" class="custom-select bot-settings">
                         <option value="0" selected="">LONG hoặc SHORT</option>
                         <option value="1">chỉ LONG</option>
                         <option value="2">chỉ SHORT</option>
                     </select>
                 </div>
                 
                 <div>
                     với Số hợp đồng là
                 </div>
                 <div class="row my-1 pr-2">
                     <div class="col">
                         <select id="bot-volume" class="custom-select bot-settings">
                             <option value="0" selected="">Full Sức mua</option>
                             <option value="1">Số HĐ =</option>
                         </select>
                     </div>
                     <div class="col-4 m-0 p-0 pl-2">
                         <input type="number" class="form-control formatDouble bot-settings" id="bot-volume-value" step="1" min="1" value="" placeholder="Số HĐ">
                     </div>
                 </div>
             </div>
         </div>

         <div id="bot-signal" class="container m-0 p-2">
             <div class="row text-left border-bottom m-0 p-0">
                 <div class="col p-0">
                     <i class="fa fa-list"></i>
                     <b>Tín hiệu Bot</b>
                 </div>
                 <div class="col text-right">
                     <a href="javascript:void(0)" class="bot-signal-refresh" title="Click để tải lại">
                         <i class="fa fa-refresh"></i>
                     </a>
                 </div>
             </div>
             <div class="row container-fluid m-0 p-0">
                 <table id="bot-tbl-signals" class="table table-sm">
                     <thead>
                         <tr>
                             <th class="text-left">Ngày</th>
                             <th class="text-left">Thời gian</th>
                             <th class="text-center">Tín hiệu</th>
                             <th class="text-right">Giá</th>
                         </tr>
                     </thead>
                     <tbody>
                     </tbody>
                 </table>
             </div>
         </div>
     </div>
    </div>`

const add_logs = (text) => {
    var now = new Date()
    text = now.toLocaleTimeString('en-GB') + ": " + text
    const bot_logs = $("#bot-logs");
    !bot_logs.text() ? bot_logs.text(text) : bot_logs.text(bot_logs.text() + '\n' + text);
}

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

const getBotSignal = () => {
    $.ajax({
        url: api_signal,
        success: (data) => {
            const tbody = $("#bot-tbl-signals tbody")
            if (data.length > 0) {
                data.map((sig) => {
                    var dateTime = sig.dateTime.split(' ')
                    var date = dateTime[0]
                    var time = dateTime[1]
                    var signal = sig.signal;
                    var price = sig.price;

                    var template = `<tr>
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

const logout = () => {
    const refresh_token = getCookie("auth_refresh_token");
    const json = JSON.stringify({ refresh_token })
    $.ajax({
        url: api_auth + "/logout",
        method: "POST",
        data: json,
    }).done(() => {
        setCookie("auth_token", "", -1)
        setCookie("auth_refresh_token", "", -1)
        add_logs("Đã đăng xuất, trang sẽ được tải lại")
        window.location.reload();
    }).fail((_, error) => {
        error === 'timeout'
            ? add_logs("Mạng yếu, vui lòng thử lại.")
            : add_logs(error)
    })
}

const refreshToken = () => {
    var refresh_token = getCookie("auth_refresh_token");
    const json = JSON.stringify({ refresh_token })

    $.ajax({
        url: api_auth + "/refresh-token",
        method: "POST",
        data: json
    }).done((data) => {
        if (data.access_token && data.refresh_token) {
            setCookie("auth_token", data.access_token, 5);
            updateCookieValue("auth_refresh_token", data.access_token);
        }
    }).fail((_, error) => {
        error === 'timeout'
            ? add_logs("Mạng yếu, vui lòng thử lại.")
            : add_logs(error)
    })
}

$(document).ready(() => {
    $(".app").eq(0).append(scripts)
})

$(window).on('load', () => {
    $.ajaxSetup({
        contentType: 'application/json',
        timeout: 10000
    });

    const isDemo = window.location.href.includes("smarteasy.vps.com.vn")

    isDemo ? $(".btn.btn-block.btn-default.active.btn-cancel-all").addClass("text-white btn-warning")
        : $("#button_cancel_all_order_normal").addClass("text-white bg-warning")
        
    const web = $("div#orderPS.tab-pane.active")
    const root = $(packageHtml)
    web.append(root)
    root.append(loginFormHtml)

    function loggingAndBot(name = '') {
        const extContent = $("#ext-content")
        extContent.children().replaceWith(loggingHtml)

        const ulPanel = $("#ulPanel")
        ulPanel.addClass("flex-nowrap")
        const liPanel = `<li class="nav-item text-center">
                        <a class="nav-link tab-copytrade" data-toggle="tab" href="#tab-ext" role="tab" aria-controls="tab-copytrade" aria-selected="false">
                                AUTO BOT
                        </a>
                    </li>`
        ulPanel.append(liPanel)

        $("#ngiaIndex").after(tabExtContent)

        add_logs("Khởi động hệ thống")
        add_logs("Hệ thống sẳn sàng")

        name && add_logs("Xin chào: " + name)

        getBotSignal()
        $(".bot-signal-refresh").click(function () {
            $("#bot-tbl-signals tbody").empty()
            getBotSignal()
        })

        $(".bot-history-clear").on("click", function () {
            $("#bot-logs").text('')
        })
        
        const botVolume = $("#bot-volume")
        const botVolumeValue = $("#bot-volume-value")
        const botAutoOrder = $("#bot-auto-order")
        const sucMua = $("#sucmua-int")
        var sohodong = $("#sohopdong")

        var botSettings = {
            enable: false,
            trendType: "0",
            volume: {
                type: "0",
                value: 0
            }
        }
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

        botVolume.on("change", function () {
            if ($(this).val() === "0") {
                botVolumeValue.val(parseInt(sucMua.text()))
                if (botAutoOrder.is(":checked")) {
                    sohodong.val(botVolumeValue.val())
                }
            }
        })

        botVolumeValue.on("input", function () {
            let value = $(this).val()
            var max = parseInt($(this).attr('max'))
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

        setTimeout(() => {
            const observer = new MutationObserver(function (mutationsList) {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'characterData' || mutation.type === 'childList') {
                        var newValue = parseInt(sucMua.text()) //mutation.target.textContent

                        botVolumeValue.attr("max", newValue)
                        if (newValue < botVolumeValue.val()) {
                            botVolumeValue.val(newValue)
                        }
                        else if (newValue > botVolumeValue.val() && botVolume.val() === "0") {
                            botVolumeValue.val(newValue)
                        }

                        const vithe = $("#status-danhmuc-content").children().eq(0).children().eq(1).text()
                        if (vithe === "-" && botAutoOrder.is(":checked") && botVolume.val() === "0") {
                            sohodong.val(botVolumeValue.val())
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
            observer.observe(document.getElementById("sucmua-int"), { characterData: true, childList: true, subtree: true });
        }, 500)
        
        const stopOrder = (tinhieu, stopOrderValue) => {
            if (!$("div.mySlides").eq(0).hasClass("hidden")) {
                $(".list-group-item.list-group-item-accent-warning.ck-ps").eq(0).children().eq(1).click()
            }
            setTimeout(() => {
                if (!$("#use_stopOrder").is(":checked")) {
                    $("#use_stopOrder").next().click()
                }

                tinhieu === "LONG" ? $("#selStopOrderType").val("SOL") : $("#selStopOrderType").val("SOU")
                $("#soIndex").val(stopOrderValue)
            }, 200)
        }

        const stopOrder_PRO = (tinhieu, stopOrderValue) => {
            $("#select_condition_order_wrapper").click()
            setTimeout(() => {
                $("#select_order_type").children().eq(1).click()

                tinhieu === "LONG" ? $("#right_selStopOrderType").val("SOL") : $("#right_selStopOrderType").val("SOU")
                $("#right_stopOrderIndex").val(stopOrderValue)
            }, 200)
        }

        const convertFloat = (value) => parseFloat(value.split(':').pop().trim())
        const convertFloatToFixed = (value, fix = 1) => parseFloat(parseFloat(value.split(':').pop().trim()).toFixed(fix));

        const divideNumberBy2FloorToArray = (value) => {
            var a = Math.floor(parseInt(value) / 2)
            var b = value - a
            return [a, b]
        }
        const divideNumberBy2CeilToArray = (value) => {
            var a = Math.ceil(parseInt(value) / 2)
            var b = value - a
            return [a, b]
        }
        
        const chuyenLenhThuong_PRO = (timer = 0) => {
            timer
                ? setTimeout(() => $("#select_normal_order").click(), timer)
                : $("#select_normal_order").click()
        }

        const chuyenLenhThuong = (timer = 0) => {
            if (timer) {
                setTimeout(() => {
                    if ($("#use_stopOrder").is(":checked")) {
                        $("#use_stopOrder").next().click()
                    }
                    if ($("#use_sltp").is(":checked")) {
                        $("#use_sltp").next().click()
                    }
                }, timer)
            }
            else {
                if ($("#use_stopOrder").is(":checked")) {
                    $("#use_stopOrder").next().click()
                }
                if ($("#use_sltp").is(":checked")) {
                    $("#use_sltp").next().click()
                }
            }
        }

        //1100ms
        const runBotNormal = (tinhieu, giadat, hopdong) => {
            $("#right_price").val(giadat)
            $("#sohopdong").val(hopdong)

            var timer = 100
            if (isDemo) {
                chuyenLenhThuong()

                tinhieu === "SHORT"
                    ? setTimeout(() => $(".btn-update").eq(0).click(), timer)
                    : setTimeout(() => $(".btn-update").eq(1).click(), timer)

                timer += 400
                setTimeout(() => $("#acceptCreateOrder").click(), timer)
                //setTimeout(() => $("#close_modal").click(), timer)

                timer += 100
                chuyenLenhThuong(timer)
            }
            else {
                chuyenLenhThuong_PRO()

                tinhieu === "SHORT"
                    ? setTimeout(() => $("#btn_short").click(), timer)
                    : setTimeout(() => $("#btn_long").click(), timer)

                timer += 400
                setTimeout(() => $("#acceptCreateOrderNew").click(), timer)
                //setTimeout(() => $("#close_modal").click(), timer)

                timer += 100
                chuyenLenhThuong_PRO(timer)
            }
            add_logs(`Đã đặt lệnh ${tinhieu} giá ${giadat} với ${hopdong} hợp đồng`)
        }
        
        //1200mss
        const runBotStopOrder = (tinhieu, giadat, hopdong, stopOrderValue) => {
            $("#right_price").val(giadat)
            $("#sohopdong").val(hopdong)

            var timer = 0
            if (isDemo) {
                stopOrder(tinhieu, stopOrderValue)

                timer += 300
                tinhieu === "SHORT"
                    ? setTimeout(() => $(".btn-update").eq(0).click(), timer)
                    : setTimeout(() => $(".btn-update").eq(1).click(), timer)

                timer += 400
                setTimeout(() => $("#acceptCreateOrder").click(), timer)
                //setTimeout(() => $("#close_modal").click(), timer)
            }
            else {
                stopOrder_PRO(tinhieu, stopOrderValue)

                timer += 300
                tinhieu === "SHORT"
                    ? setTimeout(() => $("#btn_short").click(), timer)
                    : setTimeout(() => $("#btn_long").click(), timer)

                timer += 400
                setTimeout(() => $("#acceptCreateOrderNew").click(), timer)
                //setTimeout(() => $("#close_modal").click(), timer)
            }
            add_logs(`Đã đặt lệnh ${tinhieu} Stop Order: ${stopOrderValue}, giá đặt ${giadat} với ${hopdong} hợp đồng`)
        }

        const cancelAllOrder = (timer) => {
            if (isDemo) {
                setTimeout(() => $(".btn-cancel-all").eq(0).click(), timer)
                setTimeout(() => $("#acceptCreateOrder").click(), timer + 200)
                //setTimeout(() => $("#close_modal").click(), 1400)
            }
            else {
                setTimeout(() => $("#button_cancel_all_order_normal").click(), timer)
                setTimeout(() => $("#acceptCreateOrderNew").click(), timer + 200)
            }
        }

        const getPreviousSignal = () => sessionStorage.getItem("previousSignal") ?? ""
        const setPreviousSignal = (signal) => sessionStorage.setItem("previousSignal", signal)

        const botAutoClick = (arr) => {
            let tinhieu
            var dadatTp1 = false
            var dadatTp2 = false

            if (arr[1] == "Tin hieu long: Manh") {
                tinhieu = "LONG"
            }
            else if (arr[1] == "Tin hieu short: Manh") {
                tinhieu = "SHORT"
            }

            let timer = 0
            if (getPreviousSignal() !== "" && getPreviousSignal() !== tinhieu) {
                const vithe = $("#status-danhmuc-content").children().eq(0).children().eq(1).text()
                add_logs("Đảo chiều chốt hết lệnh!!!")

                runBotNormal(tinhieu, "MTL", Math.abs(parseInt(vithe)))
                timer += 1200
                cancelAllOrder(timer)

                setPreviousSignal("")
            }

            setPreviousSignal(tinhieu)

            const giamua = convertFloatToFixed(arr[2])

            let fullHopdong = botVolumeValue.val()
            const vithe = $("#status-danhmuc-content").children().eq(0).children().eq(1).text()

            if (vithe != "-") {
                fullHopdong += Math.abs(parseInt(vithe))
            }

            let catLo = convertFloatToFixed(arr[7])

            tinhieu === "LONG"
                ? catLo -= 0.3
                : catLo += 0.3
            catLo = catLo.toFixed(1)

            const trendType = $("#bot-trendTypes").val()
            if (((trendType == "1" && tinhieu == "LONG") || (trendType == "2" && tinhieu == "SHORT") || trendType == "0")
                && botVolumeValue.val() > 0) {
                const tp1 = convertFloatToFixed(arr[3])
                const tp2 = convertFloatToFixed(arr[4])

                const order50 = divideNumberBy2CeilToArray(fullHopdong)
                const order25 = divideNumberBy2CeilToArray(order50[1])

                //50%
                timer += 1200
                runBotNormal(tinhieu, giamua, fullHopdong)

                tinhieu = tinhieu === "LONG" ? "SHORT" : "LONG"

                timer += 1200
                setTimeout(() => runBotStopOrder(tinhieu, "MTL", fullHopdong, catLo), timer)

                //25%
                if (order50[0] > 0) {
                    timer += 1400
                    setTimeout(() => runBotNormal(tinhieu, tp1, order50[0]), timer)
                }

                if (order25[0] > 0) {
                    timer += 1200
                    setTimeout(() => runBotNormal(tinhieu, tp2, order25[0]), timer)
                }

                timer += 1200
                setTimeout(() => {
                    const ob = new MutationObserver(function (mutationsList) {
                        for (let mutation of mutationsList) {
                            if (mutation.type === 'characterData' || mutation.type === 'childList') {
                                const giaKhopLenh = parseFloat(mutation.target.textContent)
                                if (giaKhopLenh >= tp1 && giaKhopLenh < tp2 && !dadatTp1 && order25[0] > 0) {
                                    runBotStopOrder(tinhieu, "MTL", order25[0], giamua)
                                    dadatTp1 = true
                                }
                                if (giaKhopLenh >= tp2 && !dadatTp2 && order25[0] > 0) {
                                    runBotStopOrder(tinhieu, "MTL", order25[0], tp1)
                                    dadatTp1 = true
                                    dadatTp2 = true
                                }
                            }
                        }
                    });
                    ob.observe(document.getElementById("tbodyPhaisinhContent").childNodes[0].childNodes[10], { characterData: true, childList: true, subtree: true })
                }, timer)
            }
        }

        //const test = `#VN30F1M Ngay 30/05/2024 2:13:48 CH bot web\nTin hieu long: Manh\nGia mua: 1311.4\nTarget 1: 1314.1\nTarget 2: 1317.0\nTarget 3: 1320.4\nTarget 4: 1323.1\nCat lo : 1308.3`.split("\n").map(line => line.trim())
        //showTinHieu(test)
        //botVolumeValue.attr("max", 30)
        //botVolumeValue.val(6)
        //setTimeout(() => botAutoClick(test), 3000)

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

        $(".satbot-logout").click(() => {
            if (confirm("Nhấn Ok để xác nhận Hủy liên kết, No để trở lại")) {
                logout()
            }
        })

        var connection = new signalR.HubConnectionBuilder()
            .withUrl(`${baseURL}/signal`)
            .withAutomaticReconnect()
            .build();

        connection.on("Signal", function (message) {
            const tinhieu = message.split("\n").map(line => line.trim())
            showTinHieu(tinhieu)
            if (botAutoOrder.is(":checked")) {
                botAutoClick(tinhieu)
            }
        });
        connection.on("AdminSignal", function (message) {
            if (message != "CANEL_ALL") {

            }
            add_logs(message)
            const tinhieu = message.split("\n").map(line => line.trim())
            //showTinHieu(tinhieu)
            //if (botAutoOrder.is(":checked")) {
            //    botAutoClick(tinhieu)
            //}
        });

        connection.start().catch((err) => console.error(err.toString()))
    }

    const loggedIn = getCookie("auth_refresh_token");
    if (loggedIn) {
        loggingAndBot()
    }
    else {
        $('#cb_showPassword').on('change', function () {
            const showPassword = $(this).is(':checked');
            $('#cb_password').attr('type', showPassword ? 'text' : 'password');
        });
        $('#cb_login').on('click', function () {
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
                const json = JSON.stringify({ username, password });
                $statusElement.removeClass('alert-danger').addClass('alert-info').text('Đang đăng nhập...');

                $.ajax({
                    url: api_auth + "/login",
                    method: "POST",
                    data: json
                }).done((data) => {
                    if (data.access_token) {
                        setCookie("auth_token", data.access_token, 5);
                        setCookie("auth_refresh_token", data.refresh_token, 30 * 24 * 60);
                        loggingAndBot(data.name);
                    } else $statusElement.text(data.error).removeClass('alert-info').addClass('alert-danger')
                }).fail((e, error) => {
                    error === 'timeout'
                        ? $statusElement.text("Mạng yếu, vui lòng thử lại.").removeClass('alert-info').addClass('alert-danger')
                        : $statusElement.text(e.responseText ?? "Có lỗi xảy ra").removeClass('alert-info').addClass('alert-danger')
                })
            } catch (error) {
                $statusElement.text(error.message ?? "Có lỗi xảy ra").removeClass('alert-info').addClass('alert-danger');
            }
        });
    }
})

//    "#VN30F1M Ngay 30/05/2024 2:13:48 CH bot web",
//    "Tin hieu short: Manh",
//    "Gia mua: 1277.5",
//    "Target 1: 1273.7",
//    "Target 2: 1269.8",
//    "Target 3: 1263.4",
//    "Target 4: 1257.1",
//    "Cat lo : 1273.667"

//ssh -R 80:localhost:5131 localhost.run