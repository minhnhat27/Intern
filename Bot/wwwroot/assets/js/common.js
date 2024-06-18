function setCookie(cname, cvalue, exMinutes) {
    const d = new Date();
    d.setTime(d.getTime() + (exMinutes * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return null;
}
function updateCookieValue(cname, newValue) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.startsWith(cname + "=")) {
            let updatedCookie = cname + "=" + newValue + ";";
            let cookieParts = cookie.split(';');
            for (let j = 1; j < cookieParts.length; j++) {
                if (!cookieParts[j].trim().startsWith("expires=")) {
                    updatedCookie += cookieParts[j] + ";";
                }
            }
            document.cookie = updatedCookie;
            break;
        }
    }
}

function debounce(func, delay) {
    let timeout;

    return function executedFunc(...args) {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(() => {
            func(...args);
            timeout = null;
        }, delay);
    };
}

var aBeep = new Audio("http://localhost:5131/assets/sound/beep.wav");
var aTick = new Audio("http://localhost:5131/assets/sound/tick.wav");

var UTC_OFFSET = 25200;

function redirect(url) {
    window.location.href = url;
}

function beep() {
    try {
        aBeep.muted = false;
        aBeep.play();
    } catch (e) {
        console.log(e);
    }
}

function tick() {
    try {
        aTick.muted = false;
        aTick.play();
    } catch (e) {
        console.log(e);
    }
}

String.prototype.encodeHtml = function () {
    var str = this;
    var buf = [];

    for (var i = str.length - 1; i >= 0; i--) {
        buf.unshift(["&#", str[i].charCodeAt(), ";"].join(""));
    }

    return buf.join("");
};

String.prototype.decodeHtml = function () {
    var str = this;
    return str.replace(/&#(\d+);/g, function (match, dec) {
        return String.fromCharCode(dec);
    });
};

String.repeat = function (chr, count) {
    var str = "";
    for (var x = 0; x < count; x++) {
        str += chr;
    }
    return str;
};

String.prototype.padL = function (width, pad) {
    if (!width || width < 1) return this;

    if (!pad) pad = " ";
    var length = width - this.length;
    if (length < 1) return this.substr(0, width);

    return (String.repeat(pad, length) + this).substr(0, width);
};

String.prototype.padR = function (width, pad) {
    if (!width || width < 1) return this;

    if (!pad) pad = " ";
    var length = width - this.length;
    if (length < 1) this.substr(0, width);

    return (this + String.repeat(pad, length)).substr(0, width);
};

function formatNumber(val) {
    if (val == undefined || isNaN(val)) return "";
    return val.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

function formatDecimal(val, dec = 1) {
    if (val == undefined || isNaN(val)) return "";
    val = parseFloat(val);
    return val.toFixed(dec);
}

function parseNumber(str) {
    str = str.split(",").join("");
    return parseInt(str);
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

Date.prototype.format = function (format = "yyyy-MM-dd") {
    var date = this;
    if (!format) format = "MM/dd/yyyy";

    var month = date.getMonth() + 1;
    var year = date.getFullYear();

    format = format.replace("MM", month.toString().padL(2, "0"));

    if (format.indexOf("yyyy") > -1) format = format.replace("yyyy", year.toString());
    else if (format.indexOf("yy") > -1) format = format.replace("yy", year.toString().substr(2, 2));

    format = format.replace("dd", date.getDate().toString().padL(2, "0"));

    var hours = date.getHours();
    if (format.indexOf("t") > -1) {
        if (hours > 11) format = format.replace("t", "pm");
        else format = format.replace("t", "am");
    }
    if (format.indexOf("HH") > -1) format = format.replace("HH", hours.toString().padL(2, "0"));
    if (format.indexOf("hh") > -1) {
        if (hours > 12) hours - 12;
        if (hours == 0) hours = 12;
        format = format.replace("hh", hours.toString().padL(2, "0"));
    }
    if (format.indexOf("mm") > -1) format = format.replace("mm", date.getMinutes().toString().padL(2, "0"));
    if (format.indexOf("ss") > -1) format = format.replace("ss", date.getSeconds().toString().padL(2, "0"));
    return format;
};

Date.prototype.getUTCTime = function () {
    var time = this.getTime() / 1000;
    return time + UTC_OFFSET;
};

function ts2utc(timestamp) {
    return timestamp + UTC_OFFSET;
}

function date_today() {
    var dt = new Date();
    dt.setHours(0, 0, 0, 0);
    return dt;
}

function date_yesterday() {
    return new Date().addDays(-1);
}

function week_start_date(dt) {
    var first = dt.getDate() - dt.getDay(); // First day is the day of the month - the day of the week

    return new Date(dt.setDate(first));
}

function week_end_date(dt) {
    var first = dt.getDate() - dt.getDay(); // First day is the day of the month - the day of the week
    var last = first + 6; // last day is the first day + 6

    return new Date(dt.setDate(last));
}

function month_get_first(d) {
    var year = d.getFullYear();
    var month = d.getMonth();
    var dt = new Date();
    dt.setYear(year);
    dt.setMonth(month);
    dt.setDate(1);
    return dt;
}

function month_get_last(d) {
    var nextMonth = d.getMonth() + 1;
    var dt = month_get_first(d);
    dt.setMonth(nextMonth);
    dt.setDate(dt.getDate() - 1);
    return dt;
}

function parseDate(text) {
    var dt = Date.parse(text);
    if (dt) dt = new Date(dt);
    return dt;
}

if ("undefined" == typeof formatDate) {
    function formatDate(d) {
        var month = "" + (d.getMonth() + 1);
        var day = "" + d.getDate();
        var year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }
}

function img_load_default(sender) {
    sender.onerror = null;
    sender.src = "/image/no-image.png";
}

function args_get(args, key, def = false) {
    if (typeof args[key] != "undefined") return args[key];
    return def;
}

function queryString(name, def = "") {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? def : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function isIterable(obj) {
    return (object) => object != null && typeof object[Symbol.iterator] === "function";
}

const runBot = (tinhieu, giadat, hopdong, stopOrderValue = 0) => {
    $("#right_price").val(giadat)
    $("#sohopdong").val(hopdong)

    var timer = 50
    if (isDemo) {
        if (stopOrderValue > 0) {
            timer += 400
            stopOrder(tinhieu, stopOrderValue)
        }
        else chuyenLenhThuong(timer)

        if (stopOrderValue > 0) {
            tinhieu === "LONG"
                ? tinhieu = "SHORT"
                : tinhieu = "LONG"
        }
        tinhieu === "SHORT"
            ? setTimeout(() => $(".btn-update").eq(0).click(), timer)
            : setTimeout(() => $(".btn-update").eq(1).click(), timer)

        timer += 400
        //setTimeout(() => $("#acceptCreateOrder").click(), timer)
        setTimeout(() => $("#close_modal").click(), timer)

        timer += 200
        chuyenLenhThuong(timer)
    }
    else {
        if (stopOrderValue > 0) {
            timer += 400
            stopOrder_PRO(tinhieu, stopOrderValue)
        }
        else chuyenLenhThuong_PRO(timer)

        if (stopOrderValue > 0) {
            tinhieu === "LONG"
                ? tinhieu = "SHORT"
                : tinhieu = "LONG"
        }
        tinhieu === "SHORT"
            ? setTimeout(() => $("#btn_short").click(), timer)
            : setTimeout(() => $("#btn_long").click(), timer)

        timer += 400
        //setTimeout(() => $("#acceptCreateOrderNew").click(), timer)
        setTimeout(() => $("#close_modal").click(), timer)

        timer += 100
        chuyenLenhThuong_PRO(timer)
    }
}

const sLTP = (stopLost, takeProfit) => {
    if (!$("div.mySlides").eq(1).hasClass("hidden")) {
        $(".list-group-item.list-group-item-accent-warning.ck-ps").eq(0).children().eq(0).click()
    }
    setTimeout(() => {
        if (!$("#use_sltp").is(":checked")) {
            $("#use_sltp").next().click()
            $("#use_sltp").attr("checked", true)
        }
        $("#stopLost").val(stopLost)
        $("#textProfit").val(takeProfit)
    }, 200)
}

const sLTP_PRO = (stopLoss, takeProfit) => {
    $("#select_condition_order_wrapper").click()
    setTimeout(() => $("#select_order_type").children().eq(0).click(), 200)

    setTimeout(() => $("#custom_select_sltp_type_price").click(), 300)
    setTimeout(() => {
        $("#textProfitTrailing").val(takeProfit)
        $("#stopLostTrailing").val(stopLoss)
    }, 400)
}


