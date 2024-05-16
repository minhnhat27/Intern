setTimeout(() => {
    function setCookie(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
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
        return "";
    }

    const t = document.querySelector("div#orderPS.tab-pane.active")
    //const t = document.getElementById("divLogin")

    const root = document.createElement("div");
    root.innerHTML = `
    <div id="ext-content" class="list-group-item list-group-item-accent-primary m-0 p-1">
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
                <a href="https://localhost:7039/" target="_blank" title="Đăng ký tài khoản mới">
                    Chưa có tài khoản? Đăng ký tại đây
                </a>
            </div>
            <div class="form-group mb-1">
                <a href="/https://localhost:7039/" target="_blank" title="Quên mật khẩu? Click vào đây">
                    Quên mật khẩu?
                </a>
            </div>
        </div>
    </div>`
    t.append(root)

    const loggingHtml = `
        <div id="ext-content" class="m-0 p-1">
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
     </div>
    `

    function logging() {
        root.innerHTML = ''
        root.innerHTML = loggingHtml
        const bot_logs = document.getElementById("bot-logs");

        var now = new Date()
        bot_logs.innerHTML += now.toLocaleTimeString('en-GB') + ": Khởi động hệ thống";

        const logout = document.getElementsByClassName("satbot-logout").item(0);
        logout.onclick = function() {
            confirm("Nhấn Ok để xác nhận Hủy liên kết, No để trở lại")
            setCookie("auth_token", "", -1)
            window.location.reload()
        }
    }

    const loggedIn = getCookie("auth_token");
    if (loggedIn !== "") {
        logging()
    }

    const showPasswordCheckbox = document.getElementById('cb_showPassword');
    showPasswordCheckbox.addEventListener('change', (event) => {
        const showPassword = event.target.checked;
        const passwordInput = document.getElementById('cb_password');
        passwordInput.type = showPassword ? 'text' : 'password';
    });
    const loginButton = document.getElementById('cb_login');

    loginButton.addEventListener('click', (event) => {
        const statusElement = document.getElementById('cb_loginStatus');

        try {
            statusElement.textContent = "";
            statusElement.classList.remove('alert-danger', 'alert-info');

            // Get username and password values
            const username = document.getElementById('cb_username').value;
            if (!username) {
                throw new Error("Vui lòng nhập tên đăng nhập");
            }
            const password = document.getElementById('cb_password').value;
            if (!password) {
                throw new Error("Mật khẩu không được để trống");
            }

            //const authInfo = getAuthInfo();
            const jsonData = JSON.stringify({ username, password });

            // Login data post using Fetch API
            const url = "https://localhost:7043/api/auth/login";
            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: jsonData,
            })
                .then(response => response?.json())
                .then(data => {
                    console.log(data);
                    if (data.jwt) {
                        const d = "Bearer " + data.jwt
                        setCookie("auth_token", d, 0.5)
                        logging()
                    }
                    else
                    {
                        statusElement.textContent = data;
                        statusElement.classList.remove('alert-info');
                        statusElement.classList.add('alert-danger');
                    }
                })
                .catch(error => {
                    statusElement.textContent = `Đã có lỗi khi đăng nhập: ${error.message}`;
                    statusElement.classList.remove('alert-info');
                    statusElement.classList.add('alert-danger');
                });
        } catch (error) {
            statusElement.textContent = error.message;
            statusElement.classList.remove('alert-info');
            statusElement.classList.add('alert-danger');
        }
    });
}, 500)


// $(document).ready(() => {

//     var scripts = [
//         "https://chobot.vn/assets/js/plugins/bootstrap-table.min.js",
//         "https://chobot.vn/dist/satbot.vps.min.js?v=231113",
//     ];


//     function getAllScripts(args) {
//         return args.reduce(function(promise, item) {
//             return promise.then(function() {
//                 return $.getScript(item);
//             });
//         }, Promise.resolve(true));
//     }

//     getAllScripts(scripts)
//         .then(function() {
//             chobotWait();
//         });

//     const chobotWait = () => {
//         if (typeof(chobot) == 'undefined') {
//             setTimeout(chobotWait, 1000);
//         } else {
//             var isDemo = window.location.href.includes("smarteasy.vps.com.vn");
//             var config = {
//                 apiUrl: "//chobot.vn/satbot/3.0/vps/api",
//             };

//             var bot = window.autobot = isDemo ? new chobot.SmartEasyAutobot(config) : new chobot.SmartProAutobot(config);
//             bot.init();
//         }
//     };


//     $(document).on("click", ".bot-history-clear", (e) => {
//         $("#bot-logs").text("");
//     });

//     $(document).on("click", ".bot-signal-refresh", (e) => {
//         autobot && autobot.doReloadSignals();
//     });

// });

