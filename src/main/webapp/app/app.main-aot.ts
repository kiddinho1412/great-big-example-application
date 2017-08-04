import { platformBrowser } from '@angular/platform-browser';
import { ProdConfig } from './core/config/prod.config';
import { GreatBigExampleApplicationAppModuleNgFactory } from '../../../../target/aot/src/main/webapp/app/app.module.ngfactory';

ProdConfig();

platformBrowser().bootstrapModuleFactory(GreatBigExampleApplicationAppModuleNgFactory)
  .then((success) => console.log(`Application started`))
  .catch((err) => console.error(err));
