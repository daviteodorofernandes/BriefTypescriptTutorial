var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
class Point2D {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}
class Particle extends Point2D {
    constructor(id, x, y) {
        super(x, y);
        this.i = id;
        this.id = id;
        this.neigh = [];
    }
}
class Model {
    constructor(modelSize, particleRadius) {
        this.weight = (r) => { return (r < this.radius ? (this.radius / r - 1) : 0.0); };
        this.modelSize = modelSize;
        this.particleRadius = particleRadius;
        this.radius = particleRadius * 2.1;
        this.loadParticles();
    }
    loadParticles() {
        this.particles = [];
        this.ny = Math.floor(Math.sqrt(this.modelSize));
        this.nx = Math.floor(this.modelSize / this.ny);
        var id = 0;
        for (var i = 0; i < this.nx; i++) {
            for (var j = 0; j < this.ny; j++) {
                this.particles.push(new Particle(id++, i / this.nx, j / this.ny));
            }
        }
        this.modelSize = this.particles.length;
    }
    sort() {
        this.particles = this.particles.sort((p1, p2) => {
            if (p1.x < p2.x)
                return -1;
            if (p1.x > p2.x)
                return 1;
            return 0;
        });
        this.particles.forEach((p, index) => { p.i = index; });
    }
    calcNeigh(i) {
        // this.currParticle = this.particles[i];
        const re = this.radius;
        const filterNeigh = (q) => { return (p.i < q.i && Math.abs(p.x - q.x) <= re); };
        const mapNeigh = (q) => { return { j: q.i, dist: norm(p, q), aij: 0.0 }; };
        const p = this.particles[i];
        this.particles[i].neigh = this.particles.filter(filterNeigh, p).map(mapNeigh);
        this.particles[i].neigh = this.particles[i].neigh.filter(neigh => neigh.dist < re);
        this.particles[i].neigh.forEach(n => n.aij = this.weight(n.dist));
    }
    plotNeigh(canvas, i) {
        const p = this.particles[i];
        const jNeigh = p.neigh.map(neigh => { return neigh.j; });
        const points = jNeigh.map(j => { var _a = this.particles[j], { i, id, neigh } = _a, point2D = __rest(_a, ["i", "id", "neigh"]); return point2D; });
        plot(canvas, points, 4, "#FF0000"); // Red
        plot(canvas, [{ x: p.x, y: p.y }], 6, "#000000"); // black
    }
    plotParticles(canvas) {
        var points = this.particles.map(value => { var { i, id, neigh } = value, point2D = __rest(value, ["i", "id", "neigh"]); return point2D; });
        plot(canvas, points, 4, "#4508ee"); // Blue
    }
    log() {
        console.log('-- Particles  -----------------------------------------------------------------------');
        console.log(...this.particles);
        console.log('-- Neighbors  -----------------------------------------------------------------------');
        console.log(...this.currParticle.neigh);
    }
}
function plot(canvas, points, particleSize, color) {
    var height = canvas.height * 0.9;
    var width = canvas.width * 0.99;
    // var particleSize : number = width / this.nx / 2;
    canvas = canvas.getContext('2d');
    canvas.fillStyle = color;
    for (var i = 0; i < points.length; i++) {
        var x = (points[i].x + 0.02) * width;
        var y = (points[i].y + 0.12) * height;
        canvas.beginPath();
        canvas.arc(x, y, particleSize, 0, Math.PI * 2, true);
        canvas.fill();
    }
}
var norm2 = (a, b) => Math.sqrt(a * a + b * b);
const norm = function (a, b) {
    if (a instanceof Point2D && b instanceof Point2D) {
        return Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y));
    }
    else {
        return Math.sqrt(a * a + b * b);
    }
};
//# sourceMappingURL=particle-model.js.map