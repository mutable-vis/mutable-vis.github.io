(async () => {
  (function() {
    const t = document.createElement("link").relList;
    if (t && t.supports && t.supports("modulepreload")) return;
    for (const l of document.querySelectorAll('link[rel="modulepreload"]')) n(l);
    new MutationObserver((l) => {
      for (const s of l) if (s.type === "childList") for (const u of s.addedNodes) u.tagName === "LINK" && u.rel === "modulepreload" && n(u);
    }).observe(document, {
      childList: true,
      subtree: true
    });
    function r(l) {
      const s = {};
      return l.integrity && (s.integrity = l.integrity), l.referrerPolicy && (s.referrerPolicy = l.referrerPolicy), l.crossOrigin === "use-credentials" ? s.credentials = "include" : l.crossOrigin === "anonymous" ? s.credentials = "omit" : s.credentials = "same-origin", s;
    }
    function n(l) {
      if (l.ep) return;
      l.ep = true;
      const s = r(l);
      fetch(l.href, s);
    }
  })();
  function ascending$1(e, t) {
    return e == null || t == null ? NaN : e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
  }
  function descending(e, t) {
    return e == null || t == null ? NaN : t < e ? -1 : t > e ? 1 : t >= e ? 0 : NaN;
  }
  function bisector(e) {
    let t, r, n;
    e.length !== 2 ? (t = ascending$1, r = (d, h) => ascending$1(e(d), h), n = (d, h) => e(d) - h) : (t = e === ascending$1 || e === descending ? e : zero$1, r = e, n = e);
    function l(d, h, f = 0, o = d.length) {
      if (f < o) {
        if (t(h, h) !== 0) return o;
        do {
          const p = f + o >>> 1;
          r(d[p], h) < 0 ? f = p + 1 : o = p;
        } while (f < o);
      }
      return f;
    }
    function s(d, h, f = 0, o = d.length) {
      if (f < o) {
        if (t(h, h) !== 0) return o;
        do {
          const p = f + o >>> 1;
          r(d[p], h) <= 0 ? f = p + 1 : o = p;
        } while (f < o);
      }
      return f;
    }
    function u(d, h, f = 0, o = d.length) {
      const p = l(d, h, f, o - 1);
      return p > f && n(d[p - 1], h) > -n(d[p], h) ? p - 1 : p;
    }
    return {
      left: l,
      center: u,
      right: s
    };
  }
  function zero$1() {
    return 0;
  }
  function number$2(e) {
    return e === null ? NaN : +e;
  }
  const ascendingBisect = bisector(ascending$1), bisectRight = ascendingBisect.right;
  bisector(number$2).center;
  function count(e, t) {
    let r = 0;
    for (let n of e) n != null && (n = +n) >= n && ++r;
    return r;
  }
  function extent(e, t) {
    let r, n;
    if (t === void 0) for (const l of e) l != null && (r === void 0 ? l >= l && (r = n = l) : (r > l && (r = l), n < l && (n = l)));
    else {
      let l = -1;
      for (let s of e) (s = t(s, ++l, e)) != null && (r === void 0 ? s >= s && (r = n = s) : (r > s && (r = s), n < s && (n = s)));
    }
    return [
      r,
      n
    ];
  }
  class InternMap extends Map {
    constructor(t, r = keyof) {
      if (super(), Object.defineProperties(this, {
        _intern: {
          value: /* @__PURE__ */ new Map()
        },
        _key: {
          value: r
        }
      }), t != null) for (const [n, l] of t) this.set(n, l);
    }
    get(t) {
      return super.get(intern_get(this, t));
    }
    has(t) {
      return super.has(intern_get(this, t));
    }
    set(t, r) {
      return super.set(intern_set(this, t), r);
    }
    delete(t) {
      return super.delete(intern_delete(this, t));
    }
  }
  function intern_get({ _intern: e, _key: t }, r) {
    const n = t(r);
    return e.has(n) ? e.get(n) : r;
  }
  function intern_set({ _intern: e, _key: t }, r) {
    const n = t(r);
    return e.has(n) ? e.get(n) : (e.set(n, r), r);
  }
  function intern_delete({ _intern: e, _key: t }, r) {
    const n = t(r);
    return e.has(n) && (r = e.get(n), e.delete(n)), r;
  }
  function keyof(e) {
    return e !== null && typeof e == "object" ? e.valueOf() : e;
  }
  function identity$4(e) {
    return e;
  }
  var array$1 = Array.prototype, slice = array$1.slice;
  function constant$2(e) {
    return () => e;
  }
  const e10 = Math.sqrt(50), e5 = Math.sqrt(10), e2 = Math.sqrt(2);
  function tickSpec(e, t, r) {
    const n = (t - e) / Math.max(0, r), l = Math.floor(Math.log10(n)), s = n / Math.pow(10, l), u = s >= e10 ? 10 : s >= e5 ? 5 : s >= e2 ? 2 : 1;
    let d, h, f;
    return l < 0 ? (f = Math.pow(10, -l) / u, d = Math.round(e * f), h = Math.round(t * f), d / f < e && ++d, h / f > t && --h, f = -f) : (f = Math.pow(10, l) * u, d = Math.round(e / f), h = Math.round(t / f), d * f < e && ++d, h * f > t && --h), h < d && 0.5 <= r && r < 2 ? tickSpec(e, t, r * 2) : [
      d,
      h,
      f
    ];
  }
  function ticks(e, t, r) {
    if (t = +t, e = +e, r = +r, !(r > 0)) return [];
    if (e === t) return [
      e
    ];
    const n = t < e, [l, s, u] = n ? tickSpec(t, e, r) : tickSpec(e, t, r);
    if (!(s >= l)) return [];
    const d = s - l + 1, h = new Array(d);
    if (n) if (u < 0) for (let f = 0; f < d; ++f) h[f] = (s - f) / -u;
    else for (let f = 0; f < d; ++f) h[f] = (s - f) * u;
    else if (u < 0) for (let f = 0; f < d; ++f) h[f] = (l + f) / -u;
    else for (let f = 0; f < d; ++f) h[f] = (l + f) * u;
    return h;
  }
  function tickIncrement(e, t, r) {
    return t = +t, e = +e, r = +r, tickSpec(e, t, r)[2];
  }
  function tickStep(e, t, r) {
    t = +t, e = +e, r = +r;
    const n = t < e, l = n ? tickIncrement(t, e, r) : tickIncrement(e, t, r);
    return (n ? -1 : 1) * (l < 0 ? 1 / -l : l);
  }
  function nice(e, t, r) {
    let n;
    for (; ; ) {
      const l = tickIncrement(e, t, r);
      if (l === n || l === 0 || !isFinite(l)) return [
        e,
        t
      ];
      l > 0 ? (e = Math.floor(e / l) * l, t = Math.ceil(t / l) * l) : l < 0 && (e = Math.ceil(e * l) / l, t = Math.floor(t * l) / l), n = l;
    }
  }
  function thresholdSturges(e) {
    return Math.max(1, Math.ceil(Math.log(count(e)) / Math.LN2) + 1);
  }
  function bin() {
    var e = identity$4, t = extent, r = thresholdSturges;
    function n(l) {
      Array.isArray(l) || (l = Array.from(l));
      var s, u = l.length, d, h, f = new Array(u);
      for (s = 0; s < u; ++s) f[s] = e(l[s], s, l);
      var o = t(f), p = o[0], y = o[1], g = r(f, p, y);
      if (!Array.isArray(g)) {
        const S = y, E = +g;
        if (t === extent && ([p, y] = nice(p, y, E)), g = ticks(p, y, E), g[0] <= p && (h = tickIncrement(p, y, E)), g[g.length - 1] >= y) if (S >= y && t === extent) {
          const w = tickIncrement(p, y, E);
          isFinite(w) && (w > 0 ? y = (Math.floor(y / w) + 1) * w : w < 0 && (y = (Math.ceil(y * -w) + 1) / -w));
        } else g.pop();
      }
      for (var v = g.length, c = 0, m = v; g[c] <= p; ) ++c;
      for (; g[m - 1] > y; ) --m;
      (c || m < v) && (g = g.slice(c, m), v = m - c);
      var _ = new Array(v + 1), x;
      for (s = 0; s <= v; ++s) x = _[s] = [], x.x0 = s > 0 ? g[s - 1] : p, x.x1 = s < v ? g[s] : y;
      if (isFinite(h)) {
        if (h > 0) for (s = 0; s < u; ++s) (d = f[s]) != null && p <= d && d <= y && _[Math.min(v, Math.floor((d - p) / h))].push(l[s]);
        else if (h < 0) {
          for (s = 0; s < u; ++s) if ((d = f[s]) != null && p <= d && d <= y) {
            const S = Math.floor((p - d) * h);
            _[Math.min(v, S + (g[S] <= d))].push(l[s]);
          }
        }
      } else for (s = 0; s < u; ++s) (d = f[s]) != null && p <= d && d <= y && _[bisectRight(g, d, 0, v)].push(l[s]);
      return _;
    }
    return n.value = function(l) {
      return arguments.length ? (e = typeof l == "function" ? l : constant$2(l), n) : e;
    }, n.domain = function(l) {
      return arguments.length ? (t = typeof l == "function" ? l : constant$2([
        l[0],
        l[1]
      ]), n) : t;
    }, n.thresholds = function(l) {
      return arguments.length ? (r = typeof l == "function" ? l : constant$2(Array.isArray(l) ? slice.call(l) : l), n) : r;
    }, n;
  }
  function max$1(e, t) {
    let r;
    for (const n of e) n != null && (r < n || r === void 0 && n >= n) && (r = n);
    return r;
  }
  function min$1(e, t) {
    let r;
    for (const n of e) n != null && (r > n || r === void 0 && n >= n) && (r = n);
    return r;
  }
  function range(e, t, r) {
    e = +e, t = +t, r = (l = arguments.length) < 2 ? (t = e, e = 0, 1) : l < 3 ? 1 : +r;
    for (var n = -1, l = Math.max(0, Math.ceil((t - e) / r)) | 0, s = new Array(l); ++n < l; ) s[n] = e + n * r;
    return s;
  }
  function identity$3(e) {
    return e;
  }
  var top = 1, right = 2, bottom = 3, left = 4, epsilon = 1e-6;
  function translateX(e) {
    return "translate(" + e + ",0)";
  }
  function translateY(e) {
    return "translate(0," + e + ")";
  }
  function number$1(e) {
    return (t) => +e(t);
  }
  function center(e, t) {
    return t = Math.max(0, e.bandwidth() - t * 2) / 2, e.round() && (t = Math.round(t)), (r) => +e(r) + t;
  }
  function entering() {
    return !this.__axis;
  }
  function axis(e, t) {
    var r = [], n = null, l = null, s = 6, u = 6, d = 3, h = typeof window < "u" && window.devicePixelRatio > 1 ? 0 : 0.5, f = e === top || e === left ? -1 : 1, o = e === left || e === right ? "x" : "y", p = e === top || e === bottom ? translateX : translateY;
    function y(g) {
      var v = n ?? (t.ticks ? t.ticks.apply(t, r) : t.domain()), c = l ?? (t.tickFormat ? t.tickFormat.apply(t, r) : identity$3), m = Math.max(s, 0) + d, _ = t.range(), x = +_[0] + h, S = +_[_.length - 1] + h, E = (t.bandwidth ? center : number$1)(t.copy(), h), w = g.selection ? g.selection() : g, C = w.selectAll(".domain").data([
        null
      ]), D = w.selectAll(".tick").data(v, t).order(), A = D.exit(), F = D.enter().append("g").attr("class", "tick"), B = D.select("line"), N = D.select("text");
      C = C.merge(C.enter().insert("path", ".tick").attr("class", "domain").attr("stroke", "currentColor")), D = D.merge(F), B = B.merge(F.append("line").attr("stroke", "currentColor").attr(o + "2", f * s)), N = N.merge(F.append("text").attr("fill", "currentColor").attr(o, f * m).attr("dy", e === top ? "0em" : e === bottom ? "0.71em" : "0.32em")), g !== w && (C = C.transition(g), D = D.transition(g), B = B.transition(g), N = N.transition(g), A = A.transition(g).attr("opacity", epsilon).attr("transform", function(I) {
        return isFinite(I = E(I)) ? p(I + h) : this.getAttribute("transform");
      }), F.attr("opacity", epsilon).attr("transform", function(I) {
        var O = this.parentNode.__axis;
        return p((O && isFinite(O = O(I)) ? O : E(I)) + h);
      })), A.remove(), C.attr("d", e === left || e === right ? u ? "M" + f * u + "," + x + "H" + h + "V" + S + "H" + f * u : "M" + h + "," + x + "V" + S : u ? "M" + x + "," + f * u + "V" + h + "H" + S + "V" + f * u : "M" + x + "," + h + "H" + S), D.attr("opacity", 1).attr("transform", function(I) {
        return p(E(I) + h);
      }), B.attr(o + "2", f * s), N.attr(o, f * m).text(c), w.filter(entering).attr("fill", "none").attr("font-size", 10).attr("font-family", "sans-serif").attr("text-anchor", e === right ? "start" : e === left ? "end" : "middle"), w.each(function() {
        this.__axis = E;
      });
    }
    return y.scale = function(g) {
      return arguments.length ? (t = g, y) : t;
    }, y.ticks = function() {
      return r = Array.from(arguments), y;
    }, y.tickArguments = function(g) {
      return arguments.length ? (r = g == null ? [] : Array.from(g), y) : r.slice();
    }, y.tickValues = function(g) {
      return arguments.length ? (n = g == null ? null : Array.from(g), y) : n && n.slice();
    }, y.tickFormat = function(g) {
      return arguments.length ? (l = g, y) : l;
    }, y.tickSize = function(g) {
      return arguments.length ? (s = u = +g, y) : s;
    }, y.tickSizeInner = function(g) {
      return arguments.length ? (s = +g, y) : s;
    }, y.tickSizeOuter = function(g) {
      return arguments.length ? (u = +g, y) : u;
    }, y.tickPadding = function(g) {
      return arguments.length ? (d = +g, y) : d;
    }, y.offset = function(g) {
      return arguments.length ? (h = +g, y) : h;
    }, y;
  }
  function axisTop(e) {
    return axis(top, e);
  }
  function axisRight(e) {
    return axis(right, e);
  }
  function axisBottom(e) {
    return axis(bottom, e);
  }
  function axisLeft(e) {
    return axis(left, e);
  }
  var noop = {
    value: () => {
    }
  };
  function dispatch() {
    for (var e = 0, t = arguments.length, r = {}, n; e < t; ++e) {
      if (!(n = arguments[e] + "") || n in r || /[\s.]/.test(n)) throw new Error("illegal type: " + n);
      r[n] = [];
    }
    return new Dispatch(r);
  }
  function Dispatch(e) {
    this._ = e;
  }
  function parseTypenames$1(e, t) {
    return e.trim().split(/^|\s+/).map(function(r) {
      var n = "", l = r.indexOf(".");
      if (l >= 0 && (n = r.slice(l + 1), r = r.slice(0, l)), r && !t.hasOwnProperty(r)) throw new Error("unknown type: " + r);
      return {
        type: r,
        name: n
      };
    });
  }
  Dispatch.prototype = dispatch.prototype = {
    constructor: Dispatch,
    on: function(e, t) {
      var r = this._, n = parseTypenames$1(e + "", r), l, s = -1, u = n.length;
      if (arguments.length < 2) {
        for (; ++s < u; ) if ((l = (e = n[s]).type) && (l = get$1(r[l], e.name))) return l;
        return;
      }
      if (t != null && typeof t != "function") throw new Error("invalid callback: " + t);
      for (; ++s < u; ) if (l = (e = n[s]).type) r[l] = set$1(r[l], e.name, t);
      else if (t == null) for (l in r) r[l] = set$1(r[l], e.name, null);
      return this;
    },
    copy: function() {
      var e = {}, t = this._;
      for (var r in t) e[r] = t[r].slice();
      return new Dispatch(e);
    },
    call: function(e, t) {
      if ((l = arguments.length - 2) > 0) for (var r = new Array(l), n = 0, l, s; n < l; ++n) r[n] = arguments[n + 2];
      if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
      for (s = this._[e], n = 0, l = s.length; n < l; ++n) s[n].value.apply(t, r);
    },
    apply: function(e, t, r) {
      if (!this._.hasOwnProperty(e)) throw new Error("unknown type: " + e);
      for (var n = this._[e], l = 0, s = n.length; l < s; ++l) n[l].value.apply(t, r);
    }
  };
  function get$1(e, t) {
    for (var r = 0, n = e.length, l; r < n; ++r) if ((l = e[r]).name === t) return l.value;
  }
  function set$1(e, t, r) {
    for (var n = 0, l = e.length; n < l; ++n) if (e[n].name === t) {
      e[n] = noop, e = e.slice(0, n).concat(e.slice(n + 1));
      break;
    }
    return r != null && e.push({
      name: t,
      value: r
    }), e;
  }
  var xhtml = "http://www.w3.org/1999/xhtml";
  const namespaces = {
    svg: "http://www.w3.org/2000/svg",
    xhtml,
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace",
    xmlns: "http://www.w3.org/2000/xmlns/"
  };
  function namespace(e) {
    var t = e += "", r = t.indexOf(":");
    return r >= 0 && (t = e.slice(0, r)) !== "xmlns" && (e = e.slice(r + 1)), namespaces.hasOwnProperty(t) ? {
      space: namespaces[t],
      local: e
    } : e;
  }
  function creatorInherit(e) {
    return function() {
      var t = this.ownerDocument, r = this.namespaceURI;
      return r === xhtml && t.documentElement.namespaceURI === xhtml ? t.createElement(e) : t.createElementNS(r, e);
    };
  }
  function creatorFixed(e) {
    return function() {
      return this.ownerDocument.createElementNS(e.space, e.local);
    };
  }
  function creator(e) {
    var t = namespace(e);
    return (t.local ? creatorFixed : creatorInherit)(t);
  }
  function none() {
  }
  function selector(e) {
    return e == null ? none : function() {
      return this.querySelector(e);
    };
  }
  function selection_select(e) {
    typeof e != "function" && (e = selector(e));
    for (var t = this._groups, r = t.length, n = new Array(r), l = 0; l < r; ++l) for (var s = t[l], u = s.length, d = n[l] = new Array(u), h, f, o = 0; o < u; ++o) (h = s[o]) && (f = e.call(h, h.__data__, o, s)) && ("__data__" in h && (f.__data__ = h.__data__), d[o] = f);
    return new Selection$1(n, this._parents);
  }
  function array(e) {
    return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
  }
  function empty() {
    return [];
  }
  function selectorAll(e) {
    return e == null ? empty : function() {
      return this.querySelectorAll(e);
    };
  }
  function arrayAll(e) {
    return function() {
      return array(e.apply(this, arguments));
    };
  }
  function selection_selectAll(e) {
    typeof e == "function" ? e = arrayAll(e) : e = selectorAll(e);
    for (var t = this._groups, r = t.length, n = [], l = [], s = 0; s < r; ++s) for (var u = t[s], d = u.length, h, f = 0; f < d; ++f) (h = u[f]) && (n.push(e.call(h, h.__data__, f, u)), l.push(h));
    return new Selection$1(n, l);
  }
  function matcher(e) {
    return function() {
      return this.matches(e);
    };
  }
  function childMatcher(e) {
    return function(t) {
      return t.matches(e);
    };
  }
  var find$1 = Array.prototype.find;
  function childFind(e) {
    return function() {
      return find$1.call(this.children, e);
    };
  }
  function childFirst() {
    return this.firstElementChild;
  }
  function selection_selectChild(e) {
    return this.select(e == null ? childFirst : childFind(typeof e == "function" ? e : childMatcher(e)));
  }
  var filter = Array.prototype.filter;
  function children() {
    return Array.from(this.children);
  }
  function childrenFilter(e) {
    return function() {
      return filter.call(this.children, e);
    };
  }
  function selection_selectChildren(e) {
    return this.selectAll(e == null ? children : childrenFilter(typeof e == "function" ? e : childMatcher(e)));
  }
  function selection_filter(e) {
    typeof e != "function" && (e = matcher(e));
    for (var t = this._groups, r = t.length, n = new Array(r), l = 0; l < r; ++l) for (var s = t[l], u = s.length, d = n[l] = [], h, f = 0; f < u; ++f) (h = s[f]) && e.call(h, h.__data__, f, s) && d.push(h);
    return new Selection$1(n, this._parents);
  }
  function sparse(e) {
    return new Array(e.length);
  }
  function selection_enter() {
    return new Selection$1(this._enter || this._groups.map(sparse), this._parents);
  }
  function EnterNode(e, t) {
    this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
  }
  EnterNode.prototype = {
    constructor: EnterNode,
    appendChild: function(e) {
      return this._parent.insertBefore(e, this._next);
    },
    insertBefore: function(e, t) {
      return this._parent.insertBefore(e, t);
    },
    querySelector: function(e) {
      return this._parent.querySelector(e);
    },
    querySelectorAll: function(e) {
      return this._parent.querySelectorAll(e);
    }
  };
  function constant$1(e) {
    return function() {
      return e;
    };
  }
  function bindIndex(e, t, r, n, l, s) {
    for (var u = 0, d, h = t.length, f = s.length; u < f; ++u) (d = t[u]) ? (d.__data__ = s[u], n[u] = d) : r[u] = new EnterNode(e, s[u]);
    for (; u < h; ++u) (d = t[u]) && (l[u] = d);
  }
  function bindKey(e, t, r, n, l, s, u) {
    var d, h, f = /* @__PURE__ */ new Map(), o = t.length, p = s.length, y = new Array(o), g;
    for (d = 0; d < o; ++d) (h = t[d]) && (y[d] = g = u.call(h, h.__data__, d, t) + "", f.has(g) ? l[d] = h : f.set(g, h));
    for (d = 0; d < p; ++d) g = u.call(e, s[d], d, s) + "", (h = f.get(g)) ? (n[d] = h, h.__data__ = s[d], f.delete(g)) : r[d] = new EnterNode(e, s[d]);
    for (d = 0; d < o; ++d) (h = t[d]) && f.get(y[d]) === h && (l[d] = h);
  }
  function datum(e) {
    return e.__data__;
  }
  function selection_data(e, t) {
    if (!arguments.length) return Array.from(this, datum);
    var r = t ? bindKey : bindIndex, n = this._parents, l = this._groups;
    typeof e != "function" && (e = constant$1(e));
    for (var s = l.length, u = new Array(s), d = new Array(s), h = new Array(s), f = 0; f < s; ++f) {
      var o = n[f], p = l[f], y = p.length, g = arraylike(e.call(o, o && o.__data__, f, n)), v = g.length, c = d[f] = new Array(v), m = u[f] = new Array(v), _ = h[f] = new Array(y);
      r(o, p, c, m, _, g, t);
      for (var x = 0, S = 0, E, w; x < v; ++x) if (E = c[x]) {
        for (x >= S && (S = x + 1); !(w = m[S]) && ++S < v; ) ;
        E._next = w || null;
      }
    }
    return u = new Selection$1(u, n), u._enter = d, u._exit = h, u;
  }
  function arraylike(e) {
    return typeof e == "object" && "length" in e ? e : Array.from(e);
  }
  function selection_exit() {
    return new Selection$1(this._exit || this._groups.map(sparse), this._parents);
  }
  function selection_join(e, t, r) {
    var n = this.enter(), l = this, s = this.exit();
    return typeof e == "function" ? (n = e(n), n && (n = n.selection())) : n = n.append(e + ""), t != null && (l = t(l), l && (l = l.selection())), r == null ? s.remove() : r(s), n && l ? n.merge(l).order() : l;
  }
  function selection_merge(e) {
    for (var t = e.selection ? e.selection() : e, r = this._groups, n = t._groups, l = r.length, s = n.length, u = Math.min(l, s), d = new Array(l), h = 0; h < u; ++h) for (var f = r[h], o = n[h], p = f.length, y = d[h] = new Array(p), g, v = 0; v < p; ++v) (g = f[v] || o[v]) && (y[v] = g);
    for (; h < l; ++h) d[h] = r[h];
    return new Selection$1(d, this._parents);
  }
  function selection_order() {
    for (var e = this._groups, t = -1, r = e.length; ++t < r; ) for (var n = e[t], l = n.length - 1, s = n[l], u; --l >= 0; ) (u = n[l]) && (s && u.compareDocumentPosition(s) ^ 4 && s.parentNode.insertBefore(u, s), s = u);
    return this;
  }
  function selection_sort(e) {
    e || (e = ascending);
    function t(p, y) {
      return p && y ? e(p.__data__, y.__data__) : !p - !y;
    }
    for (var r = this._groups, n = r.length, l = new Array(n), s = 0; s < n; ++s) {
      for (var u = r[s], d = u.length, h = l[s] = new Array(d), f, o = 0; o < d; ++o) (f = u[o]) && (h[o] = f);
      h.sort(t);
    }
    return new Selection$1(l, this._parents).order();
  }
  function ascending(e, t) {
    return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
  }
  function selection_call() {
    var e = arguments[0];
    return arguments[0] = this, e.apply(null, arguments), this;
  }
  function selection_nodes() {
    return Array.from(this);
  }
  function selection_node() {
    for (var e = this._groups, t = 0, r = e.length; t < r; ++t) for (var n = e[t], l = 0, s = n.length; l < s; ++l) {
      var u = n[l];
      if (u) return u;
    }
    return null;
  }
  function selection_size() {
    let e = 0;
    for (const t of this) ++e;
    return e;
  }
  function selection_empty() {
    return !this.node();
  }
  function selection_each(e) {
    for (var t = this._groups, r = 0, n = t.length; r < n; ++r) for (var l = t[r], s = 0, u = l.length, d; s < u; ++s) (d = l[s]) && e.call(d, d.__data__, s, l);
    return this;
  }
  function attrRemove$1(e) {
    return function() {
      this.removeAttribute(e);
    };
  }
  function attrRemoveNS$1(e) {
    return function() {
      this.removeAttributeNS(e.space, e.local);
    };
  }
  function attrConstant$1(e, t) {
    return function() {
      this.setAttribute(e, t);
    };
  }
  function attrConstantNS$1(e, t) {
    return function() {
      this.setAttributeNS(e.space, e.local, t);
    };
  }
  function attrFunction$1(e, t) {
    return function() {
      var r = t.apply(this, arguments);
      r == null ? this.removeAttribute(e) : this.setAttribute(e, r);
    };
  }
  function attrFunctionNS$1(e, t) {
    return function() {
      var r = t.apply(this, arguments);
      r == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, r);
    };
  }
  function selection_attr(e, t) {
    var r = namespace(e);
    if (arguments.length < 2) {
      var n = this.node();
      return r.local ? n.getAttributeNS(r.space, r.local) : n.getAttribute(r);
    }
    return this.each((t == null ? r.local ? attrRemoveNS$1 : attrRemove$1 : typeof t == "function" ? r.local ? attrFunctionNS$1 : attrFunction$1 : r.local ? attrConstantNS$1 : attrConstant$1)(r, t));
  }
  function defaultView(e) {
    return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
  }
  function styleRemove$1(e) {
    return function() {
      this.style.removeProperty(e);
    };
  }
  function styleConstant$1(e, t, r) {
    return function() {
      this.style.setProperty(e, t, r);
    };
  }
  function styleFunction$1(e, t, r) {
    return function() {
      var n = t.apply(this, arguments);
      n == null ? this.style.removeProperty(e) : this.style.setProperty(e, n, r);
    };
  }
  function selection_style(e, t, r) {
    return arguments.length > 1 ? this.each((t == null ? styleRemove$1 : typeof t == "function" ? styleFunction$1 : styleConstant$1)(e, t, r ?? "")) : styleValue(this.node(), e);
  }
  function styleValue(e, t) {
    return e.style.getPropertyValue(t) || defaultView(e).getComputedStyle(e, null).getPropertyValue(t);
  }
  function propertyRemove(e) {
    return function() {
      delete this[e];
    };
  }
  function propertyConstant(e, t) {
    return function() {
      this[e] = t;
    };
  }
  function propertyFunction(e, t) {
    return function() {
      var r = t.apply(this, arguments);
      r == null ? delete this[e] : this[e] = r;
    };
  }
  function selection_property(e, t) {
    return arguments.length > 1 ? this.each((t == null ? propertyRemove : typeof t == "function" ? propertyFunction : propertyConstant)(e, t)) : this.node()[e];
  }
  function classArray(e) {
    return e.trim().split(/^|\s+/);
  }
  function classList(e) {
    return e.classList || new ClassList(e);
  }
  function ClassList(e) {
    this._node = e, this._names = classArray(e.getAttribute("class") || "");
  }
  ClassList.prototype = {
    add: function(e) {
      var t = this._names.indexOf(e);
      t < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
    },
    remove: function(e) {
      var t = this._names.indexOf(e);
      t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
    },
    contains: function(e) {
      return this._names.indexOf(e) >= 0;
    }
  };
  function classedAdd(e, t) {
    for (var r = classList(e), n = -1, l = t.length; ++n < l; ) r.add(t[n]);
  }
  function classedRemove(e, t) {
    for (var r = classList(e), n = -1, l = t.length; ++n < l; ) r.remove(t[n]);
  }
  function classedTrue(e) {
    return function() {
      classedAdd(this, e);
    };
  }
  function classedFalse(e) {
    return function() {
      classedRemove(this, e);
    };
  }
  function classedFunction(e, t) {
    return function() {
      (t.apply(this, arguments) ? classedAdd : classedRemove)(this, e);
    };
  }
  function selection_classed(e, t) {
    var r = classArray(e + "");
    if (arguments.length < 2) {
      for (var n = classList(this.node()), l = -1, s = r.length; ++l < s; ) if (!n.contains(r[l])) return false;
      return true;
    }
    return this.each((typeof t == "function" ? classedFunction : t ? classedTrue : classedFalse)(r, t));
  }
  function textRemove() {
    this.textContent = "";
  }
  function textConstant$1(e) {
    return function() {
      this.textContent = e;
    };
  }
  function textFunction$1(e) {
    return function() {
      var t = e.apply(this, arguments);
      this.textContent = t ?? "";
    };
  }
  function selection_text(e) {
    return arguments.length ? this.each(e == null ? textRemove : (typeof e == "function" ? textFunction$1 : textConstant$1)(e)) : this.node().textContent;
  }
  function htmlRemove() {
    this.innerHTML = "";
  }
  function htmlConstant(e) {
    return function() {
      this.innerHTML = e;
    };
  }
  function htmlFunction(e) {
    return function() {
      var t = e.apply(this, arguments);
      this.innerHTML = t ?? "";
    };
  }
  function selection_html(e) {
    return arguments.length ? this.each(e == null ? htmlRemove : (typeof e == "function" ? htmlFunction : htmlConstant)(e)) : this.node().innerHTML;
  }
  function raise() {
    this.nextSibling && this.parentNode.appendChild(this);
  }
  function selection_raise() {
    return this.each(raise);
  }
  function lower() {
    this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
  }
  function selection_lower() {
    return this.each(lower);
  }
  function selection_append(e) {
    var t = typeof e == "function" ? e : creator(e);
    return this.select(function() {
      return this.appendChild(t.apply(this, arguments));
    });
  }
  function constantNull() {
    return null;
  }
  function selection_insert(e, t) {
    var r = typeof e == "function" ? e : creator(e), n = t == null ? constantNull : typeof t == "function" ? t : selector(t);
    return this.select(function() {
      return this.insertBefore(r.apply(this, arguments), n.apply(this, arguments) || null);
    });
  }
  function remove() {
    var e = this.parentNode;
    e && e.removeChild(this);
  }
  function selection_remove() {
    return this.each(remove);
  }
  function selection_cloneShallow() {
    var e = this.cloneNode(false), t = this.parentNode;
    return t ? t.insertBefore(e, this.nextSibling) : e;
  }
  function selection_cloneDeep() {
    var e = this.cloneNode(true), t = this.parentNode;
    return t ? t.insertBefore(e, this.nextSibling) : e;
  }
  function selection_clone(e) {
    return this.select(e ? selection_cloneDeep : selection_cloneShallow);
  }
  function selection_datum(e) {
    return arguments.length ? this.property("__data__", e) : this.node().__data__;
  }
  function contextListener(e) {
    return function(t) {
      e.call(this, t, this.__data__);
    };
  }
  function parseTypenames(e) {
    return e.trim().split(/^|\s+/).map(function(t) {
      var r = "", n = t.indexOf(".");
      return n >= 0 && (r = t.slice(n + 1), t = t.slice(0, n)), {
        type: t,
        name: r
      };
    });
  }
  function onRemove(e) {
    return function() {
      var t = this.__on;
      if (t) {
        for (var r = 0, n = -1, l = t.length, s; r < l; ++r) s = t[r], (!e.type || s.type === e.type) && s.name === e.name ? this.removeEventListener(s.type, s.listener, s.options) : t[++n] = s;
        ++n ? t.length = n : delete this.__on;
      }
    };
  }
  function onAdd(e, t, r) {
    return function() {
      var n = this.__on, l, s = contextListener(t);
      if (n) {
        for (var u = 0, d = n.length; u < d; ++u) if ((l = n[u]).type === e.type && l.name === e.name) {
          this.removeEventListener(l.type, l.listener, l.options), this.addEventListener(l.type, l.listener = s, l.options = r), l.value = t;
          return;
        }
      }
      this.addEventListener(e.type, s, r), l = {
        type: e.type,
        name: e.name,
        value: t,
        listener: s,
        options: r
      }, n ? n.push(l) : this.__on = [
        l
      ];
    };
  }
  function selection_on(e, t, r) {
    var n = parseTypenames(e + ""), l, s = n.length, u;
    if (arguments.length < 2) {
      var d = this.node().__on;
      if (d) {
        for (var h = 0, f = d.length, o; h < f; ++h) for (l = 0, o = d[h]; l < s; ++l) if ((u = n[l]).type === o.type && u.name === o.name) return o.value;
      }
      return;
    }
    for (d = t ? onAdd : onRemove, l = 0; l < s; ++l) this.each(d(n[l], t, r));
    return this;
  }
  function dispatchEvent$1(e, t, r) {
    var n = defaultView(e), l = n.CustomEvent;
    typeof l == "function" ? l = new l(t, r) : (l = n.document.createEvent("Event"), r ? (l.initEvent(t, r.bubbles, r.cancelable), l.detail = r.detail) : l.initEvent(t, false, false)), e.dispatchEvent(l);
  }
  function dispatchConstant(e, t) {
    return function() {
      return dispatchEvent$1(this, e, t);
    };
  }
  function dispatchFunction(e, t) {
    return function() {
      return dispatchEvent$1(this, e, t.apply(this, arguments));
    };
  }
  function selection_dispatch(e, t) {
    return this.each((typeof t == "function" ? dispatchFunction : dispatchConstant)(e, t));
  }
  function* selection_iterator() {
    for (var e = this._groups, t = 0, r = e.length; t < r; ++t) for (var n = e[t], l = 0, s = n.length, u; l < s; ++l) (u = n[l]) && (yield u);
  }
  var root = [
    null
  ];
  function Selection$1(e, t) {
    this._groups = e, this._parents = t;
  }
  function selection() {
    return new Selection$1([
      [
        document.documentElement
      ]
    ], root);
  }
  function selection_selection() {
    return this;
  }
  Selection$1.prototype = selection.prototype = {
    constructor: Selection$1,
    select: selection_select,
    selectAll: selection_selectAll,
    selectChild: selection_selectChild,
    selectChildren: selection_selectChildren,
    filter: selection_filter,
    data: selection_data,
    enter: selection_enter,
    exit: selection_exit,
    join: selection_join,
    merge: selection_merge,
    selection: selection_selection,
    order: selection_order,
    sort: selection_sort,
    call: selection_call,
    nodes: selection_nodes,
    node: selection_node,
    size: selection_size,
    empty: selection_empty,
    each: selection_each,
    attr: selection_attr,
    style: selection_style,
    property: selection_property,
    classed: selection_classed,
    text: selection_text,
    html: selection_html,
    raise: selection_raise,
    lower: selection_lower,
    append: selection_append,
    insert: selection_insert,
    remove: selection_remove,
    clone: selection_clone,
    datum: selection_datum,
    on: selection_on,
    dispatch: selection_dispatch,
    [Symbol.iterator]: selection_iterator
  };
  function select(e) {
    return typeof e == "string" ? new Selection$1([
      [
        document.querySelector(e)
      ]
    ], [
      document.documentElement
    ]) : new Selection$1([
      [
        e
      ]
    ], root);
  }
  function define(e, t, r) {
    e.prototype = t.prototype = r, r.constructor = e;
  }
  function extend$1(e, t) {
    var r = Object.create(e.prototype);
    for (var n in t) r[n] = t[n];
    return r;
  }
  function Color() {
  }
  var darker = 0.7, brighter = 1 / darker, reI = "\\s*([+-]?\\d+)\\s*", reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", reHex = /^#([0-9a-f]{3,8})$/, reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`), reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`), reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`), reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`), reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`), reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`), named = {
    aliceblue: 15792383,
    antiquewhite: 16444375,
    aqua: 65535,
    aquamarine: 8388564,
    azure: 15794175,
    beige: 16119260,
    bisque: 16770244,
    black: 0,
    blanchedalmond: 16772045,
    blue: 255,
    blueviolet: 9055202,
    brown: 10824234,
    burlywood: 14596231,
    cadetblue: 6266528,
    chartreuse: 8388352,
    chocolate: 13789470,
    coral: 16744272,
    cornflowerblue: 6591981,
    cornsilk: 16775388,
    crimson: 14423100,
    cyan: 65535,
    darkblue: 139,
    darkcyan: 35723,
    darkgoldenrod: 12092939,
    darkgray: 11119017,
    darkgreen: 25600,
    darkgrey: 11119017,
    darkkhaki: 12433259,
    darkmagenta: 9109643,
    darkolivegreen: 5597999,
    darkorange: 16747520,
    darkorchid: 10040012,
    darkred: 9109504,
    darksalmon: 15308410,
    darkseagreen: 9419919,
    darkslateblue: 4734347,
    darkslategray: 3100495,
    darkslategrey: 3100495,
    darkturquoise: 52945,
    darkviolet: 9699539,
    deeppink: 16716947,
    deepskyblue: 49151,
    dimgray: 6908265,
    dimgrey: 6908265,
    dodgerblue: 2003199,
    firebrick: 11674146,
    floralwhite: 16775920,
    forestgreen: 2263842,
    fuchsia: 16711935,
    gainsboro: 14474460,
    ghostwhite: 16316671,
    gold: 16766720,
    goldenrod: 14329120,
    gray: 8421504,
    green: 32768,
    greenyellow: 11403055,
    grey: 8421504,
    honeydew: 15794160,
    hotpink: 16738740,
    indianred: 13458524,
    indigo: 4915330,
    ivory: 16777200,
    khaki: 15787660,
    lavender: 15132410,
    lavenderblush: 16773365,
    lawngreen: 8190976,
    lemonchiffon: 16775885,
    lightblue: 11393254,
    lightcoral: 15761536,
    lightcyan: 14745599,
    lightgoldenrodyellow: 16448210,
    lightgray: 13882323,
    lightgreen: 9498256,
    lightgrey: 13882323,
    lightpink: 16758465,
    lightsalmon: 16752762,
    lightseagreen: 2142890,
    lightskyblue: 8900346,
    lightslategray: 7833753,
    lightslategrey: 7833753,
    lightsteelblue: 11584734,
    lightyellow: 16777184,
    lime: 65280,
    limegreen: 3329330,
    linen: 16445670,
    magenta: 16711935,
    maroon: 8388608,
    mediumaquamarine: 6737322,
    mediumblue: 205,
    mediumorchid: 12211667,
    mediumpurple: 9662683,
    mediumseagreen: 3978097,
    mediumslateblue: 8087790,
    mediumspringgreen: 64154,
    mediumturquoise: 4772300,
    mediumvioletred: 13047173,
    midnightblue: 1644912,
    mintcream: 16121850,
    mistyrose: 16770273,
    moccasin: 16770229,
    navajowhite: 16768685,
    navy: 128,
    oldlace: 16643558,
    olive: 8421376,
    olivedrab: 7048739,
    orange: 16753920,
    orangered: 16729344,
    orchid: 14315734,
    palegoldenrod: 15657130,
    palegreen: 10025880,
    paleturquoise: 11529966,
    palevioletred: 14381203,
    papayawhip: 16773077,
    peachpuff: 16767673,
    peru: 13468991,
    pink: 16761035,
    plum: 14524637,
    powderblue: 11591910,
    purple: 8388736,
    rebeccapurple: 6697881,
    red: 16711680,
    rosybrown: 12357519,
    royalblue: 4286945,
    saddlebrown: 9127187,
    salmon: 16416882,
    sandybrown: 16032864,
    seagreen: 3050327,
    seashell: 16774638,
    sienna: 10506797,
    silver: 12632256,
    skyblue: 8900331,
    slateblue: 6970061,
    slategray: 7372944,
    slategrey: 7372944,
    snow: 16775930,
    springgreen: 65407,
    steelblue: 4620980,
    tan: 13808780,
    teal: 32896,
    thistle: 14204888,
    tomato: 16737095,
    turquoise: 4251856,
    violet: 15631086,
    wheat: 16113331,
    white: 16777215,
    whitesmoke: 16119285,
    yellow: 16776960,
    yellowgreen: 10145074
  };
  define(Color, color, {
    copy(e) {
      return Object.assign(new this.constructor(), this, e);
    },
    displayable() {
      return this.rgb().displayable();
    },
    hex: color_formatHex,
    formatHex: color_formatHex,
    formatHex8: color_formatHex8,
    formatHsl: color_formatHsl,
    formatRgb: color_formatRgb,
    toString: color_formatRgb
  });
  function color_formatHex() {
    return this.rgb().formatHex();
  }
  function color_formatHex8() {
    return this.rgb().formatHex8();
  }
  function color_formatHsl() {
    return hslConvert(this).formatHsl();
  }
  function color_formatRgb() {
    return this.rgb().formatRgb();
  }
  function color(e) {
    var t, r;
    return e = (e + "").trim().toLowerCase(), (t = reHex.exec(e)) ? (r = t[1].length, t = parseInt(t[1], 16), r === 6 ? rgbn(t) : r === 3 ? new Rgb(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : r === 8 ? rgba(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : r === 4 ? rgba(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = reRgbInteger.exec(e)) ? new Rgb(t[1], t[2], t[3], 1) : (t = reRgbPercent.exec(e)) ? new Rgb(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = reRgbaInteger.exec(e)) ? rgba(t[1], t[2], t[3], t[4]) : (t = reRgbaPercent.exec(e)) ? rgba(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = reHslPercent.exec(e)) ? hsla(t[1], t[2] / 100, t[3] / 100, 1) : (t = reHslaPercent.exec(e)) ? hsla(t[1], t[2] / 100, t[3] / 100, t[4]) : named.hasOwnProperty(e) ? rgbn(named[e]) : e === "transparent" ? new Rgb(NaN, NaN, NaN, 0) : null;
  }
  function rgbn(e) {
    return new Rgb(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
  }
  function rgba(e, t, r, n) {
    return n <= 0 && (e = t = r = NaN), new Rgb(e, t, r, n);
  }
  function rgbConvert(e) {
    return e instanceof Color || (e = color(e)), e ? (e = e.rgb(), new Rgb(e.r, e.g, e.b, e.opacity)) : new Rgb();
  }
  function rgb(e, t, r, n) {
    return arguments.length === 1 ? rgbConvert(e) : new Rgb(e, t, r, n ?? 1);
  }
  function Rgb(e, t, r, n) {
    this.r = +e, this.g = +t, this.b = +r, this.opacity = +n;
  }
  define(Rgb, rgb, extend$1(Color, {
    brighter(e) {
      return e = e == null ? brighter : Math.pow(brighter, e), new Rgb(this.r * e, this.g * e, this.b * e, this.opacity);
    },
    darker(e) {
      return e = e == null ? darker : Math.pow(darker, e), new Rgb(this.r * e, this.g * e, this.b * e, this.opacity);
    },
    rgb() {
      return this;
    },
    clamp() {
      return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
    },
    displayable() {
      return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
    },
    hex: rgb_formatHex,
    formatHex: rgb_formatHex,
    formatHex8: rgb_formatHex8,
    formatRgb: rgb_formatRgb,
    toString: rgb_formatRgb
  }));
  function rgb_formatHex() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
  }
  function rgb_formatHex8() {
    return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
  }
  function rgb_formatRgb() {
    const e = clampa(this.opacity);
    return `${e === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${e === 1 ? ")" : `, ${e})`}`;
  }
  function clampa(e) {
    return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
  }
  function clampi(e) {
    return Math.max(0, Math.min(255, Math.round(e) || 0));
  }
  function hex(e) {
    return e = clampi(e), (e < 16 ? "0" : "") + e.toString(16);
  }
  function hsla(e, t, r, n) {
    return n <= 0 ? e = t = r = NaN : r <= 0 || r >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Hsl(e, t, r, n);
  }
  function hslConvert(e) {
    if (e instanceof Hsl) return new Hsl(e.h, e.s, e.l, e.opacity);
    if (e instanceof Color || (e = color(e)), !e) return new Hsl();
    if (e instanceof Hsl) return e;
    e = e.rgb();
    var t = e.r / 255, r = e.g / 255, n = e.b / 255, l = Math.min(t, r, n), s = Math.max(t, r, n), u = NaN, d = s - l, h = (s + l) / 2;
    return d ? (t === s ? u = (r - n) / d + (r < n) * 6 : r === s ? u = (n - t) / d + 2 : u = (t - r) / d + 4, d /= h < 0.5 ? s + l : 2 - s - l, u *= 60) : d = h > 0 && h < 1 ? 0 : u, new Hsl(u, d, h, e.opacity);
  }
  function hsl(e, t, r, n) {
    return arguments.length === 1 ? hslConvert(e) : new Hsl(e, t, r, n ?? 1);
  }
  function Hsl(e, t, r, n) {
    this.h = +e, this.s = +t, this.l = +r, this.opacity = +n;
  }
  define(Hsl, hsl, extend$1(Color, {
    brighter(e) {
      return e = e == null ? brighter : Math.pow(brighter, e), new Hsl(this.h, this.s, this.l * e, this.opacity);
    },
    darker(e) {
      return e = e == null ? darker : Math.pow(darker, e), new Hsl(this.h, this.s, this.l * e, this.opacity);
    },
    rgb() {
      var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, r = this.l, n = r + (r < 0.5 ? r : 1 - r) * t, l = 2 * r - n;
      return new Rgb(hsl2rgb(e >= 240 ? e - 240 : e + 120, l, n), hsl2rgb(e, l, n), hsl2rgb(e < 120 ? e + 240 : e - 120, l, n), this.opacity);
    },
    clamp() {
      return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
    },
    displayable() {
      return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
    },
    formatHsl() {
      const e = clampa(this.opacity);
      return `${e === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
    }
  }));
  function clamph(e) {
    return e = (e || 0) % 360, e < 0 ? e + 360 : e;
  }
  function clampt(e) {
    return Math.max(0, Math.min(1, e || 0));
  }
  function hsl2rgb(e, t, r) {
    return (e < 60 ? t + (r - t) * e / 60 : e < 180 ? r : e < 240 ? t + (r - t) * (240 - e) / 60 : t) * 255;
  }
  function basis(e, t, r, n, l) {
    var s = e * e, u = s * e;
    return ((1 - 3 * e + 3 * s - u) * t + (4 - 6 * s + 3 * u) * r + (1 + 3 * e + 3 * s - 3 * u) * n + u * l) / 6;
  }
  function basis$1(e) {
    var t = e.length - 1;
    return function(r) {
      var n = r <= 0 ? r = 0 : r >= 1 ? (r = 1, t - 1) : Math.floor(r * t), l = e[n], s = e[n + 1], u = n > 0 ? e[n - 1] : 2 * l - s, d = n < t - 1 ? e[n + 2] : 2 * s - l;
      return basis((r - n / t) * t, u, l, s, d);
    };
  }
  const constant = (e) => () => e;
  function linear$1(e, t) {
    return function(r) {
      return e + r * t;
    };
  }
  function exponential(e, t, r) {
    return e = Math.pow(e, r), t = Math.pow(t, r) - e, r = 1 / r, function(n) {
      return Math.pow(e + n * t, r);
    };
  }
  function gamma(e) {
    return (e = +e) == 1 ? nogamma : function(t, r) {
      return r - t ? exponential(t, r, e) : constant(isNaN(t) ? r : t);
    };
  }
  function nogamma(e, t) {
    var r = t - e;
    return r ? linear$1(e, r) : constant(isNaN(e) ? t : e);
  }
  const interpolateRgb = function e(t) {
    var r = gamma(t);
    function n(l, s) {
      var u = r((l = rgb(l)).r, (s = rgb(s)).r), d = r(l.g, s.g), h = r(l.b, s.b), f = nogamma(l.opacity, s.opacity);
      return function(o) {
        return l.r = u(o), l.g = d(o), l.b = h(o), l.opacity = f(o), l + "";
      };
    }
    return n.gamma = e, n;
  }(1);
  function rgbSpline(e) {
    return function(t) {
      var r = t.length, n = new Array(r), l = new Array(r), s = new Array(r), u, d;
      for (u = 0; u < r; ++u) d = rgb(t[u]), n[u] = d.r || 0, l[u] = d.g || 0, s[u] = d.b || 0;
      return n = e(n), l = e(l), s = e(s), d.opacity = 1, function(h) {
        return d.r = n(h), d.g = l(h), d.b = s(h), d + "";
      };
    };
  }
  var rgbBasis = rgbSpline(basis$1);
  function numberArray(e, t) {
    t || (t = []);
    var r = e ? Math.min(t.length, e.length) : 0, n = t.slice(), l;
    return function(s) {
      for (l = 0; l < r; ++l) n[l] = e[l] * (1 - s) + t[l] * s;
      return n;
    };
  }
  function isNumberArray(e) {
    return ArrayBuffer.isView(e) && !(e instanceof DataView);
  }
  function genericArray(e, t) {
    var r = t ? t.length : 0, n = e ? Math.min(r, e.length) : 0, l = new Array(n), s = new Array(r), u;
    for (u = 0; u < n; ++u) l[u] = interpolate$1(e[u], t[u]);
    for (; u < r; ++u) s[u] = t[u];
    return function(d) {
      for (u = 0; u < n; ++u) s[u] = l[u](d);
      return s;
    };
  }
  function date(e, t) {
    var r = /* @__PURE__ */ new Date();
    return e = +e, t = +t, function(n) {
      return r.setTime(e * (1 - n) + t * n), r;
    };
  }
  function interpolateNumber(e, t) {
    return e = +e, t = +t, function(r) {
      return e * (1 - r) + t * r;
    };
  }
  function object(e, t) {
    var r = {}, n = {}, l;
    (e === null || typeof e != "object") && (e = {}), (t === null || typeof t != "object") && (t = {});
    for (l in t) l in e ? r[l] = interpolate$1(e[l], t[l]) : n[l] = t[l];
    return function(s) {
      for (l in r) n[l] = r[l](s);
      return n;
    };
  }
  var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, reB = new RegExp(reA.source, "g");
  function zero(e) {
    return function() {
      return e;
    };
  }
  function one(e) {
    return function(t) {
      return e(t) + "";
    };
  }
  function interpolateString(e, t) {
    var r = reA.lastIndex = reB.lastIndex = 0, n, l, s, u = -1, d = [], h = [];
    for (e = e + "", t = t + ""; (n = reA.exec(e)) && (l = reB.exec(t)); ) (s = l.index) > r && (s = t.slice(r, s), d[u] ? d[u] += s : d[++u] = s), (n = n[0]) === (l = l[0]) ? d[u] ? d[u] += l : d[++u] = l : (d[++u] = null, h.push({
      i: u,
      x: interpolateNumber(n, l)
    })), r = reB.lastIndex;
    return r < t.length && (s = t.slice(r), d[u] ? d[u] += s : d[++u] = s), d.length < 2 ? h[0] ? one(h[0].x) : zero(t) : (t = h.length, function(f) {
      for (var o = 0, p; o < t; ++o) d[(p = h[o]).i] = p.x(f);
      return d.join("");
    });
  }
  function interpolate$1(e, t) {
    var r = typeof t, n;
    return t == null || r === "boolean" ? constant(t) : (r === "number" ? interpolateNumber : r === "string" ? (n = color(t)) ? (t = n, interpolateRgb) : interpolateString : t instanceof color ? interpolateRgb : t instanceof Date ? date : isNumberArray(t) ? numberArray : Array.isArray(t) ? genericArray : typeof t.valueOf != "function" && typeof t.toString != "function" || isNaN(t) ? object : interpolateNumber)(e, t);
  }
  function interpolateRound(e, t) {
    return e = +e, t = +t, function(r) {
      return Math.round(e * (1 - r) + t * r);
    };
  }
  var degrees = 180 / Math.PI, identity$2 = {
    translateX: 0,
    translateY: 0,
    rotate: 0,
    skewX: 0,
    scaleX: 1,
    scaleY: 1
  };
  function decompose(e, t, r, n, l, s) {
    var u, d, h;
    return (u = Math.sqrt(e * e + t * t)) && (e /= u, t /= u), (h = e * r + t * n) && (r -= e * h, n -= t * h), (d = Math.sqrt(r * r + n * n)) && (r /= d, n /= d, h /= d), e * n < t * r && (e = -e, t = -t, h = -h, u = -u), {
      translateX: l,
      translateY: s,
      rotate: Math.atan2(t, e) * degrees,
      skewX: Math.atan(h) * degrees,
      scaleX: u,
      scaleY: d
    };
  }
  var svgNode;
  function parseCss(e) {
    const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
    return t.isIdentity ? identity$2 : decompose(t.a, t.b, t.c, t.d, t.e, t.f);
  }
  function parseSvg(e) {
    return e == null || (svgNode || (svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g")), svgNode.setAttribute("transform", e), !(e = svgNode.transform.baseVal.consolidate())) ? identity$2 : (e = e.matrix, decompose(e.a, e.b, e.c, e.d, e.e, e.f));
  }
  function interpolateTransform(e, t, r, n) {
    function l(f) {
      return f.length ? f.pop() + " " : "";
    }
    function s(f, o, p, y, g, v) {
      if (f !== p || o !== y) {
        var c = g.push("translate(", null, t, null, r);
        v.push({
          i: c - 4,
          x: interpolateNumber(f, p)
        }, {
          i: c - 2,
          x: interpolateNumber(o, y)
        });
      } else (p || y) && g.push("translate(" + p + t + y + r);
    }
    function u(f, o, p, y) {
      f !== o ? (f - o > 180 ? o += 360 : o - f > 180 && (f += 360), y.push({
        i: p.push(l(p) + "rotate(", null, n) - 2,
        x: interpolateNumber(f, o)
      })) : o && p.push(l(p) + "rotate(" + o + n);
    }
    function d(f, o, p, y) {
      f !== o ? y.push({
        i: p.push(l(p) + "skewX(", null, n) - 2,
        x: interpolateNumber(f, o)
      }) : o && p.push(l(p) + "skewX(" + o + n);
    }
    function h(f, o, p, y, g, v) {
      if (f !== p || o !== y) {
        var c = g.push(l(g) + "scale(", null, ",", null, ")");
        v.push({
          i: c - 4,
          x: interpolateNumber(f, p)
        }, {
          i: c - 2,
          x: interpolateNumber(o, y)
        });
      } else (p !== 1 || y !== 1) && g.push(l(g) + "scale(" + p + "," + y + ")");
    }
    return function(f, o) {
      var p = [], y = [];
      return f = e(f), o = e(o), s(f.translateX, f.translateY, o.translateX, o.translateY, p, y), u(f.rotate, o.rotate, p, y), d(f.skewX, o.skewX, p, y), h(f.scaleX, f.scaleY, o.scaleX, o.scaleY, p, y), f = o = null, function(g) {
        for (var v = -1, c = y.length, m; ++v < c; ) p[(m = y[v]).i] = m.x(g);
        return p.join("");
      };
    };
  }
  var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)"), interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")"), frame$1 = 0, timeout$1 = 0, interval = 0, pokeDelay = 1e3, taskHead, taskTail, clockLast = 0, clockNow = 0, clockSkew = 0, clock = typeof performance == "object" && performance.now ? performance : Date, setFrame = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
    setTimeout(e, 17);
  };
  function now() {
    return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
  }
  function clearNow() {
    clockNow = 0;
  }
  function Timer() {
    this._call = this._time = this._next = null;
  }
  Timer.prototype = timer.prototype = {
    constructor: Timer,
    restart: function(e, t, r) {
      if (typeof e != "function") throw new TypeError("callback is not a function");
      r = (r == null ? now() : +r) + (t == null ? 0 : +t), !this._next && taskTail !== this && (taskTail ? taskTail._next = this : taskHead = this, taskTail = this), this._call = e, this._time = r, sleep();
    },
    stop: function() {
      this._call && (this._call = null, this._time = 1 / 0, sleep());
    }
  };
  function timer(e, t, r) {
    var n = new Timer();
    return n.restart(e, t, r), n;
  }
  function timerFlush() {
    now(), ++frame$1;
    for (var e = taskHead, t; e; ) (t = clockNow - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
    --frame$1;
  }
  function wake() {
    clockNow = (clockLast = clock.now()) + clockSkew, frame$1 = timeout$1 = 0;
    try {
      timerFlush();
    } finally {
      frame$1 = 0, nap(), clockNow = 0;
    }
  }
  function poke() {
    var e = clock.now(), t = e - clockLast;
    t > pokeDelay && (clockSkew -= t, clockLast = e);
  }
  function nap() {
    for (var e, t = taskHead, r, n = 1 / 0; t; ) t._call ? (n > t._time && (n = t._time), e = t, t = t._next) : (r = t._next, t._next = null, t = e ? e._next = r : taskHead = r);
    taskTail = e, sleep(n);
  }
  function sleep(e) {
    if (!frame$1) {
      timeout$1 && (timeout$1 = clearTimeout(timeout$1));
      var t = e - clockNow;
      t > 24 ? (e < 1 / 0 && (timeout$1 = setTimeout(wake, e - clock.now() - clockSkew)), interval && (interval = clearInterval(interval))) : (interval || (clockLast = clock.now(), interval = setInterval(poke, pokeDelay)), frame$1 = 1, setFrame(wake));
    }
  }
  function timeout(e, t, r) {
    var n = new Timer();
    return t = t == null ? 0 : +t, n.restart((l) => {
      n.stop(), e(l + t);
    }, t, r), n;
  }
  var emptyOn = dispatch("start", "end", "cancel", "interrupt"), emptyTween = [], CREATED = 0, SCHEDULED = 1, STARTING = 2, STARTED = 3, RUNNING = 4, ENDING = 5, ENDED = 6;
  function schedule(e, t, r, n, l, s) {
    var u = e.__transition;
    if (!u) e.__transition = {};
    else if (r in u) return;
    create(e, r, {
      name: t,
      index: n,
      group: l,
      on: emptyOn,
      tween: emptyTween,
      time: s.time,
      delay: s.delay,
      duration: s.duration,
      ease: s.ease,
      timer: null,
      state: CREATED
    });
  }
  function init(e, t) {
    var r = get(e, t);
    if (r.state > CREATED) throw new Error("too late; already scheduled");
    return r;
  }
  function set(e, t) {
    var r = get(e, t);
    if (r.state > STARTED) throw new Error("too late; already running");
    return r;
  }
  function get(e, t) {
    var r = e.__transition;
    if (!r || !(r = r[t])) throw new Error("transition not found");
    return r;
  }
  function create(e, t, r) {
    var n = e.__transition, l;
    n[t] = r, r.timer = timer(s, 0, r.time);
    function s(f) {
      r.state = SCHEDULED, r.timer.restart(u, r.delay, r.time), r.delay <= f && u(f - r.delay);
    }
    function u(f) {
      var o, p, y, g;
      if (r.state !== SCHEDULED) return h();
      for (o in n) if (g = n[o], g.name === r.name) {
        if (g.state === STARTED) return timeout(u);
        g.state === RUNNING ? (g.state = ENDED, g.timer.stop(), g.on.call("interrupt", e, e.__data__, g.index, g.group), delete n[o]) : +o < t && (g.state = ENDED, g.timer.stop(), g.on.call("cancel", e, e.__data__, g.index, g.group), delete n[o]);
      }
      if (timeout(function() {
        r.state === STARTED && (r.state = RUNNING, r.timer.restart(d, r.delay, r.time), d(f));
      }), r.state = STARTING, r.on.call("start", e, e.__data__, r.index, r.group), r.state === STARTING) {
        for (r.state = STARTED, l = new Array(y = r.tween.length), o = 0, p = -1; o < y; ++o) (g = r.tween[o].value.call(e, e.__data__, r.index, r.group)) && (l[++p] = g);
        l.length = p + 1;
      }
    }
    function d(f) {
      for (var o = f < r.duration ? r.ease.call(null, f / r.duration) : (r.timer.restart(h), r.state = ENDING, 1), p = -1, y = l.length; ++p < y; ) l[p].call(e, o);
      r.state === ENDING && (r.on.call("end", e, e.__data__, r.index, r.group), h());
    }
    function h() {
      r.state = ENDED, r.timer.stop(), delete n[t];
      for (var f in n) return;
      delete e.__transition;
    }
  }
  function interrupt(e, t) {
    var r = e.__transition, n, l, s = true, u;
    if (r) {
      t = t == null ? null : t + "";
      for (u in r) {
        if ((n = r[u]).name !== t) {
          s = false;
          continue;
        }
        l = n.state > STARTING && n.state < ENDING, n.state = ENDED, n.timer.stop(), n.on.call(l ? "interrupt" : "cancel", e, e.__data__, n.index, n.group), delete r[u];
      }
      s && delete e.__transition;
    }
  }
  function selection_interrupt(e) {
    return this.each(function() {
      interrupt(this, e);
    });
  }
  function tweenRemove(e, t) {
    var r, n;
    return function() {
      var l = set(this, e), s = l.tween;
      if (s !== r) {
        n = r = s;
        for (var u = 0, d = n.length; u < d; ++u) if (n[u].name === t) {
          n = n.slice(), n.splice(u, 1);
          break;
        }
      }
      l.tween = n;
    };
  }
  function tweenFunction(e, t, r) {
    var n, l;
    if (typeof r != "function") throw new Error();
    return function() {
      var s = set(this, e), u = s.tween;
      if (u !== n) {
        l = (n = u).slice();
        for (var d = {
          name: t,
          value: r
        }, h = 0, f = l.length; h < f; ++h) if (l[h].name === t) {
          l[h] = d;
          break;
        }
        h === f && l.push(d);
      }
      s.tween = l;
    };
  }
  function transition_tween(e, t) {
    var r = this._id;
    if (e += "", arguments.length < 2) {
      for (var n = get(this.node(), r).tween, l = 0, s = n.length, u; l < s; ++l) if ((u = n[l]).name === e) return u.value;
      return null;
    }
    return this.each((t == null ? tweenRemove : tweenFunction)(r, e, t));
  }
  function tweenValue(e, t, r) {
    var n = e._id;
    return e.each(function() {
      var l = set(this, n);
      (l.value || (l.value = {}))[t] = r.apply(this, arguments);
    }), function(l) {
      return get(l, n).value[t];
    };
  }
  function interpolate(e, t) {
    var r;
    return (typeof t == "number" ? interpolateNumber : t instanceof color ? interpolateRgb : (r = color(t)) ? (t = r, interpolateRgb) : interpolateString)(e, t);
  }
  function attrRemove(e) {
    return function() {
      this.removeAttribute(e);
    };
  }
  function attrRemoveNS(e) {
    return function() {
      this.removeAttributeNS(e.space, e.local);
    };
  }
  function attrConstant(e, t, r) {
    var n, l = r + "", s;
    return function() {
      var u = this.getAttribute(e);
      return u === l ? null : u === n ? s : s = t(n = u, r);
    };
  }
  function attrConstantNS(e, t, r) {
    var n, l = r + "", s;
    return function() {
      var u = this.getAttributeNS(e.space, e.local);
      return u === l ? null : u === n ? s : s = t(n = u, r);
    };
  }
  function attrFunction(e, t, r) {
    var n, l, s;
    return function() {
      var u, d = r(this), h;
      return d == null ? void this.removeAttribute(e) : (u = this.getAttribute(e), h = d + "", u === h ? null : u === n && h === l ? s : (l = h, s = t(n = u, d)));
    };
  }
  function attrFunctionNS(e, t, r) {
    var n, l, s;
    return function() {
      var u, d = r(this), h;
      return d == null ? void this.removeAttributeNS(e.space, e.local) : (u = this.getAttributeNS(e.space, e.local), h = d + "", u === h ? null : u === n && h === l ? s : (l = h, s = t(n = u, d)));
    };
  }
  function transition_attr(e, t) {
    var r = namespace(e), n = r === "transform" ? interpolateTransformSvg : interpolate;
    return this.attrTween(e, typeof t == "function" ? (r.local ? attrFunctionNS : attrFunction)(r, n, tweenValue(this, "attr." + e, t)) : t == null ? (r.local ? attrRemoveNS : attrRemove)(r) : (r.local ? attrConstantNS : attrConstant)(r, n, t));
  }
  function attrInterpolate(e, t) {
    return function(r) {
      this.setAttribute(e, t.call(this, r));
    };
  }
  function attrInterpolateNS(e, t) {
    return function(r) {
      this.setAttributeNS(e.space, e.local, t.call(this, r));
    };
  }
  function attrTweenNS(e, t) {
    var r, n;
    function l() {
      var s = t.apply(this, arguments);
      return s !== n && (r = (n = s) && attrInterpolateNS(e, s)), r;
    }
    return l._value = t, l;
  }
  function attrTween(e, t) {
    var r, n;
    function l() {
      var s = t.apply(this, arguments);
      return s !== n && (r = (n = s) && attrInterpolate(e, s)), r;
    }
    return l._value = t, l;
  }
  function transition_attrTween(e, t) {
    var r = "attr." + e;
    if (arguments.length < 2) return (r = this.tween(r)) && r._value;
    if (t == null) return this.tween(r, null);
    if (typeof t != "function") throw new Error();
    var n = namespace(e);
    return this.tween(r, (n.local ? attrTweenNS : attrTween)(n, t));
  }
  function delayFunction(e, t) {
    return function() {
      init(this, e).delay = +t.apply(this, arguments);
    };
  }
  function delayConstant(e, t) {
    return t = +t, function() {
      init(this, e).delay = t;
    };
  }
  function transition_delay(e) {
    var t = this._id;
    return arguments.length ? this.each((typeof e == "function" ? delayFunction : delayConstant)(t, e)) : get(this.node(), t).delay;
  }
  function durationFunction(e, t) {
    return function() {
      set(this, e).duration = +t.apply(this, arguments);
    };
  }
  function durationConstant(e, t) {
    return t = +t, function() {
      set(this, e).duration = t;
    };
  }
  function transition_duration(e) {
    var t = this._id;
    return arguments.length ? this.each((typeof e == "function" ? durationFunction : durationConstant)(t, e)) : get(this.node(), t).duration;
  }
  function easeConstant(e, t) {
    if (typeof t != "function") throw new Error();
    return function() {
      set(this, e).ease = t;
    };
  }
  function transition_ease(e) {
    var t = this._id;
    return arguments.length ? this.each(easeConstant(t, e)) : get(this.node(), t).ease;
  }
  function easeVarying(e, t) {
    return function() {
      var r = t.apply(this, arguments);
      if (typeof r != "function") throw new Error();
      set(this, e).ease = r;
    };
  }
  function transition_easeVarying(e) {
    if (typeof e != "function") throw new Error();
    return this.each(easeVarying(this._id, e));
  }
  function transition_filter(e) {
    typeof e != "function" && (e = matcher(e));
    for (var t = this._groups, r = t.length, n = new Array(r), l = 0; l < r; ++l) for (var s = t[l], u = s.length, d = n[l] = [], h, f = 0; f < u; ++f) (h = s[f]) && e.call(h, h.__data__, f, s) && d.push(h);
    return new Transition(n, this._parents, this._name, this._id);
  }
  function transition_merge(e) {
    if (e._id !== this._id) throw new Error();
    for (var t = this._groups, r = e._groups, n = t.length, l = r.length, s = Math.min(n, l), u = new Array(n), d = 0; d < s; ++d) for (var h = t[d], f = r[d], o = h.length, p = u[d] = new Array(o), y, g = 0; g < o; ++g) (y = h[g] || f[g]) && (p[g] = y);
    for (; d < n; ++d) u[d] = t[d];
    return new Transition(u, this._parents, this._name, this._id);
  }
  function start(e) {
    return (e + "").trim().split(/^|\s+/).every(function(t) {
      var r = t.indexOf(".");
      return r >= 0 && (t = t.slice(0, r)), !t || t === "start";
    });
  }
  function onFunction(e, t, r) {
    var n, l, s = start(t) ? init : set;
    return function() {
      var u = s(this, e), d = u.on;
      d !== n && (l = (n = d).copy()).on(t, r), u.on = l;
    };
  }
  function transition_on(e, t) {
    var r = this._id;
    return arguments.length < 2 ? get(this.node(), r).on.on(e) : this.each(onFunction(r, e, t));
  }
  function removeFunction(e) {
    return function() {
      var t = this.parentNode;
      for (var r in this.__transition) if (+r !== e) return;
      t && t.removeChild(this);
    };
  }
  function transition_remove() {
    return this.on("end.remove", removeFunction(this._id));
  }
  function transition_select(e) {
    var t = this._name, r = this._id;
    typeof e != "function" && (e = selector(e));
    for (var n = this._groups, l = n.length, s = new Array(l), u = 0; u < l; ++u) for (var d = n[u], h = d.length, f = s[u] = new Array(h), o, p, y = 0; y < h; ++y) (o = d[y]) && (p = e.call(o, o.__data__, y, d)) && ("__data__" in o && (p.__data__ = o.__data__), f[y] = p, schedule(f[y], t, r, y, f, get(o, r)));
    return new Transition(s, this._parents, t, r);
  }
  function transition_selectAll(e) {
    var t = this._name, r = this._id;
    typeof e != "function" && (e = selectorAll(e));
    for (var n = this._groups, l = n.length, s = [], u = [], d = 0; d < l; ++d) for (var h = n[d], f = h.length, o, p = 0; p < f; ++p) if (o = h[p]) {
      for (var y = e.call(o, o.__data__, p, h), g, v = get(o, r), c = 0, m = y.length; c < m; ++c) (g = y[c]) && schedule(g, t, r, c, y, v);
      s.push(y), u.push(o);
    }
    return new Transition(s, u, t, r);
  }
  var Selection = selection.prototype.constructor;
  function transition_selection() {
    return new Selection(this._groups, this._parents);
  }
  function styleNull(e, t) {
    var r, n, l;
    return function() {
      var s = styleValue(this, e), u = (this.style.removeProperty(e), styleValue(this, e));
      return s === u ? null : s === r && u === n ? l : l = t(r = s, n = u);
    };
  }
  function styleRemove(e) {
    return function() {
      this.style.removeProperty(e);
    };
  }
  function styleConstant(e, t, r) {
    var n, l = r + "", s;
    return function() {
      var u = styleValue(this, e);
      return u === l ? null : u === n ? s : s = t(n = u, r);
    };
  }
  function styleFunction(e, t, r) {
    var n, l, s;
    return function() {
      var u = styleValue(this, e), d = r(this), h = d + "";
      return d == null && (h = d = (this.style.removeProperty(e), styleValue(this, e))), u === h ? null : u === n && h === l ? s : (l = h, s = t(n = u, d));
    };
  }
  function styleMaybeRemove(e, t) {
    var r, n, l, s = "style." + t, u = "end." + s, d;
    return function() {
      var h = set(this, e), f = h.on, o = h.value[s] == null ? d || (d = styleRemove(t)) : void 0;
      (f !== r || l !== o) && (n = (r = f).copy()).on(u, l = o), h.on = n;
    };
  }
  function transition_style(e, t, r) {
    var n = (e += "") == "transform" ? interpolateTransformCss : interpolate;
    return t == null ? this.styleTween(e, styleNull(e, n)).on("end.style." + e, styleRemove(e)) : typeof t == "function" ? this.styleTween(e, styleFunction(e, n, tweenValue(this, "style." + e, t))).each(styleMaybeRemove(this._id, e)) : this.styleTween(e, styleConstant(e, n, t), r).on("end.style." + e, null);
  }
  function styleInterpolate(e, t, r) {
    return function(n) {
      this.style.setProperty(e, t.call(this, n), r);
    };
  }
  function styleTween(e, t, r) {
    var n, l;
    function s() {
      var u = t.apply(this, arguments);
      return u !== l && (n = (l = u) && styleInterpolate(e, u, r)), n;
    }
    return s._value = t, s;
  }
  function transition_styleTween(e, t, r) {
    var n = "style." + (e += "");
    if (arguments.length < 2) return (n = this.tween(n)) && n._value;
    if (t == null) return this.tween(n, null);
    if (typeof t != "function") throw new Error();
    return this.tween(n, styleTween(e, t, r ?? ""));
  }
  function textConstant(e) {
    return function() {
      this.textContent = e;
    };
  }
  function textFunction(e) {
    return function() {
      var t = e(this);
      this.textContent = t ?? "";
    };
  }
  function transition_text(e) {
    return this.tween("text", typeof e == "function" ? textFunction(tweenValue(this, "text", e)) : textConstant(e == null ? "" : e + ""));
  }
  function textInterpolate(e) {
    return function(t) {
      this.textContent = e.call(this, t);
    };
  }
  function textTween(e) {
    var t, r;
    function n() {
      var l = e.apply(this, arguments);
      return l !== r && (t = (r = l) && textInterpolate(l)), t;
    }
    return n._value = e, n;
  }
  function transition_textTween(e) {
    var t = "text";
    if (arguments.length < 1) return (t = this.tween(t)) && t._value;
    if (e == null) return this.tween(t, null);
    if (typeof e != "function") throw new Error();
    return this.tween(t, textTween(e));
  }
  function transition_transition() {
    for (var e = this._name, t = this._id, r = newId(), n = this._groups, l = n.length, s = 0; s < l; ++s) for (var u = n[s], d = u.length, h, f = 0; f < d; ++f) if (h = u[f]) {
      var o = get(h, t);
      schedule(h, e, r, f, u, {
        time: o.time + o.delay + o.duration,
        delay: 0,
        duration: o.duration,
        ease: o.ease
      });
    }
    return new Transition(n, this._parents, e, r);
  }
  function transition_end() {
    var e, t, r = this, n = r._id, l = r.size();
    return new Promise(function(s, u) {
      var d = {
        value: u
      }, h = {
        value: function() {
          --l === 0 && s();
        }
      };
      r.each(function() {
        var f = set(this, n), o = f.on;
        o !== e && (t = (e = o).copy(), t._.cancel.push(d), t._.interrupt.push(d), t._.end.push(h)), f.on = t;
      }), l === 0 && s();
    });
  }
  var id = 0;
  function Transition(e, t, r, n) {
    this._groups = e, this._parents = t, this._name = r, this._id = n;
  }
  function newId() {
    return ++id;
  }
  var selection_prototype = selection.prototype;
  Transition.prototype = {
    constructor: Transition,
    select: transition_select,
    selectAll: transition_selectAll,
    selectChild: selection_prototype.selectChild,
    selectChildren: selection_prototype.selectChildren,
    filter: transition_filter,
    merge: transition_merge,
    selection: transition_selection,
    transition: transition_transition,
    call: selection_prototype.call,
    nodes: selection_prototype.nodes,
    node: selection_prototype.node,
    size: selection_prototype.size,
    empty: selection_prototype.empty,
    each: selection_prototype.each,
    on: transition_on,
    attr: transition_attr,
    attrTween: transition_attrTween,
    style: transition_style,
    styleTween: transition_styleTween,
    text: transition_text,
    textTween: transition_textTween,
    remove: transition_remove,
    tween: transition_tween,
    delay: transition_delay,
    duration: transition_duration,
    ease: transition_ease,
    easeVarying: transition_easeVarying,
    end: transition_end,
    [Symbol.iterator]: selection_prototype[Symbol.iterator]
  };
  function cubicInOut(e) {
    return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
  }
  var defaultTiming = {
    time: null,
    delay: 0,
    duration: 250,
    ease: cubicInOut
  };
  function inherit(e, t) {
    for (var r; !(r = e.__transition) || !(r = r[t]); ) if (!(e = e.parentNode)) throw new Error(`transition ${t} not found`);
    return r;
  }
  function selection_transition(e) {
    var t, r;
    e instanceof Transition ? (t = e._id, e = e._name) : (t = newId(), (r = defaultTiming).time = now(), e = e == null ? null : e + "");
    for (var n = this._groups, l = n.length, s = 0; s < l; ++s) for (var u = n[s], d = u.length, h, f = 0; f < d; ++f) (h = u[f]) && schedule(h, e, t, f, u, r || inherit(h, t));
    return new Transition(n, this._parents, e, t);
  }
  selection.prototype.interrupt = selection_interrupt;
  selection.prototype.transition = selection_transition;
  function formatDecimal(e) {
    return Math.abs(e = Math.round(e)) >= 1e21 ? e.toLocaleString("en").replace(/,/g, "") : e.toString(10);
  }
  function formatDecimalParts(e, t) {
    if ((r = (e = t ? e.toExponential(t - 1) : e.toExponential()).indexOf("e")) < 0) return null;
    var r, n = e.slice(0, r);
    return [
      n.length > 1 ? n[0] + n.slice(2) : n,
      +e.slice(r + 1)
    ];
  }
  function exponent(e) {
    return e = formatDecimalParts(Math.abs(e)), e ? e[1] : NaN;
  }
  function formatGroup(e, t) {
    return function(r, n) {
      for (var l = r.length, s = [], u = 0, d = e[0], h = 0; l > 0 && d > 0 && (h + d + 1 > n && (d = Math.max(1, n - h)), s.push(r.substring(l -= d, l + d)), !((h += d + 1) > n)); ) d = e[u = (u + 1) % e.length];
      return s.reverse().join(t);
    };
  }
  function formatNumerals(e) {
    return function(t) {
      return t.replace(/[0-9]/g, function(r) {
        return e[+r];
      });
    };
  }
  var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
  function formatSpecifier(e) {
    if (!(t = re.exec(e))) throw new Error("invalid format: " + e);
    var t;
    return new FormatSpecifier({
      fill: t[1],
      align: t[2],
      sign: t[3],
      symbol: t[4],
      zero: t[5],
      width: t[6],
      comma: t[7],
      precision: t[8] && t[8].slice(1),
      trim: t[9],
      type: t[10]
    });
  }
  formatSpecifier.prototype = FormatSpecifier.prototype;
  function FormatSpecifier(e) {
    this.fill = e.fill === void 0 ? " " : e.fill + "", this.align = e.align === void 0 ? ">" : e.align + "", this.sign = e.sign === void 0 ? "-" : e.sign + "", this.symbol = e.symbol === void 0 ? "" : e.symbol + "", this.zero = !!e.zero, this.width = e.width === void 0 ? void 0 : +e.width, this.comma = !!e.comma, this.precision = e.precision === void 0 ? void 0 : +e.precision, this.trim = !!e.trim, this.type = e.type === void 0 ? "" : e.type + "";
  }
  FormatSpecifier.prototype.toString = function() {
    return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
  };
  function formatTrim(e) {
    e: for (var t = e.length, r = 1, n = -1, l; r < t; ++r) switch (e[r]) {
      case ".":
        n = l = r;
        break;
      case "0":
        n === 0 && (n = r), l = r;
        break;
      default:
        if (!+e[r]) break e;
        n > 0 && (n = 0);
        break;
    }
    return n > 0 ? e.slice(0, n) + e.slice(l + 1) : e;
  }
  var prefixExponent;
  function formatPrefixAuto(e, t) {
    var r = formatDecimalParts(e, t);
    if (!r) return e + "";
    var n = r[0], l = r[1], s = l - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(l / 3))) * 3) + 1, u = n.length;
    return s === u ? n : s > u ? n + new Array(s - u + 1).join("0") : s > 0 ? n.slice(0, s) + "." + n.slice(s) : "0." + new Array(1 - s).join("0") + formatDecimalParts(e, Math.max(0, t + s - 1))[0];
  }
  function formatRounded(e, t) {
    var r = formatDecimalParts(e, t);
    if (!r) return e + "";
    var n = r[0], l = r[1];
    return l < 0 ? "0." + new Array(-l).join("0") + n : n.length > l + 1 ? n.slice(0, l + 1) + "." + n.slice(l + 1) : n + new Array(l - n.length + 2).join("0");
  }
  const formatTypes = {
    "%": (e, t) => (e * 100).toFixed(t),
    b: (e) => Math.round(e).toString(2),
    c: (e) => e + "",
    d: formatDecimal,
    e: (e, t) => e.toExponential(t),
    f: (e, t) => e.toFixed(t),
    g: (e, t) => e.toPrecision(t),
    o: (e) => Math.round(e).toString(8),
    p: (e, t) => formatRounded(e * 100, t),
    r: formatRounded,
    s: formatPrefixAuto,
    X: (e) => Math.round(e).toString(16).toUpperCase(),
    x: (e) => Math.round(e).toString(16)
  };
  function identity$1(e) {
    return e;
  }
  var map = Array.prototype.map, prefixes = [
    "y",
    "z",
    "a",
    "f",
    "p",
    "n",
    "\xB5",
    "m",
    "",
    "k",
    "M",
    "G",
    "T",
    "P",
    "E",
    "Z",
    "Y"
  ];
  function formatLocale(e) {
    var t = e.grouping === void 0 || e.thousands === void 0 ? identity$1 : formatGroup(map.call(e.grouping, Number), e.thousands + ""), r = e.currency === void 0 ? "" : e.currency[0] + "", n = e.currency === void 0 ? "" : e.currency[1] + "", l = e.decimal === void 0 ? "." : e.decimal + "", s = e.numerals === void 0 ? identity$1 : formatNumerals(map.call(e.numerals, String)), u = e.percent === void 0 ? "%" : e.percent + "", d = e.minus === void 0 ? "\u2212" : e.minus + "", h = e.nan === void 0 ? "NaN" : e.nan + "";
    function f(p) {
      p = formatSpecifier(p);
      var y = p.fill, g = p.align, v = p.sign, c = p.symbol, m = p.zero, _ = p.width, x = p.comma, S = p.precision, E = p.trim, w = p.type;
      w === "n" ? (x = true, w = "g") : formatTypes[w] || (S === void 0 && (S = 12), E = true, w = "g"), (m || y === "0" && g === "=") && (m = true, y = "0", g = "=");
      var C = c === "$" ? r : c === "#" && /[boxX]/.test(w) ? "0" + w.toLowerCase() : "", D = c === "$" ? n : /[%p]/.test(w) ? u : "", A = formatTypes[w], F = /[defgprs%]/.test(w);
      S = S === void 0 ? 6 : /[gprs]/.test(w) ? Math.max(1, Math.min(21, S)) : Math.max(0, Math.min(20, S));
      function B(N) {
        var I = C, O = D, L, q, z;
        if (w === "c") O = A(N) + O, N = "";
        else {
          N = +N;
          var G = N < 0 || 1 / N < 0;
          if (N = isNaN(N) ? h : A(Math.abs(N), S), E && (N = formatTrim(N)), G && +N == 0 && v !== "+" && (G = false), I = (G ? v === "(" ? v : d : v === "-" || v === "(" ? "" : v) + I, O = (w === "s" ? prefixes[8 + prefixExponent / 3] : "") + O + (G && v === "(" ? ")" : ""), F) {
            for (L = -1, q = N.length; ++L < q; ) if (z = N.charCodeAt(L), 48 > z || z > 57) {
              O = (z === 46 ? l + N.slice(L + 1) : N.slice(L)) + O, N = N.slice(0, L);
              break;
            }
          }
        }
        x && !m && (N = t(N, 1 / 0));
        var J = I.length + N.length + O.length, Z = J < _ ? new Array(_ - J + 1).join(y) : "";
        switch (x && m && (N = t(Z + N, Z.length ? _ - O.length : 1 / 0), Z = ""), g) {
          case "<":
            N = I + N + O + Z;
            break;
          case "=":
            N = I + Z + N + O;
            break;
          case "^":
            N = Z.slice(0, J = Z.length >> 1) + I + N + O + Z.slice(J);
            break;
          default:
            N = Z + I + N + O;
            break;
        }
        return s(N);
      }
      return B.toString = function() {
        return p + "";
      }, B;
    }
    function o(p, y) {
      var g = f((p = formatSpecifier(p), p.type = "f", p)), v = Math.max(-8, Math.min(8, Math.floor(exponent(y) / 3))) * 3, c = Math.pow(10, -v), m = prefixes[8 + v / 3];
      return function(_) {
        return g(c * _) + m;
      };
    }
    return {
      format: f,
      formatPrefix: o
    };
  }
  var locale, format, formatPrefix;
  defaultLocale({
    thousands: ",",
    grouping: [
      3
    ],
    currency: [
      "$",
      ""
    ]
  });
  function defaultLocale(e) {
    return locale = formatLocale(e), format = locale.format, formatPrefix = locale.formatPrefix, locale;
  }
  function precisionFixed(e) {
    return Math.max(0, -exponent(Math.abs(e)));
  }
  function precisionPrefix(e, t) {
    return Math.max(0, Math.max(-8, Math.min(8, Math.floor(exponent(t) / 3))) * 3 - exponent(Math.abs(e)));
  }
  function precisionRound(e, t) {
    return e = Math.abs(e), t = Math.abs(t) - e, Math.max(0, exponent(t) - exponent(e)) + 1;
  }
  function initRange(e, t) {
    switch (arguments.length) {
      case 0:
        break;
      case 1:
        this.range(e);
        break;
      default:
        this.range(t).domain(e);
        break;
    }
    return this;
  }
  function initInterpolator(e, t) {
    switch (arguments.length) {
      case 0:
        break;
      case 1: {
        typeof e == "function" ? this.interpolator(e) : this.range(e);
        break;
      }
      default: {
        this.domain(e), typeof t == "function" ? this.interpolator(t) : this.range(t);
        break;
      }
    }
    return this;
  }
  const implicit = Symbol("implicit");
  function ordinal() {
    var e = new InternMap(), t = [], r = [], n = implicit;
    function l(s) {
      let u = e.get(s);
      if (u === void 0) {
        if (n !== implicit) return n;
        e.set(s, u = t.push(s) - 1);
      }
      return r[u % r.length];
    }
    return l.domain = function(s) {
      if (!arguments.length) return t.slice();
      t = [], e = new InternMap();
      for (const u of s) e.has(u) || e.set(u, t.push(u) - 1);
      return l;
    }, l.range = function(s) {
      return arguments.length ? (r = Array.from(s), l) : r.slice();
    }, l.unknown = function(s) {
      return arguments.length ? (n = s, l) : n;
    }, l.copy = function() {
      return ordinal(t, r).unknown(n);
    }, initRange.apply(l, arguments), l;
  }
  function band() {
    var e = ordinal().unknown(void 0), t = e.domain, r = e.range, n = 0, l = 1, s, u, d = false, h = 0, f = 0, o = 0.5;
    delete e.unknown;
    function p() {
      var y = t().length, g = l < n, v = g ? l : n, c = g ? n : l;
      s = (c - v) / Math.max(1, y - h + f * 2), d && (s = Math.floor(s)), v += (c - v - s * (y - h)) * o, u = s * (1 - h), d && (v = Math.round(v), u = Math.round(u));
      var m = range(y).map(function(_) {
        return v + s * _;
      });
      return r(g ? m.reverse() : m);
    }
    return e.domain = function(y) {
      return arguments.length ? (t(y), p()) : t();
    }, e.range = function(y) {
      return arguments.length ? ([n, l] = y, n = +n, l = +l, p()) : [
        n,
        l
      ];
    }, e.rangeRound = function(y) {
      return [n, l] = y, n = +n, l = +l, d = true, p();
    }, e.bandwidth = function() {
      return u;
    }, e.step = function() {
      return s;
    }, e.round = function(y) {
      return arguments.length ? (d = !!y, p()) : d;
    }, e.padding = function(y) {
      return arguments.length ? (h = Math.min(1, f = +y), p()) : h;
    }, e.paddingInner = function(y) {
      return arguments.length ? (h = Math.min(1, y), p()) : h;
    }, e.paddingOuter = function(y) {
      return arguments.length ? (f = +y, p()) : f;
    }, e.align = function(y) {
      return arguments.length ? (o = Math.max(0, Math.min(1, y)), p()) : o;
    }, e.copy = function() {
      return band(t(), [
        n,
        l
      ]).round(d).paddingInner(h).paddingOuter(f).align(o);
    }, initRange.apply(p(), arguments);
  }
  function pointish(e) {
    var t = e.copy;
    return e.padding = e.paddingOuter, delete e.paddingInner, delete e.paddingOuter, e.copy = function() {
      return pointish(t());
    }, e;
  }
  function point() {
    return pointish(band.apply(null, arguments).paddingInner(1));
  }
  function constants(e) {
    return function() {
      return e;
    };
  }
  function number(e) {
    return +e;
  }
  var unit = [
    0,
    1
  ];
  function identity(e) {
    return e;
  }
  function normalize(e, t) {
    return (t -= e = +e) ? function(r) {
      return (r - e) / t;
    } : constants(isNaN(t) ? NaN : 0.5);
  }
  function clamper(e, t) {
    var r;
    return e > t && (r = e, e = t, t = r), function(n) {
      return Math.max(e, Math.min(t, n));
    };
  }
  function bimap(e, t, r) {
    var n = e[0], l = e[1], s = t[0], u = t[1];
    return l < n ? (n = normalize(l, n), s = r(u, s)) : (n = normalize(n, l), s = r(s, u)), function(d) {
      return s(n(d));
    };
  }
  function polymap(e, t, r) {
    var n = Math.min(e.length, t.length) - 1, l = new Array(n), s = new Array(n), u = -1;
    for (e[n] < e[0] && (e = e.slice().reverse(), t = t.slice().reverse()); ++u < n; ) l[u] = normalize(e[u], e[u + 1]), s[u] = r(t[u], t[u + 1]);
    return function(d) {
      var h = bisectRight(e, d, 1, n) - 1;
      return s[h](l[h](d));
    };
  }
  function copy$1(e, t) {
    return t.domain(e.domain()).range(e.range()).interpolate(e.interpolate()).clamp(e.clamp()).unknown(e.unknown());
  }
  function transformer$1() {
    var e = unit, t = unit, r = interpolate$1, n, l, s, u = identity, d, h, f;
    function o() {
      var y = Math.min(e.length, t.length);
      return u !== identity && (u = clamper(e[0], e[y - 1])), d = y > 2 ? polymap : bimap, h = f = null, p;
    }
    function p(y) {
      return y == null || isNaN(y = +y) ? s : (h || (h = d(e.map(n), t, r)))(n(u(y)));
    }
    return p.invert = function(y) {
      return u(l((f || (f = d(t, e.map(n), interpolateNumber)))(y)));
    }, p.domain = function(y) {
      return arguments.length ? (e = Array.from(y, number), o()) : e.slice();
    }, p.range = function(y) {
      return arguments.length ? (t = Array.from(y), o()) : t.slice();
    }, p.rangeRound = function(y) {
      return t = Array.from(y), r = interpolateRound, o();
    }, p.clamp = function(y) {
      return arguments.length ? (u = y ? true : identity, o()) : u !== identity;
    }, p.interpolate = function(y) {
      return arguments.length ? (r = y, o()) : r;
    }, p.unknown = function(y) {
      return arguments.length ? (s = y, p) : s;
    }, function(y, g) {
      return n = y, l = g, o();
    };
  }
  function continuous() {
    return transformer$1()(identity, identity);
  }
  function tickFormat(e, t, r, n) {
    var l = tickStep(e, t, r), s;
    switch (n = formatSpecifier(n ?? ",f"), n.type) {
      case "s": {
        var u = Math.max(Math.abs(e), Math.abs(t));
        return n.precision == null && !isNaN(s = precisionPrefix(l, u)) && (n.precision = s), formatPrefix(n, u);
      }
      case "":
      case "e":
      case "g":
      case "p":
      case "r": {
        n.precision == null && !isNaN(s = precisionRound(l, Math.max(Math.abs(e), Math.abs(t)))) && (n.precision = s - (n.type === "e"));
        break;
      }
      case "f":
      case "%": {
        n.precision == null && !isNaN(s = precisionFixed(l)) && (n.precision = s - (n.type === "%") * 2);
        break;
      }
    }
    return format(n);
  }
  function linearish(e) {
    var t = e.domain;
    return e.ticks = function(r) {
      var n = t();
      return ticks(n[0], n[n.length - 1], r ?? 10);
    }, e.tickFormat = function(r, n) {
      var l = t();
      return tickFormat(l[0], l[l.length - 1], r ?? 10, n);
    }, e.nice = function(r) {
      r == null && (r = 10);
      var n = t(), l = 0, s = n.length - 1, u = n[l], d = n[s], h, f, o = 10;
      for (d < u && (f = u, u = d, d = f, f = l, l = s, s = f); o-- > 0; ) {
        if (f = tickIncrement(u, d, r), f === h) return n[l] = u, n[s] = d, t(n);
        if (f > 0) u = Math.floor(u / f) * f, d = Math.ceil(d / f) * f;
        else if (f < 0) u = Math.ceil(u * f) / f, d = Math.floor(d * f) / f;
        else break;
        h = f;
      }
      return e;
    }, e;
  }
  function linear() {
    var e = continuous();
    return e.copy = function() {
      return copy$1(e, linear());
    }, initRange.apply(e, arguments), linearish(e);
  }
  function transformPow(e) {
    return function(t) {
      return t < 0 ? -Math.pow(-t, e) : Math.pow(t, e);
    };
  }
  function transformSqrt(e) {
    return e < 0 ? -Math.sqrt(-e) : Math.sqrt(e);
  }
  function transformSquare(e) {
    return e < 0 ? -e * e : e * e;
  }
  function powish(e) {
    var t = e(identity, identity), r = 1;
    function n() {
      return r === 1 ? e(identity, identity) : r === 0.5 ? e(transformSqrt, transformSquare) : e(transformPow(r), transformPow(1 / r));
    }
    return t.exponent = function(l) {
      return arguments.length ? (r = +l, n()) : r;
    }, linearish(t);
  }
  function pow() {
    var e = powish(transformer$1());
    return e.copy = function() {
      return copy$1(e, pow()).exponent(e.exponent());
    }, initRange.apply(e, arguments), e;
  }
  function sqrt() {
    return pow.apply(null, arguments).exponent(0.5);
  }
  function transformer() {
    var e = 0, t = 1, r, n, l, s, u = identity, d = false, h;
    function f(p) {
      return p == null || isNaN(p = +p) ? h : u(l === 0 ? 0.5 : (p = (s(p) - r) * l, d ? Math.max(0, Math.min(1, p)) : p));
    }
    f.domain = function(p) {
      return arguments.length ? ([e, t] = p, r = s(e = +e), n = s(t = +t), l = r === n ? 0 : 1 / (n - r), f) : [
        e,
        t
      ];
    }, f.clamp = function(p) {
      return arguments.length ? (d = !!p, f) : d;
    }, f.interpolator = function(p) {
      return arguments.length ? (u = p, f) : u;
    };
    function o(p) {
      return function(y) {
        var g, v;
        return arguments.length ? ([g, v] = y, u = p(g, v), f) : [
          u(0),
          u(1)
        ];
      };
    }
    return f.range = o(interpolate$1), f.rangeRound = o(interpolateRound), f.unknown = function(p) {
      return arguments.length ? (h = p, f) : h;
    }, function(p) {
      return s = p, r = p(e), n = p(t), l = r === n ? 0 : 1 / (n - r), f;
    };
  }
  function copy(e, t) {
    return t.domain(e.domain()).interpolator(e.interpolator()).clamp(e.clamp()).unknown(e.unknown());
  }
  function sequential() {
    var e = linearish(transformer()(identity));
    return e.copy = function() {
      return copy(e, sequential());
    }, initInterpolator.apply(e, arguments);
  }
  function colors(e) {
    for (var t = e.length / 6 | 0, r = new Array(t), n = 0; n < t; ) r[n] = "#" + e.slice(n * 6, ++n * 6);
    return r;
  }
  const observable10 = colors("4269d0efb118ff725c6cc5b03ca951ff8ab7a463f297bbf59c6b4e9498a0"), ramp = (e) => rgbBasis(e[e.length - 1]);
  var scheme$4 = new Array(3).concat("deebf79ecae13182bd", "eff3ffbdd7e76baed62171b5", "eff3ffbdd7e76baed63182bd08519c", "eff3ffc6dbef9ecae16baed63182bd08519c", "eff3ffc6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b5084594", "f7fbffdeebf7c6dbef9ecae16baed64292c62171b508519c08306b").map(colors);
  const Blues = ramp(scheme$4);
  var scheme$3 = new Array(3).concat("e5f5e0a1d99b31a354", "edf8e9bae4b374c476238b45", "edf8e9bae4b374c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47631a354006d2c", "edf8e9c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45005a32", "f7fcf5e5f5e0c7e9c0a1d99b74c47641ab5d238b45006d2c00441b").map(colors);
  const Greens = ramp(scheme$3);
  var scheme$2 = new Array(3).concat("efedf5bcbddc756bb1", "f2f0f7cbc9e29e9ac86a51a3", "f2f0f7cbc9e29e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8756bb154278f", "f2f0f7dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a34a1486", "fcfbfdefedf5dadaebbcbddc9e9ac8807dba6a51a354278f3f007d").map(colors);
  const Purples = ramp(scheme$2);
  var scheme$1 = new Array(3).concat("fee0d2fc9272de2d26", "fee5d9fcae91fb6a4acb181d", "fee5d9fcae91fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4ade2d26a50f15", "fee5d9fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181d99000d", "fff5f0fee0d2fcbba1fc9272fb6a4aef3b2ccb181da50f1567000d").map(colors);
  const Reds = ramp(scheme$1);
  var scheme = new Array(3).concat("fee6cefdae6be6550d", "feeddefdbe85fd8d3cd94701", "feeddefdbe85fd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3ce6550da63603", "feeddefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d948018c2d04", "fff5ebfee6cefdd0a2fdae6bfd8d3cf16913d94801a636037f2704").map(colors);
  const Oranges = ramp(scheme);
  function Transform(e, t, r) {
    this.k = e, this.x = t, this.y = r;
  }
  Transform.prototype = {
    constructor: Transform,
    scale: function(e) {
      return e === 1 ? this : new Transform(this.k * e, this.x, this.y);
    },
    translate: function(e, t) {
      return e === 0 & t === 0 ? this : new Transform(this.k, this.x + this.k * e, this.y + this.k * t);
    },
    apply: function(e) {
      return [
        e[0] * this.k + this.x,
        e[1] * this.k + this.y
      ];
    },
    applyX: function(e) {
      return e * this.k + this.x;
    },
    applyY: function(e) {
      return e * this.k + this.y;
    },
    invert: function(e) {
      return [
        (e[0] - this.x) / this.k,
        (e[1] - this.y) / this.k
      ];
    },
    invertX: function(e) {
      return (e - this.x) / this.k;
    },
    invertY: function(e) {
      return (e - this.y) / this.k;
    },
    rescaleX: function(e) {
      return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
    },
    rescaleY: function(e) {
      return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
    },
    toString: function() {
      return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
    }
  };
  Transform.prototype;
  var html;
  ((e) => {
    function t(I, O = [], L = {}) {
      if (Object.assign(I, L ?? {}), "data" in L && L.data !== void 0 && L.data.forEach((q) => I.setAttribute(q[0], q[1])), "style" in L && L.style !== void 0) for (const [q, z] of Object.entries(L.style)) I.style[q] = `${z}`;
      if ("class" in L && L.class !== void 0) {
        if (typeof L.class == "string" && L.class !== "") I.classList.add(L.class);
        else if (Array.isArray(L.class)) for (const q of L.class) typeof q == "string" && q !== "" && I.classList.add(q);
      }
      O !== void 0 && I.append(...Array.isArray(O) ? O : [
        O
      ]);
    }
    e.el_helper = t;
    function r(I, O = [], L = {}) {
      const q = document.createElement(I);
      return t(q, O, L), q;
    }
    e.el = r;
    function n(I, O = [], L = {}) {
      const q = document.createElementNS("http://www.w3.org/2000/svg", I);
      return t(q, O, L), q;
    }
    e.svg_el = n;
    function l(I = [], O = {}) {
      return r("div", I, O);
    }
    e.div = l;
    function s(I = [], O = {}) {
      return r("span", I, O);
    }
    e.span = s;
    function u(I = 512, O = 512, L = {}) {
      return r("canvas", [], {
        ...L,
        width: I.toString(),
        height: O.toString()
      });
    }
    e.canvas = u;
    function d(I = "text", O = {}) {
      return r("input", [], {
        ...O,
        type: I
      });
    }
    e.input = d;
    function h(I, O = {}) {
      return r("button", I, O);
    }
    e.button = h;
    function f(I, O = {}) {
      return e.el("select", I.map((L) => e.el("option", L, {
        value: L
      })), O);
    }
    e.select = f;
    function o(I = [], O = {}) {
      return n("svg", I, O);
    }
    e.svg = o;
    function p(I = [], O = {}) {
      return n("g", I, O);
    }
    e.svg_group = p;
    function y(I = [], O = {}) {
      return n("clipPath", I, O);
    }
    e.svg_clip_path = y;
    function g(I = [], O = {}) {
      return n("defs", I, O);
    }
    e.svg_defs = g;
    function v(I, O, L = {}) {
      var _a, _b;
      const q = p([], L), z = select(q), G = L.n_ticks ?? 2, J = 2;
      let Z;
      I === "top" ? Z = axisTop(O) : I === "right" ? Z = axisRight(O) : I === "bottom" ? Z = axisBottom(O) : Z = axisLeft(O);
      const ae = format("d"), de = format(".2~s"), T = format(".2~f"), R = (M) => Math.abs(M) < 1 ? T(M) : de(M), k = O.domain();
      let X = (_b = (_a = Z.scale()).ticks) == null ? void 0 : _b.call(_a, G);
      X = Array.from(/* @__PURE__ */ new Set([
        k[0],
        ...X,
        k[1]
      ])), G === 2 && (X = [
        k[0],
        k[1]
      ]), L.tick_values && (X = L.tick_values);
      const Y = Array.isArray(X) && X.length > 0 && X.every((M) => Number.isFinite(M) && Number.isInteger(M)) && min$1(X) >= 1800 && max$1(X) <= 2200, K = (M) => Y ? ae(M) : R(M);
      return z.call(Z.tickValues(X).tickFormat(K).tickSize(J)), q;
    }
    e.d3_axis_linear = v;
    function c(I, O, L = {}, q = {}) {
      const z = p([], L), G = select(z);
      let J;
      return I === "top" ? J = axisTop(O) : I === "right" ? J = axisRight(O) : I === "bottom" ? J = axisBottom(O) : J = axisLeft(O), q.show_label ? G.call(J.tickSizeOuter(0)) : G.call(J.tickSizeOuter(0).tickValues([])), z;
    }
    e.d3_axis_point = c;
    function m(I = 2, O = 0, L = 0, q = {}) {
      const z = n("circle", [], q);
      return z.setAttribute("r", I.toString()), z.setAttribute("cx", O.toString()), z.setAttribute("cy", L.toString()), z;
    }
    e.svg_circle = m;
    function _(I = 0, O = 0, L = 0, q = 0, z = {}) {
      const G = n("rect", [], z);
      return G.setAttribute("width", I.toString()), G.setAttribute("height", O.toString()), G.setAttribute("rx", L.toString()), G.setAttribute("ry", q.toString()), G;
    }
    e.svg_rect = _;
    function x(I, O, L, q, z = {}) {
      const G = n("line", [], z);
      return G.setAttribute("x1", I.toString()), G.setAttribute("y1", O.toString()), G.setAttribute("x2", L.toString()), G.setAttribute("y2", q.toString()), G;
    }
    e.svg_line = x;
    function S(I = "", O = {}) {
      const L = n("path", [], O);
      return L.setAttribute("d", I), L;
    }
    e.svg_path = S;
    function E(I = [], O = {}) {
      const L = n("text", I, O);
      return L.setAttribute("dominant-baseline", "hanging"), L;
    }
    e.svg_text = E;
    function w(I, O, L) {
      const q = l(O, {
        ...L
      });
      return q.classList.add("stack", `stack-${I}`), q;
    }
    e.stack = w;
    function C(I, O = {}) {
      return w("horizontal", I, O);
    }
    e.hstack = C;
    function D(I, O = {}) {
      return w("vertical", I, O);
    }
    e.vstack = D;
    function A(I, O, L, q = {}) {
      const z = l([], {
        class: "resizable-stack-handle"
      });
      let G = q.initial_lhs_size ?? 200;
      L.style.flexGrow = "1";
      const J = (ae) => {
        I === "horizontal" ? O.style.width = `${ae}px` : O.style.width = `${ae}px`;
      };
      J(G), setup_drag(z, {
        on_drag: (ae) => {
          G += ae, J(G);
        }
      });
      const Z = l([
        O,
        z,
        L
      ], q);
      return Z.classList.add("resizable-stack", `resizable-stack-${I}`), Z;
    }
    e.resizable_stack = A;
    function F(I, O, L = {}) {
      return A("horizontal", I, O, L);
    }
    e.resizable_hstack = F;
    function B(I, O, L = {}) {
      return A("vertical", I, O, L);
    }
    e.resizable_vstack = B;
    function N(I, O = {}) {
      const L = l(I.map((G, J) => l(G[0], {
        onclick: () => q(J)
      })), {
        class: "tabs-toggles"
      }), q = (G) => {
        const J = [
          ...L.children
        ];
        I[G][1].classList.add("tabs-active"), I.filter((Z, ae) => ae !== G).forEach((Z) => Z[1].classList.remove("tabs-active")), J[G].classList.add("tabs-active"), J.filter((Z, ae) => ae !== G).forEach((Z) => Z.classList.remove("tabs-active"));
      };
      q(O.default_active ?? 0);
      const z = l([
        L,
        l(I.map((G) => G[1]), {
          class: "tabs-panes"
        })
      ], O);
      return z.classList.add("tabs"), z;
    }
    e.tabs = N;
  })(html || (html = {}));
  function assert(e, t) {
    if (!e) throw new Error(t ?? "Assertion failed");
  }
  function remap(e, t, r, n, l) {
    return n + (l - n) * ((e - t) / (r - t));
  }
  function minarg(e) {
    let t = -1, r = 1 / 0;
    for (let n = 0; n < e.length; n++) e[n] < r && (t = n, r = e[n]);
    return t;
  }
  function setup_drag(e, t = {}) {
    let r = 0, n = 0, l = false;
    const s = (h) => {
      var _a;
      l && ((_a = t.on_drag) == null ? void 0 : _a.call(t, h.x - r, h.y - n, h)), r = h.x, n = h.y;
    }, u = (h) => {
      var _a;
      l || (l = true, (_a = t.on_begin_drag) == null ? void 0 : _a.call(t, h), e.classList.add("being-dragged"));
    }, d = (h) => {
      var _a;
      l && (l = false, (_a = t.on_release_drag) == null ? void 0 : _a.call(t, h), e.classList.remove("being-dragged"));
    };
    return document.body.addEventListener("mousemove", s), document.body.addEventListener("mouseup", d), e.addEventListener("mousedown", u), {
      mousedown: u,
      mousemove: s,
      mouseup: d
    };
  }
  function remove_drag(e, t) {
    document.body.removeEventListener("mousemove", t.mousemove), document.body.removeEventListener("mouseup", t.mouseup), e.removeEventListener("mousedown", t.mousedown);
  }
  let get_text_width_canvas;
  const get_text_width_cache = {};
  function get_text_width(e, t) {
    const r = JSON.stringify({
      text: e,
      font: t
    });
    if (r in get_text_width_cache) return get_text_width_cache[r];
    get_text_width_canvas = get_text_width_canvas ?? document.createElement("canvas"), assert(get_text_width_canvas !== void 0);
    const n = get_text_width_canvas.getContext("2d");
    n.font = t;
    const l = n.measureText(e);
    return get_text_width_cache[r] = l.width, l.width;
  }
  function get_bbox_union(e) {
    const t = Math.min(...e.map((s) => s.x)), r = Math.min(...e.map((s) => s.y)), n = Math.max(...e.map((s) => s.x + s.width)) - t, l = Math.max(...e.map((s) => s.y + s.height)) - r;
    return {
      x: t,
      y: r,
      width: n,
      height: l
    };
  }
  function assert_never(e, t) {
    throw new Error(`Reached unreachable code: unexpected value ${e}`);
  }
  function merge_into_via_equality(e, t, r) {
    for (const n of e) t.some((l) => r(n, l)) || t.push(n);
  }
  function contains_via_equality(e, t, r) {
    return e.some((n) => r(t, n));
  }
  function truthy(e) {
    return !!e;
  }
  async function parse_csv_from_url(e) {
    return parse_csv(await (await fetch(e)).text());
  }
  function parse_csv(e) {
    const t = [];
    let r = false;
    for (let s = 0, u = 0, d = 0; d < e.length; d++) {
      const h = e[d], f = e[d + 1];
      if (t[s] = t[s] || [], t[s][u] = t[s][u] || "", h == '"' && r && f == '"') {
        t[s][u] += h, ++d;
        continue;
      }
      if (h == '"') {
        r = !r;
        continue;
      }
      if (h == "," && !r) {
        ++u;
        continue;
      }
      if (h == "\r" && f == `
` && !r) {
        ++s, u = 0, ++d;
        continue;
      }
      if (h == `
` && !r) {
        ++s, u = 0;
        continue;
      }
      if (h == "\r" && !r) {
        ++s, u = 0;
        continue;
      }
      t[s][u] += h;
    }
    const n = t[0], l = t.slice(1).map((s) => [
      ...s.map((u) => isNaN(parseFloat(u)) ? u : parseFloat(u))
    ]);
    return {
      columns: n,
      rows: l
    };
  }
  function get_tag_id() {
    return Math.random().toString();
  }
  function sum(e) {
    return e.reduce((t, r) => t + r, 0);
  }
  function average(e) {
    return sum(e) / e.length;
  }
  function max(e) {
    return e.reduce((t, r) => Math.max(t, r), -1 / 0);
  }
  function min(e) {
    return e.reduce((t, r) => Math.min(t, r), 1 / 0);
  }
  function tag_error(e) {
    return {
      type: "Error",
      id: get_tag_id(),
      error: e instanceof Error ? e : new Error(`${e}`)
    };
  }
  function replace_data(e, t) {
    for (const r in e) delete e[r];
    Object.assign(e, t);
  }
  function remove_nodes_by_id(e, t) {
    if (t.includes(e.id)) throw new Error("can't remove root node");
    "items" in e ? (e.items = e.items.filter(({ id: r }) => !t.includes(r)), e.items.forEach((r) => remove_nodes_by_id(r, t))) : e.type === "Error" || e.type === "Mark" || assert_never(e);
  }
  function is_seam_step(e) {
    return typeof e == "object" && "seam_step" in e;
  }
  function path_step_equal(e, t) {
    return e === t || is_seam_step(e) && is_seam_step(t) && e.type === t.type && e.index === t.index;
  }
  function path_equal(e, t) {
    return e.length === t.length && e.every((r, n) => path_step_equal(r, t[n]));
  }
  function get_dap_data(e) {
    if (e.type === "data") return e.data;
    if (e.type === "seam") return;
    assert_never(e);
  }
  function take_path_step(e, t) {
    if (e.type === "data") {
      const r = [
        ...e.path,
        t
      ];
      if (is_seam_step(t)) return {
        path: r,
        type: "seam",
        parent_data: e.data,
        index: t.index
      };
      let n = take_path_step_raw(e.data, t);
      return n && {
        path: r,
        type: "data",
        data: n
      };
    } else {
      if (e.type === "seam") return;
      assert_never(e);
    }
  }
  function is_data_dap(e) {
    return e.type === "data";
  }
  function take_path_step_raw(e, t) {
    if (e.type === "Table" && typeof t == "string") return find_col_by_name(e, t);
    if ("items" in e) return typeof t != "number" ? void 0 : e.items[t];
    if (e.type === "Error" || e.type === "Mark") return;
    assert_never(e);
  }
  function find_all_cols(e) {
    if (e.type === "PlotView") return [
      e.points
    ];
    if (e.type === "OverlayView") return e.items.flatMap(find_all_cols);
    if (e.type === "Col") return [
      e
    ];
    if (e.type === "Table") return e.items.flatMap(find_all_cols);
    if (e.type === "Error" || e.type === "Mark") return [];
    assert_never(e);
  }
  function find_col_by_name(e, t) {
    if (e.type === "Col" && e.name === t) return e;
    if ("items" in e) for (let r of e.items) {
      const n = find_col_by_name(r, t);
      if (n) return n;
    }
  }
  function is_wildcard(e) {
    return typeof e == "object" && "wildcard" in e && e.wildcard;
  }
  const wildcard = {
    wildcard: true
  };
  function is_path_step(e) {
    return !is_wildcard(e);
  }
  function take_pattern_step_without_filters(e, t) {
    if (e.type === "seam") return [];
    if (is_wildcard(t)) return "items" in e.data ? e.data.items.map((n, l) => ({
      path: [
        ...e.path,
        l
      ],
      type: "data",
      data: n
    })) : [];
    const r = take_path_step(e, t);
    return r ? [
      r
    ] : [];
  }
  function has_some_tag(e) {
    return Object.keys(e.tags).length > 0;
  }
  function set_tag(e, t, r) {
    r ? e.tags[t] = true : delete e.tags[t];
  }
  function take_selection_edge(e, t) {
    return take_pattern_step_without_filters(e, t.pattern_step).filter(({ path: n }) => !t.child.excluded_paths.some((l) => path_equal(n, l)));
  }
  function root_daps(e, t) {
    return contains_via_equality(e.excluded_paths, [], path_equal) ? [] : [
      {
        path: [],
        type: "data",
        data: t
      }
    ];
  }
  function empty_selection() {
    return {
      edges: [],
      excluded_paths: [],
      tags: {}
    };
  }
  const empty_provider = {
    init: () => ({}),
    take_edge: (e) => e
  }, daps_provider = (e) => ({
    init: (t) => ({
      daps: root_daps(t, e)
    }),
    take_edge: (t, r) => ({
      daps: t.daps.flatMap((n) => take_selection_edge(n, r))
    })
  });
  function walk_selection(e, t) {
    const r = t.provider.init(e);
    walk_selection_helper(e, void 0, r, t);
  }
  function walk_selection_helper(e, t, r, n) {
    var _a, _b;
    (_a = n.on_enter) == null ? void 0 : _a.call(n, {
      node: e,
      edge: t,
      ...r
    });
    for (const l of e.edges) {
      const s = n.provider.take_edge(r, l);
      walk_selection_helper(l.child, l, s, n);
    }
    (_b = n.on_exit) == null ? void 0 : _b.call(n, {
      node: e,
      edge: t,
      ...r
    });
  }
  function mut_garbage_collect_selection(e) {
    let t = false;
    return e.edges = e.edges.filter((r) => {
      const n = mut_garbage_collect_selection(r.child);
      return t = t || n, n;
    }), has_some_tag(e) || t;
  }
  function selection_edge_by_pattern(e, t) {
    assert(t.length > 0);
    const [r, ...n] = t, l = e.edges.find((s) => pattern_step_equal(s.pattern_step, r));
    if (l) return n.length === 0 ? l : selection_edge_by_pattern(l.child, n);
  }
  function selection_node_by_pattern(e, t) {
    var _a;
    return t.length === 0 ? e : (_a = selection_edge_by_pattern(e, t)) == null ? void 0 : _a.child;
  }
  function navigate_to_tag(e, t, r) {
    let n = [];
    return walk_selection(t, {
      provider: daps_provider(e),
      on_enter: ({ node: l, daps: s }) => {
        l.tags[r] && n.push(...s);
      }
    }), n;
  }
  function navigate_to_tag_data(e, t, r) {
    return navigate_to_tag(e, t, r).map(get_dap_data).filter(truthy);
  }
  function path_step_matches_pattern_step(e, t) {
    return is_wildcard(e) || path_step_equal(e, t);
  }
  function pattern_step_equal(e, t) {
    return is_wildcard(e) && is_wildcard(t) ? true : is_wildcard(e) || is_wildcard(t) ? false : path_step_equal(e, t);
  }
  function mut_generalize_selection(e, t) {
    assert(t.length > 0);
    const r = selection_edge_by_pattern(e, t);
    assert(r !== void 0);
    const n = selection_node_by_pattern(e, parent_pattern(t));
    assert(n !== void 0);
    const l = n.edges.find((s) => pattern_step_equal(s.pattern_step, wildcard));
    l ? (mut_merge_node_into_node(r.child, l.child), n.edges = n.edges.filter((s) => s !== r)) : r.pattern_step = wildcard;
  }
  function mut_merge_node_into_node(e, t) {
    t.tags = {
      ...t.tags,
      ...e.tags
    }, merge_into_via_equality(e.excluded_paths, t.excluded_paths, path_equal);
    for (const r of e.edges) {
      const n = t.edges.find((l) => pattern_step_equal(l.pattern_step, r.pattern_step));
      n ? mut_merge_node_into_node(r.child, n.child) : t.edges.push({
        ...r
      });
    }
  }
  function generalize_like(e, t) {
    if (e.length === 0) return [];
    const [r, ...n] = e;
    for (const l of t.edges) if (path_step_matches_pattern_step(l.pattern_step, r)) return [
      l.pattern_step,
      ...generalize_like(n, l.child)
    ];
    return e;
  }
  function parent_pattern(e) {
    return e.slice(0, -1);
  }
  function mut_ensure_child(e, t) {
    const r = e.edges.find((n) => pattern_step_equal(n.pattern_step, t));
    if (r) return r.child;
    {
      const n = empty_selection();
      return e.edges.push({
        pattern_step: t,
        child: n
      }), n;
    }
  }
  function mut_selection_to_children(e, t) {
    walk_selection(e, {
      provider: empty_provider,
      on_exit: ({ node: r }) => {
        if (r.tags[t]) {
          const n = mut_ensure_child(r, wildcard);
          n.tags[t] = true, delete r.tags[t];
        }
      }
    });
  }
  function mut_selection_to_parents(e, t) {
    walk_selection(e, {
      provider: empty_provider,
      on_enter: ({ node: r }) => {
        set_tag(r, t, r.edges.some((n) => n.child.tags[t]));
      }
    }), mut_garbage_collect_selection(e);
  }
  function mut_clear_tag(e, t) {
    walk_selection(e, {
      provider: empty_provider,
      on_enter: ({ node: r }) => {
        delete r.tags[t];
      }
    });
  }
  function mut_move_selection_from_path(e, t, r) {
    const n = generalize_like(t, e), l = selection_from_pattern(n, r);
    mut_clear_tag(e, r), mut_merge_node_into_node(l, e), mut_garbage_collect_selection(e);
  }
  function mut_move_selection_from_pattern(e, t, r) {
    const n = selection_from_pattern(t, r);
    mut_clear_tag(e, r), mut_merge_node_into_node(n, e), mut_garbage_collect_selection(e);
  }
  function mut_toggle_selection_from_path(e, t, r) {
    const n = generalize_like(t, e), l = selection_node_by_pattern(e, n);
    if (l) set_tag(l, r, !l.tags[r]), mut_garbage_collect_selection(e);
    else {
      const s = selection_from_pattern(n, r);
      mut_merge_node_into_node(s, e);
    }
  }
  function mut_toggle_selection_from_pattern(e, t, r) {
    const n = selection_node_by_pattern(e, t);
    if (n) set_tag(n, r, !n.tags[r]), mut_garbage_collect_selection(e);
    else {
      const l = selection_from_pattern(t, r);
      mut_merge_node_into_node(l, e);
    }
  }
  function selection_from_pattern(e, t) {
    if (e.length === 0) return {
      edges: [],
      excluded_paths: [],
      tags: t ? {
        [t]: true
      } : {}
    };
    const [r, ...n] = e;
    return {
      edges: [
        {
          pattern_step: r,
          child: selection_from_pattern(n, t)
        }
      ],
      excluded_paths: [],
      tags: {}
    };
  }
  function vstack(e = [], t = {}) {
    const r = {
      ...group(e, t),
      type: "VStack",
      gap: t.gap ?? 0,
      align: t.align ?? "left",
      max_items: t.max_items,
      sort_data: t.sort_data,
      update: function() {
        let n = 0;
        const l = this.max_items !== void 0 ? this.children.slice(0, this.max_items) : this.children, s = l.reduce((h, f) => Math.max(h, f.width), 0), u = this.sort_data;
        u !== void 0 && l.sort((h, f) => {
          const o = l.indexOf(h), p = l.indexOf(f), y = u[o], g = u[p];
          return typeof y == "number" && typeof g == "number" ? (t.sort_reverse ? -1 : 1) * (y - g) : typeof y == "string" && typeof g == "string" ? (t.sort_reverse ? -1 : 1) * y.localeCompare(g) : 0;
        }), l.forEach((h) => {
          const { width: f, height: o } = h;
          h.x = 0, this.align === "center" ? h.x = Math.round(s / 2 - f / 2) : this.align === "right" && (h.x = s - f), h.y = n, n += o + this.gap;
        });
        const d = get_bounds(l);
        this.width = d.width, this.height = d.height, this.max_items !== void 0 && this.children.slice(this.max_items).forEach((f) => {
          f.hidden = true, f.y = d.height;
        });
      }
    };
    return r.update(), r;
  }
  function vaxis(e, t, r, n = {}) {
    const l = {
      ...group(e, n),
      type: "VAxis",
      align: n.align ?? "left",
      data: t,
      preferred_height: r,
      y_padding: n.y_padding ?? 0,
      flip: n.flip ?? false,
      scale_data: n.scale_data ?? t,
      bin_size: n.bin_size,
      update: function() {
        const s = this.children.reduce((f, o) => Math.max(f, o.width), 0), { scale: u } = this.get_scale();
        let d = (f, o) => u(f);
        if (this.bin_size !== void 0) {
          const { avg: f } = bin_data(this.scale_data, this.bin_size, this.data);
          d = (o, p) => u(f[p]);
        }
        if (this.children.forEach((f, o) => {
          const { width: p, height: y } = f;
          f.x = 0, this.align === "center" ? f.x = Math.round(s / 2 - p / 2) : this.align === "right" && (f.x = s - p), this.bin_size !== void 0 && bin_marks(this.children, this.scale_data, this.bin_size, this.data).forEach((v) => {
            v.reverse().forEach((c, m) => {
              if (m !== 0) {
                const S = v[m - 1].x + v[m - 1].width + 3 - c.width;
                c.x = S, c.type === "Mark" && (c.grayout = true, c.update());
              }
            });
          }), f.y = d(this.data[o], o) - y / 2;
        }), this.bin_size === void 0) {
          let f = {};
          for (const o of this.children.toReversed()) {
            const p = o.y;
            p in f ? (o.x += f[p] * 3, f[p] += 1) : f[p] = 1;
          }
        }
        const h = get_bounds(this.children);
        this.width = h.width, this.height = this.preferred_height, this.children.forEach((f) => f.hidden = false);
      },
      get_scale: function() {
        const s = structuredClone(this.scale_data), u = this.flip ? this.preferred_height - this.y_padding : this.y_padding, d = this.flip ? this.y_padding : this.preferred_height - this.y_padding;
        if (this.bin_size !== void 0) {
          const o = bin().thresholds(this.bin_size)(s);
          s.push(o.at(0).x0, o.at(-1).x1);
        }
        const h = create_scale_function(s, [
          u,
          d
        ]);
        return {
          min: u,
          max: d,
          scale: h
        };
      }
    };
    return l.update(), l;
  }
  function plot(e, t, r, n, l, s = {}) {
    const u = {
      ...group(e, s),
      type: "Plot",
      x_data: t,
      y_data: r,
      preferred_height: l,
      preferred_width: n,
      y_padding: s.y_padding ?? 0,
      x_padding: s.x_padding ?? 0,
      flip_y: s.flip_y ?? false,
      flip_x: s.flip_x ?? false,
      scale_data_x: (s == null ? void 0 : s.x_scale_data) ?? t,
      scale_data_y: (s == null ? void 0 : s.y_scale_data) ?? r,
      x_bin_size: s == null ? void 0 : s.x_bin_size,
      y_bin_size: s == null ? void 0 : s.y_bin_size,
      update: function() {
        const { scale: d } = this.get_x_scale(), { scale: h } = this.get_y_scale();
        let f = (p, y) => d(p), o = (p, y) => h(p);
        if (this.x_bin_size !== void 0) {
          const { avg: p } = bin_data(this.scale_data_x, this.x_bin_size, this.x_data);
          f = (y, g) => d(p[g]);
        }
        if (this.y_bin_size !== void 0) {
          const { avg: p } = bin_data(this.scale_data_y, this.y_bin_size, this.y_data);
          o = (y, g) => h(p[g]);
        }
        this.children.forEach((p, y) => {
          const g = f(this.x_data[y], y) || 0, v = o(this.y_data[y], y) || 0;
          p.y = v - p.height / 2, p.x = g - p.width / 2;
        }), this.width = this.preferred_width, this.height = this.preferred_height;
      },
      get_x_scale: function() {
        const d = structuredClone(this.scale_data_x);
        if (this.x_bin_size !== void 0) {
          const p = bin().thresholds(this.x_bin_size)(d);
          d.push(p.at(0).x0, p.at(-1).x1);
        }
        const h = this.flip_x ? this.preferred_width - this.x_padding : this.x_padding, f = this.flip_x ? this.x_padding : this.preferred_width - this.x_padding;
        return {
          min: h,
          max: f,
          scale: create_scale_function(d, [
            h,
            f
          ])
        };
      },
      get_y_scale: function() {
        const d = structuredClone(this.scale_data_y);
        if (this.y_bin_size !== void 0) {
          const p = bin().thresholds(this.y_bin_size)(d);
          d.push(p.at(0).x0, p.at(-1).x1);
        }
        const h = this.flip_y ? this.preferred_height - this.y_padding : this.y_padding, f = this.flip_y ? this.y_padding : this.preferred_height - this.y_padding;
        return {
          min: h,
          max: f,
          scale: create_scale_function(d, [
            h,
            f
          ])
        };
      }
    };
    return u.update(), u;
  }
  function hstack(e = [], t = {}) {
    const r = {
      ...group(e, t),
      type: "HStack",
      gap: t.gap ?? 0,
      align: t.align ?? "top",
      x_offset: t.x_offset ?? 0,
      update: function() {
        let n = this.x_offset ?? 0;
        const l = this.children.reduce((u, d) => Math.max(u, d.height), 0);
        this.children.forEach((u) => {
          const { width: d, height: h } = u;
          u.y = 0, this.align === "middle" ? u.y = Math.round(l / 2 - h / 2) : this.align === "bottom" && (u.y = l - h), u.x = n, n += d + this.gap;
        });
        const s = get_bounds(this.children);
        this.width = s.width, this.height = s.height;
      }
    };
    return r.update(), r;
  }
  function xaxis(e, t, r, n = {}) {
    const l = {
      ...group(e, n),
      type: "XAxis",
      align: n.align ?? "top",
      data: t,
      preferred_width: r,
      x_padding: n.x_padding ?? 0,
      flip: n.flip ?? false,
      scale_data: n.scale_data ?? t,
      bin_size: n.bin_size,
      update: function() {
        const s = this.children.reduce((f, o) => Math.max(f, o.height), 0), { scale: u } = this.get_scale();
        let d = (f, o) => u(f);
        if (this.bin_size !== void 0) {
          const { avg: f } = bin_data(this.scale_data, this.bin_size, this.data);
          d = (o, p) => u(f[p]);
        }
        if (this.children.forEach((f, o) => {
          f.y = 0, this.align === "middle" ? f.y = Math.round(s / 2 - f.height / 2) : this.align === "bottom" && (f.y = s - f.width), this.bin_size !== void 0 && bin_marks(this.children, this.scale_data, this.bin_size, this.data).forEach((y) => {
            y.reverse().forEach((g, v) => {
              if (v !== 0) {
                const _ = y[v - 1].y + y[v - 1].height + 3 - g.height;
                g.y = _, g.type === "Mark" && (g.grayout = true, g.update());
              }
            });
          }), f.x = d(this.data[o], o) - f.width / 2;
        }), this.bin_size === void 0) {
          let f = {};
          for (const o of this.children.toReversed()) {
            const p = o.x;
            p in f ? (o.y += f[p] * 3, f[p] += 1) : f[p] = 1;
          }
        }
        const h = get_bounds(this.children);
        this.width = this.preferred_width, this.height = h.height, this.children.forEach((f) => f.hidden = false);
      },
      get_scale: function() {
        const s = structuredClone(this.scale_data), u = this.flip ? this.preferred_width - this.x_padding : this.x_padding, d = this.flip ? this.x_padding : this.preferred_width - this.x_padding;
        if (this.bin_size !== void 0) {
          const o = bin().thresholds(this.bin_size)(s);
          s.push(o.at(0).x0, o.at(-1).x1);
        }
        return {
          scale: create_scale_function(s, [
            u,
            d
          ]),
          min: u,
          max: d
        };
      }
    };
    return l.update(), l;
  }
  function xaxis_rows(e, t, r, n = {}) {
    const l = e.map((u, d) => xaxis(u, t[d], r, {
      x_padding: n.x_padding ?? 0,
      scale_data: n.scale_data ?? t.flat(),
      align: "middle",
      flip: n.flip ?? false,
      bin_size: n.bin_size
    })), s = {
      ...vstack(l, {
        gap: n.vertical_gap,
        max_items: n.max_items,
        sort_data: n.sort_data,
        sort_reverse: n.sort_reverse ?? false
      }),
      type: "XAxisRows",
      preferred_width: r,
      data: t,
      marks: e,
      max_items: n.max_items,
      get_scale: () => l[0].get_scale()
    };
    return s.update(), s;
  }
  function set_base_html_props(e, t) {
    return t.hidden ? "" : (e.style.transform = `translate(${t.x}px, ${t.y}px)`, t.animation_id !== void 0 && e.setAttribute("data-animation-id", t.animation_id), e.style.transition = "0s", e.setAttribute("fill", t.fill), t.onclick !== void 0 && (e.onclick = t.onclick), t.data_attrs !== void 0 && t.data_attrs.forEach(([r, n]) => {
      e.setAttribute(`data-${r}`, n);
    }), e.style.opacity = `${t.hidden ? 0 : 1}`, e);
  }
  function group(e = [], t = {}) {
    const r = {
      type: "Group",
      class: t.class ?? [],
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      fill: t.fill ?? "none",
      preferred_width: t.preferred_width,
      preferred_height: t.preferred_height,
      children: [
        ...e
      ],
      update: function() {
        const n = get_bounds(this.children);
        this.width = this.preferred_width !== void 0 ? this.preferred_width : n.width, this.height = this.preferred_height !== void 0 ? this.preferred_height : n.height;
      },
      html: function() {
        return this.hidden ? "" : set_base_html_props(html.svg_group(this.children.map((n) => n.html()), {
          class: this.class
        }), this);
      }
    };
    return r.update(), r;
  }
  function rect(e, t, r = {}) {
    const n = {
      type: "Rect",
      class: r.class ?? [],
      x: 0,
      y: 0,
      rx: r.rx ?? 3,
      ry: r.ry ?? 3,
      width: e,
      height: t,
      children: [],
      fill: r.fill ?? "black",
      update: function() {
      },
      html: function() {
        return this.hidden ? "" : set_base_html_props(html.svg_rect(this.width, this.height, this.rx, this.ry, {
          class: this.class
        }), this);
      }
    };
    return n.update(), n;
  }
  function el_path(e, t = {}) {
    const r = {
      class: t.class ?? [],
      type: "Path",
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      d: e,
      children: [],
      fill: "none",
      update: function() {
      },
      html: function() {
        return this.hidden ? "" : set_base_html_props(html.svg_path(this.d, {
          class: this.class
        }), this);
      }
    };
    return r.update(), r;
  }
  function line(e, t, r, n, l = {}) {
    const s = el_path(`M ${e} ${t} L ${r} ${n}`, l);
    return s.width = Math.abs(r - e), s.height = Math.abs(n - t), s;
  }
  function text(e, t = {}) {
    const r = {
      class: t.class ?? [],
      type: "Text",
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      children: [],
      content: e,
      font_size: t.font_size ?? 10,
      font_weight: t.font_weight ?? 400,
      fill: t.fill ?? "black",
      update: function() {
        return this.width = this.preferred_width ?? get_text_width(this.content, `${this.font_weight} ${this.font_size}px "Source Sans 3"`), this.height = this.preferred_height ?? this.font_size, this;
      },
      html: function() {
        return this.hidden ? "" : set_base_html_props(html.svg_text(this.content, {
          class: this.class,
          style: {
            fontSize: this.font_size + "px",
            fontWeight: this.font_weight
          }
        }), this);
      }
    };
    return r.update(), r;
  }
  const AXIS_WIDTH = 15;
  function d3_axis_el_from_axis(e, t, r) {
    const n = t === "y" ? "left" : "bottom";
    let l = e, s = (r == null ? void 0 : r.reverse) ?? false;
    const u = (r == null ? void 0 : r.preferred_height) ?? 80, d = (r == null ? void 0 : r.preferred_width) ?? 80, h = (r == null ? void 0 : r.padding) ?? 0, f = l.every((v) => typeof v == "string"), o = t === "y" ? u : d, p = s ? o - h : h, y = s ? h : o - h, g = (f ? d3_scale_point : d3_scale_linear)(l, [
      p,
      y
    ]);
    return f ? d3_point_axis(n, g, {
      class: [
        "plot-axis",
        "plot-axis-categorical"
      ],
      show_label: (r == null ? void 0 : r.show_label) ?? false
    }) : d3_linear_axis(n, g, {
      class: "plot-axis",
      n_ticks: r == null ? void 0 : r.n_ticks,
      tick_values: r == null ? void 0 : r.tick_values
    });
  }
  function d3_linear_axis(e, t, r = {}) {
    const n = {
      class: r.class ?? [],
      type: "Axis",
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      children: [],
      pos: e,
      scale: t,
      fill: "",
      space_taking: (r == null ? void 0 : r.space_taking) !== void 0 ? r.space_taking : true,
      update: function() {
        const [l, s] = this.scale.range();
        this.pos === "top" || this.pos === "bottom" ? (this.height = this.space_taking ? AXIS_WIDTH : 0, this.width = Math.abs(s - l)) : (this.width = this.space_taking ? AXIS_WIDTH : 0, this.height = Math.abs(s - l));
      },
      html: function() {
        return (this.pos === "left" || this.pos === "right") && (this.x += AXIS_WIDTH), this.hidden ? "" : set_base_html_props(html.d3_axis_linear(this.pos, this.scale, {
          class: this.class,
          n_ticks: r.n_ticks,
          tick_values: r.tick_values
        }), this);
      }
    };
    return n.update(), n;
  }
  function d3_point_axis(e, t, r = {}) {
    const n = {
      class: r.class ?? [],
      type: "Axis",
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      children: [],
      pos: e,
      scale: t,
      fill: "",
      space_taking: (r == null ? void 0 : r.space_taking) !== void 0 ? r.space_taking : true,
      update: function() {
        const [l, s] = this.scale.range();
        this.pos === "top" || this.pos === "bottom" ? (this.height = this.space_taking ? AXIS_WIDTH : 0, this.width = Math.abs(s - l)) : (this.width = this.space_taking ? AXIS_WIDTH : 0, this.height = Math.abs(s - l));
      },
      html: function() {
        return this.pos === "top" || this.pos === "bottom" ? this.y += AXIS_WIDTH : this.x += AXIS_WIDTH, this.hidden ? "" : set_base_html_props(html.d3_axis_point(this.pos, this.scale, {
          class: this.class
        }, {
          show_label: (r == null ? void 0 : r.show_label) ?? false
        }), this);
      }
    };
    return n.update(), n;
  }
  function frame(e, t = {}) {
    const r = rect(0, 0, {
      class: "frame-rect"
    }), n = {
      ...group([
        r,
        e
      ], t),
      type: "Frame",
      preferred_width: t.preferred_width,
      preferred_height: t.preferred_height,
      padding: t.padding ?? [
        0,
        0
      ],
      centered: t.centered ?? [
        false,
        true
      ],
      clear: t.clear ?? false,
      rounded: t.rounded ?? [
        3,
        3
      ],
      background: r,
      child: e,
      fill: t.fill ?? "white",
      clip: t.clip ?? false,
      grayout: t.grayout ?? false,
      content_position: t.content_position,
      bottom_margin: t.bottom_margin ?? 0,
      set_child: function(l) {
        this.child = l, this.children[1] = this.child;
      },
      update: function() {
        const l = this.preferred_width !== void 0 ? this.preferred_width : this.child.width + this.padding[0] * 2, s = this.preferred_height !== void 0 ? this.preferred_height : this.child.height + this.padding[1] * 2;
        return this.background.x = 0, this.background.y = 0, this.background.width = l, this.background.height = s, this.background.rx = this.rounded[0], this.background.ry = this.rounded[1], this.child.x = this.centered[0] ? l / 2 - this.child.width / 2 : this.padding[0], this.child.y = this.centered[1] ? s / 2 - this.child.height / 2 : this.padding[1], this.width = l, this.height = s, this.clear ? (this.background.class = [
          "frame-rect",
          "frame-rect-clear"
        ], this.background.fill = "none") : (this.background.class = "frame-rect", this.background.fill = this.fill ?? "white"), this.grayout && !this.clear && (this.background.fill = interpolateRgb("#e5e5e5", this.background.fill)(0.23), this.child.fill = interpolateRgb("#e5e5e5", this.child.fill)(0.4), this.child.update()), this.background.update(), this.content_position === "right" && (this.child.x = this.width + 2, this.width += this.child.width + 2), this.height += this.bottom_margin, this;
      },
      html: function() {
        if (this.hidden) return "";
        const l = get_tag_id(), s = this.clip ? [
          html.svg_defs(html.svg_clip_path([
            html.svg_rect(this.width, this.height)
          ], {
            id: l
          }))
        ] : [];
        return set_base_html_props(html.svg_group([
          ...s,
          ...this.children.map((u) => u.html())
        ], {
          class: this.class,
          style: this.clip ? {
            clipPath: `url(#${l})`
          } : {}
        }), this);
      }
    };
    return n.update(), n;
  }
  function widen(e, t) {
    return "preferred_width" in e ? (e.preferred_width = t, e.update()) : console.warn(`[widen] No case for ${e.type}`), e;
  }
  function update_global_pos(e, t, r) {
    e.global_x = t + e.x, e.global_y = r + e.y, e.children.forEach((n) => update_global_pos(n, t + e.x, r + e.y));
  }
  function get_bounds(e) {
    return {
      width: e.map((t) => t.x + t.width).reduce((t, r) => Math.max(r, t), 0),
      height: e.map((t) => t.y + t.height).reduce((t, r) => Math.max(r, t), 0)
    };
  }
  function add_child(e, t) {
    e.children.push(t), e.update();
  }
  function connect_across_columns(e, t) {
    const r = [];
    if (e.length <= 1) return r;
    update_global_pos(t, 0, 0);
    const n = e, l = (u) => ({
      x: u.global_x,
      y: u.global_y,
      width: u.width,
      height: u.height
    });
    let s = [];
    for (let u = 0; u < n.length; u++) {
      const d = n[u];
      let h = [], f = [];
      d.marks.forEach((p) => {
        const y = l(p), g = {
          x: d.type === "PlotView" ? d.y_col.global_x + (u == 0 ? 0 : 10) : d.global_x,
          y: y.y + y.height / 2,
          hidden: p.hidden ?? false
        }, v = {
          x: d.type === "PlotView" ? d.x_col.global_x + d.x_col.width : d.global_x + d.width,
          y: y.y + y.height / 2,
          hidden: p.hidden ?? false
        };
        p.mark.row_indices.forEach((c) => {
          h[c] !== void 0 && f[c] !== void 0 || (h[c] = g, f[c] = v);
        });
      }), s.push(h), s.push(f);
    }
    for (let u = 0; u < s[0].length; u++) {
      const h = s.map((o) => o[u]).filter((o) => !o.hidden).map((o, p) => p === 0 ? `M ${o.x} ${o.y}` : `L ${o.x} ${o.y}`).join(" "), f = {
        ...el_path(h, {
          class: "connection-path"
        }),
        animation_id: `Connection(${u})`,
        data_attrs: [
          [
            "row-index",
            u.toString()
          ]
        ]
      };
      r.push({
        ...group([
          f
        ], {
          class: "connection"
        }),
        type: "Connection",
        path: f,
        row_index: u
      });
    }
    for (const [u, d] of n.entries()) for (const [h, f] of d.marks.entries()) f.mark.row_indices.slice(1).forEach((o) => {
      const p = s[u * 2][h], y = s[(u - 1) * 2 + 1][o], g = u < n.length - 1 ? s[u * 2 + 1][h] : null, v = u < n.length - 1 ? s[(u + 1) * 2][o] : null, c = [
        y,
        p,
        g,
        v
      ].filter((_) => _ !== null).map((_, x) => x === 0 ? `M ${_.x} ${_.y}` : `L ${_.x} ${_.y}`).join(" "), m = {
        ...el_path(c, {
          class: "connection-path"
        }),
        animation_id: `Connection(${h})`,
        data_attrs: [
          [
            "row-index",
            h.toString()
          ]
        ]
      };
      r.push({
        ...group([
          m
        ], {
          class: "connection"
        }),
        type: "Connection",
        path: m,
        row_index: h
      });
    });
    return r;
  }
  function find_all_by_el(e, t) {
    const r = [];
    return t(e) && r.push(e), e.children.forEach((n) => r.push(...find_all_by_el(n, t))), r;
  }
  function traverse(e, t) {
    t(e), e.children.forEach((r) => traverse(r, t));
  }
  function find_all_until_match(e, t) {
    const r = [];
    return t(e) ? r.push(e) : e.children.forEach((n) => r.push(...find_all_until_match(n, t))), r;
  }
  function get_type_from_data_list(e) {
    return e.every((t) => typeof t == "string") ? "Categorical" : "Numerical";
  }
  function create_scale_function(e, t) {
    return get_type_from_data_list(e) === "Categorical" ? d3_scale_point(e, t) : d3_scale_linear(e, t);
  }
  function snug_mark(e) {
    e.fixed_width || (e.preferred_width = void 0, e.update());
  }
  function d3_scale_point(e, t = [
    0,
    1
  ]) {
    const r = [
      ...new Set(e.map((n) => n))
    ].sort();
    return point().domain(r).range([
      t[0],
      t[1]
    ]);
  }
  function d3_scale_linear(e, t = [
    0,
    1
  ]) {
    const r = extent(e), n = [
      r[0] ?? 0,
      r[1] ?? 1
    ];
    return linear().domain(n).range([
      t[0],
      t[1]
    ]).nice().unknown(t[0]);
  }
  function d3_scale_sqrt(e, t = [
    0,
    1
  ]) {
    const r = extent(e), n = [
      r[0] ?? 0,
      r[1] ?? 1
    ];
    return sqrt().domain(n).range([
      t[0],
      t[1]
    ]).unknown(t[0]);
  }
  function map_to_numerical(e) {
    return typeof e == "number" ? e : typeof e == "string" ? e.charCodeAt(0) : 0;
  }
  function render(e, t, r = false) {
    let n;
    switch (e.type) {
      case "Table":
        n = render_table(e, t, r);
        break;
      case "Col":
        n = render_col(e, t);
        break;
      case "PlotView":
        n = render_plot(e, t);
        break;
      case "OverlayView":
        n = render_overlay(e, t);
        break;
      case "Mark":
        throw new Error("Marks can only be rendered through columns!!");
      case "Error":
        throw console.warn(e.error), new Error("Uh oh, no errors in this media!");
      default:
        assert_never(e);
    }
    return n.tagged_id = e.id, n;
  }
  const COL_INNER_PADDING = 3, COL_NAME_GAP = 5, COL_VIEW_GAP = 4, ROW_GAP = 3, COLORS = {
    VIEW_BG: "rgba(0, 0, 0, 0.1)",
    COL_NAME_BG: "#f4f4f4",
    FADE_BG: "rgba(128, 128, 128, 0.1)"
  };
  let MAX_ENTRIES = 0, COLS = [];
  function render_table(e, t, r = false) {
    MAX_ENTRIES = e.max_entries, COLS = find_all_cols(e);
    let n = render_col({
      ...COLS[0],
      encoding: {}
    }, {}).height - COL_INNER_PADDING * 2;
    r || soft_sort_table(e);
    const l = e.items.map((y) => render(y, {
      height: n,
      width: 80
    })), s = l.map((y) => add_name(y)), u = hstack(s, {
      gap: COL_VIEW_GAP,
      align: "top"
    }), d = find_all_until_match(u, (y) => y.type === "Col" || y.type === "PlotView"), h = group(connect_across_columns(d, u), {
      class: "subtable-connection-group"
    }), f = frame(text("+"), {
      preferred_height: 15,
      padding: [
        5,
        5
      ],
      class: "new-col-button"
    });
    f.onclick = (y) => {
      y.stopPropagation();
      const g = {
        type: "AddNewColumn"
      };
      document.dispatchEvent(new CustomEvent("apply_effect", {
        detail: g
      }));
    };
    const o = COLS[0].items.length, p = show_more_and_row_info(o, u.width);
    return {
      ...group([
        h,
        vstack([
          hstack([
            u,
            frame(f, {
              preferred_height: 18,
              clear: true
            })
          ], {
            gap: 5,
            align: "top"
          }),
          p
        ], {
          gap: ROW_GAP + COL_INNER_PADDING
        })
      ]),
      class: "table",
      type: "Table",
      cols_and_views: l
    };
  }
  function soft_sort_table(e) {
    for (let t = 0; t < e.items.length; t++) {
      const r = e.items[t];
      if (r.type === "OverlayView" || r.type !== "Col" || r.encoding.y !== void 0 || r.encoding.sort !== void 0) continue;
      let n = false;
      for (const l of [
        -1,
        1
      ]) {
        for (let s = t + l; s >= 0 && s < e.items.length; s += l) {
          if (t === s) continue;
          const u = e.items[s];
          if (u.type === "Col" && (u.encoding.y && u.encoding.y.self || u.encoding.sort && u.encoding.sort.self || u.encoding.group && u.encoding.group.self)) {
            if (u.encoding.y && u.encoding.y.self) {
              r.encoding.sort = {
                type: "Sort",
                reverse: u.encoding.y.reverse,
                values: u.encoding.y.scale_values,
                self: false
              }, n = true;
              break;
            }
            if (u.encoding.sort && u.encoding.sort.self) {
              r.encoding.sort = {
                type: "Sort",
                reverse: u.encoding.sort.reverse,
                values: u.encoding.sort.scale_values,
                self: false
              }, n = true;
              break;
            }
          }
          if (u.type === "PlotView" && u.y.encoding.y && u.y.encoding.y.self) {
            r.encoding.sort = {
              type: "Sort",
              reverse: u.y.encoding.y.reverse,
              values: u.y.encoding.y.scale_values,
              self: false
            }, n = true;
            break;
          }
          if (u.type === "OverlayView" && u.items.some((d) => d.type === "Col" && d.encoding.sort && d.encoding.sort.self)) {
            const d = u.items.find((h) => h.type === "Col" && h.encoding.sort && h.encoding.sort.self).encoding.sort;
            r.encoding.sort = {
              ...d,
              self: false
            }, n = true;
            break;
          }
        }
        if (n) break;
      }
    }
  }
  function show_more_and_row_info(e, t) {
    if (MAX_ENTRIES < e) {
      const r = frame(text("Show more"), {
        padding: [
          4,
          3
        ],
        fill: "#f0f0f0",
        class: "show-more"
      });
      r.onclick = (s) => {
        s.stopPropagation();
        const u = {
          type: "ShowMoreRows",
          amount: 5
        };
        document.dispatchEvent(new CustomEvent("apply_effect", {
          detail: u
        }));
      };
      const n = frame(text(`${MAX_ENTRIES.toLocaleString()} / ${e.toLocaleString()} rows`), {
        padding: [
          0,
          7
        ],
        clear: true,
        class: "row-count"
      }), l = frame(hstack([
        n,
        r
      ], {
        align: "middle",
        gap: 7
      }), {
        preferred_width: t,
        padding: [
          7,
          0
        ]
      });
      return r.x = t - r.width - 10, l;
    } else return frame(text(`${e.toLocaleString()} rows`), {
      padding: [
        0,
        0
      ],
      clear: true,
      class: "row-count"
    });
  }
  function get_size(e, t, r) {
    return e.encoding.group !== void 0 ? {
      ...r,
      height: (r.height ?? 0) + COL_INNER_PADDING * 2
    } : {
      x_padding: Layout.get_x_padding(t),
      y_padding: Layout.get_y_padding(t),
      ...r
    };
  }
  function get_padding(e) {
    return e.encoding.group !== void 0 ? [
      0,
      0
    ] : (e.encoding.xy !== void 0 && e.encoding.group, [
      COL_INNER_PADDING,
      COL_INNER_PADDING
    ]);
  }
  function get_clear(e) {
    return e.encoding.group !== void 0;
  }
  function render_col(e, t) {
    var _a, _b, _c, _d;
    let r = e.items.map((f, o) => render_mark(f, e));
    if (e.encoding.size !== void 0) {
      e.encoding.mark === void 0 ? e.encoding.mark = {
        type: "Mark",
        snug: true,
        self: false
      } : e.encoding.mark.snug = true;
      const f = e.encoding.size.values.map(map_to_numerical), o = () => e.encoding.xy !== void 0 || e.encoding.x !== void 0 ? 3 : 5, p = () => e.encoding.xy !== void 0 ? 10 : e.encoding.x !== void 0 ? 30 : t.width * 0.8, y = (e.encoding.xy !== void 0 ? d3_scale_sqrt : d3_scale_linear)(f, [
        o(),
        p()
      ]);
      r.forEach((g, v) => {
        var _a2, _b2;
        const c = y(map_to_numerical(e.encoding.size.values[v]));
        if (e.encoding.xy !== void 0) g.preferred_height = c, g.preferred_width = c, g.fixed_width = true;
        else if (e.encoding.x !== void 0) g.preferred_height = c, g.preferred_width = 5, ((_a2 = e.encoding.mark) == null ? void 0 : _a2.density) !== "abstract" && (g.content_position = "right", g.fixed_width = true, g.child.fill = "#1b1b1b", g.rounded = [
          1,
          1
        ]);
        else if (g.preferred_width = c, ((_b2 = e.encoding.mark) == null ? void 0 : _b2.density) !== "abstract" && (g.content_position = "right", g.fixed_width = true, g.child.fill = "#1b1b1b", c < 10)) {
          let m = remap(c, o(), 10, 2, 3);
          g.rounded = [
            m,
            m
          ];
        }
        g.update();
      });
    }
    if (!((_a = e.encoding.mark) == null ? void 0 : _a.snug)) {
      const f = render_col_name(e.name, void 0), o = [
        f,
        ...r
      ].reduce((p, y) => Math.max(p, y.width), 0);
      widen(f, o + COL_INNER_PADDING * 2), r.forEach((p) => widen(p, o));
    }
    const n = MAX_ENTRIES;
    ((_b = e.encoding.mark) == null ? void 0 : _b.density) === "abstract" && (MAX_ENTRIES = 1 / 0);
    const l = get_col_layout(r, e, get_size(e, r, t));
    MAX_ENTRIES = n;
    const s = frame(l, {
      padding: get_padding(e),
      class: "col",
      clear: get_clear(e),
      fill: COLORS.VIEW_BG,
      clip: true
    });
    let u = s;
    const d = s.width, h = s.height;
    if ((_c = e.encoding.x) == null ? void 0 : _c.show_axis) {
      let f = d3_axis_el_from_axis(e.encoding.x.scale_values, "x", {
        reverse: e.encoding.x.reverse,
        preferred_width: d,
        padding: Layout.get_x_padding(r) + COL_INNER_PADDING
      });
      if (e.encoding.group !== void 0 && e.encoding.x.bin_size !== void 0 && e.encoding.x.self && e.encoding.group.self) {
        const p = bin().thresholds(e.encoding.x.bin_size)(e.encoding.x.scale_values), y = structuredClone(e.encoding.x.scale_values);
        y.push(p.at(0).x0, p.at(-1).x1);
        const g = [
          ...new Set(p.flatMap((v) => [
            v.x0,
            v.x1
          ]))
        ];
        f = d3_axis_el_from_axis(y, "x", {
          reverse: e.encoding.x.reverse,
          preferred_width: d,
          padding: Layout.get_x_padding(r) + COL_INNER_PADDING,
          tick_values: g
        });
      }
      u = vstack([
        u,
        f
      ], {
        align: "left",
        gap: COL_INNER_PADDING
      });
    }
    if (((_d = e.encoding.y) == null ? void 0 : _d.show_axis) && e.encoding.y.self) {
      let f;
      if (f = d3_axis_el_from_axis(e.encoding.y.scale_values, "y", {
        reverse: e.encoding.y.reverse,
        preferred_height: h,
        padding: Layout.get_y_padding(r) + COL_INNER_PADDING
      }), e.encoding.group !== void 0 && e.encoding.y.bin_size !== void 0 && e.encoding.y.self && e.encoding.group.self) {
        const p = bin().thresholds(e.encoding.y.bin_size)(e.encoding.y.scale_values), y = structuredClone(e.encoding.y.scale_values);
        y.push(p.at(0).x0, p.at(-1).x1);
        const g = [
          ...new Set(p.flatMap((v) => [
            v.x0,
            v.x1
          ]))
        ];
        f = d3_axis_el_from_axis(y, "y", {
          reverse: e.encoding.y.reverse,
          preferred_height: h,
          padding: Layout.get_y_padding(r) + COL_INNER_PADDING,
          tick_values: g
        });
      } else if (e.encoding.group !== void 0 && !e.encoding.group.self) {
        let o;
        if ("child" in u && u.child.type === "VStack" ? o = u.child.children : u.type === "VStack" && "child" in u.children[0] && u.children[0].child.type === "VStack" && (o = u.children[0].child.children), o) {
          const p = o.map((y) => {
            var _a2;
            assert("child" in y);
            const g = y.child.type === "Plot" ? y.child.get_y_scale().scale : y.child.get_scale().scale, v = d3_axis_el_from_axis(g.domain(), "y", {
              reverse: (_a2 = e.encoding.y) == null ? void 0 : _a2.reverse,
              preferred_height: y.height,
              padding: Layout.get_y_padding(r) + COL_INNER_PADDING,
              n_ticks: 2
            });
            return v.y = y.y, v;
          });
          f = group(p);
        }
      }
      u = hstack([
        f,
        u
      ], {
        align: "top",
        gap: COL_INNER_PADDING
      });
    }
    if (e.encoding.color !== void 0) {
      const f = get_color_scale(e.encoding.color.scale_values, e.encoding.color.scheme, e.encoding.color.varying);
      r.forEach((o, p) => {
        const y = f(e.encoding.color.values[p]);
        o.fill = y, o.update();
      });
    }
    return {
      ...u,
      type: "Col",
      frame: s,
      marks: r,
      marks_layout: l,
      tagged_id: e.id,
      derived: false,
      col: e,
      set_child: function(f) {
        this.frame.set_child(f), this.marks_layout = f;
      }
    };
  }
  function render_plot(e, t) {
    assert(t.height !== void 0);
    const r = t.height, n = r, l = COL_INNER_PADDING * 4, s = render_col(e.x, {
      height: 40,
      width: n - l
    }), u = render_col(e.y, {
      width: 40,
      height: r - l
    }), d = render_col(e.points, {
      height: r - l,
      width: n - l,
      x_padding: Layout.get_x_padding(s.marks),
      y_padding: Layout.get_y_padding(u.marks)
    });
    return {
      ...hstack([
        u,
        vstack([
          d,
          s
        ], {
          gap: COL_INNER_PADDING,
          align: "right"
        })
      ], {
        gap: COL_INNER_PADDING
      }),
      type: "PlotView",
      tagged_id: e.id,
      kind: "View",
      x_col: s,
      y_col: u,
      marks: d.marks,
      cols_and_views: [
        d
      ],
      points_col: d
    };
  }
  function render_overlay(e, t) {
    var _a;
    let r, n;
    if (e.encoding === "x") {
      if (e.items.some((l) => l.type === "Col" && l.encoding.sort)) {
        const l = e.items.find((s) => s.type === "Col" && s.encoding.sort).encoding.sort;
        for (const s of e.items) s.type === "Col" && !s.encoding.sort && (s.encoding.sort = {
          ...l,
          self: false
        });
      }
      if (r = e.items.map((l) => render(l, {
        ...t,
        width: t.width * e.items.length
      })), e.encoding_group) r.slice(1).forEach((l) => {
        l.marks_layout.children.forEach((s) => {
          s.clear = true, s.update();
        }), l.frame.update();
      }), n = group(r);
      else {
        if (r.forEach((u) => {
          u.frame.clear = true, u.frame.update();
        }), ((_a = r[0].children[1]) == null ? void 0 : _a.type) === "Axis") {
          const u = r[0].children[1];
          u.space_taking = false, u.update(), "gap" in r[0] && (r[0].gap = 0), r[0].update(), u.y += 5;
        }
        const l = r.map((u) => {
          if (u.frame.child.type === "XAxisRows") return u.frame.child;
          if (u.frame.child.type === "Group") return u.frame.child.children.at(-1).child;
        }), s = [];
        for (let u = 0; u < l[0].children.length; u++) {
          const d = min(l.map((p) => p.children[u].children[0]).map((p) => p.x)), h = max(l.map((p) => p.children[u].children[0]).map((p) => p.x)), f = l[0].children[u].y + 11, o = line(d + 5, f, h + 5, f, {
            class: [
              "connection-path",
              "haxis-connection-path"
            ]
          });
          s.push(o);
        }
        e.items[0].type === "Col" && e.items[0].encoding.group !== void 0 ? n = frame(group([
          ...s,
          ...r
        ]), {
          clear: true,
          class: "col"
        }) : n = frame(group([
          ...s,
          ...r
        ]), {
          fill: COLORS.VIEW_BG,
          class: "col"
        });
      }
    } else e.encoding === "y" && e.encoding_group ? (r = e.items.map((l) => render(l, t)), n = hstack(r, {
      gap: COL_VIEW_GAP
    })) : (r = e.items.map((l) => render(l, t)), n = hstack(r, {
      gap: COL_VIEW_GAP
    }));
    return {
      ...n,
      kind: "View",
      type: "OverlayView",
      cols: r,
      cols_and_views: r,
      encoding: e.encoding,
      encoding_group: e.encoding_group
    };
  }
  function render_mark(e, t, r, n) {
    var _a, _b, _c, _d, _e;
    const l = ((_a = t.encoding.mark) == null ? void 0 : _a.density) === "abstract", s = ((_b = t.encoding.mark) == null ? void 0 : _b.density_mult) ?? 1, u = text(l ? "" : ((_c = e.value) == null ? void 0 : _c.toString()) ?? "null", {
      class: "text",
      font_size: l ? 0 : (_d = t.encoding.mark) == null ? void 0 : _d.font_size
    }), d = remap(((_e = t.encoding.mark) == null ? void 0 : _e.font_size) ?? 10, 7, 10, 0, 1), h = frame(u, {
      padding: [
        d * 6,
        d * 3
      ],
      rounded: [
        4,
        4
      ]
    });
    if (l) {
      h.rounded = [
        1,
        1
      ], h.fill = "#454545";
      const f = remap(s, 0, 1, 0.5, 2);
      t.encoding.xy !== void 0 ? (h.padding = [
        f,
        f
      ], h.fill = "#4778e0") : t.encoding.x !== void 0 ? (h.padding = [
        f,
        0
      ], h.child.preferred_height = 10) : (h.padding = [
        0,
        f
      ], t.encoding.size === void 0 && (h.child.preferred_width = 10)), h.child.update(), h.update();
    }
    return {
      ...h,
      tagged_id: e.id,
      animation_id: `ANIM(${e.id})`,
      mark: e,
      type: "Mark",
      fixed_width: false,
      class: [
        "mark",
        l ? "abstract" : "dense",
        t.encoding.color !== void 0 ? "colored" : "uncolored"
      ],
      data_attrs: [
        [
          "row-indices",
          e.row_indices.map((f) => `(${f})`).join(" ")
        ],
        [
          "col-name",
          e.col_name.toString()
        ]
      ]
    };
  }
  function render_selections(e, t, r) {
    update_global_pos(e, 0, 0);
    const n = navigate_to_tag_data(t.data, r, t.active_tag), l = new Set(n.map((d) => d.id)), s = find_all_by_el(e, (d) => d.tagged_id !== void 0 && l.has(d.tagged_id)), u = group([], {
      class: "selections"
    });
    return s.forEach((d) => {
      const h = rect(d.width, d.height, {
        class: "selection",
        fill: "#5b9dff17"
      });
      add_child(u, h), h.x = d.global_x, h.y = d.global_y;
    }), u;
  }
  function render_col_name(e, t) {
    const r = frame(text(e, {
      class: "col-name"
    }), {
      padding: [
        6,
        4
      ],
      rounded: [
        4,
        4
      ],
      preferred_width: t,
      class: "col-name-frame",
      fill: COLORS.COL_NAME_BG
    });
    return r.animation_id = `ANIM(${e})`, r.data_attrs = [
      [
        "col-name",
        e
      ]
    ], r.onclick = (n) => {
      n.stopPropagation();
      const l = {
        type: n.shiftKey ? "ExtendSelectionTo" : "MoveSelectionTo",
        path: [
          e
        ]
      };
      document.dispatchEvent(new CustomEvent("apply_effect", {
        detail: l
      }));
    }, {
      ...r,
      type: "ColName",
      name: e
    };
  }
  function add_name(e) {
    if (e.type === "PlotView") {
      const t = (e.points_col.width - COL_INNER_PADDING * 2) / 2, r = render_col_name(e.y_col.col.name, t), n = render_col_name(e.x_col.col.name, t), l = {
        ...hstack([
          r,
          n
        ], {
          gap: COL_VIEW_GAP
        }),
        type: "ColName",
        name: e.points_col.col.name
      };
      return vstack([
        l,
        e
      ], {
        gap: COL_NAME_GAP,
        align: "right"
      });
    } else if (e.type === "OverlayView") if (e.encoding === "x") {
      const t = e.cols, r = (e.width - (t.length - 1) * COL_VIEW_GAP) / t.length, n = t.map((l) => render_col_name(l.col.name, r));
      return vstack([
        hstack(n, {
          gap: COL_VIEW_GAP
        }),
        e
      ], {
        gap: COL_NAME_GAP
      });
    } else {
      const r = e.cols.map((n) => render_col_name(n.col.name, n.width));
      return vstack([
        hstack(r, {
          gap: COL_VIEW_GAP
        }),
        e
      ], {
        gap: COL_NAME_GAP
      });
    }
    else {
      const t = render_col_name(e.col.name, e.width);
      return vstack([
        t,
        e
      ], {
        gap: COL_NAME_GAP
      });
    }
  }
  function get_color_scale(e, t = "blue", r = true) {
    const n = get_type_from_data_list(e) === "Categorical", l = t === "blue" ? Blues : t === "green" ? Greens : t === "purple" ? Purples : t === "orange" ? Oranges : Reds;
    if (!r) return (s) => interpolateRgb("#fff", l(0.3))(0.9);
    if (n) {
      const s = [
        ...new Set(e)
      ], u = ordinal().domain(s).range(observable10);
      return (d) => interpolateRgb("#fff", u(d))(0.5);
    } else {
      const s = extent(e), u = sequential(l).domain([
        0,
        1
      ]);
      return (d) => u(remap(d, s[0], s[1], 0, 0.5));
    }
  }
  function get_col_layout(e, t, r) {
    const n = t.encoding;
    let l;
    return n.group ? n.xy ? l = Layout.xy_and_group(e, n.group, n.xy, r) : n.x && n.y ? l = Layout.x_and_y_and_group(e, n.group, n.x, n.y, r) : n.x ? l = Layout.x_and_group(e, n.group, n.x, r) : n.y ? l = Layout.y_and_group(e, n.group, n.y, r) : l = Layout.col_and_group(e, n.group, r, n.sort) : n.xy ? l = Layout.xy(e, n.xy, r) : n.x && n.y ? l = Layout.x_and_y(e, n.x, n.y, r) : n.x ? l = Layout.x(e, n.x, r, n.sort) : n.y ? l = Layout.y(e, n.y, r, n.sort) : l = Layout.col(e, r, n.sort), assert(l !== void 0, "[update_col_based_on_encoding] Undefined layout."), l;
  }
  function group_marks_by_value(e, t, r, n = false) {
    const l = [
      ...new Set(t)
    ];
    if (t.every((u) => typeof u == "string")) return l.map((u) => e.filter((d) => t[e.indexOf(d)] === u));
    {
      assert(r !== void 0, "[group_marks_by_value] Undefined bin size for numerical data.");
      const u = bin().value((d, h) => t[h]).thresholds(r);
      return n ? u(e) : u(e).filter((d) => d.length > 0);
    }
  }
  function group_marks_by_xy(e, t, r, n = 5, l = 5, s = false) {
    const u = bin_marks(e, t, n, t), d = bin_marks(e, r, l, r), h = /* @__PURE__ */ new Map(), f = /* @__PURE__ */ new Map();
    u.forEach((p, y) => {
      p.forEach((g) => {
        h.set(g, {
          idx: y,
          x0: p.x0,
          x1: p.x1
        });
      });
    }), d.forEach((p, y) => {
      p.forEach((g) => {
        f.set(g, {
          idx: y,
          y0: p.x0,
          y1: p.x1
        });
      });
    });
    const o = /* @__PURE__ */ new Map();
    if (e.forEach((p) => {
      const y = h.get(p), g = f.get(p);
      if (!y || !g) return;
      const v = `${y.idx},${g.idx}`;
      let c = o.get(v);
      c || (c = [], c.x0 = y.x0, c.x1 = y.x1, c.y0 = g.y0, c.y1 = g.y1, o.set(v, c)), c.push(p);
    }), s) {
      const p = [];
      return u.forEach((y, g) => {
        d.forEach((v, c) => {
          const m = `${g},${c}`, _ = o.get(m);
          if (_) p.push(_);
          else {
            const x = [];
            x.x0 = y.x0, x.x1 = y.x1, x.y0 = v.x0, x.y1 = v.x1, p.push(x);
          }
        });
      }), p;
    }
    return Array.from(o.values());
  }
  function bin_marks(e, t, r = 5, n) {
    const s = bin().thresholds(r)(t), u = [
      s.at(0).x0,
      s.at(-1).x1
    ];
    return bin().value((h, f) => n[f]).domain(u).thresholds(r)(e).filter((h) => h.length > 0);
  }
  function bin_data(e, t, r) {
    const l = bin().thresholds(t)(e), s = [
      l.at(0).x0,
      l.at(-1).x1
    ], d = bin().value((h, f) => r[f]).domain(s).thresholds(t)(r);
    return {
      grouped: d,
      avg: r.map((h) => {
        let f = -1;
        if (d.forEach((o) => {
          if (o.includes(h)) {
            f = (o.x0 + o.x1) / 2;
            return;
          }
        }), f === -1) throw Error("[bin_data] Cannot find data");
        return f;
      })
    };
  }
  var Layout;
  ((e) => {
    function t(v) {
      return average(v.map((c) => c.height)) / 2;
    }
    e.get_y_padding = t;
    function r(v) {
      return max(v.map((c) => c.width)) / 2;
    }
    e.get_x_padding = r;
    function n(v, c, m) {
      return vstack(v, {
        gap: c.height ? l(v.slice(0, MAX_ENTRIES), c.height) : ROW_GAP,
        class: [
          "col-vstack"
        ],
        max_items: MAX_ENTRIES,
        sort_data: m ? m.values : void 0,
        sort_reverse: m ? m.reverse : void 0
      });
    }
    e.col = n;
    function l(v, c) {
      return (c - sum(v.map((m) => m.height))) / (v.length - 1);
    }
    function s(v, c, m, _) {
      return assert(m.height !== void 0), vaxis(v, c.values, m.height, {
        y_padding: m.y_padding ?? t(v),
        flip: c.reverse,
        scale_data: c.scale_values
      });
    }
    e.y = s;
    function u(v, c, m, _) {
      return assert(m.width !== void 0), v.forEach((x) => snug_mark(x)), c.collapse ? xaxis(v, c.values, m.width, {
        scale_data: c.scale_values,
        flip: c.reverse,
        x_padding: r(v)
      }) : xaxis_rows(v.map((x) => [
        x
      ]), c.values.map((x) => [
        x
      ]), m.width, {
        vertical_gap: m.height ? l(v.slice(0, MAX_ENTRIES), m.height) : ROW_GAP,
        max_items: MAX_ENTRIES,
        scale_data: c.scale_values,
        flip: c.reverse,
        sort_data: _ ? _.values : void 0,
        sort_reverse: _ ? _.reverse : void 0,
        x_padding: r(v)
      });
    }
    e.x = u;
    function d(v, c, m) {
      assert(m.width !== void 0), assert(m.height !== void 0);
      const { x: _, y: x } = c;
      v.forEach((D) => snug_mark(D));
      const S = m.width, E = m.height, w = plot(v, _.values, x.values, S, E, {
        flip_y: true,
        y_scale_data: x.scale_values,
        x_scale_data: _.scale_values,
        x_padding: m.x_padding,
        y_padding: m.y_padding,
        x_bin_size: _.bin_size,
        y_bin_size: x.bin_size
      }), C = v.map((D, A) => ({
        ...line(D.x + D.width / 2, D.y + D.height / 2, D.x + D.width / 2, E + (m.y_padding ?? t(v)), {
          class: "connection-path"
        }),
        data_attrs: [
          [
            "row-index",
            A.toString()
          ]
        ]
      }));
      return group([
        ...C,
        w
      ]);
    }
    e.xy = d;
    function h(v, c, m, _) {
      assert(_.width !== void 0), assert(_.height !== void 0), v.forEach((w) => snug_mark(w));
      const x = _.width, S = _.height;
      return plot(v, c.values, m.values, x, S, {
        flip_y: m.reverse,
        flip_x: c.reverse,
        y_scale_data: m.scale_values,
        x_scale_data: c.scale_values,
        x_padding: _.x_padding,
        y_padding: _.y_padding
      });
    }
    e.x_and_y = h;
    function f(v, c, m, _) {
      const x = group_marks_by_value(v, c.values, c.num_bins);
      assert(m.height !== void 0);
      const S = m.height, E = v.length;
      let w = 2 * ROW_GAP;
      const C = x.length, D = v.map((F) => F.height).reduce((F, B) => B + F, 0);
      let A = (S - (C - 1) * w - C * (COL_INNER_PADDING * 2) - D) / (E - 1 * C);
      return E === C && (A = 0), (E === C || A < -v[0].height + 5) && (A = Math.max(A, -v[0].height + 5), w = (S - C * (COL_INNER_PADDING * 2) - D - A * (E - 1 * C)) / (C - 1)), vstack(x.map((F) => {
        const B = _ == null ? void 0 : _.values, N = B ? F.map((O) => v.findIndex((L) => L.tagged_id === O.tagged_id)).map((O) => B[O]) : void 0, I = vstack(F, {
          gap: A,
          sort_data: N,
          sort_reverse: (_ == null ? void 0 : _.reverse) ?? false
        });
        return A < 0 && I.children.slice(0, -1).forEach((O) => {
          O.type === "Mark" && (O.grayout = true, O.update());
        }), frame(I, {
          clear: false,
          fill: COLORS.VIEW_BG,
          padding: [
            COL_INNER_PADDING,
            COL_INNER_PADDING
          ],
          class: "col"
        });
      }), {
        gap: w
      });
    }
    e.col_and_group = f;
    function o(v, c, m, _, x) {
      if (assert(_.width !== void 0), m.bin_size !== void 0) {
        v.forEach((w) => snug_mark(w));
        let S;
        m.collapse ? S = xaxis(v, m.values, _.width, {
          scale_data: m.scale_values,
          flip: m.reverse,
          x_padding: _.x_padding ?? r(v),
          bin_size: m.bin_size
        }) : S = xaxis_rows(v.map((w) => [
          w
        ]), m.values.map((w) => [
          w
        ]), _.width, {
          vertical_gap: ROW_GAP,
          max_items: MAX_ENTRIES,
          scale_data: m.scale_values,
          flip: m.reverse,
          sort_data: x ? x.values : void 0,
          sort_reverse: x ? x.reverse : void 0,
          bin_size: m.bin_size,
          x_padding: _.x_padding ?? r(v)
        });
        const E = frame(S, {
          padding: [
            COL_INNER_PADDING,
            COL_INNER_PADDING
          ],
          class: "col",
          clear: true,
          fill: COLORS.VIEW_BG,
          clip: true
        });
        if (m.overlay === true) return group([
          E
        ]);
        {
          const w = bin_data(m.scale_values, m.bin_size, m.scale_values).grouped, { scale: C } = S.get_scale(), D = w.flatMap((A, F) => {
            const B = A.x0, N = A.x1, I = C(B) + COL_INNER_PADDING, O = C(N) + COL_INNER_PADDING, L = F === w.length - 1 ? 0 : 1, q = rect(O - I - L, S.height + COL_INNER_PADDING * 2, {
              rx: 3,
              fill: A.length !== 0 ? COLORS.VIEW_BG : COLORS.FADE_BG
            });
            return q.x = I, [
              q
            ];
          });
          return group([
            ...D,
            E
          ]);
        }
      } else {
        assert(_.width !== void 0), v.forEach((w) => snug_mark(w));
        const S = group_marks_by_value(v, c.values, m.bin_size), E = 2 * ROW_GAP;
        return vstack(S.map((w) => {
          const C = m.values, D = w.map((A) => v.findIndex((F) => F.tagged_id === A.tagged_id)).map((A) => C[A]);
          return m.collapse ? frame(xaxis(w, D, _.width, {
            scale_data: m.scale_values,
            flip: m.reverse,
            x_padding: _.x_padding ?? r(v),
            bin_size: m.bin_size
          }), {
            class: "col",
            clear: false,
            fill: COLORS.VIEW_BG,
            padding: [
              COL_INNER_PADDING,
              COL_INNER_PADDING
            ]
          }) : frame(xaxis_rows(w.map((A) => [
            A
          ]), D.map((A) => [
            A
          ]), _.width, {
            x_padding: _.x_padding ?? r(v),
            flip: m.reverse,
            scale_data: m.scale_values
          }), {
            class: "col",
            clear: false,
            fill: COLORS.VIEW_BG,
            padding: [
              COL_INNER_PADDING,
              COL_INNER_PADDING
            ]
          });
        }), {
          gap: E
        });
      }
    }
    e.x_and_group = o;
    function p(v, c, m, _, x) {
      if (assert(_.height !== void 0), m.bin_size !== void 0) {
        v.forEach((A) => snug_mark(A));
        const S = vaxis(v, m.values, _.height, {
          y_padding: _.y_padding ?? t(v),
          flip: m.reverse,
          scale_data: m.scale_values,
          bin_size: m.bin_size
        }), E = frame(S, {
          padding: [
            COL_INNER_PADDING,
            COL_INNER_PADDING
          ],
          class: "col",
          clear: true,
          fill: COLORS.VIEW_BG,
          clip: true
        }), w = bin_data(c.values, m.bin_size, c.values).grouped, { scale: C } = S.get_scale(), D = w.flatMap((A, F) => {
          const B = A.x0, N = A.x1, I = C(B) + COL_INNER_PADDING, O = C(N) + COL_INNER_PADDING, L = m.reverse ? F === 0 ? 0 : 1 : F === w.length - 1 ? 0 : 1, q = rect(S.width + COL_INNER_PADDING * 2, m.reverse ? I - O - L : O - I - L, {
            rx: 3,
            fill: A.length !== 0 ? COLORS.VIEW_BG : COLORS.FADE_BG
          });
          return q.y = m.reverse ? O : I, [
            q
          ];
        });
        return group([
          ...D,
          E
        ]);
      } else {
        const S = group_marks_by_value(v, c.values, c.num_bins), E = 2 * ROW_GAP, w = S.length, C = (_.height - E * (w - 1) - COL_INNER_PADDING * 2 * w) / w;
        return vstack(S.map((D) => {
          const A = m.values, F = D.map((B) => v.findIndex((N) => N.tagged_id === B.tagged_id)).map((B) => A[B]);
          return frame(vaxis(D, F, C, {
            y_padding: _.y_padding ?? t(v),
            flip: m.reverse,
            scale_data: m.scale_values
          }), {
            class: "col",
            clear: false,
            fill: COLORS.VIEW_BG,
            preferred_width: _.width,
            padding: [
              COL_INNER_PADDING,
              COL_INNER_PADDING
            ]
          });
        }), {
          gap: E
        });
      }
    }
    e.y_and_group = p;
    function y(v, c, m, _) {
      assert(_.width !== void 0), assert(_.height !== void 0), v.forEach((D) => snug_mark(D));
      const x = _.width, S = _.height, { x: E, y: w } = m, C = group_marks_by_value(v, c.values, c.num_bins);
      if (c.self && E.self && E.bin_size && w.self && w.bin_size) {
        const D = E, A = w, F = plot(v, D.values, A.values, x, S, {
          flip_y: A.reverse,
          flip_x: D.reverse,
          y_scale_data: A.scale_values,
          x_scale_data: D.scale_values,
          x_padding: _.x_padding ?? r(v),
          y_padding: _.y_padding ?? t(v),
          x_bin_size: D.bin_size ?? c.num_bins,
          y_bin_size: A.bin_size ?? c.num_bins
        }), B = frame(F, {
          padding: [
            COL_INNER_PADDING,
            COL_INNER_PADDING
          ],
          class: "col",
          clear: true,
          fill: COLORS.VIEW_BG,
          clip: true
        }), N = bin_data(A.scale_values, A.bin_size ?? c.num_bins, A.values).grouped, I = bin_data(D.scale_values, D.bin_size ?? c.num_bins, D.values).grouped, { scale: O } = F.get_y_scale(), { scale: L } = F.get_x_scale(), q = w.values.map((J, Z) => [
          J,
          E.values[Z]
        ]), z = [];
        for (let J = 0; J < N.length; J++) {
          const Z = N[J].x0, ae = N[J].x1, de = O(Z) + COL_INNER_PADDING, T = O(ae) + COL_INNER_PADDING;
          for (let R = 0; R < I.length; R++) {
            const k = I[R].x0, X = I[R].x1, Y = L(k) + COL_INNER_PADDING, K = L(X) + COL_INNER_PADDING, M = J === (A.reverse ? 0 : N.length - 1) ? 0 : 1, P = R === I.length - 1 ? 0 : 1;
            let fe = q.some(([V, W]) => N[J].x0 <= V && V < N[J].x1 && I[R].x0 <= W && W < I[R].x1) ? COLORS.VIEW_BG : COLORS.FADE_BG;
            const le = D.reverse ? K : Y, pe = A.reverse ? T : de, me = D.reverse ? Y - K - P : K - Y - P, _e = A.reverse ? de - T - M : T - de - M, Ee = rect(me, _e, {
              rx: 3,
              fill: fe
            });
            Ee.y = pe, Ee.x = le, z.push(Ee);
          }
        }
        const G = z.flat();
        return group([
          ...G,
          B
        ]);
      } else if (c.self && w.self && w.bin_size) {
        const D = E, A = w, F = plot(v, D.values, A.values, x, S, {
          flip_y: A.reverse,
          flip_x: D.reverse,
          y_scale_data: A.scale_values,
          x_scale_data: D.scale_values,
          x_padding: _.x_padding ?? r(v),
          y_padding: _.y_padding ?? t(v),
          y_bin_size: A.bin_size ?? c.num_bins
        }), B = frame(F, {
          padding: [
            COL_INNER_PADDING,
            COL_INNER_PADDING
          ],
          class: "col",
          clear: true,
          fill: COLORS.VIEW_BG,
          clip: true
        }), N = bin_data(A.scale_values, A.bin_size ?? c.num_bins, A.values).grouped, { scale: I } = F.get_y_scale(), O = [];
        for (let q = 0; q < N.length; q++) {
          const z = N[q].x0, G = N[q].x1, J = I(z) + COL_INNER_PADDING, Z = I(G) + COL_INNER_PADDING, ae = q === (A.reverse ? 0 : N.length - 1) ? 0 : 1, de = rect(x + COL_INNER_PADDING * 2, A.reverse ? J - Z - ae : Z - J - ae, {
            rx: 3,
            fill: COLORS.VIEW_BG
          });
          de.y = A.reverse ? Z : J, O.push(de);
        }
        const L = O.flat();
        return group([
          ...L,
          B
        ]);
      } else {
        const D = C.length, A = 2 * ROW_GAP, F = (S - A * (D - 1) - COL_INNER_PADDING * 2 * D) / D, B = C.map((N) => {
          const I = w.values, O = N.map((G) => v.findIndex((J) => J.tagged_id === G.tagged_id)).map((G) => I[G]), L = E.values, q = N.map((G) => v.findIndex((J) => J.tagged_id === G.tagged_id)).map((G) => L[G]), z = plot(N, q, O, x, F, {
            flip_y: true,
            y_scale_data: w.scale_values,
            x_scale_data: E.scale_values,
            x_padding: _.x_padding,
            y_padding: _.y_padding,
            x_bin_size: E.bin_size,
            y_bin_size: w.bin_size
          });
          return frame(z, {
            class: "col",
            clear: false,
            fill: COLORS.VIEW_BG,
            padding: [
              COL_INNER_PADDING,
              COL_INNER_PADDING
            ]
          });
        });
        return vstack(B, {
          gap: A
        });
      }
    }
    e.xy_and_group = y;
    function g(v, c, m, _, x) {
      assert(x.width !== void 0), assert(x.height !== void 0), v.forEach((w) => snug_mark(w));
      const S = x.width, E = x.height;
      if (m.bin_size !== void 0 || _.bin_size !== void 0) {
        const w = plot(v, m.values, _.values, S, E, {
          flip_y: _.reverse,
          flip_x: m.reverse,
          y_scale_data: _.scale_values,
          x_scale_data: m.scale_values,
          x_padding: x.x_padding ?? r(v),
          y_padding: x.y_padding ?? t(v),
          x_bin_size: m.bin_size ?? c.num_bins,
          y_bin_size: _.bin_size ?? c.num_bins
        }), C = frame(w, {
          padding: [
            COL_INNER_PADDING,
            COL_INNER_PADDING
          ],
          class: "col",
          clear: true,
          fill: COLORS.VIEW_BG,
          clip: true
        }), D = group_marks_by_value(v, _.scale_values, _.bin_size ?? c.num_bins, true), A = group_marks_by_value(v, m.scale_values, m.bin_size ?? c.num_bins, true), { scale: F } = w.get_y_scale(), { scale: B } = w.get_x_scale(), N = _.values.map((L, q) => [
          L,
          m.values[q]
        ]), I = [];
        for (let L = 0; L < D.length; L++) {
          const q = D[L].x0, z = D[L].x1, G = F(q) + COL_INNER_PADDING, J = F(z) + COL_INNER_PADDING;
          for (let Z = 0; Z < A.length; Z++) {
            const ae = A[Z].x0, de = A[Z].x1, T = B(ae) + COL_INNER_PADDING, R = B(de) + COL_INNER_PADDING, k = L === D.length - 1 ? 0 : 1, X = Z === D.length - 1 ? 0 : 1, Y = rect(m.reverse ? T - R - X : R - T - X, _.reverse ? G - J - k : J - G - k, {
              rx: 3,
              fill: N.some(([K, M]) => D[L].x0 <= K && K < D[L].x1 && A[Z].x0 <= M && M < A[Z].x1) ? COLORS.VIEW_BG : COLORS.FADE_BG
            });
            Y.y = _.reverse ? J : G, Y.x = m.reverse ? R : T, I.push(Y);
          }
        }
        const O = I.flat();
        return group([
          ...O,
          C
        ]);
      } else {
        const w = group_marks_by_value(v, c.values, _.bin_size), C = 2 * ROW_GAP, D = w.length, A = (x.height - C * (D - 1) - COL_INNER_PADDING * 2 * D) / D;
        return vstack(w.map((F) => {
          const B = _.scale_values ?? _.values, N = F.map((q) => v.findIndex((z) => z.tagged_id === q.tagged_id)).map((q) => B[q]), I = m.scale_values ?? m.values, O = F.map((q) => v.findIndex((z) => z.tagged_id === q.tagged_id)).map((q) => I[q]), L = plot(F, O, N, S, A, {
            flip_y: _.reverse,
            flip_x: m.reverse,
            y_scale_data: _.scale_values,
            x_scale_data: m.scale_values,
            x_padding: x.x_padding ?? r(v),
            y_padding: x.y_padding ?? t(v)
          });
          return frame(L, {
            class: "col",
            clear: false,
            fill: COLORS.VIEW_BG,
            padding: [
              COL_INNER_PADDING,
              COL_INNER_PADDING
            ]
          });
        }), {
          gap: C
        });
      }
    }
    e.x_and_y_and_group = g;
  })(Layout || (Layout = {}));
  var commonjsGlobal = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
  function getAugmentedNamespace(e) {
    if (e.__esModule) return e;
    var t = e.default;
    if (typeof t == "function") {
      var r = function n() {
        return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
      };
      r.prototype = t.prototype;
    } else r = {};
    return Object.defineProperty(r, "__esModule", {
      value: true
    }), Object.keys(e).forEach(function(n) {
      var l = Object.getOwnPropertyDescriptor(e, n);
      Object.defineProperty(r, n, l.get ? l : {
        enumerable: true,
        get: function() {
          return e[n];
        }
      });
    }), r;
  }
  var main$1 = {}, extendStatics = function(e, t) {
    return extendStatics = Object.setPrototypeOf || {
      __proto__: []
    } instanceof Array && function(r, n) {
      r.__proto__ = n;
    } || function(r, n) {
      for (var l in n) Object.prototype.hasOwnProperty.call(n, l) && (r[l] = n[l]);
    }, extendStatics(e, t);
  };
  function __extends(e, t) {
    if (typeof t != "function" && t !== null) throw new TypeError("Class extends value " + String(t) + " is not a constructor or null");
    extendStatics(e, t);
    function r() {
      this.constructor = e;
    }
    e.prototype = t === null ? Object.create(t) : (r.prototype = t.prototype, new r());
  }
  var __assign = function() {
    return __assign = Object.assign || function(t) {
      for (var r, n = 1, l = arguments.length; n < l; n++) {
        r = arguments[n];
        for (var s in r) Object.prototype.hasOwnProperty.call(r, s) && (t[s] = r[s]);
      }
      return t;
    }, __assign.apply(this, arguments);
  };
  function __rest(e, t) {
    var r = {};
    for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
    if (e != null && typeof Object.getOwnPropertySymbols == "function") for (var l = 0, n = Object.getOwnPropertySymbols(e); l < n.length; l++) t.indexOf(n[l]) < 0 && Object.prototype.propertyIsEnumerable.call(e, n[l]) && (r[n[l]] = e[n[l]]);
    return r;
  }
  function __decorate(e, t, r, n) {
    var l = arguments.length, s = l < 3 ? t : n === null ? n = Object.getOwnPropertyDescriptor(t, r) : n, u;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function") s = Reflect.decorate(e, t, r, n);
    else for (var d = e.length - 1; d >= 0; d--) (u = e[d]) && (s = (l < 3 ? u(s) : l > 3 ? u(t, r, s) : u(t, r)) || s);
    return l > 3 && s && Object.defineProperty(t, r, s), s;
  }
  function __param(e, t) {
    return function(r, n) {
      t(r, n, e);
    };
  }
  function __esDecorate(e, t, r, n, l, s) {
    function u(_) {
      if (_ !== void 0 && typeof _ != "function") throw new TypeError("Function expected");
      return _;
    }
    for (var d = n.kind, h = d === "getter" ? "get" : d === "setter" ? "set" : "value", f = !t && e ? n.static ? e : e.prototype : null, o = t || (f ? Object.getOwnPropertyDescriptor(f, n.name) : {}), p, y = false, g = r.length - 1; g >= 0; g--) {
      var v = {};
      for (var c in n) v[c] = c === "access" ? {} : n[c];
      for (var c in n.access) v.access[c] = n.access[c];
      v.addInitializer = function(_) {
        if (y) throw new TypeError("Cannot add initializers after decoration has completed");
        s.push(u(_ || null));
      };
      var m = (0, r[g])(d === "accessor" ? {
        get: o.get,
        set: o.set
      } : o[h], v);
      if (d === "accessor") {
        if (m === void 0) continue;
        if (m === null || typeof m != "object") throw new TypeError("Object expected");
        (p = u(m.get)) && (o.get = p), (p = u(m.set)) && (o.set = p), (p = u(m.init)) && l.unshift(p);
      } else (p = u(m)) && (d === "field" ? l.unshift(p) : o[h] = p);
    }
    f && Object.defineProperty(f, n.name, o), y = true;
  }
  function __runInitializers(e, t, r) {
    for (var n = arguments.length > 2, l = 0; l < t.length; l++) r = n ? t[l].call(e, r) : t[l].call(e);
    return n ? r : void 0;
  }
  function __propKey(e) {
    return typeof e == "symbol" ? e : "".concat(e);
  }
  function __setFunctionName(e, t, r) {
    return typeof t == "symbol" && (t = t.description ? "[".concat(t.description, "]") : ""), Object.defineProperty(e, "name", {
      configurable: true,
      value: r ? "".concat(r, " ", t) : t
    });
  }
  function __metadata(e, t) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function") return Reflect.metadata(e, t);
  }
  function __awaiter(e, t, r, n) {
    function l(s) {
      return s instanceof r ? s : new r(function(u) {
        u(s);
      });
    }
    return new (r || (r = Promise))(function(s, u) {
      function d(o) {
        try {
          f(n.next(o));
        } catch (p) {
          u(p);
        }
      }
      function h(o) {
        try {
          f(n.throw(o));
        } catch (p) {
          u(p);
        }
      }
      function f(o) {
        o.done ? s(o.value) : l(o.value).then(d, h);
      }
      f((n = n.apply(e, t || [])).next());
    });
  }
  function __generator(e, t) {
    var r = {
      label: 0,
      sent: function() {
        if (s[0] & 1) throw s[1];
        return s[1];
      },
      trys: [],
      ops: []
    }, n, l, s, u = Object.create((typeof Iterator == "function" ? Iterator : Object).prototype);
    return u.next = d(0), u.throw = d(1), u.return = d(2), typeof Symbol == "function" && (u[Symbol.iterator] = function() {
      return this;
    }), u;
    function d(f) {
      return function(o) {
        return h([
          f,
          o
        ]);
      };
    }
    function h(f) {
      if (n) throw new TypeError("Generator is already executing.");
      for (; u && (u = 0, f[0] && (r = 0)), r; ) try {
        if (n = 1, l && (s = f[0] & 2 ? l.return : f[0] ? l.throw || ((s = l.return) && s.call(l), 0) : l.next) && !(s = s.call(l, f[1])).done) return s;
        switch (l = 0, s && (f = [
          f[0] & 2,
          s.value
        ]), f[0]) {
          case 0:
          case 1:
            s = f;
            break;
          case 4:
            return r.label++, {
              value: f[1],
              done: false
            };
          case 5:
            r.label++, l = f[1], f = [
              0
            ];
            continue;
          case 7:
            f = r.ops.pop(), r.trys.pop();
            continue;
          default:
            if (s = r.trys, !(s = s.length > 0 && s[s.length - 1]) && (f[0] === 6 || f[0] === 2)) {
              r = 0;
              continue;
            }
            if (f[0] === 3 && (!s || f[1] > s[0] && f[1] < s[3])) {
              r.label = f[1];
              break;
            }
            if (f[0] === 6 && r.label < s[1]) {
              r.label = s[1], s = f;
              break;
            }
            if (s && r.label < s[2]) {
              r.label = s[2], r.ops.push(f);
              break;
            }
            s[2] && r.ops.pop(), r.trys.pop();
            continue;
        }
        f = t.call(e, r);
      } catch (o) {
        f = [
          6,
          o
        ], l = 0;
      } finally {
        n = s = 0;
      }
      if (f[0] & 5) throw f[1];
      return {
        value: f[0] ? f[1] : void 0,
        done: true
      };
    }
  }
  var __createBinding = Object.create ? function(e, t, r, n) {
    n === void 0 && (n = r);
    var l = Object.getOwnPropertyDescriptor(t, r);
    (!l || ("get" in l ? !t.__esModule : l.writable || l.configurable)) && (l = {
      enumerable: true,
      get: function() {
        return t[r];
      }
    }), Object.defineProperty(e, n, l);
  } : function(e, t, r, n) {
    n === void 0 && (n = r), e[n] = t[r];
  };
  function __exportStar(e, t) {
    for (var r in e) r !== "default" && !Object.prototype.hasOwnProperty.call(t, r) && __createBinding(t, e, r);
  }
  function __values(e) {
    var t = typeof Symbol == "function" && Symbol.iterator, r = t && e[t], n = 0;
    if (r) return r.call(e);
    if (e && typeof e.length == "number") return {
      next: function() {
        return e && n >= e.length && (e = void 0), {
          value: e && e[n++],
          done: !e
        };
      }
    };
    throw new TypeError(t ? "Object is not iterable." : "Symbol.iterator is not defined.");
  }
  function __read(e, t) {
    var r = typeof Symbol == "function" && e[Symbol.iterator];
    if (!r) return e;
    var n = r.call(e), l, s = [], u;
    try {
      for (; (t === void 0 || t-- > 0) && !(l = n.next()).done; ) s.push(l.value);
    } catch (d) {
      u = {
        error: d
      };
    } finally {
      try {
        l && !l.done && (r = n.return) && r.call(n);
      } finally {
        if (u) throw u.error;
      }
    }
    return s;
  }
  function __spread() {
    for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(__read(arguments[t]));
    return e;
  }
  function __spreadArrays() {
    for (var e = 0, t = 0, r = arguments.length; t < r; t++) e += arguments[t].length;
    for (var n = Array(e), l = 0, t = 0; t < r; t++) for (var s = arguments[t], u = 0, d = s.length; u < d; u++, l++) n[l] = s[u];
    return n;
  }
  function __spreadArray(e, t, r) {
    if (r || arguments.length === 2) for (var n = 0, l = t.length, s; n < l; n++) (s || !(n in t)) && (s || (s = Array.prototype.slice.call(t, 0, n)), s[n] = t[n]);
    return e.concat(s || Array.prototype.slice.call(t));
  }
  function __await(e) {
    return this instanceof __await ? (this.v = e, this) : new __await(e);
  }
  function __asyncGenerator(e, t, r) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var n = r.apply(e, t || []), l, s = [];
    return l = Object.create((typeof AsyncIterator == "function" ? AsyncIterator : Object).prototype), d("next"), d("throw"), d("return", u), l[Symbol.asyncIterator] = function() {
      return this;
    }, l;
    function u(g) {
      return function(v) {
        return Promise.resolve(v).then(g, p);
      };
    }
    function d(g, v) {
      n[g] && (l[g] = function(c) {
        return new Promise(function(m, _) {
          s.push([
            g,
            c,
            m,
            _
          ]) > 1 || h(g, c);
        });
      }, v && (l[g] = v(l[g])));
    }
    function h(g, v) {
      try {
        f(n[g](v));
      } catch (c) {
        y(s[0][3], c);
      }
    }
    function f(g) {
      g.value instanceof __await ? Promise.resolve(g.value.v).then(o, p) : y(s[0][2], g);
    }
    function o(g) {
      h("next", g);
    }
    function p(g) {
      h("throw", g);
    }
    function y(g, v) {
      g(v), s.shift(), s.length && h(s[0][0], s[0][1]);
    }
  }
  function __asyncDelegator(e) {
    var t, r;
    return t = {}, n("next"), n("throw", function(l) {
      throw l;
    }), n("return"), t[Symbol.iterator] = function() {
      return this;
    }, t;
    function n(l, s) {
      t[l] = e[l] ? function(u) {
        return (r = !r) ? {
          value: __await(e[l](u)),
          done: false
        } : s ? s(u) : u;
      } : s;
    }
  }
  function __asyncValues(e) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var t = e[Symbol.asyncIterator], r;
    return t ? t.call(e) : (e = typeof __values == "function" ? __values(e) : e[Symbol.iterator](), r = {}, n("next"), n("throw"), n("return"), r[Symbol.asyncIterator] = function() {
      return this;
    }, r);
    function n(s) {
      r[s] = e[s] && function(u) {
        return new Promise(function(d, h) {
          u = e[s](u), l(d, h, u.done, u.value);
        });
      };
    }
    function l(s, u, d, h) {
      Promise.resolve(h).then(function(f) {
        s({
          value: f,
          done: d
        });
      }, u);
    }
  }
  function __makeTemplateObject(e, t) {
    return Object.defineProperty ? Object.defineProperty(e, "raw", {
      value: t
    }) : e.raw = t, e;
  }
  var __setModuleDefault = Object.create ? function(e, t) {
    Object.defineProperty(e, "default", {
      enumerable: true,
      value: t
    });
  } : function(e, t) {
    e.default = t;
  }, ownKeys$1 = function(e) {
    return ownKeys$1 = Object.getOwnPropertyNames || function(t) {
      var r = [];
      for (var n in t) Object.prototype.hasOwnProperty.call(t, n) && (r[r.length] = n);
      return r;
    }, ownKeys$1(e);
  };
  function __importStar(e) {
    if (e && e.__esModule) return e;
    var t = {};
    if (e != null) for (var r = ownKeys$1(e), n = 0; n < r.length; n++) r[n] !== "default" && __createBinding(t, e, r[n]);
    return __setModuleDefault(t, e), t;
  }
  function __importDefault(e) {
    return e && e.__esModule ? e : {
      default: e
    };
  }
  function __classPrivateFieldGet(e, t, r, n) {
    if (r === "a" && !n) throw new TypeError("Private accessor was defined without a getter");
    if (typeof t == "function" ? e !== t || !n : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return r === "m" ? n : r === "a" ? n.call(e) : n ? n.value : t.get(e);
  }
  function __classPrivateFieldSet(e, t, r, n, l) {
    if (n === "m") throw new TypeError("Private method is not writable");
    if (n === "a" && !l) throw new TypeError("Private accessor was defined without a setter");
    if (typeof t == "function" ? e !== t || !l : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return n === "a" ? l.call(e, r) : l ? l.value = r : t.set(e, r), r;
  }
  function __classPrivateFieldIn(e, t) {
    if (t === null || typeof t != "object" && typeof t != "function") throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof e == "function" ? t === e : e.has(t);
  }
  function __addDisposableResource(e, t, r) {
    if (t != null) {
      if (typeof t != "object" && typeof t != "function") throw new TypeError("Object expected.");
      var n, l;
      if (r) {
        if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
        n = t[Symbol.asyncDispose];
      }
      if (n === void 0) {
        if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
        n = t[Symbol.dispose], r && (l = n);
      }
      if (typeof n != "function") throw new TypeError("Object not disposable.");
      l && (n = function() {
        try {
          l.call(this);
        } catch (s) {
          return Promise.reject(s);
        }
      }), e.stack.push({
        value: t,
        dispose: n,
        async: r
      });
    } else r && e.stack.push({
      async: true
    });
    return t;
  }
  var _SuppressedError = typeof SuppressedError == "function" ? SuppressedError : function(e, t, r) {
    var n = new Error(r);
    return n.name = "SuppressedError", n.error = e, n.suppressed = t, n;
  };
  function __disposeResources(e) {
    function t(s) {
      e.error = e.hasError ? new _SuppressedError(s, e.error, "An error was suppressed during disposal.") : s, e.hasError = true;
    }
    var r, n = 0;
    function l() {
      for (; r = e.stack.pop(); ) try {
        if (!r.async && n === 1) return n = 0, e.stack.push(r), Promise.resolve().then(l);
        if (r.dispose) {
          var s = r.dispose.call(r.value);
          if (r.async) return n |= 2, Promise.resolve(s).then(l, function(u) {
            return t(u), l();
          });
        } else n |= 1;
      } catch (u) {
        t(u);
      }
      if (n === 1) return e.hasError ? Promise.reject(e.error) : Promise.resolve();
      if (e.hasError) throw e.error;
    }
    return l();
  }
  function __rewriteRelativeImportExtension(e, t) {
    return typeof e == "string" && /^\.\.?\//.test(e) ? e.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i, function(r, n, l, s, u) {
      return n ? t ? ".jsx" : ".js" : l && (!s || !u) ? r : l + s + "." + u.toLowerCase() + "js";
    }) : e;
  }
  const tslib_es6 = {
    __extends,
    __assign,
    __rest,
    __decorate,
    __param,
    __esDecorate,
    __runInitializers,
    __propKey,
    __setFunctionName,
    __metadata,
    __awaiter,
    __generator,
    __createBinding,
    __exportStar,
    __values,
    __read,
    __spread,
    __spreadArrays,
    __spreadArray,
    __await,
    __asyncGenerator,
    __asyncDelegator,
    __asyncValues,
    __makeTemplateObject,
    __importStar,
    __importDefault,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __classPrivateFieldIn,
    __addDisposableResource,
    __disposeResources,
    __rewriteRelativeImportExtension
  }, tslib_es6$1 = Object.freeze(Object.defineProperty({
    __proto__: null,
    __addDisposableResource,
    get __assign() {
      return __assign;
    },
    __asyncDelegator,
    __asyncGenerator,
    __asyncValues,
    __await,
    __awaiter,
    __classPrivateFieldGet,
    __classPrivateFieldIn,
    __classPrivateFieldSet,
    __createBinding,
    __decorate,
    __disposeResources,
    __esDecorate,
    __exportStar,
    __extends,
    __generator,
    __importDefault,
    __importStar,
    __makeTemplateObject,
    __metadata,
    __param,
    __propKey,
    __read,
    __rest,
    __rewriteRelativeImportExtension,
    __runInitializers,
    __setFunctionName,
    __spread,
    __spreadArray,
    __spreadArrays,
    __values,
    default: tslib_es6
  }, Symbol.toStringTag, {
    value: "Module"
  })), require$$0 = getAugmentedNamespace(tslib_es6$1), __viteBrowserExternal = {}, __viteBrowserExternal$1 = Object.freeze(Object.defineProperty({
    __proto__: null,
    default: __viteBrowserExternal
  }, Symbol.toStringTag, {
    value: "Module"
  })), require$$1 = getAugmentedNamespace(__viteBrowserExternal$1);
  var main = {}, fork = {
    exports: {}
  }, types = {
    exports: {}
  }, shared = {}, hasRequiredShared;
  function requireShared() {
    if (hasRequiredShared) return shared;
    hasRequiredShared = 1, Object.defineProperty(shared, "__esModule", {
      value: true
    }), shared.maybeSetModuleExports = void 0;
    var e = require$$0, t = e.__importDefault(requireTypes());
    function r(l) {
      var s = l.use(t.default), u = s.Type, d = s.builtInTypes, h = d.number;
      function f(g) {
        return u.from(function(v) {
          return h.check(v) && v >= g;
        }, h + " >= " + g);
      }
      var o = {
        null: function() {
          return null;
        },
        emptyArray: function() {
          return [];
        },
        false: function() {
          return false;
        },
        true: function() {
          return true;
        },
        undefined: function() {
        },
        "use strict": function() {
          return "use strict";
        }
      }, p = u.or(d.string, d.number, d.boolean, d.null, d.undefined), y = u.from(function(g) {
        if (g === null) return true;
        var v = typeof g;
        return !(v === "object" || v === "function");
      }, p.toString());
      return {
        geq: f,
        defaults: o,
        isPrimitive: y
      };
    }
    shared.default = r;
    function n(l) {
      try {
        var s = l(), u = s.exports, d = u.default;
      } catch {
        return;
      }
      d && d !== u && typeof u == "object" && (Object.assign(d, u, {
        default: d
      }), u.__esModule && Object.defineProperty(d, "__esModule", {
        value: true
      }), s.exports = d);
    }
    return shared.maybeSetModuleExports = n, shared;
  }
  types.exports;
  var hasRequiredTypes;
  function requireTypes() {
    return hasRequiredTypes || (hasRequiredTypes = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      }), t.Def = void 0;
      var r = require$$0, n = requireShared(), l = Object.prototype, s = l.toString, u = l.hasOwnProperty, d = function() {
        function _() {
        }
        return _.prototype.assert = function(x, S) {
          if (!this.check(x, S)) {
            var E = c(x);
            throw new Error(E + " does not match type " + this);
          }
          return true;
        }, _.prototype.arrayOf = function() {
          var x = this;
          return new h(x);
        }, _;
      }(), h = function(_) {
        r.__extends(x, _);
        function x(S) {
          var E = _.call(this) || this;
          return E.elemType = S, E.kind = "ArrayType", E;
        }
        return x.prototype.toString = function() {
          return "[" + this.elemType + "]";
        }, x.prototype.check = function(S, E) {
          var w = this;
          return Array.isArray(S) && S.every(function(C) {
            return w.elemType.check(C, E);
          });
        }, x;
      }(d), f = function(_) {
        r.__extends(x, _);
        function x(S) {
          var E = _.call(this) || this;
          return E.value = S, E.kind = "IdentityType", E;
        }
        return x.prototype.toString = function() {
          return String(this.value);
        }, x.prototype.check = function(S, E) {
          var w = S === this.value;
          return !w && typeof E == "function" && E(this, S), w;
        }, x;
      }(d), o = function(_) {
        r.__extends(x, _);
        function x(S) {
          var E = _.call(this) || this;
          return E.fields = S, E.kind = "ObjectType", E;
        }
        return x.prototype.toString = function() {
          return "{ " + this.fields.join(", ") + " }";
        }, x.prototype.check = function(S, E) {
          return s.call(S) === s.call({}) && this.fields.every(function(w) {
            return w.type.check(S[w.name], E);
          });
        }, x;
      }(d), p = function(_) {
        r.__extends(x, _);
        function x(S) {
          var E = _.call(this) || this;
          return E.types = S, E.kind = "OrType", E;
        }
        return x.prototype.toString = function() {
          return this.types.join(" | ");
        }, x.prototype.check = function(S, E) {
          return this.types.some(function(w) {
            return w.check(S, !!E);
          }) ? true : (typeof E == "function" && E(this, S), false);
        }, x;
      }(d), y = function(_) {
        r.__extends(x, _);
        function x(S, E) {
          var w = _.call(this) || this;
          return w.name = S, w.predicate = E, w.kind = "PredicateType", w;
        }
        return x.prototype.toString = function() {
          return this.name;
        }, x.prototype.check = function(S, E) {
          var w = this.predicate(S, E);
          return !w && typeof E == "function" && E(this, S), w;
        }, x;
      }(d), g = function() {
        function _(x, S) {
          this.type = x, this.typeName = S, this.baseNames = [], this.ownFields = /* @__PURE__ */ Object.create(null), this.allSupertypes = /* @__PURE__ */ Object.create(null), this.supertypeList = [], this.allFields = /* @__PURE__ */ Object.create(null), this.fieldNames = [], this.finalized = false, this.buildable = false, this.buildParams = [];
        }
        return _.prototype.isSupertypeOf = function(x) {
          if (x instanceof _) {
            if (this.finalized !== true || x.finalized !== true) throw new Error("");
            return u.call(x.allSupertypes, this.typeName);
          } else throw new Error(x + " is not a Def");
        }, _.prototype.checkAllFields = function(x, S) {
          var E = this.allFields;
          if (this.finalized !== true) throw new Error("" + this.typeName);
          function w(C) {
            var D = E[C], A = D.type, F = D.getValue(x);
            return A.check(F, S);
          }
          return x !== null && typeof x == "object" && Object.keys(E).every(w);
        }, _.prototype.bases = function() {
          for (var x = [], S = 0; S < arguments.length; S++) x[S] = arguments[S];
          var E = this.baseNames;
          if (this.finalized) {
            if (x.length !== E.length) throw new Error("");
            for (var w = 0; w < x.length; w++) if (x[w] !== E[w]) throw new Error("");
            return this;
          }
          return x.forEach(function(C) {
            E.indexOf(C) < 0 && E.push(C);
          }), this;
        }, _;
      }();
      t.Def = g;
      var v = function() {
        function _(x, S, E, w) {
          this.name = x, this.type = S, this.defaultFn = E, this.hidden = !!w;
        }
        return _.prototype.toString = function() {
          return JSON.stringify(this.name) + ": " + this.type;
        }, _.prototype.getValue = function(x) {
          var S = x[this.name];
          return typeof S < "u" || typeof this.defaultFn == "function" && (S = this.defaultFn.call(x)), S;
        }, _;
      }();
      function c(_) {
        return Array.isArray(_) ? "[" + _.map(c).join(", ") + "]" : _ && typeof _ == "object" ? "{ " + Object.keys(_).map(function(x) {
          return x + ": " + _[x];
        }).join(", ") + " }" : JSON.stringify(_);
      }
      function m(_) {
        var x = {
          or: function() {
            for (var V = [], W = 0; W < arguments.length; W++) V[W] = arguments[W];
            return new p(V.map(function(H) {
              return x.from(H);
            }));
          },
          from: function(V, W) {
            if (V instanceof h || V instanceof f || V instanceof o || V instanceof p || V instanceof y) return V;
            if (V instanceof g) return V.type;
            if (A.check(V)) {
              if (V.length !== 1) throw new Error("only one element type is permitted for typed arrays");
              return new h(x.from(V[0]));
            }
            if (F.check(V)) return new o(Object.keys(V).map(function(Q) {
              return new v(Q, x.from(V[Q], Q));
            }));
            if (typeof V == "function") {
              var H = S.indexOf(V);
              if (H >= 0) return E[H];
              if (typeof W != "string") throw new Error("missing name");
              return new y(W, V);
            }
            return new f(V);
          },
          def: function(V) {
            return u.call(J, V) ? J[V] : J[V] = new ae(V);
          },
          hasDef: function(V) {
            return u.call(J, V);
          }
        }, S = [], E = [];
        function w(V, W) {
          var H = s.call(W), Q = new y(V, function(ne) {
            return s.call(ne) === H;
          });
          return W && typeof W.constructor == "function" && (S.push(W.constructor), E.push(Q)), Q;
        }
        var C = w("string", "truthy"), D = w("function", function() {
        }), A = w("array", []), F = w("object", {}), B = w("RegExp", /./), N = w("Date", /* @__PURE__ */ new Date()), I = w("number", 3), O = w("boolean", true), L = w("null", null), q = w("undefined", void 0), z = typeof BigInt == "function" ? w("BigInt", BigInt(1234)) : new y("BigInt", function() {
          return false;
        }), G = {
          string: C,
          function: D,
          array: A,
          object: F,
          RegExp: B,
          Date: N,
          number: I,
          boolean: O,
          null: L,
          undefined: q,
          BigInt: z
        }, J = /* @__PURE__ */ Object.create(null);
        function Z(V) {
          if (V && typeof V == "object") {
            var W = V.type;
            if (typeof W == "string" && u.call(J, W)) {
              var H = J[W];
              if (H.finalized) return H;
            }
          }
          return null;
        }
        var ae = function(V) {
          r.__extends(W, V);
          function W(H) {
            var Q = V.call(this, new y(H, function(ne, ie) {
              return Q.check(ne, ie);
            }), H) || this;
            return Q;
          }
          return W.prototype.check = function(H, Q) {
            if (this.finalized !== true) throw new Error("prematurely checking unfinalized type " + this.typeName);
            if (H === null || typeof H != "object") return false;
            var ne = Z(H);
            return ne ? Q && ne === this ? this.checkAllFields(H, Q) : this.isSupertypeOf(ne) ? Q ? ne.checkAllFields(H, Q) && this.checkAllFields(H, false) : true : false : this.typeName === "SourceLocation" || this.typeName === "Position" ? this.checkAllFields(H, Q) : false;
          }, W.prototype.build = function() {
            for (var H = this, Q = [], ne = 0; ne < arguments.length; ne++) Q[ne] = arguments[ne];
            if (this.buildParams = Q, this.buildable) return this;
            this.field("type", String, function() {
              return H.typeName;
            }), this.buildable = true;
            var ie = function(ce, ue, xe, ve) {
              if (!u.call(ce, ue)) {
                var be = H.allFields;
                if (!u.call(be, ue)) throw new Error("" + ue);
                var ge = be[ue], Ne = ge.type, we;
                if (ve) we = xe;
                else if (ge.defaultFn) we = ge.defaultFn.call(ce);
                else {
                  var ke = "no value or default function given for field " + JSON.stringify(ue) + " of " + H.typeName + "(" + H.buildParams.map(function(Ae) {
                    return be[Ae];
                  }).join(", ") + ")";
                  throw new Error(ke);
                }
                if (!Ne.check(we)) throw new Error(c(we) + " does not match field " + ge + " of type " + H.typeName);
                ce[ue] = we;
              }
            }, he = function() {
              for (var ce = [], ue = 0; ue < arguments.length; ue++) ce[ue] = arguments[ue];
              var xe = ce.length;
              if (!H.finalized) throw new Error("attempting to instantiate unfinalized type " + H.typeName);
              var ve = Object.create(k);
              if (H.buildParams.forEach(function(be, ge) {
                ge < xe ? ie(ve, be, ce[ge], true) : ie(ve, be, null, false);
              }), Object.keys(H.allFields).forEach(function(be) {
                ie(ve, be, null, false);
              }), ve.type !== H.typeName) throw new Error("");
              return ve;
            };
            return he.from = function(ce) {
              if (!H.finalized) throw new Error("attempting to instantiate unfinalized type " + H.typeName);
              var ue = Object.create(k);
              if (Object.keys(H.allFields).forEach(function(xe) {
                u.call(ce, xe) ? ie(ue, xe, ce[xe], true) : ie(ue, xe, null, false);
              }), ue.type !== H.typeName) throw new Error("");
              return ue;
            }, Object.defineProperty(R, Y(this.typeName), {
              enumerable: true,
              value: he
            }), this;
          }, W.prototype.field = function(H, Q, ne, ie) {
            return this.finalized ? (console.error("Ignoring attempt to redefine field " + JSON.stringify(H) + " of finalized type " + JSON.stringify(this.typeName)), this) : (this.ownFields[H] = new v(H, x.from(Q), ne, ie), this);
          }, W.prototype.finalize = function() {
            var H = this;
            if (!this.finalized) {
              var Q = this.allFields, ne = this.allSupertypes;
              this.baseNames.forEach(function(he) {
                var ce = J[he];
                if (ce instanceof g) ce.finalize(), _e(Q, ce.allFields), _e(ne, ce.allSupertypes);
                else {
                  var ue = "unknown supertype name " + JSON.stringify(he) + " for subtype " + JSON.stringify(H.typeName);
                  throw new Error(ue);
                }
              }), _e(Q, this.ownFields), ne[this.typeName] = this, this.fieldNames.length = 0;
              for (var ie in Q) u.call(Q, ie) && !Q[ie].hidden && this.fieldNames.push(ie);
              Object.defineProperty(M, this.typeName, {
                enumerable: true,
                value: this.type
              }), this.finalized = true, me(this.typeName, this.supertypeList), this.buildable && this.supertypeList.lastIndexOf("Expression") >= 0 && pe(this.typeName);
            }
          }, W;
        }(g);
        function de(V) {
          if (!u.call(J, V)) throw new Error("");
          var W = J[V];
          if (W.finalized !== true) throw new Error("");
          return W.supertypeList.slice(1);
        }
        function T(V) {
          for (var W = {}, H = Object.keys(J), Q = H.length, ne = 0; ne < Q; ++ne) {
            var ie = H[ne], he = J[ie];
            if (he.finalized !== true) throw new Error("" + ie);
            for (var ce = 0; ce < he.supertypeList.length; ++ce) {
              var ue = he.supertypeList[ce];
              if (u.call(V, ue)) {
                W[ie] = ue;
                break;
              }
            }
          }
          return W;
        }
        var R = /* @__PURE__ */ Object.create(null), k = {};
        function X(V, W) {
          var H = k[V];
          return q.check(W) ? delete k[V] : (D.assert(W), Object.defineProperty(k, V, {
            enumerable: true,
            configurable: true,
            value: W
          })), H;
        }
        function Y(V) {
          return V.replace(/^[A-Z]+/, function(W) {
            var H = W.length;
            switch (H) {
              case 0:
                return "";
              case 1:
                return W.toLowerCase();
              default:
                return W.slice(0, H - 1).toLowerCase() + W.charAt(H - 1);
            }
          });
        }
        function K(V) {
          return V = Y(V), V.replace(/(Expression)?$/, "Statement");
        }
        var M = {};
        function P(V) {
          var W = Z(V);
          if (W) return W.fieldNames.slice(0);
          if ("type" in V) throw new Error("did not recognize object of type " + JSON.stringify(V.type));
          return Object.keys(V);
        }
        function se(V, W) {
          var H = Z(V);
          if (H) {
            var Q = H.allFields[W];
            if (Q) return Q.getValue(V);
          }
          return V && V[W];
        }
        function fe(V, W, H) {
          P(V).forEach(function(Q) {
            W.call(this, Q, se(V, Q));
          }, H);
        }
        function le(V, W, H) {
          return P(V).some(function(Q) {
            return W.call(this, Q, se(V, Q));
          }, H);
        }
        function pe(V) {
          var W = K(V);
          if (!R[W]) {
            var H = R[Y(V)];
            if (H) {
              var Q = function() {
                for (var ne = [], ie = 0; ie < arguments.length; ie++) ne[ie] = arguments[ie];
                return R.expressionStatement(H.apply(R, ne));
              };
              Q.from = function() {
                for (var ne = [], ie = 0; ie < arguments.length; ie++) ne[ie] = arguments[ie];
                return R.expressionStatement(H.from.apply(R, ne));
              }, R[W] = Q;
            }
          }
        }
        function me(V, W) {
          W.length = 0, W.push(V);
          for (var H = /* @__PURE__ */ Object.create(null), Q = 0; Q < W.length; ++Q) {
            V = W[Q];
            var ne = J[V];
            if (ne.finalized !== true) throw new Error("");
            u.call(H, V) && delete W[H[V]], H[V] = Q, W.push.apply(W, ne.baseNames);
          }
          for (var ie = 0, he = ie, ce = W.length; he < ce; ++he) u.call(W, he) && (W[ie++] = W[he]);
          W.length = ie;
        }
        function _e(V, W) {
          return Object.keys(W).forEach(function(H) {
            V[H] = W[H];
          }), V;
        }
        function Ee() {
          Object.keys(J).forEach(function(V) {
            J[V].finalize();
          });
        }
        return {
          Type: x,
          builtInTypes: G,
          getSupertypeNames: de,
          computeSupertypeLookupTable: T,
          builders: R,
          defineMethod: X,
          getBuilderName: Y,
          getStatementBuilderName: K,
          namedTypes: M,
          getFieldNames: P,
          getFieldValue: se,
          eachField: fe,
          someField: le,
          finalize: Ee
        };
      }
      t.default = m, (0, n.maybeSetModuleExports)(function() {
        return e;
      });
    }(types, types.exports)), types.exports;
  }
  var pathVisitor = {
    exports: {}
  }, nodePath = {
    exports: {}
  }, path = {
    exports: {}
  };
  path.exports;
  var hasRequiredPath;
  function requirePath() {
    return hasRequiredPath || (hasRequiredPath = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = requireShared(), l = r.__importDefault(requireTypes()), s = Object.prototype, u = s.hasOwnProperty;
      function d(h) {
        var f = h.use(l.default), o = f.builtInTypes.array, p = f.builtInTypes.number, y = function S(E, w, C) {
          if (!(this instanceof S)) throw new Error("Path constructor cannot be invoked without 'new'");
          if (w) {
            if (!(w instanceof S)) throw new Error("");
          } else w = null, C = null;
          this.value = E, this.parentPath = w, this.name = C, this.__childCache = null;
        }, g = y.prototype;
        function v(S) {
          return S.__childCache || (S.__childCache = /* @__PURE__ */ Object.create(null));
        }
        function c(S, E) {
          var w = v(S), C = S.getValueProperty(E), D = w[E];
          return (!u.call(w, E) || D.value !== C) && (D = w[E] = new S.constructor(C, S, E)), D;
        }
        g.getValueProperty = function(E) {
          return this.value[E];
        }, g.get = function() {
          for (var E = [], w = 0; w < arguments.length; w++) E[w] = arguments[w];
          for (var C = this, D = E.length, A = 0; A < D; ++A) C = c(C, E[A]);
          return C;
        }, g.each = function(E, w) {
          for (var C = [], D = this.value.length, A = 0, A = 0; A < D; ++A) u.call(this.value, A) && (C[A] = this.get(A));
          for (w = w || this, A = 0; A < D; ++A) u.call(C, A) && E.call(w, C[A]);
        }, g.map = function(E, w) {
          var C = [];
          return this.each(function(D) {
            C.push(E.call(this, D));
          }, w), C;
        }, g.filter = function(E, w) {
          var C = [];
          return this.each(function(D) {
            E.call(this, D) && C.push(D);
          }, w), C;
        };
        function m() {
        }
        function _(S, E, w, C) {
          if (o.assert(S.value), E === 0) return m;
          var D = S.value.length;
          if (D < 1) return m;
          var A = arguments.length;
          A === 2 ? (w = 0, C = D) : A === 3 ? (w = Math.max(w, 0), C = D) : (w = Math.max(w, 0), C = Math.min(C, D)), p.assert(w), p.assert(C);
          for (var F = /* @__PURE__ */ Object.create(null), B = v(S), N = w; N < C; ++N) if (u.call(S.value, N)) {
            var I = S.get(N);
            if (I.name !== N) throw new Error("");
            var O = N + E;
            I.name = O, F[O] = I, delete B[N];
          }
          return delete B.length, function() {
            for (var L in F) {
              var q = F[L];
              if (q.name !== +L) throw new Error("");
              B[L] = q, S.value[L] = q.value;
            }
          };
        }
        g.shift = function() {
          var E = _(this, -1), w = this.value.shift();
          return E(), w;
        }, g.unshift = function() {
          for (var E = [], w = 0; w < arguments.length; w++) E[w] = arguments[w];
          var C = _(this, E.length), D = this.value.unshift.apply(this.value, E);
          return C(), D;
        }, g.push = function() {
          for (var E = [], w = 0; w < arguments.length; w++) E[w] = arguments[w];
          return o.assert(this.value), delete v(this).length, this.value.push.apply(this.value, E);
        }, g.pop = function() {
          o.assert(this.value);
          var E = v(this);
          return delete E[this.value.length - 1], delete E.length, this.value.pop();
        }, g.insertAt = function(E) {
          var w = arguments.length, C = _(this, w - 1, E);
          if (C === m && w <= 1) return this;
          E = Math.max(E, 0);
          for (var D = 1; D < w; ++D) this.value[E + D - 1] = arguments[D];
          return C(), this;
        }, g.insertBefore = function() {
          for (var E = [], w = 0; w < arguments.length; w++) E[w] = arguments[w];
          for (var C = this.parentPath, D = E.length, A = [
            this.name
          ], F = 0; F < D; ++F) A.push(E[F]);
          return C.insertAt.apply(C, A);
        }, g.insertAfter = function() {
          for (var E = [], w = 0; w < arguments.length; w++) E[w] = arguments[w];
          for (var C = this.parentPath, D = E.length, A = [
            this.name + 1
          ], F = 0; F < D; ++F) A.push(E[F]);
          return C.insertAt.apply(C, A);
        };
        function x(S) {
          if (!(S instanceof y)) throw new Error("");
          var E = S.parentPath;
          if (!E) return S;
          var w = E.value, C = v(E);
          if (w[S.name] === S.value) C[S.name] = S;
          else if (o.check(w)) {
            var D = w.indexOf(S.value);
            D >= 0 && (C[S.name = D] = S);
          } else w[S.name] = S.value, C[S.name] = S;
          if (w[S.name] !== S.value) throw new Error("");
          if (S.parentPath.get(S.name) !== S) throw new Error("");
          return S;
        }
        return g.replace = function(E) {
          var w = [], C = this.parentPath.value, D = v(this.parentPath), A = arguments.length;
          if (x(this), o.check(C)) {
            for (var F = C.length, B = _(this.parentPath, A - 1, this.name + 1), N = [
              this.name,
              1
            ], I = 0; I < A; ++I) N.push(arguments[I]);
            var O = C.splice.apply(C, N);
            if (O[0] !== this.value) throw new Error("");
            if (C.length !== F - 1 + A) throw new Error("");
            if (B(), A === 0) delete this.value, delete D[this.name], this.__childCache = null;
            else {
              if (C[this.name] !== E) throw new Error("");
              for (this.value !== E && (this.value = E, this.__childCache = null), I = 0; I < A; ++I) w.push(this.parentPath.get(this.name + I));
              if (w[0] !== this) throw new Error("");
            }
          } else if (A === 1) this.value !== E && (this.__childCache = null), this.value = C[this.name] = E, w.push(this);
          else if (A === 0) delete C[this.name], delete this.value, this.__childCache = null;
          else throw new Error("Could not replace path");
          return w;
        }, y;
      }
      t.default = d, (0, n.maybeSetModuleExports)(function() {
        return e;
      });
    }(path, path.exports)), path.exports;
  }
  var scope = {
    exports: {}
  };
  scope.exports;
  var hasRequiredScope;
  function requireScope() {
    return hasRequiredScope || (hasRequiredScope = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = requireShared(), l = r.__importDefault(requireTypes()), s = Object.prototype.hasOwnProperty;
      function u(d) {
        var h = d.use(l.default), f = h.Type, o = h.namedTypes, p = o.Node, y = o.Expression, g = h.builtInTypes.array, v = h.builders, c = function N(I, O) {
          if (!(this instanceof N)) throw new Error("Scope constructor cannot be invoked without 'new'");
          _.check(I.value) || m.assert(I.value);
          var L;
          if (O) {
            if (!(O instanceof N)) throw new Error("");
            L = O.depth + 1;
          } else O = null, L = 0;
          Object.defineProperties(this, {
            path: {
              value: I
            },
            node: {
              value: I.value
            },
            isGlobal: {
              value: !O,
              enumerable: true
            },
            depth: {
              value: L
            },
            parent: {
              value: O
            },
            bindings: {
              value: {}
            },
            types: {
              value: {}
            }
          });
        }, m = f.or(o.Program, o.Function, o.CatchClause), _ = f.or(o.Function, o.ClassDeclaration, o.ClassExpression, o.InterfaceDeclaration, o.TSInterfaceDeclaration, o.TypeAlias, o.TSTypeAliasDeclaration), x = f.or(o.TypeParameter, o.TSTypeParameter);
        c.isEstablishedBy = function(N) {
          return m.check(N) || _.check(N);
        };
        var S = c.prototype;
        S.didScan = false, S.declares = function(N) {
          return this.scan(), s.call(this.bindings, N);
        }, S.declaresType = function(N) {
          return this.scan(), s.call(this.types, N);
        }, S.declareTemporary = function(N) {
          if (N) {
            if (!/^[a-z$_]/i.test(N)) throw new Error("");
          } else N = "t$";
          N += this.depth.toString(36) + "$", this.scan();
          for (var I = 0; this.declares(N + I); ) ++I;
          var O = N + I;
          return this.bindings[O] = h.builders.identifier(O);
        }, S.injectTemporary = function(N, I) {
          N || (N = this.declareTemporary());
          var O = this.path.get("body");
          return o.BlockStatement.check(O.value) && (O = O.get("body")), O.unshift(v.variableDeclaration("var", [
            v.variableDeclarator(N, I || null)
          ])), N;
        }, S.scan = function(N) {
          if (N || !this.didScan) {
            for (var I in this.bindings) delete this.bindings[I];
            for (var I in this.types) delete this.types[I];
            E(this.path, this.bindings, this.types), this.didScan = true;
          }
        }, S.getBindings = function() {
          return this.scan(), this.bindings;
        }, S.getTypes = function() {
          return this.scan(), this.types;
        };
        function E(N, I, O) {
          var L = N.value;
          if (_.check(L)) {
            var q = N.get("typeParameters", "params");
            g.check(q.value) && q.each(function(z) {
              B(z, O);
            });
          }
          m.check(L) && (o.CatchClause.check(L) ? A(N.get("param"), I) : w(N, I, O));
        }
        function w(N, I, O) {
          var L = N.value;
          N.parent && o.FunctionExpression.check(N.parent.node) && N.parent.node.id && A(N.parent.get("id"), I), L && (g.check(L) ? N.each(function(q) {
            D(q, I, O);
          }) : o.Function.check(L) ? (N.get("params").each(function(q) {
            A(q, I);
          }), D(N.get("body"), I, O), w(N.get("typeParameters"), I, O)) : o.TypeAlias && o.TypeAlias.check(L) || o.InterfaceDeclaration && o.InterfaceDeclaration.check(L) || o.TSTypeAliasDeclaration && o.TSTypeAliasDeclaration.check(L) || o.TSInterfaceDeclaration && o.TSInterfaceDeclaration.check(L) ? F(N.get("id"), O) : o.VariableDeclarator.check(L) ? (A(N.get("id"), I), D(N.get("init"), I, O)) : L.type === "ImportSpecifier" || L.type === "ImportNamespaceSpecifier" || L.type === "ImportDefaultSpecifier" ? A(N.get(L.local ? "local" : L.name ? "name" : "id"), I) : p.check(L) && !y.check(L) && h.eachField(L, function(q, z) {
            var G = N.get(q);
            if (!C(G, z)) throw new Error("");
            D(G, I, O);
          }));
        }
        function C(N, I) {
          return !!(N.value === I || Array.isArray(N.value) && N.value.length === 0 && Array.isArray(I) && I.length === 0);
        }
        function D(N, I, O) {
          var L = N.value;
          if (!(!L || y.check(L))) if (o.FunctionDeclaration.check(L) && L.id !== null) A(N.get("id"), I);
          else if (o.ClassDeclaration && o.ClassDeclaration.check(L) && L.id !== null) A(N.get("id"), I), w(N.get("typeParameters"), I, O);
          else if (o.InterfaceDeclaration && o.InterfaceDeclaration.check(L) || o.TSInterfaceDeclaration && o.TSInterfaceDeclaration.check(L)) F(N.get("id"), O);
          else if (m.check(L)) {
            if (o.CatchClause.check(L) && o.Identifier.check(L.param)) {
              var q = L.param.name, z = s.call(I, q);
              w(N.get("body"), I, O), z || delete I[q];
            }
          } else w(N, I, O);
        }
        function A(N, I) {
          var O = N.value;
          o.Pattern.assert(O), o.Identifier.check(O) ? s.call(I, O.name) ? I[O.name].push(N) : I[O.name] = [
            N
          ] : o.AssignmentPattern && o.AssignmentPattern.check(O) ? A(N.get("left"), I) : o.ObjectPattern && o.ObjectPattern.check(O) ? N.get("properties").each(function(L) {
            var q = L.value;
            o.Pattern.check(q) ? A(L, I) : o.Property.check(q) || o.ObjectProperty && o.ObjectProperty.check(q) ? A(L.get("value"), I) : o.SpreadProperty && o.SpreadProperty.check(q) && A(L.get("argument"), I);
          }) : o.ArrayPattern && o.ArrayPattern.check(O) ? N.get("elements").each(function(L) {
            var q = L.value;
            o.Pattern.check(q) ? A(L, I) : o.SpreadElement && o.SpreadElement.check(q) && A(L.get("argument"), I);
          }) : o.PropertyPattern && o.PropertyPattern.check(O) ? A(N.get("pattern"), I) : (o.SpreadElementPattern && o.SpreadElementPattern.check(O) || o.RestElement && o.RestElement.check(O) || o.SpreadPropertyPattern && o.SpreadPropertyPattern.check(O)) && A(N.get("argument"), I);
        }
        function F(N, I) {
          var O = N.value;
          o.Pattern.assert(O), o.Identifier.check(O) && (s.call(I, O.name) ? I[O.name].push(N) : I[O.name] = [
            N
          ]);
        }
        function B(N, I) {
          var O = N.value;
          x.assert(O), s.call(I, O.name) ? I[O.name].push(N) : I[O.name] = [
            N
          ];
        }
        return S.lookup = function(N) {
          for (var I = this; I && !I.declares(N); I = I.parent) ;
          return I;
        }, S.lookupType = function(N) {
          for (var I = this; I && !I.declaresType(N); I = I.parent) ;
          return I;
        }, S.getGlobalScope = function() {
          for (var N = this; !N.isGlobal; ) N = N.parent;
          return N;
        }, c;
      }
      t.default = u, (0, n.maybeSetModuleExports)(function() {
        return e;
      });
    }(scope, scope.exports)), scope.exports;
  }
  nodePath.exports;
  var hasRequiredNodePath;
  function requireNodePath() {
    return hasRequiredNodePath || (hasRequiredNodePath = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireTypes()), l = r.__importDefault(requirePath()), s = r.__importDefault(requireScope()), u = requireShared();
      function d(h) {
        var f = h.use(n.default), o = f.namedTypes, p = f.builders, y = f.builtInTypes.number, g = f.builtInTypes.array, v = h.use(l.default), c = h.use(s.default), m = function A(F, B, N) {
          if (!(this instanceof A)) throw new Error("NodePath constructor cannot be invoked without 'new'");
          v.call(this, F, B, N);
        }, _ = m.prototype = Object.create(v.prototype, {
          constructor: {
            value: m,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        Object.defineProperties(_, {
          node: {
            get: function() {
              return Object.defineProperty(this, "node", {
                configurable: true,
                value: this._computeNode()
              }), this.node;
            }
          },
          parent: {
            get: function() {
              return Object.defineProperty(this, "parent", {
                configurable: true,
                value: this._computeParent()
              }), this.parent;
            }
          },
          scope: {
            get: function() {
              return Object.defineProperty(this, "scope", {
                configurable: true,
                value: this._computeScope()
              }), this.scope;
            }
          }
        }), _.replace = function() {
          return delete this.node, delete this.parent, delete this.scope, v.prototype.replace.apply(this, arguments);
        }, _.prune = function() {
          var A = this.parent;
          return this.replace(), C(A);
        }, _._computeNode = function() {
          var A = this.value;
          if (o.Node.check(A)) return A;
          var F = this.parentPath;
          return F && F.node || null;
        }, _._computeParent = function() {
          var A = this.value, F = this.parentPath;
          if (!o.Node.check(A)) {
            for (; F && !o.Node.check(F.value); ) F = F.parentPath;
            F && (F = F.parentPath);
          }
          for (; F && !o.Node.check(F.value); ) F = F.parentPath;
          return F || null;
        }, _._computeScope = function() {
          var A = this.value, F = this.parentPath, B = F && F.scope;
          return o.Node.check(A) && c.isEstablishedBy(A) && (B = new c(this, B)), B || null;
        }, _.getValueProperty = function(A) {
          return f.getFieldValue(this.value, A);
        }, _.needsParens = function(A) {
          var F = this.parentPath;
          if (!F) return false;
          var B = this.value;
          if (!o.Expression.check(B) || B.type === "Identifier") return false;
          for (; !o.Node.check(F.value); ) if (F = F.parentPath, !F) return false;
          var N = F.value;
          switch (B.type) {
            case "UnaryExpression":
            case "SpreadElement":
            case "SpreadProperty":
              return N.type === "MemberExpression" && this.name === "object" && N.object === B;
            case "BinaryExpression":
            case "LogicalExpression":
              switch (N.type) {
                case "CallExpression":
                  return this.name === "callee" && N.callee === B;
                case "UnaryExpression":
                case "SpreadElement":
                case "SpreadProperty":
                  return true;
                case "MemberExpression":
                  return this.name === "object" && N.object === B;
                case "BinaryExpression":
                case "LogicalExpression": {
                  var I = B, O = N.operator, L = S[O], q = I.operator, z = S[q];
                  if (L > z) return true;
                  if (L === z && this.name === "right") {
                    if (N.right !== I) throw new Error("Nodes must be equal");
                    return true;
                  }
                }
                default:
                  return false;
              }
            case "SequenceExpression":
              switch (N.type) {
                case "ForStatement":
                  return false;
                case "ExpressionStatement":
                  return this.name !== "expression";
                default:
                  return true;
              }
            case "YieldExpression":
              switch (N.type) {
                case "BinaryExpression":
                case "LogicalExpression":
                case "UnaryExpression":
                case "SpreadElement":
                case "SpreadProperty":
                case "CallExpression":
                case "MemberExpression":
                case "NewExpression":
                case "ConditionalExpression":
                case "YieldExpression":
                  return true;
                default:
                  return false;
              }
            case "Literal":
              return N.type === "MemberExpression" && y.check(B.value) && this.name === "object" && N.object === B;
            case "AssignmentExpression":
            case "ConditionalExpression":
              switch (N.type) {
                case "UnaryExpression":
                case "SpreadElement":
                case "SpreadProperty":
                case "BinaryExpression":
                case "LogicalExpression":
                  return true;
                case "CallExpression":
                  return this.name === "callee" && N.callee === B;
                case "ConditionalExpression":
                  return this.name === "test" && N.test === B;
                case "MemberExpression":
                  return this.name === "object" && N.object === B;
                default:
                  return false;
              }
            default:
              if (N.type === "NewExpression" && this.name === "callee" && N.callee === B) return E(B);
          }
          return !!(A !== true && !this.canBeFirstInStatement() && this.firstInStatement());
        };
        function x(A) {
          return o.BinaryExpression.check(A) || o.LogicalExpression.check(A);
        }
        var S = {};
        [
          [
            "||"
          ],
          [
            "&&"
          ],
          [
            "|"
          ],
          [
            "^"
          ],
          [
            "&"
          ],
          [
            "==",
            "===",
            "!=",
            "!=="
          ],
          [
            "<",
            ">",
            "<=",
            ">=",
            "in",
            "instanceof"
          ],
          [
            ">>",
            "<<",
            ">>>"
          ],
          [
            "+",
            "-"
          ],
          [
            "*",
            "/",
            "%"
          ]
        ].forEach(function(A, F) {
          A.forEach(function(B) {
            S[B] = F;
          });
        });
        function E(A) {
          return o.CallExpression.check(A) ? true : g.check(A) ? A.some(E) : o.Node.check(A) ? f.someField(A, function(F, B) {
            return E(B);
          }) : false;
        }
        _.canBeFirstInStatement = function() {
          var A = this.node;
          return !o.FunctionExpression.check(A) && !o.ObjectExpression.check(A);
        }, _.firstInStatement = function() {
          return w(this);
        };
        function w(A) {
          for (var F, B; A.parent; A = A.parent) {
            if (F = A.node, B = A.parent.node, o.BlockStatement.check(B) && A.parent.name === "body" && A.name === 0) {
              if (B.body[0] !== F) throw new Error("Nodes must be equal");
              return true;
            }
            if (o.ExpressionStatement.check(B) && A.name === "expression") {
              if (B.expression !== F) throw new Error("Nodes must be equal");
              return true;
            }
            if (o.SequenceExpression.check(B) && A.parent.name === "expressions" && A.name === 0) {
              if (B.expressions[0] !== F) throw new Error("Nodes must be equal");
              continue;
            }
            if (o.CallExpression.check(B) && A.name === "callee") {
              if (B.callee !== F) throw new Error("Nodes must be equal");
              continue;
            }
            if (o.MemberExpression.check(B) && A.name === "object") {
              if (B.object !== F) throw new Error("Nodes must be equal");
              continue;
            }
            if (o.ConditionalExpression.check(B) && A.name === "test") {
              if (B.test !== F) throw new Error("Nodes must be equal");
              continue;
            }
            if (x(B) && A.name === "left") {
              if (B.left !== F) throw new Error("Nodes must be equal");
              continue;
            }
            if (o.UnaryExpression.check(B) && !B.prefix && A.name === "argument") {
              if (B.argument !== F) throw new Error("Nodes must be equal");
              continue;
            }
            return false;
          }
          return true;
        }
        function C(A) {
          if (o.VariableDeclaration.check(A.node)) {
            var F = A.get("declarations").value;
            if (!F || F.length === 0) return A.prune();
          } else if (o.ExpressionStatement.check(A.node)) {
            if (!A.get("expression").value) return A.prune();
          } else o.IfStatement.check(A.node) && D(A);
          return A;
        }
        function D(A) {
          var F = A.get("test").value, B = A.get("alternate").value, N = A.get("consequent").value;
          if (!N && !B) {
            var I = p.expressionStatement(F);
            A.replace(I);
          } else if (!N && B) {
            var O = p.unaryExpression("!", F, true);
            o.UnaryExpression.check(F) && F.operator === "!" && (O = F.argument), A.get("test").replace(O), A.get("consequent").replace(B), A.get("alternate").replace();
          }
        }
        return m;
      }
      t.default = d, (0, u.maybeSetModuleExports)(function() {
        return e;
      });
    }(nodePath, nodePath.exports)), nodePath.exports;
  }
  pathVisitor.exports;
  var hasRequiredPathVisitor;
  function requirePathVisitor() {
    return hasRequiredPathVisitor || (hasRequiredPathVisitor = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireTypes()), l = r.__importDefault(requireNodePath()), s = requireShared(), u = Object.prototype.hasOwnProperty;
      function d(h) {
        var f = h.use(n.default), o = h.use(l.default), p = f.builtInTypes.array, y = f.builtInTypes.object, g = f.builtInTypes.function, v, c = function C() {
          if (!(this instanceof C)) throw new Error("PathVisitor constructor cannot be invoked without 'new'");
          this._reusableContextStack = [], this._methodNameTable = m(this), this._shouldVisitComments = u.call(this._methodNameTable, "Block") || u.call(this._methodNameTable, "Line"), this.Context = E(this), this._visiting = false, this._changeReported = false;
        };
        function m(C) {
          var D = /* @__PURE__ */ Object.create(null);
          for (var A in C) /^visit[A-Z]/.test(A) && (D[A.slice(5)] = true);
          for (var F = f.computeSupertypeLookupTable(D), B = /* @__PURE__ */ Object.create(null), N = Object.keys(F), I = N.length, O = 0; O < I; ++O) {
            var L = N[O];
            A = "visit" + F[L], g.check(C[A]) && (B[L] = A);
          }
          return B;
        }
        c.fromMethodsObject = function(D) {
          if (D instanceof c) return D;
          if (!y.check(D)) return new c();
          var A = function B() {
            if (!(this instanceof B)) throw new Error("Visitor constructor cannot be invoked without 'new'");
            c.call(this);
          }, F = A.prototype = Object.create(x);
          return F.constructor = A, _(F, D), _(A, c), g.assert(A.fromMethodsObject), g.assert(A.visit), new A();
        };
        function _(C, D) {
          for (var A in D) u.call(D, A) && (C[A] = D[A]);
          return C;
        }
        c.visit = function(D, A) {
          return c.fromMethodsObject(A).visit(D);
        };
        var x = c.prototype;
        x.visit = function() {
          if (this._visiting) throw new Error("Recursively calling visitor.visit(path) resets visitor state. Try this.visit(path) or this.traverse(path) instead.");
          this._visiting = true, this._changeReported = false, this._abortRequested = false;
          for (var C = arguments.length, D = new Array(C), A = 0; A < C; ++A) D[A] = arguments[A];
          D[0] instanceof o || (D[0] = new o({
            root: D[0]
          }).get("root")), this.reset.apply(this, D);
          var F;
          try {
            var B = this.visitWithoutReset(D[0]);
            F = true;
          } finally {
            if (this._visiting = false, !F && this._abortRequested) return D[0].value;
          }
          return B;
        }, x.AbortRequest = function() {
        }, x.abort = function() {
          var C = this;
          C._abortRequested = true;
          var D = new C.AbortRequest();
          throw D.cancel = function() {
            C._abortRequested = false;
          }, D;
        }, x.reset = function(C) {
        }, x.visitWithoutReset = function(C) {
          if (this instanceof this.Context) return this.visitor.visitWithoutReset(C);
          if (!(C instanceof o)) throw new Error("");
          var D = C.value, A = D && typeof D == "object" && typeof D.type == "string" && this._methodNameTable[D.type];
          if (A) {
            var F = this.acquireContext(C);
            try {
              return F.invokeVisitorMethod(A);
            } finally {
              this.releaseContext(F);
            }
          } else return S(C, this);
        };
        function S(C, D) {
          if (!(C instanceof o)) throw new Error("");
          if (!(D instanceof c)) throw new Error("");
          var A = C.value;
          if (p.check(A)) C.each(D.visitWithoutReset, D);
          else if (y.check(A)) {
            var F = f.getFieldNames(A);
            D._shouldVisitComments && A.comments && F.indexOf("comments") < 0 && F.push("comments");
            for (var B = F.length, N = [], I = 0; I < B; ++I) {
              var O = F[I];
              u.call(A, O) || (A[O] = f.getFieldValue(A, O)), N.push(C.get(O));
            }
            for (var I = 0; I < B; ++I) D.visitWithoutReset(N[I]);
          }
          return C.value;
        }
        x.acquireContext = function(C) {
          return this._reusableContextStack.length === 0 ? new this.Context(C) : this._reusableContextStack.pop().reset(C);
        }, x.releaseContext = function(C) {
          if (!(C instanceof this.Context)) throw new Error("");
          this._reusableContextStack.push(C), C.currentPath = null;
        }, x.reportChanged = function() {
          this._changeReported = true;
        }, x.wasChangeReported = function() {
          return this._changeReported;
        };
        function E(C) {
          function D(F) {
            if (!(this instanceof D)) throw new Error("");
            if (!(this instanceof c)) throw new Error("");
            if (!(F instanceof o)) throw new Error("");
            Object.defineProperty(this, "visitor", {
              value: C,
              writable: false,
              enumerable: true,
              configurable: false
            }), this.currentPath = F, this.needToCallTraverse = true, Object.seal(this);
          }
          if (!(C instanceof c)) throw new Error("");
          var A = D.prototype = Object.create(C);
          return A.constructor = D, _(A, w), D;
        }
        var w = /* @__PURE__ */ Object.create(null);
        return w.reset = function(D) {
          if (!(this instanceof this.Context)) throw new Error("");
          if (!(D instanceof o)) throw new Error("");
          return this.currentPath = D, this.needToCallTraverse = true, this;
        }, w.invokeVisitorMethod = function(D) {
          if (!(this instanceof this.Context)) throw new Error("");
          if (!(this.currentPath instanceof o)) throw new Error("");
          var A = this.visitor[D].call(this, this.currentPath);
          if (A === false ? this.needToCallTraverse = false : A !== v && (this.currentPath = this.currentPath.replace(A)[0], this.needToCallTraverse && this.traverse(this.currentPath)), this.needToCallTraverse !== false) throw new Error("Must either call this.traverse or return false in " + D);
          var F = this.currentPath;
          return F && F.value;
        }, w.traverse = function(D, A) {
          if (!(this instanceof this.Context)) throw new Error("");
          if (!(D instanceof o)) throw new Error("");
          if (!(this.currentPath instanceof o)) throw new Error("");
          return this.needToCallTraverse = false, S(D, c.fromMethodsObject(A || this.visitor));
        }, w.visit = function(D, A) {
          if (!(this instanceof this.Context)) throw new Error("");
          if (!(D instanceof o)) throw new Error("");
          if (!(this.currentPath instanceof o)) throw new Error("");
          return this.needToCallTraverse = false, c.fromMethodsObject(A || this.visitor).visitWithoutReset(D);
        }, w.reportChanged = function() {
          this.visitor.reportChanged();
        }, w.abort = function() {
          this.needToCallTraverse = false, this.visitor.abort();
        }, c;
      }
      t.default = d, (0, s.maybeSetModuleExports)(function() {
        return e;
      });
    }(pathVisitor, pathVisitor.exports)), pathVisitor.exports;
  }
  var equiv = {
    exports: {}
  };
  equiv.exports;
  var hasRequiredEquiv;
  function requireEquiv() {
    return hasRequiredEquiv || (hasRequiredEquiv = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = requireShared(), l = r.__importDefault(requireTypes());
      function s(u) {
        var d = u.use(l.default), h = d.getFieldNames, f = d.getFieldValue, o = d.builtInTypes.array, p = d.builtInTypes.object, y = d.builtInTypes.Date, g = d.builtInTypes.RegExp, v = Object.prototype.hasOwnProperty;
        function c(E, w, C) {
          return o.check(C) ? C.length = 0 : C = null, _(E, w, C);
        }
        c.assert = function(E, w) {
          var C = [];
          if (!c(E, w, C)) if (C.length === 0) {
            if (E !== w) throw new Error("Nodes must be equal");
          } else throw new Error("Nodes differ in the following path: " + C.map(m).join(""));
        };
        function m(E) {
          return /[_$a-z][_$a-z0-9]*/i.test(E) ? "." + E : "[" + JSON.stringify(E) + "]";
        }
        function _(E, w, C) {
          return E === w ? true : o.check(E) ? x(E, w, C) : p.check(E) ? S(E, w, C) : y.check(E) ? y.check(w) && +E == +w : g.check(E) ? g.check(w) && E.source === w.source && E.global === w.global && E.multiline === w.multiline && E.ignoreCase === w.ignoreCase : E == w;
        }
        function x(E, w, C) {
          o.assert(E);
          var D = E.length;
          if (!o.check(w) || w.length !== D) return C && C.push("length"), false;
          for (var A = 0; A < D; ++A) {
            if (C && C.push(A), A in E != A in w || !_(E[A], w[A], C)) return false;
            if (C) {
              var F = C.pop();
              if (F !== A) throw new Error("" + F);
            }
          }
          return true;
        }
        function S(E, w, C) {
          if (p.assert(E), !p.check(w)) return false;
          if (E.type !== w.type) return C && C.push("type"), false;
          var D = h(E), A = D.length, F = h(w), B = F.length;
          if (A === B) {
            for (var N = 0; N < A; ++N) {
              var I = D[N], O = f(E, I), L = f(w, I);
              if (C && C.push(I), !_(O, L, C)) return false;
              if (C) {
                var q = C.pop();
                if (q !== I) throw new Error("" + q);
              }
            }
            return true;
          }
          if (!C) return false;
          var z = /* @__PURE__ */ Object.create(null);
          for (N = 0; N < A; ++N) z[D[N]] = true;
          for (N = 0; N < B; ++N) {
            if (I = F[N], !v.call(z, I)) return C.push(I), false;
            delete z[I];
          }
          for (I in z) {
            C.push(I);
            break;
          }
          return false;
        }
        return c;
      }
      t.default = s, (0, n.maybeSetModuleExports)(function() {
        return e;
      });
    }(equiv, equiv.exports)), equiv.exports;
  }
  fork.exports;
  var hasRequiredFork;
  function requireFork() {
    return hasRequiredFork || (hasRequiredFork = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireTypes()), l = r.__importDefault(requirePathVisitor()), s = r.__importDefault(requireEquiv()), u = r.__importDefault(requirePath()), d = r.__importDefault(requireNodePath()), h = requireShared();
      function f(p) {
        var y = o(), g = y.use(n.default);
        p.forEach(y.use), g.finalize();
        var v = y.use(l.default);
        return {
          Type: g.Type,
          builtInTypes: g.builtInTypes,
          namedTypes: g.namedTypes,
          builders: g.builders,
          defineMethod: g.defineMethod,
          getFieldNames: g.getFieldNames,
          getFieldValue: g.getFieldValue,
          eachField: g.eachField,
          someField: g.someField,
          getSupertypeNames: g.getSupertypeNames,
          getBuilderName: g.getBuilderName,
          astNodesAreEquivalent: y.use(s.default),
          finalize: g.finalize,
          Path: y.use(u.default),
          NodePath: y.use(d.default),
          PathVisitor: v,
          use: y.use,
          visit: v.visit
        };
      }
      t.default = f;
      function o() {
        var p = [], y = [];
        function g(c) {
          var m = p.indexOf(c);
          return m === -1 && (m = p.length, p.push(c), y[m] = c(v)), y[m];
        }
        var v = {
          use: g
        };
        return v;
      }
      (0, h.maybeSetModuleExports)(function() {
        return e;
      });
    }(fork, fork.exports)), fork.exports;
  }
  var esProposals = {
    exports: {}
  }, es2022 = {
    exports: {}
  }, es2021$1 = {
    exports: {}
  }, es2021 = {
    exports: {}
  }, es2020$1 = {
    exports: {}
  }, es2016$1 = {
    exports: {}
  }, core$1 = {
    exports: {}
  };
  core$1.exports;
  var hasRequiredCore$1;
  function requireCore$1() {
    return hasRequiredCore$1 || (hasRequiredCore$1 = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = requireShared();
      function n() {
        return {
          BinaryOperators: [
            "==",
            "!=",
            "===",
            "!==",
            "<",
            "<=",
            ">",
            ">=",
            "<<",
            ">>",
            ">>>",
            "+",
            "-",
            "*",
            "/",
            "%",
            "&",
            "|",
            "^",
            "in",
            "instanceof"
          ],
          AssignmentOperators: [
            "=",
            "+=",
            "-=",
            "*=",
            "/=",
            "%=",
            "<<=",
            ">>=",
            ">>>=",
            "|=",
            "^=",
            "&="
          ],
          LogicalOperators: [
            "||",
            "&&"
          ]
        };
      }
      t.default = n, (0, r.maybeSetModuleExports)(function() {
        return e;
      });
    }(core$1, core$1.exports)), core$1.exports;
  }
  es2016$1.exports;
  var hasRequiredEs2016$1;
  function requireEs2016$1() {
    return hasRequiredEs2016$1 || (hasRequiredEs2016$1 = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = requireShared(), l = r.__importDefault(requireCore$1());
      function s(u) {
        var d = u.use(l.default);
        return d.BinaryOperators.indexOf("**") < 0 && d.BinaryOperators.push("**"), d.AssignmentOperators.indexOf("**=") < 0 && d.AssignmentOperators.push("**="), d;
      }
      t.default = s, (0, n.maybeSetModuleExports)(function() {
        return e;
      });
    }(es2016$1, es2016$1.exports)), es2016$1.exports;
  }
  es2020$1.exports;
  var hasRequiredEs2020$1;
  function requireEs2020$1() {
    return hasRequiredEs2020$1 || (hasRequiredEs2020$1 = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = requireShared(), l = r.__importDefault(requireEs2016$1());
      function s(u) {
        var d = u.use(l.default);
        return d.LogicalOperators.indexOf("??") < 0 && d.LogicalOperators.push("??"), d;
      }
      t.default = s, (0, n.maybeSetModuleExports)(function() {
        return e;
      });
    }(es2020$1, es2020$1.exports)), es2020$1.exports;
  }
  es2021.exports;
  var hasRequiredEs2021$1;
  function requireEs2021$1() {
    return hasRequiredEs2021$1 || (hasRequiredEs2021$1 = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = requireShared(), l = r.__importDefault(requireEs2020$1());
      function s(u) {
        var d = u.use(l.default);
        return d.LogicalOperators.forEach(function(h) {
          var f = h + "=";
          d.AssignmentOperators.indexOf(f) < 0 && d.AssignmentOperators.push(f);
        }), d;
      }
      t.default = s, (0, n.maybeSetModuleExports)(function() {
        return e;
      });
    }(es2021, es2021.exports)), es2021.exports;
  }
  var es2020 = {
    exports: {}
  }, es2019 = {
    exports: {}
  }, es2018 = {
    exports: {}
  }, es2017 = {
    exports: {}
  }, es2016 = {
    exports: {}
  }, es6 = {
    exports: {}
  }, core = {
    exports: {}
  };
  core.exports;
  var hasRequiredCore;
  function requireCore() {
    return hasRequiredCore || (hasRequiredCore = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireCore$1()), l = r.__importDefault(requireTypes()), s = r.__importStar(requireShared());
      function u(d) {
        var h = d.use(l.default), f = h.Type, o = f.def, p = f.or, y = d.use(s.default), g = y.defaults, v = y.geq, c = d.use(n.default), m = c.BinaryOperators, _ = c.AssignmentOperators, x = c.LogicalOperators;
        o("Printable").field("loc", p(o("SourceLocation"), null), g.null, true), o("Node").bases("Printable").field("type", String).field("comments", p([
          o("Comment")
        ], null), g.null, true), o("SourceLocation").field("start", o("Position")).field("end", o("Position")).field("source", p(String, null), g.null), o("Position").field("line", v(1)).field("column", v(0)), o("File").bases("Node").build("program", "name").field("program", o("Program")).field("name", p(String, null), g.null), o("Program").bases("Node").build("body").field("body", [
          o("Statement")
        ]), o("Function").bases("Node").field("id", p(o("Identifier"), null), g.null).field("params", [
          o("Pattern")
        ]).field("body", o("BlockStatement")).field("generator", Boolean, g.false).field("async", Boolean, g.false), o("Statement").bases("Node"), o("EmptyStatement").bases("Statement").build(), o("BlockStatement").bases("Statement").build("body").field("body", [
          o("Statement")
        ]), o("ExpressionStatement").bases("Statement").build("expression").field("expression", o("Expression")), o("IfStatement").bases("Statement").build("test", "consequent", "alternate").field("test", o("Expression")).field("consequent", o("Statement")).field("alternate", p(o("Statement"), null), g.null), o("LabeledStatement").bases("Statement").build("label", "body").field("label", o("Identifier")).field("body", o("Statement")), o("BreakStatement").bases("Statement").build("label").field("label", p(o("Identifier"), null), g.null), o("ContinueStatement").bases("Statement").build("label").field("label", p(o("Identifier"), null), g.null), o("WithStatement").bases("Statement").build("object", "body").field("object", o("Expression")).field("body", o("Statement")), o("SwitchStatement").bases("Statement").build("discriminant", "cases", "lexical").field("discriminant", o("Expression")).field("cases", [
          o("SwitchCase")
        ]).field("lexical", Boolean, g.false), o("ReturnStatement").bases("Statement").build("argument").field("argument", p(o("Expression"), null)), o("ThrowStatement").bases("Statement").build("argument").field("argument", o("Expression")), o("TryStatement").bases("Statement").build("block", "handler", "finalizer").field("block", o("BlockStatement")).field("handler", p(o("CatchClause"), null), function() {
          return this.handlers && this.handlers[0] || null;
        }).field("handlers", [
          o("CatchClause")
        ], function() {
          return this.handler ? [
            this.handler
          ] : [];
        }, true).field("guardedHandlers", [
          o("CatchClause")
        ], g.emptyArray).field("finalizer", p(o("BlockStatement"), null), g.null), o("CatchClause").bases("Node").build("param", "guard", "body").field("param", o("Pattern")).field("guard", p(o("Expression"), null), g.null).field("body", o("BlockStatement")), o("WhileStatement").bases("Statement").build("test", "body").field("test", o("Expression")).field("body", o("Statement")), o("DoWhileStatement").bases("Statement").build("body", "test").field("body", o("Statement")).field("test", o("Expression")), o("ForStatement").bases("Statement").build("init", "test", "update", "body").field("init", p(o("VariableDeclaration"), o("Expression"), null)).field("test", p(o("Expression"), null)).field("update", p(o("Expression"), null)).field("body", o("Statement")), o("ForInStatement").bases("Statement").build("left", "right", "body").field("left", p(o("VariableDeclaration"), o("Expression"))).field("right", o("Expression")).field("body", o("Statement")), o("DebuggerStatement").bases("Statement").build(), o("Declaration").bases("Statement"), o("FunctionDeclaration").bases("Function", "Declaration").build("id", "params", "body").field("id", o("Identifier")), o("FunctionExpression").bases("Function", "Expression").build("id", "params", "body"), o("VariableDeclaration").bases("Declaration").build("kind", "declarations").field("kind", p("var", "let", "const")).field("declarations", [
          o("VariableDeclarator")
        ]), o("VariableDeclarator").bases("Node").build("id", "init").field("id", o("Pattern")).field("init", p(o("Expression"), null), g.null), o("Expression").bases("Node"), o("ThisExpression").bases("Expression").build(), o("ArrayExpression").bases("Expression").build("elements").field("elements", [
          p(o("Expression"), null)
        ]), o("ObjectExpression").bases("Expression").build("properties").field("properties", [
          o("Property")
        ]), o("Property").bases("Node").build("kind", "key", "value").field("kind", p("init", "get", "set")).field("key", p(o("Literal"), o("Identifier"))).field("value", o("Expression")), o("SequenceExpression").bases("Expression").build("expressions").field("expressions", [
          o("Expression")
        ]);
        var S = p("-", "+", "!", "~", "typeof", "void", "delete");
        o("UnaryExpression").bases("Expression").build("operator", "argument", "prefix").field("operator", S).field("argument", o("Expression")).field("prefix", Boolean, g.true);
        var E = p.apply(void 0, m);
        o("BinaryExpression").bases("Expression").build("operator", "left", "right").field("operator", E).field("left", o("Expression")).field("right", o("Expression"));
        var w = p.apply(void 0, _);
        o("AssignmentExpression").bases("Expression").build("operator", "left", "right").field("operator", w).field("left", p(o("Pattern"), o("MemberExpression"))).field("right", o("Expression"));
        var C = p("++", "--");
        o("UpdateExpression").bases("Expression").build("operator", "argument", "prefix").field("operator", C).field("argument", o("Expression")).field("prefix", Boolean);
        var D = p.apply(void 0, x);
        o("LogicalExpression").bases("Expression").build("operator", "left", "right").field("operator", D).field("left", o("Expression")).field("right", o("Expression")), o("ConditionalExpression").bases("Expression").build("test", "consequent", "alternate").field("test", o("Expression")).field("consequent", o("Expression")).field("alternate", o("Expression")), o("NewExpression").bases("Expression").build("callee", "arguments").field("callee", o("Expression")).field("arguments", [
          o("Expression")
        ]), o("CallExpression").bases("Expression").build("callee", "arguments").field("callee", o("Expression")).field("arguments", [
          o("Expression")
        ]), o("MemberExpression").bases("Expression").build("object", "property", "computed").field("object", o("Expression")).field("property", p(o("Identifier"), o("Expression"))).field("computed", Boolean, function() {
          var A = this.property.type;
          return A === "Literal" || A === "MemberExpression" || A === "BinaryExpression";
        }), o("Pattern").bases("Node"), o("SwitchCase").bases("Node").build("test", "consequent").field("test", p(o("Expression"), null)).field("consequent", [
          o("Statement")
        ]), o("Identifier").bases("Expression", "Pattern").build("name").field("name", String).field("optional", Boolean, g.false), o("Literal").bases("Expression").build("value").field("value", p(String, Boolean, null, Number, RegExp, BigInt)), o("Comment").bases("Printable").field("value", String).field("leading", Boolean, g.true).field("trailing", Boolean, g.false);
      }
      t.default = u, (0, s.maybeSetModuleExports)(function() {
        return e;
      });
    }(core, core.exports)), core.exports;
  }
  es6.exports;
  var hasRequiredEs6;
  function requireEs6() {
    return hasRequiredEs6 || (hasRequiredEs6 = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireCore()), l = r.__importDefault(requireTypes()), s = r.__importStar(requireShared());
      function u(d) {
        d.use(n.default);
        var h = d.use(l.default), f = h.Type.def, o = h.Type.or, p = d.use(s.default).defaults;
        f("Function").field("generator", Boolean, p.false).field("expression", Boolean, p.false).field("defaults", [
          o(f("Expression"), null)
        ], p.emptyArray).field("rest", o(f("Identifier"), null), p.null), f("RestElement").bases("Pattern").build("argument").field("argument", f("Pattern")).field("typeAnnotation", o(f("TypeAnnotation"), f("TSTypeAnnotation"), null), p.null), f("SpreadElementPattern").bases("Pattern").build("argument").field("argument", f("Pattern")), f("FunctionDeclaration").build("id", "params", "body", "generator", "expression").field("id", o(f("Identifier"), null)), f("FunctionExpression").build("id", "params", "body", "generator", "expression"), f("ArrowFunctionExpression").bases("Function", "Expression").build("params", "body", "expression").field("id", null, p.null).field("body", o(f("BlockStatement"), f("Expression"))).field("generator", false, p.false), f("ForOfStatement").bases("Statement").build("left", "right", "body").field("left", o(f("VariableDeclaration"), f("Pattern"))).field("right", f("Expression")).field("body", f("Statement")), f("YieldExpression").bases("Expression").build("argument", "delegate").field("argument", o(f("Expression"), null)).field("delegate", Boolean, p.false), f("GeneratorExpression").bases("Expression").build("body", "blocks", "filter").field("body", f("Expression")).field("blocks", [
          f("ComprehensionBlock")
        ]).field("filter", o(f("Expression"), null)), f("ComprehensionExpression").bases("Expression").build("body", "blocks", "filter").field("body", f("Expression")).field("blocks", [
          f("ComprehensionBlock")
        ]).field("filter", o(f("Expression"), null)), f("ComprehensionBlock").bases("Node").build("left", "right", "each").field("left", f("Pattern")).field("right", f("Expression")).field("each", Boolean), f("Property").field("key", o(f("Literal"), f("Identifier"), f("Expression"))).field("value", o(f("Expression"), f("Pattern"))).field("method", Boolean, p.false).field("shorthand", Boolean, p.false).field("computed", Boolean, p.false), f("ObjectProperty").field("shorthand", Boolean, p.false), f("PropertyPattern").bases("Pattern").build("key", "pattern").field("key", o(f("Literal"), f("Identifier"), f("Expression"))).field("pattern", f("Pattern")).field("computed", Boolean, p.false), f("ObjectPattern").bases("Pattern").build("properties").field("properties", [
          o(f("PropertyPattern"), f("Property"))
        ]), f("ArrayPattern").bases("Pattern").build("elements").field("elements", [
          o(f("Pattern"), null)
        ]), f("SpreadElement").bases("Node").build("argument").field("argument", f("Expression")), f("ArrayExpression").field("elements", [
          o(f("Expression"), f("SpreadElement"), f("RestElement"), null)
        ]), f("NewExpression").field("arguments", [
          o(f("Expression"), f("SpreadElement"))
        ]), f("CallExpression").field("arguments", [
          o(f("Expression"), f("SpreadElement"))
        ]), f("AssignmentPattern").bases("Pattern").build("left", "right").field("left", f("Pattern")).field("right", f("Expression")), f("MethodDefinition").bases("Declaration").build("kind", "key", "value", "static").field("kind", o("constructor", "method", "get", "set")).field("key", f("Expression")).field("value", f("Function")).field("computed", Boolean, p.false).field("static", Boolean, p.false);
        var y = o(f("MethodDefinition"), f("VariableDeclarator"), f("ClassPropertyDefinition"), f("ClassProperty"), f("StaticBlock"));
        f("ClassProperty").bases("Declaration").build("key").field("key", o(f("Literal"), f("Identifier"), f("Expression"))).field("computed", Boolean, p.false), f("ClassPropertyDefinition").bases("Declaration").build("definition").field("definition", y), f("ClassBody").bases("Declaration").build("body").field("body", [
          y
        ]), f("ClassDeclaration").bases("Declaration").build("id", "body", "superClass").field("id", o(f("Identifier"), null)).field("body", f("ClassBody")).field("superClass", o(f("Expression"), null), p.null), f("ClassExpression").bases("Expression").build("id", "body", "superClass").field("id", o(f("Identifier"), null), p.null).field("body", f("ClassBody")).field("superClass", o(f("Expression"), null), p.null), f("Super").bases("Expression").build(), f("Specifier").bases("Node"), f("ModuleSpecifier").bases("Specifier").field("local", o(f("Identifier"), null), p.null).field("id", o(f("Identifier"), null), p.null).field("name", o(f("Identifier"), null), p.null), f("ImportSpecifier").bases("ModuleSpecifier").build("imported", "local").field("imported", f("Identifier")), f("ImportDefaultSpecifier").bases("ModuleSpecifier").build("local"), f("ImportNamespaceSpecifier").bases("ModuleSpecifier").build("local"), f("ImportDeclaration").bases("Declaration").build("specifiers", "source", "importKind").field("specifiers", [
          o(f("ImportSpecifier"), f("ImportNamespaceSpecifier"), f("ImportDefaultSpecifier"))
        ], p.emptyArray).field("source", f("Literal")).field("importKind", o("value", "type"), function() {
          return "value";
        }), f("ExportNamedDeclaration").bases("Declaration").build("declaration", "specifiers", "source").field("declaration", o(f("Declaration"), null)).field("specifiers", [
          f("ExportSpecifier")
        ], p.emptyArray).field("source", o(f("Literal"), null), p.null), f("ExportSpecifier").bases("ModuleSpecifier").build("local", "exported").field("exported", f("Identifier")), f("ExportDefaultDeclaration").bases("Declaration").build("declaration").field("declaration", o(f("Declaration"), f("Expression"))), f("ExportAllDeclaration").bases("Declaration").build("source").field("source", f("Literal")), f("TaggedTemplateExpression").bases("Expression").build("tag", "quasi").field("tag", f("Expression")).field("quasi", f("TemplateLiteral")), f("TemplateLiteral").bases("Expression").build("quasis", "expressions").field("quasis", [
          f("TemplateElement")
        ]).field("expressions", [
          f("Expression")
        ]), f("TemplateElement").bases("Node").build("value", "tail").field("value", {
          cooked: String,
          raw: String
        }).field("tail", Boolean), f("MetaProperty").bases("Expression").build("meta", "property").field("meta", f("Identifier")).field("property", f("Identifier"));
      }
      t.default = u, (0, s.maybeSetModuleExports)(function() {
        return e;
      });
    }(es6, es6.exports)), es6.exports;
  }
  es2016.exports;
  var hasRequiredEs2016;
  function requireEs2016() {
    return hasRequiredEs2016 || (hasRequiredEs2016 = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireEs2016$1()), l = r.__importDefault(requireEs6()), s = requireShared();
      function u(d) {
        d.use(n.default), d.use(l.default);
      }
      t.default = u, (0, s.maybeSetModuleExports)(function() {
        return e;
      });
    }(es2016, es2016.exports)), es2016.exports;
  }
  es2017.exports;
  var hasRequiredEs2017;
  function requireEs2017() {
    return hasRequiredEs2017 || (hasRequiredEs2017 = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireEs2016()), l = r.__importDefault(requireTypes()), s = r.__importStar(requireShared());
      function u(d) {
        d.use(n.default);
        var h = d.use(l.default), f = h.Type.def, o = d.use(s.default).defaults;
        f("Function").field("async", Boolean, o.false), f("AwaitExpression").bases("Expression").build("argument").field("argument", f("Expression"));
      }
      t.default = u, (0, s.maybeSetModuleExports)(function() {
        return e;
      });
    }(es2017, es2017.exports)), es2017.exports;
  }
  es2018.exports;
  var hasRequiredEs2018;
  function requireEs2018() {
    return hasRequiredEs2018 || (hasRequiredEs2018 = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireEs2017()), l = r.__importDefault(requireTypes()), s = r.__importStar(requireShared());
      function u(d) {
        d.use(n.default);
        var h = d.use(l.default), f = h.Type.def, o = h.Type.or, p = d.use(s.default).defaults;
        f("ForOfStatement").field("await", Boolean, p.false), f("SpreadProperty").bases("Node").build("argument").field("argument", f("Expression")), f("ObjectExpression").field("properties", [
          o(f("Property"), f("SpreadProperty"), f("SpreadElement"))
        ]), f("TemplateElement").field("value", {
          cooked: o(String, null),
          raw: String
        }), f("SpreadPropertyPattern").bases("Pattern").build("argument").field("argument", f("Pattern")), f("ObjectPattern").field("properties", [
          o(f("PropertyPattern"), f("Property"), f("RestElement"), f("SpreadPropertyPattern"))
        ]);
      }
      t.default = u, (0, s.maybeSetModuleExports)(function() {
        return e;
      });
    }(es2018, es2018.exports)), es2018.exports;
  }
  es2019.exports;
  var hasRequiredEs2019;
  function requireEs2019() {
    return hasRequiredEs2019 || (hasRequiredEs2019 = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireEs2018()), l = r.__importDefault(requireTypes()), s = r.__importStar(requireShared());
      function u(d) {
        d.use(n.default);
        var h = d.use(l.default), f = h.Type.def, o = h.Type.or, p = d.use(s.default).defaults;
        f("CatchClause").field("param", o(f("Pattern"), null), p.null);
      }
      t.default = u, (0, s.maybeSetModuleExports)(function() {
        return e;
      });
    }(es2019, es2019.exports)), es2019.exports;
  }
  es2020.exports;
  var hasRequiredEs2020;
  function requireEs2020() {
    return hasRequiredEs2020 || (hasRequiredEs2020 = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireEs2020$1()), l = r.__importDefault(requireEs2019()), s = r.__importDefault(requireTypes()), u = r.__importStar(requireShared());
      function d(h) {
        h.use(n.default), h.use(l.default);
        var f = h.use(s.default), o = f.Type.def, p = f.Type.or, y = h.use(u.default), g = y.defaults;
        o("ImportExpression").bases("Expression").build("source").field("source", o("Expression")), o("ExportAllDeclaration").bases("Declaration").build("source", "exported").field("source", o("Literal")).field("exported", p(o("Identifier"), null, void 0), g.null), o("ChainElement").bases("Node").field("optional", Boolean, g.false), o("CallExpression").bases("Expression", "ChainElement"), o("MemberExpression").bases("Expression", "ChainElement"), o("ChainExpression").bases("Expression").build("expression").field("expression", o("ChainElement")), o("OptionalCallExpression").bases("CallExpression").build("callee", "arguments", "optional").field("optional", Boolean, g.true), o("OptionalMemberExpression").bases("MemberExpression").build("object", "property", "computed", "optional").field("optional", Boolean, g.true);
      }
      t.default = d, (0, u.maybeSetModuleExports)(function() {
        return e;
      });
    }(es2020, es2020.exports)), es2020.exports;
  }
  es2021$1.exports;
  var hasRequiredEs2021;
  function requireEs2021() {
    return hasRequiredEs2021 || (hasRequiredEs2021 = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireEs2021$1()), l = r.__importDefault(requireEs2020()), s = requireShared();
      function u(d) {
        d.use(n.default), d.use(l.default);
      }
      t.default = u, (0, s.maybeSetModuleExports)(function() {
        return e;
      });
    }(es2021$1, es2021$1.exports)), es2021$1.exports;
  }
  es2022.exports;
  var hasRequiredEs2022;
  function requireEs2022() {
    return hasRequiredEs2022 || (hasRequiredEs2022 = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireEs2021()), l = r.__importDefault(requireTypes()), s = requireShared();
      function u(d) {
        d.use(n.default);
        var h = d.use(l.default), f = h.Type.def;
        f("StaticBlock").bases("Declaration").build("body").field("body", [
          f("Statement")
        ]);
      }
      t.default = u, (0, s.maybeSetModuleExports)(function() {
        return e;
      });
    }(es2022, es2022.exports)), es2022.exports;
  }
  esProposals.exports;
  var hasRequiredEsProposals;
  function requireEsProposals() {
    return hasRequiredEsProposals || (hasRequiredEsProposals = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireTypes()), l = r.__importStar(requireShared()), s = r.__importDefault(requireEs2022());
      function u(d) {
        d.use(s.default);
        var h = d.use(n.default), f = h.Type, o = h.Type.def, p = f.or, y = d.use(l.default), g = y.defaults;
        o("AwaitExpression").build("argument", "all").field("argument", p(o("Expression"), null)).field("all", Boolean, g.false), o("Decorator").bases("Node").build("expression").field("expression", o("Expression")), o("Property").field("decorators", p([
          o("Decorator")
        ], null), g.null), o("MethodDefinition").field("decorators", p([
          o("Decorator")
        ], null), g.null), o("PrivateName").bases("Expression", "Pattern").build("id").field("id", o("Identifier")), o("ClassPrivateProperty").bases("ClassProperty").build("key", "value").field("key", o("PrivateName")).field("value", p(o("Expression"), null), g.null), o("ImportAttribute").bases("Node").build("key", "value").field("key", p(o("Identifier"), o("Literal"))).field("value", o("Expression")), [
          "ImportDeclaration",
          "ExportAllDeclaration",
          "ExportNamedDeclaration"
        ].forEach(function(v) {
          o(v).field("assertions", [
            o("ImportAttribute")
          ], g.emptyArray);
        }), o("RecordExpression").bases("Expression").build("properties").field("properties", [
          p(o("ObjectProperty"), o("ObjectMethod"), o("SpreadElement"))
        ]), o("TupleExpression").bases("Expression").build("elements").field("elements", [
          p(o("Expression"), o("SpreadElement"), null)
        ]), o("ModuleExpression").bases("Node").build("body").field("body", o("Program"));
      }
      t.default = u, (0, l.maybeSetModuleExports)(function() {
        return e;
      });
    }(esProposals, esProposals.exports)), esProposals.exports;
  }
  var jsx = {
    exports: {}
  };
  jsx.exports;
  var hasRequiredJsx;
  function requireJsx() {
    return hasRequiredJsx || (hasRequiredJsx = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireEsProposals()), l = r.__importDefault(requireTypes()), s = r.__importStar(requireShared());
      function u(d) {
        d.use(n.default);
        var h = d.use(l.default), f = h.Type.def, o = h.Type.or, p = d.use(s.default).defaults;
        f("JSXAttribute").bases("Node").build("name", "value").field("name", o(f("JSXIdentifier"), f("JSXNamespacedName"))).field("value", o(f("Literal"), f("JSXExpressionContainer"), f("JSXElement"), f("JSXFragment"), null), p.null), f("JSXIdentifier").bases("Identifier").build("name").field("name", String), f("JSXNamespacedName").bases("Node").build("namespace", "name").field("namespace", f("JSXIdentifier")).field("name", f("JSXIdentifier")), f("JSXMemberExpression").bases("MemberExpression").build("object", "property").field("object", o(f("JSXIdentifier"), f("JSXMemberExpression"))).field("property", f("JSXIdentifier")).field("computed", Boolean, p.false);
        var y = o(f("JSXIdentifier"), f("JSXNamespacedName"), f("JSXMemberExpression"));
        f("JSXSpreadAttribute").bases("Node").build("argument").field("argument", f("Expression"));
        var g = [
          o(f("JSXAttribute"), f("JSXSpreadAttribute"))
        ];
        f("JSXExpressionContainer").bases("Expression").build("expression").field("expression", o(f("Expression"), f("JSXEmptyExpression")));
        var v = [
          o(f("JSXText"), f("JSXExpressionContainer"), f("JSXSpreadChild"), f("JSXElement"), f("JSXFragment"), f("Literal"))
        ];
        f("JSXElement").bases("Expression").build("openingElement", "closingElement", "children").field("openingElement", f("JSXOpeningElement")).field("closingElement", o(f("JSXClosingElement"), null), p.null).field("children", v, p.emptyArray).field("name", y, function() {
          return this.openingElement.name;
        }, true).field("selfClosing", Boolean, function() {
          return this.openingElement.selfClosing;
        }, true).field("attributes", g, function() {
          return this.openingElement.attributes;
        }, true), f("JSXOpeningElement").bases("Node").build("name", "attributes", "selfClosing").field("name", y).field("attributes", g, p.emptyArray).field("selfClosing", Boolean, p.false), f("JSXClosingElement").bases("Node").build("name").field("name", y), f("JSXFragment").bases("Expression").build("openingFragment", "closingFragment", "children").field("openingFragment", f("JSXOpeningFragment")).field("closingFragment", f("JSXClosingFragment")).field("children", v, p.emptyArray), f("JSXOpeningFragment").bases("Node").build(), f("JSXClosingFragment").bases("Node").build(), f("JSXText").bases("Literal").build("value", "raw").field("value", String).field("raw", String, function() {
          return this.value;
        }), f("JSXEmptyExpression").bases("Node").build(), f("JSXSpreadChild").bases("Node").build("expression").field("expression", f("Expression"));
      }
      t.default = u, (0, s.maybeSetModuleExports)(function() {
        return e;
      });
    }(jsx, jsx.exports)), jsx.exports;
  }
  var flow = {
    exports: {}
  }, typeAnnotations = {
    exports: {}
  };
  typeAnnotations.exports;
  var hasRequiredTypeAnnotations;
  function requireTypeAnnotations() {
    return hasRequiredTypeAnnotations || (hasRequiredTypeAnnotations = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireTypes()), l = r.__importStar(requireShared());
      function s(u) {
        var d = u.use(n.default), h = d.Type.def, f = d.Type.or, o = u.use(l.default).defaults, p = f(h("TypeAnnotation"), h("TSTypeAnnotation"), null), y = f(h("TypeParameterDeclaration"), h("TSTypeParameterDeclaration"), null);
        h("Identifier").field("typeAnnotation", p, o.null), h("ObjectPattern").field("typeAnnotation", p, o.null), h("Function").field("returnType", p, o.null).field("typeParameters", y, o.null), h("ClassProperty").build("key", "value", "typeAnnotation", "static").field("value", f(h("Expression"), null)).field("static", Boolean, o.false).field("typeAnnotation", p, o.null), [
          "ClassDeclaration",
          "ClassExpression"
        ].forEach(function(g) {
          h(g).field("typeParameters", y, o.null).field("superTypeParameters", f(h("TypeParameterInstantiation"), h("TSTypeParameterInstantiation"), null), o.null).field("implements", f([
            h("ClassImplements")
          ], [
            h("TSExpressionWithTypeArguments")
          ]), o.emptyArray);
        });
      }
      t.default = s, (0, l.maybeSetModuleExports)(function() {
        return e;
      });
    }(typeAnnotations, typeAnnotations.exports)), typeAnnotations.exports;
  }
  flow.exports;
  var hasRequiredFlow;
  function requireFlow() {
    return hasRequiredFlow || (hasRequiredFlow = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireEsProposals()), l = r.__importDefault(requireTypeAnnotations()), s = r.__importDefault(requireTypes()), u = r.__importStar(requireShared());
      function d(h) {
        h.use(n.default), h.use(l.default);
        var f = h.use(s.default), o = f.Type.def, p = f.Type.or, y = h.use(u.default).defaults;
        o("Flow").bases("Node"), o("FlowType").bases("Flow"), o("AnyTypeAnnotation").bases("FlowType").build(), o("EmptyTypeAnnotation").bases("FlowType").build(), o("MixedTypeAnnotation").bases("FlowType").build(), o("VoidTypeAnnotation").bases("FlowType").build(), o("SymbolTypeAnnotation").bases("FlowType").build(), o("NumberTypeAnnotation").bases("FlowType").build(), o("BigIntTypeAnnotation").bases("FlowType").build(), o("NumberLiteralTypeAnnotation").bases("FlowType").build("value", "raw").field("value", Number).field("raw", String), o("NumericLiteralTypeAnnotation").bases("FlowType").build("value", "raw").field("value", Number).field("raw", String), o("BigIntLiteralTypeAnnotation").bases("FlowType").build("value", "raw").field("value", null).field("raw", String), o("StringTypeAnnotation").bases("FlowType").build(), o("StringLiteralTypeAnnotation").bases("FlowType").build("value", "raw").field("value", String).field("raw", String), o("BooleanTypeAnnotation").bases("FlowType").build(), o("BooleanLiteralTypeAnnotation").bases("FlowType").build("value", "raw").field("value", Boolean).field("raw", String), o("TypeAnnotation").bases("Node").build("typeAnnotation").field("typeAnnotation", o("FlowType")), o("NullableTypeAnnotation").bases("FlowType").build("typeAnnotation").field("typeAnnotation", o("FlowType")), o("NullLiteralTypeAnnotation").bases("FlowType").build(), o("NullTypeAnnotation").bases("FlowType").build(), o("ThisTypeAnnotation").bases("FlowType").build(), o("ExistsTypeAnnotation").bases("FlowType").build(), o("ExistentialTypeParam").bases("FlowType").build(), o("FunctionTypeAnnotation").bases("FlowType").build("params", "returnType", "rest", "typeParameters").field("params", [
          o("FunctionTypeParam")
        ]).field("returnType", o("FlowType")).field("rest", p(o("FunctionTypeParam"), null)).field("typeParameters", p(o("TypeParameterDeclaration"), null)), o("FunctionTypeParam").bases("Node").build("name", "typeAnnotation", "optional").field("name", p(o("Identifier"), null)).field("typeAnnotation", o("FlowType")).field("optional", Boolean), o("ArrayTypeAnnotation").bases("FlowType").build("elementType").field("elementType", o("FlowType")), o("ObjectTypeAnnotation").bases("FlowType").build("properties", "indexers", "callProperties").field("properties", [
          p(o("ObjectTypeProperty"), o("ObjectTypeSpreadProperty"))
        ]).field("indexers", [
          o("ObjectTypeIndexer")
        ], y.emptyArray).field("callProperties", [
          o("ObjectTypeCallProperty")
        ], y.emptyArray).field("inexact", p(Boolean, void 0), y.undefined).field("exact", Boolean, y.false).field("internalSlots", [
          o("ObjectTypeInternalSlot")
        ], y.emptyArray), o("Variance").bases("Node").build("kind").field("kind", p("plus", "minus"));
        var g = p(o("Variance"), "plus", "minus", null);
        o("ObjectTypeProperty").bases("Node").build("key", "value", "optional").field("key", p(o("Literal"), o("Identifier"))).field("value", o("FlowType")).field("optional", Boolean).field("variance", g, y.null), o("ObjectTypeIndexer").bases("Node").build("id", "key", "value").field("id", o("Identifier")).field("key", o("FlowType")).field("value", o("FlowType")).field("variance", g, y.null).field("static", Boolean, y.false), o("ObjectTypeCallProperty").bases("Node").build("value").field("value", o("FunctionTypeAnnotation")).field("static", Boolean, y.false), o("QualifiedTypeIdentifier").bases("Node").build("qualification", "id").field("qualification", p(o("Identifier"), o("QualifiedTypeIdentifier"))).field("id", o("Identifier")), o("GenericTypeAnnotation").bases("FlowType").build("id", "typeParameters").field("id", p(o("Identifier"), o("QualifiedTypeIdentifier"))).field("typeParameters", p(o("TypeParameterInstantiation"), null)), o("MemberTypeAnnotation").bases("FlowType").build("object", "property").field("object", o("Identifier")).field("property", p(o("MemberTypeAnnotation"), o("GenericTypeAnnotation"))), o("IndexedAccessType").bases("FlowType").build("objectType", "indexType").field("objectType", o("FlowType")).field("indexType", o("FlowType")), o("OptionalIndexedAccessType").bases("FlowType").build("objectType", "indexType", "optional").field("objectType", o("FlowType")).field("indexType", o("FlowType")).field("optional", Boolean), o("UnionTypeAnnotation").bases("FlowType").build("types").field("types", [
          o("FlowType")
        ]), o("IntersectionTypeAnnotation").bases("FlowType").build("types").field("types", [
          o("FlowType")
        ]), o("TypeofTypeAnnotation").bases("FlowType").build("argument").field("argument", o("FlowType")), o("ObjectTypeSpreadProperty").bases("Node").build("argument").field("argument", o("FlowType")), o("ObjectTypeInternalSlot").bases("Node").build("id", "value", "optional", "static", "method").field("id", o("Identifier")).field("value", o("FlowType")).field("optional", Boolean).field("static", Boolean).field("method", Boolean), o("TypeParameterDeclaration").bases("Node").build("params").field("params", [
          o("TypeParameter")
        ]), o("TypeParameterInstantiation").bases("Node").build("params").field("params", [
          o("FlowType")
        ]), o("TypeParameter").bases("FlowType").build("name", "variance", "bound", "default").field("name", String).field("variance", g, y.null).field("bound", p(o("TypeAnnotation"), null), y.null).field("default", p(o("FlowType"), null), y.null), o("ClassProperty").field("variance", g, y.null), o("ClassImplements").bases("Node").build("id").field("id", o("Identifier")).field("superClass", p(o("Expression"), null), y.null).field("typeParameters", p(o("TypeParameterInstantiation"), null), y.null), o("InterfaceTypeAnnotation").bases("FlowType").build("body", "extends").field("body", o("ObjectTypeAnnotation")).field("extends", p([
          o("InterfaceExtends")
        ], null), y.null), o("InterfaceDeclaration").bases("Declaration").build("id", "body", "extends").field("id", o("Identifier")).field("typeParameters", p(o("TypeParameterDeclaration"), null), y.null).field("body", o("ObjectTypeAnnotation")).field("extends", [
          o("InterfaceExtends")
        ]), o("DeclareInterface").bases("InterfaceDeclaration").build("id", "body", "extends"), o("InterfaceExtends").bases("Node").build("id").field("id", o("Identifier")).field("typeParameters", p(o("TypeParameterInstantiation"), null), y.null), o("TypeAlias").bases("Declaration").build("id", "typeParameters", "right").field("id", o("Identifier")).field("typeParameters", p(o("TypeParameterDeclaration"), null)).field("right", o("FlowType")), o("DeclareTypeAlias").bases("TypeAlias").build("id", "typeParameters", "right"), o("OpaqueType").bases("Declaration").build("id", "typeParameters", "impltype", "supertype").field("id", o("Identifier")).field("typeParameters", p(o("TypeParameterDeclaration"), null)).field("impltype", o("FlowType")).field("supertype", p(o("FlowType"), null)), o("DeclareOpaqueType").bases("OpaqueType").build("id", "typeParameters", "supertype").field("impltype", p(o("FlowType"), null)), o("TypeCastExpression").bases("Expression").build("expression", "typeAnnotation").field("expression", o("Expression")).field("typeAnnotation", o("TypeAnnotation")), o("TupleTypeAnnotation").bases("FlowType").build("types").field("types", [
          o("FlowType")
        ]), o("DeclareVariable").bases("Statement").build("id").field("id", o("Identifier")), o("DeclareFunction").bases("Statement").build("id").field("id", o("Identifier")).field("predicate", p(o("FlowPredicate"), null), y.null), o("DeclareClass").bases("InterfaceDeclaration").build("id"), o("DeclareModule").bases("Statement").build("id", "body").field("id", p(o("Identifier"), o("Literal"))).field("body", o("BlockStatement")), o("DeclareModuleExports").bases("Statement").build("typeAnnotation").field("typeAnnotation", o("TypeAnnotation")), o("DeclareExportDeclaration").bases("Declaration").build("default", "declaration", "specifiers", "source").field("default", Boolean).field("declaration", p(o("DeclareVariable"), o("DeclareFunction"), o("DeclareClass"), o("FlowType"), o("TypeAlias"), o("DeclareOpaqueType"), o("InterfaceDeclaration"), null)).field("specifiers", [
          p(o("ExportSpecifier"), o("ExportBatchSpecifier"))
        ], y.emptyArray).field("source", p(o("Literal"), null), y.null), o("DeclareExportAllDeclaration").bases("Declaration").build("source").field("source", p(o("Literal"), null), y.null), o("ImportDeclaration").field("importKind", p("value", "type", "typeof"), function() {
          return "value";
        }), o("FlowPredicate").bases("Flow"), o("InferredPredicate").bases("FlowPredicate").build(), o("DeclaredPredicate").bases("FlowPredicate").build("value").field("value", o("Expression")), o("Function").field("predicate", p(o("FlowPredicate"), null), y.null), o("CallExpression").field("typeArguments", p(null, o("TypeParameterInstantiation")), y.null), o("NewExpression").field("typeArguments", p(null, o("TypeParameterInstantiation")), y.null), o("EnumDeclaration").bases("Declaration").build("id", "body").field("id", o("Identifier")).field("body", p(o("EnumBooleanBody"), o("EnumNumberBody"), o("EnumStringBody"), o("EnumSymbolBody"))), o("EnumBooleanBody").build("members", "explicitType").field("members", [
          o("EnumBooleanMember")
        ]).field("explicitType", Boolean), o("EnumNumberBody").build("members", "explicitType").field("members", [
          o("EnumNumberMember")
        ]).field("explicitType", Boolean), o("EnumStringBody").build("members", "explicitType").field("members", p([
          o("EnumStringMember")
        ], [
          o("EnumDefaultedMember")
        ])).field("explicitType", Boolean), o("EnumSymbolBody").build("members").field("members", [
          o("EnumDefaultedMember")
        ]), o("EnumBooleanMember").build("id", "init").field("id", o("Identifier")).field("init", p(o("Literal"), Boolean)), o("EnumNumberMember").build("id", "init").field("id", o("Identifier")).field("init", o("Literal")), o("EnumStringMember").build("id", "init").field("id", o("Identifier")).field("init", o("Literal")), o("EnumDefaultedMember").build("id").field("id", o("Identifier"));
      }
      t.default = d, (0, u.maybeSetModuleExports)(function() {
        return e;
      });
    }(flow, flow.exports)), flow.exports;
  }
  var esprima$2 = {
    exports: {}
  };
  esprima$2.exports;
  var hasRequiredEsprima$2;
  function requireEsprima$2() {
    return hasRequiredEsprima$2 || (hasRequiredEsprima$2 = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireEsProposals()), l = r.__importDefault(requireTypes()), s = r.__importStar(requireShared());
      function u(d) {
        d.use(n.default);
        var h = d.use(l.default), f = d.use(s.default).defaults, o = h.Type.def, p = h.Type.or;
        o("VariableDeclaration").field("declarations", [
          p(o("VariableDeclarator"), o("Identifier"))
        ]), o("Property").field("value", p(o("Expression"), o("Pattern"))), o("ArrayPattern").field("elements", [
          p(o("Pattern"), o("SpreadElement"), null)
        ]), o("ObjectPattern").field("properties", [
          p(o("Property"), o("PropertyPattern"), o("SpreadPropertyPattern"), o("SpreadProperty"))
        ]), o("ExportSpecifier").bases("ModuleSpecifier").build("id", "name"), o("ExportBatchSpecifier").bases("Specifier").build(), o("ExportDeclaration").bases("Declaration").build("default", "declaration", "specifiers", "source").field("default", Boolean).field("declaration", p(o("Declaration"), o("Expression"), null)).field("specifiers", [
          p(o("ExportSpecifier"), o("ExportBatchSpecifier"))
        ], f.emptyArray).field("source", p(o("Literal"), null), f.null), o("Block").bases("Comment").build("value", "leading", "trailing"), o("Line").bases("Comment").build("value", "leading", "trailing");
      }
      t.default = u, (0, s.maybeSetModuleExports)(function() {
        return e;
      });
    }(esprima$2, esprima$2.exports)), esprima$2.exports;
  }
  var babel = {
    exports: {}
  }, babelCore = {
    exports: {}
  };
  babelCore.exports;
  var hasRequiredBabelCore;
  function requireBabelCore() {
    return hasRequiredBabelCore || (hasRequiredBabelCore = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireEsProposals()), l = r.__importDefault(requireTypes()), s = r.__importStar(requireShared());
      function u(d) {
        var h, f, o, p, y;
        d.use(n.default);
        var g = d.use(l.default), v = d.use(s.default).defaults, c = g.Type.def, m = g.Type.or, _ = g.builtInTypes.undefined;
        c("Noop").bases("Statement").build(), c("DoExpression").bases("Expression").build("body").field("body", [
          c("Statement")
        ]), c("BindExpression").bases("Expression").build("object", "callee").field("object", m(c("Expression"), null)).field("callee", c("Expression")), c("ParenthesizedExpression").bases("Expression").build("expression").field("expression", c("Expression")), c("ExportNamespaceSpecifier").bases("Specifier").build("exported").field("exported", c("Identifier")), c("ExportDefaultSpecifier").bases("Specifier").build("exported").field("exported", c("Identifier")), c("CommentBlock").bases("Comment").build("value", "leading", "trailing"), c("CommentLine").bases("Comment").build("value", "leading", "trailing"), c("Directive").bases("Node").build("value").field("value", c("DirectiveLiteral")), c("DirectiveLiteral").bases("Node", "Expression").build("value").field("value", String, v["use strict"]), c("InterpreterDirective").bases("Node").build("value").field("value", String), c("BlockStatement").bases("Statement").build("body").field("body", [
          c("Statement")
        ]).field("directives", [
          c("Directive")
        ], v.emptyArray), c("Program").bases("Node").build("body").field("body", [
          c("Statement")
        ]).field("directives", [
          c("Directive")
        ], v.emptyArray).field("interpreter", m(c("InterpreterDirective"), null), v.null);
        function x(C, D) {
          return C === void 0 && (C = String), [
            "extra",
            {
              rawValue: C,
              raw: String
            },
            function() {
              var F = g.getFieldValue(this, "value");
              return {
                rawValue: F,
                raw: D ? D(F) : String(F)
              };
            }
          ];
        }
        (h = c("StringLiteral").bases("Literal").build("value").field("value", String)).field.apply(h, x(String, function(C) {
          return JSON.stringify(C);
        })), (f = c("NumericLiteral").bases("Literal").build("value").field("value", Number).field("raw", m(String, null), v.null)).field.apply(f, x(Number)), (o = c("BigIntLiteral").bases("Literal").build("value").field("value", m(String, Number))).field.apply(o, x(String, function(C) {
          return C + "n";
        })), (p = c("DecimalLiteral").bases("Literal").build("value").field("value", String)).field.apply(p, x(String, function(C) {
          return C + "m";
        })), c("NullLiteral").bases("Literal").build().field("value", null, v.null), c("BooleanLiteral").bases("Literal").build("value").field("value", Boolean), (y = c("RegExpLiteral").bases("Literal").build("pattern", "flags").field("pattern", String).field("flags", String).field("value", RegExp, function() {
          return new RegExp(this.pattern, this.flags);
        })).field.apply(y, x(m(RegExp, _), function(C) {
          return "/".concat(C.pattern, "/").concat(C.flags || "");
        })).field("regex", {
          pattern: String,
          flags: String
        }, function() {
          return {
            pattern: this.pattern,
            flags: this.flags
          };
        });
        var S = m(c("Property"), c("ObjectMethod"), c("ObjectProperty"), c("SpreadProperty"), c("SpreadElement"));
        c("ObjectExpression").bases("Expression").build("properties").field("properties", [
          S
        ]), c("ObjectMethod").bases("Node", "Function").build("kind", "key", "params", "body", "computed").field("kind", m("method", "get", "set")).field("key", m(c("Literal"), c("Identifier"), c("Expression"))).field("params", [
          c("Pattern")
        ]).field("body", c("BlockStatement")).field("computed", Boolean, v.false).field("generator", Boolean, v.false).field("async", Boolean, v.false).field("accessibility", m(c("Literal"), null), v.null).field("decorators", m([
          c("Decorator")
        ], null), v.null), c("ObjectProperty").bases("Node").build("key", "value").field("key", m(c("Literal"), c("Identifier"), c("Expression"))).field("value", m(c("Expression"), c("Pattern"))).field("accessibility", m(c("Literal"), null), v.null).field("computed", Boolean, v.false);
        var E = m(c("MethodDefinition"), c("VariableDeclarator"), c("ClassPropertyDefinition"), c("ClassProperty"), c("ClassPrivateProperty"), c("ClassMethod"), c("ClassPrivateMethod"), c("ClassAccessorProperty"), c("StaticBlock"));
        c("ClassBody").bases("Declaration").build("body").field("body", [
          E
        ]), c("ClassMethod").bases("Declaration", "Function").build("kind", "key", "params", "body", "computed", "static").field("key", m(c("Literal"), c("Identifier"), c("Expression"))), c("ClassPrivateMethod").bases("Declaration", "Function").build("key", "params", "body", "kind", "computed", "static").field("key", c("PrivateName")), c("ClassAccessorProperty").bases("Declaration").build("key", "value", "decorators", "computed", "static").field("key", m(c("Literal"), c("Identifier"), c("PrivateName"), c("Expression"))).field("value", m(c("Expression"), null), v.null), [
          "ClassMethod",
          "ClassPrivateMethod"
        ].forEach(function(C) {
          c(C).field("kind", m("get", "set", "method", "constructor"), function() {
            return "method";
          }).field("body", c("BlockStatement")).field("access", m("public", "private", "protected", null), v.null);
        }), [
          "ClassMethod",
          "ClassPrivateMethod",
          "ClassAccessorProperty"
        ].forEach(function(C) {
          c(C).field("computed", Boolean, v.false).field("static", Boolean, v.false).field("abstract", Boolean, v.false).field("accessibility", m("public", "private", "protected", null), v.null).field("decorators", m([
            c("Decorator")
          ], null), v.null).field("definite", Boolean, v.false).field("optional", Boolean, v.false).field("override", Boolean, v.false).field("readonly", Boolean, v.false);
        });
        var w = m(c("Property"), c("PropertyPattern"), c("SpreadPropertyPattern"), c("SpreadProperty"), c("ObjectProperty"), c("RestProperty"), c("RestElement"));
        c("ObjectPattern").bases("Pattern").build("properties").field("properties", [
          w
        ]).field("decorators", m([
          c("Decorator")
        ], null), v.null), c("SpreadProperty").bases("Node").build("argument").field("argument", c("Expression")), c("RestProperty").bases("Node").build("argument").field("argument", c("Expression")), c("ForAwaitStatement").bases("Statement").build("left", "right", "body").field("left", m(c("VariableDeclaration"), c("Expression"))).field("right", c("Expression")).field("body", c("Statement")), c("Import").bases("Expression").build();
      }
      t.default = u, (0, s.maybeSetModuleExports)(function() {
        return e;
      });
    }(babelCore, babelCore.exports)), babelCore.exports;
  }
  babel.exports;
  var hasRequiredBabel;
  function requireBabel() {
    return hasRequiredBabel || (hasRequiredBabel = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireTypes()), l = r.__importDefault(requireBabelCore()), s = r.__importDefault(requireFlow()), u = requireShared();
      function d(h) {
        var f = h.use(n.default), o = f.Type.def;
        h.use(l.default), h.use(s.default), o("V8IntrinsicIdentifier").bases("Expression").build("name").field("name", String), o("TopicReference").bases("Expression").build();
      }
      t.default = d, (0, u.maybeSetModuleExports)(function() {
        return e;
      });
    }(babel, babel.exports)), babel.exports;
  }
  var typescript = {
    exports: {}
  };
  typescript.exports;
  var hasRequiredTypescript;
  function requireTypescript() {
    return hasRequiredTypescript || (hasRequiredTypescript = 1, function(e, t) {
      Object.defineProperty(t, "__esModule", {
        value: true
      });
      var r = require$$0, n = r.__importDefault(requireBabelCore()), l = r.__importDefault(requireTypeAnnotations()), s = r.__importDefault(requireTypes()), u = r.__importStar(requireShared());
      function d(h) {
        h.use(n.default), h.use(l.default);
        var f = h.use(s.default), o = f.namedTypes, p = f.Type.def, y = f.Type.or, g = h.use(u.default).defaults, v = f.Type.from(function(x, S) {
          return !!(o.StringLiteral && o.StringLiteral.check(x, S) || o.Literal && o.Literal.check(x, S) && typeof x.value == "string");
        }, "StringLiteral");
        p("TSType").bases("Node");
        var c = y(p("Identifier"), p("TSQualifiedName"));
        p("TSTypeReference").bases("TSType", "TSHasOptionalTypeParameterInstantiation").build("typeName", "typeParameters").field("typeName", c), p("TSHasOptionalTypeParameterInstantiation").field("typeParameters", y(p("TSTypeParameterInstantiation"), null), g.null), p("TSHasOptionalTypeParameters").field("typeParameters", y(p("TSTypeParameterDeclaration"), null, void 0), g.null), p("TSHasOptionalTypeAnnotation").field("typeAnnotation", y(p("TSTypeAnnotation"), null), g.null), p("TSQualifiedName").bases("Node").build("left", "right").field("left", c).field("right", c), p("TSAsExpression").bases("Expression", "Pattern").build("expression", "typeAnnotation").field("expression", p("Expression")).field("typeAnnotation", p("TSType")).field("extra", y({
          parenthesized: Boolean
        }, null), g.null), p("TSTypeCastExpression").bases("Expression").build("expression", "typeAnnotation").field("expression", p("Expression")).field("typeAnnotation", p("TSType")), p("TSSatisfiesExpression").bases("Expression", "Pattern").build("expression", "typeAnnotation").field("expression", p("Expression")).field("typeAnnotation", p("TSType")), p("TSNonNullExpression").bases("Expression", "Pattern").build("expression").field("expression", p("Expression")), [
          "TSAnyKeyword",
          "TSBigIntKeyword",
          "TSBooleanKeyword",
          "TSNeverKeyword",
          "TSNullKeyword",
          "TSNumberKeyword",
          "TSObjectKeyword",
          "TSStringKeyword",
          "TSSymbolKeyword",
          "TSUndefinedKeyword",
          "TSUnknownKeyword",
          "TSVoidKeyword",
          "TSIntrinsicKeyword",
          "TSThisType"
        ].forEach(function(x) {
          p(x).bases("TSType").build();
        }), p("TSArrayType").bases("TSType").build("elementType").field("elementType", p("TSType")), p("TSLiteralType").bases("TSType").build("literal").field("literal", y(p("NumericLiteral"), p("StringLiteral"), p("BooleanLiteral"), p("TemplateLiteral"), p("UnaryExpression"), p("BigIntLiteral"))), p("TemplateLiteral").field("expressions", y([
          p("Expression")
        ], [
          p("TSType")
        ])), [
          "TSUnionType",
          "TSIntersectionType"
        ].forEach(function(x) {
          p(x).bases("TSType").build("types").field("types", [
            p("TSType")
          ]);
        }), p("TSConditionalType").bases("TSType").build("checkType", "extendsType", "trueType", "falseType").field("checkType", p("TSType")).field("extendsType", p("TSType")).field("trueType", p("TSType")).field("falseType", p("TSType")), p("TSInferType").bases("TSType").build("typeParameter").field("typeParameter", p("TSTypeParameter")), p("TSParenthesizedType").bases("TSType").build("typeAnnotation").field("typeAnnotation", p("TSType"));
        var m = [
          y(p("Identifier"), p("RestElement"), p("ArrayPattern"), p("ObjectPattern"))
        ];
        [
          "TSFunctionType",
          "TSConstructorType"
        ].forEach(function(x) {
          p(x).bases("TSType", "TSHasOptionalTypeParameters", "TSHasOptionalTypeAnnotation").build("parameters").field("parameters", m);
        }), p("TSDeclareFunction").bases("Declaration", "TSHasOptionalTypeParameters").build("id", "params", "returnType").field("declare", Boolean, g.false).field("async", Boolean, g.false).field("generator", Boolean, g.false).field("id", y(p("Identifier"), null), g.null).field("params", [
          p("Pattern")
        ]).field("returnType", y(p("TSTypeAnnotation"), p("Noop"), null), g.null), p("TSDeclareMethod").bases("Declaration", "TSHasOptionalTypeParameters").build("key", "params", "returnType").field("async", Boolean, g.false).field("generator", Boolean, g.false).field("params", [
          p("Pattern")
        ]).field("abstract", Boolean, g.false).field("accessibility", y("public", "private", "protected", void 0), g.undefined).field("static", Boolean, g.false).field("computed", Boolean, g.false).field("optional", Boolean, g.false).field("key", y(p("Identifier"), p("StringLiteral"), p("NumericLiteral"), p("Expression"))).field("kind", y("get", "set", "method", "constructor"), function() {
          return "method";
        }).field("access", y("public", "private", "protected", void 0), g.undefined).field("decorators", y([
          p("Decorator")
        ], null), g.null).field("returnType", y(p("TSTypeAnnotation"), p("Noop"), null), g.null), p("TSMappedType").bases("TSType").build("typeParameter", "typeAnnotation").field("readonly", y(Boolean, "+", "-"), g.false).field("typeParameter", p("TSTypeParameter")).field("optional", y(Boolean, "+", "-"), g.false).field("typeAnnotation", y(p("TSType"), null), g.null), p("TSTupleType").bases("TSType").build("elementTypes").field("elementTypes", [
          y(p("TSType"), p("TSNamedTupleMember"))
        ]), p("TSNamedTupleMember").bases("TSType").build("label", "elementType", "optional").field("label", p("Identifier")).field("optional", Boolean, g.false).field("elementType", p("TSType")), p("TSRestType").bases("TSType").build("typeAnnotation").field("typeAnnotation", p("TSType")), p("TSOptionalType").bases("TSType").build("typeAnnotation").field("typeAnnotation", p("TSType")), p("TSIndexedAccessType").bases("TSType").build("objectType", "indexType").field("objectType", p("TSType")).field("indexType", p("TSType")), p("TSTypeOperator").bases("TSType").build("operator").field("operator", String).field("typeAnnotation", p("TSType")), p("TSTypeAnnotation").bases("Node").build("typeAnnotation").field("typeAnnotation", y(p("TSType"), p("TSTypeAnnotation"))), p("TSIndexSignature").bases("Declaration", "TSHasOptionalTypeAnnotation").build("parameters", "typeAnnotation").field("parameters", [
          p("Identifier")
        ]).field("readonly", Boolean, g.false), p("TSPropertySignature").bases("Declaration", "TSHasOptionalTypeAnnotation").build("key", "typeAnnotation", "optional").field("key", p("Expression")).field("computed", Boolean, g.false).field("readonly", Boolean, g.false).field("optional", Boolean, g.false).field("initializer", y(p("Expression"), null), g.null), p("TSMethodSignature").bases("Declaration", "TSHasOptionalTypeParameters", "TSHasOptionalTypeAnnotation").build("key", "parameters", "typeAnnotation").field("key", p("Expression")).field("computed", Boolean, g.false).field("optional", Boolean, g.false).field("parameters", m), p("TSTypePredicate").bases("TSTypeAnnotation", "TSType").build("parameterName", "typeAnnotation", "asserts").field("parameterName", y(p("Identifier"), p("TSThisType"))).field("typeAnnotation", y(p("TSTypeAnnotation"), null), g.null).field("asserts", Boolean, g.false), [
          "TSCallSignatureDeclaration",
          "TSConstructSignatureDeclaration"
        ].forEach(function(x) {
          p(x).bases("Declaration", "TSHasOptionalTypeParameters", "TSHasOptionalTypeAnnotation").build("parameters", "typeAnnotation").field("parameters", m);
        }), p("TSEnumMember").bases("Node").build("id", "initializer").field("id", y(p("Identifier"), v)).field("initializer", y(p("Expression"), null), g.null), p("TSTypeQuery").bases("TSType").build("exprName").field("exprName", y(c, p("TSImportType")));
        var _ = y(p("TSCallSignatureDeclaration"), p("TSConstructSignatureDeclaration"), p("TSIndexSignature"), p("TSMethodSignature"), p("TSPropertySignature"));
        p("TSTypeLiteral").bases("TSType").build("members").field("members", [
          _
        ]), p("TSTypeParameter").bases("Identifier").build("name", "constraint", "default").field("name", y(p("Identifier"), String)).field("constraint", y(p("TSType"), void 0), g.undefined).field("default", y(p("TSType"), void 0), g.undefined), p("TSTypeAssertion").bases("Expression", "Pattern").build("typeAnnotation", "expression").field("typeAnnotation", p("TSType")).field("expression", p("Expression")).field("extra", y({
          parenthesized: Boolean
        }, null), g.null), p("TSTypeParameterDeclaration").bases("Declaration").build("params").field("params", [
          p("TSTypeParameter")
        ]), p("TSInstantiationExpression").bases("Expression", "TSHasOptionalTypeParameterInstantiation").build("expression", "typeParameters").field("expression", p("Expression")), p("TSTypeParameterInstantiation").bases("Node").build("params").field("params", [
          p("TSType")
        ]), p("TSEnumDeclaration").bases("Declaration").build("id", "members").field("id", p("Identifier")).field("const", Boolean, g.false).field("declare", Boolean, g.false).field("members", [
          p("TSEnumMember")
        ]).field("initializer", y(p("Expression"), null), g.null), p("TSTypeAliasDeclaration").bases("Declaration", "TSHasOptionalTypeParameters").build("id", "typeAnnotation").field("id", p("Identifier")).field("declare", Boolean, g.false).field("typeAnnotation", p("TSType")), p("TSModuleBlock").bases("Node").build("body").field("body", [
          p("Statement")
        ]), p("TSModuleDeclaration").bases("Declaration").build("id", "body").field("id", y(v, c)).field("declare", Boolean, g.false).field("global", Boolean, g.false).field("body", y(p("TSModuleBlock"), p("TSModuleDeclaration"), null), g.null), p("TSImportType").bases("TSType", "TSHasOptionalTypeParameterInstantiation").build("argument", "qualifier", "typeParameters").field("argument", v).field("qualifier", y(c, void 0), g.undefined), p("TSImportEqualsDeclaration").bases("Declaration").build("id", "moduleReference").field("id", p("Identifier")).field("isExport", Boolean, g.false).field("moduleReference", y(c, p("TSExternalModuleReference"))), p("TSExternalModuleReference").bases("Declaration").build("expression").field("expression", v), p("TSExportAssignment").bases("Statement").build("expression").field("expression", p("Expression")), p("TSNamespaceExportDeclaration").bases("Declaration").build("id").field("id", p("Identifier")), p("TSInterfaceBody").bases("Node").build("body").field("body", [
          _
        ]), p("TSExpressionWithTypeArguments").bases("TSType", "TSHasOptionalTypeParameterInstantiation").build("expression", "typeParameters").field("expression", c), p("TSInterfaceDeclaration").bases("Declaration", "TSHasOptionalTypeParameters").build("id", "body").field("id", c).field("declare", Boolean, g.false).field("extends", y([
          p("TSExpressionWithTypeArguments")
        ], null), g.null).field("body", p("TSInterfaceBody")), p("TSParameterProperty").bases("Pattern").build("parameter").field("accessibility", y("public", "private", "protected", void 0), g.undefined).field("readonly", Boolean, g.false).field("parameter", y(p("Identifier"), p("AssignmentPattern"))), p("ClassProperty").field("access", y("public", "private", "protected", void 0), g.undefined), p("ClassAccessorProperty").bases("Declaration", "TSHasOptionalTypeAnnotation"), p("ClassBody").field("body", [
          y(p("MethodDefinition"), p("VariableDeclarator"), p("ClassPropertyDefinition"), p("ClassProperty"), p("ClassPrivateProperty"), p("ClassAccessorProperty"), p("ClassMethod"), p("ClassPrivateMethod"), p("StaticBlock"), p("TSDeclareMethod"), _)
        ]);
      }
      t.default = d, (0, u.maybeSetModuleExports)(function() {
        return e;
      });
    }(typescript, typescript.exports)), typescript.exports;
  }
  var namedTypes = {}, hasRequiredNamedTypes;
  function requireNamedTypes() {
    return hasRequiredNamedTypes || (hasRequiredNamedTypes = 1, function(e) {
      Object.defineProperty(e, "__esModule", {
        value: true
      }), e.namedTypes = void 0, e.namedTypes || (e.namedTypes = {});
    }(namedTypes)), namedTypes;
  }
  var hasRequiredMain;
  function requireMain() {
    return hasRequiredMain || (hasRequiredMain = 1, function(e) {
      Object.defineProperty(e, "__esModule", {
        value: true
      }), e.visit = e.use = e.Type = e.someField = e.PathVisitor = e.Path = e.NodePath = e.namedTypes = e.getSupertypeNames = e.getFieldValue = e.getFieldNames = e.getBuilderName = e.finalize = e.eachField = e.defineMethod = e.builtInTypes = e.builders = e.astNodesAreEquivalent = void 0;
      var t = require$$0, r = t.__importDefault(requireFork()), n = t.__importDefault(requireEsProposals()), l = t.__importDefault(requireJsx()), s = t.__importDefault(requireFlow()), u = t.__importDefault(requireEsprima$2()), d = t.__importDefault(requireBabel()), h = t.__importDefault(requireTypescript()), f = requireNamedTypes();
      Object.defineProperty(e, "namedTypes", {
        enumerable: true,
        get: function() {
          return f.namedTypes;
        }
      });
      var o = (0, r.default)([
        n.default,
        l.default,
        s.default,
        u.default,
        d.default,
        h.default
      ]), p = o.astNodesAreEquivalent, y = o.builders, g = o.builtInTypes, v = o.defineMethod, c = o.eachField, m = o.finalize, _ = o.getBuilderName, x = o.getFieldNames, S = o.getFieldValue, E = o.getSupertypeNames, w = o.namedTypes, C = o.NodePath, D = o.Path, A = o.PathVisitor, F = o.someField, B = o.Type, N = o.use, I = o.visit;
      e.astNodesAreEquivalent = p, e.builders = y, e.builtInTypes = g, e.defineMethod = v, e.eachField = c, e.finalize = m, e.getBuilderName = _, e.getFieldNames = x, e.getFieldValue = S, e.getSupertypeNames = E, e.NodePath = C, e.Path = D, e.PathVisitor = A, e.someField = F, e.Type = B, e.use = N, e.visit = I, Object.assign(f.namedTypes, w);
    }(main)), main;
  }
  var parser = {}, tinyInvariant_cjs, hasRequiredTinyInvariant_cjs;
  function requireTinyInvariant_cjs() {
    if (hasRequiredTinyInvariant_cjs) return tinyInvariant_cjs;
    hasRequiredTinyInvariant_cjs = 1;
    var e = "Invariant failed";
    function t(r, n) {
      if (!r) throw new Error(e);
    }
    return tinyInvariant_cjs = t, tinyInvariant_cjs;
  }
  var options = {}, util$1 = {}, sourceMap = {}, sourceMapGenerator = {}, base64Vlq = {}, base64 = {}, hasRequiredBase64;
  function requireBase64() {
    if (hasRequiredBase64) return base64;
    hasRequiredBase64 = 1;
    var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");
    return base64.encode = function(t) {
      if (0 <= t && t < e.length) return e[t];
      throw new TypeError("Must be between 0 and 63: " + t);
    }, base64.decode = function(t) {
      var r = 65, n = 90, l = 97, s = 122, u = 48, d = 57, h = 43, f = 47, o = 26, p = 52;
      return r <= t && t <= n ? t - r : l <= t && t <= s ? t - l + o : u <= t && t <= d ? t - u + p : t == h ? 62 : t == f ? 63 : -1;
    }, base64;
  }
  var hasRequiredBase64Vlq;
  function requireBase64Vlq() {
    if (hasRequiredBase64Vlq) return base64Vlq;
    hasRequiredBase64Vlq = 1;
    var e = requireBase64(), t = 5, r = 1 << t, n = r - 1, l = r;
    function s(d) {
      return d < 0 ? (-d << 1) + 1 : (d << 1) + 0;
    }
    function u(d) {
      var h = (d & 1) === 1, f = d >> 1;
      return h ? -f : f;
    }
    return base64Vlq.encode = function(h) {
      var f = "", o, p = s(h);
      do
        o = p & n, p >>>= t, p > 0 && (o |= l), f += e.encode(o);
      while (p > 0);
      return f;
    }, base64Vlq.decode = function(h, f, o) {
      var p = h.length, y = 0, g = 0, v, c;
      do {
        if (f >= p) throw new Error("Expected more digits in base 64 VLQ value.");
        if (c = e.decode(h.charCodeAt(f++)), c === -1) throw new Error("Invalid base64 digit: " + h.charAt(f - 1));
        v = !!(c & l), c &= n, y = y + (c << g), g += t;
      } while (v);
      o.value = u(y), o.rest = f;
    }, base64Vlq;
  }
  var util = {}, hasRequiredUtil$1;
  function requireUtil$1() {
    return hasRequiredUtil$1 || (hasRequiredUtil$1 = 1, function(e) {
      function t(E, w, C) {
        if (w in E) return E[w];
        if (arguments.length === 3) return C;
        throw new Error('"' + w + '" is a required argument.');
      }
      e.getArg = t;
      var r = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/, n = /^data:.+\,.+$/;
      function l(E) {
        var w = E.match(r);
        return w ? {
          scheme: w[1],
          auth: w[2],
          host: w[3],
          port: w[4],
          path: w[5]
        } : null;
      }
      e.urlParse = l;
      function s(E) {
        var w = "";
        return E.scheme && (w += E.scheme + ":"), w += "//", E.auth && (w += E.auth + "@"), E.host && (w += E.host), E.port && (w += ":" + E.port), E.path && (w += E.path), w;
      }
      e.urlGenerate = s;
      function u(E) {
        var w = E, C = l(E);
        if (C) {
          if (!C.path) return E;
          w = C.path;
        }
        for (var D = e.isAbsolute(w), A = w.split(/\/+/), F, B = 0, N = A.length - 1; N >= 0; N--) F = A[N], F === "." ? A.splice(N, 1) : F === ".." ? B++ : B > 0 && (F === "" ? (A.splice(N + 1, B), B = 0) : (A.splice(N, 2), B--));
        return w = A.join("/"), w === "" && (w = D ? "/" : "."), C ? (C.path = w, s(C)) : w;
      }
      e.normalize = u;
      function d(E, w) {
        E === "" && (E = "."), w === "" && (w = ".");
        var C = l(w), D = l(E);
        if (D && (E = D.path || "/"), C && !C.scheme) return D && (C.scheme = D.scheme), s(C);
        if (C || w.match(n)) return w;
        if (D && !D.host && !D.path) return D.host = w, s(D);
        var A = w.charAt(0) === "/" ? w : u(E.replace(/\/+$/, "") + "/" + w);
        return D ? (D.path = A, s(D)) : A;
      }
      e.join = d, e.isAbsolute = function(E) {
        return E.charAt(0) === "/" || r.test(E);
      };
      function h(E, w) {
        E === "" && (E = "."), E = E.replace(/\/$/, "");
        for (var C = 0; w.indexOf(E + "/") !== 0; ) {
          var D = E.lastIndexOf("/");
          if (D < 0 || (E = E.slice(0, D), E.match(/^([^\/]+:\/)?\/*$/))) return w;
          ++C;
        }
        return Array(C + 1).join("../") + w.substr(E.length + 1);
      }
      e.relative = h;
      var f = function() {
        var E = /* @__PURE__ */ Object.create(null);
        return !("__proto__" in E);
      }();
      function o(E) {
        return E;
      }
      function p(E) {
        return g(E) ? "$" + E : E;
      }
      e.toSetString = f ? o : p;
      function y(E) {
        return g(E) ? E.slice(1) : E;
      }
      e.fromSetString = f ? o : y;
      function g(E) {
        if (!E) return false;
        var w = E.length;
        if (w < 9 || E.charCodeAt(w - 1) !== 95 || E.charCodeAt(w - 2) !== 95 || E.charCodeAt(w - 3) !== 111 || E.charCodeAt(w - 4) !== 116 || E.charCodeAt(w - 5) !== 111 || E.charCodeAt(w - 6) !== 114 || E.charCodeAt(w - 7) !== 112 || E.charCodeAt(w - 8) !== 95 || E.charCodeAt(w - 9) !== 95) return false;
        for (var C = w - 10; C >= 0; C--) if (E.charCodeAt(C) !== 36) return false;
        return true;
      }
      function v(E, w, C) {
        var D = m(E.source, w.source);
        return D !== 0 || (D = E.originalLine - w.originalLine, D !== 0) || (D = E.originalColumn - w.originalColumn, D !== 0 || C) || (D = E.generatedColumn - w.generatedColumn, D !== 0) || (D = E.generatedLine - w.generatedLine, D !== 0) ? D : m(E.name, w.name);
      }
      e.compareByOriginalPositions = v;
      function c(E, w, C) {
        var D = E.generatedLine - w.generatedLine;
        return D !== 0 || (D = E.generatedColumn - w.generatedColumn, D !== 0 || C) || (D = m(E.source, w.source), D !== 0) || (D = E.originalLine - w.originalLine, D !== 0) || (D = E.originalColumn - w.originalColumn, D !== 0) ? D : m(E.name, w.name);
      }
      e.compareByGeneratedPositionsDeflated = c;
      function m(E, w) {
        return E === w ? 0 : E === null ? 1 : w === null ? -1 : E > w ? 1 : -1;
      }
      function _(E, w) {
        var C = E.generatedLine - w.generatedLine;
        return C !== 0 || (C = E.generatedColumn - w.generatedColumn, C !== 0) || (C = m(E.source, w.source), C !== 0) || (C = E.originalLine - w.originalLine, C !== 0) || (C = E.originalColumn - w.originalColumn, C !== 0) ? C : m(E.name, w.name);
      }
      e.compareByGeneratedPositionsInflated = _;
      function x(E) {
        return JSON.parse(E.replace(/^\)]}'[^\n]*\n/, ""));
      }
      e.parseSourceMapInput = x;
      function S(E, w, C) {
        if (w = w || "", E && (E[E.length - 1] !== "/" && w[0] !== "/" && (E += "/"), w = E + w), C) {
          var D = l(C);
          if (!D) throw new Error("sourceMapURL could not be parsed");
          if (D.path) {
            var A = D.path.lastIndexOf("/");
            A >= 0 && (D.path = D.path.substring(0, A + 1));
          }
          w = d(s(D), w);
        }
        return u(w);
      }
      e.computeSourceURL = S;
    }(util)), util;
  }
  var arraySet = {}, hasRequiredArraySet;
  function requireArraySet() {
    if (hasRequiredArraySet) return arraySet;
    hasRequiredArraySet = 1;
    var e = requireUtil$1(), t = Object.prototype.hasOwnProperty, r = typeof Map < "u";
    function n() {
      this._array = [], this._set = r ? /* @__PURE__ */ new Map() : /* @__PURE__ */ Object.create(null);
    }
    return n.fromArray = function(s, u) {
      for (var d = new n(), h = 0, f = s.length; h < f; h++) d.add(s[h], u);
      return d;
    }, n.prototype.size = function() {
      return r ? this._set.size : Object.getOwnPropertyNames(this._set).length;
    }, n.prototype.add = function(s, u) {
      var d = r ? s : e.toSetString(s), h = r ? this.has(s) : t.call(this._set, d), f = this._array.length;
      (!h || u) && this._array.push(s), h || (r ? this._set.set(s, f) : this._set[d] = f);
    }, n.prototype.has = function(s) {
      if (r) return this._set.has(s);
      var u = e.toSetString(s);
      return t.call(this._set, u);
    }, n.prototype.indexOf = function(s) {
      if (r) {
        var u = this._set.get(s);
        if (u >= 0) return u;
      } else {
        var d = e.toSetString(s);
        if (t.call(this._set, d)) return this._set[d];
      }
      throw new Error('"' + s + '" is not in the set.');
    }, n.prototype.at = function(s) {
      if (s >= 0 && s < this._array.length) return this._array[s];
      throw new Error("No element indexed by " + s);
    }, n.prototype.toArray = function() {
      return this._array.slice();
    }, arraySet.ArraySet = n, arraySet;
  }
  var mappingList = {}, hasRequiredMappingList;
  function requireMappingList() {
    if (hasRequiredMappingList) return mappingList;
    hasRequiredMappingList = 1;
    var e = requireUtil$1();
    function t(n, l) {
      var s = n.generatedLine, u = l.generatedLine, d = n.generatedColumn, h = l.generatedColumn;
      return u > s || u == s && h >= d || e.compareByGeneratedPositionsInflated(n, l) <= 0;
    }
    function r() {
      this._array = [], this._sorted = true, this._last = {
        generatedLine: -1,
        generatedColumn: 0
      };
    }
    return r.prototype.unsortedForEach = function(l, s) {
      this._array.forEach(l, s);
    }, r.prototype.add = function(l) {
      t(this._last, l) ? (this._last = l, this._array.push(l)) : (this._sorted = false, this._array.push(l));
    }, r.prototype.toArray = function() {
      return this._sorted || (this._array.sort(e.compareByGeneratedPositionsInflated), this._sorted = true), this._array;
    }, mappingList.MappingList = r, mappingList;
  }
  var hasRequiredSourceMapGenerator;
  function requireSourceMapGenerator() {
    if (hasRequiredSourceMapGenerator) return sourceMapGenerator;
    hasRequiredSourceMapGenerator = 1;
    var e = requireBase64Vlq(), t = requireUtil$1(), r = requireArraySet().ArraySet, n = requireMappingList().MappingList;
    function l(s) {
      s || (s = {}), this._file = t.getArg(s, "file", null), this._sourceRoot = t.getArg(s, "sourceRoot", null), this._skipValidation = t.getArg(s, "skipValidation", false), this._sources = new r(), this._names = new r(), this._mappings = new n(), this._sourcesContents = null;
    }
    return l.prototype._version = 3, l.fromSourceMap = function(u) {
      var d = u.sourceRoot, h = new l({
        file: u.file,
        sourceRoot: d
      });
      return u.eachMapping(function(f) {
        var o = {
          generated: {
            line: f.generatedLine,
            column: f.generatedColumn
          }
        };
        f.source != null && (o.source = f.source, d != null && (o.source = t.relative(d, o.source)), o.original = {
          line: f.originalLine,
          column: f.originalColumn
        }, f.name != null && (o.name = f.name)), h.addMapping(o);
      }), u.sources.forEach(function(f) {
        var o = f;
        d !== null && (o = t.relative(d, f)), h._sources.has(o) || h._sources.add(o);
        var p = u.sourceContentFor(f);
        p != null && h.setSourceContent(f, p);
      }), h;
    }, l.prototype.addMapping = function(u) {
      var d = t.getArg(u, "generated"), h = t.getArg(u, "original", null), f = t.getArg(u, "source", null), o = t.getArg(u, "name", null);
      this._skipValidation || this._validateMapping(d, h, f, o), f != null && (f = String(f), this._sources.has(f) || this._sources.add(f)), o != null && (o = String(o), this._names.has(o) || this._names.add(o)), this._mappings.add({
        generatedLine: d.line,
        generatedColumn: d.column,
        originalLine: h != null && h.line,
        originalColumn: h != null && h.column,
        source: f,
        name: o
      });
    }, l.prototype.setSourceContent = function(u, d) {
      var h = u;
      this._sourceRoot != null && (h = t.relative(this._sourceRoot, h)), d != null ? (this._sourcesContents || (this._sourcesContents = /* @__PURE__ */ Object.create(null)), this._sourcesContents[t.toSetString(h)] = d) : this._sourcesContents && (delete this._sourcesContents[t.toSetString(h)], Object.keys(this._sourcesContents).length === 0 && (this._sourcesContents = null));
    }, l.prototype.applySourceMap = function(u, d, h) {
      var f = d;
      if (d == null) {
        if (u.file == null) throw new Error(`SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, or the source map's "file" property. Both were omitted.`);
        f = u.file;
      }
      var o = this._sourceRoot;
      o != null && (f = t.relative(o, f));
      var p = new r(), y = new r();
      this._mappings.unsortedForEach(function(g) {
        if (g.source === f && g.originalLine != null) {
          var v = u.originalPositionFor({
            line: g.originalLine,
            column: g.originalColumn
          });
          v.source != null && (g.source = v.source, h != null && (g.source = t.join(h, g.source)), o != null && (g.source = t.relative(o, g.source)), g.originalLine = v.line, g.originalColumn = v.column, v.name != null && (g.name = v.name));
        }
        var c = g.source;
        c != null && !p.has(c) && p.add(c);
        var m = g.name;
        m != null && !y.has(m) && y.add(m);
      }, this), this._sources = p, this._names = y, u.sources.forEach(function(g) {
        var v = u.sourceContentFor(g);
        v != null && (h != null && (g = t.join(h, g)), o != null && (g = t.relative(o, g)), this.setSourceContent(g, v));
      }, this);
    }, l.prototype._validateMapping = function(u, d, h, f) {
      if (d && typeof d.line != "number" && typeof d.column != "number") throw new Error("original.line and original.column are not numbers -- you probably meant to omit the original mapping entirely and only map the generated position. If so, pass null for the original mapping instead of an object with empty or null values.");
      if (!(u && "line" in u && "column" in u && u.line > 0 && u.column >= 0 && !d && !h && !f)) {
        if (u && "line" in u && "column" in u && d && "line" in d && "column" in d && u.line > 0 && u.column >= 0 && d.line > 0 && d.column >= 0 && h) return;
        throw new Error("Invalid mapping: " + JSON.stringify({
          generated: u,
          source: h,
          original: d,
          name: f
        }));
      }
    }, l.prototype._serializeMappings = function() {
      for (var u = 0, d = 1, h = 0, f = 0, o = 0, p = 0, y = "", g, v, c, m, _ = this._mappings.toArray(), x = 0, S = _.length; x < S; x++) {
        if (v = _[x], g = "", v.generatedLine !== d) for (u = 0; v.generatedLine !== d; ) g += ";", d++;
        else if (x > 0) {
          if (!t.compareByGeneratedPositionsInflated(v, _[x - 1])) continue;
          g += ",";
        }
        g += e.encode(v.generatedColumn - u), u = v.generatedColumn, v.source != null && (m = this._sources.indexOf(v.source), g += e.encode(m - p), p = m, g += e.encode(v.originalLine - 1 - f), f = v.originalLine - 1, g += e.encode(v.originalColumn - h), h = v.originalColumn, v.name != null && (c = this._names.indexOf(v.name), g += e.encode(c - o), o = c)), y += g;
      }
      return y;
    }, l.prototype._generateSourcesContent = function(u, d) {
      return u.map(function(h) {
        if (!this._sourcesContents) return null;
        d != null && (h = t.relative(d, h));
        var f = t.toSetString(h);
        return Object.prototype.hasOwnProperty.call(this._sourcesContents, f) ? this._sourcesContents[f] : null;
      }, this);
    }, l.prototype.toJSON = function() {
      var u = {
        version: this._version,
        sources: this._sources.toArray(),
        names: this._names.toArray(),
        mappings: this._serializeMappings()
      };
      return this._file != null && (u.file = this._file), this._sourceRoot != null && (u.sourceRoot = this._sourceRoot), this._sourcesContents && (u.sourcesContent = this._generateSourcesContent(u.sources, u.sourceRoot)), u;
    }, l.prototype.toString = function() {
      return JSON.stringify(this.toJSON());
    }, sourceMapGenerator.SourceMapGenerator = l, sourceMapGenerator;
  }
  var sourceMapConsumer = {}, binarySearch = {}, hasRequiredBinarySearch;
  function requireBinarySearch() {
    return hasRequiredBinarySearch || (hasRequiredBinarySearch = 1, function(e) {
      e.GREATEST_LOWER_BOUND = 1, e.LEAST_UPPER_BOUND = 2;
      function t(r, n, l, s, u, d) {
        var h = Math.floor((n - r) / 2) + r, f = u(l, s[h], true);
        return f === 0 ? h : f > 0 ? n - h > 1 ? t(h, n, l, s, u, d) : d == e.LEAST_UPPER_BOUND ? n < s.length ? n : -1 : h : h - r > 1 ? t(r, h, l, s, u, d) : d == e.LEAST_UPPER_BOUND ? h : r < 0 ? -1 : r;
      }
      e.search = function(n, l, s, u) {
        if (l.length === 0) return -1;
        var d = t(-1, l.length, n, l, s, u || e.GREATEST_LOWER_BOUND);
        if (d < 0) return -1;
        for (; d - 1 >= 0 && s(l[d], l[d - 1], true) === 0; ) --d;
        return d;
      };
    }(binarySearch)), binarySearch;
  }
  var quickSort = {}, hasRequiredQuickSort;
  function requireQuickSort() {
    if (hasRequiredQuickSort) return quickSort;
    hasRequiredQuickSort = 1;
    function e(n, l, s) {
      var u = n[l];
      n[l] = n[s], n[s] = u;
    }
    function t(n, l) {
      return Math.round(n + Math.random() * (l - n));
    }
    function r(n, l, s, u) {
      if (s < u) {
        var d = t(s, u), h = s - 1;
        e(n, d, u);
        for (var f = n[u], o = s; o < u; o++) l(n[o], f) <= 0 && (h += 1, e(n, h, o));
        e(n, h + 1, o);
        var p = h + 1;
        r(n, l, s, p - 1), r(n, l, p + 1, u);
      }
    }
    return quickSort.quickSort = function(n, l) {
      r(n, l, 0, n.length - 1);
    }, quickSort;
  }
  var hasRequiredSourceMapConsumer;
  function requireSourceMapConsumer() {
    if (hasRequiredSourceMapConsumer) return sourceMapConsumer;
    hasRequiredSourceMapConsumer = 1;
    var e = requireUtil$1(), t = requireBinarySearch(), r = requireArraySet().ArraySet, n = requireBase64Vlq(), l = requireQuickSort().quickSort;
    function s(f, o) {
      var p = f;
      return typeof f == "string" && (p = e.parseSourceMapInput(f)), p.sections != null ? new h(p, o) : new u(p, o);
    }
    s.fromSourceMap = function(f, o) {
      return u.fromSourceMap(f, o);
    }, s.prototype._version = 3, s.prototype.__generatedMappings = null, Object.defineProperty(s.prototype, "_generatedMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        return this.__generatedMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__generatedMappings;
      }
    }), s.prototype.__originalMappings = null, Object.defineProperty(s.prototype, "_originalMappings", {
      configurable: true,
      enumerable: true,
      get: function() {
        return this.__originalMappings || this._parseMappings(this._mappings, this.sourceRoot), this.__originalMappings;
      }
    }), s.prototype._charIsMappingSeparator = function(o, p) {
      var y = o.charAt(p);
      return y === ";" || y === ",";
    }, s.prototype._parseMappings = function(o, p) {
      throw new Error("Subclasses must implement _parseMappings");
    }, s.GENERATED_ORDER = 1, s.ORIGINAL_ORDER = 2, s.GREATEST_LOWER_BOUND = 1, s.LEAST_UPPER_BOUND = 2, s.prototype.eachMapping = function(o, p, y) {
      var g = p || null, v = y || s.GENERATED_ORDER, c;
      switch (v) {
        case s.GENERATED_ORDER:
          c = this._generatedMappings;
          break;
        case s.ORIGINAL_ORDER:
          c = this._originalMappings;
          break;
        default:
          throw new Error("Unknown order of iteration.");
      }
      var m = this.sourceRoot;
      c.map(function(_) {
        var x = _.source === null ? null : this._sources.at(_.source);
        return x = e.computeSourceURL(m, x, this._sourceMapURL), {
          source: x,
          generatedLine: _.generatedLine,
          generatedColumn: _.generatedColumn,
          originalLine: _.originalLine,
          originalColumn: _.originalColumn,
          name: _.name === null ? null : this._names.at(_.name)
        };
      }, this).forEach(o, g);
    }, s.prototype.allGeneratedPositionsFor = function(o) {
      var p = e.getArg(o, "line"), y = {
        source: e.getArg(o, "source"),
        originalLine: p,
        originalColumn: e.getArg(o, "column", 0)
      };
      if (y.source = this._findSourceIndex(y.source), y.source < 0) return [];
      var g = [], v = this._findMapping(y, this._originalMappings, "originalLine", "originalColumn", e.compareByOriginalPositions, t.LEAST_UPPER_BOUND);
      if (v >= 0) {
        var c = this._originalMappings[v];
        if (o.column === void 0) for (var m = c.originalLine; c && c.originalLine === m; ) g.push({
          line: e.getArg(c, "generatedLine", null),
          column: e.getArg(c, "generatedColumn", null),
          lastColumn: e.getArg(c, "lastGeneratedColumn", null)
        }), c = this._originalMappings[++v];
        else for (var _ = c.originalColumn; c && c.originalLine === p && c.originalColumn == _; ) g.push({
          line: e.getArg(c, "generatedLine", null),
          column: e.getArg(c, "generatedColumn", null),
          lastColumn: e.getArg(c, "lastGeneratedColumn", null)
        }), c = this._originalMappings[++v];
      }
      return g;
    }, sourceMapConsumer.SourceMapConsumer = s;
    function u(f, o) {
      var p = f;
      typeof f == "string" && (p = e.parseSourceMapInput(f));
      var y = e.getArg(p, "version"), g = e.getArg(p, "sources"), v = e.getArg(p, "names", []), c = e.getArg(p, "sourceRoot", null), m = e.getArg(p, "sourcesContent", null), _ = e.getArg(p, "mappings"), x = e.getArg(p, "file", null);
      if (y != this._version) throw new Error("Unsupported version: " + y);
      c && (c = e.normalize(c)), g = g.map(String).map(e.normalize).map(function(S) {
        return c && e.isAbsolute(c) && e.isAbsolute(S) ? e.relative(c, S) : S;
      }), this._names = r.fromArray(v.map(String), true), this._sources = r.fromArray(g, true), this._absoluteSources = this._sources.toArray().map(function(S) {
        return e.computeSourceURL(c, S, o);
      }), this.sourceRoot = c, this.sourcesContent = m, this._mappings = _, this._sourceMapURL = o, this.file = x;
    }
    u.prototype = Object.create(s.prototype), u.prototype.consumer = s, u.prototype._findSourceIndex = function(f) {
      var o = f;
      if (this.sourceRoot != null && (o = e.relative(this.sourceRoot, o)), this._sources.has(o)) return this._sources.indexOf(o);
      var p;
      for (p = 0; p < this._absoluteSources.length; ++p) if (this._absoluteSources[p] == f) return p;
      return -1;
    }, u.fromSourceMap = function(o, p) {
      var y = Object.create(u.prototype), g = y._names = r.fromArray(o._names.toArray(), true), v = y._sources = r.fromArray(o._sources.toArray(), true);
      y.sourceRoot = o._sourceRoot, y.sourcesContent = o._generateSourcesContent(y._sources.toArray(), y.sourceRoot), y.file = o._file, y._sourceMapURL = p, y._absoluteSources = y._sources.toArray().map(function(C) {
        return e.computeSourceURL(y.sourceRoot, C, p);
      });
      for (var c = o._mappings.toArray().slice(), m = y.__generatedMappings = [], _ = y.__originalMappings = [], x = 0, S = c.length; x < S; x++) {
        var E = c[x], w = new d();
        w.generatedLine = E.generatedLine, w.generatedColumn = E.generatedColumn, E.source && (w.source = v.indexOf(E.source), w.originalLine = E.originalLine, w.originalColumn = E.originalColumn, E.name && (w.name = g.indexOf(E.name)), _.push(w)), m.push(w);
      }
      return l(y.__originalMappings, e.compareByOriginalPositions), y;
    }, u.prototype._version = 3, Object.defineProperty(u.prototype, "sources", {
      get: function() {
        return this._absoluteSources.slice();
      }
    });
    function d() {
      this.generatedLine = 0, this.generatedColumn = 0, this.source = null, this.originalLine = null, this.originalColumn = null, this.name = null;
    }
    u.prototype._parseMappings = function(o, p) {
      for (var y = 1, g = 0, v = 0, c = 0, m = 0, _ = 0, x = o.length, S = 0, E = {}, w = {}, C = [], D = [], A, F, B, N, I; S < x; ) if (o.charAt(S) === ";") y++, S++, g = 0;
      else if (o.charAt(S) === ",") S++;
      else {
        for (A = new d(), A.generatedLine = y, N = S; N < x && !this._charIsMappingSeparator(o, N); N++) ;
        if (F = o.slice(S, N), B = E[F], B) S += F.length;
        else {
          for (B = []; S < N; ) n.decode(o, S, w), I = w.value, S = w.rest, B.push(I);
          if (B.length === 2) throw new Error("Found a source, but no line and column");
          if (B.length === 3) throw new Error("Found a source and line, but no column");
          E[F] = B;
        }
        A.generatedColumn = g + B[0], g = A.generatedColumn, B.length > 1 && (A.source = m + B[1], m += B[1], A.originalLine = v + B[2], v = A.originalLine, A.originalLine += 1, A.originalColumn = c + B[3], c = A.originalColumn, B.length > 4 && (A.name = _ + B[4], _ += B[4])), D.push(A), typeof A.originalLine == "number" && C.push(A);
      }
      l(D, e.compareByGeneratedPositionsDeflated), this.__generatedMappings = D, l(C, e.compareByOriginalPositions), this.__originalMappings = C;
    }, u.prototype._findMapping = function(o, p, y, g, v, c) {
      if (o[y] <= 0) throw new TypeError("Line must be greater than or equal to 1, got " + o[y]);
      if (o[g] < 0) throw new TypeError("Column must be greater than or equal to 0, got " + o[g]);
      return t.search(o, p, v, c);
    }, u.prototype.computeColumnSpans = function() {
      for (var o = 0; o < this._generatedMappings.length; ++o) {
        var p = this._generatedMappings[o];
        if (o + 1 < this._generatedMappings.length) {
          var y = this._generatedMappings[o + 1];
          if (p.generatedLine === y.generatedLine) {
            p.lastGeneratedColumn = y.generatedColumn - 1;
            continue;
          }
        }
        p.lastGeneratedColumn = 1 / 0;
      }
    }, u.prototype.originalPositionFor = function(o) {
      var p = {
        generatedLine: e.getArg(o, "line"),
        generatedColumn: e.getArg(o, "column")
      }, y = this._findMapping(p, this._generatedMappings, "generatedLine", "generatedColumn", e.compareByGeneratedPositionsDeflated, e.getArg(o, "bias", s.GREATEST_LOWER_BOUND));
      if (y >= 0) {
        var g = this._generatedMappings[y];
        if (g.generatedLine === p.generatedLine) {
          var v = e.getArg(g, "source", null);
          v !== null && (v = this._sources.at(v), v = e.computeSourceURL(this.sourceRoot, v, this._sourceMapURL));
          var c = e.getArg(g, "name", null);
          return c !== null && (c = this._names.at(c)), {
            source: v,
            line: e.getArg(g, "originalLine", null),
            column: e.getArg(g, "originalColumn", null),
            name: c
          };
        }
      }
      return {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }, u.prototype.hasContentsOfAllSources = function() {
      return this.sourcesContent ? this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(function(o) {
        return o == null;
      }) : false;
    }, u.prototype.sourceContentFor = function(o, p) {
      if (!this.sourcesContent) return null;
      var y = this._findSourceIndex(o);
      if (y >= 0) return this.sourcesContent[y];
      var g = o;
      this.sourceRoot != null && (g = e.relative(this.sourceRoot, g));
      var v;
      if (this.sourceRoot != null && (v = e.urlParse(this.sourceRoot))) {
        var c = g.replace(/^file:\/\//, "");
        if (v.scheme == "file" && this._sources.has(c)) return this.sourcesContent[this._sources.indexOf(c)];
        if ((!v.path || v.path == "/") && this._sources.has("/" + g)) return this.sourcesContent[this._sources.indexOf("/" + g)];
      }
      if (p) return null;
      throw new Error('"' + g + '" is not in the SourceMap.');
    }, u.prototype.generatedPositionFor = function(o) {
      var p = e.getArg(o, "source");
      if (p = this._findSourceIndex(p), p < 0) return {
        line: null,
        column: null,
        lastColumn: null
      };
      var y = {
        source: p,
        originalLine: e.getArg(o, "line"),
        originalColumn: e.getArg(o, "column")
      }, g = this._findMapping(y, this._originalMappings, "originalLine", "originalColumn", e.compareByOriginalPositions, e.getArg(o, "bias", s.GREATEST_LOWER_BOUND));
      if (g >= 0) {
        var v = this._originalMappings[g];
        if (v.source === y.source) return {
          line: e.getArg(v, "generatedLine", null),
          column: e.getArg(v, "generatedColumn", null),
          lastColumn: e.getArg(v, "lastGeneratedColumn", null)
        };
      }
      return {
        line: null,
        column: null,
        lastColumn: null
      };
    }, sourceMapConsumer.BasicSourceMapConsumer = u;
    function h(f, o) {
      var p = f;
      typeof f == "string" && (p = e.parseSourceMapInput(f));
      var y = e.getArg(p, "version"), g = e.getArg(p, "sections");
      if (y != this._version) throw new Error("Unsupported version: " + y);
      this._sources = new r(), this._names = new r();
      var v = {
        line: -1,
        column: 0
      };
      this._sections = g.map(function(c) {
        if (c.url) throw new Error("Support for url field in sections not implemented.");
        var m = e.getArg(c, "offset"), _ = e.getArg(m, "line"), x = e.getArg(m, "column");
        if (_ < v.line || _ === v.line && x < v.column) throw new Error("Section offsets must be ordered and non-overlapping.");
        return v = m, {
          generatedOffset: {
            generatedLine: _ + 1,
            generatedColumn: x + 1
          },
          consumer: new s(e.getArg(c, "map"), o)
        };
      });
    }
    return h.prototype = Object.create(s.prototype), h.prototype.constructor = s, h.prototype._version = 3, Object.defineProperty(h.prototype, "sources", {
      get: function() {
        for (var f = [], o = 0; o < this._sections.length; o++) for (var p = 0; p < this._sections[o].consumer.sources.length; p++) f.push(this._sections[o].consumer.sources[p]);
        return f;
      }
    }), h.prototype.originalPositionFor = function(o) {
      var p = {
        generatedLine: e.getArg(o, "line"),
        generatedColumn: e.getArg(o, "column")
      }, y = t.search(p, this._sections, function(v, c) {
        var m = v.generatedLine - c.generatedOffset.generatedLine;
        return m || v.generatedColumn - c.generatedOffset.generatedColumn;
      }), g = this._sections[y];
      return g ? g.consumer.originalPositionFor({
        line: p.generatedLine - (g.generatedOffset.generatedLine - 1),
        column: p.generatedColumn - (g.generatedOffset.generatedLine === p.generatedLine ? g.generatedOffset.generatedColumn - 1 : 0),
        bias: o.bias
      }) : {
        source: null,
        line: null,
        column: null,
        name: null
      };
    }, h.prototype.hasContentsOfAllSources = function() {
      return this._sections.every(function(o) {
        return o.consumer.hasContentsOfAllSources();
      });
    }, h.prototype.sourceContentFor = function(o, p) {
      for (var y = 0; y < this._sections.length; y++) {
        var g = this._sections[y], v = g.consumer.sourceContentFor(o, true);
        if (v) return v;
      }
      if (p) return null;
      throw new Error('"' + o + '" is not in the SourceMap.');
    }, h.prototype.generatedPositionFor = function(o) {
      for (var p = 0; p < this._sections.length; p++) {
        var y = this._sections[p];
        if (y.consumer._findSourceIndex(e.getArg(o, "source")) !== -1) {
          var g = y.consumer.generatedPositionFor(o);
          if (g) {
            var v = {
              line: g.line + (y.generatedOffset.generatedLine - 1),
              column: g.column + (y.generatedOffset.generatedLine === g.line ? y.generatedOffset.generatedColumn - 1 : 0)
            };
            return v;
          }
        }
      }
      return {
        line: null,
        column: null
      };
    }, h.prototype._parseMappings = function(o, p) {
      this.__generatedMappings = [], this.__originalMappings = [];
      for (var y = 0; y < this._sections.length; y++) for (var g = this._sections[y], v = g.consumer._generatedMappings, c = 0; c < v.length; c++) {
        var m = v[c], _ = g.consumer._sources.at(m.source);
        _ = e.computeSourceURL(g.consumer.sourceRoot, _, this._sourceMapURL), this._sources.add(_), _ = this._sources.indexOf(_);
        var x = null;
        m.name && (x = g.consumer._names.at(m.name), this._names.add(x), x = this._names.indexOf(x));
        var S = {
          source: _,
          generatedLine: m.generatedLine + (g.generatedOffset.generatedLine - 1),
          generatedColumn: m.generatedColumn + (g.generatedOffset.generatedLine === m.generatedLine ? g.generatedOffset.generatedColumn - 1 : 0),
          originalLine: m.originalLine,
          originalColumn: m.originalColumn,
          name: x
        };
        this.__generatedMappings.push(S), typeof S.originalLine == "number" && this.__originalMappings.push(S);
      }
      l(this.__generatedMappings, e.compareByGeneratedPositionsDeflated), l(this.__originalMappings, e.compareByOriginalPositions);
    }, sourceMapConsumer.IndexedSourceMapConsumer = h, sourceMapConsumer;
  }
  var sourceNode = {}, hasRequiredSourceNode;
  function requireSourceNode() {
    if (hasRequiredSourceNode) return sourceNode;
    hasRequiredSourceNode = 1;
    var e = requireSourceMapGenerator().SourceMapGenerator, t = requireUtil$1(), r = /(\r?\n)/, n = 10, l = "$$$isSourceNode$$$";
    function s(u, d, h, f, o) {
      this.children = [], this.sourceContents = {}, this.line = u ?? null, this.column = d ?? null, this.source = h ?? null, this.name = o ?? null, this[l] = true, f != null && this.add(f);
    }
    return s.fromStringWithSourceMap = function(d, h, f) {
      var o = new s(), p = d.split(r), y = 0, g = function() {
        var x = E(), S = E() || "";
        return x + S;
        function E() {
          return y < p.length ? p[y++] : void 0;
        }
      }, v = 1, c = 0, m = null;
      return h.eachMapping(function(x) {
        if (m !== null) if (v < x.generatedLine) _(m, g()), v++, c = 0;
        else {
          var S = p[y] || "", E = S.substr(0, x.generatedColumn - c);
          p[y] = S.substr(x.generatedColumn - c), c = x.generatedColumn, _(m, E), m = x;
          return;
        }
        for (; v < x.generatedLine; ) o.add(g()), v++;
        if (c < x.generatedColumn) {
          var S = p[y] || "";
          o.add(S.substr(0, x.generatedColumn)), p[y] = S.substr(x.generatedColumn), c = x.generatedColumn;
        }
        m = x;
      }, this), y < p.length && (m && _(m, g()), o.add(p.splice(y).join(""))), h.sources.forEach(function(x) {
        var S = h.sourceContentFor(x);
        S != null && (f != null && (x = t.join(f, x)), o.setSourceContent(x, S));
      }), o;
      function _(x, S) {
        if (x === null || x.source === void 0) o.add(S);
        else {
          var E = f ? t.join(f, x.source) : x.source;
          o.add(new s(x.originalLine, x.originalColumn, E, S, x.name));
        }
      }
    }, s.prototype.add = function(d) {
      if (Array.isArray(d)) d.forEach(function(h) {
        this.add(h);
      }, this);
      else if (d[l] || typeof d == "string") d && this.children.push(d);
      else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + d);
      return this;
    }, s.prototype.prepend = function(d) {
      if (Array.isArray(d)) for (var h = d.length - 1; h >= 0; h--) this.prepend(d[h]);
      else if (d[l] || typeof d == "string") this.children.unshift(d);
      else throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + d);
      return this;
    }, s.prototype.walk = function(d) {
      for (var h, f = 0, o = this.children.length; f < o; f++) h = this.children[f], h[l] ? h.walk(d) : h !== "" && d(h, {
        source: this.source,
        line: this.line,
        column: this.column,
        name: this.name
      });
    }, s.prototype.join = function(d) {
      var h, f, o = this.children.length;
      if (o > 0) {
        for (h = [], f = 0; f < o - 1; f++) h.push(this.children[f]), h.push(d);
        h.push(this.children[f]), this.children = h;
      }
      return this;
    }, s.prototype.replaceRight = function(d, h) {
      var f = this.children[this.children.length - 1];
      return f[l] ? f.replaceRight(d, h) : typeof f == "string" ? this.children[this.children.length - 1] = f.replace(d, h) : this.children.push("".replace(d, h)), this;
    }, s.prototype.setSourceContent = function(d, h) {
      this.sourceContents[t.toSetString(d)] = h;
    }, s.prototype.walkSourceContents = function(d) {
      for (var h = 0, f = this.children.length; h < f; h++) this.children[h][l] && this.children[h].walkSourceContents(d);
      for (var o = Object.keys(this.sourceContents), h = 0, f = o.length; h < f; h++) d(t.fromSetString(o[h]), this.sourceContents[o[h]]);
    }, s.prototype.toString = function() {
      var d = "";
      return this.walk(function(h) {
        d += h;
      }), d;
    }, s.prototype.toStringWithSourceMap = function(d) {
      var h = {
        code: "",
        line: 1,
        column: 0
      }, f = new e(d), o = false, p = null, y = null, g = null, v = null;
      return this.walk(function(c, m) {
        h.code += c, m.source !== null && m.line !== null && m.column !== null ? ((p !== m.source || y !== m.line || g !== m.column || v !== m.name) && f.addMapping({
          source: m.source,
          original: {
            line: m.line,
            column: m.column
          },
          generated: {
            line: h.line,
            column: h.column
          },
          name: m.name
        }), p = m.source, y = m.line, g = m.column, v = m.name, o = true) : o && (f.addMapping({
          generated: {
            line: h.line,
            column: h.column
          }
        }), p = null, o = false);
        for (var _ = 0, x = c.length; _ < x; _++) c.charCodeAt(_) === n ? (h.line++, h.column = 0, _ + 1 === x ? (p = null, o = false) : o && f.addMapping({
          source: m.source,
          original: {
            line: m.line,
            column: m.column
          },
          generated: {
            line: h.line,
            column: h.column
          },
          name: m.name
        })) : h.column++;
      }), this.walkSourceContents(function(c, m) {
        f.setSourceContent(c, m);
      }), {
        code: h.code,
        map: f
      };
    }, sourceNode.SourceNode = s, sourceNode;
  }
  var hasRequiredSourceMap;
  function requireSourceMap() {
    return hasRequiredSourceMap || (hasRequiredSourceMap = 1, sourceMap.SourceMapGenerator = requireSourceMapGenerator().SourceMapGenerator, sourceMap.SourceMapConsumer = requireSourceMapConsumer().SourceMapConsumer, sourceMap.SourceNode = requireSourceNode().SourceNode), sourceMap;
  }
  var hasRequiredUtil;
  function requireUtil() {
    if (hasRequiredUtil) return util$1;
    hasRequiredUtil = 1, Object.defineProperty(util$1, "__esModule", {
      value: true
    }), util$1.isTrailingCommaEnabled = util$1.getParentExportDeclaration = util$1.isExportDeclaration = util$1.fixFaultyLocations = util$1.getTrueLoc = util$1.composeSourceMaps = util$1.copyPos = util$1.comparePos = util$1.getUnionOfKeys = util$1.getOption = util$1.isBrowser = util$1.getLineTerminator = void 0;
    var e = require$$0, t = e.__importDefault(requireTinyInvariant_cjs()), r = e.__importStar(requireMain()), n = r.namedTypes, l = e.__importDefault(requireSourceMap()), s = l.default.SourceMapConsumer, u = l.default.SourceMapGenerator, d = Object.prototype.hasOwnProperty;
    function h() {
      return f() ? `
` : require$$1.EOL || `
`;
    }
    util$1.getLineTerminator = h;
    function f() {
      return typeof window < "u" && typeof window.document < "u";
    }
    util$1.isBrowser = f;
    function o(D, A, F) {
      return D && d.call(D, A) ? D[A] : F;
    }
    util$1.getOption = o;
    function p() {
      for (var D = [], A = 0; A < arguments.length; A++) D[A] = arguments[A];
      for (var F = {}, B = D.length, N = 0; N < B; ++N) for (var I = Object.keys(D[N]), O = I.length, L = 0; L < O; ++L) F[I[L]] = true;
      return F;
    }
    util$1.getUnionOfKeys = p;
    function y(D, A) {
      return D.line - A.line || D.column - A.column;
    }
    util$1.comparePos = y;
    function g(D) {
      return {
        line: D.line,
        column: D.column
      };
    }
    util$1.copyPos = g;
    function v(D, A) {
      if (D) {
        if (!A) return D;
      } else return A || null;
      var F = new s(D), B = new s(A), N = new u({
        file: A.file,
        sourceRoot: A.sourceRoot
      }), I = {};
      return B.eachMapping(function(O) {
        var L = F.originalPositionFor({
          line: O.originalLine,
          column: O.originalColumn
        }), q = L.source;
        if (q !== null) {
          N.addMapping({
            source: q,
            original: g(L),
            generated: {
              line: O.generatedLine,
              column: O.generatedColumn
            },
            name: O.name
          });
          var z = F.sourceContentFor(q);
          z && !d.call(I, q) && (I[q] = z, N.setSourceContent(q, z));
        }
      }), N.toJSON();
    }
    util$1.composeSourceMaps = v;
    function c(D, A) {
      if (!D.loc) return null;
      var F = {
        start: D.loc.start,
        end: D.loc.end
      };
      function B(N) {
        m(F, N.loc);
      }
      return D.declaration && D.declaration.decorators && E(D) && D.declaration.decorators.forEach(B), y(F.start, F.end) < 0 && (F.start = g(F.start), A.skipSpaces(F.start, false, true), y(F.start, F.end) < 0 && (F.end = g(F.end), A.skipSpaces(F.end, true, true))), D.comments && D.comments.forEach(B), F;
    }
    util$1.getTrueLoc = c;
    function m(D, A) {
      D && A && (y(A.start, D.start) < 0 && (D.start = A.start), y(D.end, A.end) < 0 && (D.end = A.end));
    }
    function _(D, A) {
      var F = D.loc;
      if (F && (F.start.line < 1 && (F.start.line = 1), F.end.line < 1 && (F.end.line = 1)), D.type === "File" && (F.start = A.firstPos(), F.end = A.lastPos()), x(D, A), S(D, A), F && D.decorators) D.decorators.forEach(function(O) {
        m(F, O.loc);
      });
      else if (D.declaration && E(D)) {
        D.declaration.loc = null;
        var B = D.declaration.decorators;
        B && B.forEach(function(O) {
          m(F, O.loc);
        });
      } else if (n.MethodDefinition && n.MethodDefinition.check(D) || n.Property.check(D) && (D.method || D.shorthand)) D.value.loc = null, n.FunctionExpression.check(D.value) && (D.value.id = null);
      else if (D.type === "ObjectTypeProperty") {
        var N = D.loc, I = N && N.end;
        I && (I = g(I), A.prevPos(I) && A.charAt(I) === "," && (I = A.skipSpaces(I, true, true)) && (N.end = I));
      }
    }
    util$1.fixFaultyLocations = _;
    function x(D, A) {
      if (D.type !== "ForStatement") return;
      function F(B) {
        for (var N = B && B.loc, I = N && N.start, O = N && g(N.end); I && O && y(I, O) < 0 && (A.prevPos(O), A.charAt(O) === ";"); ) N.end.line = O.line, N.end.column = O.column;
      }
      F(D.init), F(D.test), F(D.update);
    }
    function S(D, A) {
      if (D.type === "TemplateLiteral" && D.quasis.length !== 0) {
        if (D.loc) {
          var F = g(D.loc.start);
          (0, t.default)(A.charAt(F) === "`"), (0, t.default)(A.nextPos(F));
          var B = D.quasis[0];
          y(B.loc.start, F) < 0 && (B.loc.start = F);
          var N = g(D.loc.end);
          (0, t.default)(A.prevPos(N)), (0, t.default)(A.charAt(N) === "`");
          var I = D.quasis[D.quasis.length - 1];
          y(N, I.loc.end) < 0 && (I.loc.end = N);
        }
        D.expressions.forEach(function(O, L) {
          var q = A.skipSpaces(O.loc.start, true, false);
          if (A.prevPos(q) && A.charAt(q) === "{" && A.prevPos(q) && A.charAt(q) === "$") {
            var z = D.quasis[L];
            y(q, z.loc.end) < 0 && (z.loc.end = q);
          }
          var G = A.skipSpaces(O.loc.end, false, false);
          if (A.charAt(G) === "}") {
            (0, t.default)(A.nextPos(G));
            var J = D.quasis[L + 1];
            y(J.loc.start, G) < 0 && (J.loc.start = G);
          }
        });
      }
    }
    function E(D) {
      if (D) switch (D.type) {
        case "ExportDeclaration":
        case "ExportDefaultDeclaration":
        case "ExportDefaultSpecifier":
        case "DeclareExportDeclaration":
        case "ExportNamedDeclaration":
        case "ExportAllDeclaration":
          return true;
      }
      return false;
    }
    util$1.isExportDeclaration = E;
    function w(D) {
      var A = D.getParentNode();
      return D.getName() === "declaration" && E(A) ? A : null;
    }
    util$1.getParentExportDeclaration = w;
    function C(D, A) {
      var F = D.trailingComma;
      return typeof F == "object" ? !!F[A] : !!F;
    }
    return util$1.isTrailingCommaEnabled = C, util$1;
  }
  var esprima$1 = {}, esprima = {
    exports: {}
  }, hasRequiredEsprima$1;
  function requireEsprima$1() {
    return hasRequiredEsprima$1 || (hasRequiredEsprima$1 = 1, function(e, t) {
      (function(n, l) {
        e.exports = l();
      })(commonjsGlobal, function() {
        return function(r) {
          var n = {};
          function l(s) {
            if (n[s]) return n[s].exports;
            var u = n[s] = {
              exports: {},
              id: s,
              loaded: false
            };
            return r[s].call(u.exports, u, u.exports, l), u.loaded = true, u.exports;
          }
          return l.m = r, l.c = n, l.p = "", l(0);
        }([
          function(r, n, l) {
            Object.defineProperty(n, "__esModule", {
              value: true
            });
            var s = l(1), u = l(3), d = l(8), h = l(15);
            function f(v, c, m) {
              var _ = null, x = function(B, N) {
                m && m(B, N), _ && _.visit(B, N);
              }, S = typeof m == "function" ? x : null, E = false;
              if (c) {
                E = typeof c.comment == "boolean" && c.comment;
                var w = typeof c.attachComment == "boolean" && c.attachComment;
                (E || w) && (_ = new s.CommentHandler(), _.attach = w, c.comment = true, S = x);
              }
              var C = false;
              c && typeof c.sourceType == "string" && (C = c.sourceType === "module");
              var D;
              c && typeof c.jsx == "boolean" && c.jsx ? D = new u.JSXParser(v, c, S) : D = new d.Parser(v, c, S);
              var A = C ? D.parseModule() : D.parseScript(), F = A;
              return E && _ && (F.comments = _.comments), D.config.tokens && (F.tokens = D.tokens), D.config.tolerant && (F.errors = D.errorHandler.errors), F;
            }
            n.parse = f;
            function o(v, c, m) {
              var _ = c || {};
              return _.sourceType = "module", f(v, _, m);
            }
            n.parseModule = o;
            function p(v, c, m) {
              var _ = c || {};
              return _.sourceType = "script", f(v, _, m);
            }
            n.parseScript = p;
            function y(v, c, m) {
              var _ = new h.Tokenizer(v, c), x;
              x = [];
              try {
                for (; ; ) {
                  var S = _.getNextToken();
                  if (!S) break;
                  m && (S = m(S)), x.push(S);
                }
              } catch (E) {
                _.errorHandler.tolerate(E);
              }
              return _.errorHandler.tolerant && (x.errors = _.errors()), x;
            }
            n.tokenize = y;
            var g = l(2);
            n.Syntax = g.Syntax, n.version = "4.0.1";
          },
          function(r, n, l) {
            Object.defineProperty(n, "__esModule", {
              value: true
            });
            var s = l(2), u = function() {
              function d() {
                this.attach = false, this.comments = [], this.stack = [], this.leading = [], this.trailing = [];
              }
              return d.prototype.insertInnerComments = function(h, f) {
                if (h.type === s.Syntax.BlockStatement && h.body.length === 0) {
                  for (var o = [], p = this.leading.length - 1; p >= 0; --p) {
                    var y = this.leading[p];
                    f.end.offset >= y.start && (o.unshift(y.comment), this.leading.splice(p, 1), this.trailing.splice(p, 1));
                  }
                  o.length && (h.innerComments = o);
                }
              }, d.prototype.findTrailingComments = function(h) {
                var f = [];
                if (this.trailing.length > 0) {
                  for (var o = this.trailing.length - 1; o >= 0; --o) {
                    var p = this.trailing[o];
                    p.start >= h.end.offset && f.unshift(p.comment);
                  }
                  return this.trailing.length = 0, f;
                }
                var y = this.stack[this.stack.length - 1];
                if (y && y.node.trailingComments) {
                  var g = y.node.trailingComments[0];
                  g && g.range[0] >= h.end.offset && (f = y.node.trailingComments, delete y.node.trailingComments);
                }
                return f;
              }, d.prototype.findLeadingComments = function(h) {
                for (var f = [], o; this.stack.length > 0; ) {
                  var p = this.stack[this.stack.length - 1];
                  if (p && p.start >= h.start.offset) o = p.node, this.stack.pop();
                  else break;
                }
                if (o) {
                  for (var y = o.leadingComments ? o.leadingComments.length : 0, g = y - 1; g >= 0; --g) {
                    var v = o.leadingComments[g];
                    v.range[1] <= h.start.offset && (f.unshift(v), o.leadingComments.splice(g, 1));
                  }
                  return o.leadingComments && o.leadingComments.length === 0 && delete o.leadingComments, f;
                }
                for (var g = this.leading.length - 1; g >= 0; --g) {
                  var p = this.leading[g];
                  p.start <= h.start.offset && (f.unshift(p.comment), this.leading.splice(g, 1));
                }
                return f;
              }, d.prototype.visitNode = function(h, f) {
                if (!(h.type === s.Syntax.Program && h.body.length > 0)) {
                  this.insertInnerComments(h, f);
                  var o = this.findTrailingComments(f), p = this.findLeadingComments(f);
                  p.length > 0 && (h.leadingComments = p), o.length > 0 && (h.trailingComments = o), this.stack.push({
                    node: h,
                    start: f.start.offset
                  });
                }
              }, d.prototype.visitComment = function(h, f) {
                var o = h.type[0] === "L" ? "Line" : "Block", p = {
                  type: o,
                  value: h.value
                };
                if (h.range && (p.range = h.range), h.loc && (p.loc = h.loc), this.comments.push(p), this.attach) {
                  var y = {
                    comment: {
                      type: o,
                      value: h.value,
                      range: [
                        f.start.offset,
                        f.end.offset
                      ]
                    },
                    start: f.start.offset
                  };
                  h.loc && (y.comment.loc = h.loc), h.type = o, this.leading.push(y), this.trailing.push(y);
                }
              }, d.prototype.visit = function(h, f) {
                h.type === "LineComment" ? this.visitComment(h, f) : h.type === "BlockComment" ? this.visitComment(h, f) : this.attach && this.visitNode(h, f);
              }, d;
            }();
            n.CommentHandler = u;
          },
          function(r, n) {
            Object.defineProperty(n, "__esModule", {
              value: true
            }), n.Syntax = {
              AssignmentExpression: "AssignmentExpression",
              AssignmentPattern: "AssignmentPattern",
              ArrayExpression: "ArrayExpression",
              ArrayPattern: "ArrayPattern",
              ArrowFunctionExpression: "ArrowFunctionExpression",
              AwaitExpression: "AwaitExpression",
              BlockStatement: "BlockStatement",
              BinaryExpression: "BinaryExpression",
              BreakStatement: "BreakStatement",
              CallExpression: "CallExpression",
              CatchClause: "CatchClause",
              ClassBody: "ClassBody",
              ClassDeclaration: "ClassDeclaration",
              ClassExpression: "ClassExpression",
              ConditionalExpression: "ConditionalExpression",
              ContinueStatement: "ContinueStatement",
              DoWhileStatement: "DoWhileStatement",
              DebuggerStatement: "DebuggerStatement",
              EmptyStatement: "EmptyStatement",
              ExportAllDeclaration: "ExportAllDeclaration",
              ExportDefaultDeclaration: "ExportDefaultDeclaration",
              ExportNamedDeclaration: "ExportNamedDeclaration",
              ExportSpecifier: "ExportSpecifier",
              ExpressionStatement: "ExpressionStatement",
              ForStatement: "ForStatement",
              ForOfStatement: "ForOfStatement",
              ForInStatement: "ForInStatement",
              FunctionDeclaration: "FunctionDeclaration",
              FunctionExpression: "FunctionExpression",
              Identifier: "Identifier",
              IfStatement: "IfStatement",
              ImportDeclaration: "ImportDeclaration",
              ImportDefaultSpecifier: "ImportDefaultSpecifier",
              ImportNamespaceSpecifier: "ImportNamespaceSpecifier",
              ImportSpecifier: "ImportSpecifier",
              Literal: "Literal",
              LabeledStatement: "LabeledStatement",
              LogicalExpression: "LogicalExpression",
              MemberExpression: "MemberExpression",
              MetaProperty: "MetaProperty",
              MethodDefinition: "MethodDefinition",
              NewExpression: "NewExpression",
              ObjectExpression: "ObjectExpression",
              ObjectPattern: "ObjectPattern",
              Program: "Program",
              Property: "Property",
              RestElement: "RestElement",
              ReturnStatement: "ReturnStatement",
              SequenceExpression: "SequenceExpression",
              SpreadElement: "SpreadElement",
              Super: "Super",
              SwitchCase: "SwitchCase",
              SwitchStatement: "SwitchStatement",
              TaggedTemplateExpression: "TaggedTemplateExpression",
              TemplateElement: "TemplateElement",
              TemplateLiteral: "TemplateLiteral",
              ThisExpression: "ThisExpression",
              ThrowStatement: "ThrowStatement",
              TryStatement: "TryStatement",
              UnaryExpression: "UnaryExpression",
              UpdateExpression: "UpdateExpression",
              VariableDeclaration: "VariableDeclaration",
              VariableDeclarator: "VariableDeclarator",
              WhileStatement: "WhileStatement",
              WithStatement: "WithStatement",
              YieldExpression: "YieldExpression"
            };
          },
          function(r, n, l) {
            var s = this && this.__extends || function() {
              var c = Object.setPrototypeOf || {
                __proto__: []
              } instanceof Array && function(m, _) {
                m.__proto__ = _;
              } || function(m, _) {
                for (var x in _) _.hasOwnProperty(x) && (m[x] = _[x]);
              };
              return function(m, _) {
                c(m, _);
                function x() {
                  this.constructor = m;
                }
                m.prototype = _ === null ? Object.create(_) : (x.prototype = _.prototype, new x());
              };
            }();
            Object.defineProperty(n, "__esModule", {
              value: true
            });
            var u = l(4), d = l(5), h = l(6), f = l(7), o = l(8), p = l(13), y = l(14);
            p.TokenName[100] = "JSXIdentifier", p.TokenName[101] = "JSXText";
            function g(c) {
              var m;
              switch (c.type) {
                case h.JSXSyntax.JSXIdentifier:
                  var _ = c;
                  m = _.name;
                  break;
                case h.JSXSyntax.JSXNamespacedName:
                  var x = c;
                  m = g(x.namespace) + ":" + g(x.name);
                  break;
                case h.JSXSyntax.JSXMemberExpression:
                  var S = c;
                  m = g(S.object) + "." + g(S.property);
                  break;
              }
              return m;
            }
            var v = function(c) {
              s(m, c);
              function m(_, x, S) {
                return c.call(this, _, x, S) || this;
              }
              return m.prototype.parsePrimaryExpression = function() {
                return this.match("<") ? this.parseJSXRoot() : c.prototype.parsePrimaryExpression.call(this);
              }, m.prototype.startJSX = function() {
                this.scanner.index = this.startMarker.index, this.scanner.lineNumber = this.startMarker.line, this.scanner.lineStart = this.startMarker.index - this.startMarker.column;
              }, m.prototype.finishJSX = function() {
                this.nextToken();
              }, m.prototype.reenterJSX = function() {
                this.startJSX(), this.expectJSX("}"), this.config.tokens && this.tokens.pop();
              }, m.prototype.createJSXNode = function() {
                return this.collectComments(), {
                  index: this.scanner.index,
                  line: this.scanner.lineNumber,
                  column: this.scanner.index - this.scanner.lineStart
                };
              }, m.prototype.createJSXChildNode = function() {
                return {
                  index: this.scanner.index,
                  line: this.scanner.lineNumber,
                  column: this.scanner.index - this.scanner.lineStart
                };
              }, m.prototype.scanXHTMLEntity = function(_) {
                for (var x = "&", S = true, E = false, w = false, C = false; !this.scanner.eof() && S && !E; ) {
                  var D = this.scanner.source[this.scanner.index];
                  if (D === _) break;
                  if (E = D === ";", x += D, ++this.scanner.index, !E) switch (x.length) {
                    case 2:
                      w = D === "#";
                      break;
                    case 3:
                      w && (C = D === "x", S = C || u.Character.isDecimalDigit(D.charCodeAt(0)), w = w && !C);
                      break;
                    default:
                      S = S && !(w && !u.Character.isDecimalDigit(D.charCodeAt(0))), S = S && !(C && !u.Character.isHexDigit(D.charCodeAt(0)));
                      break;
                  }
                }
                if (S && E && x.length > 2) {
                  var A = x.substr(1, x.length - 2);
                  w && A.length > 1 ? x = String.fromCharCode(parseInt(A.substr(1), 10)) : C && A.length > 2 ? x = String.fromCharCode(parseInt("0" + A.substr(1), 16)) : !w && !C && y.XHTMLEntities[A] && (x = y.XHTMLEntities[A]);
                }
                return x;
              }, m.prototype.lexJSX = function() {
                var _ = this.scanner.source.charCodeAt(this.scanner.index);
                if (_ === 60 || _ === 62 || _ === 47 || _ === 58 || _ === 61 || _ === 123 || _ === 125) {
                  var x = this.scanner.source[this.scanner.index++];
                  return {
                    type: 7,
                    value: x,
                    lineNumber: this.scanner.lineNumber,
                    lineStart: this.scanner.lineStart,
                    start: this.scanner.index - 1,
                    end: this.scanner.index
                  };
                }
                if (_ === 34 || _ === 39) {
                  for (var S = this.scanner.index, E = this.scanner.source[this.scanner.index++], w = ""; !this.scanner.eof(); ) {
                    var C = this.scanner.source[this.scanner.index++];
                    if (C === E) break;
                    C === "&" ? w += this.scanXHTMLEntity(E) : w += C;
                  }
                  return {
                    type: 8,
                    value: w,
                    lineNumber: this.scanner.lineNumber,
                    lineStart: this.scanner.lineStart,
                    start: S,
                    end: this.scanner.index
                  };
                }
                if (_ === 46) {
                  var D = this.scanner.source.charCodeAt(this.scanner.index + 1), A = this.scanner.source.charCodeAt(this.scanner.index + 2), x = D === 46 && A === 46 ? "..." : ".", S = this.scanner.index;
                  return this.scanner.index += x.length, {
                    type: 7,
                    value: x,
                    lineNumber: this.scanner.lineNumber,
                    lineStart: this.scanner.lineStart,
                    start: S,
                    end: this.scanner.index
                  };
                }
                if (_ === 96) return {
                  type: 10,
                  value: "",
                  lineNumber: this.scanner.lineNumber,
                  lineStart: this.scanner.lineStart,
                  start: this.scanner.index,
                  end: this.scanner.index
                };
                if (u.Character.isIdentifierStart(_) && _ !== 92) {
                  var S = this.scanner.index;
                  for (++this.scanner.index; !this.scanner.eof(); ) {
                    var C = this.scanner.source.charCodeAt(this.scanner.index);
                    if (u.Character.isIdentifierPart(C) && C !== 92) ++this.scanner.index;
                    else if (C === 45) ++this.scanner.index;
                    else break;
                  }
                  var F = this.scanner.source.slice(S, this.scanner.index);
                  return {
                    type: 100,
                    value: F,
                    lineNumber: this.scanner.lineNumber,
                    lineStart: this.scanner.lineStart,
                    start: S,
                    end: this.scanner.index
                  };
                }
                return this.scanner.lex();
              }, m.prototype.nextJSXToken = function() {
                this.collectComments(), this.startMarker.index = this.scanner.index, this.startMarker.line = this.scanner.lineNumber, this.startMarker.column = this.scanner.index - this.scanner.lineStart;
                var _ = this.lexJSX();
                return this.lastMarker.index = this.scanner.index, this.lastMarker.line = this.scanner.lineNumber, this.lastMarker.column = this.scanner.index - this.scanner.lineStart, this.config.tokens && this.tokens.push(this.convertToken(_)), _;
              }, m.prototype.nextJSXText = function() {
                this.startMarker.index = this.scanner.index, this.startMarker.line = this.scanner.lineNumber, this.startMarker.column = this.scanner.index - this.scanner.lineStart;
                for (var _ = this.scanner.index, x = ""; !this.scanner.eof(); ) {
                  var S = this.scanner.source[this.scanner.index];
                  if (S === "{" || S === "<") break;
                  ++this.scanner.index, x += S, u.Character.isLineTerminator(S.charCodeAt(0)) && (++this.scanner.lineNumber, S === "\r" && this.scanner.source[this.scanner.index] === `
` && ++this.scanner.index, this.scanner.lineStart = this.scanner.index);
                }
                this.lastMarker.index = this.scanner.index, this.lastMarker.line = this.scanner.lineNumber, this.lastMarker.column = this.scanner.index - this.scanner.lineStart;
                var E = {
                  type: 101,
                  value: x,
                  lineNumber: this.scanner.lineNumber,
                  lineStart: this.scanner.lineStart,
                  start: _,
                  end: this.scanner.index
                };
                return x.length > 0 && this.config.tokens && this.tokens.push(this.convertToken(E)), E;
              }, m.prototype.peekJSXToken = function() {
                var _ = this.scanner.saveState();
                this.scanner.scanComments();
                var x = this.lexJSX();
                return this.scanner.restoreState(_), x;
              }, m.prototype.expectJSX = function(_) {
                var x = this.nextJSXToken();
                (x.type !== 7 || x.value !== _) && this.throwUnexpectedToken(x);
              }, m.prototype.matchJSX = function(_) {
                var x = this.peekJSXToken();
                return x.type === 7 && x.value === _;
              }, m.prototype.parseJSXIdentifier = function() {
                var _ = this.createJSXNode(), x = this.nextJSXToken();
                return x.type !== 100 && this.throwUnexpectedToken(x), this.finalize(_, new d.JSXIdentifier(x.value));
              }, m.prototype.parseJSXElementName = function() {
                var _ = this.createJSXNode(), x = this.parseJSXIdentifier();
                if (this.matchJSX(":")) {
                  var S = x;
                  this.expectJSX(":");
                  var E = this.parseJSXIdentifier();
                  x = this.finalize(_, new d.JSXNamespacedName(S, E));
                } else if (this.matchJSX(".")) for (; this.matchJSX("."); ) {
                  var w = x;
                  this.expectJSX(".");
                  var C = this.parseJSXIdentifier();
                  x = this.finalize(_, new d.JSXMemberExpression(w, C));
                }
                return x;
              }, m.prototype.parseJSXAttributeName = function() {
                var _ = this.createJSXNode(), x, S = this.parseJSXIdentifier();
                if (this.matchJSX(":")) {
                  var E = S;
                  this.expectJSX(":");
                  var w = this.parseJSXIdentifier();
                  x = this.finalize(_, new d.JSXNamespacedName(E, w));
                } else x = S;
                return x;
              }, m.prototype.parseJSXStringLiteralAttribute = function() {
                var _ = this.createJSXNode(), x = this.nextJSXToken();
                x.type !== 8 && this.throwUnexpectedToken(x);
                var S = this.getTokenRaw(x);
                return this.finalize(_, new f.Literal(x.value, S));
              }, m.prototype.parseJSXExpressionAttribute = function() {
                var _ = this.createJSXNode();
                this.expectJSX("{"), this.finishJSX(), this.match("}") && this.tolerateError("JSX attributes must only be assigned a non-empty expression");
                var x = this.parseAssignmentExpression();
                return this.reenterJSX(), this.finalize(_, new d.JSXExpressionContainer(x));
              }, m.prototype.parseJSXAttributeValue = function() {
                return this.matchJSX("{") ? this.parseJSXExpressionAttribute() : this.matchJSX("<") ? this.parseJSXElement() : this.parseJSXStringLiteralAttribute();
              }, m.prototype.parseJSXNameValueAttribute = function() {
                var _ = this.createJSXNode(), x = this.parseJSXAttributeName(), S = null;
                return this.matchJSX("=") && (this.expectJSX("="), S = this.parseJSXAttributeValue()), this.finalize(_, new d.JSXAttribute(x, S));
              }, m.prototype.parseJSXSpreadAttribute = function() {
                var _ = this.createJSXNode();
                this.expectJSX("{"), this.expectJSX("..."), this.finishJSX();
                var x = this.parseAssignmentExpression();
                return this.reenterJSX(), this.finalize(_, new d.JSXSpreadAttribute(x));
              }, m.prototype.parseJSXAttributes = function() {
                for (var _ = []; !this.matchJSX("/") && !this.matchJSX(">"); ) {
                  var x = this.matchJSX("{") ? this.parseJSXSpreadAttribute() : this.parseJSXNameValueAttribute();
                  _.push(x);
                }
                return _;
              }, m.prototype.parseJSXOpeningElement = function() {
                var _ = this.createJSXNode();
                this.expectJSX("<");
                var x = this.parseJSXElementName(), S = this.parseJSXAttributes(), E = this.matchJSX("/");
                return E && this.expectJSX("/"), this.expectJSX(">"), this.finalize(_, new d.JSXOpeningElement(x, E, S));
              }, m.prototype.parseJSXBoundaryElement = function() {
                var _ = this.createJSXNode();
                if (this.expectJSX("<"), this.matchJSX("/")) {
                  this.expectJSX("/");
                  var x = this.parseJSXElementName();
                  return this.expectJSX(">"), this.finalize(_, new d.JSXClosingElement(x));
                }
                var S = this.parseJSXElementName(), E = this.parseJSXAttributes(), w = this.matchJSX("/");
                return w && this.expectJSX("/"), this.expectJSX(">"), this.finalize(_, new d.JSXOpeningElement(S, w, E));
              }, m.prototype.parseJSXEmptyExpression = function() {
                var _ = this.createJSXChildNode();
                return this.collectComments(), this.lastMarker.index = this.scanner.index, this.lastMarker.line = this.scanner.lineNumber, this.lastMarker.column = this.scanner.index - this.scanner.lineStart, this.finalize(_, new d.JSXEmptyExpression());
              }, m.prototype.parseJSXExpressionContainer = function() {
                var _ = this.createJSXNode();
                this.expectJSX("{");
                var x;
                return this.matchJSX("}") ? (x = this.parseJSXEmptyExpression(), this.expectJSX("}")) : (this.finishJSX(), x = this.parseAssignmentExpression(), this.reenterJSX()), this.finalize(_, new d.JSXExpressionContainer(x));
              }, m.prototype.parseJSXChildren = function() {
                for (var _ = []; !this.scanner.eof(); ) {
                  var x = this.createJSXChildNode(), S = this.nextJSXText();
                  if (S.start < S.end) {
                    var E = this.getTokenRaw(S), w = this.finalize(x, new d.JSXText(S.value, E));
                    _.push(w);
                  }
                  if (this.scanner.source[this.scanner.index] === "{") {
                    var C = this.parseJSXExpressionContainer();
                    _.push(C);
                  } else break;
                }
                return _;
              }, m.prototype.parseComplexJSXElement = function(_) {
                for (var x = []; !this.scanner.eof(); ) {
                  _.children = _.children.concat(this.parseJSXChildren());
                  var S = this.createJSXChildNode(), E = this.parseJSXBoundaryElement();
                  if (E.type === h.JSXSyntax.JSXOpeningElement) {
                    var w = E;
                    if (w.selfClosing) {
                      var C = this.finalize(S, new d.JSXElement(w, [], null));
                      _.children.push(C);
                    } else x.push(_), _ = {
                      node: S,
                      opening: w,
                      closing: null,
                      children: []
                    };
                  }
                  if (E.type === h.JSXSyntax.JSXClosingElement) {
                    _.closing = E;
                    var D = g(_.opening.name), A = g(_.closing.name);
                    if (D !== A && this.tolerateError("Expected corresponding JSX closing tag for %0", D), x.length > 0) {
                      var C = this.finalize(_.node, new d.JSXElement(_.opening, _.children, _.closing));
                      _ = x[x.length - 1], _.children.push(C), x.pop();
                    } else break;
                  }
                }
                return _;
              }, m.prototype.parseJSXElement = function() {
                var _ = this.createJSXNode(), x = this.parseJSXOpeningElement(), S = [], E = null;
                if (!x.selfClosing) {
                  var w = this.parseComplexJSXElement({
                    node: _,
                    opening: x,
                    closing: E,
                    children: S
                  });
                  S = w.children, E = w.closing;
                }
                return this.finalize(_, new d.JSXElement(x, S, E));
              }, m.prototype.parseJSXRoot = function() {
                this.config.tokens && this.tokens.pop(), this.startJSX();
                var _ = this.parseJSXElement();
                return this.finishJSX(), _;
              }, m.prototype.isStartOfExpression = function() {
                return c.prototype.isStartOfExpression.call(this) || this.match("<");
              }, m;
            }(o.Parser);
            n.JSXParser = v;
          },
          function(r, n) {
            Object.defineProperty(n, "__esModule", {
              value: true
            });
            var l = {
              NonAsciiIdentifierStart: /[\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,
              NonAsciiIdentifierPart: /[\xAA\xB5\xB7\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0300-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u0483-\u0487\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u05D0-\u05EA\u05F0-\u05F2\u0610-\u061A\u0620-\u0669\u066E-\u06D3\u06D5-\u06DC\u06DF-\u06E8\u06EA-\u06FC\u06FF\u0710-\u074A\u074D-\u07B1\u07C0-\u07F5\u07FA\u0800-\u082D\u0840-\u085B\u08A0-\u08B4\u08E3-\u0963\u0966-\u096F\u0971-\u0983\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BC-\u09C4\u09C7\u09C8\u09CB-\u09CE\u09D7\u09DC\u09DD\u09DF-\u09E3\u09E6-\u09F1\u0A01-\u0A03\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A59-\u0A5C\u0A5E\u0A66-\u0A75\u0A81-\u0A83\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABC-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AD0\u0AE0-\u0AE3\u0AE6-\u0AEF\u0AF9\u0B01-\u0B03\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3C-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B5C\u0B5D\u0B5F-\u0B63\u0B66-\u0B6F\u0B71\u0B82\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD0\u0BD7\u0BE6-\u0BEF\u0C00-\u0C03\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C58-\u0C5A\u0C60-\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBC-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CDE\u0CE0-\u0CE3\u0CE6-\u0CEF\u0CF1\u0CF2\u0D01-\u0D03\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D-\u0D44\u0D46-\u0D48\u0D4A-\u0D4E\u0D57\u0D5F-\u0D63\u0D66-\u0D6F\u0D7A-\u0D7F\u0D82\u0D83\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E01-\u0E3A\u0E40-\u0E4E\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB9\u0EBB-\u0EBD\u0EC0-\u0EC4\u0EC6\u0EC8-\u0ECD\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E-\u0F47\u0F49-\u0F6C\u0F71-\u0F84\u0F86-\u0F97\u0F99-\u0FBC\u0FC6\u1000-\u1049\u1050-\u109D\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u135D-\u135F\u1369-\u1371\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1714\u1720-\u1734\u1740-\u1753\u1760-\u176C\u176E-\u1770\u1772\u1773\u1780-\u17D3\u17D7\u17DC\u17DD\u17E0-\u17E9\u180B-\u180D\u1810-\u1819\u1820-\u1877\u1880-\u18AA\u18B0-\u18F5\u1900-\u191E\u1920-\u192B\u1930-\u193B\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A1B\u1A20-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AA7\u1AB0-\u1ABD\u1B00-\u1B4B\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1BF3\u1C00-\u1C37\u1C40-\u1C49\u1C4D-\u1C7D\u1CD0-\u1CD2\u1CD4-\u1CF6\u1CF8\u1CF9\u1D00-\u1DF5\u1DFC-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u200C\u200D\u203F\u2040\u2054\u2071\u207F\u2090-\u209C\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D7F-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2DE0-\u2DFF\u3005-\u3007\u3021-\u302F\u3031-\u3035\u3038-\u303C\u3041-\u3096\u3099-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66F\uA674-\uA67D\uA67F-\uA6F1\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AD\uA7B0-\uA7B7\uA7F7-\uA827\uA840-\uA873\uA880-\uA8C4\uA8D0-\uA8D9\uA8E0-\uA8F7\uA8FB\uA8FD\uA900-\uA92D\uA930-\uA953\uA960-\uA97C\uA980-\uA9C0\uA9CF-\uA9D9\uA9E0-\uA9FE\uAA00-\uAA36\uAA40-\uAA4D\uAA50-\uAA59\uAA60-\uAA76\uAA7A-\uAAC2\uAADB-\uAADD\uAAE0-\uAAEF\uAAF2-\uAAF6\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABEA\uABEC\uABED\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF3F\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD40-\uDD74\uDDFD\uDE80-\uDE9C\uDEA0-\uDED0\uDEE0\uDF00-\uDF1F\uDF30-\uDF4A\uDF50-\uDF7A\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00-\uDE03\uDE05\uDE06\uDE0C-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE38-\uDE3A\uDE3F\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE6\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC00-\uDC46\uDC66-\uDC6F\uDC7F-\uDCBA\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD00-\uDD34\uDD36-\uDD3F\uDD50-\uDD73\uDD76\uDD80-\uDDC4\uDDCA-\uDDCC\uDDD0-\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE37\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEEA\uDEF0-\uDEF9\uDF00-\uDF03\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3C-\uDF44\uDF47\uDF48\uDF4B-\uDF4D\uDF50\uDF57\uDF5D-\uDF63\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC80-\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDB5\uDDB8-\uDDC0\uDDD8-\uDDDD\uDE00-\uDE40\uDE44\uDE50-\uDE59\uDE80-\uDEB7\uDEC0-\uDEC9\uDF00-\uDF19\uDF1D-\uDF2B\uDF30-\uDF39]|\uD806[\uDCA0-\uDCE9\uDCFF\uDEC0-\uDEF8]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDEF0-\uDEF4\uDF00-\uDF36\uDF40-\uDF43\uDF50-\uDF59\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50-\uDF7E\uDF8F-\uDF9F]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99\uDC9D\uDC9E]|\uD834[\uDD65-\uDD69\uDD6D-\uDD72\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD83A[\uDC00-\uDCC4\uDCD0-\uDCD6]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]|\uDB40[\uDD00-\uDDEF]/
            };
            n.Character = {
              fromCodePoint: function(s) {
                return s < 65536 ? String.fromCharCode(s) : String.fromCharCode(55296 + (s - 65536 >> 10)) + String.fromCharCode(56320 + (s - 65536 & 1023));
              },
              isWhiteSpace: function(s) {
                return s === 32 || s === 9 || s === 11 || s === 12 || s === 160 || s >= 5760 && [
                  5760,
                  8192,
                  8193,
                  8194,
                  8195,
                  8196,
                  8197,
                  8198,
                  8199,
                  8200,
                  8201,
                  8202,
                  8239,
                  8287,
                  12288,
                  65279
                ].indexOf(s) >= 0;
              },
              isLineTerminator: function(s) {
                return s === 10 || s === 13 || s === 8232 || s === 8233;
              },
              isIdentifierStart: function(s) {
                return s === 36 || s === 95 || s >= 65 && s <= 90 || s >= 97 && s <= 122 || s === 92 || s >= 128 && l.NonAsciiIdentifierStart.test(n.Character.fromCodePoint(s));
              },
              isIdentifierPart: function(s) {
                return s === 36 || s === 95 || s >= 65 && s <= 90 || s >= 97 && s <= 122 || s >= 48 && s <= 57 || s === 92 || s >= 128 && l.NonAsciiIdentifierPart.test(n.Character.fromCodePoint(s));
              },
              isDecimalDigit: function(s) {
                return s >= 48 && s <= 57;
              },
              isHexDigit: function(s) {
                return s >= 48 && s <= 57 || s >= 65 && s <= 70 || s >= 97 && s <= 102;
              },
              isOctalDigit: function(s) {
                return s >= 48 && s <= 55;
              }
            };
          },
          function(r, n, l) {
            Object.defineProperty(n, "__esModule", {
              value: true
            });
            var s = l(6), u = /* @__PURE__ */ function() {
              function _(x) {
                this.type = s.JSXSyntax.JSXClosingElement, this.name = x;
              }
              return _;
            }();
            n.JSXClosingElement = u;
            var d = /* @__PURE__ */ function() {
              function _(x, S, E) {
                this.type = s.JSXSyntax.JSXElement, this.openingElement = x, this.children = S, this.closingElement = E;
              }
              return _;
            }();
            n.JSXElement = d;
            var h = /* @__PURE__ */ function() {
              function _() {
                this.type = s.JSXSyntax.JSXEmptyExpression;
              }
              return _;
            }();
            n.JSXEmptyExpression = h;
            var f = /* @__PURE__ */ function() {
              function _(x) {
                this.type = s.JSXSyntax.JSXExpressionContainer, this.expression = x;
              }
              return _;
            }();
            n.JSXExpressionContainer = f;
            var o = /* @__PURE__ */ function() {
              function _(x) {
                this.type = s.JSXSyntax.JSXIdentifier, this.name = x;
              }
              return _;
            }();
            n.JSXIdentifier = o;
            var p = /* @__PURE__ */ function() {
              function _(x, S) {
                this.type = s.JSXSyntax.JSXMemberExpression, this.object = x, this.property = S;
              }
              return _;
            }();
            n.JSXMemberExpression = p;
            var y = /* @__PURE__ */ function() {
              function _(x, S) {
                this.type = s.JSXSyntax.JSXAttribute, this.name = x, this.value = S;
              }
              return _;
            }();
            n.JSXAttribute = y;
            var g = /* @__PURE__ */ function() {
              function _(x, S) {
                this.type = s.JSXSyntax.JSXNamespacedName, this.namespace = x, this.name = S;
              }
              return _;
            }();
            n.JSXNamespacedName = g;
            var v = /* @__PURE__ */ function() {
              function _(x, S, E) {
                this.type = s.JSXSyntax.JSXOpeningElement, this.name = x, this.selfClosing = S, this.attributes = E;
              }
              return _;
            }();
            n.JSXOpeningElement = v;
            var c = /* @__PURE__ */ function() {
              function _(x) {
                this.type = s.JSXSyntax.JSXSpreadAttribute, this.argument = x;
              }
              return _;
            }();
            n.JSXSpreadAttribute = c;
            var m = /* @__PURE__ */ function() {
              function _(x, S) {
                this.type = s.JSXSyntax.JSXText, this.value = x, this.raw = S;
              }
              return _;
            }();
            n.JSXText = m;
          },
          function(r, n) {
            Object.defineProperty(n, "__esModule", {
              value: true
            }), n.JSXSyntax = {
              JSXAttribute: "JSXAttribute",
              JSXClosingElement: "JSXClosingElement",
              JSXElement: "JSXElement",
              JSXEmptyExpression: "JSXEmptyExpression",
              JSXExpressionContainer: "JSXExpressionContainer",
              JSXIdentifier: "JSXIdentifier",
              JSXMemberExpression: "JSXMemberExpression",
              JSXNamespacedName: "JSXNamespacedName",
              JSXOpeningElement: "JSXOpeningElement",
              JSXSpreadAttribute: "JSXSpreadAttribute",
              JSXText: "JSXText"
            };
          },
          function(r, n, l) {
            Object.defineProperty(n, "__esModule", {
              value: true
            });
            var s = l(2), u = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.ArrayExpression, this.elements = j;
              }
              return $;
            }();
            n.ArrayExpression = u;
            var d = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.ArrayPattern, this.elements = j;
              }
              return $;
            }();
            n.ArrayPattern = d;
            var h = /* @__PURE__ */ function() {
              function $(j, U, te) {
                this.type = s.Syntax.ArrowFunctionExpression, this.id = null, this.params = j, this.body = U, this.generator = false, this.expression = te, this.async = false;
              }
              return $;
            }();
            n.ArrowFunctionExpression = h;
            var f = /* @__PURE__ */ function() {
              function $(j, U, te) {
                this.type = s.Syntax.AssignmentExpression, this.operator = j, this.left = U, this.right = te;
              }
              return $;
            }();
            n.AssignmentExpression = f;
            var o = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.AssignmentPattern, this.left = j, this.right = U;
              }
              return $;
            }();
            n.AssignmentPattern = o;
            var p = /* @__PURE__ */ function() {
              function $(j, U, te) {
                this.type = s.Syntax.ArrowFunctionExpression, this.id = null, this.params = j, this.body = U, this.generator = false, this.expression = te, this.async = true;
              }
              return $;
            }();
            n.AsyncArrowFunctionExpression = p;
            var y = /* @__PURE__ */ function() {
              function $(j, U, te) {
                this.type = s.Syntax.FunctionDeclaration, this.id = j, this.params = U, this.body = te, this.generator = false, this.expression = false, this.async = true;
              }
              return $;
            }();
            n.AsyncFunctionDeclaration = y;
            var g = /* @__PURE__ */ function() {
              function $(j, U, te) {
                this.type = s.Syntax.FunctionExpression, this.id = j, this.params = U, this.body = te, this.generator = false, this.expression = false, this.async = true;
              }
              return $;
            }();
            n.AsyncFunctionExpression = g;
            var v = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.AwaitExpression, this.argument = j;
              }
              return $;
            }();
            n.AwaitExpression = v;
            var c = /* @__PURE__ */ function() {
              function $(j, U, te) {
                var ye = j === "||" || j === "&&";
                this.type = ye ? s.Syntax.LogicalExpression : s.Syntax.BinaryExpression, this.operator = j, this.left = U, this.right = te;
              }
              return $;
            }();
            n.BinaryExpression = c;
            var m = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.BlockStatement, this.body = j;
              }
              return $;
            }();
            n.BlockStatement = m;
            var _ = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.BreakStatement, this.label = j;
              }
              return $;
            }();
            n.BreakStatement = _;
            var x = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.CallExpression, this.callee = j, this.arguments = U;
              }
              return $;
            }();
            n.CallExpression = x;
            var S = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.CatchClause, this.param = j, this.body = U;
              }
              return $;
            }();
            n.CatchClause = S;
            var E = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.ClassBody, this.body = j;
              }
              return $;
            }();
            n.ClassBody = E;
            var w = /* @__PURE__ */ function() {
              function $(j, U, te) {
                this.type = s.Syntax.ClassDeclaration, this.id = j, this.superClass = U, this.body = te;
              }
              return $;
            }();
            n.ClassDeclaration = w;
            var C = /* @__PURE__ */ function() {
              function $(j, U, te) {
                this.type = s.Syntax.ClassExpression, this.id = j, this.superClass = U, this.body = te;
              }
              return $;
            }();
            n.ClassExpression = C;
            var D = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.MemberExpression, this.computed = true, this.object = j, this.property = U;
              }
              return $;
            }();
            n.ComputedMemberExpression = D;
            var A = /* @__PURE__ */ function() {
              function $(j, U, te) {
                this.type = s.Syntax.ConditionalExpression, this.test = j, this.consequent = U, this.alternate = te;
              }
              return $;
            }();
            n.ConditionalExpression = A;
            var F = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.ContinueStatement, this.label = j;
              }
              return $;
            }();
            n.ContinueStatement = F;
            var B = /* @__PURE__ */ function() {
              function $() {
                this.type = s.Syntax.DebuggerStatement;
              }
              return $;
            }();
            n.DebuggerStatement = B;
            var N = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.ExpressionStatement, this.expression = j, this.directive = U;
              }
              return $;
            }();
            n.Directive = N;
            var I = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.DoWhileStatement, this.body = j, this.test = U;
              }
              return $;
            }();
            n.DoWhileStatement = I;
            var O = /* @__PURE__ */ function() {
              function $() {
                this.type = s.Syntax.EmptyStatement;
              }
              return $;
            }();
            n.EmptyStatement = O;
            var L = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.ExportAllDeclaration, this.source = j;
              }
              return $;
            }();
            n.ExportAllDeclaration = L;
            var q = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.ExportDefaultDeclaration, this.declaration = j;
              }
              return $;
            }();
            n.ExportDefaultDeclaration = q;
            var z = /* @__PURE__ */ function() {
              function $(j, U, te) {
                this.type = s.Syntax.ExportNamedDeclaration, this.declaration = j, this.specifiers = U, this.source = te;
              }
              return $;
            }();
            n.ExportNamedDeclaration = z;
            var G = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.ExportSpecifier, this.exported = U, this.local = j;
              }
              return $;
            }();
            n.ExportSpecifier = G;
            var J = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.ExpressionStatement, this.expression = j;
              }
              return $;
            }();
            n.ExpressionStatement = J;
            var Z = /* @__PURE__ */ function() {
              function $(j, U, te) {
                this.type = s.Syntax.ForInStatement, this.left = j, this.right = U, this.body = te, this.each = false;
              }
              return $;
            }();
            n.ForInStatement = Z;
            var ae = /* @__PURE__ */ function() {
              function $(j, U, te) {
                this.type = s.Syntax.ForOfStatement, this.left = j, this.right = U, this.body = te;
              }
              return $;
            }();
            n.ForOfStatement = ae;
            var de = /* @__PURE__ */ function() {
              function $(j, U, te, ye) {
                this.type = s.Syntax.ForStatement, this.init = j, this.test = U, this.update = te, this.body = ye;
              }
              return $;
            }();
            n.ForStatement = de;
            var T = /* @__PURE__ */ function() {
              function $(j, U, te, ye) {
                this.type = s.Syntax.FunctionDeclaration, this.id = j, this.params = U, this.body = te, this.generator = ye, this.expression = false, this.async = false;
              }
              return $;
            }();
            n.FunctionDeclaration = T;
            var R = /* @__PURE__ */ function() {
              function $(j, U, te, ye) {
                this.type = s.Syntax.FunctionExpression, this.id = j, this.params = U, this.body = te, this.generator = ye, this.expression = false, this.async = false;
              }
              return $;
            }();
            n.FunctionExpression = R;
            var k = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.Identifier, this.name = j;
              }
              return $;
            }();
            n.Identifier = k;
            var X = /* @__PURE__ */ function() {
              function $(j, U, te) {
                this.type = s.Syntax.IfStatement, this.test = j, this.consequent = U, this.alternate = te;
              }
              return $;
            }();
            n.IfStatement = X;
            var Y = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.ImportDeclaration, this.specifiers = j, this.source = U;
              }
              return $;
            }();
            n.ImportDeclaration = Y;
            var K = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.ImportDefaultSpecifier, this.local = j;
              }
              return $;
            }();
            n.ImportDefaultSpecifier = K;
            var M = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.ImportNamespaceSpecifier, this.local = j;
              }
              return $;
            }();
            n.ImportNamespaceSpecifier = M;
            var P = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.ImportSpecifier, this.local = j, this.imported = U;
              }
              return $;
            }();
            n.ImportSpecifier = P;
            var se = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.LabeledStatement, this.label = j, this.body = U;
              }
              return $;
            }();
            n.LabeledStatement = se;
            var fe = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.Literal, this.value = j, this.raw = U;
              }
              return $;
            }();
            n.Literal = fe;
            var le = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.MetaProperty, this.meta = j, this.property = U;
              }
              return $;
            }();
            n.MetaProperty = le;
            var pe = /* @__PURE__ */ function() {
              function $(j, U, te, ye, Me) {
                this.type = s.Syntax.MethodDefinition, this.key = j, this.computed = U, this.value = te, this.kind = ye, this.static = Me;
              }
              return $;
            }();
            n.MethodDefinition = pe;
            var me = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.Program, this.body = j, this.sourceType = "module";
              }
              return $;
            }();
            n.Module = me;
            var _e = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.NewExpression, this.callee = j, this.arguments = U;
              }
              return $;
            }();
            n.NewExpression = _e;
            var Ee = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.ObjectExpression, this.properties = j;
              }
              return $;
            }();
            n.ObjectExpression = Ee;
            var V = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.ObjectPattern, this.properties = j;
              }
              return $;
            }();
            n.ObjectPattern = V;
            var W = /* @__PURE__ */ function() {
              function $(j, U, te, ye, Me, qe) {
                this.type = s.Syntax.Property, this.key = U, this.computed = te, this.value = ye, this.kind = j, this.method = Me, this.shorthand = qe;
              }
              return $;
            }();
            n.Property = W;
            var H = /* @__PURE__ */ function() {
              function $(j, U, te, ye) {
                this.type = s.Syntax.Literal, this.value = j, this.raw = U, this.regex = {
                  pattern: te,
                  flags: ye
                };
              }
              return $;
            }();
            n.RegexLiteral = H;
            var Q = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.RestElement, this.argument = j;
              }
              return $;
            }();
            n.RestElement = Q;
            var ne = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.ReturnStatement, this.argument = j;
              }
              return $;
            }();
            n.ReturnStatement = ne;
            var ie = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.Program, this.body = j, this.sourceType = "script";
              }
              return $;
            }();
            n.Script = ie;
            var he = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.SequenceExpression, this.expressions = j;
              }
              return $;
            }();
            n.SequenceExpression = he;
            var ce = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.SpreadElement, this.argument = j;
              }
              return $;
            }();
            n.SpreadElement = ce;
            var ue = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.MemberExpression, this.computed = false, this.object = j, this.property = U;
              }
              return $;
            }();
            n.StaticMemberExpression = ue;
            var xe = /* @__PURE__ */ function() {
              function $() {
                this.type = s.Syntax.Super;
              }
              return $;
            }();
            n.Super = xe;
            var ve = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.SwitchCase, this.test = j, this.consequent = U;
              }
              return $;
            }();
            n.SwitchCase = ve;
            var be = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.SwitchStatement, this.discriminant = j, this.cases = U;
              }
              return $;
            }();
            n.SwitchStatement = be;
            var ge = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.TaggedTemplateExpression, this.tag = j, this.quasi = U;
              }
              return $;
            }();
            n.TaggedTemplateExpression = ge;
            var Ne = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.TemplateElement, this.value = j, this.tail = U;
              }
              return $;
            }();
            n.TemplateElement = Ne;
            var we = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.TemplateLiteral, this.quasis = j, this.expressions = U;
              }
              return $;
            }();
            n.TemplateLiteral = we;
            var ke = /* @__PURE__ */ function() {
              function $() {
                this.type = s.Syntax.ThisExpression;
              }
              return $;
            }();
            n.ThisExpression = ke;
            var Ae = /* @__PURE__ */ function() {
              function $(j) {
                this.type = s.Syntax.ThrowStatement, this.argument = j;
              }
              return $;
            }();
            n.ThrowStatement = Ae;
            var Te = /* @__PURE__ */ function() {
              function $(j, U, te) {
                this.type = s.Syntax.TryStatement, this.block = j, this.handler = U, this.finalizer = te;
              }
              return $;
            }();
            n.TryStatement = Te;
            var je = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.UnaryExpression, this.operator = j, this.argument = U, this.prefix = true;
              }
              return $;
            }();
            n.UnaryExpression = je;
            var Ie = /* @__PURE__ */ function() {
              function $(j, U, te) {
                this.type = s.Syntax.UpdateExpression, this.operator = j, this.argument = U, this.prefix = te;
              }
              return $;
            }();
            n.UpdateExpression = Ie;
            var Fe = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.VariableDeclaration, this.declarations = j, this.kind = U;
              }
              return $;
            }();
            n.VariableDeclaration = Fe;
            var Pe = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.VariableDeclarator, this.id = j, this.init = U;
              }
              return $;
            }();
            n.VariableDeclarator = Pe;
            var Le = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.WhileStatement, this.test = j, this.body = U;
              }
              return $;
            }();
            n.WhileStatement = Le;
            var Re = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.WithStatement, this.object = j, this.body = U;
              }
              return $;
            }();
            n.WithStatement = Re;
            var ze = /* @__PURE__ */ function() {
              function $(j, U) {
                this.type = s.Syntax.YieldExpression, this.argument = j, this.delegate = U;
              }
              return $;
            }();
            n.YieldExpression = ze;
          },
          function(r, n, l) {
            Object.defineProperty(n, "__esModule", {
              value: true
            });
            var s = l(9), u = l(10), d = l(11), h = l(7), f = l(12), o = l(2), p = l(13), y = "ArrowParameterPlaceHolder", g = function() {
              function v(c, m, _) {
                m === void 0 && (m = {}), this.config = {
                  range: typeof m.range == "boolean" && m.range,
                  loc: typeof m.loc == "boolean" && m.loc,
                  source: null,
                  tokens: typeof m.tokens == "boolean" && m.tokens,
                  comment: typeof m.comment == "boolean" && m.comment,
                  tolerant: typeof m.tolerant == "boolean" && m.tolerant
                }, this.config.loc && m.source && m.source !== null && (this.config.source = String(m.source)), this.delegate = _, this.errorHandler = new u.ErrorHandler(), this.errorHandler.tolerant = this.config.tolerant, this.scanner = new f.Scanner(c, this.errorHandler), this.scanner.trackComment = this.config.comment, this.operatorPrecedence = {
                  ")": 0,
                  ";": 0,
                  ",": 0,
                  "=": 0,
                  "]": 0,
                  "||": 1,
                  "&&": 2,
                  "|": 3,
                  "^": 4,
                  "&": 5,
                  "==": 6,
                  "!=": 6,
                  "===": 6,
                  "!==": 6,
                  "<": 7,
                  ">": 7,
                  "<=": 7,
                  ">=": 7,
                  "<<": 8,
                  ">>": 8,
                  ">>>": 8,
                  "+": 9,
                  "-": 9,
                  "*": 11,
                  "/": 11,
                  "%": 11
                }, this.lookahead = {
                  type: 2,
                  value: "",
                  lineNumber: this.scanner.lineNumber,
                  lineStart: 0,
                  start: 0,
                  end: 0
                }, this.hasLineTerminator = false, this.context = {
                  isModule: false,
                  await: false,
                  allowIn: true,
                  allowStrictDirective: true,
                  allowYield: true,
                  firstCoverInitializedNameError: null,
                  isAssignmentTarget: false,
                  isBindingElement: false,
                  inFunctionBody: false,
                  inIteration: false,
                  inSwitch: false,
                  labelSet: {},
                  strict: false
                }, this.tokens = [], this.startMarker = {
                  index: 0,
                  line: this.scanner.lineNumber,
                  column: 0
                }, this.lastMarker = {
                  index: 0,
                  line: this.scanner.lineNumber,
                  column: 0
                }, this.nextToken(), this.lastMarker = {
                  index: this.scanner.index,
                  line: this.scanner.lineNumber,
                  column: this.scanner.index - this.scanner.lineStart
                };
              }
              return v.prototype.throwError = function(c) {
                var m = Array.prototype.slice.call(arguments, 1), _ = c.replace(/%(\d)/g, function(w, C) {
                  return s.assert(C < m.length, "Message reference must be in range"), m[C];
                }), x = this.lastMarker.index, S = this.lastMarker.line, E = this.lastMarker.column + 1;
                throw this.errorHandler.createError(x, S, E, _);
              }, v.prototype.tolerateError = function(c) {
                var m = Array.prototype.slice.call(arguments, 1), _ = c.replace(/%(\d)/g, function(w, C) {
                  return s.assert(C < m.length, "Message reference must be in range"), m[C];
                }), x = this.lastMarker.index, S = this.scanner.lineNumber, E = this.lastMarker.column + 1;
                this.errorHandler.tolerateError(x, S, E, _);
              }, v.prototype.unexpectedTokenError = function(c, m) {
                var _ = m || d.Messages.UnexpectedToken, x;
                if (c ? (m || (_ = c.type === 2 ? d.Messages.UnexpectedEOS : c.type === 3 ? d.Messages.UnexpectedIdentifier : c.type === 6 ? d.Messages.UnexpectedNumber : c.type === 8 ? d.Messages.UnexpectedString : c.type === 10 ? d.Messages.UnexpectedTemplate : d.Messages.UnexpectedToken, c.type === 4 && (this.scanner.isFutureReservedWord(c.value) ? _ = d.Messages.UnexpectedReserved : this.context.strict && this.scanner.isStrictModeReservedWord(c.value) && (_ = d.Messages.StrictReservedWord))), x = c.value) : x = "ILLEGAL", _ = _.replace("%0", x), c && typeof c.lineNumber == "number") {
                  var S = c.start, E = c.lineNumber, w = this.lastMarker.index - this.lastMarker.column, C = c.start - w + 1;
                  return this.errorHandler.createError(S, E, C, _);
                } else {
                  var S = this.lastMarker.index, E = this.lastMarker.line, C = this.lastMarker.column + 1;
                  return this.errorHandler.createError(S, E, C, _);
                }
              }, v.prototype.throwUnexpectedToken = function(c, m) {
                throw this.unexpectedTokenError(c, m);
              }, v.prototype.tolerateUnexpectedToken = function(c, m) {
                this.errorHandler.tolerate(this.unexpectedTokenError(c, m));
              }, v.prototype.collectComments = function() {
                if (!this.config.comment) this.scanner.scanComments();
                else {
                  var c = this.scanner.scanComments();
                  if (c.length > 0 && this.delegate) for (var m = 0; m < c.length; ++m) {
                    var _ = c[m], x = void 0;
                    x = {
                      type: _.multiLine ? "BlockComment" : "LineComment",
                      value: this.scanner.source.slice(_.slice[0], _.slice[1])
                    }, this.config.range && (x.range = _.range), this.config.loc && (x.loc = _.loc);
                    var S = {
                      start: {
                        line: _.loc.start.line,
                        column: _.loc.start.column,
                        offset: _.range[0]
                      },
                      end: {
                        line: _.loc.end.line,
                        column: _.loc.end.column,
                        offset: _.range[1]
                      }
                    };
                    this.delegate(x, S);
                  }
                }
              }, v.prototype.getTokenRaw = function(c) {
                return this.scanner.source.slice(c.start, c.end);
              }, v.prototype.convertToken = function(c) {
                var m = {
                  type: p.TokenName[c.type],
                  value: this.getTokenRaw(c)
                };
                if (this.config.range && (m.range = [
                  c.start,
                  c.end
                ]), this.config.loc && (m.loc = {
                  start: {
                    line: this.startMarker.line,
                    column: this.startMarker.column
                  },
                  end: {
                    line: this.scanner.lineNumber,
                    column: this.scanner.index - this.scanner.lineStart
                  }
                }), c.type === 9) {
                  var _ = c.pattern, x = c.flags;
                  m.regex = {
                    pattern: _,
                    flags: x
                  };
                }
                return m;
              }, v.prototype.nextToken = function() {
                var c = this.lookahead;
                this.lastMarker.index = this.scanner.index, this.lastMarker.line = this.scanner.lineNumber, this.lastMarker.column = this.scanner.index - this.scanner.lineStart, this.collectComments(), this.scanner.index !== this.startMarker.index && (this.startMarker.index = this.scanner.index, this.startMarker.line = this.scanner.lineNumber, this.startMarker.column = this.scanner.index - this.scanner.lineStart);
                var m = this.scanner.lex();
                return this.hasLineTerminator = c.lineNumber !== m.lineNumber, m && this.context.strict && m.type === 3 && this.scanner.isStrictModeReservedWord(m.value) && (m.type = 4), this.lookahead = m, this.config.tokens && m.type !== 2 && this.tokens.push(this.convertToken(m)), c;
              }, v.prototype.nextRegexToken = function() {
                this.collectComments();
                var c = this.scanner.scanRegExp();
                return this.config.tokens && (this.tokens.pop(), this.tokens.push(this.convertToken(c))), this.lookahead = c, this.nextToken(), c;
              }, v.prototype.createNode = function() {
                return {
                  index: this.startMarker.index,
                  line: this.startMarker.line,
                  column: this.startMarker.column
                };
              }, v.prototype.startNode = function(c, m) {
                m === void 0 && (m = 0);
                var _ = c.start - c.lineStart, x = c.lineNumber;
                return _ < 0 && (_ += m, x--), {
                  index: c.start,
                  line: x,
                  column: _
                };
              }, v.prototype.finalize = function(c, m) {
                if (this.config.range && (m.range = [
                  c.index,
                  this.lastMarker.index
                ]), this.config.loc && (m.loc = {
                  start: {
                    line: c.line,
                    column: c.column
                  },
                  end: {
                    line: this.lastMarker.line,
                    column: this.lastMarker.column
                  }
                }, this.config.source && (m.loc.source = this.config.source)), this.delegate) {
                  var _ = {
                    start: {
                      line: c.line,
                      column: c.column,
                      offset: c.index
                    },
                    end: {
                      line: this.lastMarker.line,
                      column: this.lastMarker.column,
                      offset: this.lastMarker.index
                    }
                  };
                  this.delegate(m, _);
                }
                return m;
              }, v.prototype.expect = function(c) {
                var m = this.nextToken();
                (m.type !== 7 || m.value !== c) && this.throwUnexpectedToken(m);
              }, v.prototype.expectCommaSeparator = function() {
                if (this.config.tolerant) {
                  var c = this.lookahead;
                  c.type === 7 && c.value === "," ? this.nextToken() : c.type === 7 && c.value === ";" ? (this.nextToken(), this.tolerateUnexpectedToken(c)) : this.tolerateUnexpectedToken(c, d.Messages.UnexpectedToken);
                } else this.expect(",");
              }, v.prototype.expectKeyword = function(c) {
                var m = this.nextToken();
                (m.type !== 4 || m.value !== c) && this.throwUnexpectedToken(m);
              }, v.prototype.match = function(c) {
                return this.lookahead.type === 7 && this.lookahead.value === c;
              }, v.prototype.matchKeyword = function(c) {
                return this.lookahead.type === 4 && this.lookahead.value === c;
              }, v.prototype.matchContextualKeyword = function(c) {
                return this.lookahead.type === 3 && this.lookahead.value === c;
              }, v.prototype.matchAssign = function() {
                if (this.lookahead.type !== 7) return false;
                var c = this.lookahead.value;
                return c === "=" || c === "*=" || c === "**=" || c === "/=" || c === "%=" || c === "+=" || c === "-=" || c === "<<=" || c === ">>=" || c === ">>>=" || c === "&=" || c === "^=" || c === "|=";
              }, v.prototype.isolateCoverGrammar = function(c) {
                var m = this.context.isBindingElement, _ = this.context.isAssignmentTarget, x = this.context.firstCoverInitializedNameError;
                this.context.isBindingElement = true, this.context.isAssignmentTarget = true, this.context.firstCoverInitializedNameError = null;
                var S = c.call(this);
                return this.context.firstCoverInitializedNameError !== null && this.throwUnexpectedToken(this.context.firstCoverInitializedNameError), this.context.isBindingElement = m, this.context.isAssignmentTarget = _, this.context.firstCoverInitializedNameError = x, S;
              }, v.prototype.inheritCoverGrammar = function(c) {
                var m = this.context.isBindingElement, _ = this.context.isAssignmentTarget, x = this.context.firstCoverInitializedNameError;
                this.context.isBindingElement = true, this.context.isAssignmentTarget = true, this.context.firstCoverInitializedNameError = null;
                var S = c.call(this);
                return this.context.isBindingElement = this.context.isBindingElement && m, this.context.isAssignmentTarget = this.context.isAssignmentTarget && _, this.context.firstCoverInitializedNameError = x || this.context.firstCoverInitializedNameError, S;
              }, v.prototype.consumeSemicolon = function() {
                this.match(";") ? this.nextToken() : this.hasLineTerminator || (this.lookahead.type !== 2 && !this.match("}") && this.throwUnexpectedToken(this.lookahead), this.lastMarker.index = this.startMarker.index, this.lastMarker.line = this.startMarker.line, this.lastMarker.column = this.startMarker.column);
              }, v.prototype.parsePrimaryExpression = function() {
                var c = this.createNode(), m, _, x;
                switch (this.lookahead.type) {
                  case 3:
                    (this.context.isModule || this.context.await) && this.lookahead.value === "await" && this.tolerateUnexpectedToken(this.lookahead), m = this.matchAsyncFunction() ? this.parseFunctionExpression() : this.finalize(c, new h.Identifier(this.nextToken().value));
                    break;
                  case 6:
                  case 8:
                    this.context.strict && this.lookahead.octal && this.tolerateUnexpectedToken(this.lookahead, d.Messages.StrictOctalLiteral), this.context.isAssignmentTarget = false, this.context.isBindingElement = false, _ = this.nextToken(), x = this.getTokenRaw(_), m = this.finalize(c, new h.Literal(_.value, x));
                    break;
                  case 1:
                    this.context.isAssignmentTarget = false, this.context.isBindingElement = false, _ = this.nextToken(), x = this.getTokenRaw(_), m = this.finalize(c, new h.Literal(_.value === "true", x));
                    break;
                  case 5:
                    this.context.isAssignmentTarget = false, this.context.isBindingElement = false, _ = this.nextToken(), x = this.getTokenRaw(_), m = this.finalize(c, new h.Literal(null, x));
                    break;
                  case 10:
                    m = this.parseTemplateLiteral();
                    break;
                  case 7:
                    switch (this.lookahead.value) {
                      case "(":
                        this.context.isBindingElement = false, m = this.inheritCoverGrammar(this.parseGroupExpression);
                        break;
                      case "[":
                        m = this.inheritCoverGrammar(this.parseArrayInitializer);
                        break;
                      case "{":
                        m = this.inheritCoverGrammar(this.parseObjectInitializer);
                        break;
                      case "/":
                      case "/=":
                        this.context.isAssignmentTarget = false, this.context.isBindingElement = false, this.scanner.index = this.startMarker.index, _ = this.nextRegexToken(), x = this.getTokenRaw(_), m = this.finalize(c, new h.RegexLiteral(_.regex, x, _.pattern, _.flags));
                        break;
                      default:
                        m = this.throwUnexpectedToken(this.nextToken());
                    }
                    break;
                  case 4:
                    !this.context.strict && this.context.allowYield && this.matchKeyword("yield") ? m = this.parseIdentifierName() : !this.context.strict && this.matchKeyword("let") ? m = this.finalize(c, new h.Identifier(this.nextToken().value)) : (this.context.isAssignmentTarget = false, this.context.isBindingElement = false, this.matchKeyword("function") ? m = this.parseFunctionExpression() : this.matchKeyword("this") ? (this.nextToken(), m = this.finalize(c, new h.ThisExpression())) : this.matchKeyword("class") ? m = this.parseClassExpression() : m = this.throwUnexpectedToken(this.nextToken()));
                    break;
                  default:
                    m = this.throwUnexpectedToken(this.nextToken());
                }
                return m;
              }, v.prototype.parseSpreadElement = function() {
                var c = this.createNode();
                this.expect("...");
                var m = this.inheritCoverGrammar(this.parseAssignmentExpression);
                return this.finalize(c, new h.SpreadElement(m));
              }, v.prototype.parseArrayInitializer = function() {
                var c = this.createNode(), m = [];
                for (this.expect("["); !this.match("]"); ) if (this.match(",")) this.nextToken(), m.push(null);
                else if (this.match("...")) {
                  var _ = this.parseSpreadElement();
                  this.match("]") || (this.context.isAssignmentTarget = false, this.context.isBindingElement = false, this.expect(",")), m.push(_);
                } else m.push(this.inheritCoverGrammar(this.parseAssignmentExpression)), this.match("]") || this.expect(",");
                return this.expect("]"), this.finalize(c, new h.ArrayExpression(m));
              }, v.prototype.parsePropertyMethod = function(c) {
                this.context.isAssignmentTarget = false, this.context.isBindingElement = false;
                var m = this.context.strict, _ = this.context.allowStrictDirective;
                this.context.allowStrictDirective = c.simple;
                var x = this.isolateCoverGrammar(this.parseFunctionSourceElements);
                return this.context.strict && c.firstRestricted && this.tolerateUnexpectedToken(c.firstRestricted, c.message), this.context.strict && c.stricted && this.tolerateUnexpectedToken(c.stricted, c.message), this.context.strict = m, this.context.allowStrictDirective = _, x;
              }, v.prototype.parsePropertyMethodFunction = function() {
                var c = false, m = this.createNode(), _ = this.context.allowYield;
                this.context.allowYield = true;
                var x = this.parseFormalParameters(), S = this.parsePropertyMethod(x);
                return this.context.allowYield = _, this.finalize(m, new h.FunctionExpression(null, x.params, S, c));
              }, v.prototype.parsePropertyMethodAsyncFunction = function() {
                var c = this.createNode(), m = this.context.allowYield, _ = this.context.await;
                this.context.allowYield = false, this.context.await = true;
                var x = this.parseFormalParameters(), S = this.parsePropertyMethod(x);
                return this.context.allowYield = m, this.context.await = _, this.finalize(c, new h.AsyncFunctionExpression(null, x.params, S));
              }, v.prototype.parseObjectPropertyKey = function() {
                var c = this.createNode(), m = this.nextToken(), _;
                switch (m.type) {
                  case 8:
                  case 6:
                    this.context.strict && m.octal && this.tolerateUnexpectedToken(m, d.Messages.StrictOctalLiteral);
                    var x = this.getTokenRaw(m);
                    _ = this.finalize(c, new h.Literal(m.value, x));
                    break;
                  case 3:
                  case 1:
                  case 5:
                  case 4:
                    _ = this.finalize(c, new h.Identifier(m.value));
                    break;
                  case 7:
                    m.value === "[" ? (_ = this.isolateCoverGrammar(this.parseAssignmentExpression), this.expect("]")) : _ = this.throwUnexpectedToken(m);
                    break;
                  default:
                    _ = this.throwUnexpectedToken(m);
                }
                return _;
              }, v.prototype.isPropertyKey = function(c, m) {
                return c.type === o.Syntax.Identifier && c.name === m || c.type === o.Syntax.Literal && c.value === m;
              }, v.prototype.parseObjectProperty = function(c) {
                var m = this.createNode(), _ = this.lookahead, x, S = null, E = null, w = false, C = false, D = false, A = false;
                if (_.type === 3) {
                  var F = _.value;
                  this.nextToken(), w = this.match("["), A = !this.hasLineTerminator && F === "async" && !this.match(":") && !this.match("(") && !this.match("*") && !this.match(","), S = A ? this.parseObjectPropertyKey() : this.finalize(m, new h.Identifier(F));
                } else this.match("*") ? this.nextToken() : (w = this.match("["), S = this.parseObjectPropertyKey());
                var B = this.qualifiedPropertyName(this.lookahead);
                if (_.type === 3 && !A && _.value === "get" && B) x = "get", w = this.match("["), S = this.parseObjectPropertyKey(), this.context.allowYield = false, E = this.parseGetterMethod();
                else if (_.type === 3 && !A && _.value === "set" && B) x = "set", w = this.match("["), S = this.parseObjectPropertyKey(), E = this.parseSetterMethod();
                else if (_.type === 7 && _.value === "*" && B) x = "init", w = this.match("["), S = this.parseObjectPropertyKey(), E = this.parseGeneratorMethod(), C = true;
                else if (S || this.throwUnexpectedToken(this.lookahead), x = "init", this.match(":") && !A) !w && this.isPropertyKey(S, "__proto__") && (c.value && this.tolerateError(d.Messages.DuplicateProtoProperty), c.value = true), this.nextToken(), E = this.inheritCoverGrammar(this.parseAssignmentExpression);
                else if (this.match("(")) E = A ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction(), C = true;
                else if (_.type === 3) {
                  var F = this.finalize(m, new h.Identifier(_.value));
                  if (this.match("=")) {
                    this.context.firstCoverInitializedNameError = this.lookahead, this.nextToken(), D = true;
                    var N = this.isolateCoverGrammar(this.parseAssignmentExpression);
                    E = this.finalize(m, new h.AssignmentPattern(F, N));
                  } else D = true, E = F;
                } else this.throwUnexpectedToken(this.nextToken());
                return this.finalize(m, new h.Property(x, S, w, E, C, D));
              }, v.prototype.parseObjectInitializer = function() {
                var c = this.createNode();
                this.expect("{");
                for (var m = [], _ = {
                  value: false
                }; !this.match("}"); ) m.push(this.parseObjectProperty(_)), this.match("}") || this.expectCommaSeparator();
                return this.expect("}"), this.finalize(c, new h.ObjectExpression(m));
              }, v.prototype.parseTemplateHead = function() {
                s.assert(this.lookahead.head, "Template literal must start with a template head");
                var c = this.createNode(), m = this.nextToken(), _ = m.value, x = m.cooked;
                return this.finalize(c, new h.TemplateElement({
                  raw: _,
                  cooked: x
                }, m.tail));
              }, v.prototype.parseTemplateElement = function() {
                this.lookahead.type !== 10 && this.throwUnexpectedToken();
                var c = this.createNode(), m = this.nextToken(), _ = m.value, x = m.cooked;
                return this.finalize(c, new h.TemplateElement({
                  raw: _,
                  cooked: x
                }, m.tail));
              }, v.prototype.parseTemplateLiteral = function() {
                var c = this.createNode(), m = [], _ = [], x = this.parseTemplateHead();
                for (_.push(x); !x.tail; ) m.push(this.parseExpression()), x = this.parseTemplateElement(), _.push(x);
                return this.finalize(c, new h.TemplateLiteral(_, m));
              }, v.prototype.reinterpretExpressionAsPattern = function(c) {
                switch (c.type) {
                  case o.Syntax.Identifier:
                  case o.Syntax.MemberExpression:
                  case o.Syntax.RestElement:
                  case o.Syntax.AssignmentPattern:
                    break;
                  case o.Syntax.SpreadElement:
                    c.type = o.Syntax.RestElement, this.reinterpretExpressionAsPattern(c.argument);
                    break;
                  case o.Syntax.ArrayExpression:
                    c.type = o.Syntax.ArrayPattern;
                    for (var m = 0; m < c.elements.length; m++) c.elements[m] !== null && this.reinterpretExpressionAsPattern(c.elements[m]);
                    break;
                  case o.Syntax.ObjectExpression:
                    c.type = o.Syntax.ObjectPattern;
                    for (var m = 0; m < c.properties.length; m++) this.reinterpretExpressionAsPattern(c.properties[m].value);
                    break;
                  case o.Syntax.AssignmentExpression:
                    c.type = o.Syntax.AssignmentPattern, delete c.operator, this.reinterpretExpressionAsPattern(c.left);
                    break;
                }
              }, v.prototype.parseGroupExpression = function() {
                var c;
                if (this.expect("("), this.match(")")) this.nextToken(), this.match("=>") || this.expect("=>"), c = {
                  type: y,
                  params: [],
                  async: false
                };
                else {
                  var m = this.lookahead, _ = [];
                  if (this.match("...")) c = this.parseRestElement(_), this.expect(")"), this.match("=>") || this.expect("=>"), c = {
                    type: y,
                    params: [
                      c
                    ],
                    async: false
                  };
                  else {
                    var x = false;
                    if (this.context.isBindingElement = true, c = this.inheritCoverGrammar(this.parseAssignmentExpression), this.match(",")) {
                      var S = [];
                      for (this.context.isAssignmentTarget = false, S.push(c); this.lookahead.type !== 2 && this.match(","); ) {
                        if (this.nextToken(), this.match(")")) {
                          this.nextToken();
                          for (var E = 0; E < S.length; E++) this.reinterpretExpressionAsPattern(S[E]);
                          x = true, c = {
                            type: y,
                            params: S,
                            async: false
                          };
                        } else if (this.match("...")) {
                          this.context.isBindingElement || this.throwUnexpectedToken(this.lookahead), S.push(this.parseRestElement(_)), this.expect(")"), this.match("=>") || this.expect("=>"), this.context.isBindingElement = false;
                          for (var E = 0; E < S.length; E++) this.reinterpretExpressionAsPattern(S[E]);
                          x = true, c = {
                            type: y,
                            params: S,
                            async: false
                          };
                        } else S.push(this.inheritCoverGrammar(this.parseAssignmentExpression));
                        if (x) break;
                      }
                      x || (c = this.finalize(this.startNode(m), new h.SequenceExpression(S)));
                    }
                    if (!x) {
                      if (this.expect(")"), this.match("=>") && (c.type === o.Syntax.Identifier && c.name === "yield" && (x = true, c = {
                        type: y,
                        params: [
                          c
                        ],
                        async: false
                      }), !x)) {
                        if (this.context.isBindingElement || this.throwUnexpectedToken(this.lookahead), c.type === o.Syntax.SequenceExpression) for (var E = 0; E < c.expressions.length; E++) this.reinterpretExpressionAsPattern(c.expressions[E]);
                        else this.reinterpretExpressionAsPattern(c);
                        var w = c.type === o.Syntax.SequenceExpression ? c.expressions : [
                          c
                        ];
                        c = {
                          type: y,
                          params: w,
                          async: false
                        };
                      }
                      this.context.isBindingElement = false;
                    }
                  }
                }
                return c;
              }, v.prototype.parseArguments = function() {
                this.expect("(");
                var c = [];
                if (!this.match(")")) for (; ; ) {
                  var m = this.match("...") ? this.parseSpreadElement() : this.isolateCoverGrammar(this.parseAssignmentExpression);
                  if (c.push(m), this.match(")") || (this.expectCommaSeparator(), this.match(")"))) break;
                }
                return this.expect(")"), c;
              }, v.prototype.isIdentifierName = function(c) {
                return c.type === 3 || c.type === 4 || c.type === 1 || c.type === 5;
              }, v.prototype.parseIdentifierName = function() {
                var c = this.createNode(), m = this.nextToken();
                return this.isIdentifierName(m) || this.throwUnexpectedToken(m), this.finalize(c, new h.Identifier(m.value));
              }, v.prototype.parseNewExpression = function() {
                var c = this.createNode(), m = this.parseIdentifierName();
                s.assert(m.name === "new", "New expression must start with `new`");
                var _;
                if (this.match(".")) if (this.nextToken(), this.lookahead.type === 3 && this.context.inFunctionBody && this.lookahead.value === "target") {
                  var x = this.parseIdentifierName();
                  _ = new h.MetaProperty(m, x);
                } else this.throwUnexpectedToken(this.lookahead);
                else {
                  var S = this.isolateCoverGrammar(this.parseLeftHandSideExpression), E = this.match("(") ? this.parseArguments() : [];
                  _ = new h.NewExpression(S, E), this.context.isAssignmentTarget = false, this.context.isBindingElement = false;
                }
                return this.finalize(c, _);
              }, v.prototype.parseAsyncArgument = function() {
                var c = this.parseAssignmentExpression();
                return this.context.firstCoverInitializedNameError = null, c;
              }, v.prototype.parseAsyncArguments = function() {
                this.expect("(");
                var c = [];
                if (!this.match(")")) for (; ; ) {
                  var m = this.match("...") ? this.parseSpreadElement() : this.isolateCoverGrammar(this.parseAsyncArgument);
                  if (c.push(m), this.match(")") || (this.expectCommaSeparator(), this.match(")"))) break;
                }
                return this.expect(")"), c;
              }, v.prototype.parseLeftHandSideExpressionAllowCall = function() {
                var c = this.lookahead, m = this.matchContextualKeyword("async"), _ = this.context.allowIn;
                this.context.allowIn = true;
                var x;
                for (this.matchKeyword("super") && this.context.inFunctionBody ? (x = this.createNode(), this.nextToken(), x = this.finalize(x, new h.Super()), !this.match("(") && !this.match(".") && !this.match("[") && this.throwUnexpectedToken(this.lookahead)) : x = this.inheritCoverGrammar(this.matchKeyword("new") ? this.parseNewExpression : this.parsePrimaryExpression); ; ) if (this.match(".")) {
                  this.context.isBindingElement = false, this.context.isAssignmentTarget = true, this.expect(".");
                  var S = this.parseIdentifierName();
                  x = this.finalize(this.startNode(c), new h.StaticMemberExpression(x, S));
                } else if (this.match("(")) {
                  var E = m && c.lineNumber === this.lookahead.lineNumber;
                  this.context.isBindingElement = false, this.context.isAssignmentTarget = false;
                  var w = E ? this.parseAsyncArguments() : this.parseArguments();
                  if (x = this.finalize(this.startNode(c), new h.CallExpression(x, w)), E && this.match("=>")) {
                    for (var C = 0; C < w.length; ++C) this.reinterpretExpressionAsPattern(w[C]);
                    x = {
                      type: y,
                      params: w,
                      async: true
                    };
                  }
                } else if (this.match("[")) {
                  this.context.isBindingElement = false, this.context.isAssignmentTarget = true, this.expect("[");
                  var S = this.isolateCoverGrammar(this.parseExpression);
                  this.expect("]"), x = this.finalize(this.startNode(c), new h.ComputedMemberExpression(x, S));
                } else if (this.lookahead.type === 10 && this.lookahead.head) {
                  var D = this.parseTemplateLiteral();
                  x = this.finalize(this.startNode(c), new h.TaggedTemplateExpression(x, D));
                } else break;
                return this.context.allowIn = _, x;
              }, v.prototype.parseSuper = function() {
                var c = this.createNode();
                return this.expectKeyword("super"), !this.match("[") && !this.match(".") && this.throwUnexpectedToken(this.lookahead), this.finalize(c, new h.Super());
              }, v.prototype.parseLeftHandSideExpression = function() {
                s.assert(this.context.allowIn, "callee of new expression always allow in keyword.");
                for (var c = this.startNode(this.lookahead), m = this.matchKeyword("super") && this.context.inFunctionBody ? this.parseSuper() : this.inheritCoverGrammar(this.matchKeyword("new") ? this.parseNewExpression : this.parsePrimaryExpression); ; ) if (this.match("[")) {
                  this.context.isBindingElement = false, this.context.isAssignmentTarget = true, this.expect("[");
                  var _ = this.isolateCoverGrammar(this.parseExpression);
                  this.expect("]"), m = this.finalize(c, new h.ComputedMemberExpression(m, _));
                } else if (this.match(".")) {
                  this.context.isBindingElement = false, this.context.isAssignmentTarget = true, this.expect(".");
                  var _ = this.parseIdentifierName();
                  m = this.finalize(c, new h.StaticMemberExpression(m, _));
                } else if (this.lookahead.type === 10 && this.lookahead.head) {
                  var x = this.parseTemplateLiteral();
                  m = this.finalize(c, new h.TaggedTemplateExpression(m, x));
                } else break;
                return m;
              }, v.prototype.parseUpdateExpression = function() {
                var c, m = this.lookahead;
                if (this.match("++") || this.match("--")) {
                  var _ = this.startNode(m), x = this.nextToken();
                  c = this.inheritCoverGrammar(this.parseUnaryExpression), this.context.strict && c.type === o.Syntax.Identifier && this.scanner.isRestrictedWord(c.name) && this.tolerateError(d.Messages.StrictLHSPrefix), this.context.isAssignmentTarget || this.tolerateError(d.Messages.InvalidLHSInAssignment);
                  var S = true;
                  c = this.finalize(_, new h.UpdateExpression(x.value, c, S)), this.context.isAssignmentTarget = false, this.context.isBindingElement = false;
                } else if (c = this.inheritCoverGrammar(this.parseLeftHandSideExpressionAllowCall), !this.hasLineTerminator && this.lookahead.type === 7 && (this.match("++") || this.match("--"))) {
                  this.context.strict && c.type === o.Syntax.Identifier && this.scanner.isRestrictedWord(c.name) && this.tolerateError(d.Messages.StrictLHSPostfix), this.context.isAssignmentTarget || this.tolerateError(d.Messages.InvalidLHSInAssignment), this.context.isAssignmentTarget = false, this.context.isBindingElement = false;
                  var E = this.nextToken().value, S = false;
                  c = this.finalize(this.startNode(m), new h.UpdateExpression(E, c, S));
                }
                return c;
              }, v.prototype.parseAwaitExpression = function() {
                var c = this.createNode();
                this.nextToken();
                var m = this.parseUnaryExpression();
                return this.finalize(c, new h.AwaitExpression(m));
              }, v.prototype.parseUnaryExpression = function() {
                var c;
                if (this.match("+") || this.match("-") || this.match("~") || this.match("!") || this.matchKeyword("delete") || this.matchKeyword("void") || this.matchKeyword("typeof")) {
                  var m = this.startNode(this.lookahead), _ = this.nextToken();
                  c = this.inheritCoverGrammar(this.parseUnaryExpression), c = this.finalize(m, new h.UnaryExpression(_.value, c)), this.context.strict && c.operator === "delete" && c.argument.type === o.Syntax.Identifier && this.tolerateError(d.Messages.StrictDelete), this.context.isAssignmentTarget = false, this.context.isBindingElement = false;
                } else this.context.await && this.matchContextualKeyword("await") ? c = this.parseAwaitExpression() : c = this.parseUpdateExpression();
                return c;
              }, v.prototype.parseExponentiationExpression = function() {
                var c = this.lookahead, m = this.inheritCoverGrammar(this.parseUnaryExpression);
                if (m.type !== o.Syntax.UnaryExpression && this.match("**")) {
                  this.nextToken(), this.context.isAssignmentTarget = false, this.context.isBindingElement = false;
                  var _ = m, x = this.isolateCoverGrammar(this.parseExponentiationExpression);
                  m = this.finalize(this.startNode(c), new h.BinaryExpression("**", _, x));
                }
                return m;
              }, v.prototype.binaryPrecedence = function(c) {
                var m = c.value, _;
                return c.type === 7 ? _ = this.operatorPrecedence[m] || 0 : c.type === 4 ? _ = m === "instanceof" || this.context.allowIn && m === "in" ? 7 : 0 : _ = 0, _;
              }, v.prototype.parseBinaryExpression = function() {
                var c = this.lookahead, m = this.inheritCoverGrammar(this.parseExponentiationExpression), _ = this.lookahead, x = this.binaryPrecedence(_);
                if (x > 0) {
                  this.nextToken(), this.context.isAssignmentTarget = false, this.context.isBindingElement = false;
                  for (var S = [
                    c,
                    this.lookahead
                  ], E = m, w = this.isolateCoverGrammar(this.parseExponentiationExpression), C = [
                    E,
                    _.value,
                    w
                  ], D = [
                    x
                  ]; x = this.binaryPrecedence(this.lookahead), !(x <= 0); ) {
                    for (; C.length > 2 && x <= D[D.length - 1]; ) {
                      w = C.pop();
                      var A = C.pop();
                      D.pop(), E = C.pop(), S.pop();
                      var F = this.startNode(S[S.length - 1]);
                      C.push(this.finalize(F, new h.BinaryExpression(A, E, w)));
                    }
                    C.push(this.nextToken().value), D.push(x), S.push(this.lookahead), C.push(this.isolateCoverGrammar(this.parseExponentiationExpression));
                  }
                  var B = C.length - 1;
                  m = C[B];
                  for (var N = S.pop(); B > 1; ) {
                    var I = S.pop(), O = N && N.lineStart, F = this.startNode(I, O), A = C[B - 1];
                    m = this.finalize(F, new h.BinaryExpression(A, C[B - 2], m)), B -= 2, N = I;
                  }
                }
                return m;
              }, v.prototype.parseConditionalExpression = function() {
                var c = this.lookahead, m = this.inheritCoverGrammar(this.parseBinaryExpression);
                if (this.match("?")) {
                  this.nextToken();
                  var _ = this.context.allowIn;
                  this.context.allowIn = true;
                  var x = this.isolateCoverGrammar(this.parseAssignmentExpression);
                  this.context.allowIn = _, this.expect(":");
                  var S = this.isolateCoverGrammar(this.parseAssignmentExpression);
                  m = this.finalize(this.startNode(c), new h.ConditionalExpression(m, x, S)), this.context.isAssignmentTarget = false, this.context.isBindingElement = false;
                }
                return m;
              }, v.prototype.checkPatternParam = function(c, m) {
                switch (m.type) {
                  case o.Syntax.Identifier:
                    this.validateParam(c, m, m.name);
                    break;
                  case o.Syntax.RestElement:
                    this.checkPatternParam(c, m.argument);
                    break;
                  case o.Syntax.AssignmentPattern:
                    this.checkPatternParam(c, m.left);
                    break;
                  case o.Syntax.ArrayPattern:
                    for (var _ = 0; _ < m.elements.length; _++) m.elements[_] !== null && this.checkPatternParam(c, m.elements[_]);
                    break;
                  case o.Syntax.ObjectPattern:
                    for (var _ = 0; _ < m.properties.length; _++) this.checkPatternParam(c, m.properties[_].value);
                    break;
                }
                c.simple = c.simple && m instanceof h.Identifier;
              }, v.prototype.reinterpretAsCoverFormalsList = function(c) {
                var m = [
                  c
                ], _, x = false;
                switch (c.type) {
                  case o.Syntax.Identifier:
                    break;
                  case y:
                    m = c.params, x = c.async;
                    break;
                  default:
                    return null;
                }
                _ = {
                  simple: true,
                  paramSet: {}
                };
                for (var S = 0; S < m.length; ++S) {
                  var E = m[S];
                  E.type === o.Syntax.AssignmentPattern ? E.right.type === o.Syntax.YieldExpression && (E.right.argument && this.throwUnexpectedToken(this.lookahead), E.right.type = o.Syntax.Identifier, E.right.name = "yield", delete E.right.argument, delete E.right.delegate) : x && E.type === o.Syntax.Identifier && E.name === "await" && this.throwUnexpectedToken(this.lookahead), this.checkPatternParam(_, E), m[S] = E;
                }
                if (this.context.strict || !this.context.allowYield) for (var S = 0; S < m.length; ++S) {
                  var E = m[S];
                  E.type === o.Syntax.YieldExpression && this.throwUnexpectedToken(this.lookahead);
                }
                if (_.message === d.Messages.StrictParamDupe) {
                  var w = this.context.strict ? _.stricted : _.firstRestricted;
                  this.throwUnexpectedToken(w, _.message);
                }
                return {
                  simple: _.simple,
                  params: m,
                  stricted: _.stricted,
                  firstRestricted: _.firstRestricted,
                  message: _.message
                };
              }, v.prototype.parseAssignmentExpression = function() {
                var c;
                if (!this.context.allowYield && this.matchKeyword("yield")) c = this.parseYieldExpression();
                else {
                  var m = this.lookahead, _ = m;
                  if (c = this.parseConditionalExpression(), _.type === 3 && _.lineNumber === this.lookahead.lineNumber && _.value === "async" && (this.lookahead.type === 3 || this.matchKeyword("yield"))) {
                    var x = this.parsePrimaryExpression();
                    this.reinterpretExpressionAsPattern(x), c = {
                      type: y,
                      params: [
                        x
                      ],
                      async: true
                    };
                  }
                  if (c.type === y || this.match("=>")) {
                    this.context.isAssignmentTarget = false, this.context.isBindingElement = false;
                    var S = c.async, E = this.reinterpretAsCoverFormalsList(c);
                    if (E) {
                      this.hasLineTerminator && this.tolerateUnexpectedToken(this.lookahead), this.context.firstCoverInitializedNameError = null;
                      var w = this.context.strict, C = this.context.allowStrictDirective;
                      this.context.allowStrictDirective = E.simple;
                      var D = this.context.allowYield, A = this.context.await;
                      this.context.allowYield = true, this.context.await = S;
                      var F = this.startNode(m);
                      this.expect("=>");
                      var B = void 0;
                      if (this.match("{")) {
                        var N = this.context.allowIn;
                        this.context.allowIn = true, B = this.parseFunctionSourceElements(), this.context.allowIn = N;
                      } else B = this.isolateCoverGrammar(this.parseAssignmentExpression);
                      var I = B.type !== o.Syntax.BlockStatement;
                      this.context.strict && E.firstRestricted && this.throwUnexpectedToken(E.firstRestricted, E.message), this.context.strict && E.stricted && this.tolerateUnexpectedToken(E.stricted, E.message), c = S ? this.finalize(F, new h.AsyncArrowFunctionExpression(E.params, B, I)) : this.finalize(F, new h.ArrowFunctionExpression(E.params, B, I)), this.context.strict = w, this.context.allowStrictDirective = C, this.context.allowYield = D, this.context.await = A;
                    }
                  } else if (this.matchAssign()) {
                    if (this.context.isAssignmentTarget || this.tolerateError(d.Messages.InvalidLHSInAssignment), this.context.strict && c.type === o.Syntax.Identifier) {
                      var O = c;
                      this.scanner.isRestrictedWord(O.name) && this.tolerateUnexpectedToken(_, d.Messages.StrictLHSAssignment), this.scanner.isStrictModeReservedWord(O.name) && this.tolerateUnexpectedToken(_, d.Messages.StrictReservedWord);
                    }
                    this.match("=") ? this.reinterpretExpressionAsPattern(c) : (this.context.isAssignmentTarget = false, this.context.isBindingElement = false), _ = this.nextToken();
                    var L = _.value, q = this.isolateCoverGrammar(this.parseAssignmentExpression);
                    c = this.finalize(this.startNode(m), new h.AssignmentExpression(L, c, q)), this.context.firstCoverInitializedNameError = null;
                  }
                }
                return c;
              }, v.prototype.parseExpression = function() {
                var c = this.lookahead, m = this.isolateCoverGrammar(this.parseAssignmentExpression);
                if (this.match(",")) {
                  var _ = [];
                  for (_.push(m); this.lookahead.type !== 2 && this.match(","); ) this.nextToken(), _.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
                  m = this.finalize(this.startNode(c), new h.SequenceExpression(_));
                }
                return m;
              }, v.prototype.parseStatementListItem = function() {
                var c;
                if (this.context.isAssignmentTarget = true, this.context.isBindingElement = true, this.lookahead.type === 4) switch (this.lookahead.value) {
                  case "export":
                    this.context.isModule || this.tolerateUnexpectedToken(this.lookahead, d.Messages.IllegalExportDeclaration), c = this.parseExportDeclaration();
                    break;
                  case "import":
                    this.context.isModule || this.tolerateUnexpectedToken(this.lookahead, d.Messages.IllegalImportDeclaration), c = this.parseImportDeclaration();
                    break;
                  case "const":
                    c = this.parseLexicalDeclaration({
                      inFor: false
                    });
                    break;
                  case "function":
                    c = this.parseFunctionDeclaration();
                    break;
                  case "class":
                    c = this.parseClassDeclaration();
                    break;
                  case "let":
                    c = this.isLexicalDeclaration() ? this.parseLexicalDeclaration({
                      inFor: false
                    }) : this.parseStatement();
                    break;
                  default:
                    c = this.parseStatement();
                    break;
                }
                else c = this.parseStatement();
                return c;
              }, v.prototype.parseBlock = function() {
                var c = this.createNode();
                this.expect("{");
                for (var m = []; !this.match("}"); ) m.push(this.parseStatementListItem());
                return this.expect("}"), this.finalize(c, new h.BlockStatement(m));
              }, v.prototype.parseLexicalBinding = function(c, m) {
                var _ = this.createNode(), x = [], S = this.parsePattern(x, c);
                this.context.strict && S.type === o.Syntax.Identifier && this.scanner.isRestrictedWord(S.name) && this.tolerateError(d.Messages.StrictVarName);
                var E = null;
                return c === "const" ? !this.matchKeyword("in") && !this.matchContextualKeyword("of") && (this.match("=") ? (this.nextToken(), E = this.isolateCoverGrammar(this.parseAssignmentExpression)) : this.throwError(d.Messages.DeclarationMissingInitializer, "const")) : (!m.inFor && S.type !== o.Syntax.Identifier || this.match("=")) && (this.expect("="), E = this.isolateCoverGrammar(this.parseAssignmentExpression)), this.finalize(_, new h.VariableDeclarator(S, E));
              }, v.prototype.parseBindingList = function(c, m) {
                for (var _ = [
                  this.parseLexicalBinding(c, m)
                ]; this.match(","); ) this.nextToken(), _.push(this.parseLexicalBinding(c, m));
                return _;
              }, v.prototype.isLexicalDeclaration = function() {
                var c = this.scanner.saveState();
                this.scanner.scanComments();
                var m = this.scanner.lex();
                return this.scanner.restoreState(c), m.type === 3 || m.type === 7 && m.value === "[" || m.type === 7 && m.value === "{" || m.type === 4 && m.value === "let" || m.type === 4 && m.value === "yield";
              }, v.prototype.parseLexicalDeclaration = function(c) {
                var m = this.createNode(), _ = this.nextToken().value;
                s.assert(_ === "let" || _ === "const", "Lexical declaration must be either let or const");
                var x = this.parseBindingList(_, c);
                return this.consumeSemicolon(), this.finalize(m, new h.VariableDeclaration(x, _));
              }, v.prototype.parseBindingRestElement = function(c, m) {
                var _ = this.createNode();
                this.expect("...");
                var x = this.parsePattern(c, m);
                return this.finalize(_, new h.RestElement(x));
              }, v.prototype.parseArrayPattern = function(c, m) {
                var _ = this.createNode();
                this.expect("[");
                for (var x = []; !this.match("]"); ) if (this.match(",")) this.nextToken(), x.push(null);
                else {
                  if (this.match("...")) {
                    x.push(this.parseBindingRestElement(c, m));
                    break;
                  } else x.push(this.parsePatternWithDefault(c, m));
                  this.match("]") || this.expect(",");
                }
                return this.expect("]"), this.finalize(_, new h.ArrayPattern(x));
              }, v.prototype.parsePropertyPattern = function(c, m) {
                var _ = this.createNode(), x = false, S = false, E = false, w, C;
                if (this.lookahead.type === 3) {
                  var D = this.lookahead;
                  w = this.parseVariableIdentifier();
                  var A = this.finalize(_, new h.Identifier(D.value));
                  if (this.match("=")) {
                    c.push(D), S = true, this.nextToken();
                    var F = this.parseAssignmentExpression();
                    C = this.finalize(this.startNode(D), new h.AssignmentPattern(A, F));
                  } else this.match(":") ? (this.expect(":"), C = this.parsePatternWithDefault(c, m)) : (c.push(D), S = true, C = A);
                } else x = this.match("["), w = this.parseObjectPropertyKey(), this.expect(":"), C = this.parsePatternWithDefault(c, m);
                return this.finalize(_, new h.Property("init", w, x, C, E, S));
              }, v.prototype.parseObjectPattern = function(c, m) {
                var _ = this.createNode(), x = [];
                for (this.expect("{"); !this.match("}"); ) x.push(this.parsePropertyPattern(c, m)), this.match("}") || this.expect(",");
                return this.expect("}"), this.finalize(_, new h.ObjectPattern(x));
              }, v.prototype.parsePattern = function(c, m) {
                var _;
                return this.match("[") ? _ = this.parseArrayPattern(c, m) : this.match("{") ? _ = this.parseObjectPattern(c, m) : (this.matchKeyword("let") && (m === "const" || m === "let") && this.tolerateUnexpectedToken(this.lookahead, d.Messages.LetInLexicalBinding), c.push(this.lookahead), _ = this.parseVariableIdentifier(m)), _;
              }, v.prototype.parsePatternWithDefault = function(c, m) {
                var _ = this.lookahead, x = this.parsePattern(c, m);
                if (this.match("=")) {
                  this.nextToken();
                  var S = this.context.allowYield;
                  this.context.allowYield = true;
                  var E = this.isolateCoverGrammar(this.parseAssignmentExpression);
                  this.context.allowYield = S, x = this.finalize(this.startNode(_), new h.AssignmentPattern(x, E));
                }
                return x;
              }, v.prototype.parseVariableIdentifier = function(c) {
                var m = this.createNode(), _ = this.nextToken();
                return _.type === 4 && _.value === "yield" ? this.context.strict ? this.tolerateUnexpectedToken(_, d.Messages.StrictReservedWord) : this.context.allowYield || this.throwUnexpectedToken(_) : _.type !== 3 ? this.context.strict && _.type === 4 && this.scanner.isStrictModeReservedWord(_.value) ? this.tolerateUnexpectedToken(_, d.Messages.StrictReservedWord) : (this.context.strict || _.value !== "let" || c !== "var") && this.throwUnexpectedToken(_) : (this.context.isModule || this.context.await) && _.type === 3 && _.value === "await" && this.tolerateUnexpectedToken(_), this.finalize(m, new h.Identifier(_.value));
              }, v.prototype.parseVariableDeclaration = function(c) {
                var m = this.createNode(), _ = [], x = this.parsePattern(_, "var");
                this.context.strict && x.type === o.Syntax.Identifier && this.scanner.isRestrictedWord(x.name) && this.tolerateError(d.Messages.StrictVarName);
                var S = null;
                return this.match("=") ? (this.nextToken(), S = this.isolateCoverGrammar(this.parseAssignmentExpression)) : x.type !== o.Syntax.Identifier && !c.inFor && this.expect("="), this.finalize(m, new h.VariableDeclarator(x, S));
              }, v.prototype.parseVariableDeclarationList = function(c) {
                var m = {
                  inFor: c.inFor
                }, _ = [];
                for (_.push(this.parseVariableDeclaration(m)); this.match(","); ) this.nextToken(), _.push(this.parseVariableDeclaration(m));
                return _;
              }, v.prototype.parseVariableStatement = function() {
                var c = this.createNode();
                this.expectKeyword("var");
                var m = this.parseVariableDeclarationList({
                  inFor: false
                });
                return this.consumeSemicolon(), this.finalize(c, new h.VariableDeclaration(m, "var"));
              }, v.prototype.parseEmptyStatement = function() {
                var c = this.createNode();
                return this.expect(";"), this.finalize(c, new h.EmptyStatement());
              }, v.prototype.parseExpressionStatement = function() {
                var c = this.createNode(), m = this.parseExpression();
                return this.consumeSemicolon(), this.finalize(c, new h.ExpressionStatement(m));
              }, v.prototype.parseIfClause = function() {
                return this.context.strict && this.matchKeyword("function") && this.tolerateError(d.Messages.StrictFunction), this.parseStatement();
              }, v.prototype.parseIfStatement = function() {
                var c = this.createNode(), m, _ = null;
                this.expectKeyword("if"), this.expect("(");
                var x = this.parseExpression();
                return !this.match(")") && this.config.tolerant ? (this.tolerateUnexpectedToken(this.nextToken()), m = this.finalize(this.createNode(), new h.EmptyStatement())) : (this.expect(")"), m = this.parseIfClause(), this.matchKeyword("else") && (this.nextToken(), _ = this.parseIfClause())), this.finalize(c, new h.IfStatement(x, m, _));
              }, v.prototype.parseDoWhileStatement = function() {
                var c = this.createNode();
                this.expectKeyword("do");
                var m = this.context.inIteration;
                this.context.inIteration = true;
                var _ = this.parseStatement();
                this.context.inIteration = m, this.expectKeyword("while"), this.expect("(");
                var x = this.parseExpression();
                return !this.match(")") && this.config.tolerant ? this.tolerateUnexpectedToken(this.nextToken()) : (this.expect(")"), this.match(";") && this.nextToken()), this.finalize(c, new h.DoWhileStatement(_, x));
              }, v.prototype.parseWhileStatement = function() {
                var c = this.createNode(), m;
                this.expectKeyword("while"), this.expect("(");
                var _ = this.parseExpression();
                if (!this.match(")") && this.config.tolerant) this.tolerateUnexpectedToken(this.nextToken()), m = this.finalize(this.createNode(), new h.EmptyStatement());
                else {
                  this.expect(")");
                  var x = this.context.inIteration;
                  this.context.inIteration = true, m = this.parseStatement(), this.context.inIteration = x;
                }
                return this.finalize(c, new h.WhileStatement(_, m));
              }, v.prototype.parseForStatement = function() {
                var c = null, m = null, _ = null, x = true, S, E, w = this.createNode();
                if (this.expectKeyword("for"), this.expect("("), this.match(";")) this.nextToken();
                else if (this.matchKeyword("var")) {
                  c = this.createNode(), this.nextToken();
                  var C = this.context.allowIn;
                  this.context.allowIn = false;
                  var D = this.parseVariableDeclarationList({
                    inFor: true
                  });
                  if (this.context.allowIn = C, D.length === 1 && this.matchKeyword("in")) {
                    var A = D[0];
                    A.init && (A.id.type === o.Syntax.ArrayPattern || A.id.type === o.Syntax.ObjectPattern || this.context.strict) && this.tolerateError(d.Messages.ForInOfLoopInitializer, "for-in"), c = this.finalize(c, new h.VariableDeclaration(D, "var")), this.nextToken(), S = c, E = this.parseExpression(), c = null;
                  } else D.length === 1 && D[0].init === null && this.matchContextualKeyword("of") ? (c = this.finalize(c, new h.VariableDeclaration(D, "var")), this.nextToken(), S = c, E = this.parseAssignmentExpression(), c = null, x = false) : (c = this.finalize(c, new h.VariableDeclaration(D, "var")), this.expect(";"));
                } else if (this.matchKeyword("const") || this.matchKeyword("let")) {
                  c = this.createNode();
                  var F = this.nextToken().value;
                  if (!this.context.strict && this.lookahead.value === "in") c = this.finalize(c, new h.Identifier(F)), this.nextToken(), S = c, E = this.parseExpression(), c = null;
                  else {
                    var C = this.context.allowIn;
                    this.context.allowIn = false;
                    var D = this.parseBindingList(F, {
                      inFor: true
                    });
                    this.context.allowIn = C, D.length === 1 && D[0].init === null && this.matchKeyword("in") ? (c = this.finalize(c, new h.VariableDeclaration(D, F)), this.nextToken(), S = c, E = this.parseExpression(), c = null) : D.length === 1 && D[0].init === null && this.matchContextualKeyword("of") ? (c = this.finalize(c, new h.VariableDeclaration(D, F)), this.nextToken(), S = c, E = this.parseAssignmentExpression(), c = null, x = false) : (this.consumeSemicolon(), c = this.finalize(c, new h.VariableDeclaration(D, F)));
                  }
                } else {
                  var B = this.lookahead, C = this.context.allowIn;
                  if (this.context.allowIn = false, c = this.inheritCoverGrammar(this.parseAssignmentExpression), this.context.allowIn = C, this.matchKeyword("in")) (!this.context.isAssignmentTarget || c.type === o.Syntax.AssignmentExpression) && this.tolerateError(d.Messages.InvalidLHSInForIn), this.nextToken(), this.reinterpretExpressionAsPattern(c), S = c, E = this.parseExpression(), c = null;
                  else if (this.matchContextualKeyword("of")) (!this.context.isAssignmentTarget || c.type === o.Syntax.AssignmentExpression) && this.tolerateError(d.Messages.InvalidLHSInForLoop), this.nextToken(), this.reinterpretExpressionAsPattern(c), S = c, E = this.parseAssignmentExpression(), c = null, x = false;
                  else {
                    if (this.match(",")) {
                      for (var N = [
                        c
                      ]; this.match(","); ) this.nextToken(), N.push(this.isolateCoverGrammar(this.parseAssignmentExpression));
                      c = this.finalize(this.startNode(B), new h.SequenceExpression(N));
                    }
                    this.expect(";");
                  }
                }
                typeof S > "u" && (this.match(";") || (m = this.parseExpression()), this.expect(";"), this.match(")") || (_ = this.parseExpression()));
                var I;
                if (!this.match(")") && this.config.tolerant) this.tolerateUnexpectedToken(this.nextToken()), I = this.finalize(this.createNode(), new h.EmptyStatement());
                else {
                  this.expect(")");
                  var O = this.context.inIteration;
                  this.context.inIteration = true, I = this.isolateCoverGrammar(this.parseStatement), this.context.inIteration = O;
                }
                return typeof S > "u" ? this.finalize(w, new h.ForStatement(c, m, _, I)) : x ? this.finalize(w, new h.ForInStatement(S, E, I)) : this.finalize(w, new h.ForOfStatement(S, E, I));
              }, v.prototype.parseContinueStatement = function() {
                var c = this.createNode();
                this.expectKeyword("continue");
                var m = null;
                if (this.lookahead.type === 3 && !this.hasLineTerminator) {
                  var _ = this.parseVariableIdentifier();
                  m = _;
                  var x = "$" + _.name;
                  Object.prototype.hasOwnProperty.call(this.context.labelSet, x) || this.throwError(d.Messages.UnknownLabel, _.name);
                }
                return this.consumeSemicolon(), m === null && !this.context.inIteration && this.throwError(d.Messages.IllegalContinue), this.finalize(c, new h.ContinueStatement(m));
              }, v.prototype.parseBreakStatement = function() {
                var c = this.createNode();
                this.expectKeyword("break");
                var m = null;
                if (this.lookahead.type === 3 && !this.hasLineTerminator) {
                  var _ = this.parseVariableIdentifier(), x = "$" + _.name;
                  Object.prototype.hasOwnProperty.call(this.context.labelSet, x) || this.throwError(d.Messages.UnknownLabel, _.name), m = _;
                }
                return this.consumeSemicolon(), m === null && !this.context.inIteration && !this.context.inSwitch && this.throwError(d.Messages.IllegalBreak), this.finalize(c, new h.BreakStatement(m));
              }, v.prototype.parseReturnStatement = function() {
                this.context.inFunctionBody || this.tolerateError(d.Messages.IllegalReturn);
                var c = this.createNode();
                this.expectKeyword("return");
                var m = !this.match(";") && !this.match("}") && !this.hasLineTerminator && this.lookahead.type !== 2 || this.lookahead.type === 8 || this.lookahead.type === 10, _ = m ? this.parseExpression() : null;
                return this.consumeSemicolon(), this.finalize(c, new h.ReturnStatement(_));
              }, v.prototype.parseWithStatement = function() {
                this.context.strict && this.tolerateError(d.Messages.StrictModeWith);
                var c = this.createNode(), m;
                this.expectKeyword("with"), this.expect("(");
                var _ = this.parseExpression();
                return !this.match(")") && this.config.tolerant ? (this.tolerateUnexpectedToken(this.nextToken()), m = this.finalize(this.createNode(), new h.EmptyStatement())) : (this.expect(")"), m = this.parseStatement()), this.finalize(c, new h.WithStatement(_, m));
              }, v.prototype.parseSwitchCase = function() {
                var c = this.createNode(), m;
                this.matchKeyword("default") ? (this.nextToken(), m = null) : (this.expectKeyword("case"), m = this.parseExpression()), this.expect(":");
                for (var _ = []; !(this.match("}") || this.matchKeyword("default") || this.matchKeyword("case")); ) _.push(this.parseStatementListItem());
                return this.finalize(c, new h.SwitchCase(m, _));
              }, v.prototype.parseSwitchStatement = function() {
                var c = this.createNode();
                this.expectKeyword("switch"), this.expect("(");
                var m = this.parseExpression();
                this.expect(")");
                var _ = this.context.inSwitch;
                this.context.inSwitch = true;
                var x = [], S = false;
                for (this.expect("{"); !this.match("}"); ) {
                  var E = this.parseSwitchCase();
                  E.test === null && (S && this.throwError(d.Messages.MultipleDefaultsInSwitch), S = true), x.push(E);
                }
                return this.expect("}"), this.context.inSwitch = _, this.finalize(c, new h.SwitchStatement(m, x));
              }, v.prototype.parseLabelledStatement = function() {
                var c = this.createNode(), m = this.parseExpression(), _;
                if (m.type === o.Syntax.Identifier && this.match(":")) {
                  this.nextToken();
                  var x = m, S = "$" + x.name;
                  Object.prototype.hasOwnProperty.call(this.context.labelSet, S) && this.throwError(d.Messages.Redeclaration, "Label", x.name), this.context.labelSet[S] = true;
                  var E = void 0;
                  if (this.matchKeyword("class")) this.tolerateUnexpectedToken(this.lookahead), E = this.parseClassDeclaration();
                  else if (this.matchKeyword("function")) {
                    var w = this.lookahead, C = this.parseFunctionDeclaration();
                    this.context.strict ? this.tolerateUnexpectedToken(w, d.Messages.StrictFunction) : C.generator && this.tolerateUnexpectedToken(w, d.Messages.GeneratorInLegacyContext), E = C;
                  } else E = this.parseStatement();
                  delete this.context.labelSet[S], _ = new h.LabeledStatement(x, E);
                } else this.consumeSemicolon(), _ = new h.ExpressionStatement(m);
                return this.finalize(c, _);
              }, v.prototype.parseThrowStatement = function() {
                var c = this.createNode();
                this.expectKeyword("throw"), this.hasLineTerminator && this.throwError(d.Messages.NewlineAfterThrow);
                var m = this.parseExpression();
                return this.consumeSemicolon(), this.finalize(c, new h.ThrowStatement(m));
              }, v.prototype.parseCatchClause = function() {
                var c = this.createNode();
                this.expectKeyword("catch"), this.expect("("), this.match(")") && this.throwUnexpectedToken(this.lookahead);
                for (var m = [], _ = this.parsePattern(m), x = {}, S = 0; S < m.length; S++) {
                  var E = "$" + m[S].value;
                  Object.prototype.hasOwnProperty.call(x, E) && this.tolerateError(d.Messages.DuplicateBinding, m[S].value), x[E] = true;
                }
                this.context.strict && _.type === o.Syntax.Identifier && this.scanner.isRestrictedWord(_.name) && this.tolerateError(d.Messages.StrictCatchVariable), this.expect(")");
                var w = this.parseBlock();
                return this.finalize(c, new h.CatchClause(_, w));
              }, v.prototype.parseFinallyClause = function() {
                return this.expectKeyword("finally"), this.parseBlock();
              }, v.prototype.parseTryStatement = function() {
                var c = this.createNode();
                this.expectKeyword("try");
                var m = this.parseBlock(), _ = this.matchKeyword("catch") ? this.parseCatchClause() : null, x = this.matchKeyword("finally") ? this.parseFinallyClause() : null;
                return !_ && !x && this.throwError(d.Messages.NoCatchOrFinally), this.finalize(c, new h.TryStatement(m, _, x));
              }, v.prototype.parseDebuggerStatement = function() {
                var c = this.createNode();
                return this.expectKeyword("debugger"), this.consumeSemicolon(), this.finalize(c, new h.DebuggerStatement());
              }, v.prototype.parseStatement = function() {
                var c;
                switch (this.lookahead.type) {
                  case 1:
                  case 5:
                  case 6:
                  case 8:
                  case 10:
                  case 9:
                    c = this.parseExpressionStatement();
                    break;
                  case 7:
                    var m = this.lookahead.value;
                    m === "{" ? c = this.parseBlock() : m === "(" ? c = this.parseExpressionStatement() : m === ";" ? c = this.parseEmptyStatement() : c = this.parseExpressionStatement();
                    break;
                  case 3:
                    c = this.matchAsyncFunction() ? this.parseFunctionDeclaration() : this.parseLabelledStatement();
                    break;
                  case 4:
                    switch (this.lookahead.value) {
                      case "break":
                        c = this.parseBreakStatement();
                        break;
                      case "continue":
                        c = this.parseContinueStatement();
                        break;
                      case "debugger":
                        c = this.parseDebuggerStatement();
                        break;
                      case "do":
                        c = this.parseDoWhileStatement();
                        break;
                      case "for":
                        c = this.parseForStatement();
                        break;
                      case "function":
                        c = this.parseFunctionDeclaration();
                        break;
                      case "if":
                        c = this.parseIfStatement();
                        break;
                      case "return":
                        c = this.parseReturnStatement();
                        break;
                      case "switch":
                        c = this.parseSwitchStatement();
                        break;
                      case "throw":
                        c = this.parseThrowStatement();
                        break;
                      case "try":
                        c = this.parseTryStatement();
                        break;
                      case "var":
                        c = this.parseVariableStatement();
                        break;
                      case "while":
                        c = this.parseWhileStatement();
                        break;
                      case "with":
                        c = this.parseWithStatement();
                        break;
                      default:
                        c = this.parseExpressionStatement();
                        break;
                    }
                    break;
                  default:
                    c = this.throwUnexpectedToken(this.lookahead);
                }
                return c;
              }, v.prototype.parseFunctionSourceElements = function() {
                var c = this.createNode();
                this.expect("{");
                var m = this.parseDirectivePrologues(), _ = this.context.labelSet, x = this.context.inIteration, S = this.context.inSwitch, E = this.context.inFunctionBody;
                for (this.context.labelSet = {}, this.context.inIteration = false, this.context.inSwitch = false, this.context.inFunctionBody = true; this.lookahead.type !== 2 && !this.match("}"); ) m.push(this.parseStatementListItem());
                return this.expect("}"), this.context.labelSet = _, this.context.inIteration = x, this.context.inSwitch = S, this.context.inFunctionBody = E, this.finalize(c, new h.BlockStatement(m));
              }, v.prototype.validateParam = function(c, m, _) {
                var x = "$" + _;
                this.context.strict ? (this.scanner.isRestrictedWord(_) && (c.stricted = m, c.message = d.Messages.StrictParamName), Object.prototype.hasOwnProperty.call(c.paramSet, x) && (c.stricted = m, c.message = d.Messages.StrictParamDupe)) : c.firstRestricted || (this.scanner.isRestrictedWord(_) ? (c.firstRestricted = m, c.message = d.Messages.StrictParamName) : this.scanner.isStrictModeReservedWord(_) ? (c.firstRestricted = m, c.message = d.Messages.StrictReservedWord) : Object.prototype.hasOwnProperty.call(c.paramSet, x) && (c.stricted = m, c.message = d.Messages.StrictParamDupe)), typeof Object.defineProperty == "function" ? Object.defineProperty(c.paramSet, x, {
                  value: true,
                  enumerable: true,
                  writable: true,
                  configurable: true
                }) : c.paramSet[x] = true;
              }, v.prototype.parseRestElement = function(c) {
                var m = this.createNode();
                this.expect("...");
                var _ = this.parsePattern(c);
                return this.match("=") && this.throwError(d.Messages.DefaultRestParameter), this.match(")") || this.throwError(d.Messages.ParameterAfterRestParameter), this.finalize(m, new h.RestElement(_));
              }, v.prototype.parseFormalParameter = function(c) {
                for (var m = [], _ = this.match("...") ? this.parseRestElement(m) : this.parsePatternWithDefault(m), x = 0; x < m.length; x++) this.validateParam(c, m[x], m[x].value);
                c.simple = c.simple && _ instanceof h.Identifier, c.params.push(_);
              }, v.prototype.parseFormalParameters = function(c) {
                var m;
                if (m = {
                  simple: true,
                  params: [],
                  firstRestricted: c
                }, this.expect("("), !this.match(")")) for (m.paramSet = {}; this.lookahead.type !== 2 && (this.parseFormalParameter(m), !(this.match(")") || (this.expect(","), this.match(")")))); ) ;
                return this.expect(")"), {
                  simple: m.simple,
                  params: m.params,
                  stricted: m.stricted,
                  firstRestricted: m.firstRestricted,
                  message: m.message
                };
              }, v.prototype.matchAsyncFunction = function() {
                var c = this.matchContextualKeyword("async");
                if (c) {
                  var m = this.scanner.saveState();
                  this.scanner.scanComments();
                  var _ = this.scanner.lex();
                  this.scanner.restoreState(m), c = m.lineNumber === _.lineNumber && _.type === 4 && _.value === "function";
                }
                return c;
              }, v.prototype.parseFunctionDeclaration = function(c) {
                var m = this.createNode(), _ = this.matchContextualKeyword("async");
                _ && this.nextToken(), this.expectKeyword("function");
                var x = _ ? false : this.match("*");
                x && this.nextToken();
                var S, E = null, w = null;
                if (!c || !this.match("(")) {
                  var C = this.lookahead;
                  E = this.parseVariableIdentifier(), this.context.strict ? this.scanner.isRestrictedWord(C.value) && this.tolerateUnexpectedToken(C, d.Messages.StrictFunctionName) : this.scanner.isRestrictedWord(C.value) ? (w = C, S = d.Messages.StrictFunctionName) : this.scanner.isStrictModeReservedWord(C.value) && (w = C, S = d.Messages.StrictReservedWord);
                }
                var D = this.context.await, A = this.context.allowYield;
                this.context.await = _, this.context.allowYield = !x;
                var F = this.parseFormalParameters(w), B = F.params, N = F.stricted;
                w = F.firstRestricted, F.message && (S = F.message);
                var I = this.context.strict, O = this.context.allowStrictDirective;
                this.context.allowStrictDirective = F.simple;
                var L = this.parseFunctionSourceElements();
                return this.context.strict && w && this.throwUnexpectedToken(w, S), this.context.strict && N && this.tolerateUnexpectedToken(N, S), this.context.strict = I, this.context.allowStrictDirective = O, this.context.await = D, this.context.allowYield = A, _ ? this.finalize(m, new h.AsyncFunctionDeclaration(E, B, L)) : this.finalize(m, new h.FunctionDeclaration(E, B, L, x));
              }, v.prototype.parseFunctionExpression = function() {
                var c = this.createNode(), m = this.matchContextualKeyword("async");
                m && this.nextToken(), this.expectKeyword("function");
                var _ = m ? false : this.match("*");
                _ && this.nextToken();
                var x, S = null, E, w = this.context.await, C = this.context.allowYield;
                if (this.context.await = m, this.context.allowYield = !_, !this.match("(")) {
                  var D = this.lookahead;
                  S = !this.context.strict && !_ && this.matchKeyword("yield") ? this.parseIdentifierName() : this.parseVariableIdentifier(), this.context.strict ? this.scanner.isRestrictedWord(D.value) && this.tolerateUnexpectedToken(D, d.Messages.StrictFunctionName) : this.scanner.isRestrictedWord(D.value) ? (E = D, x = d.Messages.StrictFunctionName) : this.scanner.isStrictModeReservedWord(D.value) && (E = D, x = d.Messages.StrictReservedWord);
                }
                var A = this.parseFormalParameters(E), F = A.params, B = A.stricted;
                E = A.firstRestricted, A.message && (x = A.message);
                var N = this.context.strict, I = this.context.allowStrictDirective;
                this.context.allowStrictDirective = A.simple;
                var O = this.parseFunctionSourceElements();
                return this.context.strict && E && this.throwUnexpectedToken(E, x), this.context.strict && B && this.tolerateUnexpectedToken(B, x), this.context.strict = N, this.context.allowStrictDirective = I, this.context.await = w, this.context.allowYield = C, m ? this.finalize(c, new h.AsyncFunctionExpression(S, F, O)) : this.finalize(c, new h.FunctionExpression(S, F, O, _));
              }, v.prototype.parseDirective = function() {
                var c = this.lookahead, m = this.createNode(), _ = this.parseExpression(), x = _.type === o.Syntax.Literal ? this.getTokenRaw(c).slice(1, -1) : null;
                return this.consumeSemicolon(), this.finalize(m, x ? new h.Directive(_, x) : new h.ExpressionStatement(_));
              }, v.prototype.parseDirectivePrologues = function() {
                for (var c = null, m = []; ; ) {
                  var _ = this.lookahead;
                  if (_.type !== 8) break;
                  var x = this.parseDirective();
                  m.push(x);
                  var S = x.directive;
                  if (typeof S != "string") break;
                  S === "use strict" ? (this.context.strict = true, c && this.tolerateUnexpectedToken(c, d.Messages.StrictOctalLiteral), this.context.allowStrictDirective || this.tolerateUnexpectedToken(_, d.Messages.IllegalLanguageModeDirective)) : !c && _.octal && (c = _);
                }
                return m;
              }, v.prototype.qualifiedPropertyName = function(c) {
                switch (c.type) {
                  case 3:
                  case 8:
                  case 1:
                  case 5:
                  case 6:
                  case 4:
                    return true;
                  case 7:
                    return c.value === "[";
                }
                return false;
              }, v.prototype.parseGetterMethod = function() {
                var c = this.createNode(), m = false, _ = this.context.allowYield;
                this.context.allowYield = true;
                var x = this.parseFormalParameters();
                x.params.length > 0 && this.tolerateError(d.Messages.BadGetterArity);
                var S = this.parsePropertyMethod(x);
                return this.context.allowYield = _, this.finalize(c, new h.FunctionExpression(null, x.params, S, m));
              }, v.prototype.parseSetterMethod = function() {
                var c = this.createNode(), m = false, _ = this.context.allowYield;
                this.context.allowYield = true;
                var x = this.parseFormalParameters();
                x.params.length !== 1 ? this.tolerateError(d.Messages.BadSetterArity) : x.params[0] instanceof h.RestElement && this.tolerateError(d.Messages.BadSetterRestParameter);
                var S = this.parsePropertyMethod(x);
                return this.context.allowYield = _, this.finalize(c, new h.FunctionExpression(null, x.params, S, m));
              }, v.prototype.parseGeneratorMethod = function() {
                var c = this.createNode(), m = true, _ = this.context.allowYield;
                this.context.allowYield = true;
                var x = this.parseFormalParameters();
                this.context.allowYield = false;
                var S = this.parsePropertyMethod(x);
                return this.context.allowYield = _, this.finalize(c, new h.FunctionExpression(null, x.params, S, m));
              }, v.prototype.isStartOfExpression = function() {
                var c = true, m = this.lookahead.value;
                switch (this.lookahead.type) {
                  case 7:
                    c = m === "[" || m === "(" || m === "{" || m === "+" || m === "-" || m === "!" || m === "~" || m === "++" || m === "--" || m === "/" || m === "/=";
                    break;
                  case 4:
                    c = m === "class" || m === "delete" || m === "function" || m === "let" || m === "new" || m === "super" || m === "this" || m === "typeof" || m === "void" || m === "yield";
                    break;
                }
                return c;
              }, v.prototype.parseYieldExpression = function() {
                var c = this.createNode();
                this.expectKeyword("yield");
                var m = null, _ = false;
                if (!this.hasLineTerminator) {
                  var x = this.context.allowYield;
                  this.context.allowYield = false, _ = this.match("*"), _ ? (this.nextToken(), m = this.parseAssignmentExpression()) : this.isStartOfExpression() && (m = this.parseAssignmentExpression()), this.context.allowYield = x;
                }
                return this.finalize(c, new h.YieldExpression(m, _));
              }, v.prototype.parseClassElement = function(c) {
                var m = this.lookahead, _ = this.createNode(), x = "", S = null, E = null, w = false, C = false, D = false, A = false;
                if (this.match("*")) this.nextToken();
                else {
                  w = this.match("["), S = this.parseObjectPropertyKey();
                  var F = S;
                  if (F.name === "static" && (this.qualifiedPropertyName(this.lookahead) || this.match("*")) && (m = this.lookahead, D = true, w = this.match("["), this.match("*") ? this.nextToken() : S = this.parseObjectPropertyKey()), m.type === 3 && !this.hasLineTerminator && m.value === "async") {
                    var B = this.lookahead.value;
                    B !== ":" && B !== "(" && B !== "*" && (A = true, m = this.lookahead, S = this.parseObjectPropertyKey(), m.type === 3 && m.value === "constructor" && this.tolerateUnexpectedToken(m, d.Messages.ConstructorIsAsync));
                  }
                }
                var N = this.qualifiedPropertyName(this.lookahead);
                return m.type === 3 ? m.value === "get" && N ? (x = "get", w = this.match("["), S = this.parseObjectPropertyKey(), this.context.allowYield = false, E = this.parseGetterMethod()) : m.value === "set" && N && (x = "set", w = this.match("["), S = this.parseObjectPropertyKey(), E = this.parseSetterMethod()) : m.type === 7 && m.value === "*" && N && (x = "init", w = this.match("["), S = this.parseObjectPropertyKey(), E = this.parseGeneratorMethod(), C = true), !x && S && this.match("(") && (x = "init", E = A ? this.parsePropertyMethodAsyncFunction() : this.parsePropertyMethodFunction(), C = true), x || this.throwUnexpectedToken(this.lookahead), x === "init" && (x = "method"), w || (D && this.isPropertyKey(S, "prototype") && this.throwUnexpectedToken(m, d.Messages.StaticPrototype), !D && this.isPropertyKey(S, "constructor") && ((x !== "method" || !C || E && E.generator) && this.throwUnexpectedToken(m, d.Messages.ConstructorSpecialMethod), c.value ? this.throwUnexpectedToken(m, d.Messages.DuplicateConstructor) : c.value = true, x = "constructor")), this.finalize(_, new h.MethodDefinition(S, w, E, x, D));
              }, v.prototype.parseClassElementList = function() {
                var c = [], m = {
                  value: false
                };
                for (this.expect("{"); !this.match("}"); ) this.match(";") ? this.nextToken() : c.push(this.parseClassElement(m));
                return this.expect("}"), c;
              }, v.prototype.parseClassBody = function() {
                var c = this.createNode(), m = this.parseClassElementList();
                return this.finalize(c, new h.ClassBody(m));
              }, v.prototype.parseClassDeclaration = function(c) {
                var m = this.createNode(), _ = this.context.strict;
                this.context.strict = true, this.expectKeyword("class");
                var x = c && this.lookahead.type !== 3 ? null : this.parseVariableIdentifier(), S = null;
                this.matchKeyword("extends") && (this.nextToken(), S = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall));
                var E = this.parseClassBody();
                return this.context.strict = _, this.finalize(m, new h.ClassDeclaration(x, S, E));
              }, v.prototype.parseClassExpression = function() {
                var c = this.createNode(), m = this.context.strict;
                this.context.strict = true, this.expectKeyword("class");
                var _ = this.lookahead.type === 3 ? this.parseVariableIdentifier() : null, x = null;
                this.matchKeyword("extends") && (this.nextToken(), x = this.isolateCoverGrammar(this.parseLeftHandSideExpressionAllowCall));
                var S = this.parseClassBody();
                return this.context.strict = m, this.finalize(c, new h.ClassExpression(_, x, S));
              }, v.prototype.parseModule = function() {
                this.context.strict = true, this.context.isModule = true, this.scanner.isModule = true;
                for (var c = this.createNode(), m = this.parseDirectivePrologues(); this.lookahead.type !== 2; ) m.push(this.parseStatementListItem());
                return this.finalize(c, new h.Module(m));
              }, v.prototype.parseScript = function() {
                for (var c = this.createNode(), m = this.parseDirectivePrologues(); this.lookahead.type !== 2; ) m.push(this.parseStatementListItem());
                return this.finalize(c, new h.Script(m));
              }, v.prototype.parseModuleSpecifier = function() {
                var c = this.createNode();
                this.lookahead.type !== 8 && this.throwError(d.Messages.InvalidModuleSpecifier);
                var m = this.nextToken(), _ = this.getTokenRaw(m);
                return this.finalize(c, new h.Literal(m.value, _));
              }, v.prototype.parseImportSpecifier = function() {
                var c = this.createNode(), m, _;
                return this.lookahead.type === 3 ? (m = this.parseVariableIdentifier(), _ = m, this.matchContextualKeyword("as") && (this.nextToken(), _ = this.parseVariableIdentifier())) : (m = this.parseIdentifierName(), _ = m, this.matchContextualKeyword("as") ? (this.nextToken(), _ = this.parseVariableIdentifier()) : this.throwUnexpectedToken(this.nextToken())), this.finalize(c, new h.ImportSpecifier(_, m));
              }, v.prototype.parseNamedImports = function() {
                this.expect("{");
                for (var c = []; !this.match("}"); ) c.push(this.parseImportSpecifier()), this.match("}") || this.expect(",");
                return this.expect("}"), c;
              }, v.prototype.parseImportDefaultSpecifier = function() {
                var c = this.createNode(), m = this.parseIdentifierName();
                return this.finalize(c, new h.ImportDefaultSpecifier(m));
              }, v.prototype.parseImportNamespaceSpecifier = function() {
                var c = this.createNode();
                this.expect("*"), this.matchContextualKeyword("as") || this.throwError(d.Messages.NoAsAfterImportNamespace), this.nextToken();
                var m = this.parseIdentifierName();
                return this.finalize(c, new h.ImportNamespaceSpecifier(m));
              }, v.prototype.parseImportDeclaration = function() {
                this.context.inFunctionBody && this.throwError(d.Messages.IllegalImportDeclaration);
                var c = this.createNode();
                this.expectKeyword("import");
                var m, _ = [];
                if (this.lookahead.type === 8) m = this.parseModuleSpecifier();
                else {
                  if (this.match("{") ? _ = _.concat(this.parseNamedImports()) : this.match("*") ? _.push(this.parseImportNamespaceSpecifier()) : this.isIdentifierName(this.lookahead) && !this.matchKeyword("default") ? (_.push(this.parseImportDefaultSpecifier()), this.match(",") && (this.nextToken(), this.match("*") ? _.push(this.parseImportNamespaceSpecifier()) : this.match("{") ? _ = _.concat(this.parseNamedImports()) : this.throwUnexpectedToken(this.lookahead))) : this.throwUnexpectedToken(this.nextToken()), !this.matchContextualKeyword("from")) {
                    var x = this.lookahead.value ? d.Messages.UnexpectedToken : d.Messages.MissingFromClause;
                    this.throwError(x, this.lookahead.value);
                  }
                  this.nextToken(), m = this.parseModuleSpecifier();
                }
                return this.consumeSemicolon(), this.finalize(c, new h.ImportDeclaration(_, m));
              }, v.prototype.parseExportSpecifier = function() {
                var c = this.createNode(), m = this.parseIdentifierName(), _ = m;
                return this.matchContextualKeyword("as") && (this.nextToken(), _ = this.parseIdentifierName()), this.finalize(c, new h.ExportSpecifier(m, _));
              }, v.prototype.parseExportDeclaration = function() {
                this.context.inFunctionBody && this.throwError(d.Messages.IllegalExportDeclaration);
                var c = this.createNode();
                this.expectKeyword("export");
                var m;
                if (this.matchKeyword("default")) if (this.nextToken(), this.matchKeyword("function")) {
                  var _ = this.parseFunctionDeclaration(true);
                  m = this.finalize(c, new h.ExportDefaultDeclaration(_));
                } else if (this.matchKeyword("class")) {
                  var _ = this.parseClassDeclaration(true);
                  m = this.finalize(c, new h.ExportDefaultDeclaration(_));
                } else if (this.matchContextualKeyword("async")) {
                  var _ = this.matchAsyncFunction() ? this.parseFunctionDeclaration(true) : this.parseAssignmentExpression();
                  m = this.finalize(c, new h.ExportDefaultDeclaration(_));
                } else {
                  this.matchContextualKeyword("from") && this.throwError(d.Messages.UnexpectedToken, this.lookahead.value);
                  var _ = this.match("{") ? this.parseObjectInitializer() : this.match("[") ? this.parseArrayInitializer() : this.parseAssignmentExpression();
                  this.consumeSemicolon(), m = this.finalize(c, new h.ExportDefaultDeclaration(_));
                }
                else if (this.match("*")) {
                  if (this.nextToken(), !this.matchContextualKeyword("from")) {
                    var x = this.lookahead.value ? d.Messages.UnexpectedToken : d.Messages.MissingFromClause;
                    this.throwError(x, this.lookahead.value);
                  }
                  this.nextToken();
                  var S = this.parseModuleSpecifier();
                  this.consumeSemicolon(), m = this.finalize(c, new h.ExportAllDeclaration(S));
                } else if (this.lookahead.type === 4) {
                  var _ = void 0;
                  switch (this.lookahead.value) {
                    case "let":
                    case "const":
                      _ = this.parseLexicalDeclaration({
                        inFor: false
                      });
                      break;
                    case "var":
                    case "class":
                    case "function":
                      _ = this.parseStatementListItem();
                      break;
                    default:
                      this.throwUnexpectedToken(this.lookahead);
                  }
                  m = this.finalize(c, new h.ExportNamedDeclaration(_, [], null));
                } else if (this.matchAsyncFunction()) {
                  var _ = this.parseFunctionDeclaration();
                  m = this.finalize(c, new h.ExportNamedDeclaration(_, [], null));
                } else {
                  var E = [], w = null, C = false;
                  for (this.expect("{"); !this.match("}"); ) C = C || this.matchKeyword("default"), E.push(this.parseExportSpecifier()), this.match("}") || this.expect(",");
                  if (this.expect("}"), this.matchContextualKeyword("from")) this.nextToken(), w = this.parseModuleSpecifier(), this.consumeSemicolon();
                  else if (C) {
                    var x = this.lookahead.value ? d.Messages.UnexpectedToken : d.Messages.MissingFromClause;
                    this.throwError(x, this.lookahead.value);
                  } else this.consumeSemicolon();
                  m = this.finalize(c, new h.ExportNamedDeclaration(null, E, w));
                }
                return m;
              }, v;
            }();
            n.Parser = g;
          },
          function(r, n) {
            Object.defineProperty(n, "__esModule", {
              value: true
            });
            function l(s, u) {
              if (!s) throw new Error("ASSERT: " + u);
            }
            n.assert = l;
          },
          function(r, n) {
            Object.defineProperty(n, "__esModule", {
              value: true
            });
            var l = function() {
              function s() {
                this.errors = [], this.tolerant = false;
              }
              return s.prototype.recordError = function(u) {
                this.errors.push(u);
              }, s.prototype.tolerate = function(u) {
                if (this.tolerant) this.recordError(u);
                else throw u;
              }, s.prototype.constructError = function(u, d) {
                var h = new Error(u);
                try {
                  throw h;
                } catch (f) {
                  Object.create && Object.defineProperty && (h = Object.create(f), Object.defineProperty(h, "column", {
                    value: d
                  }));
                }
                return h;
              }, s.prototype.createError = function(u, d, h, f) {
                var o = "Line " + d + ": " + f, p = this.constructError(o, h);
                return p.index = u, p.lineNumber = d, p.description = f, p;
              }, s.prototype.throwError = function(u, d, h, f) {
                throw this.createError(u, d, h, f);
              }, s.prototype.tolerateError = function(u, d, h, f) {
                var o = this.createError(u, d, h, f);
                if (this.tolerant) this.recordError(o);
                else throw o;
              }, s;
            }();
            n.ErrorHandler = l;
          },
          function(r, n) {
            Object.defineProperty(n, "__esModule", {
              value: true
            }), n.Messages = {
              BadGetterArity: "Getter must not have any formal parameters",
              BadSetterArity: "Setter must have exactly one formal parameter",
              BadSetterRestParameter: "Setter function argument must not be a rest parameter",
              ConstructorIsAsync: "Class constructor may not be an async method",
              ConstructorSpecialMethod: "Class constructor may not be an accessor",
              DeclarationMissingInitializer: "Missing initializer in %0 declaration",
              DefaultRestParameter: "Unexpected token =",
              DuplicateBinding: "Duplicate binding %0",
              DuplicateConstructor: "A class may only have one constructor",
              DuplicateProtoProperty: "Duplicate __proto__ fields are not allowed in object literals",
              ForInOfLoopInitializer: "%0 loop variable declaration may not have an initializer",
              GeneratorInLegacyContext: "Generator declarations are not allowed in legacy contexts",
              IllegalBreak: "Illegal break statement",
              IllegalContinue: "Illegal continue statement",
              IllegalExportDeclaration: "Unexpected token",
              IllegalImportDeclaration: "Unexpected token",
              IllegalLanguageModeDirective: "Illegal 'use strict' directive in function with non-simple parameter list",
              IllegalReturn: "Illegal return statement",
              InvalidEscapedReservedWord: "Keyword must not contain escaped characters",
              InvalidHexEscapeSequence: "Invalid hexadecimal escape sequence",
              InvalidLHSInAssignment: "Invalid left-hand side in assignment",
              InvalidLHSInForIn: "Invalid left-hand side in for-in",
              InvalidLHSInForLoop: "Invalid left-hand side in for-loop",
              InvalidModuleSpecifier: "Unexpected token",
              InvalidRegExp: "Invalid regular expression",
              LetInLexicalBinding: "let is disallowed as a lexically bound name",
              MissingFromClause: "Unexpected token",
              MultipleDefaultsInSwitch: "More than one default clause in switch statement",
              NewlineAfterThrow: "Illegal newline after throw",
              NoAsAfterImportNamespace: "Unexpected token",
              NoCatchOrFinally: "Missing catch or finally after try",
              ParameterAfterRestParameter: "Rest parameter must be last formal parameter",
              Redeclaration: "%0 '%1' has already been declared",
              StaticPrototype: "Classes may not have static property named prototype",
              StrictCatchVariable: "Catch variable may not be eval or arguments in strict mode",
              StrictDelete: "Delete of an unqualified identifier in strict mode.",
              StrictFunction: "In strict mode code, functions can only be declared at top level or inside a block",
              StrictFunctionName: "Function name may not be eval or arguments in strict mode",
              StrictLHSAssignment: "Assignment to eval or arguments is not allowed in strict mode",
              StrictLHSPostfix: "Postfix increment/decrement may not have eval or arguments operand in strict mode",
              StrictLHSPrefix: "Prefix increment/decrement may not have eval or arguments operand in strict mode",
              StrictModeWith: "Strict mode code may not include a with statement",
              StrictOctalLiteral: "Octal literals are not allowed in strict mode.",
              StrictParamDupe: "Strict mode function may not have duplicate parameter names",
              StrictParamName: "Parameter name eval or arguments is not allowed in strict mode",
              StrictReservedWord: "Use of future reserved word in strict mode",
              StrictVarName: "Variable name may not be eval or arguments in strict mode",
              TemplateOctalLiteral: "Octal literals are not allowed in template strings.",
              UnexpectedEOS: "Unexpected end of input",
              UnexpectedIdentifier: "Unexpected identifier",
              UnexpectedNumber: "Unexpected number",
              UnexpectedReserved: "Unexpected reserved word",
              UnexpectedString: "Unexpected string",
              UnexpectedTemplate: "Unexpected quasi %0",
              UnexpectedToken: "Unexpected token %0",
              UnexpectedTokenIllegal: "Unexpected token ILLEGAL",
              UnknownLabel: "Undefined label '%0'",
              UnterminatedRegExp: "Invalid regular expression: missing /"
            };
          },
          function(r, n, l) {
            Object.defineProperty(n, "__esModule", {
              value: true
            });
            var s = l(9), u = l(4), d = l(11);
            function h(p) {
              return "0123456789abcdef".indexOf(p.toLowerCase());
            }
            function f(p) {
              return "01234567".indexOf(p);
            }
            var o = function() {
              function p(y, g) {
                this.source = y, this.errorHandler = g, this.trackComment = false, this.isModule = false, this.length = y.length, this.index = 0, this.lineNumber = y.length > 0 ? 1 : 0, this.lineStart = 0, this.curlyStack = [];
              }
              return p.prototype.saveState = function() {
                return {
                  index: this.index,
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart
                };
              }, p.prototype.restoreState = function(y) {
                this.index = y.index, this.lineNumber = y.lineNumber, this.lineStart = y.lineStart;
              }, p.prototype.eof = function() {
                return this.index >= this.length;
              }, p.prototype.throwUnexpectedToken = function(y) {
                return y === void 0 && (y = d.Messages.UnexpectedTokenIllegal), this.errorHandler.throwError(this.index, this.lineNumber, this.index - this.lineStart + 1, y);
              }, p.prototype.tolerateUnexpectedToken = function(y) {
                y === void 0 && (y = d.Messages.UnexpectedTokenIllegal), this.errorHandler.tolerateError(this.index, this.lineNumber, this.index - this.lineStart + 1, y);
              }, p.prototype.skipSingleLineComment = function(y) {
                var g = [], v, c;
                for (this.trackComment && (g = [], v = this.index - y, c = {
                  start: {
                    line: this.lineNumber,
                    column: this.index - this.lineStart - y
                  },
                  end: {}
                }); !this.eof(); ) {
                  var m = this.source.charCodeAt(this.index);
                  if (++this.index, u.Character.isLineTerminator(m)) {
                    if (this.trackComment) {
                      c.end = {
                        line: this.lineNumber,
                        column: this.index - this.lineStart - 1
                      };
                      var _ = {
                        multiLine: false,
                        slice: [
                          v + y,
                          this.index - 1
                        ],
                        range: [
                          v,
                          this.index - 1
                        ],
                        loc: c
                      };
                      g.push(_);
                    }
                    return m === 13 && this.source.charCodeAt(this.index) === 10 && ++this.index, ++this.lineNumber, this.lineStart = this.index, g;
                  }
                }
                if (this.trackComment) {
                  c.end = {
                    line: this.lineNumber,
                    column: this.index - this.lineStart
                  };
                  var _ = {
                    multiLine: false,
                    slice: [
                      v + y,
                      this.index
                    ],
                    range: [
                      v,
                      this.index
                    ],
                    loc: c
                  };
                  g.push(_);
                }
                return g;
              }, p.prototype.skipMultiLineComment = function() {
                var y = [], g, v;
                for (this.trackComment && (y = [], g = this.index - 2, v = {
                  start: {
                    line: this.lineNumber,
                    column: this.index - this.lineStart - 2
                  },
                  end: {}
                }); !this.eof(); ) {
                  var c = this.source.charCodeAt(this.index);
                  if (u.Character.isLineTerminator(c)) c === 13 && this.source.charCodeAt(this.index + 1) === 10 && ++this.index, ++this.lineNumber, ++this.index, this.lineStart = this.index;
                  else if (c === 42) {
                    if (this.source.charCodeAt(this.index + 1) === 47) {
                      if (this.index += 2, this.trackComment) {
                        v.end = {
                          line: this.lineNumber,
                          column: this.index - this.lineStart
                        };
                        var m = {
                          multiLine: true,
                          slice: [
                            g + 2,
                            this.index - 2
                          ],
                          range: [
                            g,
                            this.index
                          ],
                          loc: v
                        };
                        y.push(m);
                      }
                      return y;
                    }
                    ++this.index;
                  } else ++this.index;
                }
                if (this.trackComment) {
                  v.end = {
                    line: this.lineNumber,
                    column: this.index - this.lineStart
                  };
                  var m = {
                    multiLine: true,
                    slice: [
                      g + 2,
                      this.index
                    ],
                    range: [
                      g,
                      this.index
                    ],
                    loc: v
                  };
                  y.push(m);
                }
                return this.tolerateUnexpectedToken(), y;
              }, p.prototype.scanComments = function() {
                var y;
                this.trackComment && (y = []);
                for (var g = this.index === 0; !this.eof(); ) {
                  var v = this.source.charCodeAt(this.index);
                  if (u.Character.isWhiteSpace(v)) ++this.index;
                  else if (u.Character.isLineTerminator(v)) ++this.index, v === 13 && this.source.charCodeAt(this.index) === 10 && ++this.index, ++this.lineNumber, this.lineStart = this.index, g = true;
                  else if (v === 47) if (v = this.source.charCodeAt(this.index + 1), v === 47) {
                    this.index += 2;
                    var c = this.skipSingleLineComment(2);
                    this.trackComment && (y = y.concat(c)), g = true;
                  } else if (v === 42) {
                    this.index += 2;
                    var c = this.skipMultiLineComment();
                    this.trackComment && (y = y.concat(c));
                  } else break;
                  else if (g && v === 45) if (this.source.charCodeAt(this.index + 1) === 45 && this.source.charCodeAt(this.index + 2) === 62) {
                    this.index += 3;
                    var c = this.skipSingleLineComment(3);
                    this.trackComment && (y = y.concat(c));
                  } else break;
                  else if (v === 60 && !this.isModule) if (this.source.slice(this.index + 1, this.index + 4) === "!--") {
                    this.index += 4;
                    var c = this.skipSingleLineComment(4);
                    this.trackComment && (y = y.concat(c));
                  } else break;
                  else break;
                }
                return y;
              }, p.prototype.isFutureReservedWord = function(y) {
                switch (y) {
                  case "enum":
                  case "export":
                  case "import":
                  case "super":
                    return true;
                  default:
                    return false;
                }
              }, p.prototype.isStrictModeReservedWord = function(y) {
                switch (y) {
                  case "implements":
                  case "interface":
                  case "package":
                  case "private":
                  case "protected":
                  case "public":
                  case "static":
                  case "yield":
                  case "let":
                    return true;
                  default:
                    return false;
                }
              }, p.prototype.isRestrictedWord = function(y) {
                return y === "eval" || y === "arguments";
              }, p.prototype.isKeyword = function(y) {
                switch (y.length) {
                  case 2:
                    return y === "if" || y === "in" || y === "do";
                  case 3:
                    return y === "var" || y === "for" || y === "new" || y === "try" || y === "let";
                  case 4:
                    return y === "this" || y === "else" || y === "case" || y === "void" || y === "with" || y === "enum";
                  case 5:
                    return y === "while" || y === "break" || y === "catch" || y === "throw" || y === "const" || y === "yield" || y === "class" || y === "super";
                  case 6:
                    return y === "return" || y === "typeof" || y === "delete" || y === "switch" || y === "export" || y === "import";
                  case 7:
                    return y === "default" || y === "finally" || y === "extends";
                  case 8:
                    return y === "function" || y === "continue" || y === "debugger";
                  case 10:
                    return y === "instanceof";
                  default:
                    return false;
                }
              }, p.prototype.codePointAt = function(y) {
                var g = this.source.charCodeAt(y);
                if (g >= 55296 && g <= 56319) {
                  var v = this.source.charCodeAt(y + 1);
                  if (v >= 56320 && v <= 57343) {
                    var c = g;
                    g = (c - 55296) * 1024 + v - 56320 + 65536;
                  }
                }
                return g;
              }, p.prototype.scanHexEscape = function(y) {
                for (var g = y === "u" ? 4 : 2, v = 0, c = 0; c < g; ++c) if (!this.eof() && u.Character.isHexDigit(this.source.charCodeAt(this.index))) v = v * 16 + h(this.source[this.index++]);
                else return null;
                return String.fromCharCode(v);
              }, p.prototype.scanUnicodeCodePointEscape = function() {
                var y = this.source[this.index], g = 0;
                for (y === "}" && this.throwUnexpectedToken(); !this.eof() && (y = this.source[this.index++], !!u.Character.isHexDigit(y.charCodeAt(0))); ) g = g * 16 + h(y);
                return (g > 1114111 || y !== "}") && this.throwUnexpectedToken(), u.Character.fromCodePoint(g);
              }, p.prototype.getIdentifier = function() {
                for (var y = this.index++; !this.eof(); ) {
                  var g = this.source.charCodeAt(this.index);
                  if (g === 92) return this.index = y, this.getComplexIdentifier();
                  if (g >= 55296 && g < 57343) return this.index = y, this.getComplexIdentifier();
                  if (u.Character.isIdentifierPart(g)) ++this.index;
                  else break;
                }
                return this.source.slice(y, this.index);
              }, p.prototype.getComplexIdentifier = function() {
                var y = this.codePointAt(this.index), g = u.Character.fromCodePoint(y);
                this.index += g.length;
                var v;
                for (y === 92 && (this.source.charCodeAt(this.index) !== 117 && this.throwUnexpectedToken(), ++this.index, this.source[this.index] === "{" ? (++this.index, v = this.scanUnicodeCodePointEscape()) : (v = this.scanHexEscape("u"), (v === null || v === "\\" || !u.Character.isIdentifierStart(v.charCodeAt(0))) && this.throwUnexpectedToken()), g = v); !this.eof() && (y = this.codePointAt(this.index), !!u.Character.isIdentifierPart(y)); ) v = u.Character.fromCodePoint(y), g += v, this.index += v.length, y === 92 && (g = g.substr(0, g.length - 1), this.source.charCodeAt(this.index) !== 117 && this.throwUnexpectedToken(), ++this.index, this.source[this.index] === "{" ? (++this.index, v = this.scanUnicodeCodePointEscape()) : (v = this.scanHexEscape("u"), (v === null || v === "\\" || !u.Character.isIdentifierPart(v.charCodeAt(0))) && this.throwUnexpectedToken()), g += v);
                return g;
              }, p.prototype.octalToDecimal = function(y) {
                var g = y !== "0", v = f(y);
                return !this.eof() && u.Character.isOctalDigit(this.source.charCodeAt(this.index)) && (g = true, v = v * 8 + f(this.source[this.index++]), "0123".indexOf(y) >= 0 && !this.eof() && u.Character.isOctalDigit(this.source.charCodeAt(this.index)) && (v = v * 8 + f(this.source[this.index++]))), {
                  code: v,
                  octal: g
                };
              }, p.prototype.scanIdentifier = function() {
                var y, g = this.index, v = this.source.charCodeAt(g) === 92 ? this.getComplexIdentifier() : this.getIdentifier();
                if (v.length === 1 ? y = 3 : this.isKeyword(v) ? y = 4 : v === "null" ? y = 5 : v === "true" || v === "false" ? y = 1 : y = 3, y !== 3 && g + v.length !== this.index) {
                  var c = this.index;
                  this.index = g, this.tolerateUnexpectedToken(d.Messages.InvalidEscapedReservedWord), this.index = c;
                }
                return {
                  type: y,
                  value: v,
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart,
                  start: g,
                  end: this.index
                };
              }, p.prototype.scanPunctuator = function() {
                var y = this.index, g = this.source[this.index];
                switch (g) {
                  case "(":
                  case "{":
                    g === "{" && this.curlyStack.push("{"), ++this.index;
                    break;
                  case ".":
                    ++this.index, this.source[this.index] === "." && this.source[this.index + 1] === "." && (this.index += 2, g = "...");
                    break;
                  case "}":
                    ++this.index, this.curlyStack.pop();
                    break;
                  case ")":
                  case ";":
                  case ",":
                  case "[":
                  case "]":
                  case ":":
                  case "?":
                  case "~":
                    ++this.index;
                    break;
                  default:
                    g = this.source.substr(this.index, 4), g === ">>>=" ? this.index += 4 : (g = g.substr(0, 3), g === "===" || g === "!==" || g === ">>>" || g === "<<=" || g === ">>=" || g === "**=" ? this.index += 3 : (g = g.substr(0, 2), g === "&&" || g === "||" || g === "==" || g === "!=" || g === "+=" || g === "-=" || g === "*=" || g === "/=" || g === "++" || g === "--" || g === "<<" || g === ">>" || g === "&=" || g === "|=" || g === "^=" || g === "%=" || g === "<=" || g === ">=" || g === "=>" || g === "**" ? this.index += 2 : (g = this.source[this.index], "<>=!+-*%&|^/".indexOf(g) >= 0 && ++this.index)));
                }
                return this.index === y && this.throwUnexpectedToken(), {
                  type: 7,
                  value: g,
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart,
                  start: y,
                  end: this.index
                };
              }, p.prototype.scanHexLiteral = function(y) {
                for (var g = ""; !this.eof() && u.Character.isHexDigit(this.source.charCodeAt(this.index)); ) g += this.source[this.index++];
                return g.length === 0 && this.throwUnexpectedToken(), u.Character.isIdentifierStart(this.source.charCodeAt(this.index)) && this.throwUnexpectedToken(), {
                  type: 6,
                  value: parseInt("0x" + g, 16),
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart,
                  start: y,
                  end: this.index
                };
              }, p.prototype.scanBinaryLiteral = function(y) {
                for (var g = "", v; !this.eof() && (v = this.source[this.index], !(v !== "0" && v !== "1")); ) g += this.source[this.index++];
                return g.length === 0 && this.throwUnexpectedToken(), this.eof() || (v = this.source.charCodeAt(this.index), (u.Character.isIdentifierStart(v) || u.Character.isDecimalDigit(v)) && this.throwUnexpectedToken()), {
                  type: 6,
                  value: parseInt(g, 2),
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart,
                  start: y,
                  end: this.index
                };
              }, p.prototype.scanOctalLiteral = function(y, g) {
                var v = "", c = false;
                for (u.Character.isOctalDigit(y.charCodeAt(0)) ? (c = true, v = "0" + this.source[this.index++]) : ++this.index; !this.eof() && u.Character.isOctalDigit(this.source.charCodeAt(this.index)); ) v += this.source[this.index++];
                return !c && v.length === 0 && this.throwUnexpectedToken(), (u.Character.isIdentifierStart(this.source.charCodeAt(this.index)) || u.Character.isDecimalDigit(this.source.charCodeAt(this.index))) && this.throwUnexpectedToken(), {
                  type: 6,
                  value: parseInt(v, 8),
                  octal: c,
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart,
                  start: g,
                  end: this.index
                };
              }, p.prototype.isImplicitOctalLiteral = function() {
                for (var y = this.index + 1; y < this.length; ++y) {
                  var g = this.source[y];
                  if (g === "8" || g === "9") return false;
                  if (!u.Character.isOctalDigit(g.charCodeAt(0))) return true;
                }
                return true;
              }, p.prototype.scanNumericLiteral = function() {
                var y = this.index, g = this.source[y];
                s.assert(u.Character.isDecimalDigit(g.charCodeAt(0)) || g === ".", "Numeric literal must start with a decimal digit or a decimal point");
                var v = "";
                if (g !== ".") {
                  if (v = this.source[this.index++], g = this.source[this.index], v === "0") {
                    if (g === "x" || g === "X") return ++this.index, this.scanHexLiteral(y);
                    if (g === "b" || g === "B") return ++this.index, this.scanBinaryLiteral(y);
                    if (g === "o" || g === "O") return this.scanOctalLiteral(g, y);
                    if (g && u.Character.isOctalDigit(g.charCodeAt(0)) && this.isImplicitOctalLiteral()) return this.scanOctalLiteral(g, y);
                  }
                  for (; u.Character.isDecimalDigit(this.source.charCodeAt(this.index)); ) v += this.source[this.index++];
                  g = this.source[this.index];
                }
                if (g === ".") {
                  for (v += this.source[this.index++]; u.Character.isDecimalDigit(this.source.charCodeAt(this.index)); ) v += this.source[this.index++];
                  g = this.source[this.index];
                }
                if (g === "e" || g === "E") if (v += this.source[this.index++], g = this.source[this.index], (g === "+" || g === "-") && (v += this.source[this.index++]), u.Character.isDecimalDigit(this.source.charCodeAt(this.index))) for (; u.Character.isDecimalDigit(this.source.charCodeAt(this.index)); ) v += this.source[this.index++];
                else this.throwUnexpectedToken();
                return u.Character.isIdentifierStart(this.source.charCodeAt(this.index)) && this.throwUnexpectedToken(), {
                  type: 6,
                  value: parseFloat(v),
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart,
                  start: y,
                  end: this.index
                };
              }, p.prototype.scanStringLiteral = function() {
                var y = this.index, g = this.source[y];
                s.assert(g === "'" || g === '"', "String literal must starts with a quote"), ++this.index;
                for (var v = false, c = ""; !this.eof(); ) {
                  var m = this.source[this.index++];
                  if (m === g) {
                    g = "";
                    break;
                  } else if (m === "\\") if (m = this.source[this.index++], !m || !u.Character.isLineTerminator(m.charCodeAt(0))) switch (m) {
                    case "u":
                      if (this.source[this.index] === "{") ++this.index, c += this.scanUnicodeCodePointEscape();
                      else {
                        var _ = this.scanHexEscape(m);
                        _ === null && this.throwUnexpectedToken(), c += _;
                      }
                      break;
                    case "x":
                      var x = this.scanHexEscape(m);
                      x === null && this.throwUnexpectedToken(d.Messages.InvalidHexEscapeSequence), c += x;
                      break;
                    case "n":
                      c += `
`;
                      break;
                    case "r":
                      c += "\r";
                      break;
                    case "t":
                      c += "	";
                      break;
                    case "b":
                      c += "\b";
                      break;
                    case "f":
                      c += "\f";
                      break;
                    case "v":
                      c += "\v";
                      break;
                    case "8":
                    case "9":
                      c += m, this.tolerateUnexpectedToken();
                      break;
                    default:
                      if (m && u.Character.isOctalDigit(m.charCodeAt(0))) {
                        var S = this.octalToDecimal(m);
                        v = S.octal || v, c += String.fromCharCode(S.code);
                      } else c += m;
                      break;
                  }
                  else ++this.lineNumber, m === "\r" && this.source[this.index] === `
` && ++this.index, this.lineStart = this.index;
                  else {
                    if (u.Character.isLineTerminator(m.charCodeAt(0))) break;
                    c += m;
                  }
                }
                return g !== "" && (this.index = y, this.throwUnexpectedToken()), {
                  type: 8,
                  value: c,
                  octal: v,
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart,
                  start: y,
                  end: this.index
                };
              }, p.prototype.scanTemplate = function() {
                var y = "", g = false, v = this.index, c = this.source[v] === "`", m = false, _ = 2;
                for (++this.index; !this.eof(); ) {
                  var x = this.source[this.index++];
                  if (x === "`") {
                    _ = 1, m = true, g = true;
                    break;
                  } else if (x === "$") {
                    if (this.source[this.index] === "{") {
                      this.curlyStack.push("${"), ++this.index, g = true;
                      break;
                    }
                    y += x;
                  } else if (x === "\\") if (x = this.source[this.index++], u.Character.isLineTerminator(x.charCodeAt(0))) ++this.lineNumber, x === "\r" && this.source[this.index] === `
` && ++this.index, this.lineStart = this.index;
                  else switch (x) {
                    case "n":
                      y += `
`;
                      break;
                    case "r":
                      y += "\r";
                      break;
                    case "t":
                      y += "	";
                      break;
                    case "u":
                      if (this.source[this.index] === "{") ++this.index, y += this.scanUnicodeCodePointEscape();
                      else {
                        var S = this.index, E = this.scanHexEscape(x);
                        E !== null ? y += E : (this.index = S, y += x);
                      }
                      break;
                    case "x":
                      var w = this.scanHexEscape(x);
                      w === null && this.throwUnexpectedToken(d.Messages.InvalidHexEscapeSequence), y += w;
                      break;
                    case "b":
                      y += "\b";
                      break;
                    case "f":
                      y += "\f";
                      break;
                    case "v":
                      y += "\v";
                      break;
                    default:
                      x === "0" ? (u.Character.isDecimalDigit(this.source.charCodeAt(this.index)) && this.throwUnexpectedToken(d.Messages.TemplateOctalLiteral), y += "\0") : u.Character.isOctalDigit(x.charCodeAt(0)) ? this.throwUnexpectedToken(d.Messages.TemplateOctalLiteral) : y += x;
                      break;
                  }
                  else u.Character.isLineTerminator(x.charCodeAt(0)) ? (++this.lineNumber, x === "\r" && this.source[this.index] === `
` && ++this.index, this.lineStart = this.index, y += `
`) : y += x;
                }
                return g || this.throwUnexpectedToken(), c || this.curlyStack.pop(), {
                  type: 10,
                  value: this.source.slice(v + 1, this.index - _),
                  cooked: y,
                  head: c,
                  tail: m,
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart,
                  start: v,
                  end: this.index
                };
              }, p.prototype.testRegExp = function(y, g) {
                var v = "\uFFFF", c = y, m = this;
                g.indexOf("u") >= 0 && (c = c.replace(/\\u\{([0-9a-fA-F]+)\}|\\u([a-fA-F0-9]{4})/g, function(_, x, S) {
                  var E = parseInt(x || S, 16);
                  return E > 1114111 && m.throwUnexpectedToken(d.Messages.InvalidRegExp), E <= 65535 ? String.fromCharCode(E) : v;
                }).replace(/[\uD800-\uDBFF][\uDC00-\uDFFF]/g, v));
                try {
                  RegExp(c);
                } catch {
                  this.throwUnexpectedToken(d.Messages.InvalidRegExp);
                }
                try {
                  return new RegExp(y, g);
                } catch {
                  return null;
                }
              }, p.prototype.scanRegExpBody = function() {
                var y = this.source[this.index];
                s.assert(y === "/", "Regular expression literal must start with a slash");
                for (var g = this.source[this.index++], v = false, c = false; !this.eof(); ) if (y = this.source[this.index++], g += y, y === "\\") y = this.source[this.index++], u.Character.isLineTerminator(y.charCodeAt(0)) && this.throwUnexpectedToken(d.Messages.UnterminatedRegExp), g += y;
                else if (u.Character.isLineTerminator(y.charCodeAt(0))) this.throwUnexpectedToken(d.Messages.UnterminatedRegExp);
                else if (v) y === "]" && (v = false);
                else if (y === "/") {
                  c = true;
                  break;
                } else y === "[" && (v = true);
                return c || this.throwUnexpectedToken(d.Messages.UnterminatedRegExp), g.substr(1, g.length - 2);
              }, p.prototype.scanRegExpFlags = function() {
                for (var y = "", g = ""; !this.eof(); ) {
                  var v = this.source[this.index];
                  if (!u.Character.isIdentifierPart(v.charCodeAt(0))) break;
                  if (++this.index, v === "\\" && !this.eof()) if (v = this.source[this.index], v === "u") {
                    ++this.index;
                    var c = this.index, m = this.scanHexEscape("u");
                    if (m !== null) for (g += m, y += "\\u"; c < this.index; ++c) y += this.source[c];
                    else this.index = c, g += "u", y += "\\u";
                    this.tolerateUnexpectedToken();
                  } else y += "\\", this.tolerateUnexpectedToken();
                  else g += v, y += v;
                }
                return g;
              }, p.prototype.scanRegExp = function() {
                var y = this.index, g = this.scanRegExpBody(), v = this.scanRegExpFlags(), c = this.testRegExp(g, v);
                return {
                  type: 9,
                  value: "",
                  pattern: g,
                  flags: v,
                  regex: c,
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart,
                  start: y,
                  end: this.index
                };
              }, p.prototype.lex = function() {
                if (this.eof()) return {
                  type: 2,
                  value: "",
                  lineNumber: this.lineNumber,
                  lineStart: this.lineStart,
                  start: this.index,
                  end: this.index
                };
                var y = this.source.charCodeAt(this.index);
                return u.Character.isIdentifierStart(y) ? this.scanIdentifier() : y === 40 || y === 41 || y === 59 ? this.scanPunctuator() : y === 39 || y === 34 ? this.scanStringLiteral() : y === 46 ? u.Character.isDecimalDigit(this.source.charCodeAt(this.index + 1)) ? this.scanNumericLiteral() : this.scanPunctuator() : u.Character.isDecimalDigit(y) ? this.scanNumericLiteral() : y === 96 || y === 125 && this.curlyStack[this.curlyStack.length - 1] === "${" ? this.scanTemplate() : y >= 55296 && y < 57343 && u.Character.isIdentifierStart(this.codePointAt(this.index)) ? this.scanIdentifier() : this.scanPunctuator();
              }, p;
            }();
            n.Scanner = o;
          },
          function(r, n) {
            Object.defineProperty(n, "__esModule", {
              value: true
            }), n.TokenName = {}, n.TokenName[1] = "Boolean", n.TokenName[2] = "<end>", n.TokenName[3] = "Identifier", n.TokenName[4] = "Keyword", n.TokenName[5] = "Null", n.TokenName[6] = "Numeric", n.TokenName[7] = "Punctuator", n.TokenName[8] = "String", n.TokenName[9] = "RegularExpression", n.TokenName[10] = "Template";
          },
          function(r, n) {
            Object.defineProperty(n, "__esModule", {
              value: true
            }), n.XHTMLEntities = {
              quot: '"',
              amp: "&",
              apos: "'",
              gt: ">",
              nbsp: "\xA0",
              iexcl: "\xA1",
              cent: "\xA2",
              pound: "\xA3",
              curren: "\xA4",
              yen: "\xA5",
              brvbar: "\xA6",
              sect: "\xA7",
              uml: "\xA8",
              copy: "\xA9",
              ordf: "\xAA",
              laquo: "\xAB",
              not: "\xAC",
              shy: "\xAD",
              reg: "\xAE",
              macr: "\xAF",
              deg: "\xB0",
              plusmn: "\xB1",
              sup2: "\xB2",
              sup3: "\xB3",
              acute: "\xB4",
              micro: "\xB5",
              para: "\xB6",
              middot: "\xB7",
              cedil: "\xB8",
              sup1: "\xB9",
              ordm: "\xBA",
              raquo: "\xBB",
              frac14: "\xBC",
              frac12: "\xBD",
              frac34: "\xBE",
              iquest: "\xBF",
              Agrave: "\xC0",
              Aacute: "\xC1",
              Acirc: "\xC2",
              Atilde: "\xC3",
              Auml: "\xC4",
              Aring: "\xC5",
              AElig: "\xC6",
              Ccedil: "\xC7",
              Egrave: "\xC8",
              Eacute: "\xC9",
              Ecirc: "\xCA",
              Euml: "\xCB",
              Igrave: "\xCC",
              Iacute: "\xCD",
              Icirc: "\xCE",
              Iuml: "\xCF",
              ETH: "\xD0",
              Ntilde: "\xD1",
              Ograve: "\xD2",
              Oacute: "\xD3",
              Ocirc: "\xD4",
              Otilde: "\xD5",
              Ouml: "\xD6",
              times: "\xD7",
              Oslash: "\xD8",
              Ugrave: "\xD9",
              Uacute: "\xDA",
              Ucirc: "\xDB",
              Uuml: "\xDC",
              Yacute: "\xDD",
              THORN: "\xDE",
              szlig: "\xDF",
              agrave: "\xE0",
              aacute: "\xE1",
              acirc: "\xE2",
              atilde: "\xE3",
              auml: "\xE4",
              aring: "\xE5",
              aelig: "\xE6",
              ccedil: "\xE7",
              egrave: "\xE8",
              eacute: "\xE9",
              ecirc: "\xEA",
              euml: "\xEB",
              igrave: "\xEC",
              iacute: "\xED",
              icirc: "\xEE",
              iuml: "\xEF",
              eth: "\xF0",
              ntilde: "\xF1",
              ograve: "\xF2",
              oacute: "\xF3",
              ocirc: "\xF4",
              otilde: "\xF5",
              ouml: "\xF6",
              divide: "\xF7",
              oslash: "\xF8",
              ugrave: "\xF9",
              uacute: "\xFA",
              ucirc: "\xFB",
              uuml: "\xFC",
              yacute: "\xFD",
              thorn: "\xFE",
              yuml: "\xFF",
              OElig: "\u0152",
              oelig: "\u0153",
              Scaron: "\u0160",
              scaron: "\u0161",
              Yuml: "\u0178",
              fnof: "\u0192",
              circ: "\u02C6",
              tilde: "\u02DC",
              Alpha: "\u0391",
              Beta: "\u0392",
              Gamma: "\u0393",
              Delta: "\u0394",
              Epsilon: "\u0395",
              Zeta: "\u0396",
              Eta: "\u0397",
              Theta: "\u0398",
              Iota: "\u0399",
              Kappa: "\u039A",
              Lambda: "\u039B",
              Mu: "\u039C",
              Nu: "\u039D",
              Xi: "\u039E",
              Omicron: "\u039F",
              Pi: "\u03A0",
              Rho: "\u03A1",
              Sigma: "\u03A3",
              Tau: "\u03A4",
              Upsilon: "\u03A5",
              Phi: "\u03A6",
              Chi: "\u03A7",
              Psi: "\u03A8",
              Omega: "\u03A9",
              alpha: "\u03B1",
              beta: "\u03B2",
              gamma: "\u03B3",
              delta: "\u03B4",
              epsilon: "\u03B5",
              zeta: "\u03B6",
              eta: "\u03B7",
              theta: "\u03B8",
              iota: "\u03B9",
              kappa: "\u03BA",
              lambda: "\u03BB",
              mu: "\u03BC",
              nu: "\u03BD",
              xi: "\u03BE",
              omicron: "\u03BF",
              pi: "\u03C0",
              rho: "\u03C1",
              sigmaf: "\u03C2",
              sigma: "\u03C3",
              tau: "\u03C4",
              upsilon: "\u03C5",
              phi: "\u03C6",
              chi: "\u03C7",
              psi: "\u03C8",
              omega: "\u03C9",
              thetasym: "\u03D1",
              upsih: "\u03D2",
              piv: "\u03D6",
              ensp: "\u2002",
              emsp: "\u2003",
              thinsp: "\u2009",
              zwnj: "\u200C",
              zwj: "\u200D",
              lrm: "\u200E",
              rlm: "\u200F",
              ndash: "\u2013",
              mdash: "\u2014",
              lsquo: "\u2018",
              rsquo: "\u2019",
              sbquo: "\u201A",
              ldquo: "\u201C",
              rdquo: "\u201D",
              bdquo: "\u201E",
              dagger: "\u2020",
              Dagger: "\u2021",
              bull: "\u2022",
              hellip: "\u2026",
              permil: "\u2030",
              prime: "\u2032",
              Prime: "\u2033",
              lsaquo: "\u2039",
              rsaquo: "\u203A",
              oline: "\u203E",
              frasl: "\u2044",
              euro: "\u20AC",
              image: "\u2111",
              weierp: "\u2118",
              real: "\u211C",
              trade: "\u2122",
              alefsym: "\u2135",
              larr: "\u2190",
              uarr: "\u2191",
              rarr: "\u2192",
              darr: "\u2193",
              harr: "\u2194",
              crarr: "\u21B5",
              lArr: "\u21D0",
              uArr: "\u21D1",
              rArr: "\u21D2",
              dArr: "\u21D3",
              hArr: "\u21D4",
              forall: "\u2200",
              part: "\u2202",
              exist: "\u2203",
              empty: "\u2205",
              nabla: "\u2207",
              isin: "\u2208",
              notin: "\u2209",
              ni: "\u220B",
              prod: "\u220F",
              sum: "\u2211",
              minus: "\u2212",
              lowast: "\u2217",
              radic: "\u221A",
              prop: "\u221D",
              infin: "\u221E",
              ang: "\u2220",
              and: "\u2227",
              or: "\u2228",
              cap: "\u2229",
              cup: "\u222A",
              int: "\u222B",
              there4: "\u2234",
              sim: "\u223C",
              cong: "\u2245",
              asymp: "\u2248",
              ne: "\u2260",
              equiv: "\u2261",
              le: "\u2264",
              ge: "\u2265",
              sub: "\u2282",
              sup: "\u2283",
              nsub: "\u2284",
              sube: "\u2286",
              supe: "\u2287",
              oplus: "\u2295",
              otimes: "\u2297",
              perp: "\u22A5",
              sdot: "\u22C5",
              lceil: "\u2308",
              rceil: "\u2309",
              lfloor: "\u230A",
              rfloor: "\u230B",
              loz: "\u25CA",
              spades: "\u2660",
              clubs: "\u2663",
              hearts: "\u2665",
              diams: "\u2666",
              lang: "\u27E8",
              rang: "\u27E9"
            };
          },
          function(r, n, l) {
            Object.defineProperty(n, "__esModule", {
              value: true
            });
            var s = l(10), u = l(12), d = l(13), h = function() {
              function o() {
                this.values = [], this.curly = this.paren = -1;
              }
              return o.prototype.beforeFunctionExpression = function(p) {
                return [
                  "(",
                  "{",
                  "[",
                  "in",
                  "typeof",
                  "instanceof",
                  "new",
                  "return",
                  "case",
                  "delete",
                  "throw",
                  "void",
                  "=",
                  "+=",
                  "-=",
                  "*=",
                  "**=",
                  "/=",
                  "%=",
                  "<<=",
                  ">>=",
                  ">>>=",
                  "&=",
                  "|=",
                  "^=",
                  ",",
                  "+",
                  "-",
                  "*",
                  "**",
                  "/",
                  "%",
                  "++",
                  "--",
                  "<<",
                  ">>",
                  ">>>",
                  "&",
                  "|",
                  "^",
                  "!",
                  "~",
                  "&&",
                  "||",
                  "?",
                  ":",
                  "===",
                  "==",
                  ">=",
                  "<=",
                  "<",
                  ">",
                  "!=",
                  "!=="
                ].indexOf(p) >= 0;
              }, o.prototype.isRegexStart = function() {
                var p = this.values[this.values.length - 1], y = p !== null;
                switch (p) {
                  case "this":
                  case "]":
                    y = false;
                    break;
                  case ")":
                    var g = this.values[this.paren - 1];
                    y = g === "if" || g === "while" || g === "for" || g === "with";
                    break;
                  case "}":
                    if (y = false, this.values[this.curly - 3] === "function") {
                      var v = this.values[this.curly - 4];
                      y = v ? !this.beforeFunctionExpression(v) : false;
                    } else if (this.values[this.curly - 4] === "function") {
                      var v = this.values[this.curly - 5];
                      y = v ? !this.beforeFunctionExpression(v) : true;
                    }
                    break;
                }
                return y;
              }, o.prototype.push = function(p) {
                p.type === 7 || p.type === 4 ? (p.value === "{" ? this.curly = this.values.length : p.value === "(" && (this.paren = this.values.length), this.values.push(p.value)) : this.values.push(null);
              }, o;
            }(), f = function() {
              function o(p, y) {
                this.errorHandler = new s.ErrorHandler(), this.errorHandler.tolerant = y ? typeof y.tolerant == "boolean" && y.tolerant : false, this.scanner = new u.Scanner(p, this.errorHandler), this.scanner.trackComment = y ? typeof y.comment == "boolean" && y.comment : false, this.trackRange = y ? typeof y.range == "boolean" && y.range : false, this.trackLoc = y ? typeof y.loc == "boolean" && y.loc : false, this.buffer = [], this.reader = new h();
              }
              return o.prototype.errors = function() {
                return this.errorHandler.errors;
              }, o.prototype.getNextToken = function() {
                if (this.buffer.length === 0) {
                  var p = this.scanner.scanComments();
                  if (this.scanner.trackComment) for (var y = 0; y < p.length; ++y) {
                    var g = p[y], v = this.scanner.source.slice(g.slice[0], g.slice[1]), c = {
                      type: g.multiLine ? "BlockComment" : "LineComment",
                      value: v
                    };
                    this.trackRange && (c.range = g.range), this.trackLoc && (c.loc = g.loc), this.buffer.push(c);
                  }
                  if (!this.scanner.eof()) {
                    var m = void 0;
                    this.trackLoc && (m = {
                      start: {
                        line: this.scanner.lineNumber,
                        column: this.scanner.index - this.scanner.lineStart
                      },
                      end: {}
                    });
                    var _ = this.scanner.source[this.scanner.index] === "/" && this.reader.isRegexStart(), x = _ ? this.scanner.scanRegExp() : this.scanner.lex();
                    this.reader.push(x);
                    var S = {
                      type: d.TokenName[x.type],
                      value: this.scanner.source.slice(x.start, x.end)
                    };
                    if (this.trackRange && (S.range = [
                      x.start,
                      x.end
                    ]), this.trackLoc && (m.end = {
                      line: this.scanner.lineNumber,
                      column: this.scanner.index - this.scanner.lineStart
                    }, S.loc = m), x.type === 9) {
                      var E = x.pattern, w = x.flags;
                      S.regex = {
                        pattern: E,
                        flags: w
                      };
                    }
                    this.buffer.push(S);
                  }
                }
                return this.buffer.shift();
              }, o;
            }();
            n.Tokenizer = f;
          }
        ]);
      });
    }(esprima)), esprima.exports;
  }
  var hasRequiredEsprima;
  function requireEsprima() {
    if (hasRequiredEsprima) return esprima$1;
    hasRequiredEsprima = 1, Object.defineProperty(esprima$1, "__esModule", {
      value: true
    }), esprima$1.parse = void 0;
    var e = requireUtil();
    function t(r, n) {
      var l = [], s = requireEsprima$1().parse(r, {
        loc: true,
        locations: true,
        comment: true,
        onComment: l,
        range: (0, e.getOption)(n, "range", false),
        tolerant: (0, e.getOption)(n, "tolerant", true),
        tokens: true,
        jsx: (0, e.getOption)(n, "jsx", false),
        sourceType: (0, e.getOption)(n, "sourceType", "module")
      });
      return Array.isArray(s.comments) || (s.comments = l), s;
    }
    return esprima$1.parse = t, esprima$1;
  }
  var hasRequiredOptions;
  function requireOptions() {
    if (hasRequiredOptions) return options;
    hasRequiredOptions = 1, Object.defineProperty(options, "__esModule", {
      value: true
    }), options.normalize = void 0;
    var e = requireUtil(), t = {
      parser: requireEsprima(),
      tabWidth: 4,
      useTabs: false,
      reuseWhitespace: true,
      lineTerminator: (0, e.getLineTerminator)(),
      wrapColumn: 74,
      sourceFileName: null,
      sourceMapName: null,
      sourceRoot: null,
      inputSourceMap: null,
      range: false,
      tolerant: true,
      quote: null,
      trailingComma: false,
      arrayBracketSpacing: false,
      objectCurlySpacing: true,
      arrowParensAlways: false,
      flowObjectCommas: true,
      tokens: true
    }, r = t.hasOwnProperty;
    function n(l) {
      var s = l || t;
      function u(d) {
        return r.call(s, d) ? s[d] : t[d];
      }
      return {
        tabWidth: +u("tabWidth"),
        useTabs: !!u("useTabs"),
        reuseWhitespace: !!u("reuseWhitespace"),
        lineTerminator: u("lineTerminator"),
        wrapColumn: Math.max(u("wrapColumn"), 0),
        sourceFileName: u("sourceFileName"),
        sourceMapName: u("sourceMapName"),
        sourceRoot: u("sourceRoot"),
        inputSourceMap: u("inputSourceMap"),
        parser: u("esprima") || u("parser"),
        range: u("range"),
        tolerant: u("tolerant"),
        quote: u("quote"),
        trailingComma: u("trailingComma"),
        arrayBracketSpacing: u("arrayBracketSpacing"),
        objectCurlySpacing: u("objectCurlySpacing"),
        arrowParensAlways: u("arrowParensAlways"),
        flowObjectCommas: u("flowObjectCommas"),
        tokens: !!u("tokens")
      };
    }
    return options.normalize = n, options;
  }
  var lines = {}, mapping = {}, hasRequiredMapping;
  function requireMapping() {
    if (hasRequiredMapping) return mapping;
    hasRequiredMapping = 1, Object.defineProperty(mapping, "__esModule", {
      value: true
    });
    var e = require$$0, t = e.__importDefault(requireTinyInvariant_cjs()), r = requireUtil(), n = function() {
      function d(h, f, o) {
        o === void 0 && (o = f), this.sourceLines = h, this.sourceLoc = f, this.targetLoc = o;
      }
      return d.prototype.slice = function(h, f, o) {
        o === void 0 && (o = h.lastPos());
        var p = this.sourceLines, y = this.sourceLoc, g = this.targetLoc;
        function v(c) {
          var m = y[c], _ = g[c], x = f;
          return c === "end" ? x = o : (0, t.default)(c === "start"), u(p, m, h, _, x);
        }
        if ((0, r.comparePos)(f, g.start) <= 0) if ((0, r.comparePos)(g.end, o) <= 0) g = {
          start: s(g.start, f.line, f.column),
          end: s(g.end, f.line, f.column)
        };
        else {
          if ((0, r.comparePos)(o, g.start) <= 0) return null;
          y = {
            start: y.start,
            end: v("end")
          }, g = {
            start: s(g.start, f.line, f.column),
            end: s(o, f.line, f.column)
          };
        }
        else {
          if ((0, r.comparePos)(g.end, f) <= 0) return null;
          (0, r.comparePos)(g.end, o) <= 0 ? (y = {
            start: v("start"),
            end: y.end
          }, g = {
            start: {
              line: 1,
              column: 0
            },
            end: s(g.end, f.line, f.column)
          }) : (y = {
            start: v("start"),
            end: v("end")
          }, g = {
            start: {
              line: 1,
              column: 0
            },
            end: s(o, f.line, f.column)
          });
        }
        return new d(this.sourceLines, y, g);
      }, d.prototype.add = function(h, f) {
        return new d(this.sourceLines, this.sourceLoc, {
          start: l(this.targetLoc.start, h, f),
          end: l(this.targetLoc.end, h, f)
        });
      }, d.prototype.subtract = function(h, f) {
        return new d(this.sourceLines, this.sourceLoc, {
          start: s(this.targetLoc.start, h, f),
          end: s(this.targetLoc.end, h, f)
        });
      }, d.prototype.indent = function(h, f, o) {
        if (f === void 0 && (f = false), o === void 0 && (o = false), h === 0) return this;
        var p = this.targetLoc, y = p.start.line, g = p.end.line;
        if (f && y === 1 && g === 1) return this;
        if (p = {
          start: p.start,
          end: p.end
        }, !f || y > 1) {
          var v = p.start.column + h;
          p.start = {
            line: y,
            column: o ? Math.max(0, v) : v
          };
        }
        if (!f || g > 1) {
          var c = p.end.column + h;
          p.end = {
            line: g,
            column: o ? Math.max(0, c) : c
          };
        }
        return new d(this.sourceLines, this.sourceLoc, p);
      }, d;
    }();
    mapping.default = n;
    function l(d, h, f) {
      return {
        line: d.line + h - 1,
        column: d.line === 1 ? d.column + f : d.column
      };
    }
    function s(d, h, f) {
      return {
        line: d.line - h + 1,
        column: d.line === h ? d.column - f : d.column
      };
    }
    function u(d, h, f, o, p) {
      var y = (0, r.comparePos)(o, p);
      if (y === 0) return h;
      var g, v;
      if (y < 0) {
        g = d.skipSpaces(h) || d.lastPos(), v = f.skipSpaces(o) || f.lastPos();
        var c = p.line - v.line;
        for (g.line += c, v.line += c, c > 0 ? (g.column = 0, v.column = 0) : (0, t.default)(c === 0); (0, r.comparePos)(v, p) < 0 && f.nextPos(v, true); ) (0, t.default)(d.nextPos(g, true)), (0, t.default)(d.charAt(g) === f.charAt(v));
      } else {
        g = d.skipSpaces(h, true) || d.firstPos(), v = f.skipSpaces(o, true) || f.firstPos();
        var c = p.line - v.line;
        for (g.line += c, v.line += c, c < 0 ? (g.column = d.getLineLength(g.line), v.column = f.getLineLength(v.line)) : (0, t.default)(c === 0); (0, r.comparePos)(p, v) < 0 && f.prevPos(v, true); ) (0, t.default)(d.prevPos(g, true)), (0, t.default)(d.charAt(g) === f.charAt(v));
      }
      return g;
    }
    return mapping;
  }
  var hasRequiredLines;
  function requireLines() {
    if (hasRequiredLines) return lines;
    hasRequiredLines = 1, Object.defineProperty(lines, "__esModule", {
      value: true
    }), lines.concat = lines.fromString = lines.countSpaces = lines.Lines = void 0;
    var e = require$$0, t = e.__importDefault(requireTinyInvariant_cjs()), r = e.__importDefault(requireSourceMap()), n = requireOptions(), l = requireUtil(), s = e.__importDefault(requireMapping()), u = function() {
      function x(S, E) {
        E === void 0 && (E = null), this.infos = S, this.mappings = [], this.cachedSourceMap = null, this.cachedTabWidth = void 0, (0, t.default)(S.length > 0), this.length = S.length, this.name = E || null, this.name && this.mappings.push(new s.default(this, {
          start: this.firstPos(),
          end: this.lastPos()
        }));
      }
      return x.prototype.toString = function(S) {
        return this.sliceString(this.firstPos(), this.lastPos(), S);
      }, x.prototype.getSourceMap = function(S, E) {
        if (!S) return null;
        var w = this;
        function C(F) {
          return F = F || {}, F.file = S, E && (F.sourceRoot = E), F;
        }
        if (w.cachedSourceMap) return C(w.cachedSourceMap.toJSON());
        var D = new r.default.SourceMapGenerator(C()), A = {};
        return w.mappings.forEach(function(F) {
          for (var B = F.sourceLines.skipSpaces(F.sourceLoc.start) || F.sourceLines.lastPos(), N = w.skipSpaces(F.targetLoc.start) || w.lastPos(); (0, l.comparePos)(B, F.sourceLoc.end) < 0 && (0, l.comparePos)(N, F.targetLoc.end) < 0; ) {
            var I = F.sourceLines.charAt(B), O = w.charAt(N);
            (0, t.default)(I === O);
            var L = F.sourceLines.name;
            if (D.addMapping({
              source: L,
              original: {
                line: B.line,
                column: B.column
              },
              generated: {
                line: N.line,
                column: N.column
              }
            }), !h.call(A, L)) {
              var q = F.sourceLines.toString();
              D.setSourceContent(L, q), A[L] = q;
            }
            w.nextPos(N, true), F.sourceLines.nextPos(B, true);
          }
        }), w.cachedSourceMap = D, D.toJSON();
      }, x.prototype.bootstrapCharAt = function(S) {
        (0, t.default)(typeof S == "object"), (0, t.default)(typeof S.line == "number"), (0, t.default)(typeof S.column == "number");
        var E = S.line, w = S.column, C = this.toString().split(y), D = C[E - 1];
        return typeof D > "u" ? "" : w === D.length && E < C.length ? `
` : w >= D.length ? "" : D.charAt(w);
      }, x.prototype.charAt = function(S) {
        (0, t.default)(typeof S == "object"), (0, t.default)(typeof S.line == "number"), (0, t.default)(typeof S.column == "number");
        var E = S.line, w = S.column, C = this, D = C.infos, A = D[E - 1], F = w;
        if (typeof A > "u" || F < 0) return "";
        var B = this.getIndentAt(E);
        return F < B ? " " : (F += A.sliceStart - B, F === A.sliceEnd && E < this.length ? `
` : F >= A.sliceEnd ? "" : A.line.charAt(F));
      }, x.prototype.stripMargin = function(S, E) {
        if (S === 0) return this;
        if ((0, t.default)(S > 0, "negative margin: " + S), E && this.length === 1) return this;
        var w = new x(this.infos.map(function(D, A) {
          return D.line && (A > 0 || !E) && (D = e.__assign(e.__assign({}, D), {
            indent: Math.max(0, D.indent - S)
          })), D;
        }));
        if (this.mappings.length > 0) {
          var C = w.mappings;
          (0, t.default)(C.length === 0), this.mappings.forEach(function(D) {
            C.push(D.indent(S, E, true));
          });
        }
        return w;
      }, x.prototype.indent = function(S) {
        if (S === 0) return this;
        var E = new x(this.infos.map(function(C) {
          return C.line && !C.locked && (C = e.__assign(e.__assign({}, C), {
            indent: C.indent + S
          })), C;
        }));
        if (this.mappings.length > 0) {
          var w = E.mappings;
          (0, t.default)(w.length === 0), this.mappings.forEach(function(C) {
            w.push(C.indent(S));
          });
        }
        return E;
      }, x.prototype.indentTail = function(S) {
        if (S === 0) return this;
        if (this.length < 2) return this;
        var E = new x(this.infos.map(function(C, D) {
          return D > 0 && C.line && !C.locked && (C = e.__assign(e.__assign({}, C), {
            indent: C.indent + S
          })), C;
        }));
        if (this.mappings.length > 0) {
          var w = E.mappings;
          (0, t.default)(w.length === 0), this.mappings.forEach(function(C) {
            w.push(C.indent(S, true));
          });
        }
        return E;
      }, x.prototype.lockIndentTail = function() {
        return this.length < 2 ? this : new x(this.infos.map(function(S, E) {
          return e.__assign(e.__assign({}, S), {
            locked: E > 0
          });
        }));
      }, x.prototype.getIndentAt = function(S) {
        return (0, t.default)(S >= 1, "no line " + S + " (line numbers start from 1)"), Math.max(this.infos[S - 1].indent, 0);
      }, x.prototype.guessTabWidth = function() {
        if (typeof this.cachedTabWidth == "number") return this.cachedTabWidth;
        for (var S = [], E = 0, w = 1, C = this.length; w <= C; ++w) {
          var D = this.infos[w - 1], A = D.line.slice(D.sliceStart, D.sliceEnd);
          if (!v(A)) {
            var F = Math.abs(D.indent - E);
            S[F] = ~~S[F] + 1, E = D.indent;
          }
        }
        for (var B = -1, N = 2, I = 1; I < S.length; I += 1) h.call(S, I) && S[I] > B && (B = S[I], N = I);
        return this.cachedTabWidth = N;
      }, x.prototype.startsWithComment = function() {
        if (this.infos.length === 0) return false;
        var S = this.infos[0], E = S.sliceStart, w = S.sliceEnd, C = S.line.slice(E, w).trim();
        return C.length === 0 || C.slice(0, 2) === "//" || C.slice(0, 2) === "/*";
      }, x.prototype.isOnlyWhitespace = function() {
        return v(this.toString());
      }, x.prototype.isPrecededOnlyByWhitespace = function(S) {
        var E = this.infos[S.line - 1], w = Math.max(E.indent, 0), C = S.column - w;
        if (C <= 0) return true;
        var D = E.sliceStart, A = Math.min(D + C, E.sliceEnd), F = E.line.slice(D, A);
        return v(F);
      }, x.prototype.getLineLength = function(S) {
        var E = this.infos[S - 1];
        return this.getIndentAt(S) + E.sliceEnd - E.sliceStart;
      }, x.prototype.nextPos = function(S, E) {
        E === void 0 && (E = false);
        var w = Math.max(S.line, 0), C = Math.max(S.column, 0);
        return C < this.getLineLength(w) ? (S.column += 1, E ? !!this.skipSpaces(S, false, true) : true) : w < this.length ? (S.line += 1, S.column = 0, E ? !!this.skipSpaces(S, false, true) : true) : false;
      }, x.prototype.prevPos = function(S, E) {
        E === void 0 && (E = false);
        var w = S.line, C = S.column;
        if (C < 1) {
          if (w -= 1, w < 1) return false;
          C = this.getLineLength(w);
        } else C = Math.min(C - 1, this.getLineLength(w));
        return S.line = w, S.column = C, E ? !!this.skipSpaces(S, true, true) : true;
      }, x.prototype.firstPos = function() {
        return {
          line: 1,
          column: 0
        };
      }, x.prototype.lastPos = function() {
        return {
          line: this.length,
          column: this.getLineLength(this.length)
        };
      }, x.prototype.skipSpaces = function(S, E, w) {
        if (E === void 0 && (E = false), w === void 0 && (w = false), S ? S = w ? S : {
          line: S.line,
          column: S.column
        } : E ? S = this.lastPos() : S = this.firstPos(), E) {
          for (; this.prevPos(S); ) if (!v(this.charAt(S)) && this.nextPos(S)) return S;
          return null;
        } else {
          for (; v(this.charAt(S)); ) if (!this.nextPos(S)) return null;
          return S;
        }
      }, x.prototype.trimLeft = function() {
        var S = this.skipSpaces(this.firstPos(), false, true);
        return S ? this.slice(S) : _;
      }, x.prototype.trimRight = function() {
        var S = this.skipSpaces(this.lastPos(), true, true);
        return S ? this.slice(this.firstPos(), S) : _;
      }, x.prototype.trim = function() {
        var S = this.skipSpaces(this.firstPos(), false, true);
        if (S === null) return _;
        var E = this.skipSpaces(this.lastPos(), true, true);
        return E === null ? _ : this.slice(S, E);
      }, x.prototype.eachPos = function(S, E, w) {
        E === void 0 && (E = this.firstPos()), w === void 0 && (w = false);
        var C = this.firstPos();
        if (E && (C.line = E.line, C.column = E.column), !(w && !this.skipSpaces(C, false, true))) do
          S.call(this, C);
        while (this.nextPos(C, w));
      }, x.prototype.bootstrapSlice = function(S, E) {
        var w = this.toString().split(y).slice(S.line - 1, E.line);
        return w.length > 0 && (w.push(w.pop().slice(0, E.column)), w[0] = w[0].slice(S.column)), g(w.join(`
`));
      }, x.prototype.slice = function(S, E) {
        if (!E) {
          if (!S) return this;
          E = this.lastPos();
        }
        if (!S) throw new Error("cannot slice with end but not start");
        var w = this.infos.slice(S.line - 1, E.line);
        S.line === E.line ? w[0] = c(w[0], S.column, E.column) : ((0, t.default)(S.line < E.line), w[0] = c(w[0], S.column), w.push(c(w.pop(), 0, E.column)));
        var C = new x(w);
        if (this.mappings.length > 0) {
          var D = C.mappings;
          (0, t.default)(D.length === 0), this.mappings.forEach(function(A) {
            var F = A.slice(this, S, E);
            F && D.push(F);
          }, this);
        }
        return C;
      }, x.prototype.bootstrapSliceString = function(S, E, w) {
        return this.slice(S, E).toString(w);
      }, x.prototype.sliceString = function(S, E, w) {
        S === void 0 && (S = this.firstPos()), E === void 0 && (E = this.lastPos());
        for (var C = (0, n.normalize)(w), D = C.tabWidth, A = C.useTabs, F = C.reuseWhitespace, B = C.lineTerminator, N = [], I = S.line; I <= E.line; ++I) {
          var O = this.infos[I - 1];
          I === S.line ? I === E.line ? O = c(O, S.column, E.column) : O = c(O, S.column) : I === E.line && (O = c(O, 0, E.column));
          var L = Math.max(O.indent, 0), q = O.line.slice(0, O.sliceStart);
          if (F && v(q) && o(q, D) === L) {
            N.push(O.line.slice(0, O.sliceEnd));
            continue;
          }
          var z = 0, G = L;
          A && (z = Math.floor(L / D), G -= z * D);
          var J = "";
          z > 0 && (J += new Array(z + 1).join("	")), G > 0 && (J += new Array(G + 1).join(" ")), J += O.line.slice(O.sliceStart, O.sliceEnd), N.push(J);
        }
        return N.join(B);
      }, x.prototype.isEmpty = function() {
        return this.length < 2 && this.getLineLength(1) < 1;
      }, x.prototype.join = function(S) {
        var E = this, w = [], C = [], D;
        function A(N) {
          if (N !== null) {
            if (D) {
              var I = N.infos[0], O = new Array(I.indent + 1).join(" "), L = w.length, q = Math.max(D.indent, 0) + D.sliceEnd - D.sliceStart;
              D.line = D.line.slice(0, D.sliceEnd) + O + I.line.slice(I.sliceStart, I.sliceEnd), D.locked = D.locked || I.locked, D.sliceEnd = D.line.length, N.mappings.length > 0 && N.mappings.forEach(function(z) {
                C.push(z.add(L, q));
              });
            } else N.mappings.length > 0 && C.push.apply(C, N.mappings);
            N.infos.forEach(function(z, G) {
              (!D || G > 0) && (D = e.__assign({}, z), w.push(D));
            });
          }
        }
        function F(N, I) {
          I > 0 && A(E), A(N);
        }
        if (S.map(function(N) {
          var I = g(N);
          return I.isEmpty() ? null : I;
        }).forEach(function(N, I) {
          E.isEmpty() ? A(N) : F(N, I);
        }), w.length < 1) return _;
        var B = new x(w);
        return B.mappings = C, B;
      }, x.prototype.concat = function() {
        for (var S = [], E = 0; E < arguments.length; E++) S[E] = arguments[E];
        var w = [
          this
        ];
        return w.push.apply(w, S), (0, t.default)(w.length === S.length + 1), _.join(w);
      }, x;
    }();
    lines.Lines = u;
    var d = {}, h = d.hasOwnProperty, f = 10;
    function o(x, S) {
      for (var E = 0, w = x.length, C = 0; C < w; ++C) switch (x.charCodeAt(C)) {
        case 9: {
          (0, t.default)(typeof S == "number"), (0, t.default)(S > 0);
          var D = Math.ceil(E / S) * S;
          D === E ? E += S : E = D;
          break;
        }
        case 11:
        case 12:
        case 13:
        case 65279:
          break;
        case 32:
        default:
          E += 1;
          break;
      }
      return E;
    }
    lines.countSpaces = o;
    var p = /^\s*/, y = /\u000D\u000A|\u000D(?!\u000A)|\u000A|\u2028|\u2029/;
    function g(x, S) {
      if (x instanceof u) return x;
      x += "";
      var E = S && S.tabWidth, w = x.indexOf("	") < 0, C = !S && w && x.length <= f;
      if ((0, t.default)(E || w, `No tab width specified but encountered tabs in string
` + x), C && h.call(d, x)) return d[x];
      var D = new u(x.split(y).map(function(A) {
        var F = p.exec(A)[0];
        return {
          line: A,
          indent: o(F, E),
          locked: false,
          sliceStart: F.length,
          sliceEnd: A.length
        };
      }), (0, n.normalize)(S).sourceFileName);
      return C && (d[x] = D), D;
    }
    lines.fromString = g;
    function v(x) {
      return !/\S/.test(x);
    }
    function c(x, S, E) {
      var w = x.sliceStart, C = x.sliceEnd, D = Math.max(x.indent, 0), A = D + C - w;
      return typeof E > "u" && (E = A), S = Math.max(S, 0), E = Math.min(E, A), E = Math.max(E, S), E < D ? (D = E, C = w) : C -= A - E, A = E, A -= S, S < D ? D -= S : (S -= D, D = 0, w += S), (0, t.default)(D >= 0), (0, t.default)(w <= C), (0, t.default)(A === D + C - w), x.indent === D && x.sliceStart === w && x.sliceEnd === C ? x : {
        line: x.line,
        indent: D,
        locked: false,
        sliceStart: w,
        sliceEnd: C
      };
    }
    function m(x) {
      return _.join(x);
    }
    lines.concat = m;
    var _ = g("");
    return lines;
  }
  var comments = {}, hasRequiredComments;
  function requireComments() {
    if (hasRequiredComments) return comments;
    hasRequiredComments = 1, Object.defineProperty(comments, "__esModule", {
      value: true
    }), comments.printComments = comments.attach = void 0;
    var e = require$$0, t = e.__importDefault(requireTinyInvariant_cjs()), r = e.__importStar(requireMain()), n = r.namedTypes, l = r.builtInTypes.array, s = r.builtInTypes.object, u = requireLines(), d = requireUtil(), h = /* @__PURE__ */ new WeakMap();
    function f(E, w, C) {
      if (!E) return C;
      if ((0, d.fixFaultyLocations)(E, w), C) {
        if (n.Node.check(E) && n.SourceLocation.check(E.loc)) {
          for (var D = C.length - 1; D >= 0; --D) {
            var A = C[D];
            if (A && A.loc && (0, d.comparePos)(A.loc.end, E.loc.start) <= 0) break;
          }
          return C.splice(D + 1, 0, E), C;
        }
      } else {
        var F = h.get(E);
        if (F) return F;
      }
      var B;
      if (l.check(E)) B = Object.keys(E);
      else if (s.check(E)) B = r.getFieldNames(E);
      else return C;
      C || h.set(E, C = []);
      for (var D = 0, N = B.length; D < N; ++D) f(E[B[D]], w, C);
      return C;
    }
    function o(E, w, C) {
      for (var D = f(E, C), A = 0, F = D && D.length, B, N; typeof F == "number" && A < F; ) {
        var I = A + F >> 1, O = D[I];
        if ((0, d.comparePos)(O.loc.start, w.loc.start) <= 0 && (0, d.comparePos)(w.loc.end, O.loc.end) <= 0) {
          o(w.enclosingNode = O, w, C);
          return;
        }
        if ((0, d.comparePos)(O.loc.end, w.loc.start) <= 0) {
          B = O, A = I + 1;
          continue;
        }
        if ((0, d.comparePos)(w.loc.end, O.loc.start) <= 0) {
          N = O, F = I;
          continue;
        }
        throw new Error("Comment location overlaps with node location");
      }
      B && (w.precedingNode = B), N && (w.followingNode = N);
    }
    function p(E, w, C) {
      if (l.check(E)) {
        var D = [];
        E.forEach(function(A) {
          A.loc.lines = C, o(w, A, C);
          var F = A.precedingNode, B = A.enclosingNode, N = A.followingNode;
          if (F && N) {
            var I = D.length;
            if (I > 0) {
              var O = D[I - 1];
              (0, t.default)(O.precedingNode === A.precedingNode == (O.followingNode === A.followingNode)), O.followingNode !== A.followingNode && y(D, C);
            }
            D.push(A);
          } else if (F) y(D, C), m(F, A);
          else if (N) y(D, C), v(N, A);
          else if (B) y(D, C), c(B, A);
          else throw new Error("AST contains no nodes at all?");
        }), y(D, C), E.forEach(function(A) {
          delete A.precedingNode, delete A.enclosingNode, delete A.followingNode;
        });
      }
    }
    comments.attach = p;
    function y(E, w) {
      var C = E.length;
      if (C !== 0) {
        for (var D = E[0].precedingNode, A = E[0].followingNode, F = A.loc.start, B = C, N; B > 0; --B) {
          N = E[B - 1], (0, t.default)(N.precedingNode === D), (0, t.default)(N.followingNode === A);
          var I = w.sliceString(N.loc.end, F);
          if (/\S/.test(I)) break;
          F = N.loc.start;
        }
        for (; B <= C && (N = E[B]) && (N.type === "Line" || N.type === "CommentLine") && N.loc.start.column > A.loc.start.column; ) ++B;
        if (B) {
          var O = E[B - 1].enclosingNode;
          (O == null ? void 0 : O.type) === "CallExpression" && --B;
        }
        E.forEach(function(L, q) {
          q < B ? m(D, L) : v(A, L);
        }), E.length = 0;
      }
    }
    function g(E, w) {
      var C = E.comments || (E.comments = []);
      C.push(w);
    }
    function v(E, w) {
      w.leading = true, w.trailing = false, g(E, w);
    }
    function c(E, w) {
      w.leading = false, w.trailing = false, g(E, w);
    }
    function m(E, w) {
      w.leading = false, w.trailing = true, g(E, w);
    }
    function _(E, w) {
      var C = E.getValue();
      n.Comment.assert(C);
      var D = C.loc, A = D && D.lines, F = [
        w(E)
      ];
      if (C.trailing) F.push(`
`);
      else if (A instanceof u.Lines) {
        var B = A.slice(D.end, A.skipSpaces(D.end) || A.lastPos());
        B.length === 1 ? F.push(B) : F.push(new Array(B.length).join(`
`));
      } else F.push(`
`);
      return (0, u.concat)(F);
    }
    function x(E, w) {
      var C = E.getValue(E);
      n.Comment.assert(C);
      var D = C.loc, A = D && D.lines, F = [];
      if (A instanceof u.Lines) {
        var B = A.skipSpaces(D.start, true) || A.firstPos(), N = A.slice(B, D.start);
        N.length === 1 ? F.push(N) : F.push(new Array(N.length).join(`
`));
      }
      return F.push(w(E)), (0, u.concat)(F);
    }
    function S(E, w) {
      var C = E.getValue(), D = w(E), A = n.Node.check(C) && r.getFieldValue(C, "comments");
      if (!A || A.length === 0) return D;
      var F = [], B = [
        D
      ];
      return E.each(function(N) {
        var I = N.getValue(), O = r.getFieldValue(I, "leading"), L = r.getFieldValue(I, "trailing");
        O || L && !(n.Statement.check(C) || I.type === "Block" || I.type === "CommentBlock") ? F.push(_(N, w)) : L && B.push(x(N, w));
      }, "comments"), F.push.apply(F, B), (0, u.concat)(F);
    }
    return comments.printComments = S, comments;
  }
  var hasRequiredParser;
  function requireParser() {
    if (hasRequiredParser) return parser;
    hasRequiredParser = 1, Object.defineProperty(parser, "__esModule", {
      value: true
    }), parser.parse = void 0;
    var e = require$$0, t = e.__importDefault(requireTinyInvariant_cjs()), r = e.__importStar(requireMain()), n = r.builders, l = r.builtInTypes.object, s = r.builtInTypes.array, u = requireOptions(), d = requireLines(), h = requireComments(), f = e.__importStar(requireUtil());
    function o(g, v) {
      v = (0, u.normalize)(v);
      var c = (0, d.fromString)(g, v), m = c.toString({
        tabWidth: v.tabWidth,
        reuseWhitespace: false,
        useTabs: false
      }), _ = [], x = v.parser.parse(m, {
        jsx: true,
        loc: true,
        locations: true,
        range: v.range,
        comment: true,
        onComment: _,
        tolerant: f.getOption(v, "tolerant", true),
        ecmaVersion: 6,
        sourceType: f.getOption(v, "sourceType", "module")
      }), S = Array.isArray(x.tokens) ? x.tokens : requireEsprima$1().tokenize(m, {
        loc: true
      });
      delete x.tokens, S.forEach(function(D) {
        typeof D.value != "string" && (D.value = c.sliceString(D.loc.start, D.loc.end));
      }), Array.isArray(x.comments) && (_ = x.comments, delete x.comments), x.loc ? f.fixFaultyLocations(x, c) : x.loc = {
        start: c.firstPos(),
        end: c.lastPos()
      }, x.loc.lines = c, x.loc.indent = 0;
      var E, w;
      x.type === "Program" ? (w = x, E = n.file(x, v.sourceFileName || null), E.loc = {
        start: c.firstPos(),
        end: c.lastPos(),
        lines: c,
        indent: 0
      }) : x.type === "File" && (E = x, w = E.program), v.tokens && (E.tokens = S);
      var C = f.getTrueLoc({
        type: w.type,
        loc: w.loc,
        body: [],
        comments: _
      }, c);
      return w.loc.start = C.start, w.loc.end = C.end, (0, h.attach)(_, w.body.length ? E.program : E, c), new p(c, S).copy(E);
    }
    parser.parse = o;
    var p = function g(v, c) {
      (0, t.default)(this instanceof g), this.lines = v, this.tokens = c, this.startTokenIndex = 0, this.endTokenIndex = c.length, this.indent = 0, this.seen = /* @__PURE__ */ new Map();
    }, y = p.prototype;
    return y.copy = function(g) {
      if (this.seen.has(g)) return this.seen.get(g);
      if (s.check(g)) {
        var v = new Array(g.length);
        return this.seen.set(g, v), g.forEach(function(F, B) {
          v[B] = this.copy(F);
        }, this), v;
      }
      if (!l.check(g)) return g;
      f.fixFaultyLocations(g, this.lines);
      var c = Object.create(Object.getPrototypeOf(g), {
        original: {
          value: g,
          configurable: false,
          enumerable: false,
          writable: true
        }
      });
      this.seen.set(g, c);
      var m = g.loc, _ = this.indent, x = _, S = this.startTokenIndex, E = this.endTokenIndex;
      m && ((g.type === "Block" || g.type === "Line" || g.type === "CommentBlock" || g.type === "CommentLine" || this.lines.isPrecededOnlyByWhitespace(m.start)) && (x = this.indent = m.start.column), m.lines = this.lines, m.tokens = this.tokens, m.indent = x, this.findTokenRange(m));
      for (var w = Object.keys(g), C = w.length, D = 0; D < C; ++D) {
        var A = w[D];
        A === "loc" || A === "tokens" && g.type === "File" ? c[A] = g[A] : c[A] = this.copy(g[A]);
      }
      return this.indent = _, this.startTokenIndex = S, this.endTokenIndex = E, c;
    }, y.findTokenRange = function(g) {
      for (; this.startTokenIndex > 0; ) {
        var v = g.tokens[this.startTokenIndex];
        if (f.comparePos(g.start, v.loc.start) < 0) --this.startTokenIndex;
        else break;
      }
      for (; this.endTokenIndex < g.tokens.length; ) {
        var v = g.tokens[this.endTokenIndex];
        if (f.comparePos(v.loc.end, g.end) < 0) ++this.endTokenIndex;
        else break;
      }
      for (; this.startTokenIndex < this.endTokenIndex; ) {
        var v = g.tokens[this.startTokenIndex];
        if (f.comparePos(v.loc.start, g.start) < 0) ++this.startTokenIndex;
        else break;
      }
      for (g.start.token = this.startTokenIndex; this.endTokenIndex > this.startTokenIndex; ) {
        var v = g.tokens[this.endTokenIndex - 1];
        if (f.comparePos(g.end, v.loc.end) < 0) --this.endTokenIndex;
        else break;
      }
      g.end.token = this.endTokenIndex;
    }, parser;
  }
  var printer = {}, fastPath = {}, hasRequiredFastPath;
  function requireFastPath() {
    if (hasRequiredFastPath) return fastPath;
    hasRequiredFastPath = 1, Object.defineProperty(fastPath, "__esModule", {
      value: true
    });
    var e = require$$0, t = e.__importDefault(requireTinyInvariant_cjs()), r = e.__importStar(requireMain()), n = e.__importStar(requireUtil()), l = r.namedTypes, s = r.builtInTypes.array, u = r.builtInTypes.number, d = {};
    [
      [
        "??"
      ],
      [
        "||"
      ],
      [
        "&&"
      ],
      [
        "|"
      ],
      [
        "^"
      ],
      [
        "&"
      ],
      [
        "==",
        "===",
        "!=",
        "!=="
      ],
      [
        "<",
        ">",
        "<=",
        ">=",
        "in",
        "instanceof"
      ],
      [
        ">>",
        "<<",
        ">>>"
      ],
      [
        "+",
        "-"
      ],
      [
        "*",
        "/",
        "%"
      ],
      [
        "**"
      ]
    ].forEach(function(g, v) {
      g.forEach(function(c) {
        d[c] = v;
      });
    });
    var h = function g(v) {
      (0, t.default)(this instanceof g), this.stack = [
        v
      ];
    }, f = h.prototype;
    h.from = function(g) {
      if (g instanceof h) return g.copy();
      if (g instanceof r.NodePath) {
        for (var v = Object.create(h.prototype), c = [
          g.value
        ], m = void 0; m = g.parentPath; g = m) c.push(g.name, m.value);
        return v.stack = c.reverse(), v;
      }
      return new h(g);
    }, f.copy = function() {
      var v = Object.create(h.prototype);
      return v.stack = this.stack.slice(0), v;
    }, f.getName = function() {
      var v = this.stack, c = v.length;
      return c > 1 ? v[c - 2] : null;
    }, f.getValue = function() {
      var v = this.stack;
      return v[v.length - 1];
    }, f.valueIsDuplicate = function() {
      var g = this.stack, v = g.length - 1;
      return g.lastIndexOf(g[v], v - 1) >= 0;
    };
    function o(g, v) {
      for (var c = g.stack, m = c.length - 1; m >= 0; m -= 2) {
        var _ = c[m];
        if (l.Node.check(_) && --v < 0) return _;
      }
      return null;
    }
    f.getNode = function(v) {
      return v === void 0 && (v = 0), o(this, ~~v);
    }, f.getParentNode = function(v) {
      return v === void 0 && (v = 0), o(this, ~~v + 1);
    }, f.getRootValue = function() {
      var v = this.stack;
      return v.length % 2 === 0 ? v[1] : v[0];
    }, f.call = function(v) {
      for (var c = this.stack, m = c.length, _ = c[m - 1], x = arguments.length, S = 1; S < x; ++S) {
        var E = arguments[S];
        _ = _[E], c.push(E, _);
      }
      var w = v(this);
      return c.length = m, w;
    }, f.each = function(v) {
      for (var c = this.stack, m = c.length, _ = c[m - 1], x = arguments.length, S = 1; S < x; ++S) {
        var E = arguments[S];
        _ = _[E], c.push(E, _);
      }
      for (var S = 0; S < _.length; ++S) S in _ && (c.push(S, _[S]), v(this), c.length -= 2);
      c.length = m;
    }, f.map = function(v) {
      for (var c = this.stack, m = c.length, _ = c[m - 1], x = arguments.length, S = 1; S < x; ++S) {
        var E = arguments[S];
        _ = _[E], c.push(E, _);
      }
      for (var w = new Array(_.length), S = 0; S < _.length; ++S) S in _ && (c.push(S, _[S]), w[S] = v(this, S), c.length -= 2);
      return c.length = m, w;
    }, f.hasParens = function() {
      var g = this.getNode(), v = this.getPrevToken(g);
      if (!v) return false;
      var c = this.getNextToken(g);
      if (!c) return false;
      if (v.value === "(") {
        if (c.value === ")") return true;
        var m = !this.canBeFirstInStatement() && this.firstInStatement() && !this.needsParens(true);
        if (m) return true;
      }
      return false;
    }, f.getPrevToken = function(g) {
      g = g || this.getNode();
      var v = g && g.loc, c = v && v.tokens;
      if (c && v.start.token > 0) {
        var m = c[v.start.token - 1];
        if (m) {
          var _ = this.getRootValue().loc;
          if (n.comparePos(_.start, m.loc.start) <= 0) return m;
        }
      }
      return null;
    }, f.getNextToken = function(g) {
      g = g || this.getNode();
      var v = g && g.loc, c = v && v.tokens;
      if (c && v.end.token < c.length) {
        var m = c[v.end.token];
        if (m) {
          var _ = this.getRootValue().loc;
          if (n.comparePos(m.loc.end, _.end) <= 0) return m;
        }
      }
      return null;
    }, f.needsParens = function(g) {
      var v = this.getNode();
      if (v.type === "AssignmentExpression" && v.left.type === "ObjectPattern") return true;
      var c = this.getParentNode(), m = this.getName();
      if (this.getValue() !== v || l.Statement.check(v) || v.type === "Identifier" || c && c.type === "ParenthesizedExpression") return false;
      if (v.extra && v.extra.parenthesized) return true;
      if (!c) return false;
      if (v.type === "UnaryExpression" && c.type === "BinaryExpression" && m === "left" && c.left === v && c.operator === "**") return true;
      switch (v.type) {
        case "UnaryExpression":
        case "SpreadElement":
        case "SpreadProperty":
          return c.type === "MemberExpression" && m === "object" && c.object === v;
        case "BinaryExpression":
        case "LogicalExpression":
          switch (c.type) {
            case "CallExpression":
              return m === "callee" && c.callee === v;
            case "UnaryExpression":
            case "SpreadElement":
            case "SpreadProperty":
              return true;
            case "MemberExpression":
              return m === "object" && c.object === v;
            case "BinaryExpression":
            case "LogicalExpression": {
              var _ = c.operator, x = d[_], S = v.operator, E = d[S];
              if (x > E) return true;
              if (x === E && m === "right") return (0, t.default)(c.right === v), true;
              break;
            }
            default:
              return false;
          }
          break;
        case "SequenceExpression":
          switch (c.type) {
            case "ReturnStatement":
              return false;
            case "ForStatement":
              return false;
            case "ExpressionStatement":
              return m !== "expression";
            default:
              return true;
          }
        case "OptionalIndexedAccessType":
          return v.optional && c.type === "IndexedAccessType";
        case "IntersectionTypeAnnotation":
        case "UnionTypeAnnotation":
          return c.type === "NullableTypeAnnotation";
        case "Literal":
          return c.type === "MemberExpression" && u.check(v.value) && m === "object" && c.object === v;
        case "NumericLiteral":
          return c.type === "MemberExpression" && m === "object" && c.object === v;
        case "YieldExpression":
        case "AwaitExpression":
        case "AssignmentExpression":
        case "ConditionalExpression":
          switch (c.type) {
            case "UnaryExpression":
            case "SpreadElement":
            case "SpreadProperty":
            case "BinaryExpression":
            case "LogicalExpression":
              return true;
            case "CallExpression":
            case "NewExpression":
              return m === "callee" && c.callee === v;
            case "ConditionalExpression":
              return m === "test" && c.test === v;
            case "MemberExpression":
              return m === "object" && c.object === v;
            default:
              return false;
          }
        case "ArrowFunctionExpression":
          return l.CallExpression.check(c) && m === "callee" && c.callee === v || l.MemberExpression.check(c) && m === "object" && c.object === v || l.TSAsExpression && l.TSAsExpression.check(c) && m === "expression" && c.expression === v ? true : p(c);
        case "ObjectExpression":
          if (c.type === "ArrowFunctionExpression" && m === "body" && c.body === v) return true;
          break;
        case "TSAsExpression":
          if (c.type === "ArrowFunctionExpression" && m === "body" && c.body === v && v.expression.type === "ObjectExpression") return true;
          break;
        case "CallExpression":
          if (m === "declaration" && l.ExportDefaultDeclaration.check(c) && l.FunctionExpression.check(v.callee)) return true;
      }
      return c.type === "NewExpression" && m === "callee" && c.callee === v ? y(v) : !!(g !== true && !this.canBeFirstInStatement() && this.firstInStatement());
    };
    function p(g) {
      return l.BinaryExpression.check(g) || l.LogicalExpression.check(g);
    }
    function y(g) {
      return l.CallExpression.check(g) ? true : s.check(g) ? g.some(y) : l.Node.check(g) ? r.someField(g, function(v, c) {
        return y(c);
      }) : false;
    }
    return f.canBeFirstInStatement = function() {
      var g = this.getNode();
      return !(l.FunctionExpression.check(g) || l.ObjectExpression.check(g) || l.ClassExpression.check(g));
    }, f.firstInStatement = function() {
      for (var g = this.stack, v, c, m, _, x = g.length - 1; x >= 0; x -= 2) if (l.Node.check(g[x]) && (m = v, _ = c, v = g[x - 1], c = g[x]), !(!c || !_)) {
        if (l.BlockStatement.check(c) && v === "body" && m === 0) return (0, t.default)(c.body[0] === _), true;
        if (l.ExpressionStatement.check(c) && m === "expression") return (0, t.default)(c.expression === _), true;
        if (l.AssignmentExpression.check(c) && m === "left") return (0, t.default)(c.left === _), true;
        if (l.ArrowFunctionExpression.check(c) && m === "body") return (0, t.default)(c.body === _), true;
        if (l.SequenceExpression.check(c) && g[x + 1] === "expressions" && m === 0) {
          (0, t.default)(c.expressions[0] === _);
          continue;
        }
        if (l.CallExpression.check(c) && m === "callee") {
          (0, t.default)(c.callee === _);
          continue;
        }
        if (l.MemberExpression.check(c) && m === "object") {
          (0, t.default)(c.object === _);
          continue;
        }
        if (l.ConditionalExpression.check(c) && m === "test") {
          (0, t.default)(c.test === _);
          continue;
        }
        if (p(c) && m === "left") {
          (0, t.default)(c.left === _);
          continue;
        }
        if (l.UnaryExpression.check(c) && !c.prefix && m === "argument") {
          (0, t.default)(c.argument === _);
          continue;
        }
        return false;
      }
      return true;
    }, fastPath.default = h, fastPath;
  }
  var patcher = {}, hasRequiredPatcher;
  function requirePatcher() {
    if (hasRequiredPatcher) return patcher;
    hasRequiredPatcher = 1, Object.defineProperty(patcher, "__esModule", {
      value: true
    }), patcher.getReprinter = patcher.Patcher = void 0;
    var e = require$$0, t = e.__importDefault(requireTinyInvariant_cjs()), r = e.__importStar(requireLines()), n = e.__importStar(requireMain()), l = n.namedTypes.Printable, s = n.namedTypes.Expression, u = n.namedTypes.ReturnStatement, d = n.namedTypes.SourceLocation, h = requireUtil(), f = e.__importDefault(requireFastPath()), o = n.builtInTypes.object, p = n.builtInTypes.array, y = n.builtInTypes.string, g = /[0-9a-z_$]/i, v = function F(B) {
      (0, t.default)(this instanceof F), (0, t.default)(B instanceof r.Lines);
      var N = this, I = [];
      N.replace = function(O, L) {
        y.check(L) && (L = r.fromString(L)), I.push({
          lines: L,
          start: O.start,
          end: O.end
        });
      }, N.get = function(O) {
        O = O || {
          start: {
            line: 1,
            column: 0
          },
          end: {
            line: B.length,
            column: B.getLineLength(B.length)
          }
        };
        var L = O.start, q = [];
        function z(G, J) {
          (0, t.default)((0, h.comparePos)(G, J) <= 0), q.push(B.slice(G, J));
        }
        return I.sort(function(G, J) {
          return (0, h.comparePos)(G.start, J.start);
        }).forEach(function(G) {
          (0, h.comparePos)(L, G.start) > 0 || (z(L, G.start), q.push(G.lines), L = G.end);
        }), z(L, O.end), r.concat(q);
      };
    };
    patcher.Patcher = v;
    var c = v.prototype;
    c.tryToReprintComments = function(F, B, N) {
      var I = this;
      if (!F.comments && !B.comments) return true;
      var O = f.default.from(F), L = f.default.from(B);
      O.stack.push("comments", m(F)), L.stack.push("comments", m(B));
      var q = [], z = C(O, L, q);
      return z && q.length > 0 && q.forEach(function(G) {
        var J = G.oldPath.getValue();
        (0, t.default)(J.leading || J.trailing), I.replace(J.loc, N(G.newPath).indentTail(J.loc.indent));
      }), z;
    };
    function m(F) {
      var B = [];
      return F.comments && F.comments.length > 0 && F.comments.forEach(function(N) {
        (N.leading || N.trailing) && B.push(N);
      }), B;
    }
    c.deleteComments = function(F) {
      if (F.comments) {
        var B = this;
        F.comments.forEach(function(N) {
          N.leading ? B.replace({
            start: N.loc.start,
            end: F.loc.lines.skipSpaces(N.loc.end, false, false)
          }, "") : N.trailing && B.replace({
            start: F.loc.lines.skipSpaces(N.loc.start, true, false),
            end: N.loc.end
          }, "");
        });
      }
    };
    function _(F) {
      (0, t.default)(F instanceof f.default);
      var B = F.getValue();
      if (l.check(B)) {
        var N = B.original, I = N && N.loc, O = I && I.lines, L = [];
        if (!(!O || !E(F, L))) return function(q) {
          var z = new v(O);
          L.forEach(function(J) {
            var Z = J.newPath.getValue(), ae = J.oldPath.getValue();
            d.assert(ae.loc, true);
            var de = !z.tryToReprintComments(Z, ae, q);
            de && z.deleteComments(ae);
            var T = q(J.newPath, {
              includeComments: de,
              avoidRootParens: ae.type === Z.type && J.oldPath.hasParens()
            }).indentTail(ae.loc.indent), R = x(O, ae.loc, T), k = S(O, ae.loc, T);
            if (R || k) {
              var X = [];
              R && X.push(" "), X.push(T), k && X.push(" "), T = r.concat(X);
            }
            z.replace(ae.loc, T);
          });
          var G = z.get(I).indentTail(-N.loc.indent);
          return F.needsParens() ? r.concat([
            "(",
            G,
            ")"
          ]) : G;
        };
      }
    }
    patcher.getReprinter = _;
    function x(F, B, N) {
      var I = (0, h.copyPos)(B.start), O = F.prevPos(I) && F.charAt(I), L = N.charAt(N.firstPos());
      return O && g.test(O) && L && g.test(L);
    }
    function S(F, B, N) {
      var I = F.charAt(B.end), O = N.lastPos(), L = N.prevPos(O) && N.charAt(O);
      return L && g.test(L) && I && g.test(I);
    }
    function E(F, B) {
      var N = F.getValue();
      l.assert(N);
      var I = N.original;
      if (l.assert(I), (0, t.default)(B.length === 0), N.type !== I.type) return false;
      var O = new f.default(I), L = A(F, O, B);
      return L || (B.length = 0), L;
    }
    function w(F, B, N) {
      var I = F.getValue(), O = B.getValue();
      return I === O ? true : p.check(I) ? C(F, B, N) : o.check(I) ? D(F, B, N) : false;
    }
    function C(F, B, N) {
      var I = F.getValue(), O = B.getValue();
      if (I === O || F.valueIsDuplicate() || B.valueIsDuplicate()) return true;
      p.assert(I);
      var L = I.length;
      if (!(p.check(O) && O.length === L)) return false;
      for (var q = 0; q < L; ++q) {
        F.stack.push(q, I[q]), B.stack.push(q, O[q]);
        var z = w(F, B, N);
        if (F.stack.length -= 2, B.stack.length -= 2, !z) return false;
      }
      return true;
    }
    function D(F, B, N) {
      var I = F.getValue();
      if (o.assert(I), I.original === null) return false;
      var O = B.getValue();
      if (!o.check(O)) return false;
      if (I === O || F.valueIsDuplicate() || B.valueIsDuplicate()) return true;
      if (l.check(I)) {
        if (!l.check(O)) return false;
        var L = F.getParentNode(), q = B.getParentNode();
        if (q !== null && q.type === "FunctionTypeAnnotation" && L !== null && L.type === "FunctionTypeAnnotation") {
          var z = q.params.length !== 1 || !!q.params[0].name, G = L.params.length !== 1 || !!L.params[0].name;
          if (!z && G) return false;
        }
        if (I.type === O.type) {
          var J = [];
          if (A(F, B, J)) N.push.apply(N, J);
          else if (O.loc) N.push({
            oldPath: B.copy(),
            newPath: F.copy()
          });
          else return false;
          return true;
        }
        return s.check(I) && s.check(O) && O.loc ? (N.push({
          oldPath: B.copy(),
          newPath: F.copy()
        }), true) : false;
      }
      return A(F, B, N);
    }
    function A(F, B, N) {
      var I = F.getValue(), O = B.getValue();
      if (o.assert(I), o.assert(O), I.original === null || F.needsParens() && !B.hasParens()) return false;
      var L = (0, h.getUnionOfKeys)(O, I);
      (O.type === "File" || I.type === "File") && delete L.tokens, delete L.loc;
      var q = N.length;
      for (var z in L) if (z.charAt(0) !== "_") {
        F.stack.push(z, n.getFieldValue(I, z)), B.stack.push(z, n.getFieldValue(O, z));
        var G = w(F, B, N);
        if (F.stack.length -= 2, B.stack.length -= 2, !G) return false;
      }
      return !(u.check(F.getNode()) && N.length > q);
    }
    return patcher;
  }
  var hasRequiredPrinter;
  function requirePrinter() {
    if (hasRequiredPrinter) return printer;
    hasRequiredPrinter = 1, Object.defineProperty(printer, "__esModule", {
      value: true
    }), printer.Printer = void 0;
    var e = require$$0, t = e.__importDefault(requireTinyInvariant_cjs()), r = e.__importStar(requireMain()), n = requireComments(), l = e.__importDefault(requireFastPath()), s = requireLines(), u = requireOptions(), d = requirePatcher(), h = e.__importStar(requireUtil()), f = r.namedTypes, o = r.builtInTypes.string, p = r.builtInTypes.object, y = function T(R, k) {
      (0, t.default)(this instanceof T), o.assert(R), this.code = R, k && (p.assert(k), this.map = k);
    }, g = y.prototype, v = false;
    g.toString = function() {
      return v || (console.warn("Deprecation warning: recast.print now returns an object with a .code property. You appear to be treating the object as a string, which might still work but is strongly discouraged."), v = true), this.code;
    };
    var c = new y(""), m = function T(R) {
      (0, t.default)(this instanceof T);
      var k = R && R.tabWidth;
      R = (0, u.normalize)(R), R.sourceFileName = null;
      function X(K, M) {
        return K = Object.assign({}, K, M), function(P) {
          return Y(P, K);
        };
      }
      function Y(K, M) {
        if ((0, t.default)(K instanceof l.default), M = M || {}, M.includeComments) return (0, n.printComments)(K, X(M, {
          includeComments: false
        }));
        var P = R.tabWidth;
        if (!k) {
          var se = K.getNode().loc;
          se && se.lines && se.lines.guessTabWidth && (R.tabWidth = se.lines.guessTabWidth());
        }
        var fe = (0, d.getReprinter)(K), le = fe ? fe(Y) : _(K, R, M, X(M, {
          includeComments: true,
          avoidRootParens: false
        }));
        return R.tabWidth = P, le;
      }
      this.print = function(K) {
        if (!K) return c;
        var M = Y(l.default.from(K), {
          includeComments: true,
          avoidRootParens: false
        });
        return new y(M.toString(R), h.composeSourceMaps(R.inputSourceMap, M.getSourceMap(R.sourceMapName, R.sourceRoot)));
      }, this.printGenerically = function(K) {
        if (!K) return c;
        function M(le) {
          return (0, n.printComments)(le, function(pe) {
            return _(pe, R, {
              avoidRootParens: false
            }, M);
          });
        }
        var P = l.default.from(K), se = R.reuseWhitespace;
        R.reuseWhitespace = false;
        var fe = new y(M(P).toString(R));
        return R.reuseWhitespace = se, fe;
      };
    };
    printer.Printer = m;
    function _(T, R, k, X) {
      (0, t.default)(T instanceof l.default);
      var Y = T.getValue(), K = [], M = x(T, R, X);
      if (!Y || M.isEmpty()) return M;
      var P = false, se = S(T, X);
      return se.isEmpty() ? k.avoidRootParens || (P = T.needsParens()) : K.push(se), P && K.unshift("("), K.push(M), P && K.push(")"), (0, s.concat)(K);
    }
    function x(T, R, k) {
      var X, Y, K, M = T.getValue();
      if (!M) return (0, s.fromString)("");
      if (typeof M == "string") return (0, s.fromString)(M, R);
      f.Printable.assert(M);
      var P = [];
      switch (M.type) {
        case "File":
          return T.call(k, "program");
        case "Program":
          return M.directives && T.each(function(ee) {
            P.push(k(ee), `;
`);
          }, "directives"), M.interpreter && P.push(T.call(k, "interpreter")), P.push(T.call(function(ee) {
            return E(ee, R, k);
          }, "body")), (0, s.concat)(P);
        case "Noop":
        case "EmptyStatement":
          return (0, s.fromString)("");
        case "ExpressionStatement":
          return (0, s.concat)([
            T.call(k, "expression"),
            ";"
          ]);
        case "ParenthesizedExpression":
          return (0, s.concat)([
            "(",
            T.call(k, "expression"),
            ")"
          ]);
        case "BinaryExpression":
        case "LogicalExpression":
        case "AssignmentExpression":
          return (0, s.fromString)(" ").join([
            T.call(k, "left"),
            M.operator,
            T.call(k, "right")
          ]);
        case "AssignmentPattern":
          return (0, s.concat)([
            T.call(k, "left"),
            " = ",
            T.call(k, "right")
          ]);
        case "MemberExpression":
        case "OptionalMemberExpression": {
          P.push(T.call(k, "object"));
          var se = T.call(k, "property"), fe = r.getFieldValue(M, "optional");
          return M.computed ? P.push(fe ? "?.[" : "[", se, "]") : P.push(fe ? "?." : ".", se), (0, s.concat)(P);
        }
        case "ChainExpression":
          return T.call(k, "expression");
        case "MetaProperty":
          return (0, s.concat)([
            T.call(k, "meta"),
            ".",
            T.call(k, "property")
          ]);
        case "BindExpression":
          return M.object && P.push(T.call(k, "object")), P.push("::", T.call(k, "callee")), (0, s.concat)(P);
        case "Path":
          return (0, s.fromString)(".").join(M.body);
        case "Identifier":
          return (0, s.concat)([
            (0, s.fromString)(M.name, R),
            M.optional ? "?" : "",
            T.call(k, "typeAnnotation")
          ]);
        case "SpreadElement":
        case "SpreadElementPattern":
        case "RestProperty":
        case "SpreadProperty":
        case "SpreadPropertyPattern":
        case "ObjectTypeSpreadProperty":
        case "RestElement":
          return (0, s.concat)([
            "...",
            T.call(k, "argument"),
            T.call(k, "typeAnnotation")
          ]);
        case "FunctionDeclaration":
        case "FunctionExpression":
        case "TSDeclareFunction":
          return M.declare && P.push("declare "), M.async && P.push("async "), P.push("function"), M.generator && P.push("*"), M.id ? P.push(" ", T.call(k, "id"), T.call(k, "typeParameters")) : M.typeParameters && P.push(T.call(k, "typeParameters")), P.push("(", F(T, R, k), ")", T.call(k, "returnType")), M.body && P.push(" ", T.call(k, "body")), (0, s.concat)(P);
        case "ArrowFunctionExpression":
          return M.async && P.push("async "), M.typeParameters && P.push(T.call(k, "typeParameters")), !R.arrowParensAlways && M.params.length === 1 && !M.rest && M.params[0].type === "Identifier" && !M.params[0].typeAnnotation && !M.returnType ? P.push(T.call(k, "params", 0)) : P.push("(", F(T, R, k), ")", T.call(k, "returnType")), P.push(" => ", T.call(k, "body")), (0, s.concat)(P);
        case "MethodDefinition":
          return D(T, R, k);
        case "YieldExpression":
          return P.push("yield"), M.delegate && P.push("*"), M.argument && P.push(" ", T.call(k, "argument")), (0, s.concat)(P);
        case "AwaitExpression":
          return P.push("await"), M.all && P.push("*"), M.argument && P.push(" ", T.call(k, "argument")), (0, s.concat)(P);
        case "ModuleExpression":
          return (0, s.concat)([
            `module {
`,
            T.call(k, "body").indent(R.tabWidth),
            `
}`
          ]);
        case "ModuleDeclaration":
          return P.push("module", T.call(k, "id")), M.source ? ((0, t.default)(!M.body), P.push("from", T.call(k, "source"))) : P.push(T.call(k, "body")), (0, s.fromString)(" ").join(P);
        case "ImportSpecifier":
          return M.importKind && M.importKind !== "value" && P.push(M.importKind + " "), M.imported ? (P.push(T.call(k, "imported")), M.local && M.local.name !== M.imported.name && P.push(" as ", T.call(k, "local"))) : M.id && (P.push(T.call(k, "id")), M.name && P.push(" as ", T.call(k, "name"))), (0, s.concat)(P);
        case "ExportSpecifier":
          return M.exportKind && M.exportKind !== "value" && P.push(M.exportKind + " "), M.local ? (P.push(T.call(k, "local")), M.exported && M.exported.name !== M.local.name && P.push(" as ", T.call(k, "exported"))) : M.id && (P.push(T.call(k, "id")), M.name && P.push(" as ", T.call(k, "name"))), (0, s.concat)(P);
        case "ExportBatchSpecifier":
          return (0, s.fromString)("*");
        case "ImportNamespaceSpecifier":
          return P.push("* as "), M.local ? P.push(T.call(k, "local")) : M.id && P.push(T.call(k, "id")), (0, s.concat)(P);
        case "ImportDefaultSpecifier":
          return M.local ? T.call(k, "local") : T.call(k, "id");
        case "TSExportAssignment":
          return (0, s.concat)([
            "export = ",
            T.call(k, "expression")
          ]);
        case "ExportDeclaration":
        case "ExportDefaultDeclaration":
        case "ExportNamedDeclaration":
          return N(T, R, k);
        case "ExportAllDeclaration":
          return P.push("export *"), M.exported && P.push(" as ", T.call(k, "exported")), P.push(" from ", T.call(k, "source"), ";"), (0, s.concat)(P);
        case "TSNamespaceExportDeclaration":
          return P.push("export as namespace ", T.call(k, "id")), de((0, s.concat)(P));
        case "ExportNamespaceSpecifier":
          return (0, s.concat)([
            "* as ",
            T.call(k, "exported")
          ]);
        case "ExportDefaultSpecifier":
          return T.call(k, "exported");
        case "Import":
          return (0, s.fromString)("import", R);
        case "ImportExpression":
          return (0, s.concat)([
            "import(",
            T.call(k, "source"),
            ")"
          ]);
        case "ImportDeclaration": {
          if (P.push("import "), M.importKind && M.importKind !== "value" && P.push(M.importKind + " "), M.specifiers && M.specifiers.length > 0) {
            var le = [], pe = [];
            if (T.each(function(ee) {
              var oe = ee.getValue();
              oe.type === "ImportSpecifier" ? pe.push(k(ee)) : (oe.type === "ImportDefaultSpecifier" || oe.type === "ImportNamespaceSpecifier") && le.push(k(ee));
            }, "specifiers"), le.forEach(function(ee, oe) {
              oe > 0 && P.push(", "), P.push(ee);
            }), pe.length > 0) {
              var me = (0, s.fromString)(", ").join(pe);
              me.getLineLength(1) > R.wrapColumn && (me = (0, s.concat)([
                (0, s.fromString)(`,
`).join(pe).indent(R.tabWidth),
                ","
              ])), le.length > 0 && P.push(", "), me.length > 1 ? P.push(`{
`, me, `
}`) : R.objectCurlySpacing ? P.push("{ ", me, " }") : P.push("{", me, "}");
            }
            P.push(" from ");
          }
          return P.push(T.call(k, "source"), B(T, R, k), ";"), (0, s.concat)(P);
        }
        case "ImportAttribute":
          return (0, s.concat)([
            T.call(k, "key"),
            ": ",
            T.call(k, "value")
          ]);
        case "StaticBlock":
          P.push("static ");
        case "BlockStatement": {
          var _e = T.call(function(ee) {
            return E(ee, R, k);
          }, "body");
          return _e.isEmpty() && (!M.directives || M.directives.length === 0) ? (P.push("{}"), (0, s.concat)(P)) : (P.push(`{
`), M.directives && T.each(function(ee) {
            P.push(de(k(ee).indent(R.tabWidth)), M.directives.length > 1 || !_e.isEmpty() ? `
` : "");
          }, "directives"), P.push(_e.indent(R.tabWidth)), P.push(`
}`), (0, s.concat)(P));
        }
        case "ReturnStatement": {
          if (P.push("return"), M.argument) {
            var Ee = ((X = f.JSXElement) === null || X === void 0 ? void 0 : X.check(M.argument)) || ((Y = f.JSXFragment) === null || Y === void 0 ? void 0 : Y.check(M.argument)), V = T.call(k, "argument");
            V.startsWithComment() || V.length > 1 && Ee ? (Ee && (!((K = M.argument.extra) === null || K === void 0) && K.parenthesized) && (M.argument.extra.parenthesized = false, V = T.call(k, "argument"), M.argument.extra.parenthesized = true), P.push(" ", (0, s.concat)([
              `(
`,
              V
            ]).indentTail(R.tabWidth), `
)`)) : P.push(" ", V);
          }
          return P.push(";"), (0, s.concat)(P);
        }
        case "CallExpression":
        case "OptionalCallExpression":
          return P.push(T.call(k, "callee")), M.typeParameters && P.push(T.call(k, "typeParameters")), M.typeArguments && P.push(T.call(k, "typeArguments")), r.getFieldValue(M, "optional") && P.push("?."), P.push(A(T, R, k)), (0, s.concat)(P);
        case "RecordExpression":
          P.push("#");
        case "ObjectExpression":
        case "ObjectPattern":
        case "ObjectTypeAnnotation": {
          var W = M.type === "ObjectTypeAnnotation", H = R.flowObjectCommas ? "," : W ? ";" : ",", Q = [], ne = false;
          W && (Q.push("indexers", "callProperties"), M.internalSlots != null && Q.push("internalSlots")), Q.push("properties");
          var ie = 0;
          Q.forEach(function(ee) {
            ie += M[ee].length;
          });
          var he = W && ie === 1 || ie === 0, ce = M.exact ? "{|" : "{", ue = M.exact ? "|}" : "}";
          P.push(he ? ce : ce + `
`);
          var xe = P.length - 1, ve = 0;
          if (Q.forEach(function(ee) {
            T.each(function(oe) {
              var Se = k(oe);
              he || (Se = Se.indent(R.tabWidth));
              var Ce = !W && Se.length > 1;
              Ce && ne && P.push(`
`), P.push(Se), ve < ie - 1 ? (P.push(H + (Ce ? `

` : `
`)), ne = !Ce) : (ie !== 1 && W || !he && h.isTrailingCommaEnabled(R, "objects") && oe.getValue().type !== "RestElement") && P.push(H), ve++;
            }, ee);
          }), M.inexact) {
            var be = (0, s.fromString)("...", R);
            he ? (ie > 0 && P.push(H, " "), P.push(be)) : P.push(`
`, be.indent(R.tabWidth));
          }
          return P.push(he ? ue : `
` + ue), ve !== 0 && he && R.objectCurlySpacing && (P[xe] = ce + " ", P[P.length - 1] = " " + ue), M.typeAnnotation && P.push(T.call(k, "typeAnnotation")), (0, s.concat)(P);
        }
        case "PropertyPattern":
          return (0, s.concat)([
            T.call(k, "key"),
            ": ",
            T.call(k, "pattern")
          ]);
        case "ObjectProperty":
        case "Property": {
          if (M.method || M.kind === "get" || M.kind === "set") return D(T, R, k);
          if (M.shorthand && M.value.type === "AssignmentPattern") return T.call(k, "value");
          var ge = T.call(k, "key");
          return M.computed ? P.push("[", ge, "]") : P.push(ge), (!M.shorthand || M.key.name !== M.value.name) && P.push(": ", T.call(k, "value")), (0, s.concat)(P);
        }
        case "ClassMethod":
        case "ObjectMethod":
        case "ClassPrivateMethod":
        case "TSDeclareMethod":
          return D(T, R, k);
        case "PrivateName":
          return (0, s.concat)([
            "#",
            T.call(k, "id")
          ]);
        case "Decorator":
          return (0, s.concat)([
            "@",
            T.call(k, "expression")
          ]);
        case "TupleExpression":
          P.push("#");
        case "ArrayExpression":
        case "ArrayPattern": {
          var Ne = M.elements, we = Ne.length, ke = T.map(k, "elements"), Ae = (0, s.fromString)(", ").join(ke), Te = Ae.getLineLength(1) <= R.wrapColumn;
          return Te ? R.arrayBracketSpacing ? P.push("[ ") : P.push("[") : P.push(`[
`), T.each(function(ee) {
            var oe = ee.getName(), Se = ee.getValue();
            if (!Se) P.push(",");
            else {
              var Ce = ke[oe];
              Te ? oe > 0 && P.push(" ") : Ce = Ce.indent(R.tabWidth), P.push(Ce), (oe < we - 1 || !Te && h.isTrailingCommaEnabled(R, "arrays")) && P.push(","), Te || P.push(`
`);
            }
          }, "elements"), Te && R.arrayBracketSpacing ? P.push(" ]") : P.push("]"), M.typeAnnotation && P.push(T.call(k, "typeAnnotation")), (0, s.concat)(P);
        }
        case "SequenceExpression":
          return (0, s.fromString)(", ").join(T.map(k, "expressions"));
        case "ThisExpression":
          return (0, s.fromString)("this");
        case "Super":
          return (0, s.fromString)("super");
        case "NullLiteral":
          return (0, s.fromString)("null");
        case "RegExpLiteral":
          return (0, s.fromString)(J(M) || "/".concat(M.pattern, "/").concat(M.flags || ""), R);
        case "BigIntLiteral":
          return (0, s.fromString)(J(M) || M.value + "n", R);
        case "NumericLiteral":
          return (0, s.fromString)(J(M) || M.value, R);
        case "DecimalLiteral":
          return (0, s.fromString)(J(M) || M.value + "m", R);
        case "StringLiteral":
          return (0, s.fromString)(ae(M.value, R));
        case "BooleanLiteral":
        case "Literal":
          return (0, s.fromString)(J(M) || (typeof M.value == "string" ? ae(M.value, R) : M.value), R);
        case "Directive":
          return T.call(k, "value");
        case "DirectiveLiteral":
          return (0, s.fromString)(J(M) || ae(M.value, R), R);
        case "InterpreterDirective":
          return (0, s.fromString)("#!".concat(M.value, `
`), R);
        case "ModuleSpecifier":
          if (M.local) throw new Error("The ESTree ModuleSpecifier type should be abstract");
          return (0, s.fromString)(ae(M.value, R), R);
        case "UnaryExpression":
          return P.push(M.operator), /[a-z]$/.test(M.operator) && P.push(" "), P.push(T.call(k, "argument")), (0, s.concat)(P);
        case "UpdateExpression":
          return P.push(T.call(k, "argument"), M.operator), M.prefix && P.reverse(), (0, s.concat)(P);
        case "ConditionalExpression":
          return (0, s.concat)([
            T.call(k, "test"),
            " ? ",
            T.call(k, "consequent"),
            " : ",
            T.call(k, "alternate")
          ]);
        case "NewExpression": {
          P.push("new ", T.call(k, "callee")), M.typeParameters && P.push(T.call(k, "typeParameters")), M.typeArguments && P.push(T.call(k, "typeArguments"));
          var je = M.arguments;
          return je && P.push(A(T, R, k)), (0, s.concat)(P);
        }
        case "VariableDeclaration": {
          M.declare && P.push("declare "), P.push(M.kind, " ");
          var Ie = 0, Fe = T.map(function(ee) {
            var oe = k(ee);
            return Ie = Math.max(oe.length, Ie), oe;
          }, "declarations");
          Ie === 1 ? P.push((0, s.fromString)(", ").join(Fe)) : Fe.length > 1 ? P.push((0, s.fromString)(`,
`).join(Fe).indentTail(M.kind.length + 1)) : P.push(Fe[0]);
          var Pe = T.getParentNode();
          return !f.ForStatement.check(Pe) && !f.ForInStatement.check(Pe) && !(f.ForOfStatement && f.ForOfStatement.check(Pe)) && !(f.ForAwaitStatement && f.ForAwaitStatement.check(Pe)) && P.push(";"), (0, s.concat)(P);
        }
        case "VariableDeclarator":
          return M.init ? (0, s.fromString)(" = ").join([
            T.call(k, "id"),
            T.call(k, "init")
          ]) : T.call(k, "id");
        case "WithStatement":
          return (0, s.concat)([
            "with (",
            T.call(k, "object"),
            ") ",
            T.call(k, "body")
          ]);
        case "IfStatement": {
          var Le = L(T.call(k, "consequent"), R);
          return P.push("if (", T.call(k, "test"), ")", Le), M.alternate && P.push(z(Le) ? " else" : `
else`, L(T.call(k, "alternate"), R)), (0, s.concat)(P);
        }
        case "ForStatement": {
          var Re = T.call(k, "init"), ze = Re.length > 1 ? `;
` : "; ", $ = "for (", j = (0, s.fromString)(ze).join([
            Re,
            T.call(k, "test"),
            T.call(k, "update")
          ]).indentTail($.length), U = (0, s.concat)([
            $,
            j,
            ")"
          ]), te = L(T.call(k, "body"), R);
          return P.push(U), U.length > 1 && (P.push(`
`), te = te.trimLeft()), P.push(te), (0, s.concat)(P);
        }
        case "WhileStatement":
          return (0, s.concat)([
            "while (",
            T.call(k, "test"),
            ")",
            L(T.call(k, "body"), R)
          ]);
        case "ForInStatement":
          return (0, s.concat)([
            M.each ? "for each (" : "for (",
            T.call(k, "left"),
            " in ",
            T.call(k, "right"),
            ")",
            L(T.call(k, "body"), R)
          ]);
        case "ForOfStatement":
        case "ForAwaitStatement":
          return P.push("for "), (M.await || M.type === "ForAwaitStatement") && P.push("await "), P.push("(", T.call(k, "left"), " of ", T.call(k, "right"), ")", L(T.call(k, "body"), R)), (0, s.concat)(P);
        case "DoWhileStatement": {
          var ye = (0, s.concat)([
            "do",
            L(T.call(k, "body"), R)
          ]);
          return P.push(ye), z(ye) ? P.push(" while") : P.push(`
while`), P.push(" (", T.call(k, "test"), ");"), (0, s.concat)(P);
        }
        case "DoExpression": {
          var Me = T.call(function(ee) {
            return E(ee, R, k);
          }, "body");
          return (0, s.concat)([
            `do {
`,
            Me.indent(R.tabWidth),
            `
}`
          ]);
        }
        case "BreakStatement":
          return P.push("break"), M.label && P.push(" ", T.call(k, "label")), P.push(";"), (0, s.concat)(P);
        case "ContinueStatement":
          return P.push("continue"), M.label && P.push(" ", T.call(k, "label")), P.push(";"), (0, s.concat)(P);
        case "LabeledStatement":
          return (0, s.concat)([
            T.call(k, "label"),
            `:
`,
            T.call(k, "body")
          ]);
        case "TryStatement":
          return P.push("try ", T.call(k, "block")), M.handler ? P.push(" ", T.call(k, "handler")) : M.handlers && T.each(function(ee) {
            P.push(" ", k(ee));
          }, "handlers"), M.finalizer && P.push(" finally ", T.call(k, "finalizer")), (0, s.concat)(P);
        case "CatchClause":
          return P.push("catch "), M.param && P.push("(", T.call(k, "param")), M.guard && P.push(" if ", T.call(k, "guard")), M.param && P.push(") "), P.push(T.call(k, "body")), (0, s.concat)(P);
        case "ThrowStatement":
          return (0, s.concat)([
            "throw ",
            T.call(k, "argument"),
            ";"
          ]);
        case "SwitchStatement":
          return (0, s.concat)([
            "switch (",
            T.call(k, "discriminant"),
            `) {
`,
            (0, s.fromString)(`
`).join(T.map(k, "cases")),
            `
}`
          ]);
        case "SwitchCase":
          return M.test ? P.push("case ", T.call(k, "test"), ":") : P.push("default:"), M.consequent.length > 0 && P.push(`
`, T.call(function(ee) {
            return E(ee, R, k);
          }, "consequent").indent(R.tabWidth)), (0, s.concat)(P);
        case "DebuggerStatement":
          return (0, s.fromString)("debugger;");
        case "JSXAttribute":
          return P.push(T.call(k, "name")), M.value && P.push("=", T.call(k, "value")), (0, s.concat)(P);
        case "JSXIdentifier":
          return (0, s.fromString)(M.name, R);
        case "JSXNamespacedName":
          return (0, s.fromString)(":").join([
            T.call(k, "namespace"),
            T.call(k, "name")
          ]);
        case "JSXMemberExpression":
          return (0, s.fromString)(".").join([
            T.call(k, "object"),
            T.call(k, "property")
          ]);
        case "JSXSpreadAttribute":
          return (0, s.concat)([
            "{...",
            T.call(k, "argument"),
            "}"
          ]);
        case "JSXSpreadChild":
          return (0, s.concat)([
            "{...",
            T.call(k, "expression"),
            "}"
          ]);
        case "JSXExpressionContainer":
          return (0, s.concat)([
            "{",
            T.call(k, "expression"),
            "}"
          ]);
        case "JSXElement":
        case "JSXFragment": {
          var qe = "opening" + (M.type === "JSXElement" ? "Element" : "Fragment"), Xe = "closing" + (M.type === "JSXElement" ? "Element" : "Fragment"), Je = T.call(k, qe);
          if (M[qe].selfClosing) return (0, t.default)(!M[Xe], "unexpected " + Xe + " element in self-closing " + M.type), Je;
          var nt = (0, s.concat)(T.map(function(ee) {
            var oe = ee.getValue();
            if (f.Literal.check(oe) && typeof oe.value == "string") {
              if (/\S/.test(oe.value)) return oe.value.replace(/^\s+/g, "");
              if (/\n/.test(oe.value)) return `
`;
            }
            return k(ee);
          }, "children")).indentTail(R.tabWidth), it = T.call(k, Xe);
          return (0, s.concat)([
            Je,
            nt,
            it
          ]);
        }
        case "JSXOpeningElement": {
          P.push("<", T.call(k, "name"));
          var Ve = T.call(k, "typeParameters");
          Ve.length && P.push(Ve);
          var Oe = [];
          T.each(function(ee) {
            Oe.push(" ", k(ee));
          }, "attributes");
          var $e = (0, s.concat)(Oe), at = $e.length > 1 || $e.getLineLength(1) > R.wrapColumn;
          return at && (Oe.forEach(function(ee, oe) {
            ee === " " && ((0, t.default)(oe % 2 === 0), Oe[oe] = `
`);
          }), $e = (0, s.concat)(Oe).indentTail(R.tabWidth)), P.push($e, M.selfClosing ? " />" : ">"), (0, s.concat)(P);
        }
        case "JSXClosingElement":
          return (0, s.concat)([
            "</",
            T.call(k, "name"),
            ">"
          ]);
        case "JSXOpeningFragment":
          return (0, s.fromString)("<>");
        case "JSXClosingFragment":
          return (0, s.fromString)("</>");
        case "JSXText":
          return (0, s.fromString)(M.value, R);
        case "JSXEmptyExpression":
          return (0, s.fromString)("");
        case "TypeAnnotatedIdentifier":
          return (0, s.concat)([
            T.call(k, "annotation"),
            " ",
            T.call(k, "identifier")
          ]);
        case "ClassBody":
          return M.body.length === 0 ? (0, s.fromString)("{}") : (0, s.concat)([
            `{
`,
            T.call(function(ee) {
              return E(ee, R, k);
            }, "body").indent(R.tabWidth),
            `
}`
          ]);
        case "ClassPropertyDefinition":
          return P.push("static ", T.call(k, "definition")), f.MethodDefinition.check(M.definition) || P.push(";"), (0, s.concat)(P);
        case "ClassProperty": {
          M.declare && P.push("declare ");
          var Ue = M.accessibility || M.access;
          typeof Ue == "string" && P.push(Ue, " "), M.static && P.push("static "), M.abstract && P.push("abstract "), M.readonly && P.push("readonly ");
          var ge = T.call(k, "key");
          return M.computed && (ge = (0, s.concat)([
            "[",
            ge,
            "]"
          ])), M.variance && (ge = (0, s.concat)([
            O(T, k),
            ge
          ])), P.push(ge), M.optional && P.push("?"), M.definite && P.push("!"), M.typeAnnotation && P.push(T.call(k, "typeAnnotation")), M.value && P.push(" = ", T.call(k, "value")), P.push(";"), (0, s.concat)(P);
        }
        case "ClassPrivateProperty":
          return M.static && P.push("static "), P.push(T.call(k, "key")), M.typeAnnotation && P.push(T.call(k, "typeAnnotation")), M.value && P.push(" = ", T.call(k, "value")), P.push(";"), (0, s.concat)(P);
        case "ClassAccessorProperty":
          return P.push.apply(P, e.__spreadArray(e.__spreadArray([], C(M), false), [
            "accessor "
          ], false)), M.computed ? P.push("[", T.call(k, "key"), "]") : P.push(T.call(k, "key")), M.optional && P.push("?"), M.definite && P.push("!"), M.typeAnnotation && P.push(T.call(k, "typeAnnotation")), M.value && P.push(" = ", T.call(k, "value")), P.push(";"), (0, s.concat)(P);
        case "ClassDeclaration":
        case "ClassExpression":
        case "DeclareClass":
          return M.declare && P.push("declare "), M.abstract && P.push("abstract "), P.push("class"), M.id && P.push(" ", T.call(k, "id")), M.typeParameters && P.push(T.call(k, "typeParameters")), M.superClass && P.push(" extends ", T.call(k, "superClass"), T.call(k, "superTypeParameters")), M.extends && M.extends.length > 0 && P.push(" extends ", (0, s.fromString)(", ").join(T.map(k, "extends"))), M.implements && M.implements.length > 0 && P.push(" implements ", (0, s.fromString)(", ").join(T.map(k, "implements"))), P.push(" ", T.call(k, "body")), M.type === "DeclareClass" ? I(T, P) : (0, s.concat)(P);
        case "TemplateElement":
          return (0, s.fromString)(M.value.raw, R).lockIndentTail();
        case "TemplateLiteral": {
          var We = T.map(k, "expressions");
          return P.push("`"), T.each(function(ee) {
            var oe = ee.getName();
            P.push(k(ee)), oe < We.length && P.push("${", We[oe], "}");
          }, "quasis"), P.push("`"), (0, s.concat)(P).lockIndentTail();
        }
        case "TaggedTemplateExpression":
          return P.push(T.call(k, "tag")), M.typeParameters && P.push(T.call(k, "typeParameters")), P.push(T.call(k, "quasi")), (0, s.concat)(P);
        case "Node":
        case "Printable":
        case "SourceLocation":
        case "Position":
        case "Statement":
        case "Function":
        case "Pattern":
        case "Expression":
        case "Declaration":
        case "Specifier":
        case "NamedSpecifier":
        case "Comment":
        case "Flow":
        case "FlowType":
        case "FlowPredicate":
        case "MemberTypeAnnotation":
        case "Type":
        case "TSHasOptionalTypeParameterInstantiation":
        case "TSHasOptionalTypeParameters":
        case "TSHasOptionalTypeAnnotation":
        case "ChainElement":
          throw new Error("unprintable type: " + JSON.stringify(M.type));
        case "CommentBlock":
        case "Block":
          return (0, s.concat)([
            "/*",
            (0, s.fromString)(M.value, R),
            "*/"
          ]);
        case "CommentLine":
        case "Line":
          return (0, s.concat)([
            "//",
            (0, s.fromString)(M.value, R)
          ]);
        case "TypeAnnotation":
          return M.typeAnnotation ? (M.typeAnnotation.type !== "FunctionTypeAnnotation" && P.push(": "), P.push(T.call(k, "typeAnnotation")), (0, s.concat)(P)) : (0, s.fromString)("");
        case "ExistentialTypeParam":
        case "ExistsTypeAnnotation":
          return (0, s.fromString)("*", R);
        case "EmptyTypeAnnotation":
          return (0, s.fromString)("empty", R);
        case "AnyTypeAnnotation":
          return (0, s.fromString)("any", R);
        case "MixedTypeAnnotation":
          return (0, s.fromString)("mixed", R);
        case "ArrayTypeAnnotation":
          return (0, s.concat)([
            T.call(k, "elementType"),
            "[]"
          ]);
        case "TupleTypeAnnotation": {
          var He = T.map(k, "types"), Ae = (0, s.fromString)(", ").join(He), Be = Ae.getLineLength(1) <= R.wrapColumn;
          return Be ? R.arrayBracketSpacing ? P.push("[ ") : P.push("[") : P.push(`[
`), T.each(function(oe) {
            var Se = oe.getName(), Ce = oe.getValue();
            if (!Ce) P.push(",");
            else {
              var Ge = He[Se];
              Be ? Se > 0 && P.push(" ") : Ge = Ge.indent(R.tabWidth), P.push(Ge), (Se < M.types.length - 1 || !Be && h.isTrailingCommaEnabled(R, "arrays")) && P.push(","), Be || P.push(`
`);
            }
          }, "types"), Be && R.arrayBracketSpacing ? P.push(" ]") : P.push("]"), (0, s.concat)(P);
        }
        case "BooleanTypeAnnotation":
          return (0, s.fromString)("boolean", R);
        case "BooleanLiteralTypeAnnotation":
          return (0, t.default)(typeof M.value == "boolean"), (0, s.fromString)("" + M.value, R);
        case "InterfaceTypeAnnotation":
          return P.push("interface"), M.extends && M.extends.length > 0 && P.push(" extends ", (0, s.fromString)(", ").join(T.map(k, "extends"))), P.push(" ", T.call(k, "body")), (0, s.concat)(P);
        case "DeclareFunction":
          return I(T, [
            "function ",
            T.call(k, "id"),
            ";"
          ]);
        case "DeclareModule":
          return I(T, [
            "module ",
            T.call(k, "id"),
            " ",
            T.call(k, "body")
          ]);
        case "DeclareModuleExports":
          return I(T, [
            "module.exports",
            T.call(k, "typeAnnotation")
          ]);
        case "DeclareVariable":
          return I(T, [
            "var ",
            T.call(k, "id"),
            ";"
          ]);
        case "DeclareExportDeclaration":
        case "DeclareExportAllDeclaration":
          return (0, s.concat)([
            "declare ",
            N(T, R, k)
          ]);
        case "EnumDeclaration":
          return (0, s.concat)([
            "enum ",
            T.call(k, "id"),
            T.call(k, "body")
          ]);
        case "EnumBooleanBody":
        case "EnumNumberBody":
        case "EnumStringBody":
        case "EnumSymbolBody":
          return (M.type === "EnumSymbolBody" || M.explicitType) && P.push(" of ", M.type.slice(4, -4).toLowerCase()), P.push(` {
`, (0, s.fromString)(`
`).join(T.map(k, "members")).indent(R.tabWidth), `
}`), (0, s.concat)(P);
        case "EnumDefaultedMember":
          return (0, s.concat)([
            T.call(k, "id"),
            ","
          ]);
        case "EnumBooleanMember":
        case "EnumNumberMember":
        case "EnumStringMember":
          return (0, s.concat)([
            T.call(k, "id"),
            " = ",
            T.call(k, "init"),
            ","
          ]);
        case "InferredPredicate":
          return (0, s.fromString)("%checks", R);
        case "DeclaredPredicate":
          return (0, s.concat)([
            "%checks(",
            T.call(k, "value"),
            ")"
          ]);
        case "FunctionTypeAnnotation": {
          var De = T.getParentNode(0), Ke = !(f.ObjectTypeCallProperty.check(De) || f.ObjectTypeInternalSlot.check(De) && De.method || f.DeclareFunction.check(T.getParentNode(2))), st = Ke && !f.FunctionTypeParam.check(De) && !f.TypeAlias.check(De);
          st && P.push(": ");
          var Ye = !!M.typeParameters, Qe = Ye || M.params.length !== 1 || M.params[0].name;
          return P.push(Ye ? T.call(k, "typeParameters") : "", Qe ? "(" : "", F(T, R, k), Qe ? ")" : ""), M.returnType && P.push(Ke ? " => " : ": ", T.call(k, "returnType")), (0, s.concat)(P);
        }
        case "FunctionTypeParam": {
          var Ze = T.call(k, "name");
          return P.push(Ze), M.optional && P.push("?"), Ze.infos[0].line && P.push(": "), P.push(T.call(k, "typeAnnotation")), (0, s.concat)(P);
        }
        case "GenericTypeAnnotation":
          return (0, s.concat)([
            T.call(k, "id"),
            T.call(k, "typeParameters")
          ]);
        case "DeclareInterface":
          P.push("declare ");
        case "InterfaceDeclaration":
        case "TSInterfaceDeclaration":
          return M.declare && P.push("declare "), P.push("interface ", T.call(k, "id"), T.call(k, "typeParameters"), " "), M.extends && M.extends.length > 0 && P.push("extends ", (0, s.fromString)(", ").join(T.map(k, "extends")), " "), M.body && P.push(T.call(k, "body")), (0, s.concat)(P);
        case "ClassImplements":
        case "InterfaceExtends":
          return (0, s.concat)([
            T.call(k, "id"),
            T.call(k, "typeParameters")
          ]);
        case "IntersectionTypeAnnotation":
          return (0, s.fromString)(" & ").join(T.map(k, "types"));
        case "NullableTypeAnnotation":
          return (0, s.concat)([
            "?",
            T.call(k, "typeAnnotation")
          ]);
        case "NullLiteralTypeAnnotation":
          return (0, s.fromString)("null", R);
        case "ThisTypeAnnotation":
          return (0, s.fromString)("this", R);
        case "NumberTypeAnnotation":
          return (0, s.fromString)("number", R);
        case "ObjectTypeCallProperty":
          return T.call(k, "value");
        case "ObjectTypeIndexer":
          return M.static && P.push("static "), P.push(O(T, k), "["), M.id && P.push(T.call(k, "id"), ": "), P.push(T.call(k, "key"), "]: ", T.call(k, "value")), (0, s.concat)(P);
        case "ObjectTypeProperty":
          return (0, s.concat)([
            O(T, k),
            T.call(k, "key"),
            M.optional ? "?" : "",
            ": ",
            T.call(k, "value")
          ]);
        case "ObjectTypeInternalSlot":
          return (0, s.concat)([
            M.static ? "static " : "",
            "[[",
            T.call(k, "id"),
            "]]",
            M.optional ? "?" : "",
            M.value.type !== "FunctionTypeAnnotation" ? ": " : "",
            T.call(k, "value")
          ]);
        case "QualifiedTypeIdentifier":
          return (0, s.concat)([
            T.call(k, "qualification"),
            ".",
            T.call(k, "id")
          ]);
        case "StringLiteralTypeAnnotation":
          return (0, s.fromString)(ae(M.value, R), R);
        case "NumberLiteralTypeAnnotation":
        case "NumericLiteralTypeAnnotation":
          return (0, t.default)(typeof M.value == "number"), (0, s.fromString)(JSON.stringify(M.value), R);
        case "BigIntLiteralTypeAnnotation":
          return (0, s.fromString)(M.raw, R);
        case "StringTypeAnnotation":
          return (0, s.fromString)("string", R);
        case "DeclareTypeAlias":
          P.push("declare ");
        case "TypeAlias":
          return (0, s.concat)([
            "type ",
            T.call(k, "id"),
            T.call(k, "typeParameters"),
            " = ",
            T.call(k, "right"),
            ";"
          ]);
        case "DeclareOpaqueType":
          P.push("declare ");
        case "OpaqueType":
          return P.push("opaque type ", T.call(k, "id"), T.call(k, "typeParameters")), M.supertype && P.push(": ", T.call(k, "supertype")), M.impltype && P.push(" = ", T.call(k, "impltype")), P.push(";"), (0, s.concat)(P);
        case "TypeCastExpression":
          return (0, s.concat)([
            "(",
            T.call(k, "expression"),
            T.call(k, "typeAnnotation"),
            ")"
          ]);
        case "TypeParameterDeclaration":
        case "TypeParameterInstantiation":
          return (0, s.concat)([
            "<",
            (0, s.fromString)(", ").join(T.map(k, "params")),
            ">"
          ]);
        case "Variance":
          return M.kind === "plus" ? (0, s.fromString)("+") : M.kind === "minus" ? (0, s.fromString)("-") : (0, s.fromString)("");
        case "TypeParameter":
          return M.variance && P.push(O(T, k)), P.push(T.call(k, "name")), M.bound && P.push(T.call(k, "bound")), M.default && P.push("=", T.call(k, "default")), (0, s.concat)(P);
        case "TypeofTypeAnnotation":
          return (0, s.concat)([
            (0, s.fromString)("typeof ", R),
            T.call(k, "argument")
          ]);
        case "IndexedAccessType":
        case "OptionalIndexedAccessType":
          return (0, s.concat)([
            T.call(k, "objectType"),
            M.optional ? "?." : "",
            "[",
            T.call(k, "indexType"),
            "]"
          ]);
        case "UnionTypeAnnotation":
          return (0, s.fromString)(" | ").join(T.map(k, "types"));
        case "VoidTypeAnnotation":
          return (0, s.fromString)("void", R);
        case "NullTypeAnnotation":
          return (0, s.fromString)("null", R);
        case "SymbolTypeAnnotation":
          return (0, s.fromString)("symbol", R);
        case "BigIntTypeAnnotation":
          return (0, s.fromString)("bigint", R);
        case "TSType":
          throw new Error("unprintable type: " + JSON.stringify(M.type));
        case "TSNumberKeyword":
          return (0, s.fromString)("number", R);
        case "TSBigIntKeyword":
          return (0, s.fromString)("bigint", R);
        case "TSObjectKeyword":
          return (0, s.fromString)("object", R);
        case "TSBooleanKeyword":
          return (0, s.fromString)("boolean", R);
        case "TSStringKeyword":
          return (0, s.fromString)("string", R);
        case "TSSymbolKeyword":
          return (0, s.fromString)("symbol", R);
        case "TSAnyKeyword":
          return (0, s.fromString)("any", R);
        case "TSVoidKeyword":
          return (0, s.fromString)("void", R);
        case "TSIntrinsicKeyword":
          return (0, s.fromString)("intrinsic", R);
        case "TSThisType":
          return (0, s.fromString)("this", R);
        case "TSNullKeyword":
          return (0, s.fromString)("null", R);
        case "TSUndefinedKeyword":
          return (0, s.fromString)("undefined", R);
        case "TSUnknownKeyword":
          return (0, s.fromString)("unknown", R);
        case "TSNeverKeyword":
          return (0, s.fromString)("never", R);
        case "TSArrayType":
          return (0, s.concat)([
            T.call(k, "elementType"),
            "[]"
          ]);
        case "TSLiteralType":
          return T.call(k, "literal");
        case "TSUnionType":
          return (0, s.fromString)(" | ").join(T.map(k, "types"));
        case "TSIntersectionType":
          return (0, s.fromString)(" & ").join(T.map(k, "types"));
        case "TSConditionalType":
          return P.push(T.call(k, "checkType"), " extends ", T.call(k, "extendsType"), " ? ", T.call(k, "trueType"), " : ", T.call(k, "falseType")), (0, s.concat)(P);
        case "TSInferType":
          return P.push("infer ", T.call(k, "typeParameter")), (0, s.concat)(P);
        case "TSParenthesizedType":
          return (0, s.concat)([
            "(",
            T.call(k, "typeAnnotation"),
            ")"
          ]);
        case "TSFunctionType":
          return (0, s.concat)([
            T.call(k, "typeParameters"),
            "(",
            F(T, R, k),
            ") => ",
            T.call(k, "typeAnnotation", "typeAnnotation")
          ]);
        case "TSConstructorType":
          return (0, s.concat)([
            "new ",
            T.call(k, "typeParameters"),
            "(",
            F(T, R, k),
            ") => ",
            T.call(k, "typeAnnotation", "typeAnnotation")
          ]);
        case "TSMappedType":
          return P.push(M.readonly ? "readonly " : "", "[", T.call(k, "typeParameter"), "]", M.optional ? "?" : ""), M.typeAnnotation && P.push(": ", T.call(k, "typeAnnotation"), ";"), (0, s.concat)([
            `{
`,
            (0, s.concat)(P).indent(R.tabWidth),
            `
}`
          ]);
        case "TSTupleType":
          return (0, s.concat)([
            "[",
            (0, s.fromString)(", ").join(T.map(k, "elementTypes")),
            "]"
          ]);
        case "TSNamedTupleMember":
          return P.push(T.call(k, "label")), M.optional && P.push("?"), P.push(": ", T.call(k, "elementType")), (0, s.concat)(P);
        case "TSRestType":
          return (0, s.concat)([
            "...",
            T.call(k, "typeAnnotation")
          ]);
        case "TSOptionalType":
          return (0, s.concat)([
            T.call(k, "typeAnnotation"),
            "?"
          ]);
        case "TSIndexedAccessType":
          return (0, s.concat)([
            T.call(k, "objectType"),
            "[",
            T.call(k, "indexType"),
            "]"
          ]);
        case "TSTypeOperator":
          return (0, s.concat)([
            T.call(k, "operator"),
            " ",
            T.call(k, "typeAnnotation")
          ]);
        case "TSTypeLiteral": {
          var et = (0, s.fromString)(`
`).join(T.map(k, "members").map(function(ee) {
            return q(ee) !== ";" ? ee.concat(";") : ee;
          }));
          return et.isEmpty() ? (0, s.fromString)("{}", R) : (P.push(`{
`, et.indent(R.tabWidth), `
}`), (0, s.concat)(P));
        }
        case "TSEnumMember":
          return P.push(T.call(k, "id")), M.initializer && P.push(" = ", T.call(k, "initializer")), (0, s.concat)(P);
        case "TSTypeQuery":
          return (0, s.concat)([
            "typeof ",
            T.call(k, "exprName")
          ]);
        case "TSParameterProperty":
          return M.accessibility && P.push(M.accessibility, " "), M.export && P.push("export "), M.static && P.push("static "), M.readonly && P.push("readonly "), P.push(T.call(k, "parameter")), (0, s.concat)(P);
        case "TSTypeReference":
          return (0, s.concat)([
            T.call(k, "typeName"),
            T.call(k, "typeParameters")
          ]);
        case "TSQualifiedName":
          return (0, s.concat)([
            T.call(k, "left"),
            ".",
            T.call(k, "right")
          ]);
        case "TSAsExpression":
        case "TSSatisfiesExpression": {
          var ot = T.call(k, "expression");
          return P.push(ot, M.type === "TSSatisfiesExpression" ? " satisfies " : " as ", T.call(k, "typeAnnotation")), (0, s.concat)(P);
        }
        case "TSTypeCastExpression":
          return (0, s.concat)([
            T.call(k, "expression"),
            T.call(k, "typeAnnotation")
          ]);
        case "TSNonNullExpression":
          return (0, s.concat)([
            T.call(k, "expression"),
            "!"
          ]);
        case "TSTypeAnnotation":
          return (0, s.concat)([
            ": ",
            T.call(k, "typeAnnotation")
          ]);
        case "TSIndexSignature":
          return (0, s.concat)([
            M.readonly ? "readonly " : "",
            "[",
            T.map(k, "parameters"),
            "]",
            T.call(k, "typeAnnotation")
          ]);
        case "TSPropertySignature":
          return P.push(O(T, k), M.readonly ? "readonly " : ""), M.computed ? P.push("[", T.call(k, "key"), "]") : P.push(T.call(k, "key")), P.push(M.optional ? "?" : "", T.call(k, "typeAnnotation")), (0, s.concat)(P);
        case "TSMethodSignature":
          return M.kind === "get" ? P.push("get ") : M.kind === "set" && P.push("set "), M.computed ? P.push("[", T.call(k, "key"), "]") : P.push(T.call(k, "key")), M.optional && P.push("?"), P.push(T.call(k, "typeParameters"), "(", F(T, R, k), ")", T.call(k, "typeAnnotation")), (0, s.concat)(P);
        case "TSTypePredicate":
          return M.asserts && P.push("asserts "), P.push(T.call(k, "parameterName")), M.typeAnnotation && P.push(" is ", T.call(k, "typeAnnotation", "typeAnnotation")), (0, s.concat)(P);
        case "TSCallSignatureDeclaration":
          return (0, s.concat)([
            T.call(k, "typeParameters"),
            "(",
            F(T, R, k),
            ")",
            T.call(k, "typeAnnotation")
          ]);
        case "TSConstructSignatureDeclaration":
          return M.typeParameters ? P.push("new", T.call(k, "typeParameters")) : P.push("new "), P.push("(", F(T, R, k), ")", T.call(k, "typeAnnotation")), (0, s.concat)(P);
        case "TSTypeAliasDeclaration":
          return (0, s.concat)([
            M.declare ? "declare " : "",
            "type ",
            T.call(k, "id"),
            T.call(k, "typeParameters"),
            " = ",
            T.call(k, "typeAnnotation"),
            ";"
          ]);
        case "TSTypeParameter": {
          P.push(T.call(k, "name"));
          var De = T.getParentNode(0), lt = f.TSMappedType.check(De);
          return M.constraint && P.push(lt ? " in " : " extends ", T.call(k, "constraint")), M.default && P.push(" = ", T.call(k, "default")), (0, s.concat)(P);
        }
        case "TSTypeAssertion":
          return P.push("<", T.call(k, "typeAnnotation"), "> ", T.call(k, "expression")), (0, s.concat)(P);
        case "TSTypeParameterDeclaration":
        case "TSTypeParameterInstantiation":
          return (0, s.concat)([
            "<",
            (0, s.fromString)(", ").join(T.map(k, "params")),
            ">"
          ]);
        case "TSEnumDeclaration": {
          P.push(M.declare ? "declare " : "", M.const ? "const " : "", "enum ", T.call(k, "id"));
          var tt = (0, s.fromString)(`,
`).join(T.map(k, "members"));
          return tt.isEmpty() ? P.push(" {}") : P.push(` {
`, tt.indent(R.tabWidth), `
}`), (0, s.concat)(P);
        }
        case "TSExpressionWithTypeArguments":
          return (0, s.concat)([
            T.call(k, "expression"),
            T.call(k, "typeParameters")
          ]);
        case "TSInterfaceBody": {
          var me = (0, s.fromString)(`
`).join(T.map(k, "body").map(function(oe) {
            return q(oe) !== ";" ? oe.concat(";") : oe;
          }));
          return me.isEmpty() ? (0, s.fromString)("{}", R) : (0, s.concat)([
            `{
`,
            me.indent(R.tabWidth),
            `
}`
          ]);
        }
        case "TSImportType":
          return P.push("import(", T.call(k, "argument"), ")"), M.qualifier && P.push(".", T.call(k, "qualifier")), M.typeParameters && P.push(T.call(k, "typeParameters")), (0, s.concat)(P);
        case "TSImportEqualsDeclaration":
          return M.isExport && P.push("export "), P.push("import ", T.call(k, "id"), " = ", T.call(k, "moduleReference")), de((0, s.concat)(P));
        case "TSExternalModuleReference":
          return (0, s.concat)([
            "require(",
            T.call(k, "expression"),
            ")"
          ]);
        case "TSModuleDeclaration": {
          var De = T.getParentNode();
          if (De.type === "TSModuleDeclaration") P.push(".");
          else if (M.declare && P.push("declare "), !M.global) {
            var ut = M.id.type === "StringLiteral" || M.id.type === "Literal" && typeof M.id.value == "string";
            if (ut) P.push("module ");
            else if (M.loc && M.loc.lines && M.id.loc) {
              var ct = M.loc.lines.sliceString(M.loc.start, M.id.loc.start);
              ct.indexOf("module") >= 0 ? P.push("module ") : P.push("namespace ");
            } else P.push("namespace ");
          }
          return P.push(T.call(k, "id")), M.body && (P.push(" "), P.push(T.call(k, "body"))), (0, s.concat)(P);
        }
        case "TSModuleBlock": {
          var rt = T.call(function(ee) {
            return E(ee, R, k);
          }, "body");
          return rt.isEmpty() ? P.push("{}") : P.push(`{
`, rt.indent(R.tabWidth), `
}`), (0, s.concat)(P);
        }
        case "TSInstantiationExpression":
          return P.push(T.call(k, "expression"), T.call(k, "typeParameters")), (0, s.concat)(P);
        case "V8IntrinsicIdentifier":
          return (0, s.concat)([
            "%",
            T.call(k, "name")
          ]);
        case "TopicReference":
          return (0, s.fromString)("#");
        case "ClassHeritage":
        case "ComprehensionBlock":
        case "ComprehensionExpression":
        case "Glob":
        case "GeneratorExpression":
        case "LetStatement":
        case "LetExpression":
        case "GraphExpression":
        case "GraphIndexExpression":
        case "XMLDefaultDeclaration":
        case "XMLAnyName":
        case "XMLQualifiedIdentifier":
        case "XMLFunctionQualifiedIdentifier":
        case "XMLAttributeSelector":
        case "XMLFilterExpression":
        case "XML":
        case "XMLElement":
        case "XMLList":
        case "XMLEscape":
        case "XMLText":
        case "XMLStartTag":
        case "XMLEndTag":
        case "XMLPointTag":
        case "XMLName":
        case "XMLAttribute":
        case "XMLCdata":
        case "XMLComment":
        case "XMLProcessingInstruction":
        default:
          debugger;
          throw new Error("unknown type: " + JSON.stringify(M.type));
      }
    }
    function S(T, R) {
      var k = [], X = T.getValue();
      return X.decorators && X.decorators.length > 0 && !h.getParentExportDeclaration(T) ? T.each(function(Y) {
        k.push(R(Y), `
`);
      }, "decorators") : h.isExportDeclaration(X) && X.declaration && X.declaration.decorators && T.each(function(Y) {
        k.push(R(Y), `
`);
      }, "declaration", "decorators"), (0, s.concat)(k);
    }
    function E(T, R, k) {
      var X = [], Y = false, K = false;
      T.each(function(fe) {
        var le = fe.getValue();
        le && (le.type === "EmptyStatement" && !(le.comments && le.comments.length > 0) || (f.Comment.check(le) ? Y = true : f.Statement.check(le) ? K = true : o.assert(le), X.push({
          node: le,
          printed: k(fe)
        })));
      }), Y && (0, t.default)(K === false, "Comments may appear as statements in otherwise empty statement lists, but may not coexist with non-Comment nodes.");
      var M = null, P = X.length, se = [];
      return X.forEach(function(fe, le) {
        var pe = fe.printed, me = fe.node, _e = pe.length > 1, Ee = le > 0, V = le < P - 1, W, H, Q = me && me.loc && me.loc.lines, ne = Q && R.reuseWhitespace && h.getTrueLoc(me, Q);
        if (Ee) if (ne) {
          var ie = Q.skipSpaces(ne.start, true), he = ie ? ie.line : 1, ce = ne.start.line - he;
          W = Array(ce + 1).join(`
`);
        } else W = _e ? `

` : `
`;
        else W = "";
        if (V) if (ne) {
          var ue = Q.skipSpaces(ne.end), xe = ue ? ue.line : Q.length, ve = xe - ne.end.line;
          H = Array(ve + 1).join(`
`);
        } else H = _e ? `

` : `
`;
        else H = "";
        se.push(w(M, W), pe), V ? M = H : H && se.push(H);
      }), (0, s.concat)(se);
    }
    function w(T, R) {
      if (!T && !R) return (0, s.fromString)("");
      if (!T) return (0, s.fromString)(R);
      if (!R) return (0, s.fromString)(T);
      var k = (0, s.fromString)(T), X = (0, s.fromString)(R);
      return X.length > k.length ? X : k;
    }
    function C(T) {
      var R = [];
      T.declare && R.push("declare ");
      var k = T.accessibility || T.access;
      return typeof k == "string" && R.push(k, " "), T.static && R.push("static "), T.override && R.push("override "), T.abstract && R.push("abstract "), T.readonly && R.push("readonly "), R;
    }
    function D(T, R, k) {
      var X = T.getNode(), Y = X.kind, K = [], M = X.value;
      f.FunctionExpression.check(M) || (M = X), K.push.apply(K, C(X)), M.async && K.push("async "), M.generator && K.push("*"), (Y === "get" || Y === "set") && K.push(Y, " ");
      var P = T.call(k, "key");
      return X.computed && (P = (0, s.concat)([
        "[",
        P,
        "]"
      ])), K.push(P), X.optional && K.push("?"), X === M ? (K.push(T.call(k, "typeParameters"), "(", F(T, R, k), ")", T.call(k, "returnType")), X.body ? K.push(" ", T.call(k, "body")) : K.push(";")) : (K.push(T.call(k, "value", "typeParameters"), "(", T.call(function(se) {
        return F(se, R, k);
      }, "value"), ")", T.call(k, "value", "returnType")), M.body ? K.push(" ", T.call(k, "value", "body")) : K.push(";")), (0, s.concat)(K);
    }
    function A(T, R, k) {
      var X = T.map(k, "arguments"), Y = h.isTrailingCommaEnabled(R, "parameters"), K = (0, s.fromString)(", ").join(X);
      return K.getLineLength(1) > R.wrapColumn ? (K = (0, s.fromString)(`,
`).join(X), (0, s.concat)([
        `(
`,
        K.indent(R.tabWidth),
        Y ? `,
)` : `
)`
      ])) : (0, s.concat)([
        "(",
        K,
        ")"
      ]);
    }
    function F(T, R, k) {
      var X = T.getValue(), Y, K = [];
      X.params ? (Y = X.params, K = T.map(k, "params")) : X.parameters && (Y = X.parameters, K = T.map(k, "parameters")), X.defaults && T.each(function(P) {
        var se = P.getName(), fe = K[se];
        fe && P.getValue() && (K[se] = (0, s.concat)([
          fe,
          " = ",
          k(P)
        ]));
      }, "defaults"), X.rest && K.push((0, s.concat)([
        "...",
        T.call(k, "rest")
      ]));
      var M = (0, s.fromString)(", ").join(K);
      return M.length > 1 || M.getLineLength(1) > R.wrapColumn ? (M = (0, s.fromString)(`,
`).join(K), h.isTrailingCommaEnabled(R, "parameters") && !X.rest && Y[Y.length - 1].type !== "RestElement" ? M = (0, s.concat)([
        M,
        `,
`
      ]) : M = (0, s.concat)([
        M,
        `
`
      ]), (0, s.concat)([
        `
`,
        M.indent(R.tabWidth)
      ])) : M;
    }
    function B(T, R, k) {
      var X = T.getValue();
      if (X.assertions && X.assertions.length > 0) {
        var Y = [
          " assert {"
        ], K = T.map(k, "assertions"), M = (0, s.fromString)(", ").join(K);
        return M.length > 1 || M.getLineLength(1) > R.wrapColumn ? Y.push(`
`, (0, s.fromString)(`,
`).join(K).indent(R.tabWidth), `
}`) : Y.push(" ", M, " }"), (0, s.concat)(Y);
      }
      return (0, s.fromString)("");
    }
    function N(T, R, k) {
      var X = T.getValue(), Y = [
        "export "
      ];
      X.exportKind && X.exportKind === "type" && (X.declaration || Y.push("type "));
      var K = R.objectCurlySpacing;
      if (f.Declaration.assert(X), (X.default || X.type === "ExportDefaultDeclaration") && Y.push("default "), X.declaration) Y.push(T.call(k, "declaration"));
      else if (X.specifiers) {
        if (X.specifiers.length === 1 && X.specifiers[0].type === "ExportBatchSpecifier") Y.push("*");
        else if (X.specifiers.length === 0) Y.push("{}");
        else if (X.specifiers[0].type === "ExportDefaultSpecifier" || X.specifiers[0].type === "ExportNamespaceSpecifier") {
          var M = [], P = [];
          if (T.each(function(le) {
            var pe = le.getValue();
            pe.type === "ExportDefaultSpecifier" || pe.type === "ExportNamespaceSpecifier" ? M.push(k(le)) : P.push(k(le));
          }, "specifiers"), M.forEach(function(le, pe) {
            pe > 0 && Y.push(", "), Y.push(le);
          }), P.length > 0) {
            var se = (0, s.fromString)(", ").join(P);
            se.getLineLength(1) > R.wrapColumn && (se = (0, s.concat)([
              (0, s.fromString)(`,
`).join(P).indent(R.tabWidth),
              ","
            ])), M.length > 0 && Y.push(", "), se.length > 1 ? Y.push(`{
`, se, `
}`) : R.objectCurlySpacing ? Y.push("{ ", se, " }") : Y.push("{", se, "}");
          }
        } else Y.push(K ? "{ " : "{", (0, s.fromString)(", ").join(T.map(k, "specifiers")), K ? " }" : "}");
        X.source && Y.push(" from ", T.call(k, "source"), B(T, R, k));
      }
      var fe = (0, s.concat)(Y);
      return q(fe) !== ";" && !(X.declaration && (X.declaration.type === "FunctionDeclaration" || X.declaration.type === "ClassDeclaration" || X.declaration.type === "TSModuleDeclaration" || X.declaration.type === "TSInterfaceDeclaration" || X.declaration.type === "TSEnumDeclaration")) && (fe = (0, s.concat)([
        fe,
        ";"
      ])), fe;
    }
    function I(T, R) {
      var k = h.getParentExportDeclaration(T);
      return k ? (0, t.default)(k.type === "DeclareExportDeclaration") : R.unshift("declare "), (0, s.concat)(R);
    }
    function O(T, R) {
      return T.call(function(k) {
        var X = k.getValue();
        return X ? X === "plus" ? (0, s.fromString)("+") : X === "minus" ? (0, s.fromString)("-") : R(k) : (0, s.fromString)("");
      }, "variance");
    }
    function L(T, R) {
      return T.length > 1 ? (0, s.concat)([
        " ",
        T
      ]) : (0, s.concat)([
        `
`,
        de(T).indent(R.tabWidth)
      ]);
    }
    function q(T) {
      var R = T.lastPos();
      do {
        var k = T.charAt(R);
        if (/\S/.test(k)) return k;
      } while (T.prevPos(R));
    }
    function z(T) {
      return q(T) === "}";
    }
    function G(T) {
      return T.replace(/['"]/g, function(R) {
        return R === '"' ? "'" : '"';
      });
    }
    function J(T) {
      var R = r.getFieldValue(T, "value"), k = r.getFieldValue(T, "extra");
      if (k && typeof k.raw == "string" && R == k.rawValue) return k.raw;
      if (T.type === "Literal") {
        var X = T.raw;
        if (typeof X == "string" && R == X) return X;
      }
    }
    function Z(T) {
      return JSON.stringify(T).replace(/[\u2028\u2029]/g, function(R) {
        return "\\u" + R.charCodeAt(0).toString(16);
      });
    }
    function ae(T, R) {
      switch (o.assert(T), R.quote) {
        case "auto": {
          var k = Z(T), X = G(Z(G(T)));
          return k.length > X.length ? X : k;
        }
        case "single":
          return G(Z(G(T)));
        case "double":
        default:
          return Z(T);
      }
    }
    function de(T) {
      var R = q(T);
      return !R || `
};`.indexOf(R) < 0 ? (0, s.concat)([
        T,
        ";"
      ]) : T;
    }
    return printer;
  }
  (function(e) {
    Object.defineProperty(e, "__esModule", {
      value: true
    }), e.run = e.prettyPrint = e.print = e.visit = e.types = e.parse = void 0;
    var t = require$$0, r = t.__importDefault(require$$1), n = t.__importStar(requireMain());
    e.types = n;
    var l = requireParser();
    Object.defineProperty(e, "parse", {
      enumerable: true,
      get: function() {
        return l.parse;
      }
    });
    var s = requirePrinter(), u = requireMain();
    Object.defineProperty(e, "visit", {
      enumerable: true,
      get: function() {
        return u.visit;
      }
    });
    function d(g, v) {
      return new s.Printer(v).print(g);
    }
    e.print = d;
    function h(g, v) {
      return new s.Printer(v).printGenerically(g);
    }
    e.prettyPrint = h;
    function f(g, v) {
      return o(process.argv[2], g, v);
    }
    e.run = f;
    function o(g, v, c) {
      r.default.readFile(g, "utf-8", function(m, _) {
        if (m) {
          console.error(m);
          return;
        }
        y(_, v, c);
      });
    }
    function p(g) {
      process.stdout.write(g);
    }
    function y(g, v, c) {
      var m = c && c.writeback || p;
      v((0, l.parse)(g, c), function(_) {
        m(d(_, c).code);
      });
    }
  })(main$1);
  var Formula;
  ((Formula) => {
    function unique(e) {
      return [
        ...new Set(e)
      ];
    }
    function make_primitives_into_eval_col(e) {
      return {
        type: "EvalCol",
        name: "-",
        items: JSON.parse(e).map((r, n) => ({
          type: "EvalPrimitive",
          row_provenance: [
            n
          ],
          value: r
        })),
        col_provenance: []
      };
    }
    Formula.make_primitives_into_eval_col = make_primitives_into_eval_col;
    function lookup_in_raw_cols(e, t) {
      const r = JSON.parse(t), n = r.find((l) => l.name.startsWith(e));
      return n !== void 0 ? make_col_into_eval_col(n) : {
        type: "EvalCol",
        name: "ERROR",
        items: r[0].items.map((l, s) => ({
          type: "EvalPrimitive",
          row_provenance: [
            s
          ],
          value: "ERROR"
        })),
        col_provenance: []
      };
    }
    Formula.lookup_in_raw_cols = lookup_in_raw_cols;
    function make_raw_col_into_eval_col(e) {
      return make_col_into_eval_col(JSON.parse(e));
    }
    Formula.make_raw_col_into_eval_col = make_raw_col_into_eval_col;
    function make_col_into_eval_col(e) {
      const t = e.items.map((r) => ({
        type: "EvalPrimitive",
        value: r.value,
        row_provenance: r.row_indices
      }));
      return {
        type: "EvalCol",
        name: e.name,
        items: t,
        col_provenance: [
          e.name
        ]
      };
    }
    Formula.make_col_into_eval_col = make_col_into_eval_col;
    function make_literal_into_eval_col(e, t) {
      const r = [
        ...new Array(t)
      ].map((n, l) => ({
        type: "EvalPrimitive",
        value: e,
        row_provenance: [
          l
        ]
      }));
      return {
        type: "EvalCol",
        name: `${e}`,
        items: r,
        col_provenance: []
      };
    }
    Formula.make_literal_into_eval_col = make_literal_into_eval_col;
    function binary(op, a, b) {
      return {
        ...structuredClone(a),
        col_provenance: unique([
          ...a.col_provenance,
          ...b.col_provenance
        ]),
        items: a.items.map((item, i) => {
          const is_undefined = item.value === void 0 || b.items[i].value === void 0, row_provenance = is_undefined ? [] : unique([
            ...item.row_provenance,
            ...b.items[i].row_provenance
          ]);
          return {
            ...structuredClone(item),
            value: eval(`${item.value} ${op} ${b.items[i].value}`),
            row_provenance
          };
        })
      };
    }
    Formula.binary = binary;
    function unary(op, a) {
      return {
        ...structuredClone(a),
        items: a.items.map((item) => ({
          ...structuredClone(item),
          value: eval(`${op} ${item.value}`)
        }))
      };
    }
    Formula.unary = unary;
    function log(a) {
      return {
        ...structuredClone(a),
        items: a.items.map((item) => ({
          ...structuredClone(item),
          value: eval(`Math.log(${item.value})`)
        }))
      };
    }
    Formula.log = log;
    function count(e) {
      return {
        ...structuredClone(e),
        items: [
          {
            type: "EvalPrimitive",
            row_provenance: unique(e.items.flatMap((t) => t.row_provenance)),
            value: e.items.length
          }
        ]
      };
    }
    Formula.count = count;
    function sum(e) {
      return {
        ...structuredClone(e),
        items: [
          {
            type: "EvalPrimitive",
            row_provenance: unique(e.items.flatMap((t) => t.row_provenance)),
            value: e.items.reduce((t, r) => t + r.value, 0)
          }
        ]
      };
    }
    Formula.sum = sum;
    function mean(e) {
      return {
        ...structuredClone(e),
        items: [
          {
            type: "EvalPrimitive",
            row_provenance: unique(e.items.flatMap((t) => t.row_provenance)),
            value: e.items.reduce((t, r) => t + r.value, 0) / e.items.length
          }
        ]
      };
    }
    Formula.mean = mean;
    function array_index(e, t) {
      const r = t.items[0].value, n = e.items.length;
      return r > 0 ? ([
        ...new Array(r)
      ].forEach(() => e.items.splice(0, 0, {
        type: "EvalPrimitive",
        row_provenance: [],
        value: void 0
      })), e.items = e.items.slice(0, n)) : ([
        ...new Array(r)
      ].forEach(() => e.items.push({
        type: "EvalPrimitive",
        row_provenance: [],
        value: void 0
      })), e.items = e.items.slice(0, n)), structuredClone(e);
    }
    Formula.array_index = array_index;
    function evaluate_modifier(formula, target, cols) {
      let ast = main$1.parse(formula);
      const b = main$1.types.builders;
      main$1.visit(ast, {
        visitLiteral: function(e) {
          this.traverse(e), e.replace(b.callExpression(b.identifier("make_literal_into_eval_col"), [
            b.literal(e.node.value),
            b.literal(target.items.length)
          ]));
        },
        visitIdentifier: function(e) {
          this.traverse(e);
          const t = [
            "log",
            "mean",
            "count",
            "sum"
          ], r = [
            "X"
          ];
          t.includes(e.node.name.toLocaleLowerCase()) ? e.node.name = e.node.name.toLowerCase() : r.includes(e.node.name) ? e.replace(b.callExpression(b.identifier("make_raw_col_into_eval_col"), [
            b.literal(JSON.stringify(target))
          ])) : e.replace(b.callExpression(b.identifier("lookup_in_raw_cols"), [
            b.literal(e.node.name),
            b.literal(JSON.stringify(cols))
          ]));
        }
      }), main$1.visit(ast, {
        visitBinaryExpression: function(e) {
          this.traverse(e), e.replace(b.callExpression(b.identifier("binary"), [
            b.literal(e.node.operator),
            e.node.left,
            e.node.right
          ]));
        },
        visitUnaryExpression: function(e) {
          this.traverse(e), e.replace(b.callExpression(b.identifier("unary"), [
            b.literal(e.node.operator),
            e.node.argument
          ]));
        },
        visitMemberExpression: function(e) {
          this.traverse(e), e.node.computed && e.replace(b.callExpression(b.identifier("array_index"), [
            e.node.object,
            e.node.property
          ]));
        }
      });
      const printed = main$1.print(ast).code;
      try {
        const output = eval(`${printed}`);
        return output;
      } catch (e) {
        return console.warn(e), {
          type: "EvalCol",
          name: "NULL",
          items: target.items.map((t) => ({
            type: "EvalPrimitive",
            row_provenance: [],
            value: "NULL"
          })),
          col_provenance: []
        };
      }
    }
    Formula.evaluate_modifier = evaluate_modifier;
  })(Formula || (Formula = {}));
  function modifier_base(e) {
    return {
      ...e,
      id: get_tag_id(),
      range: e,
      parameters: [],
      encodings: [],
      group_name: void 0
    };
  }
  function modifier_vaxis(e, t = {}) {
    return {
      ...modifier_base(e),
      type: "VAxis",
      encodings: [
        "y"
      ],
      reverse: false,
      ...t
    };
  }
  function modifier_haxis(e, t = {}) {
    return {
      ...modifier_base(e),
      type: "HAxis",
      encodings: [
        "x"
      ],
      reverse: false,
      ...t
    };
  }
  function modifier_group_by(e, t = {}) {
    return {
      ...modifier_base(e),
      type: "Group",
      encodings: [
        "group"
      ],
      bin_size: 5,
      ...t
    };
  }
  function modifier_col_sort(e, t = {}) {
    return {
      ...modifier_base(e),
      type: "ColSort",
      encodings: [
        "sort"
      ],
      reverse: true,
      ...t
    };
  }
  function modifier_plot(e, t = {}) {
    return {
      ...modifier_base(e),
      type: "Plot",
      encodings: [
        "x",
        "y"
      ],
      ...t
    };
  }
  function modifier_size(e, t = {}) {
    return {
      ...modifier_base(e),
      type: "Size",
      encodings: [
        "size"
      ],
      size_type: "length",
      ...t
    };
  }
  function modifier_dense(e, t = {}) {
    return {
      ...modifier_base(e),
      type: "Dense",
      density: "abstract",
      size_multiplier: 1,
      ...t
    };
  }
  function modifier_color(e, t = {}) {
    return {
      ...modifier_base(e),
      type: "Color",
      encodings: [
        "color"
      ],
      scheme: "blue",
      varying: true,
      unique: false,
      ...t
    };
  }
  function modifier_derive(e, t = {}) {
    return {
      ...modifier_base(e),
      type: "Derive",
      formula: "1 + 2",
      encodings: [],
      ...t
    };
  }
  function modifier_overlay(e, t = {}) {
    return {
      ...modifier_base(e),
      type: "Overlay",
      ...t
    };
  }
  async function apply_modifier(e, t) {
    const r = structuredClone(e);
    try {
      await mut_apply_modifier(r, t);
    } catch (n) {
      replace_data(r.data, tag_error(n));
    }
    return r;
  }
  async function mut_apply_modifier(e, t) {
    var _a, _b, _c, _d, _e, _f, _g, _h;
    const { selected_cols: r, parameters: n } = get_selected_cols(e, t), l = (u) => u.items.map((d) => d.value), s = (u) => {
      var _a2;
      return n.length === 0 || n.length === 1 && ((_a2 = n.at(0)) == null ? void 0 : _a2.name) === u.name;
    };
    if (t.type === "VAxis") {
      const u = (_a = n.at(0)) == null ? void 0 : _a.data;
      r.forEach((d) => {
        d.encoding.y = {
          type: "Y",
          reverse: t.reverse,
          values: u ?? l(d),
          scale_values: u ?? l(d),
          show_axis: get_type_from_data_list(u ?? l(d)) === "Numerical" && s(d),
          self: s(d),
          bin_size: void 0
        }, d.encoding.mark ? d.encoding.mark.font_size = 9 : d.encoding.mark = {
          type: "Mark",
          font_size: 9,
          self: true
        }, s(d) && d.encoding.group && d.encoding.group.self && get_type_from_data_list(d.encoding.y.scale_values) === "Numerical" && (d.encoding.y.bin_size = d.encoding.group.num_bins, d.encoding.y.show_axis = true);
      });
    } else if (t.type === "ColSort") {
      const u = (_b = n.at(0)) == null ? void 0 : _b.data;
      r.forEach((d) => {
        d.encoding.sort = {
          type: "Sort",
          reverse: t.reverse,
          values: u ?? l(d),
          self: s(d)
        };
      });
    } else if (t.type === "Group") {
      const u = (_c = n.at(0)) == null ? void 0 : _c.data;
      r.forEach((d) => {
        if (s(d) && d.encoding.y && d.encoding.y.self && get_type_from_data_list(d.encoding.y.scale_values) === "Numerical" && (d.encoding.y.bin_size = t.bin_size, d.encoding.y.show_axis = true), s(d) && d.encoding.x && d.encoding.x.self && get_type_from_data_list(d.encoding.x.scale_values) === "Numerical" && (d.encoding.x.bin_size = t.bin_size, d.encoding.x.show_axis = true), d.encoding.group = {
          type: "Group",
          values: u ?? l(d),
          num_bins: t.bin_size,
          self: s(d)
        }, d.encoding.y && d.encoding.y.self && get_type_from_data_list(d.encoding.y.scale_values) === "Numerical" && (d.encoding.group.values = d.encoding.y.scale_values), d.encoding.x && d.encoding.x.self && get_type_from_data_list(d.encoding.x.scale_values) === "Numerical" && (d.encoding.group.values = d.encoding.x.scale_values, r.slice(1).forEach((h) => {
          h.encoding.x && h.encoding.x.self && h.encoding.x.overlay === true && (h.encoding.x.show_axis = false);
        })), d.encoding.xy && s(d) && d.encoding.xy.x.self && get_type_from_data_list(d.x_col.encoding.x.scale_values) === "Numerical" && d.encoding.xy.y.self && get_type_from_data_list(d.y_col.encoding.y.scale_values) === "Numerical") d.x_col.encoding.x.bin_size = t.bin_size, d.x_col.encoding.group = {
          ...d.encoding.group,
          values: d.x_col.encoding.x.scale_values
        }, d.y_col.encoding.y.bin_size = t.bin_size, d.y_col.encoding.group = {
          ...d.encoding.group,
          values: d.y_col.encoding.y.scale_values
        }, d.encoding.xy.x = {
          ...d.encoding.xy.x
        }, d.encoding.xy.y = {
          ...d.encoding.xy.y
        };
        else if (d.encoding.xy && !s(d)) d.x_col.encoding.group = {
          type: "Group",
          values: u ?? l(d),
          num_bins: t.bin_size,
          self: s(d)
        }, d.y_col.encoding.group = {
          type: "Group",
          values: u ?? l(d),
          num_bins: t.bin_size,
          self: s(d)
        };
        else if (d.encoding.xy && s(d) && (get_type_from_data_list(d.y_col.encoding.y.scale_values) !== "Numerical" || get_type_from_data_list(d.x_col.encoding.x.scale_values) !== "Numerical")) {
          const h = get_type_from_data_list(d.y_col.encoding.y.scale_values) === "Categorical";
          d.encoding.group = {
            type: "Group",
            values: h ? d.y_col.encoding.y.scale_values : d.x_col.encoding.x.scale_values,
            num_bins: t.bin_size,
            self: !h
          }, d.x_col.encoding.group = {
            type: "Group",
            values: d.encoding.group.values,
            num_bins: t.bin_size,
            self: !h
          }, d.y_col.encoding.group = {
            type: "Group",
            values: d.encoding.group.values,
            num_bins: t.bin_size,
            self: h
          };
        }
      });
    } else if (t.type === "HAxis") {
      const u = (_d = n.at(0)) == null ? void 0 : _d.data;
      r.forEach((d) => {
        d.encoding.x = {
          type: "X",
          reverse: t.reverse,
          values: u ?? l(d),
          scale_values: u ?? l(d),
          collapse: false,
          show_axis: get_type_from_data_list(u ?? l(d)) === "Numerical" && s(d),
          self: s(d),
          bin_size: void 0
        }, s(d) && d.encoding.group && d.encoding.group.self && get_type_from_data_list(d.encoding.x.values) === "Numerical" && (d.encoding.x.bin_size = d.encoding.group.num_bins, d.encoding.x.show_axis = true);
      });
    } else if (t.type === "Plot") {
      const u = structuredClone(r[0]), d = l(u);
      u.encoding.y = {
        type: "Y",
        reverse: true,
        values: d,
        scale_values: d,
        show_axis: true,
        self: s(u),
        bin_size: ((_e = u.encoding.y) == null ? void 0 : _e.bin_size) ?? void 0
      }, u.encoding.mark = {
        type: "Mark",
        ...u.encoding.mark,
        font_size: 9,
        snug: true,
        self: s(u)
      }, u.encoding.y.self && get_type_from_data_list(u.encoding.y.scale_values) === "Numerical" && u.encoding.group && u.encoding.group.self && (u.encoding.y.bin_size = u.encoding.group.num_bins);
      const h = structuredClone(r[1]), f = l(h);
      h.encoding.x = {
        type: "X",
        reverse: false,
        values: f,
        scale_values: f,
        collapse: true,
        show_axis: true,
        self: s(h),
        bin_size: ((_f = h.encoding.x) == null ? void 0 : _f.bin_size) ?? void 0
      }, h.encoding.mark = {
        type: "Mark",
        ...h.encoding.mark,
        font_size: 9,
        snug: true,
        self: s(h)
      }, h.encoding.x.self && get_type_from_data_list(h.encoding.x.scale_values) === "Numerical" && h.encoding.group && h.encoding.group.self && (h.encoding.x.bin_size = h.encoding.group.num_bins, h.encoding.x.collapse = true);
      const o = `Plot(${h.name}, ${u.name})`, p = {
        type: "Col",
        name: o,
        encoding: {
          xy: {
            type: "XY",
            x: h.encoding.x,
            y: u.encoding.y,
            self: true
          },
          mark: {
            type: "Mark",
            self: true,
            density: "abstract"
          },
          group: u.encoding.group ?? void 0
        },
        id: get_tag_id(),
        items: f.map((g, v) => ({
          id: `(${h.items[v].id}, ${u.items[v].id})`,
          type: "Mark",
          mark_type: "Text",
          value: `(${g}, ${d[v]})`,
          row_indices: [
            v
          ],
          col_name: o
        })),
        x_col: h,
        y_col: u
      }, y = {
        id: get_tag_id(),
        type: "PlotView",
        items: [
          h,
          u,
          p
        ],
        x: h,
        y: u,
        points: p,
        mask: r.map((g) => g.name),
        parameters: n
      };
      remove_nodes_by_id(e.data, [
        r[0].id
      ]), replace_data(r[1], y);
    } else if (t.type === "Size") {
      const u = (_g = n.at(0)) == null ? void 0 : _g.data;
      r.forEach((d) => {
        get_type_from_data_list(u ?? l(d)) !== "Categorical" && (d.encoding.size = {
          type: "Size",
          values: u ?? l(d),
          scale_values: u ?? l(d),
          self: s(d)
        });
      });
    } else if (t.type === "Color") {
      const u = (_h = n.at(0)) == null ? void 0 : _h.data;
      r.forEach((d, h) => {
        d.encoding.color = {
          type: "Color",
          values: u ?? l(d),
          scale_values: u ?? l(d),
          scheme: t.unique ? get_unique_scheme(h) : t.scheme,
          varying: t.varying,
          unique: t.unique,
          self: s(d)
        };
      });
    } else if (t.type === "Dense") r.forEach((u) => {
      u.encoding.mark === void 0 ? u.encoding.mark = {
        type: "Mark",
        density: t.density,
        density_mult: t.size_multiplier,
        self: true
      } : (u.encoding.mark.density = t.density, u.encoding.mark.density_mult = t.size_multiplier);
    });
    else if (t.type === "Derive") r.forEach((u) => {
      if (u.encoding.group !== void 0) {
        let d = group_marks_by_value(u.items, u.encoding.group.values, u.encoding.group.num_bins);
        u.encoding.xy && u.encoding.xy.x.self && u.encoding.xy.x.bin_size && u.encoding.xy.y.self && u.encoding.xy.y.bin_size && (d = group_marks_by_xy(u.items, u.encoding.xy.x.values, u.encoding.xy.y.values, u.encoding.group.num_bins, u.encoding.group.num_bins));
        const h = [];
        for (const f of d) {
          const o = Formula.evaluate_modifier(t.formula, {
            ...u,
            items: f
          }, find_all_cols(e.data));
          h.push(...o.items);
        }
        if (u.encoding.y !== void 0 && (u.encoding.y = {
          ...u.encoding.y,
          values: h.map((f, o) => (d[o].x0 + d[o].x1) / 2)
        }, u.encoding.y.bin_size || (u.encoding.group.values = [
          ...new Set(u.encoding.group.values)
        ])), u.encoding.xy !== void 0) {
          const { x: f, y: o } = u.encoding.xy;
          f.self && f.bin_size && o.self && o.bin_size ? u.encoding.xy = {
            ...u.encoding.xy,
            x: {
              ...u.encoding.xy.x,
              values: h.map((p, y) => (d[y].x0 + d[y].x1) / 2)
            },
            y: {
              ...u.encoding.xy.y,
              values: h.map((p, y) => (d[y].y0 + d[y].y1) / 2)
            }
          } : (u.encoding.xy = {
            ...u.encoding.xy,
            x: {
              ...u.encoding.xy.x,
              values: h.map((p) => average(p.row_provenance.map((y) => f.values[y])))
            },
            y: {
              ...u.encoding.xy.y,
              values: h.map((p) => average(p.row_provenance.map((y) => o.values[y])))
            }
          }, u.encoding.group.values = [
            ...new Set(u.encoding.group.values)
          ]);
        }
        h.length === d.length && u.encoding.y === void 0 && u.encoding.xy === void 0 && (u.encoding.group = void 0), u.items = u.items.slice(0, h.length), u.items.forEach((f, o) => {
          f.value = h[o].value, f.row_indices = h[o].row_provenance;
        });
      } else {
        const d = Formula.evaluate_modifier(t.formula, u, find_all_cols(e.data));
        console.log(d), u.items = u.items.slice(0, d.items.length), u.items.forEach((h, f) => {
          h.value = d.items[f].value, h.row_indices = d.items[f].row_provenance;
        });
      }
    });
    else if (t.type === "Overlay") {
      let { encoding_type: u, encoding_group: d } = get_overlay_encoding(r);
      if (u === void 0) {
        console.warn("[Overlay] Could not find a suitable shared encoding.");
        return;
      }
      const h = {
        id: get_tag_id(),
        type: "OverlayView",
        items: structuredClone(r),
        mask: r.map((o) => o.name),
        parameters: n,
        encoding_group: d,
        encoding: u
      }, f = (o) => o.type === "PlotView" ? o.points.encoding : o.encoding;
      if (u === "x" || u === "x and y") {
        const o = h.items.flatMap((p) => f(p).x.scale_values ?? []);
        h.items.forEach((p) => {
          f(p).x.scale_values = o;
        });
      }
      if (u === "y" || u === "x and y") {
        const o = h.items.flatMap((p) => f(p).y.scale_values ?? []);
        h.items.forEach((p) => {
          f(p).y.scale_values = o;
        });
      }
      if (u === "y" && d && h.items.every((o) => f(o).group.self)) {
        const o = h.items.flatMap((p) => f(p).group.values ?? []);
        h.items.forEach((p) => {
          f(p).group.values = o;
        });
      }
      if (u === "x" && h.items.slice(1).forEach((o) => {
        f(o).x.show_axis = false, f(o).x.overlay = true;
      }), u === "x" && !d && h.items.forEach((o) => {
        delete f(o).group;
      }), u === "x" && d) {
        if (h.items.every((o) => f(o).group.self)) {
          const o = h.items.flatMap((p) => f(p).group.values ?? []);
          h.items.forEach((p) => {
            f(p).group.values = o;
          });
        } else if (h.items.every((o) => !f(o).group.self)) {
          let o = function(y) {
            if (y.length <= 1) return true;
            const g = y[0];
            return y.every((v) => v.length === g.length && v.every((c, m) => c === g[m]));
          };
          const p = h.items.map((y) => f(y).group.values ?? []);
          o(p) || h.items.forEach((y) => {
            delete f(y).group;
          });
        }
      }
      if (u === "xy") {
        const o = h.items.flatMap((y) => f(y).xy.x.scale_values ?? []);
        h.items.forEach((y) => {
          f(y).xy.x.scale_values = o;
        });
        const p = h.items.flatMap((y) => f(y).xy.y.scale_values ?? []);
        h.items.forEach((y) => {
          f(y).xy.y.scale_values = p;
        });
      }
      r.slice(1).forEach((o) => remove_nodes_by_id(e.data, [
        o.id
      ])), replace_data(r[0], h);
    } else assert_never(t);
  }
  function get_overlay_encoding(e) {
    let t, r = (l) => e.every(l);
    r((l) => l.encoding.xy !== void 0) ? t = "xy" : r((l) => l.encoding.x !== void 0 && l.encoding.y !== void 0) ? t = "x and y" : e.every((l) => l.encoding.x) ? t = "x" : e.every((l) => l.encoding.y !== void 0) && (t = "y");
    let n = r((l) => l.encoding.group !== void 0);
    return {
      encoding_type: t,
      encoding_group: n
    };
  }
  function get_selected_cols(e, t) {
    const r = find_all_cols(e.data);
    return {
      selected_cols: r.slice(t.range.start_idx, t.range.end_idx),
      parameters: t.parameters.map((l) => ({
        ...l,
        data: r.find((s) => s.name === l.name).items.map((s) => s.value)
      }))
    };
  }
  function selection_to_col_range(e, t) {
    const n = navigate_to_tag(e.data, t, e.active_tag).filter(is_data_dap).map((d) => d.data);
    assert(n.every((d) => d.type === "Col"), "[section_to_col_range] Can only convert col selections so far! Find me and fix.");
    const l = find_all_cols(e.data);
    let s = 1 / 0, u = -1 / 0;
    return l.forEach((d, h) => {
      n.includes(d) && (s = Math.min(s, h), u = Math.max(u, h) + 1);
    }), {
      start_idx: s,
      end_idx: u
    };
  }
  function get_unique_scheme(e) {
    const t = [
      "blue",
      "orange",
      "purple",
      "green",
      "red"
    ];
    return t[e % t.length];
  }
  function _defineProperty(e, t, r) {
    return (t = _toPropertyKey(t)) in e ? Object.defineProperty(e, t, {
      value: r,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[t] = r, e;
  }
  function _extends() {
    return _extends = Object.assign ? Object.assign.bind() : function(e) {
      for (var t = 1; t < arguments.length; t++) {
        var r = arguments[t];
        for (var n in r) ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
      }
      return e;
    }, _extends.apply(null, arguments);
  }
  function ownKeys(e, t) {
    var r = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      t && (n = n.filter(function(l) {
        return Object.getOwnPropertyDescriptor(e, l).enumerable;
      })), r.push.apply(r, n);
    }
    return r;
  }
  function _objectSpread2(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t] != null ? arguments[t] : {};
      t % 2 ? ownKeys(Object(r), true).forEach(function(n) {
        _defineProperty(e, n, r[n]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : ownKeys(Object(r)).forEach(function(n) {
        Object.defineProperty(e, n, Object.getOwnPropertyDescriptor(r, n));
      });
    }
    return e;
  }
  function _objectWithoutProperties(e, t) {
    if (e == null) return {};
    var r, n, l = _objectWithoutPropertiesLoose(e, t);
    if (Object.getOwnPropertySymbols) {
      var s = Object.getOwnPropertySymbols(e);
      for (n = 0; n < s.length; n++) r = s[n], t.indexOf(r) === -1 && {}.propertyIsEnumerable.call(e, r) && (l[r] = e[r]);
    }
    return l;
  }
  function _objectWithoutPropertiesLoose(e, t) {
    if (e == null) return {};
    var r = {};
    for (var n in e) if ({}.hasOwnProperty.call(e, n)) {
      if (t.indexOf(n) !== -1) continue;
      r[n] = e[n];
    }
    return r;
  }
  function _toPrimitive(e, t) {
    if (typeof e != "object" || !e) return e;
    var r = e[Symbol.toPrimitive];
    if (r !== void 0) {
      var n = r.call(e, t);
      if (typeof n != "object") return n;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (t === "string" ? String : Number)(e);
  }
  function _toPropertyKey(e) {
    var t = _toPrimitive(e, "string");
    return typeof t == "symbol" ? t : t + "";
  }
  function _typeof(e) {
    "@babel/helpers - typeof";
    return _typeof = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(t) {
      return typeof t;
    } : function(t) {
      return t && typeof Symbol == "function" && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
    }, _typeof(e);
  }
  var version = "1.15.7";
  function userAgent(e) {
    if (typeof window < "u" && window.navigator) return !!navigator.userAgent.match(e);
  }
  var IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i), Edge = userAgent(/Edge/i), FireFox = userAgent(/firefox/i), Safari = userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i), IOS = userAgent(/iP(ad|od|hone)/i), ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i), captureMode = {
    capture: false,
    passive: false
  };
  function on(e, t, r) {
    e.addEventListener(t, r, !IE11OrLess && captureMode);
  }
  function off(e, t, r) {
    e.removeEventListener(t, r, !IE11OrLess && captureMode);
  }
  function matches(e, t) {
    if (t) {
      if (t[0] === ">" && (t = t.substring(1)), e) try {
        if (e.matches) return e.matches(t);
        if (e.msMatchesSelector) return e.msMatchesSelector(t);
        if (e.webkitMatchesSelector) return e.webkitMatchesSelector(t);
      } catch {
        return false;
      }
      return false;
    }
  }
  function getParentOrHost(e) {
    return e.host && e !== document && e.host.nodeType && e.host !== e ? e.host : e.parentNode;
  }
  function closest(e, t, r, n) {
    if (e) {
      r = r || document;
      do {
        if (t != null && (t[0] === ">" ? e.parentNode === r && matches(e, t) : matches(e, t)) || n && e === r) return e;
        if (e === r) break;
      } while (e = getParentOrHost(e));
    }
    return null;
  }
  var R_SPACE = /\s+/g;
  function toggleClass(e, t, r) {
    if (e && t) if (e.classList) e.classList[r ? "add" : "remove"](t);
    else {
      var n = (" " + e.className + " ").replace(R_SPACE, " ").replace(" " + t + " ", " ");
      e.className = (n + (r ? " " + t : "")).replace(R_SPACE, " ");
    }
  }
  function css(e, t, r) {
    var n = e && e.style;
    if (n) {
      if (r === void 0) return document.defaultView && document.defaultView.getComputedStyle ? r = document.defaultView.getComputedStyle(e, "") : e.currentStyle && (r = e.currentStyle), t === void 0 ? r : r[t];
      !(t in n) && t.indexOf("webkit") === -1 && (t = "-webkit-" + t), n[t] = r + (typeof r == "string" ? "" : "px");
    }
  }
  function matrix(e, t) {
    var r = "";
    if (typeof e == "string") r = e;
    else do {
      var n = css(e, "transform");
      n && n !== "none" && (r = n + " " + r);
    } while (!t && (e = e.parentNode));
    var l = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
    return l && new l(r);
  }
  function find(e, t, r) {
    if (e) {
      var n = e.getElementsByTagName(t), l = 0, s = n.length;
      if (r) for (; l < s; l++) r(n[l], l);
      return n;
    }
    return [];
  }
  function getWindowScrollingElement() {
    var e = document.scrollingElement;
    return e || document.documentElement;
  }
  function getRect(e, t, r, n, l) {
    if (!(!e.getBoundingClientRect && e !== window)) {
      var s, u, d, h, f, o, p;
      if (e !== window && e.parentNode && e !== getWindowScrollingElement() ? (s = e.getBoundingClientRect(), u = s.top, d = s.left, h = s.bottom, f = s.right, o = s.height, p = s.width) : (u = 0, d = 0, h = window.innerHeight, f = window.innerWidth, o = window.innerHeight, p = window.innerWidth), (t || r) && e !== window && (l = l || e.parentNode, !IE11OrLess)) do
        if (l && l.getBoundingClientRect && (css(l, "transform") !== "none" || r && css(l, "position") !== "static")) {
          var y = l.getBoundingClientRect();
          u -= y.top + parseInt(css(l, "border-top-width")), d -= y.left + parseInt(css(l, "border-left-width")), h = u + s.height, f = d + s.width;
          break;
        }
      while (l = l.parentNode);
      if (n && e !== window) {
        var g = matrix(l || e), v = g && g.a, c = g && g.d;
        g && (u /= c, d /= v, p /= v, o /= c, h = u + o, f = d + p);
      }
      return {
        top: u,
        left: d,
        bottom: h,
        right: f,
        width: p,
        height: o
      };
    }
  }
  function isScrolledPast(e, t, r) {
    for (var n = getParentAutoScrollElement(e, true), l = getRect(e)[t]; n; ) {
      var s = getRect(n)[r], u = void 0;
      if (u = l >= s, !u) return n;
      if (n === getWindowScrollingElement()) break;
      n = getParentAutoScrollElement(n, false);
    }
    return false;
  }
  function getChild(e, t, r, n) {
    for (var l = 0, s = 0, u = e.children; s < u.length; ) {
      if (u[s].style.display !== "none" && u[s] !== Sortable.ghost && (n || u[s] !== Sortable.dragged) && closest(u[s], r.draggable, e, false)) {
        if (l === t) return u[s];
        l++;
      }
      s++;
    }
    return null;
  }
  function lastChild(e, t) {
    for (var r = e.lastElementChild; r && (r === Sortable.ghost || css(r, "display") === "none" || t && !matches(r, t)); ) r = r.previousElementSibling;
    return r || null;
  }
  function index(e, t) {
    var r = 0;
    if (!e || !e.parentNode) return -1;
    for (; e = e.previousElementSibling; ) e.nodeName.toUpperCase() !== "TEMPLATE" && e !== Sortable.clone && (!t || matches(e, t)) && r++;
    return r;
  }
  function getRelativeScrollOffset(e) {
    var t = 0, r = 0, n = getWindowScrollingElement();
    if (e) do {
      var l = matrix(e), s = l.a, u = l.d;
      t += e.scrollLeft * s, r += e.scrollTop * u;
    } while (e !== n && (e = e.parentNode));
    return [
      t,
      r
    ];
  }
  function indexOfObject(e, t) {
    for (var r in e) if (e.hasOwnProperty(r)) {
      for (var n in t) if (t.hasOwnProperty(n) && t[n] === e[r][n]) return Number(r);
    }
    return -1;
  }
  function getParentAutoScrollElement(e, t) {
    if (!e || !e.getBoundingClientRect) return getWindowScrollingElement();
    var r = e, n = false;
    do
      if (r.clientWidth < r.scrollWidth || r.clientHeight < r.scrollHeight) {
        var l = css(r);
        if (r.clientWidth < r.scrollWidth && (l.overflowX == "auto" || l.overflowX == "scroll") || r.clientHeight < r.scrollHeight && (l.overflowY == "auto" || l.overflowY == "scroll")) {
          if (!r.getBoundingClientRect || r === document.body) return getWindowScrollingElement();
          if (n || t) return r;
          n = true;
        }
      }
    while (r = r.parentNode);
    return getWindowScrollingElement();
  }
  function extend(e, t) {
    if (e && t) for (var r in t) t.hasOwnProperty(r) && (e[r] = t[r]);
    return e;
  }
  function isRectEqual(e, t) {
    return Math.round(e.top) === Math.round(t.top) && Math.round(e.left) === Math.round(t.left) && Math.round(e.height) === Math.round(t.height) && Math.round(e.width) === Math.round(t.width);
  }
  var _throttleTimeout;
  function throttle(e, t) {
    return function() {
      if (!_throttleTimeout) {
        var r = arguments, n = this;
        r.length === 1 ? e.call(n, r[0]) : e.apply(n, r), _throttleTimeout = setTimeout(function() {
          _throttleTimeout = void 0;
        }, t);
      }
    };
  }
  function cancelThrottle() {
    clearTimeout(_throttleTimeout), _throttleTimeout = void 0;
  }
  function scrollBy(e, t, r) {
    e.scrollLeft += t, e.scrollTop += r;
  }
  function clone(e) {
    var t = window.Polymer, r = window.jQuery || window.Zepto;
    return t && t.dom ? t.dom(e).cloneNode(true) : r ? r(e).clone(true)[0] : e.cloneNode(true);
  }
  function getChildContainingRectFromElement(e, t, r) {
    var n = {};
    return Array.from(e.children).forEach(function(l) {
      var s, u, d, h;
      if (!(!closest(l, t.draggable, e, false) || l.animated || l === r)) {
        var f = getRect(l);
        n.left = Math.min((s = n.left) !== null && s !== void 0 ? s : 1 / 0, f.left), n.top = Math.min((u = n.top) !== null && u !== void 0 ? u : 1 / 0, f.top), n.right = Math.max((d = n.right) !== null && d !== void 0 ? d : -1 / 0, f.right), n.bottom = Math.max((h = n.bottom) !== null && h !== void 0 ? h : -1 / 0, f.bottom);
      }
    }), n.width = n.right - n.left, n.height = n.bottom - n.top, n.x = n.left, n.y = n.top, n;
  }
  var expando = "Sortable" + (/* @__PURE__ */ new Date()).getTime();
  function AnimationStateManager() {
    var e = [], t;
    return {
      captureAnimationState: function() {
        if (e = [], !!this.options.animation) {
          var n = [].slice.call(this.el.children);
          n.forEach(function(l) {
            if (!(css(l, "display") === "none" || l === Sortable.ghost)) {
              e.push({
                target: l,
                rect: getRect(l)
              });
              var s = _objectSpread2({}, e[e.length - 1].rect);
              if (l.thisAnimationDuration) {
                var u = matrix(l, true);
                u && (s.top -= u.f, s.left -= u.e);
              }
              l.fromRect = s;
            }
          });
        }
      },
      addAnimationState: function(n) {
        e.push(n);
      },
      removeAnimationState: function(n) {
        e.splice(indexOfObject(e, {
          target: n
        }), 1);
      },
      animateAll: function(n) {
        var l = this;
        if (!this.options.animation) {
          clearTimeout(t), typeof n == "function" && n();
          return;
        }
        var s = false, u = 0;
        e.forEach(function(d) {
          var h = 0, f = d.target, o = f.fromRect, p = getRect(f), y = f.prevFromRect, g = f.prevToRect, v = d.rect, c = matrix(f, true);
          c && (p.top -= c.f, p.left -= c.e), f.toRect = p, f.thisAnimationDuration && isRectEqual(y, p) && !isRectEqual(o, p) && (v.top - p.top) / (v.left - p.left) === (o.top - p.top) / (o.left - p.left) && (h = calculateRealTime(v, y, g, l.options)), isRectEqual(p, o) || (f.prevFromRect = o, f.prevToRect = p, h || (h = l.options.animation), l.animate(f, v, p, h)), h && (s = true, u = Math.max(u, h), clearTimeout(f.animationResetTimer), f.animationResetTimer = setTimeout(function() {
            f.animationTime = 0, f.prevFromRect = null, f.fromRect = null, f.prevToRect = null, f.thisAnimationDuration = null;
          }, h), f.thisAnimationDuration = h);
        }), clearTimeout(t), s ? t = setTimeout(function() {
          typeof n == "function" && n();
        }, u) : typeof n == "function" && n(), e = [];
      },
      animate: function(n, l, s, u) {
        if (u) {
          css(n, "transition", ""), css(n, "transform", "");
          var d = matrix(this.el), h = d && d.a, f = d && d.d, o = (l.left - s.left) / (h || 1), p = (l.top - s.top) / (f || 1);
          n.animatingX = !!o, n.animatingY = !!p, css(n, "transform", "translate3d(" + o + "px," + p + "px,0)"), this.forRepaintDummy = repaint(n), css(n, "transition", "transform " + u + "ms" + (this.options.easing ? " " + this.options.easing : "")), css(n, "transform", "translate3d(0,0,0)"), typeof n.animated == "number" && clearTimeout(n.animated), n.animated = setTimeout(function() {
            css(n, "transition", ""), css(n, "transform", ""), n.animated = false, n.animatingX = false, n.animatingY = false;
          }, u);
        }
      }
    };
  }
  function repaint(e) {
    return e.offsetWidth;
  }
  function calculateRealTime(e, t, r, n) {
    return Math.sqrt(Math.pow(t.top - e.top, 2) + Math.pow(t.left - e.left, 2)) / Math.sqrt(Math.pow(t.top - r.top, 2) + Math.pow(t.left - r.left, 2)) * n.animation;
  }
  var plugins = [], defaults = {
    initializeByDefault: true
  }, PluginManager = {
    mount: function e(t) {
      for (var r in defaults) defaults.hasOwnProperty(r) && !(r in t) && (t[r] = defaults[r]);
      plugins.forEach(function(n) {
        if (n.pluginName === t.pluginName) throw "Sortable: Cannot mount plugin ".concat(t.pluginName, " more than once");
      }), plugins.push(t);
    },
    pluginEvent: function e(t, r, n) {
      var l = this;
      this.eventCanceled = false, n.cancel = function() {
        l.eventCanceled = true;
      };
      var s = t + "Global";
      plugins.forEach(function(u) {
        r[u.pluginName] && (r[u.pluginName][s] && r[u.pluginName][s](_objectSpread2({
          sortable: r
        }, n)), r.options[u.pluginName] && r[u.pluginName][t] && r[u.pluginName][t](_objectSpread2({
          sortable: r
        }, n)));
      });
    },
    initializePlugins: function e(t, r, n, l) {
      plugins.forEach(function(d) {
        var h = d.pluginName;
        if (!(!t.options[h] && !d.initializeByDefault)) {
          var f = new d(t, r, t.options);
          f.sortable = t, f.options = t.options, t[h] = f, _extends(n, f.defaults);
        }
      });
      for (var s in t.options) if (t.options.hasOwnProperty(s)) {
        var u = this.modifyOption(t, s, t.options[s]);
        typeof u < "u" && (t.options[s] = u);
      }
    },
    getEventProperties: function e(t, r) {
      var n = {};
      return plugins.forEach(function(l) {
        typeof l.eventProperties == "function" && _extends(n, l.eventProperties.call(r[l.pluginName], t));
      }), n;
    },
    modifyOption: function e(t, r, n) {
      var l;
      return plugins.forEach(function(s) {
        t[s.pluginName] && s.optionListeners && typeof s.optionListeners[r] == "function" && (l = s.optionListeners[r].call(t[s.pluginName], n));
      }), l;
    }
  };
  function dispatchEvent(e) {
    var t = e.sortable, r = e.rootEl, n = e.name, l = e.targetEl, s = e.cloneEl, u = e.toEl, d = e.fromEl, h = e.oldIndex, f = e.newIndex, o = e.oldDraggableIndex, p = e.newDraggableIndex, y = e.originalEvent, g = e.putSortable, v = e.extraEventProperties;
    if (t = t || r && r[expando], !!t) {
      var c, m = t.options, _ = "on" + n.charAt(0).toUpperCase() + n.substr(1);
      window.CustomEvent && !IE11OrLess && !Edge ? c = new CustomEvent(n, {
        bubbles: true,
        cancelable: true
      }) : (c = document.createEvent("Event"), c.initEvent(n, true, true)), c.to = u || r, c.from = d || r, c.item = l || r, c.clone = s, c.oldIndex = h, c.newIndex = f, c.oldDraggableIndex = o, c.newDraggableIndex = p, c.originalEvent = y, c.pullMode = g ? g.lastPutMode : void 0;
      var x = _objectSpread2(_objectSpread2({}, v), PluginManager.getEventProperties(n, t));
      for (var S in x) c[S] = x[S];
      r && r.dispatchEvent(c), m[_] && m[_].call(t, c);
    }
  }
  var _excluded = [
    "evt"
  ], pluginEvent = function e(t, r) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, l = n.evt, s = _objectWithoutProperties(n, _excluded);
    PluginManager.pluginEvent.bind(Sortable)(t, r, _objectSpread2({
      dragEl,
      parentEl,
      ghostEl,
      rootEl,
      nextEl,
      lastDownEl,
      cloneEl,
      cloneHidden,
      dragStarted: moved,
      putSortable,
      activeSortable: Sortable.active,
      originalEvent: l,
      oldIndex,
      oldDraggableIndex,
      newIndex,
      newDraggableIndex,
      hideGhostForTarget: _hideGhostForTarget,
      unhideGhostForTarget: _unhideGhostForTarget,
      cloneNowHidden: function() {
        cloneHidden = true;
      },
      cloneNowShown: function() {
        cloneHidden = false;
      },
      dispatchSortableEvent: function(d) {
        _dispatchEvent({
          sortable: r,
          name: d,
          originalEvent: l
        });
      }
    }, s));
  };
  function _dispatchEvent(e) {
    dispatchEvent(_objectSpread2({
      putSortable,
      cloneEl,
      targetEl: dragEl,
      rootEl,
      oldIndex,
      oldDraggableIndex,
      newIndex,
      newDraggableIndex
    }, e));
  }
  var dragEl, parentEl, ghostEl, rootEl, nextEl, lastDownEl, cloneEl, cloneHidden, oldIndex, newIndex, oldDraggableIndex, newDraggableIndex, activeGroup, putSortable, awaitingDragStarted = false, ignoreNextClick = false, sortables = [], tapEvt, touchEvt, lastDx, lastDy, tapDistanceLeft, tapDistanceTop, moved, lastTarget, lastDirection, pastFirstInvertThresh = false, isCircumstantialInvert = false, targetMoveDistance, ghostRelativeParent, ghostRelativeParentInitialScroll = [], _silent = false, savedInputChecked = [], documentExists = typeof document < "u", PositionGhostAbsolutely = IOS, CSSFloatProperty = Edge || IE11OrLess ? "cssFloat" : "float", supportDraggable = documentExists && !ChromeForAndroid && !IOS && "draggable" in document.createElement("div"), supportCssPointerEvents = function() {
    if (documentExists) {
      if (IE11OrLess) return false;
      var e = document.createElement("x");
      return e.style.cssText = "pointer-events:auto", e.style.pointerEvents === "auto";
    }
  }(), _detectDirection = function e(t, r) {
    var n = css(t), l = parseInt(n.width) - parseInt(n.paddingLeft) - parseInt(n.paddingRight) - parseInt(n.borderLeftWidth) - parseInt(n.borderRightWidth), s = getChild(t, 0, r), u = getChild(t, 1, r), d = s && css(s), h = u && css(u), f = d && parseInt(d.marginLeft) + parseInt(d.marginRight) + getRect(s).width, o = h && parseInt(h.marginLeft) + parseInt(h.marginRight) + getRect(u).width;
    if (n.display === "flex") return n.flexDirection === "column" || n.flexDirection === "column-reverse" ? "vertical" : "horizontal";
    if (n.display === "grid") return n.gridTemplateColumns.split(" ").length <= 1 ? "vertical" : "horizontal";
    if (s && d.float && d.float !== "none") {
      var p = d.float === "left" ? "left" : "right";
      return u && (h.clear === "both" || h.clear === p) ? "vertical" : "horizontal";
    }
    return s && (d.display === "block" || d.display === "flex" || d.display === "table" || d.display === "grid" || f >= l && n[CSSFloatProperty] === "none" || u && n[CSSFloatProperty] === "none" && f + o > l) ? "vertical" : "horizontal";
  }, _dragElInRowColumn = function e(t, r, n) {
    var l = n ? t.left : t.top, s = n ? t.right : t.bottom, u = n ? t.width : t.height, d = n ? r.left : r.top, h = n ? r.right : r.bottom, f = n ? r.width : r.height;
    return l === d || s === h || l + u / 2 === d + f / 2;
  }, _detectNearestEmptySortable = function e(t, r) {
    var n;
    return sortables.some(function(l) {
      var s = l[expando].options.emptyInsertThreshold;
      if (!(!s || lastChild(l))) {
        var u = getRect(l), d = t >= u.left - s && t <= u.right + s, h = r >= u.top - s && r <= u.bottom + s;
        if (d && h) return n = l;
      }
    }), n;
  }, _prepareGroup = function e(t) {
    function r(s, u) {
      return function(d, h, f, o) {
        var p = d.options.group.name && h.options.group.name && d.options.group.name === h.options.group.name;
        if (s == null && (u || p)) return true;
        if (s == null || s === false) return false;
        if (u && s === "clone") return s;
        if (typeof s == "function") return r(s(d, h, f, o), u)(d, h, f, o);
        var y = (u ? d : h).options.group.name;
        return s === true || typeof s == "string" && s === y || s.join && s.indexOf(y) > -1;
      };
    }
    var n = {}, l = t.group;
    (!l || _typeof(l) != "object") && (l = {
      name: l
    }), n.name = l.name, n.checkPull = r(l.pull, true), n.checkPut = r(l.put), n.revertClone = l.revertClone, t.group = n;
  }, _hideGhostForTarget = function e() {
    !supportCssPointerEvents && ghostEl && css(ghostEl, "display", "none");
  }, _unhideGhostForTarget = function e() {
    !supportCssPointerEvents && ghostEl && css(ghostEl, "display", "");
  };
  documentExists && !ChromeForAndroid && document.addEventListener("click", function(e) {
    if (ignoreNextClick) return e.preventDefault(), e.stopPropagation && e.stopPropagation(), e.stopImmediatePropagation && e.stopImmediatePropagation(), ignoreNextClick = false, false;
  }, true);
  var nearestEmptyInsertDetectEvent = function e(t) {
    if (dragEl) {
      t = t.touches ? t.touches[0] : t;
      var r = _detectNearestEmptySortable(t.clientX, t.clientY);
      if (r) {
        var n = {};
        for (var l in t) t.hasOwnProperty(l) && (n[l] = t[l]);
        n.target = n.rootEl = r, n.preventDefault = void 0, n.stopPropagation = void 0, r[expando]._onDragOver(n);
      }
    }
  }, _checkOutsideTargetEl = function e(t) {
    dragEl && dragEl.parentNode[expando]._isOutsideThisEl(t.target);
  };
  function Sortable(e, t) {
    if (!(e && e.nodeType && e.nodeType === 1)) throw "Sortable: `el` must be an HTMLElement, not ".concat({}.toString.call(e));
    this.el = e, this.options = t = _extends({}, t), e[expando] = this;
    var r = {
      group: null,
      sort: true,
      disabled: false,
      store: null,
      handle: null,
      draggable: /^[uo]l$/i.test(e.nodeName) ? ">li" : ">*",
      swapThreshold: 1,
      invertSwap: false,
      invertedSwapThreshold: null,
      removeCloneOnHide: true,
      direction: function() {
        return _detectDirection(e, this.options);
      },
      ghostClass: "sortable-ghost",
      chosenClass: "sortable-chosen",
      dragClass: "sortable-drag",
      ignore: "a, img",
      filter: null,
      preventOnFilter: true,
      animation: 0,
      easing: null,
      setData: function(u, d) {
        u.setData("Text", d.textContent);
      },
      dropBubble: false,
      dragoverBubble: false,
      dataIdAttr: "data-id",
      delay: 0,
      delayOnTouchOnly: false,
      touchStartThreshold: (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
      forceFallback: false,
      fallbackClass: "sortable-fallback",
      fallbackOnBody: false,
      fallbackTolerance: 0,
      fallbackOffset: {
        x: 0,
        y: 0
      },
      supportPointer: Sortable.supportPointer !== false && "PointerEvent" in window && (!Safari || IOS),
      emptyInsertThreshold: 5
    };
    PluginManager.initializePlugins(this, e, r);
    for (var n in r) !(n in t) && (t[n] = r[n]);
    _prepareGroup(t);
    for (var l in this) l.charAt(0) === "_" && typeof this[l] == "function" && (this[l] = this[l].bind(this));
    this.nativeDraggable = t.forceFallback ? false : supportDraggable, this.nativeDraggable && (this.options.touchStartThreshold = 1), t.supportPointer ? on(e, "pointerdown", this._onTapStart) : (on(e, "mousedown", this._onTapStart), on(e, "touchstart", this._onTapStart)), this.nativeDraggable && (on(e, "dragover", this), on(e, "dragenter", this)), sortables.push(this.el), t.store && t.store.get && this.sort(t.store.get(this) || []), _extends(this, AnimationStateManager());
  }
  Sortable.prototype = {
    constructor: Sortable,
    _isOutsideThisEl: function e(t) {
      !this.el.contains(t) && t !== this.el && (lastTarget = null);
    },
    _getDirection: function e(t, r) {
      return typeof this.options.direction == "function" ? this.options.direction.call(this, t, r, dragEl) : this.options.direction;
    },
    _onTapStart: function e(t) {
      if (t.cancelable) {
        var r = this, n = this.el, l = this.options, s = l.preventOnFilter, u = t.type, d = t.touches && t.touches[0] || t.pointerType && t.pointerType === "touch" && t, h = (d || t).target, f = t.target.shadowRoot && (t.path && t.path[0] || t.composedPath && t.composedPath()[0]) || h, o = l.filter;
        if (_saveInputCheckedState(n), !dragEl && !(/mousedown|pointerdown/.test(u) && t.button !== 0 || l.disabled) && !f.isContentEditable && !(!this.nativeDraggable && Safari && h && h.tagName.toUpperCase() === "SELECT") && (h = closest(h, l.draggable, n, false), !(h && h.animated) && lastDownEl !== h)) {
          if (oldIndex = index(h), oldDraggableIndex = index(h, l.draggable), typeof o == "function") {
            if (o.call(this, t, h, this)) {
              _dispatchEvent({
                sortable: r,
                rootEl: f,
                name: "filter",
                targetEl: h,
                toEl: n,
                fromEl: n
              }), pluginEvent("filter", r, {
                evt: t
              }), s && t.preventDefault();
              return;
            }
          } else if (o && (o = o.split(",").some(function(p) {
            if (p = closest(f, p.trim(), n, false), p) return _dispatchEvent({
              sortable: r,
              rootEl: p,
              name: "filter",
              targetEl: h,
              fromEl: n,
              toEl: n
            }), pluginEvent("filter", r, {
              evt: t
            }), true;
          }), o)) {
            s && t.preventDefault();
            return;
          }
          l.handle && !closest(f, l.handle, n, false) || this._prepareDragStart(t, d, h);
        }
      }
    },
    _prepareDragStart: function e(t, r, n) {
      var l = this, s = l.el, u = l.options, d = s.ownerDocument, h;
      if (n && !dragEl && n.parentNode === s) {
        var f = getRect(n);
        if (rootEl = s, dragEl = n, parentEl = dragEl.parentNode, nextEl = dragEl.nextSibling, lastDownEl = n, activeGroup = u.group, Sortable.dragged = dragEl, tapEvt = {
          target: dragEl,
          clientX: (r || t).clientX,
          clientY: (r || t).clientY
        }, tapDistanceLeft = tapEvt.clientX - f.left, tapDistanceTop = tapEvt.clientY - f.top, this._lastX = (r || t).clientX, this._lastY = (r || t).clientY, dragEl.style["will-change"] = "all", h = function() {
          if (pluginEvent("delayEnded", l, {
            evt: t
          }), Sortable.eventCanceled) {
            l._onDrop();
            return;
          }
          l._disableDelayedDragEvents(), !FireFox && l.nativeDraggable && (dragEl.draggable = true), l._triggerDragStart(t, r), _dispatchEvent({
            sortable: l,
            name: "choose",
            originalEvent: t
          }), toggleClass(dragEl, u.chosenClass, true);
        }, u.ignore.split(",").forEach(function(o) {
          find(dragEl, o.trim(), _disableDraggable);
        }), on(d, "dragover", nearestEmptyInsertDetectEvent), on(d, "mousemove", nearestEmptyInsertDetectEvent), on(d, "touchmove", nearestEmptyInsertDetectEvent), u.supportPointer ? (on(d, "pointerup", l._onDrop), !this.nativeDraggable && on(d, "pointercancel", l._onDrop)) : (on(d, "mouseup", l._onDrop), on(d, "touchend", l._onDrop), on(d, "touchcancel", l._onDrop)), FireFox && this.nativeDraggable && (this.options.touchStartThreshold = 4, dragEl.draggable = true), pluginEvent("delayStart", this, {
          evt: t
        }), u.delay && (!u.delayOnTouchOnly || r) && (!this.nativeDraggable || !(Edge || IE11OrLess))) {
          if (Sortable.eventCanceled) {
            this._onDrop();
            return;
          }
          u.supportPointer ? (on(d, "pointerup", l._disableDelayedDrag), on(d, "pointercancel", l._disableDelayedDrag)) : (on(d, "mouseup", l._disableDelayedDrag), on(d, "touchend", l._disableDelayedDrag), on(d, "touchcancel", l._disableDelayedDrag)), on(d, "mousemove", l._delayedDragTouchMoveHandler), on(d, "touchmove", l._delayedDragTouchMoveHandler), u.supportPointer && on(d, "pointermove", l._delayedDragTouchMoveHandler), l._dragStartTimer = setTimeout(h, u.delay);
        } else h();
      }
    },
    _delayedDragTouchMoveHandler: function e(t) {
      var r = t.touches ? t.touches[0] : t;
      Math.max(Math.abs(r.clientX - this._lastX), Math.abs(r.clientY - this._lastY)) >= Math.floor(this.options.touchStartThreshold / (this.nativeDraggable && window.devicePixelRatio || 1)) && this._disableDelayedDrag();
    },
    _disableDelayedDrag: function e() {
      dragEl && _disableDraggable(dragEl), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents();
    },
    _disableDelayedDragEvents: function e() {
      var t = this.el.ownerDocument;
      off(t, "mouseup", this._disableDelayedDrag), off(t, "touchend", this._disableDelayedDrag), off(t, "touchcancel", this._disableDelayedDrag), off(t, "pointerup", this._disableDelayedDrag), off(t, "pointercancel", this._disableDelayedDrag), off(t, "mousemove", this._delayedDragTouchMoveHandler), off(t, "touchmove", this._delayedDragTouchMoveHandler), off(t, "pointermove", this._delayedDragTouchMoveHandler);
    },
    _triggerDragStart: function e(t, r) {
      r = r || t.pointerType == "touch" && t, !this.nativeDraggable || r ? this.options.supportPointer ? on(document, "pointermove", this._onTouchMove) : r ? on(document, "touchmove", this._onTouchMove) : on(document, "mousemove", this._onTouchMove) : (on(dragEl, "dragend", this), on(rootEl, "dragstart", this._onDragStart));
      try {
        document.selection ? _nextTick(function() {
          document.selection.empty();
        }) : window.getSelection().removeAllRanges();
      } catch {
      }
    },
    _dragStarted: function e(t, r) {
      if (awaitingDragStarted = false, rootEl && dragEl) {
        pluginEvent("dragStarted", this, {
          evt: r
        }), this.nativeDraggable && on(document, "dragover", _checkOutsideTargetEl);
        var n = this.options;
        !t && toggleClass(dragEl, n.dragClass, false), toggleClass(dragEl, n.ghostClass, true), Sortable.active = this, t && this._appendGhost(), _dispatchEvent({
          sortable: this,
          name: "start",
          originalEvent: r
        });
      } else this._nulling();
    },
    _emulateDragOver: function e() {
      if (touchEvt) {
        this._lastX = touchEvt.clientX, this._lastY = touchEvt.clientY, _hideGhostForTarget();
        for (var t = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY), r = t; t && t.shadowRoot && (t = t.shadowRoot.elementFromPoint(touchEvt.clientX, touchEvt.clientY), t !== r); ) r = t;
        if (dragEl.parentNode[expando]._isOutsideThisEl(t), r) do {
          if (r[expando]) {
            var n = void 0;
            if (n = r[expando]._onDragOver({
              clientX: touchEvt.clientX,
              clientY: touchEvt.clientY,
              target: t,
              rootEl: r
            }), n && !this.options.dragoverBubble) break;
          }
          t = r;
        } while (r = getParentOrHost(r));
        _unhideGhostForTarget();
      }
    },
    _onTouchMove: function e(t) {
      if (tapEvt) {
        var r = this.options, n = r.fallbackTolerance, l = r.fallbackOffset, s = t.touches ? t.touches[0] : t, u = ghostEl && matrix(ghostEl, true), d = ghostEl && u && u.a, h = ghostEl && u && u.d, f = PositionGhostAbsolutely && ghostRelativeParent && getRelativeScrollOffset(ghostRelativeParent), o = (s.clientX - tapEvt.clientX + l.x) / (d || 1) + (f ? f[0] - ghostRelativeParentInitialScroll[0] : 0) / (d || 1), p = (s.clientY - tapEvt.clientY + l.y) / (h || 1) + (f ? f[1] - ghostRelativeParentInitialScroll[1] : 0) / (h || 1);
        if (!Sortable.active && !awaitingDragStarted) {
          if (n && Math.max(Math.abs(s.clientX - this._lastX), Math.abs(s.clientY - this._lastY)) < n) return;
          this._onDragStart(t, true);
        }
        if (ghostEl) {
          u ? (u.e += o - (lastDx || 0), u.f += p - (lastDy || 0)) : u = {
            a: 1,
            b: 0,
            c: 0,
            d: 1,
            e: o,
            f: p
          };
          var y = "matrix(".concat(u.a, ",").concat(u.b, ",").concat(u.c, ",").concat(u.d, ",").concat(u.e, ",").concat(u.f, ")");
          css(ghostEl, "webkitTransform", y), css(ghostEl, "mozTransform", y), css(ghostEl, "msTransform", y), css(ghostEl, "transform", y), lastDx = o, lastDy = p, touchEvt = s;
        }
        t.cancelable && t.preventDefault();
      }
    },
    _appendGhost: function e() {
      if (!ghostEl) {
        var t = this.options.fallbackOnBody ? document.body : rootEl, r = getRect(dragEl, true, PositionGhostAbsolutely, true, t), n = this.options;
        if (PositionGhostAbsolutely) {
          for (ghostRelativeParent = t; css(ghostRelativeParent, "position") === "static" && css(ghostRelativeParent, "transform") === "none" && ghostRelativeParent !== document; ) ghostRelativeParent = ghostRelativeParent.parentNode;
          ghostRelativeParent !== document.body && ghostRelativeParent !== document.documentElement ? (ghostRelativeParent === document && (ghostRelativeParent = getWindowScrollingElement()), r.top += ghostRelativeParent.scrollTop, r.left += ghostRelativeParent.scrollLeft) : ghostRelativeParent = getWindowScrollingElement(), ghostRelativeParentInitialScroll = getRelativeScrollOffset(ghostRelativeParent);
        }
        ghostEl = dragEl.cloneNode(true), toggleClass(ghostEl, n.ghostClass, false), toggleClass(ghostEl, n.fallbackClass, true), toggleClass(ghostEl, n.dragClass, true), css(ghostEl, "transition", ""), css(ghostEl, "transform", ""), css(ghostEl, "box-sizing", "border-box"), css(ghostEl, "margin", 0), css(ghostEl, "top", r.top), css(ghostEl, "left", r.left), css(ghostEl, "width", r.width), css(ghostEl, "height", r.height), css(ghostEl, "opacity", "0.8"), css(ghostEl, "position", PositionGhostAbsolutely ? "absolute" : "fixed"), css(ghostEl, "zIndex", "100000"), css(ghostEl, "pointerEvents", "none"), Sortable.ghost = ghostEl, t.appendChild(ghostEl), css(ghostEl, "transform-origin", tapDistanceLeft / parseInt(ghostEl.style.width) * 100 + "% " + tapDistanceTop / parseInt(ghostEl.style.height) * 100 + "%");
      }
    },
    _onDragStart: function e(t, r) {
      var n = this, l = t.dataTransfer, s = n.options;
      if (pluginEvent("dragStart", this, {
        evt: t
      }), Sortable.eventCanceled) {
        this._onDrop();
        return;
      }
      pluginEvent("setupClone", this), Sortable.eventCanceled || (cloneEl = clone(dragEl), cloneEl.removeAttribute("id"), cloneEl.draggable = false, cloneEl.style["will-change"] = "", this._hideClone(), toggleClass(cloneEl, this.options.chosenClass, false), Sortable.clone = cloneEl), n.cloneId = _nextTick(function() {
        pluginEvent("clone", n), !Sortable.eventCanceled && (n.options.removeCloneOnHide || rootEl.insertBefore(cloneEl, dragEl), n._hideClone(), _dispatchEvent({
          sortable: n,
          name: "clone"
        }));
      }), !r && toggleClass(dragEl, s.dragClass, true), r ? (ignoreNextClick = true, n._loopId = setInterval(n._emulateDragOver, 50)) : (off(document, "mouseup", n._onDrop), off(document, "touchend", n._onDrop), off(document, "touchcancel", n._onDrop), l && (l.effectAllowed = "move", s.setData && s.setData.call(n, l, dragEl)), on(document, "drop", n), css(dragEl, "transform", "translateZ(0)")), awaitingDragStarted = true, n._dragStartId = _nextTick(n._dragStarted.bind(n, r, t)), on(document, "selectstart", n), moved = true, window.getSelection().removeAllRanges(), Safari && css(document.body, "user-select", "none");
    },
    _onDragOver: function e(t) {
      var r = this.el, n = t.target, l, s, u, d = this.options, h = d.group, f = Sortable.active, o = activeGroup === h, p = d.sort, y = putSortable || f, g, v = this, c = false;
      if (_silent) return;
      function m(J, Z) {
        pluginEvent(J, v, _objectSpread2({
          evt: t,
          isOwner: o,
          axis: g ? "vertical" : "horizontal",
          revert: u,
          dragRect: l,
          targetRect: s,
          canSort: p,
          fromSortable: y,
          target: n,
          completed: x,
          onMove: function(de, T) {
            return _onMove(rootEl, r, dragEl, l, de, getRect(de), t, T);
          },
          changed: S
        }, Z));
      }
      function _() {
        m("dragOverAnimationCapture"), v.captureAnimationState(), v !== y && y.captureAnimationState();
      }
      function x(J) {
        return m("dragOverCompleted", {
          insertion: J
        }), J && (o ? f._hideClone() : f._showClone(v), v !== y && (toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : f.options.ghostClass, false), toggleClass(dragEl, d.ghostClass, true)), putSortable !== v && v !== Sortable.active ? putSortable = v : v === Sortable.active && putSortable && (putSortable = null), y === v && (v._ignoreWhileAnimating = n), v.animateAll(function() {
          m("dragOverAnimationComplete"), v._ignoreWhileAnimating = null;
        }), v !== y && (y.animateAll(), y._ignoreWhileAnimating = null)), (n === dragEl && !dragEl.animated || n === r && !n.animated) && (lastTarget = null), !d.dragoverBubble && !t.rootEl && n !== document && (dragEl.parentNode[expando]._isOutsideThisEl(t.target), !J && nearestEmptyInsertDetectEvent(t)), !d.dragoverBubble && t.stopPropagation && t.stopPropagation(), c = true;
      }
      function S() {
        newIndex = index(dragEl), newDraggableIndex = index(dragEl, d.draggable), _dispatchEvent({
          sortable: v,
          name: "change",
          toEl: r,
          newIndex,
          newDraggableIndex,
          originalEvent: t
        });
      }
      if (t.preventDefault !== void 0 && t.cancelable && t.preventDefault(), n = closest(n, d.draggable, r, true), m("dragOver"), Sortable.eventCanceled) return c;
      if (dragEl.contains(t.target) || n.animated && n.animatingX && n.animatingY || v._ignoreWhileAnimating === n) return x(false);
      if (ignoreNextClick = false, f && !d.disabled && (o ? p || (u = parentEl !== rootEl) : putSortable === this || (this.lastPutMode = activeGroup.checkPull(this, f, dragEl, t)) && h.checkPut(this, f, dragEl, t))) {
        if (g = this._getDirection(t, n) === "vertical", l = getRect(dragEl), m("dragOverValid"), Sortable.eventCanceled) return c;
        if (u) return parentEl = rootEl, _(), this._hideClone(), m("revert"), Sortable.eventCanceled || (nextEl ? rootEl.insertBefore(dragEl, nextEl) : rootEl.appendChild(dragEl)), x(true);
        var E = lastChild(r, d.draggable);
        if (!E || _ghostIsLast(t, g, this) && !E.animated) {
          if (E === dragEl) return x(false);
          if (E && r === t.target && (n = E), n && (s = getRect(n)), _onMove(rootEl, r, dragEl, l, n, s, t, !!n) !== false) return _(), E && E.nextSibling ? r.insertBefore(dragEl, E.nextSibling) : r.appendChild(dragEl), parentEl = r, S(), x(true);
        } else if (E && _ghostIsFirst(t, g, this)) {
          var w = getChild(r, 0, d, true);
          if (w === dragEl) return x(false);
          if (n = w, s = getRect(n), _onMove(rootEl, r, dragEl, l, n, s, t, false) !== false) return _(), r.insertBefore(dragEl, w), parentEl = r, S(), x(true);
        } else if (n.parentNode === r) {
          s = getRect(n);
          var C = 0, D, A = dragEl.parentNode !== r, F = !_dragElInRowColumn(dragEl.animated && dragEl.toRect || l, n.animated && n.toRect || s, g), B = g ? "top" : "left", N = isScrolledPast(n, "top", "top") || isScrolledPast(dragEl, "top", "top"), I = N ? N.scrollTop : void 0;
          lastTarget !== n && (D = s[B], pastFirstInvertThresh = false, isCircumstantialInvert = !F && d.invertSwap || A), C = _getSwapDirection(t, n, s, g, F ? 1 : d.swapThreshold, d.invertedSwapThreshold == null ? d.swapThreshold : d.invertedSwapThreshold, isCircumstantialInvert, lastTarget === n);
          var O;
          if (C !== 0) {
            var L = index(dragEl);
            do
              L -= C, O = parentEl.children[L];
            while (O && (css(O, "display") === "none" || O === ghostEl));
          }
          if (C === 0 || O === n) return x(false);
          lastTarget = n, lastDirection = C;
          var q = n.nextElementSibling, z = false;
          z = C === 1;
          var G = _onMove(rootEl, r, dragEl, l, n, s, t, z);
          if (G !== false) return (G === 1 || G === -1) && (z = G === 1), _silent = true, setTimeout(_unsilent, 30), _(), z && !q ? r.appendChild(dragEl) : n.parentNode.insertBefore(dragEl, z ? q : n), N && scrollBy(N, 0, I - N.scrollTop), parentEl = dragEl.parentNode, D !== void 0 && !isCircumstantialInvert && (targetMoveDistance = Math.abs(D - getRect(n)[B])), S(), x(true);
        }
        if (r.contains(dragEl)) return x(false);
      }
      return false;
    },
    _ignoreWhileAnimating: null,
    _offMoveEvents: function e() {
      off(document, "mousemove", this._onTouchMove), off(document, "touchmove", this._onTouchMove), off(document, "pointermove", this._onTouchMove), off(document, "dragover", nearestEmptyInsertDetectEvent), off(document, "mousemove", nearestEmptyInsertDetectEvent), off(document, "touchmove", nearestEmptyInsertDetectEvent);
    },
    _offUpEvents: function e() {
      var t = this.el.ownerDocument;
      off(t, "mouseup", this._onDrop), off(t, "touchend", this._onDrop), off(t, "pointerup", this._onDrop), off(t, "pointercancel", this._onDrop), off(t, "touchcancel", this._onDrop), off(document, "selectstart", this);
    },
    _onDrop: function e(t) {
      var r = this.el, n = this.options;
      if (newIndex = index(dragEl), newDraggableIndex = index(dragEl, n.draggable), pluginEvent("drop", this, {
        evt: t
      }), parentEl = dragEl && dragEl.parentNode, newIndex = index(dragEl), newDraggableIndex = index(dragEl, n.draggable), Sortable.eventCanceled) {
        this._nulling();
        return;
      }
      awaitingDragStarted = false, isCircumstantialInvert = false, pastFirstInvertThresh = false, clearInterval(this._loopId), clearTimeout(this._dragStartTimer), _cancelNextTick(this.cloneId), _cancelNextTick(this._dragStartId), this.nativeDraggable && (off(document, "drop", this), off(r, "dragstart", this._onDragStart)), this._offMoveEvents(), this._offUpEvents(), Safari && css(document.body, "user-select", ""), css(dragEl, "transform", ""), t && (moved && (t.cancelable && t.preventDefault(), !n.dropBubble && t.stopPropagation()), ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl), (rootEl === parentEl || putSortable && putSortable.lastPutMode !== "clone") && cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl), dragEl && (this.nativeDraggable && off(dragEl, "dragend", this), _disableDraggable(dragEl), dragEl.style["will-change"] = "", moved && !awaitingDragStarted && toggleClass(dragEl, putSortable ? putSortable.options.ghostClass : this.options.ghostClass, false), toggleClass(dragEl, this.options.chosenClass, false), _dispatchEvent({
        sortable: this,
        name: "unchoose",
        toEl: parentEl,
        newIndex: null,
        newDraggableIndex: null,
        originalEvent: t
      }), rootEl !== parentEl ? (newIndex >= 0 && (_dispatchEvent({
        rootEl: parentEl,
        name: "add",
        toEl: parentEl,
        fromEl: rootEl,
        originalEvent: t
      }), _dispatchEvent({
        sortable: this,
        name: "remove",
        toEl: parentEl,
        originalEvent: t
      }), _dispatchEvent({
        rootEl: parentEl,
        name: "sort",
        toEl: parentEl,
        fromEl: rootEl,
        originalEvent: t
      }), _dispatchEvent({
        sortable: this,
        name: "sort",
        toEl: parentEl,
        originalEvent: t
      })), putSortable && putSortable.save()) : newIndex !== oldIndex && newIndex >= 0 && (_dispatchEvent({
        sortable: this,
        name: "update",
        toEl: parentEl,
        originalEvent: t
      }), _dispatchEvent({
        sortable: this,
        name: "sort",
        toEl: parentEl,
        originalEvent: t
      })), Sortable.active && ((newIndex == null || newIndex === -1) && (newIndex = oldIndex, newDraggableIndex = oldDraggableIndex), _dispatchEvent({
        sortable: this,
        name: "end",
        toEl: parentEl,
        originalEvent: t
      }), this.save()))), this._nulling();
    },
    _nulling: function e() {
      pluginEvent("nulling", this), rootEl = dragEl = parentEl = ghostEl = nextEl = cloneEl = lastDownEl = cloneHidden = tapEvt = touchEvt = moved = newIndex = newDraggableIndex = oldIndex = oldDraggableIndex = lastTarget = lastDirection = putSortable = activeGroup = Sortable.dragged = Sortable.ghost = Sortable.clone = Sortable.active = null;
      var t = this.el;
      savedInputChecked.forEach(function(r) {
        t.contains(r) && (r.checked = true);
      }), savedInputChecked.length = lastDx = lastDy = 0;
    },
    handleEvent: function e(t) {
      switch (t.type) {
        case "drop":
        case "dragend":
          this._onDrop(t);
          break;
        case "dragenter":
        case "dragover":
          dragEl && (this._onDragOver(t), _globalDragOver(t));
          break;
        case "selectstart":
          t.preventDefault();
          break;
      }
    },
    toArray: function e() {
      for (var t = [], r, n = this.el.children, l = 0, s = n.length, u = this.options; l < s; l++) r = n[l], closest(r, u.draggable, this.el, false) && t.push(r.getAttribute(u.dataIdAttr) || _generateId(r));
      return t;
    },
    sort: function e(t, r) {
      var n = {}, l = this.el;
      this.toArray().forEach(function(s, u) {
        var d = l.children[u];
        closest(d, this.options.draggable, l, false) && (n[s] = d);
      }, this), r && this.captureAnimationState(), t.forEach(function(s) {
        n[s] && (l.removeChild(n[s]), l.appendChild(n[s]));
      }), r && this.animateAll();
    },
    save: function e() {
      var t = this.options.store;
      t && t.set && t.set(this);
    },
    closest: function e(t, r) {
      return closest(t, r || this.options.draggable, this.el, false);
    },
    option: function e(t, r) {
      var n = this.options;
      if (r === void 0) return n[t];
      var l = PluginManager.modifyOption(this, t, r);
      typeof l < "u" ? n[t] = l : n[t] = r, t === "group" && _prepareGroup(n);
    },
    destroy: function e() {
      pluginEvent("destroy", this);
      var t = this.el;
      t[expando] = null, off(t, "mousedown", this._onTapStart), off(t, "touchstart", this._onTapStart), off(t, "pointerdown", this._onTapStart), this.nativeDraggable && (off(t, "dragover", this), off(t, "dragenter", this)), Array.prototype.forEach.call(t.querySelectorAll("[draggable]"), function(r) {
        r.removeAttribute("draggable");
      }), this._onDrop(), this._disableDelayedDragEvents(), sortables.splice(sortables.indexOf(this.el), 1), this.el = t = null;
    },
    _hideClone: function e() {
      if (!cloneHidden) {
        if (pluginEvent("hideClone", this), Sortable.eventCanceled) return;
        css(cloneEl, "display", "none"), this.options.removeCloneOnHide && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl), cloneHidden = true;
      }
    },
    _showClone: function e(t) {
      if (t.lastPutMode !== "clone") {
        this._hideClone();
        return;
      }
      if (cloneHidden) {
        if (pluginEvent("showClone", this), Sortable.eventCanceled) return;
        dragEl.parentNode == rootEl && !this.options.group.revertClone ? rootEl.insertBefore(cloneEl, dragEl) : nextEl ? rootEl.insertBefore(cloneEl, nextEl) : rootEl.appendChild(cloneEl), this.options.group.revertClone && this.animate(dragEl, cloneEl), css(cloneEl, "display", ""), cloneHidden = false;
      }
    }
  };
  function _globalDragOver(e) {
    e.dataTransfer && (e.dataTransfer.dropEffect = "move"), e.cancelable && e.preventDefault();
  }
  function _onMove(e, t, r, n, l, s, u, d) {
    var h, f = e[expando], o = f.options.onMove, p;
    return window.CustomEvent && !IE11OrLess && !Edge ? h = new CustomEvent("move", {
      bubbles: true,
      cancelable: true
    }) : (h = document.createEvent("Event"), h.initEvent("move", true, true)), h.to = t, h.from = e, h.dragged = r, h.draggedRect = n, h.related = l || t, h.relatedRect = s || getRect(t), h.willInsertAfter = d, h.originalEvent = u, e.dispatchEvent(h), o && (p = o.call(f, h, u)), p;
  }
  function _disableDraggable(e) {
    e.draggable = false;
  }
  function _unsilent() {
    _silent = false;
  }
  function _ghostIsFirst(e, t, r) {
    var n = getRect(getChild(r.el, 0, r.options, true)), l = getChildContainingRectFromElement(r.el, r.options, ghostEl), s = 10;
    return t ? e.clientX < l.left - s || e.clientY < n.top && e.clientX < n.right : e.clientY < l.top - s || e.clientY < n.bottom && e.clientX < n.left;
  }
  function _ghostIsLast(e, t, r) {
    var n = getRect(lastChild(r.el, r.options.draggable)), l = getChildContainingRectFromElement(r.el, r.options, ghostEl), s = 10;
    return t ? e.clientX > l.right + s || e.clientY > n.bottom && e.clientX > n.left : e.clientY > l.bottom + s || e.clientX > n.right && e.clientY > n.top;
  }
  function _getSwapDirection(e, t, r, n, l, s, u, d) {
    var h = n ? e.clientY : e.clientX, f = n ? r.height : r.width, o = n ? r.top : r.left, p = n ? r.bottom : r.right, y = false;
    if (!u) {
      if (d && targetMoveDistance < f * l) {
        if (!pastFirstInvertThresh && (lastDirection === 1 ? h > o + f * s / 2 : h < p - f * s / 2) && (pastFirstInvertThresh = true), pastFirstInvertThresh) y = true;
        else if (lastDirection === 1 ? h < o + targetMoveDistance : h > p - targetMoveDistance) return -lastDirection;
      } else if (h > o + f * (1 - l) / 2 && h < p - f * (1 - l) / 2) return _getInsertDirection(t);
    }
    return y = y || u, y && (h < o + f * s / 2 || h > p - f * s / 2) ? h > o + f / 2 ? 1 : -1 : 0;
  }
  function _getInsertDirection(e) {
    return index(dragEl) < index(e) ? 1 : -1;
  }
  function _generateId(e) {
    for (var t = e.tagName + e.className + e.src + e.href + e.textContent, r = t.length, n = 0; r--; ) n += t.charCodeAt(r);
    return n.toString(36);
  }
  function _saveInputCheckedState(e) {
    savedInputChecked.length = 0;
    for (var t = e.getElementsByTagName("input"), r = t.length; r--; ) {
      var n = t[r];
      n.checked && savedInputChecked.push(n);
    }
  }
  function _nextTick(e) {
    return setTimeout(e, 0);
  }
  function _cancelNextTick(e) {
    return clearTimeout(e);
  }
  documentExists && on(document, "touchmove", function(e) {
    (Sortable.active || awaitingDragStarted) && e.cancelable && e.preventDefault();
  });
  Sortable.utils = {
    on,
    off,
    css,
    find,
    is: function e(t, r) {
      return !!closest(t, r, t, false);
    },
    extend,
    throttle,
    closest,
    toggleClass,
    clone,
    index,
    nextTick: _nextTick,
    cancelNextTick: _cancelNextTick,
    detectDirection: _detectDirection,
    getChild,
    expando
  };
  Sortable.get = function(e) {
    return e[expando];
  };
  Sortable.mount = function() {
    for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
    t[0].constructor === Array && (t = t[0]), t.forEach(function(n) {
      if (!n.prototype || !n.prototype.constructor) throw "Sortable: Mounted plugin must be a constructor function, not ".concat({}.toString.call(n));
      n.utils && (Sortable.utils = _objectSpread2(_objectSpread2({}, Sortable.utils), n.utils)), PluginManager.mount(n);
    });
  };
  Sortable.create = function(e, t) {
    return new Sortable(e, t);
  };
  Sortable.version = version;
  var autoScrolls = [], scrollEl, scrollRootEl, scrolling = false, lastAutoScrollX, lastAutoScrollY, touchEvt$1, pointerElemChangedInterval;
  function AutoScrollPlugin() {
    function e() {
      this.defaults = {
        scroll: true,
        forceAutoScrollFallback: false,
        scrollSensitivity: 30,
        scrollSpeed: 10,
        bubbleScroll: true
      };
      for (var t in this) t.charAt(0) === "_" && typeof this[t] == "function" && (this[t] = this[t].bind(this));
    }
    return e.prototype = {
      dragStarted: function(r) {
        var n = r.originalEvent;
        this.sortable.nativeDraggable ? on(document, "dragover", this._handleAutoScroll) : this.options.supportPointer ? on(document, "pointermove", this._handleFallbackAutoScroll) : n.touches ? on(document, "touchmove", this._handleFallbackAutoScroll) : on(document, "mousemove", this._handleFallbackAutoScroll);
      },
      dragOverCompleted: function(r) {
        var n = r.originalEvent;
        !this.options.dragOverBubble && !n.rootEl && this._handleAutoScroll(n);
      },
      drop: function() {
        this.sortable.nativeDraggable ? off(document, "dragover", this._handleAutoScroll) : (off(document, "pointermove", this._handleFallbackAutoScroll), off(document, "touchmove", this._handleFallbackAutoScroll), off(document, "mousemove", this._handleFallbackAutoScroll)), clearPointerElemChangedInterval(), clearAutoScrolls(), cancelThrottle();
      },
      nulling: function() {
        touchEvt$1 = scrollRootEl = scrollEl = scrolling = pointerElemChangedInterval = lastAutoScrollX = lastAutoScrollY = null, autoScrolls.length = 0;
      },
      _handleFallbackAutoScroll: function(r) {
        this._handleAutoScroll(r, true);
      },
      _handleAutoScroll: function(r, n) {
        var l = this, s = (r.touches ? r.touches[0] : r).clientX, u = (r.touches ? r.touches[0] : r).clientY, d = document.elementFromPoint(s, u);
        if (touchEvt$1 = r, n || this.options.forceAutoScrollFallback || Edge || IE11OrLess || Safari) {
          autoScroll(r, this.options, d, n);
          var h = getParentAutoScrollElement(d, true);
          scrolling && (!pointerElemChangedInterval || s !== lastAutoScrollX || u !== lastAutoScrollY) && (pointerElemChangedInterval && clearPointerElemChangedInterval(), pointerElemChangedInterval = setInterval(function() {
            var f = getParentAutoScrollElement(document.elementFromPoint(s, u), true);
            f !== h && (h = f, clearAutoScrolls()), autoScroll(r, l.options, f, n);
          }, 10), lastAutoScrollX = s, lastAutoScrollY = u);
        } else {
          if (!this.options.bubbleScroll || getParentAutoScrollElement(d, true) === getWindowScrollingElement()) {
            clearAutoScrolls();
            return;
          }
          autoScroll(r, this.options, getParentAutoScrollElement(d, false), false);
        }
      }
    }, _extends(e, {
      pluginName: "scroll",
      initializeByDefault: true
    });
  }
  function clearAutoScrolls() {
    autoScrolls.forEach(function(e) {
      clearInterval(e.pid);
    }), autoScrolls = [];
  }
  function clearPointerElemChangedInterval() {
    clearInterval(pointerElemChangedInterval);
  }
  var autoScroll = throttle(function(e, t, r, n) {
    if (t.scroll) {
      var l = (e.touches ? e.touches[0] : e).clientX, s = (e.touches ? e.touches[0] : e).clientY, u = t.scrollSensitivity, d = t.scrollSpeed, h = getWindowScrollingElement(), f = false, o;
      scrollRootEl !== r && (scrollRootEl = r, clearAutoScrolls(), scrollEl = t.scroll, o = t.scrollFn, scrollEl === true && (scrollEl = getParentAutoScrollElement(r, true)));
      var p = 0, y = scrollEl;
      do {
        var g = y, v = getRect(g), c = v.top, m = v.bottom, _ = v.left, x = v.right, S = v.width, E = v.height, w = void 0, C = void 0, D = g.scrollWidth, A = g.scrollHeight, F = css(g), B = g.scrollLeft, N = g.scrollTop;
        g === h ? (w = S < D && (F.overflowX === "auto" || F.overflowX === "scroll" || F.overflowX === "visible"), C = E < A && (F.overflowY === "auto" || F.overflowY === "scroll" || F.overflowY === "visible")) : (w = S < D && (F.overflowX === "auto" || F.overflowX === "scroll"), C = E < A && (F.overflowY === "auto" || F.overflowY === "scroll"));
        var I = w && (Math.abs(x - l) <= u && B + S < D) - (Math.abs(_ - l) <= u && !!B), O = C && (Math.abs(m - s) <= u && N + E < A) - (Math.abs(c - s) <= u && !!N);
        if (!autoScrolls[p]) for (var L = 0; L <= p; L++) autoScrolls[L] || (autoScrolls[L] = {});
        (autoScrolls[p].vx != I || autoScrolls[p].vy != O || autoScrolls[p].el !== g) && (autoScrolls[p].el = g, autoScrolls[p].vx = I, autoScrolls[p].vy = O, clearInterval(autoScrolls[p].pid), (I != 0 || O != 0) && (f = true, autoScrolls[p].pid = setInterval((function() {
          n && this.layer === 0 && Sortable.active._onTouchMove(touchEvt$1);
          var q = autoScrolls[this.layer].vy ? autoScrolls[this.layer].vy * d : 0, z = autoScrolls[this.layer].vx ? autoScrolls[this.layer].vx * d : 0;
          typeof o == "function" && o.call(Sortable.dragged.parentNode[expando], z, q, e, touchEvt$1, autoScrolls[this.layer].el) !== "continue" || scrollBy(autoScrolls[this.layer].el, z, q);
        }).bind({
          layer: p
        }), 24))), p++;
      } while (t.bubbleScroll && y !== h && (y = getParentAutoScrollElement(y, false)));
      scrolling = f;
    }
  }, 30), drop = function e(t) {
    var r = t.originalEvent, n = t.putSortable, l = t.dragEl, s = t.activeSortable, u = t.dispatchSortableEvent, d = t.hideGhostForTarget, h = t.unhideGhostForTarget;
    if (r) {
      var f = n || s;
      d();
      var o = r.changedTouches && r.changedTouches.length ? r.changedTouches[0] : r, p = document.elementFromPoint(o.clientX, o.clientY);
      h(), f && !f.el.contains(p) && (u("spill"), this.onSpill({
        dragEl: l,
        putSortable: n
      }));
    }
  };
  function Revert() {
  }
  Revert.prototype = {
    startIndex: null,
    dragStart: function e(t) {
      var r = t.oldDraggableIndex;
      this.startIndex = r;
    },
    onSpill: function e(t) {
      var r = t.dragEl, n = t.putSortable;
      this.sortable.captureAnimationState(), n && n.captureAnimationState();
      var l = getChild(this.sortable.el, this.startIndex, this.options);
      l ? this.sortable.el.insertBefore(r, l) : this.sortable.el.appendChild(r), this.sortable.animateAll(), n && n.animateAll();
    },
    drop
  };
  _extends(Revert, {
    pluginName: "revertOnSpill"
  });
  function Remove() {
  }
  Remove.prototype = {
    onSpill: function e(t) {
      var r = t.dragEl, n = t.putSortable, l = n || this.sortable;
      l.captureAnimationState(), r.parentNode && r.parentNode.removeChild(r), l.animateAll();
    },
    drop
  };
  _extends(Remove, {
    pluginName: "removeOnSpill"
  });
  Sortable.mount(new AutoScrollPlugin());
  Sortable.mount(Remove, Revert);
  function animate(e, t, r) {
    update_global_pos(t, 0, 0), update_global_pos(r, 0, 0);
    const n = {}, l = e.querySelectorAll("*[data-animation-id]");
    for (let d = 0; d < l.length; d++) n[l[d].dataset.animationId] = l[d];
    const s = {};
    traverse(t, (d) => {
      d.animation_id !== void 0 && d.animation_id in n && (s[d.animation_id] = d);
    });
    const u = {};
    traverse(r, (d) => {
      d.animation_id !== void 0 && d.animation_id in n && (u[d.animation_id] = d);
    });
    for (const d of Object.keys(n)) {
      if (!(d in u) || !(d in s)) continue;
      const h = s[d], f = u[d], o = n[d], p = {
        x: h.global_x,
        y: h.global_y
      }, y = {
        x: f.global_x,
        y: f.global_y
      };
      let g = false;
      const v = {
        x: y.x - p.x,
        y: y.y - p.y
      };
      let c = o.style.transform;
      const m = apply_delta(c, v);
      if (o.style.transform = m, c !== m && (g = true, setTimeout(() => {
        o.style.transform = c;
      })), f.type === "Path" && h.type === "Path" && (o.setAttribute("d", h.d), h.d !== f.d && (g = true, setTimeout(() => {
        o.setAttribute("d", f.d);
      }))), g && (o.style.transition = "0.2s", setTimeout(() => {
        o.style.transition = "0s";
      }, 200)), f.type === "Frame" && h.type === "Frame" || f.type === "Mark" && h.type === "Mark") {
        const _ = {}, x = h.children[0], S = o.children[0], E = [
          "width",
          "height",
          "rx",
          "ry",
          "fill"
        ];
        for (const C of E) _[C] = S.getAttribute(C) ?? "", S.setAttribute(C, `${x[C]}`);
        E.some((C) => _[C] !== `${x[C]}`) && (S.style.transition = "0.2s", setTimeout(() => {
          S.style.transition = "0s";
        }, 200), setTimeout(() => {
          for (const C of E) S.setAttribute(C, _[C]);
        }));
      }
      if (f.type === "Frame" && h.type === "Frame" && f.child.type === "Text" && h.child.type === "Text") try {
        const _ = o.children[1], x = _.style.fontSize, S = `${h.child.font_size}px`;
        x !== S && (_.style.fontSize = S, _.style.transition = "0.2s", setTimeout(() => {
          _.style.fontSize = x;
        }), setTimeout(() => {
          _.style.transition = "0s";
        }, 200));
      } catch (_) {
        console.log(o.cloneNode(true)), console.log(f), console.error(_);
      }
    }
  }
  function apply_delta(e, t) {
    let r = 0, n = 0;
    const l = /^translate\((-?\d*\.?\d+)px, (-?\d*\.?\d+)px\)$/.exec(e);
    if (l === null) {
      const s = /^translate\((-?\d*\.?\d+)px\)$/.exec(e);
      s !== null && (r = Number(s[1]));
    } else r = Number(l[1]), n = Number(l[2]);
    return r -= t.x, n -= t.y, r === 0 && n === 0 ? "translate(0px, 0px)" : `translate(${r}px, ${n}px)`;
  }
  function init_columns_ui() {
    return {
      frag: html.div([], {
        class: "ghost-col-container"
      }),
      ghost_els: []
    };
  }
  function update_columns_ui(e, t) {
    const r = t.layout;
    e.ghost_els.forEach((l) => {
      l.handlers !== void 0 && remove_drag(l.frag, l.handlers), l.frag.remove();
    });
    let n = find_all_by_el(r, (l) => l.type === "ColName");
    for (let l = 0; l < n.length; l++) {
      const s = n[l], u = html.div([
        s.name
      ], {
        class: "ghost-col-name"
      });
      u.style.left = `${s.global_x}px`, u.style.top = `${s.global_y}px`, u.style.width = `${s.width}px`, u.style.height = `${s.height}px`;
      let d = Date.now(), h = false, f = false, o = u.getBoundingClientRect().left, p = l, y = t.layout, g = t.initial_world;
      const v = (m) => n.find((_) => _.name === m);
      let c = setup_drag(u, {
        on_begin_drag() {
          d = Date.now(), o = u.getBoundingClientRect().left;
        },
        async on_drag(m, _, x) {
          let S = p;
          if (Date.now() - d > 100 && (h = true, f = x.altKey, u.classList.add("dragging")), !!h) {
            if (h) {
              o += m;
              const E = o - t.table_html.getBoundingClientRect().left, w = n.map((C) => Math.abs(E - v(C.name).global_x));
              S = minarg(w);
            }
            if (u.style.left = `${o - t.table_html.getBoundingClientRect().left}px`, p !== S) {
              const E = await get_el_table$1(t, s.name, S, f);
              t.table_html.innerHTML = "", t.table_html.append(E.layout.html()), animate(t.table_html, y, E.layout), y = E.layout, p = S, t.layout = E.layout, g = E.initial_world;
            }
          }
        },
        on_release_drag(m) {
          h || document.dispatchEvent(new CustomEvent("apply_effect", {
            detail: {
              type: m.shiftKey ? "ExtendSelectionTo" : "MoveSelectionTo",
              path: [
                s.name
              ]
            }
          })), h && (update_initial_world(t, g), refresh_string_table(t), u.classList.remove("being-dragged"));
        }
      });
      e.ghost_els.push({
        el_col_name: s,
        frag: u,
        handlers: c
      }), u.onmouseenter = () => {
        set_hover("on", s.name);
      }, u.onmouseleave = () => {
        set_hover("off", s.name);
      }, e.frag.append(u);
    }
  }
  function set_hover(e, t) {
    const r = document.querySelector(`.col-name-frame[data-col-name="${t}"]`);
    r !== null && (e === "on" ? r.classList.add("hovered") : r.classList.remove("hovered")), document.querySelectorAll(`.mark[data-col-name="${t}"]`).forEach((n) => {
      e === "on" ? n.classList.add("hovered") : n.classList.remove("hovered");
    });
  }
  async function get_el_table$1(e, t, r, n) {
    const l = structuredClone(e.initial_world), s = l.data.items.findIndex((h) => h.type === "Col" && h.name === t), u = l.data.items[s];
    n ? l.data.items.splice(r, 0, structuredClone({
      ...u,
      name: `${u.name} (Copy)`,
      id: get_tag_id()
    })) : (l.data.items.splice(s, 1), l.data.items.splice(r, 0, u));
    const d = await apply_modifiers_string_table(l, e.program.modifiers);
    return {
      world: d,
      initial_world: l,
      layout: render(d.data, {})
    };
  }
  function parse_key_combo(e) {
    return e.replaceAll(" ", "").split(",").map((t) => {
      const r = t.split("+"), n = r.at(-1), l = r.slice(0, -1);
      return {
        key: n,
        ctrlCmd: l.includes("c"),
        shift: l.includes("s"),
        alt: l.includes("a")
      };
    });
  }
  function event_matches_key_combo(e, t) {
    return t.some((r) => e.key.toLowerCase() === r.key.toLowerCase() && (e.ctrlKey || e.metaKey) === r.ctrlCmd && e.shiftKey === r.shift && e.altKey === r.alt);
  }
  function event_matches(e, t) {
    return event_matches_key_combo(e, parse_key_combo(t));
  }
  function useKeyBindings(e) {
    const t = (r) => {
      if (r.target === document.body) for (const n of e) event_matches(r, n.combo) && (n.action(r), r.preventDefault());
    };
    return window.addEventListener("keydown", t), () => window.removeEventListener("keydown", t);
  }
  function init_palette() {
    return {
      frag: html.div([], {
        class: "palette"
      }),
      clear_key_bindings: void 0
    };
  }
  function get_commands(e, t) {
    const r = [], n = navigate_to_tag_data(e.data, t, e.active_tag);
    if (n.length === 0) return [];
    const l = n.some((u) => u.type === "Col"), s = selection_to_col_range(e, t);
    return l && (r.push({
      type: "Modifier",
      description: "Sort",
      action: (u) => {
        u(modifier_col_sort(s));
      },
      category: "Layout"
    }), r.push({
      type: "Modifier",
      description: "Vertical Axis",
      action: (u) => {
        u(modifier_vaxis(s));
      },
      category: "Layout"
    }), r.push({
      type: "Modifier",
      description: "Horizontal Axis",
      action: (u) => {
        u(modifier_haxis(s));
      },
      category: "Layout"
    }), r.push({
      type: "Modifier",
      description: "Group By",
      action: (u) => {
        u(modifier_group_by(s));
      },
      category: "Layout"
    }), r.push({
      type: "Modifier",
      description: "Overlay",
      action: (u) => {
        u(modifier_overlay(s));
      },
      category: "Layout"
    }), r.push({
      type: "Modifier",
      description: "Size",
      action: (u) => {
        u(modifier_size(s));
      },
      category: "Appearance"
    }), r.push({
      type: "Modifier",
      description: "Color",
      action: (u) => {
        u(modifier_color(s));
      },
      category: "Appearance"
    }), r.push({
      type: "Modifier",
      description: "Dense",
      action: (u) => {
        u(modifier_dense(s));
      },
      category: "Appearance"
    })), n.filter((u) => u.type === "Col").length === 2 && r.push({
      type: "Modifier",
      description: "Plot",
      action: (u) => {
        u(modifier_plot(s));
      },
      category: "Layout"
    }), r;
  }
  function refresh_palette(e, t, r, n, l) {
    var _a;
    const s = get_commands(t, r);
    if (s.length === 0) {
      e.frag.innerHTML = "", e.frag.classList.add("hidden");
      return;
    } else e.frag.classList.remove("hidden");
    const u = Object.groupBy(s, (_) => _.category ?? "Other"), d = Object.entries(u).map(([_, x]) => {
      const S = html.div(_, {
        class: "palette-group-title"
      }), E = (x ?? []).map((w) => {
        const C = html.div(w.description, {
          class: "palette-command"
        });
        return C.addEventListener("click", () => {
          w.action((D) => document.dispatchEvent(new CustomEvent(w.type === "Effect" ? "apply_effect" : "add_modifier", {
            detail: D
          })));
        }), C;
      });
      return html.div([
        S,
        ...E
      ], {
        class: "palette-group"
      });
    });
    (_a = e.clear_key_bindings) == null ? void 0 : _a.call(e), e.clear_key_bindings = useKeyBindings(s.filter((_) => _.combo !== void 0).map((_) => ({
      combo: _.combo,
      action: () => {
        _.action((x) => document.dispatchEvent(new CustomEvent(_.type === "Effect" ? "apply_effect" : "add_modifier", {
          detail: x
        })));
      }
    })));
    const h = selection_to_col_range(t, r), f = html.input("text", {
      class: "palette-formula",
      placeholder: "Formula"
    }), o = html.div([
      f
    ], {
      class: "palette-formula-container"
    });
    f.addEventListener("keydown", function(_) {
      _.code === "Enter" && document.dispatchEvent(new CustomEvent("add_modifier", {
        detail: modifier_derive(h, {
          formula: f.value
        })
      })), _.stopPropagation();
    });
    const y = navigate_to_tag(t.data, r, t.active_tag).filter(is_data_dap).map((_) => _.data).filter((_) => _.type === "Col"), g = html.input("text", {
      class: "palette-formula",
      placeholder: y[0].name,
      value: y[0].name
    }), v = html.div("Name", {
      class: "palette-group-title"
    }), c = html.div([
      v,
      g
    ], {
      class: "palette-group"
    });
    if (g.addEventListener("keydown", function(_) {
      _.code === "Enter" && document.dispatchEvent(new CustomEvent("apply_effect", {
        detail: {
          type: "RenameColumn",
          new_name: g.value
        }
      })), _.stopPropagation();
    }), e.frag.innerHTML = "", e.frag.append(o), e.frag.append(html.div([
      ...d,
      c
    ], {
      class: "palette-inner"
    })), n.children.length === 0) return;
    const m = get_bbox_union(n.children.map((_) => ({
      x: _.x,
      y: _.y,
      width: _.width,
      height: _.height
    })));
    e.frag.style.left = `${m.x + m.width}px`, e.frag.style.top = `${m.y + l}px`;
  }
  const DRAG_THRESHOLD = 30;
  function init_mod_ui(e, t) {
    const r = html.div([], {
      class: "mod-ui-name"
    }), n = html.div([], {
      class: [
        "mod-ui-name",
        "mod-ui-name-ghost"
      ]
    });
    document.body.append(n);
    const l = html.div([], {
      class: [
        "mod-ui-palette"
      ]
    });
    document.body.append(l);
    const s = html.div([], {
      class: [
        "mod-ui-link",
        "mod-ui-link-cursor"
      ]
    }), u = html.div([
      s
    ], {
      class: "mod-ui-gutter"
    }), d = html.div([
      r,
      u
    ], {
      class: "mod-ui"
    }), h = html.div([], {
      class: [
        "mod-ui-col-name-decos"
      ]
    });
    return t.container_html.append(h), {
      frag: d,
      modifier: e,
      name: r,
      name_ghost: n,
      gutter: u,
      links: [],
      broken_overlays: [],
      option_palette: l,
      col_name_decos: h,
      option_palette_open: false,
      selected: false
    };
  }
  async function update_mod_ui(e, t, r) {
    e.modifier = t, e.frag.style.width = `${r.layout.width}px`, e.name.innerHTML = "", e.name.classList.remove("option-palette-open"), e.name.append(html.span("|", {
      class: [
        "mod-ui-handle",
        "mod-ui-handle-left"
      ]
    }), html.span(get_humane_name(t), {
      class: "mod-ui-type"
    }), html.span("|", {
      class: [
        "mod-ui-handle",
        "mod-ui-handle-right"
      ]
    })), e.name_ghost.innerHTML = "", e.name_ghost.append(html.span("|", {
      class: [
        "mod-ui-handle",
        "mod-ui-handle-left"
      ]
    }), html.span(get_humane_name(t), {
      class: "mod-ui-type"
    }), html.span("|", {
      class: [
        "mod-ui-handle",
        "mod-ui-handle-right"
      ]
    }));
    const n = await mod_ui_decorate_col_name(e, r);
    if (e.col_name_decos.innerHTML = "", e.col_name_decos.append(...n), e.option_palette.innerHTML = "", e.option_palette_open) {
      const l = r.mod_uis.filter((s) => s !== e && s.modifier.group_name !== void 0 && s.modifier.group_name === t.group_name);
      l.length > 0 ? e.name.append(make_group_palette(e, l, r, "ungroup")) : r.mod_uis.filter((s) => s.selected).length >= 2 ? e.name.append(make_group_palette(e, l, r, "group")) : e.name.append(make_option_palette(t, r)), e.name.classList.add("option-palette-open");
    }
    if (e.selected ? e.name.classList.add("mod-ui-selected") : e.name.classList.remove("mod-ui-selected"), assert(r.layout !== void 0), e.name_drag_handler !== void 0 && remove_drag(e.name, e.name_drag_handler), e.name_drag_handler = setup_modifier_drag(e, r), t.type === "Overlay") {
      const { cols: l } = await get_names_up_till_modifier(r, e), s = l.slice(e.modifier.range.start_idx, e.modifier.range.end_idx), { encoding_type: u } = get_overlay_encoding(s);
      u === void 0 ? e.name.classList.add("invalid") : e.name.classList.remove("invalid");
    } else e.name.classList.remove("invalid");
  }
  function setup_modifier_drag(e, t) {
    const r = e.modifier;
    let n = e.name.getBoundingClientRect().left, l = e.name.getBoundingClientRect().width, s = Date.now(), u = false, d = t.layout;
    r.range.start_idx, r.range.end_idx;
    let h = r.range.start_idx, f = r.range.end_idx;
    update_mod_ui_layout(e, d, h, f, t);
    let o = 0, p, y = {}, g = {}, v = [];
    return setup_drag(e.name, {
      on_begin_drag: (m) => {
        s = Date.now();
        const _ = m.target.classList;
        v = t.mod_uis.filter((x) => x !== e && x.modifier.group_name !== void 0 && x.modifier.group_name === r.group_name), _.contains("mod-ui-handle-left") ? p = "LEFT" : _.contains("mod-ui-handle-right") ? p = "RIGHT" : p = "WHOLE";
      },
      on_drag: async (m, _, x) => {
        if (Date.now() - s > 100 && !u && (u = true, show_drag_ghost(e), v.forEach((D) => show_drag_ghost(D)), n = e.name.getBoundingClientRect().left, l = e.name.getBoundingClientRect().width, o = x.x, v.forEach((D) => {
          y[D.modifier.id] = D.modifier.range.start_idx - e.modifier.range.start_idx, g[D.modifier.id] = D.modifier.range.end_idx - e.modifier.range.end_idx;
        }), p == "LEFT" || p == "RIGHT" ? document.body.classList.add("is-resizing") : document.body.classList.add("is-dragging")), !u) return;
        let S = h, E = f;
        const { col_name_els: w, get_name_el: C } = await get_names_up_till_modifier(t, e);
        if (p === "WHOLE") {
          n += m;
          const D = n - t.table_html.getBoundingClientRect().left, A = w.map((F) => Math.abs(D - C(F.name).global_x));
          S = minarg(A), E = S + (f - h), E >= w.length && (E = w.length, S = E - (f - h)), v.forEach((F) => {
            const B = y[F.modifier.id], N = g[F.modifier.id];
            F.modifier.range.start_idx = S + B, F.modifier.range.end_idx = E + N;
          }), move_drag_ghost(e, m), v.forEach((F) => move_drag_ghost(F, m));
        } else if (p === "LEFT") {
          n += m, l -= m;
          const D = n - t.table_html.getBoundingClientRect().left, A = w.map((F) => Math.abs(D - C(F.name).global_x));
          S = minarg(A), S > f && (S = f);
        } else if (p === "RIGHT") {
          l += m;
          const D = n + l - t.table_html.getBoundingClientRect().left, A = w.map((F) => Math.abs(D - (C(F.name).global_x + C(F.name).width)));
          E = minarg(A) + 1, E < h + 1 && (E = h + 1);
        }
        if (e.name_ghost.style.top = `${e.name.getBoundingClientRect().top - 3}px`, e.name_ghost.style.left = `${n}px`, e.name_ghost.style.width = `${l}px`, (h !== S || f !== E) && Math.abs(x.x - o) > DRAG_THRESHOLD) {
          const D = await get_el_table(t, r, S, E, p !== "WHOLE" ? void 0 : r.range.start_idx > S ? "WHOLE_LEFT" : "WHOLE_RIGHT");
          t.table_html.innerHTML = "", t.table_html.append(D.layout.html()), animate(t.table_html, d, D.layout), d = D.layout, h = S, f = E, t.layout = D.layout, t.program.modifiers = D.modifiers, update_mod_ui_layout(e, d, h, f, t);
          for (const A of t.program.modifiers) {
            if (A.id === r.id) {
              A.parameters = D.modifiers.find((N) => N.id === A.id).parameters;
              continue;
            }
            const F = D.modifiers.find((N) => N.id === A.id);
            A.range.end_idx = F.range.end_idx, A.range.start_idx = F.range.start_idx, A.parameters = F.parameters;
            const B = t.mod_uis.find((N) => N.modifier.id === A.id);
            await update_mod_ui(B, A, t);
          }
          o = x.x;
        }
      },
      on_release_drag: (m) => {
        const _ = m.target.classList;
        if (!(_.contains("modifier-option-palette-command") || m.target.classList.contains("mod-ui-toggle-button") || _.contains("modifier-option-palette-formula") || _.contains("modifier-option-palette-color") || _.contains("mod-ui-slider"))) if (u) hide_drag_ghost(e), v.forEach(hide_drag_ghost), r.range.start_idx = h, r.range.end_idx = f, refresh_string_table(t), document.body.classList.remove("is-resizing"), document.body.classList.remove("is-dragging");
        else if (document.dispatchEvent(new CustomEvent("apply_effect", {
          detail: {
            type: "ClearSelection"
          }
        })), t.mod_uis.some((S) => S.option_palette_open) && m.shiftKey) {
          e.selected = true;
          for (const S of t.mod_uis) S.option_palette_open = false;
          v.forEach((S) => S.selected = true), e.option_palette_open = true;
        } else {
          for (const S of t.mod_uis) S !== e && S.option_palette_open && (S.option_palette_open = false, S.selected = false);
          e.option_palette_open = true, e.selected = true, v.forEach((S) => S.selected = true), refresh_string_table(t);
        }
      }
    });
  }
  function move_drag_ghost(e, t) {
    const r = e.name_ghost.getBoundingClientRect().left + t;
    e.name_ghost.style.left = `${r}px`;
  }
  function show_drag_ghost(e) {
    e.name.classList.add("shadow"), e.name_ghost.classList.add("active");
    const t = e.name.getBoundingClientRect();
    e.name_ghost.style.top = `${t.top - 3}px`, e.name_ghost.style.left = `${t.left}px`, e.name_ghost.style.width = `${t.width}px`, e.col_name_decos.classList.add("hidden");
  }
  function hide_drag_ghost(e) {
    e.name.classList.remove("shadow"), e.name_ghost.classList.remove("active"), e.col_name_decos.classList.remove("hidden");
  }
  async function get_names_up_till_modifier(e, t) {
    const r = await get_cols_up_till_modifier(e, t.modifier, e.program.modifiers, e.initial_world), n = r.map((u) => u.name), l = find_all_by_el(e.layout, (u) => u.type === "ColName" && n.includes(u.name));
    return {
      col_name_els: l,
      get_name_el: (u) => l.find((d) => d.name === u),
      cols: r
    };
  }
  async function get_cols_up_till_modifier(e, t, r, n) {
    const l = r.indexOf(t), s = await apply_modifiers_string_table(n, r.slice(0, l));
    return find_all_cols(s.data);
  }
  async function update_mod_ui_layout(e, t, r, n, l) {
    const { col_name_els: s, get_name_el: u } = await get_names_up_till_modifier(l, e);
    if (e.modifier.group_name !== void 0 ? (e.frag.classList.add("mod-ui-grouped"), e.name_ghost.classList.add("mod-ui-grouped")) : (e.frag.classList.remove("mod-ui-grouped"), e.name_ghost.classList.remove("mod-ui-grouped")), e.frag.classList.remove("mod-ui-grouped-first"), e.name_ghost.classList.remove("mod-ui-grouped-first"), e.frag.classList.remove("mod-ui-grouped-last"), e.name_ghost.classList.remove("mod-ui-grouped-last"), e.modifier.group_name !== void 0) {
      let o = true, p = l.mod_uis.indexOf(e);
      for (let g = p - 1; g >= 0; g--) if (l.mod_uis[g].modifier.group_name === e.modifier.group_name) {
        o = false;
        break;
      }
      o && (e.frag.classList.add("mod-ui-grouped-last"), e.name_ghost.classList.add("mod-ui-grouped-last"));
      let y = true;
      for (let g = p + 1; g < l.mod_uis.length; g++) if (l.mod_uis[g].modifier.group_name === e.modifier.group_name) {
        y = false;
        break;
      }
      y && (e.frag.classList.add("mod-ui-grouped-first"), e.name_ghost.classList.add("mod-ui-grouped-first"));
    }
    const d = s.slice(r, n), h = get_bbox_union(d.map((o) => {
      const p = u(o.name);
      return {
        x: p.global_x,
        y: p.global_y,
        width: p.width,
        height: p.height
      };
    }));
    let f = h.x;
    e.name.style.left = `${f}px`, e.name.style.width = `${h.width}px`, e.gutter.style.left = `${f}px`, e.gutter.style.width = `${h.width}px`, e.links.forEach((o) => o.remove()), e.links = [], d.forEach((o, p) => {
      const y = html.div([], {
        class: "mod-ui-link"
      });
      e.gutter.append(y);
      const g = u(o.name);
      y.style.left = `${g.global_x - e.gutter.getBoundingClientRect().left + e.frag.getBoundingClientRect().left}px`, y.style.width = `${g.width}px`, e.links.push(y);
      const v = e.modifier.parameters.some((c) => c.name === o.name);
      v && y.classList.add("active"), e.modifier.type === "VAxis" || e.modifier.type === "Color" || e.modifier.type === "Size" || e.modifier.type === "Group" || e.modifier.type === "Derive" || e.modifier.type === "Overlay" || e.modifier.type === "Dense" ? y.addEventListener("click", async () => {
        v ? e.modifier.parameters = [] : e.modifier.parameters = [
          {
            name: o.name,
            arg: p
          }
        ], refresh_string_table(l);
      }) : e.modifier.type === "HAxis" || e.modifier.type === "Plot" || e.modifier.type === "ColSort" ? y.addEventListener("click", async () => {
        const c = e.modifier.parameters.find((m) => m.name === o.name);
        c ? e.modifier.parameters = e.modifier.parameters.filter((m) => m !== c) : e.modifier.parameters.push({
          name: o.name,
          arg: p
        }), refresh_string_table(l);
      }) : assert_never(e.modifier);
    });
  }
  async function get_el_table(e, t, r, n, l) {
    const s = structuredClone(e.program.modifiers), u = s.find((o) => o.id === t.id);
    assert(u !== void 0), r !== u.range.start_idx && n === u.range.end_idx && (u.parameters = u.parameters.map((o) => ({
      ...o,
      arg: o.arg + (u.range.start_idx - r)
    }))), u.range.start_idx = r, u.range.end_idx = n, u.parameters = u.parameters.filter((o) => u.range.start_idx + o.arg < u.range.end_idx);
    const [d, h] = await reorder_columns(e, e.initial_world, s, l);
    update_initial_world(e, d);
    const f = await apply_modifiers_string_table(structuredClone(e.initial_world), h);
    return {
      world: f,
      layout: render(f.data, {}, true),
      modifiers: h
    };
  }
  function get_humane_name(e) {
    if (e.type === "HAxis") return "Axis \u21D2";
    if (e.type === "Plot") return "Plot \u22BE";
    if (e.type === "VAxis") return "Axis \u21D1";
    if (e.type === "ColSort") return "Sort";
    if (e.type === "Size") return "Size";
    if (e.type === "Color") return "Color";
    if (e.type === "Group") return "Group";
    if (e.type === "Derive") return `${e.formula}`;
    if (e.type === "Overlay") return "Overlay";
    if (e.type === "Dense") return "Dense";
    assert_never(e);
  }
  function make_option_palette(e, t) {
    const r = [], n = (u, d, h) => {
      const f = u.map((o) => html.div(o, {
        class: [
          "mod-ui-toggle-button",
          o === d ? "active" : null
        ],
        onclick: (p) => {
          f.forEach((y) => y.classList.remove("active")), p.target.classList.add("active"), h(o), p.stopPropagation(), p.preventDefault();
        }
      }));
      return html.div(f, {
        class: [
          "mod-ui-toggle-button-container"
        ],
        onclick: () => {
        }
      });
    };
    if ((e.type === "HAxis" || e.type === "VAxis" || e.type === "ColSort") && r.push({
      frag: n([
        "Ascending",
        "Descending"
      ], e.reverse ? "Descending" : "Ascending", () => {
        e.reverse = !e.reverse, refresh_string_table(t);
      }),
      group: "Direction"
    }), e.type === "Color") {
      const d = Object.entries({
        blue: "#4b9aea",
        orange: "#f8802e",
        purple: "#704bea",
        red: "#f77462",
        green: "#4fef6c"
      }).map(([h, f]) => html.div([], {
        class: [
          "modifier-option-palette-color",
          h === e.scheme ? "active" : null
        ],
        style: {
          background: f
        },
        onclick: () => {
          e.scheme = h, refresh_string_table(t);
        }
      }));
      e.unique && d.slice(0, e.range.end_idx - e.range.start_idx).forEach((f) => f.classList.add("active")), r.push({
        frag: html.div(d, {
          class: [
            "modifier-option-palette-color-container",
            e.unique ? "inactive" : null
          ]
        }),
        group: "Colors"
      }), r.push({
        frag: n([
          "Varying",
          "Constant"
        ], e.varying ? "Varying" : "Constant", (h) => {
          h === "Varying" ? e.varying = true : e.varying = false, refresh_string_table(t);
        }),
        group: "Row Format"
      }), r.push({
        frag: n([
          "Single",
          "Unique"
        ], e.unique ? "Unique" : "Single", (h) => {
          h === "Unique" ? e.unique = true : e.unique = false, refresh_string_table(t);
        }),
        group: "Column Format"
      });
    }
    if (e.type === "Group") {
      const u = html.input("range", {
        min: 2,
        max: 10,
        value: e.bin_size,
        step: 1,
        class: "mod-ui-slider"
      });
      u.onmousedown = (d) => {
        d.stopPropagation();
      }, u.onmouseup = (d) => {
        parseInt(u.value) !== e.bin_size && (e.bin_size = parseInt(u.value), refresh_string_table(t)), d.stopPropagation(), d.preventDefault();
      }, r.push({
        frag: html.div(u, {
          class: "modifier-option-palette-command"
        }),
        group: `Bin Size (${u.value})`
      });
    }
    if (e.type === "Dense") {
      const u = html.input("range", {
        min: 0,
        max: 5,
        value: e.size_multiplier,
        step: 0.1,
        class: "mod-ui-slider"
      });
      u.onmousedown = (d) => {
        d.stopPropagation();
      }, u.onmouseup = (d) => {
        parseFloat(u.value) !== e.size_multiplier && (e.size_multiplier = parseFloat(u.value), refresh_string_table(t)), d.stopPropagation(), d.preventDefault();
      }, r.push({
        frag: html.div(u, {
          class: "modifier-option-palette-command"
        }),
        group: "Size"
      });
    }
    if (e.type === "Derive") {
      const u = html.input("text", {
        class: "modifier-option-palette-formula",
        placeholder: e.formula,
        value: e.formula,
        onkeydown: (d) => {
          d.code === "Enter" && (e.formula = u.value, refresh_string_table(t)), d.stopPropagation();
        }
      });
      r.push({
        frag: u,
        group: "Formula"
      });
    }
    const l = Object.groupBy(r, (u) => u.group ?? "Other"), s = Object.entries(l).map(([u, d]) => {
      const h = html.div(u, {
        class: "modifier-option-palette-group-title"
      }), f = (d ?? []).map((o) => o.frag);
      return html.div([
        h,
        ...f
      ], {
        class: "modifier-option-palette-group"
      });
    });
    return html.div([
      html.div(s, {
        class: "modifier-option-palette-inner"
      })
    ], {
      class: [
        "modifier-option-palette",
        s.length === 0 ? "modifier-option-palette-hidden" : null
      ]
    });
  }
  function make_group_palette(e, t, r, n) {
    const l = (u, d = false) => html.div([
      u
    ], {
      class: [
        "modifier-option-palette-command",
        d ? "active" : null
      ]
    }), s = [];
    if (n === "ungroup") {
      const u = l("Break apart");
      u.onclick = () => {
        e.modifier.group_name = void 0, t.forEach((d) => d.modifier.group_name = void 0), e.option_palette_open = false, e.selected = false, t.forEach((d) => d.option_palette_open = false), t.forEach((d) => d.selected = false), refresh_string_table(r);
      }, s.push(u);
    } else {
      const u = l("Join");
      u.onclick = () => {
        const d = `GROUP(${get_tag_id()})`;
        r.mod_uis.forEach((h) => {
          h.selected && (h.modifier.group_name = d, h.modifier.parameters = []);
        }), refresh_string_table(r);
      }, s.push(u);
    }
    return html.div([
      html.div(s, {
        class: "modifier-option-palette-inner"
      })
    ], {
      class: [
        "modifier-option-palette"
      ]
    });
  }
  async function mod_ui_decorate_col_name(e, t) {
    const r = [], { col_name_els: n, cols: l } = await get_names_up_till_modifier(t, e), s = n.slice(e.modifier.range.start_idx, e.modifier.range.end_idx);
    if (l.slice(e.modifier.range.start_idx, e.modifier.range.end_idx), e.modifier.type === "Plot") {
      const u = s[0], d = s[1], h = html.div("y", {
        class: "mod-ui-deco-xy"
      }), f = html.div("x", {
        class: "mod-ui-deco-xy"
      });
      h.style.left = `${u.global_x + u.width - 12 - 3}px`, h.style.top = `${u.global_y + 3}px`, f.style.left = `${d.global_x + d.width - 12 - 3}px`, f.style.top = `${d.global_y + 3}px`, r.push(f, h);
    } else if (e.modifier.type === "Color") {
      const u = e.modifier;
      s.forEach((d, h) => {
        let f = u.unique ? get_unique_scheme(h) : u.scheme;
        const o = html.div("", {
          class: [
            "mod-ui-deco-color",
            f
          ]
        });
        o.style.left = `${d.global_x}px`, o.style.top = `${d.global_y}px`, o.style.width = `${d.width}px`, o.style.height = `${d.height}px`, r.push(o);
      });
    }
    return r;
  }
  function clear_mod_ui(e) {
    e.name_drag_handler !== void 0 && remove_drag(e.name, e.name_drag_handler), e.frag.remove(), e.name_ghost.remove(), e.col_name_decos.remove();
  }
  async function apply_effect_mut(e, t) {
    const r = e.current_world;
    if (t.type === "ClearSelection") e.selection = empty_selection();
    else if (t.type === "SelectChildren") mut_selection_to_children(e.selection, r.active_tag);
    else if (t.type === "SelectParent") mut_selection_to_parents(e.selection, r.active_tag);
    else if (t.type === "GeneralizeSelection") mut_generalize_selection(e.selection, t.pattern);
    else if (t.type === "MoveSelectionTo") t.path.every((n) => is_path_step(n)) ? mut_move_selection_from_path(e.selection, t.path, r.active_tag) : mut_move_selection_from_pattern(e.selection, t.path, r.active_tag);
    else if (t.type === "ExtendSelectionTo") t.path.every((n) => is_path_step(n)) ? mut_toggle_selection_from_path(e.selection, t.path, r.active_tag) : mut_toggle_selection_from_pattern(e.selection, t.path, r.active_tag);
    else if (t.type === "ShowMoreRows") e.initial_world.data.max_entries += t.amount;
    else if (t.type === "DeleteColumn") {
      const l = navigate_to_tag(r.data, e.selection, r.active_tag).filter(is_data_dap).map((s) => s.data).filter((s) => s.type === "Col");
      for (const s of l) {
        const u = e.initial_world.data.items.findIndex((d) => d.id === s.id);
        if (u === -1) {
          console.warn("[DeleteColumn] Cannot find column to delete.");
          continue;
        }
        e.initial_world.data.items.splice(u, 1);
      }
    } else if (t.type === "RenameColumn") {
      const l = navigate_to_tag(r.data, e.selection, r.active_tag).filter(is_data_dap).map((s) => s.data).filter((s) => s.type === "Col");
      for (const s of l) {
        const u = e.initial_world.data.items.findIndex((d) => d.id === s.id);
        if (u === -1) {
          console.warn("[RenameColumn] Cannot find column to delete.");
          continue;
        }
        e.initial_world.data.items[u].name = t.new_name;
      }
    } else if (t.type === "AddNewColumn") {
      const n = find_all_cols(e.initial_world.data), l = n[0].items.length;
      let s = "New Column", u = 1;
      for (; n.some((d) => d.name === s); ) s = `New Column (${u})`, u++;
      e.initial_world.data.items.push({
        id: get_tag_id(),
        type: "Col",
        name: s,
        encoding: {},
        items: [
          ...new Array(l)
        ].map((d, h) => ({
          id: get_tag_id(),
          type: "Mark",
          value: "-",
          row_indices: [
            h
          ],
          mark_type: "Text",
          col_name: s
        }))
      });
    } else t.type === "DeleteAllModifiers" ? (e.program.modifiers = [], e.mod_uis.forEach((n) => clear_mod_ui(n)), e.mod_ui_container.innerHTML = "", e.mod_uis = []) : assert_never(t);
  }
  async function init_string_table(e) {
    const t = init_palette(), r = html.vstack([], {
      class: "mod-ui-container"
    }), n = html.svg_group(), l = html.svg([
      n
    ], {
      class: "svg-render"
    }), s = init_columns_ui(), u = html.div([
      l,
      s.frag
    ], {
      class: "table-container"
    }), d = html.div([
      r,
      u,
      t.frag
    ], {
      class: "string-table"
    }), h = {
      data: e,
      active_tag: "primary"
    }, f = {
      frag: d,
      initial_world: h,
      current_world: structuredClone(h),
      program: {
        modifiers: []
      },
      selection: {
        edges: [],
        excluded_paths: [],
        tags: {}
      },
      layout: void 0,
      palette: t,
      mod_uis: [],
      mod_ui_container: r,
      columns_ui: s,
      table_html: n,
      table_container_html: l,
      container_html: u,
      undo_stack: []
    };
    return f.undo_stack.push({
      modifiers: [],
      initial_world: structuredClone(h),
      selection: {
        edges: [],
        excluded_paths: [],
        tags: {}
      }
    }), document.addEventListener("add_modifier", (o) => {
      assert("detail" in o), add_to_undo_stack(f), f.program.modifiers.push(o.detail), refresh_string_table(f);
    }), document.addEventListener("apply_effect", (o) => {
      assert("detail" in o), add_to_undo_stack(f);
      const p = o.detail;
      p.type === "MoveSelectionTo" && (f.mod_uis.forEach((y) => y.option_palette_open = false), f.mod_uis.forEach((y) => y.selected = false)), apply_effect_mut(f, p), refresh_string_table(f);
    }), document.addEventListener("keydown", (o) => {
      if (o.key === "Backspace" || o.key === "Delete") {
        apply_effect_mut(f, {
          type: "DeleteColumn"
        });
        for (const [p, y] of f.mod_uis.entries()) y.selected && (clear_mod_ui(y), f.program.modifiers.splice(p, 1), f.mod_uis.splice(p, 1));
        refresh_string_table(f), o.preventDefault();
      }
    }), Sortable.create(r, {
      handle: ".mod-ui",
      filter: ".mod-ui-name",
      preventOnFilter: false,
      animation: 200,
      draggable: ".mod-ui",
      invertSwap: true,
      onMove: () => {
        add_to_undo_stack(f), setTimeout(() => {
          const o = [
            ...r.children
          ];
          f.mod_uis.sort((p, y) => {
            const g = o.indexOf(p.frag);
            return o.indexOf(y.frag) - g;
          }), f.program.modifiers.sort((p, y) => {
            const g = f.mod_uis.findIndex((c) => c.modifier.id === p.id), v = f.mod_uis.findIndex((c) => c.modifier.id === y.id);
            return g - v;
          }), refresh_string_table(f);
        });
      }
    }), document.addEventListener("click", (o) => {
      (o.target === document.body || o.target === d || o.target === d.querySelector(".svg-render") || o.target === document.querySelector(".mod-ui-container") || o.target === d.querySelector(".table-container") || o.target !== null && "contains" in o.target && o.target.contains(d)) && (apply_effect_mut(f, {
        type: "ClearSelection"
      }), f.mod_uis.forEach((p) => p.option_palette_open = false), f.mod_uis.forEach((p) => p.selected = false), refresh_string_table(f));
    }), document.body.addEventListener("mouseover", (o) => {
      o.target !== null && "parentElement" in o.target && o.target.parentElement.classList.contains("mark") && update_point_selection(o.target.parentElement, "select");
    }), document.body.addEventListener("mouseout", (o) => {
      o.target !== null && "parentElement" in o.target && o.target.parentElement.classList.contains("mark") && update_point_selection(o.target.parentElement, "deselect");
    }), document.body.addEventListener("keydown", (o) => {
      if (o.key === "z" && (o.metaKey || o.ctrlKey) && f.undo_stack.length > 0) {
        const p = f.undo_stack.pop();
        reset_string_table(f, p.initial_world.data, p.modifiers, p.selection);
      }
    }), refresh_string_table(f), e.file_name === "figure_1_oscar.csv" && setTimeout(() => {
      f.program.modifiers.push(modifier_haxis({
        start_idx: 1,
        end_idx: 3
      }), modifier_overlay({
        start_idx: 1,
        end_idx: 3
      }), modifier_color({
        start_idx: 1,
        end_idx: 3
      }, {
        unique: true,
        varying: false
      })), refresh_string_table(f);
    }, 200), f;
  }
  function add_to_undo_stack(e) {
    e.undo_stack.push({
      modifiers: structuredClone(e.program.modifiers),
      initial_world: structuredClone(e.initial_world),
      selection: structuredClone(e.selection)
    });
  }
  function update_point_selection(e, t) {
    const r = e.dataset.rowIndices.split(" ").map((l) => parseInt(l.slice(1, -1))), n = e.dataset.colName;
    r.forEach((l) => {
      document.querySelectorAll(`.mark[data-row-indices*="(${l})"]`).forEach((s) => {
        s !== e && n === s.dataset.colName || (t === "select" ? s.classList.add("selected") : s.classList.remove("selected"));
      }), document.querySelectorAll(`.connection-path[data-row-index="${l}"]`).forEach((s) => {
        t === "select" ? s.classList.add("selected") : s.classList.remove("selected");
      });
    });
  }
  async function reset_string_table(e, t, r = [], n = {
    edges: [],
    excluded_paths: [],
    tags: {}
  }) {
    e.program.modifiers = r, e.initial_world = {
      data: t,
      active_tag: "primary"
    }, e.selection = n, e.table_html.innerHTML = "", e.mod_uis.forEach((l) => clear_mod_ui(l)), e.mod_ui_container.innerHTML = "", e.mod_uis = [], refresh_string_table(e);
  }
  async function apply_modifiers_string_table(e, t) {
    let r = structuredClone(e);
    for (const n of t) r = await apply_modifier(r, n);
    return r;
  }
  async function refresh_string_table(e, t = false) {
    var _a, _b;
    let r = performance.now();
    const n = e.layout;
    (_a = document.querySelector(".table-error")) == null ? void 0 : _a.remove();
    try {
      const [l, s] = await reorder_columns(e, e.initial_world, e.program.modifiers);
      update_initial_world(e, l), e.program.modifiers = s, e.current_world = await apply_modifiers_string_table(structuredClone(e.initial_world), e.program.modifiers);
      const u = render(e.current_world.data, {}, t), d = render_selections(u, e.current_world, e.selection), h = u.html();
      e.table_html.innerHTML = "", e.table_html.append(h), n !== void 0 && animate(e.table_html, n, u), e.table_container_html.style.width = `${u.width}px`, e.table_container_html.style.height = `${u.height}px`;
      const f = d.html();
      (_b = e.table_container_html.querySelector(".selections")) == null ? void 0 : _b.remove(), e.table_container_html.append(f), setTimeout(() => {
        refresh_palette(e.palette, e.current_world, e.selection, d, e.table_container_html.getBoundingClientRect().y - e.frag.getBoundingClientRect().y);
      }), e.layout = u, update_columns_ui(e.columns_ui, e);
      for (const p of e.program.modifiers) {
        let y;
        const g = e.mod_uis.find((v) => v.modifier.id === p.id);
        if (g !== void 0) y = g;
        else {
          y = init_mod_ui(p, e), e.mod_uis.push(y);
          const v = [
            ...e.mod_ui_container.children
          ];
          v.length === 0 ? e.mod_ui_container.append(y.frag) : v[0].before(y.frag);
        }
        await update_mod_ui(y, p, e);
      }
    } catch (l) {
      const s = `${l}`;
      e.container_html.append(html.div([], {
        class: "table-error",
        innerHTML: `<strong>Error!</strong> Something went wrong. Please Undo (Ctrl/Cmd + Z) to continue.<br><span class="debug-info">Debug information: ${s}...</span>`
      })), console.error(l), document.body.focus();
    }
    console.log(`[string-table] ${performance.now() - r}ms`);
  }
  function tag_table_data(e, t) {
    const r = e.columns.map((n, l) => ({
      id: get_tag_id(),
      type: "Col",
      name: n,
      encoding: {},
      items: e.rows.map((s) => s[l]).map((s, u) => ({
        id: get_tag_id(),
        type: "Mark",
        value: s,
        row_indices: [
          u
        ],
        mark_type: "Text",
        col_name: n
      }))
    }));
    return {
      id: get_tag_id(),
      type: "Table",
      items: r,
      max_entries: 15,
      file_name: t
    };
  }
  async function reorder_columns(e, t, r, n) {
    const l = structuredClone(r), s = structuredClone(t);
    for (const u of l) {
      if (u.parameters.length === 0) continue;
      let d = await get_cols_up_till_modifier(e, u, l, s);
      const h = d.slice(u.range.start_idx, u.range.end_idx);
      u.parameters.sort((f, o) => n === "WHOLE_LEFT" ? f.arg - o.arg : o.arg - f.arg).forEach((f) => {
        const o = d.find((c) => c.name === f.name);
        if (h.includes(o) && h.findIndex((c) => c.name === f.name) === f.arg) return;
        const p = u.range.start_idx + f.arg, y = d.filter((c) => c !== o), v = [
          ...y.slice(0, p),
          o,
          ...y.slice(p)
        ].flatMap((c) => "x_col" in c && "y_col" in c ? [
          c.y_col,
          c.x_col
        ] : [
          c
        ]);
        d = structuredClone(v), s.data.items = structuredClone(v);
      });
    }
    for (const u of l) {
      if (u.parameters.length === 0) continue;
      let d = await get_cols_up_till_modifier(e, u, l, s);
      const h = u.range.end_idx - u.range.start_idx, f = d.slice(u.range.start_idx, u.range.end_idx), o = u.parameters.map((g) => d.find((v) => v.name === g.name)).filter((g) => g !== void 0);
      if (o.length === 0 || o.every((g) => f.includes(g))) continue;
      const y = d.findIndex((g) => g.name === o[0].name);
      y !== -1 && (u.range.start_idx = y, u.range.end_idx = y + h);
    }
    return [
      s,
      l
    ];
  }
  function update_initial_world(e, t) {
    for (const r of t.data.items) r.type === "Col" ? r.encoding = {
      x: void 0,
      y: void 0,
      xy: void 0,
      color: void 0,
      size: void 0,
      sort: void 0,
      group: void 0,
      mark: void 0
    } : console.error("shouldnt be here", r);
    e.initial_world = t;
  }
  async function init_app() {
    const e = [
      "figure_1_oscar.csv",
      "figure_2_experiment.csv",
      "figure_3_planets.csv",
      "figure_4_experiment.csv",
      "figure_4_experiment_D.csv",
      "experiment.csv",
      "oscar_2026.csv",
      "gapminder.csv",
      "car.csv"
    ], t = await init_string_table(tag_table_data(await parse_csv_from_url(e[0]), e[0])), n = ((f, o, p) => {
      const y = f.map((g) => html.div(g, {
        class: [
          "toggle-button",
          g === o ? "active" : null
        ],
        onclick: (v) => {
          y.forEach((c) => c.classList.remove("active")), v.target.classList.add("active"), p(g), v.stopPropagation(), v.preventDefault();
        }
      }));
      return html.div(y, {
        class: [
          "toggle-button-container"
        ],
        onclick: () => {
        }
      });
    })([
      "Reference",
      "Dataset"
    ], "Reference", (f) => {
      f === "Reference" ? document.body.classList.add("show-reference") : document.body.classList.remove("show-reference");
    });
    n.classList.add("reference-button");
    const l = html.div(html.el("img", [], {
      src: "BBC_Oscar_2017.png",
      class: "reference-image"
    }), {
      class: "reference-image-container"
    }), s = html.select(e);
    s.onchange = async () => {
      s.value === "oscar_2026.csv" ? (document.body.classList.add("show-reference-toggle"), document.body.classList.add("show-reference")) : (document.body.classList.remove("show-reference-toggle"), document.body.classList.remove("show-reference"));
      let f = [];
      s.value === "figure_1_oscar.csv" ? f = [
        modifier_haxis({
          start_idx: 1,
          end_idx: 3
        }),
        modifier_overlay({
          start_idx: 1,
          end_idx: 3
        }),
        modifier_color({
          start_idx: 1,
          end_idx: 3
        }, {
          unique: true,
          varying: false
        })
      ] : s.value === "figure_2_experiment.csv" ? f = [
        modifier_vaxis({
          start_idx: 1,
          end_idx: 2
        }),
        modifier_group_by({
          start_idx: 1,
          end_idx: 2
        }),
        modifier_derive({
          start_idx: 1,
          end_idx: 2
        }, {
          formula: "Count(X)"
        }),
        modifier_size({
          start_idx: 1,
          end_idx: 2
        })
      ] : s.value === "figure_3_planets.csv" ? f = [
        modifier_dense({
          start_idx: 1,
          end_idx: 2
        }),
        modifier_size({
          start_idx: 1,
          end_idx: 2
        }),
        modifier_color({
          start_idx: 1,
          end_idx: 3
        }, {
          parameters: [
            {
              name: "Category",
              arg: 1
            }
          ]
        }),
        modifier_vaxis({
          start_idx: 3,
          end_idx: 5
        }, {
          parameters: [
            {
              name: "Distance",
              arg: 0
            }
          ]
        }),
        modifier_color({
          start_idx: 3,
          end_idx: 5
        }, {
          parameters: [
            {
              name: "Earth Mass",
              arg: 1
            }
          ],
          scheme: "green"
        })
      ] : s.value === "figure_4_experiment.csv" ? f = [
        modifier_group_by({
          start_idx: 0,
          end_idx: 2
        }, {
          parameters: [
            {
              name: "Condition",
              arg: 0
            }
          ]
        }),
        modifier_plot({
          start_idx: 1,
          end_idx: 3
        }, {})
      ] : s.value === "figure_4_experiment_D.csv" && (f = [
        modifier_plot({
          start_idx: 1,
          end_idx: 3
        }),
        modifier_group_by({
          start_idx: 1,
          end_idx: 2
        }, {
          bin_size: 3
        }),
        modifier_derive({
          start_idx: 1,
          end_idx: 2
        }, {
          formula: "Count(X)"
        }),
        modifier_size({
          start_idx: 1,
          end_idx: 2
        })
      ]), reset_string_table(t, tag_table_data(await parse_csv_from_url(s.value), s.value), f);
    };
    const u = html.span([
      html.span("\u2320"),
      html.span("\u03BC"),
      html.span("\u2321")
    ], {
      class: "logo"
    }), d = () => html.span([], {
      class: "controls-divider"
    }), h = html.button("Clear Modifiers", {
      class: "header-button",
      onclick: (f) => {
        f.stopPropagation();
        const o = {
          type: "DeleteAllModifiers"
        };
        document.dispatchEvent(new CustomEvent("apply_effect", {
          detail: o
        }));
      }
    });
    return {
      frag: html.vstack([
        html.hstack([
          u,
          d(),
          s,
          d(),
          h
        ], {
          class: "controls"
        }),
        n,
        l,
        t.frag
      ])
    };
  }
  const app = await init_app();
  document.querySelector("#main").append(app.frag);
  document.addEventListener("contextmenu", (e) => {
    e.preventDefault();
  });
})();
