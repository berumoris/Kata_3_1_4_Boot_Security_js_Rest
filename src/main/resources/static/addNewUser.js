
function addNewUser() {

    let roles = window.newUserForm.role;

    let arrayRoles = [];
    let j = 0;
    for (let i = 0; i < roles.length; i++) {
        if (roles.options[i].selected == true) {
            let ob = {nameRole : roles.options[i].value};
            arrayRoles[j++] = ob;
        }
    }

    fetch("http://localhost:8080/addNewUser", {
        method : "POST",
        body : JSON.stringify({
            name : window.newUserForm.name.value,
            lastName : window.newUserForm.lastName.value,
            age : window.newUserForm.age.value,
            email : window.newUserForm.email.value,
            password : window.newUserForm.password.value,
            enabled : window.newUserForm.enabled.value,
            roles : arrayRoles
        }),
        headers : {"Content-type": "application/json; charset=UTF-8"}
    })
        .then(response => response.json())
        .then(user => {
            let roles = "";
            user.roles.forEach(role => roles += role.nameRole.substr(5) + ' ')
            $('#tableAllUsers tr:last').after(`<tr id = ${"row" + user.id} >
                        <td id="id">${user.id}</td>
                        <td id="name">${user.name}</td>
                        <td id="lastName">${user.lastName}</td>
                        <td id="age">${user.age}</td>
                        <td id="email">${user.email}</td>
                        <td id="enabled">${user.enabled}</td>
                        <td id="roles">${roles}</td>
                        <td><button type="button" class="btn btn-outline-info bg-info text-white" onclick="getModalEdit(${user.id})">Edit</button></td>
                        <td><button type="button" class="btn btn-outline-danger bg-danger text-white" onclick="getModalDelete(${user.id})">Delete</button></td>
                        </tr>`);

            window.newUserForm.name.value = "";
            window.newUserForm.lastName.value = "";
            window.newUserForm.age.value = "";
            window.newUserForm.email.value = "";
            window.newUserForm.password.value = "";
            window.newUserForm.enabled.value = "";
            document.getElementById("tableAllUsersButton").click();
        }).catch(function(err) {
        alert("User with this email is already registered");
    })


}