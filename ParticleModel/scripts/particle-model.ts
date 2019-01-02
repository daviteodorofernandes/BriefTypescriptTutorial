
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
        neigh: {j : number, dist:number, aij : number}[];
    
        constructor(id: number, x: number, y: number){
            super(x, y);
            this.i = id;
            this.id = id;
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
    
    public weight = (r : number) : number => { return (r < this.radius ? (this.radius / r - 1) :  0.0); }
	
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

        this.particles = this.particles.sort( (p1: Particle, p2: Particle): number => {
                if (p1.x < p2.x) return -1;
                if (p1.x > p2.x) return 1;
                return 0;
            }) 

        this.particles.forEach((p : Particle, index : number) => { p.i = index;});    
    }

    public calcNeigh(i : number){

        // this.currParticle = this.particles[i];
        const re = this.radius;

        const filterNeigh = (q : Particle) => { return (p.i < q.i && Math.abs(p.x-q.x) <= re); }
        const mapNeigh = (q : Particle)  => { return {j : q.i, dist : norm(p, q), aij : 0.0}; }
        
        const p : Particle = this.particles[i];
        this.particles[i].neigh = this.particles.filter(filterNeigh, p).map(mapNeigh);
        this.particles[i].neigh = this.particles[i].neigh.filter(neigh => neigh.dist < re)
        
        this.particles[i].neigh.forEach( n => n.aij = this.weight(n.dist));
    }

    public plotNeigh(canvas : any, i : number){
        const p : Particle = this.particles[i];
        const jNeigh = p.neigh.map(neigh => { return neigh.j })
        const points: Point2D[] = jNeigh.map(j => {var {i, id, neigh, ...point2D} = this.particles[j]; return point2D; });
        plot(canvas, points, 4, "#FF0000" ); // Red
        
        plot(canvas, [{x:p.x, y:p.y}], 6, "#000000" ); // black
        
    }

    public plotParticles(canvas : any){

        var points = this.particles.map(value => {var {i, id, neigh, ...point2D} = value; return point2D; })
        plot(canvas, points, 4, "#4508ee");  // Blue
    }
    
    
    public log() {
        console.log('-- Particles  -----------------------------------------------------------------------'); 
        console.log(...this.particles);
        console.log('-- Neighbors  -----------------------------------------------------------------------'); 
        console.log(...this.currParticle.neigh);
    }

}

function plot(canvas : any, points: Point2D[], particleSize : number, color : string){
        
    var height : number = canvas.height * 0.9;
    var width : number = canvas.width * 0.99;
    // var particleSize : number = width / this.nx / 2;

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


var norm2 = (a : number, b : number) => Math.sqrt(a*a+b*b);

const norm = function (a : any, b : any) {
    if (a instanceof  Point2D && b instanceof  Point2D){
        return Math.sqrt((a.x-b.x)*(a.x-b.x)+(a.y-b.y)*(a.y-b.y));
    }
    else {
        return Math.sqrt(a*a+b*b);
    }
} 
