/* =====================================================
   TOMI CR8TIVES
   Main JavaScript
===================================================== */


/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

    const icon = menuToggle.querySelector("i");

    if (navLinks.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


/* Close mobile menu after clicking a link */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("active");

        const icon = menuToggle.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* ================= NAVBAR SCROLL ================= */

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 50) {

        navbar.classList.add("scrolled");

    } else {

        navbar.classList.remove("scrolled");

    }

});


/* =====================================================
   THREE.JS 3D HERO
===================================================== */

const canvas = document.getElementById("threeCanvas");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
);

camera.position.z = 5;


/* Renderer */

const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true,
    antialias: true
});

renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, 2)
);

renderer.setSize(
    canvas.clientWidth,
    canvas.clientHeight,
    false
);


/* ================= LIGHTING ================= */

const ambientLight = new THREE.AmbientLight(
    0xffffff,
    1.8
);

scene.add(ambientLight);


const blueLight = new THREE.PointLight(
    0x0b63f6,
    4,
    10
);

blueLight.position.set(
    3,
    3,
    4
);

scene.add(blueLight);


const whiteLight = new THREE.PointLight(
    0xffffff,
    3,
    10
);

whiteLight.position.set(
    -3,
    -2,
    4
);

scene.add(whiteLight);


/* =====================================================
   MAIN 3D OBJECT
===================================================== */

/*
   A group containing several rounded
   geometric objects creates a modern
   design-studio style composition.
*/

const mainGroup = new THREE.Group();

scene.add(mainGroup);


/* Main torus */

const torusGeometry = new THREE.TorusKnotGeometry(
    1.15,
    0.32,
    128,
    24,
    2,
    3
);

const torusMaterial = new THREE.MeshPhysicalMaterial({

    color: 0x0b63f6,

    metalness: 0.45,

    roughness: 0.18,

    clearcoat: 1,

    clearcoatRoughness: 0.15

});

const torus = new THREE.Mesh(
    torusGeometry,
    torusMaterial
);

mainGroup.add(torus);


/* White inner sphere */

const sphereGeometry =
    new THREE.SphereGeometry(
        0.65,
        32,
        32
    );

const sphereMaterial =
    new THREE.MeshPhysicalMaterial({

        color: 0xffffff,

        metalness: 0.15,

        roughness: 0.08,

        clearcoat: 1

    });

const sphere =
    new THREE.Mesh(
        sphereGeometry,
        sphereMaterial
    );

sphere.position.z = 0.1;

mainGroup.add(sphere);


/* ================= FLOATING CUBES ================= */

const cubeMaterial =
    new THREE.MeshPhysicalMaterial({

        color: 0x0b63f6,

        metalness: 0.3,

        roughness: 0.25

    });


function createCube(size, x, y, z) {

    const geometry =
        new THREE.BoxGeometry(
            size,
            size,
            size
        );

    const cube =
        new THREE.Mesh(
            geometry,
            cubeMaterial
        );

    cube.position.set(
        x,
        y,
        z
    );

    mainGroup.add(cube);

    return cube;
}


const cubeOne =
    createCube(
        0.25,
        -1.8,
        0.9,
        0
    );

const cubeTwo =
    createCube(
        0.18,
        1.7,
        -0.9,
        0.2
    );

const cubeThree =
    createCube(
        0.15,
        1.5,
        1.1,
        -0.5
    );


/* ================= RINGS ================= */

const ringGeometry =
    new THREE.TorusGeometry(
        1.8,
        0.018,
        16,
        100
    );

const ringMaterial =
    new THREE.MeshBasicMaterial({
        color: 0x0b63f6,
        transparent: true,
        opacity: 0.25
    });

const ring =
    new THREE.Mesh(
        ringGeometry,
        ringMaterial
    );

ring.rotation.x =
    Math.PI / 2.5;

mainGroup.add(ring);


/* ================= MOUSE PARALLAX ================= */

let mouseX = 0;
let mouseY = 0;

let targetRotationX = 0;
let targetRotationY = 0;


window.addEventListener(
    "mousemove",
    (event) => {

        mouseX =
            (event.clientX / window.innerWidth) * 2 - 1;

        mouseY =
            (event.clientY / window.innerHeight) * 2 - 1;

    }
);


/* ================= ANIMATION LOOP ================= */

const clock = new THREE.Clock();


function animateThree() {

    requestAnimationFrame(animateThree);

    const elapsed =
        clock.getElapsedTime();


    /* Automatic rotation */

    torus.rotation.x =
        elapsed * 0.28;

    torus.rotation.y =
        elapsed * 0.35;


    sphere.rotation.y =
        elapsed * 0.25;


    ring.rotation.z =
        elapsed * 0.12;


    cubeOne.rotation.x =
        elapsed * 0.5;

    cubeOne.rotation.y =
        elapsed * 0.7;


    cubeTwo.rotation.x =
        -elapsed * 0.6;

    cubeTwo.rotation.z =
        elapsed * 0.5;


    cubeThree.rotation.y =
        elapsed * 0.7;


    /* Mouse parallax */

    targetRotationY =
        mouseX * 0.25;

    targetRotationX =
        mouseY * 0.18;


    mainGroup.rotation.y +=
        (targetRotationY - mainGroup.rotation.y) * 0.04;

    mainGroup.rotation.x +=
        (targetRotationX - mainGroup.rotation.x) * 0.04;


    renderer.render(
        scene,
        camera
    );
}


animateThree();


/* ================= RESIZE ================= */

function resizeThree() {

    const width =
        canvas.clientWidth;

    const height =
        canvas.clientHeight;

    if (
        canvas.width !== width ||
        canvas.height !== height
    ) {

        renderer.setSize(
            width,
            height,
            false
        );

        camera.aspect =
            width / height;

        camera.updateProjectionMatrix();

    }

}

window.addEventListener(
    "resize",
    resizeThree
);


/* =====================================================
   GSAP ANIMATIONS
===================================================== */

if (
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined"
) {

    gsap.registerPlugin(
        ScrollTrigger
    );


    /* Hero entrance */

    const heroTimeline =
        gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });


    heroTimeline
        .from(".hero-badge", {
            opacity: 0,
            y: 20,
            duration: .6
        })
        .from(".hero h1", {
            opacity: 0,
            y: 45,
            duration: .9
        }, "-=.3")
        .from(".hero-text", {
            opacity: 0,
            y: 25,
            duration: .7
        }, "-=.5")
        .from(".hero-buttons", {
            opacity: 0,
            y: 20,
            duration: .6
        }, "-=.4")
        .from(".hero-trust", {
            opacity: 0,
            y: 15,
            duration: .5
        }, "-=.3")
        .from(".hero-visual", {
            opacity: 0,
            scale: .85,
            duration: 1
        }, "-=.9");


    /* Scroll reveal */

    gsap.utils.toArray(".reveal").forEach(
        element => {

            gsap.fromTo(
                element,

                {
                    opacity: 0,
                    y: 35
                },

                {
                    opacity: 1,
                    y: 0,
                    duration: .8,
                    ease: "power3.out",

                    scrollTrigger: {

                        trigger: element,

                        start: "top 85%",

                        once: true

                    }

                }
            );

        }
    );


    /* Service cards stagger */

    gsap.from(
        ".service-card",

        {
            opacity: 0,
            y: 50,
            duration: .7,
            stagger: .1,
            ease: "power3.out",

            scrollTrigger: {

                trigger: ".services-grid",

                start: "top 80%",

                once: true

            }

        }
    );


    /* CTA animation */

    gsap.from(
        ".cta-content",

        {

            opacity: 0,
            scale: .92,
            duration: 1,

            scrollTrigger: {

                trigger: ".cta-section",

                start: "top 80%",

                once: true

            }

        }
    );

}


/* =====================================================
   3D TILT CARDS
===================================================== */

const tiltCards =
    document.querySelectorAll(
        ".tilt-card"
    );


tiltCards.forEach(card => {

    card.addEventListener(
        "mousemove",
        event => {

            if (
                window.innerWidth < 768
            ) return;


            const rect =
                card.getBoundingClientRect();


            const x =
                event.clientX -
                rect.left;

            const y =
                event.clientY -
                rect.top;


            const centerX =
                rect.width / 2;

            const centerY =
                rect.height / 2;


            const rotateX =
                ((y - centerY) /
                    centerY) *
                -4;


            const rotateY =
                ((x - centerX) /
                    centerX) *
                4;


            card.style.transform =
                `perspective(800px)
                 rotateX(${rotateX}deg)
                 rotateY(${rotateY}deg)
                 translateY(-5px)`;

        }
    );


    card.addEventListener(
        "mouseleave",
        () => {

            card.style.transform =
                "";

        }
    );

});


/* =====================================================
   CONTACT FORM
===================================================== */

const contactForm =
    document.getElementById(
        "contactForm"
    );

const successMessage =
    document.getElementById(
        "successMessage"
    );


contactForm.addEventListener(
    "submit",
    event => {

        event.preventDefault();


        /* Native HTML validation */

        if (
            !contactForm.checkValidity()
        ) {

            contactForm.reportValidity();

            return;

        }


        /* Show success message */

        successMessage.classList.add(
            "show"
        );


        /* Reset form */

        contactForm.reset();


        /* Automatically hide message */

        setTimeout(() => {

            successMessage.classList.remove(
                "show"
            );

        }, 6000);

    }
);


/* =====================================================
   SMOOTH ANCHOR LINKS
===================================================== */

document
    .querySelectorAll(
        'a[href^="#"]'
    )
    .forEach(link => {

        link.addEventListener(
            "click",
            event => {

                const targetId =
                    link.getAttribute(
                        "href"
                    );


                if (
                    targetId === "#"
                ) return;


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) return;


                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth"
                });

            }
        );

    });


/* =====================================================
   REDUCED MOTION
===================================================== */

const reducedMotion =
    window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


if (reducedMotion) {

    /* Stop unnecessary 3D animation */

    renderer.setAnimationLoop(null);

}