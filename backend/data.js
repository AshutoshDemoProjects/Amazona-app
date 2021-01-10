import bcrypt from 'bcrypt';
const data = {
    users: [
        {
            name: 'Ashutosh',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'john',
            email: 'john@gmail.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        }
    ],
    products: [
        {
            name: 'Nike Fit Shirt',
            category: 'Shirt',
            image: '/images/p1.jpg',
            price: 2000,
            countInStock: 10,
            brand: 'Nike',
            rating: 4.5,
            numReviews: 10,
            description: 'High quality product'
        },
        {
            name: 'adidas Fit Shirt',
            category: 'Shirt',
            image: '/images/p2.jpg',
            price: 1000,
            countInStock: 0,
            brand: 'Adidas',
            rating: 3.0,
            numReviews: 15,
            description: 'High quality product'
        },
        {
            name: 'adidas Formal Shirt',
            category: 'Shirt',
            image: '/images/p3.jpg',
            price: 1300,
            countInStock: 15,
            brand: 'Adidas',
            rating: 4.0,
            numReviews: 15,
            description: 'High quality product'
        },
        {
            name: 'adidas Slim Pant',
            category: 'Pant',
            image: '/images/p4.jpg',
            price: 1350,
            countInStock: 9,
            brand: 'Adidas',
            rating: 4.0,
            numReviews: 15,
            description: 'High quality product'
        },
        {
            name: 'UCB Formal Pant',
            category: 'Pant',
            image: '/images/p5.jpg',
            price: 1350,
            countInStock: 5,
            brand: 'UCB',
            rating: 4.0,
            numReviews: 15,
            description: 'High quality product'
        },
        {
            name: 'Nike Slim Pant',
            category: 'Pant',
            image: '/images/p6.jpg',
            price: 1350,
            countInStock: 0,
            brand: 'Nike',
            rating: 4.0,
            numReviews: 15,
            description: 'High quality product'
        },
    ]
}
export default data;