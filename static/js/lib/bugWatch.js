(function () {
  let bugWatch = {};
  let projectId = '';
  let apiPre = 'https://www.fewatch.com/api';;
  bugWatch.report = (config) => {
    projectId = config.projectId;
    let debug = config.debug;
    if (debug == false) return;
    let ignore = config.ignore || '';
    localStorage.setItem('bugwatchProjectId', config.projectId);
    /**
    messag: 错误信息字符串
    source: 发生错误的脚本url
    lineno： 发生错误的行号
    colno:发生错误的列号
    error: Error对象
    */
    window.onerror = function (message, source, lineno, colno, error) {
      if (ignore) {
        const ignoreList = ignore.split(',');
        const isIgnore = false;
        for (let i = 0; i < ignoreList.length; i++) {
          const ignoreKeyword = ignoreList[i];
          if (message.indexOf(ignoreKeyword) > -1) {
            return;
          }
        }
      }
      let req = {
        projectId,
        time: new Date(),
        message,
        source : source + '行号:' + lineno + '列号:' + colno,
        pageUrl: location.href,
      };
      if (error) {
        req.error = error.stack;
        req.errorType = error.name;
      }
      fetch(`${apiPre}/bug/addBug`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req),
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
        console.log(`这个接口出错了${error}`);
      });
    };
    window.onload = function () {
      const timing = performance.timing;
      const baiping = timing.domLoading - timing.fetchStart;
      console.log(`白屏时间：${baiping}`);
    };
  };
  bugWatch.reportAjax = ((config) => {
    const url = config.config ? config.config.url : '';
    // 发错ajax错误
    fetch(`${apiPre}/bug/addAjaxWatch`, {
      method: 'POST',
      mode: 'cors',
      headers: {
         'Content-Type': 'application/json',
       },
      body: JSON.stringify({
         projectId,
         message: config.message,
         url,
         errorPage: location.href,
         error: config.stack,
         status: config.status,
       }),
    })
    .then((response) => {
      console.log('发出错误监控-来自bugWatch');

    });
  });
  window.bugWatch = bugWatch;
}());

