var express = require('express'),
    path = require('path'),
    port = process.env.PORT || 9099,
    app = express(),
    request = require('request'),
    prefixUrl = "http://10.99.2.224:8080", //服务端生产环境联调地址
    url = "",
    bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// serve static assets normally
app.use(express.static(__dirname + '/export/ch'));

// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.all("*", function(req, resp, next) {
    let query = (req.method==="GET"?req.query:req.body)||{};

    resp.header("Access-Control-Allow-Origin", "*");
    resp.header("Access-Control-Allow-Headers", "Content-Type,Content-Length, Authorization, Accept,X-Requested-With");

    if(/^1$/.test(query.corNode)){
        resp.set("Content-Type","text/plain");
        //<==========开发环境与后台联调注释下列语句==========>
        url = req.url.toLowerCase();
        prefixUrl = "http://10.99.2.70:9097";
        //<==========end==========>
        delete query.corNode; 
        request(prefixUrl+url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let d = new Date();
                // console.log(req.url+":");
                // console.log(body);
                // console.log("-----------"+d.getFullYear()+
                //     "-"+(d.getMonth()+1)+"-"+d.getDay()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds());
                resp.send(body);
            }else{
                resp.send({"msg": "10.99.2.70 报错或者找不到资源"});
            }
        });
    }else{
        next();
    }
});

let x = (req,resp,next)=>{
    let u = req.url.match(/\/R\/[^\/]+/)[0].replace(/\/R\//,''); 
    resp.sendFile(path.resolve(__dirname, 'export/ch/', u+".html"));
};

app.route(/^\/R\//).get(x).post(x);

app.listen(port);
console.log("端口:"+port+"/main.html");
