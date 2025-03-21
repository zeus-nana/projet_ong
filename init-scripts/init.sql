--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

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

ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_updated_by_foreign;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_created_by_foreign;
ALTER TABLE IF EXISTS ONLY public.user_fonction DROP CONSTRAINT IF EXISTS user_fonction_user_id_foreign;
ALTER TABLE IF EXISTS ONLY public.user_fonction DROP CONSTRAINT IF EXISTS user_fonction_updated_by_foreign;
ALTER TABLE IF EXISTS ONLY public.user_fonction DROP CONSTRAINT IF EXISTS user_fonction_fonction_id_foreign;
ALTER TABLE IF EXISTS ONLY public.user_fonction DROP CONSTRAINT IF EXISTS user_fonction_created_by_foreign;
ALTER TABLE IF EXISTS ONLY public.permission DROP CONSTRAINT IF EXISTS permission_updated_by_foreign;
ALTER TABLE IF EXISTS ONLY public.permission DROP CONSTRAINT IF EXISTS permission_menu_id_foreign;
ALTER TABLE IF EXISTS ONLY public.permission DROP CONSTRAINT IF EXISTS permission_created_by_foreign;
ALTER TABLE IF EXISTS ONLY public.menu DROP CONSTRAINT IF EXISTS menu_updated_by_foreign;
ALTER TABLE IF EXISTS ONLY public.menu DROP CONSTRAINT IF EXISTS menu_created_by_foreign;
ALTER TABLE IF EXISTS ONLY public.fonction DROP CONSTRAINT IF EXISTS fonction_updated_by_foreign;
ALTER TABLE IF EXISTS ONLY public.fonction_menu_permission DROP CONSTRAINT IF EXISTS fonction_menu_permission_updated_by_foreign;
ALTER TABLE IF EXISTS ONLY public.fonction_menu_permission DROP CONSTRAINT IF EXISTS fonction_menu_permission_permission_id_foreign;
ALTER TABLE IF EXISTS ONLY public.fonction_menu_permission DROP CONSTRAINT IF EXISTS fonction_menu_permission_menu_id_foreign;
ALTER TABLE IF EXISTS ONLY public.fonction_menu_permission DROP CONSTRAINT IF EXISTS fonction_menu_permission_fonction_id_foreign;
ALTER TABLE IF EXISTS ONLY public.fonction_menu_permission DROP CONSTRAINT IF EXISTS fonction_menu_permission_created_by_foreign;
ALTER TABLE IF EXISTS ONLY public.fonction DROP CONSTRAINT IF EXISTS fonction_created_by_foreign;
DROP TRIGGER IF EXISTS users_updated_at ON public.users;
DROP TRIGGER IF EXISTS user_fonction_updated_at ON public.user_fonction;
DROP TRIGGER IF EXISTS permission_updated_at ON public.permission;
DROP TRIGGER IF EXISTS menu_updated_at ON public.menu;
DROP TRIGGER IF EXISTS fonction_updated_at ON public.fonction;
DROP TRIGGER IF EXISTS fonction_menu_permission_updated_at ON public.fonction_menu_permission;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_username_unique;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_pkey;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS users_email_unique;
ALTER TABLE IF EXISTS ONLY public.user_fonction DROP CONSTRAINT IF EXISTS user_fonction_pkey;
ALTER TABLE IF EXISTS ONLY public.permission DROP CONSTRAINT IF EXISTS permission_pkey;
ALTER TABLE IF EXISTS ONLY public.permission DROP CONSTRAINT IF EXISTS permission_nom_unique;
ALTER TABLE IF EXISTS ONLY public.menu DROP CONSTRAINT IF EXISTS menu_pkey;
ALTER TABLE IF EXISTS ONLY public.menu DROP CONSTRAINT IF EXISTS menu_nom_unique;
ALTER TABLE IF EXISTS ONLY public.knex_migrations DROP CONSTRAINT IF EXISTS knex_migrations_pkey;
ALTER TABLE IF EXISTS ONLY public.knex_migrations_lock DROP CONSTRAINT IF EXISTS knex_migrations_lock_pkey;
ALTER TABLE IF EXISTS ONLY public.fonction DROP CONSTRAINT IF EXISTS fonction_pkey;
ALTER TABLE IF EXISTS ONLY public.fonction DROP CONSTRAINT IF EXISTS fonction_nom_unique;
ALTER TABLE IF EXISTS ONLY public.fonction_menu_permission DROP CONSTRAINT IF EXISTS fonction_menu_permission_pkey;
ALTER TABLE IF EXISTS public.users ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.user_fonction ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.permission ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.menu ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.knex_migrations_lock ALTER COLUMN index DROP DEFAULT;
ALTER TABLE IF EXISTS public.knex_migrations ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.fonction_menu_permission ALTER COLUMN id DROP DEFAULT;
ALTER TABLE IF EXISTS public.fonction ALTER COLUMN id DROP DEFAULT;
DROP SEQUENCE IF EXISTS public.users_id_seq;
DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.user_fonction_id_seq;
DROP TABLE IF EXISTS public.user_fonction;
DROP SEQUENCE IF EXISTS public.permission_id_seq;
DROP TABLE IF EXISTS public.permission;
DROP SEQUENCE IF EXISTS public.menu_id_seq;
DROP TABLE IF EXISTS public.menu;
DROP SEQUENCE IF EXISTS public.knex_migrations_lock_index_seq;
DROP TABLE IF EXISTS public.knex_migrations_lock;
DROP SEQUENCE IF EXISTS public.knex_migrations_id_seq;
DROP TABLE IF EXISTS public.knex_migrations;
DROP SEQUENCE IF EXISTS public.fonction_menu_permission_id_seq;
DROP TABLE IF EXISTS public.fonction_menu_permission;
DROP SEQUENCE IF EXISTS public.fonction_id_seq;
DROP TABLE IF EXISTS public.fonction;
DROP FUNCTION IF EXISTS public.on_update_timestamp();
--
-- Name: on_update_timestamp(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.on_update_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
  BEGIN
    NEW.updated_at = now();
    RETURN NEW;
  END;
$$;


ALTER FUNCTION public.on_update_timestamp() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: fonction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fonction (
    id integer NOT NULL,
    nom character varying(255) NOT NULL,
    description text,
    created_by integer NOT NULL,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.fonction OWNER TO postgres;

--
-- Name: fonction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fonction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fonction_id_seq OWNER TO postgres;

--
-- Name: fonction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fonction_id_seq OWNED BY public.fonction.id;


--
-- Name: fonction_menu_permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.fonction_menu_permission (
    id integer NOT NULL,
    fonction_id integer NOT NULL,
    permission_id integer NOT NULL,
    menu_id integer NOT NULL,
    created_by integer NOT NULL,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.fonction_menu_permission OWNER TO postgres;

--
-- Name: fonction_menu_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.fonction_menu_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.fonction_menu_permission_id_seq OWNER TO postgres;

--
-- Name: fonction_menu_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.fonction_menu_permission_id_seq OWNED BY public.fonction_menu_permission.id;


--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);


ALTER TABLE public.knex_migrations OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.knex_migrations_id_seq OWNER TO postgres;

--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);


ALTER TABLE public.knex_migrations_lock OWNER TO postgres;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNER TO postgres;

--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: menu; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.menu (
    id integer NOT NULL,
    nom character varying(255) NOT NULL,
    description text,
    created_by integer NOT NULL,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.menu OWNER TO postgres;

--
-- Name: menu_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.menu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.menu_id_seq OWNER TO postgres;

--
-- Name: menu_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.menu_id_seq OWNED BY public.menu.id;


--
-- Name: permission; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permission (
    id integer NOT NULL,
    nom character varying(255) NOT NULL,
    description text,
    menu_id integer NOT NULL,
    created_by integer NOT NULL,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.permission OWNER TO postgres;

--
-- Name: permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permission_id_seq OWNER TO postgres;

--
-- Name: permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permission_id_seq OWNED BY public.permission.id;


--
-- Name: user_fonction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_fonction (
    id integer NOT NULL,
    user_id integer NOT NULL,
    fonction_id integer NOT NULL,
    created_by integer NOT NULL,
    updated_by integer,
    active boolean DEFAULT true,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.user_fonction OWNER TO postgres;

--
-- Name: user_fonction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_fonction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_fonction_id_seq OWNER TO postgres;

--
-- Name: user_fonction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_fonction_id_seq OWNED BY public.user_fonction.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    phone character varying(255),
    department character varying(255),
    must_reset_password boolean DEFAULT true NOT NULL,
    active boolean DEFAULT true NOT NULL,
    created_by integer,
    updated_by integer,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- Name: fonction id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fonction ALTER COLUMN id SET DEFAULT nextval('public.fonction_id_seq'::regclass);


--
-- Name: fonction_menu_permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fonction_menu_permission ALTER COLUMN id SET DEFAULT nextval('public.fonction_menu_permission_id_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: menu id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu ALTER COLUMN id SET DEFAULT nextval('public.menu_id_seq'::regclass);


--
-- Name: permission id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission ALTER COLUMN id SET DEFAULT nextval('public.permission_id_seq'::regclass);


--
-- Name: user_fonction id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_fonction ALTER COLUMN id SET DEFAULT nextval('public.user_fonction_id_seq'::regclass);


--
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- Data for Name: fonction; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: fonction_menu_permission; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.knex_migrations VALUES (1, '2024071100000_first.ts', 1, '2024-11-09 17:13:02.257+01');
INSERT INTO public.knex_migrations VALUES (2, '20240818112436_create_user_table.ts', 1, '2024-11-09 17:13:02.299+01');
INSERT INTO public.knex_migrations VALUES (3, '20241010125654_create_table_menu.ts', 1, '2024-11-09 17:13:02.314+01');
INSERT INTO public.knex_migrations VALUES (4, '20241010130413_create_table_fonction.ts', 1, '2024-11-09 17:13:02.329+01');
INSERT INTO public.knex_migrations VALUES (5, '20241010130644_create_table_permission.ts', 1, '2024-11-09 17:13:02.345+01');
INSERT INTO public.knex_migrations VALUES (6, '20241010132109_create_table_fonction_menu_permission.ts', 1, '2024-11-09 17:13:02.358+01');
INSERT INTO public.knex_migrations VALUES (7, '20241010132132_create_table_user_fonction.ts', 1, '2024-11-09 17:13:02.37+01');


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.knex_migrations_lock VALUES (1, 0);


--
-- Data for Name: menu; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: permission; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: user_fonction; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public.users VALUES (4, 'Samuel Mbia Mvondo', 'password123', 'Samuel Mbia Mvondo@propservice.com', '602970569', 'Marketing', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (5, 'Roger Eto''o Fils', 'password123', 'Roger Eto''o Fils@propservice.com', '605112132', 'IT', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (6, 'Charles Kameni Nomo', 'password123', 'Charles Kameni Nomo@propservice.com', '613826135', 'Operations', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (7, 'Daniel Song Bahanag', 'password123', 'Daniel Song Bahanag@propservice.com', '605749521', 'Finance', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (8, 'Alain Wome Nlend', 'password123', 'Alain Wome Nlend@propservice.com', '608746964', 'IT', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (9, 'Marcel N''Gono Onguene', 'password123', 'Marcel N''Gono Onguene@propservice.com', '635536044', 'Operations', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (10, 'Pierre Idrissou Mbarga', 'password123', 'Pierre Idrissou Mbarga@propservice.com', '623142525', 'RH', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (11, 'Jacques M''Bida Abouna', 'password123', 'Jacques M''Bida Abouna@propservice.com', '659940215', 'Marketing', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (12, 'Michel Onguene Tchoupo', 'password123', 'Michel Onguene Tchoupo@propservice.com', '671023928', 'Operations', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (13, 'Joseph Ebosse Bassogog', 'password123', 'Joseph Ebosse Bassogog@propservice.com', '642295016', 'Finance', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (14, 'Thomas Ngadeu Boumal', 'password123', 'Thomas Ngadeu Boumal@propservice.com', '693421660', 'Marketing', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (15, 'Ernest Oyongo Onana', 'password123', 'Ernest Oyongo Onana@propservice.com', '681144900', 'Finance', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (16, 'Fabrice Siani N''Dip', 'password123', 'Fabrice Siani N''Dip@propservice.com', '694887427', 'Operations', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (17, 'Georges N''Dip Tchakounte', 'password123', 'Georges N''Dip Tchakounte@propservice.com', '617289855', 'IT', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (18, 'Laurent Tchoupo Moundi', 'password123', 'Laurent Tchoupo Moundi@propservice.com', '644103853', 'IT', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (19, 'Patrick Zoua Kana-Biyik', 'password123', 'Patrick Zoua Kana-Biyik@propservice.com', '651740702', 'Operations', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (20, 'Étienne Boumal N''Doumbé', 'password123', 'Étienne Boumal N''Doumbé@propservice.com', '645035566', 'Finance', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (21, 'François N''Jie Fai', 'password123', 'François N''Jie Fai@propservice.com', '690651273', 'Operations', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (22, 'Didier Moundi N''Lend', 'password123', 'Didier Moundi N''Lend@propservice.com', '689369867', 'RH', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (23, 'Hervé N''Gadjui Abouna', 'password123', 'Hervé N''Gadjui Abouna@propservice.com', '682562222', 'Operations', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (24, 'Bruno Kana-Biyik Mbarga', 'password123', 'Bruno Kana-Biyik Mbarga@propservice.com', '693274030', 'RH', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (25, 'Jean-Claude N''Doumbé Onguene', 'password123', 'Jean-Claude N''Doumbé Onguene@propservice.com', '684474922', 'IT', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (26, 'Michel Abouna Njikam', 'password123', 'Michel Abouna Njikam@propservice.com', '612590750', 'Finance', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (27, 'Serge Mbarga Mbia', 'password123', 'Serge Mbarga Mbia@propservice.com', '685981481', 'RH', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (28, 'Christian N''Lend N''Gono', 'password123', 'Christian N''Lend N''Gono@propservice.com', '620068274', 'Marketing', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (29, 'Pascal Tchakounte Wome', 'password123', 'Pascal Tchakounte Wome@propservice.com', '639441664', 'Operations', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (30, 'Sylvain Onana Siani', 'password123', 'Sylvain Onana Siani@propservice.com', '697766235', 'Marketing', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (31, 'Cédric Fai Idrissou', 'password123', 'Cédric Fai Idrissou@propservice.com', '617915052', 'RH', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (32, 'Thierry Njikam Ebosse', 'password123', 'Thierry Njikam Ebosse@propservice.com', '605616773', 'RH', true, true, 2, NULL, '2024-11-09 17:14:24.519763+01', '2024-11-09 17:14:24.519763+01');
INSERT INTO public.users VALUES (3, 'Jean-Marie Njikam Ngon', '$2a$12$JFhWuCJNgFG/f8/bz60e6e5fZsgL5OGiYPKErcV.Ztx6x8bzp4s4C', 'fnana@ufipay.net', '636814100', 'RH', false, true, 2, 3, '2024-11-09 17:14:24.519763+01', '2024-11-19 13:40:42.413701+01');
INSERT INTO public.users VALUES (2, 'Superadmin', '$2a$12$PgFQWt62XkPPi0XzwjelT.UTeKjqmXvD3ngLfZE62Y/4luhWVAita', 'superadmin@propservice.com', '674201025', NULL, false, true, NULL, NULL, '2024-11-09 17:14:24.515828+01', '2024-11-19 13:48:05.327584+01');


--
-- Name: fonction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fonction_id_seq', 1, false);


--
-- Name: fonction_menu_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.fonction_menu_permission_id_seq', 1, false);


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 7, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: menu_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.menu_id_seq', 1, false);


--
-- Name: permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permission_id_seq', 1, false);


--
-- Name: user_fonction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_fonction_id_seq', 1, false);


--
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 32, true);


--
-- Name: fonction_menu_permission fonction_menu_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fonction_menu_permission
    ADD CONSTRAINT fonction_menu_permission_pkey PRIMARY KEY (id);


--
-- Name: fonction fonction_nom_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fonction
    ADD CONSTRAINT fonction_nom_unique UNIQUE (nom);


--
-- Name: fonction fonction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fonction
    ADD CONSTRAINT fonction_pkey PRIMARY KEY (id);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: menu menu_nom_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_nom_unique UNIQUE (nom);


--
-- Name: menu menu_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);


--
-- Name: permission permission_nom_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_nom_unique UNIQUE (nom);


--
-- Name: permission permission_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_pkey PRIMARY KEY (id);


--
-- Name: user_fonction user_fonction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_fonction
    ADD CONSTRAINT user_fonction_pkey PRIMARY KEY (id);


--
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- Name: users users_username_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_unique UNIQUE (username);


--
-- Name: fonction_menu_permission fonction_menu_permission_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER fonction_menu_permission_updated_at BEFORE UPDATE ON public.fonction_menu_permission FOR EACH ROW EXECUTE FUNCTION public.on_update_timestamp();


--
-- Name: fonction fonction_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER fonction_updated_at BEFORE UPDATE ON public.fonction FOR EACH ROW EXECUTE FUNCTION public.on_update_timestamp();


--
-- Name: menu menu_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER menu_updated_at BEFORE UPDATE ON public.menu FOR EACH ROW EXECUTE FUNCTION public.on_update_timestamp();


--
-- Name: permission permission_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER permission_updated_at BEFORE UPDATE ON public.permission FOR EACH ROW EXECUTE FUNCTION public.on_update_timestamp();


--
-- Name: user_fonction user_fonction_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER user_fonction_updated_at BEFORE UPDATE ON public.user_fonction FOR EACH ROW EXECUTE FUNCTION public.on_update_timestamp();


--
-- Name: users users_updated_at; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER users_updated_at BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.on_update_timestamp();


--
-- Name: fonction fonction_created_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fonction
    ADD CONSTRAINT fonction_created_by_foreign FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: fonction_menu_permission fonction_menu_permission_created_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fonction_menu_permission
    ADD CONSTRAINT fonction_menu_permission_created_by_foreign FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: fonction_menu_permission fonction_menu_permission_fonction_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fonction_menu_permission
    ADD CONSTRAINT fonction_menu_permission_fonction_id_foreign FOREIGN KEY (fonction_id) REFERENCES public.fonction(id) ON DELETE CASCADE;


--
-- Name: fonction_menu_permission fonction_menu_permission_menu_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fonction_menu_permission
    ADD CONSTRAINT fonction_menu_permission_menu_id_foreign FOREIGN KEY (menu_id) REFERENCES public.menu(id) ON DELETE CASCADE;


--
-- Name: fonction_menu_permission fonction_menu_permission_permission_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fonction_menu_permission
    ADD CONSTRAINT fonction_menu_permission_permission_id_foreign FOREIGN KEY (permission_id) REFERENCES public.permission(id) ON DELETE CASCADE;


--
-- Name: fonction_menu_permission fonction_menu_permission_updated_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fonction_menu_permission
    ADD CONSTRAINT fonction_menu_permission_updated_by_foreign FOREIGN KEY (updated_by) REFERENCES public.users(id);


--
-- Name: fonction fonction_updated_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.fonction
    ADD CONSTRAINT fonction_updated_by_foreign FOREIGN KEY (updated_by) REFERENCES public.users(id);


--
-- Name: menu menu_created_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_created_by_foreign FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: menu menu_updated_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_updated_by_foreign FOREIGN KEY (updated_by) REFERENCES public.users(id);


--
-- Name: permission permission_created_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_created_by_foreign FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: permission permission_menu_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_menu_id_foreign FOREIGN KEY (menu_id) REFERENCES public.menu(id) ON DELETE CASCADE;


--
-- Name: permission permission_updated_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission
    ADD CONSTRAINT permission_updated_by_foreign FOREIGN KEY (updated_by) REFERENCES public.users(id);


--
-- Name: user_fonction user_fonction_created_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_fonction
    ADD CONSTRAINT user_fonction_created_by_foreign FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: user_fonction user_fonction_fonction_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_fonction
    ADD CONSTRAINT user_fonction_fonction_id_foreign FOREIGN KEY (fonction_id) REFERENCES public.fonction(id) ON DELETE CASCADE;


--
-- Name: user_fonction user_fonction_updated_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_fonction
    ADD CONSTRAINT user_fonction_updated_by_foreign FOREIGN KEY (updated_by) REFERENCES public.users(id);


--
-- Name: user_fonction user_fonction_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_fonction
    ADD CONSTRAINT user_fonction_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE;


--
-- Name: users users_created_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_created_by_foreign FOREIGN KEY (created_by) REFERENCES public.users(id);


--
-- Name: users users_updated_by_foreign; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_updated_by_foreign FOREIGN KEY (updated_by) REFERENCES public.users(id);


--
-- PostgreSQL database dump complete
--

