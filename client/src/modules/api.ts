// noinspection ES6PreferShortImport

import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import {ErrorDto} from '../../../shared/dto/ErrorDto';
import {LoaderVersionDto} from '../../../shared/dto/LoaderVersionDto';
import {ModDto} from '../../../shared/dto/ModDto';
import {ModVersionDto} from '../../../shared/dto/ModVersionDto';
import {QueryParams} from '../../../shared/types/QueryParams';
import {setSession} from '../store/actions/session.actions';
import {deletePersistedAuthtoken, getPersistedAuthtoken} from '../store/persistence.store';
import {state} from '../store/store';
import {
  FormResponse,
  LauncherVersion,
  LoaderVersion,
  Mod,
  ModVersion,
  RaftVersion,
  Session,
} from '../types';
import {ModLike} from '../types/ModLike';
import {toaster} from './toaster';

class Api {
  private axios: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.axios = axios.create(config);
    this.initInterceptors();
  }

  private initInterceptors() {
    this.axios.interceptors.request.use((req) => {
      const authtoken = getPersistedAuthtoken();
      if (authtoken) {
        req.headers.authtoken = 'Bearer: ' + authtoken;
      }
      return req;
    });
    this.axios.interceptors.response.use(res => res, (err: AxiosError<{ isTokenExpired?: boolean }>) => {
      if (err.response?.data.isTokenExpired) {
        toaster.error("Session expired! Please login again");
        deletePersistedAuthtoken();
      }
    });
  }

  getBaseUrl() {
    return this.axios.defaults.baseURL;
  }

  async signUp(
    username: string,
    email: string,
    password: string,
    recaptcha: string,
  ): Promise<boolean> {
    try {
      await this.axios.post('/accountCreations', {
        username,
        email,
        password,
        recaptcha,
      });
      return true;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;
      if (error) {
        toaster.error(error);
      }
    }
    return false;
  }

  async login(username: string, password: string): Promise<boolean> {
    const path = '/users/login';
    try {
      const {data} = await this.axios.post<{ token: string }>(path, {
        username,
        password,
        deviceInfo: {
          platform: navigator.platform,
          userAgent: navigator.userAgent,
          appVersion: navigator.appVersion,
          vendor: navigator.vendor,
        },
      });
      await setSession(data.token);
      toaster.success('Login successful');
      return true;
    } catch (err: unknown) {
      console.log('login err:', err);
      /*const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;
      toaster.error(error);*/
    }
    return false;
  }

  async discordAuth(code: string): Promise<boolean> {
    try {
      const {data: session}: AxiosResponse = await this.axios.post(
        `/auth/discord`,
        {
          code,
        },
      );
      await setSession(session);
      return true;
    } catch (e) {
      return false;
    }
  }

  async finishAccount(
    username: string,
    email: string,
  ): Promise<boolean | string> {
    try {
      const {data: session}: AxiosResponse = await this.axios.post(
        `/account/finish`,
        {
          username,
          email,
        },
      );
      setSession(session);
      return true;
    } catch ({response}) {
      const {data} = response as AxiosResponse<ErrorDto>;
      return data?.error ? data.error : false;
    }
  }

  async changePassword(
    currentPassword: string,
    password: string,
    passwordConfirm: string,
  ): Promise<boolean> {
    try {
      await this.axios.put(`/users`, {
        currentPassword,
        password,
        passwordConfirm,
      });
      return true;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;
      toaster.error(
        error ||
        `Your current password is incorrect or the new one doesn't match the criteria!`,
      );
    }
    return false;
  }

  async getMostDownloadedMods(): Promise<Mod[]> {
    try {
      const {data}: AxiosResponse = await this.axios.get(
        '/mods/mostDownloaded',
      );
      return data;
    } catch (e) {
      toaster.error(`Failed to get "Most Downloaded Mods"`);
    }
    return [];
  }

  async getMostLikedMods() {
    try {
      const {data}: AxiosResponse = await this.axios.get('/mods/mostLiked');
      return data;
    } catch (e) {
      toaster.error(`Failed to get "Most Liked Mods"`);
    }
    return [];
  }

  async getLauncherVersions(params: QueryParams = {sort: '-createdAt'}) {
    try {
      const {data}: AxiosResponse = await this.axios.get(
        '/launcherVersions',
        {
          params,
        },
      );
      return data;
    } catch (e) {
      toaster.error(`Failed to get launcher versions`);
    }
    return [];
  }

  async getLauncherVersion(version: string): Promise<LauncherVersion> {
    try {
      const {data}: AxiosResponse = await this.axios.get(
        `/launcherVersions/${version}`,
      );
      return data;
    } catch (e) {
      toaster.error(`Failed to get launcher version "${version}"`);
    }
    return {} as LauncherVersion;
  }

  async addLauncherVersion(launcherVersion: LauncherVersion) {
    try {
      const {data}: AxiosResponse = await this.axios.post(
        `/launcherVersions`,
        launcherVersion,
      );

      return data;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;

      if (error) {
        toaster.error(error);
      }
    }

    return null;
  }

  async getLoaderVersions(
    params = {sort: '-createdAt'},
  ): Promise<LoaderVersion[] | LoaderVersionDto[]> {
    try {
      const {data}: AxiosResponse = await this.axios.get('/loaderVersions', {
        params,
      });
      return data;
    } catch (e) {
      toaster.error('Failed to get loader versions');
    }
    return [];
  }

  async getLoaderVersion(version: string): Promise<LoaderVersion> {
    try {
      const {data}: AxiosResponse = await this.axios.get(
        `/loaderVersions/${version}`,
      );
      return data;
    } catch (e) {
      toaster.error(`Failed to get loader version "${version}"`);
    }
    return {} as LoaderVersion;
  }

  async addLoaderVersion(loaderVersion: LoaderVersion) {
    try {
      const {data}: AxiosResponse = await this.axios.post(
        `/loaderVersions`,
        loaderVersion,
      );

      return data;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;

      if (error) {
        toaster.error(error);
      }
    }

    return null;
  }

  async getModCategories(): Promise<string[]> {
    try {
      const {data}: AxiosResponse = await this.axios.get(`/mods/categories`);
      return data;
    } catch (e) {
      toaster.error('Failed to get mod categories');
    }
    return [];
  }

  async getMods(params?: QueryParams): Promise<ModDto[]> {
    try {
      const {data}: AxiosResponse = await this.axios.get(`/mods`, {
        params,
      });
      return data;
    } catch (e) {
      toaster.error('Failed to get mods');
    }
    return [];
  }

  async getMod(id: string) {
    try {
      const {data}: AxiosResponse = await this.axios.get<ModDto>(
        `/mods/${id}`,
      );
      return data;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;

      if (error) {
        toaster.error(error);
      }
    }

    return null;
  }

  async addMod(mod: ModDto) {
    try {
      const {data} = await this.axios.post<ModDto>('/mods', mod);
      return data;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;
      toaster.error(
        error || '<b>Form invalid!</b><br/> Please check your inputs',
      );
    }
    return null;
  }

  async updateMod(mod: ModDto) {
    try {
      const {data} = await this.axios.put(`/mods/${mod.id}`, mod);
      return data;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;
      toaster.error(
        error || '<b>Form invalid!</b><br/> Please check your inputs',
      );
    }
    return null;
  }

  async getModVersion(id: number) {
    try {
      const {data} = await this.axios.get<ModVersionDto>(
        `/modVersions/${id}`,
      );
      return data;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;
      toaster.error(
        error || '<b>Form invalid!</b><br/> Please check your inputs',
      );
    }
  }

  async addModVersion(modId: number, version: ModVersion) {
    try {
      const {data} = await this.axios.post(`/modVersions`, {
        ...version,
        modId,
      });
      return data;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;
      toaster.error(
        error || '<b>Form invalid!</b><br/> Please check your inputs',
      );
    }
    return null;
  }

  async updateModVersion(id: number, version: ModVersionDto) {
    try {
      const body: ModVersionDto = {...version};
      delete body.mod;
      const {data} = await this.axios.put<ModVersionDto>(
        `/modVersions/${id}`,
        body,
      );
      return data;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;
      toaster.error(
        error || '<b>Form invalid!</b><br/> Please check your inputs',
      );
    }
    return null;
  }

  async getRaftVersions(
    params: any = {sort: '-releasedAt'},
  ): Promise<RaftVersion[]> {
    try {
      const {data}: AxiosResponse = await this.axios.get(`/raftVersions`, {
        params,
      });
      return data;
    } catch (e) {
      toaster.error(`Failed to get raft versions`);
    }
    return [];
  }

  async getRaftVersion(id: number) {
    try {
      const {data} = await this.axios.get(`/raftVersions/${id}`);

      return data;
    } catch (e) {
      toaster.error(`Failed to get raft version: ${id}`);
    }

    return null;
  }

  async addRaftVersion(raftVersion: RaftVersion) {
    try {
      const {data}: AxiosResponse = await this.axios.post(
        `/raftVersions`,
        raftVersion,
      );

      return data;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;

      if (error) {
        toaster.error(error);
      }
    }

    return null;
  }

  async updateRaftVersion(raftVersion: RaftVersion) {
    try {
      const {data}: AxiosResponse = await this.axios.put(
        `/raftVersions/${raftVersion.id}`,
        raftVersion,
      );

      return data;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;

      if (error) {
        toaster.error(error);
      }
    }

    return null;
  }

  async getForm(name: string) {
    try {
      const {data}: AxiosResponse = await this.axios.get(`/forms/${name}`);
      return data;
    } catch (e) {
      toaster.error(`Could not load form`);
    }
    return {} as FormResponse;
  }

  async addScheduledModDeletion(modId: number) {
    try {
      const {data} = await this.axios.post(`/scheduledModDeletions`, {
        modId,
      });
      return data;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;
      if (error) {
        toaster.error(error);
      }
    }
    return null;
  }

  async addResetPassword(email: string, recaptcha: string) {
    try {
      await this.axios.post(`/passwordResets`, {email, recaptcha});
      return true;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;
      if (error) {
        toaster.error(error);
      }
    }
    return false;
  }

  async getPasswordReset(token: string) {
    try {
      const {data} = await this.axios.get(`/passwordResets/${token}`);

      return data;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;

      if (error) {
        toaster.error(error);
      }
    }

    return null;
  }

  async setNewPassword(
    password: string,
    passwordConfirm: string,
    token: string,
  ): Promise<boolean> {
    try {
      await this.axios.delete(`/passwordResets/${token}`, {
        params: {
          password,
          passwordConfirm,
        },
      });

      return true;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;

      if (error) {
        toaster.error(error);
      }
    }

    return false;
  }

  async deleteAccountCreation(token: string): Promise<boolean> {
    try {
      await this.axios.delete(`/accountCreations/${token}`);
      return true;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;

      if (error) {
        toaster.error(error);
      }
    }

    return false;
  }

  async likeMod(modId: string) {
    try {
      const {data}: AxiosResponse = await this.axios.post(`/mods/${modId}/like`);
      return data;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;

      if (error) {
        toaster.error(error);
      }
    }

    return null;
  }

  async unlikeMod(modId: string) {
    try {
      const path = `/mods/${modId}/unlike`;
      const {data}: AxiosResponse = await this.axios.delete(path);
      return data;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;

      if (error) {
        toaster.error(error);
      }
    }

    return null;
  }

  async getLikedMods(): Promise<string[] | undefined> {
    try {
      const path = `/users/modLikes`;
      const {data}: AxiosResponse = await this.axios.get(path);
      return data;
    } catch ({response}) {
      const {
        data: {error},
      } = response as AxiosResponse<ErrorDto>;

      if (error) {
        toaster.error(error);
      }
    }
  }
}

const {VITE_BASE_URL, VITE_PORT} = import.meta.env;
const baseURL: string = `${VITE_BASE_URL + (VITE_PORT ? `:${VITE_PORT}` : '')}/api`;

export const api = new Api({
  baseURL,
});
