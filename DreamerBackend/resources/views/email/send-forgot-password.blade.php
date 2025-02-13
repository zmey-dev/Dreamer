<!DOCTYPE html>
<html lang="en">
<head>
    <title>Email</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1 user-scalable=yes">
    <!--style>
        /*table,
        th,
        td {
            border: 1px solid black;
            border-collapse: collapse;
        }
        th,
        td {
            padding: 5px;
            text-align: left;
        }*/
    </style-->
</head>
<body>    
    @if (isset($details) && !empty($details))
        Hello {{ $details['to_name']??'TestUser' }}, 
        <p>{{ $details['body']??'Sample Test Message From Admin...!' }}</p> 
        <a href="{{ $details['reset_password_link'] }}" target="__blank">Reset Password</a>
        <br>
    @else
        <p>Test Mail Received...!</p>    
    @endif
    <b>Thank You</b>
</body>
</html>