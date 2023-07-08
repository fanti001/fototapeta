import styles from '@/styles/Home.module.css';
import gsap from 'gsap'
import {useEffect, useRef} from "react";
import {wrapper} from "@/styles/gallery.module.css";
import Image from "next/image";
import Link from "next/link";


export default function Sticker() {

	useEffect(() => {

		const image = document.getElementById('image');
		const dino = document.getElementById('dino');
		const title = document.getElementById('title');
		const action = document.getElementById('action');

		gsap.set(image, {autoAlpha: 0});
		gsap.set(dino, {autoAlpha: 0});
		gsap.set(title, {autoAlpha: 0});
		gsap.set(action, {autoAlpha: 0});

		gsap.set(image, {transformOrigin: '50% 50%'});

		const tl = gsap.timeline({defaults: {ease: 'power3.inOut'}});

		tl.fromTo(image, {autoAlpha: 0}, {duration: 5, autoAlpha: 1})
			// .fromTo(dino, {x: '+=300', scale: 0}, {duration: 3, scale: 2, rotate: 5, x: '=0', autoAlpha: 1})
			.fromTo(title, {}, {duration: 3, autoAlpha: 1})
			.fromTo(action, {}, {duration: 2, autoAlpha: 1})
	}, []);

	return (
		<>
			<main className={`${styles.main}`}>
				<div className={`${wrapper}`}>
					<Image
						id="image"
						src={'/images/kitchen/kitchen-background.webp'}
						alt="dino"
						width={1280}
						height={800}
					/>
					<Image className={`${styles.dino}`}
						   src={'/images/dino/dino.webp'}
						   id="dino"
						   alt="d1"
						   width={450}
						   height={300}
					/>
					<h1 className={`${styles.dinoTitle}`} id="title">
						Fototapety do kuchni, i nie tylko...
					</h1>
					<Link href="/kitchen/gallery">
						<button className={`${styles.dinoCallToAction}`}
								id="action"
						>Zobacz
						</button>
					</Link>
				</div>
			</main>
		</>
	);
}
