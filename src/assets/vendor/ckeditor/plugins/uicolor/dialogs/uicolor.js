/*
 Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or http://ckeditor.com/license
*/
CKEDITOR.dialog.add("uicolor", function (b) {
  function f(a) {
    /^#/.test(a) && (a = window.YAHOO.util.Color.hex2rgb(a.substr(1)));
    c.setValue(a, !0);
    c.refresh(e);
  }
  function g(a) {
    b.setUiColor(a);
    d._.contents.tab1.configBox.setValue(
      'config.uiColor \x3d "#' + c.get("hex") + '"'
    );
  }
  var d,
    c,
    h = b.getUiColor(),
    e = "cke_uicolor_picker" + CKEDITOR.tools.getNextNumber();
  return {
    title: b.lang.uicolor.title,
    minWidth: 360,
    minHeight: 320,
    onLoad: function () {
      d = this;
      this.setupContent();
      CKEDITOR.env.ie7Compat && d.parts.contents.setStyle("overflow", "hidden");
    },
    contents: [
      {
        id: "tab1",
        label: "",
        title: "",
        expand: !0,
        padding: 0,
        elements: [
          {
            id: "yuiColorPicker",
            type: "html",
            html:
              "\x3cdiv id\x3d'" +
              e +
              "' class\x3d'cke_uicolor_picker' style\x3d'width: 360px; height: 200px; position: relative;'\x3e\x3c/div\x3e",
            onLoad: function () {
              var a = CKEDITOR.getUrl("plugins/uicolor/yui/");
              this.picker = c = new window.YAHOO.widget.ColorPicker(e, {
                showhsvcontrols: !0,
                showhexcontrols: !0,
                images: {
                  PICKER_THUMB: a + "assets/picker_thumb.png",
                  HUE_THUMB: a + "assets/hue_thumb.png",
                },
              });
              h && f(h);
              c.on("rgbChange", function () {
                d._.contents.tab1.predefined.setValue("");
                g("#" + c.get("hex"));
              });
              for (
                var a = new CKEDITOR.dom.nodeList(
                    c.getElementsByTagName("input")
                  ),
                  b = 0;
                b < a.count();
                b++
              )
                a.getItem(b).addClass("cke_dialog_ui_input_text");
            },
          },
          {
            id: "tab1",
            type: "vbox",
            children: [
              {
                type: "hbox",
                children: [
                  {
                    id: "predefined",
                    type: "select",
                    default: "",
                    label: b.lang.uicolor.predefined,
                    items: [
                      [""],
                      ["Light blue", "#9AB8F3"],
                      ["Sand", "#D2B48C"],
                      ["Metallic", "#949AAA"],
                      ["Purple", "#C2A3C7"],
                      ["Olive", "#A2C980"],
                      ["Happy green", "#9BD446"],
                      ["Jezebel Blue", "#14B8C4"],
                      ["Burn", "#FF893A"],
                      ["Easy red", "#FF6969"],
                      ["Pisces 3", "#48B4F2"],
                      ["Aquarius 5", "#487ED4"],
                      ["Absinthe", "#A8CF76"],
                      ["Scrambled Egg", "#C7A622"],
                      ["Hello monday", "#8E8D80"],
                      ["Lovely sunshine", "#F1E8B1"],
                      ["Recycled air", "#B3C593"],
                      ["Down", "#BCBCA4"],
                      ["Mark Twain", "#CFE91D"],
                      ["Specks of dust", "#D1B596"],
                      ["Lollipop", "#F6CE23"],
                    ],
                    onChange: function () {
                      var a = this.getValue();
                      a
                        ? (f(a),
                          g(a),
                          CKEDITOR.document
                            .getById("predefinedPreview")
                            .setStyle("background", a))
                        : CKEDITOR.document
                            .getById("predefinedPreview")
                            .setStyle("background", "");
                    },
                    onShow: function () {
                      var a = b.getUiColor();
                      a && this.setValue(a);
                    },
                  },
                  {
                    id: "predefinedPreview",
                    type: "html",
                    html: '\x3cdiv id\x3d"cke_uicolor_preview" style\x3d"border: 1px solid black; padding: 3px; width: 30px;"\x3e\x3cdiv id\x3d"predefinedPreview" style\x3d"width: 30px; height: 30px;"\x3e\x26nbsp;\x3c/div\x3e\x3c/div\x3e',
                  },
                ],
              },
              {
                id: "configBox",
                type: "text",
                label: b.lang.uicolor.config,
                onShow: function () {
                  var a = b.getUiColor();
                  a && this.setValue('config.uiColor \x3d "' + a + '"');
                },
              },
            ],
          },
        ],
      },
    ],
    buttons: [CKEDITOR.dialog.okButton],
  };
});
