import mongoose from 'mongoose';
import Product from './models/productModel';

const fruits = [
  {
    name: 'Tao',
    image: 'https://i.imgur.com/po7UezG.jpg',
    price: 100000,
    brand: 'Viet Nam',
    countInStock: 10,
  },
  {
    name: 'Nho',
    image: 'https://i.imgur.com/po7UezG.jpg',
    price: 200000,
    brand: 'Nhat',
    countInStock: 10,
  },
  {
    name: 'Le',
    image: 'https://i.imgur.com/po7UezG.jpg',
    price: 110000,
    brand: 'Viet Nam',
    countInStock: 10,
  },
  {
    name: 'Man',
    image: 'https://i.imgur.com/po7UezG.jpg',
    price: 210000,
    brand: 'Nhat',
    countInStock: 10,
  },
  {
    name: 'Xoai',
    image: 'https://i.imgur.com/po7UezG.jpg',
    price: 100000,
    brand: 'Viet Nam',
    countInStock: 10,
  },
  {
    name: 'Coc',
    image: 'https://i.imgur.com/po7UezG.jpg',
    price: 100000,
    brand: 'Nhat',
    countInStock: 10,
  },
  {
    name: 'Oi',
    image: 'https://i.imgur.com/po7UezG.jpg',
    price: 100000,
    brand: 'Viet Nam',
    countInStock: 10,
  },
  {
    name: 'Cherry',
    image: 'https://i.imgur.com/po7UezG.jpg',
    price: 100000,
    brand: 'Nhat',
    countInStock: 10,
  },
  {
    name: 'Mang cau',
    image: 'https://i.imgur.com/po7UezG.jpg',
    price: 100000,
    brand: 'Viet Nam',
    countInStock: 10,
  },
  {
    name: 'Mang cut',
    image: 'https://i.imgur.com/po7UezG.jpg',
    price: 100000,
    brand: 'Nhat',
    countInStock: 10,
  },
  {
    name: 'Hat dieu',
    image: 'https://i.imgur.com/po7UezG.jpg',
    price: 100000,
    brand: 'Viet Nam',
    countInStock: 10,
  },
  {
    name: 'Du du',
    image: 'https://i.imgur.com/po7UezG.jpg',
    price: 100000,
    brand: 'Nhat',
    countInStock: 10,
  },
];

// Connect to MongoDB
mongoose.connect('mongodb://localhost/fruits');

// Go through each movie
fruits.map(data => {
  // Initialize a model with movie data
  const Product = new Product(data);
  // and save it into the database
  Product.save();
});