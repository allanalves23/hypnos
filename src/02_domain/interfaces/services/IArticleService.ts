import IArticle from '../entities/IArticle';
import FoundArticles from '../../valueObjects/FoundArticles';

interface IArticleService {
  getBoostedArticles(skip?: number, limit?: number): Promise<FoundArticles>;
  getByCustomUri(customUri: string): Promise<IArticle | null>;
  getRelateds(articleUri: string, limit?: number): Promise<FoundArticles>;
  saveView(articleId: string, readerName: string): Promise<string>;
  saveLike(articleId: string, readerName: string): Promise<boolean | string>;
  get(skip: number | undefined, limit?: number | undefined): Promise<FoundArticles>;
}

export default IArticleService;
