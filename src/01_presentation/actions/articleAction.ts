import { Request, Response, NextFunction } from 'express';

import IExpress from '../../03_infra/interfaces/dependencyInjection/IExpress';
import IArticleService from '../../02_domain/interfaces/services/IArticleService';
import ICommentService from '../../02_domain/interfaces/services/ICommentService';

import { getNumber } from '../serializers/NumberParser';
import IArticle from '../../02_domain/interfaces/entities/IArticle';
import FoundArticles from '../../02_domain/valueObjects/FoundArticles';
import ArticleModel from '../models/ArticleModel';
import CommentModel from '../models/CommentModel';

class ArticleAction {
  private readonly _app: IExpress;
  private readonly _articleService: IArticleService;
  private readonly _commentService: ICommentService;

  constructor(app: IExpress) {
    const resource = '/articles';

    this._app = app;
    this._articleService = app.get('articleService');
    this._commentService = app.get('commentService');

    this._app.route(`${resource}`).get(this.get);
    this._app.route(`${resource}/boosted`).get(this.getBoosted);
    this._app.route(`${resource}/:customUri`).get(this.getOne);
    this._app.route(`${resource}/:customUri/relateds`).get(this.getRelateds);
    this._app.route(`${resource}/:customUri/comments`).get(this.getComments);
    this._app.route(`${resource}/:customUri/comments`).post(this.saveComment);
    this._app.route(`${resource}/:customUri/views`).post(this.saveView);
    this._app.route(`${resource}/:customUri/likes`).post(this.saveLike);
  }

  get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const articlesFound: FoundArticles = await this._articleService.get(
        getNumber(req.query.skip),
        getNumber(req.query.limit)
      );

      res.json({
        articles: articlesFound.articles.map((article: IArticle) => new ArticleModel(article)),
        count: articlesFound.count
      });
    } catch (err) {
      next(err);
    }
  };

  getBoosted = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const articlesFound: FoundArticles = await this._articleService.getBoostedArticles(
        getNumber(req.query.skip),
        getNumber(req.query.limit)
      );

      res.json({
        articles: articlesFound.articles.map((article: IArticle) => new ArticleModel(article)),
        count: articlesFound.count
      });
    } catch (err) {
      next(err);
    }
  };

  getRelateds = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const articlesFound: FoundArticles = await this._articleService.getRelateds(
        req.params.customUri,
        getNumber(req.query.limit)
      );

      res.json({
        articles: articlesFound.articles.map((article: IArticle) => new ArticleModel(article)),
        count: articlesFound.count
      });
    } catch (err) {
      next(err);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const article = await this._articleService.getByCustomUri(req.params.customUri);
      res.json(article ? new ArticleModel(article) : null);
    } catch (err) {
      next(err);
    }
  };

  getComments = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.json(
        (await this._commentService.getByArticleUri(req.params.customUri)).map(comment => new CommentModel(comment))
      );
    } catch (err) {
      next(err);
    }
  };

  saveComment = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.status(201).send(await this._commentService.saveComment(req.body, req.params.customUri));
    } catch (err) {
      next(err);
    }
  };

  saveView = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.json(await this._articleService.saveView(req.params.customUri, req.body.reader));
    } catch (err) {
      next(err);
    }
  };

  saveLike = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.json(await this._articleService.saveLike(req.params.customUri, req.body.reader));
    } catch (err) {
      next(err);
    }
  };
}

export default ArticleAction;
