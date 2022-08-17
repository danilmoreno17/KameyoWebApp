/*
 Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function () {
  CKEDITOR.plugins.add("embedsemantic", {
    icons: "embedsemantic",
    hidpi: !0,
    requires: "embedbase",
    onLoad: function () {
      this.registerOembedTag();
    },
    init: function (a) {
      var b = CKEDITOR.plugins.embedBase.createWidgetBaseDefinition(a),
        d = b.init;
      CKEDITOR.tools.extend(
        b,
        {
          dialog: "embedBase",
          button: a.lang.embedbase.button,
          allowedContent: "oembed",
          requiredContent: "oembed",
          styleableElements: "oembed",
          providerUrl: new CKEDITOR.template(
            a.config.embed_provider ||
              "//ckeditor.iframe.ly/api/oembed?url\x3d{url}\x26callback\x3d{callback}"
          ),
          init: function () {
            var e = this;
            d.call(this);
            this.once("ready", function () {
              this.data.loadOnReady &&
                this.loadContent(this.data.url, {
                  callback: function () {
                    e.setData("loadOnReady", !1);
                    a.fire("updateSnapshot");
                  },
                });
            });
          },
          upcast: function (a, b) {
            if ("oembed" == a.name) {
              var c = a.children[0];
              if (c && c.type == CKEDITOR.NODE_TEXT && c.value)
                return (
                  (b.url = c.value),
                  (b.loadOnReady = !0),
                  (c = new CKEDITOR.htmlParser.element("div")),
                  a.replaceWith(c),
                  (c.attributes["class"] = a.attributes["class"]),
                  c
                );
            }
          },
          downcast: function (a) {
            var b = new CKEDITOR.htmlParser.element("oembed");
            b.add(new CKEDITOR.htmlParser.text(this.data.url));
            a.attributes["class"] &&
              (b.attributes["class"] = a.attributes["class"]);
            return b;
          },
        },
        !0
      );
      a.widgets.add("embedSemantic", b);
    },
    registerOembedTag: function () {
      var a = CKEDITOR.dtd,
        b;
      a.oembed = { "#": 1 };
      for (b in a) a[b].div && (a[b].oembed = 1);
    },
  });
})();
