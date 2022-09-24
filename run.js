var WebDevServer = require("web-dev-server");

// Create web server instance.
WebDevServer.Server.CreateNew()
   // Required.
   .SetDocumentRoot(__dirname)
   // Optional, 8000 by default.
   .SetPort(8000)
   // Optional, '127.0.0.1' by default.
   //.SetHostname('127.0.0.1')
   // Optional, `true` by default to display Errors and directories.
   //.SetDevelopment(false)
   // Optional, `null` by default, useful for Apache `mod_proxy` usage.
   //.SetBasePath('/node')
   // Optional, custom place to log any unhandled errors.
   //.SetErrorHandler(async function (err,code,req,res) {})
   // Optional, to prepend any execution before `web-dev-server` module execution.
   .AddPreHandler(async function (req, res, event) {
      if (req.GetPath() == '/health') {
       res.SetCode(200).SetBody('1').Send();
        // Do not anything else in `web-dev-server` module for this request:
         event.PreventDefault();
      }
      /*setTimeout(() => {
         throw new RangeError("Uncatched test error.");
      }, 1000);*/
   })
   // optional, callback called after server has been started or after error ocured
   .Start(function (success, err) {
      if (!success) console.error(err);
      console.log("Server is running.");
   });