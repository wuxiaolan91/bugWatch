(function () {
  /**   
      messag: 错误信息字符串
      source: 发生错误的脚本url
      lineno： 发生错误的行号
      colno:发生错误的列号
      error: Error对象
  */
  console.log('bug.js加载')
  window.onerror = function (message, source, lineno, colno, error) {
    console.log('js错误请求捕获到并开始调用接口')
    console.log('time:---------------');
    console.log(new Date());
    var url = `time=${new Date}&message=${message}&source=${source}行号:${lineno}列号:${colno}&pageUrl=${encodeURIComponent(location.href)}
    `
    ;
    if (error) {
      url = `${url}&error=${error.stack}&errorType=${error.name}`
    }
    fetch(`/api/bug/watch?${url}`, {
      method: 'GET'
      // body: JSON.stringify({
      //   time: new Date(),
      //   url: location.url,
      //   pathname: this.location.pathname,
      //   screen: {
      //       width: this.screen.width,
      //       height: this.screen.height
      //   },
      //   message: message,
      //   source: `${source} 行号：${lineno} 列号：${colno}`,
      //   error: error
      // })
    }).then(function(res) {
      // res instanceof Response == true.
      if (res.ok) {
        try {
          res.url = decodeURIComponent(res.url);
          res.json().then(function(data) {
            console.log(data.entries);
          });
        } catch (ex) {

        }
        
      } else {
        console.log("Looks like the response wasn't perfect, got status", res.status);
      }
    })
    .catch( function (error) {
      console.log('这个接口出错了' + error);
    })
  }
})();

     
