class CategoriesService {
  constructor(){
    this.categories = [];
    this.generate();
  }

  generate(){
    const category = { category: 'Esto es categories', }
    this.categories.push(category);
    return this.categories;
  }

  create(){

  }

  find(){
  }

  findOne(id){
  }

  update(){

  }

  delete(){

  }
}

module.exports = CategoriesService;
