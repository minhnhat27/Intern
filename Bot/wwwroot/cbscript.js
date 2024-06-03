﻿function setCookie(cname, cvalue, exMinutes) {
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

const scripts = `<script src="https://cdn.jsdelivr.net/npm/bootstrap-table@1.21.4/dist/bootstrap-table.min.js"></script>`

const packageHtml = `
    <div id='sat-content'>
        <link rel="stylesheet" href="https://unpkg.com/bootstrap-table@1.21.4/dist/bootstrap-table.min.css">
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
     <div id="system-error" class="d-none list-group-item px-1">
         <div class="alert alert-danger">
             <span class="system-error-text"></span>
             <br>
             Liên hệ
             <a href="https://zalo.me/g/mgrsyj088" target="_blank">
                 0786.441.433             </a> để được hỗ trợ
         </div>
     </div>
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
                <a href="http://192.168.1.67:3000/register" target="_blank" title="Đăng ký tài khoản mới">
                    Chưa có tài khoản? Đăng ký tại đây
                </a>
            </div>
            <div class="form-group mb-1">
                <a href="http://192.168.1.67:3000/forget-password" target="_blank" title="Quên mật khẩu? Click vào đây">
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
                     <a href="https://chobot.vn" target="_blank" title="Bot phân tán thực hiện bởi chobot.vn">Chobot.vn</a> <small>231113</small>
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

         <div class="d-none d-block bot-none alert alert-danger text-center">
             TK chưa thiết lập bot mặc định
             <br>
             <button type="button" class="btn btn-primary btn-select-bot">Chọn bot</button>
         </div>
         <div class="d-none d-block bot-expired alert alert-danger text-center">
             Bot đã hết hạn sử dụng <br> Vui lòng chọn và kích hoạt lại.
             <br>
             <button type="button" class="btn btn-primary btn-select-bot">Chọn bot</button>
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
         <div id="bot-test" class="d-none container-fluid m-0 p-2 bot-section">
             <div class="row">
                 <div class="col text-center">
                     <button type="button" class="btn btn-success test-trigger-long">
                         Trigger LONG
                     </button>
                 </div>
                 <div class="col text-center">
                     <button type="button" class="btn btn-danger test-trigger-short">
                         Trigger SHORT
                     </button>
                 </div>
                 <div class="col text-center">
                     <button type="button" class="btn btn-warning test-cancel-all">
                         Hủy tất cả
                     </button>
                 </div>
             </div>
         </div>
         <div id="bot-settings" class="container-fluid m-0 p-2 bot-section">
             <div class="row border-bottom ">
                 <div class="col d-flex align-items-center">
                     <i class="fa fa-list mr-1"></i>
                     <b>Bot giao dịch</b>
                 </div>
             </div>
             <div class="row my-2">
                 <div class="col">
                     <input id="bot-name" type="text" class="form-control w-100" value="" placeholder="Chọn bot để giao dịch" readonly="">
                 </div>
                 <div class="col-auto">
                     <button type="button" data-toggle="modal" class="btn btn-primary btn-select-bot">Chọn bot</button>
                 </div>
             </div>
             <div class="row border-bottom ">
                 <div class="col d-flex align-items-center">
                     <i class="fa fa-list mr-1"></i>
                     <b>Hỗ trợ Đặt lệnh</b>
                 </div>
                 <div class="col text-right">
                     <label class="switch switch-label switch-label-panel switch-pill switch-success switch-sm float-right">
                         <input class="switch-input st-bot-config bot-settings" name="bot-auto-order" id="bot-auto-order" type="checkbox" checked="checked">
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
                     Bot đóng vị thế
                 </div>
                 <div class="row my-1 pr-2">
                     <div class="col">
                         <select id="bot-close" class="custom-select bot-settings">
                             <option value="0"> Không làm gì </option>
                             <option value="1" selected=""> Đóng vị thế ngược chiều </option>
                         </select>
                     </div>
                     <div class="col-4 m-0 p-0 pl-2">
                         <select id="bot-close-price" class="custom-select bot-settings">
                             <option value="0" selected=""> MTL </option>
                             <option value="1"> Trần/Sàn </option>
                         </select>
                     </div>
                 </div>
                 <div>
                     Bot mở vị thế mới
                 </div>
                 <div class="row my-1 pr-2">
                     <div class="col">
                         <select id="bot-open" class="custom-select bot-settings">
                             <option value="0"> Không mở vị thế </option>
                             <option value="1" selected=""> Mở vị thế mới</option>
                         </select>
                     </div>
                     <div class="col-4 m-0 p-0 pl-2">
                         <select id="bot-open-price" class="custom-select bot-settings">
                             <option value="0" selected=""> MTL </option>
                             <option value="1"> Trần/Sàn </option>
                             <option value="2"> Tín hiệu </option>
                         </select>
                     </div>
                 </div>
                 <div>
                     với Số hợp đồng là
                 </div>
                 <div class="row my-1 pr-2">
                     <div class="col">
                         <select id="bot-volume" class="custom-select bot-settings">
                             <option value="0" selected=""> Full Sức mua</option>
                             <option value="1"> Số HĐ =</option>
                         </select>
                     </div>
                     <div class="col-4 m-0 p-0 pl-2">
                         <input type="text" class="form-control formatDouble bot-settings" id="bot-volume-value" step="1" min="1" value="1" placeholder="Số HĐ">
                     </div>
                 </div>
                 <div class="row my-1 mt-2">
                     <div class="col">
                         <div class="custom-control custom-checkbox mx-2">
                             <input id="bot-atoc-order" type="checkbox" class="custom-control-input bot-settings">
                             <label for="bot-atoc-order" class="custom-control-label" title="Cho phép bot đặt lệnh tự động trong phiên ATO/ATC">Đặt lệnh ATO/ATC
                                 <i class="fa fa-info-circle text-info" aria-hidden="true" title="Cho phép bot đặt lệnh tự động trong phiên ATO/ATC"></i>
                         </label></div>
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
                         <tr class="d-none template">
                             <td class="text-left">
                                 <em><span class="date"></span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time"></span></b>
                             </td>
                             <td class="signal text-center">
                                 <span class="signal"></span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center=""></span>
                             </td>
                         </tr>
                     <tr class="">
                             <td class="text-left">
                                 <em><span class="date">2024-05-17</span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time">10:40:00</span></b>
                             </td>
                             <td class="signal text-center cover">
                                 <span class="signal">COVER</span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center="">1303.9</span>
                             </td>
                         </tr><tr class="">
                             <td class="text-left">
                                 <em><span class="date">2024-05-17</span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time">10:30:00</span></b>
                             </td>
                             <td class="signal text-center short">
                                 <span class="signal">SHORT</span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center="">1302.5</span>
                             </td>
                         </tr><tr class="">
                             <td class="text-left">
                                 <em><span class="date">2024-05-16</span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time">13:05:00</span></b>
                             </td>
                             <td class="signal text-center sell">
                                 <span class="signal">SELL</span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center="">1307.2</span>
                             </td>
                         </tr><tr class="">
                             <td class="text-left">
                                 <em><span class="date">2024-05-16</span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time">09:40:00</span></b>
                             </td>
                             <td class="signal text-center buy">
                                 <span class="signal">BUY</span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center="">1295.8</span>
                             </td>
                         </tr><tr class="">
                             <td class="text-left">
                                 <em><span class="date">2024-05-15</span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time">14:10:00</span></b>
                             </td>
                             <td class="signal text-center sell">
                                 <span class="signal">SELL</span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center="">1287.5</span>
                             </td>
                         </tr><tr class="">
                             <td class="text-left">
                                 <em><span class="date">2024-05-14</span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time">14:25:00</span></b>
                             </td>
                             <td class="signal text-center buy">
                                 <span class="signal">BUY</span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center="">1276.3</span>
                             </td>
                         </tr><tr class="">
                             <td class="text-left">
                                 <em><span class="date">2024-05-14</span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time">10:45:00</span></b>
                             </td>
                             <td class="signal text-center sell">
                                 <span class="signal">SELL</span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center="">1273</span>
                             </td>
                         </tr><tr class="">
                             <td class="text-left">
                                 <em><span class="date">2024-05-14</span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time">09:45:00</span></b>
                             </td>
                             <td class="signal text-center buy">
                                 <span class="signal">BUY</span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center="">1275.7</span>
                             </td>
                         </tr><tr class="">
                             <td class="text-left">
                                 <em><span class="date">2024-05-13</span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time">14:15:00</span></b>
                             </td>
                             <td class="signal text-center sell">
                                 <span class="signal">SELL</span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center="">1265.4</span>
                             </td>
                         </tr><tr class="">
                             <td class="text-left">
                                 <em><span class="date">2024-05-13</span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time">13:35:00</span></b>
                             </td>
                             <td class="signal text-center buy">
                                 <span class="signal">BUY</span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center="">1272.5</span>
                             </td>
                         </tr><tr class="">
                             <td class="text-left">
                                 <em><span class="date">2024-05-13</span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time">13:15:00</span></b>
                             </td>
                             <td class="signal text-center cover">
                                 <span class="signal">COVER</span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center="">1269.6</span>
                             </td>
                         </tr><tr class="">
                             <td class="text-left">
                                 <em><span class="date">2024-05-13</span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time">10:40:00</span></b>
                             </td>
                             <td class="signal text-center short">
                                 <span class="signal">SHORT</span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center="">1267.9</span>
                             </td>
                         </tr><tr class="">
                             <td class="text-left">
                                 <em><span class="date">2024-05-10</span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time">14:10:00</span></b>
                             </td>
                             <td class="signal text-center cover">
                                 <span class="signal">COVER</span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center="">1266.7</span>
                             </td>
                         </tr><tr class="">
                             <td class="text-left">
                                 <em><span class="date">2024-05-10</span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time">10:55:00</span></b>
                             </td>
                             <td class="signal text-center short">
                                 <span class="signal">SHORT</span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center="">1273.5</span>
                             </td>
                         </tr><tr class="">
                             <td class="text-left">
                                 <em><span class="date">2024-05-10</span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time">10:30:00</span></b>
                             </td>
                             <td class="signal text-center sell">
                                 <span class="signal">SELL</span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center="">1276.4</span>
                             </td>
                         </tr><tr class="">
                             <td class="text-left">
                                 <em><span class="date">2024-05-10</span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time">09:35:00</span></b>
                             </td>
                             <td class="signal text-center buy">
                                 <span class="signal">BUY</span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center="">1278.4</span>
                             </td>
                         </tr><tr class="">
                             <td class="text-left">
                                 <em><span class="date">2024-05-09</span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time">14:15:00</span></b>
                             </td>
                             <td class="signal text-center sell">
                                 <span class="signal">SELL</span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center="">1271.2</span>
                             </td>
                         </tr><tr class="">
                             <td class="text-left">
                                 <em><span class="date">2024-05-09</span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time">14:00:00</span></b>
                             </td>
                             <td class="signal text-center buy">
                                 <span class="signal">BUY</span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center="">1276.6</span>
                             </td>
                         </tr><tr class="">
                             <td class="text-left">
                                 <em><span class="date">2024-05-09</span></em>
                             </td>
                             <td class="text-left">
                                 <b><span class="time">10:25:00</span></b>
                             </td>
                             <td class="signal text-center sell">
                                 <span class="signal">SELL</span>
                             </td>
                             <td class="text-right">
                                 <span class="price" text-center="">1278.5</span>
                             </td>
                         </tr></tbody>
                 </table>
             </div>
         </div>
     </div>
    </div>`

const modelBot = `
<div id="global">
    <div class="modal fade" id="satbot-settings" tabindex="-1" role="dialog" data-backdrop="static" aria-hidden="true" data-backdrop="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Semi-AutoBot Cài đặt</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form class="container">
                        <div class="d-none row my-2 form-group w-100">
                            <label class="form-label" for="ext-chart">Biểu đồ Bot</label>
                            <select id="ext-chart" class="form-control">
                                <option value="0">Mặc định</option>
                                <!-- <option value="1" data-url="">SmartTrading</option> -->
                                <option value="3" data-url="">Fansi AutoBot 1M++</option>
                                <option value="2">Link chỉ định</option>
                            </select>
                        </div>
                        <div class="d-none row my-2 form-group w-100">
                            <input type="text" class="form-control w-100" id="ext-chart-link"
                                placeholder="Nhập đường link đến biểu đồ">
                        </div>

                        <div class="row my-2 form-group w-100">
                            <div class="form-group">
                                <input type="checkbox" id="ext-json-debug" class="form-checkbox">
                                <label for="ext-json-debug">Log dữ liệu nâng cao</label>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="modal-footer d-flex flex-nowrap">
                    <button type="button" class="btn btn-dark btnCloseModal" data-dismiss="modal">Bỏ qua</button>
                    <button type="button" class="btn btn-success satbot-settings-save">Cập nhật</button>
                </div>
            </div>
        </div>
    </div>
    <!-- select bot version 3.0 -->
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

    <script src="//chobot.vn/assets/js/common.js"></script>

    <div class="modal fade" id="bot-select" tabindex="-1" role="dialog" data-backdrop="static" data-backdrop="false">
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style="min-width:600px;">
                <div class="bot-select modal-header p-2">
                    <h5 class="modal-title">Chọn bot...</h5>
                    <button type="button" class="btn" data-dismiss="modal" aria-label="Close">
                        X
                    </button>
                </div>
                <div class="modal-body">
                    <ul id="bot-select-tabs" class="nav nav-tabs row m-0 p-0">
                        <li id="nav-bot-list" class="nav-item col-4">
                            <a id="lnk-bots" class="nav-link active show" data-toggle="tab" href="#tabChobot" role="tab"
                                aria-controls="chobot" aria-selected="true">chobot.vn</a>
                        </li>
                        <li id="nav-rent-bot" class="nav-item col-4">
                            <a id="lnk-rentbots" class="nav-link" data-toggle="tab" href="#tabRentBots" role="tab"
                                aria-controls="rentBots" aria-selected="false">Đã kích hoạt</a>
                        </li>
                        <li id="nav-my-bot" class="nav-item col-4">
                            <a id="lnk-mybots" class="nav-link" data-toggle="tab" href="#tabMyBots" role="tab"
                                aria-controls="myBots" aria-selected="false">Bot của tôi</a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <div class="tab-pane active show" id="tabChobot" role="tabpanel" aria-labelledby="chobot-tab">
                            <div class="table-responsive">
                                <div class="bootstrap-table bootstrap4">
                                    <div class="fixed-table-toolbar">
                                        <div class="float-left search btn-group">
                                            <input class="form-control search-input" type="search" placeholder="Tìm kiếm" autocomplete="off">
                                        </div>
                                    </div>

                                    <div class="fixed-table-container fixed-height"
                                        style="height: 440px; padding-bottom: 0px;">
                                        <div class="fixed-table-header" style="display: none;">
                                            <table></table>
                                        </div>
                                        <div class="fixed-table-body">
                                            <div class="fixed-table-loading table table-hover" style="top: 0px;">
                                                <span class="loading-wrap">
                                                    <span class="loading-text" style="font-size: 12px;">Đang tải</span>
                                                    <span class="animation-wrap"><span
                                                            class="animation-dot"></span></span>
                                                </span>

                                            </div>
                                            <table id="table-bots" data-classes="table table-hover" data-toggle="table"
                                                data-locale="vi-VN" data-search="true" data-search-align="left"
                                                data-height="550" data-smartdisplay="true" data-pagination="true"
                                                data-page-size="4" data-side-pagination="server"
                                                data-show-header="false" data-filter-control="false"
                                                data-single-select="true" data-click-to-select="true"
                                                data-query-params="botListQueryParam"
                                                data-repsonse-handler="responseHandler"
                                                data-url="https://chobot.vn/satbot/3.0/common/bot"
                                                class="table table-hover">
                                                <thead style="display: none;">
                                                    <tr>
                                                        <th class="bs-checkbox " style="width: 36px; "
                                                            data-field="state">
                                                            <div class="th-inner "></div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                        <th class="bot-item" style="" data-field="id">
                                                            <div class="th-inner "></div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr data-index="0">
                                                        <td class="bs-checkbox " style="width: 36px; "><label>
                                                                <input data-index="0" name="btSelectItem"
                                                                    type="checkbox">
                                                                <span></span>
                                                            </label></td>
                                                        <td class="bot-item">
                                                            <div class="row m-0 p-0">
                                                                <div
                                                                    class="col-auto m-0 p-0 pr-1 d-flex align-items-center">
                                                                    <a class="link"
                                                                        href="https:///chobot.vn/bot/detail?guid=6fad660a-9ba7-4ca2-bbf5-931148003e48"
                                                                        target="_blank">
                                                                        <img src="https://www.shutterstock.com/image-illustration/shining-dove-rays-on-dark-600w-2169730247.jpg"
                                                                            alt="" class="thumb">
                                                                    </a>
                                                                </div>
                                                                <div class="col m-0 p-0 pl-1 mx-2">
                                                                    <div class="row">
                                                                        <div class="col title mt-2">
                                                                            <a class="title"
                                                                                href="https:///chobot.vn/bot/detail?guid=6fad660a-9ba7-4ca2-bbf5-931148003e48"
                                                                                target="_blank">
                                                                                <span class=""
                                                                                    style="line-height:1.5rem">Antam bot
                                                                                    3M V3.2</span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col subtitle">
                                                                            <div class="rate" title="Đánh giá 0/5"><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i>
                                                                            </div>
                                                                            <div class="owner small mx-1 ml-2">
                                                                                <span>Đỗ Quốc Toản</span>
                                                                            </div>
                                                                            <div class="interval small mx-1">
                                                                                <span>3 phút</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col">
                                                                    <div class="result">
                                                                        <div class="mx-1 text-center">
                                                                            Số lệnh:
                                                                            <span class="text-info">482</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tổng lãi/lỗ:
                                                                            <span class="text-success">1215.6</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tỷ lệ thắng:
                                                                            <span class="text-success">53.5%</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="my-2 description">

                                                            </div>
                                                            <div class="row m-0 p-0 py-1 pt-2">
                                                                <div
                                                                    class="col-6 m-0 p-0 text-left price text-truncate">
                                                                    Giá: <span class="text-danger font-weight-bold">Liên
                                                                        hệ</span>
                                                                </div>
                                                                <div class="col-6 m-0 p-0 text-right text-nowrap">
                                                                    <a href="https:///chobot.vn/bot/detail?guid=6fad660a-9ba7-4ca2-bbf5-931148003e48"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Chi tiết
                                                                    </a>
                                                                    <a href="https:///chobot.vn/bot/backtest?guid=6fad660a-9ba7-4ca2-bbf5-931148003e48"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Backtest
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr data-index="1">
                                                        <td class="bs-checkbox " style="width: 36px; "><label>
                                                                <input data-index="1" name="btSelectItem"
                                                                    type="checkbox">
                                                                <span></span>
                                                            </label></td>
                                                        <td class="bot-item">
                                                            <div class="row m-0 p-0">
                                                                <div
                                                                    class="col-auto m-0 p-0 pr-1 d-flex align-items-center">
                                                                    <a class="link"
                                                                        href="https:///chobot.vn/bot/detail?guid=442a0053-ace1-481f-846f-66d0cc7189c9"
                                                                        target="_blank">
                                                                        <img src="https://www.shutterstock.com/image-illustration/shining-dove-rays-on-dark-600w-2169730247.jpg"
                                                                            alt="" class="thumb">
                                                                    </a>
                                                                </div>
                                                                <div class="col m-0 p-0 pl-1 mx-2">
                                                                    <div class="row">
                                                                        <div class="col title mt-2">
                                                                            <a class="title"
                                                                                href="https:///chobot.vn/bot/detail?guid=442a0053-ace1-481f-846f-66d0cc7189c9"
                                                                                target="_blank">
                                                                                <span class=""
                                                                                    style="line-height:1.5rem">AnTam
                                                                                    Robot 3M V3.1</span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col subtitle">
                                                                            <div class="rate" title="Đánh giá 0/5"><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i>
                                                                            </div>
                                                                            <div class="owner small mx-1 ml-2">
                                                                                <span>Đỗ Quốc Toản</span>
                                                                            </div>
                                                                            <div class="interval small mx-1">
                                                                                <span>3 phút</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col">
                                                                    <div class="result">
                                                                        <div class="mx-1 text-center">
                                                                            Số lệnh:
                                                                            <span class="text-info">418</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tổng lãi/lỗ:
                                                                            <span class="text-success">1056.2</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tỷ lệ thắng:
                                                                            <span class="text-success">50.5%</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="my-2 description">

                                                            </div>
                                                            <div class="row m-0 p-0 py-1 pt-2">
                                                                <div
                                                                    class="col-6 m-0 p-0 text-left price text-truncate">
                                                                    Giá: <span class="text-danger font-weight-bold">Liên
                                                                        hệ</span>
                                                                </div>
                                                                <div class="col-6 m-0 p-0 text-right text-nowrap">
                                                                    <a href="https:///chobot.vn/bot/detail?guid=442a0053-ace1-481f-846f-66d0cc7189c9"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Chi tiết
                                                                    </a>
                                                                    <a href="https:///chobot.vn/bot/backtest?guid=442a0053-ace1-481f-846f-66d0cc7189c9"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Backtest
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr data-index="2">
                                                        <td class="bs-checkbox " style="width: 36px; "><label>
                                                                <input data-index="2" name="btSelectItem"
                                                                    type="checkbox">
                                                                <span></span>
                                                            </label></td>
                                                        <td class="bot-item">
                                                            <div class="row m-0 p-0">
                                                                <div
                                                                    class="col-auto m-0 p-0 pr-1 d-flex align-items-center">
                                                                    <a class="link"
                                                                        href="https:///chobot.vn/bot/detail?guid=55936971-2e70-43cd-9500-ed865f7efcf1"
                                                                        target="_blank">
                                                                        <img src="https://chobot.vn//storage/upload/avatars/1065.png"
                                                                            alt="" class="thumb">
                                                                    </a>
                                                                </div>
                                                                <div class="col m-0 p-0 pl-1 mx-2">
                                                                    <div class="row">
                                                                        <div class="col title mt-2">
                                                                            <a class="title"
                                                                                href="https:///chobot.vn/bot/detail?guid=55936971-2e70-43cd-9500-ed865f7efcf1"
                                                                                target="_blank">
                                                                                <span class=""
                                                                                    style="line-height:1.5rem">Chicken
                                                                                    Rock V3.3</span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col subtitle">
                                                                            <div class="rate" title="Đánh giá 0/5"><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i>
                                                                            </div>
                                                                            <div class="owner small mx-1 ml-2">
                                                                                <span>ai dinh</span>
                                                                            </div>
                                                                            <div class="interval small mx-1">
                                                                                <span>15 phút</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col">
                                                                    <div class="result">
                                                                        <div class="mx-1 text-center">
                                                                            Số lệnh:
                                                                            <span class="text-info">336</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tổng lãi/lỗ:
                                                                            <span class="text-success">927.3</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tỷ lệ thắng:
                                                                            <span class="text-success">50.3%</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="my-2 description">

                                                            </div>
                                                            <div class="row m-0 p-0 py-1 pt-2">
                                                                <div
                                                                    class="col-6 m-0 p-0 text-left price text-truncate">
                                                                    Giá: <span class="text-danger font-weight-bold">Liên
                                                                        hệ</span>
                                                                </div>
                                                                <div class="col-6 m-0 p-0 text-right text-nowrap">
                                                                    <a href="https:///chobot.vn/bot/detail?guid=55936971-2e70-43cd-9500-ed865f7efcf1"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Chi tiết
                                                                    </a>
                                                                    <a href="https:///chobot.vn/bot/backtest?guid=55936971-2e70-43cd-9500-ed865f7efcf1"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Backtest
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr data-index="3">
                                                        <td class="bs-checkbox " style="width: 36px; "><label>
                                                                <input data-index="3" name="btSelectItem"
                                                                    type="checkbox">
                                                                <span></span>
                                                            </label></td>
                                                        <td class="bot-item">
                                                            <div class="row m-0 p-0">
                                                                <div
                                                                    class="col-auto m-0 p-0 pr-1 d-flex align-items-center">
                                                                    <a class="link"
                                                                        href="https:///chobot.vn/bot/detail?guid=f5001f79-d9ef-440a-87de-ec1e6440a0c8"
                                                                        target="_blank">
                                                                        <img src="https://chobot.vn//storage/upload/avatars/1065.png"
                                                                            alt="" class="thumb">
                                                                    </a>
                                                                </div>
                                                                <div class="col m-0 p-0 pl-1 mx-2">
                                                                    <div class="row">
                                                                        <div class="col title mt-2">
                                                                            <a class="title"
                                                                                href="https:///chobot.vn/bot/detail?guid=f5001f79-d9ef-440a-87de-ec1e6440a0c8"
                                                                                target="_blank">
                                                                                <span class=""
                                                                                    style="line-height:1.5rem">Chicken
                                                                                    Rock2 V2.7(Close ATC)</span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col subtitle">
                                                                            <div class="rate" title="Đánh giá 0/5"><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i>
                                                                            </div>
                                                                            <div class="owner small mx-1 ml-2">
                                                                                <span>ai dinh</span>
                                                                            </div>
                                                                            <div class="interval small mx-1">
                                                                                <span>15 phút</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col">
                                                                    <div class="result">
                                                                        <div class="mx-1 text-center">
                                                                            Số lệnh:
                                                                            <span class="text-info">397</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tổng lãi/lỗ:
                                                                            <span class="text-success">801.5</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tỷ lệ thắng:
                                                                            <span class="text-success">46.6%</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="my-2 description">

                                                            </div>
                                                            <div class="row m-0 p-0 py-1 pt-2">
                                                                <div
                                                                    class="col-6 m-0 p-0 text-left price text-truncate">
                                                                    Giá: <span class="text-danger font-weight-bold">Liên
                                                                        hệ</span>
                                                                </div>
                                                                <div class="col-6 m-0 p-0 text-right text-nowrap">
                                                                    <a href="https:///chobot.vn/bot/detail?guid=f5001f79-d9ef-440a-87de-ec1e6440a0c8"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Chi tiết
                                                                    </a>
                                                                    <a href="https:///chobot.vn/bot/backtest?guid=f5001f79-d9ef-440a-87de-ec1e6440a0c8"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Backtest
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr data-index="4">
                                                        <td class="bs-checkbox " style="width: 36px; "><label>
                                                                <input data-index="4" name="btSelectItem"
                                                                    type="checkbox">
                                                                <span></span>
                                                            </label></td>
                                                        <td class="bot-item">
                                                            <div class="row m-0 p-0">
                                                                <div
                                                                    class="col-auto m-0 p-0 pr-1 d-flex align-items-center">
                                                                    <a class="link"
                                                                        href="https:///chobot.vn/bot/detail?guid=281f9ca5-c2c7-4311-aa9c-1386394ba17a"
                                                                        target="_blank">
                                                                        <img src="https://chobot.vn//storage/upload/avatars/1065.png"
                                                                            alt="" class="thumb">
                                                                    </a>
                                                                </div>
                                                                <div class="col m-0 p-0 pl-1 mx-2">
                                                                    <div class="row">
                                                                        <div class="col title mt-2">
                                                                            <a class="title"
                                                                                href="https:///chobot.vn/bot/detail?guid=281f9ca5-c2c7-4311-aa9c-1386394ba17a"
                                                                                target="_blank">
                                                                                <span class=""
                                                                                    style="line-height:1.5rem">Chicken
                                                                                    Rock 2 V2.5</span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col subtitle">
                                                                            <div class="rate" title="Đánh giá 0/5"><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i>
                                                                            </div>
                                                                            <div class="owner small mx-1 ml-2">
                                                                                <span>ai dinh</span>
                                                                            </div>
                                                                            <div class="interval small mx-1">
                                                                                <span>15 phút</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col">
                                                                    <div class="result">
                                                                        <div class="mx-1 text-center">
                                                                            Số lệnh:
                                                                            <span class="text-info">332</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tổng lãi/lỗ:
                                                                            <span class="text-success">751.4</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tỷ lệ thắng:
                                                                            <span class="text-success">46.7%</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="my-2 description">

                                                            </div>
                                                            <div class="row m-0 p-0 py-1 pt-2">
                                                                <div
                                                                    class="col-6 m-0 p-0 text-left price text-truncate">
                                                                    Giá: <span class="text-danger font-weight-bold">Liên
                                                                        hệ</span>
                                                                </div>
                                                                <div class="col-6 m-0 p-0 text-right text-nowrap">
                                                                    <a href="https:///chobot.vn/bot/detail?guid=281f9ca5-c2c7-4311-aa9c-1386394ba17a"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Chi tiết
                                                                    </a>
                                                                    <a href="https:///chobot.vn/bot/backtest?guid=281f9ca5-c2c7-4311-aa9c-1386394ba17a"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Backtest
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr data-index="5">
                                                        <td class="bs-checkbox " style="width: 36px; "><label>
                                                                <input data-index="5" name="btSelectItem"
                                                                    type="checkbox">
                                                                <span></span>
                                                            </label></td>
                                                        <td class="bot-item">
                                                            <div class="row m-0 p-0">
                                                                <div
                                                                    class="col-auto m-0 p-0 pr-1 d-flex align-items-center">
                                                                    <a class="link"
                                                                        href="https:///chobot.vn/bot/detail?guid=2a9e8d54-730e-45fe-95b7-77bec09f59df"
                                                                        target="_blank">
                                                                        <img src="https://chobot.vn//storage/upload/avatars/1065.png"
                                                                            alt="" class="thumb">
                                                                    </a>
                                                                </div>
                                                                <div class="col m-0 p-0 pl-1 mx-2">
                                                                    <div class="row">
                                                                        <div class="col title mt-2">
                                                                            <a class="title"
                                                                                href="https:///chobot.vn/bot/detail?guid=2a9e8d54-730e-45fe-95b7-77bec09f59df"
                                                                                target="_blank">
                                                                                <span class=""
                                                                                    style="line-height:1.5rem">Chicken
                                                                                    Rock 2 V2.2</span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col subtitle">
                                                                            <div class="rate" title="Đánh giá 0/5"><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i>
                                                                            </div>
                                                                            <div class="owner small mx-1 ml-2">
                                                                                <span>ai dinh</span>
                                                                            </div>
                                                                            <div class="interval small mx-1">
                                                                                <span>15 phút</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col">
                                                                    <div class="result">
                                                                        <div class="mx-1 text-center">
                                                                            Số lệnh:
                                                                            <span class="text-info">217</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tổng lãi/lỗ:
                                                                            <span class="text-success">747.4</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tỷ lệ thắng:
                                                                            <span class="text-success">46.1%</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="my-2 description">

                                                            </div>
                                                            <div class="row m-0 p-0 py-1 pt-2">
                                                                <div
                                                                    class="col-6 m-0 p-0 text-left price text-truncate">
                                                                    Giá: <span class="text-danger font-weight-bold">Liên
                                                                        hệ</span>
                                                                </div>
                                                                <div class="col-6 m-0 p-0 text-right text-nowrap">
                                                                    <a href="https:///chobot.vn/bot/detail?guid=2a9e8d54-730e-45fe-95b7-77bec09f59df"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Chi tiết
                                                                    </a>
                                                                    <a href="https:///chobot.vn/bot/backtest?guid=2a9e8d54-730e-45fe-95b7-77bec09f59df"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Backtest
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr data-index="6">
                                                        <td class="bs-checkbox " style="width: 36px; "><label>
                                                                <input data-index="6" name="btSelectItem"
                                                                    type="checkbox">
                                                                <span></span>
                                                            </label></td>
                                                        <td class="bot-item">
                                                            <div class="row m-0 p-0">
                                                                <div
                                                                    class="col-auto m-0 p-0 pr-1 d-flex align-items-center">
                                                                    <a class="link"
                                                                        href="https:///chobot.vn/bot/detail?guid=bc5e3181-4436-477d-9a98-418c805d655c"
                                                                        target="_blank">
                                                                        <img src="https://chobot.vn//storage/upload/avatars/1484.png"
                                                                            alt="" class="thumb">
                                                                    </a>
                                                                </div>
                                                                <div class="col m-0 p-0 pl-1 mx-2">
                                                                    <div class="row">
                                                                        <div class="col title mt-2">
                                                                            <a class="title"
                                                                                href="https:///chobot.vn/bot/detail?guid=bc5e3181-4436-477d-9a98-418c805d655c"
                                                                                target="_blank">
                                                                                <span class=""
                                                                                    style="line-height:1.5rem">Bình An
                                                                                    1.3</span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col subtitle">
                                                                            <div class="rate" title="Đánh giá 0/5"><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i>
                                                                            </div>
                                                                            <div class="owner small mx-1 ml-2">
                                                                                <span>Như Phúc</span>
                                                                            </div>
                                                                            <div class="interval small mx-1">
                                                                                <span>3 phút</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col">
                                                                    <div class="result">
                                                                        <div class="mx-1 text-center">
                                                                            Số lệnh:
                                                                            <span class="text-info">653</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tổng lãi/lỗ:
                                                                            <span class="text-success">743.6</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tỷ lệ thắng:
                                                                            <span class="text-success">44.1%</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="my-2 description">
                                                                Chỉ báo tin cậy, an tâm trợ giúp nhà đầu tư khi giao
                                                                dịch phái sinh
                                                            </div>
                                                            <div class="row m-0 p-0 py-1 pt-2">
                                                                <div
                                                                    class="col-6 m-0 p-0 text-left price text-truncate">
                                                                    Giá: <span class="text-danger font-weight-bold">Liên
                                                                        hệ</span>
                                                                </div>
                                                                <div class="col-6 m-0 p-0 text-right text-nowrap">
                                                                    <a href="https:///chobot.vn/bot/detail?guid=bc5e3181-4436-477d-9a98-418c805d655c"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Chi tiết
                                                                    </a>
                                                                    <a href="https:///chobot.vn/bot/backtest?guid=bc5e3181-4436-477d-9a98-418c805d655c"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Backtest
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr data-index="7">
                                                        <td class="bs-checkbox " style="width: 36px; "><label>
                                                                <input data-index="7" name="btSelectItem"
                                                                    type="checkbox">
                                                                <span></span>
                                                            </label></td>
                                                        <td class="bot-item">
                                                            <div class="row m-0 p-0">
                                                                <div
                                                                    class="col-auto m-0 p-0 pr-1 d-flex align-items-center">
                                                                    <a class="link"
                                                                        href="https:///chobot.vn/bot/detail?guid=f95f23e1-a193-4cd4-bc83-0dca36205603"
                                                                        target="_blank">
                                                                        <img src="https://chobot.vn//storage/upload/avatars/1195.png"
                                                                            alt="" class="thumb">
                                                                    </a>
                                                                </div>
                                                                <div class="col m-0 p-0 pl-1 mx-2">
                                                                    <div class="row">
                                                                        <div class="col title mt-2">
                                                                            <a class="title"
                                                                                href="https:///chobot.vn/bot/detail?guid=f95f23e1-a193-4cd4-bc83-0dca36205603"
                                                                                target="_blank">
                                                                                <span class=""
                                                                                    style="line-height:1.5rem">Đỉnh Cao
                                                                                    Phái Sinh</span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col subtitle">
                                                                            <div class="rate" title="Đánh giá 0/5"><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i>
                                                                            </div>
                                                                            <div class="owner small mx-1 ml-2">
                                                                                <span>Việt Hồng</span>
                                                                            </div>
                                                                            <div class="interval small mx-1">
                                                                                <span>1 phút</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col">
                                                                    <div class="result">
                                                                        <div class="mx-1 text-center">
                                                                            Số lệnh:
                                                                            <span class="text-info">946</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tổng lãi/lỗ:
                                                                            <span class="text-success">743.4</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tỷ lệ thắng:
                                                                            <span class="text-success">37.5%</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="my-2 description">

                                                            </div>
                                                            <div class="row m-0 p-0 py-1 pt-2">
                                                                <div
                                                                    class="col-6 m-0 p-0 text-left price text-truncate">
                                                                    Giá: <span class="text-danger font-weight-bold">Liên
                                                                        hệ</span>
                                                                </div>
                                                                <div class="col-6 m-0 p-0 text-right text-nowrap">
                                                                    <a href="https:///chobot.vn/bot/detail?guid=f95f23e1-a193-4cd4-bc83-0dca36205603"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Chi tiết
                                                                    </a>
                                                                    <a href="https:///chobot.vn/bot/backtest?guid=f95f23e1-a193-4cd4-bc83-0dca36205603"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Backtest
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr data-index="8">
                                                        <td class="bs-checkbox " style="width: 36px; "><label>
                                                                <input data-index="8" name="btSelectItem"
                                                                    type="checkbox">
                                                                <span></span>
                                                            </label></td>
                                                        <td class="bot-item">
                                                            <div class="row m-0 p-0">
                                                                <div
                                                                    class="col-auto m-0 p-0 pr-1 d-flex align-items-center">
                                                                    <a class="link"
                                                                        href="https:///chobot.vn/bot/detail?guid=90a3844e-2dfe-45a0-9031-6d26465da640"
                                                                        target="_blank">
                                                                        <img src="https://chobot.vn//storage/upload/avatars/1259.png"
                                                                            alt="" class="thumb">
                                                                    </a>
                                                                </div>
                                                                <div class="col m-0 p-0 pl-1 mx-2">
                                                                    <div class="row">
                                                                        <div class="col title mt-2">
                                                                            <a class="title"
                                                                                href="https:///chobot.vn/bot/detail?guid=90a3844e-2dfe-45a0-9031-6d26465da640"
                                                                                target="_blank">
                                                                                <span class=""
                                                                                    style="line-height:1.5rem">QTPpro</span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col subtitle">
                                                                            <div class="rate" title="Đánh giá 0/5"><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i>
                                                                            </div>
                                                                            <div class="owner small mx-1 ml-2">
                                                                                <span>Quách Xuân Thắng</span>
                                                                            </div>
                                                                            <div class="interval small mx-1">
                                                                                <span>15 phút</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col">
                                                                    <div class="result">
                                                                        <div class="mx-1 text-center">
                                                                            Số lệnh:
                                                                            <span class="text-info">335</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tổng lãi/lỗ:
                                                                            <span class="text-success">734.3</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tỷ lệ thắng:
                                                                            <span class="text-success">46.6%</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="my-2 description">

                                                            </div>
                                                            <div class="row m-0 p-0 py-1 pt-2">
                                                                <div
                                                                    class="col-6 m-0 p-0 text-left price text-truncate">
                                                                    Giá: <span class="text-danger font-weight-bold">Liên
                                                                        hệ</span>
                                                                </div>
                                                                <div class="col-6 m-0 p-0 text-right text-nowrap">
                                                                    <a href="https:///chobot.vn/bot/detail?guid=90a3844e-2dfe-45a0-9031-6d26465da640"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Chi tiết
                                                                    </a>
                                                                    <a href="https:///chobot.vn/bot/backtest?guid=90a3844e-2dfe-45a0-9031-6d26465da640"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Backtest
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr data-index="9">
                                                        <td class="bs-checkbox " style="width: 36px; "><label>
                                                                <input data-index="9" name="btSelectItem"
                                                                    type="checkbox">
                                                                <span></span>
                                                            </label></td>
                                                        <td class="bot-item">
                                                            <div class="row m-0 p-0">
                                                                <div
                                                                    class="col-auto m-0 p-0 pr-1 d-flex align-items-center">
                                                                    <a class="link"
                                                                        href="https:///chobot.vn/bot/detail?guid=74b56d6b-dfc3-4e3b-bb26-e500100771a2"
                                                                        target="_blank">
                                                                        <img src="https://chobot.vn//storage/upload/avatars/989.png"
                                                                            alt="" class="thumb">
                                                                    </a>
                                                                </div>
                                                                <div class="col m-0 p-0 pl-1 mx-2">
                                                                    <div class="row">
                                                                        <div class="col title mt-2">
                                                                            <a class="title"
                                                                                href="https:///chobot.vn/bot/detail?guid=74b56d6b-dfc3-4e3b-bb26-e500100771a2"
                                                                                target="_blank">
                                                                                <span class=""
                                                                                    style="line-height:1.5rem">Ngọa
                                                                                    Long</span>
                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="row">
                                                                        <div class="col subtitle">
                                                                            <div class="rate" title="Đánh giá 0/5"><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i><i
                                                                                    class="fa fa-star text-muted"></i>
                                                                            </div>
                                                                            <div class="owner small mx-1 ml-2">
                                                                                <span>ZenoS</span>
                                                                            </div>
                                                                            <div class="interval small mx-1">
                                                                                <span>15 phút</span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="col">
                                                                    <div class="result">
                                                                        <div class="mx-1 text-center">
                                                                            Số lệnh:
                                                                            <span class="text-info">341</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tổng lãi/lỗ:
                                                                            <span class="text-success">729.0</span>
                                                                        </div>
                                                                        <div class="mx-1 text-center">
                                                                            Tỷ lệ thắng:
                                                                            <span class="text-success">46.3%</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="my-2 description">
                                                                Năm Giáp Thìn thì dùng bot Rồng :)
                                                            </div>
                                                            <div class="row m-0 p-0 py-1 pt-2">
                                                                <div
                                                                    class="col-6 m-0 p-0 text-left price text-truncate">
                                                                    Giá: <span class="text-danger font-weight-bold">Liên
                                                                        hệ</span>
                                                                </div>
                                                                <div class="col-6 m-0 p-0 text-right text-nowrap">
                                                                    <a href="https:///chobot.vn/bot/detail?guid=74b56d6b-dfc3-4e3b-bb26-e500100771a2"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Chi tiết
                                                                    </a>
                                                                    <a href="https:///chobot.vn/bot/backtest?guid=74b56d6b-dfc3-4e3b-bb26-e500100771a2"
                                                                        class="d-inline text-info mx-2 link"
                                                                        target="_blank">
                                                                        Backtest
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="fixed-table-footer" style="display: none;"></div>
                                    </div>
                                    <div class="fixed-table-pagination" style="display: block;">
                                        <div class="float-left pagination-detail"><span class="pagination-info">
                                                Trang 1 đến 10 / 99
                                            </span>
                                            <div class="page-list">
                                                <div class="btn-group dropdown dropup">
                                                    <button class="btn btn-secondary dropdown-toggle" type="button"
                                                        data-toggle="dropdown">
                                                        <span class="page-size">
                                                            10
                                                        </span>
                                                        <span class="caret"></span>
                                                    </button>
                                                    <div class="dropdown-menu"><a class="dropdown-item active"
                                                            href="#">10</a><a class="dropdown-item " href="#">25</a><a
                                                            class="dropdown-item " href="#">50</a><a
                                                            class="dropdown-item " href="#">100</a></div>
                                                </div> / trang
                                            </div>
                                        </div>
                                        <div class="float-right pagination">
                                            <ul class="pagination">
                                                <li class="page-item page-pre"><a class="page-link"
                                                        aria-label="trang trước" href="javascript:void(0)">‹</a></li>
                                                <li class="page-item active"><a class="page-link"
                                                        aria-label="đến trang 1" href="javascript:void(0)">1</a></li>
                                                <li class="page-item"><a class="page-link" aria-label="đến trang 2"
                                                        href="javascript:void(0)">2</a></li>
                                                <li class="page-item"><a class="page-link" aria-label="đến trang 3"
                                                        href="javascript:void(0)">3</a></li>
                                                <li class="page-item"><a class="page-link" aria-label="đến trang 4"
                                                        href="javascript:void(0)">4</a></li>
                                                <li class="page-item"><a class="page-link" aria-label="đến trang 5"
                                                        href="javascript:void(0)">5</a></li>
                                                <li class="page-item page-last-separator disabled"><a class="page-link"
                                                        aria-label="" href="javascript:void(0)">...</a></li>
                                                <li class="page-item"><a class="page-link" aria-label="đến trang 10"
                                                        href="javascript:void(0)">10</a></li>
                                                <li class="page-item page-next"><a class="page-link"
                                                        aria-label="trang kế" href="javascript:void(0)">›</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="tab-pane" id="tabRentBots" role="tabpanel" aria-labelledby="myBots-tab">
                            <div class="table-responsive pt-4">
                                <div class="bootstrap-table bootstrap4">
                                    <div class="fixed-table-toolbar"></div>

                                    <div class="fixed-table-container fixed-height"
                                        style="height: 500px; padding-bottom: 0px;">
                                        <div class="fixed-table-header" style="display: none;">
                                            <table></table>
                                        </div>
                                        <div class="fixed-table-body">
                                            <div class="fixed-table-loading table table-hover" style="top: 0px;">
                                                <span class="loading-wrap">
                                                    <span class="loading-text" style="font-size: 12px;">Đang tải</span>
                                                    <span class="animation-wrap"><span
                                                            class="animation-dot"></span></span>
                                                </span>

                                            </div>
                                            <table id="table-rentBots" data-classes="table table-hover"
                                                data-toggle="table" data-locale="vi" data-search="false"
                                                data-search-align="left" data-height="500" data-smartdisplay="true"
                                                data-pagination="true" data-page-size="6" data-side-pagination="server"
                                                data-show-header="false" data-filter-control="false"
                                                data-single-select="true" data-click-to-select="true"
                                                data-query-params="rentBotsQueryParam"
                                                data-repsonse-handler="responseHandler"
                                                data-url="https://chobot.vn/satbot/3.0/common/bot"
                                                class="table table-hover">
                                                <thead style="display: none;">
                                                    <tr>
                                                        <th class="bs-checkbox " style="width: 36px; "
                                                            data-field="state">
                                                            <div class="th-inner "></div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                        <th class="bot-item" style="" data-field="id">
                                                            <div class="th-inner "></div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="no-records-found">
                                                        <td colspan="2">Không có dữ liệu</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="fixed-table-footer" style="display: none;"></div>
                                    </div>
                                    <div class="fixed-table-pagination" style="display: none;">
                                        <div class="float-left pagination-detail"><span class="pagination-info">
                                                Trang 1 đến 0 / 0
                                            </span>
                                            <div class="page-list" style="display: none;">
                                                <div class="btn-group dropdown dropup">
                                                    <button class="btn btn-secondary dropdown-toggle" type="button"
                                                        data-toggle="dropdown">
                                                        <span class="page-size">
                                                            6
                                                        </span>
                                                        <span class="caret"></span>
                                                    </button>
                                                    <div class="dropdown-menu"><a class="dropdown-item " href="#">10</a>
                                                    </div>
                                                </div> / trang
                                            </div>
                                        </div>
                                        <div class="float-right pagination" style="display: none;">
                                            <ul class="pagination">
                                                <li class="page-item page-pre"><a class="page-link"
                                                        aria-label="trang trước" href="javascript:void(0)">‹</a></li>
                                                <li class="page-item active"><a class="page-link"
                                                        aria-label="đến trang 1" href="javascript:void(0)">1</a></li>
                                                <li class="page-item page-next"><a class="page-link"
                                                        aria-label="trang kế" href="javascript:void(0)">›</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                        <div class="tab-pane" id="tabMyBots" role="tabpanel" aria-labelledby="myBots-tab">
                            <div class="table-responsive pt-4">
                                <div class="bootstrap-table bootstrap4">
                                    <div class="fixed-table-toolbar"></div>

                                    <div class="fixed-table-container fixed-height"
                                        style="height: 446px; padding-bottom: 0px;">
                                        <div class="fixed-table-header" style="display: none;">
                                            <table></table>
                                        </div>
                                        <div class="fixed-table-body">
                                            <div class="fixed-table-loading table table-hover" style="top: 0px;">
                                                <span class="loading-wrap">
                                                    <span class="loading-text" style="font-size: 12px;">Đang tải</span>
                                                    <span class="animation-wrap"><span
                                                            class="animation-dot"></span></span>
                                                </span>

                                            </div>
                                            <table id="table-mybots" data-classes="table table-hover"
                                                data-toggle="table" data-locale="vi" data-search="false"
                                                data-search-align="left" data-height="500" data-smartdisplay="true"
                                                data-pagination="true" data-page-size="6" data-side-pagination="server"
                                                data-show-header="false" data-filter-control="false"
                                                data-single-select="true" data-click-to-select="true"
                                                data-query-params="myBotsQueryParam"
                                                data-repsonse-handler="responseHandler"
                                                data-url="https://chobot.vn/satbot/3.0/common/bot"
                                                class="table table-hover">

                                                <thead style="display: none;">
                                                    <tr>
                                                        <th class="bs-checkbox " style="width: 36px; "
                                                            data-field="state">
                                                            <div class="th-inner "></div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                        <th class="bot-item" style="" data-field="id">
                                                            <div class="th-inner "></div>
                                                            <div class="fht-cell"></div>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr data-index="0">
                                                        <td class="bs-checkbox " style="width: 36px; "><label>
                                                                <input data-index="0" name="btSelectItem"
                                                                    type="checkbox">
                                                                <span></span>
                                                            </label></td>
                                                        <td class="bot-item">
                                                            <div class="row">
                                                                <div
                                                                    class="col-auto m-0 p-0 pr-1 d-flex align-items-center">
                                                                    <a class="link"
                                                                        href="https:///chobot.vn/bot/detail?guid=d395233b-9165-488d-8640-b93bc58006e4"
                                                                        title="Chi tiết" target="_blank">
                                                                        <img src="https://chobot.vn//storage/upload/avatars/1477.png"
                                                                            alt="" class="thumb ml-2">
                                                                    </a>
                                                                </div>
                                                                <div class="col m-0 p-0 pl-1 mt-2 mx-2">
                                                                    <div class="title">
                                                                        <a class="title"
                                                                            href="https:///chobot.vn/bot/detail?guid=d395233b-9165-488d-8640-b93bc58006e4"
                                                                            target="_blank">
                                                                            <span class=""
                                                                                style="line-height:1.5rem">Bot
                                                                                Test</span>
                                                                        </a>
                                                                    </div>
                                                                    <div class="subtitle">
                                                                        <div class="rate" title="Đánh giá 0/5"><i
                                                                                class="fa fa-star text-muted"></i><i
                                                                                class="fa fa-star text-muted"></i><i
                                                                                class="fa fa-star text-muted"></i><i
                                                                                class="fa fa-star text-muted"></i><i
                                                                                class="fa fa-star text-muted"></i></div>
                                                                        <div class="owner small mx-1 ml-2">
                                                                            <span>duy</span>
                                                                        </div>
                                                                        <div class="interval small mx-1">
                                                                            <span>5 phút</span>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr data-index="1">
                                                        <td class="bs-checkbox " style="width: 36px; "><label>
                                                                <input data-index="1" name="btSelectItem"
                                                                    type="checkbox">
                                                                <span></span>
                                                            </label></td>
                                                        <td class="bot-item">
                                                            <div class="row">
                                                                <div
                                                                    class="col-auto m-0 p-0 pr-1 d-flex align-items-center">
                                                                    <a class="link"
                                                                        href="https:///chobot.vn/bot/detail?guid=88a3f2d2-1ac5-4c58-b923-7e0c99a056f8"
                                                                        title="Chi tiết" target="_blank">
                                                                        <img src="https://chobot.vn//storage/upload/avatars/1477.png"
                                                                            alt="" class="thumb ml-2">
                                                                    </a>
                                                                </div>
                                                                <div class="col m-0 p-0 pl-1 mt-2 mx-2">
                                                                    <div class="title">
                                                                        <a class="title"
                                                                            href="https:///chobot.vn/bot/detail?guid=88a3f2d2-1ac5-4c58-b923-7e0c99a056f8"
                                                                            target="_blank">
                                                                            <span class=""
                                                                                style="line-height:1.5rem">Bot
                                                                                Trading</span>
                                                                        </a>
                                                                    </div>
                                                                    <div class="subtitle">
                                                                        <div class="rate" title="Đánh giá 0/5"><i
                                                                                class="fa fa-star text-muted"></i><i
                                                                                class="fa fa-star text-muted"></i><i
                                                                                class="fa fa-star text-muted"></i><i
                                                                                class="fa fa-star text-muted"></i><i
                                                                                class="fa fa-star text-muted"></i></div>
                                                                        <div class="owner small mx-1 ml-2">
                                                                            <span>duy</span>
                                                                        </div>
                                                                        <div class="interval small mx-1">
                                                                            <span>5 phút</span>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        <div class="fixed-table-footer" style="display: none;"></div>
                                    </div>
                                    <div class="fixed-table-pagination" style="display: block;">
                                        <div class="float-left pagination-detail"><span class="pagination-info">
                                                Trang 1 đến 2 / 2
                                            </span>
                                            <div class="page-list" style="display: none;">
                                                <div class="btn-group dropdown dropup">
                                                    <button class="btn btn-secondary dropdown-toggle" type="button"
                                                        data-toggle="dropdown">
                                                        <span class="page-size">
                                                            6
                                                        </span>
                                                        <span class="caret"></span>
                                                    </button>
                                                    <div class="dropdown-menu"><a class="dropdown-item " href="#">10</a>
                                                    </div>
                                                </div> / trang
                                            </div>
                                        </div>
                                        <div class="float-right pagination" style="display: none;">
                                            <ul class="pagination">
                                                <li class="page-item page-pre"><a class="page-link"
                                                        aria-label="trang trước" href="javascript:void(0)">‹</a></li>
                                                <li class="page-item active"><a class="page-link"
                                                        aria-label="đến trang 1" href="javascript:void(0)">1</a></li>
                                                <li class="page-item page-next"><a class="page-link"
                                                        aria-label="trang kế" href="javascript:void(0)">›</a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>


                    <script type="text/javascript">
                        function rentBotsQueryParam(query) {
                            query.act = "bot-search-rentbots";
                            query.user = "";
                            if (typeof (getAuthInfo) != 'undefined')
                                query.user = getAuthInfo().username;
                            return query;
                        }

                        function myBotsQueryParam(query) {
                            query.act = "bot-search-mybots";
                            query.user = "";
                            if (typeof (getAuthInfo) != 'undefined')
                                query.user = getAuthInfo().username;
                            return query;
                        }

                        function botListQueryParam(query) {
                            query.act = "bot-search";
                            return query;
                        }

                        function responseHandler(args) {
                            return args;
                        }

                        function imageFormatter(value, row) {
                            try {
                                value = (value ?? "").trim();
                                value = value === "" ? "https://chobot.vn/satbot/images/noimage.png" : value;
                                var detailUrl = "https:///chobot.vn" + row.detailUrl;
                                var html = \`
                            <a href="\${detailUrl}" title="Chi tiết" target="_blank" class="thumb">
                                <img src="\${value}" alt="\${row.name}" />
                            </a>\`;
                                return html;
                            } catch (e) {
                                console.error(e);
                                return '';
                            }
                        }

                        function rowFormatter(value, row) {
                            try {
                                var id = row.id;
                                var detailUrl = "https:///chobot.vn" + row.detailUrl;
                                var backtestUrl = "https:///chobot.vn" + row.backtestUrl;

                                var html = row.description;
                                var desc = "";
                                var date = new Date(row.updatedAt);
                                date = date.format("dd/MM/yyyy HH:mm:ss");

                                try {
                                    var parser = new DOMParser();
                                    var doc = parser.parseFromString(html, "text/html");
                                    desc = doc.documentElement.textContent;
                                    var maxlen = 145;
                                    if (desc.length > maxlen)
                                        desc = desc.substring(0, maxlen) + "...";
                                } catch { }

                                if (row.imageUrl && row.imageUrl.includes("/storage/upload/avatars/") && !row.imageUrl.includes("http"))
                                    row.imageUrl = "https://chobot.vn/" + row.imageUrl;

                                var rate = parseInt(row.rate);
                                var rateHtml = \`<div class="rate" title="Đánh giá \${rate}/5">\`;
                                for (var i = 1; i <= 5; i++) {
                                    rateHtml += \`<i class="fa fa-star \${i > rate ? 'text-muted' : 'text-yellow'}"></i>\`;
                                }
                                rateHtml += "</div>";

                                var price = row.price ?? "";
                                price = price === "" ? "Liên hệ" : price;

                                html = \`
                                <div class="row m-0 p-0">
                                    <div class="col-auto m-0 p-0 pr-1 d-flex align-items-center">
                                        <a class="link" href="\${detailUrl}" target="_blank">
                                            <img src="\${row.imageUrl ?? "/satbot/images/noimage.png"}" alt="" class="thumb" />
                                        </a>
                                    </div>
                                    <div class="col m-0 p-0 pl-1 mx-2">
                                        <div class="row">
                                            <div class="col title mt-2">
                                                <a class="title" href="\${detailUrl}" target="_blank">
                                                    <span class="" style="line-height:1.5rem">\${row.name}</span>
                                                </a>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col subtitle">
                                                \${rateHtml}
                                                <div class="owner small mx-1 ml-2">
                                                    <span>\${row.fullname}</span>
                                                </div>
                                                <div class="interval small mx-1">
                                                    <span>\${row.intervalName}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col">
                                        <div class="result">
                                            <div class="mx-1 text-center">
                                                Số lệnh:
                                                <span class="text-info">\${formatDecimal(row.numTrades, 0)}</span>
                                            </div>
                                            <div class="mx-1 text-center">
                                                Tổng lãi/lỗ:
                                                <span class="\${row.totalProfit > 0 ? "text-success" : "text-danger"}">\${formatDecimal(row.totalProfit)}</span>
                                            </div>
                                            <div class="mx-1 text-center">
                                                Tỷ lệ thắng:
                                                <span class="text-success">\${formatDecimal(row.winPct * 100)}%</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="my-2 description">
                                    \${desc}
                                </div>
                                <div class="row m-0 p-0 py-1 pt-2">
                                    <div class="col-6 m-0 p-0 text-left price text-truncate">
                                        Giá: <span class="text-danger font-weight-bold">\${price}</span>
                                    </div>
                                    <div class="col-6 m-0 p-0 text-right text-nowrap">
                                        <a href="\${detailUrl}" class="d-inline text-info mx-2 link" target="_blank">
                                            Chi tiết
                                        </a>
                                        <a href="\${backtestUrl}" class="d-inline text-info mx-2 link" target="_blank">
                                            Backtest
                                        </a>
                                    </div>
                                </div>\`;

                                return html;
                            } catch (e) {
                                console.error(e);
                            }
                        }

                        function myBotExpireDateFormatter(value, row) {
                            var now = new Date();
                            var expire = new Date(row.expireDate);
                            var isExpired = expire < now;

                            expire = new Date(row.expireDate).format("yyyy-MM-dd");

                            var html = "";
                            if (isExpired) {
                                html = \`
                                <span class="text-danger">Đã hết hạn</span>
                                <br/>
                                <a href="javascript:void(0)" class="bot-extend-link text-danger" title="Click để gia hạn" data-id="\${row.id}">
                                    <i class="fa fa-plus-circle"></i>
                                    Gia hạn
                                </a>
                            \`;
                            } else {
                                html = \`
                                <span>Sử dụng đến</span>
                                <a href="javascript:void(0)" class="bot-extend-link" title="Click để gia hạn" data-id="\${row.id}">
                                    <span>\${expire}</span>
                                </a>
                                <br/>
                                <a href="javascript:void(0)" class="bot-extend-link" title="Click để gia hạn" data-id="\${row.id}">
                                    <i class="fa fa-plus-circle"></i>
                                    Gia hạn
                                </a>
                            \`;
                            }

                            return html;
                        }

                        function myBotRowFormatter(value, row) {
                            var id = row.id;
                            var detailUrl = "https:///chobot.vn" + row.detailUrl;
                            var backtestUrl = "https:///chobot.vn" + row.backtestUrl;
                            var html = row.description;
                            var desc = "";
                            var date = new Date(row.updatedAt);
                            date = date.format("dd/MM/yyyy HH:mm:ss");

                            try {
                                var parser = new DOMParser();
                                var doc = parser.parseFromString(html, "text/html");
                                desc = doc.documentElement.textContent;
                                var maxlen = 145;
                                if (desc.length > maxlen)
                                    desc = desc.substring(0, maxlen) + "...";
                            } catch { }

                            if (row.imageUrl && row.imageUrl.includes("/storage/upload/avatars/") && !row.imageUrl.includes("http"))
                                row.imageUrl = "https://chobot.vn/" + row.imageUrl;

                            var rate = parseInt(row.rate);
                            var rateHtml = \`<div class="rate" title="Đánh giá \${rate}/5">\`;
                            for (var i = 1; i <= 5; i++) {
                                rateHtml += \`<i class="fa fa-star \${i > rate ? 'text-muted' : 'text-yellow'}"></i>\`;
                            }
                            rateHtml += "</div>";

                            var usageHtml = '';
                            if (row.expireDate) {
                                var activeDate = new Date(row.activeDate).toLocaleDateString();
                                var expireDate = new Date(row.expireDate).toLocaleDateString();
                                usageHtml =
                                    \`<div class="row m-0 p-0">
                                <div class="col-auto px-1">Ngày kích hoạt: <b>\${activeDate}</b></div>
                                <div class="col-auto px-1">Ngày hết hạn: <b>\${expireDate}</b></div>
                            </div>\`;
                            }

                            var html = \`
                                <div class="row">
                                    <div class="col-auto m-0 p-0 pr-1 d-flex align-items-center">
                                        <a class="link" href="\${detailUrl}" title="Chi tiết" target="_blank">
                                            <img src="\${row.imageUrl ?? "/satbot/images/noimage.png"}" alt="" class="thumb ml-2" />
                                        </a>
                                    </div>
                                    <div class="col m-0 p-0 pl-1 mt-2 mx-2">
                                        <div class="title">
                                            <a class="title" href="\${detailUrl}" target="_blank">
                                                <span class="" style="line-height:1.5rem">\${row.name}</span>
                                            </a>
                                        </div>
                                        <div class="subtitle">
                                            \${rateHtml}
                                            <div class="owner small mx-1 ml-2">
                                                <span>\${row.fullname}</span>
                                            </div>
                                            <div class="interval small mx-1">
                                                <span>\${row.intervalName}</span>
                                            </div>
                                        </div>
                                        \${usageHtml}
                                    </div>
                                </div>
                            \`;

                            return html;
                        }
                    </script>
                </div>
                <div class="modal-footer d-flex flex-nowrap justify-content-center">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Bỏ qua</button>
                    <button type="button" class="btn btn-success btn-bot-selected">Chọn bot</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="bot-activate" tabindex="-1" role="dialog" data-backdrop="static" aria-hidden="true" data-backdrop="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Kích hoạt...</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body text-dark">
                    <input id="bot-activate-botid" type="hidden" value="">
                    <div class="alert alert-warning bot-activate-message">
                        Vui lòng liên hệ bộ phận hỗ trợ để nhận mã kích hoạt
                    </div>
                    <div class="form-group">
                        <label class="form-label">Mã kích hoạt</label>
                        <input id="bot-activation-code" type="text" class="form-control" value=""
                            placeholder="Nhập mã kích hoạt">
                    </div>
                </div>
                <div class="modal-footer d-flex flex-nowrap">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Bỏ qua</button>
                    <button type="button" class="btn btn-success btn-bot-activate">Kích hoạt</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="bot-extend-modal" tabindex="-1" role="dialog" data-backdrop="static" aria-hidden="true" data-backdrop="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Gia hạn sử dụng...</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body text-dark">
                    <input id="bot-extend-botid" type="hidden" value="">
                    <div class="alert alert-warning bot-extend-message">
                        Vui lòng liên hệ bộ phận hỗ trợ để nhận mã kích hoạt gia hạn sử dụng Bot
                    </div>
                    <div class="form-group">
                        <label class="form-label">Mã kích hoạt</label>
                        <input id="bot-extend-code" type="text" class="form-control" value=""
                            placeholder="Nhập mã kích hoạt">
                    </div>
                </div>
                <div class="modal-footer d-flex flex-nowrap">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Bỏ qua</button>
                    <button type="button" class="btn btn-success bot-extend-btn">Kích hoạt</button>
                </div>
            </div>
        </div>
    </div>

    <script type="text/javascript">
        $(document).ready(() => {
            $("#lnk-bots").on("click", (e) => {
                $("#table-bots").bootstrapTable('refresh');
            });

            $("#lnk-mybots").on("click", (e) => {
                $("#table-mybots").bootstrapTable('refresh');
            });

            $(document).on("click", ".btn-select-bot", (e) => {
                $("#table-bots").bootstrapTable('refresh');
                $("#table-mybots").bootstrapTable('refresh');
                $("#bot-select").modal("show");
            });

            $(document).on("click", ".btn-bot-selected", async (e) => {
                try {
                    var aThis = window.autobot;
                    var showActivateModal = true;
                    var selection = [];
                    if ($("#tabChobot").hasClass("active")) {
                        selection = $("#table-bots").bootstrapTable('getSelections');
                    } else if ($("#tabRentBots").hasClass("active")) {
                        selection = $("#table-rentBots").bootstrapTable('getSelections');
                        showActivateModal = false;
                    } else {
                        selection = $("#table-mybots").bootstrapTable('getSelections');
                        showActivateModal = false;
                    }

                    if (selection.length > 0) {
                        $("#bot-select").modal("hide");

                        var bot = selection[0];
                        if (showActivateModal) {
                            var url = \`\${aThis._config.apiUrl}?act=bot-settingsGet&bid=\${bot.id}&name=msgActivate\`;
                            var result = await $.get(url);
                            var msg = "";
                            if (result.rc > 0)
                                msg = result.data;

                            if (!msg || msg == "")
                                msg = \`Vui lòng liên hệ <a href="https://zalo.me/0908204305">0908204305</a> để nhận Mã kích hoạt\`;

                            var sel = $("div.bot-activate-message");
                            if (sel.length > 0)
                                sel[0].innerHTML = msg;

                            $("#bot-activation-code").val("");
                            $("#bot-activate-botid").val(bot.id);
                            $("#bot-activate").modal("show");
                        } else {
                            aThis.botSetActive(bot.id);
                        }
                    }
                } catch (e) {
                    console.error(e);
                }
            });

            $(document).on("click", ".btn-bot-activate", async (e) => {
                var aThis = window.autobot;

                try {
                    var key = $("#bot-activation-code").val();
                    key = key.trim();
                    if (!key || key === "") {
                        aThis.tError("Vui lòng nhập mã kích hoạt");
                        return;
                    }

                    var botId = $("#bot-activate-botid").val();
                    if (!botId || botId === "") {
                        aThis.tError("Vui lòng chọn lại bot cần kích hoạt");
                        return;
                    }

                    // activate bot
                    var result = await aThis.botActivate(botId, key);
                    if (result)
                        $("#bot-activate").modal("hide");
                } catch (e) {
                    aThis.tError(e.message);
                }
            });

            $(document).on("click", ".bot-extend-link", async (e) => {
                try {
                    const aThis = window.autobot;

                    var bid = $(e.currentTarget).attr("data-id");
                    var url = \`\${aThis._config.apiUrl}?act=bot-settingsGet&bid=\${bid}&name=msgExtend\`;
                    var result = await $.get(url);
                    var msg = "";
                    if (result.rc > 0)
                        msg = result.data;

                    if (!msg || msg == "")
                        msg = \`Vui lòng liên hệ <a href="https://zalo.me/0908204305">0908204305</a> để nhận Mã kích hoạt\`;

                    var sel = $("div.bot-extend-message");
                    if (sel.length > 0)
                        sel[0].innerHTML = msg;

                    $("#bot-extend-botid").val(bid);
                    $("#bot-extend-code").val("");
                    $("#bot-extend-modal").modal("show");
                    $("#bot-select").modal("hide");
                } catch (e) {
                    console.error(e);
                }
            });

            $(document).on("click", ".bot-extend-btn", async (e) => {
                try {
                    const aThis = window.autobot;

                    var bid = $("#bot-extend-botid").val();
                    var key = $("#bot-extend-code").val();
                    var result = await aThis.botExtend(bid, key);
                    if (result)
                        $("#bot-extend-modal").modal("hide");
                } catch (e) {
                    console.error(e);
                }
            });
        });
    </script>
 </div>`

window.addEventListener('load', () => {
    const api_url = "https://localhost:7043/api/auth"

    const web = $("div#orderPS.tab-pane.active")
    const root = $(packageHtml)
    web.append(root)

    root.append(loginFormHtml)

    const satContent = $("#sat-content")

    const add_logs = (text) => {
        const bot_logs = $("#bot-logs");
        !bot_logs.val() ? bot_logs.val(text) : bot_logs.val(bot_logs.val() + '\n' + text);
    }

    function logging() {
        const extContent = $("#ext-content")
        extContent.children().replaceWith(loggingHtml)

        const ulPanel = $("#ulPanel");
        ulPanel.addClass("flex-nowrap")
        const liPanel = `<li class="nav-item text-center">
                        <a class="nav-link tab-copytrade flex-nowrap" data-toggle="tab" href="#tab-ext" role="tab" aria-controls="tab-copytrade" aria-selected="false">
                                AUTO BOT
                        </a>
                    </li>`
        ulPanel.append(liPanel)
        ulPanel.find('li').css('white-space', 'nowrap');

        $(".tab-content").eq(1).append(tabExtContent)
        satContent.append(modelBot)
        satContent.append(scripts)
        $("#test").empty()

        var now = new Date()
        add_logs(now.toLocaleTimeString('en-GB') + ": Khởi động hệ thống")
        add_logs(now.toLocaleTimeString('en-GB') + ": Hệ thống sẳn sàng")

        //function fetchUpdates(offset) {

        //    fetch(`https://api.telegram.org/bot6790958982:AAFUJrjxhbLRyX7CDpypvbEM1XQT2_INAfc/getUpdates?offset=${offset}`)
        //        .then((response) => {
        //            return response.json();
        //        })
        //        .then((data) => {
        //            if (data.result && data.result.length > 0) {
        //                // Xử lý các cập nhật ở đây
        //                console.log(data);

        //                // Ví dụ: Hiển thị nội dung tin nhắn mới nhất từ channel
        //                data.result.forEach(update => {
        //                    if (update.channel_post) {
        //                        console.log('-------------------------------------------------------Tin hieu moi nhat-------------------------------------------------------');
        //                        console.log(update.channel_post.text.split("\\n"));

        //                        //lấy sức mua
        //                        const sucMua = document.getElementById("sucmua-int");
        //                        console.log('Suc mua: ' + sucMua.innerText)
        //                    }
        //                });

        //                // Cập nhật offset đến update_id mới nhất + 1
        //                const latestUpdateId = data.result[data.result.length - 1].update_id;
        //                fetchUpdates(latestUpdateId + 1);
        //            } else {
        //                // Không có cập nhật mới, gọi lại với cùng offset
        //                fetchUpdates(offset);
        //            }
        //        })
        //        .catch((error) => {
        //            console.error("Có lỗi xảy ra trong quá trình fetch:", error);
        //            // Thử lại sau một khoảng thời gian ngắn nếu có lỗi
        //            setTimeout(() => fetchUpdates(offset), 5000);
        //        });
        //}

        //// Bắt đầu gọi cập nhật với offset ban đầu là 0
        //fetchUpdates(0);

        $(".satbot-logout").on("click", () => {
            if (confirm("Nhấn Ok để xác nhận Hủy liên kết, No để trở lại")) {
                logout()
                setCookie("auth_token", "", -1)
                setCookie("auth_refresh_token", "", -1)
                window.location.reload();
            }
        })
    }

    const logout = () => {
        const acccess_token = "Bearer " + getCookie("auth_token");
        $.ajax({
            url: api_url + "/logout",
            method: "POST",
            headers: {
                "Authorization": acccess_token
            },
            contentType: 'application/json',
            success: () => {
                console.log("Logout success")
            },
            error: (e) => {
                console.log(e);
            }
        });
    }


    const refreshToken = () => {
        var access_token = getCookie("auth_token");
        var refresh_token = getCookie("auth_refresh_token");
        const json = JSON.stringify({ access_token, refresh_token })

        $.ajax({
            url: api_url + "/refresh-token",
            method: "POST",
            data: json,
            contentType: 'application/json',
            success: (data) => {
                if (data.access_token && data.refresh_token) {
                    setCookie("auth_token", data.access_token, 4);
                    updateCookieValue("auth_refresh_token", data.access_token);
                }
            },
            error: (e) => console.log(e)
        });
    }

    const loggedIn = getCookie("auth_refresh_token");
    if (loggedIn) {
        logging()
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
                    url: api_url + "/login",
                    method: "POST",
                    data: json,
                    contentType: 'application/json',
                    success: (data) => {
                        if (data.access_token) {
                            setCookie("auth_token", data.access_token, 7 * 24 * 60);
                            setCookie("auth_refresh_token", data.refresh_token, 7 * 24 * 60);
                            logging();
                        } else {
                            $statusElement.text(data.error).removeClass('alert-info').addClass('alert-danger');
                        }
                    },
                    error: (e) => {
                        $statusElement.text(e.responseText).removeClass('alert-info').addClass('alert-danger');
                    }
                });
            } catch (error) {
                $statusElement.text(error.message).removeClass('alert-info').addClass('alert-danger');
            }
        });
    }
});

//"#VN30F1M Ng?y 24/05/2024 9:00:00 SA Tu Dstock Robotchungkhoan.nududo.com
// Tin hieu long: Manh
// Gia mua: 1277.7
// Target 1: 1367.139
// Target 2: 1469.355
// Target 3: 1533.24
// Cat lo 3: 1188.261
//RSI: 51.20752
//MFI: 37.16677
//    % Gia thay doi: -1.715388"
