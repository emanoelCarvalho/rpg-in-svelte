<script>
  import { david, rani, lili, allan } from "./Data/character";
  import { Jogadora } from "./Data/Protagonista"
  import { estado, trocarestadodojogo } from "./stores/Estado";
  import Menu from "./Components/Menu.svelte";
  import Sobre from "./Components/Sobre.svelte";
  import Jogar from "./Components/Jogar.svelte";
  import Referencias from "./Components/Referencias.svelte";
  import { blocosSaida } from "./Data/Saidablocos";
  import { blocos } from "./Data/Blocos";
  import { mapaInicial } from "./Data/Mapa";
  import { mapaSala } from "./Data/Mapa";
  import BatalhaOne from "./Components/BatalhaOne.svelte";
  import BatalhaTwo from "./Components/BatalhaTwo.svelte";
  import Ajuda from "./Components/Ajuda.svelte";
  import Inicio from "./Components/Inicio.svelte";
  import BatalhaThree from "./Components/BatalhaThree.svelte";
  import BatalhaFour from "./Components/BatalhaFour.svelte";
  import Final from "./Components/Final.svelte";
  import John from "./Components/John.svelte";
  import Placido from "./Components/Placido.svelte";
  import swal from "sweetalert";

  const load = () => {
    // canvas
    var cnv = document.querySelector("canvas");
    var ctx = cnv.getContext("2d");
    // movimentação
    window.addEventListener("keydown", keydown, false);
    window.addEventListener("keyup", keyup, false);
    // arrays
    var desenhos = [];
    desenhos.push(mapaSala);
    desenhos.push(mapaInicial);
    desenhos.push(Jogadora);
    blocos.push(lili);
    blocos.push(david);
    blocos.push(allan);
    blocos.push(rani);
    // camera
    class camera {
      constructor(x, y) {
        // atributos
        this.x = x;
        this.y = y;
        this.width = cnv.width;
        this.height = cnv.height;
      }
      // bordas
      leftEdge() {
        return this.x + this.width * 0.25;
      }
      rigthEdge() {
        return this.x + this.width * 0.75;
      }
      topEdge() {
        return this.y + this.height * 0.25;
      }
      bottonEdge() {
        return this.y + this.height * 0.75;
      }
    }
    var cameraJogo = new camera(450, 0);

    // saida dos blocos
    var imgBloco = new Image();
    imgBloco.src = "public/fundoVazio.png";
    var saidaBlocoA = new blocosSaida(
      "saidaBlocoA",
      imgBloco,
      2148,
      800,
      50,
      50,
      2109,
      800,
      95,
      95
    );
    blocos.push(saidaBlocoA);
    var saidaBlocoB = new blocosSaida(
      "saidaBlocoB",
      imgBloco,
      2148,
      800,
      50,
      50,
      2109,
      800,
      95,
      95
    );
    blocos.push(saidaBlocoB);
    var saidaBlocoC = new blocosSaida(
      "saidaBlocoC",
      imgBloco,
      2148,
      800,
      50,
      50,
      2109,
      800,
      95,
      95
    );
    blocos.push(saidaBlocoC);
    var saidaBlocoD = new blocosSaida(
      "saidaBlocoD",
      imgBloco,
      2148,
      800,
      50,
      50,
      2109,
      800,
      95,
      95
    );
    blocos.push(saidaBlocoD);

    // teclado
    var ESQUERDA = 37;
    var CIMA = 38;
    var DIREITA = 39;
    var BAIXO = 40;
    var ESPACO = 49;

    // ativação das teclas
    function keydown(e) {
      switch (e.keyCode) {
        case DIREITA:
          Jogadora.mvDireita = true;
          Jogadora.mvEsquerda = false;
          Jogadora.mvCima = false;
          Jogadora.mvBaixo = false;
          break;
        case ESQUERDA:
          Jogadora.mvDireita = false;
          Jogadora.mvEsquerda = true;
          Jogadora.mvCima = false;
          Jogadora.mvBaixo = false;
          break;
        case CIMA:
          Jogadora.mvDireita = false;
          Jogadora.mvEsquerda = false;
          Jogadora.mvCima = true;
          Jogadora.mvBaixo = false;
          break;
        case BAIXO:
          Jogadora.mvDireita = false;
          Jogadora.mvEsquerda = false;
          Jogadora.mvCima = false;
          Jogadora.mvBaixo = true;
          break;
      }
    }
    function keyup(e) {
      switch (e.keyCode) {
        case DIREITA:
          Jogadora.mvDireita = false;
        case ESQUERDA:
          Jogadora.mvEsquerda = false;
        case CIMA:
          Jogadora.mvCima = false;
        case BAIXO:
          Jogadora.mvBaixo = false;
      }
    }

    // funções em game

    loop();

    function colisao(r1, r2) {
      let catX = r1.centroX() - r2.centroX();
      let catY = r1.centroY() - r2.centroY();

      let sumHalfWidth = r1.halfWidth() + r2.halfWidth();
      let sumHalfHeight = r1.halfHeight() + r2.halfHeight();

      if (Math.abs(catX) < sumHalfWidth && Math.abs(catY) < sumHalfHeight) {
        let overLapX = sumHalfWidth - Math.abs(catX);
        let overLapY = sumHalfHeight - Math.abs(catY);

        if (overLapX >= overLapY) {
          if (catY > 0 && r2.id == "blocoA") {
            swal("Entrou no Bloco A.", "", "info");
            r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;
            Jogadora.posX = 2296;
            Jogadora.posY = 553;

            allan.posY = -100;
            david.posY = -100;
            rani.posY = -100;
            lili.posY = 16;

            r1.posY += overLapY;

            saidaBlocoA.posY = 680;
            saidaBlocoB.posY = 800;
            saidaBlocoC.posY = 800;
            saidaBlocoD.posY = 800;
          } else if (catY > 0 && r2.id == "blocoB") {
            if (Jogadora.certificadoLili) {
              swal("Entrou no Bloco B.", "", "info");
              r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;
              Jogadora.posX = 2296;
              Jogadora.posY = 553;
              r1.posY += overLapY;

              allan.posY = -100;
              david.posY = 16;
              rani.posY = -100;
              lili.posY = -100;

              saidaBlocoA.posY = 800;
              saidaBlocoB.posY = 680;
              saidaBlocoC.posY = 800;
              saidaBlocoD.posY = 800;
            } else {
              swal(
                "Você não passou em Fundamentos da Informatica, volte ao bloco A.",
                "",
                "error"
              );
              r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;
              r1.posY += overLapY;
            }
          } else if (catY > 0 && r2.id == "blocoC") {
            if (Jogadora.certificadoDavid) {
              swal("Entrou no Bloco C.", "", "info");
              r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;
              Jogadora.posX = 2296;
              Jogadora.posY = 553;
              r1.posY += overLapY;

              allan.posY = -100;
              david.posY = -100;
              rani.posY = 16;
              lili.posY = -100;

              saidaBlocoA.posY = 800;
              saidaBlocoB.posY = 800;
              saidaBlocoC.posY = 680;
              saidaBlocoD.posY = 800;
            } else {
              swal(
                "Você não passou em Redes de Computadores, volte ao bloco B.",
                "",
                "error"
              );
              r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;
              r1.posY += overLapY;
            }
          } else if (catY > 0 && r2.id == "blocoD") {
            if (Jogadora.certificadoRanieri) {
              swal("Entrou no Bloco D.", "", "info");
              r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;
              Jogadora.posX = 2296;
              Jogadora.posY = 553;
              r1.posY += overLapY;

              allan.posY = 16;
              david.posY = -100;
              rani.posY = -100;
              lili.posY = -100;

              saidaBlocoA.posY = 800;
              saidaBlocoB.posY = 800;
              saidaBlocoC.posY = 800;
              saidaBlocoD.posY = 680;
            } else {
              swal("Você não passou em Web, volte ao bloco C.", "", "error");
              r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;
              r1.posY += overLapY;
            }
          } else if (catY > 0 && r2.id == "blocoX") {
            Jogadora.hp = 100;
            swal("Bloco em reforma.", "", "warning");
            r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;
            r1.posY += overLapY;
          }
          //colisao com professores
          else if (catY > 0 && r2.id == "Liliane") {
            if (!Jogadora.certificadoLili) {
              r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;
              r1.posY += overLapY + 5;
              trocarestadodojogo("b1");
            } else {
              swal(
                "Você ja foi aprovado, vá para o proximo bloco.",
                "",
                "info"
              );
              r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;
              r1.posY += overLapY;
            }
          } else if (catY > 0 && r2.id == "David") {
            if (!Jogadora.certificadoDavid) {
              r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;  
              r1.posY += overLapY + 5;
              trocarestadodojogo("b2");
            } else {
              swal(
                "Você ja foi aprovado, vá para o proximo bloco.",
                "",
                "info"
              );
              r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;
              r1.posY += overLapY;
            }
          } else if (catY > 0 && r2.id == "Ranieri") {
            if (!Jogadora.certificadoRanieri) {
              r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;
              r1.posY += overLapY + 5;
              trocarestadodojogo("b3");
            } else {
              swal(
                "Você ja foi aprovado, vá para o proximo bloco.",
                "",
                "info"
              );
              r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;
              r1.posY += overLapY;
            }
          } else if (catY > 0 && r2.id == "Allan") {
            r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;
            r1.posY += overLapY + 5;
            trocarestadodojogo("b4");
          } else if (catY > 0) {
            r1.posY += overLapY;
            r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;
          }
          //saida das blocos
          else if (catY < 0 && r2.id == "saidaBlocoA") {
            swal("saiu do bloco A.", "", "info");
            r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;
            Jogadora.posX = 408;
            Jogadora.posY = 500;
            r1.posY -= overLapY;
          } else if (catY < 0 && r2.id == "saidaBlocoB") {
            swal("saiu do bloco B.", "", "info");
            r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;
            Jogadora.posX = 1340;
            Jogadora.posY = 144;
            r1.posY -= overLapY;
          } else if (catY < 0 && r2.id == "saidaBlocoC") {
            swal("saiu do bloco C.", "", "info");

            r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;
            Jogadora.posX = 716;
            Jogadora.posY = 128;
            r1.posY -= overLapY;
          } else if (catY < 0 && r2.id == "saidaBlocoD") {
            swal("saiu do bloco D.", "", "info");
            r1.mvCima = r1.mvEsquerda = r1.mvDireita = r1.mvBaixo = false;
            Jogadora.posX = 280;
            Jogadora.posY = 132;
            r1.posY -= overLapY;
          } else if (catY < 0) {
            Jogadora.posY -= overLapY;
          }
        } else {
          Jogadora.posY - +overLapY;
          if (catX > 0) {
            r1.posX += overLapX;
          } else {
            r1.posX -= overLapX;
          }
        }
      }
    }

    //
    function personagemCamera() {
      if (Jogadora.posX < cameraJogo.leftEdge()) {
        cameraJogo.x = Jogadora.posX - cameraJogo.width * 0.25;
      } else if (Jogadora.posX + Jogadora.width > cameraJogo.rigthEdge()) {
        cameraJogo.x = Jogadora.posX + Jogadora.width - cameraJogo.width * 0.75;
      } else if (Jogadora.posY < cameraJogo.topEdge()) {
        cameraJogo.y = Jogadora.posY - cameraJogo.height * 0.25;
      } else if (Jogadora.posY + Jogadora.height > cameraJogo.bottonEdge()) {
        cameraJogo.y =
          Jogadora.posY + Jogadora.height - cameraJogo.height * 0.75;
      }
    }

    //
    function cameraMapa() {
      if (Jogadora.posX < mapaInicial.width) {
        if (cameraJogo.x < 0) {
          cameraJogo.x = 0;
        } else if (cameraJogo.x + cameraJogo.width > mapaInicial.width) {
          cameraJogo.x = mapaInicial.width - cameraJogo.width;
        } else if (cameraJogo.y < 0) {
          cameraJogo.y = 0;
        } else if (cameraJogo.y + cameraJogo.height > mapaInicial.height) {
          cameraJogo.y = mapaInicial.height - cameraJogo.height;
        }
      } else {
        if (cameraJogo.x < mapaInicial.width) {
          cameraJogo.x = mapaInicial.width;
        } else if (
          cameraJogo.x + cameraJogo.width >
          mapaInicial.width + mapaSala.srcDesenhoX
        ) {
          cameraJogo.x =
            mapaInicial.width + mapaSala.srcDesenhoX - cameraJogo.width;
        } else if (cameraJogo.y < 0) {
          cameraJogo.y = 0;
        } else if (cameraJogo.y + cameraJogo.height > mapaSala.srcDesenhoY) {
          cameraJogo.y = mapaSala.srcDesenhoY - cameraJogo.height;
        }
      }
    }

    //
    function personagemMapa() {
      if (Jogadora.posX < mapaInicial.width) {
        if (Jogadora.posX < 0) {
          Jogadora.posX = 0;
        } else if (Jogadora.posX + Jogadora.width > mapaInicial.width) {
          Jogadora.posX = mapaInicial.width - Jogadora.width;
        } else if (Jogadora.posY < 0) {
          Jogadora.posY = 0;
        } else if (Jogadora.posY + Jogadora.height > mapaInicial.height) {
          Jogadora.posY = mapaInicial.height - Jogadora.height;
        }
      } else if (Jogadora.posX > mapaInicial.width) {
        if (Jogadora.posY < 0) {
          Jogadora.posY = 0;
        } else if (Jogadora.posY + Jogadora.height > mapaSala.srcDesenhoY) {
          Jogadora.posY = mapaSala.srcDesenhoY - Jogadora.height;
        }
      }
    }

    //
    function atualizar() {
      if (Jogadora.posX > 1600) {
        Jogadora.srcXC = 64;
        Jogadora.srcYC = 64;
      } else {
        Jogadora.srcXC = 30;
        Jogadora.srcYC = 30;
      }
      Jogadora.move();
    }

    //
    function desenhar() {
      ctx.save();
      ctx.translate(-cameraJogo.x, -cameraJogo.y);

      for (let i in desenhos) {
        desenhos[i].desenho(ctx);
      }
      for (let i in blocos) {
        blocos[i].desenho(ctx);
      }

      ctx.restore();
    }

    //
    function loop() {
      desenhar();
      personagemCamera();
      cameraMapa();
      personagemMapa();
      for (let i in blocos) {
        colisao(Jogadora, blocos[i]);
      }
      atualizar();
      // @ts-ignore
      window.requestAnimationFrame(loop, cnv);
    }
  };
</script>

<svelte:window on:load={load} />

<div id="game">
  <canvas width="550" height="400" style="--clr:#DCDCDC">
    <p>Seu navegador não é compatível com nosso projeto</p>
  </canvas>
</div>
<!-- svelte-ignore empty-block -->
{#if $estado === "menu"}
  <Menu />
{:else if $estado === "jogar"}
  <Jogar />
{:else if $estado === "inicio"}
  <Inicio />
{:else if $estado === "sobre"}
  <Sobre />
{:else if $estado === "ajuda"}
  <Ajuda />
{:else if $estado === "referencias"}
  <Referencias />
{:else if $estado === "placido"}
  <Placido />
{:else if $estado === "john"}
  <John />
{:else if $estado === "b1"}
  <BatalhaOne />
{:else if $estado === "b2"}
  <BatalhaTwo />
{:else if $estado === "b3"}
  <BatalhaThree />
{:else if $estado === "b4"}
  <BatalhaFour />
{:else if $estado === "final"}
  <Final />
{/if}
<!-- svelte-ignore empty-block -->
