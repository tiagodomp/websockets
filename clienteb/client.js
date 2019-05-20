const connection = new WebSocket('ws://localhost:8000'),
    box = document.getElementById('box'),
    msg = document.getElementById('msg');

connection.addEventListener('open', () => {
    console.log('connected');
});

connection.addEventListener('message', e =>{
    let p = document.createElement('p');
    p.textContent = e.data;
    box.appendChild(p);
});

function send(data){
    if(connection.readyState === WebSocket.OPEN){
        if(data){
            dados = 'cliente_B -> ' + data;
            connection.send(dados);
        }else{
            console.log('data:{} as '+ Date.now());
        }
    }else{
        throw 'Erro de conexão';
    }
}

msg.addEventListener('keydown', e => {
    let ke = e.which || e.keyCode;
    if(ke === 13){
        send(msg.value);
        msg.value = '';
    }
});