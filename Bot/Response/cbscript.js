const scripts = `<script src="https://localhost:7043/assets/js/common.js"></script>`

const packageHtml = `
    <div id='sat-content'>
        <link rel="stylesheet" href="https://localhost:7043/assets/bootstrap-table.min.css">
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
                <a href="http://192.168.1.127:3000/register" target="_blank" title="Đăng ký tài khoản mới">
                    Chưa có tài khoản? Đăng ký tại đây
                </a>
            </div>
            <div class="form-group mb-1">
                <a href="http://192.168.1.127:3000/forget-password" target="_blank" title="Quên mật khẩu? Click vào đây">
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

         <div class="d-none bot-none alert alert-danger text-center">
             TK chưa thiết lập bot mặc định
             <br>
             <button type="button" class="btn btn-primary btn-select-bot">Chọn bot</button>
         </div>
         <div class="d-none bot-expired alert alert-danger text-center">
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
                             <option value="0" selected="">Full Sức mua</option>
                             <option value="1">Số HĐ =</option>
                         </select>
                     </div>
                     <div class="col-4 m-0 p-0 pl-2">
                         <input type="number" class="form-control formatDouble bot-settings" id="bot-volume-value" step="1" min="1" value="" placeholder="Số HĐ">
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
                     </tbody>
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
                                <table id="table-bots" data-classes="table table-hover" data-toggle="table"
                                    data-locale="vi-VN" data-search="true" data-search-align="left" data-height="550"
                                    data-smartdisplay="true" data-pagination="true" data-page-size="4"
                                    data-side-pagination="server" data-show-header="false" data-filter-control="false"
                                    data-single-select="true" data-click-to-select="true"
                                    data-query-params="botListQueryParam" data-repsonse-handler="responseHandler"
                                    data-url="https://chobot.vn/satbot/3.0/common/bot" class="table table-hover">
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
                                    </table>
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
    <script src="https://localhost:7043/assets/js/plugins/bootstrap-table.min.js"></script>
 </div>`

$(window).on('load', () => {
    const api_url = "https://localhost:7043/api/auth"
    var isDemo = window.location.href.includes("smarteasy.vps.com.vn");

    isDemo ? $(".btn.btn-block.btn-default.active.btn-cancel-all").addClass("text-white btn-warning")
        : $("#button_cancel_all_order_normal").addClass("text-white bg-warning")
        
    const web = $("div#orderPS.tab-pane.active")
    const root = $(packageHtml)
    web.append(root)
    root.append(loginFormHtml)

    const satContent = $("#sat-content")
    satContent.append(modelBot)
    satContent.append(scripts)

    const add_logs = (text) => {
        var now = new Date()
        text = now.toLocaleTimeString('en-GB') + ": " + text
        const bot_logs = $("#bot-logs");
        !bot_logs.text() ? bot_logs.text(text) : bot_logs.text(bot_logs.text() + '\n' + text);
    }

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

        $(".bot-history-clear").on("click", function () {
            $("#bot-logs").text('')
        })

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
                        else if (botVolume.val() === "0") {
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

                tinhieu === "SHORT" ? $("#selStopOrderType").val("SOL") : $("#selStopOrderType").val("SOU")
                $("#soIndex").val(stopOrderValue)
            }, 200)
        }

        const stopOrder_PRO = (tinhieu, stopOrderValue) => {
            $("#select_condition_order_wrapper").click()
            setTimeout(() => {
                $("#select_order_type").children().eq(1).click()

                tinhieu === "SHORT" ? $("#right_selStopOrderType").val("SOL") : $("#right_selStopOrderType").val("SOU")
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
                //setTimeout(() => $("#acceptCreateOrder").click(), timer)
                setTimeout(() => $("#close_modal").click(), timer)

                timer += 100
                chuyenLenhThuong(timer)
            }
            else {
                chuyenLenhThuong_PRO()

                tinhieu === "SHORT"
                    ? setTimeout(() => $("#btn_short").click(), timer)
                    : setTimeout(() => $("#btn_long").click(), timer)

                timer += 400
                //setTimeout(() => $("#acceptCreateOrderNew").click(), timer)
                setTimeout(() => $("#close_modal").click(), timer)

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
                //setTimeout(() => $("#acceptCreateOrder").click(), timer)
                setTimeout(() => $("#close_modal").click(), timer)
            }
            else {
                stopOrder_PRO(tinhieu, stopOrderValue)

                timer += 300
                tinhieu === "SHORT"
                    ? setTimeout(() => $("#btn_short").click(), timer)
                    : setTimeout(() => $("#btn_long").click(), timer)

                timer += 400
                //setTimeout(() => $("#acceptCreateOrderNew").click(), timer)
                setTimeout(() => $("#close_modal").click(), timer)
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

        const getPreviousSignal = () => localStorage.getItem("previousSignal") ?? ""
        const setPreviousSignal = (signal) => localStorage.setItem("previousSignal", signal)

        const botAutoClick = (arr) => {
            let tinhieu
            var dadatTp1 = false
            var dadatTp2 = false

            if (arr[1] === "Tin hieu long: Manh") {
                tinhieu = "LONG"
            }
            else if (arr[1] === "Tin hieu short: Manh") {
                tinhieu = "SHORT"
            }

            if (getPreviousSignal() !== "" && getPreviousSignal() !== tinhieu) {
                const vithe = $("#status-danhmuc-content").children().eq(0).children().eq(1).text()
                add_logs("Đảo chiều chốt hết lệnh!!!")

                runBotNormal(tinhieu, "MTL", Math.abs(parseInt(vithe)))
                cancelAllOrder(1100)

                dadatTp1 = false
                dadatTp2 = false

                setPreviousSignal("")
            }
            else {
                setPreviousSignal(tinhieu)

                const giamua = convertFloatToFixed(arr[2])
                const fullHopdong = sohodong.val()
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
                    runBotNormal(tinhieu, giamua, fullHopdong)

                    tinhieu = tinhieu === "LONG" ? "SHORT" : "LONG"

                    let timer = 1100
                    setTimeout(() => runBotStopOrder(tinhieu, "MTL", fullHopdong, catLo), timer)

                    //25%
                    if (order50[0] > 0) {
                        timer += 1200
                        setTimeout(() => runBotNormal(tinhieu, tp1, order50[0]), timer)
                    }

                    if (order25[0] > 0){
                        timer += 1100
                        setTimeout(() => runBotNormal(tinhieu, tp2, order25[0]), timer)
                    }
                    
                    timer += 1100
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
        
        function fetchDataUpdates(offset) {
            const url = "https://api.telegram.org/telegrambottoken/getUpdates?offset=" + offset;
            fetch(url)
                .then((response) => response.json())
                .then((data) => {
                    if (data.result && data.result.length > 0) {
                        data.result.forEach(update => {
                            if (update.channel_post) {
                                console.log(update.channel_post.text.split("\n").map(line => line.trim()))

                                showTinHieu(update.channel_post.text.split("\n").map(line => line.trim()))
                                if (botAutoOrder.is(":checked")) {
                                    botAutoClick(update.channel_post.text.split("\n").map(line => line.trim()))
                                }
                            }
                        });
                        if (data.result.length > 1) {
                            //console.log(data.result[0].channel_post.text.split("\n").map(line => line.trim()))

                            showTinHieu(data.result[0].channel_post.text.split("\n").map(line => line.trim()))
                            //if (botAutoOrder.is(":checked")) {
                            //    botAutoClick(data.result[0].channel_post.text.split("\n").map(line => line.trim()))
                            //}
                        }

                        const latestUpdateId = data.result[data.result.length - 1].update_id;
                        fetchDataUpdates(latestUpdateId + 1);
                    }
                    else {
                        setTimeout(() => {
                            console.log("Tracking...");
                            fetchDataUpdates(offset);
                        }, 5000)
                    }
                })
                .catch((error) => {
                    console.error("Có lỗi xảy ra trong quá trình fetch:", error);
                    setTimeout(() => fetchDataUpdates(offset), 5000);
                });
        }
        fetchDataUpdates(0)

        $(".satbot-logout").on("click", () => {
            if (confirm("Nhấn Ok để xác nhận Hủy liên kết, No để trở lại")) {
                logout()
            }
        })
    }

    const logout = () => {
        const refresh_token = getCookie("auth_refresh_token");
        const json = JSON.stringify({ refresh_token })
        $.ajax({
            url: api_url + "/logout",
            method: "POST",
            data: json,
            contentType: 'application/json',
            success: () => {
                console.log("Logout success")
                setCookie("auth_token", "", -1)
                setCookie("auth_refresh_token", "", -1)
                add_logs("Đã đăng xuất, trang sẽ được tải lại")
                window.location.reload();
            },
            error: (e) => console.log(e)
        });
    }


    const refreshToken = () => {
        var refresh_token = getCookie("auth_refresh_token");
        const json = JSON.stringify({ refresh_token })

        $.ajax({
            url: api_url + "/refresh-token",
            method: "POST",
            data: json,
            contentType: 'application/json',
            success: (data) => {
                if (data.access_token && data.refresh_token) {
                    setCookie("auth_token", data.access_token, 5);
                    updateCookieValue("auth_refresh_token", data.access_token);
                }
            },
            error: (e) => console.log(e)
        });
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
                    url: api_url + "/login",
                    method: "POST",
                    data: json,
                    contentType: 'application/json',
                    success: (data) => {
                        if (data.access_token) {
                            setCookie("auth_token", data.access_token, 5);
                            setCookie("auth_refresh_token", data.refresh_token, 30 * 24 * 60);
                            loggingAndBot(data.name);
                        } else $statusElement.text(data.error).removeClass('alert-info').addClass('alert-danger')
                    },
                    error: (e) => $statusElement.text(e.responseText).removeClass('alert-info').addClass('alert-danger')
                });
            } catch (error) {
                $statusElement.text(error.message).removeClass('alert-info').addClass('alert-danger');
            }
        });
    }
})

//"#VN30F1M Ng?y 24/05/2024 9:00:00 SA Tu Dstock Robotchungkhoan.nududo.com
// Tin hieu long: Manh
// Gia mua: 1277.7
// Target 1: 1367.139
// Target 2: 1469.355
// Target 3: 1533.24
// Cat lo 3: 1188.261
//RSI: 51.20752
//MFI: 37.16677
//% Gia thay doi: -1.715388"


//    "#VN30F1M Ngay 30/05/2024 2:13:48 CH bot web",
//    "Tin hieu short: Manh",
//    "Gia mua: 1277.5",
//    "Target 1: 1273.7",
//    "Target 2: 1269.8",
//    "Target 3: 1263.4",
//    "Target 4: 1257.1",
//    "Cat lo : 1273.667"