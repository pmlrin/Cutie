// 根据不算子官方js实现进行修改，以支持pjax
// 这玩意看起来很恼火，之后有时间再重构吧，咕咕咕~
var bszCaller, bszTag;
function bszGet() {
  ready = function (c) {
    return c.call(document), this;
  };
  (bszCaller = {
    fetch: function (a, b) {
      var c = "BusuanziCallback_" + Math.floor(1099511627776 * Math.random());
      (window[c] = this.evalCall(b)),
        (a = a.replace("=BusuanziCallback", "=" + c)),
        (scriptTag = document.createElement("SCRIPT")),
        (scriptTag.type = "text/javascript"),
        (scriptTag.defer = !0),
        (scriptTag.src = a),
        (scriptTag.referrerPolicy = "no-referrer-when-downgrade"),
        document.getElementsByTagName("HEAD")[0].appendChild(scriptTag);
    },
    evalCall: function (a) {
      return function (b) {
        ready(function () {
          try {
            a(b), scriptTag.parentElement.removeChild(scriptTag);
          } catch (c) {
            bszTag.hides();
          }
        });
      };
    },
  }),
    bszCaller.fetch(
      "//busuanzi.ibruce.info/busuanzi?jsonpCallback=BusuanziCallback",
      function (a) {
        bszTag.texts(a), bszTag.shows();
      }
    ),
    (bszTag = {
      bszs: ["site_pv", "page_pv", "site_uv"],
      texts: function (a) {
        this.bszs.map(function (b) {
          var c = document.getElementById("busuanzi_value_" + b);
          c && (c.innerHTML = a[b]);
        });
      },
      hides: function () {
        this.bszs.map(function (a) {
          var b = document.getElementById("busuanzi_container_" + a);
          b && (b.style.display = "none");
        });
      },
      shows: function () {
        this.bszs.map(function (a) {
          var b = document.getElementById("busuanzi_container_" + a);
          b && (b.style.display = "inline");
        });
      },
    });
}

$(document).on("pjax:end", function () {
  bszGet();
});

bszGet();
