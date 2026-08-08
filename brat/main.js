"use strict";
var Ds = Object.create;
var Ee = Object.defineProperty;
var Ns = Object.getOwnPropertyDescriptor;
var Vs = Object.getOwnPropertyNames;
var Os = Object.getPrototypeOf,
  Ms = Object.prototype.hasOwnProperty;
var E = (s, t) => () => {
    try {
      return (t || s((t = { exports: {} }).exports, t), t.exports);
    } catch (e) {
      throw ((t = 0), e);
    }
  },
  Fs = (s, t) => {
    for (var e in t) Ee(s, e, { get: t[e], enumerable: !0 });
  },
  Pt = (s, t, e, i) => {
    if ((t && typeof t == "object") || typeof t == "function")
      for (let n of Vs(t))
        !Ms.call(s, n) &&
          n !== e &&
          Ee(s, n, {
            get: () => t[n],
            enumerable: !(i = Ns(t, n)) || i.enumerable,
          });
    return s;
  };
var Et = (s, t, e) => (
    (e = s != null ? Ds(Os(s)) : {}),
    Pt(
      t || !s || !s.__esModule
        ? Ee(e, "default", { value: s, enumerable: !0 })
        : e,
      s,
    )
  ),
  Gs = (s) => Pt(Ee({}, "__esModule", { value: !0 }), s);
var ie = E((Yo, wt) => {
  "use strict";
  var Us = "2.0.0",
    qs = Number.MAX_SAFE_INTEGER || 9007199254740991,
    Hs = 16,
    js = 250,
    zs = [
      "major",
      "premajor",
      "minor",
      "preminor",
      "patch",
      "prepatch",
      "prerelease",
    ];
  wt.exports = {
    MAX_LENGTH: 256,
    MAX_SAFE_COMPONENT_LENGTH: Hs,
    MAX_SAFE_BUILD_LENGTH: js,
    MAX_SAFE_INTEGER: qs,
    RELEASE_TYPES: zs,
    SEMVER_SPEC_VERSION: Us,
    FLAG_INCLUDE_PRERELEASE: 1,
    FLAG_LOOSE: 2,
  };
});
var se = E((Zo, Rt) => {
  "use strict";
  var _s =
    typeof process == "object" &&
    process.env &&
    process.env.NODE_DEBUG &&
    /\bsemver\b/i.test(process.env.NODE_DEBUG)
      ? (...s) => console.error("SEMVER", ...s)
      : () => {};
  Rt.exports = _s;
});
var Q = E((q, yt) => {
  "use strict";
  var {
      MAX_SAFE_COMPONENT_LENGTH: _e,
      MAX_SAFE_BUILD_LENGTH: Xs,
      MAX_LENGTH: Ws,
    } = ie(),
    Ks = se();
  q = yt.exports = {};
  var Ys = (q.re = []),
    Zs = (q.safeRe = []),
    b = (q.src = []),
    Js = (q.safeSrc = []),
    T = (q.t = {}),
    Qs = 0,
    Xe = "[a-zA-Z0-9-]",
    en = [
      ["\\s", 1],
      ["\\d", Ws],
      [Xe, Xs],
    ],
    tn = (s) => {
      for (let [t, e] of en)
        s = s
          .split(`${t}*`)
          .join(`${t}{0,${e}}`)
          .split(`${t}+`)
          .join(`${t}{1,${e}}`);
      return s;
    },
    w = (s, t, e) => {
      let i = tn(t),
        n = Qs++;
      (Ks(s, n, t),
        (T[s] = n),
        (b[n] = t),
        (Js[n] = i),
        (Ys[n] = new RegExp(t, e ? "g" : void 0)),
        (Zs[n] = new RegExp(i, e ? "g" : void 0)));
    };
  w("NUMERICIDENTIFIER", "0|[1-9]\\d*");
  w("NUMERICIDENTIFIERLOOSE", "\\d+");
  w("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${Xe}*`);
  w(
    "MAINVERSION",
    `(${b[T.NUMERICIDENTIFIER]})\\.(${b[T.NUMERICIDENTIFIER]})\\.(${b[T.NUMERICIDENTIFIER]})`,
  );
  w(
    "MAINVERSIONLOOSE",
    `(${b[T.NUMERICIDENTIFIERLOOSE]})\\.(${b[T.NUMERICIDENTIFIERLOOSE]})\\.(${b[T.NUMERICIDENTIFIERLOOSE]})`,
  );
  w(
    "PRERELEASEIDENTIFIER",
    `(?:${b[T.NONNUMERICIDENTIFIER]}|${b[T.NUMERICIDENTIFIER]})`,
  );
  w(
    "PRERELEASEIDENTIFIERLOOSE",
    `(?:${b[T.NONNUMERICIDENTIFIER]}|${b[T.NUMERICIDENTIFIERLOOSE]})`,
  );
  w(
    "PRERELEASE",
    `(?:-(${b[T.PRERELEASEIDENTIFIER]}(?:\\.${b[T.PRERELEASEIDENTIFIER]})*))`,
  );
  w(
    "PRERELEASELOOSE",
    `(?:-?(${b[T.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${b[T.PRERELEASEIDENTIFIERLOOSE]})*))`,
  );
  w("BUILDIDENTIFIER", `${Xe}+`);
  w("BUILD", `(?:\\+(${b[T.BUILDIDENTIFIER]}(?:\\.${b[T.BUILDIDENTIFIER]})*))`);
  w("FULLPLAIN", `v?${b[T.MAINVERSION]}${b[T.PRERELEASE]}?${b[T.BUILD]}?`);
  w("FULL", `^${b[T.FULLPLAIN]}$`);
  w(
    "LOOSEPLAIN",
    `[v=\\s]*${b[T.MAINVERSIONLOOSE]}${b[T.PRERELEASELOOSE]}?${b[T.BUILD]}?`,
  );
  w("LOOSE", `^${b[T.LOOSEPLAIN]}$`);
  w("GTLT", "((?:<|>)?=?)");
  w("XRANGEIDENTIFIERLOOSE", `${b[T.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  w("XRANGEIDENTIFIER", `${b[T.NUMERICIDENTIFIER]}|x|X|\\*`);
  w(
    "XRANGEPLAIN",
    `[v=\\s]*(${b[T.XRANGEIDENTIFIER]})(?:\\.(${b[T.XRANGEIDENTIFIER]})(?:\\.(${b[T.XRANGEIDENTIFIER]})(?:${b[T.PRERELEASE]})?${b[T.BUILD]}?)?)?`,
  );
  w(
    "XRANGEPLAINLOOSE",
    `[v=\\s]*(${b[T.XRANGEIDENTIFIERLOOSE]})(?:\\.(${b[T.XRANGEIDENTIFIERLOOSE]})(?:\\.(${b[T.XRANGEIDENTIFIERLOOSE]})(?:${b[T.PRERELEASELOOSE]})?${b[T.BUILD]}?)?)?`,
  );
  w("XRANGE", `^${b[T.GTLT]}\\s*${b[T.XRANGEPLAIN]}$`);
  w("XRANGELOOSE", `^${b[T.GTLT]}\\s*${b[T.XRANGEPLAINLOOSE]}$`);
  w(
    "COERCEPLAIN",
    `(^|[^\\d])(\\d{1,${_e}})(?:\\.(\\d{1,${_e}}))?(?:\\.(\\d{1,${_e}}))?`,
  );
  w("COERCE", `${b[T.COERCEPLAIN]}(?:$|[^\\d])`);
  w(
    "COERCEFULL",
    b[T.COERCEPLAIN] + `(?:${b[T.PRERELEASE]})?(?:${b[T.BUILD]})?(?:$|[^\\d])`,
  );
  w("COERCERTL", b[T.COERCE], !0);
  w("COERCERTLFULL", b[T.COERCEFULL], !0);
  w("LONETILDE", "(?:~>?)");
  w("TILDETRIM", `(\\s*)${b[T.LONETILDE]}\\s+`, !0);
  q.tildeTrimReplace = "$1~";
  w("TILDE", `^${b[T.LONETILDE]}${b[T.XRANGEPLAIN]}$`);
  w("TILDELOOSE", `^${b[T.LONETILDE]}${b[T.XRANGEPLAINLOOSE]}$`);
  w("LONECARET", "(?:\\^)");
  w("CARETTRIM", `(\\s*)${b[T.LONECARET]}\\s+`, !0);
  q.caretTrimReplace = "$1^";
  w("CARET", `^${b[T.LONECARET]}${b[T.XRANGEPLAIN]}$`);
  w("CARETLOOSE", `^${b[T.LONECARET]}${b[T.XRANGEPLAINLOOSE]}$`);
  w("COMPARATORLOOSE", `^${b[T.GTLT]}\\s*(${b[T.LOOSEPLAIN]})$|^$`);
  w("COMPARATOR", `^${b[T.GTLT]}\\s*(${b[T.FULLPLAIN]})$|^$`);
  w(
    "COMPARATORTRIM",
    `(\\s*)${b[T.GTLT]}\\s*(${b[T.LOOSEPLAIN]}|${b[T.XRANGEPLAIN]})`,
    !0,
  );
  q.comparatorTrimReplace = "$1$2$3";
  w(
    "HYPHENRANGE",
    `^\\s*(${b[T.XRANGEPLAIN]})\\s+-\\s+(${b[T.XRANGEPLAIN]})\\s*$`,
  );
  w(
    "HYPHENRANGELOOSE",
    `^\\s*(${b[T.XRANGEPLAINLOOSE]})\\s+-\\s+(${b[T.XRANGEPLAINLOOSE]})\\s*$`,
  );
  w("STAR", "(<|>)?=?\\s*\\*");
  w("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$");
  w("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
});
var we = E((Jo, St) => {
  "use strict";
  var sn = Object.freeze({ loose: !0 }),
    nn = Object.freeze({}),
    rn = (s) => (s ? (typeof s != "object" ? sn : s) : nn);
  St.exports = rn;
});
var We = E((Qo, $t) => {
  "use strict";
  var Lt = /^[0-9]+$/,
    At = (s, t) => {
      if (typeof s == "number" && typeof t == "number")
        return s === t ? 0 : s < t ? -1 : 1;
      let e = Lt.test(s),
        i = Lt.test(t);
      return (
        e && i && ((s = +s), (t = +t)),
        s === t ? 0 : e && !i ? -1 : i && !e ? 1 : s < t ? -1 : 1
      );
    },
    on = (s, t) => At(t, s);
  $t.exports = { compareIdentifiers: At, rcompareIdentifiers: on };
});
var x = E((ea, kt) => {
  "use strict";
  var Re = se(),
    { MAX_LENGTH: It, MAX_SAFE_INTEGER: ye } = ie(),
    { safeRe: Se, t: Le } = Q(),
    an = we(),
    { compareIdentifiers: Ke } = We(),
    Ye = class s {
      constructor(t, e) {
        if (((e = an(e)), t instanceof s)) {
          if (
            t.loose === !!e.loose &&
            t.includePrerelease === !!e.includePrerelease
          )
            return t;
          t = t.version;
        } else if (typeof t != "string")
          throw new TypeError(
            `Invalid version. Must be a string. Got type "${typeof t}".`,
          );
        if (t.length > It)
          throw new TypeError(`version is longer than ${It} characters`);
        (Re("SemVer", t, e),
          (this.options = e),
          (this.loose = !!e.loose),
          (this.includePrerelease = !!e.includePrerelease));
        let i = t.trim().match(e.loose ? Se[Le.LOOSE] : Se[Le.FULL]);
        if (!i) throw new TypeError(`Invalid Version: ${t}`);
        if (
          ((this.raw = t),
          (this.major = +i[1]),
          (this.minor = +i[2]),
          (this.patch = +i[3]),
          this.major > ye || this.major < 0)
        )
          throw new TypeError("Invalid major version");
        if (this.minor > ye || this.minor < 0)
          throw new TypeError("Invalid minor version");
        if (this.patch > ye || this.patch < 0)
          throw new TypeError("Invalid patch version");
        (i[4]
          ? (this.prerelease = i[4].split(".").map((n) => {
              if (/^[0-9]+$/.test(n)) {
                let r = +n;
                if (r >= 0 && r < ye) return r;
              }
              return n;
            }))
          : (this.prerelease = []),
          (this.build = i[5] ? i[5].split(".") : []),
          this.format());
      }
      format() {
        return (
          (this.version = `${this.major}.${this.minor}.${this.patch}`),
          this.prerelease.length &&
            (this.version += `-${this.prerelease.join(".")}`),
          this.version
        );
      }
      toString() {
        return this.version;
      }
      compare(t) {
        if (
          (Re("SemVer.compare", this.version, this.options, t),
          !(t instanceof s))
        ) {
          if (typeof t == "string" && t === this.version) return 0;
          t = new s(t, this.options);
        }
        return t.version === this.version
          ? 0
          : this.compareMain(t) || this.comparePre(t);
      }
      compareMain(t) {
        return (
          t instanceof s || (t = new s(t, this.options)),
          this.major < t.major
            ? -1
            : this.major > t.major
              ? 1
              : this.minor < t.minor
                ? -1
                : this.minor > t.minor
                  ? 1
                  : this.patch < t.patch
                    ? -1
                    : this.patch > t.patch
                      ? 1
                      : 0
        );
      }
      comparePre(t) {
        if (
          (t instanceof s || (t = new s(t, this.options)),
          this.prerelease.length && !t.prerelease.length)
        )
          return -1;
        if (!this.prerelease.length && t.prerelease.length) return 1;
        if (!this.prerelease.length && !t.prerelease.length) return 0;
        let e = 0;
        do {
          let i = this.prerelease[e],
            n = t.prerelease[e];
          if ((Re("prerelease compare", e, i, n), i === void 0 && n === void 0))
            return 0;
          if (n === void 0) return 1;
          if (i === void 0) return -1;
          if (i === n) continue;
          return Ke(i, n);
        } while (++e);
      }
      compareBuild(t) {
        t instanceof s || (t = new s(t, this.options));
        let e = 0;
        do {
          let i = this.build[e],
            n = t.build[e];
          if ((Re("build compare", e, i, n), i === void 0 && n === void 0))
            return 0;
          if (n === void 0) return 1;
          if (i === void 0) return -1;
          if (i === n) continue;
          return Ke(i, n);
        } while (++e);
      }
      inc(t, e, i) {
        if (t.startsWith("pre")) {
          if (!e && i === !1)
            throw new Error("invalid increment argument: identifier is empty");
          if (e) {
            let n = `-${e}`.match(
              this.options.loose ? Se[Le.PRERELEASELOOSE] : Se[Le.PRERELEASE],
            );
            if (!n || n[1] !== e) throw new Error(`invalid identifier: ${e}`);
          }
        }
        switch (t) {
          case "premajor":
            ((this.prerelease.length = 0),
              (this.patch = 0),
              (this.minor = 0),
              this.major++,
              this.inc("pre", e, i));
            break;
          case "preminor":
            ((this.prerelease.length = 0),
              (this.patch = 0),
              this.minor++,
              this.inc("pre", e, i));
            break;
          case "prepatch":
            ((this.prerelease.length = 0),
              this.inc("patch", e, i),
              this.inc("pre", e, i));
            break;
          case "prerelease":
            (this.prerelease.length === 0 && this.inc("patch", e, i),
              this.inc("pre", e, i));
            break;
          case "release":
            if (this.prerelease.length === 0)
              throw new Error(`version ${this.raw} is not a prerelease`);
            this.prerelease.length = 0;
            break;
          case "major":
            ((this.minor !== 0 ||
              this.patch !== 0 ||
              this.prerelease.length === 0) &&
              this.major++,
              (this.minor = 0),
              (this.patch = 0),
              (this.prerelease = []));
            break;
          case "minor":
            ((this.patch !== 0 || this.prerelease.length === 0) && this.minor++,
              (this.patch = 0),
              (this.prerelease = []));
            break;
          case "patch":
            (this.prerelease.length === 0 && this.patch++,
              (this.prerelease = []));
            break;
          case "pre": {
            let n = Number(i) ? 1 : 0;
            if (this.prerelease.length === 0) this.prerelease = [n];
            else {
              let r = this.prerelease.length;
              for (; --r >= 0; )
                typeof this.prerelease[r] == "number" &&
                  (this.prerelease[r]++, (r = -2));
              if (r === -1) {
                if (e === this.prerelease.join(".") && i === !1)
                  throw new Error(
                    "invalid increment argument: identifier already exists",
                  );
                this.prerelease.push(n);
              }
            }
            if (e) {
              let r = [e, n];
              (i === !1 && (r = [e]),
                Ke(this.prerelease[0], e) === 0
                  ? isNaN(this.prerelease[1]) && (this.prerelease = r)
                  : (this.prerelease = r));
            }
            break;
          }
          default:
            throw new Error(`invalid increment argument: ${t}`);
        }
        return (
          (this.raw = this.format()),
          this.build.length && (this.raw += `+${this.build.join(".")}`),
          this
        );
      }
    };
  kt.exports = Ye;
});
var X = E((ta, Bt) => {
  "use strict";
  var xt = x(),
    ln = (s, t, e = !1) => {
      if (s instanceof xt) return s;
      try {
        return new xt(s, t);
      } catch (i) {
        if (!e) return null;
        throw i;
      }
    };
  Bt.exports = ln;
});
var Dt = E((ia, Ct) => {
  "use strict";
  var un = X(),
    cn = (s, t) => {
      let e = un(s, t);
      return e ? e.version : null;
    };
  Ct.exports = cn;
});
var Vt = E((sa, Nt) => {
  "use strict";
  var gn = X(),
    dn = (s, t) => {
      let e = gn(s.trim().replace(/^[=v]+/, ""), t);
      return e ? e.version : null;
    };
  Nt.exports = dn;
});
var Ft = E((na, Mt) => {
  "use strict";
  var Ot = x(),
    pn = (s, t, e, i, n) => {
      typeof e == "string" && ((n = i), (i = e), (e = void 0));
      try {
        return new Ot(s instanceof Ot ? s.version : s, e).inc(t, i, n).version;
      } catch (r) {
        return null;
      }
    };
  Mt.exports = pn;
});
var qt = E((ra, Ut) => {
  "use strict";
  var Gt = X(),
    mn = (s, t) => {
      let e = Gt(s, null, !0),
        i = Gt(t, null, !0),
        n = e.compare(i);
      if (n === 0) return null;
      let r = n > 0,
        o = r ? e : i,
        a = r ? i : e,
        l = !!o.prerelease.length;
      if (!!a.prerelease.length && !l) {
        if (!a.patch && !a.minor) return "major";
        if (a.compareMain(o) === 0)
          return a.minor && !a.patch ? "minor" : "patch";
      }
      let p = l ? "pre" : "";
      return e.major !== i.major
        ? p + "major"
        : e.minor !== i.minor
          ? p + "minor"
          : e.patch !== i.patch
            ? p + "patch"
            : "prerelease";
    };
  Ut.exports = mn;
});
var jt = E((oa, Ht) => {
  "use strict";
  var hn = x(),
    fn = (s, t) => new hn(s, t).major;
  Ht.exports = fn;
});
var _t = E((aa, zt) => {
  "use strict";
  var bn = x(),
    Tn = (s, t) => new bn(s, t).minor;
  zt.exports = Tn;
});
var Wt = E((la, Xt) => {
  "use strict";
  var vn = x(),
    Pn = (s, t) => new vn(s, t).patch;
  Xt.exports = Pn;
});
var Yt = E((ua, Kt) => {
  "use strict";
  var En = X(),
    wn = (s, t) => {
      let e = En(s, t);
      return e && e.prerelease.length ? e.prerelease : null;
    };
  Kt.exports = wn;
});
var M = E((ca, Jt) => {
  "use strict";
  var Zt = x(),
    Rn = (s, t, e) => new Zt(s, e).compare(new Zt(t, e));
  Jt.exports = Rn;
});
var ei = E((ga, Qt) => {
  "use strict";
  var yn = M(),
    Sn = (s, t, e) => yn(t, s, e);
  Qt.exports = Sn;
});
var ii = E((da, ti) => {
  "use strict";
  var Ln = M(),
    An = (s, t) => Ln(s, t, !0);
  ti.exports = An;
});
var Ae = E((pa, ni) => {
  "use strict";
  var si = x(),
    $n = (s, t, e) => {
      let i = new si(s, e),
        n = new si(t, e);
      return i.compare(n) || i.compareBuild(n);
    };
  ni.exports = $n;
});
var oi = E((ma, ri) => {
  "use strict";
  var In = Ae(),
    kn = (s, t) => s.sort((e, i) => In(e, i, t));
  ri.exports = kn;
});
var li = E((ha, ai) => {
  "use strict";
  var xn = Ae(),
    Bn = (s, t) => s.sort((e, i) => xn(i, e, t));
  ai.exports = Bn;
});
var ne = E((fa, ui) => {
  "use strict";
  var Cn = M(),
    Dn = (s, t, e) => Cn(s, t, e) > 0;
  ui.exports = Dn;
});
var $e = E((ba, ci) => {
  "use strict";
  var Nn = M(),
    Vn = (s, t, e) => Nn(s, t, e) < 0;
  ci.exports = Vn;
});
var Ze = E((Ta, gi) => {
  "use strict";
  var On = M(),
    Mn = (s, t, e) => On(s, t, e) === 0;
  gi.exports = Mn;
});
var Je = E((va, di) => {
  "use strict";
  var Fn = M(),
    Gn = (s, t, e) => Fn(s, t, e) !== 0;
  di.exports = Gn;
});
var Ie = E((Pa, pi) => {
  "use strict";
  var Un = M(),
    qn = (s, t, e) => Un(s, t, e) >= 0;
  pi.exports = qn;
});
var ke = E((Ea, mi) => {
  "use strict";
  var Hn = M(),
    jn = (s, t, e) => Hn(s, t, e) <= 0;
  mi.exports = jn;
});
var Qe = E((wa, hi) => {
  "use strict";
  var zn = Ze(),
    _n = Je(),
    Xn = ne(),
    Wn = Ie(),
    Kn = $e(),
    Yn = ke(),
    Zn = (s, t, e, i) => {
      switch (t) {
        case "===":
          return (
            typeof s == "object" && (s = s.version),
            typeof e == "object" && (e = e.version),
            s === e
          );
        case "!==":
          return (
            typeof s == "object" && (s = s.version),
            typeof e == "object" && (e = e.version),
            s !== e
          );
        case "":
        case "=":
        case "==":
          return zn(s, e, i);
        case "!=":
          return _n(s, e, i);
        case ">":
          return Xn(s, e, i);
        case ">=":
          return Wn(s, e, i);
        case "<":
          return Kn(s, e, i);
        case "<=":
          return Yn(s, e, i);
        default:
          throw new TypeError(`Invalid operator: ${t}`);
      }
    };
  hi.exports = Zn;
});
var bi = E((Ra, fi) => {
  "use strict";
  var Jn = x(),
    Qn = X(),
    { safeRe: xe, t: Be } = Q(),
    er = (s, t) => {
      if (s instanceof Jn) return s;
      if ((typeof s == "number" && (s = String(s)), typeof s != "string"))
        return null;
      t = t || {};
      let e = null;
      if (!t.rtl)
        e = s.match(t.includePrerelease ? xe[Be.COERCEFULL] : xe[Be.COERCE]);
      else {
        let l = t.includePrerelease ? xe[Be.COERCERTLFULL] : xe[Be.COERCERTL],
          c;
        for (; (c = l.exec(s)) && (!e || e.index + e[0].length !== s.length); )
          ((!e || c.index + c[0].length !== e.index + e[0].length) && (e = c),
            (l.lastIndex = c.index + c[1].length + c[2].length));
        l.lastIndex = -1;
      }
      if (e === null) return null;
      let i = e[2],
        n = e[3] || "0",
        r = e[4] || "0",
        o = t.includePrerelease && e[5] ? `-${e[5]}` : "",
        a = t.includePrerelease && e[6] ? `+${e[6]}` : "";
      return Qn(`${i}.${n}.${r}${o}${a}`, t);
    };
  fi.exports = er;
});
var vi = E((ya, Ti) => {
  "use strict";
  var et = class {
    constructor() {
      ((this.max = 1e3), (this.map = new Map()));
    }
    get(t) {
      let e = this.map.get(t);
      if (e !== void 0) return (this.map.delete(t), this.map.set(t, e), e);
    }
    delete(t) {
      return this.map.delete(t);
    }
    set(t, e) {
      if (!this.delete(t) && e !== void 0) {
        if (this.map.size >= this.max) {
          let n = this.map.keys().next().value;
          this.delete(n);
        }
        this.map.set(t, e);
      }
      return this;
    }
  };
  Ti.exports = et;
});
var F = E((Sa, Ri) => {
  "use strict";
  var tr = /\s+/g,
    tt = class s {
      constructor(t, e) {
        if (((e = sr(e)), t instanceof s))
          return t.loose === !!e.loose &&
            t.includePrerelease === !!e.includePrerelease
            ? t
            : new s(t.raw, e);
        if (t instanceof it)
          return (
            (this.raw = t.value),
            (this.set = [[t]]),
            (this.formatted = void 0),
            this
          );
        if (
          ((this.options = e),
          (this.loose = !!e.loose),
          (this.includePrerelease = !!e.includePrerelease),
          (this.raw = t.trim().replace(tr, " ")),
          (this.set = this.raw
            .split("||")
            .map((i) => this.parseRange(i.trim()))
            .filter((i) => i.length)),
          !this.set.length)
        )
          throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
        if (this.set.length > 1) {
          let i = this.set[0];
          if (
            ((this.set = this.set.filter((n) => !Ei(n[0]))),
            this.set.length === 0)
          )
            this.set = [i];
          else if (this.set.length > 1) {
            for (let n of this.set)
              if (n.length === 1 && cr(n[0])) {
                this.set = [n];
                break;
              }
          }
        }
        this.formatted = void 0;
      }
      get range() {
        if (this.formatted === void 0) {
          this.formatted = "";
          for (let t = 0; t < this.set.length; t++) {
            t > 0 && (this.formatted += "||");
            let e = this.set[t];
            for (let i = 0; i < e.length; i++)
              (i > 0 && (this.formatted += " "),
                (this.formatted += e[i].toString().trim()));
          }
        }
        return this.formatted;
      }
      format() {
        return this.range;
      }
      toString() {
        return this.range;
      }
      parseRange(t) {
        let i =
            ((this.options.includePrerelease && lr) |
              (this.options.loose && ur)) +
            ":" +
            t,
          n = Pi.get(i);
        if (n) return n;
        let r = this.options.loose,
          o = r ? C[B.HYPHENRANGELOOSE] : C[B.HYPHENRANGE];
        ((t = t.replace(o, Pr(this.options.includePrerelease))),
          y("hyphen replace", t),
          (t = t.replace(C[B.COMPARATORTRIM], rr)),
          y("comparator trim", t),
          (t = t.replace(C[B.TILDETRIM], or)),
          y("tilde trim", t),
          (t = t.replace(C[B.CARETTRIM], ar)),
          y("caret trim", t));
        let a = t
          .split(" ")
          .map((d) => gr(d, this.options))
          .join(" ")
          .split(/\s+/)
          .map((d) => vr(d, this.options));
        (r &&
          (a = a.filter(
            (d) => (
              y("loose invalid filter", d, this.options),
              !!d.match(C[B.COMPARATORLOOSE])
            ),
          )),
          y("range list", a));
        let l = new Map(),
          c = a.map((d) => new it(d, this.options));
        for (let d of c) {
          if (Ei(d)) return [d];
          l.set(d.value, d);
        }
        l.size > 1 && l.has("") && l.delete("");
        let p = [...l.values()];
        return (Pi.set(i, p), p);
      }
      intersects(t, e) {
        if (!(t instanceof s)) throw new TypeError("a Range is required");
        return this.set.some(
          (i) =>
            wi(i, e) &&
            t.set.some(
              (n) =>
                wi(n, e) && i.every((r) => n.every((o) => r.intersects(o, e))),
            ),
        );
      }
      test(t) {
        if (!t) return !1;
        if (typeof t == "string")
          try {
            t = new nr(t, this.options);
          } catch (e) {
            return !1;
          }
        for (let e = 0; e < this.set.length; e++)
          if (Er(this.set[e], t, this.options)) return !0;
        return !1;
      }
    };
  Ri.exports = tt;
  var ir = vi(),
    Pi = new ir(),
    sr = we(),
    it = re(),
    y = se(),
    nr = x(),
    {
      safeRe: C,
      t: B,
      comparatorTrimReplace: rr,
      tildeTrimReplace: or,
      caretTrimReplace: ar,
    } = Q(),
    { FLAG_INCLUDE_PRERELEASE: lr, FLAG_LOOSE: ur } = ie(),
    Ei = (s) => s.value === "<0.0.0-0",
    cr = (s) => s.value === "",
    wi = (s, t) => {
      let e = !0,
        i = s.slice(),
        n = i.pop();
      for (; e && i.length; )
        ((e = i.every((r) => n.intersects(r, t))), (n = i.pop()));
      return e;
    },
    gr = (s, t) => (
      (s = s.replace(C[B.BUILD], "")),
      y("comp", s, t),
      (s = mr(s, t)),
      y("caret", s),
      (s = dr(s, t)),
      y("tildes", s),
      (s = fr(s, t)),
      y("xrange", s),
      (s = Tr(s, t)),
      y("stars", s),
      s
    ),
    D = (s) => !s || s.toLowerCase() === "x" || s === "*",
    dr = (s, t) =>
      s
        .trim()
        .split(/\s+/)
        .map((e) => pr(e, t))
        .join(" "),
    pr = (s, t) => {
      let e = t.loose ? C[B.TILDELOOSE] : C[B.TILDE];
      return s.replace(e, (i, n, r, o, a) => {
        y("tilde", s, i, n, r, o, a);
        let l;
        return (
          D(n)
            ? (l = "")
            : D(r)
              ? (l = `>=${n}.0.0 <${+n + 1}.0.0-0`)
              : D(o)
                ? (l = `>=${n}.${r}.0 <${n}.${+r + 1}.0-0`)
                : a
                  ? (y("replaceTilde pr", a),
                    (l = `>=${n}.${r}.${o}-${a} <${n}.${+r + 1}.0-0`))
                  : (l = `>=${n}.${r}.${o} <${n}.${+r + 1}.0-0`),
          y("tilde return", l),
          l
        );
      });
    },
    mr = (s, t) =>
      s
        .trim()
        .split(/\s+/)
        .map((e) => hr(e, t))
        .join(" "),
    hr = (s, t) => {
      y("caret", s, t);
      let e = t.loose ? C[B.CARETLOOSE] : C[B.CARET],
        i = t.includePrerelease ? "-0" : "";
      return s.replace(e, (n, r, o, a, l) => {
        y("caret", s, n, r, o, a, l);
        let c;
        return (
          D(r)
            ? (c = "")
            : D(o)
              ? (c = `>=${r}.0.0${i} <${+r + 1}.0.0-0`)
              : D(a)
                ? r === "0"
                  ? (c = `>=${r}.${o}.0${i} <${r}.${+o + 1}.0-0`)
                  : (c = `>=${r}.${o}.0${i} <${+r + 1}.0.0-0`)
                : l
                  ? (y("replaceCaret pr", l),
                    r === "0"
                      ? o === "0"
                        ? (c = `>=${r}.${o}.${a}-${l} <${r}.${o}.${+a + 1}-0`)
                        : (c = `>=${r}.${o}.${a}-${l} <${r}.${+o + 1}.0-0`)
                      : (c = `>=${r}.${o}.${a}-${l} <${+r + 1}.0.0-0`))
                  : (y("no pr"),
                    r === "0"
                      ? o === "0"
                        ? (c = `>=${r}.${o}.${a}${i} <${r}.${o}.${+a + 1}-0`)
                        : (c = `>=${r}.${o}.${a}${i} <${r}.${+o + 1}.0-0`)
                      : (c = `>=${r}.${o}.${a} <${+r + 1}.0.0-0`)),
          y("caret return", c),
          c
        );
      });
    },
    fr = (s, t) => (
      y("replaceXRanges", s, t),
      s
        .split(/\s+/)
        .map((e) => br(e, t))
        .join(" ")
    ),
    br = (s, t) => {
      s = s.trim();
      let e = t.loose ? C[B.XRANGELOOSE] : C[B.XRANGE];
      return s.replace(e, (i, n, r, o, a, l) => {
        y("xRange", s, i, n, r, o, a, l);
        let c = D(r),
          p = c || D(o),
          d = p || D(a),
          g = d;
        return (
          n === "=" && g && (n = ""),
          (l = t.includePrerelease ? "-0" : ""),
          c
            ? n === ">" || n === "<"
              ? (i = "<0.0.0-0")
              : (i = "*")
            : n && g
              ? (p && (o = 0),
                (a = 0),
                n === ">"
                  ? ((n = ">="),
                    p
                      ? ((r = +r + 1), (o = 0), (a = 0))
                      : ((o = +o + 1), (a = 0)))
                  : n === "<=" && ((n = "<"), p ? (r = +r + 1) : (o = +o + 1)),
                n === "<" && (l = "-0"),
                (i = `${n + r}.${o}.${a}${l}`))
              : p
                ? (i = `>=${r}.0.0${l} <${+r + 1}.0.0-0`)
                : d && (i = `>=${r}.${o}.0${l} <${r}.${+o + 1}.0-0`),
          y("xRange return", i),
          i
        );
      });
    },
    Tr = (s, t) => (y("replaceStars", s, t), s.trim().replace(C[B.STAR], "")),
    vr = (s, t) => (
      y("replaceGTE0", s, t),
      s.trim().replace(C[t.includePrerelease ? B.GTE0PRE : B.GTE0], "")
    ),
    Pr = (s) => (t, e, i, n, r, o, a, l, c, p, d, g) => (
      D(i)
        ? (e = "")
        : D(n)
          ? (e = `>=${i}.0.0${s ? "-0" : ""}`)
          : D(r)
            ? (e = `>=${i}.${n}.0${s ? "-0" : ""}`)
            : o
              ? (e = `>=${e}`)
              : (e = `>=${e}${s ? "-0" : ""}`),
      D(c)
        ? (l = "")
        : D(p)
          ? (l = `<${+c + 1}.0.0-0`)
          : D(d)
            ? (l = `<${c}.${+p + 1}.0-0`)
            : g
              ? (l = `<=${c}.${p}.${d}-${g}`)
              : s
                ? (l = `<${c}.${p}.${+d + 1}-0`)
                : (l = `<=${l}`),
      `${e} ${l}`.trim()
    ),
    Er = (s, t, e) => {
      for (let i = 0; i < s.length; i++) if (!s[i].test(t)) return !1;
      if (t.prerelease.length && !e.includePrerelease) {
        for (let i = 0; i < s.length; i++)
          if (
            (y(s[i].semver),
            s[i].semver !== it.ANY && s[i].semver.prerelease.length > 0)
          ) {
            let n = s[i].semver;
            if (
              n.major === t.major &&
              n.minor === t.minor &&
              n.patch === t.patch
            )
              return !0;
          }
        return !1;
      }
      return !0;
    };
});
var re = E((La, Ii) => {
  "use strict";
  var oe = Symbol("SemVer ANY"),
    rt = class s {
      static get ANY() {
        return oe;
      }
      constructor(t, e) {
        if (((e = yi(e)), t instanceof s)) {
          if (t.loose === !!e.loose) return t;
          t = t.value;
        }
        ((t = t.trim().split(/\s+/).join(" ")),
          nt("comparator", t, e),
          (this.options = e),
          (this.loose = !!e.loose),
          this.parse(t),
          this.semver === oe
            ? (this.value = "")
            : (this.value = this.operator + this.semver.version),
          nt("comp", this));
      }
      parse(t) {
        let e = this.options.loose ? Si[Li.COMPARATORLOOSE] : Si[Li.COMPARATOR],
          i = t.match(e);
        if (!i) throw new TypeError(`Invalid comparator: ${t}`);
        ((this.operator = i[1] !== void 0 ? i[1] : ""),
          this.operator === "=" && (this.operator = ""),
          i[2]
            ? (this.semver = new Ai(i[2], this.options.loose))
            : (this.semver = oe));
      }
      toString() {
        return this.value;
      }
      test(t) {
        if (
          (nt("Comparator.test", t, this.options.loose),
          this.semver === oe || t === oe)
        )
          return !0;
        if (typeof t == "string")
          try {
            t = new Ai(t, this.options);
          } catch (e) {
            return !1;
          }
        return st(t, this.operator, this.semver, this.options);
      }
      intersects(t, e) {
        if (!(t instanceof s)) throw new TypeError("a Comparator is required");
        return this.operator === ""
          ? this.value === ""
            ? !0
            : new $i(t.value, e).test(this.value)
          : t.operator === ""
            ? t.value === ""
              ? !0
              : new $i(this.value, e).test(t.semver)
            : ((e = yi(e)),
              (e.includePrerelease &&
                (this.value === "<0.0.0-0" || t.value === "<0.0.0-0")) ||
              (!e.includePrerelease &&
                (this.value.startsWith("<0.0.0") ||
                  t.value.startsWith("<0.0.0")))
                ? !1
                : !!(
                    (this.operator.startsWith(">") &&
                      t.operator.startsWith(">")) ||
                    (this.operator.startsWith("<") &&
                      t.operator.startsWith("<")) ||
                    (this.semver.version === t.semver.version &&
                      this.operator.includes("=") &&
                      t.operator.includes("=")) ||
                    (st(this.semver, "<", t.semver, e) &&
                      this.operator.startsWith(">") &&
                      t.operator.startsWith("<")) ||
                    (st(this.semver, ">", t.semver, e) &&
                      this.operator.startsWith("<") &&
                      t.operator.startsWith(">"))
                  ));
      }
    };
  Ii.exports = rt;
  var yi = we(),
    { safeRe: Si, t: Li } = Q(),
    st = Qe(),
    nt = se(),
    Ai = x(),
    $i = F();
});
var ae = E((Aa, ki) => {
  "use strict";
  var wr = F(),
    Rr = (s, t, e) => {
      try {
        t = new wr(t, e);
      } catch (i) {
        return !1;
      }
      return t.test(s);
    };
  ki.exports = Rr;
});
var Bi = E(($a, xi) => {
  "use strict";
  var yr = F(),
    Sr = (s, t) =>
      new yr(s, t).set.map((e) =>
        e
          .map((i) => i.value)
          .join(" ")
          .trim()
          .split(" "),
      );
  xi.exports = Sr;
});
var Di = E((Ia, Ci) => {
  "use strict";
  var Lr = x(),
    Ar = F(),
    $r = (s, t, e) => {
      let i = null,
        n = null,
        r = null;
      try {
        r = new Ar(t, e);
      } catch (o) {
        return null;
      }
      return (
        s.forEach((o) => {
          r.test(o) &&
            (!i || n.compare(o) === -1) &&
            ((i = o), (n = new Lr(i, e)));
        }),
        i
      );
    };
  Ci.exports = $r;
});
var Vi = E((ka, Ni) => {
  "use strict";
  var Ir = x(),
    kr = F(),
    xr = (s, t, e) => {
      let i = null,
        n = null,
        r = null;
      try {
        r = new kr(t, e);
      } catch (o) {
        return null;
      }
      return (
        s.forEach((o) => {
          r.test(o) &&
            (!i || n.compare(o) === 1) &&
            ((i = o), (n = new Ir(i, e)));
        }),
        i
      );
    };
  Ni.exports = xr;
});
var Fi = E((xa, Mi) => {
  "use strict";
  var ot = x(),
    Br = F(),
    Oi = ne(),
    Cr = (s, t) => {
      s = new Br(s, t);
      let e = new ot("0.0.0");
      if (s.test(e) || ((e = new ot("0.0.0-0")), s.test(e))) return e;
      e = null;
      for (let i = 0; i < s.set.length; ++i) {
        let n = s.set[i],
          r = null;
        (n.forEach((o) => {
          let a = new ot(o.semver.version);
          switch (o.operator) {
            case ">":
              (a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0),
                (a.raw = a.format()));
            case "":
            case ">=":
              (!r || Oi(a, r)) && (r = a);
              break;
            case "<":
            case "<=":
              break;
            default:
              throw new Error(`Unexpected operation: ${o.operator}`);
          }
        }),
          r && (!e || Oi(e, r)) && (e = r));
      }
      return e && s.test(e) ? e : null;
    };
  Mi.exports = Cr;
});
var Ui = E((Ba, Gi) => {
  "use strict";
  var Dr = F(),
    Nr = (s, t) => {
      try {
        return new Dr(s, t).range || "*";
      } catch (e) {
        return null;
      }
    };
  Gi.exports = Nr;
});
var Ce = E((Ca, zi) => {
  "use strict";
  var Vr = x(),
    ji = re(),
    { ANY: Or } = ji,
    Mr = F(),
    Fr = ae(),
    qi = ne(),
    Hi = $e(),
    Gr = ke(),
    Ur = Ie(),
    qr = (s, t, e, i) => {
      ((s = new Vr(s, i)), (t = new Mr(t, i)));
      let n, r, o, a, l;
      switch (e) {
        case ">":
          ((n = qi), (r = Gr), (o = Hi), (a = ">"), (l = ">="));
          break;
        case "<":
          ((n = Hi), (r = Ur), (o = qi), (a = "<"), (l = "<="));
          break;
        default:
          throw new TypeError('Must provide a hilo val of "<" or ">"');
      }
      if (Fr(s, t, i)) return !1;
      for (let c = 0; c < t.set.length; ++c) {
        let p = t.set[c],
          d = null,
          g = null;
        if (
          (p.forEach((u) => {
            (u.semver === Or && (u = new ji(">=0.0.0")),
              (d = d || u),
              (g = g || u),
              n(u.semver, d.semver, i)
                ? (d = u)
                : o(u.semver, g.semver, i) && (g = u));
          }),
          d.operator === a ||
            d.operator === l ||
            ((!g.operator || g.operator === a) && r(s, g.semver)))
        )
          return !1;
        if (g.operator === l && o(s, g.semver)) return !1;
      }
      return !0;
    };
  zi.exports = qr;
});
var Xi = E((Da, _i) => {
  "use strict";
  var Hr = Ce(),
    jr = (s, t, e) => Hr(s, t, ">", e);
  _i.exports = jr;
});
var Ki = E((Na, Wi) => {
  "use strict";
  var zr = Ce(),
    _r = (s, t, e) => zr(s, t, "<", e);
  Wi.exports = _r;
});
var Ji = E((Va, Zi) => {
  "use strict";
  var Yi = F(),
    Xr = (s, t, e) => (
      (s = new Yi(s, e)),
      (t = new Yi(t, e)),
      s.intersects(t, e)
    );
  Zi.exports = Xr;
});
var es = E((Oa, Qi) => {
  "use strict";
  var Wr = ae(),
    Kr = M();
  Qi.exports = (s, t, e) => {
    let i = [],
      n = null,
      r = null,
      o = s.sort((p, d) => Kr(p, d, e));
    for (let p of o)
      Wr(p, t, e)
        ? ((r = p), n || (n = p))
        : (r && i.push([n, r]), (r = null), (n = null));
    n && i.push([n, null]);
    let a = [];
    for (let [p, d] of i)
      p === d
        ? a.push(p)
        : !d && p === o[0]
          ? a.push("*")
          : d
            ? p === o[0]
              ? a.push(`<=${d}`)
              : a.push(`${p} - ${d}`)
            : a.push(`>=${p}`);
    let l = a.join(" || "),
      c = typeof t.raw == "string" ? t.raw : String(t);
    return l.length < c.length ? l : t;
  };
});
var os = E((Ma, rs) => {
  "use strict";
  var ts = F(),
    lt = re(),
    { ANY: at } = lt,
    le = ae(),
    ut = M(),
    Yr = (s, t, e = {}) => {
      if (s === t) return !0;
      ((s = new ts(s, e)), (t = new ts(t, e)));
      let i = !1;
      e: for (let n of s.set) {
        for (let r of t.set) {
          let o = Jr(n, r, e);
          if (((i = i || o !== null), o)) continue e;
        }
        if (i) return !1;
      }
      return !0;
    },
    Zr = [new lt(">=0.0.0-0")],
    is = [new lt(">=0.0.0")],
    Jr = (s, t, e) => {
      if (s === t) return !0;
      if (s.length === 1 && s[0].semver === at) {
        if (t.length === 1 && t[0].semver === at) return !0;
        e.includePrerelease ? (s = Zr) : (s = is);
      }
      if (t.length === 1 && t[0].semver === at) {
        if (e.includePrerelease) return !0;
        t = is;
      }
      let i = new Set(),
        n,
        r;
      for (let u of s)
        u.operator === ">" || u.operator === ">="
          ? (n = ss(n, u, e))
          : u.operator === "<" || u.operator === "<="
            ? (r = ns(r, u, e))
            : i.add(u.semver);
      if (i.size > 1) return null;
      let o;
      if (n && r) {
        if (((o = ut(n.semver, r.semver, e)), o > 0)) return null;
        if (o === 0 && (n.operator !== ">=" || r.operator !== "<="))
          return null;
      }
      for (let u of i) {
        if ((n && !le(u, String(n), e)) || (r && !le(u, String(r), e)))
          return null;
        for (let m of t) if (!le(u, String(m), e)) return !1;
        return !0;
      }
      let a,
        l,
        c,
        p,
        d =
          r && !e.includePrerelease && r.semver.prerelease.length
            ? r.semver
            : !1,
        g =
          n && !e.includePrerelease && n.semver.prerelease.length
            ? n.semver
            : !1;
      d &&
        d.prerelease.length === 1 &&
        r.operator === "<" &&
        d.prerelease[0] === 0 &&
        (d = !1);
      for (let u of t) {
        if (
          ((p = p || u.operator === ">" || u.operator === ">="),
          (c = c || u.operator === "<" || u.operator === "<="),
          n)
        ) {
          if (
            (g &&
              u.semver.prerelease &&
              u.semver.prerelease.length &&
              u.semver.major === g.major &&
              u.semver.minor === g.minor &&
              u.semver.patch === g.patch &&
              (g = !1),
            u.operator === ">" || u.operator === ">=")
          ) {
            if (((a = ss(n, u, e)), a === u && a !== n)) return !1;
          } else if (n.operator === ">=" && !le(n.semver, String(u), e))
            return !1;
        }
        if (r) {
          if (
            (d &&
              u.semver.prerelease &&
              u.semver.prerelease.length &&
              u.semver.major === d.major &&
              u.semver.minor === d.minor &&
              u.semver.patch === d.patch &&
              (d = !1),
            u.operator === "<" || u.operator === "<=")
          ) {
            if (((l = ns(r, u, e)), l === u && l !== r)) return !1;
          } else if (r.operator === "<=" && !le(r.semver, String(u), e))
            return !1;
        }
        if (!u.operator && (r || n) && o !== 0) return !1;
      }
      return !(
        (n && c && !r && o !== 0) ||
        (r && p && !n && o !== 0) ||
        g ||
        d
      );
    },
    ss = (s, t, e) => {
      if (!s) return t;
      let i = ut(s.semver, t.semver, e);
      return i > 0
        ? s
        : i < 0 || (t.operator === ">" && s.operator === ">=")
          ? t
          : s;
    },
    ns = (s, t, e) => {
      if (!s) return t;
      let i = ut(s.semver, t.semver, e);
      return i < 0
        ? s
        : i > 0 || (t.operator === "<" && s.operator === "<=")
          ? t
          : s;
    };
  rs.exports = Yr;
});
var gt = E((Fa, us) => {
  "use strict";
  var ct = Q(),
    as = ie(),
    Qr = x(),
    ls = We(),
    eo = X(),
    to = Dt(),
    io = Vt(),
    so = Ft(),
    no = qt(),
    ro = jt(),
    oo = _t(),
    ao = Wt(),
    lo = Yt(),
    uo = M(),
    co = ei(),
    go = ii(),
    po = Ae(),
    mo = oi(),
    ho = li(),
    fo = ne(),
    bo = $e(),
    To = Ze(),
    vo = Je(),
    Po = Ie(),
    Eo = ke(),
    wo = Qe(),
    Ro = bi(),
    yo = re(),
    So = F(),
    Lo = ae(),
    Ao = Bi(),
    $o = Di(),
    Io = Vi(),
    ko = Fi(),
    xo = Ui(),
    Bo = Ce(),
    Co = Xi(),
    Do = Ki(),
    No = Ji(),
    Vo = es(),
    Oo = os();
  us.exports = {
    parse: eo,
    valid: to,
    clean: io,
    inc: so,
    diff: no,
    major: ro,
    minor: oo,
    patch: ao,
    prerelease: lo,
    compare: uo,
    rcompare: co,
    compareLoose: go,
    compareBuild: po,
    sort: mo,
    rsort: ho,
    gt: fo,
    lt: bo,
    eq: To,
    neq: vo,
    gte: Po,
    lte: Eo,
    cmp: wo,
    coerce: Ro,
    Comparator: yo,
    Range: So,
    satisfies: Lo,
    toComparators: Ao,
    maxSatisfying: $o,
    minSatisfying: Io,
    minVersion: ko,
    validRange: xo,
    outside: Bo,
    gtr: Co,
    ltr: Do,
    intersects: No,
    simplifyRange: Vo,
    subset: Oo,
    SemVer: Qr,
    re: ct.re,
    src: ct.src,
    tokens: ct.t,
    SEMVER_SPEC_VERSION: as.SEMVER_SPEC_VERSION,
    RELEASE_TYPES: as.RELEASE_TYPES,
    compareIdentifiers: ls.compareIdentifiers,
    rcompareIdentifiers: ls.rcompareIdentifiers,
  };
});
var Wo = {};
Fs(Wo, { default: () => ze });
module.exports = Gs(Wo);
var Cs = require("obsidian");
var O = require("obsidian"),
  U = Et(gt());
var ue = require("obsidian"),
  dt = class extends ue.Modal {
    constructor(e, i) {
      super(e.app);
      this.resolve = i;
      this.isConfirmed = !1;
      let n = {
        app: e.app,
        cancelButtonText: "Cancel",
        cssClass: "",
        message: e.message,
        okButtonText: "OK",
        title: "",
      };
      ((this.options = { ...n, ...e }),
        this.containerEl.addClass("confirm-modal"));
    }
    onClose() {
      (super.onClose(), this.resolve(this.isConfirmed));
    }
    onOpen() {
      (super.onOpen(),
        this.titleEl.setText(this.options.title),
        this.contentEl.createEl("p", { text: this.options.message }));
      let e = new ue.ButtonComponent(this.contentEl);
      (e.setClass("ok-button"),
        e.setButtonText(this.options.okButtonText),
        e.setCta(),
        e.onClick(() => {
          ((this.isConfirmed = !0), this.close());
        }));
      let i = new ue.ButtonComponent(this.contentEl);
      (i.setButtonText(this.options.cancelButtonText),
        i.onClick(() => {
          this.close();
        }));
    }
  };
async function pt(s) {
  return await new Promise((t) => {
    new dt(s, t).open();
  });
}
var G = class extends Error {
    constructor(e, i, n, r) {
      let o = Math.ceil((n - Math.floor(Date.now() / 1e3)) / 60);
      super(`GitHub API rate limit exceeded. Reset in ${o} minutes.`);
      this.limit = e;
      this.remaining = i;
      this.reset = n;
      this.requestUrl = r;
    }
    getMinutesToReset() {
      return Math.ceil((this.reset - Math.floor(Date.now() / 1e3)) / 60);
    }
  },
  H = class extends Error {
    constructor(t) {
      var i, n;
      (super(`GitHub API error ${t}: ${t.message}`),
        (this.message = t.message));
      let e = t;
      ((this.status = (i = e.status) != null ? i : 400),
        (this.headers = (n = e.headers) != null ? n : {}),
        (this.name = "GitHubResponseError"));
    }
  };
var _ = require("obsidian"),
  ce = Et(gt());
var De = (s) => {
    let t = s.replace(/https?:\/\/github\.com\//i, "");
    return (
      t.endsWith("/") && (t = t.slice(0, -1)),
      t.toLowerCase().endsWith(".git") && (t = t.slice(0, -4)),
      t
    );
  },
  cs = ["ghp_", "github_pat_"],
  Mo = /^(gh[ps]_[a-zA-Z0-9]{36}|github_pat_[a-zA-Z0-9]{22}_[a-zA-Z0-9]{59})$/,
  gs = (s) =>
    Object.keys(s).reduce((t, e) => ((t[e.toLowerCase()] = s[e]), t), {}),
  Ne = async (s, t) => {
    var r, o, a, l, c, p, d, g, u, m, h;
    let e = ["repo", "public_repo", "metadata=read"],
      i = cs.some((f) => s.toLowerCase().startsWith(f.toLowerCase())),
      n = Mo.test(s);
    if (!i || !n)
      return {
        validToken: !1,
        currentScopes: [],
        acceptedScopes: [],
        acceptedPermissions: [],
        expirationDate: null,
        rateLimit: { limit: 0, remaining: 0, reset: 0, resource: "", used: 0 },
        error: {
          type: i ? "invalid_format" : "invalid_prefix",
          message: "无效的令牌格式",
          details: { validPrefixes: cs },
        },
      };
    try {
      let f = Date.now() % 1e3,
        P = t || `user${f}/repo${f % 100}`;
      if (
        (await Oe({
          url: `https://api.github.com/repos/${P}`,
          headers: {
            Authorization: `Token ${s}`,
            Accept: "application/vnd.github.v3+json",
          },
        }),
        t)
      )
        return {
          validToken: !0,
          currentScopes: [],
          acceptedScopes: [],
          acceptedPermissions: [],
          expirationDate: null,
          rateLimit: {
            limit: 0,
            remaining: 0,
            reset: 0,
            resource: "",
            used: 0,
          },
          error: { type: "none", message: "无错误", details: {} },
        };
      throw new Error("Expected request to fail");
    } catch (f) {
      if (!(f instanceof H)) throw f;
      let P = gs(f.headers);
      if (!P) throw new Error("No headers in GitHub response");
      let L = P["github-authentication-token-expiration"],
        A = L ? new Date(L) : null,
        I = A && !Number.isNaN(A.getTime()) ? A.toISOString() : null,
        S = {
          validToken: !1,
          currentScopes:
            (o = (r = P["x-oauth-scopes"]) == null ? void 0 : r.split(", ")) !=
            null
              ? o
              : [],
          acceptedScopes:
            (l =
              (a = P["x-accepted-oauth-scopes"]) == null
                ? void 0
                : a.split(", ")) != null
              ? l
              : [],
          acceptedPermissions:
            (p =
              (c = P["x-accepted-github-permissions"]) == null
                ? void 0
                : c.split(", ")) != null
              ? p
              : [],
          expirationDate: I,
          rateLimit: {
            limit: Number.parseInt(
              (d = P["x-ratelimit-limit"]) != null ? d : "0",
              10,
            ),
            remaining: Number.parseInt(
              (g = P["x-ratelimit-remaining"]) != null ? g : "0",
              10,
            ),
            reset: Number.parseInt(
              (u = P["x-ratelimit-reset"]) != null ? u : "0",
              10,
            ),
            resource: (m = P["x-ratelimit-resource"]) != null ? m : "",
            used: Number.parseInt(
              (h = P["x-ratelimit-used"]) != null ? h : "0",
              10,
            ),
          },
          error: { type: "none", message: "无错误", details: {} },
        };
      return S.expirationDate && new Date(S.expirationDate) < new Date()
        ? ((S.error = {
            type: "expired",
            message: "令牌已过期",
            details: { expirationDate: S.expirationDate },
          }),
          S)
        : S.currentScopes.some((z) => e.includes(z)) ||
            S.acceptedPermissions.some((z) => e.includes(z))
          ? ((S.validToken = f.status === 404), S)
          : ((S.error = {
              type: "insufficient_scope",
              message: "令牌缺少所需作用域。请参阅文档",
              details: {
                currentScopes: [...S.acceptedScopes, ...S.acceptedPermissions],
              },
            }),
            S);
    }
  },
  mt = async (s, t = !0, e = "") => {
    let i = `https://api.github.com/repos/${s}`;
    try {
      let r = (
        await Oe({ url: i, headers: e ? { Authorization: `Token ${e}` } : {} })
      ).json;
      return typeof r == "object" && r !== null && "private" in r
        ? !!r.private
        : !1;
    } catch (n) {
      if (n instanceof G) throw n;
      return (t && console.error("isPrivateRepo 错误", i, n), !1);
    }
  },
  ds = async (s, t = !0, e = "") => {
    let i = `https://api.github.com/repos/${s}/releases`;
    try {
      let r = (
        await Oe({
          url: `${i}?per_page=100`,
          headers: e ? { Authorization: `Token ${e}` } : {},
        })
      ).json;
      return Array.isArray(r)
        ? r.map((o) => ({ version: o.tag_name, prerelease: o.prerelease }))
        : null;
    } catch (n) {
      if (n instanceof G || n instanceof H) throw n;
      return (t && console.error("fetchReleaseVersions 错误", i, n), null);
    }
  },
  ge = async (s, t, e = !0, i = !1, n = "") => {
    try {
      let r = s.assets.find((c) => c.name === t);
      if (!r) return null;
      let o = { Accept: "application/octet-stream" };
      i && n && (o.Authorization = `Token ${n}`);
      let a = i ? r.url : r.browser_download_url,
        l = await (0, _.requestUrl)({ url: a, headers: o });
      return l.status !== 200 ? null : l.text;
    } catch (r) {
      if (r instanceof G) throw r;
      return (
        e && console.error("grabReleaseFileFromRepository 错误", s, r),
        null
      );
    }
  },
  de = async (s = !0) => {
    let t =
      "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/HEAD/community-plugins.json";
    try {
      let e = await (0, _.requestUrl)({ url: t });
      return e.status === 404 ? null : e.json;
    } catch (e) {
      return (s && console.error("grabCommmunityPluginList 错误", e), null);
    }
  },
  ps = async (s = !0) => {
    let t =
      "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/HEAD/community-css-themes.json";
    try {
      let e = await (0, _.requestUrl)({ url: t });
      return e.status === 404 ? null : e.json;
    } catch (e) {
      return (s && console.error("grabCommmunityThemesList 错误", e), null);
    }
  },
  ee = async (s, t = !1, e = !1) => {
    let i = `https://raw.githubusercontent.com/${s}/HEAD/theme${t ? "-beta" : ""}.css`;
    try {
      let n = await (0, _.requestUrl)({ url: i });
      return n.status === 404 ? null : n.text;
    } catch (n) {
      return (e && console.error("获取社区主题CSS文件出错", n), null);
    }
  },
  ms = async (s, t = !0) => {
    let e = `https://raw.githubusercontent.com/${s}/HEAD/manifest.json`;
    try {
      let i = await (0, _.requestUrl)({ url: e });
      return i.status === 404 ? null : i.text;
    } catch (i) {
      return (t && console.error("获取社区主题清单文件出错", i), null);
    }
  },
  Fo = (s) => {
    let t = 0;
    for (let e = 0; e < s.length; e++) t += s.charCodeAt(e);
    return t;
  },
  pe = (s) => Fo(s).toString(),
  me = async (s, t, e) => {
    let i = await ee(s, t, e);
    return i ? pe(i) : "0";
  },
  Go = async (s, t, e = !0) => {
    let i = `https://api.github.com/repos/${s}/commits?path=${t}&page=1&per_page=1`;
    try {
      let n = await (0, _.requestUrl)({ url: i });
      return n.status === 404 ? null : n.json;
    } catch (n) {
      return (e && console.error("获取文件最后提交信息出错", n), null);
    }
  },
  hs = async (s, t) => {
    var i;
    let e = await Go(s, t);
    return e && e.length > 0 && (i = e[0].commit.committer) != null && i.date
      ? e[0].commit.committer.date
      : "";
  },
  Ve = async (s, t, e = !1, i = !1, n = !1, r) => {
    var o;
    try {
      let a =
          t && t !== "latest"
            ? `https://api.github.com/repos/${s}/releases/tags/${t}`
            : `https://api.github.com/repos/${s}/releases`,
        l = { Accept: "application/vnd.github.v3+json" };
      ((n && r) || r) && (l.Authorization = `Token ${r}`);
      let c = await Oe({ url: a, headers: l });
      if (c.status === 404) return null;
      let p = c.json,
        d =
          t && t !== "latest"
            ? p && typeof p == "object"
              ? [p]
              : []
            : Array.isArray(p)
              ? p
              : [];
      return (
        i && console.error(`grabReleaseFromRepository for ${s}:`, d),
        (o = d
          .sort((g, u) => {
            let m = (0, ce.coerce)(g.tag_name, {
                includePrerelease: !0,
                loose: !0,
              }),
              h = (0, ce.coerce)(u.tag_name, {
                includePrerelease: !0,
                loose: !0,
              });
            if (m && h) return (0, ce.compare)(h.version, m.version);
            if (m && !h) return -1;
            if (!m && h) return 1;
            let f = new Date(g.published_at).getTime(),
              P = new Date(u.published_at).getTime();
            return f < P ? 1 : f > P ? -1 : 0;
          })
          .filter((g) => e || !g.prerelease)[0]) != null
          ? o
          : null
      );
    } catch (a) {
      throw (
        i && console.error(`Error in grabReleaseFromRepository for ${s}:`, a),
        a
      );
    }
  },
  Oe = async (s, t) => {
    let e = 0,
      i = 0,
      n = 0;
    s.headers = { ...s.headers, "User-Agent": "Obsidian/BRAT-Plugin" };
    try {
      return await (0, _.requestUrl)(s);
    } catch (r) {
      let o = new H(r),
        a = gs(o.headers);
      if (
        (a &&
          ((e = Number.parseInt(a["x-ratelimit-limit"], 10)),
          (i = Number.parseInt(a["x-ratelimit-remaining"], 10)),
          (n = Number.parseInt(a["x-ratelimit-reset"], 10))),
        o.status === 403 && i === 0)
      ) {
        let l = new G(e, i, n, s.url);
        throw (
          t &&
            console.error(
              `BRAT
GitHub API 速率限制超限：`,
              `
Request: ${l.requestUrl}`,
              `
Rate limits - Remaining: ${l.remaining}`,
              `
Reset in: ${l.getMinutesToReset()} minutes`,
            ),
          l
        );
      }
      throw (t && console.error("GitHub 请求失败：", r), o);
    }
  };
var ht = {
  pluginList: [],
  pluginSubListFrozenVersion: [],
  themesList: [],
  updateAtStartup: !0,
  updateThemesAtStartup: !0,
  enableAfterInstall: !0,
  loggingEnabled: !1,
  loggingPath: "BRAT-log",
  loggingVerboseEnabled: !1,
  debuggingMode: !1,
  notificationsEnabled: !0,
  globalTokenName: "",
  personalAccessToken: "",
  selectLatestPluginVersionByDefault: !1,
  allowIncompatiblePlugins: !1,
};
function fs(s, t, e = "latest", i = !1, n = "") {
  let r = !1;
  s.settings.pluginList.contains(t) ||
    (s.settings.pluginList.unshift(t), (r = !0));
  let o = s.settings.pluginSubListFrozenVersion.find((a) => a.repo === t);
  (o
    ? (Object.assign(o, {
        repo: t,
        version: e,
        token: void 0,
        tokenName: n || o.tokenName,
        isIncompatible: i || void 0,
      }),
      (r = !0))
    : (s.settings.pluginSubListFrozenVersion.unshift({
        repo: t,
        version: e,
        token: void 0,
        tokenName: n || void 0,
        isIncompatible: i || void 0,
      }),
      (r = !0)),
    r && s.saveSettings());
}
function Me(s, t) {
  return s.settings.pluginList.contains(t);
}
function bs(s, t, e) {
  let i = { repo: t, lastUpdate: pe(e) };
  (s.settings.themesList.unshift(i), s.saveSettings());
}
function Ts(s, t) {
  return !!s.settings.themesList.find((i) => i.repo === t);
}
function ft(s, t, e) {
  let i = s.settings.pluginSubListFrozenVersion.find((n) => n.repo === t);
  i && ((i.tokenName = e || void 0), s.saveSettings());
}
function vs(s, t, e) {
  for (let i of s.settings.themesList)
    i.repo === t && ((i.lastUpdate = e), s.saveSettings());
}
var V = require("obsidian");
var Fe = class {
  constructor(t) {
    this.statusEl = t;
  }
  async validateToken(t, e) {
    var i, n, r, o, a, l, c, p, d;
    if (!t)
      return (
        (i = this.statusEl) == null || i.setText("未提供令牌"),
        (n = this.statusEl) == null || n.addClass("invalid"),
        (r = this.statusEl) == null || r.removeClass("valid"),
        !1
      );
    try {
      let g = await Ne(t, e);
      return (
        (o = this.statusEl) == null || o.removeClass("invalid", "valid"),
        (a = this.statusEl) == null || a.empty(),
        g.validToken
          ? ((l = this.statusEl) == null || l.addClass("valid"),
            this.showValidTokenInfo(g),
            !0)
          : ((c = this.statusEl) == null || c.addClass("invalid"),
            this.showErrorMessage(g.error),
            !1)
      );
    } catch (g) {
      return (
        console.error("令牌验证错误：", g),
        (p = this.statusEl) == null || p.setText("令牌验证失败"),
        (d = this.statusEl) == null || d.addClass("invalid"),
        !1
      );
    }
  }
  showValidTokenInfo(t) {
    var i, n;
    let e =
      (i = this.statusEl) == null
        ? void 0
        : i.createDiv({ cls: "brat-token-details" });
    if (
      e &&
      (e.createDiv({ text: "✓ 有效令牌", cls: "brat-token-status valid" }),
      (n = t.currentScopes) != null &&
        n.length &&
        e.createDiv({
          text: `Scopes: ${t.currentScopes.join(", ")}`,
          cls: "brat-token-scopes",
        }),
      t.rateLimit &&
        e.createDiv({
          text: `Rate Limit: ${t.rateLimit.remaining}/${t.rateLimit.limit}`,
          cls: "brat-token-rate",
        }),
      t.expirationDate)
    ) {
      let r = new Date(t.expirationDate),
        o = Math.ceil((r.getTime() - Date.now()) / (1e3 * 60 * 60 * 24));
      o < 7 &&
        e.createDiv({
          text: `\u26A0\uFE0F Token expires in ${o} days`,
          cls: "brat-token-warning",
        });
    }
  }
  showErrorMessage(t) {
    var i, n, r;
    let e =
      (i = this.statusEl) == null
        ? void 0
        : i.createDiv({ cls: "brat-token-error" });
    if (e && (e.createDiv({ text: t.message }), t.details))
      switch (t.type) {
        case "invalid_prefix":
          e.createDiv({
            text: `Valid prefixes: ${(n = t.details.validPrefixes) == null ? void 0 : n.join(", ")}`,
          });
          break;
        case "insufficient_scope":
          e.createDiv({
            text: `Required scopes: ${(r = t.details.requiredScopes) == null ? void 0 : r.join(", ")}`,
          });
          break;
      }
  }
};
function W(s, t) {
  let e = new DocumentFragment(),
    i = document.createElement("a");
  if (
    ((i.textContent = s),
    (i.href = `https://github.com/${s}`),
    (i.target = "_blank"),
    e.appendChild(i),
    t)
  ) {
    let n = document.createTextNode(t);
    e.appendChild(n);
  }
  return e;
}
function bt({ prependText: s, url: t, text: e, appendText: i }) {
  let n = new DocumentFragment(),
    r = document.createElement("a");
  if (((r.textContent = e), (r.href = t), s)) {
    let o = document.createTextNode(s);
    n.appendChild(o);
  }
  if ((n.appendChild(r), i)) {
    let o = document.createTextNode(i);
    n.appendChild(o);
  }
  return n;
}
var Rs = require("obsidian");
var Ps = {
  common: {
    and: " und ",
    promotional: { learnMore: "Mehr über meine Arbeit:" },
  },
  settings: {
    general: {
      autoEnablePluginsAfterInstallation: {
        name: "Beta-Plugins nach der Installation automatisch aktivieren",
        desc: "Wenn aktiviert, werden neu installierte Beta-Plugins standardmäßig automatisch aktiviert. Diese Option kann im Formular zum Hinzufügen eines Plugins pro Plugin angepasst werden.",
      },
      autoUpdatePluginsAtStartup: {
        name: "Beta-Plugins beim Start automatisch aktualisieren",
        desc: "Wenn aktiviert, prüft BRAT bei jedem Start von Obsidian alle Beta-Plugins auf Updates. Plugins mit fixierter Version werden nicht aktualisiert.",
      },
      autoUpdateThemesAtStartup: {
        name: "Beta-Themes beim Start automatisch aktualisieren",
        desc: "Wenn aktiviert, prüft BRAT bei jedem Start von Obsidian alle Beta-Themes auf Updates.",
      },
      selectLatestPluginVersionByDefault: {
        name: "Neueste Plugin-Version standardmäßig auswählen",
        desc: "Wenn aktiviert, wird beim Hinzufügen eines neuen Plugins standardmäßig die neueste Version ausgewählt.",
      },
      allowIncompatiblePlugins: {
        name: "Inkompatible Plugins erlauben",
        desc: "Wenn aktiviert, können Plugins installiert werden, die eine höhere Obsidian-Version voraussetzen. Außerdem können Desktop-only-Plugins auf Mobilgeräten installiert werden.",
      },
    },
    monitoring: {
      heading: "Überwachung",
      enableNotifications: {
        name: "Benachrichtigungen aktivieren",
        desc: "Wenn aktiviert, zeigt BRAT Popup-Benachrichtigungen zu verschiedenen Aktivitäten an. Wenn deaktiviert, werden keine Benachrichtigungen angezeigt.",
      },
      enableLogging: {
        name: "Protokollierung aktivieren",
        desc: "Plugin-Updates werden in eine Protokolldatei geschrieben.",
      },
      bratLogFileLocation: {
        name: "Speicherort der BRAT-Protokolldatei",
        desc: "Protokolle werden in dieser Datei gespeichert. Füge dem Dateinamen kein .md hinzu.",
        placeholder: "Beispiel: BRAT-log",
      },
      enableVerboseLogging: {
        name: "Ausführliche Protokollierung aktivieren",
        desc: "Schreibt deutlich mehr Informationen in das Protokoll.",
      },
      debuggingMode: {
        name: "Debug-Modus",
        desc: "Sehr ausführliche Konsolenprotokollierung. Kann zur Fehlerbehebung und Entwicklung verwendet werden.",
      },
    },
    githubPersonalAccessToken: {
      heading: "GitHub Personal Access Token",
      personalAccessToken: {
        name: "Persönliches Zugriffstoken",
        desc: {
          prependText:
            "Lege ein persönliches Zugriffstoken fest, um die Rate Limits für öffentliche GitHub-Repositorys zu erhöhen. Du kannst es in ",
          linkText: "deinen GitHub-Kontoeinstellungen",
          appendText:
            " erstellen und anschließend hier hinzufügen. Weitere Informationen findest du in der Dokumentation.",
        },
      },
      clearPersonalAccessToken: "Persönliches Zugriffstoken löschen",
      validate: "Validieren",
    },
    betaPluginList: {
      heading: "Beta-Plugin-Liste",
      filterPlaceholder: "Plugins filtern",
      description: {
        intro:
          'Dies ist die Liste der Beta-Plugins, die über den Befehl "add a beta plugin for testing" hinzugefügt wurden. Du kannst die neueste Version verwenden oder eine Version fixieren. Eine fixierte Version ist ein bestimmtes Plugin-Release anhand seines Release-Tags.',
        editAndRemove:
          'Klicke auf die Schaltfläche "Bearbeiten" neben einem Plugin, um die installierte Version zu ändern. Klicke auf die Schaltfläche "X" neben einem Plugin, um es aus der Liste zu entfernen.',
        noteLabel: "Hinweis: ",
        noteText:
          "Das Entfernen aus der Liste löscht das Plugin nicht. Das sollte über den Bereich Community-Plugins in den Einstellungen erfolgen.",
      },
      addBetaPlugin: "Beta-Plugin hinzufügen",
      trackedVersion: (s, t) =>
        ` Verfolgte Version: ${s === "latest" ? "neueste Version" : s} ${t ? "(fixiert)" : ""}`,
      incompatible: " (inkompatibel)",
      secretMissing: (s) => ` Secret nicht definiert oder leer: ${s}`,
      secretMissingTitle:
        "Ein Token-Name ist konfiguriert, aber das Secret fehlt. Füge das Secret hinzu oder aktualisiere die Plugin-Konfiguration.",
      secretMissingTooltip: (s) =>
        `Secret fehlt: ${s}. Bitte f\xFCge das Secret hinzu oder aktualisiere die Plugin-Konfiguration.`,
      checkAndUpdatePlugin: "Plugin prüfen und aktualisieren",
      changeVersionAndUpdateSettings:
        "Version ändern und Einstellungen aktualisieren",
      removeThisBetaPlugin: "Dieses Beta-Plugin entfernen",
      confirmRemoval: "Zum Bestätigen erneut klicken",
      copyPluginIdentifier: "Plugin-Kennung kopieren",
    },
    betaThemeList: {
      heading: "Beta-Theme-Liste",
      addBetaTheme: "Beta-Theme hinzufügen",
      filterPlaceholder: "Themes filtern",
      deleteThisBetaTheme: "Dieses Beta-Theme löschen",
      confirmRemoval: "Zum Bestätigen erneut klicken",
      copyThemeIdentifier: "Theme-Kennung kopieren",
    },
    copyIdentifier: {
      copied: (s) => `Kopiert: ${s}`,
      failed:
        "Kennung konnte nicht kopiert werden. Bitte prüfe die Clipboard-Berechtigungen.",
    },
  },
  addBetaPluginModal: {
    buttons: {
      addPlugin: "Plugin hinzufügen",
      changeVersion: "Version ändern",
      installing: "Wird installiert …",
      neverMind: "Abbrechen",
      valid: "Gültig",
      invalid: "Ungültig",
    },
    heading: {
      changePluginVersion: "Plugin-Version ändern: ",
      githubRepositoryForBetaPlugin: "GitHub-Repository für das Beta-Plugin:",
    },
    repository: {
      label: "仓库",
      placeholder:
        "Repository (Beispiel: https://GitHub.com/githubusername/repository-name)",
      enterAddressToValidate:
        "Gib eine GitHub-Repository-Adresse ein, um sie zu validieren.",
      addressRequired: "Repository-Adresse ist erforderlich.",
      validating: "Repository-Adresse wird validiert...",
      noReleasesFound:
        "Fehler: In diesem Repository wurden keine Releases gefunden.",
      notFound:
        "Repository nicht gefunden. Prüfe die Adresse oder gib ein gültiges Token für den Zugriff auf ein privates Repository an.",
      accessDenied:
        "Zugriff verweigert. Prüfe dein persönliches Zugriffstoken.",
      error: (s) => `Fehler: ${s}`,
      rateLimitExceeded: (s) =>
        `GitHub API Rate Limit \xFCberschritten. Versuche es in ${s} Minuten erneut.`,
      rateLimitToast: (s) =>
        `${s} Du kannst in den BRAT-Einstellungen ein pers\xF6nliches Zugriffstoken hinzuf\xFCgen, um h\xF6here Limits zu erhalten. Siehe Dokumentation f\xFCr Details.`,
      gitHubResponseToast: (s) => `${s} `,
    },
    version: {
      selectVersion: "Version auswählen",
      selectVersionEllipsis: "Version auswählen...",
      latestVersion: "Neueste Version",
      prereleaseSuffix: "(Vorabversion)",
    },
    token: {
      name: "GitHub-Token",
      desc: "Wähle ein Secret als Token für dieses Repository aus (optional)",
      settingCleared: (s) => `Token-Einstellung f\xFCr ${s} gel\xF6scht`,
      settingUpdated: (s) => `Token-Einstellung f\xFCr ${s} aktualisiert`,
    },
    enableAfterInstall: "Plugin nach der Installation aktivieren",
    alreadyInList: "Dieses Plugin ist bereits in der Beta-Testliste",
  },
  addBetaThemeModal: {
    heading: {
      githubRepositoryForBetaTheme: "GitHub-Repository für das Beta-Theme:",
    },
    alreadyInList: "Dieses Theme ist bereits in der Beta-Testliste",
  },
  themeMessages: {
    noThemeCssFile:
      "Im Stammverzeichnis dieses Repositorys gibt es keine Datei theme.css oder theme-beta.css, daher kann kein Theme installiert werden.",
    noManifestFile:
      "Im Stammverzeichnis dieses Repositorys gibt es keine Datei manifest.json, daher kann das Theme nicht installiert werden.",
    installed: (s, t) => `Theme ${s} wurde aus ${t} installiert. `,
    updated: (s, t) => `Theme ${s} wurde aus ${t} aktualisiert.`,
    removed: (s) =>
      `${s} wurde aus der BRAT-Theme-Liste entfernt und wird nicht mehr aktualisiert. Die Theme-Dateien sind jedoch weiterhin im Vault vorhanden. Um sie zu entfernen, \xF6ffne Einstellungen > Erscheinungsbild und entferne das Theme dort.`,
  },
  versionSuggestModal: {
    title: "Version auswählen",
    placeholder: (s) => `Version f\xFCr ${s} suchen`,
    versionLabel: (s) => (s === "latest" ? "Neueste Version" : s),
    instructions: {
      navigateVersions: "Versionen durchsuchen",
      selectVersion: "Version auswählen",
      dismissModal: "Dialog schließen",
    },
    prereleaseSuffix: "(Vorabversion)",
  },
};
var Tt = {
  common: { and: " 和 ", promotional: { learnMore: "了解我的工作：" } },
  settings: {
    general: {
      autoEnablePluginsAfterInstallation: {
        name: "安装后自动启用插件",
        desc: '启用后Beta插件默认自动启用，可在"添加插件"表单中单独控制',
      },
      autoUpdatePluginsAtStartup: {
        name: "启动时自动更新插件",
        desc: "启用后每次启动检查Beta插件更新（不更新冻结版本）",
      },
      autoUpdateThemesAtStartup: {
        name: "启动时自动更新主题",
        desc: "启用后，每次启动检查所有Beta主题更新。",
      },
      selectLatestPluginVersionByDefault: {
        name: "默认选择最新插件版本",
        desc: "启用后，添加新插件时默认选择最新版本。",
      },
      allowIncompatiblePlugins: {
        name: "允许不兼容插件",
        desc: "启用后允许安装更高应用版本的插件，并允许在移动设备上安装桌面版插件。",
      },
    },
    monitoring: {
      heading: "Monitoring",
      enableNotifications: {
        name: "启用通知",
        desc: "BRAT会为各项活动提供弹窗通知。关闭则无通知。",
      },
      enableLogging: { name: "启用日志", desc: "插件更新记录到日志文件。" },
      bratLogFileLocation: {
        name: "BRAT日志文件位置",
        desc: "日志保存至此文件，文件名勿加.md。",
        placeholder: "示例：BRAT-log",
      },
      enableVerboseLogging: {
        name: "启用详细日志",
        desc: "在日志中获取更多信息。",
      },
      debuggingMode: {
        name: "调试模式",
        desc: "原子弹级控制台日志，可用于故障排查和开发。",
      },
    },
    githubPersonalAccessToken: {
      heading: "GitHub Personal Access Token",
      personalAccessToken: {
        name: "个人访问令牌",
        desc: {
          prependText:
            "Set a personal access token to increase rate limits for public repositories on GitHub. You can create one in ",
          linkText: "你的 GitHub 账户设置",
          appendText:
            " and then add it here. Please consult the documentation for more details.",
        },
      },
      clearPersonalAccessToken: "清除个人访问令牌",
      validate: "验证",
    },
    betaPluginList: {
      heading: "Beta plugin list",
      filterPlaceholder: "筛选插件",
      description: {
        intro:
          "以下是通过命令“添加一个用于测试的Beta插件”添加的Beta插件列表。您可以选择添加最新版本或冻结版本。冻结版本是基于其发布标签的特定插件版本。",
        editAndRemove:
          "点击插件旁的“编辑”按钮可更改已安装版本。点击“X”按钮可从列表中移除插件。",
        noteLabel: "注意：",
        noteText:
          "从列表中移除不会删除插件，删除应在“设置”的“社区插件”选项卡中进行。",
      },
      addBetaPlugin: "添加Beta插件",
      trackedVersion: (s, t) => ` Tracked version: ${s} ${t ? "(frozen)" : ""}`,
      incompatible: " (incompatible)",
      secretMissing: (s) => ` Secret not defined or empty: ${s}`,
      secretMissingTitle: "令牌名称已配置但密钥缺失。添加密钥或更新插件配置。",
      secretMissingTooltip: (s) =>
        `Secret missing: ${s}. Please add the secret or update the plugin configuration.`,
      checkAndUpdatePlugin: "检查并更新插件",
      changeVersionAndUpdateSettings: "更改版本并更新设置",
      removeThisBetaPlugin: "移除Beta插件",
      confirmRemoval: "再点击确认移除",
      copyPluginIdentifier: "Copy plugin identifier",
    },
    betaThemeList: {
      heading: "Beta themes list",
      addBetaTheme: "添加Beta主题",
      filterPlaceholder: "筛选主题",
      deleteThisBetaTheme: "删除Beta主题",
      confirmRemoval: "再点击确认移除",
      copyThemeIdentifier: "Copy theme identifier",
    },
    copyIdentifier: {
      copied: (s) => `Copied: ${s}`,
      failed: "Failed to copy identifier. Check clipboard permissions.",
    },
  },
  addBetaPluginModal: {
    buttons: {
      addPlugin: "添加插件",
      changeVersion: "Change version",
      installing: "安装中…",
      neverMind: "算了",
      valid: "有效",
      invalid: "无效",
    },
    heading: {
      changePluginVersion: "更改插件版本： ",
      githubRepositoryForBetaPlugin: "Beta插件的GitHub仓库：",
    },
    repository: {
      label: "仓库",
      placeholder:
        "仓库（示例：https://GitHub.com/githubusername/repository-name）",
      enterAddressToValidate: "输入GitHub仓库地址以验证。",
      addressRequired: "需要仓库地址。",
      validating: "验证仓库地址…",
      noReleasesFound: "错误：未找到发行版",
      notFound: "仓库未找到。检查地址或提供有效令牌",
      accessDenied: "访问被拒。检查个人访问令牌",
      error: (s) => `Error: ${s}`,
      rateLimitExceeded: (s) =>
        `GitHub API rate limit exceeded. Try again in ${s} minutes.`,
      rateLimitToast: (s) =>
        `${s} Consider adding a personal access token in BRAT settings for higher limits. See documentation for details.`,
      gitHubResponseToast: (s) => `${s} `,
    },
    version: {
      selectVersion: "选择版本",
      selectVersionEllipsis: "Select a version...",
      latestVersion: "最新版本",
      prereleaseSuffix: "(Prerelease)",
    },
    token: {
      name: "GitHub令牌",
      desc: "为此仓库选择Secret作为Token（可选）",
      settingCleared: (s) => `Token setting cleared for ${s}`,
      settingUpdated: (s) => `Token setting updated for ${s}`,
    },
    enableAfterInstall: "安装插件后启用",
    alreadyInList: "This plugin is already in the list for beta testing",
  },
  addBetaThemeModal: {
    heading: { githubRepositoryForBetaTheme: "Beta主题的GitHub仓库：" },
    alreadyInList: "This theme is already in the list for beta testing",
  },
  themeMessages: {
    noThemeCssFile:
      "There is no theme.css or theme-beta.css file in the root path of this repository, so there is no theme to install.",
    noManifestFile:
      "There is no manifest.json file in the root path of this repository, so theme cannot be installed.",
    installed: (s, t) => `${s} theme installed from ${t}. `,
    updated: (s, t) => `${s} theme updated from ${t}.`,
    removed: (s) =>
      `Removed ${s} from BRAT themes list and will no longer be updated. However, the theme files still exist in the vault. To remove them, go into Settings > Appearance and remove the theme.`,
  },
  versionSuggestModal: {
    title: "选择版本",
    placeholder: (s) => `Type to search for a version for ${s}`,
    versionLabel: (s) => s,
    instructions: {
      navigateVersions: "Navigate versions",
      selectVersion: "Select version",
      dismissModal: "Dismiss modal",
    },
    prereleaseSuffix: "(Prerelease)",
  },
};
var Es = {
  common: { and: " と ", promotional: { learnMore: "作者の他の作品を見る：" } },
  settings: {
    general: {
      autoEnablePluginsAfterInstallation: {
        name: "インストール後に Beta プラグインを自動で有効化",
        desc: "有効にすると、新しくインストールした Beta プラグインは既定で自動的に有効になります。個別のプラグインについては「プラグインを追加」フォームで切り替えられます。",
      },
      autoUpdatePluginsAtStartup: {
        name: "起動時に Beta プラグインを自動更新",
        desc: "有効にすると、Obsidian の起動時にすべての Beta プラグインの更新を確認します。固定バージョンのプラグインは更新されません。",
      },
      autoUpdateThemesAtStartup: {
        name: "起動時に Beta テーマを自動更新",
        desc: "有効にすると、Obsidian の起動時にすべての Beta テーマの更新を確認します。",
      },
      selectLatestPluginVersionByDefault: {
        name: "既定で最新のプラグインバージョンを選択",
        desc: "有効にすると、新しいプラグインを追加するときに最新バージョンが既定で選択されます。",
      },
      allowIncompatiblePlugins: {
        name: "互換性のないプラグインを許可",
        desc: "有効にすると、より新しい Obsidian バージョンを必要とするプラグインをインストールできます。また、デスクトップ専用プラグインをモバイル端末にインストールすることも許可されます。",
      },
    },
    monitoring: {
      heading: "監視",
      enableNotifications: {
        name: "通知を有効化",
        desc: "有効にすると、BRAT は各種アクティビティについてポップアップ通知を表示します。オフにすると通知は表示されません。",
      },
      enableLogging: {
        name: "ログを有効化",
        desc: "プラグインの更新はログファイルに記録されます。",
      },
      bratLogFileLocation: {
        name: "BRAT ログファイルの場所",
        desc: "ログはこのファイルに保存されます。ファイル名に .md は追加しないでください。",
        placeholder: "例：BRAT-log",
      },
      enableVerboseLogging: {
        name: "詳細ログを有効化",
        desc: "ログにより多くの情報を記録します。",
      },
      debuggingMode: {
        name: "デバッグモード",
        desc: "非常に詳細なコンソールログを出力します。トラブルシューティングや開発に使用できます。",
      },
    },
    githubPersonalAccessToken: {
      heading: "GitHub 個人アクセストークン",
      personalAccessToken: {
        name: "個人アクセストークン",
        desc: {
          prependText:
            "個人アクセストークンを設定すると、GitHub の公開リポジトリに対するレート制限を緩和できます。トークンは ",
          linkText: "GitHub アカウント設定",
          appendText:
            " で作成し、ここに追加できます。詳しくはドキュメントを参照してください。",
        },
      },
      clearPersonalAccessToken: "個人アクセストークンをクリア",
      validate: "検証",
    },
    betaPluginList: {
      heading: "Beta プラグイン一覧",
      filterPlaceholder: "プラグインを絞り込み",
      description: {
        intro:
          '以下は、"add a beta plugin for testing" コマンドで追加された Beta プラグインの一覧です。最新バージョンを使うことも、特定のバージョンに固定することもできます。固定バージョンとは、リリースタグに基づく特定のプラグインリリースです。',
        editAndRemove:
          "プラグイン横の「編集」ボタンをクリックすると、インストールするバージョンを変更できます。プラグイン横の「X」ボタンをクリックすると、一覧から削除できます。",
        noteLabel: "注意：",
        noteText:
          "一覧から削除してもプラグイン本体は削除されません。削除するには、設定のコミュニティプラグインタブから操作してください。",
      },
      addBetaPlugin: "Beta プラグインを追加",
      trackedVersion: (s, t) =>
        ` \u8FFD\u8DE1\u4E2D\u306E\u30D0\u30FC\u30B8\u30E7\u30F3\uFF1A${s === "latest" ? "最新バージョン" : s}${t ? "（固定）" : ""}`,
      incompatible: "（互換性なし）",
      secretMissing: (s) =>
        ` \u30B7\u30FC\u30AF\u30EC\u30C3\u30C8\u304C\u672A\u5B9A\u7FA9\u307E\u305F\u306F\u7A7A\u3067\u3059\uFF1A${s}`,
      secretMissingTitle:
        "トークン名は設定されていますが、シークレットが見つからないか空です。シークレットを追加するか、プラグイン設定を更新してください。",
      secretMissingTooltip: (s) =>
        `\u30B7\u30FC\u30AF\u30EC\u30C3\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\uFF1A${s}\u3002\u30B7\u30FC\u30AF\u30EC\u30C3\u30C8\u3092\u8FFD\u52A0\u3059\u308B\u304B\u3001\u30D7\u30E9\u30B0\u30A4\u30F3\u8A2D\u5B9A\u3092\u66F4\u65B0\u3057\u3066\u304F\u3060\u3055\u3044\u3002`,
      checkAndUpdatePlugin: "プラグインを確認して更新",
      changeVersionAndUpdateSettings: "バージョンを変更して設定を更新",
      removeThisBetaPlugin: "この Beta プラグインを削除",
      confirmRemoval: "もう一度クリックして削除を確認",
      copyPluginIdentifier: "プラグイン識別子をコピー",
    },
    betaThemeList: {
      heading: "Beta テーマ一覧",
      addBetaTheme: "Beta テーマを追加",
      filterPlaceholder: "テーマを絞り込み",
      deleteThisBetaTheme: "この Beta テーマを削除",
      confirmRemoval: "もう一度クリックして削除を確認",
      copyThemeIdentifier: "テーマ識別子をコピー",
    },
    copyIdentifier: {
      copied: (s) => `\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F\uFF1A${s}`,
      failed:
        "識別子のコピーに失敗しました。クリップボードの権限を確認してください。",
    },
  },
  addBetaPluginModal: {
    buttons: {
      addPlugin: "プラグインを追加",
      changeVersion: "バージョンを変更",
      installing: "インストール中…",
      neverMind: "キャンセル",
      valid: "有効",
      invalid: "無効",
    },
    heading: {
      changePluginVersion: "プラグインのバージョンを変更：",
      githubRepositoryForBetaPlugin: "Beta プラグインの GitHub リポジトリ：",
    },
    repository: {
      label: "リポジトリ",
      placeholder:
        "リポジトリ（例：https://GitHub.com/githubusername/repository-name）",
      enterAddressToValidate:
        "検証する GitHub リポジトリアドレスを入力してください。",
      addressRequired: "リポジトリアドレスが必要です。",
      validating: "リポジトリアドレスを検証中...",
      noReleasesFound: "エラー：このリポジトリにリリースが見つかりません。",
      notFound:
        "リポジトリが見つかりません。アドレスを確認するか、プライベートリポジトリにアクセスできる有効なトークンを指定してください。",
      accessDenied:
        "アクセスが拒否されました。個人アクセストークンを確認してください。",
      error: (s) => `\u30A8\u30E9\u30FC\uFF1A${s}`,
      rateLimitExceeded: (s) =>
        `GitHub API \u306E\u30EC\u30FC\u30C8\u5236\u9650\u3092\u8D85\u904E\u3057\u307E\u3057\u305F\u3002${s} \u5206\u5F8C\u306B\u3082\u3046\u4E00\u5EA6\u304A\u8A66\u3057\u304F\u3060\u3055\u3044\u3002`,
      rateLimitToast: (s) =>
        `${s} BRAT \u8A2D\u5B9A\u3067\u500B\u4EBA\u30A2\u30AF\u30BB\u30B9\u30C8\u30FC\u30AF\u30F3\u3092\u8FFD\u52A0\u3059\u308B\u3068\u3001\u3088\u308A\u9AD8\u3044\u5236\u9650\u3092\u5229\u7528\u3067\u304D\u307E\u3059\u3002\u8A73\u3057\u304F\u306F\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u3092\u53C2\u7167\u3057\u3066\u304F\u3060\u3055\u3044\u3002`,
      gitHubResponseToast: (s) => `${s} `,
    },
    version: {
      selectVersion: "バージョンを選択",
      selectVersionEllipsis: "バージョンを選択...",
      latestVersion: "最新バージョン",
      prereleaseSuffix: "（プレリリース）",
    },
    token: {
      name: "GitHub トークン",
      desc: "このリポジトリ用のトークンとして使用するシークレットを選択します（任意）",
      settingCleared: (s) =>
        `${s} \u306E\u30C8\u30FC\u30AF\u30F3\u8A2D\u5B9A\u3092\u30AF\u30EA\u30A2\u3057\u307E\u3057\u305F`,
      settingUpdated: (s) =>
        `${s} \u306E\u30C8\u30FC\u30AF\u30F3\u8A2D\u5B9A\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F`,
    },
    enableAfterInstall: "インストール後にプラグインを有効化",
    alreadyInList: "このプラグインはすでに Beta テスト一覧にあります",
  },
  addBetaThemeModal: {
    heading: {
      githubRepositoryForBetaTheme: "Beta テーマの GitHub リポジトリ：",
    },
    alreadyInList: "このテーマはすでに Beta テスト一覧にあります",
  },
  themeMessages: {
    noThemeCssFile:
      "このリポジトリのルートパスには theme.css または theme-beta.css がないため、インストールできるテーマがありません。",
    noManifestFile:
      "このリポジトリのルートパスには manifest.json がないため、テーマをインストールできません。",
    installed: (s, t) =>
      `${t} \u304B\u3089\u30C6\u30FC\u30DE ${s} \u3092\u30A4\u30F3\u30B9\u30C8\u30FC\u30EB\u3057\u307E\u3057\u305F\u3002`,
    updated: (s, t) =>
      `${t} \u304B\u3089\u30C6\u30FC\u30DE ${s} \u3092\u66F4\u65B0\u3057\u307E\u3057\u305F\u3002`,
    removed: (s) =>
      `${s} \u3092 BRAT \u306E\u30C6\u30FC\u30DE\u4E00\u89A7\u304B\u3089\u524A\u9664\u3057\u305F\u305F\u3081\u3001\u4ECA\u5F8C\u306F\u66F4\u65B0\u3055\u308C\u307E\u305B\u3093\u3002\u305F\u3060\u3057\u3001\u30C6\u30FC\u30DE\u30D5\u30A1\u30A4\u30EB\u81EA\u4F53\u306F Vault \u306B\u6B8B\u308A\u307E\u3059\u3002\u524A\u9664\u3059\u308B\u306B\u306F\u3001\u8A2D\u5B9A > \u5916\u89B3 \u304B\u3089\u30C6\u30FC\u30DE\u3092\u524A\u9664\u3057\u3066\u304F\u3060\u3055\u3044\u3002`,
  },
  versionSuggestModal: {
    title: "バージョンを選択",
    placeholder: (s) =>
      `${s} \u306E\u30D0\u30FC\u30B8\u30E7\u30F3\u3092\u691C\u7D22`,
    versionLabel: (s) => (s === "latest" ? "最新バージョン" : s),
    instructions: {
      navigateVersions: "バージョンを移動",
      selectVersion: "バージョンを選択",
      dismissModal: "モーダルを閉じる",
    },
    prereleaseSuffix: "（プレリリース）",
  },
};
var ws = {
  common: { and: " 和 ", promotional: { learnMore: "了解作者的更多作品：" } },
  settings: {
    general: {
      autoEnablePluginsAfterInstallation: {
        name: "安装后自动启用 Beta 插件",
        desc: "开启后，新安装的 Beta 插件会默认自动启用。你仍然可以在“添加插件”表单中为单个插件单独调整。",
      },
      autoUpdatePluginsAtStartup: {
        name: "启动时自动更新 Beta 插件",
        desc: "开启后，每次 Obsidian 启动时都会检查并安装 Beta 插件更新。固定版本不会自动更新。",
      },
      autoUpdateThemesAtStartup: {
        name: "启动时自动更新 Beta 主题",
        desc: "开启后，每次 Obsidian 启动时都会检查并安装 Beta 主题更新。",
      },
      selectLatestPluginVersionByDefault: {
        name: "默认选择插件最新版本",
        desc: "开启后，添加新插件时会默认选择最新版本。",
      },
      allowIncompatiblePlugins: {
        name: "允许安装不兼容插件",
        desc: "开启后，可以安装要求更高 Obsidian 版本的插件，也可以在移动端安装仅支持桌面端的插件。",
      },
    },
    monitoring: {
      heading: "通知与日志",
      enableNotifications: {
        name: "启用通知",
        desc: "开启后，BRAT 会用弹窗提示安装、更新等操作状态。关闭后不再显示这些通知。",
      },
      enableLogging: {
        name: "启用日志",
        desc: "开启后，插件更新记录会写入日志文件。",
      },
      bratLogFileLocation: {
        name: "BRAT 日志文件",
        desc: "日志会保存到这个文件。填写文件名或库内路径时不要加 .md。",
        placeholder: "示例：BRAT-log",
      },
      enableVerboseLogging: {
        name: "启用详细日志",
        desc: "开启后，日志会记录更多排查信息。",
      },
      debuggingMode: {
        name: "调试模式",
        desc: "开启后，控制台会输出大量调试信息，主要用于排查问题和开发。",
      },
    },
    githubPersonalAccessToken: {
      heading: "GitHub 个人访问令牌",
      personalAccessToken: {
        name: "个人访问令牌",
        desc: {
          prependText:
            "设置个人访问令牌可以提高访问 GitHub 公共仓库时的请求额度。你可以在 ",
          linkText: "GitHub 令牌设置",
          appendText:
            " 中创建令牌，然后在这里选择保存该令牌的密钥。更多信息请参考文档。",
        },
      },
      clearPersonalAccessToken: "清除个人访问令牌设置",
      validate: "验证",
    },
    betaPluginList: {
      heading: "Beta 插件列表",
      filterPlaceholder: "筛选插件",
      description: {
        intro:
          "下方列出已通过 BRAT 添加的 Beta 插件。你可以让插件跟随最新版本，也可以固定到某个发布版本。固定版本指基于 release 标签指定的某个插件版本。",
        editAndRemove:
          "点击插件旁的编辑按钮可以更改安装版本；点击 X 按钮会将它从列表中移除。",
        noteLabel: "注意：",
        noteText:
          "从列表中移除不会删除插件本体。如需删除插件，请到设置中的“第三方插件”页面操作。",
      },
      addBetaPlugin: "添加 Beta 插件",
      trackedVersion: (s, t) =>
        `\u8DDF\u8E2A\u7248\u672C\uFF1A${s === "latest" ? "最新版本" : s}${t ? "（固定）" : ""}`,
      incompatible: "（不兼容）",
      secretMissing: (s) =>
        `\u5BC6\u94A5\u672A\u5B9A\u4E49\u6216\u4E3A\u7A7A\uFF1A${s}`,
      secretMissingTitle:
        "已配置密钥名称，但密钥不存在或为空。请添加密钥，或更新该插件配置。",
      secretMissingTooltip: (s) =>
        `\u5BC6\u94A5\u7F3A\u5931\uFF1A${s}\u3002\u8BF7\u6DFB\u52A0\u5BC6\u94A5\uFF0C\u6216\u66F4\u65B0\u8BE5\u63D2\u4EF6\u914D\u7F6E\u3002`,
      checkAndUpdatePlugin: "检查并更新插件",
      changeVersionAndUpdateSettings: "更改版本和设置",
      removeThisBetaPlugin: "移除此 Beta 插件",
      confirmRemoval: "再次点击确认移除",
      copyPluginIdentifier: "复制插件标识符",
    },
    betaThemeList: {
      heading: "Beta 主题列表",
      addBetaTheme: "添加 Beta 主题",
      filterPlaceholder: "筛选主题",
      deleteThisBetaTheme: "删除此 Beta 主题",
      confirmRemoval: "再次点击确认移除",
      copyThemeIdentifier: "复制主题标识符",
    },
    copyIdentifier: {
      copied: (s) => `\u5DF2\u590D\u5236\uFF1A${s}`,
      failed: "复制标识符失败，请检查剪贴板权限。",
    },
  },
  addBetaPluginModal: {
    buttons: {
      addPlugin: "添加插件",
      changeVersion: "更改版本",
      installing: "正在安装…",
      neverMind: "取消",
      valid: "有效",
      invalid: "无效",
    },
    heading: {
      changePluginVersion: "更改插件版本：",
      githubRepositoryForBetaPlugin: "Beta 插件的 GitHub 仓库：",
    },
    repository: {
      label: "仓库",
      placeholder:
        "仓库（示例：https://GitHub.com/githubusername/repository-name）",
      enterAddressToValidate: "输入 GitHub 仓库地址后会自动验证。",
      addressRequired: "需要填写仓库地址。",
      validating: "正在验证仓库地址...",
      noReleasesFound: "错误：此仓库中没有找到发布版本。",
      notFound: "找不到仓库。请检查地址，或提供可访问私有仓库的有效令牌。",
      accessDenied: "访问被拒绝。请检查个人访问令牌。",
      error: (s) => `\u9519\u8BEF\uFF1A${s}`,
      rateLimitExceeded: (s) =>
        `GitHub API \u8BF7\u6C42\u989D\u5EA6\u5DF2\u7528\u5C3D\u3002\u8BF7\u5728 ${s} \u5206\u949F\u540E\u91CD\u8BD5\u3002`,
      rateLimitToast: () =>
        "GitHub API 请求额度已用尽。可以在 BRAT 设置中添加个人访问令牌以提高额度。详情请查看文档。",
      gitHubResponseToast: (s) => `${s} `,
    },
    version: {
      selectVersion: "选择版本",
      selectVersionEllipsis: "选择版本...",
      latestVersion: "最新版本",
      prereleaseSuffix: "（预发布）",
    },
    token: {
      name: "GitHub 令牌",
      desc: "选择一个密钥，作为访问此仓库的令牌（可选）",
      settingCleared: (s) =>
        `\u5DF2\u6E05\u9664 ${s} \u7684\u4EE4\u724C\u8BBE\u7F6E`,
      settingUpdated: (s) =>
        `\u5DF2\u66F4\u65B0 ${s} \u7684\u4EE4\u724C\u8BBE\u7F6E`,
    },
    enableAfterInstall: "安装后启用此插件",
    alreadyInList: "这个插件已经在 Beta 测试列表中",
  },
  addBetaThemeModal: {
    heading: { githubRepositoryForBetaTheme: "Beta 主题的 GitHub 仓库：" },
    alreadyInList: "这个主题已经在 Beta 测试列表中",
  },
  themeMessages: {
    noThemeCssFile:
      "这个仓库的根目录里没有 theme.css 或 theme-beta.css 文件，因此没有可安装的主题。",
    noManifestFile:
      "这个仓库的根目录里没有 manifest.json 文件，因此无法安装该主题。",
    installed: (s, t) =>
      `\u5DF2\u4ECE ${t} \u5B89\u88C5\u4E3B\u9898 ${s}\u3002`,
    updated: (s, t) => `\u5DF2\u4ECE ${t} \u66F4\u65B0\u4E3B\u9898 ${s}\u3002`,
    removed: (s) =>
      `\u5DF2\u5C06 ${s} \u4ECE BRAT \u4E3B\u9898\u5217\u8868\u4E2D\u79FB\u9664\uFF0C\u4E4B\u540E\u4E0D\u4F1A\u518D\u68C0\u67E5\u66F4\u65B0\u3002\u4E0D\u8FC7\u4E3B\u9898\u6587\u4EF6\u4ECD\u7136\u4FDD\u7559\u5728\u5E93\u4E2D\u3002\u5982\u9700\u5220\u9664\uFF0C\u8BF7\u524D\u5F80\u201C\u8BBE\u7F6E > \u5916\u89C2\u201D\u4E2D\u79FB\u9664\u8BE5\u4E3B\u9898\u3002`,
  },
  versionSuggestModal: {
    title: "选择版本",
    placeholder: (s) =>
      `\u8F93\u5165\u5173\u952E\u8BCD\uFF0C\u641C\u7D22 ${s} \u7684\u7248\u672C`,
    versionLabel: (s) => (s === "latest" ? "最新版本" : s),
    instructions: {
      navigateVersions: "浏览版本",
      selectVersion: "选择版本",
      dismissModal: "关闭弹窗",
    },
    prereleaseSuffix: "（预发布）",
  },
};
var vt = { de: Ps, en: Tt, ja: Es, "zh-cn": ws },
  Uo = {
    "en-gb": "en",
    "en-us": "en",
    zh: "zh-cn",
    "zh-hans": "zh-cn",
    "zh-sg": "zh-cn",
  };
function qo(s) {
  return s.toLowerCase().replace(/_/g, "-");
}
function Ho(s) {
  let t = qo(s);
  if (vt[t]) return t;
  let e = Uo[t];
  if (e) return e;
  let i = t.split("-")[0];
  return vt[i] ? i : t;
}
function R(s = (0, Rs.getLanguage)()) {
  var t;
  return (t = vt[Ho(s)]) != null ? t : Tt;
}
var Ge = require("obsidian");
function v(s, t, e = 10, i) {
  if (!s.settings.notificationsEnabled) return;
  let n = i
      ? Ge.Platform.isDesktop
        ? "(click=dismiss, right-click=Info)"
        : "(click=dismiss)"
      : "",
    r = new Ge.Notice(
      `BRAT
${t}
${n}`,
      e * 1e3,
    );
  i &&
    (r.messageEl.oncontextmenu = () => {
      i();
    });
}
var Ue = (s, t = !0) => {
  let e = R().common.promotional,
    i = s.createEl("div", { cls: "brat-promotional-links" });
  t
    ? i.addClass("brat-promotional-links-settings")
    : i.addClass("brat-promotional-links-modal");
  let n = i.createDiv("coffee");
  (n.addClass("ex-twitter-span"), n.addClass("brat-promotional-links-coffee"));
  let r = n.createDiv();
  ((r.innerText = e.learnMore), n.appendChild(r));
  let o = n.createEl("a", { href: "https://tfthacker.com" });
  return ((o.innerText = "https://tfthacker.com"), i);
};
var ys = require("obsidian");
var qe = class extends ys.SuggestModal {
  constructor(t, e, i, n, r) {
    super(t);
    let o = R().versionSuggestModal;
    ((this.versions = i),
      (this.selected = n),
      (this.onChoose = r),
      this.setTitle(o.title),
      this.setPlaceholder(o.placeholder(e)),
      this.setInstructions([
        { command: "↑↓", purpose: o.instructions.navigateVersions },
        { command: "↵", purpose: o.instructions.selectVersion },
        { command: "esc", purpose: o.instructions.dismissModal },
      ]));
  }
  getSuggestions(t) {
    let e = t.toLowerCase();
    return this.versions.filter((i) => i.version.toLowerCase().contains(e));
  }
  renderSuggestion(t, e) {
    let i = R().versionSuggestModal;
    e.createEl("div", {
      text: `${i.versionLabel(t.version)} ${t.prerelease ? i.prereleaseSuffix : ""}`,
    });
  }
  onChooseSuggestion(t) {
    this.onChoose(t.version);
  }
  onNoSuggestion() {
    (this.onChoose(this.selected ? this.selected : ""), this.close());
  }
};
var K = class extends V.Modal {
  constructor(e, i, n = !1, r = !1, o = "", a = "", l = "", c) {
    super(e.app);
    this.versionSetting = null;
    this.repositoryAddressEl = null;
    this.tokenInputEl = null;
    this.validateButton = null;
    this.validator = null;
    this.addPluginButton = null;
    this.cancelButton = null;
    ((this.plugin = e),
      (this.betaPlugins = i),
      (this.address = o),
      (this.version = a),
      (this.secretName = l),
      (this.openSettingsTabAfterwards = n),
      (this.updateVersion = r),
      (this.enableAfterInstall = e.settings.enableAfterInstall),
      (this.onSubmitted = c));
  }
  async submitForm() {
    var o, a, l, c, p, d, g, u, m, h;
    let e = R().addBetaPluginModal;
    if (this.address === "") return;
    let i = De(this.address);
    if (
      this.plugin.settings.pluginSubListFrozenVersion.find((f) => f.repo === i)
    ) {
      ((await this.betaPlugins.addPlugin(
        i,
        !1,
        !1,
        !1,
        this.version,
        !0,
        this.enableAfterInstall,
        this.secretName,
      )) && ((o = this.onSubmitted) == null || o.call(this), this.close()),
        (a = this.cancelButton) == null || a.setDisabled(!1),
        (l = this.addPluginButton) == null || l.setDisabled(!1),
        (c = this.addPluginButton) == null ||
          c.setButtonText(e.buttons.addPlugin),
        (p = this.versionSetting) == null || p.setDisabled(!1));
      return;
    }
    if (!this.version && Me(this.plugin, i)) {
      v(this.plugin, e.alreadyInList, 10);
      return;
    }
    ((await this.betaPlugins.addPlugin(
      i,
      !1,
      !1,
      !1,
      this.version,
      !1,
      this.enableAfterInstall,
      this.secretName,
    )) && ((d = this.onSubmitted) == null || d.call(this), this.close()),
      (g = this.cancelButton) == null || g.setDisabled(!1),
      (u = this.addPluginButton) == null || u.setDisabled(!1),
      (m = this.addPluginButton) == null ||
        m.setButtonText(e.buttons.addPlugin),
      (h = this.versionSetting) == null || h.setDisabled(!1));
  }
  updateVersionDropdown(e, i, n = "") {
    let r = R().addBetaPluginModal,
      o;
    (e.clear(),
      i.length > 0 &&
      !n &&
      this.plugin.settings.selectLatestPluginVersionByDefault
        ? ((o = "最新"), (this.version = "最新"))
        : (o = n),
      i.length < 20 || V.Platform.isMobile
        ? e.addDropdown((l) => {
            (l.addOption("", r.version.selectVersion),
              l.addOption("最新", r.version.latestVersion));
            for (let c of i)
              l.addOption(
                c.version,
                `${c.version} ${c.prerelease ? r.version.prereleaseSuffix : ""}`,
              );
            (l.onChange((c) => {
              var p;
              ((this.version = c),
                (p = this.addPluginButton) == null ||
                  p.setDisabled(this.version === ""));
            }),
              l.setValue(o),
              l.selectEl.addClass("brat-version-selector"));
          })
        : e.addButton((l) => {
            l.setButtonText(
              o === "latest"
                ? r.version.latestVersion
                : o || r.version.selectVersionEllipsis,
            )
              .setClass("brat-version-selector")
              .setClass("button")
              .onClick(() => {
                let p = [{ version: "最新", prerelease: !1 }, ...i];
                new qe(this.app, this.address, p, o, (g) => {
                  var u;
                  ((this.version = g),
                    l.setButtonText(
                      g === "latest"
                        ? r.version.latestVersion
                        : g || r.version.selectVersionEllipsis,
                    ),
                    (u = this.addPluginButton) == null ||
                      u.setDisabled(this.version === ""));
                }).open();
              });
          }));
  }
  onOpen() {
    let e = R().addBetaPluginModal,
      i = this.contentEl.createEl("h4");
    (this.address
      ? (i.appendText(e.heading.changePluginVersion),
        i.appendChild(W(this.address)))
      : i.setText(e.heading.githubRepositoryForBetaPlugin),
      this.contentEl.createEl("form", {}, (n) => {
        var d;
        let r = R().common;
        (n.addClass("brat-modal"),
          (!this.address || !this.updateVersion) &&
            new V.Setting(n).setClass("repository-setting").then((u) => {
              u.addText((m) => {
                ((this.repositoryAddressEl = m),
                  m.setPlaceholder(e.repository.placeholder),
                  m.setValue(this.address),
                  m.onChange((h) => {
                    var f, P;
                    ((this.address = De(h.trim())),
                      this.version !== "" &&
                        (!this.address ||
                          !this.isGitHubRepositoryMatch(this.address)) &&
                        this.versionSetting &&
                        (this.updateVersionDropdown(this.versionSetting, []),
                        this.versionSetting.settingEl.classList.add(
                          "disabled-setting",
                        ),
                        this.versionSetting.setDisabled(!0),
                        m.inputEl.classList.remove("valid-repository"),
                        m.inputEl.classList.remove("invalid-repository")),
                      this.version ||
                        (this.isGitHubRepositoryMatch(this.address)
                          ? (f = this.addPluginButton) == null ||
                            f.setDisabled(!1)
                          : (P = this.addPluginButton) == null ||
                            P.setDisabled(!0)));
                  }),
                  m.inputEl.addEventListener("keydown", (h) => {
                    h.key === "Enter" &&
                      (async () => {
                        var f, P, L;
                        (this.address &&
                          ((this.updateVersion && this.version !== "") ||
                            !this.updateVersion) &&
                          (h.preventDefault(),
                          (f = this.addPluginButton) == null ||
                            f.setDisabled(!0),
                          (P = this.cancelButton) == null || P.setDisabled(!0),
                          (L = this.versionSetting) == null ||
                            L.setDisabled(!0),
                          this.submitForm()),
                          await this.updateRepositoryVersionInfo(
                            this.version,
                            o,
                          ));
                      })();
                  }),
                  m.inputEl.addEventListener("blur", () => {
                    this.updateRepositoryVersionInfo(this.version, o);
                  }),
                  u.setDesc(e.repository.label),
                  m.inputEl.addClass("brat-full-width-input"));
              });
            }));
        let o = n.createDiv("validation-status");
        (this.address || o.setText(e.repository.enterAddressToValidate),
          (this.versionSetting = new V.Setting(n)
            .setClass("version-setting")
            .setClass("disabled-setting")),
          this.updateVersionDropdown(this.versionSetting, [], this.version),
          this.versionSetting.setDisabled(!0));
        let a = n.createDiv("token-setting");
        if (
          (new V.Setting(a)
            .setName(e.token.name)
            .setDesc(e.token.desc)
            .addComponent((g) =>
              new V.SecretComponent(this.plugin.app, g)
                .setValue(this.secretName)
                .onChange((u) => {
                  (async () => {
                    var h, f, P, L, A;
                    if (
                      ((this.secretName =
                        (u == null ? void 0 : u.trim()) || ""),
                      !this.secretName)
                    ) {
                      (this.address &&
                        Me(this.plugin, this.address) &&
                        (ft(this.plugin, this.address, ""),
                        v(
                          this.plugin,
                          e.token.settingCleared(this.address),
                          3,
                        )),
                        this.updateRepositoryVersionInfo(this.version, o));
                      return;
                    }
                    let m = this.secretName
                      ? this.plugin.app.secretStorage.getSecret(this.secretName)
                      : null;
                    m &&
                      ((this.validToken = await ((h = this.validator) == null
                        ? void 0
                        : h.validateToken(m, this.address))),
                      this.validToken
                        ? ((L = this.validateButton) == null ||
                            L.setButtonText(e.buttons.valid),
                          (A = this.validateButton) == null ||
                            A.setDisabled(!0),
                          this.address &&
                            (await this.updateRepositoryVersionInfo(
                              this.version,
                              o,
                            ),
                            Me(this.plugin, this.address) &&
                              (ft(this.plugin, this.address, this.secretName),
                              v(
                                this.plugin,
                                e.token.settingUpdated(this.address),
                                3,
                              ))))
                        : ((f = this.validateButton) == null ||
                            f.setButtonText(e.buttons.invalid),
                          (P = this.validateButton) == null ||
                            P.setDisabled(!1)));
                  })();
                }),
            ),
          (this.validator = new Fe()),
          this.secretName)
        ) {
          let g = this.plugin.app.secretStorage.getSecret(this.secretName);
          g &&
            ((d = this.validator) == null ||
              d.validateToken(g, this.address).then((u) => {
                var m, h;
                ((this.validToken = u),
                  this.validToken &&
                    ((m = this.validateButton) == null ||
                      m.setButtonText(e.buttons.valid),
                    (h = this.validateButton) == null || h.setDisabled(!0)));
              }));
        }
        n.createDiv("modal-button-container", (g) => {
          var u;
          (g.createEl("label", { cls: "mod-checkbox" }, (m) => {
            let h = m.createEl("input", {
              attr: { tabindex: -1 },
              type: "checkbox",
            });
            ((h.checked = this.enableAfterInstall),
              h.addEventListener("click", () => {
                this.enableAfterInstall = h.checked;
              }),
              m.appendText(e.enableAfterInstall));
          }),
            (this.cancelButton = new V.ButtonComponent(g)
              .setButtonText(e.buttons.neverMind)
              .setClass("mod-cancel")
              .onClick(() => {
                this.close();
              })),
            (this.addPluginButton = new V.ButtonComponent(g)
              .setButtonText(
                this.updateVersion && this.address
                  ? e.buttons.changeVersion
                  : e.buttons.addPlugin,
              )
              .setCta()
              .onClick(() => {
                var m, h, f, P;
                this.address !== "" &&
                  ((this.updateVersion && this.version !== "") ||
                    !this.updateVersion) &&
                  ((m = this.addPluginButton) == null || m.setDisabled(!0),
                  (h = this.addPluginButton) == null ||
                    h.setButtonText(e.buttons.installing),
                  (f = this.cancelButton) == null || f.setDisabled(!0),
                  (P = this.versionSetting) == null || P.setDisabled(!0),
                  this.submitForm());
              })),
            (this.updateVersion || this.address === "") &&
              ((u = this.addPluginButton) == null || u.setDisabled(!0)));
        });
        let l = n.createDiv();
        l.addClass("brat-modal-divider");
        let c = l.createSpan();
        (c.createEl("a", {
          href: "https://bit.ly/o42-twitter",
          text: "TFTHacker",
        }),
          c.appendText(r.and),
          c.createEl("a", {
            href: "https://github.com/johannrichard",
            text: "johannrichard",
          }),
          c.addClass("brat-credits"),
          l.appendChild(c),
          Ue(l, !1));
        let p = n.querySelectorAll("button");
        for (let g of Array.from(p)) g.setAttribute("type", "button");
        n.addEventListener("submit", (g) => {
          (g.preventDefault(), g.stopPropagation());
        });
      }),
      this.address &&
        window.setTimeout(() => {
          this.updateRepositoryVersionInfo(this.version);
        }, 100));
  }
  async updateRepositoryVersionInfo(e = "", i) {
    var a, l, c, p, d, g;
    let n = R().addBetaPluginModal,
      r = this.repositoryAddressEl;
    if (
      (this.plugin.settings.debuggingMode &&
        console.debug(
          `[BRAT] Updating version dropdown for ${this.address} with selected version ${e}`,
        ),
      !this.address)
    ) {
      (i == null || i.setText(n.repository.addressRequired),
        i == null || i.addClass("validation-status-error"));
      return;
    }
    (i == null || i.setText(n.repository.validating),
      i == null || i.removeClass("validation-status-error"),
      this.versionSetting &&
        this.updateVersion &&
        this.updateVersionDropdown(this.versionSetting, []));
    let o = De(this.address);
    try {
      let u = "";
      if (this.secretName) {
        let h = this.plugin.app.secretStorage.getSecret(this.secretName);
        h && (u = h);
      } else if (this.plugin.settings.globalTokenName) {
        let h = this.plugin.app.secretStorage.getSecret(
          this.plugin.settings.globalTokenName,
        );
        h && (u = h);
      }
      let m = await ds(o, this.plugin.settings.debuggingMode, u);
      m && m.length > 0
        ? (r == null || r.inputEl.classList.remove("invalid-repository"),
          r == null || r.inputEl.classList.add("valid-repository"),
          i == null || i.setText(""),
          this.versionSetting &&
            (this.versionSetting.settingEl.classList.remove("disabled-setting"),
            this.versionSetting.setDisabled(!1),
            this.updateVersionDropdown(this.versionSetting, m, e)))
        : (r == null || r.inputEl.classList.remove("valid-repository"),
          r == null || r.inputEl.classList.add("invalid-repository"),
          i == null || i.setText(n.repository.noReleasesFound),
          i == null || i.addClass("validation-status-error"),
          (a = this.versionSetting) == null ||
            a.settingEl.classList.add("disabled-setting"),
          (l = this.versionSetting) == null || l.setDisabled(!0),
          (c = this.addPluginButton) == null || c.setDisabled(!0));
    } catch (u) {
      if (
        (u instanceof G &&
          (r == null || r.inputEl.classList.remove("valid-repository"),
          r == null || r.inputEl.classList.add("validation-error"),
          i == null ||
            i.setText(n.repository.rateLimitExceeded(u.getMinutesToReset())),
          this.versionSetting &&
            (this.versionSetting.settingEl.classList.add("disabled-setting"),
            this.versionSetting.setDisabled(!0),
            (p = this.addPluginButton) == null || p.setDisabled(!0)),
          v(this.plugin, n.repository.rateLimitToast(u.message), 20, () => {
            window.open(
              "https://github.com/TfTHacker/obsidian42-brat/blob/main/BRAT-DEVELOPER-GUIDE.md#github-api-rate-limits",
            );
          })),
        u instanceof H)
      ) {
        let m = u;
        switch (m.status) {
          case 404:
            i == null || i.setText(n.repository.notFound);
            break;
          case 403:
            i == null || i.setText(n.repository.accessDenied);
            break;
          default:
            i == null || i.setText(n.repository.error(m.message));
            break;
        }
        (i == null || i.addClass("validation-status-error"),
          (d = this.versionSetting) == null || d.setDisabled(!0),
          (g = this.addPluginButton) == null || g.setDisabled(!0),
          v(this.plugin, n.repository.gitHubResponseToast(m.message), 20));
      }
    }
  }
  onClose() {
    this.openSettingsTabAfterwards &&
      (this.plugin.app.setting.open(),
      this.plugin.app.setting.openTabById(this.plugin.APP_ID));
  }
  isGitHubRepositoryMatch(e) {
    let i = e
      .trim()
      .replace(/\.git$/, "")
      .toLowerCase();
    return /^(?:https?:\/\/github\.com\/)?([a-zA-Z0-9._-]+)\/([a-zA-Z0-9._-]+)$/i.test(
      i,
    );
  }
};
var Ss = require("obsidian");
async function He() {
  try {
    let s = await (0, Ss.requestUrl)(`https://obsidian.md/?${Math.random()}`);
    return s.status >= 200 && s.status < 300;
  } catch (s) {
    return !1;
  }
}
var he = class {
  constructor(t) {
    this.plugin = t;
  }
  displayAddNewPluginModal(t = !1, e = !1, i = "", n = "", r = "", o) {
    new K(this.plugin, this, t, e, i, n, r, o).open();
  }
  async validateRepository(t, e = !1, i = !1, n = "", r = "") {
    let a = r;
    try {
      let l = await mt(t, this.plugin.settings.debuggingMode, a),
        c = await Ve(t, n, e, this.plugin.settings.debuggingMode, l, a);
      if (!c)
        return (
          i &&
            (v(
              this.plugin,
              `${t}
This does not seem to be an obsidian plugin with valid releases, as there are no releases available.`,
              15,
            ),
            console.error("BRAT：验证仓库", t, e, i)),
          null
        );
      let p = await ge(
        c,
        "manifest.json",
        this.plugin.settings.debuggingMode,
        l,
        a,
      );
      if (!p)
        return (
          i &&
            (v(
              this.plugin,
              `${t}
This does not seem to be an obsidian plugin, as there is no manifest.json file.`,
              15,
            ),
            console.error("BRAT：验证仓库", t, e, i)),
          null
        );
      let d = JSON.parse(p);
      if (!("id" in d))
        return (
          i &&
            v(
              this.plugin,
              `${t}
The plugin id attribute for the release is missing from the manifest file`,
              15,
            ),
          null
        );
      if (!("version" in d))
        return (
          i &&
            v(
              this.plugin,
              `${t}
The version attribute for the release is missing from the manifest file`,
              15,
            ),
          null
        );
      let g = (0, U.coerce)(c.tag_name, { includePrerelease: !0, loose: !0 }),
        u = (0, U.coerce)(d.version, { includePrerelease: !0, loose: !0 });
      return (
        (g && u
          ? (0, U.compare)(g.version, u.version) !== 0
          : g !== null && d.version !== c.tag_name) &&
          g &&
          (i &&
            v(
              this.plugin,
              `${t}
Version mismatch detected:
Release tag version: ${c.tag_name}
Manifest version: ${d.version}

The release tag version will be used to ensure consistency.`,
              15,
            ),
          (d.version = g.version)),
        d
      );
    } catch (l) {
      if (l instanceof G) {
        let c = `GitHub API rate limit exceeded. Reset in ${l.getMinutesToReset()} minutes.`;
        throw (
          i && v(this.plugin, c, 15),
          console.error(`BRAT: validateRepository ${l}`),
          v(
            this.plugin,
            `${l.message} Consider adding a personal access token in BRAT settings for higher limits. See documentation for details.`,
            20,
            () => {
              window.open(
                "https://github.com/TfTHacker/obsidian42-brat/blob/main/BRAT-DEVELOPER-GUIDE.md#github-api-rate-limits",
              );
            },
          ),
          l
        );
      }
      if (l instanceof H)
        throw (
          i &&
            (l.status === 401
              ? v(
                  this.plugin,
                  `${t}
GitHub API Authentication error. Please verify that your personal access token is valid and set correctly.`,
                  15,
                )
              : v(
                  this.plugin,
                  `${t}
GitHub API error ${l.status}: ${l.message}`,
                  15,
                )),
          console.error(`BRAT: validateRepository ${l}`),
          l
        );
      return (
        i &&
          v(
            this.plugin,
            `${t}
Unspecified error encountered: ${String(l)}, verify debug for more information.`,
            15,
          ),
        null
      );
    }
  }
  async getAllReleaseFiles(t, e, i = "", n = "") {
    let r = n,
      o = await mt(t, this.plugin.settings.debuggingMode, r),
      a = await Ve(t, i, e, this.plugin.settings.debuggingMode, o, r);
    if (!a) throw new Error("No release found");
    let l = e || i !== "";
    return (
      console.debug({ reallyGetManifestOrNot: l, version: a.tag_name }),
      {
        mainJs: await ge(
          a,
          "main.js",
          this.plugin.settings.debuggingMode,
          o,
          r,
        ),
        manifest: l
          ? await ge(
              a,
              "manifest.json",
              this.plugin.settings.debuggingMode,
              o,
              r,
            )
          : "",
        styles: await ge(
          a,
          "styles.css",
          this.plugin.settings.debuggingMode,
          o,
          r,
        ),
      }
    );
  }
  async writeReleaseFilesToPluginFolder(t, e) {
    var r, o;
    let i = `${(0, O.normalizePath)(`${this.plugin.app.vault.configDir}/plugins/${t}`)}/`,
      { adapter: n } = this.plugin.app.vault;
    ((await n.exists(i)) || (await n.mkdir(i)),
      await n.write(`${i}main.js`, (r = e.mainJs) != null ? r : ""),
      await n.write(`${i}manifest.json`, (o = e.manifest) != null ? o : ""),
      e.styles && (await n.write(`${i}styles.css`, e.styles)));
  }
  async addPlugin(
    t,
    e = !1,
    i = !1,
    n = !1,
    r = "",
    o = !1,
    a = this.plugin.settings.enableAfterInstall,
    l = "",
  ) {
    try {
      this.plugin.settings.debuggingMode &&
        console.debug(
          "BRAT: addPlugin",
          t,
          e,
          i,
          n,
          r,
          o,
          a,
          l ? "with secret" : "public",
        );
      let c = "";
      l && l.trim() !== ""
        ? ((c = this.plugin.app.secretStorage.getSecret(l) || ""),
          c ||
            v(
              this.plugin,
              `Secret not found for token name: ${l}. Please add it to SecretStorage or clear the token name for this plugin.`,
              10,
            ))
        : this.plugin.settings.globalTokenName &&
          (c =
            this.plugin.app.secretStorage.getSecret(
              this.plugin.settings.globalTokenName,
            ) || "");
      let p = 10,
        d = await this.validateRepository(t, !0, !0, r, c),
        g = !!d;
      if (
        (g || (d = await this.validateRepository(t, !1, !0, r, c)), d === null)
      ) {
        let h = `${t}
A manifest.json file does not exist in the latest release of the repository. This plugin cannot be installed.`;
        return (await this.plugin.log(h, !0), v(this.plugin, h, p), !1);
      }
      if (!Object.hasOwn(d, "version")) {
        let h = `${t}
The manifest.json file in the latest release or pre-release of the repository does not have a version number in the file. This plugin cannot be installed.`;
        return (await this.plugin.log(h, !0), v(this.plugin, h, p), !1);
      }
      let u = !1;
      if (
        Object.hasOwn(d, "minAppVersion") &&
        !(0, O.requireApiVersion)(d.minAppVersion)
      ) {
        if (
          r === "" ||
          r === "latest" ||
          !this.plugin.settings.allowIncompatiblePlugins
        ) {
          let f = `Plugin: ${t}

The manifest.json for this plugin indicates that the Obsidian version of the app needs to be ${d.minAppVersion}, but this installation of Obsidian is ${O.apiVersion}. 

You will need to update your Obsidian to use this plugin or contact the plugin developer for more information.`;
          return (await this.plugin.log(f, !0), v(this.plugin, f, 30), !1);
        }
        if (
          !(await pt({
            app: this.plugin.app,
            message: createFragment((f) => {
              (f.appendText("插件： "),
                f.createEl("code", { text: t }),
                f.createEl("br"),
                f.appendText("该 "),
                f.createEl("code", { text: "manifest.json" }),
                f.appendText(" 此插件指示应用的 Obsidian 版本需为 "),
                f.createEl("code", { text: d.minAppVersion }),
                f.appendText("但此Obsidian安装是"),
                f.createEl("code", { text: O.apiVersion }),
                f.appendText("."),
                f.createEl("br"),
                f.appendText("不建议使用此插件，可能无法正常工作。风险自负。"),
                f.createEl("br"),
                f.appendText("仍然要安装吗？"));
            }),
          }))
        )
          return !1;
        u = !0;
      }
      let m = async () => {
        var P, L;
        let h = await this.getAllReleaseFiles(t, g, r, c);
        (console.debug("rFiles", h),
          (g || h.manifest === "") && (h.manifest = JSON.stringify(d)));
        let f = JSON.parse((P = h.manifest) != null ? P : "");
        if (
          (u &&
            ((f.brat = {
              isIncompatible: !0,
              minAppVersionOriginal: f.minAppVersion,
            }),
            (f.minAppVersion = O.apiVersion)),
          O.Platform.isMobile && f.isDesktopOnly)
        )
          if (this.plugin.settings.allowIncompatiblePlugins) {
            if (
              !(await pt({
                app: this.plugin.app,
                message: createFragment((I) => {
                  (I.appendText("插件： "),
                    I.createEl("code", { text: t }),
                    I.createEl("br"),
                    I.appendText("该 "),
                    I.createEl("code", { text: "manifest.json" }),
                    I.appendText("对此插件表明该插件有"),
                    I.createEl("code", { text: "isDesktopOnly: true" }),
                    I.appendText("但您正在使用移动设备。"),
                    I.createEl("br"),
                    I.appendText(
                      "不建议使用此插件，可能无法正常工作。风险自负。",
                    ),
                    I.createEl("br"),
                    I.appendText("仍然要在移动设备上强制运行吗？"));
                }),
              }))
            )
              return null;
            ((f.isDesktopOnly = !1),
              (L = f.brat) != null || (f.brat = {}),
              (f.brat.isDesktopOnlyOriginal = !0),
              (f.brat.isIncompatible = !0),
              (u = !0));
          } else {
            let A = `Plugin: ${t}

The manifest.json for this plugin indicates that the plugin has isDesktopOnly: true, but you are using a mobile device.

The plugin will not be installed.`;
            return (await this.plugin.log(A, !0), v(this.plugin, A, 30), null);
          }
        if (
          (u && (h.manifest = JSON.stringify(f)),
          this.plugin.settings.debuggingMode &&
            console.debug("BRAT: rFiles.manifest", g, h),
          h.mainJs === null)
        ) {
          let A = `${t}
The release is not complete and cannot be downloaded. main.js is missing from the Release`;
          return (await this.plugin.log(A, !0), v(this.plugin, A, p), null);
        }
        return h;
      };
      if (!e || o) {
        let h = await m();
        if (h === null) return !1;
        if (
          (await this.writeReleaseFilesToPluginFolder(d.id, h),
          fs(this.plugin, t, r, u, l),
          a)
        ) {
          let { plugins: f } = this.plugin.app,
            P = (0, O.normalizePath)(`${f.getPluginFolder()}/${d.id}`);
          (await f.loadManifest(P), await f.enablePluginAndSave(d.id));
        }
        if ((await this.plugin.app.plugins.loadManifests(), o))
          (await this.reloadPlugin(d.id),
            await this.plugin.log(`${t} reinstalled`, !0),
            v(
              this.plugin,
              `${t}
Plugin has been reinstalled and reloaded with version ${d.version}`,
              p,
            ));
        else {
          let f = r === "" ? "" : ` (version: ${r})`,
            P = `${t}${f}
The plugin has been registered with BRAT.`;
          (a ||
            (P +=
              " You may still need to enable it the Community Plugin List."),
            await this.plugin.log(P, !0),
            v(this.plugin, P, p));
        }
      } else {
        let h = `${this.plugin.app.vault.configDir}/plugins/${d.id}/`,
          f = "";
        try {
          f = await this.plugin.app.vault.adapter.read(`${h}manifest.json`);
        } catch (S) {
          if (S.errno === -4058 || S.errno === -2)
            return (await this.addPlugin(t, !1, g, !1, r, !1, a, l), !0);
          console.error(
            "BRAT - 本地清单加载",
            d.id,
            JSON.stringify(S, null, 2),
          );
        }
        if (r !== "" && r !== "latest")
          return (
            v(this.plugin, `The version of ${t} is frozen, not updating.`, 3),
            !1
          );
        let P = JSON.parse(f),
          L = (0, U.coerce)(P.version, { includePrerelease: !0, loose: !0 }),
          A = (0, U.coerce)(d.version, { includePrerelease: !0, loose: !0 });
        if (
          L && A
            ? (0, U.compare)(L.version, A.version) === -1
            : P.version !== d.version
        ) {
          let S = await m();
          if (S === null) return !1;
          if (i) {
            let z = `There is an update available for ${d.id} from version ${P.version} to ${d.version}. `;
            return (
              await this.plugin.log(
                `${z}[Release Info](https://github.com/${t}/releases/tag/${d.version})`,
                !0,
              ),
              v(this.plugin, z, 30, () => {
                d &&
                  window.open(
                    `https://github.com/${t}/releases/tag/${d.version}`,
                  );
              }),
              !1
            );
          }
          (await this.writeReleaseFilesToPluginFolder(d.id, S),
            await this.plugin.app.plugins.loadManifests(),
            await this.reloadPlugin(d.id));
          let k = `${d.id}
Plugin has been updated from version ${P.version} to ${d.version}. `;
          return (
            await this.plugin.log(
              `${k}[Release Info](https://github.com/${t}/releases/tag/${d.version})`,
              !0,
            ),
            v(this.plugin, k, 30, () => {
              d &&
                window.open(
                  `https://github.com/${t}/releases/tag/${d.version}`,
                );
            }),
            !0
          );
        }
        return (n && v(this.plugin, `No update available for ${t}`, 3), !0);
      }
    } catch (c) {
      console.error(`BRAT: Error adding plugin ${t}:`, {
        error: c,
        updatePluginFiles: e,
        seeIfUpdatedOnly: i,
        specifyVersion: r,
        forceReinstall: o,
      });
      let p = c instanceof Error ? c.message : "Unknown error occurred";
      return (
        await this.plugin.log(
          `Error ${e ? "updating" : "adding"} plugin ${t}: ${p}`,
          !0,
        ),
        !1
      );
    }
    return !0;
  }
  async reloadPlugin(t) {
    let { plugins: e } = this.plugin.app;
    try {
      (await e.disablePlugin(t), await e.enablePlugin(t));
    } catch (i) {
      this.plugin.settings.debuggingMode && console.error("重新加载插件", i);
    }
  }
  async updatePlugin(t, e = !1, i = !1, n = !1, r = "") {
    let o = await this.addPlugin(t, !0, e, i, "", n, !1, r);
    return (
      !o &&
        !e &&
        v(
          this.plugin,
          `${t}
Update of plugin failed.`,
        ),
      o
    );
  }
  async checkForPluginUpdatesAndInstallUpdates(t = !1, e = !1) {
    if (!(await He())) {
      console.debug("BRAT: No internet detected.");
      return;
    }
    let i,
      n = "Checking for plugin updates STARTED";
    (await this.plugin.log(n, !0),
      t &&
        this.plugin.settings.notificationsEnabled &&
        (i = new O.Notice(
          `BRAT
${n}`,
          3e4,
        )));
    let r = new Map(
        this.plugin.settings.pluginSubListFrozenVersion.map((l) => [
          l.repo,
          l.version,
        ]),
      ),
      o = new Map(
        this.plugin.settings.pluginSubListFrozenVersion.map((l) => [
          l.repo,
          l.tokenName || "",
        ]),
      );
    for (let l of this.plugin.settings.pluginList) {
      let c = r.get(l);
      (c && c !== "latest") ||
        (await this.updatePlugin(l, e, !1, !1, o.get(l) || ""));
    }
    let a = "Checking for plugin updates COMPLETED";
    (await this.plugin.log(a, !0),
      t && (i && i.hide(), v(this.plugin, a, 10)),
      await this.checkForOfficiallyReleasedPlugins());
  }
  deletePlugin(t) {
    let e = `Removed ${t} from BRAT plugin list`;
    (this.plugin.log(e, !0),
      (this.plugin.settings.pluginList = this.plugin.settings.pluginList.filter(
        (i) => i !== t,
      )),
      (this.plugin.settings.pluginSubListFrozenVersion =
        this.plugin.settings.pluginSubListFrozenVersion.filter(
          (i) => i.repo !== t,
        )),
      this.plugin.saveSettings());
  }
  getEnabledDisabledPlugins(t) {
    let e = this.plugin.app.plugins,
      i = Object.values(e.manifests),
      n = Object.values(e.plugins).map((r) => r.manifest);
    return t
      ? i.filter((r) => n.find((o) => r.id === o.id))
      : i.filter((r) => !n.find((o) => r.id === o.id));
  }
  checkIncompatiblePlugins() {
    let t = this.plugin.settings.pluginSubListFrozenVersion
      .filter((e) => e.isIncompatible)
      .map((e) => e.repo);
    t.length > 0 &&
      v(
        this.plugin,
        `The following incompatible plugins were forcefully installed by BRAT and may not work as expected:
${t.join(`
`)}`,
        30,
      );
  }
  async getOfficiallyReleasedPlugins() {
    var o;
    let t = await de(this.plugin.settings.debuggingMode);
    if (!t) return [];
    let e = new Set(t.map((a) => a.repo)),
      i = new Map(
        this.plugin.settings.pluginSubListFrozenVersion.map((a) => [
          a.repo,
          a.version,
        ]),
      ),
      n = new Map(
        this.plugin.settings.pluginSubListFrozenVersion.map((a) => [
          a.repo,
          a.tokenName || "",
        ]),
      ),
      r = [];
    for (let a of this.plugin.settings.pluginList) {
      let l = i.get(a);
      if (!(l && l !== "latest") && e.has(a))
        try {
          let c = "",
            p = n.get(a) || "";
          p
            ? (c = this.plugin.app.secretStorage.getSecret(p) || "")
            : this.plugin.settings.globalTokenName &&
              (c =
                this.plugin.app.secretStorage.getSecret(
                  this.plugin.settings.globalTokenName,
                ) || "");
          let d = await Ve(
            a,
            void 0,
            !1,
            this.plugin.settings.debuggingMode,
            !1,
            c || void 0,
          );
          if (!d) continue;
          let g = (o = t.find((f) => f.repo === a)) == null ? void 0 : o.id;
          if (!g) continue;
          let u = this.plugin.app.plugins.manifests[g];
          if (!u) continue;
          let m = (0, U.coerce)(u.version, {
              includePrerelease: !0,
              loose: !0,
            }),
            h = (0, U.coerce)(d.tag_name, { includePrerelease: !0, loose: !0 });
          if (!m || !h) continue;
          (0, U.compare)(h.version, m.version) >= 0 &&
            r.push({
              repo: a,
              installedVersion: u.version,
              stableVersion: d.tag_name,
            });
        } catch (c) {
          this.plugin.settings.debuggingMode &&
            console.debug(`BRAT: Error checking graduation for ${a}:`, c);
        }
    }
    return r;
  }
  async checkForOfficiallyReleasedPlugins() {
    try {
      let t = await this.getOfficiallyReleasedPlugins();
      for (let e of t) {
        let i = `${e.repo} has been officially released (stable: ${e.stableVersion}). You can remove it from BRAT and use Obsidian's built-in updates.`;
        (await this.plugin.log(i, !0),
          v(this.plugin, i, 30, () => {
            window.open(
              `https://github.com/${e.repo}/releases/tag/${e.stableVersion}`,
            );
          }));
      }
    } catch (t) {
      this.plugin.settings.debuggingMode &&
        console.debug(
          "BRAT: Error checking for officially released plugins:",
          t,
        );
    }
  }
};
var Y = require("obsidian");
var fe = async (s, t, e) => {
    let i = R().themeMessages,
      n = await ee(t, !0, s.settings.debuggingMode);
    if ((n || (n = await ee(t, !1, s.settings.debuggingMode)), !n))
      return (v(s, i.noThemeCssFile), !1);
    let r = await ms(t, s.settings.debuggingMode);
    if (!r) return (v(s, i.noManifestFile), !1);
    let o = await JSON.parse(r),
      a = (0, Y.normalizePath)(jo(s) + o.name),
      { adapter: l } = s.app.vault;
    ((await l.exists(a)) || (await l.mkdir(a)),
      await l.write((0, Y.normalizePath)(`${a}/theme.css`), n),
      await l.write((0, Y.normalizePath)(`${a}/manifest.json`), r),
      vs(s, t, pe(n)));
    let c = "";
    return (
      e
        ? (bs(s, t, n),
          (c = i.installed(o.name, t)),
          window.setTimeout(() => {
            s.app.customCss.setTheme(o.name);
          }, 500))
        : (c = i.updated(o.name, t)),
      s.log(`${c}[Theme Info](https://github.com/${t})`, !1),
      v(s, c, 20, () => {
        window.open(`https://github.com/${t}`);
      }),
      !0
    );
  },
  te = async (s, t) => {
    if (!(await He())) {
      console.debug("BRAT: No internet detected.");
      return;
    }
    let e,
      i = "Checking for beta theme updates STARTED";
    (await s.log(i, !0),
      t &&
        s.settings.notificationsEnabled &&
        (e = new Y.Notice(
          `BRAT
${i}`,
          3e4,
        )));
    for (let r of s.settings.themesList) {
      let o = await me(r.repo, !0, s.settings.debuggingMode);
      (o === "0" && (o = await me(r.repo, !1, s.settings.debuggingMode)),
        console.debug("BRAT: lastUpdateOnline", o),
        o !== r.lastUpdate && (await fe(s, r.repo, !1)));
    }
    let n = "Checking for beta theme updates COMPLETED";
    (await s.log(n, !0),
      t && (s.settings.notificationsEnabled && e && e.hide(), v(s, n)));
  },
  be = (s, t) => {
    let e = R().themeMessages;
    ((s.settings.themesList = s.settings.themesList.filter(
      (n) => n.repo !== t,
    )),
      s.saveSettings());
    let i = e.removed(t);
    (s.log(i, !0), v(s, i));
  },
  jo = (s) => `${(0, Y.normalizePath)(`${s.app.vault.configDir}/themes`)}/`;
var Ls = "brat-migrations";
async function zo(s, t) {
  try {
    let e = await s.vault.adapter.read(
      `${s.vault.configDir}/plugins/obsidian42-brat/${Ls}.json`,
    );
    return JSON.parse(e).appliedMigrations.includes(t);
  } catch (e) {
    return !1;
  }
}
async function _o(s, t) {
  try {
    let e = `${s.vault.configDir}/plugins/obsidian42-brat/${Ls}.json`,
      i = { appliedMigrations: [] };
    try {
      let n = await s.vault.adapter.read(e);
      i = JSON.parse(n);
    } catch (n) {}
    i.appliedMigrations.includes(t) ||
      (i.appliedMigrations.push(t),
      await s.vault.adapter.write(e, JSON.stringify(i, null, 2)));
  } catch (e) {
    console.error(`BRAT: Failed to mark migration ${t} complete:`, e);
  }
}
async function As(s, t, e) {
  let i = "tokens-to-secretstorage-v1";
  if (!(await zo(s, i)))
    try {
      let n = 0,
        r = (l) => {
          let p = `brat-gh-${l
            .toLowerCase()
            .replace(/[^a-z0-9-]/g, "-")
            .replace(/-+/g, "-")
            .replace(/^-|-$/g, "")}`;
          return p.length > 64 ? p.substring(0, 64).replace(/-$/, "") : p;
        },
        o = (l) => {
          let c = s.secretStorage.listSecrets();
          for (let p of c) if (s.secretStorage.getSecret(p) === l) return p;
          return null;
        },
        a = (l, c) => {
          let p = o(l);
          return p
            ? (console.debug(`BRAT: Reusing existing secret "${p}"`), p)
            : (s.secretStorage.setSecret(c, l),
              console.debug(`BRAT: Created new secret "${c}"`),
              c);
        };
      if (t.personalAccessToken && t.personalAccessToken.trim() !== "") {
        let l = t.personalAccessToken.trim(),
          p = a(l, "brat-gh-global");
        ((t.globalTokenName = p), (t.personalAccessToken = ""), n++);
      }
      if (t.pluginSubListFrozenVersion) {
        for (let l of t.pluginSubListFrozenVersion)
          if (l.token && l.token.trim() !== "") {
            let c = l.token.trim(),
              p = r(l.repo),
              d = a(c, p);
            ((l.tokenName = d), (l.token = void 0), n++);
          }
      }
      (n > 0 &&
        (await e(),
        console.debug(`BRAT: Migrated ${n} token(s) to SecretStorage`)),
        await _o(s, i));
    } catch (n) {
      console.error("BRAT：迁移令牌到SecretStorage失败：", n);
    }
}
var Z = require("obsidian");
var j = class extends Z.Modal {
  constructor(t, e = !1, i) {
    (super(t.app),
      (this.plugin = t),
      (this.address = ""),
      (this.openSettingsTabAfterwards = e),
      (this.onSubmitted = i));
  }
  async submitForm() {
    var i;
    let t = R();
    if (this.address === "") return;
    let e = this.address.replace("https://github.com/", "");
    if (Ts(this.plugin, e)) {
      v(this.plugin, t.addBetaThemeModal.alreadyInList, 10);
      return;
    }
    (await fe(this.plugin, e, !0)) &&
      ((i = this.onSubmitted) == null || i.call(this), this.close());
  }
  onOpen() {
    let t = R(),
      e = t.common;
    (this.contentEl.createEl("h4", {
      text: t.addBetaThemeModal.heading.githubRepositoryForBetaTheme,
    }),
      this.contentEl.createEl("form", {}, (i) => {
        (i.addClass("brat-modal"),
          new Z.Setting(i).addText((o) => {
            (o.setPlaceholder(t.addBetaPluginModal.repository.placeholder),
              o.setValue(this.address),
              o.onChange((a) => {
                this.address = a.trim();
              }),
              o.inputEl.addEventListener("keydown", (a) => {
                a.key === "Enter" &&
                  this.address !== " " &&
                  (a.preventDefault(), this.submitForm());
              }),
              o.inputEl.addClass("brat-full-width-input"),
              window.setTimeout(() => {
                let a = document.querySelector(".setting-item-info");
                (a && a.remove(), o.inputEl.focus());
              }, 10));
          }),
          i.createDiv("modal-button-container", (o) => {
            (new Z.ButtonComponent(o)
              .setButtonText(t.addBetaPluginModal.buttons.neverMind)
              .onClick(() => {
                this.close();
              }),
              new Z.ButtonComponent(o)
                .setButtonText(t.settings.betaThemeList.addBetaTheme)
                .setCta()
                .onClick((a) => {
                  (a.preventDefault(),
                    console.debug("Add theme button clicked"),
                    this.address !== "" && this.submitForm());
                }));
          }));
        let n = i.createDiv();
        n.addClass("brat-modal-divider");
        let r = n.createSpan();
        (r.createEl("a", {
          href: "https://bit.ly/o42-twitter",
          text: "TFTHacker",
        }),
          r.appendText(e.and),
          r.createEl("a", {
            href: "https://github.com/johannrichard",
            text: "johannrichard",
          }),
          r.addClass("brat-credits"),
          n.appendChild(r),
          Ue(n, !1),
          window.setTimeout(() => {
            let o = i.querySelectorAll(".brat-modal .setting-item-info");
            for (let a of Array.from(o)) a.remove();
          }, 50));
      }));
  }
  onClose() {
    this.openSettingsTabAfterwards &&
      (this.plugin.app.setting.openTab(),
      this.plugin.app.setting.openTabById(this.plugin.APP_ID));
  }
};
var $s = require("obsidian");
function Is() {
  (0, $s.addIcon)(
    "BratIcon",
    '<path fill="currentColor" stroke="currentColor"  d="M 41.667969 41.667969 C 41.667969 39.367188 39.800781 37.5 37.5 37.5 C 35.199219 37.5 33.332031 39.367188 33.332031 41.667969 C 33.332031 43.96875 35.199219 45.832031 37.5 45.832031 C 39.800781 45.832031 41.667969 43.96875 41.667969 41.667969 Z M 60.417969 58.582031 C 59.460938 58.023438 58.320312 57.867188 57.25 58.148438 C 56.179688 58.429688 55.265625 59.125 54.707031 60.082031 C 53.746094 61.777344 51.949219 62.820312 50 62.820312 C 48.050781 62.820312 46.253906 61.777344 45.292969 60.082031 C 44.734375 59.125 43.820312 58.429688 42.75 58.148438 C 41.679688 57.867188 40.539062 58.023438 39.582031 58.582031 C 37.597656 59.726562 36.910156 62.257812 38.042969 64.25 C 40.5 68.53125 45.0625 71.171875 50 71.171875 C 54.9375 71.171875 59.5 68.53125 61.957031 64.25 C 63.089844 62.257812 62.402344 59.726562 60.417969 58.582031 Z M 62.5 37.5 C 60.199219 37.5 58.332031 39.367188 58.332031 41.667969 C 58.332031 43.96875 60.199219 45.832031 62.5 45.832031 C 64.800781 45.832031 66.667969 43.96875 66.667969 41.667969 C 66.667969 39.367188 64.800781 37.5 62.5 37.5 Z M 50 8.332031 C 26.988281 8.332031 8.332031 26.988281 8.332031 50 C 8.332031 73.011719 26.988281 91.667969 50 91.667969 C 73.011719 91.667969 91.667969 73.011719 91.667969 50 C 91.667969 26.988281 73.011719 8.332031 50 8.332031 Z M 50 83.332031 C 33.988281 83.402344 20.191406 72.078125 17.136719 56.363281 C 14.078125 40.644531 22.628906 24.976562 37.5 19.042969 C 37.457031 19.636719 37.457031 20.238281 37.5 20.832031 C 37.5 27.738281 43.097656 33.332031 50 33.332031 C 52.300781 33.332031 54.167969 31.46875 54.167969 29.167969 C 54.167969 26.867188 52.300781 25 50 25 C 47.699219 25 45.832031 23.132812 45.832031 20.832031 C 45.832031 18.53125 47.699219 16.667969 50 16.667969 C 68.410156 16.667969 83.332031 31.589844 83.332031 50 C 83.332031 68.410156 68.410156 83.332031 50 83.332031 Z M 50 83.332031 " />',
  );
}
var ks = require("obsidian"),
  N = class extends ks.FuzzySuggestModal {
    constructor(e) {
      super(e.app);
      this.data = [];
      (this.scope.register(["Shift"], "Enter", (i) => {
        this.enterTrigger(i);
      }),
        this.scope.register(["Ctrl"], "Enter", (i) => {
          this.enterTrigger(i);
        }));
    }
    setSuggesterData(e) {
      this.data = e;
    }
    display(e) {
      ((this.callbackFunction = e), this.open());
    }
    getItems() {
      return this.data;
    }
    getItemText(e) {
      return e.display;
    }
    onChooseItem() {}
    renderSuggestion(e, i) {
      i.createEl("div", { text: e.item.display });
    }
    enterTrigger(e) {
      var r;
      let i =
          (r = document.querySelector(".suggestion-item.is-selected div")) ==
          null
            ? void 0
            : r.textContent,
        n = this.data.find((o) => o.display === i);
      n && (this.invokeCallback(n, e), this.close());
    }
    onChooseSuggestion(e, i) {
      this.invokeCallback(e.item, i);
    }
    invokeCallback(e, i) {
      typeof this.callbackFunction == "function" && this.callbackFunction(e, i);
    }
  };
var Te = class {
  constructor(t) {
    this.bratCommands = [
      {
        id: "AddBetaPlugin",
        icon: "BratIcon",
        name: "插件：添加测试版插件（带或不带版本）",
        showInRibbon: !0,
        callback: () => {
          this.plugin.betaPlugins.displayAddNewPluginModal(!1, !0);
        },
      },
      {
        id: "checkForUpdatesAndUpdate",
        icon: "BratIcon",
        name: "插件：检查所有测试版插件更新并更新",
        showInRibbon: !0,
        callback: async () => {
          await this.plugin.betaPlugins.checkForPluginUpdatesAndInstallUpdates(
            !0,
            !1,
          );
        },
      },
      {
        id: "checkForUpdatesAndDontUpdate",
        icon: "BratIcon",
        name: "插件：仅检查测试版插件更新，不更新",
        showInRibbon: !0,
        callback: async () => {
          await this.plugin.betaPlugins.checkForPluginUpdatesAndInstallUpdates(
            !0,
            !0,
          );
        },
      },
      {
        id: "updateOnePlugin",
        icon: "BratIcon",
        name: "插件：选择单个插件版本更新",
        showInRibbon: !0,
        callback: () => {
          let t = new Map(
              this.plugin.settings.pluginSubListFrozenVersion.map((n) => [
                n.repo,
                { version: n.version, tokenName: n.tokenName },
              ]),
            ),
            e = Object.values(this.plugin.settings.pluginList)
              .filter((n) => {
                let r = t.get(n);
                return !(r != null && r.version) || r.version === "latest";
              })
              .map((n) => ({ display: n, info: n })),
            i = new N(this.plugin);
          (i.setSuggesterData(e),
            i.display((n) => {
              let r = `Checking for updates for ${n.info}`,
                o = t.get(n.info);
              (this.plugin.log(r, !0),
                v(
                  this.plugin,
                  `
${r}`,
                  3,
                ),
                this.plugin.betaPlugins.updatePlugin(
                  n.info,
                  !1,
                  !0,
                  !1,
                  o == null ? void 0 : o.tokenName,
                ));
            }));
        },
      },
      {
        id: "reinstallOnePlugin",
        icon: "BratIcon",
        name: "插件：选择单个插件重装",
        showInRibbon: !0,
        callback: () => {
          let t = new Set(
              this.plugin.settings.pluginSubListFrozenVersion.map(
                (n) => n.repo,
              ),
            ),
            e = Object.values(this.plugin.settings.pluginList)
              .filter((n) => !t.has(n))
              .map((n) => ({ display: n, info: n })),
            i = new N(this.plugin);
          (i.setSuggesterData(e),
            i.display((n) => {
              let r = `Reinstalling ${n.info}`;
              (v(
                this.plugin,
                `
${r}`,
                3,
              ),
                this.plugin.log(r, !0),
                this.plugin.betaPlugins.updatePlugin(n.info, !1, !1, !0));
            }));
        },
      },
      {
        id: "restartPlugin",
        icon: "BratIcon",
        name: "插件：重启已安装插件",
        showInRibbon: !0,
        callback: () => {
          let t = Object.values(this.plugin.app.plugins.manifests).map((i) => ({
              display: i.id,
              info: i.id,
            })),
            e = new N(this.plugin);
          (e.setSuggesterData(t),
            e.display((i) => {
              (v(
                this.plugin,
                `${i.info}
Plugin reloading .....`,
                5,
              ),
                this.plugin.betaPlugins.reloadPlugin(i.info));
            }));
        },
      },
      {
        id: "disablePlugin",
        icon: "BratIcon",
        name: "插件：禁用插件 - 切换关闭",
        showInRibbon: !0,
        callback: () => {
          let t = this.plugin.betaPlugins
              .getEnabledDisabledPlugins(!0)
              .map((i) => ({ display: `${i.name} (${i.id})`, info: i.id })),
            e = new N(this.plugin);
          (e.setSuggesterData(t),
            e.display((i) => {
              (this.plugin.log(`${i.display} plugin disabled`, !1),
                this.plugin.settings.debuggingMode && console.debug(i.info),
                this.plugin.app.plugins.disablePluginAndSave(i.info));
            }));
        },
      },
      {
        id: "enablePlugin",
        icon: "BratIcon",
        name: "插件：启用插件 - 切换开启",
        showInRibbon: !0,
        callback: () => {
          let t = this.plugin.betaPlugins
              .getEnabledDisabledPlugins(!1)
              .map((i) => ({ display: `${i.name} (${i.id})`, info: i.id })),
            e = new N(this.plugin);
          (e.setSuggesterData(t),
            e.display((i) => {
              (this.plugin.log(`${i.display} plugin enabled`, !1),
                this.plugin.app.plugins.enablePluginAndSave(i.info));
            }));
        },
      },
      {
        id: "openGitHubZRepository",
        icon: "BratIcon",
        name: "插件：打开插件GitHub仓库",
        showInRibbon: !0,
        callback: async () => {
          let t = await de(this.plugin.settings.debuggingMode);
          if (t) {
            let e = Object.values(t).map((r) => ({
                display: `Plugin: ${r.name}  (${r.repo})`,
                info: r.repo,
              })),
              i = Object.values(this.plugin.settings.pluginList).map((r) => ({
                display: `BRAT: ${r}`,
                info: r,
              }));
            for (let r of e) i.push(r);
            let n = new N(this.plugin);
            (n.setSuggesterData(i),
              n.display((r) => {
                r.info && window.open(`https://github.com/${r.info}`);
              }));
          }
        },
      },
      {
        id: "openCommunityPagePlugin",
        icon: "BratIcon",
        name: "Plugins: Open the community page for a plugin",
        showInRibbon: !0,
        callback: async () => {
          let t = await de(this.plugin.settings.debuggingMode);
          if (!t) {
            v(
              this.plugin,
              "Could not load the Obsidian community plugin list.",
              5,
            );
            return;
          }
          let e = new Map(t.map((a) => [a.repo, a])),
            i = new Set(),
            n = this.plugin.settings.pluginList
              .map((a) => e.get(a))
              .filter((a) => !!a)
              .map(
                (a) => (
                  i.add(a.id),
                  { display: `BRAT: ${a.name} (${a.id})`, info: a.id }
                ),
              ),
            r = t
              .filter((a) => !i.has(a.id))
              .map((a) => ({
                display: `Plugin: ${a.name} (${a.id})`,
                info: a.id,
              })),
            o = new N(this.plugin);
          (o.setSuggesterData([...n, ...r]),
            o.display((a) => {
              a.info &&
                window.open(
                  `https://obsidian.md/plugins?id=${encodeURIComponent(a.info)}`,
                );
            }));
        },
      },
      {
        id: "openGitHubRepoTheme",
        icon: "BratIcon",
        name: "主题：打开主题GitHub仓库（外观）",
        showInRibbon: !0,
        callback: async () => {
          let t = await ps(this.plugin.settings.debuggingMode);
          if (t) {
            let e = Object.values(t).map((n) => ({
                display: `Theme: ${n.name}  (${n.repo})`,
                info: n.repo,
              })),
              i = new N(this.plugin);
            (i.setSuggesterData(e),
              i.display((n) => {
                n.info && window.open(`https://github.com/${n.info}`);
              }));
          }
        },
      },
      {
        id: "opentPluginSettings",
        icon: "BratIcon",
        name: "插件：打开插件设置标签",
        showInRibbon: !0,
        callback: () => {
          let t = this.plugin.app.setting,
            e = Object.values(t.pluginTabs).map((r) => ({
              display: `Plugin: ${r.name}`,
              info: r.id,
            })),
            i = new N(this.plugin),
            n = Object.values(t.settingTabs).map((r) => ({
              display: `Core: ${r.name}`,
              info: r.id,
            }));
          for (let r of e) n.push(r);
          (i.setSuggesterData(n),
            i.display((r) => {
              (t.open(), t.openTabById(r.info));
            }));
        },
      },
      {
        id: "GrabBetaTheme",
        icon: "BratIcon",
        name: "主题：从GitHub获取测试版主题",
        showInRibbon: !0,
        callback: () => {
          new j(this.plugin).open();
        },
      },
      {
        id: "updateBetaThemes",
        icon: "BratIcon",
        name: "主题：更新测试版主题",
        showInRibbon: !0,
        callback: async () => {
          await te(this.plugin, !0);
        },
      },
      {
        id: "removeGraduatedFromBrat",
        icon: "BratIcon",
        name: "Plugins: Remove a graduated plugin from BRAT (keep installed)",
        showInRibbon: !0,
        callback: async () => {
          let t = await this.plugin.betaPlugins.getOfficiallyReleasedPlugins();
          if (t.length === 0) {
            v(
              this.plugin,
              "No graduated plugins found. All BRAT plugins are still in beta.",
              5,
            );
            return;
          }
          let e = t.map((n) => ({
              display: `${n.repo} (installed: ${n.installedVersion}, stable: ${n.stableVersion})`,
              info: n.repo,
            })),
            i = new N(this.plugin);
          (i.setSuggesterData(e),
            i.display((n) => {
              let r = n.info;
              (this.plugin.betaPlugins.deletePlugin(r),
                this.plugin.settingsTab.update(),
                v(
                  this.plugin,
                  `${r} removed from BRAT. Obsidian will now manage updates via the community plugin list.`,
                  10,
                ));
            }));
        },
      },
      {
        id: "updateGraduatedToStableAndRemove",
        icon: "BratIcon",
        name: "Plugins: Update a graduated plugin to stable release and remove from BRAT",
        showInRibbon: !0,
        callback: async () => {
          let t = await this.plugin.betaPlugins.getOfficiallyReleasedPlugins();
          if (t.length === 0) {
            v(
              this.plugin,
              "No graduated plugins found. All BRAT plugins are still in beta.",
              5,
            );
            return;
          }
          let e = t.map((n) => ({
              display: `${n.repo} (installed: ${n.installedVersion} \u2192 stable: ${n.stableVersion})`,
              info: n.repo,
            })),
            i = new N(this.plugin);
          (i.setSuggesterData(e),
            i.display((n) => {
              (async () => {
                let r = n.info,
                  o = t.find((l) => l.repo === r);
                if (!o) return;
                (await this.plugin.betaPlugins.addPlugin(
                  r,
                  !1,
                  !1,
                  !1,
                  o.stableVersion,
                  !0,
                  !0,
                ))
                  ? (this.plugin.betaPlugins.deletePlugin(r),
                    this.plugin.settingsTab.update(),
                    v(
                      this.plugin,
                      `${r} updated to stable ${o.stableVersion} and removed from BRAT.`,
                      10,
                    ))
                  : v(
                      this.plugin,
                      `Failed to install stable release for ${r}.`,
                      10,
                    );
              })();
            }));
        },
      },
      {
        id: "allCommands",
        icon: "BratIcon",
        name: "所有命令列表",
        showInRibbon: !1,
        callback: () => {
          this.ribbonDisplayCommands();
        },
      },
    ];
    this.plugin = t;
    for (let e of this.bratCommands)
      this.plugin.addCommand({
        id: e.id,
        name: e.name,
        icon: e.icon,
        callback: () => {
          e.callback();
        },
      });
  }
  ribbonDisplayCommands() {
    let t = [];
    for (let o of this.bratCommands)
      o.showInRibbon && t.push({ display: o.name, info: o.callback });
    let e = new N(this.plugin),
      i = this.plugin.app.setting,
      n = Object.values(i.settingTabs).map((o) => ({
        display: `Core: ${o.name}`,
        info: () => {
          (i.open(), i.openTabById(o.id));
        },
      })),
      r = Object.values(i.pluginTabs).map((o) => ({
        display: `Plugin: ${o.name}`,
        info: () => {
          (i.open(), i.openTabById(o.id));
        },
      }));
    t.push({
      display: "---- Core Plugin Settings ----",
      info: () => {
        this.ribbonDisplayCommands();
      },
    });
    for (let o of n) t.push(o);
    t.push({
      display: "---- Plugin Settings ----",
      info: () => {
        this.ribbonDisplayCommands();
      },
    });
    for (let o of r) t.push(o);
    (e.setSuggesterData(t),
      e.display((o) => {
        typeof o.info == "function" && o.info();
      }));
  }
};
var $ = require("obsidian");
var je = class extends $.PluginSettingTab {
  constructor(e, i) {
    super(e, i);
    this.accessTokenSetting = null;
    this.accessTokenButton = null;
    this.plugin = i;
  }
  async copyRepoIdentifier(e) {
    var n;
    if (!e) return;
    let i = R().settings.copyIdentifier;
    try {
      if (!((n = navigator.clipboard) != null && n.writeText))
        throw new Error("Clipboard API unavailable");
      (await navigator.clipboard.writeText(e), v(this.plugin, i.copied(e), 3));
    } catch (r) {
      (console.error("Failed to copy repository identifier", e, r),
        v(this.plugin, i.failed, 5));
    }
  }
  getSettingDefinitions() {
    let e = R().settings;
    return [
      {
        name: e.general.autoEnablePluginsAfterInstallation.name,
        desc: e.general.autoEnablePluginsAfterInstallation.desc,
        control: { type: "toggle", key: "enableAfterInstall" },
      },
      {
        name: e.general.autoUpdatePluginsAtStartup.name,
        desc: e.general.autoUpdatePluginsAtStartup.desc,
        control: { type: "toggle", key: "updateAtStartup" },
      },
      {
        name: e.general.autoUpdateThemesAtStartup.name,
        desc: e.general.autoUpdateThemesAtStartup.desc,
        control: { type: "toggle", key: "updateThemesAtStartup" },
      },
      {
        name: e.general.selectLatestPluginVersionByDefault.name,
        desc: e.general.selectLatestPluginVersionByDefault.desc,
        control: { type: "toggle", key: "selectLatestPluginVersionByDefault" },
      },
      {
        name: e.general.allowIncompatiblePlugins.name,
        desc: e.general.allowIncompatiblePlugins.desc,
        control: { type: "toggle", key: "allowIncompatiblePlugins" },
      },
      this.createPluginListDefinition(),
      this.createThemeListDefinition(),
      {
        type: "group",
        heading: e.monitoring.heading,
        items: [
          {
            name: e.monitoring.enableNotifications.name,
            desc: e.monitoring.enableNotifications.desc,
            control: { type: "toggle", key: "notificationsEnabled" },
          },
          {
            name: e.monitoring.enableLogging.name,
            desc: e.monitoring.enableLogging.desc,
            control: { type: "toggle", key: "loggingEnabled" },
          },
          {
            name: e.monitoring.bratLogFileLocation.name,
            desc: e.monitoring.bratLogFileLocation.desc,
            control: {
              type: "text",
              key: "loggingPath",
              placeholder: e.monitoring.bratLogFileLocation.placeholder,
            },
          },
          {
            name: e.monitoring.enableVerboseLogging.name,
            desc: e.monitoring.enableVerboseLogging.desc,
            control: { type: "toggle", key: "loggingVerboseEnabled" },
          },
          {
            name: e.monitoring.debuggingMode.name,
            desc: e.monitoring.debuggingMode.desc,
            control: { type: "toggle", key: "debuggingMode" },
          },
        ],
      },
      {
        type: "group",
        heading: e.githubPersonalAccessToken.heading,
        items: [
          {
            name: e.githubPersonalAccessToken.personalAccessToken.name,
            desc: bt({
              prependText:
                e.githubPersonalAccessToken.personalAccessToken.desc
                  .prependText,
              url: "https://github.com/settings/tokens/new?scopes=public_repo",
              text: e.githubPersonalAccessToken.personalAccessToken.desc
                .linkText,
              appendText:
                e.githubPersonalAccessToken.personalAccessToken.desc.appendText,
            }),
            render: (i) => this.renderPersonalAccessTokenSetting(i),
          },
        ],
      },
    ];
  }
  display() {
    let { containerEl: e } = this;
    (e.empty(), e.addClass("brat-settings"));
    let i = R().settings;
    (new $.Setting(e)
      .setName(i.general.autoEnablePluginsAfterInstallation.name)
      .setDesc(i.general.autoEnablePluginsAfterInstallation.desc)
      .addToggle((g) => {
        g.setValue(this.plugin.settings.enableAfterInstall).onChange(
          async (u) => {
            ((this.plugin.settings.enableAfterInstall = u),
              await this.plugin.saveSettings());
          },
        );
      }),
      new $.Setting(e)
        .setName(i.general.autoUpdatePluginsAtStartup.name)
        .setDesc(i.general.autoUpdatePluginsAtStartup.desc)
        .addToggle((g) => {
          g.setValue(this.plugin.settings.updateAtStartup).onChange(
            async (u) => {
              ((this.plugin.settings.updateAtStartup = u),
                await this.plugin.saveSettings());
            },
          );
        }),
      new $.Setting(e)
        .setName(i.general.autoUpdateThemesAtStartup.name)
        .setDesc(i.general.autoUpdateThemesAtStartup.desc)
        .addToggle((g) => {
          g.setValue(this.plugin.settings.updateThemesAtStartup).onChange(
            async (u) => {
              ((this.plugin.settings.updateThemesAtStartup = u),
                await this.plugin.saveSettings());
            },
          );
        }),
      new $.Setting(e)
        .setName(i.general.selectLatestPluginVersionByDefault.name)
        .setDesc(i.general.selectLatestPluginVersionByDefault.desc)
        .addToggle((g) => {
          g.setValue(
            this.plugin.settings.selectLatestPluginVersionByDefault,
          ).onChange(async (u) => {
            ((this.plugin.settings.selectLatestPluginVersionByDefault = u),
              await this.plugin.saveSettings());
          });
        }),
      new $.Setting(e)
        .setName(i.general.allowIncompatiblePlugins.name)
        .setDesc(i.general.allowIncompatiblePlugins.desc)
        .addToggle((g) => {
          g.setValue(this.plugin.settings.allowIncompatiblePlugins).onChange(
            async (u) => {
              ((this.plugin.settings.allowIncompatiblePlugins = u),
                await this.plugin.saveSettings());
            },
          );
        }));
    let n = new Map(
        this.plugin.settings.pluginSubListFrozenVersion.map((g) => [g.repo, g]),
      ),
      r = new Map(),
      o = new $.SettingGroup(e).setHeading(i.betaPluginList.heading);
    (o.addSearch((g) => {
      (g.setPlaceholder(i.betaPluginList.filterPlaceholder),
        g.onChange((u) => {
          let m = u.toLowerCase().trim();
          r.forEach(({ container: h, pluginName: f }) => {
            m === "" || f.includes(m)
              ? h.removeAttribute("hidden")
              : h.setAttribute("hidden", "true");
          });
        }));
    }),
      o.addSetting((g) => {
        (g.setDesc(this.createPluginListDescriptionFragment()),
          g.addButton((u) => {
            u.setButtonText(i.betaPluginList.addBetaPlugin)
              .setCta()
              .onClick(() => {
                this.plugin.betaPlugins.displayAddNewPluginModal(!0);
              });
          }));
      }));
    for (let g of this.plugin.settings.pluginList) {
      let u = n.get(g);
      o.addSetting((m) => {
        let h = (u == null ? void 0 : u.tokenName) || "",
          f = h ? this.plugin.app.secretStorage.getSecret(h) : "",
          P = !!(h && !f),
          L = document.createDocumentFragment(),
          A =
            u != null && u.version
              ? i.betaPluginList.trackedVersion(
                  u.version,
                  u.version !== "latest",
                )
              : "",
          I =
            u != null && u.isIncompatible ? i.betaPluginList.incompatible : "";
        (L.createDiv({ text: `${A}${I}` }),
          P &&
            L.createDiv({
              text: i.betaPluginList.secretMissing(h),
              cls: "mod-warning",
              title: i.betaPluginList.secretMissingTitle,
            }),
          m.setName(W(g)).setDesc(L));
        let S = m.settingEl;
        (S.addClass("brat-plugin-item"),
          r.set(g, { container: S, pluginName: g.toLowerCase() }),
          m.addExtraButton((k) => {
            k.setIcon("copy")
              .setTooltip(i.betaPluginList.copyPluginIdentifier)
              .onClick(async () => {
                await this.copyRepoIdentifier(g);
              });
          }),
          (!(u != null && u.version) || u.version === "latest") &&
            m.addButton((k) => {
              P
                ? k
                    .setIcon("sync")
                    .setTooltip(i.betaPluginList.secretMissingTooltip(h))
                    .setWarning()
                    .setDisabled(!0)
                : k
                    .setIcon("sync")
                    .setTooltip(i.betaPluginList.checkAndUpdatePlugin)
                    .onClick(async () => {
                      await this.plugin.betaPlugins.updatePlugin(
                        g,
                        !1,
                        !0,
                        !1,
                        (u == null ? void 0 : u.tokenName) || "",
                      );
                    });
            }),
          m
            .addButton((k) => {
              (k
                .setIcon("edit")
                .setTooltip(i.betaPluginList.changeVersionAndUpdateSettings),
                P && k.setWarning(),
                k.onClick(() => {
                  (this.plugin.betaPlugins.displayAddNewPluginModal(
                    !0,
                    !0,
                    g,
                    u == null ? void 0 : u.version,
                    (u == null ? void 0 : u.tokenName) || "",
                  ),
                    this.plugin.app.setting.updatePluginSection());
                }));
            })
            .addButton((k) => {
              k.setIcon("cross")
                .setTooltip(i.betaPluginList.removeThisBetaPlugin)
                .setWarning()
                .onClick(() => {
                  if (k.buttonEl.textContent === "")
                    k.setButtonText(i.betaPluginList.confirmRemoval);
                  else {
                    let { buttonEl: z } = k,
                      { parentElement: Pe } = z;
                    Pe != null &&
                      Pe.parentElement &&
                      (Pe.parentElement.remove(),
                      this.plugin.betaPlugins.deletePlugin(g));
                  }
                });
            }));
      });
    }
    let a = new Map(),
      l = new $.SettingGroup(e).setHeading(i.betaThemeList.heading);
    (l.addSetting((g) => {
      g.addButton((u) => {
        u.setButtonText(i.betaThemeList.addBetaTheme)
          .setCta()
          .onClick(() => {
            (this.plugin.app.setting.close(), new j(this.plugin).open());
          });
      });
    }),
      l.addSearch((g) => {
        (g.setPlaceholder(i.betaThemeList.filterPlaceholder),
          g.onChange((u) => {
            let m = u.toLowerCase().trim();
            a.forEach(({ container: h, themeName: f }) => {
              m === "" || f.includes(m)
                ? h.removeAttribute("hidden")
                : h.setAttribute("hidden", "true");
            });
          }));
      }));
    for (let g of this.plugin.settings.themesList)
      l.addSetting((u) => {
        u.setName(W(g.repo));
        let m = u.settingEl;
        (m.addClass("brat-theme-item"),
          a.set(g.repo, { container: m, themeName: g.repo.toLowerCase() }),
          u.addExtraButton((h) => {
            h.setIcon("copy")
              .setTooltip(i.betaThemeList.copyThemeIdentifier)
              .onClick(async () => {
                await this.copyRepoIdentifier(g.repo);
              });
          }),
          u.addButton((h) => {
            h.setIcon("cross")
              .setTooltip(i.betaThemeList.deleteThisBetaTheme)
              .onClick(() => {
                if (h.buttonEl.textContent === "")
                  h.setButtonText(i.betaThemeList.confirmRemoval);
                else {
                  let { buttonEl: f } = h,
                    { parentElement: P } = f;
                  P != null &&
                    P.parentElement &&
                    (P.parentElement.remove(), be(this.plugin, g.repo));
                }
              });
          }));
      });
    let c = new $.SettingGroup(e).setHeading(i.monitoring.heading);
    (c.addSetting((g) => {
      g.setName(i.monitoring.enableNotifications.name)
        .setDesc(i.monitoring.enableNotifications.desc)
        .addToggle((u) => {
          (u.setValue(this.plugin.settings.notificationsEnabled),
            u.onChange((m) => {
              ((this.plugin.settings.notificationsEnabled = m),
                this.plugin.saveSettings());
            }));
        });
    }),
      c.addSetting((g) => {
        g.setName(i.monitoring.enableLogging.name)
          .setDesc(i.monitoring.enableLogging.desc)
          .addToggle((u) => {
            u.setValue(this.plugin.settings.loggingEnabled).onChange((m) => {
              ((this.plugin.settings.loggingEnabled = m),
                this.plugin.saveSettings());
            });
          });
      }),
      c.addSetting((g) => {
        g.setName(i.monitoring.bratLogFileLocation.name)
          .setDesc(i.monitoring.bratLogFileLocation.desc)
          .addSearch((u) => {
            u.setPlaceholder(i.monitoring.bratLogFileLocation.placeholder)
              .setValue(this.plugin.settings.loggingPath)
              .onChange((m) => {
                ((this.plugin.settings.loggingPath = m),
                  this.plugin.saveSettings());
              });
          });
      }),
      c.addSetting((g) => {
        g.setName(i.monitoring.enableVerboseLogging.name)
          .setDesc(i.monitoring.enableVerboseLogging.desc)
          .addToggle((u) => {
            u.setValue(this.plugin.settings.loggingVerboseEnabled).onChange(
              (m) => {
                ((this.plugin.settings.loggingVerboseEnabled = m),
                  this.plugin.saveSettings());
              },
            );
          });
      }),
      c.addSetting((g) => {
        g.setName(i.monitoring.debuggingMode.name)
          .setDesc(i.monitoring.debuggingMode.desc)
          .addToggle((u) => {
            u.setValue(this.plugin.settings.debuggingMode).onChange((m) => {
              ((this.plugin.settings.debuggingMode = m),
                this.plugin.saveSettings());
            });
          });
      }));
    let p = new $.SettingGroup(e).setHeading(
        i.githubPersonalAccessToken.heading,
      ),
      d = "";
    p.addSetting((g) => {
      (g
        .setName(i.githubPersonalAccessToken.personalAccessToken.name)
        .setDesc(
          bt({
            prependText:
              i.githubPersonalAccessToken.personalAccessToken.desc.prependText,
            url: "https://github.com/settings/tokens/new?scopes=public_repo",
            text: i.githubPersonalAccessToken.personalAccessToken.desc.linkText,
            appendText:
              i.githubPersonalAccessToken.personalAccessToken.desc.appendText,
          }),
        ),
        (this.accessTokenSetting = new $.SecretComponent(
          this.plugin.app,
          g.controlEl,
        )),
        this.accessTokenSetting
          .setValue(this.plugin.settings.globalTokenName || "")
          .onChange((u) => {
            (async () => {
              let m = (u == null ? void 0 : u.trim()) || "";
              ((this.plugin.settings.globalTokenName = m),
                await this.plugin.saveSettings(),
                m
                  ? ((d = this.plugin.app.secretStorage.getSecret(m) || ""),
                    await this.validateGlobalTokenAndUpdateButton(d))
                  : ((d = ""),
                    await this.validateGlobalTokenAndUpdateButton("")));
            })();
          }),
        this.plugin.settings.globalTokenName &&
          (d =
            this.plugin.app.secretStorage.getSecret(
              this.plugin.settings.globalTokenName,
            ) || ""),
        g
          .addExtraButton((u) => {
            u.setIcon("cross")
              .setTooltip(i.githubPersonalAccessToken.clearPersonalAccessToken)
              .onClick(async () => {
                var m;
                ((this.plugin.settings.globalTokenName = ""),
                  await this.plugin.saveSettings(),
                  (m = this.accessTokenSetting) == null || m.setValue(""),
                  (d = ""),
                  await this.validateGlobalTokenAndUpdateButton(""));
              });
          })
          .addButton((u) => {
            ((this.accessTokenButton = u),
              u
                .setButtonText(i.githubPersonalAccessToken.validate)
                .setCta()
                .onClick(async () => {
                  d && (await this.validateGlobalTokenAndUpdateButton(d));
                }));
          })
          .then(() => {
            this.validateGlobalTokenAndUpdateButton(d);
          }));
    });
  }
  createPluginListDefinition() {
    let e = R().settings,
      i = new Map(
        this.plugin.settings.pluginSubListFrozenVersion.map((n) => [n.repo, n]),
      );
    return {
      type: "list",
      heading: e.betaPluginList.heading,
      search: this.createListSearch(e.betaPluginList.filterPlaceholder),
      addItem: {
        name: e.betaPluginList.addBetaPlugin,
        action: () => {
          this.plugin.betaPlugins.displayAddNewPluginModal(
            !0,
            !1,
            "",
            "",
            "",
            () => this.update(),
          );
        },
      },
      items: [
        this.createPluginListDescriptionItem(),
        ...this.plugin.settings.pluginList.map((n) => {
          let r = i.get(n);
          return {
            name: n,
            desc: this.createTrackedPluginDescriptionText(r),
            render: (o) => {
              this.renderTrackedPluginSetting(o, n, r);
            },
          };
        }),
      ],
    };
  }
  createThemeListDefinition() {
    let e = R().settings;
    return {
      type: "list",
      heading: e.betaThemeList.heading,
      search: this.createListSearch(e.betaThemeList.filterPlaceholder),
      addItem: {
        name: e.betaThemeList.addBetaTheme,
        action: () => {
          (this.plugin.app.setting.close(),
            new j(this.plugin, !0, () => this.update()).open());
        },
      },
      items: this.plugin.settings.themesList.map((i) => ({
        name: i.repo,
        render: (n) => {
          this.renderTrackedThemeSetting(n, i);
        },
      })),
    };
  }
  createPluginListDescriptionItem() {
    let e =
      "https://github.com/TfTHacker/obsidian42-brat/blob/main/BRAT-DEVELOPER-GUIDE.md#managing-beta-plugin-and-theme-lists-in-settings";
    return {
      name: "",
      searchable: !1,
      render: (i) => {
        i.settingEl.empty();
        let n = i.settingEl.createDiv();
        (n.createSpan({
          text: R().settings.betaPluginList.description.editAndRemove,
        }),
          n.appendText(" "),
          n.createEl("a", { href: e, text: "Learn more" }));
      },
    };
  }
  createPluginListDescriptionFragment() {
    let e =
        "https://github.com/TfTHacker/obsidian42-brat/blob/main/BRAT-DEVELOPER-GUIDE.md#managing-beta-plugin-and-theme-lists-in-settings",
      i = R().settings.betaPluginList.description,
      n = document.createDocumentFragment(),
      r = n.createEl("div");
    return (
      r.createSpan({ text: i.editAndRemove }),
      r.appendText(" "),
      r.createEl("a", { href: e, text: "Learn more" }),
      n
    );
  }
  createTrackedPluginDescriptionFragment(e) {
    let i = R().settings.betaPluginList,
      n = (e == null ? void 0 : e.tokenName) || "",
      r = n ? this.plugin.app.secretStorage.getSecret(n) : "",
      o = !!(n && !r),
      a = document.createDocumentFragment(),
      l =
        e != null && e.version
          ? i.trackedVersion(e.version, e.version !== "latest")
          : "",
      c = e != null && e.isIncompatible ? i.incompatible : "";
    return (
      a.createDiv({ text: `${l}${c}` }),
      o &&
        a.createDiv({
          text: i.secretMissing(n),
          cls: "mod-warning",
          title: i.secretMissingTitle,
        }),
      a
    );
  }
  createTrackedPluginDescriptionText(e) {
    let i = R().settings.betaPluginList,
      n =
        e != null && e.version
          ? i.trackedVersion(e.version, e.version !== "latest")
          : "",
      r = e != null && e.isIncompatible ? i.incompatible : "",
      o = (e == null ? void 0 : e.tokenName) || "",
      a = o ? this.plugin.app.secretStorage.getSecret(o) : "",
      l = o && !a ? i.secretMissing(o) : "";
    return `${n}${r}${l}`.trim();
  }
  renderTrackedPluginSetting(e, i, n) {
    let r = R().settings.betaPluginList,
      o = (n == null ? void 0 : n.tokenName) || "",
      a = o ? this.plugin.app.secretStorage.getSecret(o) : "",
      l = !!(o && !a);
    (e.setName(W(i)).setDesc(this.createTrackedPluginDescriptionFragment(n)),
      e.settingEl.addClass("brat-plugin-item"),
      e.addExtraButton((c) => {
        c.setIcon("copy")
          .setTooltip(r.copyPluginIdentifier)
          .onClick(async () => {
            await this.copyRepoIdentifier(i);
          });
      }),
      (!(n != null && n.version) || n.version === "latest") &&
        e.addButton((c) => {
          l
            ? c
                .setIcon("sync")
                .setTooltip(r.secretMissingTooltip(o))
                .setWarning()
                .setDisabled(!0)
            : c
                .setIcon("sync")
                .setTooltip(r.checkAndUpdatePlugin)
                .onClick(async () => {
                  await this.plugin.betaPlugins.updatePlugin(
                    i,
                    !1,
                    !0,
                    !1,
                    (n == null ? void 0 : n.tokenName) || "",
                  );
                });
        }),
      e.addButton((c) => {
        (c.setIcon("edit").setTooltip(r.changeVersionAndUpdateSettings),
          l && c.setWarning(),
          c.onClick(() => {
            this.plugin.betaPlugins.displayAddNewPluginModal(
              !0,
              !0,
              i,
              n == null ? void 0 : n.version,
              (n == null ? void 0 : n.tokenName) || "",
              () => this.update(),
            );
          }));
      }),
      e.addButton((c) => {
        c.setIcon("cross")
          .setTooltip(r.removeThisBetaPlugin)
          .setWarning()
          .onClick(() => {
            c.buttonEl.textContent === ""
              ? c.setButtonText(r.confirmRemoval)
              : (this.plugin.betaPlugins.deletePlugin(i), this.update());
          });
      }));
  }
  renderTrackedThemeSetting(e, i) {
    let n = R().settings.betaThemeList;
    (e.setName(W(i.repo)),
      e.settingEl.addClass("brat-theme-item"),
      e.addExtraButton((r) => {
        r.setIcon("copy")
          .setTooltip(n.copyThemeIdentifier)
          .onClick(async () => {
            await this.copyRepoIdentifier(i.repo);
          });
      }),
      e.addButton((r) => {
        r.setIcon("cross")
          .setTooltip(n.deleteThisBetaTheme)
          .setWarning()
          .onClick(() => {
            r.buttonEl.textContent === ""
              ? r.setButtonText(n.confirmRemoval)
              : (be(this.plugin, i.repo), this.update());
          });
      }));
  }
  renderPersonalAccessTokenSetting(e) {
    let i = R().settings.githubPersonalAccessToken,
      n = "";
    return (
      (this.accessTokenSetting = new $.SecretComponent(
        this.plugin.app,
        e.controlEl,
      )),
      this.accessTokenSetting
        .setValue(this.plugin.settings.globalTokenName || "")
        .onChange((r) => {
          (async () => {
            let o = (r == null ? void 0 : r.trim()) || "";
            ((this.plugin.settings.globalTokenName = o),
              await this.plugin.saveSettings(),
              o
                ? ((n = this.plugin.app.secretStorage.getSecret(o) || ""),
                  await this.validateGlobalTokenAndUpdateButton(n))
                : ((n = ""),
                  await this.validateGlobalTokenAndUpdateButton("")));
          })();
        }),
      this.plugin.settings.globalTokenName &&
        (n =
          this.plugin.app.secretStorage.getSecret(
            this.plugin.settings.globalTokenName,
          ) || ""),
      e
        .addExtraButton((r) => {
          r.setIcon("cross")
            .setTooltip(i.clearPersonalAccessToken)
            .onClick(async () => {
              var o;
              ((this.plugin.settings.globalTokenName = ""),
                await this.plugin.saveSettings(),
                (o = this.accessTokenSetting) == null || o.setValue(""),
                (n = ""),
                await this.validateGlobalTokenAndUpdateButton(""));
            });
        })
        .addButton((r) => {
          ((this.accessTokenButton = r),
            r
              .setButtonText(i.validate)
              .setCta()
              .onClick(async () => {
                n && (await this.validateGlobalTokenAndUpdateButton(n));
              }));
        })
        .then(() => {
          this.validateGlobalTokenAndUpdateButton(n);
        }),
      () => {
        ((this.accessTokenSetting = null), (this.accessTokenButton = null));
      }
    );
  }
  createListSearch(e) {
    if ((0, $.requireApiVersion)("1.13.1"))
      return {
        placeholder: e,
        match: (i, n) => {
          var l;
          let r = n.toLowerCase().trim();
          if (r === "") return !0;
          let o =
            typeof i.desc == "string"
              ? i.desc
              : ((l = i.desc) == null ? void 0 : l.textContent) || "";
          return [i.name, o, ...(i.aliases || [])]
            .join(" ")
            .toLowerCase()
            .includes(r);
        },
      };
  }
  async validateGlobalTokenAndUpdateButton(e) {
    if (!this.accessTokenButton) return !1;
    let i = R(),
      n = this.accessTokenButton;
    if ((n.buttonEl.removeClass("mod-warning"), n.setTooltip(""), !e))
      return (
        n.setButtonText(i.settings.githubPersonalAccessToken.validate),
        n.setDisabled(!0),
        !1
      );
    try {
      let r = await Ne(e);
      return r.validToken
        ? (n.setButtonText(i.addBetaPluginModal.buttons.valid).setCta(),
          n.setDisabled(!0),
          n.setTooltip(this.buildTokenValidationTooltip(r)),
          !0)
        : (n.setButtonText(i.addBetaPluginModal.buttons.invalid),
          n.buttonEl.addClass("mod-warning"),
          n.setDisabled(!1),
          n.setTooltip(r.error.message),
          !1);
    } catch (r) {
      return (
        console.error("令牌验证错误：", r),
        n.setButtonText(i.addBetaPluginModal.buttons.invalid),
        n.buttonEl.addClass("mod-warning"),
        n.setDisabled(!1),
        n.setTooltip("令牌验证失败"),
        !1
      );
    }
  }
  buildTokenValidationTooltip(e) {
    var n;
    let i = [];
    return (
      (n = e.currentScopes) != null &&
        n.length &&
        i.push(`Scopes: ${e.currentScopes.join(", ")}`),
      e.rateLimit &&
        i.push(`Rate Limit: ${e.rateLimit.remaining}/${e.rateLimit.limit}`),
      i.join(`
`)
    );
  }
};
var ve = class {
  constructor(t) {
    this.console = (t, ...e) => {
      console.debug(`BRAT: ${t}`, ...e);
    };
    this.themes = {
      themeseCheckAndUpates: async (t) => {
        await te(this.plugin, t);
      },
      themeInstallTheme: async (t) => {
        let e = t.replace("https://github.com/", "");
        await fe(this.plugin, e, !0);
      },
      themesDelete: (t) => {
        let e = t.replace("https://github.com/", "");
        be(this.plugin, e);
      },
      grabCommmunityThemeCssFile: async (t, e = !1) =>
        await ee(t, e, this.plugin.settings.debuggingMode),
      grabChecksumOfThemeCssFile: async (t, e = !1) =>
        await me(t, e, this.plugin.settings.debuggingMode),
      grabLastCommitDateForFile: async (t, e) => await hs(t, e),
    };
    this.plugin = t;
  }
};
var J = require("obsidian"),
  xs = "YYYY-MM-DD";
function Xo(s) {
  var n, r, o, a, l;
  let t = s.app.plugins.getPlugin("periodic-notes"),
    e = (n = t == null ? void 0 : t.settings) == null ? void 0 : n.daily;
  if (e != null && e.enabled) return (r = e.format) != null ? r : xs;
  let i = s.app.internalPlugins.getPluginById("daily-notes");
  return (l =
    (a = (o = i == null ? void 0 : i.instance) == null ? void 0 : o.options) ==
    null
      ? void 0
      : a.format) != null
    ? l
    : xs;
}
async function Bs(s, t, e = !1) {
  if (
    (s.settings.debuggingMode && console.debug(`BRAT: ${t}`),
    s.settings.loggingEnabled)
  ) {
    if (!s.settings.loggingVerboseEnabled && e) return;
    let i = `${s.settings.loggingPath}.md`,
      n = J.moment.unix(Math.floor(Date.now() / 1e3)),
      r = `[[${n.format(Xo(s)).toString()}]] ${n.format("HH:mm")}`,
      o = J.Platform.isDesktop ? window.require("os") : null,
      a = J.Platform.isDesktop ? (o == null ? void 0 : o.hostname()) : "MOBILE",
      l = `${r} ${a} ${t.replace(
        `
`,
        " ",
      )}
`,
      c = s.app.vault.getAbstractFileByPath(i);
    c instanceof J.TFile
      ? await s.app.vault.append(c, l)
      : await s.app.vault.create(i, l);
  }
}
var ze = class extends Cs.Plugin {
  constructor() {
    super(...arguments);
    this.APP_NAME = "BRAT";
    this.APP_ID = "obsidian42-brat";
    this.settings = ht;
    this.settingsTab = new je(this.app, this);
    this.betaPlugins = new he(this);
    this.commands = new Te(this);
    this.bratApi = new ve(this);
    this.obsidianProtocolHandler = (e) => {
      if (!e.plugin && !e.theme) {
        v(this, "Could not locate the repository from the URL.", 10);
        return;
      }
      for (let i of ["plugin", "theme"])
        if (e[i]) {
          let n;
          switch (i) {
            case "plugin":
              ((n = new K(
                this,
                this.betaPlugins,
                !0,
                !1,
                e[i],
                e.version ? e.version : void 0,
              )),
                n.open());
              break;
            case "theme":
              ((n = new j(this)), (n.address = e[i]), n.open());
              break;
          }
          return;
        }
    };
  }
  onload() {
    (console.debug(`loading ${this.APP_NAME}`),
      Is(),
      this.addRibbonIcon("BratIcon", "BRAT", () => {
        this.commands.ribbonDisplayCommands();
      }),
      this.loadSettings()
        .then(async () => {
          (await As(this.app, this.settings, () => this.saveSettings()),
            this.app.workspace.onLayoutReady(() => {
              (this.addSettingTab(this.settingsTab),
                this.registerObsidianProtocolHandler(
                  "brat",
                  this.obsidianProtocolHandler,
                ),
                this.betaPlugins.checkIncompatiblePlugins(),
                this.settings.updateAtStartup &&
                  window.setTimeout(() => {
                    this.betaPlugins.checkForPluginUpdatesAndInstallUpdates(!1);
                  }, 6e4),
                this.settings.updateThemesAtStartup &&
                  window.setTimeout(() => {
                    te(this, !1);
                  }, 12e4),
                window.setTimeout(() => {
                  window.bratAPI = this.bratApi;
                }, 500));
            }));
        })
        .catch((e) => {
          console.error("加载设置失败：", e);
        }));
  }
  async log(e, i = !1) {
    await Bs(this, e, i);
  }
  onunload() {
    console.debug(`unloading ${this.APP_NAME}`);
  }
  async loadSettings() {
    let e = await this.loadData();
    this.settings = Object.assign({}, ht, e != null ? e : {});
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
