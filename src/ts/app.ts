import * as THREE from "three"
import TWEEN from "@tweenjs/tween.js"

export default class Engine {

    scene: THREE.Scene
    camera: THREE.PerspectiveCamera
    renderer: THREE.WebGLRenderer
    lights: { ambient: THREE.AmbientLight, frontal: THREE.DirectionalLight }
    state: {
        frameCounter: number
    }
    raycaster: THREE.Raycaster
    mouse: THREE.Vector2

    constructor() {
        this.scene = new THREE.Scene()
        this.scene.fog = new THREE.Fog(0xdddddd, 7, 20)
        
        this.state = {
            frameCounter: 0
        }
        
        this.raycaster = new THREE.Raycaster()
        this.mouse = new THREE.Vector2(1, 1)
        
        this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

        this.camera.position.x = -4
        this.camera.position.y = -3
        this.camera.position.z = 5
        
        this.renderer = new THREE.WebGLRenderer({alpha: true})
        this.renderer.setClearAlpha(0.0)
        this.renderer.setClearColor(0x000000, 0)
        this.renderer.setPixelRatio( window.devicePixelRatio )

        this.lights = {
            ambient: new THREE.AmbientLight(0xffffff, 1.4),
            frontal: new THREE.DirectionalLight(0xffcccc, 0.3)
        }
        this.lights.frontal.position.x = 1
        this.lights.frontal.position.y = 1
        this.lights.frontal.position.z = 1
        this.lights.frontal.castShadow = true
        this.lights.frontal.shadow.camera.top = 0.6
        this.lights.frontal.shadow.camera.right = 0.6
        this.lights.frontal.shadow.camera.bottom = - 0.6
        this.lights.frontal.shadow.camera.left = - 0.6
        for (const l of Object.values(this.lights)) {
            this.scene.add(l)
        }

        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.domElement.classList.add('three-scene')
        this.renderer.domElement.setAttribute('style', `width: 100%; height: 100%;`)
        document.body.appendChild( this.renderer.domElement )
        
        window.addEventListener("resize", () => {
            this.renderer.setSize(window.innerWidth, window.innerHeight)
            this.camera.aspect = window.innerWidth / window.innerHeight
            this.camera.updateProjectionMatrix()
        })

        this.animate()
    }
    
    animate = () => {
        requestAnimationFrame( this.animate )
        TWEEN.update()

        // keep track of frame number to give custom rythm to animations
        this.state.frameCounter === 60 ? this.state.frameCounter = 0 : this.state.frameCounter++
        
        this.raycaster.setFromCamera( this.mouse, this.camera )
        
        this.renderer.render( this.scene, this.camera )
    }
}

new Engine()
