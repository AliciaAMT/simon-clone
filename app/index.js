var WebDevServer = require("web-dev-server");

/**
 * @summary 
 * Exported class to handle directory requests.
 * 
 * When there is first request to directory with default 
 * `index.js` script inside, this class is automatically 
 * created and method `Start()` is executed.
 * All request are normally handled by method `HttpHandle()`.
 * If there is detected any file change inside this file 
 * or inside file included in this file (on development server 
 * instance), the module `web-dev-server` automaticly reloads 
 * all necesssary dependent source codes, stops previous instance 
 * by method `Stop`() and recreates this application instance again
 * by `Start()` method. The same realoding procedure is executed, 
 * if there is any unhandled error inside method `HttpHandle()` 
 * (to develop more comfortably).
 */
class App {

   constructor () {
      /**
       * @summary WebDevServer server instance.
       * @var {WebDevServer.Server}
       */
      this.server = null;
      /**
       * @summary Requests counter. 
       * @var {number}
       */
      this.counter = 0;
   }

   /** 
    * @summary Application start point.
    * @public
    * @param {WebDevServer.Server}   server
    * @param {WebDevServer.Request}  firstRequest
    * @param {WebDevServer.Response} firstResponse
    * @return {Promise<void>}
    */
   async Start (server, firstRequest, firstResponse) {
      this.server = server;
      // Any initializations:
      console.log("App start.");
   }

   /** 
    * @summary Application end point, called on unhandled error 
    * (on development server instance) or on server stop event.
    * @public
    * @param {WebDevServer.Server} server
    * @return {Promise<void>}
    */
   async Stop (server) {
      // Any destructions:
      console.log("App stop.");
   }
   
   /**
    * @summary 
    * This method is executed each request to directory with 
    * `index.js` script inside or into any non-existing directory,
    * inside directory with this script.
    * @public
    * @param {WebDevServer.Request}  request
    * @param {WebDevServer.Response} response
    * @return {Promise<void>}
    */
   async HttpHandle (request, response) {
      console.log("App http handle.");

      // increase request counter:
      this.counter++;
      
      // try to uncomment line bellow to see rendered error in browser:
      //throw new Error("Uncatched test error 1.");

      response
         .SetHeader('content-Type', 'text/javascript')
         .SetBody(
            JSON.stringify({
               basePath: request.GetBasePath(),
               path: request.GetPath(),
               domainUrl: request.GetDomainUrl(),
               baseUrl: request.GetBaseUrl(),
               requestUrl: request.GetRequestUrl(),
               fullUrl: request.GetFullUrl(),
               params: request.GetParams(false, false),
               appRequests: this.counter
            }, null, "\t")
         )
         .Send();
   }
};
module.exports = App;