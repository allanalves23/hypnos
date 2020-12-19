import ICategory from '../../02_domain/interfaces/entities/ICategory';

class CategoryModel {
  public id: string;
  public description: string;
  public alias: string;
  public longDescription: string;

  constructor(category: ICategory) {
    this.id = category?.id;
    this.description = category?.name;
    this.alias = category?.alias;
    this.longDescription = category?.description;
  }
}

export default CategoryModel;
