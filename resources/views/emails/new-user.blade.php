<!DOCTYPE html>
<html>

<head>
    <title>Health Links systems login</title>
</head>

<body>
    <h1>{{ $details['title'] }}</h1>
    <p>Login url : {{ route('login') }}</p>
    <p>Your mail is : {{ $details['mail'] }}</p>
    <p>Your password is : {{ $details['password'] }}</p>
    <p>Thank you</p>
</body>

</html>
