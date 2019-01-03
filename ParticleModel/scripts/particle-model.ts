
class Point2D {
        x: number;
        y: number;
    
        constructor(x: number, y: number){
            this.x = x;
            this.y = y;
        }
    }
    
class Particle extends Point2D {
        i:number;
        id: number;
        aii :number;
        neigh: {j : number, dist:number, aij : number}[];
    
        constructor(id: number, x: number, y: number){
            super(x, y);
            this.i = id;
            this.id = id;
            this.aii = 0;
            this.neigh = [];
        }
    }

class Model {
    particles : Particle[];
    particleRadius : number;
    radius : number;
    modelSize : number;
    currParticle : Particle;

    private nx : number;
    private ny : number;
    
    constructor(modelSize : number, particleRadius : number){
        this.modelSize = modelSize;
        this.particleRadius = particleRadius
        this.radius = particleRadius*2.1;
        this.loadParticles();
    } 
    
    private loadParticles() {
        this.particles = [];
        this.ny = Math.floor(Math.sqrt(this.modelSize));
        this.nx = Math.floor(this.modelSize/this.ny);
        var id : number = 0;
        
        for (var i:number = 0; i < this.nx; i++){
            for (var j:number = 0; j < this.ny; j++){
                this.particles.push(new Particle(id++, i/this.nx, j/this.ny));
            }
        }
        this.modelSize = this.particles.length;

    }

    public sort() {

        this.particles = this.particles.sort( (p1: Particle, p2: Particle): number => 
            { return (p1.x < p2.x? -1: p1.x > p2.x? 1 : 0); }); 

        this.particles.forEach((p : Particle, index : number) => { p.i = index;});    
    }

    public calcNeigh(){

        const re = this.radius;
        const filterNeigh = (q : Particle) => { return (p.i < q.i && Math.abs(p.x-q.x) <= re); }
        const mapNeigh = (q : Particle)  => { return {j : q.i, dist : norm(p, q), aij : 0.0}; }
        var p : Particle;
        for (var i = 0; i < this.modelSize; i++){
            p  = this.particles[i]; 
            this.particles[i].neigh = this.particles.filter(filterNeigh, p).map(mapNeigh);
            this.particles[i].neigh = this.particles[i].neigh.filter(neigh => neigh.dist < re)
            this.particles[i].neigh.forEach( n => n.aij = weight(n.dist, this.radius));

            const neigh = this.particles[i].neigh;
            this.particles[i].aii = neigh.reduce((acc, neigh) => acc + neigh.aij, 0);
        }
    }

    public plotNeigh(canvas : any, i : number){
        const largerBorder = Math.max(this.nx, this.ny);
        const p : Particle = this.particles[i];
        const jNeigh = p.neigh.map(neigh => { return neigh.j })
        const points: Point2D[] = jNeigh.map(j => {var {i, id, neigh, ...point2D} = this.particles[j]; return point2D; });

        plot(canvas, points, largerBorder, "#FF0000" ); // Red
        plot(canvas, [{x:p.x, y:p.y}], largerBorder, "#FFFFFF" ); // black
    }

    public plotParticles(canvas : any){
        const largerBorder = Math.max(this.nx, this.ny);
        var points = this.particles.map(value => {var {i, id, neigh, ...point2D} = value; return point2D; })
        plot(canvas, points, largerBorder, "#4508ee");  // Blue
    }

    public plotMatrix(canvas : any){
        const largerBorder = this.modelSize;
        var p : Particle;
        var points: Point2D[];

        for (var i = 0; i < this.modelSize; i++){
            p  = this.particles[i]; 
            const jNeigh = p.neigh.map(neigh => { return neigh.j })
            points = [];
            points.push(new Point2D(i/largerBorder,i/largerBorder))
            jNeigh.forEach(j => points.push(new Point2D(i/largerBorder,j/ largerBorder),new Point2D(i/largerBorder,j/largerBorder)));
            console.log(...points)
            plot(canvas, points, largerBorder, "#000000" ); // back
        }
    }
    
    public log() {
        console.log('-- Particles = ', ...this.particles);
        console.log('-- Neighbors = ',...this.currParticle.neigh);
    }
}

function plot(canvas : any, points: Point2D[], largerBorder : number, color : string){
        
    var height : number = canvas.height * 0.9;
    var width : number = canvas.width * 0.99;
    var particleSize : number = Math.min(canvas.width, canvas.height) / largerBorder / 2;

    canvas = canvas.getContext('2d');
    canvas.fillStyle = color; 

    for (var i:number = 0; i < points.length; i++){
        var x : number = (points[i].x+0.02)*width;
        var y : number = (points[i].y+0.12)*height;
        canvas.beginPath();
        canvas.arc(x, y, particleSize, 0, Math.PI * 2, true);
        canvas.fill();
    }
}

const weight = (r : number, radius : number) : number => { return (r < radius ? (radius / r - 1) :  0.0); }

const norm = (a : any, b : any) => 
                { return ((a instanceof  Point2D && b instanceof  Point2D)?
                            Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y)): 
                            Math.sqrt(a*a+b*b));}

