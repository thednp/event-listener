const e = {}, r = (s) => {
  const { type: c, target: n, currentTarget: i } = s;
  [...e[c]].forEach(([t, o]) => {
    [i, n].includes(t) && [...o].forEach(([a, f]) => {
      a.apply(t, [s]), typeof f == "object" && f.once && d(t, c, a, f);
    });
  });
}, E = (s, c, n, i) => {
  e[c] || (e[c] = /* @__PURE__ */ new Map());
  const t = e[c];
  t.has(s) || t.set(s, /* @__PURE__ */ new Map());
  const o = t.get(s), { size: a } = o;
  o.set(n, i), a || s.addEventListener(c, r, i);
}, d = (s, c, n, i) => {
  const t = e[c], o = t && t.get(s), a = o && o.get(n), f = a !== void 0 ? a : i;
  o && o.has(n) && o.delete(n), t && (!o || !o.size) && t.delete(s), (!t || !t.size) && delete e[c], (!o || !o.size) && s.removeEventListener(c, r, f);
}, g = E, M = d;
export {
  E as addListener,
  r as globalListener,
  M as off,
  g as on,
  e as registry,
  d as removeListener
};
//# sourceMappingURL=event-listener.mjs.map
