import { Controller, Get, Route, Security } from 'tsoa';
import {
  schema as addLauncherSchema,
  uischema as addLauncherUischema,
} from '../../resources/schemas/addLauncherVersionSchema';
import {
  getSchema as getAddLoaderVersionSchema,
  uischema as addLoaderVersionUischema,
} from '../../resources/schemas/addLoaderVersionSchema';
import {
  getSchema as getAddModSchema,
  uischema as addModUischema,
} from '../../resources/schemas/mod/addModSchema';
import {
  getSchema as getAddModVersionSchema,
  uischema as addModVersionUischema,
} from '../../resources/schemas/modVersion/addModVersionSchema';
import {
  schema as addRaftVersionSchema,
  uischema as addRaftVersionUischema,
} from '../../resources/schemas/raftVersion/addRaftVersionSchema';
import {
  schema as changePasswordSchema,
  uischema as changePasswordUischema,
} from '../../resources/schemas/changePasswordSchema';
import {
  schema as editModSchema,
  uischema as editModUischema,
} from '../../resources/schemas/mod/editModSchema';
import {
  schema as editRaftVersionSchema,
  uischema as editRaftVersionUischema,
} from '../../resources/schemas/raftVersion/editRaftVersionSchema';
import {
  schema as finishAccountSchema,
  uischema as finishAccountUischema,
} from '../../resources/schemas/finishAccountSchema';
import {
  schema as loginSchema,
  uischema as loginUischema,
} from '../../resources/schemas/loginSchema';
import {
  schema as resetPasswordSchema,
  uischema as resetPasswordUischema,
} from '../../resources/schemas/resetPasswordSchema';
import {
  schema as setNewPasswordSchema,
  uischema as setNewPasswordUischema,
} from '../../resources/schemas/updatePasswordSchema';
import {
  schema as signUpSchema,
  uischema as signUpUischema,
} from '../../resources/schemas/signUpSchema';
import { HttpStatusCode } from '../types/HttpStatusCode';

@Route('/forms')
export class FormController extends Controller {
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
