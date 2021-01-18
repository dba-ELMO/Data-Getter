const querystring = require('querystring');
const http = require('http');
const url = require('url');
const handle_requests = require('./runJob')

let tower_host = "51.145.179.67"
let tower_port = 8052
let org = "dbaorg"
let tower_user = "admin"
let tower_password = "password"

let server = http.createServer(function (req, res) {   //create web server
    if (req.url == '/') { //check the URL of the current request
        
        // set response header
        res.writeHead(200, { 'Content-Type': 'text/html' }); 
        
        // set response content    
        res.write('<html><body><p>This is Data Getter Page.</p></body></html>');
        res.end();
    
    }
    else if (req.url.startsWith("/getInformation")) {
        // TODO: CHECK PERMISSIONS

        res.writeHead(200, { 'Content-Type': 'application/json' });
        vars = url.parse(req.url,true).query;
        // if (typeof vars.templateName == 'undefined' || !vars.templateName) {
        //     res.write(JSON.stringify({ "msg": "you need to send templateName parameter" }));
        //     res.end();
        // } 
        if (typeof vars.limit == 'undefined' || !vars.limit) {
            res.write(JSON.stringify({ "msg": "you need to send limit parameter" }));
            res.end();
        }
        else { 
            if (typeof vars.extra_vars == 'undefined' || !vars.extra_vars) {
                vars.extra_vars = "";
            }
            if (typeof vars.tags == 'undefined' || !vars.tags) {
                vars.tags = "";
            }
            handle_requests.handle_job_run(tower_host, tower_port, org, tower_user, tower_password, vars.limit, vars.extra_vars, vars.tags);
            res.end();  
        }
    }
    else
        res.end('Invalid Request!');

});

server.listen(8080); //6 - listen for any incoming requests

console.log('Node.js web server at port 8080 is running..')