// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const images = [
	// {
	// 	category: "collection",
	// 	name: "auta.jpg",
	// 	id: "01",
	// },
	// {
	// 	category: "collection",
	// 	name: "beach.jpg",
	// 	id: "02",
	// },
	// {
	// 	category: "collection",
	// 	name: "fruit.jpg",
	// 	id: "03",
	// },
	// {
	// 	category: "collection",
	// 	name: "kosmos.jpg",
	// 	id: "04",
	// },
	// {
	// 	category: "collection",
	// 	name: "spa.jpg",
	// 	id: "05",
	// },
	// {
	// 	category: "collection",
	// 	name: "street.jpg",
	// 	id: "06",
	// },
	// {
	// 	category: "collection",
	// 	name: "coffee.jpg",
	// 	id: "07",
	// },
	// {
	// 	category: "collection",
	// 	name: "horse.jpg",
	// 	id: "08",
	// },
	// {
	// 	category: "collection",
	// 	name: "mountain.jpg",
	// 	id: "09",
	// },
	// {
	// 	category: "collection",
	// 	name: "widoki.jpg",
	// 	id: "10",
	// },
	// {
	// 	category: "collection",
	// 	name: "boat.jpg",
	// 	id: "11",
	// },
	// {
	// 	category: "collection",
	// 	name: "fauna.jpg",
	// 	id: "12",
	// },
	// {
	// 	category: "collection",
	// 	name:"super.jpg",
	// 	id: "13",
	// },
	{
		category: "kitchen",
		name:"kitchen_1.jpeg",
		id: "14",
	},
	{
		category: "kitchen",
		name:"kitchen_2.jpeg",
		id: "15",
	},
	{
		category: "kitchen",
		name:"kitchen_3.jpeg",
		id: "16",
	},
	{
		category: "kitchen",
		name:"kitchen_4.jpeg",
		id: "17",
	},
	{
		category: "kitchen",
		name:"kitchen_5.jpeg",
		id: "18",
	},
	{
		category: "kitchen",
		name:"kitchen_6.jpeg",
		id: "19",
	},
	{
		category: "kitchen",
		name:"kitchen_7.jpeg",
		id: "20",
	},
	{
		category: "kitchen",
		name:"kitchen_8.jpeg",
		id: "21",
	},
	{
		category: "kitchen",
		name:"kitchen_9.jpeg",
		id: "22",
	},
	{
		category: "kitchen",
		name:"kitchen_10.jpeg",
		id: "23",
	},
	{
		category: "kitchen",
		name:"kitchen_11.jpeg",
		id: "24",
	},
	{
		category: "kitchen",
		name:"kitchen_12.jpeg",
		id: "25",
	},
	{
		category: "kitchen",
		name:"kitchen_13.jpeg",
		id: "26",
	},
	{
		category: "kitchen",
		name:"kitchen_14.jpeg",
		id: "27",
	},
	{
		category: "kitchen",
		name:"kitchen_15.jpeg",
		id: "28",
	},
]
export default function handler(req, res) {
	res.status(200).json(images)
}


