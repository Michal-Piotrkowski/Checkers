class Game {
    constructor() {
        this.game_started = false;
        this.myTurn = false;
        this.toDestroyArr = [];
        this.myColour;
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.1, 10000);
        this.camera.position.y = 80;
        this.camera.position.z = 90;
        this.camera.fov = 75;
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x1a1717);
        document.getElementById("root").append(this.renderer.domElement);
        this.camera.aspect = window.innerWidth / window.innerHeight;

        this.axes = new THREE.AxesHelper(1000)
        this.scene.add(this.axes)

        this.boxgeometry = new THREE.BoxGeometry(10, 10, 10);
        this.pawngeometry = new THREE.CylinderGeometry(3, 3, 3, 32);
        this.material1 = new THREE.MeshBasicMaterial({

            side: THREE.DoubleSide, // dwustronny
            map: new THREE.TextureLoader().load('/img/ws.jpg'), // plik tekstury
            transparent: false, // przezroczysty / nie
            opacity: 1, // stopień przezroczystości

        })
        this.material2 = new THREE.MeshBasicMaterial({

            side: THREE.DoubleSide, // dwustronny
            map: new THREE.TextureLoader().load('/img/bs.jpg'), // plik tekstury
            transparent: false, // przezroczysty / nie
            opacity: 1, // stopień przezroczystości

        })
        this.materialp1 = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide, // dwustronny
            map: new THREE.TextureLoader().load('/img/p1.jpg'), // plik tekstury
            transparent: false, // przezroczysty / nie
            opacity: 1, // stopień przezroczystości
        });
        this.materialp2 = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide, // dwustronny
            map: new THREE.TextureLoader().load('/img/p2.jpg'), // plik tekstury
            transparent: false, // przezroczysty / nie
            opacity: 1, // stopień przezroczystości
        });
        this.materialp_clicked = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide, // dwustronny
            map: new THREE.TextureLoader().load('/img/p_clicked.jpg'), // plik tekstury
            transparent: false, // przezroczysty / nie
            opacity: 1, // stopień przezroczystości
        });
        this.materialf_possiblemove = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide, // dwustronny
            map: new THREE.TextureLoader().load('/img/f_possiblemove.jpg'), // plik tekstury
            transparent: false, // przezroczysty / nie
            opacity: 1, // stopień przezroczystości
        });
        this.material3 = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            side: THREE.DoubleSide,
            wireframe: false,
            transparent: true,
            opacity: 0
        });

        this.cube_c = new THREE.Mesh(this.boxgeometry, this.material3);
        this.cube_c.position.x = 0;
        this.cube_c.position.y = 0;
        this.cube_c.position.z = 0;
        this.scene.add(this.cube_c)
        this.angle = 0;

        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.render() // wywołanie metody render

        // this.intersects
        window.addEventListener('mousedown', (e) => {


            this.mouseDown(e)
        })
        //window.addEventListener('mousedown', this.mouseDown(this.camera, this.scene, this.mouseVector, this.raycaster, this.intersects, event))

        this.szachownica = [
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
        ];
        this.pawns = [

            [0, 2, 0, 2, 0, 2, 0, 2],
            [2, 0, 2, 0, 2, 0, 2, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],

        ];

        this.cubes_position = [];
        this.pawns_position = [];
        this.clickedPawns = [0, 0];
        this.clickedPawnsW = [];
        this.clickedPawnsB = [];
        this.markedMeshes = { 'old': [], 'new': [] }
    }

    render = () => {
        this.renderer.render(this.scene, this.camera);
        this.camera.lookAt(this.cube_c.position);
        this.camera.updateProjectionMatrix();
        requestAnimationFrame(this.render);
    }

    createBoard() {
        for (let i = 0; i < this.szachownica.length; i++) {
            this.cubes_position[i] = [];
            for (let j = 0; j < this.szachownica[0].length; j++) {
                if (this.szachownica[i][j] == 0) {
                    const cube = new THREE.Mesh(this.boxgeometry, this.material1);
                    cube.position.x = -35 + (j * 20) / 2;
                    cube.position.y = 0;
                    cube.position.z = -35 + (i * 20) / 2;
                    cube.indexi = i;
                    cube.indexj = j;
                    this.cubes_position[i][j] = { 'x': cube.position.x, 'y': cube.position.y, 'z': cube.position.z, 'cube': cube }
                    this.scene.add(cube)
                }
                else {
                    const cube = new THREE.Mesh(this.boxgeometry, this.material2);
                    cube.position.x = -35 + (j * 20) / 2;
                    cube.position.y = 0;
                    cube.position.z = -35 + (i * 20) / 2;
                    cube.indexi = i;
                    cube.indexj = j;
                    this.cubes_position[i][j] = { 'x': cube.position.x, 'y': cube.position.y, 'z': cube.position.z, 'cube': cube }
                    this.scene.add(cube)
                }
            }
        }
        console.log(this.szachownica)
    }

    async createPawns() {
        if (this.camera.position.z == -90) {
            this.myColour = "b"
        }
        else if (this.camera.position.z == 90) {
            this.myColour = "w"
        }
        await this.downloadPawns();
        this.clearPawns();
        for (let i = 0; i < this.pawns.length; i++) {
            this.pawns_position[i] = []
            for (let j = 0; j < this.pawns[0].length; j++) {
                if (this.pawns[i][j] == 1) {
                    const pawn = new THREE.Mesh(this.pawngeometry, this.materialp1);
                    pawn.myname = "w"
                    pawn.position.x = this.cubes_position[i][j].x;
                    pawn.position.y = this.cubes_position[i][j].y + 5;
                    pawn.position.z = this.cubes_position[i][j].z;
                    this.pawns_position[i][j] = pawn
                    this.scene.add(pawn)
                }
                else if (this.pawns[i][j] == 2) {
                    const pawn = new THREE.Mesh(this.pawngeometry, this.materialp2);
                    pawn.myname = "b"
                    pawn.position.x = this.cubes_position[i][j].x;
                    pawn.position.y = this.cubes_position[i][j].y + 5;
                    pawn.position.z = this.cubes_position[i][j].z;
                    this.pawns_position[i][j] = pawn
                    this.scene.add(pawn)
                }
            }
        }
    }

    mouseDown = (event) => {

        this.raycaster = new THREE.Raycaster(); // obiekt Raycastera symulujący "rzucanie" promieni
        this.mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie, a potem przeliczenia na pozycje 3D

        this.mouseVector.x = (event.clientX / innerWidth) * 2 - 1;
        this.mouseVector.y = -(event.clientY / innerHeight) * 2 + 1;
        this.raycaster.setFromCamera(this.mouseVector, this.camera);
        this.intersects = this.raycaster.intersectObjects(this.scene.children);
        if (this.intersects.length > 0) {

            // zerowy w tablicy czyli najbliższy kamery obiekt to ten, którego potrzebujemy:

            this.checkClickedObject(this.intersects[0].object);

        }
    }

    checkClickedObject(mesh) {
        if (this.game_started != true) {
            return 0;
        }
        if (this.camera.position.y == 100) {
            return 0;
        }
        if (mesh.geometry.type == "CylinderGeometry" && this.myTurn == true) {
            this.clearOldFields()
            if (mesh.myname == "w") { //SPRAWDZAMY CZY JEST BIAŁY
                if (this.camera.position.z == -90) {
                    return 0;
                }
                if (this.clickedPawnsW.length == 2) {
                    this.clickedPawnsW[0] = mesh
                    this.clickedPawnsW[1].material = mesh.material
                    mesh.material = this.materialp_clicked
                    this.currentPawn = { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z }
                    this.clickedPawnsW[1] = this.clickedPawnsW[0]
                    this.checkAroundPawn(mesh)
                }
                else if (this.clickedPawnsW.length == 0) {
                    this.clickedPawnsW[1] = mesh
                    mesh.material = this.materialp_clicked
                    this.currentPawn = { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z }
                    this.checkAroundPawn(mesh)
                }
            }

            else if (mesh.myname == "b") { //SPRAWDZAMY CZY JEST CZARNY
                if (this.camera.position.z == 90) {
                    return 0;
                }
                if (this.clickedPawnsB.length == 2) {
                    this.clickedPawnsB[0] = mesh
                    this.clickedPawnsB[1].material = mesh.material
                    mesh.material = this.materialp_clicked
                    this.currentPawn = { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z }
                    this.clickedPawnsB[1] = this.clickedPawnsB[0]
                    this.checkAroundPawn(mesh)
                }
                else if (this.clickedPawnsB.length == 0) {
                    this.clickedPawnsB[1] = mesh
                    mesh.material = this.materialp_clicked
                    this.currentPawn = { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z }
                    this.checkAroundPawn(mesh)
                }
            }
        }
        else if (mesh.geometry.type == "BoxGeometry") {
            if (mesh.material == this.materialf_possiblemove && this.myTurn == true) { //JEŻELI JEST ZAZNACZENIE I KLIKNIEMY TO TAM SIĘ PRZEMIESCZAMY
                this.currentPawn.mesh.position.x = mesh.position.x
                this.currentPawn.mesh.position.z = mesh.position.z
                this.pawns[mesh.indexi][mesh.indexj] = this.pawns[this.indexi][this.indexj]; // TUTAJ DO TEGO ŻEBY ZAMIENIĆ 0 NA NUMER PIONKA 
                this.pawns[this.indexi][this.indexj] = 0
                if (this.toDestroyArr.length == 1) {
                    this.pawns[this.toDestroyArr[0].y][this.toDestroyArr[0].x] = 0
                    this.pawns_position[this.toDestroyArr[0].y][this.toDestroyArr[0].x].remove()
                    this.toDestroyArr = []
                }
                this.updatePawns(this.pawns, this.currentPawn.mesh.myname);
            }
            this.clearOldFields()
        }
    }
    checkAroundPawn(mesh) {
        this.indexi = ((mesh.position.z / 5) + 7) / 2 //ZNAJDUJEMY POZYCJĘ PIONKA
        this.indexj = ((mesh.position.x / 5) + 7) / 2
        //this.currentPawn.index = this.pawns[indexi][indexj]
        this.currentPawn.mesh = mesh //PRZYDZIELAMY MESHA PIONKA DO AKTUALNIE WYBRANEGO
        this.colorFields()
    }
    clearOldFields() {
        for (let i = 0; i < this.markedMeshes.old.length; i++) {
            this.markedMeshes.old[i].material = this.material2  //USUWAMY STARE ZAZNACZENIE
        }
    }

    colorFields() {
        if (this.indexi > 0 && this.indexi < 7 && this.indexj > 0 && this.indexj < 7) {
            for (let i = this.indexi - 1; i <= this.indexi + 1; i += 2) { //SZUKAMY GDZIE MOŻNA ZROBIĆ RUCH 
                for (let j = this.indexj - 1; j <= this.indexj + 1; j += 2) {
                    if (this.pawns[i][j] == 0 && this.markedMeshes.old.length > 0) {
                        this.cubes_position[i][j].cube.material = this.materialf_possiblemove //JEŻELI POLE WOKÓŁ MA 0 TO JEST MOŻLIWOŚĆ RUCHU
                        this.markedMeshes.old.push(this.cubes_position[i][j].cube) //ZAPISUJEMY CUBE'A ŻEBY PÓŹNIEJ USUNĄĆ ZAZNACZENIE
                    }
                    else if (this.pawns[i][j] == 0) {
                        this.cubes_position[i][j].cube.material = this.materialf_possiblemove
                        this.markedMeshes.old.push(this.cubes_position[i][j].cube)
                    }
                    else if (this.pawns[i][j] == 2 && i < this.indexi && this.myColour == "w") {
                        if (j - this.indexj < 0 && this.pawns[i - 1][j - 1] == 0) {
                            this.cubes_position[i - 1][j - 1].cube.material = this.materialf_possiblemove
                            this.markedMeshes.old.push(this.cubes_position[i - 1][j - 1].cube)
                            this.toDestroyArr = [{ x: j, y: i }]
                        }
                        else if (j - this.indexj > 0 && this.pawns[i - 1][j + 1] == 0) {
                            this.cubes_position[i - 1][j + 1].cube.material = this.materialf_possiblemove
                            this.markedMeshes.old.push(this.cubes_position[i - 1][j + 1].cube)
                            this.toDestroyArr = [{ x: j, y: i }]
                        }
                    }
                    else if (this.pawns[i][j] == 1 && i > this.indexi && this.myColour == "b") {
                        if (j - this.indexj < 0 && this.pawns[i + 1][j - 1] == 0) {
                            this.cubes_position[i + 1][j - 1].cube.material = this.materialf_possiblemove
                            this.markedMeshes.old.push(this.cubes_position[i + 1][j - 1].cube)
                            this.toDestroyArr = [{ x: j, y: i }]
                        }
                        else if (j - this.indexj > 0 && this.pawns[i + 1][j + 1] == 0) {
                            this.cubes_position[i + 1][j + 1].cube.material = this.materialf_possiblemove
                            this.markedMeshes.old.push(this.cubes_position[i + 1][j + 1].cube)
                            this.toDestroyArr = [{ x: j, y: i }]
                        }
                    }
                }
            }
        }
        else if (this.indexi == 0 && this.indexj > 0 && this.indexj < 7) {
            let i = this.indexi + 1
            for (let j = this.indexj - 1; j <= this.indexj + 1; j += 2) {
                if (this.pawns[i][j] == 0 && this.markedMeshes.old.length > 0) {
                    this.cubes_position[i][j].cube.material = this.materialf_possiblemove //JEŻELI POLE WOKÓŁ MA 0 TO JEST MOŻLIWOŚĆ RUCHU
                    this.markedMeshes.old.push(this.cubes_position[i][j].cube) //ZAPISUJEMY CUBE'A ŻEBY PÓŹNIEJ USUNĄĆ ZAZNACZENIE
                }
                else if (this.pawns[i][j] == 0) {
                    this.cubes_position[i][j].cube.material = this.materialf_possiblemove
                    this.markedMeshes.old.push(this.cubes_position[i][j].cube)
                }
            }
        }
        else if (this.indexi == 7 && this.indexj > 0 && this.indexj < 7) {
            let i = this.indexi - 1
            for (let j = this.indexj - 1; j <= this.indexj + 1; j += 2) {
                if (this.pawns[i][j] == 0 && this.markedMeshes.old.length > 0) {
                    this.cubes_position[i][j].cube.material = this.materialf_possiblemove //JEŻELI POLE WOKÓŁ MA 0 TO JEST MOŻLIWOŚĆ RUCHU
                    this.markedMeshes.old.push(this.cubes_position[i][j].cube) //ZAPISUJEMY CUBE'A ŻEBY PÓŹNIEJ USUNĄĆ ZAZNACZENIE
                }
                else if (this.pawns[i][j] == 0) {
                    this.cubes_position[i][j].cube.material = this.materialf_possiblemove
                    this.markedMeshes.old.push(this.cubes_position[i][j].cube)
                }
            }
        }
        else if (this.indexi > 0 && this.indexi < 7 && this.indexj == 0) {
            let j = this.indexj + 1
            for (let i = this.indexi - 1; i <= this.indexi + 1; i += 2) { //SZUKAMY GDZIE MOŻNA ZROBIĆ RUCH 
                if (this.pawns[i][j] == 0 && this.markedMeshes.old.length > 0) {
                    this.cubes_position[i][j].cube.material = this.materialf_possiblemove //JEŻELI POLE WOKÓŁ MA 0 TO JEST MOŻLIWOŚĆ RUCHU
                    this.markedMeshes.old.push(this.cubes_position[i][j].cube) //ZAPISUJEMY CUBE'A ŻEBY PÓŹNIEJ USUNĄĆ ZAZNACZENIE
                }
                else if (this.pawns[i][j] == 0) {
                    this.cubes_position[i][j].cube.material = this.materialf_possiblemove
                    this.markedMeshes.old.push(this.cubes_position[i][j].cube)
                }

            }
        }
        else if (this.indexi > 0 && this.indexi < 7 && this.indexj == 7) {
            let j = this.indexj - 1
            for (let i = this.indexi - 1; i <= this.indexi + 1; i += 2) { //SZUKAMY GDZIE MOŻNA ZROBIĆ RUCH 
                if (this.pawns[i][j] == 0 && this.markedMeshes.old.length > 0) {
                    this.cubes_position[i][j].cube.material = this.materialf_possiblemove //JEŻELI POLE WOKÓŁ MA 0 TO JEST MOŻLIWOŚĆ RUCHU
                    this.markedMeshes.old.push(this.cubes_position[i][j].cube) //ZAPISUJEMY CUBE'A ŻEBY PÓŹNIEJ USUNĄĆ ZAZNACZENIE
                }
                else if (this.pawns[i][j] == 0) {
                    this.cubes_position[i][j].cube.material = this.materialf_possiblemove
                    this.markedMeshes.old.push(this.cubes_position[i][j].cube)
                }

            }
        }
        else if (this.indexi == 0 && this.indexj == 0) {
            let i = this.indexi + 1
            let j = this.indexj + 1
            if (this.pawns[i][j] == 0 && this.markedMeshes.old.length > 0) {
                this.cubes_position[i][j].cube.material = this.materialf_possiblemove //JEŻELI POLE WOKÓŁ MA 0 TO JEST MOŻLIWOŚĆ RUCHU
                this.markedMeshes.old.push(this.cubes_position[i][j].cube) //ZAPISUJEMY CUBE'A ŻEBY PÓŹNIEJ USUNĄĆ ZAZNACZENIE
            }
            else if (this.pawns[i][j] == 0) {
                this.cubes_position[i][j].cube.material = this.materialf_possiblemove
                this.markedMeshes.old.push(this.cubes_position[i][j].cube)
            }
        }
        else if (this.indexi == 7 && this.indexj == 7) {
            let i = this.indexi - 1
            let j = this.indexj - 1
            if (this.pawns[i][j] == 0 && this.markedMeshes.old.length > 0) {
                this.cubes_position[i][j].cube.material = this.materialf_possiblemove //JEŻELI POLE WOKÓŁ MA 0 TO JEST MOŻLIWOŚĆ RUCHU
                this.markedMeshes.old.push(this.cubes_position[i][j].cube) //ZAPISUJEMY CUBE'A ŻEBY PÓŹNIEJ USUNĄĆ ZAZNACZENIE
            }
            else if (this.pawns[i][j] == 0) {
                this.cubes_position[i][j].cube.material = this.materialf_possiblemove
                this.markedMeshes.old.push(this.cubes_position[i][j].cube)
            }
        }
        else if (this.indexi == 0 && this.indexj == 7) {
            let i = this.indexi + 1
            let j = this.indexj - 1
            if (this.pawns[i][j] == 0 && this.markedMeshes.old.length > 0) {
                this.cubes_position[i][j].cube.material = this.materialf_possiblemove //JEŻELI POLE WOKÓŁ MA 0 TO JEST MOŻLIWOŚĆ RUCHU
                this.markedMeshes.old.push(this.cubes_position[i][j].cube) //ZAPISUJEMY CUBE'A ŻEBY PÓŹNIEJ USUNĄĆ ZAZNACZENIE
            }
            else if (this.pawns[i][j] == 0) {
                this.cubes_position[i][j].cube.material = this.materialf_possiblemove
                this.markedMeshes.old.push(this.cubes_position[i][j].cube)
            }
        }
        else if (this.indexi == 7 && this.indexj == 0) {
            let i = this.indexi - 1
            let j = this.indexj + 1
            if (this.pawns[i][j] == 0 && this.markedMeshes.old.length > 0) {
                this.cubes_position[i][j].cube.material = this.materialf_possiblemove //JEŻELI POLE WOKÓŁ MA 0 TO JEST MOŻLIWOŚĆ RUCHU
                this.markedMeshes.old.push(this.cubes_position[i][j].cube) //ZAPISUJEMY CUBE'A ŻEBY PÓŹNIEJ USUNĄĆ ZAZNACZENIE
            }
            else if (this.pawns[i][j] == 0) {
                this.cubes_position[i][j].cube.material = this.materialf_possiblemove
                this.markedMeshes.old.push(this.cubes_position[i][j].cube)
            }
        }
    }

    clearPawns() {
        this.scene.children.forEach(element => {
            if (element.geometry.type == "CylinderGeometry") {
                this.scene.remove(element)
            }
        });
    }

    downloadPawns = async () => {
        this.pawns = (await net.fetchPostAsyncDownloadPawns()).map
    }

    updatePawns = async (pawns, color) => {
        await net.fetchPostAsyncUpdatePawns(pawns, color)
    }
    askForStart = async () => {
        let answer = await net.fetchPostAsyncCheckIfGameStarted()
        if (answer == 1) {
            document.getElementById("wait").style.display = "none"
            this.game_started = true
        }
    }

    isMyTurn = async (myColour, i) => {
        let answer = await net.fetchPostAsyncCheckIfMyTurn(myColour)
        this.myTurn = answer;
        if (this.myTurn) {
            document.getElementById("timer").style.display = "none"
        }
        else if (!this.myTurn) {
            document.getElementById("timer").style.display = "flex"
            document.getElementById("timer").innerText = i
        }
        if (i == 30) {
            let color
            if (myColour == "w") {
                color = "b"
            }
            else {
                color = "w"
            }
            this.updatePawns(this.pawns, color);
        }
    }
}


// export default Game;