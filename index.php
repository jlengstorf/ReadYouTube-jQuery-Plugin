<!DOCTYPE html>

<html lang="en">

<head>
    <meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
    <title>  Ennui Design &raquo; An Ongoing Experiment in PHP, jQuery, and Extreme Caffeination</title>
    <meta name="description" content="New Ennui Design site." />

<!-- CSS File Includes 
    <link rel="stylesheet" type="text/css" media="screen,projection"
          href="/assets/css/default.css" />
-->
    <style type="text/css">
        object {
            width: 360px;
            height: 240px;
        }
    </style>
</head>

<body>

    <div id="feed-test">

        <p>Loading...</p>

    </div><!-- end #footer-wrap -->

    <!-- Load jQuery and jQuery UI -->
    <script type="text/javascript"
            src="http://www.google.com/jsapi"></script>
    <script type="text/javascript">
        google.load("jquery", "1");
        google.load("jqueryui", "1");
    </script>

    <!-- jQuery Plugins -->
    <script type="text/javascript"
            src="assets/js/jquery.ennui.readyoutube-0.1.js"></script>

    <!-- Initialization -->
    <script type="text/javascript">
        $("#feed-test")
            .readYouTube({
                    "display" : 1,
                    "feed" : "http://gdata.youtube.com/feeds/base/users/RomanFitnessSystems/uploads?alt=json-in-script&format=5&callback=handleResponse",
                    "output" : "<li>{obj}</li>",
                    "random" : true,
                    "videoParams" : { "hd" : 1, "fs" : 1 }
                });
    </script>

</body>

</html>
