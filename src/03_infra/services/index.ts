import DI from '../dependencyInjection';
import Database from '../database';
import Middlewares from '../api/middlewares';
import Actions from '../../01_presentation/actions/actions';
import HttpStatusCodeHandler from '../../01_presentation/handlers/httpstatuscode';

import Cors from '../api/cors';
import IExpress from '../interfaces/dependencyInjection/IExpress';

class Services {
  static configure(express: IExpress): void {
    Cors.configure(express);

    Middlewares.configure(express);
    Database.connect();
    DI.configure(express);
    Actions.configure(express);
  }

  static configurePublicResources(express: any, path = '/public'): void {
    express().use(path, express.static('public'));
  }

  static configureActions(express: IExpress): void {
    HttpStatusCodeHandler.Configure(express);
  }

  static start(express: IExpress, port = 3010, host = '0.0.0.0'): void {
    express.listen(port, host, () => {
      // eslint-disable-next-line no-console
      console.log(`server running at http://${host}:${port}`);
    });
  }
}

export default Services;
