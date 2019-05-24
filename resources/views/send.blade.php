<!doctype html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>Laravel</title>

    <!-- Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Raleway:100,600" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.min.css">

    <!-- Styles -->
    <style>
        html, body {
            background-color: #fff;
            color: #636b6f;
            font-family: 'Raleway', sans-serif;
            font-weight: 100;
            height: 100vh;
            margin: 0;
        }

        .full-height {
            height: 100vh;
        }

        .flex-center {
            align-items: center;
            display: flex;
            justify-content: center;
        }

        .position-ref {
            position: relative;
        }

        .top-right {
            position: absolute;
            right: 10px;
            top: 18px;
        }

        .content {
            text-align: center;
        }

        .title {
            font-size: 84px;
        }

        .links{
            color: #000;
            margin: 25px auto;
            font-size: 18px;
            font-weight: 300;
            letter-spacing: .1rem;
            text-decoration: none;
            text-transform: uppercase;
            font-family: 'Courier New', Courier, monospace;
            width: 50%;
        }

        .m-b-md {
            margin-bottom: 30px;
        }

        .btn{
            text-decoration: none;
            padding: 10px 30px;
            background-color: cadetblue;
            color: #FFF;
        }
    </style>

    <style>
        #box{
            width: 500px;
            height: 200px;
            overflow-x: auto;
            border: 2px solid gray;
            font-family: monospace;
            align-content: flex-start;
        }
    </style>
</head>

<body data-base-url="{!! URL::to('/') !!}">
    <div id="box"></div>
    <input type="text" id="msg">

<script>
    const connection = new WebSocket('ws://localhost:8001'),
    box = document.getElementById('box'),
    msg = document.getElementById('msg');

    connection.addEventListener('open', () => {
        console.log('conectado');
    });

    connection.addEventListener('message', e => {
        let p = document.createElement('p');
        p.textContent = e.data;
        box.appendChild(p);
    });

    function send(data) {
        if (connection.readyState === WebSocket.OPEN) {
            if (data) {
                dados = 'cliente_A -> ' + data;
                connection.send(dados);
            } else {
                console.log('data:{} as ' + Date.now());
            }
        } else {
            throw 'Erro de conexão';
        }
    }

    msg.addEventListener('keydown', e => {
        let ke = e.which || e.keyCode;

        if (ke === 13) {
            send(msg.value);
            msg.value = '';
        }
    });
</script>
</body>
</html>
