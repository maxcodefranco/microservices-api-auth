import { container } from "tsyringe";

import { IRoutes, Routes } from "./routes";

import AuthApplication from "./application/auth.application";
import IAuthApplication from "./interface/application/auth/iauth.application";


container.registerSingleton<IRoutes>("IRoutes", Routes);

//Application
container.registerSingleton<IAuthApplication>("IAuthApplication", AuthApplication);