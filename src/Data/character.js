class Boss {
    constructor(id, img, hp, ataque, defesa) {
        this.id = id;
        this.srcX = this.srcY = 0;
        this.width = 64;
        this.height = 64;
        this.posX = 2220;
        this.posY = -100;
        this.img = img;
        this.hp = hp;
        this.Ataque = ataque;
        this.Defesa = defesa;
        this.srcXC = 64;
        this.srcYC = 64;
    }

    halfWidth() {
        return this.width / 2;
    }

    halfHeight() {
        return this.height / 2;
    }

    centroX() {
        return this.posX + this.halfWidth();
    }

    centroY() {
        return this.posY + this.halfHeight();
    }

    desenho(ctx) {
        ctx.drawImage(this.img, this.srcX, this.srcY, this.width, this.height, this.posX, this.posY, this.srcXC, this.srcYC);
    }

    ataquePadrao(ObjAtacado) {
        ObjAtacado.hp = ObjAtacado.hp - (this.Ataque - ObjAtacado.Defesa);
    }
}

export class Liliane extends Boss {
    constructor(img) {
        super("Liliane", img, 128, 13, 5);
    }

    Linux(ObjAtacado) {
        ObjAtacado.hp = ObjAtacado.hp - (this.Ataque - ObjAtacado.Defesa);
    }

    Arduino(ObjAtacado) {
        ObjAtacado.hp = ObjAtacado.hp - ((this.Ataque * 3) - ObjAtacado.Defesa);
    }
}

export class David extends Boss {
    constructor(img) {
        super("David", img, 160, 16, 6);
    }

    PacketTracer(ObjAtacado) {
        ObjAtacado.hp = ObjAtacado.hp - (this.Ataque - ObjAtacado.Defesa);
    }

    PartiuCrossfit(ObjAtacado) {
        ObjAtacado.hp = ObjAtacado.hp - ((this.Ataque * 3) - ObjAtacado.Defesa);
    }
}


export class Ranieri extends Boss {
    constructor(img) {
        super("Ranieri", img, 200, 20, 8);
    }

    AntiReact(ObjAtacado) {
        ObjAtacado.hp = ObjAtacado.hp - (this.Ataque - ObjAtacado.Defesa);
    }

    Mimosinha(ObjAtacado) {
        ObjAtacado.hp = ObjAtacado.hp - ((this.Ataque * 4) - ObjAtacado.Defesa);
    }
}


export class Allan extends Boss {
    constructor(img) {
        super("Allan", img, 200, 20, 8);
    }

    CheirinhoNesseCodigo(ObjAtacado) {
        ObjAtacado.hp = ObjAtacado.hp - (this.Ataque - ObjAtacado.Defesa);
    }

    Assembly(ObjAtacado) {
        ObjAtacado.hp = ObjAtacado.hp - ((this.Ataque * 4) - ObjAtacado.Defesa);
    }
}


let imgLili = new Image();
imgLili.src = "public/LilianeA.png";
export var lili = new Liliane(imgLili);

var imgDavid = new Image();
imgDavid.src = "public/DavidA.png";
export var david = new David(imgDavid);

var imgRany = new Image();
imgRany.src = "public/RanieriA.png";
export var rani = new Ranieri(imgRany);

var imgAllan = new Image();
imgAllan.src = "public/AllanA.png";
export var allan = new Allan(imgAllan);

