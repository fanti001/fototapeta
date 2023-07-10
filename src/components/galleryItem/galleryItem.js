import Image from "next/image";
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from 'next/router';

const initialImages = [
	{
		"id":1,
		"orgWidth":10223,
		"orgHeight":1772,
		"thumbWidth":1200,
		"thumbHeight":208,
		"thumbSrc":"images/1200/f-13.jpg",
		"miniWidth": 550,
		"miniHeight": 180,
		"miniSrc": "images/550/f-13.jpg",
		"name":"f-13.jpg"
	}
	]

export default function GalleryItem({className}) {
	const router = useRouter();

	const [images, setImages] = useState(initialImages)

	useEffect(() => {
		axios({
			method: 'get',
			baseURL: 'http://localhost:8000',
			url: '/api/images/',
			responseType: 'json',
		})
			.then(({data}) => {
				setImages(data);
			})
			.catch(function (error) {
				// handle error
				console.log(error);
			})
			.finally(function () {
				// console.log(images)
			});
	}, []);

	return (
		<>
			{images.map((image) => (
					<Image
						onClick={() => router.push(`/cropper2/${image.id}`)}
						data={"hello"}
						key={image.id}
						src={`http://localhost:8000/${image.miniSrc}`}
						alt={image.name}
						width={image.miniWidth}
						height={image.miniHeight}
						className={className}
					/>
				)
			)}
		</>
	)
}
