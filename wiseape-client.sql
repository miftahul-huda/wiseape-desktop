PGDMP                          {            wiseape-client    14.8    14.4                0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    33016    wiseape-client    DATABASE     e   CREATE DATABASE "wiseape-client" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
     DROP DATABASE "wiseape-client";
                postgres    false            �            1259    33027    application    TABLE     C  CREATE TABLE public.application (
    id integer NOT NULL,
    "appID" character varying(255),
    "appTitle" character varying(255),
    "appInclude" character varying(255),
    "appEndPoint" character varying(255),
    "appIcon" character varying(255),
    "appInfo" character varying(255),
    "appVersion" character varying(255),
    company character varying(255),
    "appWebsite" character varying(255),
    "appConfig" character varying(255),
    "appRootPath" character varying(255),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.application;
       public         heap    nodeuser    false            �            1259    33026    application_id_seq    SEQUENCE     �   CREATE SEQUENCE public.application_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.application_id_seq;
       public          nodeuser    false    212                       0    0    application_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.application_id_seq OWNED BY public.application.id;
          public          nodeuser    false    211            �            1259    33018    menu    TABLE     �  CREATE TABLE public.menu (
    id integer NOT NULL,
    title character varying(255),
    description character varying(255),
    icon character varying(255),
    "menuType" character varying(255),
    "parentMenuId" integer,
    "appID" character varying(255),
    "appCommand" character varying(255),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);
    DROP TABLE public.menu;
       public         heap    nodeuser    false            �            1259    33017    menu_id_seq    SEQUENCE     �   CREATE SEQUENCE public.menu_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.menu_id_seq;
       public          nodeuser    false    210                       0    0    menu_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.menu_id_seq OWNED BY public.menu.id;
          public          nodeuser    false    209            m           2604    33030    application id    DEFAULT     p   ALTER TABLE ONLY public.application ALTER COLUMN id SET DEFAULT nextval('public.application_id_seq'::regclass);
 =   ALTER TABLE public.application ALTER COLUMN id DROP DEFAULT;
       public          nodeuser    false    211    212    212            l           2604    33021    menu id    DEFAULT     b   ALTER TABLE ONLY public.menu ALTER COLUMN id SET DEFAULT nextval('public.menu_id_seq'::regclass);
 6   ALTER TABLE public.menu ALTER COLUMN id DROP DEFAULT;
       public          nodeuser    false    209    210    210                       0    33027    application 
   TABLE DATA           �   COPY public.application (id, "appID", "appTitle", "appInclude", "appEndPoint", "appIcon", "appInfo", "appVersion", company, "appWebsite", "appConfig", "appRootPath", "createdAt", "updatedAt") FROM stdin;
    public          nodeuser    false    212   [       �          0    33018    menu 
   TABLE DATA           �   COPY public.menu (id, title, description, icon, "menuType", "parentMenuId", "appID", "appCommand", "createdAt", "updatedAt") FROM stdin;
    public          nodeuser    false    210   z       	           0    0    application_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.application_id_seq', 1, false);
          public          nodeuser    false    211            
           0    0    menu_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.menu_id_seq', 1, false);
          public          nodeuser    false    209            q           2606    33034    application application_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.application
    ADD CONSTRAINT application_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.application DROP CONSTRAINT application_pkey;
       public            nodeuser    false    212            o           2606    33025    menu menu_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.menu
    ADD CONSTRAINT menu_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.menu DROP CONSTRAINT menu_pkey;
       public            nodeuser    false    210                  x����J�0���S����*Ko<kY\�K`	5�Y�LhFd�ݦM��9��03�oM�����V���VɆ�Cg�X�'���ruޔzx\1�{ִ��u��W�Y:������(h�p�}�.`ހ&�&��P�b���z~��ɕ���_AI���� �ft�C���3Dݛּ?���L�O�X� z�Ekx��5� ~��LG`��df ���&h����+�/:�0Lo�������v)-i�!ڲ(4\u��n����Ϩ�e� ��$I� �Y�      �   �   x�u�ώ�0���S�]���`���uo^,��N�N=��ۂtqS�&�0����>�ieŝ��y#l�&�P��Q}ef������s���d�%�1]���O �����b��x	Gm]�[�_��@�,F<9˝h��iW1m�L�IN�x������Eju�^>RhÅ�y�P�`g�L+X����;����{�Ću�w
�)�Mt���+��S�/G�5��J��:x��}�.�H�:˲��;̶     