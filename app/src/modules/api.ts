import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from 'axios';
import { NotyfEvent } from 'notyf';
import { ErrorDto } from '../../../shared/dto/ErrorDto';
import { LoaderVersionDto } from '../../../shared/dto/LoaderVersionDto';
import { ModCreateDto, ModDto } from '../../../shared/dto/ModDto';
import { ModVersionDto } from '../../../shared/dto/ModVersionDto';
import { ModQueryParams } from '../../../shared/types/ModQueryParams';
import { LOCAL_STORAGE_SESSION } from '../const/localStorage.const';
import { setSession } from '../store/session.store';
import { state } from '../store/store';
import { FormResponse } from '../types/FormResponse';
import { LauncherVersion } from '../types/LauncherVersion';
import { LoaderVersion } from '../types/LoaderVersion';
import { Mod } from '../types/Mod';
import { ModLike } from '../types/ModLike';
import { PasswordReset } from '../types/PasswordReset';
import { RaftVersion } from '../types/RaftVersion';
import { ScheduledModDeletion } from '../types/ScheduledModDeletion';
import { Session } from '../types/Session';
import { toaster } from './toaster';

class Api {
  private axios: AxiosInstance;

  constructor(config: AxiosRequestConfig) {
    this.axios = axios.create(config);
  }

  setAuthToken(token: string | null) {
    this.axios.defaults.headers.authtoken = `${token}`;
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
    } catch ({ response }) {
      const {
        data: { error },
      } = response as AxiosResponse<ErrorDto>;
      if (error) {
        toaster.error(error);
      }
    }
    return false;
  }

  async login(username: string, password: string): Promise<boolean> {
    try {
      const { data: session }: AxiosResponse = await this.axios.post(
        '/users/login',
        {
          username,
          password,
          deviceInfo: {
            platform: navigator.platform,
            userAgent: navigator.userAgent,
            appVersion: navigator.appVersion,
            vendor: navigator.vendor,
          },
        },
      );
      await setSession(session);
      toaster.success('Login successful');
      return true;
    } catch ({ response }) {
      const {
        data: { error },
      } = response as AxiosResponse<ErrorDto>;
      toaster.error(error);
    }
    return false;
  }

  async discordAuth(code: string): Promise<boolean> {
    try {
      const { data: session }: AxiosResponse = await this.axios.post(
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
      const { data: session }: AxiosResponse = await this.axios.post(
        `/account/finish`,
        {
          username,
          email,
        },
      );
      setSession(session);
      return true;
    } catch (err) {
      const { response } = err as AxiosError<ErrorDto>;
      return response?.data?.error ? response.data.error : false;
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
    } catch ({ response }) {
      const {
        data: { error },
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
      const { data }: AxiosResponse = await this.axios.get(
        '/mods/mostDownloaded',
      );
      return data;
    } catch (e) {
      toaster.error(`Failed to get "Most Downloaded Mods"`);
    }
    return [];
  }

  async getMostLikedMods(): Promise<Mod[]> {
    try {
      const { data }: AxiosResponse = await this.axios.get('/mods/mostLiked');
      return data;
    } catch (e) {
      toaster.error(`Failed to get "Most Liked Mods"`);
    }
    return [];
  }

  async getLauncherVersions(
    params = { sort: '-createdAt' },
  ): Promise<LauncherVersion[]> {
    try {
      const { data }: AxiosResponse = await this.axios.get(
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
      const { data }: AxiosResponse = await this.axios.get(
        `/launcherVersions/${version}`,
      );
      return data;
    } catch (e) {
      toaster.error(`Failed to get launcher version "${version}"`);
    }
    return {} as LauncherVersion;
  }

  async addLauncherVersion(
    launcherVersion: LauncherVersion,
  ): Promise<LauncherVersion | null> {
    try {
      const { data }: AxiosResponse = await this.axios.post(
        `/launcherVersions`,
        launcherVersion,
      );

      return data;
    } catch ({ response }) {
      const {
        data: { error },
      } = response as AxiosResponse<ErrorDto>;

      if (error) {
        toaster.error(error);
      }
    }

    return null;
  }

  async getLoaderVersions(
    params = { sort: '-createdAt' },
  ) {
    try {
      const { data }: AxiosResponse = await this.axios.get<LoaderVersionDto[]>('/loaderVersions', {
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
      const { data }: AxiosResponse = await this.axios.get(
        `/loaderVersions/${version}`,
      );
      return data;
    } catch (e) {
      toaster.error(`Failed to get loader version "${version}"`);
    }
    return {} as LoaderVersion;
  }

  async addLoaderVersion(
    loaderVersion: LoaderVersion,
  ): Promise<LoaderVersion | null> {
    try {
      const { data }: AxiosResponse = await this.axios.post(
        `/loaderVersions`,
        loaderVersion,
      );

      return data;
    } catch ({ response }) {
      const {
        data: { error },
      } = response as AxiosResponse<ErrorDto>;

      if (error) {
        toaster.error(error);
      }
    }

    return null;
  }

  async getSession(token: string): Promise<Session> {
    try {
      const { data }: AxiosResponse = await this.axios.get(
        `/sessions/${token}`,
      );
      return data;
    } catch (e) {
      toaster
        .error('Could not load session. Please login again')
        .on(NotyfEvent.Dismiss, () => {
          localStorage.removeItem(LOCAL_STORAGE_SESSION);
          state.session = null;
        });
    }
    return {} as Session;
  }

  async deleteSession(token: string): Promise<boolean> {
    try {
      await this.axios.delete(`/sessions/${token}`);
      this.setAuthToken(null);
      return true;
    } catch (e) {
      toaster.error('Failed to delete session');
    }
    return false;
  }

  async getModCategories(): Promise<string[]> {
    try {
      const { data }: AxiosResponse = await this.axios.get(`/mods/categories`);
      return data;
    } catch (e) {
      toaster.error('Failed to get mod categories');
    }
    return [];
  }

  async getMods(params?: ModQueryParams): Promise<ModDto[]> {
    try {
      const { data }: AxiosResponse = await this.axios.get(`/mods`, {
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
      const { data }: AxiosResponse = await this.axios.get<ModDto>(
        `/mods/${id}`,
      );
      return data;
    } catch ({ response }) {
      const {
        data: { error },
      } = response as AxiosResponse<ErrorDto>;

      if (error) {
        toaster.error(error);
      }
    }

    return null;
  }

  async addMod(mod: ModCreateDto) {
    try {
      const { data } = await this.axios.post<ModDto>('/mods', mod);
      return data;
    } catch ({ response }) {
      const {
        data: { error },
      } = response as AxiosResponse<ErrorDto>;
      toaster.error(
        error || '<b>Form invalid!</b><br/> Please check your inputs',
      );
    }
    return null;
  }

  async updateMod(mod: ModDto): Promise<ModDto | null> {
    try {
      const { data } = await this.axios.put(`/mods/${mod.id}`, mod);
      return data;
    } catch ({ response }) {
      const {
        data: { error },
      } = response as AxiosResponse<ErrorDto>;
      toaster.error(
        error || '<b>Form invalid!</b><br/> Please check your inputs',
      );
    }
    return null;
  }

  async getModVersion(id: number) {
    try {
      const { data } = await this.axios.get<ModVersionDto>(
        `/modVersions/${id}`,
      );
      return data;
    } catch ({ response }) {
      const {
        data: { error },
      } = response as AxiosResponse<ErrorDto>;
      toaster.error(
        error || '<b>Form invalid!</b><br/> Please check your inputs',
      );
    }
  }

  async addModVersion(
    modId: number,
    version: ModVersionDto,
  ) {
    try {
      const { data } = await this.axios.post<ModVersionDto>(`/modVersions`, {
        ...version,
        modId,
      });
      return data;
    } catch ({ response }) {
      const {
        data: { error },
      } = response as AxiosResponse<ErrorDto>;
      toaster.error(
        error || '<b>Form invalid!</b><br/> Please check your inputs',
      );
    }
    return null;
  }

  async updateModVersion(id: number, version: ModVersionDto) {
    try {
      const body: ModVersionDto = { ...version };
      delete body.mod;
      const { data } = await this.axios.put<ModVersionDto>(
        `/modVersions/${id}`,
        body,
      );
      return data;
    } catch ({ response }) {
      const {
        data: { error },
      } = response as AxiosResponse<ErrorDto>;
      toaster.error(
        error || '<b>Form invalid!</b><br/> Please check your inputs',
      );
    }
    return null;
  }

  async getRaftVersions(
    params: any = { sort: '-releasedAt' },
  ): Promise<RaftVersion[]> {
    try {
      const { data }: AxiosResponse = await this.axios.get(`/raftVersions`, {
        params,
      });
      return data;
    } catch (e) {
      toaster.error(`Failed to get raft versions`);
    }
    return [];
  }

  async getRaftVersion(id: number): Promise<RaftVersion | null> {
    try {
      const { data } = await this.axios.get(`/raftVersions/${id}`);

      return data;
    } catch (e) {
      toaster.error(`Failed to get raft version: ${id}`);
    }

    return null;
  }

  async addRaftVersion(raftVersion: RaftVersion): Promise<RaftVersion | null> {
    try {
      const { data }: AxiosResponse = await this.axios.post(
        `/raftVersions`,
        raftVersion,
      );

      return data;
    } catch ({ response }) {
      const {
        data: { error },
      } = response as AxiosResponse<ErrorDto>;

      if (error) {
        toaster.error(error);
      }
    }

    return null;
  }

  async updateRaftVersion(raftVersion: RaftVersion): Promise<RaftVersion | null> {
    try {
      const { data }: AxiosResponse = await this.axios.put(
        `/raftVersions/${raftVersion.id}`,
        raftVersion,
      );

      return data;
    } catch ({ response }) {
      const {
        data: { error },
      } = response as AxiosResponse<ErrorDto>; 

      if (error) {
        toaster.error(error);
      }
    }

    return null;
  }

  async getForm(name: string): Promise<FormResponse> {
    try {
      const { data }: AxiosResponse = await this.axios.get(`/forms/${name}`);
      return data;
    } catch (e) {
      toaster.error(`Could not load form`);
    }
    return {} as FormResponse;
  }

  async addScheduledModDeletion(modId: number): Promise<ScheduledModDeletion | null> {
    try {
      const { data } = await this.axios.post(`/scheduledModDeletions`, {
        modId,
      });
      return data;
    } catch ({ response }) {
      const {
        data: { error },
      } = response as AxiosResponse<ErrorDto>;
      if (error) {
        toaster.error(error);
      }
    }
    return null;
  }

  async addResetPassword(email: string, recaptcha: string): Promise<boolean> {
    try {
      await this.axios.post(`/passwordResets`, { email, recaptcha });
      return true;
    } catch ({ response }) {
      const {
        data: { error },
      } = response as AxiosResponse<ErrorDto>;
      if (error) {
        toaster.error(error);
      }
    }
    return false;
  }

  async getPasswordReset(token: string): Promise<PasswordReset | null> {
    try {
      const { data } = await this.axios.get(`/passwordResets/${token}`);

      return data;
    } catch ({ response }) {
      const {
        data: { error },
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
    } catch ({ response }) {
      const {
        data: { error },
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
    } catch ({ response }) {
      const {
        data: { error },
      } = response as AxiosResponse<ErrorDto>;

      if (error) {
        toaster.error(error);
      }
    }

    return false;
  }

  async getModLikes(): Promise<ModLike[]> {
    try {
      const { data }: AxiosResponse = await this.axios.get(`/modLikes`);
      return data;
    } catch ({ response }) {
      const {
        data: { error },
      } = response as AxiosResponse<ErrorDto>;

      if (error) {
        toaster.error(error);
      }
    }

    return [];
  }

  async likeMod(modId: string): Promise<ModLike | null> {
    try {
      const { data }: AxiosResponse = await this.axios.post(`/modLikes`, {
        modId,
      });
      state.likes.push(data.modId);

      return data;
    } catch ({ response }) {
      const {
        data: { error },
      } = response as AxiosResponse<ErrorDto>;

      if (error) {
        toaster.error(error);
      }
    }

    return null;
  }

  async unlikeMod(modId: string): Promise<ModLike | null> {
    try {
      const { data }: AxiosResponse = await this.axios.delete(
        `/modLikes/${modId}`,
      );
      state.likes.splice(state.likes.indexOf(modId), 1);

      return data;
    } catch ({ response }) {
      const {
        data: { error },
      } = response as AxiosResponse<ErrorDto>;

      if (error) {
        toaster.error(error);
      }
    }

    return null;
  }
}

const baseURL: string =
  String(import.meta.env.VITE_API_BASE_URL) || 'http://localhost:3001';

export const api = new Api({
  baseURL,
});
