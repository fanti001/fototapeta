import Image from 'next/image'
import {Inter} from 'next/font/google'
import {Montserrat} from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({subsets: ['latin']})
const monserrat = Montserrat({subsets: ['latin']})

export default function Home() {

	return (
		<main className={styles.main}>
			<div className={styles.description}>
				<p>
				Fototapety dla Ciebie, na wymiar.
				</p>
					<div>
						<a
							href="https://kamedia.pl"
							target="_blank"
							rel="noopener noreferrer"
						>
							By{' '}
							<Image
								src="/kamedia.svg"
								alt="Kamedia Logo"
								className={styles.vercelLogo}
								width={300}
								height={50}
								priority
							/>
						</a>
					</div>
			</div>

			<div className={styles.center}>
				<Image
					className={styles.logo}
					src="/fototapeta.svg"
					alt="Fototapeta Logo"
					width={3600}
					height={450}
					priority
				/>
			</div>

			<div className={styles.grid}>
				<a
					href="/roarr"
					className={styles.card}
					target="_blank"
					rel="noopener noreferrer"
				>
					<h2>
						Roarrr<span>-&gt;</span>
					</h2>
					<p>Fototapety z dinozaurami.</p>
				</a>

				<a
					href="https://kitchen"
					className={styles.card}
					target="_blank"
					rel="noopener noreferrer"
				>
					<h2>
						Kuchnia <span>-&gt;</span>
					</h2>
					<p>Zobacz jakie piękne rzeczy można zrobić w &nbsp;kuchni!</p>
				</a>

				<a
					href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
					className={styles.card}
					target="_blank"
					rel="noopener noreferrer"
				>
					<h2>
						Naklejki <span>-&gt;</span>
					</h2>
					<p>Explore the Next.js 13 playground.</p>
				</a>

				<a
					href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
					className={styles.card}
					target="_blank"
					rel="noopener noreferrer"
				>
					<h2>
						Obrazy <span>-&gt;</span>
					</h2>
					<p>
						Instantly deploy your Next.js site to a shareable URL with Vercel.
					</p>
				</a>
			</div>
		</main>
)
}
