const socket = io.connect("https://linktoqr-fz8x.onrender.com")

const text = document.getElementById('text');
const sub = document.getElementById('sub');
const img = document.getElementById('qrImage');

function removeSpaces(str) {
    return str.replace(/\s+/g, '');
}

sub.addEventListener('click', function(event) {
    event.preventDefault();

    let res = removeSpaces(text.value);
    if (res == '') {
        alert('Please enter a valid URL.')
    } else {
        console.log('+')
        socket.emit('QR', {content: text.value})
    }
})

socket.on('QRResponse', (data) => {
    if (data.error) {
        console.error(data.error);
        alert(data.error);
    } else {
        img.src = data.content;
    }
});
