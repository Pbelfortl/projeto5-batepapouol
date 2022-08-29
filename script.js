let nome;

function showContacts () {
    contacts = document.querySelector('.contacts');
    closeButton = document.querySelector('.closeContacts');

    contacts.classList.toggle('show');
    closeButton.classList.toggle('show');
}

function enter () {
    nome = document.querySelector('.loginName').value;
    enterScreen = document.querySelector('.loginScreen');
    enterScreen.classList.add('hide');
    userRegist();
    setInterval(getParticipants, 15000);
    setInterval(catchMessages, 3000)
}

function userRegist () {
    
    const userName = {name: nome};
    const request = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', userName);

    request.then(setInterval(keepConection,5000));
    request.catch(erro400);
}

function keepConection () {
    const userName = {name: nome};
    const request = axios.post('https://mock-api.driven.com.br/api/v6/uol/status', userName);

    request.then();
    request.catch();
}

function erro400 () {
  alert("Este nome já está em uso");
  enterScreen.classList.remove('hide');
}



function catchMessages () {

    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');

    promise.then(displayMessages);
    promise.catch(messagesError);

}

function messagesError () {
    alert('Erro ao buscar mensagens!');
}

function displayMessages (response) {

    let msgArr = response.data;

    let insertMsg = document.querySelector('.chatBox');
    insertMsg.innerHTML = '';

    for(let i = 0; i<msgArr.length; i++){
        insertMsg.innerHTML += `<div class="messageBox ${msgArr[i].type}">(${msgArr[i].time})&nbsp;<strong>${msgArr[i].from}</strong> &nbsp; para &nbsp; <strong>${msgArr[i].to}:</strong> &nbsp; ${msgArr[i].text}</div>`
        insertMsg.lastChild.scrollIntoView();
    }
}

function sendMessage() {

    const textMessage = document.querySelector('.typeMessage').value;

    const message = {
        from: nome,
        to: 'todos',
        text: textMessage,
        type: 'message'
    };

    const promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', message);

    promise.then(catchMessages);
    promise.catch(console.log('ocorreu um erro'));
    document.querySelector('.typeMessage').value = "";
}

function getParticipants () {

    const promise = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants');

    promise.then(showParticipants);
    promise.catch(console.log('não foi posível obter os participantes!'));
}

function showParticipants (response) {

    const participantsArr = response.data;
    const showParticipants = document.querySelector('.participants');

    for (i=0; i<participantsArr; i++) {
        showParticipants.innerHTML += `<div class="onlinePart">${participantsArr[i].name}</div>`
    }
}