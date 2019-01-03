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
        this.aii = 0;
        this.neigh = [];
    }
}
class Model {
    constructor(modelSize, particleRadius) {
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
        this.particles = this.particles.sort((p1, p2) => { return (p1.x < p2.x ? -1 : p1.x > p2.x ? 1 : 0); });
        this.particles.forEach((p, index) => { p.i = index; });
    }
    calcNeigh() {
        const re = this.radius;
        const filterNeigh = (q) => { return (p.i < q.i && Math.abs(p.x - q.x) <= re); };
        const mapNeigh = (q) => { return { j: q.i, dist: norm(p, q), aij: 0.0 }; };
        var p;
        for (var i = 0; i < this.modelSize; i++) {
            p = this.particles[i];
            this.particles[i].neigh = this.particles.filter(filterNeigh, p).map(mapNeigh);
            this.particles[i].neigh = this.particles[i].neigh.filter(neigh => neigh.dist < re);
            this.particles[i].neigh.forEach(n => n.aij = weight(n.dist, this.radius));
            const neigh = this.particles[i].neigh;
            this.particles[i].aii = neigh.reduce((acc, neigh) => acc + neigh.aij, 0);
        }
    }
    plotNeigh(canvas, i) {
        const largerBorder = Math.max(this.nx, this.ny);
        const p = this.particles[i];
        const jNeigh = p.neigh.map(neigh => { return neigh.j; });
        const points = jNeigh.map(j => { var _a = this.particles[j], { i, id, neigh } = _a, point2D = __rest(_a, ["i", "id", "neigh"]); return point2D; });
        plot(canvas, points, largerBorder, "#FF0000"); // Red
        plot(canvas, [{ x: p.x, y: p.y }], largerBorder, "#FFFFFF"); // black
    }
    plotParticles(canvas) {
        const largerBorder = Math.max(this.nx, this.ny);
        var points = this.particles.map(value => { var { i, id, neigh } = value, point2D = __rest(value, ["i", "id", "neigh"]); return point2D; });
        plot(canvas, points, largerBorder, "#4508ee"); // Blue
    }
    plotMatrix(canvas) {
        const largerBorder = this.modelSize;
        var p;
        var points;
        for (var i = 0; i < this.modelSize; i++) {
            p = this.particles[i];
            const jNeigh = p.neigh.map(neigh => { return neigh.j; });
            points = [];
            points.push(new Point2D(i / largerBorder, i / largerBorder));
            jNeigh.forEach(j => points.push(new Point2D(i / largerBorder, j / largerBorder), new Point2D(i / largerBorder, j / largerBorder)));
            console.log(...points);
            plot(canvas, points, largerBorder, "#000000"); // back
        }
    }
    log() {
        console.log('-- Particles = ', ...this.particles);
        console.log('-- Neighbors = ', ...this.currParticle.neigh);
    }
}
function plot(canvas, points, largerBorder, color) {
    var height = canvas.height * 0.9;
    var width = canvas.width * 0.99;
    var particleSize = Math.min(canvas.width, canvas.height) / largerBorder / 2;
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
const weight = (r, radius) => { return (r < radius ? (radius / r - 1) : 0.0); };
const norm = (a, b) => {
    return ((a instanceof Point2D && b instanceof Point2D) ?
        Math.sqrt((a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y)) :
        Math.sqrt(a * a + b * b));
};
//# sourceMappingURL=particle-model.js.map