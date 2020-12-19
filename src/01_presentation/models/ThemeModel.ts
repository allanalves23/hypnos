import ITheme from '../../02_domain/interfaces/entities/ITheme';

class ThemeModel {
  public id: string;
  public description: string;
  public alias: string;
  public longDescription: string;

  constructor(theme: ITheme) {
    this.id = theme?.id;
    this.description = theme?.name;
    this.alias = theme?.alias;
    this.longDescription = theme?.description;
  }
}

export default ThemeModel;
