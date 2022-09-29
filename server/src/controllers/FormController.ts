import { Controller, Get, Route, Security } from 'tsoa';
import {
  schema as addLauncherSchema,
  uischema as addLauncherUischema,
} from '../forms/addLauncherVersionForm';
import {
  getSchema as getAddLoaderVersionSchema,
  uischema as addLoaderVersionUischema,
} from '../forms/addLoaderVersionForm';
import {
  getSchema as getAddModSchema,
  uischema as addModUischema,
} from '../forms/addModForm';
import {
  getSchema as getAddModVersionSchema,
  uischema as addModVersionUischema,
} from '../forms/addModVersionForm';
import {
  schema as addRaftVersionSchema,
  uischema as addRaftVersionUischema,
} from '../forms/addRaftVersionForm';
import {
  schema as changePasswordSchema,
  uischema as changePasswordUischema,
} from '../forms/changePasswordForm';
import {
  schema as editModSchema,
  uischema as editModUischema,
} from '../forms/editModForm';
import {
  schema as editRaftVersionSchema,
  uischema as editRaftVersionUischema,
} from '../forms/editRaftVersionForm';
import {
  schema as finishAccountSchema,
  uischema as finishAccountUischema,
} from '../forms/finishAccountForm';
import {
  schema as loginSchema,
  uischema as loginUischema,
} from '../forms/loginForm';
import {
  schema as resetPasswordSchema,
  uischema as resetPasswordUischema,
} from '../forms/resetPasswordForm';
import {
  schema as setNewPasswordSchema,
  uischema as setNewPasswordUischema,
} from '../forms/setNewPasswordForm';
import {
  schema as signUpSchema,
  uischema as signUpUischema,
} from '../forms/signUpForm';
import { HttpStatusCode } from '../types/HttpStatusCode';

@Route('/forms')
export class AccountCreationController extends Controller {
  @Get('/addLauncherVersion')
  @Security('admin')
  public async addLauncherVersion() {
    this.setStatus(HttpStatusCode.Ok);
    return {
      schema: addLauncherSchema,
      uischema: addLauncherUischema,
    };
  }

  @Get('/addLoaderVersion')
  @Security('admin')
  public async addLoaderVersion() {
    this.setStatus(HttpStatusCode.Ok);
    return {
      schema: await getAddLoaderVersionSchema(),
      uischema: addLoaderVersionUischema,
    };
  }

  @Get('/addMod')
  @Security('everyone')
  public async addMod() {
    this.setStatus(HttpStatusCode.Ok);
    return {
      schema: await getAddModSchema(),
      uischema: addModUischema,
    };
  }

  @Get('/addModVersion')
  @Security('everyone')
  public async addModVersion() {
    this.setStatus(HttpStatusCode.Ok);
    return {
      schema: await getAddModVersionSchema(),
      uischema: addModVersionUischema,
    };
  }

  @Get('/addRaftVersion')
  @Security('admin')
  public async addRaftVersion() {
    this.setStatus(HttpStatusCode.Ok);
    return {
      schema: addRaftVersionSchema,
      uischema: addRaftVersionUischema,
    };
  }

  @Get('/changePassword')
  @Security('everyone')
  public async changePassword() {
    this.setStatus(HttpStatusCode.Ok);
    return {
      schema: changePasswordSchema,
      uischema: changePasswordUischema,
    };
  }

  @Get('/editMod')
  @Security('everyone')
  public async editMod() {
    this.setStatus(HttpStatusCode.Ok);
    return {
      schema: editModSchema,
      uischema: editModUischema,
    };
  }

  @Get('/editRaftVersion')
  @Security('everyone')
  public async editRaftVersion() {
    this.setStatus(HttpStatusCode.Ok);
    return {
      schema: editRaftVersionSchema,
      uischema: editRaftVersionUischema,
    };
  }

  @Get('/finishAccount')
  @Security('everyone')
  public async finishAccount() {
    this.setStatus(HttpStatusCode.Ok);
    return {
      schema: finishAccountSchema,
      uischema: finishAccountUischema,
    };
  }

  @Get('/login')
  @Security('everyone')
  public async login() {
    this.setStatus(HttpStatusCode.Ok);
    return {
      schema: loginSchema,
      uischema: loginUischema,
    };
  }

  @Get('/resetPassword')
  @Security('everyone')
  public async resetPassword() {
    this.setStatus(HttpStatusCode.Ok);
    return {
      schema: resetPasswordSchema,
      uischema: resetPasswordUischema,
    };
  }

  @Get('/setNewPassword')
  @Security('everyone')
  public async setNewPassword() {
    this.setStatus(HttpStatusCode.Ok);
    return {
      schema: setNewPasswordSchema,
      uischema: setNewPasswordUischema,
    };
  }

  @Get('/signUp')
  @Security('everyone')
  public async signUp() {
    this.setStatus(HttpStatusCode.Ok);
    return {
      schema: signUpSchema,
      uischema: signUpUischema,
    };
  }
}
