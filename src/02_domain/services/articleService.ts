import IArticle from '../interfaces/entities/IArticle';
import IExpress from '../../03_infra/interfaces/dependencyInjection/IExpress';
import IArticleService from '../interfaces/services/IArticleService';
import IUnitOfWork from '../../03_infra/interfaces/IUnitOfWork';

import FoundArticles from '../valueObjects/FoundArticles';
import InvalidArgument from '../../01_presentation/exceptions/InvalidArgument';
import ResourceNotFound from '../../01_presentation/exceptions/ResourceNotFound';

class ArticleService implements IArticleService {
  private readonly _unitOfWork: IUnitOfWork;

  constructor(app: IExpress) {
    this._unitOfWork = app.get('unitOfWork');
  }

  public getBoostedArticles(skip: number | undefined, limit: number | undefined): Promise<FoundArticles> {
    return this._unitOfWork.articleRepository.getBoosted(skip, limit);
  }

  public getByCustomUri(customUri: string): Promise<IArticle | null> {
    return this._unitOfWork.articleRepository.getByCustomUri(customUri, ['boosted', 'published']);
  }

  public getRelateds(articleUri: string, limit?: number): Promise<FoundArticles> {
    return this._unitOfWork.articleRepository.getRelateds(articleUri, limit);
  }

  public get(skip: number | undefined, limit?: number | undefined): Promise<FoundArticles> {
    return this._unitOfWork.articleRepository.getArticles(skip, limit);
  }

  private validateReader(reader: string): void {
    if (!reader) throw new InvalidArgument('É necessário fornecer um leitor válido');
  }

  private async getArticleByCustomUri(articleUri: string): Promise<IArticle> {
    const article: IArticle | null = await this.getByCustomUri(articleUri);

    if (!article) throw new ResourceNotFound('Artigo não encontrado');
    else return article;
  }

  public async saveView(articleUri: string, readerIdentifier: string): Promise<string> {
    this.validateReader(readerIdentifier);

    const article = await this.getArticleByCustomUri(articleUri);

    const view = await this._unitOfWork.viewRepository.getOne({
      articleId: article._id,
      reader: readerIdentifier
    });

    if (view) {
      view.set('accessCount', Number(view.get('accessCount') + 1));
      return (await view.save()).get('accessCount');
    } else {
      const newView = {
        articleId: article._id,
        reader: readerIdentifier,
        accessCount: 1
      };

      return (await this._unitOfWork.viewRepository.create(newView)).get('accessCount');
    }
  }

  public async saveLike(articleUri: string, readerIdentifier: string): Promise<boolean | string> {
    this.validateReader(readerIdentifier);

    const article = await this.getArticleByCustomUri(articleUri);

    const like = await this._unitOfWork.likeRepository.getOne({
      articleId: article._id,
      reader: readerIdentifier
    });

    if (like) {
      like.set('active', !like.get('active'));
      return (await like.save()).get('active');
    } else {
      const newLike = {
        articleId: article._id,
        reader: readerIdentifier,
        active: true
      };

      return (await this._unitOfWork.likeRepository.create(newLike)).get('createdAt');
    }
  }
}

export default ArticleService;
