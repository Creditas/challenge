import { controller } from './controller';
import { getElement, on } from './utils';
import { view } from './view';
import { resource } from './resource';

const app = {
  init
}

export { app };

function init(config, user) {
  controller.setListeners();
  resource.init(user);
  view.init(config);
}
