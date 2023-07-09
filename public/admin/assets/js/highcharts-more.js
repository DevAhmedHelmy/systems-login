/*
 Highcharts JS v10.2.1 (2022-08-29)

 (c) 2009-2021 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (e) {
    "object" === typeof module && module.exports
        ? ((e["default"] = e), (module.exports = e))
        : "function" === typeof define && define.amd
        ? define("highcharts/highcharts-more", ["highcharts"], function (A) {
              e(A);
              e.Highcharts = A;
              return e;
          })
        : e("undefined" !== typeof Highcharts ? Highcharts : void 0);
})(function (e) {
    function A(a, b, f, c) {
        a.hasOwnProperty(b) ||
            ((a[b] = c.apply(null, f)),
            "function" === typeof CustomEvent &&
                window.dispatchEvent(
                    new CustomEvent("HighchartsModuleLoaded", {
                        detail: { path: b, module: a[b] },
                    })
                ));
    }
    e = e ? e._modules : {};
    A(
        e,
        "Extensions/Pane.js",
        [
            e["Core/Chart/Chart.js"],
            e["Series/CenteredUtilities.js"],
            e["Core/Globals.js"],
            e["Core/Pointer.js"],
            e["Core/Utilities.js"],
        ],
        function (a, b, f, c, p) {
            function e(g, d, k) {
                return (
                    Math.sqrt(Math.pow(g - k[0], 2) + Math.pow(d - k[1], 2)) <=
                    k[2] / 2
                );
            }
            var m = p.addEvent,
                t = p.extend,
                q = p.merge,
                D = p.pick,
                v = p.splat;
            a.prototype.collectionsWithUpdate.push("pane");
            p = (function () {
                function g(d, k) {
                    this.options =
                        this.chart =
                        this.center =
                        this.background =
                            void 0;
                    this.coll = "pane";
                    this.defaultOptions = {
                        center: ["50%", "50%"],
                        size: "85%",
                        innerSize: "0%",
                        startAngle: 0,
                    };
                    this.defaultBackgroundOptions = {
                        shape: "circle",
                        borderWidth: 1,
                        borderColor: "#cccccc",
                        backgroundColor: {
                            linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
                            stops: [
                                [0, "#ffffff"],
                                [1, "#e6e6e6"],
                            ],
                        },
                        from: -Number.MAX_VALUE,
                        innerRadius: 0,
                        to: Number.MAX_VALUE,
                        outerRadius: "105%",
                    };
                    this.init(d, k);
                }
                g.prototype.init = function (d, k) {
                    this.chart = k;
                    this.background = [];
                    k.pane.push(this);
                    this.setOptions(d);
                };
                g.prototype.setOptions = function (d) {
                    this.options = q(
                        this.defaultOptions,
                        this.chart.angular ? { background: {} } : void 0,
                        d
                    );
                };
                g.prototype.render = function () {
                    var d = this.options,
                        k = this.options.background,
                        n = this.chart.renderer;
                    this.group ||
                        (this.group = n
                            .g("pane-group")
                            .attr({ zIndex: d.zIndex || 0 })
                            .add());
                    this.updateCenter();
                    if (k)
                        for (
                            k = v(k),
                                d = Math.max(
                                    k.length,
                                    this.background.length || 0
                                ),
                                n = 0;
                            n < d;
                            n++
                        )
                            k[n] && this.axis
                                ? this.renderBackground(
                                      q(this.defaultBackgroundOptions, k[n]),
                                      n
                                  )
                                : this.background[n] &&
                                  ((this.background[n] =
                                      this.background[n].destroy()),
                                  this.background.splice(n, 1));
                };
                g.prototype.renderBackground = function (d, k) {
                    var n = "animate",
                        h = { class: "highcharts-pane " + (d.className || "") };
                    this.chart.styledMode ||
                        t(h, {
                            fill: d.backgroundColor,
                            stroke: d.borderColor,
                            "stroke-width": d.borderWidth,
                        });
                    this.background[k] ||
                        ((this.background[k] = this.chart.renderer
                            .path()
                            .add(this.group)),
                        (n = "attr"));
                    this.background[k][n]({
                        d: this.axis.getPlotBandPath(d.from, d.to, d),
                    }).attr(h);
                };
                g.prototype.updateCenter = function (d) {
                    this.center = (d || this.axis || {}).center =
                        b.getCenter.call(this);
                };
                g.prototype.update = function (d, k) {
                    q(!0, this.options, d);
                    this.setOptions(this.options);
                    this.render();
                    this.chart.axes.forEach(function (d) {
                        d.pane === this && ((d.pane = null), d.update({}, k));
                    }, this);
                };
                return g;
            })();
            a.prototype.getHoverPane = function (g) {
                var d = this,
                    k;
                g &&
                    d.pane.forEach(function (n) {
                        var h = g.chartX - d.plotLeft,
                            c = g.chartY - d.plotTop;
                        e(d.inverted ? c : h, d.inverted ? h : c, n.center) &&
                            (k = n);
                    });
                return k;
            };
            m(a, "afterIsInsidePlot", function (g) {
                this.polar &&
                    (g.isInsidePlot = this.pane.some(function (d) {
                        return e(g.x, g.y, d.center);
                    }));
            });
            m(c, "beforeGetHoverData", function (g) {
                var d = this.chart;
                d.polar
                    ? ((d.hoverPane = d.getHoverPane(g)),
                      (g.filter = function (k) {
                          return (
                              k.visible &&
                              !(!g.shared && k.directTouch) &&
                              D(k.options.enableMouseTracking, !0) &&
                              (!d.hoverPane || k.xAxis.pane === d.hoverPane)
                          );
                      }))
                    : (d.hoverPane = void 0);
            });
            m(c, "afterGetHoverData", function (g) {
                var d = this.chart;
                g.hoverPoint &&
                    g.hoverPoint.plotX &&
                    g.hoverPoint.plotY &&
                    d.hoverPane &&
                    !e(
                        g.hoverPoint.plotX,
                        g.hoverPoint.plotY,
                        d.hoverPane.center
                    ) &&
                    (g.hoverPoint = void 0);
            });
            f.Pane = p;
            return f.Pane;
        }

    );
    A(
        e,
        "Series/AreaRange/AreaRangePoint.js",
        [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]],
        function (a, b) {
            var f =
                (this && this.__extends) ||
                (function () {
                    var c = function (b, a) {
                        c =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (c, b) {
                                    c.__proto__ = b;
                                }) ||
                            function (c, b) {
                                for (var g in b)
                                    b.hasOwnProperty(g) && (c[g] = b[g]);
                            };
                        return c(b, a);
                    };
                    return function (b, a) {
                        function f() {
                            this.constructor = b;
                        }
                        c(b, a);
                        b.prototype =
                            null === a
                                ? Object.create(a)
                                : ((f.prototype = a.prototype), new f());
                    };
                })();
            a = a.seriesTypes.area.prototype;
            var c = a.pointClass.prototype,
                p = b.defined,
                e = b.isNumber;
            return (function (b) {
                function a() {
                    var c = (null !== b && b.apply(this, arguments)) || this;
                    c.high = void 0;
                    c.low = void 0;
                    c.options = void 0;
                    c.plotHigh = void 0;
                    c.plotLow = void 0;
                    c.plotHighX = void 0;
                    c.plotLowX = void 0;
                    c.plotX = void 0;
                    c.series = void 0;
                    return c;
                }
                f(a, b);
                a.prototype.setState = function () {
                    var b = this.state,
                        a = this.series,
                        f = a.chart.polar;
                    p(this.plotHigh) ||
                        (this.plotHigh = a.yAxis.toPixels(this.high, !0));
                    p(this.plotLow) ||
                        (this.plotLow = this.plotY =
                            a.yAxis.toPixels(this.low, !0));
                    a.stateMarkerGraphic &&
                        ((a.lowerStateMarkerGraphic = a.stateMarkerGraphic),
                        (a.stateMarkerGraphic = a.upperStateMarkerGraphic));
                    this.graphic = this.upperGraphic;
                    this.plotY = this.plotHigh;
                    f && (this.plotX = this.plotHighX);
                    c.setState.apply(this, arguments);
                    this.state = b;
                    this.plotY = this.plotLow;
                    this.graphic = this.lowerGraphic;
                    f && (this.plotX = this.plotLowX);
                    a.stateMarkerGraphic &&
                        ((a.upperStateMarkerGraphic = a.stateMarkerGraphic),
                        (a.stateMarkerGraphic = a.lowerStateMarkerGraphic),
                        (a.lowerStateMarkerGraphic = void 0));
                    c.setState.apply(this, arguments);
                };
                a.prototype.haloPath = function () {
                    var a = this.series.chart.polar,
                        b = [];
                    this.plotY = this.plotLow;
                    a && (this.plotX = this.plotLowX);
                    this.isInside && (b = c.haloPath.apply(this, arguments));
                    this.plotY = this.plotHigh;
                    a && (this.plotX = this.plotHighX);
                    this.isTopInside &&
                        (b = b.concat(c.haloPath.apply(this, arguments)));
                    return b;
                };
                a.prototype.isValid = function () {
                    return e(this.low) && e(this.high);
                };
                return a;
            })(a.pointClass);
        }
    );
    A(
        e,
        "Series/AreaRange/AreaRangeSeries.js",
        [
            e["Series/AreaRange/AreaRangePoint.js"],
            e["Core/Globals.js"],
            e["Core/Series/SeriesRegistry.js"],
            e["Core/Utilities.js"],
        ],
        function (a, b, f, c) {
            var p =
                (this && this.__extends) ||
                (function () {
                    var d = function (k, n) {
                        d =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (d, k) {
                                    d.__proto__ = k;
                                }) ||
                            function (d, k) {
                                for (var n in k)
                                    k.hasOwnProperty(n) && (d[n] = k[n]);
                            };
                        return d(k, n);
                    };
                    return function (k, n) {
                        function h() {
                            this.constructor = k;
                        }
                        d(k, n);
                        k.prototype =
                            null === n
                                ? Object.create(n)
                                : ((h.prototype = n.prototype), new h());
                    };
                })();
            b = b.noop;
            var e = f.seriesTypes,
                m = e.area,
                t = e.area.prototype,
                q = e.column.prototype,
                D = c.defined,
                v = c.extend,
                g = c.isArray,
                d = c.pick,
                k = c.merge,
                n = {
                    lineWidth: 1,
                    threshold: null,
                    tooltip: {
                        pointFormat:
                            '<span style="color:{series.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>',
                    },
                    trackByArea: !0,
                    dataLabels: {
                        align: void 0,
                        verticalAlign: void 0,
                        xLow: 0,
                        xHigh: 0,
                        yLow: 0,
                        yHigh: 0,
                    },
                };
            c = (function (h) {
                function c() {
                    var d = (null !== h && h.apply(this, arguments)) || this;
                    d.data = void 0;
                    d.options = void 0;
                    d.points = void 0;
                    d.lowerStateMarkerGraphic = void 0;
                    d.xAxis = void 0;
                    return d;
                }
                p(c, h);
                c.prototype.toYData = function (d) {
                    return [d.low, d.high];
                };
                c.prototype.highToXY = function (d) {
                    var k = this.chart,
                        n = this.xAxis.postTranslate(
                            d.rectPlotX || 0,
                            this.yAxis.len - d.plotHigh
                        );
                    d.plotHighX = n.x - k.plotLeft;
                    d.plotHigh = n.y - k.plotTop;
                    d.plotLowX = d.plotX;
                };
                c.prototype.translate = function () {
                    var d = this;
                    t.translate.apply(d);
                    d.points.forEach(function (k, n) {
                        var h = k.high,
                            c = k.plotY;
                        k.isNull
                            ? (k.plotY = null)
                            : ((n = d.chart.hasParallelCoordinates
                                  ? d.chart.yAxis[n]
                                  : d.yAxis),
                              (k.plotLow = c),
                              (k.plotHigh = n.translate(
                                  d.dataModify
                                      ? d.dataModify.modifyValue(h)
                                      : h,
                                  0,
                                  1,
                                  0,
                                  1
                              )),
                              d.dataModify && (k.yBottom = k.plotHigh));
                    });
                    this.chart.polar &&
                        this.points.forEach(function (k) {
                            d.highToXY(k);
                            k.tooltipPos = [
                                (k.plotHighX + k.plotLowX) / 2,
                                (k.plotHigh + k.plotLow) / 2,
                            ];
                        });
                };
                c.prototype.getGraphPath = function (k) {
                    var n = [],
                        h = [],
                        c = t.getGraphPath,
                        a = this.options,
                        b = this.chart.polar,
                        g = b && !1 !== a.connectEnds,
                        w = a.connectNulls,
                        B,
                        C = a.step;
                    k = k || this.points;
                    for (B = k.length; B--; ) {
                        var x = k[B];
                        var f = b
                            ? {
                                  plotX: x.rectPlotX,
                                  plotY: x.yBottom,
                                  doCurve: !1,
                              }
                            : { plotX: x.plotX, plotY: x.plotY, doCurve: !1 };
                        x.isNull ||
                            g ||
                            w ||
                            (k[B + 1] && !k[B + 1].isNull) ||
                            h.push(f);
                        var r = {
                            polarPlotY: x.polarPlotY,
                            rectPlotX: x.rectPlotX,
                            yBottom: x.yBottom,
                            plotX: d(x.plotHighX, x.plotX),
                            plotY: x.plotHigh,
                            isNull: x.isNull,
                        };
                        h.push(r);
                        n.push(r);
                        x.isNull ||
                            g ||
                            w ||
                            (k[B - 1] && !k[B - 1].isNull) ||
                            h.push(f);
                    }
                    k = c.call(this, k);
                    C &&
                        (!0 === C && (C = "left"),
                        (a.step = {
                            left: "right",
                            center: "center",
                            right: "left",
                        }[C]));
                    n = c.call(this, n);
                    h = c.call(this, h);
                    a.step = C;
                    a = [].concat(k, n);
                    !this.chart.polar &&
                        h[0] &&
                        "M" === h[0][0] &&
                        (h[0] = ["L", h[0][1], h[0][2]]);
                    this.graphPath = a;
                    this.areaPath = k.concat(h);
                    a.isArea = !0;
                    a.xMap = k.xMap;
                    this.areaPath.xMap = k.xMap;
                    return a;
                };
                c.prototype.drawDataLabels = function () {
                    var d = this.points,
                        k = d.length,
                        n = [],
                        h = this.options.dataLabels,
                        c = this.chart.inverted,
                        a,
                        b;
                    if (h) {
                        if (g(h)) {
                            var w = h[0] || { enabled: !1 };
                            var B = h[1] || { enabled: !1 };
                        } else
                            (w = v({}, h)),
                                (w.x = h.xHigh),
                                (w.y = h.yHigh),
                                (B = v({}, h)),
                                (B.x = h.xLow),
                                (B.y = h.yLow);
                        if (w.enabled || this._hasPointLabels) {
                            for (a = k; a--; )
                                if ((b = d[a])) {
                                    var f = w.inside
                                        ? b.plotHigh < b.plotLow
                                        : b.plotHigh > b.plotLow;
                                    b.y = b.high;
                                    b._plotY = b.plotY;
                                    b.plotY = b.plotHigh;
                                    n[a] = b.dataLabel;
                                    b.dataLabel = b.dataLabelUpper;
                                    b.below = f;
                                    c
                                        ? w.align ||
                                          (w.align = f ? "right" : "left")
                                        : w.verticalAlign ||
                                          (w.verticalAlign = f
                                              ? "top"
                                              : "bottom");
                                }
                            this.options.dataLabels = w;
                            t.drawDataLabels &&
                                t.drawDataLabels.apply(this, arguments);
                            for (a = k; a--; )
                                if ((b = d[a]))
                                    (b.dataLabelUpper = b.dataLabel),
                                        (b.dataLabel = n[a]),
                                        delete b.dataLabels,
                                        (b.y = b.low),
                                        (b.plotY = b._plotY);
                        }
                        if (B.enabled || this._hasPointLabels) {
                            for (a = k; a--; )
                                if ((b = d[a]))
                                    (f = B.inside
                                        ? b.plotHigh < b.plotLow
                                        : b.plotHigh > b.plotLow),
                                        (b.below = !f),
                                        c
                                            ? B.align ||
                                              (B.align = f ? "left" : "right")
                                            : B.verticalAlign ||
                                              (B.verticalAlign = f
                                                  ? "bottom"
                                                  : "top");
                            this.options.dataLabels = B;
                            t.drawDataLabels &&
                                t.drawDataLabels.apply(this, arguments);
                        }
                        if (w.enabled)
                            for (a = k; a--; )
                                if ((b = d[a]))
                                    b.dataLabels = [
                                        b.dataLabelUpper,
                                        b.dataLabel,
                                    ].filter(function (d) {
                                        return !!d;
                                    });
                        this.options.dataLabels = h;
                    }
                };
                c.prototype.alignDataLabel = function () {
                    q.alignDataLabel.apply(this, arguments);
                };
                c.prototype.drawPoints = function () {
                    var k = this.points.length,
                        n;
                    t.drawPoints.apply(this, arguments);
                    for (n = 0; n < k; ) {
                        var h = this.points[n];
                        h.origProps = {
                            plotY: h.plotY,
                            plotX: h.plotX,
                            isInside: h.isInside,
                            negative: h.negative,
                            zone: h.zone,
                            y: h.y,
                        };
                        h.lowerGraphic = h.graphic;
                        h.graphic = h.upperGraphic;
                        h.plotY = h.plotHigh;
                        D(h.plotHighX) && (h.plotX = h.plotHighX);
                        h.y = d(h.high, h.origProps.y);
                        h.negative = h.y < (this.options.threshold || 0);
                        this.zones.length && (h.zone = h.getZone());
                        this.chart.polar ||
                            (h.isInside = h.isTopInside =
                                "undefined" !== typeof h.plotY &&
                                0 <= h.plotY &&
                                h.plotY <= this.yAxis.len &&
                                0 <= h.plotX &&
                                h.plotX <= this.xAxis.len);
                        n++;
                    }
                    t.drawPoints.apply(this, arguments);
                    for (n = 0; n < k; )
                        (h = this.points[n]),
                            (h.upperGraphic = h.graphic),
                            (h.graphic = h.lowerGraphic),
                            h.origProps &&
                                (v(h, h.origProps), delete h.origProps),
                            n++;
                };
                c.defaultOptions = k(m.defaultOptions, n);
                return c;
            })(m);
            v(c.prototype, {
                deferTranslatePolar: !0,
                pointArrayMap: ["low", "high"],
                pointClass: a,
                pointValKey: "low",
                setStackedPoints: b,
            });
            f.registerSeriesType("arearange", c);
            ("");
            return c;
        }
    );
    A(
        e,
        "Series/AreaSplineRange/AreaSplineRangeSeries.js",
        [
            e["Series/AreaRange/AreaRangeSeries.js"],
            e["Core/Series/SeriesRegistry.js"],
            e["Core/Utilities.js"],
        ],
        function (a, b, f) {
            var c =
                    (this && this.__extends) ||
                    (function () {
                        var b = function (a, c) {
                            b =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (b, a) {
                                        b.__proto__ = a;
                                    }) ||
                                function (b, a) {
                                    for (var d in a)
                                        a.hasOwnProperty(d) && (b[d] = a[d]);
                                };
                            return b(a, c);
                        };
                        return function (a, c) {
                            function f() {
                                this.constructor = a;
                            }
                            b(a, c);
                            a.prototype =
                                null === c
                                    ? Object.create(c)
                                    : ((f.prototype = c.prototype), new f());
                        };
                    })(),
                p = b.seriesTypes.spline.prototype,
                e = f.merge;
            f = f.extend;
            var m = (function (b) {
                function f() {
                    var a = (null !== b && b.apply(this, arguments)) || this;
                    a.options = void 0;
                    a.data = void 0;
                    a.points = void 0;
                    return a;
                }
                c(f, b);
                f.defaultOptions = e(a.defaultOptions);
                return f;
            })(a);
            f(m.prototype, { getPointSpline: p.getPointSpline });
            b.registerSeriesType("areasplinerange", m);
            ("");
            return m;
        }
    );
    A(
        e,
        "Series/BoxPlot/BoxPlotSeries.js",
        [
            e["Series/Column/ColumnSeries.js"],
            e["Core/Globals.js"],
            e["Core/Series/SeriesRegistry.js"],
            e["Core/Utilities.js"],
        ],
        function (a, b, f, c) {
            var p =
                (this && this.__extends) ||
                (function () {
                    var b = function (a, c) {
                        b =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (b, d) {
                                    b.__proto__ = d;
                                }) ||
                            function (b, d) {
                                for (var k in d)
                                    d.hasOwnProperty(k) && (b[k] = d[k]);
                            };
                        return b(a, c);
                    };
                    return function (a, c) {
                        function f() {
                            this.constructor = a;
                        }
                        b(a, c);
                        a.prototype =
                            null === c
                                ? Object.create(c)
                                : ((f.prototype = c.prototype), new f());
                    };
                })();
            b = b.noop;
            var e = c.extend,
                m = c.merge,
                t = c.pick;
            c = (function (b) {
                function c() {
                    var a = (null !== b && b.apply(this, arguments)) || this;
                    a.data = void 0;
                    a.options = void 0;
                    a.points = void 0;
                    return a;
                }
                p(c, b);
                c.prototype.pointAttribs = function () {
                    return {};
                };
                c.prototype.translate = function () {
                    var a = this.yAxis,
                        c = this.pointArrayMap;
                    b.prototype.translate.apply(this);
                    this.points.forEach(function (d) {
                        c.forEach(function (k) {
                            null !== d[k] &&
                                (d[k + "Plot"] = a.translate(d[k], 0, 1, 0, 1));
                        });
                        d.plotHigh = d.highPlot;
                    });
                };
                c.prototype.drawPoints = function () {
                    var b = this,
                        a = b.options,
                        d = b.chart,
                        k = d.renderer,
                        n,
                        h,
                        c,
                        f,
                        p,
                        e,
                        E = 0,
                        m,
                        F,
                        K,
                        w,
                        B = !1 !== b.doQuartiles,
                        C,
                        x = b.options.whiskerLength;
                    b.points.forEach(function (g) {
                        var r = g.graphic,
                            u = r ? "animate" : "attr",
                            z = g.shapeArgs,
                            J = {},
                            G = {},
                            L = {},
                            H = {},
                            I = g.color || b.color;
                        "undefined" !== typeof g.plotY &&
                            ((m = Math.round(z.width)),
                            (F = Math.floor(z.x)),
                            (K = F + m),
                            (w = Math.round(m / 2)),
                            (n = Math.floor(B ? g.q1Plot : g.lowPlot)),
                            (h = Math.floor(B ? g.q3Plot : g.lowPlot)),
                            (c = Math.floor(g.highPlot)),
                            (f = Math.floor(g.lowPlot)),
                            r ||
                                ((g.graphic = r = k.g("point").add(b.group)),
                                (g.stem = k
                                    .path()
                                    .addClass("highcharts-boxplot-stem")
                                    .add(r)),
                                x &&
                                    (g.whiskers = k
                                        .path()
                                        .addClass("highcharts-boxplot-whisker")
                                        .add(r)),
                                B &&
                                    (g.box = k
                                        .path(void 0)
                                        .addClass("highcharts-boxplot-box")
                                        .add(r)),
                                (g.medianShape = k
                                    .path(void 0)
                                    .addClass("highcharts-boxplot-median")
                                    .add(r))),
                            d.styledMode ||
                                ((G.stroke = g.stemColor || a.stemColor || I),
                                (G["stroke-width"] = t(
                                    g.stemWidth,
                                    a.stemWidth,
                                    a.lineWidth
                                )),
                                (G.dashstyle =
                                    g.stemDashStyle ||
                                    a.stemDashStyle ||
                                    a.dashStyle),
                                g.stem.attr(G),
                                x &&
                                    ((L.stroke =
                                        g.whiskerColor || a.whiskerColor || I),
                                    (L["stroke-width"] = t(
                                        g.whiskerWidth,
                                        a.whiskerWidth,
                                        a.lineWidth
                                    )),
                                    (L.dashstyle =
                                        g.whiskerDashStyle ||
                                        a.whiskerDashStyle ||
                                        a.dashStyle),
                                    g.whiskers.attr(L)),
                                B &&
                                    ((J.fill = g.fillColor || a.fillColor || I),
                                    (J.stroke = a.lineColor || I),
                                    (J["stroke-width"] = a.lineWidth || 0),
                                    (J.dashstyle =
                                        g.boxDashStyle ||
                                        a.boxDashStyle ||
                                        a.dashStyle),
                                    g.box.attr(J)),
                                (H.stroke =
                                    g.medianColor || a.medianColor || I),
                                (H["stroke-width"] = t(
                                    g.medianWidth,
                                    a.medianWidth,
                                    a.lineWidth
                                )),
                                (H.dashstyle =
                                    g.medianDashStyle ||
                                    a.medianDashStyle ||
                                    a.dashStyle),
                                g.medianShape.attr(H)),
                            (e = (g.stem.strokeWidth() % 2) / 2),
                            (E = F + w + e),
                            (r = [
                                ["M", E, h],
                                ["L", E, c],
                                ["M", E, n],
                                ["L", E, f],
                            ]),
                            g.stem[u]({ d: r }),
                            B &&
                                ((e = (g.box.strokeWidth() % 2) / 2),
                                (n = Math.floor(n) + e),
                                (h = Math.floor(h) + e),
                                (F += e),
                                (K += e),
                                (r = [
                                    ["M", F, h],
                                    ["L", F, n],
                                    ["L", K, n],
                                    ["L", K, h],
                                    ["L", F, h],
                                    ["Z"],
                                ]),
                                g.box[u]({ d: r })),
                            x &&
                                ((e = (g.whiskers.strokeWidth() % 2) / 2),
                                (c += e),
                                (f += e),
                                (C = /%$/.test(x)
                                    ? (w * parseFloat(x)) / 100
                                    : x / 2),
                                (r = [
                                    ["M", E - C, c],
                                    ["L", E + C, c],
                                    ["M", E - C, f],
                                    ["L", E + C, f],
                                ]),
                                g.whiskers[u]({ d: r })),
                            (p = Math.round(g.medianPlot)),
                            (e = (g.medianShape.strokeWidth() % 2) / 2),
                            (p += e),
                            (r = [
                                ["M", F, p],
                                ["L", K, p],
                            ]),
                            g.medianShape[u]({ d: r }));
                    });
                };
                c.prototype.toYData = function (a) {
                    return [a.low, a.q1, a.median, a.q3, a.high];
                };
                c.defaultOptions = m(a.defaultOptions, {
                    threshold: null,
                    tooltip: {
                        pointFormat:
                            '<span style="color:{point.color}">\u25cf</span> <b> {series.name}</b><br/>Maximum: {point.high}<br/>Upper quartile: {point.q3}<br/>Median: {point.median}<br/>Lower quartile: {point.q1}<br/>Minimum: {point.low}<br/>',
                    },
                    whiskerLength: "50%",
                    fillColor: "#ffffff",
                    lineWidth: 1,
                    medianWidth: 2,
                    whiskerWidth: 2,
                });
                return c;
            })(a);
            e(c.prototype, {
                pointArrayMap: ["low", "q1", "median", "q3", "high"],
                pointValKey: "high",
                drawDataLabels: b,
                setStackedPoints: b,
            });
            f.registerSeriesType("boxplot", c);
            ("");
            return c;
        }
    );
    A(e, "Series/Bubble/BubbleLegendDefaults.js", [], function () {
        return {
            borderColor: void 0,
            borderWidth: 2,
            className: void 0,
            color: void 0,
            connectorClassName: void 0,
            connectorColor: void 0,
            connectorDistance: 60,
            connectorWidth: 1,
            enabled: !1,
            labels: {
                className: void 0,
                allowOverlap: !1,
                format: "",
                formatter: void 0,
                align: "right",
                style: { fontSize: "10px", color: "#000000" },
                x: 0,
                y: 0,
            },
            maxSize: 60,
            minSize: 10,
            legendIndex: 0,
            ranges: {
                value: void 0,
                borderColor: void 0,
                color: void 0,
                connectorColor: void 0,
            },
            sizeBy: "area",
            sizeByAbsoluteValue: !1,
            zIndex: 1,
            zThreshold: 0,
        };
    });
    A(
        e,
        "Series/Bubble/BubbleLegendItem.js",
        [
            e["Core/Color/Color.js"],
            e["Core/FormatUtilities.js"],
            e["Core/Globals.js"],
            e["Core/Utilities.js"],
        ],
        function (a, b, f, c) {
            var e = a.parse,
                l = f.noop,
                m = c.arrayMax,
                t = c.arrayMin,
                q = c.isNumber,
                D = c.merge,
                v = c.pick,
                g = c.stableSort;
            a = (function () {
                function d(d, a) {
                    this.options =
                        this.symbols =
                        this.visible =
                        this.selected =
                        this.ranges =
                        this.movementX =
                        this.maxLabel =
                        this.legendSymbol =
                        this.legendItemWidth =
                        this.legendItemHeight =
                        this.legendItem =
                        this.legendGroup =
                        this.legend =
                        this.fontMetrics =
                        this.chart =
                            void 0;
                    this.setState = l;
                    this.init(d, a);
                }
                d.prototype.init = function (d, a) {
                    this.options = d;
                    this.visible = !0;
                    this.chart = a.chart;
                    this.legend = a;
                };
                d.prototype.addToLegend = function (d) {
                    d.splice(this.options.legendIndex, 0, this);
                };
                d.prototype.drawLegendSymbol = function (d) {
                    var a = this.chart,
                        h = this.options,
                        k = v(d.options.itemDistance, 20),
                        b = h.ranges,
                        c = h.connectorDistance;
                    this.fontMetrics = a.renderer.fontMetrics(
                        h.labels.style.fontSize
                    );
                    b && b.length && q(b[0].value)
                        ? (g(b, function (d, a) {
                              return a.value - d.value;
                          }),
                          (this.ranges = b),
                          this.setOptions(),
                          this.render(),
                          (d = this.getMaxLabelSize()),
                          (b = this.ranges[0].radius),
                          (a = 2 * b),
                          (c = c - b + d.width),
                          (c = 0 < c ? c : 0),
                          (this.maxLabel = d),
                          (this.movementX = "left" === h.labels.align ? c : 0),
                          (this.legendItemWidth = a + c + k),
                          (this.legendItemHeight = a + this.fontMetrics.h / 2))
                        : (d.options.bubbleLegend.autoRanges = !0);
                };
                d.prototype.setOptions = function () {
                    var d = this.ranges,
                        a = this.options,
                        h = this.chart.series[a.seriesIndex],
                        b = this.legend.baseline,
                        c = { zIndex: a.zIndex, "stroke-width": a.borderWidth },
                        g = {
                            zIndex: a.zIndex,
                            "stroke-width": a.connectorWidth,
                        },
                        f = {
                            align:
                                this.legend.options.rtl ||
                                "left" === a.labels.align
                                    ? "right"
                                    : "left",
                            zIndex: a.zIndex,
                        },
                        p = h.options.marker.fillOpacity,
                        m = this.chart.styledMode;
                    d.forEach(function (k, n) {
                        m ||
                            ((c.stroke = v(
                                k.borderColor,
                                a.borderColor,
                                h.color
                            )),
                            (c.fill = v(
                                k.color,
                                a.color,
                                1 !== p
                                    ? e(h.color).setOpacity(p).get("rgba")
                                    : h.color
                            )),
                            (g.stroke = v(
                                k.connectorColor,
                                a.connectorColor,
                                h.color
                            )));
                        d[n].radius = this.getRangeRadius(k.value);
                        d[n] = D(d[n], {
                            center: d[0].radius - d[n].radius + b,
                        });
                        m ||
                            D(!0, d[n], {
                                bubbleAttribs: D(c),
                                connectorAttribs: D(g),
                                labelAttribs: f,
                            });
                    }, this);
                };
                d.prototype.getRangeRadius = function (d) {
                    var a = this.options;
                    return this.chart.series[
                        this.options.seriesIndex
                    ].getRadius.call(
                        this,
                        a.ranges[a.ranges.length - 1].value,
                        a.ranges[0].value,
                        a.minSize,
                        a.maxSize,
                        d
                    );
                };
                d.prototype.render = function () {
                    var d = this.chart.renderer,
                        a = this.options.zThreshold;
                    this.symbols ||
                        (this.symbols = {
                            connectors: [],
                            bubbleItems: [],
                            labels: [],
                        });
                    this.legendSymbol = d.g("bubble-legend");
                    this.legendItem = d.g("bubble-legend-item");
                    this.legendSymbol.translateX = 0;
                    this.legendSymbol.translateY = 0;
                    this.ranges.forEach(function (d) {
                        d.value >= a && this.renderRange(d);
                    }, this);
                    this.legendSymbol.add(this.legendItem);
                    this.legendItem.add(this.legendGroup);
                    this.hideOverlappingLabels();
                };
                d.prototype.renderRange = function (d) {
                    var a = this.options,
                        h = a.labels,
                        b = this.chart,
                        k = b.series[a.seriesIndex],
                        c = b.renderer,
                        g = this.symbols;
                    b = g.labels;
                    var f = d.center,
                        e = Math.abs(d.radius),
                        p = a.connectorDistance || 0,
                        m = h.align,
                        w = a.connectorWidth,
                        B = this.ranges[0].radius || 0,
                        C = f - e - a.borderWidth / 2 + w / 2,
                        x = this.fontMetrics;
                    x = x.f / 2 - (x.h - x.f) / 2;
                    var l = c.styledMode;
                    p = this.legend.options.rtl || "left" === m ? -p : p;
                    "center" === m &&
                        ((p = 0),
                        (a.connectorDistance = 0),
                        (d.labelAttribs.align = "center"));
                    m = C + a.labels.y;
                    var r = B + p + a.labels.x;
                    g.bubbleItems.push(
                        c
                            .circle(
                                B,
                                f + ((C % 1 ? 1 : 0.5) - (w % 2 ? 0 : 0.5)),
                                e
                            )
                            .attr(l ? {} : d.bubbleAttribs)
                            .addClass(
                                (l
                                    ? "highcharts-color-" + k.colorIndex + " "
                                    : "") +
                                    "highcharts-bubble-legend-symbol " +
                                    (a.className || "")
                            )
                            .add(this.legendSymbol)
                    );
                    g.connectors.push(
                        c
                            .path(
                                c.crispLine(
                                    [
                                        ["M", B, C],
                                        ["L", B + p, C],
                                    ],
                                    a.connectorWidth
                                )
                            )
                            .attr(l ? {} : d.connectorAttribs)
                            .addClass(
                                (l
                                    ? "highcharts-color-" +
                                      this.options.seriesIndex +
                                      " "
                                    : "") +
                                    "highcharts-bubble-legend-connectors " +
                                    (a.connectorClassName || "")
                            )
                            .add(this.legendSymbol)
                    );
                    d = c
                        .text(this.formatLabel(d), r, m + x)
                        .attr(l ? {} : d.labelAttribs)
                        .css(l ? {} : h.style)
                        .addClass(
                            "highcharts-bubble-legend-labels " +
                                (a.labels.className || "")
                        )
                        .add(this.legendSymbol);
                    b.push(d);
                    d.placed = !0;
                    d.alignAttr = { x: r, y: m + x };
                };
                d.prototype.getMaxLabelSize = function () {
                    var d, a;
                    this.symbols.labels.forEach(function (h) {
                        a = h.getBBox(!0);
                        d = d ? (a.width > d.width ? a : d) : a;
                    });
                    return d || {};
                };
                d.prototype.formatLabel = function (d) {
                    var a = this.options,
                        h = a.labels.formatter;
                    a = a.labels.format;
                    var c = this.chart.numberFormatter;
                    return a ? b.format(a, d) : h ? h.call(d) : c(d.value, 1);
                };
                d.prototype.hideOverlappingLabels = function () {
                    var d = this.chart,
                        a = this.symbols;
                    !this.options.labels.allowOverlap &&
                        a &&
                        (d.hideOverlappingLabels(a.labels),
                        a.labels.forEach(function (d, b) {
                            d.newOpacity
                                ? d.newOpacity !== d.oldOpacity &&
                                  a.connectors[b].show()
                                : a.connectors[b].hide();
                        }));
                };
                d.prototype.getRanges = function () {
                    var d = this.legend.bubbleLegend,
                        a = d.options.ranges,
                        b,
                        c = Number.MAX_VALUE,
                        g = -Number.MAX_VALUE;
                    d.chart.series.forEach(function (d) {
                        d.isBubble &&
                            !d.ignoreSeries &&
                            ((b = d.zData.filter(q)),
                            b.length &&
                                ((c = v(
                                    d.options.zMin,
                                    Math.min(
                                        c,
                                        Math.max(
                                            t(b),
                                            !1 === d.options.displayNegative
                                                ? d.options.zThreshold
                                                : -Number.MAX_VALUE
                                        )
                                    )
                                )),
                                (g = v(d.options.zMax, Math.max(g, m(b))))));
                    });
                    var f =
                        c === g
                            ? [{ value: g }]
                            : [
                                  { value: c },
                                  { value: (c + g) / 2 },
                                  { value: g, autoRanges: !0 },
                              ];
                    a.length && a[0].radius && f.reverse();
                    f.forEach(function (d, b) {
                        a && a[b] && (f[b] = D(a[b], d));
                    });
                    return f;
                };
                d.prototype.predictBubbleSizes = function () {
                    var d = this.chart,
                        a = this.fontMetrics,
                        b = d.legend.options,
                        c = b.floating,
                        g = (b = "horizontal" === b.layout)
                            ? d.legend.lastLineHeight
                            : 0,
                        f = d.plotSizeX,
                        p = d.plotSizeY,
                        e = d.series[this.options.seriesIndex],
                        m = e.getPxExtremes();
                    d = Math.ceil(m.minPxSize);
                    m = Math.ceil(m.maxPxSize);
                    var F = Math.min(p, f);
                    e = e.options.maxSize;
                    if (c || !/%$/.test(e)) a = m;
                    else if (
                        ((e = parseFloat(e)),
                        (a = ((F + g - a.h / 2) * e) / 100 / (e / 100 + 1)),
                        (b && p - a >= f) || (!b && f - a >= p))
                    )
                        a = m;
                    return [d, Math.ceil(a)];
                };
                d.prototype.updateRanges = function (d, a) {
                    var b = this.legend.options.bubbleLegend;
                    b.minSize = d;
                    b.maxSize = a;
                    b.ranges = this.getRanges();
                };
                d.prototype.correctSizes = function () {
                    var d = this.legend,
                        a =
                            this.chart.series[
                                this.options.seriesIndex
                            ].getPxExtremes();
                    1 <
                        Math.abs(
                            Math.ceil(a.maxPxSize) - this.options.maxSize
                        ) &&
                        (this.updateRanges(this.options.minSize, a.maxPxSize),
                        d.render());
                };
                return d;
            })();
            ("");
            return a;
        }
    );
    A(
        e,
        "Series/Bubble/BubbleLegendComposition.js",
        [
            e["Series/Bubble/BubbleLegendDefaults.js"],
            e["Series/Bubble/BubbleLegendItem.js"],
            e["Core/DefaultOptions.js"],
            e["Core/Utilities.js"],
        ],
        function (a, b, f, c) {
            function e(a, b, c) {
                var h = this.legend,
                    k = 0 <= l(this);
                if (
                    h &&
                    h.options.enabled &&
                    h.bubbleLegend &&
                    h.options.bubbleLegend.autoRanges &&
                    k
                ) {
                    var g = h.bubbleLegend.options;
                    k = h.bubbleLegend.predictBubbleSizes();
                    h.bubbleLegend.updateRanges(k[0], k[1]);
                    g.placed ||
                        ((h.group.placed = !1),
                        h.allItems.forEach(function (d) {
                            d.legendGroup.translateY = null;
                        }));
                    h.render();
                    this.getMargins();
                    this.axes.forEach(function (a) {
                        a.visible && a.render();
                        g.placed ||
                            (a.setScale(),
                            a.updateNames(),
                            d(a.ticks, function (d) {
                                d.isNew = !0;
                                d.isNewLabel = !0;
                            }));
                    });
                    g.placed = !0;
                    this.getMargins();
                    a.call(this, b, c);
                    h.bubbleLegend.correctSizes();
                    D(h, m(h));
                } else
                    a.call(this, b, c),
                        h &&
                            h.options.enabled &&
                            h.bubbleLegend &&
                            (h.render(), D(h, m(h)));
            }
            function l(d) {
                d = d.series;
                for (var a = 0; a < d.length; ) {
                    if (
                        d[a] &&
                        d[a].isBubble &&
                        d[a].visible &&
                        d[a].zData.length
                    )
                        return a;
                    a++;
                }
                return -1;
            }
            function m(d) {
                d = d.allItems;
                var a = [],
                    b = d.length,
                    c,
                    h = 0;
                for (c = 0; c < b; c++)
                    if (
                        (d[c].legendItemHeight &&
                            (d[c].itemHeight = d[c].legendItemHeight),
                        d[c] === d[b - 1] ||
                            (d[c + 1] &&
                                d[c]._legendItemPos[1] !==
                                    d[c + 1]._legendItemPos[1]))
                    ) {
                        a.push({ height: 0 });
                        var k = a[a.length - 1];
                        for (h; h <= c; h++)
                            d[h].itemHeight > k.height &&
                                (k.height = d[h].itemHeight);
                        k.step = c;
                    }
                return a;
            }
            function t(d) {
                var a = this.bubbleLegend,
                    c = this.options,
                    h = c.bubbleLegend,
                    k = l(this.chart);
                a &&
                    a.ranges &&
                    a.ranges.length &&
                    (h.ranges.length &&
                        (h.autoRanges = !!h.ranges[0].autoRanges),
                    this.destroyItem(a));
                0 <= k &&
                    c.enabled &&
                    h.enabled &&
                    ((h.seriesIndex = k),
                    (this.bubbleLegend = new b(h, this)),
                    this.bubbleLegend.addToLegend(d.allItems));
            }
            function q() {
                var d = this.chart,
                    a = this.visible,
                    b = this.chart.legend;
                b &&
                    b.bubbleLegend &&
                    ((this.visible = !a),
                    (this.ignoreSeries = a),
                    (d = 0 <= l(d)),
                    b.bubbleLegend.visible !== d &&
                        (b.update({ bubbleLegend: { enabled: d } }),
                        (b.bubbleLegend.visible = d)),
                    (this.visible = a));
            }
            function D(d, a) {
                var b = d.options.rtl,
                    c,
                    h,
                    k,
                    g = 0;
                d.allItems.forEach(function (d, f) {
                    c = d.legendGroup.translateX;
                    h = d._legendItemPos[1];
                    if ((k = d.movementX) || (b && d.ranges))
                        (k = b ? c - d.options.maxSize / 2 : c + k),
                            d.legendGroup.attr({ translateX: k });
                    f > a[g].step && g++;
                    d.legendGroup.attr({
                        translateY: Math.round(h + a[g].height / 2),
                    });
                    d._legendItemPos[1] = h + a[g].height / 2;
                });
            }
            var v = f.setOptions,
                g = c.addEvent,
                d = c.objectEach,
                k = c.wrap,
                n = [];
            return {
                compose: function (d, b, c) {
                    -1 === n.indexOf(d) &&
                        (n.push(d),
                        v({ legend: { bubbleLegend: a } }),
                        k(d.prototype, "drawChartBox", e));
                    -1 === n.indexOf(b) &&
                        (n.push(b), g(b, "afterGetAllItems", t));
                    -1 === n.indexOf(c) &&
                        (n.push(c), g(c, "legendItemClick", q));
                },
            };
        }
    );
    A(
        e,
        "Series/Bubble/BubblePoint.js",
        [
            e["Core/Series/Point.js"],
            e["Core/Series/SeriesRegistry.js"],
            e["Core/Utilities.js"],
        ],
        function (a, b, f) {
            var c =
                (this && this.__extends) ||
                (function () {
                    var a = function (b, c) {
                        a =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, b) {
                                    a.__proto__ = b;
                                }) ||
                            function (a, b) {
                                for (var c in b)
                                    b.hasOwnProperty(c) && (a[c] = b[c]);
                            };
                        return a(b, c);
                    };
                    return function (b, c) {
                        function f() {
                            this.constructor = b;
                        }
                        a(b, c);
                        b.prototype =
                            null === c
                                ? Object.create(c)
                                : ((f.prototype = c.prototype), new f());
                    };
                })();
            f = f.extend;
            b = (function (b) {
                function f() {
                    var a = (null !== b && b.apply(this, arguments)) || this;
                    a.options = void 0;
                    a.series = void 0;
                    return a;
                }
                c(f, b);
                f.prototype.haloPath = function (b) {
                    return a.prototype.haloPath.call(
                        this,
                        0 === b
                            ? 0
                            : (this.marker ? this.marker.radius || 0 : 0) + b
                    );
                };
                return f;
            })(b.seriesTypes.scatter.prototype.pointClass);
            f(b.prototype, { ttBelow: !1 });
            return b;
        }
    );
    A(
        e,
        "Series/Bubble/BubbleSeries.js",
        [
            e["Series/Bubble/BubbleLegendComposition.js"],
            e["Series/Bubble/BubblePoint.js"],
            e["Core/Color/Color.js"],
            e["Core/Globals.js"],
            e["Core/Series/SeriesRegistry.js"],
            e["Core/Utilities.js"],
        ],
        function (a, b, f, c, e, l) {
            function p() {
                var d = this,
                    a = this.len,
                    b = this.chart,
                    c = this.isXAxis,
                    h = c ? "xData" : "yData",
                    k = this.min,
                    g = this.max - k,
                    f = 0,
                    n = a,
                    r = a / g,
                    u;
                this.series.forEach(function (a) {
                    if (
                        a.bubblePadding &&
                        (a.visible || !b.options.chart.ignoreHiddenSeries)
                    ) {
                        u = d.allowZoomOutside = !0;
                        var w = a[h];
                        c &&
                            ((a.onPoint || a).getRadii(0, 0, a),
                            a.onPoint && (a.radii = a.onPoint.radii));
                        if (0 < g)
                            for (var B = w.length; B--; )
                                if (
                                    G(w[B]) &&
                                    d.dataMin <= w[B] &&
                                    w[B] <= d.max
                                ) {
                                    var e = (a.radii && a.radii[B]) || 0;
                                    f = Math.min((w[B] - k) * r - e, f);
                                    n = Math.max((w[B] - k) * r + e, n);
                                }
                    }
                });
                u &&
                    0 < g &&
                    !this.logarithmic &&
                    ((n -= a),
                    (r *= (a + Math.max(0, f) - Math.min(n, a)) / a),
                    [
                        ["min", "userMin", f],
                        ["max", "userMax", n],
                    ].forEach(function (a) {
                        "undefined" === typeof I(d.options[a[0]], d[a[1]]) &&
                            (d[a[0]] += a[2] / r);
                    }));
            }
            var t =
                    (this && this.__extends) ||
                    (function () {
                        var d = function (a, b) {
                            d =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (d, a) {
                                        d.__proto__ = a;
                                    }) ||
                                function (d, a) {
                                    for (var b in a)
                                        a.hasOwnProperty(b) && (d[b] = a[b]);
                                };
                            return d(a, b);
                        };
                        return function (a, b) {
                            function c() {
                                this.constructor = a;
                            }
                            d(a, b);
                            a.prototype =
                                null === b
                                    ? Object.create(b)
                                    : ((c.prototype = b.prototype), new c());
                        };
                    })(),
                q = f.parse;
            f = c.noop;
            var D = e.series,
                v = e.seriesTypes;
            c = v.column.prototype;
            var g = v.scatter;
            v = l.addEvent;
            var d = l.arrayMax,
                k = l.arrayMin,
                n = l.clamp,
                h = l.extend,
                G = l.isNumber,
                L = l.merge,
                I = l.pick,
                H = [];
            l = (function (b) {
                function c() {
                    var d = (null !== b && b.apply(this, arguments)) || this;
                    d.data = void 0;
                    d.maxPxSize = void 0;
                    d.minPxSize = void 0;
                    d.options = void 0;
                    d.points = void 0;
                    d.radii = void 0;
                    d.yData = void 0;
                    d.zData = void 0;
                    return d;
                }
                t(c, b);
                c.compose = function (d, b, c, h) {
                    a.compose(b, c, h);
                    -1 === H.indexOf(d) &&
                        (H.push(d), (d.prototype.beforePadding = p));
                };
                c.prototype.animate = function (d) {
                    !d &&
                        this.points.length < this.options.animationLimit &&
                        this.points.forEach(function (d) {
                            var a = d.graphic;
                            a &&
                                a.width &&
                                (this.hasRendered ||
                                    a.attr({
                                        x: d.plotX,
                                        y: d.plotY,
                                        width: 1,
                                        height: 1,
                                    }),
                                a.animate(
                                    this.markerAttribs(d),
                                    this.options.animation
                                ));
                        }, this);
                };
                c.prototype.getRadii = function () {
                    var d = this,
                        a = this.zData,
                        b = this.yData,
                        c = [],
                        h = this.chart.bubbleZExtremes;
                    var k = this.getPxExtremes();
                    var g = k.minPxSize,
                        f = k.maxPxSize;
                    if (!h) {
                        var n = Number.MAX_VALUE,
                            e = -Number.MAX_VALUE,
                            p;
                        this.chart.series.forEach(function (a) {
                            a.bubblePadding &&
                                (a.visible ||
                                    !d.chart.options.chart
                                        .ignoreHiddenSeries) &&
                                (a = (a.onPoint || a).getZExtremes()) &&
                                ((n = Math.min(n || a.zMin, a.zMin)),
                                (e = Math.max(e || a.zMax, a.zMax)),
                                (p = !0));
                        });
                        p
                            ? ((h = { zMin: n, zMax: e }),
                              (this.chart.bubbleZExtremes = h))
                            : (h = { zMin: 0, zMax: 0 });
                    }
                    var m = 0;
                    for (k = a.length; m < k; m++) {
                        var l = a[m];
                        c.push(
                            this.getRadius(h.zMin, h.zMax, g, f, l, b && b[m])
                        );
                    }
                    this.radii = c;
                };
                c.prototype.getRadius = function (d, a, b, c, h, k) {
                    var w = this.options,
                        g = "width" !== w.sizeBy,
                        f = w.zThreshold,
                        n = a - d,
                        e = 0.5;
                    if (null === k || null === h) return null;
                    if (G(h)) {
                        w.sizeByAbsoluteValue &&
                            ((h = Math.abs(h - f)),
                            (n = Math.max(a - f, Math.abs(d - f))),
                            (d = 0));
                        if (h < d) return b / 2 - 1;
                        0 < n && (e = (h - d) / n);
                    }
                    g && 0 <= e && (e = Math.sqrt(e));
                    return Math.ceil(b + e * (c - b)) / 2;
                };
                c.prototype.hasData = function () {
                    return !!this.processedXData.length;
                };
                c.prototype.pointAttribs = function (d, a) {
                    var b = this.options.marker.fillOpacity;
                    d = D.prototype.pointAttribs.call(this, d, a);
                    1 !== b && (d.fill = q(d.fill).setOpacity(b).get("rgba"));
                    return d;
                };
                c.prototype.translate = function () {
                    b.prototype.translate.call(this);
                    this.getRadii();
                    this.translateBubble();
                };
                c.prototype.translateBubble = function () {
                    for (
                        var d = this.data,
                            a = this.radii,
                            b = this.getPxExtremes().minPxSize,
                            c = d.length;
                        c--;

                    ) {
                        var k = d[c],
                            g = a ? a[c] : 0;
                        G(g) && g >= b / 2
                            ? ((k.marker = h(k.marker, {
                                  radius: g,
                                  width: 2 * g,
                                  height: 2 * g,
                              })),
                              (k.dlBox = {
                                  x: k.plotX - g,
                                  y: k.plotY - g,
                                  width: 2 * g,
                                  height: 2 * g,
                              }))
                            : ((k.shapeArgs = k.dlBox = void 0),
                              (k.plotY = 0),
                              (k.marker = { width: 0, height: 0 }));
                    }
                };
                c.prototype.getPxExtremes = function () {
                    var d = Math.min(
                            this.chart.plotWidth,
                            this.chart.plotHeight
                        ),
                        a = function (a) {
                            if ("string" === typeof a) {
                                var b = /%$/.test(a);
                                a = parseInt(a, 10);
                            }
                            return b ? (d * a) / 100 : a;
                        },
                        b = a(I(this.options.minSize, 8));
                    a = Math.max(a(I(this.options.maxSize, "20%")), b);
                    return { minPxSize: b, maxPxSize: a };
                };
                c.prototype.getZExtremes = function () {
                    var a = this.options,
                        b = (this.zData || []).filter(G);
                    if (b.length) {
                        var c = I(
                            a.zMin,
                            n(
                                k(b),
                                !1 === a.displayNegative
                                    ? a.zThreshold || 0
                                    : -Number.MAX_VALUE,
                                Number.MAX_VALUE
                            )
                        );
                        a = I(a.zMax, d(b));
                        if (G(c) && G(a)) return { zMin: c, zMax: a };
                    }
                };
                c.defaultOptions = L(g.defaultOptions, {
                    dataLabels: {
                        formatter: function () {
                            var d = this.series.chart.numberFormatter,
                                a = this.point.z;
                            return G(a) ? d(a, -1) : "";
                        },
                        inside: !0,
                        verticalAlign: "middle",
                    },
                    animationLimit: 250,
                    marker: {
                        lineColor: null,
                        lineWidth: 1,
                        fillOpacity: 0.5,
                        radius: null,
                        states: { hover: { radiusPlus: 0 } },
                        symbol: "circle",
                    },
                    minSize: 8,
                    maxSize: "20%",
                    softThreshold: !1,
                    states: { hover: { halo: { size: 5 } } },
                    tooltip: {
                        pointFormat: "({point.x}, {point.y}), Size: {point.z}",
                    },
                    turboThreshold: 0,
                    zThreshold: 0,
                    zoneAxis: "z",
                });
                return c;
            })(g);
            h(l.prototype, {
                alignDataLabel: c.alignDataLabel,
                applyZones: f,
                bubblePadding: !0,
                buildKDTree: f,
                directTouch: !0,
                isBubble: !0,
                pointArrayMap: ["y", "z"],
                pointClass: b,
                parallelArrays: ["x", "y", "z"],
                trackerGroups: ["group", "dataLabelsGroup"],
                specialGroup: "group",
                zoneAxis: "z",
            });
            v(l, "updatedData", function (d) {
                delete d.target.chart.bubbleZExtremes;
            });
            v(l, "remove", function (d) {
                delete d.target.chart.bubbleZExtremes;
            });
            e.registerSeriesType("bubble", l);
            ("");
            ("");
            return l;
        }
    );
    A(
        e,
        "Series/ColumnRange/ColumnRangePoint.js",
        [e["Core/Series/SeriesRegistry.js"], e["Core/Utilities.js"]],
        function (a, b) {
            var f =
                    (this && this.__extends) ||
                    (function () {
                        var a = function (b, c) {
                            a =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, b) {
                                        a.__proto__ = b;
                                    }) ||
                                function (a, b) {
                                    for (var c in b)
                                        b.hasOwnProperty(c) && (a[c] = b[c]);
                                };
                            return a(b, c);
                        };
                        return function (b, c) {
                            function f() {
                                this.constructor = b;
                            }
                            a(b, c);
                            b.prototype =
                                null === c
                                    ? Object.create(c)
                                    : ((f.prototype = c.prototype), new f());
                        };
                    })(),
                c = a.seriesTypes;
            a = c.column.prototype.pointClass.prototype;
            var e = b.extend,
                l = b.isNumber;
            b = (function (a) {
                function b() {
                    var b = (null !== a && a.apply(this, arguments)) || this;
                    b.options = void 0;
                    b.series = void 0;
                    return b;
                }
                f(b, a);
                b.prototype.isValid = function () {
                    return l(this.low);
                };
                return b;
            })(c.arearange.prototype.pointClass);
            e(b.prototype, { setState: a.setState });
            return b;
        }
    );
    A(
        e,
        "Series/ColumnRange/ColumnRangeSeries.js",
        [
            e["Series/ColumnRange/ColumnRangePoint.js"],
            e["Core/Globals.js"],
            e["Core/Series/SeriesRegistry.js"],
            e["Core/Utilities.js"],
        ],
        function (a, b, f, c) {
            var e =
                (this && this.__extends) ||
                (function () {
                    var d = function (a, b) {
                        d =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (d, a) {
                                    d.__proto__ = a;
                                }) ||
                            function (d, a) {
                                for (var b in a)
                                    a.hasOwnProperty(b) && (d[b] = a[b]);
                            };
                        return d(a, b);
                    };
                    return function (a, b) {
                        function c() {
                            this.constructor = a;
                        }
                        d(a, b);
                        a.prototype =
                            null === b
                                ? Object.create(b)
                                : ((c.prototype = b.prototype), new c());
                    };
                })();
            b = b.noop;
            var l = f.seriesTypes,
                m = l.arearange,
                t = l.column,
                q = l.column.prototype,
                D = c.clamp;
            l = c.extend;
            var v = c.merge,
                g = c.pick,
                d = {
                    pointRange: null,
                    marker: null,
                    states: { hover: { halo: !1 } },
                };
            c = (function (a) {
                function b() {
                    return (null !== a && a.apply(this, arguments)) || this;
                }
                e(b, a);
                b.prototype.setOptions = function () {
                    v(!0, arguments[0], { stacking: void 0 });
                    return m.prototype.setOptions.apply(this, arguments);
                };
                b.prototype.translate = function () {
                    var d = this,
                        a = this.yAxis,
                        b = this.xAxis,
                        c = b.startAngleRad,
                        k = this.chart,
                        f = this.xAxis.isRadial,
                        n = Math.max(k.chartWidth, k.chartHeight) + 999,
                        e,
                        p,
                        w,
                        B,
                        C;
                    q.translate.apply(this);
                    this.points.forEach(function (h) {
                        var x = h.shapeArgs || {},
                            r = d.options.minPointLength;
                        h.plotHigh = B = D(
                            a.translate(h.high, 0, 1, 0, 1),
                            -n,
                            n
                        );
                        h.plotLow = D(h.plotY, -n, n);
                        C = B;
                        e = g(h.rectPlotY, h.plotY) - B;
                        Math.abs(e) < r
                            ? ((p = r - e), (e += p), (C -= p / 2))
                            : 0 > e && ((e *= -1), (C -= e));
                        f && d.polar
                            ? ((w = h.barX + c),
                              (h.shapeType = "arc"),
                              (h.shapeArgs = d.polar.arc(
                                  C + e,
                                  C,
                                  w,
                                  w + h.pointWidth
                              )))
                            : ((x.height = e),
                              (x.y = C),
                              (r = x.x),
                              (r = void 0 === r ? 0 : r),
                              (x = x.width),
                              (x = void 0 === x ? 0 : x),
                              (h.tooltipPos = k.inverted
                                  ? [
                                        a.len + a.pos - k.plotLeft - C - e / 2,
                                        b.len + b.pos - k.plotTop - r - x / 2,
                                        e,
                                    ]
                                  : [
                                        b.left - k.plotLeft + r + x / 2,
                                        a.pos - k.plotTop + C + e / 2,
                                        e,
                                    ]));
                    });
                };
                b.prototype.pointAttribs = function () {
                    return q.pointAttribs.apply(this, arguments);
                };
                b.prototype.translate3dPoints = function () {
                    return q.translate3dPoints.apply(this, arguments);
                };
                b.prototype.translate3dShapes = function () {
                    return q.translate3dShapes.apply(this, arguments);
                };
                b.defaultOptions = v(t.defaultOptions, m.defaultOptions, d);
                return b;
            })(m);
            l(c.prototype, {
                directTouch: !0,
                pointClass: a,
                trackerGroups: ["group", "dataLabelsGroup"],
                adjustForMissingColumns: q.adjustForMissingColumns,
                animate: q.animate,
                crispCol: q.crispCol,
                drawGraph: b,
                drawPoints: q.drawPoints,
                getSymbol: b,
                drawTracker: q.drawTracker,
                getColumnMetrics: q.getColumnMetrics,
            });
            f.registerSeriesType("columnrange", c);
            ("");
            return c;
        }
    );
    A(
        e,
        "Series/ColumnPyramid/ColumnPyramidSeries.js",
        [
            e["Series/Column/ColumnSeries.js"],
            e["Core/Series/SeriesRegistry.js"],
            e["Core/Utilities.js"],
        ],
        function (a, b, f) {
            var c =
                    (this && this.__extends) ||
                    (function () {
                        var a = function (b, c) {
                            a =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, d) {
                                        a.__proto__ = d;
                                    }) ||
                                function (a, d) {
                                    for (var b in d)
                                        d.hasOwnProperty(b) && (a[b] = d[b]);
                                };
                            return a(b, c);
                        };
                        return function (b, c) {
                            function g() {
                                this.constructor = b;
                            }
                            a(b, c);
                            b.prototype =
                                null === c
                                    ? Object.create(c)
                                    : ((g.prototype = c.prototype), new g());
                        };
                    })(),
                e = a.prototype,
                l = f.clamp,
                m = f.merge,
                t = f.pick;
            f = (function (b) {
                function f() {
                    var a = (null !== b && b.apply(this, arguments)) || this;
                    a.data = void 0;
                    a.options = void 0;
                    a.points = void 0;
                    return a;
                }
                c(f, b);
                f.prototype.translate = function () {
                    var a = this,
                        b = a.chart,
                        d = a.options,
                        c = (a.dense =
                            2 > a.closestPointRange * a.xAxis.transA);
                    c = a.borderWidth = t(d.borderWidth, c ? 0 : 1);
                    var f = a.yAxis,
                        h = d.threshold,
                        p = (a.translatedThreshold = f.getThreshold(h)),
                        m = t(d.minPointLength, 5),
                        q = a.getColumnMetrics(),
                        H = q.width,
                        E = (a.barW = Math.max(H, 1 + 2 * c)),
                        D = (a.pointXOffset = q.offset);
                    b.inverted && (p -= 0.5);
                    d.pointPadding && (E = Math.ceil(E));
                    e.translate.apply(a);
                    a.points.forEach(function (c) {
                        var k = t(c.yBottom, p),
                            w = 999 + Math.abs(k),
                            g = l(c.plotY, -w, f.len + w);
                        w = c.plotX + D;
                        var e = E / 2,
                            n = Math.min(g, k);
                        k = Math.max(g, k) - n;
                        var q;
                        c.barX = w;
                        c.pointWidth = H;
                        c.tooltipPos = b.inverted
                            ? [
                                  f.len + f.pos - b.plotLeft - g,
                                  a.xAxis.len - w - e,
                                  k,
                              ]
                            : [w + e, g + f.pos - b.plotTop, k];
                        g = h + (c.total || c.y);
                        "percent" === d.stacking &&
                            (g = h + (0 > c.y) ? -100 : 100);
                        g = f.toPixels(g, !0);
                        var r = (q = b.plotHeight - g - (b.plotHeight - p))
                            ? (e * (n - g)) / q
                            : 0;
                        var u = q ? (e * (n + k - g)) / q : 0;
                        q = w - r + e;
                        r = w + r + e;
                        var z = w + u + e;
                        u = w - u + e;
                        var J = n - m;
                        var y = n + k;
                        0 > c.y && ((J = n), (y = n + k + m));
                        b.inverted &&
                            ((z = f.width - n),
                            (q = g - (f.width - p)),
                            (r = (e * (g - z)) / q),
                            (u = (e * (g - (z - k))) / q),
                            (q = w + e + r),
                            (r = q - 2 * r),
                            (z = w - u + e),
                            (u = w + u + e),
                            (J = n),
                            (y = n + k - m),
                            0 > c.y && (y = n + k + m));
                        c.shapeType = "path";
                        c.shapeArgs = {
                            x: q,
                            y: J,
                            width: r - q,
                            height: k,
                            d: [
                                ["M", q, J],
                                ["L", r, J],
                                ["L", z, y],
                                ["L", u, y],
                                ["Z"],
                            ],
                        };
                    });
                };
                f.defaultOptions = m(a.defaultOptions, {});
                return f;
            })(a);
            b.registerSeriesType("columnpyramid", f);
            ("");
            return f;
        }
    );
    A(
        e,
        "Series/ErrorBar/ErrorBarSeries.js",
        [
            e["Series/BoxPlot/BoxPlotSeries.js"],
            e["Series/Column/ColumnSeries.js"],
            e["Core/Series/SeriesRegistry.js"],
            e["Core/Utilities.js"],
        ],
        function (a, b, f, c) {
            var e =
                    (this && this.__extends) ||
                    (function () {
                        var a = function (b, c) {
                            a =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, d) {
                                        a.__proto__ = d;
                                    }) ||
                                function (a, d) {
                                    for (var b in d)
                                        d.hasOwnProperty(b) && (a[b] = d[b]);
                                };
                            return a(b, c);
                        };
                        return function (b, c) {
                            function f() {
                                this.constructor = b;
                            }
                            a(b, c);
                            b.prototype =
                                null === c
                                    ? Object.create(c)
                                    : ((f.prototype = c.prototype), new f());
                        };
                    })(),
                l = f.seriesTypes.arearange,
                m = c.merge;
            c = c.extend;
            var t = (function (c) {
                function f() {
                    var a = (null !== c && c.apply(this, arguments)) || this;
                    a.data = void 0;
                    a.options = void 0;
                    a.points = void 0;
                    return a;
                }
                e(f, c);
                f.prototype.getColumnMetrics = function () {
                    return (
                        (this.linkedParent &&
                            this.linkedParent.columnMetrics) ||
                        b.prototype.getColumnMetrics.call(this)
                    );
                };
                f.prototype.drawDataLabels = function () {
                    var a = this.pointValKey;
                    l &&
                        (l.prototype.drawDataLabels.call(this),
                        this.data.forEach(function (b) {
                            b.y = b[a];
                        }));
                };
                f.prototype.toYData = function (a) {
                    return [a.low, a.high];
                };
                f.defaultOptions = m(a.defaultOptions, {
                    color: "#000000",
                    grouping: !1,
                    linkedTo: ":previous",
                    tooltip: {
                        pointFormat:
                            '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.low}</b> - <b>{point.high}</b><br/>',
                    },
                    whiskerWidth: null,
                });
                return f;
            })(a);
            c(t.prototype, {
                pointArrayMap: ["low", "high"],
                pointValKey: "high",
                doQuartiles: !1,
            });
            f.registerSeriesType("errorbar", t);
            ("");
            return t;
        }
    );
    A(
        e,
        "Series/Gauge/GaugePoint.js",
        [e["Core/Series/SeriesRegistry.js"]],
        function (a) {
            var b =
                (this && this.__extends) ||
                (function () {
                    var a = function (b, f) {
                        a =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, b) {
                                    a.__proto__ = b;
                                }) ||
                            function (a, b) {
                                for (var c in b)
                                    b.hasOwnProperty(c) && (a[c] = b[c]);
                            };
                        return a(b, f);
                    };
                    return function (b, f) {
                        function c() {
                            this.constructor = b;
                        }
                        a(b, f);
                        b.prototype =
                            null === f
                                ? Object.create(f)
                                : ((c.prototype = f.prototype), new c());
                    };
                })();
            return (function (a) {
                function c() {
                    var b = (null !== a && a.apply(this, arguments)) || this;
                    b.options = void 0;
                    b.series = void 0;
                    b.shapeArgs = void 0;
                    return b;
                }
                b(c, a);
                c.prototype.setState = function (a) {
                    this.state = a;
                };
                return c;
            })(a.series.prototype.pointClass);
        }
    );
    A(
        e,
        "Series/Gauge/GaugeSeries.js",
        [
            e["Series/Gauge/GaugePoint.js"],
            e["Core/Globals.js"],
            e["Core/Series/SeriesRegistry.js"],
            e["Core/Utilities.js"],
        ],
        function (a, b, f, c) {
            var e =
                (this && this.__extends) ||
                (function () {
                    var a = function (d, b) {
                        a =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, d) {
                                    a.__proto__ = d;
                                }) ||
                            function (a, d) {
                                for (var b in d)
                                    d.hasOwnProperty(b) && (a[b] = d[b]);
                            };
                        return a(d, b);
                    };
                    return function (d, b) {
                        function c() {
                            this.constructor = d;
                        }
                        a(d, b);
                        d.prototype =
                            null === b
                                ? Object.create(b)
                                : ((c.prototype = b.prototype), new c());
                    };
                })();
            b = b.noop;
            var l = f.series,
                m = f.seriesTypes.column,
                t = c.clamp,
                q = c.isNumber,
                D = c.extend,
                v = c.merge,
                g = c.pick,
                d = c.pInt;
            c = (function (a) {
                function b() {
                    var d = (null !== a && a.apply(this, arguments)) || this;
                    d.data = void 0;
                    d.points = void 0;
                    d.options = void 0;
                    d.yAxis = void 0;
                    return d;
                }
                e(b, a);
                b.prototype.translate = function () {
                    var a = this.yAxis,
                        b = this.options,
                        c = a.center;
                    this.generatePoints();
                    this.points.forEach(function (k) {
                        var h = v(b.dial, k.dial),
                            f = (d(h.radius) * c[2]) / 200,
                            e = (d(h.baseLength) * f) / 100,
                            g = (d(h.rearLength) * f) / 100,
                            n = h.baseWidth,
                            w = h.topWidth,
                            B = b.overshoot,
                            p =
                                a.startAngleRad +
                                a.translate(k.y, void 0, void 0, void 0, !0);
                        if (q(B) || !1 === b.wrap)
                            (B = q(B) ? (B / 180) * Math.PI : 0),
                                (p = t(
                                    p,
                                    a.startAngleRad - B,
                                    a.endAngleRad + B
                                ));
                        p = (180 * p) / Math.PI;
                        k.shapeType = "path";
                        k.shapeArgs = {
                            d: h.path || [
                                ["M", -g, -n / 2],
                                ["L", e, -n / 2],
                                ["L", f, -w / 2],
                                ["L", f, w / 2],
                                ["L", e, n / 2],
                                ["L", -g, n / 2],
                                ["Z"],
                            ],
                            translateX: c[0],
                            translateY: c[1],
                            rotation: p,
                        };
                        k.plotX = c[0];
                        k.plotY = c[1];
                    });
                };
                b.prototype.drawPoints = function () {
                    var a = this,
                        d = a.chart,
                        b = a.yAxis.center,
                        c = a.pivot,
                        k = a.options,
                        f = k.pivot,
                        e = d.renderer;
                    a.points.forEach(function (b) {
                        var c = b.graphic,
                            f = b.shapeArgs,
                            h = f.d,
                            g = v(k.dial, b.dial);
                        c
                            ? (c.animate(f), (f.d = h))
                            : (b.graphic = e[b.shapeType](f)
                                  .attr({ rotation: f.rotation, zIndex: 1 })
                                  .addClass("highcharts-dial")
                                  .add(a.group));
                        if (!d.styledMode)
                            b.graphic[c ? "animate" : "attr"]({
                                stroke: g.borderColor,
                                "stroke-width": g.borderWidth,
                                fill: g.backgroundColor,
                            });
                    });
                    c
                        ? c.animate({ translateX: b[0], translateY: b[1] })
                        : f &&
                          ((a.pivot = e
                              .circle(0, 0, f.radius)
                              .attr({ zIndex: 2 })
                              .addClass("highcharts-pivot")
                              .translate(b[0], b[1])
                              .add(a.group)),
                          d.styledMode ||
                              a.pivot.attr({
                                  fill: f.backgroundColor,
                                  stroke: f.borderColor,
                                  "stroke-width": f.borderWidth,
                              }));
                };
                b.prototype.animate = function (a) {
                    var d = this;
                    a ||
                        d.points.forEach(function (a) {
                            var b = a.graphic;
                            b &&
                                (b.attr({
                                    rotation:
                                        (180 * d.yAxis.startAngleRad) / Math.PI,
                                }),
                                b.animate(
                                    { rotation: a.shapeArgs.rotation },
                                    d.options.animation
                                ));
                        });
                };
                b.prototype.render = function () {
                    this.group = this.plotGroup(
                        "group",
                        "series",
                        this.visible ? "inherit" : "hidden",
                        this.options.zIndex,
                        this.chart.seriesGroup
                    );
                    l.prototype.render.call(this);
                    this.group.clip(this.chart.clipRect);
                };
                b.prototype.setData = function (a, d) {
                    l.prototype.setData.call(this, a, !1);
                    this.processData();
                    this.generatePoints();
                    g(d, !0) && this.chart.redraw();
                };
                b.prototype.hasData = function () {
                    return !!this.points.length;
                };
                b.defaultOptions = v(l.defaultOptions, {
                    dataLabels: {
                        borderColor: "#cccccc",
                        borderRadius: 3,
                        borderWidth: 1,
                        crop: !1,
                        defer: !1,
                        enabled: !0,
                        verticalAlign: "top",
                        y: 15,
                        zIndex: 2,
                    },
                    dial: {
                        backgroundColor: "#000000",
                        baseLength: "70%",
                        baseWidth: 3,
                        borderColor: "#cccccc",
                        borderWidth: 0,
                        radius: "80%",
                        rearLength: "10%",
                        topWidth: 1,
                    },
                    pivot: {
                        radius: 5,
                        borderWidth: 0,
                        borderColor: "#cccccc",
                        backgroundColor: "#000000",
                    },
                    tooltip: { headerFormat: "" },
                    showInLegend: !1,
                });
                return b;
            })(l);
            D(c.prototype, {
                angular: !0,
                directTouch: !0,
                drawGraph: b,
                drawTracker: m.prototype.drawTracker,
                fixedBox: !0,
                forceDL: !0,
                noSharedTooltip: !0,
                pointClass: a,
                trackerGroups: ["group", "dataLabelsGroup"],
            });
            f.registerSeriesType("gauge", c);
            ("");
            return c;
        }
    );
    A(
        e,
        "Series/DragNodesComposition.js",
        [e["Core/Utilities.js"]],
        function (a) {
            function b() {
                var a = this,
                    b,
                    c,
                    e;
                a.container &&
                    (b = f(a.container, "mousedown", function (b) {
                        var p = a.hoverPoint;
                        p &&
                            p.series &&
                            p.series.hasDraggableNodes &&
                            p.series.options.draggable &&
                            (p.series.onMouseDown(p, b),
                            (c = f(a.container, "mousemove", function (a) {
                                return (
                                    p && p.series && p.series.onMouseMove(p, a)
                                );
                            })),
                            (e = f(
                                a.container.ownerDocument,
                                "mouseup",
                                function (a) {
                                    c();
                                    e();
                                    return (
                                        p &&
                                        p.series &&
                                        p.series.onMouseUp(p, a)
                                    );
                                }
                            )));
                    }));
                f(a, "destroy", function () {
                    b();
                });
            }
            var f = a.addEvent,
                c = [];
            return {
                compose: function (a) {
                    -1 === c.indexOf(a) && (c.push(a), f(a, "load", b));
                },
                onMouseDown: function (a, b) {
                    b = this.chart.pointer.normalize(b);
                    a.fixedPosition = {
                        chartX: b.chartX,
                        chartY: b.chartY,
                        plotX: a.plotX,
                        plotY: a.plotY,
                    };
                    a.inDragMode = !0;
                },
                onMouseMove: function (a, b) {
                    if (a.fixedPosition && a.inDragMode) {
                        var c = this.chart,
                            f = c.pointer.normalize(b);
                        b = a.fixedPosition.chartX - f.chartX;
                        f = a.fixedPosition.chartY - f.chartY;
                        var e = c.graphLayoutsLookup,
                            p = void 0,
                            l = void 0;
                        if (5 < Math.abs(b) || 5 < Math.abs(f))
                            (p = a.fixedPosition.plotX - b),
                                (l = a.fixedPosition.plotY - f),
                                c.isInsidePlot(p, l) &&
                                    ((a.plotX = p),
                                    (a.plotY = l),
                                    (a.hasDragged = !0),
                                    this.redrawHalo(a),
                                    e.forEach(function (a) {
                                        a.restartSimulation();
                                    }));
                    }
                },
                onMouseUp: function (a, b) {
                    a.fixedPosition &&
                        (a.hasDragged &&
                            (this.layout.enableSimulation
                                ? this.layout.start()
                                : this.chart.redraw()),
                        (a.inDragMode = a.hasDragged = !1),
                        this.options.fixedDraggable || delete a.fixedPosition);
                },
                redrawHalo: function (a) {
                    a &&
                        this.halo &&
                        this.halo.attr({
                            d: a.haloPath(this.options.states.hover.halo.size),
                        });
                },
            };
        }
    );
    A(
        e,
        "Series/GraphLayoutComposition.js",
        [e["Core/Animation/AnimationUtilities.js"], e["Core/Utilities.js"]],
        function (a, b) {
            function f() {
                this.graphLayoutsLookup &&
                    (this.graphLayoutsLookup.forEach(function (a) {
                        a.updateSimulation();
                    }),
                    this.redraw());
            }
            function c() {
                this.graphLayoutsLookup &&
                    (this.graphLayoutsLookup.forEach(function (a) {
                        a.updateSimulation(!1);
                    }),
                    this.redraw());
            }
            function e() {
                this.graphLayoutsLookup &&
                    this.graphLayoutsLookup.forEach(function (a) {
                        a.stop();
                    });
            }
            function l() {
                var a = !1,
                    b = function (d) {
                        d.maxIterations-- &&
                            isFinite(d.temperature) &&
                            !d.isStable() &&
                            !d.enableSimulation &&
                            (d.beforeStep && d.beforeStep(),
                            d.step(),
                            (c = !1),
                            (a = !0));
                    };
                if (this.graphLayoutsLookup) {
                    m(!1, this);
                    for (
                        this.graphLayoutsLookup.forEach(function (a) {
                            return a.start();
                        });
                        !c;

                    ) {
                        var c = !0;
                        this.graphLayoutsLookup.forEach(b);
                    }
                    a &&
                        this.series.forEach(function (a) {
                            a && a.layout && a.render();
                        });
                }
            }
            var m = a.setAnimation,
                t = b.addEvent,
                q = [];
            return {
                compose: function (a) {
                    q.indexOf(a) &&
                        (q.push(a),
                        t(a, "afterPrint", f),
                        t(a, "beforePrint", c),
                        t(a, "predraw", e),
                        t(a, "render", l));
                },
                integrations: {},
                layouts: {},
            };
        }
    );
    A(
        e,
        "Series/PackedBubble/PackedBubblePoint.js",
        [
            e["Core/Chart/Chart.js"],
            e["Core/Series/Point.js"],
            e["Core/Series/SeriesRegistry.js"],
        ],
        function (a, b, f) {
            var c =
                (this && this.__extends) ||
                (function () {
                    var a = function (b, c) {
                        a =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, b) {
                                    a.__proto__ = b;
                                }) ||
                            function (a, b) {
                                for (var c in b)
                                    b.hasOwnProperty(c) && (a[c] = b[c]);
                            };
                        return a(b, c);
                    };
                    return function (b, c) {
                        function f() {
                            this.constructor = b;
                        }
                        a(b, c);
                        b.prototype =
                            null === c
                                ? Object.create(c)
                                : ((f.prototype = c.prototype), new f());
                    };
                })();
            return (function (f) {
                function e() {
                    var a = (null !== f && f.apply(this, arguments)) || this;
                    a.degree = NaN;
                    a.mass = NaN;
                    a.radius = NaN;
                    a.options = void 0;
                    a.series = void 0;
                    a.value = null;
                    return a;
                }
                c(e, f);
                e.prototype.destroy = function () {
                    this.series.layout &&
                        this.series.layout.removeElementFromCollection(
                            this,
                            this.series.layout.nodes
                        );
                    return b.prototype.destroy.apply(this, arguments);
                };
                e.prototype.firePointEvent = function () {
                    var a = this.series.options;
                    if (this.isParentNode && a.parentNode) {
                        var c = a.allowPointSelect;
                        a.allowPointSelect = a.parentNode.allowPointSelect;
                        b.prototype.firePointEvent.apply(this, arguments);
                        a.allowPointSelect = c;
                    } else b.prototype.firePointEvent.apply(this, arguments);
                };
                e.prototype.select = function () {
                    var c = this.series.chart;
                    this.isParentNode
                        ? ((c.getSelectedPoints = c.getSelectedParentNodes),
                          b.prototype.select.apply(this, arguments),
                          (c.getSelectedPoints = a.prototype.getSelectedPoints))
                        : b.prototype.select.apply(this, arguments);
                };
                return e;
            })(f.seriesTypes.bubble.prototype.pointClass);
        }
    );
    A(
        e,
        "Series/PackedBubble/PackedBubbleSeriesDefaults.js",
        [e["Core/Utilities.js"]],
        function (a) {
            var b = a.isNumber;
            ("");
            return {
                minSize: "10%",
                maxSize: "50%",
                sizeBy: "area",
                zoneAxis: "y",
                crisp: !1,
                tooltip: { pointFormat: "Value: {point.value}" },
                draggable: !0,
                useSimulation: !0,
                parentNode: { allowPointSelect: !1 },
                dataLabels: {
                    formatter: function () {
                        var a = this.series.chart.numberFormatter,
                            c = this.point.value;
                        return b(c) ? a(c, -1) : "";
                    },
                    parentNodeFormatter: function () {
                        return this.name;
                    },
                    parentNodeTextPath: { enabled: !0 },
                    padding: 0,
                    style: { transition: "opacity 2000ms" },
                },
                layoutAlgorithm: {
                    initialPositions: "circle",
                    initialPositionRadius: 20,
                    bubblePadding: 5,
                    parentNodeLimit: !1,
                    seriesInteraction: !0,
                    dragBetweenSeries: !1,
                    parentNodeOptions: {
                        maxIterations: 400,
                        gravitationalConstant: 0.03,
                        maxSpeed: 50,
                        initialPositionRadius: 100,
                        seriesInteraction: !0,
                        marker: {
                            fillColor: null,
                            fillOpacity: 1,
                            lineWidth: null,
                            lineColor: null,
                            symbol: "circle",
                        },
                    },
                    enableSimulation: !0,
                    type: "packedbubble",
                    integration: "packedbubble",
                    maxIterations: 1e3,
                    splitSeries: !1,
                    maxSpeed: 5,
                    gravitationalConstant: 0.01,
                    friction: -0.981,
                },
            };
        }
    );
    A(e, "Series/Networkgraph/VerletIntegration.js", [], function () {
        return {
            attractive: function (a, b, f) {
                var c = a.getMass(),
                    e = -f.x * b * this.diffTemperature;
                b = -f.y * b * this.diffTemperature;
                a.fromNode.fixedPosition ||
                    ((a.fromNode.plotX -= (e * c.fromNode) / a.fromNode.degree),
                    (a.fromNode.plotY -= (b * c.fromNode) / a.fromNode.degree));
                a.toNode.fixedPosition ||
                    ((a.toNode.plotX += (e * c.toNode) / a.toNode.degree),
                    (a.toNode.plotY += (b * c.toNode) / a.toNode.degree));
            },
            attractiveForceFunction: function (a, b) {
                return (b - a) / a;
            },
            barycenter: function () {
                var a = this.options.gravitationalConstant,
                    b = this.barycenter.xFactor,
                    f = this.barycenter.yFactor;
                b = (b - (this.box.left + this.box.width) / 2) * a;
                f = (f - (this.box.top + this.box.height) / 2) * a;
                this.nodes.forEach(function (a) {
                    a.fixedPosition ||
                        ((a.plotX -= b / a.mass / a.degree),
                        (a.plotY -= f / a.mass / a.degree));
                });
            },
            getK: function (a) {
                return Math.pow(
                    (a.box.width * a.box.height) / a.nodes.length,
                    0.5
                );
            },
            integrate: function (a, b) {
                var f = -a.options.friction,
                    c = a.options.maxSpeed,
                    e = (b.plotX + b.dispX - b.prevX) * f;
                f *= b.plotY + b.dispY - b.prevY;
                var l = Math.abs,
                    m = l(e) / (e || 1);
                l = l(f) / (f || 1);
                e = m * Math.min(c, Math.abs(e));
                f = l * Math.min(c, Math.abs(f));
                b.prevX = b.plotX + b.dispX;
                b.prevY = b.plotY + b.dispY;
                b.plotX += e;
                b.plotY += f;
                b.temperature = a.vectorLength({ x: e, y: f });
            },
            repulsive: function (a, b, f) {
                b = (b * this.diffTemperature) / a.mass / a.degree;
                a.fixedPosition || ((a.plotX += f.x * b), (a.plotY += f.y * b));
            },
            repulsiveForceFunction: function (a, b) {
                return ((b - a) / a) * (b > a ? 1 : 0);
            },
        };
    });
    A(
        e,
        "Series/PackedBubble/PackedBubbleIntegration.js",
        [e["Core/Globals.js"], e["Series/Networkgraph/VerletIntegration.js"]],
        function (a, b) {
            return {
                barycenter: function () {
                    for (
                        var a = this.options.gravitationalConstant,
                            b = this.box,
                            e = this.nodes,
                            l,
                            m,
                            t = 0;
                        t < e.length;
                        t++
                    ) {
                        var q = e[t];
                        this.options.splitSeries && !q.isParentNode
                            ? ((l = q.series.parentNode.plotX),
                              (m = q.series.parentNode.plotY))
                            : ((l = b.width / 2), (m = b.height / 2));
                        q.fixedPosition ||
                            ((q.plotX -=
                                ((q.plotX - l) * a) /
                                (q.mass * Math.sqrt(e.length))),
                            (q.plotY -=
                                ((q.plotY - m) * a) /
                                (q.mass * Math.sqrt(e.length))));
                    }
                },
                getK: a.noop,
                integrate: b.integrate,
                repulsive: function (a, b, e, l) {
                    var c = (b * this.diffTemperature) / a.mass / a.degree;
                    b = e.x * c;
                    e = e.y * c;
                    a.fixedPosition || ((a.plotX += b), (a.plotY += e));
                    l.fixedPosition || ((l.plotX -= b), (l.plotY -= e));
                },
                repulsiveForceFunction: function (a, b, e, l) {
                    return Math.min(a, (e.marker.radius + l.marker.radius) / 2);
                },
            };
        }
    );
    A(e, "Series/Networkgraph/EulerIntegration.js", [], function () {
        return {
            attractive: function (a, b, e, c) {
                var f = a.getMass(),
                    l = (e.x / c) * b;
                b *= e.y / c;
                a.fromNode.fixedPosition ||
                    ((a.fromNode.dispX -= (l * f.fromNode) / a.fromNode.degree),
                    (a.fromNode.dispY -= (b * f.fromNode) / a.fromNode.degree));
                a.toNode.fixedPosition ||
                    ((a.toNode.dispX += (l * f.toNode) / a.toNode.degree),
                    (a.toNode.dispY += (b * f.toNode) / a.toNode.degree));
            },
            attractiveForceFunction: function (a, b) {
                return (a * a) / b;
            },
            barycenter: function () {
                var a = this.options.gravitationalConstant,
                    b = this.barycenter.xFactor,
                    e = this.barycenter.yFactor;
                this.nodes.forEach(function (c) {
                    if (!c.fixedPosition) {
                        var f = c.getDegree();
                        f *= 1 + f / 2;
                        c.dispX += ((b - c.plotX) * a * f) / c.degree;
                        c.dispY += ((e - c.plotY) * a * f) / c.degree;
                    }
                });
            },
            getK: function (a) {
                return Math.pow(
                    (a.box.width * a.box.height) / a.nodes.length,
                    0.3
                );
            },
            integrate: function (a, b) {
                b.dispX += b.dispX * a.options.friction;
                b.dispY += b.dispY * a.options.friction;
                var e = (b.temperature = a.vectorLength({
                    x: b.dispX,
                    y: b.dispY,
                }));
                0 !== e &&
                    ((b.plotX +=
                        (b.dispX / e) *
                        Math.min(Math.abs(b.dispX), a.temperature)),
                    (b.plotY +=
                        (b.dispY / e) *
                        Math.min(Math.abs(b.dispY), a.temperature)));
            },
            repulsive: function (a, b, e, c) {
                a.dispX += ((e.x / c) * b) / a.degree;
                a.dispY += ((e.y / c) * b) / a.degree;
            },
            repulsiveForceFunction: function (a, b) {
                return (b * b) / a;
            },
        };
    });
    A(e, "Series/Networkgraph/QuadTreeNode.js", [], function () {
        return (function () {
            function a(a) {
                this.isInternal = this.isEmpty = this.body = !1;
                this.nodes = [];
                this.box = a;
                this.boxSize = Math.min(a.width, a.height);
            }
            a.prototype.divideBox = function () {
                var b = this.box.width / 2,
                    e = this.box.height / 2;
                this.nodes[0] = new a({
                    left: this.box.left,
                    top: this.box.top,
                    width: b,
                    height: e,
                });
                this.nodes[1] = new a({
                    left: this.box.left + b,
                    top: this.box.top,
                    width: b,
                    height: e,
                });
                this.nodes[2] = new a({
                    left: this.box.left + b,
                    top: this.box.top + e,
                    width: b,
                    height: e,
                });
                this.nodes[3] = new a({
                    left: this.box.left,
                    top: this.box.top + e,
                    width: b,
                    height: e,
                });
            };
            a.prototype.getBoxPosition = function (a) {
                var b = a.plotY < this.box.top + this.box.height / 2;
                return a.plotX < this.box.left + this.box.width / 2
                    ? b
                        ? 0
                        : 3
                    : b
                    ? 1
                    : 2;
            };
            a.prototype.insert = function (b, e) {
                this.isInternal
                    ? this.nodes[this.getBoxPosition(b)].insert(b, e - 1)
                    : ((this.isEmpty = !1),
                      this.body
                          ? e
                              ? ((this.isInternal = !0),
                                this.divideBox(),
                                !0 !== this.body &&
                                    (this.nodes[
                                        this.getBoxPosition(this.body)
                                    ].insert(this.body, e - 1),
                                    (this.body = !0)),
                                this.nodes[this.getBoxPosition(b)].insert(
                                    b,
                                    e - 1
                                ))
                              : ((e = new a({
                                    top: b.plotX || NaN,
                                    left: b.plotY || NaN,
                                    width: 0.1,
                                    height: 0.1,
                                })),
                                (e.body = b),
                                (e.isInternal = !1),
                                this.nodes.push(e))
                          : ((this.isInternal = !1), (this.body = b)));
            };
            a.prototype.updateMassAndCenter = function () {
                var a = 0,
                    e = 0,
                    c = 0;
                if (this.isInternal) {
                    for (var p = 0, l = this.nodes; p < l.length; p++) {
                        var m = l[p];
                        m.isEmpty ||
                            ((a += m.mass),
                            (e += m.plotX * m.mass),
                            (c += m.plotY * m.mass));
                    }
                    e /= a;
                    c /= a;
                } else
                    this.body &&
                        ((a = this.body.mass),
                        (e = this.body.plotX),
                        (c = this.body.plotY));
                this.mass = a;
                this.plotX = e;
                this.plotY = c;
            };
            return a;
        })();
    });
    A(
        e,
        "Series/Networkgraph/QuadTree.js",
        [e["Series/Networkgraph/QuadTreeNode.js"]],
        function (a) {
            return (function () {
                function b(b, c, e, l) {
                    this.box = { left: b, top: c, width: e, height: l };
                    this.maxDepth = 25;
                    this.root = new a(this.box);
                    this.root.isInternal = !0;
                    this.root.isRoot = !0;
                    this.root.divideBox();
                }
                b.prototype.calculateMassAndCenter = function () {
                    this.visitNodeRecursive(null, null, function (a) {
                        a.updateMassAndCenter();
                    });
                };
                b.prototype.insertNodes = function (a) {
                    for (var b = 0; b < a.length; b++)
                        this.root.insert(a[b], this.maxDepth);
                };
                b.prototype.visitNodeRecursive = function (a, b, e) {
                    var c;
                    a || (a = this.root);
                    a === this.root && b && (c = b(a));
                    if (!1 !== c) {
                        for (var f = 0, p = a.nodes; f < p.length; f++) {
                            var q = p[f];
                            if (q.isInternal) {
                                b && (c = b(q));
                                if (!1 === c) continue;
                                this.visitNodeRecursive(q, b, e);
                            } else q.body && b && b(q.body);
                            e && e(q);
                        }
                        a === this.root && e && e(a);
                    }
                };
                return b;
            })();
        }
    );
    A(
        e,
        "Series/Networkgraph/ReingoldFruchtermanLayout.js",
        [
            e["Series/Networkgraph/EulerIntegration.js"],
            e["Core/Globals.js"],
            e["Series/GraphLayoutComposition.js"],
            e["Series/Networkgraph/QuadTree.js"],
            e["Core/Utilities.js"],
            e["Series/Networkgraph/VerletIntegration.js"],
        ],
        function (a, b, e, c, p, l) {
            var f = b.win,
                t = p.clamp,
                q = p.defined,
                D = p.isFunction,
                v = p.pick;
            return (function () {
                function b() {
                    this.attractiveForce = void 0;
                    this.box = {};
                    this.currentStep = 0;
                    this.initialRendering = !0;
                    this.integration = void 0;
                    this.links = [];
                    this.nodes = [];
                    this.repulsiveForce = this.quadTree = this.options = void 0;
                    this.series = [];
                    this.simulation = !1;
                }
                b.compose = function (d) {
                    e.compose(d);
                    e.integrations.euler = a;
                    e.integrations.verlet = l;
                    e.layouts["reingold-fruchterman"] = b;
                };
                b.prototype.init = function (a) {
                    this.options = a;
                    this.nodes = [];
                    this.links = [];
                    this.series = [];
                    this.box = { x: 0, y: 0, width: 0, height: 0 };
                    this.setInitialRendering(!0);
                    this.integration = e.integrations[a.integration];
                    this.enableSimulation = a.enableSimulation;
                    this.attractiveForce = v(
                        a.attractiveForce,
                        this.integration.attractiveForceFunction
                    );
                    this.repulsiveForce = v(
                        a.repulsiveForce,
                        this.integration.repulsiveForceFunction
                    );
                    this.approximation = a.approximation;
                };
                b.prototype.updateSimulation = function (a) {
                    this.enableSimulation = v(a, this.options.enableSimulation);
                };
                b.prototype.start = function () {
                    var a = this.series,
                        b = this.options;
                    this.currentStep = 0;
                    this.forces = (a[0] && a[0].forces) || [];
                    this.chart = a[0] && a[0].chart;
                    this.initialRendering &&
                        (this.initPositions(),
                        a.forEach(function (a) {
                            a.finishedAnimating = !0;
                            a.render();
                        }));
                    this.setK();
                    this.resetSimulation(b);
                    this.enableSimulation && this.step();
                };
                b.prototype.step = function () {
                    var a = this,
                        b = this.series;
                    this.currentStep++;
                    "barnes-hut" === this.approximation &&
                        (this.createQuadTree(),
                        this.quadTree.calculateMassAndCenter());
                    for (var c = 0, e = this.forces || []; c < e.length; c++)
                        this[e[c] + "Forces"](this.temperature);
                    this.applyLimits();
                    this.temperature = this.coolDown(
                        this.startTemperature,
                        this.diffTemperature,
                        this.currentStep
                    );
                    this.prevSystemTemperature = this.systemTemperature;
                    this.systemTemperature = this.getSystemTemperature();
                    if (this.enableSimulation) {
                        for (c = 0; c < b.length; c++)
                            (e = b[c]), e.chart && e.render();
                        this.maxIterations-- &&
                        isFinite(this.temperature) &&
                        !this.isStable()
                            ? (this.simulation &&
                                  f.cancelAnimationFrame(this.simulation),
                              (this.simulation = f.requestAnimationFrame(
                                  function () {
                                      return a.step();
                                  }
                              )))
                            : (this.simulation = !1);
                    }
                };
                b.prototype.stop = function () {
                    this.simulation && f.cancelAnimationFrame(this.simulation);
                };
                b.prototype.setArea = function (a, b, c, e) {
                    this.box = { left: a, top: b, width: c, height: e };
                };
                b.prototype.setK = function () {
                    this.k =
                        this.options.linkLength || this.integration.getK(this);
                };
                b.prototype.addElementsToCollection = function (a, b) {
                    for (var d = 0; d < a.length; d++) {
                        var c = a[d];
                        -1 === b.indexOf(c) && b.push(c);
                    }
                };
                b.prototype.removeElementFromCollection = function (a, b) {
                    a = b.indexOf(a);
                    -1 !== a && b.splice(a, 1);
                };
                b.prototype.clear = function () {
                    this.nodes.length = 0;
                    this.links.length = 0;
                    this.series.length = 0;
                    this.resetSimulation();
                };
                b.prototype.resetSimulation = function () {
                    this.forcedStop = !1;
                    this.systemTemperature = 0;
                    this.setMaxIterations();
                    this.setTemperature();
                    this.setDiffTemperature();
                };
                b.prototype.restartSimulation = function () {
                    this.simulation
                        ? this.resetSimulation()
                        : (this.setInitialRendering(!1),
                          this.enableSimulation
                              ? this.start()
                              : this.setMaxIterations(1),
                          this.chart && this.chart.redraw(),
                          this.setInitialRendering(!0));
                };
                b.prototype.setMaxIterations = function (a) {
                    this.maxIterations = v(a, this.options.maxIterations);
                };
                b.prototype.setTemperature = function () {
                    this.temperature = this.startTemperature = Math.sqrt(
                        this.nodes.length
                    );
                };
                b.prototype.setDiffTemperature = function () {
                    this.diffTemperature =
                        this.startTemperature /
                        (this.options.maxIterations + 1);
                };
                b.prototype.setInitialRendering = function (a) {
                    this.initialRendering = a;
                };
                b.prototype.createQuadTree = function () {
                    this.quadTree = new c(
                        this.box.left,
                        this.box.top,
                        this.box.width,
                        this.box.height
                    );
                    this.quadTree.insertNodes(this.nodes);
                };
                b.prototype.initPositions = function () {
                    var a = this.options.initialPositions;
                    if (D(a)) {
                        a.call(this);
                        a = 0;
                        for (var b = this.nodes; a < b.length; a++) {
                            var c = b[a];
                            q(c.prevX) || (c.prevX = c.plotX);
                            q(c.prevY) || (c.prevY = c.plotY);
                            c.dispX = 0;
                            c.dispY = 0;
                        }
                    } else
                        "circle" === a
                            ? this.setCircularPositions()
                            : this.setRandomPositions();
                };
                b.prototype.setCircularPositions = function () {
                    for (
                        var a = this.box,
                            b = this.nodes,
                            c = (2 * Math.PI) / (b.length + 1),
                            e = b.filter(function (a) {
                                return 0 === a.linksTo.length;
                            }),
                            f = {},
                            g = this.options.initialPositionRadius,
                            p = function (a) {
                                var b = 0;
                                for (a = a.linksFrom || []; b < a.length; b++) {
                                    var d = a[b];
                                    f[d.toNode.id] ||
                                        ((f[d.toNode.id] = !0),
                                        q.push(d.toNode),
                                        p(d.toNode));
                                }
                            },
                            q = [],
                            l = 0;
                        l < e.length;
                        l++
                    ) {
                        var m = e[l];
                        q.push(m);
                        p(m);
                    }
                    if (q.length)
                        for (e = 0; e < b.length; e++)
                            (l = b[e]), -1 === q.indexOf(l) && q.push(l);
                    else q = b;
                    e = 0;
                    for (l = q.length; e < l; ++e)
                        (b = q[e]),
                            (b.plotX = b.prevX =
                                v(b.plotX, a.width / 2 + g * Math.cos(e * c))),
                            (b.plotY = b.prevY =
                                v(b.plotY, a.height / 2 + g * Math.sin(e * c))),
                            (b.dispX = 0),
                            (b.dispY = 0);
                };
                b.prototype.setRandomPositions = function () {
                    for (
                        var a = this.box,
                            b = this.nodes,
                            c = b.length + 1,
                            e = function (a) {
                                a = (a * a) / Math.PI;
                                return (a -= Math.floor(a));
                            },
                            f,
                            g = 0,
                            q = b.length;
                        g < q;
                        ++g
                    )
                        (f = b[g]),
                            (f.plotX = f.prevX = v(f.plotX, a.width * e(g))),
                            (f.plotY = f.prevY =
                                v(f.plotY, a.height * e(c + g))),
                            (f.dispX = 0),
                            (f.dispY = 0);
                };
                b.prototype.force = function (a) {
                    for (var b = [], d = 1; d < arguments.length; d++)
                        b[d - 1] = arguments[d];
                    this.integration[a].apply(this, b);
                };
                b.prototype.barycenterForces = function () {
                    this.getBarycenter();
                    this.force("barycenter");
                };
                b.prototype.getBarycenter = function () {
                    for (
                        var a = 0, b = 0, c = 0, e = 0, f = this.nodes;
                        e < f.length;
                        e++
                    ) {
                        var g = f[e];
                        b += g.plotX * g.mass;
                        c += g.plotY * g.mass;
                        a += g.mass;
                    }
                    return (this.barycenter = {
                        x: b,
                        y: c,
                        xFactor: b / a,
                        yFactor: c / a,
                    });
                };
                b.prototype.barnesHutApproximation = function (a, b) {
                    var d = this.getDistXY(a, b),
                        c = this.vectorLength(d);
                    if (a !== b && 0 !== c)
                        if (b.isInternal)
                            if (b.boxSize / c < this.options.theta && 0 !== c) {
                                var e = this.repulsiveForce(c, this.k);
                                this.force("repulsive", a, e * b.mass, d, c);
                                var f = !1;
                            } else f = !0;
                        else
                            (e = this.repulsiveForce(c, this.k)),
                                this.force("repulsive", a, e * b.mass, d, c);
                    return f;
                };
                b.prototype.repulsiveForces = function () {
                    var a = this;
                    if ("barnes-hut" === this.approximation)
                        for (
                            var b = function (b) {
                                    c.quadTree.visitNodeRecursive(
                                        null,
                                        function (d) {
                                            return a.barnesHutApproximation(
                                                b,
                                                d
                                            );
                                        }
                                    );
                                },
                                c = this,
                                e = 0,
                                f = this.nodes;
                            e < f.length;
                            e++
                        ) {
                            var g = f[e];
                            b(g);
                        }
                    else {
                        f = e = b = void 0;
                        for (var q = 0, p = this.nodes; q < p.length; q++) {
                            g = p[q];
                            for (var l = 0, m = this.nodes; l < m.length; l++) {
                                var t = m[l];
                                g === t ||
                                    g.fixedPosition ||
                                    ((f = this.getDistXY(g, t)),
                                    (e = this.vectorLength(f)),
                                    0 !== e &&
                                        ((b = this.repulsiveForce(e, this.k)),
                                        this.force(
                                            "repulsive",
                                            g,
                                            b * t.mass,
                                            f,
                                            e
                                        )));
                            }
                        }
                    }
                };
                b.prototype.attractiveForces = function () {
                    for (
                        var a, b, c, e = 0, f = this.links;
                        e < f.length;
                        e++
                    ) {
                        var g = f[e];
                        g.fromNode &&
                            g.toNode &&
                            ((a = this.getDistXY(g.fromNode, g.toNode)),
                            (b = this.vectorLength(a)),
                            0 !== b &&
                                ((c = this.attractiveForce(b, this.k)),
                                this.force("attractive", g, c, a, b)));
                    }
                };
                b.prototype.applyLimits = function () {
                    for (var a = 0, b = this.nodes; a < b.length; a++) {
                        var c = b[a];
                        if (c.fixedPosition) break;
                        this.integration.integrate(this, c);
                        this.applyLimitBox(c, this.box);
                        c.dispX = 0;
                        c.dispY = 0;
                    }
                };
                b.prototype.applyLimitBox = function (a, b) {
                    var d = a.radius;
                    a.plotX = t(a.plotX, b.left + d, b.width - d);
                    a.plotY = t(a.plotY, b.top + d, b.height - d);
                };
                b.prototype.coolDown = function (a, b, c) {
                    return a - b * c;
                };
                b.prototype.isStable = function () {
                    return (
                        0.00001 >
                            Math.abs(
                                this.systemTemperature -
                                    this.prevSystemTemperature
                            ) || 0 >= this.temperature
                    );
                };
                b.prototype.getSystemTemperature = function () {
                    for (var a = 0, b = 0, c = this.nodes; b < c.length; b++)
                        a += c[b].temperature;
                    return a;
                };
                b.prototype.vectorLength = function (a) {
                    return Math.sqrt(a.x * a.x + a.y * a.y);
                };
                b.prototype.getDistR = function (a, b) {
                    a = this.getDistXY(a, b);
                    return this.vectorLength(a);
                };
                b.prototype.getDistXY = function (a, b) {
                    var d = a.plotX - b.plotX;
                    a = a.plotY - b.plotY;
                    return { x: d, y: a, absX: Math.abs(d), absY: Math.abs(a) };
                };
                return b;
            })();
        }
    );
    A(
        e,
        "Series/PackedBubble/PackedBubbleLayout.js",
        [
            e["Series/GraphLayoutComposition.js"],
            e["Series/PackedBubble/PackedBubbleIntegration.js"],
            e["Series/Networkgraph/ReingoldFruchtermanLayout.js"],
            e["Core/Utilities.js"],
        ],
        function (a, b, e, c) {
            function f() {
                var a = [];
                this.series.forEach(function (b) {
                    b.parentNode &&
                        b.parentNode.selected &&
                        a.push(b.parentNode);
                });
                return a;
            }
            function l() {
                this.allDataPoints && delete this.allDataPoints;
            }
            var m =
                    (this && this.__extends) ||
                    (function () {
                        var a = function (b, d) {
                            a =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, b) {
                                        a.__proto__ = b;
                                    }) ||
                                function (a, b) {
                                    for (var d in b)
                                        b.hasOwnProperty(d) && (a[d] = b[d]);
                                };
                            return a(b, d);
                        };
                        return function (b, d) {
                            function c() {
                                this.constructor = b;
                            }
                            a(b, d);
                            b.prototype =
                                null === d
                                    ? Object.create(d)
                                    : ((c.prototype = d.prototype), new c());
                        };
                    })(),
                t = c.addEvent,
                q = c.pick,
                D = [];
            c = (function (c) {
                function g() {
                    var a = (null !== c && c.apply(this, arguments)) || this;
                    a.index = NaN;
                    a.nodes = [];
                    a.options = void 0;
                    a.series = [];
                    return a;
                }
                m(g, c);
                g.compose = function (d) {
                    e.compose(d);
                    a.integrations.packedbubble = b;
                    a.layouts.packedbubble = g;
                    -1 === D.indexOf(d) &&
                        (D.push(d),
                        t(d, "beforeRedraw", l),
                        (d.prototype.getSelectedParentNodes = f));
                };
                g.prototype.beforeStep = function () {
                    this.options.marker &&
                        this.series.forEach(function (a) {
                            a && a.calculateParentRadius();
                        });
                };
                g.prototype.isStable = function () {
                    var a = Math.abs(
                        this.prevSystemTemperature - this.systemTemperature
                    );
                    return (
                        (1 >
                            Math.abs(
                                (10 * this.systemTemperature) /
                                    Math.sqrt(this.nodes.length)
                            ) &&
                            0.00001 > a) ||
                        0 >= this.temperature
                    );
                };
                g.prototype.setCircularPositions = function () {
                    for (
                        var a = this.box,
                            b = this.nodes,
                            c = (2 * Math.PI) / (b.length + 1),
                            e = this.options.initialPositionRadius,
                            f,
                            g,
                            l = 0,
                            p = 0;
                        p < b.length;
                        p++
                    ) {
                        var m = b[p];
                        this.options.splitSeries && !m.isParentNode
                            ? ((f = m.series.parentNode.plotX),
                              (g = m.series.parentNode.plotY))
                            : ((f = a.width / 2), (g = a.height / 2));
                        m.plotX = m.prevX = q(
                            m.plotX,
                            f + e * Math.cos(m.index || l * c)
                        );
                        m.plotY = m.prevY = q(
                            m.plotY,
                            g + e * Math.sin(m.index || l * c)
                        );
                        m.dispX = 0;
                        m.dispY = 0;
                        l++;
                    }
                };
                g.prototype.repulsiveForces = function () {
                    var a = this,
                        b = a.options.bubblePadding,
                        c,
                        e,
                        f;
                    a.nodes.forEach(function (d) {
                        d.degree = d.mass;
                        d.neighbours = 0;
                        a.nodes.forEach(function (g) {
                            c = 0;
                            d === g ||
                                d.fixedPosition ||
                                (!a.options.seriesInteraction &&
                                    d.series !== g.series) ||
                                ((f = a.getDistXY(d, g)),
                                (e =
                                    a.vectorLength(f) -
                                    (d.marker.radius + g.marker.radius + b)),
                                0 > e &&
                                    ((d.degree += 0.01),
                                    d.neighbours++,
                                    (c = a.repulsiveForce(
                                        -e / Math.sqrt(d.neighbours),
                                        a.k,
                                        d,
                                        g
                                    ))),
                                a.force("repulsive", d, c * g.mass, f, g, e));
                        });
                    });
                };
                g.prototype.applyLimitBox = function (a, b) {
                    if (
                        this.options.splitSeries &&
                        !a.isParentNode &&
                        this.options.parentNodeLimit
                    ) {
                        var d = this.getDistXY(a, a.series.parentNode);
                        var e =
                            a.series.parentNodeRadius -
                            a.marker.radius -
                            this.vectorLength(d);
                        0 > e &&
                            e > -2 * a.marker.radius &&
                            ((a.plotX -= 0.01 * d.x), (a.plotY -= 0.01 * d.y));
                    }
                    c.prototype.applyLimitBox.call(this, a, b);
                };
                return g;
            })(e);
            return (a.layouts.packedbubble = c);
        }
    );
    A(
        e,
        "Series/PackedBubble/PackedBubbleSeries.js",
        [
            e["Core/Color/Color.js"],
            e["Series/DragNodesComposition.js"],
            e["Series/GraphLayoutComposition.js"],
            e["Core/Globals.js"],
            e["Series/PackedBubble/PackedBubblePoint.js"],
            e["Series/PackedBubble/PackedBubbleSeriesDefaults.js"],
            e["Series/PackedBubble/PackedBubbleLayout.js"],
            e["Core/Series/SeriesRegistry.js"],
            e["Core/Utilities.js"],
        ],
        function (a, b, e, c, p, l, m, t, q) {
            var f =
                    (this && this.__extends) ||
                    (function () {
                        var a = function (b, c) {
                            a =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, b) {
                                        a.__proto__ = b;
                                    }) ||
                                function (a, b) {
                                    for (var c in b)
                                        b.hasOwnProperty(c) && (a[c] = b[c]);
                                };
                            return a(b, c);
                        };
                        return function (b, c) {
                            function d() {
                                this.constructor = b;
                            }
                            a(b, c);
                            b.prototype =
                                null === c
                                    ? Object.create(c)
                                    : ((d.prototype = c.prototype), new d());
                        };
                    })(),
                v = a.parse;
            a = c.noop;
            var g = t.series.prototype,
                d = t.seriesTypes.bubble,
                k = q.addEvent,
                n = q.clamp,
                h = q.defined,
                A = q.extend,
                L = q.fireEvent,
                I = q.isArray,
                H = q.isNumber,
                E = q.merge,
                N = q.pick;
            q = (function (a) {
                function c() {
                    var b = (null !== a && a.apply(this, arguments)) || this;
                    b.chart = void 0;
                    b.data = void 0;
                    b.layout = void 0;
                    b.options = void 0;
                    b.parentNodeMass = 0;
                    b.points = void 0;
                    b.xData = void 0;
                    return b;
                }
                f(c, a);
                c.compose = function (a, b, c, e) {
                    d.compose(a, b, c, e);
                    m.compose(b);
                };
                c.prototype.accumulateAllPoints = function () {
                    for (
                        var a = this.chart, b = [], c, d = 0, e = a.series;
                        d < e.length;
                        d++
                    ) {
                        var f = e[d];
                        if (
                            (f.is("packedbubble") && f.visible) ||
                            !a.options.chart.ignoreHiddenSeries
                        ) {
                            c = f.yData || [];
                            for (var g = 0; g < c.length; g++)
                                b.push([
                                    null,
                                    null,
                                    c[g],
                                    f.index,
                                    g,
                                    { id: g, marker: { radius: 0 } },
                                ]);
                        }
                    }
                    return b;
                };
                c.prototype.addLayout = function () {
                    var a = (this.options.layoutAlgorithm =
                            this.options.layoutAlgorithm || {}),
                        b = a.type || "packedbubble",
                        c = this.chart.options.chart,
                        d = this.chart.graphLayoutsStorage,
                        f = this.chart.graphLayoutsLookup;
                    d ||
                        ((this.chart.graphLayoutsStorage = d = {}),
                        (this.chart.graphLayoutsLookup = f = []));
                    var g = d[b];
                    g ||
                        ((a.enableSimulation = h(c.forExport)
                            ? !c.forExport
                            : a.enableSimulation),
                        (d[b] = g = new e.layouts[b]()),
                        g.init(a),
                        f.splice(g.index, 0, g));
                    this.layout = g;
                    this.points.forEach(function (a) {
                        a.mass = 2;
                        a.degree = 1;
                        a.collisionNmb = 1;
                    });
                    g.setArea(
                        0,
                        0,
                        this.chart.plotWidth,
                        this.chart.plotHeight
                    );
                    g.addElementsToCollection([this], g.series);
                    g.addElementsToCollection(this.points, g.nodes);
                };
                c.prototype.addSeriesLayout = function () {
                    var a = (this.options.layoutAlgorithm =
                            this.options.layoutAlgorithm || {}),
                        b = a.type || "packedbubble",
                        c = this.chart.graphLayoutsStorage,
                        d = this.chart.graphLayoutsLookup;
                    a = E(a, a.parentNodeOptions, {
                        enableSimulation: this.layout.options.enableSimulation,
                    });
                    var f = c[b + "-series"];
                    f ||
                        ((c[b + "-series"] = f = new e.layouts[b]()),
                        f.init(a),
                        d.splice(f.index, 0, f));
                    this.parentNodeLayout = f;
                    this.createParentNodes();
                };
                c.prototype.calculateParentRadius = function () {
                    var a = this.seriesBox();
                    this.parentNodeRadius = n(
                        Math.sqrt((2 * this.parentNodeMass) / Math.PI) + 20,
                        20,
                        a
                            ? Math.max(
                                  Math.sqrt(
                                      Math.pow(a.width, 2) +
                                          Math.pow(a.height, 2)
                                  ) /
                                      2 +
                                      20,
                                  20
                              )
                            : Math.sqrt((2 * this.parentNodeMass) / Math.PI) +
                                  20
                    );
                    this.parentNode &&
                        (this.parentNode.marker.radius =
                            this.parentNode.radius =
                                this.parentNodeRadius);
                };
                c.prototype.calculateZExtremes = function () {
                    var a = this.options.zMin,
                        b = this.options.zMax,
                        c = Infinity,
                        d = -Infinity;
                    if (a && b) return [a, b];
                    this.chart.series.forEach(function (a) {
                        a.yData.forEach(function (a) {
                            h(a) && (a > d && (d = a), a < c && (c = a));
                        });
                    });
                    a = N(a, c);
                    b = N(b, d);
                    return [a, b];
                };
                c.prototype.checkOverlap = function (a, b) {
                    var c = a[0] - b[0],
                        d = a[1] - b[1];
                    return (
                        -0.001 >
                        Math.sqrt(c * c + d * d) - Math.abs(a[2] + b[2])
                    );
                };
                c.prototype.createParentNodes = function () {
                    var a = this,
                        b = this.pointClass,
                        c = this.chart,
                        d = this.parentNodeLayout,
                        e = this.layout.options,
                        f,
                        g = this.parentNode,
                        h = {
                            radius: this.parentNodeRadius,
                            lineColor: this.color,
                            fillColor: v(this.color).brighten(0.4).get(),
                        };
                    e.parentNodeOptions &&
                        (h = E(e.parentNodeOptions.marker || {}, h));
                    this.parentNodeMass = 0;
                    this.points.forEach(function (b) {
                        a.parentNodeMass +=
                            Math.PI * Math.pow(b.marker.radius, 2);
                    });
                    this.calculateParentRadius();
                    d.nodes.forEach(function (b) {
                        b.seriesIndex === a.index && (f = !0);
                    });
                    d.setArea(0, 0, c.plotWidth, c.plotHeight);
                    f ||
                        (g ||
                            (g = new b().init(this, {
                                mass: this.parentNodeRadius / 2,
                                marker: h,
                                dataLabels: { inside: !1 },
                                states: {
                                    normal: { marker: h },
                                    hover: { marker: h },
                                },
                                dataLabelOnNull: !0,
                                degree: this.parentNodeRadius,
                                isParentNode: !0,
                                seriesIndex: this.index,
                            })),
                        this.parentNode &&
                            ((g.plotX = this.parentNode.plotX),
                            (g.plotY = this.parentNode.plotY)),
                        (this.parentNode = g),
                        d.addElementsToCollection([this], d.series),
                        d.addElementsToCollection([g], d.nodes));
                };
                c.prototype.deferLayout = function () {
                    var a = this.options.layoutAlgorithm;
                    this.visible &&
                        (this.addLayout(),
                        a.splitSeries && this.addSeriesLayout());
                };
                c.prototype.destroy = function () {
                    var a = this;
                    this.chart.graphLayoutsLookup &&
                        this.chart.graphLayoutsLookup.forEach(function (b) {
                            b.removeElementFromCollection(a, b.series);
                        }, this);
                    this.parentNode &&
                        this.parentNodeLayout &&
                        (this.parentNodeLayout.removeElementFromCollection(
                            this.parentNode,
                            this.parentNodeLayout.nodes
                        ),
                        this.parentNode.dataLabel &&
                            (this.parentNode.dataLabel =
                                this.parentNode.dataLabel.destroy()));
                    g.destroy.apply(this, arguments);
                };
                c.prototype.drawDataLabels = function () {
                    var a = this.options.dataLabels.textPath,
                        b = this.points;
                    g.drawDataLabels.apply(this, arguments);
                    this.parentNode &&
                        ((this.parentNode.formatPrefix = "parentNode"),
                        (this.points = [this.parentNode]),
                        (this.options.dataLabels.textPath =
                            this.options.dataLabels.parentNodeTextPath),
                        g.drawDataLabels.apply(this, arguments),
                        (this.points = b),
                        (this.options.dataLabels.textPath = a));
                };
                c.prototype.drawGraph = function () {
                    if (this.layout && this.layout.options.splitSeries) {
                        var a = this.chart,
                            b = this.layout.options.parentNodeOptions.marker;
                        b = {
                            fill:
                                b.fillColor ||
                                v(this.color).brighten(0.4).get(),
                            opacity: b.fillOpacity,
                            stroke: b.lineColor || this.color,
                            "stroke-width": N(
                                b.lineWidth,
                                this.options.lineWidth
                            ),
                        };
                        this.parentNodesGroup ||
                            ((this.parentNodesGroup = this.plotGroup(
                                "parentNodesGroup",
                                "parentNode",
                                this.visible ? "inherit" : "hidden",
                                0.1,
                                a.seriesGroup
                            )),
                            this.group.attr({ zIndex: 2 }));
                        this.calculateParentRadius();
                        var c = E(
                            {
                                x:
                                    this.parentNode.plotX -
                                    this.parentNodeRadius,
                                y:
                                    this.parentNode.plotY -
                                    this.parentNodeRadius,
                                width: 2 * this.parentNodeRadius,
                                height: 2 * this.parentNodeRadius,
                            },
                            b
                        );
                        this.parentNode.graphic ||
                            (this.graph = this.parentNode.graphic =
                                a.renderer
                                    .symbol(b.symbol)
                                    .add(this.parentNodesGroup));
                        this.parentNode.graphic.attr(c);
                    }
                };
                c.prototype.drawTracker = function () {
                    var b = this.parentNode;
                    a.prototype.drawTracker.call(this);
                    if (b) {
                        var c = I(b.dataLabels)
                            ? b.dataLabels
                            : b.dataLabel
                            ? [b.dataLabel]
                            : [];
                        b.graphic && (b.graphic.element.point = b);
                        c.forEach(function (a) {
                            a.div ? (a.div.point = b) : (a.element.point = b);
                        });
                    }
                };
                c.prototype.getPointRadius = function () {
                    var a = this,
                        b = this.chart,
                        c = this.options,
                        d = c.useSimulation,
                        e = Math.min(b.plotWidth, b.plotHeight),
                        f = {},
                        g = [],
                        h = b.allDataPoints || [],
                        k = h.length,
                        y,
                        q,
                        m,
                        l;
                    ["minSize", "maxSize"].forEach(function (a) {
                        var b = parseInt(c[a], 10),
                            d = /%$/.test(c[a]);
                        f[a] = d ? (e * b) / 100 : b * Math.sqrt(k);
                    });
                    b.minRadius = y = f.minSize / Math.sqrt(k);
                    b.maxRadius = q = f.maxSize / Math.sqrt(k);
                    var p = d ? this.calculateZExtremes() : [y, q];
                    h.forEach(function (b, c) {
                        m = d ? n(b[2], p[0], p[1]) : b[2];
                        l = a.getRadius(p[0], p[1], y, q, m);
                        0 === l && (l = null);
                        h[c][2] = l;
                        g.push(l);
                    });
                    this.radii = g;
                };
                c.prototype.init = function () {
                    g.init.apply(this, arguments);
                    this.eventsToUnbind.push(
                        k(this, "updatedData", function () {
                            var a = this;
                            this.chart.series.forEach(function (b) {
                                b.type === a.type && (b.isDirty = !0);
                            }, this);
                        })
                    );
                    return this;
                };
                c.prototype.onMouseUp = function (a) {
                    var c = a;
                    if (c.fixedPosition && !c.removed) {
                        var d = this.layout,
                            e = this.parentNodeLayout,
                            f,
                            g;
                        e &&
                            d.options.dragBetweenSeries &&
                            e.nodes.forEach(function (a) {
                                c &&
                                    c.marker &&
                                    a !== c.series.parentNode &&
                                    ((f = d.getDistXY(c, a)),
                                    (g =
                                        d.vectorLength(f) -
                                        a.marker.radius -
                                        c.marker.radius),
                                    0 > g &&
                                        (a.series.addPoint(
                                            E(c.options, {
                                                plotX: c.plotX,
                                                plotY: c.plotY,
                                            }),
                                            !1
                                        ),
                                        d.removeElementFromCollection(
                                            c,
                                            d.nodes
                                        ),
                                        c.remove()));
                            });
                        b.onMouseUp.apply(this, arguments);
                    }
                };
                c.prototype.placeBubbles = function (a) {
                    var b = this.checkOverlap,
                        c = this.positionBubble,
                        d = [],
                        e = 1,
                        f = 0,
                        g = 0;
                    var h = [];
                    var k;
                    a = a.sort(function (a, b) {
                        return b[2] - a[2];
                    });
                    if (a.length) {
                        d.push([[0, 0, a[0][2], a[0][3], a[0][4]]]);
                        if (1 < a.length)
                            for (
                                d.push([
                                    [
                                        0,
                                        0 - a[1][2] - a[0][2],
                                        a[1][2],
                                        a[1][3],
                                        a[1][4],
                                    ],
                                ]),
                                    k = 2;
                                k < a.length;
                                k++
                            )
                                (a[k][2] = a[k][2] || 1),
                                    (h = c(d[e][f], d[e - 1][g], a[k])),
                                    b(h, d[e][0])
                                        ? (d.push([]),
                                          (g = 0),
                                          d[e + 1].push(
                                              c(d[e][f], d[e][0], a[k])
                                          ),
                                          e++,
                                          (f = 0))
                                        : 1 < e &&
                                          d[e - 1][g + 1] &&
                                          b(h, d[e - 1][g + 1])
                                        ? (g++,
                                          d[e].push(
                                              c(d[e][f], d[e - 1][g], a[k])
                                          ),
                                          f++)
                                        : (f++, d[e].push(h));
                        this.chart.stages = d;
                        this.chart.rawPositions = [].concat.apply([], d);
                        this.resizeRadius();
                        h = this.chart.rawPositions;
                    }
                    return h;
                };
                c.prototype.pointAttribs = function (a, b) {
                    var c = this.options,
                        d = c.marker;
                    a &&
                        a.isParentNode &&
                        c.layoutAlgorithm &&
                        c.layoutAlgorithm.parentNodeOptions &&
                        (d = c.layoutAlgorithm.parentNodeOptions.marker);
                    c = d.fillOpacity;
                    a = g.pointAttribs.call(this, a, b);
                    1 !== c && (a["fill-opacity"] = c);
                    return a;
                };
                c.prototype.positionBubble = function (a, b, c) {
                    var d = Math.sqrt,
                        e = Math.asin,
                        f = Math.acos,
                        g = Math.pow,
                        h = Math.abs;
                    d = d(g(a[0] - b[0], 2) + g(a[1] - b[1], 2));
                    f = f(
                        (g(d, 2) + g(c[2] + b[2], 2) - g(c[2] + a[2], 2)) /
                            (2 * (c[2] + b[2]) * d)
                    );
                    e = e(h(a[0] - b[0]) / d);
                    a =
                        (0 > a[1] - b[1] ? 0 : Math.PI) +
                        f +
                        e * (0 > (a[0] - b[0]) * (a[1] - b[1]) ? 1 : -1);
                    return [
                        b[0] + (b[2] + c[2]) * Math.sin(a),
                        b[1] - (b[2] + c[2]) * Math.cos(a),
                        c[2],
                        c[3],
                        c[4],
                    ];
                };
                c.prototype.render = function () {
                    var a = [];
                    g.render.apply(this, arguments);
                    this.options.dataLabels.allowOverlap ||
                        (this.data.forEach(function (b) {
                            I(b.dataLabels) &&
                                b.dataLabels.forEach(function (b) {
                                    a.push(b);
                                });
                        }),
                        this.options.useSimulation &&
                            this.chart.hideOverlappingLabels(a));
                };
                c.prototype.resizeRadius = function () {
                    var a = this.chart,
                        b = a.rawPositions,
                        c = Math.min,
                        d = Math.max,
                        e = a.plotLeft,
                        f = a.plotTop,
                        g = a.plotHeight,
                        h = a.plotWidth,
                        k,
                        n;
                    var q = (k = Number.POSITIVE_INFINITY);
                    var l = (n = Number.NEGATIVE_INFINITY);
                    for (var m = 0; m < b.length; m++) {
                        var p = b[m];
                        var t = p[2];
                        q = c(q, p[0] - t);
                        l = d(l, p[0] + t);
                        k = c(k, p[1] - t);
                        n = d(n, p[1] + t);
                    }
                    p = [l - q, n - k];
                    c = c.apply([], [(h - e) / p[0], (g - f) / p[1]]);
                    if (1e-10 < Math.abs(c - 1)) {
                        for (a = 0; a < b.length; a++) (p = b[a]), (p[2] *= c);
                        this.placeBubbles(b);
                    } else
                        (a.diffY = g / 2 + f - k - (n - k) / 2),
                            (a.diffX = h / 2 + e - q - (l - q) / 2);
                };
                c.prototype.seriesBox = function () {
                    var a = this.chart,
                        b = Math.max,
                        c = Math.min,
                        d = [
                            a.plotLeft,
                            a.plotLeft + a.plotWidth,
                            a.plotTop,
                            a.plotTop + a.plotHeight,
                        ],
                        e;
                    this.data.forEach(function (a) {
                        h(a.plotX) &&
                            h(a.plotY) &&
                            a.marker.radius &&
                            ((e = a.marker.radius),
                            (d[0] = c(d[0], a.plotX - e)),
                            (d[1] = b(d[1], a.plotX + e)),
                            (d[2] = c(d[2], a.plotY - e)),
                            (d[3] = b(d[3], a.plotY + e)));
                    });
                    return H(d.width / d.height) ? d : null;
                };
                c.prototype.setVisible = function () {
                    var a = this;
                    g.setVisible.apply(a, arguments);
                    a.parentNodeLayout && a.graph
                        ? a.visible
                            ? (a.graph.show(),
                              a.parentNode.dataLabel &&
                                  a.parentNode.dataLabel.show())
                            : (a.graph.hide(),
                              a.parentNodeLayout.removeElementFromCollection(
                                  a.parentNode,
                                  a.parentNodeLayout.nodes
                              ),
                              a.parentNode.dataLabel &&
                                  a.parentNode.dataLabel.hide())
                        : a.layout &&
                          (a.visible
                              ? a.layout.addElementsToCollection(
                                    a.points,
                                    a.layout.nodes
                                )
                              : a.points.forEach(function (b) {
                                    a.layout.removeElementFromCollection(
                                        b,
                                        a.layout.nodes
                                    );
                                }));
                };
                c.prototype.translate = function () {
                    var a = this.chart,
                        b = this.data,
                        c = this.index,
                        d = this.options.useSimulation;
                    this.processedXData = this.xData;
                    this.generatePoints();
                    h(a.allDataPoints) ||
                        ((a.allDataPoints = this.accumulateAllPoints()),
                        this.getPointRadius());
                    if (d) var e = a.allDataPoints;
                    else
                        (e = this.placeBubbles(a.allDataPoints)),
                            (this.options.draggable = !1);
                    for (var f = 0, g = e; f < g.length; f++) {
                        var k = g[f];
                        if (k[3] === c) {
                            e = b[k[4]];
                            var n = N(k[2], void 0);
                            d ||
                                ((e.plotX = k[0] - a.plotLeft + a.diffX),
                                (e.plotY = k[1] - a.plotTop + a.diffY));
                            H(n) &&
                                ((e.marker = A(e.marker, {
                                    radius: n,
                                    width: 2 * n,
                                    height: 2 * n,
                                })),
                                (e.radius = n));
                        }
                    }
                    d && this.deferLayout();
                    L(this, "afterTranslate");
                };
                c.defaultOptions = E(d.defaultOptions, l);
                return c;
            })(d);
            A(q.prototype, {
                pointClass: p,
                axisTypes: [],
                directTouch: !0,
                forces: ["barycenter", "repulsive"],
                hasDraggableNodes: !0,
                isCartesian: !1,
                noSharedTooltip: !0,
                pointArrayMap: ["value"],
                pointValKey: "value",
                requireSorting: !1,
                trackerGroups: ["group", "dataLabelsGroup", "parentNodesGroup"],
                alignDataLabel: g.alignDataLabel,
                indexateNodes: a,
                onMouseDown: b.onMouseDown,
                onMouseMove: b.onMouseMove,
                redrawHalo: b.redrawHalo,
                searchPoint: a,
            });
            t.registerSeriesType("packedbubble", q);
            ("");
            return q;
        }
    );
    A(
        e,
        "Series/Polygon/PolygonSeries.js",
        [
            e["Core/Globals.js"],
            e["Core/Legend/LegendSymbol.js"],
            e["Core/Series/SeriesRegistry.js"],
            e["Core/Utilities.js"],
        ],
        function (a, b, e, c) {
            var f =
                (this && this.__extends) ||
                (function () {
                    var a = function (b, c) {
                        a =
                            Object.setPrototypeOf ||
                            ({ __proto__: [] } instanceof Array &&
                                function (a, b) {
                                    a.__proto__ = b;
                                }) ||
                            function (a, b) {
                                for (var c in b)
                                    b.hasOwnProperty(c) && (a[c] = b[c]);
                            };
                        return a(b, c);
                    };
                    return function (b, c) {
                        function d() {
                            this.constructor = b;
                        }
                        a(b, c);
                        b.prototype =
                            null === c
                                ? Object.create(c)
                                : ((d.prototype = c.prototype), new d());
                    };
                })();
            a = a.noop;
            var l = e.series,
                m = e.seriesTypes,
                t = m.area,
                q = m.line,
                D = m.scatter;
            m = c.extend;
            var v = c.merge;
            c = (function (a) {
                function b() {
                    var b = (null !== a && a.apply(this, arguments)) || this;
                    b.data = void 0;
                    b.options = void 0;
                    b.points = void 0;
                    return b;
                }
                f(b, a);
                b.prototype.getGraphPath = function () {
                    for (
                        var a = q.prototype.getGraphPath.call(this),
                            b = a.length + 1;
                        b--;

                    )
                        (b === a.length || "M" === a[b][0]) &&
                            0 < b &&
                            a.splice(b, 0, ["Z"]);
                    return (this.areaPath = a);
                };
                b.prototype.drawGraph = function () {
                    this.options.fillColor = this.color;
                    t.prototype.drawGraph.call(this);
                };
                b.defaultOptions = v(D.defaultOptions, {
                    marker: { enabled: !1, states: { hover: { enabled: !1 } } },
                    stickyTracking: !1,
                    tooltip: { followPointer: !0, pointFormat: "" },
                    trackByArea: !0,
                });
                return b;
            })(D);
            m(c.prototype, {
                type: "polygon",
                drawLegendSymbol: b.drawRectangle,
                drawTracker: l.prototype.drawTracker,
                setStackedPoints: a,
            });
            e.registerSeriesType("polygon", c);
            ("");
            return c;
        }
    );
    A(
        e,
        "Core/Axis/WaterfallAxis.js",
        [e["Core/Axis/Stacking/StackItem.js"], e["Core/Utilities.js"]],
        function (a, b) {
            var e = b.addEvent,
                c = b.objectEach,
                p;
            (function (b) {
                function f() {
                    var a = this.waterfall.stacks;
                    a && ((a.changed = !1), delete a.alreadyChanged);
                }
                function p() {
                    var a = this.options.stackLabels;
                    a &&
                        a.enabled &&
                        this.waterfall.stacks &&
                        this.waterfall.renderStackTotals();
                }
                function q() {
                    for (
                        var a = this.axes, b = this.series, c = b.length;
                        c--;

                    )
                        b[c].options.stacking &&
                            (a.forEach(function (a) {
                                a.isXAxis || (a.waterfall.stacks.changed = !0);
                            }),
                            (c = 0));
                }
                function l() {
                    this.waterfall || (this.waterfall = new v(this));
                }
                var v = (function () {
                    function b(a) {
                        this.axis = a;
                        this.stacks = { changed: !1 };
                    }
                    b.prototype.renderStackTotals = function () {
                        var b = this.axis,
                            e = b.waterfall.stacks,
                            f = b.stacking && b.stacking.stackTotalGroup,
                            g = new a(b, b.options.stackLabels, !1, 0, void 0);
                        this.dummyStackItem = g;
                        c(e, function (b) {
                            c(b, function (b) {
                                g.total = b.stackTotal;
                                b.label && (g.label = b.label);
                                a.prototype.render.call(g, f);
                                b.label = g.label;
                                delete g.label;
                            });
                        });
                        g.total = null;
                    };
                    return b;
                })();
                b.Composition = v;
                b.compose = function (a, b) {
                    e(a, "init", l);
                    e(a, "afterBuildStacks", f);
                    e(a, "afterRender", p);
                    e(b, "beforeRedraw", q);
                };
            })(p || (p = {}));
            return p;
        }
    );
    A(
        e,
        "Series/Waterfall/WaterfallPoint.js",
        [
            e["Series/Column/ColumnSeries.js"],
            e["Core/Series/Point.js"],
            e["Core/Utilities.js"],
        ],
        function (a, b, e) {
            var c =
                    (this && this.__extends) ||
                    (function () {
                        var a = function (b, c) {
                            a =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, b) {
                                        a.__proto__ = b;
                                    }) ||
                                function (a, b) {
                                    for (var c in b)
                                        b.hasOwnProperty(c) && (a[c] = b[c]);
                                };
                            return a(b, c);
                        };
                        return function (b, c) {
                            function e() {
                                this.constructor = b;
                            }
                            a(b, c);
                            b.prototype =
                                null === c
                                    ? Object.create(c)
                                    : ((e.prototype = c.prototype), new e());
                        };
                    })(),
                f = e.isNumber;
            return (function (a) {
                function e() {
                    var b = (null !== a && a.apply(this, arguments)) || this;
                    b.options = void 0;
                    b.series = void 0;
                    return b;
                }
                c(e, a);
                e.prototype.getClassName = function () {
                    var a = b.prototype.getClassName.call(this);
                    this.isSum
                        ? (a += " highcharts-sum")
                        : this.isIntermediateSum &&
                          (a += " highcharts-intermediate-sum");
                    return a;
                };
                e.prototype.isValid = function () {
                    return f(this.y) || this.isSum || !!this.isIntermediateSum;
                };
                return e;
            })(a.prototype.pointClass);
        }
    );
    A(
        e,
        "Series/Waterfall/WaterfallSeries.js",
        [
            e["Core/Axis/Axis.js"],
            e["Core/Chart/Chart.js"],
            e["Core/Series/SeriesRegistry.js"],
            e["Core/Utilities.js"],
            e["Core/Axis/WaterfallAxis.js"],
            e["Series/Waterfall/WaterfallPoint.js"],
        ],
        function (a, b, e, c, p, l) {
            var f =
                    (this && this.__extends) ||
                    (function () {
                        var a = function (b, c) {
                            a =
                                Object.setPrototypeOf ||
                                ({ __proto__: [] } instanceof Array &&
                                    function (a, b) {
                                        a.__proto__ = b;
                                    }) ||
                                function (a, b) {
                                    for (var c in b)
                                        b.hasOwnProperty(c) && (a[c] = b[c]);
                                };
                            return a(b, c);
                        };
                        return function (b, c) {
                            function d() {
                                this.constructor = b;
                            }
                            a(b, c);
                            b.prototype =
                                null === c
                                    ? Object.create(c)
                                    : ((d.prototype = c.prototype), new d());
                        };
                    })(),
                t = e.seriesTypes,
                q = t.column,
                A = t.line,
                v = c.arrayMax,
                g = c.arrayMin,
                d = c.correctFloat;
            t = c.extend;
            var k = c.isNumber,
                n = c.merge,
                h = c.objectEach,
                G = c.pick;
            c = (function (a) {
                function b() {
                    var b = (null !== a && a.apply(this, arguments)) || this;
                    b.chart = void 0;
                    b.data = void 0;
                    b.options = void 0;
                    b.points = void 0;
                    b.stackedYNeg = void 0;
                    b.stackedYPos = void 0;
                    b.stackKey = void 0;
                    b.xData = void 0;
                    b.yAxis = void 0;
                    b.yData = void 0;
                    return b;
                }
                f(b, a);
                b.prototype.generatePoints = function () {
                    var a;
                    q.prototype.generatePoints.apply(this);
                    var b = 0;
                    for (a = this.points.length; b < a; b++) {
                        var c = this.points[b];
                        var e = this.processedYData[b];
                        if (c.isIntermediateSum || c.isSum) c.y = d(e);
                    }
                };
                b.prototype.translate = function () {
                    var a = this.options,
                        b = this.yAxis,
                        c = G(a.minPointLength, 5),
                        d = c / 2,
                        e = a.threshold || 0,
                        f = e,
                        g = e;
                    a = a.stacking;
                    var h = b.waterfall.stacks[this.stackKey];
                    q.prototype.translate.apply(this);
                    for (var p = this.points, n = 0; n < p.length; n++) {
                        var r = p[n];
                        var u = this.processedYData[n];
                        var z = r.shapeArgs;
                        if (z && k(u)) {
                            var l = [0, u];
                            var y = r.y;
                            if (a) {
                                if (h) {
                                    l = h[n];
                                    if ("overlap" === a) {
                                        var m = l.stackState[l.stateIndex--];
                                        m = 0 <= y ? m : m - y;
                                        Object.hasOwnProperty.call(
                                            l,
                                            "absolutePos"
                                        ) && delete l.absolutePos;
                                        Object.hasOwnProperty.call(
                                            l,
                                            "absoluteNeg"
                                        ) && delete l.absoluteNeg;
                                    } else
                                        0 <= y
                                            ? ((m = l.threshold + l.posTotal),
                                              (l.posTotal -= y))
                                            : ((m = l.threshold + l.negTotal),
                                              (l.negTotal -= y),
                                              (m -= y)),
                                            !l.posTotal &&
                                                Object.hasOwnProperty.call(
                                                    l,
                                                    "absolutePos"
                                                ) &&
                                                ((l.posTotal = l.absolutePos),
                                                delete l.absolutePos),
                                            !l.negTotal &&
                                                Object.hasOwnProperty.call(
                                                    l,
                                                    "absoluteNeg"
                                                ) &&
                                                ((l.negTotal = l.absoluteNeg),
                                                delete l.absoluteNeg);
                                    r.isSum ||
                                        (l.connectorThreshold =
                                            l.threshold + l.stackTotal);
                                    b.reversed
                                        ? ((u = 0 <= y ? m - y : m + y),
                                          (y = m))
                                        : ((u = m), (y = m - y));
                                    r.below = u <= e;
                                    z.y = b.translate(u, !1, !0, !1, !0);
                                    z.height = Math.abs(
                                        z.y - b.translate(y, !1, !0, !1, !0)
                                    );
                                    if ((y = b.waterfall.dummyStackItem))
                                        (y.x = n),
                                            (y.label = h[n].label),
                                            y.setOffset(
                                                this.pointXOffset || 0,
                                                this.barW || 0,
                                                this.stackedYNeg[n],
                                                this.stackedYPos[n]
                                            );
                                }
                            } else
                                (m = Math.max(f, f + y) + l[0]),
                                    (z.y = b.translate(m, !1, !0, !1, !0)),
                                    r.isSum
                                        ? ((z.y = b.translate(
                                              l[1],
                                              !1,
                                              !0,
                                              !1,
                                              !0
                                          )),
                                          (z.height =
                                              Math.min(
                                                  b.translate(
                                                      l[0],
                                                      !1,
                                                      !0,
                                                      !1,
                                                      !0
                                                  ),
                                                  b.len
                                              ) - z.y),
                                          (r.below = l[1] <= e))
                                        : r.isIntermediateSum
                                        ? (0 <= y
                                              ? ((u = l[1] + g), (y = g))
                                              : ((u = g), (y = l[1] + g)),
                                          b.reversed &&
                                              ((u ^= y), (y ^= u), (u ^= y)),
                                          (z.y = b.translate(
                                              u,
                                              !1,
                                              !0,
                                              !1,
                                              !0
                                          )),
                                          (z.height = Math.abs(
                                              z.y -
                                                  Math.min(
                                                      b.translate(
                                                          y,
                                                          !1,
                                                          !0,
                                                          !1,
                                                          !0
                                                      ),
                                                      b.len
                                                  )
                                          )),
                                          (g += l[1]),
                                          (r.below = u <= e))
                                        : ((z.height =
                                              0 < u
                                                  ? b.translate(
                                                        f,
                                                        !1,
                                                        !0,
                                                        !1,
                                                        !0
                                                    ) - z.y
                                                  : b.translate(
                                                        f,
                                                        !1,
                                                        !0,
                                                        !1,
                                                        !0
                                                    ) -
                                                    b.translate(
                                                        f - u,
                                                        !1,
                                                        !0,
                                                        !1,
                                                        !0
                                                    )),
                                          (f += u),
                                          (r.below = f < e)),
                                    0 > z.height &&
                                        ((z.y += z.height), (z.height *= -1));
                            r.plotY = z.y =
                                Math.round(z.y || 0) -
                                (this.borderWidth % 2) / 2;
                            z.height = Math.max(
                                Math.round(z.height || 0),
                                0.001
                            );
                            r.yBottom = z.y + z.height;
                            z.height <= c && !r.isNull
                                ? ((z.height = c),
                                  (z.y -= d),
                                  (r.plotY = z.y),
                                  (r.minPointLengthOffset = 0 > r.y ? -d : d))
                                : (r.isNull && (z.width = 0),
                                  (r.minPointLengthOffset = 0));
                            y = r.plotY + (r.negative ? z.height : 0);
                            r.below && (r.plotY += z.height);
                            r.tooltipPos &&
                                (this.chart.inverted
                                    ? (r.tooltipPos[0] = b.len - y)
                                    : (r.tooltipPos[1] = y));
                            r.isInside = this.isPointInside(r);
                        }
                    }
                };
                b.prototype.processData = function (b) {
                    var c = this.options,
                        e = this.yData,
                        f = c.data,
                        g = e.length,
                        h = c.threshold || 0,
                        k,
                        l,
                        n,
                        p,
                        r;
                    for (r = l = k = n = p = 0; r < g; r++) {
                        var u = e[r];
                        var m = f && f[r] ? f[r] : {};
                        "sum" === u || m.isSum
                            ? (e[r] = d(l))
                            : "intermediateSum" === u || m.isIntermediateSum
                            ? ((e[r] = d(k)), (k = 0))
                            : ((l += u), (k += u));
                        n = Math.min(l, n);
                        p = Math.max(l, p);
                    }
                    a.prototype.processData.call(this, b);
                    c.stacking || ((this.dataMin = n + h), (this.dataMax = p));
                };
                b.prototype.toYData = function (a) {
                    return a.isSum
                        ? "sum"
                        : a.isIntermediateSum
                        ? "intermediateSum"
                        : a.y;
                };
                b.prototype.updateParallelArrays = function (b, c) {
                    a.prototype.updateParallelArrays.call(this, b, c);
                    if (
                        "sum" === this.yData[0] ||
                        "intermediateSum" === this.yData[0]
                    )
                        this.yData[0] = null;
                };
                b.prototype.pointAttribs = function (a, b) {
                    var c = this.options.upColor;
                    c && !a.options.color && (a.color = 0 < a.y ? c : null);
                    a = q.prototype.pointAttribs.call(this, a, b);
                    delete a.dashstyle;
                    return a;
                };
                b.prototype.getGraphPath = function () {
                    return [["M", 0, 0]];
                };
                b.prototype.getCrispPath = function () {
                    var a = this.data,
                        b = this.yAxis,
                        c = a.length,
                        d = (Math.round(this.graph.strokeWidth()) % 2) / 2,
                        e = (Math.round(this.borderWidth) % 2) / 2,
                        f = this.xAxis.reversed,
                        g = this.yAxis.reversed,
                        h = this.options.stacking,
                        k = [],
                        l;
                    for (l = 1; l < c; l++) {
                        var r = a[l].shapeArgs;
                        var u = a[l - 1];
                        var n = a[l - 1].shapeArgs;
                        var p = b.waterfall.stacks[this.stackKey];
                        var m = 0 < u.y ? -n.height : 0;
                        p &&
                            n &&
                            r &&
                            ((p = p[l - 1]),
                            h
                                ? ((p = p.connectorThreshold),
                                  (m =
                                      Math.round(
                                          b.translate(p, 0, 1, 0, 1) +
                                              (g ? m : 0)
                                      ) - d))
                                : (m = n.y + u.minPointLengthOffset + e - d),
                            k.push(
                                ["M", (n.x || 0) + (f ? 0 : n.width || 0), m],
                                ["L", (r.x || 0) + (f ? r.width || 0 : 0), m]
                            ));
                        n &&
                            k.length &&
                            ((!h && 0 > u.y && !g) || (0 < u.y && g)) &&
                            ((u = k[k.length - 2]) &&
                                "number" === typeof u[2] &&
                                (u[2] += n.height || 0),
                            (u = k[k.length - 1]) &&
                                "number" === typeof u[2] &&
                                (u[2] += n.height || 0));
                    }
                    return k;
                };
                b.prototype.drawGraph = function () {
                    A.prototype.drawGraph.call(this);
                    this.graph.attr({ d: this.getCrispPath() });
                };
                b.prototype.setStackedPoints = function () {
                    function a(a, b, c, d) {
                        if (M) for (c; c < M; c++) t.stackState[c] += d;
                        else (t.stackState[0] = a), (M = t.stackState.length);
                        t.stackState.push(t.stackState[M - 1] + b);
                    }
                    var b = this.options,
                        c = this.yAxis.waterfall.stacks,
                        d = b.threshold,
                        e = d || 0,
                        f = e,
                        g = this.stackKey,
                        h = this.xData,
                        k = h.length,
                        l,
                        r,
                        u;
                    this.yAxis.stacking.usePercentage = !1;
                    var n = (r = u = e);
                    if (
                        this.visible ||
                        !this.chart.options.chart.ignoreHiddenSeries
                    ) {
                        var p = c.changed;
                        (l = c.alreadyChanged) && 0 > l.indexOf(g) && (p = !0);
                        c[g] || (c[g] = {});
                        l = c[g];
                        for (var m = 0; m < k; m++) {
                            var q = h[m];
                            if (!l[q] || p)
                                l[q] = {
                                    negTotal: 0,
                                    posTotal: 0,
                                    stackTotal: 0,
                                    threshold: 0,
                                    stateIndex: 0,
                                    stackState: [],
                                    label: p && l[q] ? l[q].label : void 0,
                                };
                            var t = l[q];
                            var v = this.yData[m];
                            0 <= v ? (t.posTotal += v) : (t.negTotal += v);
                            var A = b.data[m];
                            q = t.absolutePos = t.posTotal;
                            var D = (t.absoluteNeg = t.negTotal);
                            t.stackTotal = q + D;
                            var M = t.stackState.length;
                            A && A.isIntermediateSum
                                ? (a(u, r, 0, u),
                                  (u = r),
                                  (r = d),
                                  (e ^= f),
                                  (f ^= e),
                                  (e ^= f))
                                : A && A.isSum
                                ? (a(d, n, M), (e = d))
                                : (a(e, v, 0, n), A && ((n += v), (r += v)));
                            t.stateIndex++;
                            t.threshold = e;
                            e += t.stackTotal;
                        }
                        c.changed = !1;
                        c.alreadyChanged || (c.alreadyChanged = []);
                        c.alreadyChanged.push(g);
                    }
                };
                b.prototype.getExtremes = function () {
                    var a = this.options.stacking;
                    if (a) {
                        var b = this.yAxis;
                        b = b.waterfall.stacks;
                        var c = (this.stackedYNeg = []);
                        var d = (this.stackedYPos = []);
                        "overlap" === a
                            ? h(b[this.stackKey], function (a) {
                                  c.push(g(a.stackState));
                                  d.push(v(a.stackState));
                              })
                            : h(b[this.stackKey], function (a) {
                                  c.push(a.negTotal + a.threshold);
                                  d.push(a.posTotal + a.threshold);
                              });
                        return { dataMin: g(c), dataMax: v(d) };
                    }
                    return { dataMin: this.dataMin, dataMax: this.dataMax };
                };
                b.defaultOptions = n(q.defaultOptions, {
                    dataLabels: { inside: !0 },
                    lineWidth: 1,
                    lineColor: "#333333",
                    dashStyle: "Dot",
                    borderColor: "#333333",
                    states: { hover: { lineWidthPlus: 0 } },
                });
                return b;
            })(q);
            t(c.prototype, {
                getZonesGraphs: A.prototype.getZonesGraphs,
                pointValKey: "y",
                showLine: !0,
                pointClass: l,
            });
            e.registerSeriesType("waterfall", c);
            p.compose(a, b);
            ("");
            return c;
        }
    );
    A(
        e,
        "Core/Axis/RadialAxis.js",
        [
            e["Core/Axis/AxisDefaults.js"],
            e["Core/DefaultOptions.js"],
            e["Core/Globals.js"],
            e["Core/Utilities.js"],
        ],
        function (a, b, e, c) {
            var f = b.defaultOptions,
                l = e.noop,
                m = c.addEvent,
                t = c.correctFloat,
                q = c.defined,
                A = c.extend,
                v = c.fireEvent,
                g = c.merge,
                d = c.pick,
                k = c.relativeLength,
                n = c.wrap,
                h;
            (function (b) {
                function c() {
                    this.autoConnect =
                        this.isCircular &&
                        "undefined" ===
                            typeof d(this.userMax, this.options.max) &&
                        t(this.endAngleRad - this.startAngleRad) ===
                            t(2 * Math.PI);
                    !this.isCircular && this.chart.inverted && this.max++;
                    this.autoConnect &&
                        (this.max +=
                            (this.categories && 1) ||
                            this.pointRange ||
                            this.closestPointRange ||
                            0);
                }
                function e() {
                    var a = this;
                    return function () {
                        if (
                            a.isRadial &&
                            a.tickPositions &&
                            a.options.labels &&
                            !0 !== a.options.labels.allowOverlap
                        )
                            return a.tickPositions
                                .map(function (b) {
                                    return a.ticks[b] && a.ticks[b].label;
                                })
                                .filter(function (a) {
                                    return !!a;
                                });
                    };
                }
                function h() {
                    return l;
                }
                function p(a, b, c) {
                    var d = this.pane.center,
                        e = a.value;
                    if (this.isCircular) {
                        if (q(e))
                            a.point &&
                                ((f = a.point.shapeArgs || {}),
                                f.start &&
                                    (e = this.chart.inverted
                                        ? this.translate(a.point.rectPlotY, !0)
                                        : a.point.x));
                        else {
                            var f = a.chartX || 0;
                            var g = a.chartY || 0;
                            e = this.translate(
                                Math.atan2(g - c, f - b) - this.startAngleRad,
                                !0
                            );
                        }
                        a = this.getPosition(e);
                        f = a.x;
                        g = a.y;
                    } else
                        q(e) || ((f = a.chartX), (g = a.chartY)),
                            q(f) &&
                                q(g) &&
                                ((c = d[1] + this.chart.plotTop),
                                (e = this.translate(
                                    Math.min(
                                        Math.sqrt(
                                            Math.pow(f - b, 2) +
                                                Math.pow(g - c, 2)
                                        ),
                                        d[2] / 2
                                    ) -
                                        d[3] / 2,
                                    !0
                                )));
                    return [e, f || 0, g || 0];
                }
                function D(a, b, c) {
                    a = this.pane.center;
                    var e = this.chart,
                        f = this.left || 0,
                        g = this.top || 0,
                        h = d(b, a[2] / 2 - this.offset);
                    "undefined" === typeof c &&
                        (c = this.horiz
                            ? 0
                            : this.center && -this.center[3] / 2);
                    c && (h += c);
                    this.isCircular || "undefined" !== typeof b
                        ? ((b = this.chart.renderer.symbols.arc(
                              f + a[0],
                              g + a[1],
                              h,
                              h,
                              {
                                  start: this.startAngleRad,
                                  end: this.endAngleRad,
                                  open: !0,
                                  innerR: 0,
                              }
                          )),
                          (b.xBounds = [f + a[0]]),
                          (b.yBounds = [g + a[1] - h]))
                        : ((b = this.postTranslate(this.angleRad, h)),
                          (b = [
                              [
                                  "M",
                                  this.center[0] + e.plotLeft,
                                  this.center[1] + e.plotTop,
                              ],
                              ["L", b.x, b.y],
                          ]));
                    return b;
                }
                function F() {
                    this.constructor.prototype.getOffset.call(this);
                    this.chart.axisOffset[this.side] = 0;
                }
                function G(a, b, c) {
                    var e = this.chart,
                        f = function (a) {
                            if ("string" === typeof a) {
                                var b = parseInt(a, 10);
                                n.test(a) && (b = (b * k) / 100);
                                return b;
                            }
                            return a;
                        },
                        g = this.center,
                        h = this.startAngleRad,
                        k = g[2] / 2,
                        l = Math.min(this.offset, 0),
                        u = this.left || 0,
                        r = this.top || 0,
                        n = /%$/,
                        p = this.isCircular,
                        m = d(f(c.outerRadius), k),
                        q = f(c.innerRadius);
                    f = d(f(c.thickness), 10);
                    if ("polygon" === this.options.gridLineInterpolation)
                        l = this.getPlotLinePath({ value: a }).concat(
                            this.getPlotLinePath({ value: b, reverse: !0 })
                        );
                    else {
                        a = Math.max(a, this.min);
                        b = Math.min(b, this.max);
                        a = this.translate(a);
                        b = this.translate(b);
                        p || ((m = a || 0), (q = b || 0));
                        if ("circle" !== c.shape && p)
                            (c = h + (a || 0)), (h += b || 0);
                        else {
                            c = -Math.PI / 2;
                            h = 1.5 * Math.PI;
                            var y = !0;
                        }
                        m -= l;
                        l = e.renderer.symbols.arc(u + g[0], r + g[1], m, m, {
                            start: Math.min(c, h),
                            end: Math.max(c, h),
                            innerR: d(q, m - (f - l)),
                            open: y,
                        });
                        p &&
                            ((p = (h + c) / 2),
                            (u = u + g[0] + (g[2] / 2) * Math.cos(p)),
                            (l.xBounds =
                                p > -Math.PI / 2 && p < Math.PI / 2
                                    ? [u, e.plotWidth]
                                    : [0, u]),
                            (l.yBounds = [r + g[1] + (g[2] / 2) * Math.sin(p)]),
                            (l.yBounds[0] +=
                                (p > -Math.PI && 0 > p) || p > Math.PI
                                    ? -10
                                    : 10));
                    }
                    return l;
                }
                function w(a) {
                    var b = this,
                        c = this.pane.center,
                        d = this.chart,
                        e = d.inverted,
                        f = a.reverse,
                        g = this.pane.options.background
                            ? this.pane.options.background[0] ||
                              this.pane.options.background
                            : {},
                        h = g.innerRadius || "0%",
                        l = g.outerRadius || "100%",
                        u = c[0] + d.plotLeft,
                        r = c[1] + d.plotTop,
                        p = this.height,
                        n = a.isCrosshair;
                    g = c[3] / 2;
                    var m = a.value,
                        q;
                    var y = this.getPosition(m);
                    var z = y.x;
                    y = y.y;
                    n &&
                        ((y = this.getCrosshairPosition(a, u, r)),
                        (m = y[0]),
                        (z = y[1]),
                        (y = y[2]));
                    if (this.isCircular)
                        (m = Math.sqrt(
                            Math.pow(z - u, 2) + Math.pow(y - r, 2)
                        )),
                            (f = "string" === typeof h ? k(h, 1) : h / m),
                            (d = "string" === typeof l ? k(l, 1) : l / m),
                            c &&
                                g &&
                                ((g /= m), f < g && (f = g), d < g && (d = g)),
                            (c = [
                                ["M", u + f * (z - u), r - f * (r - y)],
                                [
                                    "L",
                                    z - (1 - d) * (z - u),
                                    y + (1 - d) * (r - y),
                                ],
                            ]);
                    else if (
                        ((m = this.translate(m)) && (0 > m || m > p) && (m = 0),
                        "circle" === this.options.gridLineInterpolation)
                    )
                        c = this.getLinePath(0, m, g);
                    else if (
                        ((c = []),
                        d[e ? "yAxis" : "xAxis"].forEach(function (a) {
                            a.pane === b.pane && (q = a);
                        }),
                        q)
                    )
                        for (
                            u = q.tickPositions,
                                q.autoConnect && (u = u.concat([u[0]])),
                                f && (u = u.slice().reverse()),
                                m && (m += g),
                                r = 0;
                            r < u.length;
                            r++
                        )
                            (g = q.getPosition(u[r], m)),
                                c.push(r ? ["L", g.x, g.y] : ["M", g.x, g.y]);
                    return c;
                }
                function B(a, b) {
                    a = this.translate(a);
                    return this.postTranslate(
                        this.isCircular ? a : this.angleRad,
                        d(
                            this.isCircular ? b : 0 > a ? 0 : a,
                            this.center[2] / 2
                        ) - this.offset
                    );
                }
                function C() {
                    var a = this.center,
                        b = this.chart,
                        c = this.options.title;
                    return {
                        x: b.plotLeft + a[0] + (c.x || 0),
                        y:
                            b.plotTop +
                            a[1] -
                            { high: 0.5, middle: 0.25, low: 0 }[c.align] *
                                a[2] +
                            (c.y || 0),
                    };
                }
                function x(a) {
                    a.beforeSetTickPositions = c;
                    a.createLabelCollector = e;
                    a.getCrosshairPosition = p;
                    a.getLinePath = D;
                    a.getOffset = F;
                    a.getPlotBandPath = G;
                    a.getPlotLinePath = w;
                    a.getPosition = B;
                    a.getTitlePosition = C;
                    a.postTranslate = R;
                    a.setAxisSize = V;
                    a.setAxisTranslation = T;
                    a.setOptions = M;
                }
                function O() {
                    var a = this.chart,
                        b = this.options,
                        c = this.pane,
                        e = c && c.options;
                    (a.angular && this.isXAxis) ||
                        !c ||
                        (!a.angular && !a.polar) ||
                        ((this.angleRad = ((b.angle || 0) * Math.PI) / 180),
                        (this.startAngleRad =
                            ((e.startAngle - 90) * Math.PI) / 180),
                        (this.endAngleRad =
                            ((d(e.endAngle, e.startAngle + 360) - 90) *
                                Math.PI) /
                            180),
                        (this.offset = b.offset || 0));
                }
                function r(a) {
                    this.isRadial && ((a.align = void 0), a.preventDefault());
                }
                function u() {
                    if (this.chart && this.chart.labelCollectors) {
                        var a = this.labelCollector
                            ? this.chart.labelCollectors.indexOf(
                                  this.labelCollector
                              )
                            : -1;
                        0 <= a && this.chart.labelCollectors.splice(a, 1);
                    }
                }
                function z(b) {
                    var c = this.chart,
                        d = c.inverted,
                        e = c.angular,
                        f = c.polar,
                        k = this.isXAxis,
                        u = this.coll,
                        r = e && k,
                        p = c.options;
                    b = b.userOptions.pane || 0;
                    b = this.pane = c.pane && c.pane[b];
                    var m;
                    if ("colorAxis" === u) this.isRadial = !1;
                    else {
                        if (e) {
                            if (
                                (r
                                    ? ((this.isHidden = !0),
                                      (this.createLabelCollector = h),
                                      (this.getOffset = l),
                                      (this.render = this.redraw = S),
                                      (this.setTitle =
                                          this.setCategories =
                                          this.setScale =
                                              l))
                                    : x(this),
                                (m = !k))
                            )
                                this.defaultPolarOptions = X;
                        } else
                            f &&
                                (x(this),
                                (this.defaultPolarOptions = (m = this.horiz)
                                    ? W
                                    : g(
                                          "xAxis" === u
                                              ? a.defaultXAxisOptions
                                              : a.defaultYAxisOptions,
                                          Y
                                      )),
                                d &&
                                    "yAxis" === u &&
                                    ((this.defaultPolarOptions.stackLabels =
                                        a.defaultYAxisOptions.stackLabels),
                                    (this.defaultPolarOptions.reversedStacks =
                                        !0)));
                        e || f
                            ? ((this.isRadial = !0),
                              (p.chart.zooming.type = null),
                              this.labelCollector ||
                                  (this.labelCollector =
                                      this.createLabelCollector()),
                              this.labelCollector &&
                                  c.labelCollectors.push(this.labelCollector))
                            : (this.isRadial = !1);
                        b && m && (b.axis = this);
                        this.isCircular = m;
                    }
                }
                function J() {
                    this.isRadial && this.beforeSetTickPositions();
                }
                function y(a) {
                    var b = this.label;
                    if (b) {
                        var c = this.axis,
                            e = b.getBBox(),
                            f = c.options.labels,
                            g =
                                (((c.translate(this.pos) +
                                    c.startAngleRad +
                                    Math.PI / 2) /
                                    Math.PI) *
                                    180) %
                                360,
                            h = Math.round(g),
                            u = q(f.y) ? 0 : 0.3 * -e.height,
                            l = f.y,
                            r = 20,
                            m = f.align,
                            p = "end",
                            n = 0 > h ? h + 360 : h,
                            y = n,
                            z = 0,
                            t = 0;
                        if (c.isRadial) {
                            var P = c.getPosition(
                                this.pos,
                                c.center[2] / 2 +
                                    k(
                                        d(f.distance, -25),
                                        c.center[2] / 2,
                                        -c.center[2] / 2
                                    )
                            );
                            "auto" === f.rotation
                                ? b.attr({ rotation: g })
                                : q(l) ||
                                  (l =
                                      c.chart.renderer.fontMetrics(
                                          b.styles && b.styles.fontSize
                                      ).b -
                                      e.height / 2);
                            q(m) ||
                                (c.isCircular
                                    ? (e.width >
                                          (c.len * c.tickInterval) /
                                              (c.max - c.min) && (r = 0),
                                      (m =
                                          g > r && g < 180 - r
                                              ? "left"
                                              : g > 180 + r && g < 360 - r
                                              ? "right"
                                              : "center"))
                                    : (m = "center"),
                                b.attr({ align: m }));
                            if (
                                "auto" === m &&
                                2 === c.tickPositions.length &&
                                c.isCircular
                            ) {
                                90 < n && 180 > n
                                    ? (n = 180 - n)
                                    : 270 < n && 360 >= n && (n = 540 - n);
                                180 < y && 360 >= y && (y = 360 - y);
                                if (
                                    c.pane.options.startAngle === h ||
                                    c.pane.options.startAngle === h + 360 ||
                                    c.pane.options.startAngle === h - 360
                                )
                                    p = "start";
                                m =
                                    (-90 <= h && 90 >= h) ||
                                    (-360 <= h && -270 >= h) ||
                                    (270 <= h && 360 >= h)
                                        ? "start" === p
                                            ? "right"
                                            : "left"
                                        : "start" === p
                                        ? "left"
                                        : "right";
                                70 < y && 110 > y && (m = "center");
                                15 > n || (180 <= n && 195 > n)
                                    ? (z = 0.3 * e.height)
                                    : 15 <= n && 35 >= n
                                    ? (z = "start" === p ? 0 : 0.75 * e.height)
                                    : 195 <= n && 215 >= n
                                    ? (z = "start" === p ? 0.75 * e.height : 0)
                                    : 35 < n && 90 >= n
                                    ? (z =
                                          "start" === p
                                              ? 0.25 * -e.height
                                              : e.height)
                                    : 215 < n &&
                                      270 >= n &&
                                      (z =
                                          "start" === p
                                              ? e.height
                                              : 0.25 * -e.height);
                                15 > y
                                    ? (t =
                                          "start" === p
                                              ? 0.15 * -e.height
                                              : 0.15 * e.height)
                                    : 165 < y &&
                                      180 >= y &&
                                      (t =
                                          "start" === p
                                              ? 0.15 * e.height
                                              : 0.15 * -e.height);
                                b.attr({ align: m });
                                b.translate(t, z + u);
                            }
                            a.pos.x = P.x + (f.x || 0);
                            a.pos.y = P.y + (l || 0);
                        }
                    }
                }
                function P(a) {
                    this.axis.getPosition &&
                        A(a.pos, this.axis.getPosition(this.pos));
                }
                function R(a, b) {
                    var c = this.chart,
                        d = this.center;
                    a = this.startAngleRad + a;
                    return {
                        x: c.plotLeft + d[0] + Math.cos(a) * b,
                        y: c.plotTop + d[1] + Math.sin(a) * b,
                    };
                }
                function S() {
                    this.isDirty = !1;
                }
                function V() {
                    this.constructor.prototype.setAxisSize.call(this);
                    if (this.isRadial) {
                        this.pane.updateCenter(this);
                        var a = (this.center = this.pane.center.slice());
                        if (this.isCircular)
                            this.sector = this.endAngleRad - this.startAngleRad;
                        else {
                            var b = this.postTranslate(this.angleRad, a[3] / 2);
                            a[0] = b.x - this.chart.plotLeft;
                            a[1] = b.y - this.chart.plotTop;
                        }
                        this.len =
                            this.width =
                            this.height =
                                ((a[2] - a[3]) * d(this.sector, 1)) / 2;
                    }
                }
                function T() {
                    this.constructor.prototype.setAxisTranslation.call(this);
                    this.center &&
                        ((this.transA = this.isCircular
                            ? (this.endAngleRad - this.startAngleRad) /
                              (this.max - this.min || 1)
                            : (this.center[2] - this.center[3]) /
                              2 /
                              (this.max - this.min || 1)),
                        (this.minPixelPadding = this.isXAxis
                            ? this.transA * this.minPointOffset
                            : 0));
                }
                function M(a) {
                    a = this.options = g(
                        this.constructor.defaultOptions,
                        this.defaultPolarOptions,
                        f[this.coll],
                        a
                    );
                    a.plotBands || (a.plotBands = []);
                    v(this, "afterSetOptions");
                }
                function U(a, b, c, d, e, f, g) {
                    var h = this.axis;
                    h.isRadial
                        ? ((a = h.getPosition(this.pos, h.center[2] / 2 + d)),
                          (b = ["M", b, c, "L", a.x, a.y]))
                        : (b = a.call(this, b, c, d, e, f, g));
                    return b;
                }
                var Q = [],
                    W = {
                        gridLineWidth: 1,
                        labels: {
                            align: void 0,
                            distance: 15,
                            x: 0,
                            y: void 0,
                            style: { textOverflow: "none" },
                        },
                        maxPadding: 0,
                        minPadding: 0,
                        showLastLabel: !1,
                        tickLength: 0,
                    },
                    X = {
                        labels: { align: "center", x: 0, y: void 0 },
                        minorGridLineWidth: 0,
                        minorTickInterval: "auto",
                        minorTickLength: 10,
                        minorTickPosition: "inside",
                        minorTickWidth: 1,
                        tickLength: 10,
                        tickPosition: "inside",
                        tickWidth: 2,
                        title: { rotation: 0 },
                        zIndex: 2,
                    },
                    Y = {
                        gridLineInterpolation: "circle",
                        gridLineWidth: 1,
                        labels: { align: "right", x: -3, y: -2 },
                        showLastLabel: !1,
                        title: { x: 4, text: null, rotation: 90 },
                    };
                b.compose = function (a, b) {
                    -1 === Q.indexOf(a) &&
                        (Q.push(a),
                        m(a, "afterInit", O),
                        m(a, "autoLabelAlign", r),
                        m(a, "destroy", u),
                        m(a, "init", z),
                        m(a, "initialAxisTranslation", J));
                    -1 === Q.indexOf(b) &&
                        (Q.push(b),
                        m(b, "afterGetLabelPosition", y),
                        m(b, "afterGetPosition", P),
                        n(b.prototype, "getMarkPath", U));
                    return a;
                };
            })(h || (h = {}));
            return h;
        }
    );
    A(
        e,
        "Series/PolarComposition.js",
        [
            e["Core/Animation/AnimationUtilities.js"],
            e["Core/Globals.js"],
            e["Extensions/Pane.js"],
            e["Core/Axis/RadialAxis.js"],
            e["Core/Utilities.js"],
        ],
        function (a, b, e, c, p) {
            function f(a, b, c, d) {
                var e = d ? 1 : 0;
                var g =
                    0 <= b && b <= a.length - 1
                        ? b
                        : 0 > b
                        ? a.length - 1 + b
                        : 0;
                b = 0 > g - 1 ? a.length - (1 + e) : g - 1;
                var h = a[b];
                e = a[g + 1 > a.length - 1 ? e : g + 1];
                var k = h.plotY;
                var l = e.plotX;
                var u = e.plotY;
                e = a[g].plotX;
                g = a[g].plotY;
                h = (1.5 * e + h.plotX) / 2.5;
                k = (1.5 * g + k) / 2.5;
                l = (1.5 * e + l) / 2.5;
                var r = (1.5 * g + u) / 2.5;
                u = Math.sqrt(Math.pow(h - e, 2) + Math.pow(k - g, 2));
                var n = Math.sqrt(Math.pow(l - e, 2) + Math.pow(r - g, 2));
                h = Math.atan2(k - g, h - e);
                r = Math.PI / 2 + (h + Math.atan2(r - g, l - e)) / 2;
                Math.abs(h - r) > Math.PI / 2 && (r -= Math.PI);
                h = e + Math.cos(r) * u;
                k = g + Math.sin(r) * u;
                l = e + Math.cos(Math.PI + r) * n;
                r = g + Math.sin(Math.PI + r) * n;
                e = {
                    rightContX: l,
                    rightContY: r,
                    leftContX: h,
                    leftContY: k,
                    plotX: e,
                    plotY: g,
                };
                c && (e.prevPointCont = f(a, b, !1, d));
                return e;
            }
            function m() {
                (this.pane || []).forEach(function (a) {
                    a.render();
                });
            }
            function t() {
                var a = this;
                this.pane || (this.pane = []);
                this.options.pane = w(this.options.pane);
                this.options.pane.forEach(function (b) {
                    new e(b, a);
                }, this);
            }
            function q() {
                var a = this.chart;
                a.polar &&
                    ((this.polar = new O(this)),
                    a.inverted &&
                        ((this.isRadialSeries = !0),
                        this.is("column") && (this.isRadialBar = !0)));
            }
            function A() {
                if (this.chart.polar && this.xAxis) {
                    var a = this.chart;
                    (this.kdByAngle = a.tooltip && a.tooltip.shared)
                        ? (this.searchPoint = v)
                        : (this.options.findNearestPointBy = "xy");
                    if (!this.preventPostTranslate)
                        for (
                            var c = this.points, d = c.length, e = void 0;
                            d--;

                        )
                            (e = c[d]),
                                this.polar.toXY(e),
                                !a.hasParallelCoordinates &&
                                    !this.yAxis.reversed &&
                                    e.y < this.yAxis.min &&
                                    (e.isNull = !0);
                    this.hasClipCircleSetter ||
                        (this.hasClipCircleSetter = !!this.eventsToUnbind.push(
                            H(this, "afterRender", function () {
                                if (a.polar) {
                                    var c = this.yAxis.pane.center;
                                    if (this.clipCircle)
                                        this.clipCircle.animate({
                                            x: c[0],
                                            y: c[1],
                                            r: c[2] / 2,
                                            innerR: c[3] / 2,
                                        });
                                    else {
                                        var d = a.renderer,
                                            e = c[0],
                                            f = c[1],
                                            g = c[2] / 2,
                                            h = c[3] / 2;
                                        c = B();
                                        var k = d
                                            .createElement("clipPath")
                                            .attr({ id: c })
                                            .add(d.defs);
                                        d = h
                                            ? d
                                                  .arc(
                                                      e,
                                                      f,
                                                      g,
                                                      h,
                                                      0,
                                                      2 * Math.PI
                                                  )
                                                  .add(k)
                                            : d.circle(e, f, g).add(k);
                                        d.id = c;
                                        d.clipPath = k;
                                        this.clipCircle = d;
                                    }
                                    this.group.clip(this.clipCircle);
                                    this.setClip = b.noop;
                                }
                            })
                        ));
                }
            }
            function v(a) {
                var b = this.chart,
                    c = this.xAxis;
                c = c.pane && c.pane.center;
                return this.searchKDTree({
                    clientX:
                        180 +
                        (-180 / Math.PI) *
                            Math.atan2(
                                a.chartX - ((c && c[0]) || 0) - b.plotLeft,
                                a.chartY - ((c && c[1]) || 0) - b.plotTop
                            ),
                });
            }
            function g(a, b) {
                return (
                    N(this.pane || [], function (a) {
                        return a.options.id === b;
                    }) || a.call(this, b)
                );
            }
            function d(a, b, c, d, e, f) {
                var g = this.chart,
                    h = K(d.inside, !!this.options.stacking);
                g.polar
                    ? ((a = (b.rectPlotX / Math.PI) * 180),
                      g.inverted
                          ? ((this.forceDL = g.isInsidePlot(
                                b.plotX,
                                Math.round(b.plotY)
                            )),
                            h && b.shapeArgs
                                ? ((e = b.shapeArgs),
                                  (e = this.yAxis.postTranslate(
                                      ((e.start || 0) + (e.end || 0)) / 2 -
                                          this.xAxis.startAngleRad,
                                      b.barX + b.pointWidth / 2
                                  )),
                                  (e = {
                                      x: e.x - g.plotLeft,
                                      y: e.y - g.plotTop,
                                  }))
                                : b.tooltipPos &&
                                  (e = {
                                      x: b.tooltipPos[0],
                                      y: b.tooltipPos[1],
                                  }),
                            (d.align = K(d.align, "center")),
                            (d.verticalAlign = K(d.verticalAlign, "middle")))
                          : (null === d.align &&
                                (d.align =
                                    20 < a && 160 > a
                                        ? "left"
                                        : 200 < a && 340 > a
                                        ? "right"
                                        : "center"),
                            null === d.verticalAlign &&
                                (d.verticalAlign =
                                    45 > a || 315 < a
                                        ? "bottom"
                                        : 135 < a && 225 > a
                                        ? "top"
                                        : "middle")),
                      Object.getPrototypeOf(
                          Object.getPrototypeOf(this)
                      ).alignDataLabel.call(this, b, c, d, e, f),
                      this.isRadialBar &&
                      b.shapeArgs &&
                      b.shapeArgs.start === b.shapeArgs.end
                          ? c.hide()
                          : c.show())
                    : a.call(this, b, c, d, e, f);
            }
            function k(a) {
                var b = this.options,
                    c = b.stacking,
                    d = this.chart,
                    e = this.xAxis,
                    f = this.yAxis,
                    g = f.reversed,
                    h = f.center,
                    k = e.startAngleRad,
                    l = e.endAngleRad - k,
                    n = 0,
                    m = 0,
                    r = 0;
                this.preventPostTranslate = !0;
                a.call(this);
                if (e.isRadial) {
                    a = this.points;
                    e = a.length;
                    var q = f.translate(f.min);
                    var t = f.translate(f.max);
                    b = b.threshold || 0;
                    d.inverted &&
                        F(b) &&
                        ((n = f.translate(b)),
                        E(n) &&
                            (0 > n ? (n = 0) : n > l && (n = l),
                            (this.translatedThreshold = n + k)));
                    for (; e--; ) {
                        b = a[e];
                        var v = b.barX;
                        var w = b.x;
                        var x = b.y;
                        b.shapeType = "arc";
                        if (d.inverted) {
                            b.plotY = f.translate(x);
                            c && f.stacking
                                ? ((x =
                                      f.stacking.stacks[
                                          (0 > x ? "-" : "") + this.stackKey
                                      ]),
                                  this.visible &&
                                      x &&
                                      x[w] &&
                                      !b.isNull &&
                                      ((r =
                                          x[w].points[
                                              this.getStackIndicator(
                                                  void 0,
                                                  w,
                                                  this.index
                                              ).key
                                          ]),
                                      (m = f.translate(r[0])),
                                      (r = f.translate(r[1])),
                                      E(m) && (m = p.clamp(m, 0, l))))
                                : ((m = n), (r = b.plotY));
                            m > r && (r = [m, (m = r)][0]);
                            if (!g)
                                if (m < q) m = q;
                                else if (r > t) r = t;
                                else {
                                    if (r < q || m > t) m = r = 0;
                                }
                            else if (r > q) r = q;
                            else if (m < t) m = t;
                            else if (m > q || r < t) m = r = l;
                            f.min > f.max && (m = r = g ? l : 0);
                            m += k;
                            r += k;
                            h && (b.barX = v += h[3] / 2);
                            w = Math.max(v, 0);
                            x = Math.max(v + b.pointWidth, 0);
                            b.shapeArgs = {
                                x: h && h[0],
                                y: h && h[1],
                                r: x,
                                innerR: w,
                                start: m,
                                end: r,
                            };
                            b.opacity = m === r ? 0 : void 0;
                            b.plotY =
                                (E(this.translatedThreshold) &&
                                    (m < this.translatedThreshold ? m : r)) - k;
                        } else
                            (m = v + k),
                                (b.shapeArgs = this.polar.arc(
                                    b.yBottom,
                                    b.plotY,
                                    m,
                                    m + b.pointWidth
                                ));
                        this.polar.toXY(b);
                        d.inverted
                            ? ((v = f.postTranslate(
                                  b.rectPlotY,
                                  v + b.pointWidth / 2
                              )),
                              (b.tooltipPos = [
                                  v.x - d.plotLeft,
                                  v.y - d.plotTop,
                              ]))
                            : (b.tooltipPos = [b.plotX, b.plotY]);
                        h && (b.ttBelow = b.plotY > h[1]);
                    }
                }
            }
            function n(a, b) {
                var c = this;
                if (this.chart.polar) {
                    b = b || this.points;
                    for (var d = 0; d < b.length; d++)
                        if (!b[d].isNull) {
                            var e = d;
                            break;
                        }
                    if (
                        !1 !== this.options.connectEnds &&
                        "undefined" !== typeof e
                    ) {
                        this.connectEnds = !0;
                        b.splice(b.length, 0, b[e]);
                        var f = !0;
                    }
                    b.forEach(function (a) {
                        "undefined" === typeof a.polarPlotY && c.polar.toXY(a);
                    });
                }
                e = a.apply(this, [].slice.call(arguments, 1));
                f && b.pop();
                return e;
            }
            function h(a, b) {
                var c = this.chart,
                    d = { xAxis: [], yAxis: [] };
                c.polar
                    ? c.axes.forEach(function (a) {
                          if ("colorAxis" !== a.coll) {
                              var e = a.isXAxis,
                                  f = a.center,
                                  g = b.chartX - f[0] - c.plotLeft;
                              f = b.chartY - f[1] - c.plotTop;
                              d[e ? "xAxis" : "yAxis"].push({
                                  axis: a,
                                  value: a.translate(
                                      e
                                          ? Math.PI - Math.atan2(g, f)
                                          : Math.sqrt(
                                                Math.pow(g, 2) + Math.pow(f, 2)
                                            ),
                                      !0
                                  ),
                              });
                          }
                      })
                    : (d = a.call(this, b));
                return d;
            }
            function G(a, c) {
                var d = this,
                    e = this.chart,
                    f = this.group,
                    g = this.markerGroup,
                    h = this.xAxis && this.xAxis.center,
                    k = e.plotLeft,
                    l = e.plotTop,
                    m = this.options.animation,
                    n,
                    p,
                    r,
                    q;
                if (e.polar)
                    if (d.isRadialBar)
                        c ||
                            ((d.startAngleRad = K(
                                d.translatedThreshold,
                                d.xAxis.startAngleRad
                            )),
                            b.seriesTypes.pie.prototype.animate.call(d, c));
                    else {
                        if (e.renderer.isSVG)
                            if (((m = I(m)), d.is("column"))) {
                                if (!c) {
                                    var u = h[3] / 2;
                                    d.points.forEach(function (a) {
                                        n = a.graphic;
                                        r = (p = a.shapeArgs) && p.r;
                                        q = p && p.innerR;
                                        n &&
                                            p &&
                                            (n.attr({ r: u, innerR: u }),
                                            n.animate(
                                                { r: r, innerR: q },
                                                d.options.animation
                                            ));
                                    });
                                }
                            } else
                                c
                                    ? ((a = {
                                          translateX: h[0] + k,
                                          translateY: h[1] + l,
                                          scaleX: 0.001,
                                          scaleY: 0.001,
                                      }),
                                      f.attr(a),
                                      g && g.attr(a))
                                    : ((a = {
                                          translateX: k,
                                          translateY: l,
                                          scaleX: 1,
                                          scaleY: 1,
                                      }),
                                      f.animate(a, m),
                                      g && g.animate(a, m));
                    }
                else a.call(this, c);
            }
            function L(a, b, c, d) {
                this.chart.polar
                    ? d
                        ? ((a = f(b, d, !0, this.connectEnds)),
                          (b = a.prevPointCont && a.prevPointCont.rightContX),
                          (c = a.prevPointCont && a.prevPointCont.rightContY),
                          (a = [
                              "C",
                              F(b) ? b : a.plotX,
                              F(c) ? c : a.plotY,
                              F(a.leftContX) ? a.leftContX : a.plotX,
                              F(a.leftContY) ? a.leftContY : a.plotY,
                              a.plotX,
                              a.plotY,
                          ]))
                        : (a = ["M", c.plotX, c.plotY])
                    : (a = a.call(this, b, c, d));
                return a;
            }
            var I = a.animObject,
                H = p.addEvent,
                E = p.defined,
                N = p.find,
                F = p.isNumber,
                K = p.pick,
                w = p.splat,
                B = p.uniqueKey,
                C = p.wrap,
                x = [],
                O = (function () {
                    function a(a) {
                        this.series = a;
                    }
                    a.compose = function (a, b, e, f, l, p, r, v, w) {
                        c.compose(a, l);
                        -1 === x.indexOf(b) &&
                            (x.push(b),
                            H(b, "afterDrawChartBox", m),
                            H(b, "getAxes", t),
                            C(b.prototype, "get", g));
                        -1 === x.indexOf(e) &&
                            (x.push(e), C(e.prototype, "getCoordinates", h));
                        -1 === x.indexOf(f) &&
                            (x.push(f),
                            H(f, "afterInit", q),
                            H(f, "afterTranslate", A, { order: 2 }),
                            C(f.prototype, "animate", G));
                        r &&
                            -1 === x.indexOf(r) &&
                            (x.push(r),
                            (a = r.prototype),
                            C(a, "alignDataLabel", d),
                            C(a, "animate", G),
                            C(a, "translate", k));
                        v &&
                            -1 === x.indexOf(v) &&
                            (x.push(v), C(v.prototype, "getGraphPath", n));
                        w &&
                            -1 === x.indexOf(w) &&
                            (x.push(w),
                            (v = w.prototype),
                            C(v, "getPointSpline", L),
                            p &&
                                -1 === x.indexOf(p) &&
                                (x.push(p),
                                (p.prototype.getPointSpline =
                                    v.getPointSpline)));
                    };
                    a.prototype.arc = function (a, b, c, d) {
                        var e = this.series,
                            f = e.xAxis.center,
                            g = e.yAxis.len,
                            h = f[3] / 2;
                        b = g - b + h;
                        a = g - K(a, g) + h;
                        e.yAxis.reversed &&
                            (0 > b && (b = h), 0 > a && (a = h));
                        return {
                            x: f[0],
                            y: f[1],
                            r: b,
                            innerR: a,
                            start: c,
                            end: d,
                        };
                    };
                    a.prototype.toXY = function (a) {
                        var b = this.series,
                            c = b.chart,
                            d = b.xAxis,
                            e = b.yAxis,
                            f = a.plotX,
                            g = c.inverted,
                            h = a.y,
                            k = a.plotY,
                            l = g ? f : e.len - k;
                        g &&
                            b &&
                            !b.isRadialBar &&
                            (a.plotY = k = F(h) ? e.translate(h) : 0);
                        a.rectPlotX = f;
                        a.rectPlotY = k;
                        e.center && (l += e.center[3] / 2);
                        F(k) &&
                            ((e = g
                                ? e.postTranslate(k, l)
                                : d.postTranslate(f, l)),
                            (a.plotX = a.polarPlotX = e.x - c.plotLeft),
                            (a.plotY = a.polarPlotY = e.y - c.plotTop));
                        b.kdByAngle
                            ? ((b =
                                  ((f / Math.PI) * 180 +
                                      d.pane.options.startAngle) %
                                  360),
                              0 > b && (b += 360),
                              (a.clientX = b))
                            : (a.clientX = a.plotX);
                    };
                    return a;
                })();
            return O;
        }
    );
    A(
        e,
        "masters/highcharts-more.src.js",
        [
            e["Core/Globals.js"],
            e["Core/Series/SeriesRegistry.js"],
            e["Series/Bubble/BubbleSeries.js"],
            e["Series/PackedBubble/PackedBubbleSeries.js"],
            e["Series/PolarComposition.js"],
        ],
        function (a, b, e, c, p) {
            e.compose(a.Axis, a.Chart, a.Legend, a.Series);
            c.compose(a.Axis, a.Chart, a.Legend, a.Series);
            p.compose(
                a.Axis,
                a.Chart,
                a.Pointer,
                a.Series,
                a.Tick,
                b.seriesTypes.areasplinerange,
                b.seriesTypes.column,
                b.seriesTypes.line,
                b.seriesTypes.spline
            );
        }
    );
});
//# sourceMappingURL=highcharts-more.js.map
