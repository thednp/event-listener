const c = {}, r = (o) => {
  const { type: e, target: n, currentTarget: i } = o;
  [...c[e]].forEach(([t, s]) => {
    [i, n].includes(t) && [...s].forEach(([a, f]) => {
      a.apply(t, [o]), typeof f == "object" && f.once && d(t, e, a, f);
    });
  });
}, g = (o, e, n, i) => {
  c[e] || (c[e] = /* @__PURE__ */ new Map());
  const t = c[e];
  t.has(o) || t.set(o, /* @__PURE__ */ new Map());
  const s = t.get(o), { size: a } = s;
  s.set(n, i), a || o.addEventListener(e, r, i);
}, d = (o, e, n, i) => {
  const t = c[e], s = t && t.get(o), a = s && s.get(n), f = a !== void 0 ? a : i;
  s && s.has(n) && s.delete(n), t && (!s || !s.size) && t.delete(o), (!t || !t.size) && delete c[e], (!s || !s.size) && o.removeEventListener(e, r, f);
}, E = {
  on: g,
  off: d,
  globalListener: r,
  registry: c
};
export {
  E as default
};
//# sourceMappingURL=event-listener.mjs.map
