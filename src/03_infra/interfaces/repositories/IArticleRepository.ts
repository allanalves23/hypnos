import IArticle from '../../../02_domain/interfaces/entities/IArticle';

import FoundArticles from '../../../02_domain/valueObjects/FoundArticles';

interface IArticleRepository {
  getByCustomUri(customUri: string, stateCriteria: Array<string>): Promise<IArticle | null>;
  getBoosted(skip?: number, limit?: number): Promise<FoundArticles>;
  getRelateds(articleUri: string, limit?: number): Promise<FoundArticles>;
  getArticles(skip?: number, limit?: number): Promise<FoundArticles>;
}

export default IArticleRepository;
