/*
 Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.plugins.add("colorbutton", {
  requires: "panelbutton,floatpanel",
  lang: "af,ar,bg,bn,bs,ca,cs,cy,da,de,de-ch,el,en,en-au,en-ca,en-gb,eo,es,et,eu,fa,fi,fo,fr,fr-ca,gl,gu,he,hi,hr,hu,id,is,it,ja,ka,km,ko,ku,lt,lv,mk,mn,ms,nb,nl,no,pl,pt,pt-br,ro,ru,si,sk,sl,sq,sr,sr-latn,sv,th,tr,tt,ug,uk,vi,zh,zh-cn",
  icons: "bgcolor,textcolor",
  hidpi: !0,
  init: function (c) {
    function r(p, h, e, f) {
      var l = new CKEDITOR.style(k["colorButton_" + h + "Style"]),
        m = CKEDITOR.tools.getNextId() + "_colorBox";
      c.ui.add(p, CKEDITOR.UI_PANELBUTTON, {
        label: e,
        title: e,
        modes: { wysiwyg: 1 },
        editorFocus: 0,
        toolbar: "colors," + f,
        allowedContent: l,
        requiredContent: l,
        panel: {
          css: CKEDITOR.skin.getPath("editor"),
          attributes: { role: "listbox", "aria-label": g.panelTitle },
        },
        onBlock: function (a, b) {
          b.autoSize = !0;
          b.element.addClass("cke_colorblock");
          b.element.setHtml(u(a, h, m));
          b.element.getDocument().getBody().setStyle("overflow", "hidden");
          CKEDITOR.ui.fire("ready", this);
          var d = b.keys,
            e = "rtl" == c.lang.dir;
          d[e ? 37 : 39] = "next";
          d[40] = "next";
          d[9] = "next";
          d[e ? 39 : 37] = "prev";
          d[38] = "prev";
          d[CKEDITOR.SHIFT + 9] = "prev";
          d[32] = "click";
        },
        refresh: function () {
          c.activeFilter.check(l) || this.setState(CKEDITOR.TRISTATE_DISABLED);
        },
        onOpen: function () {
          var a = c.getSelection(),
            a = a && a.getStartElement(),
            a = c.elementPath(a),
            b;
          if (a) {
            a = a.block || a.blockLimit || c.document.getBody();
            do
              b =
                (a &&
                  a.getComputedStyle(
                    "back" == h ? "background-color" : "color"
                  )) ||
                "transparent";
            while (
              "back" == h &&
              "transparent" == b &&
              a &&
              (a = a.getParent())
            );
            (b && "transparent" != b) || (b = "#ffffff");
            !1 !== k.colorButton_enableAutomatic &&
              this._.panel._.iframe
                .getFrameDocument()
                .getById(m)
                .setStyle("background-color", b);
            return b;
          }
        },
      });
    }
    function u(p, h, e) {
      var f = [],
        l = k.colorButton_colors.split(","),
        m = c.plugins.colordialog && !1 !== k.colorButton_enableMore,
        a = l.length + (m ? 2 : 1),
        b = CKEDITOR.tools.addFunction(function (a, b) {
          function d(a) {
            this.removeListener("ok", d);
            this.removeListener("cancel", d);
            "ok" == a.name &&
              e(
                this.getContentElement("picker", "selectedColor").getValue(),
                b
              );
          }
          var e = arguments.callee;
          if ("?" == a)
            c.openDialog("colordialog", function () {
              this.on("ok", d);
              this.on("cancel", d);
            });
          else {
            c.focus();
            p.hide();
            c.fire("saveSnapshot");
            c.removeStyle(
              new CKEDITOR.style(k["colorButton_" + b + "Style"], {
                color: "inherit",
              })
            );
            if (a) {
              var f = k["colorButton_" + b + "Style"];
              f.childRule =
                "back" == b
                  ? function (a) {
                      return t(a);
                    }
                  : function (a) {
                      return (
                        !(a.is("a") || a.getElementsByTag("a").count()) || t(a)
                      );
                    };
              c.applyStyle(new CKEDITOR.style(f, { color: a }));
            }
            c.fire("saveSnapshot");
          }
        });
      !1 !== k.colorButton_enableAutomatic &&
        f.push(
          '\x3ca class\x3d"cke_colorauto" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"',
          g.auto,
          '" onclick\x3d"CKEDITOR.tools.callFunction(',
          b,
          ",null,'",
          h,
          "');return false;\" href\x3d\"javascript:void('",
          g.auto,
          '\')" role\x3d"option" aria-posinset\x3d"1" aria-setsize\x3d"',
          a,
          '"\x3e\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e\x3ctr\x3e\x3ctd\x3e\x3cspan class\x3d"cke_colorbox" id\x3d"',
          e,
          '"\x3e\x3c/span\x3e\x3c/td\x3e\x3ctd colspan\x3d7 align\x3dcenter\x3e',
          g.auto,
          "\x3c/td\x3e\x3c/tr\x3e\x3c/table\x3e\x3c/a\x3e"
        );
      f.push(
        '\x3ctable role\x3d"presentation" cellspacing\x3d0 cellpadding\x3d0 width\x3d"100%"\x3e'
      );
      for (e = 0; e < l.length; e++) {
        0 === e % 8 && f.push("\x3c/tr\x3e\x3ctr\x3e");
        var d = l[e].split("/"),
          n = d[0],
          q = d[1] || n;
        d[1] || (n = "#" + n.replace(/^(.)(.)(.)$/, "$1$1$2$2$3$3"));
        d = c.lang.colorbutton.colors[q] || q;
        f.push(
          '\x3ctd\x3e\x3ca class\x3d"cke_colorbox" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"',
          d,
          '" onclick\x3d"CKEDITOR.tools.callFunction(',
          b,
          ",'",
          n,
          "','",
          h,
          "'); return false;\" href\x3d\"javascript:void('",
          d,
          '\')" role\x3d"option" aria-posinset\x3d"',
          e + 2,
          '" aria-setsize\x3d"',
          a,
          '"\x3e\x3cspan class\x3d"cke_colorbox" style\x3d"background-color:#',
          q,
          '"\x3e\x3c/span\x3e\x3c/a\x3e\x3c/td\x3e'
        );
      }
      m &&
        f.push(
          '\x3c/tr\x3e\x3ctr\x3e\x3ctd colspan\x3d8 align\x3dcenter\x3e\x3ca class\x3d"cke_colormore" _cke_focus\x3d1 hidefocus\x3dtrue title\x3d"',
          g.more,
          '" onclick\x3d"CKEDITOR.tools.callFunction(',
          b,
          ",'?','",
          h,
          "');return false;\" href\x3d\"javascript:void('",
          g.more,
          "')\"",
          ' role\x3d"option" aria-posinset\x3d"',
          a,
          '" aria-setsize\x3d"',
          a,
          '"\x3e',
          g.more,
          "\x3c/a\x3e\x3c/td\x3e"
        );
      f.push("\x3c/tr\x3e\x3c/table\x3e");
      return f.join("");
    }
    function t(c) {
      return (
        "false" == c.getAttribute("contentEditable") ||
        c.getAttribute("data-nostyle")
      );
    }
    var k = c.config,
      g = c.lang.colorbutton;
    CKEDITOR.env.hc ||
      (r("TextColor", "fore", g.textColorTitle, 10),
      r("BGColor", "back", g.bgColorTitle, 20));
  },
});
CKEDITOR.config.colorButton_colors =
  "000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,F00,FF8C00,FFD700,008000,0FF,00F,EE82EE,A9A9A9,FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,FFF0F5,FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF";
CKEDITOR.config.colorButton_foreStyle = {
  element: "span",
  styles: { color: "#(color)" },
  overrides: [{ element: "font", attributes: { color: null } }],
};
CKEDITOR.config.colorButton_backStyle = {
  element: "span",
  styles: { "background-color": "#(color)" },
};
