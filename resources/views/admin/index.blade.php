<!DOCTYPE html>
<html lang="{{ app()->getLocale() }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">

    <link rel="stylesheet" href="{{ mix('/css/app.css') }}">

    <title>{{ env('APP_NAME') }}</title>
</head>
<body>
    <div id="app">
    </div><!-- end #app -->

    <script src="{{ mix('/js/app.js') }}"></script>
</body>
</html>
