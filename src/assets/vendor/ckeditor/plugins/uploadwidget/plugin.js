/*
 Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function () {
  CKEDITOR.plugins.add("uploadwidget", {
    lang: "cs,da,de,de-ch,el,en,eo,eu,fr,gl,hu,id,it,km,ko,ku,nb,nl,pl,pt,pt-br,ru,sv,tr,ug,uk,zh,zh-cn",
    requires: "widget,clipboard,filetools,notificationaggregator",
    init: function (a) {
      a.filter.allow("*[!data-widget,!data-cke-upload-id]");
    },
  });
  CKEDITOR.fileTools || (CKEDITOR.fileTools = {});
  CKEDITOR.tools.extend(CKEDITOR.fileTools, {
    addUploadWidget: function (a, d, e) {
      var g = CKEDITOR.fileTools,
        b = a.uploadRepository,
        p = e.supportedTypes ? 10 : 20;
      if (e.fileToElement)
        a.on(
          "paste",
          function (f) {
            f = f.data;
            var n = f.dataTransfer,
              k = n.getFilesCount(),
              m = e.loadMethod || "loadAndUpload",
              c,
              h;
            if (!f.dataValue && k)
              for (h = 0; h < k; h++)
                if (
                  ((c = n.getFile(h)),
                  !e.supportedTypes || g.isTypeSupported(c, e.supportedTypes))
                ) {
                  var l = e.fileToElement(c);
                  c = b.create(c);
                  l &&
                    (c[m](e.uploadUrl),
                    CKEDITOR.fileTools.markElement(l, d, c.id),
                    ("loadAndUpload" != m && "upload" != m) ||
                      CKEDITOR.fileTools.bindNotifications(a, c),
                    (f.dataValue += l.getOuterHtml()));
                }
          },
          null,
          null,
          p
        );
      CKEDITOR.tools.extend(e, {
        downcast: function () {
          return new CKEDITOR.htmlParser.text("");
        },
        init: function () {
          var f = this,
            d = this.wrapper
              .findOne("[data-cke-upload-id]")
              .data("cke-upload-id"),
            k = b.loaders[d],
            e = CKEDITOR.tools.capitalize,
            c,
            h;
          k.on("update", function (b) {
            if (f.wrapper && f.wrapper.getParent()) {
              a.fire("lockSnapshot");
              b = "on" + e(k.status);
              if ("function" !== typeof f[b] || !1 !== f[b](k))
                (h = "cke_upload_" + k.status),
                  f.wrapper &&
                    h != c &&
                    (c && f.wrapper.removeClass(c),
                    f.wrapper.addClass(h),
                    (c = h)),
                  ("error" != k.status && "abort" != k.status) ||
                    a.widgets.del(f);
              a.fire("unlockSnapshot");
            } else
              a
                .editable()
                .find('[data-cke-upload-id\x3d"' + d + '"]')
                .count() || k.abort(),
                b.removeListener();
          });
          k.update();
        },
        replaceWith: function (b, d) {
          if ("" === b.trim()) a.widgets.del(this);
          else {
            var e = this == a.widgets.focused,
              g = a.editable(),
              c = a.createRange(),
              h,
              l;
            e || (l = a.getSelection().createBookmarks());
            c.setStartBefore(this.wrapper);
            c.setEndAfter(this.wrapper);
            e && (h = c.createBookmark());
            g.insertHtmlIntoRange(b, c, d);
            a.widgets.checkWidgets({ initOnlyNew: !0 });
            a.widgets.destroy(this, !0);
            e
              ? (c.moveToBookmark(h), c.select())
              : a.getSelection().selectBookmarks(l);
          }
        },
      });
      a.widgets.add(d, e);
    },
    markElement: function (a, d, e) {
      a.setAttributes({ "data-cke-upload-id": e, "data-widget": d });
    },
    bindNotifications: function (a, d) {
      function e() {
        g = a._.uploadWidgetNotificaionAggregator;
        if (!g || g.isFinished())
          (g = a._.uploadWidgetNotificaionAggregator =
            new CKEDITOR.plugins.notificationAggregator(
              a,
              a.lang.uploadwidget.uploadMany,
              a.lang.uploadwidget.uploadOne
            )),
            g.once("finished", function () {
              var b = g.getTaskCount();
              0 === b
                ? g.notification.hide()
                : g.notification.update({
                    message:
                      1 == b
                        ? a.lang.uploadwidget.doneOne
                        : a.lang.uploadwidget.doneMany.replace("%1", b),
                    type: "success",
                    important: 1,
                  });
            });
      }
      var g,
        b = null;
      d.on("update", function () {
        !b &&
          d.uploadTotal &&
          (e(), (b = g.createTask({ weight: d.uploadTotal })));
        b && "uploading" == d.status && b.update(d.uploaded);
      });
      d.on("uploaded", function () {
        b && b.done();
      });
      d.on("error", function () {
        b && b.cancel();
        a.showNotification(d.message, "warning");
      });
      d.on("abort", function () {
        b && b.cancel();
        a.showNotification(a.lang.uploadwidget.abort, "info");
      });
    },
  });
})();
