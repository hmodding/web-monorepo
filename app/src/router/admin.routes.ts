import AddLauncherVersion from '../pages/AddLauncherVersion.vue';
import AddLoaderVersion from '../pages/AddLoaderVersion.vue';
import AddRaftVersion from '../pages/AddRaftVersion.vue';
import EditRaftVersion from '../pages/EditRaftVersion.vue';
import LauncherVersionManagement from '../pages/LauncherVersionManagement.vue';
import LoaderVersionManagement from '../pages/LoaderVersionManagement.vue';
import RaftVersionManagement from '../pages/RaftVersionManagement.vue';

export default [
  {
    path: '/raft-version-management',
    name: 'raftVersionManagement',
    component: RaftVersionManagement,
  },
  {
    path: '/raft-version-management/:id',
    name: 'editRaftVersion',
    component: EditRaftVersion,
  },
  {
    path: '/raft-version-management/add',
    name: 'addRaftVersion',
    component: AddRaftVersion,
  },
  {
    path: '/launcher-version-management',
    name: 'launcherVersionManagement',
    component: LauncherVersionManagement,
  },
  {
    path: '/launcher/add',
    name: 'addLauncherVersion',
    component: AddLauncherVersion,
  },
  {
    path: '/loader-version-management',
    name: 'loaderVersionManagement',
    component: LoaderVersionManagement,
  },
  {
    path: '/loader/add',
    name: 'addLoaderVersion',
    component: AddLoaderVersion,
  },
].map((route: any) => {
  return {
    ...route,
    meta: {
      ...route.meta,
      adminOnly: true,
    },
  };
});
