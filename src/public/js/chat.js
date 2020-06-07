const socket = io();

// Elements
const $messageForm = document.getElementById('messageForm');
const $messageFormInput = document.getElementById('message');
const $messageFormBtn = document.querySelector('#locationBtn');
const $locationBtn = document.querySelector('#locationBtn');
const $messages = document.querySelector('#messages');

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML;
const locationTemplate = document.querySelector('#location-template').innerHTML;
const sidebarTemplate = document.querySelector('#sidebar-template').innerHTML;

// Options
const { username, room } = Qs.parse(location.search, { ignoreQueryPrefix: true});

const event = socket.on('message', (message) => {    
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

const locationEvent = socket.on('locationMessage', (message) => {
    const html = Mustache.render(locationTemplate, {
        username: message.username,
        url: message.url,
        createdAt: moment(message.createdAt).format('h:mm a')
    });
    $messages.insertAdjacentHTML('beforeend', html);
});

socket.on('roomData', ({room, users}) => {
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    });
    document.querySelector('#sidebar').innerHTML = html;
});

$messageForm.addEventListener('submit', e => {
    e.preventDefault();
    $messageFormBtn.setAttribute('disabled', 'disabled');
    $messageForm.disable;
    const text = $messageFormInput.value;
    socket.emit('sendMessage', text, (error) => {
        $messageFormBtn.removeAttribute('disabled');
        $messageFormInput.value = '';
        $messageFormInput.focus();
        if (error) {
            return console.log(error);            
        }      
        console.log('Message delivered');        
    });
});

$locationBtn.addEventListener('click', e => {
    // Old browsers might not support it
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported by your browser');
    }

    $locationBtn.setAttribute('disabled', 'disabled');

    navigator.geolocation.getCurrentPosition( (position) => {        
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            $locationBtn.removeAttribute('disabled');
            console.log('Server acknowledged the location');            
        });         
    });
});

socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error);
        location.href = '/';
    }
});