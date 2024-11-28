const { faker } = require('@faker-js/faker');
const boom = require('@hapi/boom');

const { models } = require('../../libs/sequelize');

class ProductsService {
  constructor(){
    this.products = [];
    this.generate();
  }

  async generate(){
    const limit = 100;

    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      });
    }

    return this.products;
  }

  async find(){
    return ( await models.Product.findAll({
      include: ['category'],
    }));
  }

  async findOne(id){
    const product = this.products.find(item => item.id === id)
    if(!product){
      throw boom.notFound('Product not found');
    }
    if(product.isBlock){
      throw boom.conflict('product is block');

    }
    return product;
  }

  async create(data){
    // const newProduct = {
    //   id: faker.string.uuid(),
    //   ...data,
    // }
    // this.products.push(newProduct);
    console.log('ESTO ES DATA', data);
    return ( await models.Product.create(data) );
  }

  async update(id, changes){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    this.products[index] ={
      ...this.products[index],
      ...changes,
    };
    return this.products[index];
  }

  async delete(id){
    const index = this.products.findIndex(item => item.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
