/*
 Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
(function () {
  function e(a) {
    return {
      "aria-label": a,
      class: "cke_pagebreak",
      contenteditable: "false",
      "data-cke-display-name": "pagebreak",
      "data-cke-pagebreak": 1,
      style: "page-break-after: always",
      title: a,
    };
  }
  CKEDITOR.plugins.add("pagebreak", {
    requires: "fakeobjects",
    lang: "af,ar,bg,bn,bs,ca,cs,cy,da,de,de-ch,el,en,en-au,en-ca,en-gb,eo,es,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn",
    icons: "pagebreak,pagebreak-rtl",
    hidpi: !0,
    onLoad: function () {
      var a = (
        "background:url(" +
        CKEDITOR.getUrl(this.path + "images/pagebreak.gif") +
        ") no-repeat center center;clear:both;width:100%;border-top:#999 1px dotted;border-bottom:#999 1px dotted;padding:0;height:7px;cursor:default;"
      ).replace(/;/g, " !important;");
      CKEDITOR.addCss("div.cke_pagebreak{" + a + "}");
    },
    init: function (a) {
      a.blockless ||
        (a.addCommand("pagebreak", CKEDITOR.plugins.pagebreakCmd),
        a.ui.addButton &&
          a.ui.addButton("PageBreak", {
            label: a.lang.pagebreak.toolbar,
            command: "pagebreak",
            toolbar: "insert,70",
          }),
        CKEDITOR.env.webkit &&
          a.on("contentDom", function () {
            a.document.on("click", function (b) {
              b = b.data.getTarget();
              b.is("div") &&
                b.hasClass("cke_pagebreak") &&
                a.getSelection().selectElement(b);
            });
          }));
    },
    afterInit: function (a) {
      function b(f) {
        CKEDITOR.tools.extend(f.attributes, e(a.lang.pagebreak.alt), !0);
        f.children.length = 0;
      }
      var c = a.dataProcessor,
        g = c && c.dataFilter,
        c = c && c.htmlFilter,
        h = /page-break-after\s*:\s*always/i,
        k = /display\s*:\s*none/i;
      c &&
        c.addRules(
          {
            attributes: {
              class: function (a, b) {
                var c = a.replace("cke_pagebreak", "");
                if (c != a) {
                  var d = CKEDITOR.htmlParser.fragment.fromHtml(
                    '\x3cspan style\x3d"display: none;"\x3e\x26nbsp;\x3c/span\x3e'
                  ).children[0];
                  b.children.length = 0;
                  b.add(d);
                  d = b.attributes;
                  delete d["aria-label"];
                  delete d.contenteditable;
                  delete d.title;
                }
                return c;
              },
            },
          },
          { applyToAll: !0, priority: 5 }
        );
      g &&
        g.addRules({
          elements: {
            div: function (a) {
              if (a.attributes["data-cke-pagebreak"]) b(a);
              else if (h.test(a.attributes.style)) {
                var c = a.children[0];
                c && "span" == c.name && k.test(c.attributes.style) && b(a);
              }
            },
          },
        });
    },
  });
  CKEDITOR.plugins.pagebreakCmd = {
    exec: function (a) {
      var b = a.document.createElement("div", {
        attributes: e(a.lang.pagebreak.alt),
      });
      a.insertElement(b);
    },
    context: "div",
    allowedContent: {
      div: { styles: "!page-break-after" },
      span: {
        match: function (a) {
          return (
            (a = a.parent) &&
            "div" == a.name &&
            a.styles &&
            a.styles["page-break-after"]
          );
        },
        styles: "display",
      },
    },
    requiredContent: "div{page-break-after}",
  };
})();