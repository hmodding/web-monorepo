--
-- PostgreSQL database dump
--
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO postgres;

COMMENT ON SCHEMA public IS 'standard public schema';


SET default_tablespace = '';

CREATE TABLE public."ModBundleContents" (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "modBundleId" integer NOT NULL,
    "modVersionId" integer NOT NULL
);


ALTER TABLE public."ModBundleContents" OWNER TO postgres;

CREATE TABLE public."ModLikes" (
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "userId" integer NOT NULL,
    "modId" character varying(64) NOT NULL
);


ALTER TABLE public."ModLikes" OWNER TO postgres;

CREATE TABLE public."Sessions" (
    sid character varying(36) NOT NULL,
    expires timestamp with time zone,
    data text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Sessions" OWNER TO postgres;

CREATE TABLE public."account-creations" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."account-creations" OWNER TO postgres;

CREATE SEQUENCE public."account-creations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."account-creations_id_seq" OWNER TO postgres;

ALTER SEQUENCE public."account-creations_id_seq" OWNED BY public."account-creations".id;

CREATE TABLE public."discord-account-creations" (
    id integer NOT NULL,
    "discordUserId" character varying(255) NOT NULL,
    "accessToken" character varying(255) NOT NULL,
    "refreshToken" character varying(255) NOT NULL,
    token character varying(255) NOT NULL,
    "discordUserObject" json NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."discord-account-creations" OWNER TO postgres;

CREATE SEQUENCE public."discord-account-creations_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."discord-account-creations_id_seq" OWNER TO postgres;

ALTER SEQUENCE public."discord-account-creations_id_seq" OWNED BY public."discord-account-creations".id;

CREATE TABLE public."discord-sign-ons" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "discordUserId" character varying(255) NOT NULL,
    "accessToken" character varying(255) NOT NULL,
    "refreshToken" character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."discord-sign-ons" OWNER TO postgres;

CREATE SEQUENCE public."discord-sign-ons_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."discord-sign-ons_id_seq" OWNER TO postgres;

ALTER SEQUENCE public."discord-sign-ons_id_seq" OWNED BY public."discord-sign-ons".id;

CREATE TABLE public."download-trackers" (
    id integer NOT NULL,
    "ipHash" character varying(32) NOT NULL,
    path text NOT NULL,
    "expiresAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."download-trackers" OWNER TO postgres;

CREATE SEQUENCE public."download-trackers_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."download-trackers_id_seq" OWNER TO postgres;

ALTER SEQUENCE public."download-trackers_id_seq" OWNED BY public."download-trackers".id;

CREATE TABLE public."file-scans" (
    "fileUrl" text NOT NULL,
    "scanId" character varying(96),
    "scanResult" json,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."file-scans" OWNER TO postgres;

CREATE TABLE public."launcher-versions" (
    version character varying(255) NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    "downloadUrl" text NOT NULL,
    "downloadCount" integer DEFAULT 0 NOT NULL,
    changelog text NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."launcher-versions" OWNER TO postgres;

CREATE TABLE public."loader-versions" (
    "rmlVersion" character varying(255) NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    "downloadUrl" text,
    readme text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "raftVersionId" integer NOT NULL
);


ALTER TABLE public."loader-versions" OWNER TO postgres;

CREATE TABLE public."mod-bundles" (
    id integer NOT NULL,
    title character varying(100) NOT NULL,
    description character varying(255) NOT NULL,
    readme text NOT NULL,
    "maintainerId" integer NOT NULL,
    "bannerImageUrl" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."mod-bundles" OWNER TO postgres;

CREATE SEQUENCE public."mod-bundles_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."mod-bundles_id_seq" OWNER TO postgres;

ALTER SEQUENCE public."mod-bundles_id_seq" OWNED BY public."mod-bundles".id;

CREATE TABLE public."mod-versions" (
    id integer NOT NULL,
    "modId" character varying(64) NOT NULL,
    version character varying(64) NOT NULL,
    changelog text NOT NULL,
    "downloadUrl" text NOT NULL,
    "downloadCount" integer DEFAULT 0 NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "minRaftVersionId" integer,
    "maxRaftVersionId" integer,
    "definiteMaxRaftVersion" boolean NOT NULL
);


ALTER TABLE public."mod-versions" OWNER TO postgres;

CREATE SEQUENCE public."mod-versions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."mod-versions_id_seq" OWNER TO postgres;

ALTER SEQUENCE public."mod-versions_id_seq" OWNED BY public."mod-versions".id;

CREATE TABLE public.mods (
    id character varying(64) NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    readme text NOT NULL,
    category character varying(255) NOT NULL,
    author character varying(255) NOT NULL,
    "bannerImageUrl" text,
    "repositoryUrl" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL,
    "iconImageUrl" text
);


ALTER TABLE public.mods OWNER TO postgres;

CREATE TABLE public."password-resets" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    token character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."password-resets" OWNER TO postgres;

CREATE SEQUENCE public."password-resets_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."password-resets_id_seq" OWNER TO postgres;

ALTER SEQUENCE public."password-resets_id_seq" OWNED BY public."password-resets".id;

CREATE TABLE public."plugin-versions" (
    id integer NOT NULL,
    "pluginId" integer NOT NULL,
    version character varying(64) NOT NULL,
    changelog text NOT NULL,
    "downloadUrl" text NOT NULL,
    "downloadCount" integer DEFAULT 0 NOT NULL,
    "minServerVersionId" character varying(64) NOT NULL,
    "maxServerVersionId" character varying(64) NOT NULL,
    "definiteMaxServerVersion" boolean DEFAULT false NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."plugin-versions" OWNER TO postgres;

CREATE SEQUENCE public."plugin-versions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."plugin-versions_id_seq" OWNER TO postgres;

--
-- TOC entry 3175 (class 0 OID 0)
-- Dependencies: 220
-- Name: plugin-versions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."plugin-versions_id_seq" OWNED BY public."plugin-versions".id;


--
-- TOC entry 219 (class 1259 OID 17093)
-- Name: plugins; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.plugins (
    id integer NOT NULL,
    slug character varying(64) NOT NULL,
    title character varying(255) NOT NULL,
    description character varying(255) NOT NULL,
    readme text NOT NULL,
    "maintainerId" integer NOT NULL,
    "bannerImageUrl" text NOT NULL,
    "repositoryUrl" text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.plugins OWNER TO postgres;

--
-- TOC entry 218 (class 1259 OID 17091)
-- Name: plugins_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.plugins_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.plugins_id_seq OWNER TO postgres;

--
-- TOC entry 3176 (class 0 OID 0)
-- Dependencies: 218
-- Name: plugins_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.plugins_id_seq OWNED BY public.plugins.id;


--
-- TOC entry 229 (class 1259 OID 30010)
-- Name: raft-versions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."raft-versions" (
    id integer NOT NULL,
    version character varying(255) NOT NULL,
    "buildId" integer NOT NULL,
    title character varying(255),
    "releasedAt" timestamp with time zone NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."raft-versions" OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 30008)
-- Name: raft-versions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."raft-versions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."raft-versions_id_seq" OWNER TO postgres;

--
-- TOC entry 3177 (class 0 OID 0)
-- Dependencies: 228
-- Name: raft-versions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."raft-versions_id_seq" OWNED BY public."raft-versions".id;


--
-- TOC entry 216 (class 1259 OID 17070)
-- Name: scheduled-mod-deletions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."scheduled-mod-deletions" (
    id integer NOT NULL,
    "modId" character varying(255) NOT NULL,
    "deletionTime" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."scheduled-mod-deletions" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 17068)
-- Name: scheduled-mod-deletions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."scheduled-mod-deletions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."scheduled-mod-deletions_id_seq" OWNER TO postgres;

--
-- TOC entry 3178 (class 0 OID 0)
-- Dependencies: 215
-- Name: scheduled-mod-deletions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."scheduled-mod-deletions_id_seq" OWNED BY public."scheduled-mod-deletions".id;


--
-- TOC entry 223 (class 1259 OID 17140)
-- Name: scheduled-plugin-deletions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."scheduled-plugin-deletions" (
    id integer NOT NULL,
    "pluginId" integer NOT NULL,
    "deletionTime" timestamp with time zone,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."scheduled-plugin-deletions" OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 17138)
-- Name: scheduled-plugin-deletions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."scheduled-plugin-deletions_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."scheduled-plugin-deletions_id_seq" OWNER TO postgres;

--
-- TOC entry 3179 (class 0 OID 0)
-- Dependencies: 222
-- Name: scheduled-plugin-deletions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."scheduled-plugin-deletions_id_seq" OWNED BY public."scheduled-plugin-deletions".id;


--
-- TOC entry 217 (class 1259 OID 17083)
-- Name: server-versions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."server-versions" (
    version character varying(255) NOT NULL,
    "raftVersion" character varying(255) NOT NULL,
    "timestamp" timestamp with time zone NOT NULL,
    "downloadUrl" text NOT NULL,
    changelog text,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."server-versions" OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 16955)
-- Name: user-privileges; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user-privileges" (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    role character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."user-privileges" OWNER TO postgres;

--
-- TOC entry 201 (class 1259 OID 16953)
-- Name: user-privileges_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public."user-privileges_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."user-privileges_id_seq" OWNER TO postgres;

--
-- TOC entry 3180 (class 0 OID 0)
-- Dependencies: 201
-- Name: user-privileges_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public."user-privileges_id_seq" OWNED BY public."user-privileges".id;


--
-- TOC entry 200 (class 1259 OID 16940)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 199 (class 1259 OID 16938)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 3181 (class 0 OID 0)
-- Dependencies: 199
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 2898 (class 2604 OID 17191)
-- Name: account-creations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."account-creations" ALTER COLUMN id SET DEFAULT nextval('public."account-creations_id_seq"'::regclass);


--
-- TOC entry 2901 (class 2604 OID 17192)
-- Name: discord-account-creations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."discord-account-creations" ALTER COLUMN id SET DEFAULT nextval('public."discord-account-creations_id_seq"'::regclass);


--
-- TOC entry 2900 (class 2604 OID 17193)
-- Name: discord-sign-ons id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."discord-sign-ons" ALTER COLUMN id SET DEFAULT nextval('public."discord-sign-ons_id_seq"'::regclass);


--
-- TOC entry 2911 (class 2604 OID 56931)
-- Name: download-trackers id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."download-trackers" ALTER COLUMN id SET DEFAULT nextval('public."download-trackers_id_seq"'::regclass);


--
-- TOC entry 2902 (class 2604 OID 17194)
-- Name: mod-bundles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."mod-bundles" ALTER COLUMN id SET DEFAULT nextval('public."mod-bundles_id_seq"'::regclass);


--
-- TOC entry 2897 (class 2604 OID 17195)
-- Name: mod-versions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."mod-versions" ALTER COLUMN id SET DEFAULT nextval('public."mod-versions_id_seq"'::regclass);


--
-- TOC entry 2899 (class 2604 OID 17196)
-- Name: password-resets id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."password-resets" ALTER COLUMN id SET DEFAULT nextval('public."password-resets_id_seq"'::regclass);


--
-- TOC entry 2907 (class 2604 OID 17197)
-- Name: plugin-versions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."plugin-versions" ALTER COLUMN id SET DEFAULT nextval('public."plugin-versions_id_seq"'::regclass);


--
-- TOC entry 2904 (class 2604 OID 17198)
-- Name: plugins id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plugins ALTER COLUMN id SET DEFAULT nextval('public.plugins_id_seq'::regclass);


--
-- TOC entry 2910 (class 2604 OID 30013)
-- Name: raft-versions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."raft-versions" ALTER COLUMN id SET DEFAULT nextval('public."raft-versions_id_seq"'::regclass);


--
-- TOC entry 2903 (class 2604 OID 17199)
-- Name: scheduled-mod-deletions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."scheduled-mod-deletions" ALTER COLUMN id SET DEFAULT nextval('public."scheduled-mod-deletions_id_seq"'::regclass);


--
-- TOC entry 2908 (class 2604 OID 17200)
-- Name: scheduled-plugin-deletions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."scheduled-plugin-deletions" ALTER COLUMN id SET DEFAULT nextval('public."scheduled-plugin-deletions_id_seq"'::regclass);


--
-- TOC entry 2895 (class 2604 OID 17201)
-- Name: user-privileges id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user-privileges" ALTER COLUMN id SET DEFAULT nextval('public."user-privileges_id_seq"'::regclass);


--
-- TOC entry 2894 (class 2604 OID 17202)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 3154 (class 0 OID 17153)
-- Dependencies: 224
-- Data for Name: ModBundleContents; Type: TABLE DATA; Schema: public; Owner: postgres
--


--
-- TOC entry 3157 (class 0 OID 18391)
-- Dependencies: 227
-- Data for Name: launcher-versions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."launcher-versions" VALUES ('1.3.0', '2019-10-26 17:03:20.419+02', '/launcher/1.3.0/RMLLauncher.exe', 1582, '## Changelog for RML launcher 1.3.0
- Added a minimize button so you can keep it running in the background.
- Changed the close btn icon.
- Fixed an issue when installing that would make the launcher crash.
- Fixed some UI problems.
- Fixed an issue that would cause the game to crash when you close the launcher.', '2019-10-26 17:03:20.463+02', '2020-05-25 20:23:12.544+02');
INSERT INTO public."launcher-versions" VALUES ('1.6', '2019-12-15 21:33:56.831+01', '/launcher/1.6/RMLLauncher.exe', 922, ' - Fixed multiple crash on start.
 - The launcher will now check if you have missing files when you start the game.
 - Fixed an issue where the launcher would take too much ram if you keep it running.
 - Fixed an issue with the fonts.
 - New autoupdater! The launcher will now properly auto update without ANY problem.
 - Many more bugfixes.', '2019-12-15 21:33:56.84+01', '2020-05-25 20:25:41.432+02');
INSERT INTO public."launcher-versions" VALUES ('2.2.17', '2022-07-07 18:52:42.1+02', '/launcher/2.2.17/RMLLauncher.exe', 38036, ' - Fixed audio for Raft Update 1.08 (working on an auto updater)', '2022-07-07 18:52:42.103+02', '2022-07-21 01:16:44.862+02');


--
-- TOC entry 3127 (class 0 OID 16922)
-- Dependencies: 197
-- Data for Name: loader-versions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."loader-versions" VALUES ('6.2.4', '2021-04-08 18:59:35.375+02', NULL, '- Fixed an issue with the mod compiler.
- The mod compiler will now properly add the dll''s inside the archive as references when compiling.', '2021-04-08 18:59:35.376+02', '2021-04-08 18:59:35.376+02', 27);

INSERT INTO public."raft-versions" VALUES (1, '9.04', 0, 'The Sprinkler!', '2019-04-25 02:00:00+02', '2020-01-20 23:21:16.233+01', '2020-01-20 23:21:16.233+01');
INSERT INTO public."raft-versions" VALUES (2, '9.03', 0, 'Update 9 Hotfix 3!', '2019-03-15 01:00:00+01', '2020-01-20 23:22:18.715+01', '2020-01-20 23:22:18.715+01');
INSERT INTO public."raft-versions" VALUES (3, '9.05', 0, 'Update 9.05 Hotfix', '2019-05-22 02:00:00+02', '2020-01-20 23:23:15.683+01', '2020-01-20 23:23:15.683+01');
INSERT INTO public."raft-versions" VALUES (4, '10.00', 0, 'The First Chapter', '2019-12-03 01:00:00+01', '2020-01-20 23:24:14.852+01', '2020-01-20 23:24:14.852+01');
INSERT INTO public."raft-versions" VALUES (5, '10.06', 0, 'Hotfix 10.06', '2019-12-09 01:00:00+01', '2020-01-20 23:24:49.001+01', '2020-01-20 23:24:49.001+01');
INSERT INTO public."raft-versions" VALUES (6, '10.07', 0, 'Hotfix 10.07', '2019-12-16 01:00:00+01', '2020-01-20 23:25:05.445+01', '2020-01-20 23:25:05.445+01');
INSERT INTO public."raft-versions" VALUES (7, '10.01', 0, 'Hotfix 10.01', '2019-12-04 01:00:00+01', '2020-01-21 16:03:03.445+01', '2020-01-21 16:03:44.461+01');
INSERT INTO public."raft-versions" VALUES (9, '10.03', 0, 'Hotfix 10.3', '2019-12-05 01:00:00+01', '2020-01-21 16:04:54.164+01', '2020-01-21 16:04:54.164+01');
INSERT INTO public."raft-versions" VALUES (10, '10.04', 0, 'Hotfix 10.4', '2019-12-05 01:00:00+01', '2020-01-21 16:05:17.114+01', '2020-01-21 16:05:17.114+01');
INSERT INTO public."raft-versions" VALUES (8, '10.02', 0, 'Hotfix 10.2', '2019-12-04 12:00:00+01', '2020-01-21 16:04:16.949+01', '2020-01-21 16:08:16.649+01');
INSERT INTO public."raft-versions" VALUES (11, '10.05', 0, 'Hotfix 10.05', '2019-12-06 01:00:00+01', '2020-01-21 16:09:43.182+01', '2020-01-21 16:09:43.182+01');
INSERT INTO public."raft-versions" VALUES (12, '9.02', 0, 'Update 9 Hotfix 2', '2019-02-13 01:00:00+01', '2020-01-21 16:12:53.234+01', '2020-01-21 16:12:53.234+01');
INSERT INTO public."raft-versions" VALUES (13, '9.01', 0, 'Update 9 Hotfix 1', '2019-02-08 01:00:00+01', '2020-01-21 16:13:20.121+01', '2020-01-21 16:13:20.121+01');
INSERT INTO public."raft-versions" VALUES (14, '9.00', 0, 'The Domesticated Update', '2019-02-07 01:00:00+01', '2020-01-21 16:13:58.372+01', '2020-01-21 16:13:58.372+01');
INSERT INTO public."raft-versions" VALUES (15, '8.00', 0, 'The Game Mode Update', '2018-11-08 01:00:00+01', '2020-01-21 16:14:24.156+01', '2020-01-21 16:14:56.506+01');
INSERT INTO public."raft-versions" VALUES (16, '7.00', 0, 'The Large Island Update', '2018-10-11 02:00:00+02', '2020-01-21 16:15:58.085+01', '2020-01-21 16:15:58.085+01');
INSERT INTO public."raft-versions" VALUES (17, '7.01', 0, 'Large Island Update Hotfix', '2018-10-16 02:00:00+02', '2020-01-21 16:16:55.876+01', '2020-01-21 16:16:55.876+01');
INSERT INTO public."raft-versions" VALUES (18, '6.00', 0, 'Update #6 - auto saving, bug fixes and a new programmer!', '2018-08-15 02:00:00+02', '2020-01-21 16:17:42.077+01', '2020-01-21 16:17:42.077+01');
INSERT INTO public."raft-versions" VALUES (19, '5.00', 0, 'Update #5 - new building blocks, shark balancing and a brand new help center!', '2018-07-26 02:00:00+02', '2020-01-21 16:18:17.198+01', '2020-01-21 16:18:17.198+01');
INSERT INTO public."raft-versions" VALUES (20, '1.03', 0, 'Raft - Update 1.03', '2018-06-29 02:00:00+02', '2020-01-21 16:19:26.549+01', '2020-01-21 16:19:26.549+01');
INSERT INTO public."raft-versions" VALUES (21, '1.01b', 0, 'Raft - Update 1.01b', '2018-06-01 02:00:00+02', '2020-01-21 16:19:59.348+01', '2020-01-21 16:19:59.348+01');
INSERT INTO public."raft-versions" VALUES (22, '1.01', 0, 'Raft - Update 1.01', '2018-05-25 02:00:00+02', '2020-01-21 16:20:53.514+01', '2020-01-21 16:20:53.514+01');
INSERT INTO public."raft-versions" VALUES (23, '1.00', 0, 'Release', '2018-05-23 02:00:00+02', '2020-01-21 16:21:55.593+01', '2020-01-21 16:21:55.593+01');
INSERT INTO public."raft-versions" VALUES (24, '1.02', 0, 'Raft - Update 1.02', '2018-06-11 02:00:00+02', '2020-01-21 16:23:12.197+01', '2020-01-21 16:23:12.197+01');
INSERT INTO public."raft-versions" VALUES (25, '11', 4677160, 'The Beehive Update', '2020-02-14 01:00:00+01', '2020-02-14 15:19:03.536+01', '2020-02-14 15:19:03.536+01');
INSERT INTO public."raft-versions" VALUES (26, '11a', 0, 'RMLNewModFormat', '2020-08-06 02:00:00+02', '2020-08-06 13:50:54.463+02', '2020-08-06 13:50:54.463+02');
INSERT INTO public."raft-versions" VALUES (27, '12', 5655479, 'Chapter II', '2020-10-08 02:00:00+02', '2020-10-08 19:07:51.844+02', '2020-10-09 20:11:00.15+02');
INSERT INTO public."raft-versions" VALUES (28, '13', 6905064, 'The Renovation Update', '2021-06-21 02:00:00+02', '2021-06-21 18:13:51.223+02', '2021-06-21 18:13:51.223+02');
INSERT INTO public."raft-versions" VALUES (29, '1.0', 8972572, 'The Final Chapter', '2022-06-20 02:00:00+02', '2022-06-20 18:58:26.466+02', '2022-06-20 18:58:26.466+02');
INSERT INTO public."raft-versions" VALUES (30, '1.0 hotfix 1', 8973125, 'The Final Chapter Hotfix #1', '2022-06-21 02:00:00+02', '2022-06-20 21:38:29.793+02', '2022-06-20 21:40:52.492+02');


--
-- TOC entry 3146 (class 0 OID 17070)
-- Dependencies: 216
-- Data for Name: scheduled-mod-deletions; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."scheduled-mod-deletions" VALUES (155, 'item-spawner', '2022-09-13 20:53:25.239+02', '2022-09-03 20:53:25.24+02', '2022-09-03 20:53:25.24+02');


--
-- TOC entry 3153 (class 0 OID 17140)
-- Dependencies: 223
-- Data for Name: scheduled-plugin-deletions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3147 (class 0 OID 17083)
-- Dependencies: 217
-- Data for Name: server-versions; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- TOC entry 3132 (class 0 OID 16955)
-- Dependencies: 202
-- Data for Name: user-privileges; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."user-privileges" VALUES (1, 'admin', 'admin', '2019-03-02 11:37:07.221333+01', '2019-03-02 11:37:07.221333+01');


--
-- TOC entry 3130 (class 0 OID 16940)
-- Dependencies: 200
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (1, 'admin', 'mai@l.com', '$2a$10$q/MTvn1nfza6nEn4GWcH3eZuAcBWi92BWKf6oaiWuLDq4ZmBYXLlW', '2019-02-12 18:17:10.262+01', '2019-02-12 18:17:10.262+01');

SELECT pg_catalog.setval('public."raft-versions_id_seq"', 30, true);
SELECT pg_catalog.setval('public."user-privileges_id_seq"', 1, true);
SELECT pg_catalog.setval('public.users_id_seq', 1, true);


--
-- TOC entry 2975 (class 2606 OID 17157)
-- Name: ModBundleContents ModBundleContents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ModBundleContents"
    ADD CONSTRAINT "ModBundleContents_pkey" PRIMARY KEY ("modBundleId", "modVersionId");


--
-- TOC entry 2979 (class 2606 OID 17422)
-- Name: ModLikes ModLikes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ModLikes"
    ADD CONSTRAINT "ModLikes_pkey" PRIMARY KEY ("userId", "modId");


--
-- TOC entry 2977 (class 2606 OID 17175)
-- Name: Sessions Sessions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Sessions"
    ADD CONSTRAINT "Sessions_pkey" PRIMARY KEY (sid);


--
-- TOC entry 2932 (class 2606 OID 16999)
-- Name: account-creations account-creations_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."account-creations"
    ADD CONSTRAINT "account-creations_email_key" UNIQUE (email);


--
-- TOC entry 2934 (class 2606 OID 16995)
-- Name: account-creations account-creations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."account-creations"
    ADD CONSTRAINT "account-creations_pkey" PRIMARY KEY (id);


--
-- TOC entry 2936 (class 2606 OID 17001)
-- Name: account-creations account-creations_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."account-creations"
    ADD CONSTRAINT "account-creations_token_key" UNIQUE (token);


--
-- TOC entry 2938 (class 2606 OID 16997)
-- Name: account-creations account-creations_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."account-creations"
    ADD CONSTRAINT "account-creations_username_key" UNIQUE (username);


--
-- TOC entry 2952 (class 2606 OID 17051)
-- Name: discord-account-creations discord-account-creations_discordUserId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."discord-account-creations"
    ADD CONSTRAINT "discord-account-creations_discordUserId_key" UNIQUE ("discordUserId");


--
-- TOC entry 2954 (class 2606 OID 17049)
-- Name: discord-account-creations discord-account-creations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."discord-account-creations"
    ADD CONSTRAINT "discord-account-creations_pkey" PRIMARY KEY (id);


--
-- TOC entry 2946 (class 2606 OID 17033)
-- Name: discord-sign-ons discord-sign-ons_discordUserId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."discord-sign-ons"
    ADD CONSTRAINT "discord-sign-ons_discordUserId_key" UNIQUE ("discordUserId");


--
-- TOC entry 2948 (class 2606 OID 17029)
-- Name: discord-sign-ons discord-sign-ons_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."discord-sign-ons"
    ADD CONSTRAINT "discord-sign-ons_pkey" PRIMARY KEY (id);


--
-- TOC entry 2950 (class 2606 OID 17031)
-- Name: discord-sign-ons discord-sign-ons_userId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."discord-sign-ons"
    ADD CONSTRAINT "discord-sign-ons_userId_key" UNIQUE ("userId");


--
-- TOC entry 2988 (class 2606 OID 56936)
-- Name: download-trackers download-trackers_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."download-trackers"
    ADD CONSTRAINT "download-trackers_pkey" PRIMARY KEY (id);


--
-- TOC entry 2913 (class 2606 OID 16921)
-- Name: file-scans file-scans_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."file-scans"
    ADD CONSTRAINT "file-scans_pkey" PRIMARY KEY ("fileUrl");


--
-- TOC entry 2981 (class 2606 OID 18399)
-- Name: launcher-versions launcher-versions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."launcher-versions"
    ADD CONSTRAINT "launcher-versions_pkey" PRIMARY KEY (version);


--
-- TOC entry 2915 (class 2606 OID 16929)
-- Name: loader-versions loader-versions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."loader-versions"
    ADD CONSTRAINT "loader-versions_pkey" PRIMARY KEY ("rmlVersion");


--
-- TOC entry 2956 (class 2606 OID 17062)
-- Name: mod-bundles mod-bundles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."mod-bundles"
    ADD CONSTRAINT "mod-bundles_pkey" PRIMARY KEY (id);


--
-- TOC entry 2930 (class 2606 OID 16978)
-- Name: mod-versions mod-versions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."mod-versions"
    ADD CONSTRAINT "mod-versions_pkey" PRIMARY KEY (id);


--
-- TOC entry 2917 (class 2606 OID 16937)
-- Name: mods mods_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mods
    ADD CONSTRAINT mods_pkey PRIMARY KEY (id);


--
-- TOC entry 2940 (class 2606 OID 17009)
-- Name: password-resets password-resets_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."password-resets"
    ADD CONSTRAINT "password-resets_pkey" PRIMARY KEY (id);


--
-- TOC entry 2942 (class 2606 OID 17013)
-- Name: password-resets password-resets_token_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."password-resets"
    ADD CONSTRAINT "password-resets_token_key" UNIQUE (token);


--
-- TOC entry 2944 (class 2606 OID 17011)
-- Name: password-resets password-resets_userId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."password-resets"
    ADD CONSTRAINT "password-resets_userId_key" UNIQUE ("userId");


--
-- TOC entry 2968 (class 2606 OID 17121)
-- Name: plugin-versions plugin-versions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."plugin-versions"
    ADD CONSTRAINT "plugin-versions_pkey" PRIMARY KEY (id);


--
-- TOC entry 2964 (class 2606 OID 17101)
-- Name: plugins plugins_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plugins
    ADD CONSTRAINT plugins_pkey PRIMARY KEY (id);


--
-- TOC entry 2966 (class 2606 OID 17103)
-- Name: plugins plugins_slug_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plugins
    ADD CONSTRAINT plugins_slug_key UNIQUE (slug);


--
-- TOC entry 2983 (class 2606 OID 30018)
-- Name: raft-versions raft-versions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."raft-versions"
    ADD CONSTRAINT "raft-versions_pkey" PRIMARY KEY (id);


--
-- TOC entry 2985 (class 2606 OID 30020)
-- Name: raft-versions raft-versions_version_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."raft-versions"
    ADD CONSTRAINT "raft-versions_version_key" UNIQUE (version);


--
-- TOC entry 2958 (class 2606 OID 17077)
-- Name: scheduled-mod-deletions scheduled-mod-deletions_modId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."scheduled-mod-deletions"
    ADD CONSTRAINT "scheduled-mod-deletions_modId_key" UNIQUE ("modId");


--
-- TOC entry 2960 (class 2606 OID 17075)
-- Name: scheduled-mod-deletions scheduled-mod-deletions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."scheduled-mod-deletions"
    ADD CONSTRAINT "scheduled-mod-deletions_pkey" PRIMARY KEY (id);


--
-- TOC entry 2971 (class 2606 OID 17145)
-- Name: scheduled-plugin-deletions scheduled-plugin-deletions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."scheduled-plugin-deletions"
    ADD CONSTRAINT "scheduled-plugin-deletions_pkey" PRIMARY KEY (id);


--
-- TOC entry 2973 (class 2606 OID 17147)
-- Name: scheduled-plugin-deletions scheduled-plugin-deletions_pluginId_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."scheduled-plugin-deletions"
    ADD CONSTRAINT "scheduled-plugin-deletions_pluginId_key" UNIQUE ("pluginId");


--
-- TOC entry 2962 (class 2606 OID 17090)
-- Name: server-versions server-versions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."server-versions"
    ADD CONSTRAINT "server-versions_pkey" PRIMARY KEY (version);


--
-- TOC entry 2925 (class 2606 OID 16963)
-- Name: user-privileges user-privileges_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user-privileges"
    ADD CONSTRAINT "user-privileges_pkey" PRIMARY KEY (id);


--
-- TOC entry 2927 (class 2606 OID 16965)
-- Name: user-privileges user-privileges_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user-privileges"
    ADD CONSTRAINT "user-privileges_username_key" UNIQUE (username);


--
-- TOC entry 2919 (class 2606 OID 16952)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 2921 (class 2606 OID 16948)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 2923 (class 2606 OID 16950)
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- TOC entry 2986 (class 1259 OID 56937)
-- Name: download-trackers_ip_hash_path; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "download-trackers_ip_hash_path" ON public."download-trackers" USING btree ("ipHash", path);


--
-- TOC entry 2928 (class 1259 OID 16984)
-- Name: mod-versions_mod_id_version; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "mod-versions_mod_id_version" ON public."mod-versions" USING btree ("modId", version);


--
-- TOC entry 2969 (class 1259 OID 17137)
-- Name: plugin-versions_plugin_id_version; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "plugin-versions_plugin_id_version" ON public."plugin-versions" USING btree ("pluginId", version);


--
-- TOC entry 3001 (class 2606 OID 17158)
-- Name: ModBundleContents ModBundleContents_modBundleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ModBundleContents"
    ADD CONSTRAINT "ModBundleContents_modBundleId_fkey" FOREIGN KEY ("modBundleId") REFERENCES public."mod-bundles"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3002 (class 2606 OID 17163)
-- Name: ModBundleContents ModBundleContents_modVersionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ModBundleContents"
    ADD CONSTRAINT "ModBundleContents_modVersionId_fkey" FOREIGN KEY ("modVersionId") REFERENCES public."mod-versions"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3004 (class 2606 OID 17428)
-- Name: ModLikes ModLikes_modId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ModLikes"
    ADD CONSTRAINT "ModLikes_modId_fkey" FOREIGN KEY ("modId") REFERENCES public.mods(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3003 (class 2606 OID 17423)
-- Name: ModLikes ModLikes_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ModLikes"
    ADD CONSTRAINT "ModLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2993 (class 2606 OID 17034)
-- Name: discord-sign-ons discord-sign-ons_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."discord-sign-ons"
    ADD CONSTRAINT "discord-sign-ons_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- TOC entry 2994 (class 2606 OID 17063)
-- Name: mod-bundles mod-bundles_maintainerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."mod-bundles"
    ADD CONSTRAINT "mod-bundles_maintainerId_fkey" FOREIGN KEY ("maintainerId") REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- TOC entry 2991 (class 2606 OID 30026)
-- Name: mod-versions mod-versions_maxRaftVersionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."mod-versions"
    ADD CONSTRAINT "mod-versions_maxRaftVersionId_fkey" FOREIGN KEY ("maxRaftVersionId") REFERENCES public."raft-versions"(id);


--
-- TOC entry 2990 (class 2606 OID 30021)
-- Name: mod-versions mod-versions_minRaftVersionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."mod-versions"
    ADD CONSTRAINT "mod-versions_minRaftVersionId_fkey" FOREIGN KEY ("minRaftVersionId") REFERENCES public."raft-versions"(id);


--
-- TOC entry 2989 (class 2606 OID 16979)
-- Name: mod-versions mod-versions_modId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."mod-versions"
    ADD CONSTRAINT "mod-versions_modId_fkey" FOREIGN KEY ("modId") REFERENCES public.mods(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2992 (class 2606 OID 17014)
-- Name: password-resets password-resets_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."password-resets"
    ADD CONSTRAINT "password-resets_userId_fkey" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- TOC entry 2999 (class 2606 OID 17132)
-- Name: plugin-versions plugin-versions_maxServerVersionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."plugin-versions"
    ADD CONSTRAINT "plugin-versions_maxServerVersionId_fkey" FOREIGN KEY ("maxServerVersionId") REFERENCES public."server-versions"(version);


--
-- TOC entry 2998 (class 2606 OID 17127)
-- Name: plugin-versions plugin-versions_minServerVersionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."plugin-versions"
    ADD CONSTRAINT "plugin-versions_minServerVersionId_fkey" FOREIGN KEY ("minServerVersionId") REFERENCES public."server-versions"(version);


--
-- TOC entry 2997 (class 2606 OID 17122)
-- Name: plugin-versions plugin-versions_pluginId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."plugin-versions"
    ADD CONSTRAINT "plugin-versions_pluginId_fkey" FOREIGN KEY ("pluginId") REFERENCES public.plugins(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 2996 (class 2606 OID 17104)
-- Name: plugins plugins_maintainerId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.plugins
    ADD CONSTRAINT "plugins_maintainerId_fkey" FOREIGN KEY ("maintainerId") REFERENCES public.users(id) ON UPDATE CASCADE;


--
-- TOC entry 2995 (class 2606 OID 17078)
-- Name: scheduled-mod-deletions scheduled-mod-deletions_modId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."scheduled-mod-deletions"
    ADD CONSTRAINT "scheduled-mod-deletions_modId_fkey" FOREIGN KEY ("modId") REFERENCES public.mods(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3000 (class 2606 OID 17148)
-- Name: scheduled-plugin-deletions scheduled-plugin-deletions_pluginId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."scheduled-plugin-deletions"
    ADD CONSTRAINT "scheduled-plugin-deletions_pluginId_fkey" FOREIGN KEY ("pluginId") REFERENCES public.plugins(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2022-09-12 21:15:25 CEST

--
-- PostgreSQL database dump complete
--

