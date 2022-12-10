let values, images, apps, game, preview;

function setup() {
	createCanvas(500,1000);
	imageMode(CENTER);
	rectMode(CENTER);
	
	values = {
		G: 9.8 / 30,
		margin: 20,
		 bar: 40,
		 spaceSize: 175,
		 speed: 5,
		cols: 10,
		snakeCols: 14,
		boxHop: 8
	};
	
	images = {
		
		snake: loadImage("snake.jpeg"),
		
	};
	
	game = new Game();
	preview = new Preview();
	apps = [];
	apps.push(new App(0, 0));
	
	
}

function draw() {
	if (game.type == -1) {
		renderBackground();
		renderApps();
		renderPreview();
	} else {
		game.render();
	}
	renderBar();
}

function renderApps() {
	for (let i = 0; i < apps.length; i++) {
		apps[i].render();
	}
}

function renderBackground() {
	background(55);
	stroke(0,139,69);
	strokeWeight(1);
	fill(32,178,170);
	rect(width / 2, height / 2, width - width / 10, height - values.bar * 2);
	fill(0,100,0);
	rect(width / 2, height / 20, width, height / 10);
	quad(width / 20, height / 2, width - width / 20, height / 2, width, height / 2 + 45, 0, height / 2 + 45);
	quad(width / 20, height / 2 + 120, width - width / 20, height / 2 + 120, width, height / 2 + 45, 0, height / 2 + 45);
	fill(0);
	strokeWeight(4);
	rect(width / 2, height / 10 + (height / 3) / 2 + width / 15, width - width / 5, height / 3, 15);
	
	stroke(0, 139,69);
	strokeWeight(4);
	line(2, 0, 2, height / 10 - 4);
	line(width - 2, 0, width - 2, height / 10 - 4);
	line(width / 20, height / 10 + 2, width / 20, height / 2);
	line(width - width / 20, height / 10 + 2, width - width / 20, height / 2);
	line(width - width / 20, height / 2, width, height / 2 + 45);
	line(width / 20, height / 2, 0, height / 2 + 45);
	line(width - width / 20, height / 2 + 120, width, height / 2 + 45);
	line(width / 20, height / 2 + 120, 0, height / 2 + 45);
	line(width - width / 20, height / 2 + 120, width - width / 20, height - values.bar);
	line(width / 20, height / 2 + 120, width / 20, height - values.bar);
	
	stroke(0, 139,69);
	strokeWeight(1);
	fill(200,0,0);
	ellipse(width * 5 / 28, height / 2 + 22, 30, 18);
   fill(0,0,100)
	ellipse(width * 5 / 28 + 30, height / 2 + 29.5, 30, 18);
	
	fill(200);
	quad(width * 21 / 28, height / 2 + 10, width * 21 / 28 + 35, height / 2 + 10, width * 21 / 28 + 42, height / 2 + 32, width * 21 / 28 - 7, height / 2 + 32);
	fill(155);
	rect(width * 21 / 28 + 17.5, height / 2 + 10, 7, 25);
	fill(255);
	ellipse(width * 21 / 28 + 17.5, height / 2 - 2.5, 17.5, 17.5);
	stroke(0,200,0);
	strokeWeight(4);
	point(width * 21 / 28, height / 2 + 65);
	point(width * 21 / 28 + 10, height / 2 + 65);
	point(width * 21 / 28 + 20, height / 2 + 65);
	point(width * 21 / 28 + 30, height / 2 + 65);
	point(width * 21 / 28 + 40, height / 2 + 65);
	point(width * 21 / 28 + 50, height / 2 + 65);
	point(width * 21 / 28 + 5, height / 2 + 73);
	point(width * 21 / 28 + 15, height / 2 + 73);
	point(width * 21 / 28 + 25, height / 2 + 73);
	point(width * 21 / 28 + 35, height / 2 + 73);
	point(width * 21 / 28 + 45, height / 2 + 73);
	strokeWeight(2);
	line(width * 3 / 28, height / 2 + 75, width * 3 / 28 + 40, height / 2 + 75);
	
	
}

function renderPreview() {
	for (let i = 0; i < apps.length; i++) {
		if (apps[i].click(mouseX, mouseY)) {
			preview.render(apps[i].type);
		}
	}
}

function renderBar() {
	fill(0, 155);
	noStroke();
	rect(width / 2, height - values.bar / 2, width, values.bar);
	fill(255);
	textSize(25);
	textAlign(CENTER, CENTER);
	text("Home", width / 2, height - values.bar / 2);
}



class Game {
	constructor() {
		this.type = -1;
	}
	
	open(t) {
		this.type = t;
		if (t == 0) {
    	this.game = new Snake(false);
		}
	
		
	}

	press(k, kc) {
		if (this.type >= 0) {
			this.game.press(k, kc);
		}
	}
	
	click(x, y) {
		if (this.type >= 0) {
			this.game.click(x, y);
		}
	}
	
	render() {
		if (this.type != -1) {
			this.game.render();
			if (this.game.reset()) {
				if (this.type == 0) {
					this.game = new Snake(true);
				} 
			}
		}
	}
}

class Preview {
	constructor() {
		this.h = height / 4;
	}
	
	render(t) {
		noStroke();
		fill(255, 10);
		rect(width / 2, height - values.bar - this.h / 2, width, this.h);
		fill(255);
		textSize(20);
		textAlign(LEFT, TOP);
		
		
		if (t == 0) {
			text("Use arrow keys to turn the snake, collect fruit, and avoid hitting yourself or the walls.", 
					 width / 2, height - values.bar - this.h / 2, width - width / 5, this.h - width / 10);
		}
		
	}
}

class App {
	constructor(i, t) {
		this.s = ((width - width / 5) - 50) / 1;
		this.index  = i;
		this.type = t;
		let x = (width / 2 - (width - width / 5) / 2) + 10 + this.s / 2 + this.index * (this.s + 10) % (width / 2 + (width - width / 5) / 2);
		let y = ((height / 10 + (height / 3) / 2 + width / 15) - (height / 3) / 2) + this.s / 2 + 10 + floor(this.index / 4) * (this.s + 10);
		
		rect(width / 2, height / 10 + (height / 3) / 2 + width / 15, width - width / 5, height / 3, 30);
		this.pos = createVector(x, y);
		this.hover = false;
	}
	
	render() {
		
		
		if (this.type == 0) {
			fill(0, 155, 0);
			stroke(255);
			strokeWeight(3);
			//rect(this.pos.x, this.pos.y, this.s, this.s);
			image(images.snake, this.pos.x+17, this.pos.y-8, this.s+50, this.s);
		}
		
		if (this.hover) {
			noStroke();
			fill(0, 75);
			rect(this.pos.x+17, this.pos.y-8, this.s+50, this.s);
		}
	}
	
	click(x, y) {
		let r = this.s / 2;
		if (x < this.pos.x + r && x > this.pos.x - r) {
			if (y < this.pos.y + r && y > this.pos.y - r) {
				this.hover = true;
				return true;
			}
		} 
		this.hover = false;
		return false;
	}
}

function mousePressed() {
	game.click(mouseX, mouseY);
	if (game.type == -1) {
		for (let i = 0; i < apps.length; i++) {
			if (apps[i].click(mouseX, mouseY)) {
				game.open(apps[i].type);
			}
		}
	}
	if (mouseY > height - values.bar) {
		game.type = -1;
	}
}

function keyPressed() {
	game.press(key, keyCode);
}

class Snake {
	constructor() {
		this.resetGame = false;
		this.gameOver = false;
		this.endTime = 0;
		
		this.worm = new Worm();
	}
	
	render() {
		this.renderBackground();
		
		if (!this.gameOver) {
			this.worm.render();
		} else {
			this.renderEnd();
			this.endTime++;
		}
		
		if (this.worm.dead) {
			this.gameOver = true;
		}
	}
	
	renderEnd() {
		background(0,0,0);
		stroke(0);
		strokeWeight(2);
		textSize(21);
		fill(255, 0, 0);
		text("You died with " + (this.worm.count + 1) + " blocks!", width / 2, height / 2 - 25);
		fill(255);
		text("Press any key to reset!", width / 2, height / 2);
	}
	
	reset() {
		if (this.resetGame) {
			return true;
		}
		return false;
	}
	
	press(k, kc) {
		if (this.endTime > 20) {
			this.resetGame = true;
		}
		if (!this.gameOver) {
			this.worm.press(k, kc);
		}
	}
	
	click(x, y) {
		if (this.endTime > 20) {
			this.resetGame = true;
		}
	}
	
	renderBackground() {
		background(211,211,211);
		strokeWeight(3);
		stroke(75, 200, 75);
		noFill();
		rect(width / 2, (height - values.bar) / 2, width - values.margin * 2, height - values.bar - values.margin * 2);
	}
}

class Worm {
	constructor() {
		this.size = (width - values.margin * 2) / values.snakeCols;
		this.pos = createVector(values.margin + this.size / 2, values.margin + this.size / 2);
		this.time = 0;
		this.vel = createVector(1, 0);
		this.inVel = createVector(1, 0);
		this.speed = 5;
		this.blocks = [];
		this.count = 2;
		for (let i = 0; i < this.count; i++) {
			this.blocks[i] = new Block(this.size);
		}
		this.fruit = new Fruit(this.size);
	}
	
	render() {		
		if (this.time % this.speed == 0) {
			for (let i = this.blocks.length - 1; i > 0; i--) {
				this.blocks[i].pos.x = this.blocks[i - 1].pos.x;
				this.blocks[i].pos.y = this.blocks[i - 1].pos.y;
			}
			this.blocks[0].pos.x = this.pos.x;
			this.blocks[0].pos.y = this.pos.y;
			
			this.vel.x = this.inVel.x;
			this.vel.y = this.inVel.y;
			this.pos.x += this.vel.x * this.size;
			this.pos.y += this.vel.y * this.size;
		}
		
		if (this.pos.x > width - values.margin || this.pos.x < values.margin || this.pos.y < values.margin || this.pos.y > height - values.bar - values.margin) {
			this.dead = true;
		}
		
		if (this.near(this.pos, this.fruit.pos)) {
			this.count++;
			this.fruit = new Fruit(this.size);
			this.blocks.push(new Block(this.size));
		}
		
		this.fruit.render();
		
		for (let i = 0; i < this.blocks.length; i++) {
			this.blocks[i].render();
		}
		
		fill(255);
		noStroke();
		rect(this.pos.x, this.pos.y, this.size, this.size, 5);
		
		this.time++;
	}
	
	near(p1, p2) {
		let m = 2;
		if (p1.x > p2.x - m && p1.x < p2.x + m) {
			if (p1.y > p2.y - m && p1.y < p2.y + m) {
				return true;
			}
		}
		return false;
	}

	press(k, kc) {
		if (k == "w" || kc == 38) {
			if (this.vel.y == 0) {
				this.inVel.x = 0;
				this.inVel.y = -1;
			}
		}
		if (k == "a" || kc == 37) {
			if (this.vel.x == 0) {
				this.inVel.x = -1;
				this.inVel.y = 0;
			}
		}
		if (k == "s" || kc == 40) {
			if (this.vel.y == 0) {
				this.inVel.x = 0;
				this.inVel.y = 1;
			}
		}
		if (k == "d" || kc == 39) {
			if (this.vel.x == 0) {
				this.inVel.x = 1;
				this.inVel.y = 0;
			}
		}
	}
}

class Block {
	constructor(s) {
		this.pos = createVector(-width, -height);
		this.size = s;
	}
	
	render() {
		fill(255);
		noStroke();
		rect(this.pos.x, this.pos.y, this.size, this.size, 5);
	}
}

class Fruit {
	constructor(s) {
		let rx = floor(random(values.snakeCols - 0.001));
		let ry = floor(random(floor((height - values.bar - values.margin * 2) / s) - 0.001));
		this.pos = createVector(values.margin + s / 2 + rx * s, values.margin + s / 2 + ry * s);
		this.size = s * 0.75;
	}
	
	render() {
		fill(255, 0, 0);
		noStroke();
		ellipse(this.pos.x, this.pos.y, this.size, this.size);
	}
}