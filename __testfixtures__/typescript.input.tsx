import idx from "idx";

idx(a, _ => _.b);

idx(a, _ => _.b.c);

idx(a, _ => _.b.c.d);

idx(a, _ => _[0][1][2]);

idx(a, _ => _.b[0].c[variable]);

idx(a.b, _ => _.c.d);

idx(a.b.c, _ => _.d.e.f);

idx(a, _ => _[0]);

idx(a, _ => _[a[a[a[a[a.b.c]]]]])

idx(a, x => x[x[x[0]][x[1]]]);