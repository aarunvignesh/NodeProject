require(
    [
    "jquery"
    , "paper"
    , "backbone"
    , "drawTool"
    , "text!HTML/Sample.html"
    ,"text!HTML/Main.html"
    , "text!HTML/Form.html"
    , "text!HTML/Xslt.html"
    , "text!HTML/Login.html"
    ,  "text!HTML/Chat.html"
    , "bootstrap"
    , "less"
    , "offline"
    , "game"
    , "xslt"
    , "jqueryxslt"
    ,"socket"
    ,"resize"
    ],
    function ($, paper, Backbone, draw, Sample, Canvashtml, Form,Xslt,Login,Chat, bootstrap, less, offline, game,xslt,jqueryxslt,socket,resize) {
    document.io=socket();
    routeCreate = Backbone.Router.extend({
        routes: {
            '':"chatView"
        },
        chatView:function(){
            chat.render();
        }
    });
        var fillSmiley=function(msg){
            if(msg.indexOf(':)')>-1){
                msg= msg.replace(':)',"<img src='../smileys/gentle laugh.png' style='height:50px;'/>");
            }
            else if(msg.indexOf(':(')>-1){
                msg=msg.replace(':(',"<img src='../smileys/cry.png' style='height:50px;'/>");
            }
            else if(msg.indexOf(':D')>-1){
                msg=msg.replace(':D',"<img src='../smileys/rofl.png' style='height:50px;'/>");
            }
            else if(msg.indexOf(':P')>-1){
                msg=msg.replace(':P',"<img src='../smiley2.png' style='height:50px;'/>");
            }

            if(msg.indexOf(';)')>-1){
                msg= msg.replace(';)',"<img src='../smileys/wink smile.png' style='height:50px;'/>");
            }
            else if(msg.indexOf('=-o')>-1){
                msg=msg.replace('=-o',"<img src='../smileys/stare.png' style='height:50px;'/>");
            }
            else if(msg.indexOf(':*')>-1){
                msg=msg.replace(':*',"<img src='../smileys/kiss.png' style='height:50px;'/>");
            }
            else if(msg.indexOf('8)')>-1){
                msg=msg.replace('8)',"<img src='../smileys/glass smile.png' style='height:50px;'/>");
            }
            else if(msg.indexOf(':]')>-1){
                msg=msg.replace(':]',"<img src='../smileys/smile3.png' style='height:50px;'/>");
            }
            else if(msg.indexOf(':--/')>-1){
                msg=msg.replace(':--/',"<img src='../smileys/smile2.png' style='height:50px;'/>");
            }
            else if(msg.indexOf('o:-)')>-1){
                msg=msg.replace('o:-)',"<img src='../smileys/angelring.png' style='height:50px;'/>");
            }
            if(msg.indexOf('|o')>-1){
                msg= msg.replace('|o',"<img src='../smileys/sleep.png' style='height:50px;'/>");
            }
            else if(msg.indexOf(':-(')>-1){
                msg=msg.replace(':-(',"<img src='../smileys/know Laugh.png' style='height:50px;'/>");
            }
            else if(msg.indexOf('8-)')>-1){
                msg=msg.replace('8-)',"<img src='../smileys/glass smile 2.png' style='height:50px;'/>");
            }
            else if(msg.indexOf(':X')>-1){
                msg=msg.replace(':X',"<img src='../smileys/shut.png' style='height:50px;'/>");
            }
            else if(msg.indexOf(':S)')>-1){
                msg=msg.replace(':S)',"<img src='../smileys/success.png' style='height:50px;'/>");
            }
            else if(msg.indexOf('3-)')>-1){
                msg=msg.replace('3-)',"<img src='../smileys/dream.png' style='height:50px;'/>");
            }
            else if(msg.indexOf('!:|')>-1){
                msg=msg.replace('!:|',"<img src='../smileys/idea.png' style='height:50px;'/>");
            }
            else if(msg.indexOf(':K')>-1){
                msg=msg.replace(':K',"<img src='../smileys/giggle.png' style='height:50px;'/>");
            }
            else if(msg.indexOf('3:-]')>-1){
                msg=msg.replace('3:-]',"<img src='../smileys/dontknow.png' style='height:50px;'/>");
            }

            else if(msg.indexOf(':}')>-1){
                msg=msg.replace(':}',"<img src='../smileys/think.png' style='height:50px;'/>");
            }
            else if(msg.indexOf(':{')>-1){
                msg=msg.replace(':{',"<img src='../smileys/think1.png' style='height:50px;'/>");
            }
            if(msg.indexOf(':)')>-1 || msg.indexOf(':(')>-1 || msg.indexOf(':D')>-1 || msg.indexOf(':P')>-1 || msg.indexOf(';)')>-1 || msg.indexOf('=-o')>-1 || msg.indexOf(':*')>-1 || msg.indexOf('8)' ||  msg.indexOf(':]')>-1 || msg.indexOf(':--/')>-1  || msg.indexOf('o:-)')>-1 || msg.indexOf('|o')>-1 || msg.indexOf(':-(')>-1 || msg.indexOf('8-)')>-1 || msg.indexOf(':X')>-1  || msg.indexOf(':S)')>-1 || msg.indexOf('3-)')>-1 || msg.indexOf('!:|')>-1 ||  msg.indexOf(':K')>-1 || msg.indexOf('3:-]')>-1)>-1 ||  msg.indexOf(':}')>-1 || msg.indexOf(':{')>-1){
                fillSmiley(msg)
            }
            else{
                fillSmiley.msg=msg;
            }
        }
    var chatView = Backbone.View.extend({
        el: null,
        template: _.template(Chat),

        initialize: function () {
            this.render();
            document.io.emit("loginChat",{username:$("#username").text(),id:$("#userId").text(),loginTime:$("#loginTime").text()});
            document.io.on("chatMsg",function(msg){
                var chatDiv=$("#chatMsg");
               // if(chatDiv.length>0){
                chatDiv.append(msg);
                chatDiv[0].scrollTop=chatDiv[0].scrollHeight;
                if(document.visibilityState=="hidden"){
                   // $("title").text("Shiva")
                }
               // }
            });
            document.io.on("getName",function(msg){
                $("#chatUserName").text(msg);
            });
            document.io.on("chatOnline",function(msg){
                $("#chatOnline").empty();
                msg.forEach(function(name){
                    console.log(name.status);
                    $("<span class='glyphicon glyphicon-user'></span><span style='font-family:fantasy;font-size: 17px;margin-left: 3%;'>"+name.name+"</span><br/>").css({color:name.status}).appendTo("#chatOnline");
                });
                $("#onlineCount").text(msg.length);
            });

            document.io.emit("getName",{id:$("#userId").text()});
            document.io.on("cricScore",function(msg){
               var score=JSON.parse(msg)[0];
              $("title").text(score.si);
              $("#team").text(score.si);
              $("#score").text(score.de);
             // $("#msgTab").css({marginTop:"-2%"});
            });

        },
        render: function () {
            this.$el.html(this.template());
            $(".offline").fadeOut(0);
            $("#changeChatUserName").hide();
            $("#chatMsg").resizable();
            var smiley=$("#smileyIcons").children();
            $("#smileyBtn").popover({
                html:'true',
                trigger:'click',
                placement:'top',
                content: function(){return smiley;}
            });
            $(".smileys").click(function(e){
                var img=new Image();
                img.src= e.currentTarget.src;
                $(img).css({height:"115%"}).appendTo("#sendData");
                $("#smileyBtn").popover('hide');
                $("#sendData").focus();
                e.stopPropagation();
            });
           document.onclick=function(event){
            if(event.target.id!="smileyBtn"){
                $("#smileyBtn").popover('hide');
            }
           };
            $(".clearfix").click(function(){

                $(".panel-body").slideToggle(500);


            });
            $('div').bind('dragover drop', function(event){
                event.preventDefault();
                return false;
            });
        },
        events: {
          
            "click #black": "themeBlack",
            "click #white": "themeWhite",
            "click #transformXML":"sendMsg",
            "keydown #sendData":"sendForEnter",
            "click #sendData":"avoidFriendsOnline",
            "click #main":"gotoMain",
            "click #logout":"userLogout",
            "click #sendImage":"uploadImg",
            "change #browseChatImg":"sendImage",
            "blur #chatUserName":"changeName",
            "focus #chatUserName":"backupName",
            "click #changeChatUserName":"clickDone",
            "click #smileyBtn":"smileyClick",
            "click #logoutBtn":"userLogout"

        },
        avoidFriendsOnline:function(){

        },
        userLogout:function(){
            document.io.emit("logoutChat",{id:$("#userId").text()});
            return true;
        },
        smileyClick:function(e){

        },
        clickDone:function(e){
            $("#changeChatUserName").hide();
        },
        backupName:function(e){
            $(e.currentTarget)[0].prevName= $(e.currentTarget).text();
            $("#changeChatUserName").show();
        },
        changeName:function(e){
            $("#changeChatUserName").hide();
            $(e.currentTarget).text($(e.currentTarget).text().trim());
            if($(e.currentTarget).text()==""){
                $(e.currentTarget).text($(e.currentTarget)[0].prevName);
            }
            document.io.emit("setName",$(e.currentTarget).text());
            document.io.emit("getName","");
        },
        sendImage:function(e){
            if (e.currentTarget.files[0]) {
                var reader = new FileReader();
                reader.onload = function (e) {
                    var chatDiv=$("#chatMsg");
                    var img = "";
                    var imgheight=chatDiv.width();
                    img = '<img src="'+e.currentTarget.result+'" style="margin-top:1%;width:100%;max-height:100%;"/>';
                   // $("#sendData").val( $("#sendData").val()+img);
                    document.io.emit("chatMsg",{msg:img,id:$("#userId").text()});
                    var name=$("#username").text().split("@")[0];
                    if(!name){
                        name="Me";
                    }
                    var time;
                    $.ajax({
                        url:"/checkTime",
                        method:"get",
                        success:function(e){
                            time= e.date;

                            var msg='<div class="col-sm-12 col-lg-12 col-md-12"><div style="background-color: white;width: 75%;opacity:1;border-radius: 4px;display: table;position: inherit;padding: 5px;color: black;margin-bottom: 10px;padding: 3px 0px;" class="popover fade left pull-right">  <div class="popover-content"><h7 class="" style="font-family: \'Raleway\', sans-serif;color: rgb(139, 115, 115);font-weight: 600;">'+name+'</h7><legend style="margin-bottom: 8px;border-bottom: 1px solid rgb(223, 222, 220);"></legend>'+'<span>'+img+'</span><legend style="margin-top: 8px;margin-bottom: 8px;border-bottom: 1px dashed rgb(223, 222, 220);"></legend><span class="pull-right" style="color:rgb(152, 142, 123);">'+time+'</span></div><div class="arrow" style=""></div></div></div>';

                    chatDiv.append(msg);
                    chatDiv[0].scrollTop=chatDiv[0].scrollHeight;
                }

                });
                }
                reader.readAsDataURL(e.currentTarget.files[0]);
            }
        },
        uploadImg:function(){
            $("#browseChatImg").click();
        },
        gotoMain:function(){
            Backbone.history.navigate("main");
            Backbone.history.loadUrl();
        },
        sendForEnter:function(e){
            if(e.keyCode==13){
                if($("#sendData").html()!=""){
                    $("#sendData>img").css({height:"50px"});
                document.io.emit("chatMsg",{msg:$("#sendData").html(),id:$("#userId").text()});

                var name=$("#username").text().split("@")[0];
                if(!name){
                    name="Me";
                }
                var msg= $("#sendData").html();
                var time;
                $.ajax({
                        url:"/checkTime",
                        method:"get",
                        success:function(e){
                            time= e.date;

                if(msg.indexOf(':)')>-1 || msg.indexOf(':(')>-1 || msg.indexOf(':D')>-1 || msg.indexOf(':P')>-1  || msg.indexOf(';)')>-1 || msg.indexOf('=-o')>-1 || msg.indexOf(':*')>-1 || msg.indexOf('8)')>-1 ||  msg.indexOf(':]')>-1 || msg.indexOf(':--/')>-1  || msg.indexOf('o:-)')>-1 || msg.indexOf('|o')>-1 || msg.indexOf(':-(')>-1 || msg.indexOf('8-)')>-1 ||  msg.indexOf(':]')>-1 || msg.indexOf(':X')>-1  || msg.indexOf(':S)')>-1 || msg.indexOf('3-)')>-1 || msg.indexOf('!:|')>-1 ||  msg.indexOf(':K')>-1 || msg.indexOf('3:-]')>-1 || msg.indexOf(':}')>-1 || msg.indexOf(':{')>-1) {
                        fillSmiley(msg);
                    msg=fillSmiley.msg;
                }
                var chatMsg='<div class="col-sm-12 col-lg-12 col-md-12"><div style="background-color: white;width: 75%;opacity:1;border-radius: 4px;display: table;position: inherit;padding: 5px;color: black;margin-bottom: 10px;padding: 3px 0px;" class="popover fade left pull-right">  <div class="popover-content"><h7 class="" style="font-family: \'Raleway\', sans-serif;color: rgb(139, 115, 115);font-weight: 600;">'+name+'</h7><legend style="margin-bottom: 8px;border-bottom: 1px solid rgb(223, 222, 220);"></legend>'+'<span style="word-break: break-all;">'+msg+'</span><legend style="margin-top: 8px;margin-bottom: 8px;border-bottom: 1px dashed rgb(223, 222, 220);"></legend><span class="pull-right" style="color:rgb(152, 142, 123);">'+time+'</span></div><div class="arrow" style=""></div></div></div>';
                    var chatDiv=$("#chatMsg");
                    chatDiv.append(chatMsg);
                    chatDiv[0].scrollTop=chatDiv[0].scrollHeight;
                    $("#sendData").html("");
                        }
                });
                e.preventDefault();
                }
            }

        },
        sendMsg: function () {
            if($("#sendData").html()!=""){
                $("#sendData>img").css({height:"50px"});
            document.io.emit("chatMsg",{msg:$("#sendData").html(),id:$("#userId").text()});
                var name=$("#username").text().split("@")[0];
                if(!name){
                    name="Me";
                }
                var time;
                var msg= $("#sendData").html();
                $.ajax({
                        url:"/checkTime",
                        method:"get",
                        success:function(e){
                            time= e.date;


                if(msg.indexOf(':)')>-1 || msg.indexOf(':(')>-1 || msg.indexOf(':D')>-1 || msg.indexOf(':P')>-1  || msg.indexOf(';)')>-1 || msg.indexOf('=-o')>-1 || msg.indexOf(':*')>-1 || msg.indexOf('8)')>-1 ||  msg.indexOf(':]')>-1 || msg.indexOf(':--/')>-1  || msg.indexOf('o:-)')>-1 || msg.indexOf('|o')>-1 || msg.indexOf(':-(')>-1 || msg.indexOf('8-)')>-1 ||  msg.indexOf(':]')>-1 || msg.indexOf(':X')>-1  || msg.indexOf(':S)')>-1 || msg.indexOf('3-)')>-1 || msg.indexOf('!:|')>-1 ||  msg.indexOf(':K')>-1 || msg.indexOf('3:-]')>-1 || msg.indexOf(':}')>-1 || msg.indexOf(':{')>-1) {
                    fillSmiley(msg);
                    msg=fillSmiley.msg;

                }

                var chatMsg='<div class="col-md-12"><div style="background-color: white;width: 75%;opacity:1;border-radius: 4px;display: table;position: inherit;padding: 5px;color: black;margin-bottom: 10px;padding: 3px 0px;" class="popover fade left pull-right">  <div class="popover-content"><h7 class="" style="font-family: \'Raleway\', sans-serif;color: rgb(139, 115, 115);font-weight: 600;">'+name+'</h7><legend style="margin-bottom: 8px;border-bottom: 1px solid rgb(223, 222, 220);"></legend>'+'<span style="word-break: break-all;">'+msg+'</span><legend style="margin-top: 8px;margin-bottom: 8px;border-bottom: 1px dashed rgb(223, 222, 220);"></legend><span class="pull-right" style="color:rgb(152, 142, 123);">'+time+'</span></div><div class="arrow" style=""></div></div></div>';
                var chatDiv=$("#chatMsg");
                chatDiv.append(chatMsg);
                chatDiv[0].scrollTop=chatDiv[0].scrollHeight;
            $("#sendData").html("");
                        }
                });
            }
        },
         themeBlack: function () {
        $("link").remove();
        $("style").remove();
        var theme = $("<link rel='stylesheet/less' href='Styles/black/black.less'>");
        theme.appendTo('head');
        less.sheets[0] = theme[0];
        less.refresh();
        less.refreshStyles();
         },
         themeWhite: function () {
            $("link").remove();
            $("style").remove();
            var theme = $("<link rel='stylesheet/less' href='Styles/white/white.less'>");
            theme.appendTo('head');
            less.sheets[0] = theme[0];
            less.refresh();
            less.refreshStyles();
        }
        });

       var chat = new chatView({el:$("#mainView")[0]});


    Backbone.history.start();
    var theme = $("<link rel='stylesheet/less' href='Styles/black/black.less'>");
    theme.appendTo('head');
    less.sheets[0] = theme[0];
    less.refresh();
    less.refreshStyles();

    Offline.on("down", function () {
        var online = $('.online'),
            offline = $('.offline');
        online.fadeOut(2000, function () {
            offline.fadeIn(1000);
        });
    });
    Offline.on("up", function () {
        var online = $('.online'),
           offline = $('.offline');
        offline.fadeOut(2000, function () {
            online.fadeIn(1000);
        });
    });

   
});