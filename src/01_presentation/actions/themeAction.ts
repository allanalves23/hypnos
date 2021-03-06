import { Request, Response, NextFunction } from 'express';
import IExpress from '../../03_infra/interfaces/dependencyInjection/IExpress';
import IThemeService from '../../02_domain/interfaces/services/IThemeService';
import ThemeModel from '../models/ThemeModel';

class ThemeAction {
  private readonly _app: IExpress;
  private readonly _themeService: IThemeService;

  constructor(app: IExpress) {
    const resource = '/themes';

    this._app = app;
    this._themeService = app.get('themeService');

    this._app.route(`${resource}`).get(this.get);
  }

  get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      res.json(
        (await this._themeService.get(Number(req.query.skip), Number(req.query.take))).map(
          theme => new ThemeModel(theme)
        )
      );
    } catch (err) {
      next(err);
    }
  };
}

export default ThemeAction;
