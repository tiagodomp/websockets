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
</head>

<body data-base-url="{!! URL::to('/') !!}">
    <div class="flex-center position-ref full-height">
        <div class="content">
            <div class="title m-b-md">
                WebSocket LojaHub
            </div>
            <a href="#" class="btn btn-success" id="like" data-token="abc123" data-name="otN">Enviar</a>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-1.11.1.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-toast-plugin/1.3.2/jquery.toast.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js"></script>

<script>
    $(function () {
        var socket  = io('http://localhost:8888/bling');
        var urlBase = $('body').data('base-url');
        var me      = 0;

        $('#like').click(function(event){
            event.preventDefault();
            var self = $(this);
            socket.emit("channelfixer", self.data("token"));

            console.log(socket);
            // Envio um AJAX para o Laravel
            $.ajax({
                url: urlBase + '/like',
                type: "POST",
                data: {
                    name    : self.data('name'),
                    id      : me
                },
                success: function(result){
                    console.log('Sucesso!');
                }
            });
        });

        // Recebe do Server
        socket.on('otN', function(data){
            console.log(data);
            me = data.id;
            //socket.emit('private message', 'eu', 'testando mensagem');
        });

        // Recebe do Server
        // socket.on('msg', function(data){
        //     console.log(data);
        //     me = data.id;
        //     //socket.emit('private message', 'eu', 'testando mensagem');
        // });

        /**
         * Recebe notificação de like
         */
        socket.on('like', function(response){
            $.toast({
                heading: 'Notificação do Bling',
                text: response.message,
                loader: true,
                hideAfter: 15000,
                loaderBg: '#000000',
                bgColor: '#ccc',
                textColor: 'black'
            });
        });
    });
</script>
</body>
</html>
