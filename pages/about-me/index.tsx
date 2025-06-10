import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useThree, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { motion, useScroll } from "framer-motion";
import { BackgroundGradient } from "../../components/ui/backgroundGradiant";

extend({ MeshLineGeometry, MeshLineMaterial });
useGLTF.preload("/assets/blog/img_bin/justin.glb");
useTexture.preload("/assets/blog/img_bin/black.png");

export default function AboutMe() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="container mx-auto min-h-screen px-4">
      <div className="relative flex flex-col md:flex-row h-auto md:h-[600px] mt-5 md:mt-10 gap-8">
        <BackgroundGradient
          containerClassName="flex-1 h-full w-full md:w-1/2 order-2 p-3 rounded-2xl"
          className="h-full bg-transparent"
        >
          <Canvas
            className="h-[400px] md:h-full rounded-[12px]"
            camera={{ position: [0, 0, 13], fov: 25 }}
            style={{ pointerEvents: "none" }}
          >
            <ambientLight intensity={Math.PI} />
            <Physics
              interpolate
              gravity={[0, -40, 0]}
              timeStep={1 / 60}
            >
              <Band />
            </Physics>
            <Environment background blur={0.75}>
              <Lightformer
                intensity={2}
                color="white"
                position={[0, -1, 5]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={3}
                color="white"
                position={[-1, -1, 1]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={3}
                color="white"
                position={[1, 1, 1]}
                rotation={[0, 0, Math.PI / 3]}
                scale={[100, 0.1, 1]}
              />
              <Lightformer
                intensity={10}
                color="white"
                position={[-10, 0, 14]}
                rotation={[0, Math.PI / 2, Math.PI / 3]}
                scale={[100, 10, 1]}
              />
            </Environment>
          </Canvas>
        </BackgroundGradient>
        <div className="flex-1 w-full md:w-1/2 flex flex-col justify-center bg-black/50 rounded-2xl p-8">
          <AboutMeInfo />
        </div>
      </div>
    </div>
  );
}

function AboutMeInfo() {
  return (
    <div className="text-white space-y-6 overflow-auto max-h-[600px]">
      <h1 className="text-4xl font-bold">Justin Bender</h1>
      <div className="text-sm space-y-1">
        <p>SomeScripting.com</p>
        <p>
          <a
            href="https://github.com/ScriptAlchemist"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            github.com/ScriptAlchemist
          </a>
        </p>
        <p>USA</p>
        <p>
          <a
            href="https://linkedin.com/in/benderjustin"
            className="underline"
            target="_blank"
            rel="noreferrer"
          >
            linkedin.com/in/benderjustin
          </a>
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Experience</h2>
        <ExperienceItem
          title="Prompt Engineer"
          company="Paperstac"
          date="Apr 2025 - Present"
          description="Build out prompts (Agentic Development), that do work that I review. Fixing all of it's mistakes..."
        />
        <ExperienceItem
          title="Software Engineer"
          company="Paperstac"
          date="Sep 2023 - Present"
          description={
            <>
              Building with Turborepo, sharing UI Storybook design
              libraries to scale 3+ applications at once
              <br />
              Developing React components for Next.js, ensuring reusable
              design across multiple apps
              <br />
              Maintaining legacy applications, fixing bugs, and
              integrating AI-driven features
            </>
          }
        />
        <ExperienceItem
          title="Software Engineer"
          company="Bridge Discussion/Job Searching"
          date="Mar 2023 - Sep 2023"
          description={
            <>
              Developed using a JavaScript stack (React/Next.js) with
              GCP/Firebase
              <br />
              Designed and implemented product features for Bridge
              Discussion
              <br />
              Built functional demos for funding presentations
            </>
          }
        />
        <ExperienceItem
          title="Software Engineer"
          company="Cardano Goat"
          date="Nov 2021 - Jan 2023"
          description={
            <>
              Developed WASM-integrated applications for seamless
              interaction with Cardano blockchain
              <br />
              Worked with React, Next.js, TypeScript, TailwindCSS, Rust,
              WebAssembly, IPFS, and Cardano wallet extensions
              <br />
              Integrated cutting-edge open-source tools to maintain a
              competitive edge
              <br />
              Designed customer-focused products from 3D-rendered NFTs
              to full web applications
            </>
          }
        />
        <ExperienceItem
          title="Software Developer"
          company="Freelance Contracts"
          date="Feb 2020 - Nov 2021"
          description={
            <>
              Adapted to client requirements using Angular, React, Wix,
              GoDaddy, Google Firestore
              <br />
              Built full-stack websites from design wireframes, offering
              up to 3 revisions
              <br />
              Optimized website performance, reducing load times from
              12s to 1-3s (90% faster) following Google's
              recommendations
            </>
          }
        />
        <ExperienceItem
          title="Angular Developer"
          company="Proxify"
          date="Oct 2019 - Jan 2020"
          description={
            <>
              Fixed a critical production login issue, restoring full
              application functionality
              <br />
              Developed and maintained Angular 5 frontend for a
              contractor job-finding platform
            </>
          }
        />
        <ExperienceItem
          title="Junior Software Developer"
          company="Therigy"
          date="Feb 2018 - Apr 2019"
          description={
            <>
              Built user-centric web applications using AngularJS 1.6
              and PHP
              <br />
              Maintained and upgraded three legacy software systems for
              specialty pharmacy prescription and appointment management
              <br />
              Developed testing suites for Quality Assurance, boosting
              efficiency by 60%
            </>
          }
        />
        <ExperienceItem
          title="Frontend Developer"
          company="Sky Pirates"
          date="Jan 2018 - Mar 2018"
          description={
            <>
              Developed and optimized an Angular 6+ frontend, achieving
              an 85% Google Lighthouse performance score
              <br />
              Fostered an inclusive work environment training new
              skydivers
            </>
          }
        />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Skills</h2>
        <ul className="list-disc ml-6 space-y-1 text-sm">
          <li>
            Programming Languages: JavaScript, TypeScript, Rust, Golang,
            Python, PHP
          </li>
          <li>
            Frontend Technologies: HTML5, CSS3, React.js, Next.js,
            TailwindCSS, Bootstrap, Redux
          </li>
          <li>
            Backend & Databases: Node.js, Express.js, MongoDB, SQL,
            NoSQL, GraphQL, RESTful APIs
          </li>
          <li>
            Cloud & DevOps: AWS, Google Cloud, Firebase, CI/CD, Docker,
            Kubernetes, Serverless, UNIX, Linux
          </li>
          <li>
            Other: Microservices, Distributed Systems, OpenAI Prompting,
            PWA, WebAssembly (WASM), Unreal Engine
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-2">Projects</h2>
        <div className="text-sm">
          <p>
            <b>Some Scripting</b> - Software Developer - 2023
          </p>
          <p>
            Personal blog utilizing Markdown-based notes generation
            <br />
            <a
              href="https://github.com/ScriptAlchemist/just_in"
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Repository
            </a>{" "}
            |{" "}
            <a
              href="https://www.somescripting.com"
              className="underline"
              target="_blank"
              rel="noreferrer"
            >
              Website
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}

function ExperienceItem({ title, company, date, description }) {
  return (
    <div className="mb-4 text-sm">
      <h3 className="font-semibold">{title}</h3>
      <p className="italic text-gray-300">
        {company} - {date}
      </p>
      <p className="whitespace-pre-line">{description}</p>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 10 }) {
  const band = useRef(), fixed = useRef(), j1 = useRef(), j2 = useRef(), j3 = useRef(), card = useRef() // prettier-ignore
  const vec = new THREE.Vector3(), ang = new THREE.Vector3(), rot = new THREE.Vector3(), dir = new THREE.Vector3() // prettier-ignore
  const segmentProps = {
    type: "dynamic",
    canSleep: true,
    colliders: false,
    angularDamping: 2,
    linearDamping: 2,
  };
  const { nodes, materials } = useGLTF(
    "/assets/blog/img_bin/justin.glb",
  );
  const texture = useTexture("/assets/blog/img_bin/black.png");
  const { width, height } = useThree((state) => state.size);
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ]),
  );
  const [dragged, drag] = useState(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]) // prettier-ignore
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.45, 0]]) // prettier-ignore

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => void (document.body.style.cursor = "auto");
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec
        .set(state.pointer.x, state.pointer.y, 0.5)
        .unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(
        (ref) => ref.current && ref.current.wakeUp(),
      );
      card.current?.setNextKinematicTranslation({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      // Fix most of the jitter when over pulling the card
      [j1, j2].forEach((ref) => {
        if (!ref.current.lerped)
          ref.current.lerped = new THREE.Vector3().copy(
            ref.current?.translation(),
          );
        const clampedDistance = Math.max(
          0.1,
          Math.min(
            1,
            ref.current.lerped.distanceTo(ref.current?.translation()),
          ),
        );
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
        );
      });
      // Calculate catmul curve
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(32));
      // Tilt it back towards the screen
      ang.copy(card.current.angvel());
      rot.copy(card.current.rotation());
      card.current.setAngvel({
        x: ang.x,
        y: ang.y - rot.y * 0.25,
        z: ang.z,
      });
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? "kinematicPosition" : "dynamic"}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group
            scale={2.25}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={(e) => (
              e.target.releasePointerCapture(e.pointerId), drag(false)
            )}
            onPointerDown={(e) => (
              e.target.setPointerCapture(e.pointerId),
              drag(
                new THREE.Vector3()
                  .copy(e.point)
                  .sub(vec.copy(card.current.translation())),
              )
            )}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.3}
                metalness={0.5}
              />
            </mesh>
            <mesh
              geometry={nodes.clip.geometry}
              material={materials.metal}
              material-roughness={0.3}
            />
            <mesh
              geometry={nodes.clamp.geometry}
              material={materials.metal}
            />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={[width, height]}
          useMap
          map={texture}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
