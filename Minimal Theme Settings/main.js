var x = Object.defineProperty;
var q = Object.getOwnPropertyDescriptor;
var J = Object.getOwnPropertyNames;
var Q = Object.getPrototypeOf,
  X = Object.prototype.hasOwnProperty;
var Y = Reflect.get;
var Z = (e, t) => {
    for (var a in t) x(e, a, { get: t[a], enumerable: !0 });
  },
  ee = (e, t, a, i) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let m of J(t))
        !X.call(e, m) &&
          m !== a &&
          x(e, m, {
            get: () => t[m],
            enumerable: !(i = q(t, m)) || i.enumerable,
          });
    return e;
  };
var te = (e) => ee(x({}, "__esModule", { value: !0 }), e);
var T = (e, t, a) => Y(Q(e), a, t);
var n = (e, t, a) =>
  new Promise((i, m) => {
    var l = (d) => {
        try {
          o(a.next(d));
        } catch (r) {
          m(r);
        }
      },
      s = (d) => {
        try {
          o(a.throw(d));
        } catch (r) {
          m(r);
        }
      },
      o = (d) => (d.done ? i(d.value) : Promise.resolve(d.value).then(l, s));
    o((a = a.apply(e, t)).next());
  });
var ie = {};
Z(ie, { default: () => C });
module.exports = te(ie);
var _ = require("obsidian");
var M = require("obsidian");
var D = {
    lightStyle: "minimal-light",
    darkStyle: "minimal-dark",
    lightScheme: "minimal-default-light",
    darkScheme: "minimal-default-dark",
    lineHeight: 1.5,
    lineWidth: 40,
    lineWidthWide: 50,
    maxWidth: 88,
    textNormal: 16,
    textSmall: 13,
    imgGrid: !1,
    imgWidth: "img-default-width",
    tableWidth: "table-default-width",
    iframeWidth: "iframe-default-width",
    mapWidth: "map-default-width",
    chartWidth: "chart-default-width",
    colorfulHeadings: !1,
    colorfulFrame: !1,
    colorfulActiveStates: !1,
    trimNames: !0,
    labeledNav: !1,
    fullWidthMedia: !0,
    bordersToggle: !0,
    minimalStatus: !0,
    focusMode: !1,
    underlineInternal: !0,
    underlineExternal: !0,
    folding: !0,
    lineNumbers: !1,
    readableLineLength: !1,
  },
  c = class e extends M.PluginSettingTab {
    constructor(t, a) {
      (super(t, a), (this.plugin = a));
    }
    getSettingDefinitions() {
      return [
        {
          name: "帮助",
          desc: "学习如何使用Minimal并阅读相关文档。",
          render: (t) => {
            t.addButton((a) =>
              a
                .setButtonText("Open")
                .onClick(() => window.open("https://minimal.guide")),
            );
          },
        },
        {
          name: "更多选项",
          render: (t) => {
            let a = "obsidian-style-settings",
              i = this.app,
              m = a in i.plugins.manifests,
              l = a in i.plugins.plugins,
              s = () => {
                (i.setting.open(), i.setting.openTabById(a));
              };
            (t.setDesc(
              "借助样式设置插件对Minimal主题进行全方位自定义。",
            ),
              l
                ? t.addButton((o) => o.setButtonText("Open").onClick(s))
                : m
                  ? t.addButton((o) =>
                      o.setButtonText("Enable").onClick(() =>
                        n(this, null, function* () {
                          (yield i.plugins.enablePlugin(a), this.update());
                        }),
                      ),
                    )
                  : t.addButton((o) =>
                      o
                        .setButtonText("Install")
                        .onClick(() =>
                          window.open(`obsidian://show-plugin?id=${a}`),
                        ),
                    ));
          },
        },
        {
          type: "group",
          heading: "配色方案",
          items: [
            {
              name: "浅色模式下的颜色方案",
              desc: "浅色模式下预设的颜色选项。",
              control: {
                type: "dropdown",
                key: "lightScheme",
                options: {
                  "minimal-default-light": "默认",
                  "minimal-atom-light": "Atom",
                  "minimal-ayu-light": "Ayu",
                  "minimal-catppuccin-light": "Catppuccin",
                  "minimal-eink-light": "E-ink (beta)",
                  "minimal-everforest-light": "Everforest",
                  "minimal-flexoki-light": "Flexoki",
                  "minimal-gruvbox-light": "Gruvbox",
                  "minimal-macos-light": "macOS",
                  "minimal-nord-light": "Nord",
                  "minimal-rose-pine-light": "Rosé Pine",
                  "minimal-notion-light": "Sky",
                  "minimal-solarized-light": "Solarized",
                  "minimal-things-light": "事物",
                },
              },
            },
            {
              name: "浅色模式下的背景对比度",
              desc: "侧边栏与主内容区的对比",
              control: {
                type: "dropdown",
                key: "lightStyle",
                options: {
                  "minimal-light": "默认",
                  "minimal-light-white": "全白",
                  "minimal-light-tonal": "低对比度",
                  "minimal-light-contrast": "高对比度",
                },
              },
            },
            {
              name: "深色模式下的颜色方案",
              desc: "暗色模式下预设的颜色选项。",
              control: {
                type: "dropdown",
                key: "darkScheme",
                options: {
                  "minimal-default-dark": "默认",
                  "minimal-atom-dark": "Atom",
                  "minimal-ayu-dark": "Ayu",
                  "minimal-catppuccin-dark": "Catppuccin",
                  "minimal-dracula-dark": "Dracula",
                  "minimal-eink-dark": "E-ink (beta)",
                  "minimal-everforest-dark": "Everforest",
                  "minimal-flexoki-dark": "Flexoki",
                  "minimal-gruvbox-dark": "Gruvbox",
                  "minimal-macos-dark": "macOS",
                  "minimal-nord-dark": "Nord",
                  "minimal-rose-pine-dark": "Rosé Pine",
                  "minimal-notion-dark": "Sky",
                  "minimal-solarized-dark": "Solarized",
                  "minimal-things-dark": "事物",
                },
              },
            },
            {
              name: "深色模式下的背景对比度",
              desc: "侧边栏与主内容区的对比",
              control: {
                type: "dropdown",
                key: "darkStyle",
                options: {
                  "minimal-dark": "默认",
                  "minimal-dark-tonal": "低对比度",
                  "minimal-dark-black": "纯黑",
                },
              },
            },
          ],
        },
        {
          type: "group",
          heading: "Features",
          items: [
            {
              name: "主要导航的文本标签",
              desc: "左侧边栏中的导航项使用文本标签。",
              control: { type: "toggle", key: "labeledNav" },
            },
            {
              name: "多彩的窗口框架",
              desc: "应用的顶部区域使用您的强调色。",
              control: { type: "toggle", key: "colorfulFrame" },
            },
            {
              name: "多彩的激活状态",
              desc: "活动文件和菜单项使用您的强调色。",
              control: { type: "toggle", key: "colorfulActiveStates" },
            },
            {
              name: "多彩的标题",
              desc: "标题使用不同的颜色以区分大小。",
              control: { type: "toggle", key: "colorfulHeadings" },
            },
            {
              name: "最小化状态栏",
              desc: "关闭以使用全宽状态栏。",
              control: { type: "toggle", key: "minimalStatus" },
            },
            {
              name: "修剪侧边栏中的文件名",
              desc: "使用省略号以在单行上适应文件名。",
              control: { type: "toggle", key: "trimNames" },
            },
            {
              name: "工作区边框",
              desc: "显示工作区元素之间的分隔线。",
              control: { type: "toggle", key: "bordersToggle" },
            },
            {
              name: "专注模式",
              desc: "隐藏标签栏和状态栏，悬停以显示。可以通过快捷键切换。",
              control: { type: "toggle", key: "focusMode" },
            },
            {
              name: "下划线内部链接",
              desc: "显示内部链接的下划线。",
              control: { type: "toggle", key: "underlineInternal" },
            },
            {
              name: "下划线外部链接",
              desc: "显示外部链接的下划线。",
              control: { type: "toggle", key: "underlineExternal" },
            },
          ],
        },
        {
          type: "group",
          heading: "Media",
          items: [
            {
              name: "图片网格",
              desc: "将连续图片排成列。如需另起一行，在图片之间添加换行符。",
              control: { type: "toggle", key: "imgGrid" },
            },
            {
              name: "最大化媒体",
              desc: "图片和视频填充行宽。",
              control: { type: "toggle", key: "fullWidthMedia" },
            },
          ],
        },
        {
          type: "group",
          heading: "布局",
          items: [
            {
              name: "表格宽度",
              desc: "表格默认宽度。",
              control: {
                type: "dropdown",
                key: "tableWidth",
                options: {
                  "table-default-width": "默认",
                  "table-wide": "宽线宽",
                  "table-max": "最大行宽",
                  "table-100": "100% 面板宽度",
                },
              },
            },
            {
              name: "图像宽度",
              desc: "图片块的默认宽度。",
              control: {
                type: "dropdown",
                key: "imgWidth",
                options: {
                  "img-default-width": "默认",
                  "img-wide": "宽线宽",
                  "img-max": "最大行宽",
                  "img-100": "100% 面板宽度",
                },
              },
            },
            {
              name: "Iframe宽度",
              desc: "iframe块的默认宽度。",
              control: {
                type: "dropdown",
                key: "iframeWidth",
                options: {
                  "iframe-default-width": "默认",
                  "iframe-wide": "宽线宽",
                  "iframe-max": "最大行宽",
                  "iframe-100": "100% 面板宽度",
                },
              },
            },
            {
              name: "映射宽度",
              desc: "地图块的默认宽度。",
              control: {
                type: "dropdown",
                key: "mapWidth",
                options: {
                  "map-default-width": "默认",
                  "map-wide": "宽线宽",
                  "map-max": "最大行宽",
                  "map-100": "100% 面板宽度",
                },
              },
            },
            {
              name: "图表宽度",
              desc: "图表块的默认宽度。",
              control: {
                type: "dropdown",
                key: "chartWidth",
                options: {
                  "chart-default-width": "默认",
                  "chart-wide": "宽线宽",
                  "chart-max": "最大行宽",
                  "chart-100": "100% 面板宽度",
                },
              },
            },
          ],
        },
        {
          type: "group",
          heading: "文字排版增强",
          items: [
            this.sliderSetting(
              "小字体大小",
              "Text in sidebars and tabs.",
              "textSmall",
              { min: 9, max: 20, step: 1 },
              () => this.plugin.refresh(),
            ),
            this.sliderSetting(
              "行高",
              "Line height of text.",
              "lineHeight",
              { min: 1.1, max: 2, step: 0.1 },
              () => this.plugin.refresh(),
              (t) => String(t),
            ),
            this.sliderSetting(
              "正常线宽",
              "Number of characters per line.",
              "lineWidth",
              { min: 20, max: 100, step: 1 },
              () => this.plugin.refresh(),
            ),
            this.sliderSetting(
              "宽线宽",
              "Number of characters per line for wide elements.",
              "lineWidthWide",
              { min: 20, max: 100, step: 1 },
              () => this.plugin.refresh(),
            ),
            this.sliderSetting(
              "最大行宽",
              "Percentage of space inside a pane that a line can fill.",
              "maxWidth",
              { min: 70, max: 96, step: 1 },
              () => this.plugin.refresh(),
              (t) => `${t}%`,
            ),
          ],
        },
      ];
    }
    sliderSetting(t, a, i, m, l, s) {
      return {
        name: t,
        desc: a,
        render: (o) => {
          let d;
          (o.addExtraButton((r) =>
            r
              .setIcon("rotate-ccw")
              .setTooltip("Restore default")
              .onClick(() =>
                n(this, null, function* () {
                  let h = D[i];
                  ((this.plugin.settings[i] = h),
                    d.setValue(h),
                    yield this.plugin.saveData(this.plugin.settings),
                    l());
                }),
              ),
          ),
            o.addSlider((r) => {
              ((d = r
                .setLimits(m.min, m.max, m.step)
                .setValue(this.plugin.settings[i])),
                s && d.setDisplayFormat(s),
                d.onChange((h) =>
                  n(this, null, function* () {
                    ((this.plugin.settings[i] = h),
                      yield this.plugin.saveData(this.plugin.settings),
                      l());
                  }),
                ));
            }));
        },
      };
    }
    setControlValue(t, a) {
      return n(this, null, function* () {
        switch (
          (yield T(e.prototype, this, "setControlValue").call(this, t, a), t)
        ) {
          case "lightScheme":
            this.plugin.updateLightScheme();
            break;
          case "lightStyle":
            this.plugin.updateLightStyle();
            break;
          case "darkScheme":
            this.plugin.updateDarkScheme();
            break;
          case "darkStyle":
            this.plugin.updateDarkStyle();
            break;
          default:
            this.plugin.refresh();
            break;
        }
      });
    }
  };
function N(e) {
  (e.addCommand({
    id: "increase-body-font-size",
    name: "增加正文字体大小",
    callback: () => {
      ((e.settings.textNormal = e.settings.textNormal + 0.5),
        e.saveData(e.settings),
        e.setFontSize());
    },
  }),
    e.addCommand({
      id: "decrease-body-font-size",
      name: "减少正文字体大小",
      callback: () => {
        ((e.settings.textNormal = e.settings.textNormal - 0.5),
          e.saveData(e.settings),
          e.setFontSize());
      },
    }));
}
function z(e) {
  (e.addCommand({
    id: "toggle-hidden-borders",
    name: "切换侧边栏边框",
    callback: () => {
      ((e.settings.bordersToggle = !e.settings.bordersToggle),
        e.saveData(e.settings),
        e.refresh());
    },
  }),
    e.addCommand({
      id: "toggle-colorful-headings",
      name: "切换多彩标题",
      callback: () => {
        ((e.settings.colorfulHeadings = !e.settings.colorfulHeadings),
          e.saveData(e.settings),
          e.refresh());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-focus-mode",
      name: "切换专注模式",
      callback: () => {
        ((e.settings.focusMode = !e.settings.focusMode),
          e.saveData(e.settings),
          e.refresh());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-colorful-frame",
      name: "切换多彩窗口框架",
      callback: () => {
        ((e.settings.colorfulFrame = !e.settings.colorfulFrame),
          e.saveData(e.settings),
          e.refresh());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-img-grid",
      name: "切换图片网格",
      callback: () => {
        ((e.settings.imgGrid = !e.settings.imgGrid),
          e.saveData(e.settings),
          e.refresh());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-switch",
      name: "在浅色和深色模式间切换",
      callback: () => {
        e.updateTheme();
      },
    }));
}
var g = [
    "minimal-light",
    "minimal-light-tonal",
    "minimal-light-contrast",
    "minimal-light-white",
  ],
  k = ["minimal-dark", "minimal-dark-tonal", "minimal-dark-black"];
var f = ["table-100", "table-default-width", "table-wide", "table-max"],
  S = ["iframe-100", "iframe-default-width", "iframe-wide", "iframe-max"],
  b = ["img-100", "img-default-width", "img-wide", "img-max"],
  y = ["map-100", "map-default-width", "map-wide", "map-max"],
  v = ["chart-100", "chart-default-width", "chart-wide", "chart-max"];
function A(e) {
  (e.addCommand({
    id: "toggle-minimal-dark-cycle",
    name: "循环切换深色模式风格",
    callback: () => {
      ((e.settings.darkStyle =
        k[(k.indexOf(e.settings.darkStyle) + 1) % k.length]),
        e.saveData(e.settings),
        e.updateDarkStyle());
    },
  }),
    e.addCommand({
      id: "toggle-minimal-light-cycle",
      name: "循环切换浅色模式风格",
      callback: () => {
        ((e.settings.lightStyle =
          g[(g.indexOf(e.settings.lightStyle) + 1) % g.length]),
          e.saveData(e.settings),
          e.updateLightStyle());
      },
    }),
    e.addCommand({
      id: "cycle-minimal-table-width",
      name: "在表格宽度选项之间循环",
      callback: () => {
        ((e.settings.tableWidth =
          f[(f.indexOf(e.settings.tableWidth) + 1) % f.length]),
          e.saveData(e.settings),
          e.refresh());
      },
    }),
    e.addCommand({
      id: "cycle-minimal-image-width",
      name: "在图片宽度选项之间循环",
      callback: () => {
        ((e.settings.imgWidth =
          b[(b.indexOf(e.settings.imgWidth) + 1) % b.length]),
          e.saveData(e.settings),
          e.refresh());
      },
    }),
    e.addCommand({
      id: "cycle-minimal-iframe-width",
      name: "在iframe宽度选项之间循环",
      callback: () => {
        ((e.settings.iframeWidth =
          S[(S.indexOf(e.settings.iframeWidth) + 1) % S.length]),
          e.saveData(e.settings),
          e.refresh());
      },
    }),
    e.addCommand({
      id: "cycle-minimal-chart-width",
      name: "在图表宽度选项之间循环",
      callback: () => {
        ((e.settings.chartWidth =
          v[(v.indexOf(e.settings.chartWidth) + 1) % v.length]),
          e.saveData(e.settings),
          e.refresh());
      },
    }),
    e.addCommand({
      id: "cycle-minimal-map-width",
      name: "在地图宽度选项之间循环",
      callback: () => {
        ((e.settings.mapWidth =
          y[(y.indexOf(e.settings.mapWidth) + 1) % y.length]),
          e.saveData(e.settings),
          e.refresh());
      },
    }));
}
function E(e) {
  (e.addCommand({
    id: "toggle-minimal-light-default",
    name: "使用浅色模式（默认）",
    callback: () => {
      ((e.settings.lightStyle = "minimal-light"),
        e.saveData(e.settings),
        e.updateLightStyle());
    },
  }),
    e.addCommand({
      id: "toggle-minimal-light-white",
      name: "使用浅色模式（全白）",
      callback: () => {
        ((e.settings.lightStyle = "minimal-light-white"),
          e.saveData(e.settings),
          e.updateLightStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-light-tonal",
      name: "使用浅色模式（低对比度）",
      callback: () => {
        ((e.settings.lightStyle = "minimal-light-tonal"),
          e.saveData(e.settings),
          e.updateLightStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-light-contrast",
      name: "使用浅色模式（高对比度）",
      callback: () => {
        ((e.settings.lightStyle = "minimal-light-contrast"),
          e.saveData(e.settings),
          e.updateLightStyle());
      },
    }));
}
function F(e) {
  (e.addCommand({
    id: "toggle-minimal-dark-default",
    name: "使用深色模式（默认）",
    callback: () => {
      ((e.settings.darkStyle = "minimal-dark"),
        e.saveData(e.settings),
        e.updateDarkStyle());
    },
  }),
    e.addCommand({
      id: "toggle-minimal-dark-tonal",
      name: "使用暗色模式（低对比度）",
      callback: () => {
        ((e.settings.darkStyle = "minimal-dark-tonal"),
          e.saveData(e.settings),
          e.updateDarkStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-dark-black",
      name: "使用暗色模式（纯黑）",
      callback: () => {
        ((e.settings.darkStyle = "minimal-dark-black"),
          e.saveData(e.settings),
          e.updateDarkStyle());
      },
    }));
}
function I(e) {
  (e.addCommand({
    id: "toggle-minimal-atom-light",
    name: "切换浅色配色方案为 Atom（浅色）",
    callback: () => {
      ((e.settings.lightScheme = "minimal-atom-light"),
        e.saveData(e.settings),
        e.updateLightScheme(),
        e.updateLightStyle());
    },
  }),
    e.addCommand({
      id: "toggle-minimal-ayu-light",
      name: "切换浅色配色方案为 Ayu（浅色）",
      callback: () => {
        ((e.settings.lightScheme = "minimal-ayu-light"),
          e.saveData(e.settings),
          e.updateLightScheme(),
          e.updateLightStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-catppuccin-light",
      name: "切换浅色配色方案为 Catppuccin（浅色）",
      callback: () => {
        ((e.settings.lightScheme = "minimal-catppuccin-light"),
          e.saveData(e.settings),
          e.updateLightScheme(),
          e.updateLightStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-default-light",
      name: "切换浅色配色方案为默认（浅色）",
      callback: () => {
        ((e.settings.lightScheme = "minimal-default-light"),
          e.saveData(e.settings),
          e.updateLightScheme(),
          e.updateLightStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-gruvbox-light",
      name: "切换浅色配色方案为 Gruvbox（浅色）",
      callback: () => {
        ((e.settings.lightScheme = "minimal-gruvbox-light"),
          e.saveData(e.settings),
          e.updateLightScheme(),
          e.updateLightStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-eink-light",
      name: "切换浅色配色方案为 E-ink（浅色）",
      callback: () => {
        ((e.settings.lightScheme = "minimal-eink-light"),
          e.saveData(e.settings),
          e.updateLightScheme(),
          e.updateLightStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-everforest-light",
      name: "切换浅色配色方案为 Everforest（浅色）",
      callback: () => {
        ((e.settings.lightScheme = "minimal-everforest-light"),
          e.saveData(e.settings),
          e.updateLightScheme(),
          e.updateLightStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-flexoki-light",
      name: "切换浅色配色方案为 Flexoki（浅色）",
      callback: () => {
        ((e.settings.lightScheme = "minimal-flexoki-light"),
          e.saveData(e.settings),
          e.updateLightScheme(),
          e.updateLightStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-macos-light",
      name: "切换到 macOS (浅色) 配色方案",
      callback: () => {
        ((e.settings.lightScheme = "minimal-macos-light"),
          e.saveData(e.settings),
          e.updateLightScheme(),
          e.updateLightStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-notion-light",
      name: "切换到 Sky (浅色) 配色方案",
      callback: () => {
        ((e.settings.lightScheme = "minimal-notion-light"),
          e.saveData(e.settings),
          e.updateLightScheme(),
          e.updateLightStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-nord-light",
      name: "切换到 Nord (浅色) 配色方案",
      callback: () => {
        ((e.settings.lightScheme = "minimal-nord-light"),
          e.saveData(e.settings),
          e.updateLightScheme(),
          e.updateLightStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-rose-pine-light",
      name: "切换到 Rosé Pine (浅色) 配色方案",
      callback: () => {
        ((e.settings.lightScheme = "minimal-rose-pine-light"),
          e.saveData(e.settings),
          e.updateLightScheme(),
          e.updateLightStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-solarized-light",
      name: "切换到 Solarized (浅色) 配色方案",
      callback: () => {
        ((e.settings.lightScheme = "minimal-solarized-light"),
          e.saveData(e.settings),
          e.updateLightScheme(),
          e.updateLightStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-things-light",
      name: "切换到 Things (浅色) 配色方案",
      callback: () => {
        ((e.settings.lightScheme = "minimal-things-light"),
          e.saveData(e.settings),
          e.updateLightScheme(),
          e.updateLightStyle());
      },
    }));
}
function H(e) {
  (e.addCommand({
    id: "toggle-minimal-atom-dark",
    name: "切换到 Atom (深色) 配色方案",
    callback: () => {
      ((e.settings.darkScheme = "minimal-atom-dark"),
        e.saveData(e.settings),
        e.updateDarkScheme(),
        e.updateDarkStyle());
    },
  }),
    e.addCommand({
      id: "toggle-minimal-ayu-dark",
      name: "切换到 Ayu (深色) 配色方案",
      callback: () => {
        ((e.settings.darkScheme = "minimal-ayu-dark"),
          e.saveData(e.settings),
          e.updateDarkScheme(),
          e.updateDarkStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-catppuccin-dark",
      name: "切换到 Catppuccin (深色) 配色方案",
      callback: () => {
        ((e.settings.darkScheme = "minimal-catppuccin-dark"),
          e.saveData(e.settings),
          e.updateDarkScheme(),
          e.updateDarkStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-dracula-dark",
      name: "切换到 Dracula (深色) 配色方案",
      callback: () => {
        ((e.settings.darkScheme = "minimal-dracula-dark"),
          e.saveData(e.settings),
          e.updateDarkScheme(),
          e.updateDarkStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-default-dark",
      name: "切换到默认的暗色主题（暗色）",
      callback: () => {
        ((e.settings.darkScheme = "minimal-default-dark"),
          e.saveData(e.settings),
          e.updateDarkScheme(),
          e.updateDarkStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-eink-dark",
      name: "切换到E-ink暗色主题（暗色）",
      callback: () => {
        ((e.settings.darkScheme = "minimal-eink-dark"),
          e.saveData(e.settings),
          e.updateDarkScheme(),
          e.updateDarkStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-everforest-dark",
      name: "切换到Everforest暗色主题（暗色）",
      callback: () => {
        ((e.settings.darkScheme = "minimal-everforest-dark"),
          e.saveData(e.settings),
          e.updateDarkScheme(),
          e.updateDarkStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-flexoki-dark",
      name: "切换到Flexoki暗色主题（暗色）",
      callback: () => {
        ((e.settings.darkScheme = "minimal-flexoki-dark"),
          e.saveData(e.settings),
          e.updateDarkScheme(),
          e.updateDarkStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-gruvbox-dark",
      name: "切换到Grubox暗色主题（暗色）",
      callback: () => {
        ((e.settings.darkScheme = "minimal-gruvbox-dark"),
          e.saveData(e.settings),
          e.updateDarkScheme(),
          e.updateDarkStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-macos-dark",
      name: "切换到macOS暗色主题（暗色）",
      callback: () => {
        ((e.settings.darkScheme = "minimal-macos-dark"),
          e.saveData(e.settings),
          e.updateDarkScheme(),
          e.updateDarkStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-nord-dark",
      name: "切换到Nord暗色主题（暗色）",
      callback: () => {
        ((e.settings.darkScheme = "minimal-nord-dark"),
          e.saveData(e.settings),
          e.updateDarkScheme(),
          e.updateDarkStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-notion-dark",
      name: "切换到Sky暗色主题（暗色）",
      callback: () => {
        ((e.settings.darkScheme = "minimal-notion-dark"),
          e.saveData(e.settings),
          e.updateDarkScheme(),
          e.updateDarkStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-rose-pine-dark",
      name: "切换到Rosé Pine暗色主题（暗色）",
      callback: () => {
        ((e.settings.darkScheme = "minimal-rose-pine-dark"),
          e.saveData(e.settings),
          e.updateDarkScheme(),
          e.updateDarkStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-solarized-dark",
      name: "切换到Solarized暗色主题（暗色）",
      callback: () => {
        ((e.settings.darkScheme = "minimal-solarized-dark"),
          e.saveData(e.settings),
          e.updateDarkScheme(),
          e.updateDarkStyle());
      },
    }),
    e.addCommand({
      id: "toggle-minimal-things-dark",
      name: "切换到Things（暗色）的暗色配色方案",
      callback: () => {
        ((e.settings.darkScheme = "minimal-things-dark"),
          e.saveData(e.settings),
          e.updateDarkScheme(),
          e.updateDarkStyle());
      },
    }));
}
function B(e) {
  (N(e), A(e), z(e), E(e), F(e), I(e), H(e));
}
var ae = [
  "--font-ui-small",
  "--line-height",
  "--line-width",
  "--line-width-wide",
  "--max-width",
];
function P() {
  document.body.classList.add("minimal-theme");
}
function U() {
  for (let e of ae) document.body.style.removeProperty(e);
  document.body.classList.remove("minimal-theme");
}
function O(e) {
  (p(),
    L(),
    document.body.addClass(
      e.lightStyle,
      e.lightScheme,
      e.darkStyle,
      e.darkScheme,
    ),
    document.body.classList.toggle("borders-none", !e.bordersToggle),
    document.body.classList.toggle("colorful-headings", e.colorfulHeadings),
    document.body.classList.toggle("colorful-frame", e.colorfulFrame),
    document.body.classList.toggle("colorful-active", e.colorfulActiveStates),
    document.body.classList.toggle("minimal-focus-mode", e.focusMode),
    document.body.classList.toggle("links-int-on", e.underlineInternal),
    document.body.classList.toggle("links-ext-on", e.underlineExternal),
    document.body.classList.toggle("full-width-media", e.fullWidthMedia),
    document.body.classList.toggle("img-grid", e.imgGrid),
    document.body.classList.toggle("minimal-status-off", !e.minimalStatus),
    document.body.classList.toggle("full-file-names", !e.trimNames),
    document.body.classList.toggle("labeled-nav", e.labeledNav),
    document.body.classList.toggle("minimal-folding", e.folding),
    document.body.addClass(
      e.chartWidth,
      e.tableWidth,
      e.imgWidth,
      e.iframeWidth,
      e.mapWidth,
    ),
    document.body.setCssProps({
      "--font-ui-small": `${e.textSmall}px`,
      "--line-height": `${e.lineHeight}`,
      "--line-width": `${e.lineWidth}rem`,
      "--line-width-wide": `${e.lineWidthWide}rem`,
      "--max-width": `${e.maxWidth}%`,
    }));
}
function L() {
  (document.body.removeClass(
    "borders-none",
    "colorful-headings",
    "colorful-frame",
    "colorful-active",
    "minimal-focus-mode",
    "links-int-on",
    "links-ext-on",
    "full-width-media",
    "img-grid",
    "minimal-status-off",
    "full-file-names",
    "labeled-nav",
    "minimal-folding",
  ),
    document.body.removeClass(
      "table-wide",
      "table-max",
      "table-100",
      "table-default-width",
      "iframe-wide",
      "iframe-max",
      "iframe-100",
      "iframe-default-width",
      "img-wide",
      "img-max",
      "img-100",
      "img-default-width",
      "chart-wide",
      "chart-max",
      "chart-100",
      "chart-default-width",
      "map-wide",
      "map-max",
      "map-100",
      "map-default-width",
    ));
}
function p() {
  document.body.removeClass(
    "minimal-light",
    "minimal-light-tonal",
    "minimal-light-contrast",
    "minimal-light-white",
    "minimal-dark",
    "minimal-dark-tonal",
    "minimal-dark-black",
  );
}
function w() {
  document.body.removeClass(
    "minimal-atom-dark",
    "minimal-ayu-dark",
    "minimal-catppuccin-dark",
    "minimal-default-dark",
    "minimal-dracula-dark",
    "minimal-eink-dark",
    "minimal-everforest-dark",
    "minimal-flexoki-dark",
    "minimal-gruvbox-dark",
    "minimal-macos-dark",
    "minimal-nord-dark",
    "minimal-notion-dark",
    "minimal-rose-pine-dark",
    "minimal-solarized-dark",
    "minimal-things-dark",
  );
}
function u() {
  document.body.removeClass(
    "minimal-atom-light",
    "minimal-ayu-light",
    "minimal-catppuccin-light",
    "minimal-default-light",
    "minimal-eink-light",
    "minimal-everforest-light",
    "minimal-flexoki-light",
    "minimal-gruvbox-light",
    "minimal-macos-light",
    "minimal-nord-light",
    "minimal-notion-light",
    "minimal-rose-pine-light",
    "minimal-solarized-light",
    "minimal-things-light",
  );
}
function G(e, t) {
  (e.vault.setConfig("baseFontSize", t), e.updateFontSize());
}
function R(e, t) {
  (document.body.removeClass(
    "theme-light",
    "minimal-dark",
    "minimal-dark-tonal",
    "minimal-dark-black",
  ),
    document.body.addClass("theme-dark", t.darkStyle),
    e.vault.getConfig("theme") !== "system" &&
      (e.setTheme("obsidian"), e.vault.setConfig("theme", "obsidian")),
    e.workspace.trigger("css-change"));
}
function $(e, t) {
  (document.body.removeClass(
    "theme-dark",
    "minimal-light",
    "minimal-light-tonal",
    "minimal-light-contrast",
    "minimal-light-white",
  ),
    document.body.addClass("theme-light", t.lightStyle),
    e.vault.getConfig("theme") !== "system" &&
      (e.setTheme("moonstone"), e.vault.setConfig("theme", "moonstone")),
    e.workspace.trigger("css-change"));
}
function V(e) {
  (w(), document.body.addClass(e.darkScheme));
}
function K(e) {
  (u(), document.body.addClass(e.lightScheme));
}
function j(e) {
  if (e.vault.getConfig("theme") === "system")
    document.body.classList.contains("theme-light")
      ? (document.body.removeClass("theme-light"),
        document.body.addClass("theme-dark"))
      : (document.body.removeClass("theme-dark"),
        document.body.addClass("theme-light"));
  else {
    document.body.classList.contains("theme-light")
      ? (document.body.removeClass("theme-light"),
        document.body.addClass("theme-dark"))
      : (document.body.removeClass("theme-dark"),
        document.body.addClass("theme-light"));
    let a =
      e.vault.getConfig("theme") === "moonstone" ? "obsidian" : "moonstone";
    (e.setTheme(a), e.vault.setConfig("theme", a));
  }
  e.workspace.trigger("css-change");
}
function W(e) {
  let t = document.getElementsByClassName("mod-left-split")[0],
    a = document.getElementsByClassName("side-dock-ribbon")[0];
  t &&
  a &&
  document.body.classList.contains("theme-light") &&
  e.lightStyle == "minimal-light-contrast"
    ? (t.addClass("theme-dark"), a.addClass("theme-dark"))
    : t && a && (t.removeClass("theme-dark"), a.removeClass("theme-dark"));
}
var C = class extends _.Plugin {
  onload() {
    return n(this, null, function* () {
      (yield this.loadSettings(),
        this.addSettingTab(new c(this.app, this)),
        P(),
        this.setupListeners(),
        this.refresh(),
        B(this));
    });
  }
  onunload() {
    let t = document.getElementsByClassName("mod-left-split")[0];
    t && t.removeClass("theme-dark");
    let a = document.getElementsByClassName("side-dock-ribbon")[0];
    (a && a.removeClass("theme-dark"), U(), p(), L(), u(), w());
  }
  loadSettings() {
    return n(this, null, function* () {
      this.settings = Object.assign({}, D, yield this.loadData());
    });
  }
  saveSettings() {
    return n(this, null, function* () {
      yield this.saveData(this.settings);
    });
  }
  setupListeners() {
    let t = () => {
        let i = this.app.vault.getConfig("baseFontSize");
        this.settings.textNormal = i;
        let m = !1,
          l = !1,
          s = !1;
        (this.app.vault.getConfig("foldHeading")
          ? ((this.settings.folding = !0), (m = !0))
          : (this.settings.folding = !1),
          this.app.vault.getConfig("showLineNumber")
            ? ((this.settings.lineNumbers = !0), (l = !0))
            : (this.settings.lineNumbers = !1),
          this.app.vault.getConfig("readableLineLength")
            ? ((this.settings.readableLineLength = !0), (s = !0))
            : (this.settings.readableLineLength = !1));
        let o = document.body.classList;
        (o.toggle("minimal-folding", m),
          o.toggle("minimal-line-nums", l),
          o.toggle("minimal-readable", s),
          o.toggle("minimal-readable-off", !s),
          this.saveData(this.settings));
      },
      a = () => {
        W(this.settings);
      };
    (this.registerEvent(this.app.vault.on("config-changed", t)),
      this.registerEvent(this.app.workspace.on("css-change", a)),
      t(),
      this.app.workspace.onLayoutReady(() => {
        W(this.settings);
      }));
  }
  refresh() {
    O(this.settings);
  }
  setFontSize() {
    G(this.app, this.settings.textNormal);
  }
  updateDarkStyle() {
    R(this.app, this.settings);
  }
  updateLightStyle() {
    $(this.app, this.settings);
  }
  updateDarkScheme() {
    V(this.settings);
  }
  updateLightScheme() {
    K(this.settings);
  }
  updateTheme() {
    j(this.app);
  }
};
