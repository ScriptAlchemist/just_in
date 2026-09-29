// @ts-nocheck

import {
  Environment,
  Lightformer,
  useGLTF,
  useTexture,
} from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { ArrowUpRight, MapPin } from "lucide-react";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { BackgroundGradient } from "../../components/ui/backgroundGradiant";

extend({ MeshLineGeometry, MeshLineMaterial });
useGLTF.preload("/assets/blog/img_bin/justin.glb");
useTexture.preload("/assets/blog/img_bin/black.png");

export default function AboutMe() {
  return (
    <>
      <Head>
        <title>About Justin Bender — Product Engineering Consultant</title>
        <meta
          name="description"
          content="Software engineering experience across product development, frontend systems, AI workflows, performance, and emerging technology."
        />
      </Head>
      <main className="about-page page-shell">
        <AboutMeInfo />
      </main>
    </>
  );
}

export function ImagePhysics() {
  return (
    <BackgroundGradient
      containerClassName="h-full rounded-2xl"
      className="h-full"
      transparent
      animate={false}
    >
      <Canvas
        className="h-[400px] md:h-full rounded-[12px]"
        camera={{ position: [0, 0, 13], fov: 25 }}
        style={{}}
      >
        <ambientLight intensity={Math.PI} />
        <Physics interpolate gravity={[0, -40, 0]} timeStep={1 / 60}>
          <Band />
        </Physics>
        <Environment blur={0.75}>
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
  );
}

function AboutMeInfo() {
  return (
    <div className="about-content">
      <section className="about-hero">
        <div className="about-hero-copy">
          <p className="eyebrow">About Justin</p>
          <h1>Builder first. Translator always.</h1>
          <p className="about-lede">
            I&apos;m a software engineer and consultant who helps teams turn
            difficult product ideas into clear, maintainable systems.
          </p>
          <p>
            My work spans frontend architecture, product development, legacy
            modernization, AI-assisted workflows, developer tooling, and
            emerging technology. I&apos;m most useful where technical depth and
            practical product judgment need to meet.
          </p>
          <div className="about-location">
            <MapPin aria-hidden="true" /> United States · Working remotely
          </div>
          <div className="hero-actions">
            <Link
              href="https://www.linkedin.com/in/benderjustin"
              target="_blank"
              rel="noopener noreferrer"
              className="button button-primary"
            >
              Connect on LinkedIn <ArrowUpRight aria-hidden="true" />
            </Link>
            <Link href="/#insights" className="button button-secondary">
              Read the journal
            </Link>
          </div>
        </div>
        <div className="about-badge-stage">
          <ImagePhysics />
          <p>Drag the badge</p>
        </div>
      </section>

      <section className="about-profile-strip" aria-label="Professional profile">
        <div>
          <strong>8+ years</strong>
          <span>professional engineering</span>
        </div>
        <div>
          <strong>Product + platform</strong>
          <span>from interface to infrastructure</span>
        </div>
        <div>
          <strong>Hands-on delivery</strong>
          <span>strategy that ends in shipped work</span>
        </div>
      </section>

      <section className="resume-section">
        <div className="resume-heading">
          <p className="eyebrow">Experience</p>
          <h2>A career spent making software more useful.</h2>
          <p>
            From healthcare and contractor platforms to blockchain products,
            shared frontend systems, and AI-assisted engineering.
          </p>
        </div>
        <div className="experience-list">
          <ExperienceItem
            title="Prompt Engineer"
            company="Paperstac"
            date="Apr 2025 - Present"
            description={[
              "Designed agentic development prompts that produce reviewable work, with human oversight and correction built into the workflow.",
            ]}
          />
          <ExperienceItem
            title="Software Engineer"
            company="Paperstac"
            date="Present"
            description={[
              "Built shared UI and Storybook libraries in a Turborepo supporting three or more applications.",
              "Developed reusable React components for Next.js products.",
              "Maintained legacy applications, resolved production issues, and integrated AI-driven features.",
            ]}
          />
          <ExperienceItem
            title="Software Engineer"
            company="Bridge Discussion/Job Searching"
            date="Mar 2023 - Sep 2023"
            description={[
              "Developed using a JavaScript stack (React/Next.js) with GCP/Firebase",
              "Designed and implemented product features for Bridge Discussion",
              "Built functional demos for funding presentations",
            ]}
          />
          <ExperienceItem
            title="Software Engineer"
            company="Cardano Goat"
            date="Nov 2021 - Jan 2023"
            description={[
              "Developed WASM-integrated applications for seamless interaction with Cardano blockchain",
              "Worked with React, Next.js, TypeScript, TailwindCSS, Rust, WebAssembly, IPFS, and Cardano wallet extensions",
              "Integrated cutting-edge open-source tools to maintain a competitive edge",
              "Designed customer-focused products from 3D-rendered NFTs to full web applications",
            ]}
          />
          <ExperienceItem
            title="Software Developer"
            company="Freelance Contracts"
            date="Feb 2020 - Nov 2021"
            description={[
              "Adapted to client requirements using Angular, React, Wix, GoDaddy, Google Firestore",
              "Built full-stack websites from design wireframes, offering up to 3 revisions",
              "Optimized website performance, reducing load times from 12s to 1-3s (90% faster) following Google's recommendations",
            ]}
          />
          <ExperienceItem
            title="Angular Developer"
            company="Proxify"
            date="Oct 2019 - Jan 2020"
            description={[
              "Fixed a critical production login issue, restoring full application functionality",
              "Developed and maintained Angular 5 frontend for a contractor job-finding platform",
            ]}
          />
          <ExperienceItem
            title="Junior Software Developer"
            company="Therigy"
            date="Feb 2018 - Apr 2019"
            description={[
              "Built user-centric web applications using AngularJS 1.6",
              "Maintained and upgraded three legacy software systems for specialty pharmacy prescription and appointment management",
              "Developed testing suites for Quality Assurance, boosting efficiency by 60%",
            ]}
          />
          <ExperienceItem
            title="Frontend Developer"
            company="Sky Pirates"
            date="Jan 2018 - Mar 2018"
            description={[
              "Developed and optimized an Angular 6+ frontend, achieving an 95% Google Lighthouse performance score",
              "Fostered an inclusive work environment training new skydivers",
            ]}
          />
        </div>
      </section>

      <section className="capabilities-section">
        <div className="resume-heading">
          <p className="eyebrow">Technical range</p>
          <h2>Broad enough to see the system. Deep enough to build it.</h2>
        </div>
        <div className="capability-grid">
          <div className="capability-card">
            <span>Languages</span>
            <p>
            JavaScript, TypeScript, Rust, Golang, Python, PHP
            </p>
          </div>
          <div className="capability-card">
            <span>Frontend systems</span>
            <p>
            HTML5, CSS3, React.js, Next.js, TailwindCSS, Bootstrap,
            Redux, Angular, AngularJS
            </p>
          </div>
          <div className="capability-card">
            <span>Backend &amp; data</span>
            <p>
            Node.js, Express.js, MongoDB, SQL, NoSQL, GraphQL, RESTful
            APIs, Google Firestore
            </p>
          </div>
          <div className="capability-card">
            <span>Cloud &amp; delivery</span>
            <p>AWS,
            Google Cloud (GCP), Firebase, CI/CD, Docker, Kubernetes,
            Serverless, UNIX, Linux, Turborepo</p>
          </div>
          <div className="capability-card capability-card-wide">
            <span>Specialties</span>
            <p>Microservices,
            Distributed Systems, Anthropic Prompting, Ollama Prompting,
            OpenAI Prompting, PWA, WebAssembly (WASM), Unreal Engine,
            Storybook, IPFS, Cardano (Blockchain), Wix, GoDaddy</p>
          </div>
        </div>
      </section>

      <section className="project-section">
        <div>
          <p className="eyebrow">Independent project</p>
          <h2>Some(Scripting)</h2>
          <p>
            A Markdown-powered engineering journal and testing ground for ideas
            in Next.js, TypeScript, accessibility, developer tooling, and the
            occasional deep dive.
          </p>
        </div>
        <div className="project-links">
            <a
              href="https://github.com/ScriptAlchemist/just_in"
              target="_blank"
              rel="noreferrer"
            >
              GitHub Repository <ArrowUpRight aria-hidden="true" />
            </a>
            <a
              href="https://www.somescripting.com"
              target="_blank"
              rel="noreferrer"
            >
              Visit the journal <ArrowUpRight aria-hidden="true" />
            </a>
        </div>
      </section>
      <p className="about-disclaimer">
        Opinions shared here are my own and do not represent any employer.
      </p>
    </div>
  );
}

function ExperienceItem({
  title,
  company,
  date,
  description,
}: {
  title: string;
  company: string;
  date: string;
  description: string[];
}) {
  return (
    <article className="experience-item">
      <div className="experience-title">
        <div>
          <h3>{company}</h3>
          <p>{title}</p>
        </div>
        <time>{date}</time>
      </div>
      <ul>
        {description.map((desc, index) => (
          <li key={index}>{desc}</li>
        ))}
      </ul>
    </article>
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
          alphaTest={0.1}
          alphaToCoverage={true}
          transparent={true}
          repeat={[-3, 1]}
          lineWidth={1}
        />
      </mesh>
    </>
  );
}
