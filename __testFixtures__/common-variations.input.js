import idx from "idx";

let a = idx(a, _ => _.b);
let b = idx(a, _ => _.b.c);
let c = idx(a, _ => _.b.c.d);
let d = idx(a, _ => _[0][1][2]);
let e = idx(a, _ => _.b[0].c[variable]);
let f = idx(a.b, _ => _.c.d);
let g = idx(a.b.c, _ => _.d.e.f);
