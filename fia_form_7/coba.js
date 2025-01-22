let input = document.getElementById('password');
let icon = document.getElementById('icon');

function action() {
    if (input.type === 'password') {
        input.type = 'text';
        icon.src = 'asset/unhide.png'; 
    } else {
        input.type = 'password';
        icon.src = 'asset/hide.png'; 
    }
}
