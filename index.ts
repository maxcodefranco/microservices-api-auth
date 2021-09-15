import 'reflect-metadata';
import { container } from 'tsyringe';

import './container';

import { Startup } from './startup';


var startup = container.resolve(Startup);

startup.registerRoutes();
startup.start();