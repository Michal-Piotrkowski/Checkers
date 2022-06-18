class Game {
    constructor() {

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
        this.clickedPawnsW = [];
        this.clickedPawnsB = [];
    }

    render = () => {
        this.renderer.render(this.scene, this.camera);
        this.camera.lookAt(this.cube_c.position);
        this.camera.updateProjectionMatrix();
        requestAnimationFrame(this.render);
        console.log("render leci")
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
                    this.cubes_position[i][j] = { 'x': cube.position.x, 'y': cube.position.y, 'z': cube.position.z }
                    this.scene.add(cube)
                }
                else {
                    const cube = new THREE.Mesh(this.boxgeometry, this.material2);
                    cube.position.x = -35 + (j * 20) / 2;
                    cube.position.y = 0;
                    cube.position.z = -35 + (i * 20) / 2;
                    this.cubes_position[i][j] = { 'x': cube.position.x, 'y': cube.position.y, 'z': cube.position.z }
                    this.scene.add(cube)
                }
            }
        }
        console.log(this.szachownica)
    }

    createPawns() {
        for (let i = 0; i < this.pawns.length; i++) {
            for (let j = 0; j < this.pawns[0].length; j++) {
                if (this.pawns[i][j] == 1) {
                    const pawn = new THREE.Mesh(this.pawngeometry, this.materialp1);
                    pawn.position.x = this.cubes_position[i][j].x;
                    pawn.position.y = this.cubes_position[i][j].y + 5;
                    pawn.position.z = this.cubes_position[i][j].z;
                    this.scene.add(pawn)
                }
                else if (this.pawns[i][j] == 2) {
                    const pawn = new THREE.Mesh(this.pawngeometry, this.materialp2);
                    pawn.position.x = this.cubes_position[i][j].x;
                    pawn.position.y = this.cubes_position[i][j].y + 5;
                    pawn.position.z = this.cubes_position[i][j].z;
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
        if (this.clickedPawns.length == 0) {
            if (mesh.geometry.type == "CylinderGeometry" && this.camera.position.z == 0) {
                this.clickedPawnsW[1] = mesh
                mesh.material = this.materialp_clicked
                this.currentPawn = { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z }
                console.log(mesh.material)
                console.log(this.clickedPawns.length)
            }
            if (mesh.geometry.type == "CylinderGeometry" && this.camera.position.z == -90) {
                this.clickedPawnsB[1] = mesh
                mesh.material = this.materialp_clicked
                this.currentPawn = { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z }
                console.log(mesh.material)
                console.log(this.clickedPawns.length)
            }
        }
        else if (this.clickedPawns.length == 2) {
            if (mesh.geometry.type == "CylinderGeometry" && this.camera.position.z == 0) {
                this.clickedPawnsW[0] = mesh
                this.clickedPawnsW[1].material = mesh.material
                mesh.material = this.materialp_clicked
                this.currentPawn = { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z }
                console.log(mesh.material)
                this.clickedPawnsW[1] = this.clickedPawnsW[0]
            }
            else if (mesh.geometry.type == "CylinderGeometry" && this.camera.position.z == -90) {
                this.clickedPawnsB[0] = mesh
                this.clickedPawnsB[1].material = mesh.material
                mesh.material = this.materialp_clicked
                this.currentPawn = { x: mesh.position.x, y: mesh.position.y, z: mesh.position.z }
                console.log(mesh.material)
                this.clickedPawnsB[1] = this.clickedPawnsB[0]
            }
        }
    }
}


// export default Game;