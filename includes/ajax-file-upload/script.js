 /* 
 * @author     Hardeep
 */
jQuery.fn.extend({
    ajaxFileUpload : function(opt)
    {
        return this.each(function()
        {
            var _section = $(opt.progressSection);
            var xhr = [];
            
            function attachEvents(ajax, i) 
            {
                ajax.upload.addEventListener("progress", function(e)
                {
                    var percent = Math.round((e.loaded / e.total) * 100);
                    _section.find("tr.file-tr-" + i).find(".progress-bar").css("width", percent + "%");
                    _section.find("tr.file-tr-" + i).find(".progress-bar .sr-only").html(percent + "%");
                    _section.find("tr.file-tr-" + i).find(".progress-status").html("Sent : " + niceBytes(e.loaded));
                    
                }, false);
                
                ajax.upload.addEventListener("error", function(e)
                {
                    console.log("Upload Failed");
                    console.log(e);
                }, false);
                
                ajax.upload.addEventListener("abort", function(e)
                {
                    console.log("Upload Aborted");
                    console.log(e);
                }, false);
                
                ajax.onreadystatechange = function() 
                {
                    if (ajax.readyState === 4) 
                    {
                        _section.find("tr.file-tr-" + i).find(".server-status").html(ajax.responseText);
                    }
                }
            }

            $(this).bind("change", function ()
            {
                var files = $(this).prop("files");
                
                var html = '<table class="progress-bar-block">';
                        html += '<thead>';
                            html += '<tr>';
                                html += '<th>#</th>';
                                html += '<th>File</th>';
                                html += '<th>Total Size</th>';
                                html += '<th>Progress</th>';
                                html += '<th>Status</th>';
                            html += '</tr>';
                        html += '</thead>';
                        
                html += '<tbody>';
                for (var i = 0; i < files.length; i++)
                {
                    var file = files[i]; 
                    console.log(file);
                    
                    html += '<tr class="file-tr-' + i + '">';
                        html += '<td>';
                            html += (i + 1) + ' <span class="abort" data-xhr-index="' + i + '"><i class="fas fa-times-circle"></i></span>';
                        html += '</td>';
                        html += '<td>' + file.name + '</td>';
                        html += '<td>' + niceBytes(file.size) + '</td>';
                        html += '<td>';
                            html += '<div class="progress">';
                                html += '<div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100" style="width:0%">';
                                    html += '<span class="sr-only">0% Complete</span>'
                                html += '</div>';                                
                            html += '</div>';
                            html += '<div class="progress-status"></div>';
                        html += '</td>';
                        html += '<td class="server-status"></td>';
                    html += '</tr>';
                }
                
                html += '</tbody>';
                html += "</table>";
                
                _section.html(html);
                
                _section.find(".abort").click(function()
                {
                    var i = $(this).attr("data-xhr-index");
                    xhr[i].abort();
                    $(this).closest("tr").remove();
                });
                
                for (var i = 0; i < files.length; i++)
                {
                    var file = files[i]; 
                    
                    var ajax = new XMLHttpRequest();
                    attachEvents(ajax, i);
                    ajax.open("POST", "upload.php");
                    
                    var formdata = new FormData();
                    formdata.append("file", file);
                    ajax.send(formdata);
                    xhr.push(ajax);
                }
            });
            
        });
    },
});