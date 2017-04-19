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
    var url = `time=${new Date}&message=${message}&source=${source}行号:${lineno}列号:${colno}&pageUrl=${encodeURIComponent(location.href)}
   `
    ;
    if (error) {
      url = `${url}&error=${error.stack}&errorType=${error.name}`
    }
    fetch(`/api/bug/watch?${url}`, {
      method: 'GET'
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


