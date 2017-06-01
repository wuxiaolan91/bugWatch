(function () {
  let bugWatch = {};
  let projectId = '';
  let apiPre = 'https://www.fewatch.com/api';

// 计算加载时间
function getEntryTiming (entry) {
    var t = entry;
    var times = {};
    console.log('timing', entry);
    times.loadPage = (t.loadEventEnd - t.navigationStart) / 1000; // 页面加载完成的时间
    times.domReady = (t.domComplete - t.responseEnd ) / 1000; // 解析dom树的时间
    times.whiteScheen = (t.domLoading - t.fetchStart) / 1000;
    // DNS 查询时间
    times.lookupDomain = t.domainLookupEnd - t.domainLookupStart;
 
    // 内容加载完成的时间
    times.request = t.responseEnd - t.requestStart;
 
    // TCP 建立连接完成握手的时间
    times.connect = t.connectEnd - t.connectStart;
 
    // 挂载 entry 返回
    times.name = entry.name;
    times.entryType = entry.entryType;
    times.initiatorType = entry.initiatorType;
    times.duration = entry.duration;
 
    return times;
}
// window.onload = function () {
//   const timing = performance.timing;
//   const baiping = timing.domLoading - timing.fetchStart;
//   console.log(`白屏时间：${baiping}`);
// };
window.onload = function () {
  console.log('load');
  var timing = getEntryTiming(performance.timing);
  const chromeWhiteScreen = (chrome.loadTimes().firstPaintTime - chrome.loadTimes().startLoadTime) * 1000;
  console.log('chrome自己的白屏时间', chromeWhiteScreen);
  console.log('timing', timing);
}
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
          console.log('上报一个bug成功');

        } else {
          console.log("Looks like the response wasn't perfect, got status", res.status);
        }
      })
      .catch((error) => {
        console.log(`这个接口出错了${error}`);
      });
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

