import { CategoryType, FeatureColumnType, FeatureType, Product } from "@/types";

export const CATEGORIES: CategoryType[] = [
    {
        img: '/images/explore/vegetables.png',
        title: 'Fresh Vegetables',
        bgColor: 'bg-yellow-200',
        category: 'vegetables'
    },
    {
        img: '/images/explore/fruits.png',
        title: 'Fresh Fruits',
        bgColor: 'bg-red-200',
        category: 'fruits'
    },
    {
        img: '/images/explore/drinks.png',
        title: 'Cold Drinks',
        bgColor: 'bg-violet-200',
        category: 'drinks'
    },
    {
        img: '/images/explore/bread.png',
        title: 'Bakery & Bread',
        bgColor: 'bg-blue-200',
        category: 'bakery'
    },
    {
        img: '/images/explore/products.png',
        title: 'Daily Products',
        bgColor: 'bg-gray-200',
        category: 'all'
    },
];

export const VEGETABLES_PRODUCTS: Product[] = [
    {
        title: 'Potatoes',
        description: "Our locally grown potatoes are firm, clean, and perfect for every cooking style — mash them, roast them, or turn them into fries. We ensure top-grade quality and freshness in every batch. Consistently high in demand, they're a pantry essential that never disappoints",
        img: '/images/products/vegetables/potatoes.png',
        category: 'vegetables',
        price: 1.99,
        rating: 4.7
    },
    {
        title: 'Tomatoes',
        description: 'Our farm-fresh tomatoes are picked at peak ripeness for unbeatable flavor and juiciness. Perfect for slicing, cooking, or tossing into salads, they bring vibrant color and rich taste to any dish. Customers love their freshness and long shelf life — a must-have in every kitchen',
        img: '/images/products/vegetables/tomatoes.png',
        category: 'vegetables',
        price: 2.03,
        rating: 4.9
    },
    {
        title: 'Broccoli',
        description: "Our premium broccoli crowns are hand-selected for their crisp texture and deep green color. They're packed with nutrition and perfect for steaming, roasting, or stir-fries. Healthy, fresh, and delicious — a customer favorite in every order",
        img: '/images/products/vegetables/broccoli.png',
        category: 'vegetables',
        price: 3.5,
        rating: 4.7
    },
    {
        title: 'Cabbage',
        description: "We deliver crisp, dense cabbages that stay fresh longer and shred beautifully for slaws and sautés. Grown with care, our cabbage is mild in flavor and versatile in recipes. It's a staple item with consistently high customer satisfaction",
        img: '/images/products/vegetables/cabbage.png',
        category: 'vegetables',
        price: 3.20,
        rating: 4.7
    },
    {
        title: 'Chinese Cabbage',
        description: "Our Chinese cabbage is delicately sweet, tender, and ideal for stir-fries, soups, or fermenting into kimchi. Carefully sourced and packed for freshness, it's a top seller in our Asian produce selection. Customers return for its freshness and flavor consistency",
        img: '/images/products/vegetables/chinese-cabbage.png',
        category: 'vegetables',
        price: 0.7,
        rating: 4.7
    },
    {
        title: 'Carrots',
        description: "Our vibrant orange carrots are sweet, crunchy, and freshly harvested from trusted local farms. They're perfect for raw snacks, juicing, or roasting. These top-quality carrots are a consistent best-seller thanks to their taste and texture",
        img: '/images/products/vegetables/carrots.png',
        category: 'vegetables',
        price: 3.30,
        rating: 4.7
    },
];

export const FRUITS_PRODUCTS: Product[] = [
    {
        title: 'Apple',
        description: "Our juicy apples are hand-picked and sorted for flawless skin, crunch, and sweetness. Ideal for lunchboxes or baking, they're a year-round favorite. Customers love their freshness, and they often sell out quickly",
        img: '/images/products/fruits/apple.png',
        category: 'fruits',
        price: 5.25,
        rating: 4.7
    },
    {
        title: 'Banana',
        description: "We deliver perfectly ripened bananas that are ready to eat — sweet, creamy, and rich in natural energy. Whether eaten on their own or blended into smoothies, they're a go-to for quick, healthy snacks. Our quality ensures minimal bruising and long shelf life",
        img: '/images/products/fruits/banana.png',
        category: 'fruits',
        price: 3.75,
        rating: 4.7
    },
    {
        title: 'Strawberry',
        description: "Bursting with sweetness and deep red color, our strawberries are grown for flavor first. We pick them fresh and pack them carefully for maximum freshness. These berries are a customer favorite for desserts, breakfast bowls, and snacking",
        img: '/images/products/fruits/strawberry.png',
        category: 'fruits',
        price: 4.50,
        rating: 4.7
    },
];

export const BAKERY_PRODUCTS: Product[] = [
    {
        title: 'Bread',
        description: "Our artisan bread is baked fresh daily with high-quality flour for a soft, chewy texture and golden crust. Perfect for sandwiches, breakfast, or serving on the side, it's the kind of bread people come back for. Our loyal customers rave about its freshness and flavor",
        img: '/images/products/bakery/bread.png',
        category: 'bakery',
        price: 0.75,
        rating: 4.7
    },
    {
        title: 'Chocolate Donut',
        description: "These rich chocolate-glazed donuts are made fresh and delivered with care for the ultimate treat. With a fluffy interior and indulgent topping, they're a favorite for breakfasts, snacks, or sweet cravings. Once you try one, you'll want to order a dozen",
        img: '/images/products/bakery/chocolate-donut.png',
        category: 'bakery',
        price: 12.50,
        rating: 4.7
    },
    {
        title: 'Croissant',
        description: "Our buttery croissants are flaky, golden, and baked fresh with authentic French technique. Perfect with your morning coffee or filled with your favorite spread, they're one of our fastest-moving pastries. Customers praise their melt-in-your-mouth texture and rich flavor",
        img: '/images/products/bakery/croissant.png',
        category: 'bakery',
        price: 5.50,
        rating: 4.7
    },
    {
        title: 'French Baguettes',
        description: "Crisp on the outside, soft on the inside — our French baguettes are baked fresh and delivered daily. They're perfect for sandwiches, charcuterie boards, or dipping in olive oil. Their authentic taste and artisan quality make them a top repeat item",
        img: '/images/products/bakery/french-baguettes.png',
        category: 'bakery',
        price: 3.20,
        rating: 4.7
    },
];

export const DRINKS_PRODUCTS: Product[] = [
    {
        title: 'Orange Juice',
        description: "We press only the juiciest, sun-ripened oranges to create a vibrant, vitamin-packed juice with no added sugar. It's refreshing, natural, and always cold-pressed for the freshest flavor. Customers keep coming back for our unbeatable taste and purity",
        img: '/images/products/drinks/orange-juice.png',
        category: 'drinks',
        price: 4.75,
        rating: 4.7
    },
    {
        title: 'Fruits Cocktail',
        description: "Our ready-to-serve fruit cocktail combines premium diced fruits in light syrup for a sweet and refreshing mix. It's a convenient dessert or snack option with no prep required. Customers love its variety, color, and value",
        img: '/images/products/drinks/cocktail.png',
        category: 'drinks',
        price: 5.90,
        rating: 4.7
    },
];

export const PRODUCTS: Product[] = [
    ...VEGETABLES_PRODUCTS,
    ...FRUITS_PRODUCTS,
    ...BAKERY_PRODUCTS,
    ...DRINKS_PRODUCTS
];

export const FEATURES: FeatureType[] = [
    {
        feature: 'Fast Delivery',
        description: 'All Orders Will Be Delivered In Under 30 Minutes',
        img: '/icons/car.svg'
    },
    {
        feature: 'Freshness Guaranteed',
        description: 'Fresh Products Straight From The Farm',
        img: '/icons/leaves.svg'
    },
    {
        feature: 'Affordable Prices',
        description: 'A High Quality Product With an Affordable Price',
        img: '/icons/money.svg'
    },
    {
        feature: 'Trusted By Thousands',
        description: 'Loved By 10,000+ Happy Customers',
        img: '/icons/trust.svg'
    },
];

export const FEATURE_COLUMN: FeatureColumnType[] = [
    {
        title: 'Quick Links',
        links: ['Home', 'Best Sellers', 'Offers & Deals', 'Contact Us', 'FAQs']
    },
    {
        title: 'Need Help',
        links: ['Delivery Information', 'Return & Return Policy', 'Payment Methods', 'Track your Order']
    },
    {
        title: 'Follow Us',
        links: ['Instagram', 'Twitter', 'Facebook', 'YouTube']
    },
];