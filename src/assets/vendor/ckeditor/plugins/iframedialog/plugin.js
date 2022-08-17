/*
 Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.plugins.add("iframedialog", {
  requires: "dialog",
  onLoad: function () {
    CKEDITOR.dialog.addIframe = function (e, d, a, l, f, n, g) {
      a = { type: "iframe", src: a, width: "100%", height: "100%" };
      a.onContentLoad =
        "function" == typeof n
          ? n
          : function () {
              var a = this.getElement().$.contentWindow;
              if (a.onDialogEvent) {
                var b = this.getDialog(),
                  c = function (b) {
                    return a.onDialogEvent(b);
                  };
                b.on("ok", c);
                b.on("cancel", c);
                b.on("resize", c);
                b.on("hide", function (a) {
                  b.removeListener("ok", c);
                  b.removeListener("cancel", c);
                  b.removeListener("resize", c);
                  a.removeListener();
                });
                a.onDialogEvent({
                  name: "load",
                  sender: this,
                  editor: b._.editor,
                });
              }
            };
      var h = {
          title: d,
          minWidth: l,
          minHeight: f,
          contents: [
            {
              id: "iframe",
              label: d,
              expand: !0,
              elements: [a],
              style: "width:" + a.width + ";height:" + a.height,
            },
          ],
        },
        k;
      for (k in g) h[k] = g[k];
      this.add(e, function () {
        return h;
      });
    };
    (function () {
      var e = function (d, a, l) {
        if (!(3 > arguments.length)) {
          var f = this._ || (this._ = {}),
            e = a.onContentLoad && CKEDITOR.tools.bind(a.onContentLoad, this),
            g = CKEDITOR.tools.cssLength(a.width),
            h = CKEDITOR.tools.cssLength(a.height);
          f.frameId = CKEDITOR.tools.getNextId() + "_iframe";
          d.on("load", function () {
            CKEDITOR.document
              .getById(f.frameId)
              .getParent()
              .setStyles({ width: g, height: h });
          });
          var k = {
              src: "%2",
              id: f.frameId,
              frameborder: 0,
              allowtransparency: !0,
            },
            m = [];
          "function" == typeof a.onContentLoad &&
            (k.onload = "CKEDITOR.tools.callFunction(%1);");
          CKEDITOR.ui.dialog.uiElement.call(
            this,
            d,
            a,
            m,
            "iframe",
            { width: g, height: h },
            k,
            ""
          );
          l.push(
            '\x3cdiv style\x3d"width:' +
              g +
              ";height:" +
              h +
              ';" id\x3d"' +
              this.domId +
              '"\x3e\x3c/div\x3e'
          );
          m = m.join("");
          d.on("show", function () {
            var b = CKEDITOR.document.getById(f.frameId).getParent(),
              c = CKEDITOR.tools.addFunction(e),
              c = m
                .replace("%1", c)
                .replace("%2", CKEDITOR.tools.htmlEncode(a.src));
            b.setHtml(c);
          });
        }
      };
      e.prototype = new CKEDITOR.ui.dialog.uiElement();
      CKEDITOR.dialog.addUIElement("iframe", {
        build: function (d, a, l) {
          return new e(d, a, l);
        },
      });
    })();
  },
});
