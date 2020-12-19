import CategoryModel from './CategoryModel';
import ThemeModel from './ThemeModel';

import IArticle from '../../02_domain/interfaces/entities/IArticle';

class ArticleModel {
  public title: string;
  public description: string;
  public state: string;
  public logoImg: string;
  public secondaryImg: string;
  public headerImg: string;
  public contentType: string;
  public content: string;
  public relatedVideoType: string;
  public relatedVideo: string;
  public relatedRepositoryType: string;
  public relatedRepository: string;
  public uri: string;
  public publishedAt: Date | null;
  public theme: ThemeModel;
  public category: CategoryModel;

  constructor(article: IArticle) {
    this.title = article?.title;
    this.description = article?.description;
    this.state = article?.state;
    this.logoImg = article?.logoImg;
    this.secondaryImg = article?.secondaryImg;
    this.headerImg = article?.headerImg;
    this.contentType = article?.contentType;
    this.content = article?.content;
    this.relatedVideoType = article?.socialVideoType;
    this.relatedVideo = article?.socialVideo;
    this.relatedRepositoryType = article?.socialRepositoryType;
    this.relatedRepository = article?.socialRepository;
    this.uri = article?.customUri;
    this.publishedAt = article?.publishedAt;
    this.theme = new ThemeModel(article?.theme);
    this.category = new CategoryModel(article?.category);
  }
}

export default ArticleModel;
