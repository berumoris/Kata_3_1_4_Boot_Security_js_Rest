getAuthorizedUserInfo();

function getAuthorizedUserInfo() {
    fetch("http://localhost:8080/getAuthorizedUserInfo").
    then(response => response.json()).
    then(user => {
        let email = user.email;
        document.getElementById("navUserEmail").innerHTML = email;
        let roles = "";
        user.roles.forEach(role => roles += role.nameRole.substr(5) + ' ');
        document.getElementById("navUserRoles").innerHTML = roles;

        if (roles.includes("ADMIN")) {
            let generateWorkSpace =
                `<div class="row vh-100">
                    <div  class="col-2 px-0">
                        <ul id="tab_list" class="nav nav-pills flex-column px-0 py-2">
                            <li class="nav-item">
                                <a id="admin_tab" class="nav-link pl-3 active" data-toggle="tab" href="#admin_panel">Admin</a>
                            </li>
                            <li class="nav-item">
                                <a id="user_tab" class="nav-link pl-3" data-toggle="tab" href="#user_panel">User</a>
                            </li>
                        </ul>
                    </div>
            
                    <div class="tab-content col-10 bg-light text-left">
            
                        <div id="admin_panel" class="tab-pane fade show active">
                            <h1 class="m-3">Admin panel</h1>
                            <ul class="nav nav-tabs">
                                <li class="nav-item">
                                    <a id="tableAllUsersButton" class="nav-link active" data-toggle="tab" href="#tableAllUsers">Users table</a>
                                </li>
                                <li class="nav-item" href="#newUser">
                                    <a class="nav-link" data-toggle="tab" href="#newUser">New User</a>
                                </li>
                            </ul>
                            <div class="tab-content border rounded">
                                <div id="tableAllUsers" class="tab-pane fade show active">
                                <div class="border-bottom">
                                    <h3 style="text-align: left; margin: 1%">All users</h3>
                                </div>
                                <div style="margin: 1%">
                                    <table id="tableAllUsers" class="table bg-white table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Age</th>
                                                <th>Email</th>
                                                <th>Enabled</th>
                                                <th>Role</th>
                                                <th>Edit</th>
                                                <th>Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody id="admin_info"></tbody>
                                    </table>
                                </div>
                            </div>
                            
                                <div id="newUser" class="tab-pane fade">
                                    <div class="bg-light border-bottom">
                                        <h3 style="text-align: left; margin: 1%">Add new user</h3>
                                    </div>
                                    <div class="bg-white">
                                        <form id="newUserForm">
                                            <div class="container_fluid">
                                                <div class="row justify-content-center">
                                                    <div class="col col-sm-5 text-center">
            
                                                        <br>
                                                        <label for="name" class="font-weight-bold">First name</label>
                                                        <input type="text"
                                                               class="form-control"
                                                               id="name">
                                                        <br>
            
                                                        <label for="lastName" class="font-weight-bold">Last name</label>
                                                        <input type="text"
                                                               class="form-control"
                                                               id="lastName">
                                                        <br>
            
                                                        <label for="age" class="font-weight-bold">Age</label>
                                                        <input type="text"
                                                               class="form-control"
                                                               id="age">
                                                        <br>
                                                        
                                                        <label for="email" class="font-weight-bold">Email</label>
                                                        <input type="email" class="form-control" id="email">
                                                        <br>
            
                                                        <label for="password" class="font-weight-bold">Password</label>
                                                        <input type="text"
                                                               class="form-control"
                                                               id="password">
                                                        <br>
            
                                                        <label for="enabled" class="font-weight-bold">Enabled</label>
                                                        <select class="form-control" id="enabled">
                                                            <option value="false">False</option>
                                                            <option value="true">True</option>
                                                        </select>
                                                        <br>
            
                                                        <label class="font-weight-bold">Role</label>
                                                        <select multiple
                                                                size="2"
                                                                aria-multiselectable="true"
                                                                class="form-control"
                                                                id="role">
                                                            <option value="ROLE_USER" selected>USER</option>
                                                            <option value="ROLE_ADMIN">ADMIN</option>
                                                        </select>
                                                        <br>
            
                                                        <p class="btn btn-outline-success bg-success text-white"
                                                                onclick="addNewUser()">
                                                            Add new user
                                                        </p>
                                                        <br><br>
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
            
                        <div id="user_panel" class="tab-pane fade">
                            <h1 class="m-3">User information-page</h1>
                            <div class="tab-pane fade show active border rounded">
                                <div class="border-bottom">
                                    <h3 style="text-align: left; margin: 1%">About user</h3>
                                </div>
                                <div style="margin: 1%">
                                    <table class="table bg-white table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Age</th>
                                                <th>Email</th>
                                                <th>Enabled</th>
                                                <th>Role</th>
                                            </tr>
                                        </thead>
                                        <tbody id="user_info"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
            
                    </div>
                </div>`;
            document.getElementById("generateWorkSpace").innerHTML = generateWorkSpace;
        } else {
            let generateWorkSpace =
                `<div class="row vh-100">
            <!--    Левое меню-->
                    <div  class="col-2 px-0">
                        <ul id="tab_list" class="nav nav-pills flex-column px-0 py-2">
                            <li class="nav-item">
                                <a id="user_tab" class="nav-link pl-3 active" data-toggle="tab" href="#user_panel">User</a>
                            </li>
                        </ul>
                    </div>
            
                    <div class="tab-content col-10 bg-light text-left">
            
                        <div id="user_panel" class="tab-pane fade show active">
                            <h1 class="m-3">User information-page</h1>
                            <div class="tab-pane fade show active border rounded">
                                <div class="border-bottom">
                                    <h3 style="text-align: left; margin: 1%">About user</h3>
                                </div>
                                <div style="margin: 1%">
                                    <table class="table bg-white table-striped">
                                        <thead>
                                            <tr>
                                                <th>ID</th>
                                                <th>First Name</th>
                                                <th>Last Name</th>
                                                <th>Age</th>
                                                <th>Email</th>
                                                <th>Enabled</th>
                                                <th>Role</th>
                                            </tr>
                                        </thead>
                                        <tbody id="user_info"></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
            
                    </div>
                </div>`;
            document.getElementById("generateWorkSpace").innerHTML = generateWorkSpace;
        }

        let tableBodyUserInfo = document.getElementById("user_info");
        tableBodyUserInfo.innerHTML = "";
        let row = tableBodyUserInfo.insertRow();
        row.setAttribute("id", "rowUserInfo");
        let cell0 = row.insertCell();
        cell0.setAttribute("id", "id");
        cell0.innerHTML = user.id;
        let cell2 = row.insertCell();
        cell2.setAttribute("id", "name");
        cell2.innerHTML = user.name;
        let cell3 = row.insertCell();
        cell3.setAttribute("id", "lastName");
        cell3.innerHTML = user.lastName;
        let cell4 = row.insertCell();
        cell4.setAttribute("id", "age");
        cell4.innerHTML = user.age;
        let cell1 = row.insertCell();
        cell1.setAttribute("id", "email");
        cell1.innerHTML = user.email;
        let cell5 = row.insertCell();
        cell5.setAttribute("id", "enabled");
        cell5.innerHTML = user.enabled;
        let cell6 = row.insertCell();
        cell6.setAttribute("id", "roles");
        cell6.innerHTML = roles;

        if (roles.includes("ADMIN")) {
            let tableBodyAdminInfo = document.getElementById("admin_info");
            tableBodyAdminInfo.innerHTML = "";

            fetch("http://localhost:8080/getAllUsersInfo").then(response => response.json()).then(users => users.forEach(user => {
                    let row = tableBodyAdminInfo.insertRow();
                    row.setAttribute("id", "row" + user.id);
                    let cell0 = row.insertCell();
                    cell0.setAttribute("id", "id");
                    cell0.innerHTML = user.id;
                    let cell2 = row.insertCell();
                    cell2.setAttribute("id", "name");
                    cell2.innerHTML = user.name;
                    let cell3 = row.insertCell();
                    cell3.setAttribute("id", "lastName");
                    cell3.innerHTML = user.lastName;
                    let cell4 = row.insertCell();
                    cell4.setAttribute("id", "age");
                    cell4.innerHTML = user.age;
                    let cell1 = row.insertCell();
                    cell1.setAttribute("id", "email");
                    cell1.innerHTML = user.email;
                    let cell5 = row.insertCell();
                    cell5.setAttribute("id", "enabled");
                    cell5.innerHTML = user.enabled;
                    let cell6 = row.insertCell();
                    cell6.setAttribute("id", "roles");
                    let roles = "";
                    user.roles.forEach(role => roles += role.nameRole.substr(5) + ' ');
                    cell6.innerHTML = roles;
                    let cell7 = row.insertCell(7);
                    cell7.innerHTML = `<button type="button" class="btn btn-outline-info bg-info text-white" onclick="getModalEdit(${user.id})">Edit</button>`;
                    let cell8 = row.insertCell(8);
                    cell8.innerHTML = `<button type="button" class="btn btn-outline-danger bg-danger text-white" onclick="getModalDelete(${user.id})">Delete</button>`;
                })
            );
        }
    });
}