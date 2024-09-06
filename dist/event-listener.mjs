const e = {}, f = (t) => {
  const { type: c, currentTarget: i } = t;
  [...e[c]].forEach(([n, s]) => {
    /* istanbul ignore else @preserve */
    i === n && [...s].forEach(([o, a]) => {
      o.apply(n, [t]), typeof a == "object" && a.once && r(n, c, o, a);
    });
  });
}, E = (t, c, i, n) => {
  /* istanbul ignore else @preserve */
  e[c] || (e[c] = /* @__PURE__ */ new Map());
  const s = e[c];
  /* istanbul ignore else @preserve */
  s.has(t) || s.set(t, /* @__PURE__ */ new Map());
  const o = s.get(t), { size: a } = o;
  o.set(i, n);
  /* istanbul ignore else @preserve */
  a || t.addEventListener(c, f, n);
}, r = (t, c, i, n) => {
  const s = e[c], o = s && s.get(t), a = o && o.get(i), d = a !== void 0 ? a : n;
  /* istanbul ignore else @preserve */
  o && o.has(i) && o.delete(i);
  /* istanbul ignore else @preserve */
  s && (!o || !o.size) && s.delete(t);
  /* istanbul ignore else @preserve */
  (!s || !s.size) && delete e[c];
  /* istanbul ignore else @preserve */
  (!o || !o.size) && t.removeEventListener(
    c,
    f,
    d
  );
}, g = E, M = r;
export {
  E as addListener,
  f as globalListener,
  M as off,
  g as on,
  e as registry,
  r as removeListener
};
//# sourceMappingURL=event-listener.mjs.map
