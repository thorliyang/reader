(function (doc, win) {
  var docEl = doc.documentElement,
    dpr = 1,
    scale = 1 / dpr,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
  docEl.dataset.dpr = dpr
  var metaEl = doc.createElement('meta')
  metaEl.name = 'viewport'
  metaEl.content = 'initial-scale=' + scale + ',maximum-scale=' + scale + ', minimum-scale=' + scale
  docEl.firstElementChild.appendChild(metaEl)
  var recalc = function () {
    var width = docEl.clientWidth
    if (width / dpr > 750) {
      width = 750 * dpr;
    }
    // 乘以100，px : rem = 100 : 1
    docEl.style.fontSize = 100 * (width / 750) + 'px'
  };
  recalc()
  if (!doc.addEventListener) return
  win.addEventListener(resizeEvt, recalc, false)
})(document, window)