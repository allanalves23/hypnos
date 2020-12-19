import BaseRepository from './baseRepository';
import Article from '../../../02_domain/entities/Article';
import IArticle from '../../../02_domain/interfaces/entities/IArticle';
import IArticleRepository from '../../interfaces/repositories/IArticleRepository';

import ResourceNotFound from '../../../01_presentation/exceptions/ResourceNotFound';
import FoundArticles from '../../../02_domain/valueObjects/FoundArticles';

class ArticleRepository extends BaseRepository implements IArticleRepository {
  constructor() {
    super(Article);
  }

  public async getByCustomUri(customUri: string, stateCriteria: Array<string> = []): Promise<IArticle | null> {
    return await Article.findOne({
      customUri,
      ...this.articlePipeFilters,
      $or: stateCriteria.map((value: string) => Object.assign({}, { state: value }))
    });
  }

  public async getArticles(skip = 0, limit = 15): Promise<FoundArticles> {
    const count = await this.count({ state: 'published' });

    const articles = await Article.aggregate([
      {
        $match: { state: 'published' }
      },
      ...this.articlePipeFilters
    ])
      .skip(skip)
      .limit(limit);

    return new FoundArticles(articles, count);
  }

  public async getBoosted(skip = 0, limit = 5): Promise<FoundArticles> {
    const count = await this.count({ state: 'boosted' });

    const articles = await Article.aggregate([
      {
        $match: { state: 'boosted' }
      },
      ...this.articlePipeFilters
    ])
      .skip(skip)
      .limit(limit);

    return new FoundArticles(articles, count);
  }

  public async getRelateds(articleUri: string, limit = 5): Promise<FoundArticles> {
    if (!articleUri) {
      return this.getBoosted(0, limit);
    }

    const article = await Article.findOne({ customUri: `${articleUri}` });

    if (!article) throw new ResourceNotFound('Artigo não encontrado');

    const articles = await Article.aggregate([
      {
        $match: {
          _id: { $ne: article._id },
          $and: [
            {
              $or: [{ state: 'published' }, { state: 'boosted' }]
            }
          ],
          $or: [
            {
              $and: [{ themeId: article.get('themeId') }, { themeId: { $ne: null } }]
            },
            {
              $and: [{ categoryId: article.get('categoryId') }, { categoryId: { $ne: null } }]
            }
          ]
        }
      },
      {
        $sort: { publishedAt: -1, boostedAt: -1 }
      }
    ]).limit(limit);

    return new FoundArticles(articles, articles.length);
  }

  private articlePipeFilters = [
    {
      $lookup: {
        from: 'themes',
        localField: 'themeId',
        foreignField: '_id',
        as: 'theme'
      }
    },
    {
      $lookup: {
        from: 'categories',
        localField: 'categoryId',
        foreignField: '_id',
        as: 'category'
      }
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'author'
      }
    },
    {
      $project: {
        themeId: 0,
        categoryId: 0,
        userId: 0
      }
    },
    {
      $project: {
        title: 1,
        description: 1,
        state: 1,
        theme: { $arrayElemAt: ['$theme', 0] },
        category: { $arrayElemAt: ['$category', 0] },
        author: { $arrayElemAt: ['$author', 0] },
        logoImg: 1,
        secondaryImg: 1,
        headerImg: 1,
        contentType: 1,
        content: 1,
        socialVideoType: 1,
        socialVideo: 1,
        socialRepositoryType: 1,
        socialRepository: 1,
        customUri: 1,
        removedAt: 1,
        createdAt: 1,
        updatedAt: 1,
        inactivatedAt: 1,
        publishedAt: 1,
        boostedAt: 1
      }
    },
    {
      $project: {
        'author.password': 0,
        'author.confirmEmail': 0,
        'author.confirmEmailToken': 0,
        'author.lastEmailTokenSendAt': 0,
        'author.token': 0
      }
    },
    {
      $sort: { publishAt: -1 }
    }
  ];
}

export default ArticleRepository;
