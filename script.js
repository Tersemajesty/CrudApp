let users = [];
let editingUserId = null;

function addUser() {
    const tbody = document.getElementById('userTableBody');
    tbody.innerHTML = ''; 

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <button onclick="editUser(${user.id})">Edit</button>
                <button onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

document.getElementById('UserForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const submitBtn = document.getElementById('submitBtn'); 
    submitBtn.disabled = true; 
    submitBtn.textContent = editingUserId ? 'Updating...' : 'Adding...'; 

    setTimeout(() => {
        if (editingUserId) {
            const userIndex = users.findIndex(user => user.id === editingUserId);
            users[userIndex] = { id: editingUserId, name, email };
            editingUserId = null; 
        } else {
            const id = Date.now(); 
            users.push({ id, name, email });
        }

        addUser(); 
        this.reset(); 
        submitBtn.disabled = false; 
        submitBtn.textContent = 'Add User'; 
    }, 1000); 
});

function editUser(id) {
    id = Number(id);
    const user = users.find(user => user.id === id);
    if (!user) {
        alert('User not found!');
        return;
    }

    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;

    editingUserId = id;
    document.getElementById('submitBtn').textContent = 'Update User';
}

function deleteUser(id) {
    id = Number(id); 
    users = users.filter(user => user.id !== id);
    addUser(); 
}
