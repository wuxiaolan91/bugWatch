(function () {
  /**
      messag: 错误信息字符串
      source: 发生错误的脚本url
      lineno： 发生错误的行号
      colno:发生错误的列号
      error: Error对象
  */
  console.log('bug.js加载');
  window.onerror = function (message, source, lineno, colno, error) {
    const projectId = localStorage.projectId;
    console.log(projectId);
    let url = `projectId=${projectId}&time=${new Date()}&message=${message}&source=${source}行号:${lineno}列号:${colno}&pageUrl=${encodeURIComponent(location.href)}
    `
    ;
    if (error) {
      url = `${url}&error=${error.stack}&errorType=${error.name}`;
    }
    fetch(`/api/bug/addWatch?${url}`, {
      headers: {
        website: location.host,
      },
      method: 'GET',
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
    }).then((res) => {
      // res instanceof Response == true.
      if (res.ok) {
        try {
          res.url = decodeURIComponent(res.url);
          res.json().then((data) => {
            console.log(data.entries);
          });
        } catch (ex) {

        }

      } else {
        console.log("Looks like the response wasn't perfect, got status", res.status);
      }
    })
    .catch((error) => {
      // debugger;
      console.log(`这个接口出错了${  error}`);
    });
  };
  window.onload = function () {
    const timing = performance.timing;
    let baiping = timing.domLoading - timing.fetchStart;
    console.log(`白屏时间：${  baiping}`);
  };
}());


