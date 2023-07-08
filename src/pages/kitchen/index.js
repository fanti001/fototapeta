import styles from '@/styles/Home.module.css';
import gsap from 'gsap'
import {useEffect, useRef} from "react";
import {wrapper} from "@/styles/gallery.module.css";
import Image from "next/image";
import Link from "next/link";


export default function Kitchen() {

	useEffect(() => {

		const image = document.getElementById('background');
		const title = document.getElementById('title');
		const action = document.getElementById('action');

		gsap.set(image, {autoAlpha: 0});
		gsap.set(title, {autoAlpha: 0});
		gsap.set(action, {autoAlpha: 0});

		gsap.set(image, {transformOrigin: '50% 50%'});

		const tl = gsap.timeline({defaults: {ease: 'power3.inOut'}});

		tl.fromTo(image, {autoAlpha: 0}, {duration: 1, autoAlpha: 1})
			.fromTo(title, {}, {duration: 1, autoAlpha: 1})
			.fromTo(action, {}, {duration: 2, autoAlpha: 1})
	}, []);

	return (
		<>
			<main className={`${styles.main}`}>
				<div className={`${wrapper}`}>
					<Image className={`${styles.jwBackground}`}
						id="background"
						src={'/images/kitchen/kitchen_back.webp'}
						alt="kitchen"
						width={1800}
						height={900}
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
