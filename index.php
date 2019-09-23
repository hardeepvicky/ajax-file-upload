<html>
    <head>
        <link rel="stylesheet" type="text/css" href="includes/fontawesome/css/all.min.css">
        <link rel="stylesheet" type="text/css" href="includes/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="includes/ajax-file-upload/style.css">
    </head>
    <body>
        <h2>HTML5 File Upload Progress Bar Tutorial</h2>
        <form id="upload_form" enctype="multipart/form-data" method="post">
            <input type="file" name="file1" id="file1" onchange="uploadFile()" multiple="multiple"><br>    
        </form>

        <div id="upload-progress-section"></div>
    </body>

    <script src="includes/jquery.min.js"></script>
    <script src="includes/bootstrap/js/bootstrap.min.js"></script>
    <script src="includes/ajax-file-upload/script.js"></script>
    <script type="text/javascript">
        function niceBytes(bytes, i)
        {
            var list = ["B", "KB", "MB", "GB", "TB"];
            
            if (typeof i == "undefined")
            {
                i = 0;
            }
            
            var temp  = bytes / 1024;
            
            if (temp > 1024)
            {
                return niceBytes(temp, i + 1);
            }
            
            if (temp < 1)
            {
                return bytes.toFixed(1) + " " + list[i];
            }
            else
            {
                return temp.toFixed(1) + " " + list[i + 1];
            }
        }
        $("#file1").ajaxFileUpload({
            progressSection : "#upload-progress-section"
        });
    </script>

</html>