PGDMP          %                z           postgres    14.4    14.4 "               0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false                       0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                       0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    14021    postgres    DATABASE     ]   CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF-8';
    DROP DATABASE postgres;
                postgres    false                       0    0    DATABASE postgres    COMMENT     N   COMMENT ON DATABASE postgres IS 'default administrative connection database';
                   postgres    false    3612            ?            1259    16663    circuit    TABLE     ?   CREATE TABLE public.circuit (
    meter_id integer,
    circuit_id_parent integer,
    name character varying,
    installation_date character varying,
    is_main boolean,
    circuit_id integer NOT NULL
);
    DROP TABLE public.circuit;
       public         heap    postgres    false            ?            1259    16662    circuit_circuit_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.circuit_circuit_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.circuit_circuit_id_seq;
       public          postgres    false    216                       0    0    circuit_circuit_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.circuit_circuit_id_seq OWNED BY public.circuit.circuit_id;
          public          postgres    false    215            ?            1259    16565    customer    TABLE     ?   CREATE TABLE public.customer (
    customer_id integer NOT NULL,
    name character varying,
    email character varying,
    vat_number character varying
);
    DROP TABLE public.customer;
       public         heap    postgres    false            ?            1259    16564    contacts_customer_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.contacts_customer_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 /   DROP SEQUENCE public.contacts_customer_id_seq;
       public          postgres    false    210                       0    0    contacts_customer_id_seq    SEQUENCE OWNED BY     U   ALTER SEQUENCE public.contacts_customer_id_seq OWNED BY public.customer.customer_id;
          public          postgres    false    209            ?            1259    16651    meter    TABLE     ?   CREATE TABLE public.meter (
    meter_id integer NOT NULL,
    customer_id character varying(50),
    name character varying(50),
    serial_number character varying(50),
    site_id integer,
    installation_date character varying
);
    DROP TABLE public.meter;
       public         heap    postgres    false            ?            1259    16650    meter_meter_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.meter_meter_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.meter_meter_id_seq;
       public          postgres    false    214                        0    0    meter_meter_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.meter_meter_id_seq OWNED BY public.meter.meter_id;
          public          postgres    false    213            ?            1259    16575    site    TABLE     ?   CREATE TABLE public.site (
    customer_id integer,
    site_id integer NOT NULL,
    name character varying,
    coordinates character varying,
    address character varying,
    post_code character varying
);
    DROP TABLE public.site;
       public         heap    postgres    false            ?            1259    16574    site_site_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.site_site_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.site_site_id_seq;
       public          postgres    false    212            !           0    0    site_site_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.site_site_id_seq OWNED BY public.site.site_id;
          public          postgres    false    211            y           2604    16666    circuit circuit_id    DEFAULT     x   ALTER TABLE ONLY public.circuit ALTER COLUMN circuit_id SET DEFAULT nextval('public.circuit_circuit_id_seq'::regclass);
 A   ALTER TABLE public.circuit ALTER COLUMN circuit_id DROP DEFAULT;
       public          postgres    false    215    216    216            v           2604    16568    customer customer_id    DEFAULT     |   ALTER TABLE ONLY public.customer ALTER COLUMN customer_id SET DEFAULT nextval('public.contacts_customer_id_seq'::regclass);
 C   ALTER TABLE public.customer ALTER COLUMN customer_id DROP DEFAULT;
       public          postgres    false    209    210    210            x           2604    16654    meter meter_id    DEFAULT     p   ALTER TABLE ONLY public.meter ALTER COLUMN meter_id SET DEFAULT nextval('public.meter_meter_id_seq'::regclass);
 =   ALTER TABLE public.meter ALTER COLUMN meter_id DROP DEFAULT;
       public          postgres    false    213    214    214            w           2604    16578    site site_id    DEFAULT     l   ALTER TABLE ONLY public.site ALTER COLUMN site_id SET DEFAULT nextval('public.site_site_id_seq'::regclass);
 ;   ALTER TABLE public.site ALTER COLUMN site_id DROP DEFAULT;
       public          postgres    false    212    211    212                      0    16663    circuit 
   TABLE DATA           l   COPY public.circuit (meter_id, circuit_id_parent, name, installation_date, is_main, circuit_id) FROM stdin;
    public          postgres    false    216   ?$                 0    16565    customer 
   TABLE DATA           H   COPY public.customer (customer_id, name, email, vat_number) FROM stdin;
    public          postgres    false    210   .%                 0    16651    meter 
   TABLE DATA           g   COPY public.meter (meter_id, customer_id, name, serial_number, site_id, installation_date) FROM stdin;
    public          postgres    false    214   ?%                 0    16575    site 
   TABLE DATA           [   COPY public.site (customer_id, site_id, name, coordinates, address, post_code) FROM stdin;
    public          postgres    false    212   ?%       "           0    0    circuit_circuit_id_seq    SEQUENCE SET     E   SELECT pg_catalog.setval('public.circuit_circuit_id_seq', 20, true);
          public          postgres    false    215            #           0    0    contacts_customer_id_seq    SEQUENCE SET     G   SELECT pg_catalog.setval('public.contacts_customer_id_seq', 19, true);
          public          postgres    false    209            $           0    0    meter_meter_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.meter_meter_id_seq', 23, true);
          public          postgres    false    213            %           0    0    site_site_id_seq    SEQUENCE SET     ?   SELECT pg_catalog.setval('public.site_site_id_seq', 19, true);
          public          postgres    false    211            ?           2606    16670    circuit circuit_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.circuit
    ADD CONSTRAINT circuit_pkey PRIMARY KEY (circuit_id);
 >   ALTER TABLE ONLY public.circuit DROP CONSTRAINT circuit_pkey;
       public            postgres    false    216            {           2606    16572    customer contacts_pkey 
   CONSTRAINT     ]   ALTER TABLE ONLY public.customer
    ADD CONSTRAINT contacts_pkey PRIMARY KEY (customer_id);
 @   ALTER TABLE ONLY public.customer DROP CONSTRAINT contacts_pkey;
       public            postgres    false    210                       2606    16656    meter meter_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.meter
    ADD CONSTRAINT meter_pkey PRIMARY KEY (meter_id);
 :   ALTER TABLE ONLY public.meter DROP CONSTRAINT meter_pkey;
       public            postgres    false    214            ?           2606    16658    meter meter_serial_number_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.meter
    ADD CONSTRAINT meter_serial_number_key UNIQUE (serial_number);
 G   ALTER TABLE ONLY public.meter DROP CONSTRAINT meter_serial_number_key;
       public            postgres    false    214            }           2606    16582    site site_pkey 
   CONSTRAINT     Q   ALTER TABLE ONLY public.site
    ADD CONSTRAINT site_pkey PRIMARY KEY (site_id);
 8   ALTER TABLE ONLY public.site DROP CONSTRAINT site_pkey;
       public            postgres    false    212               H   x?3????t,(?IUp?,J.?,?4202?5??5012?24?L?4?2?HML??Pgh
RgRg????? ?:         M   x?3?????˫TpI-(????s3s???s9#"???ML??8???R?J???2??9??\T??&??F?\1z\\\ ?=         Q   x?3?4?t??,JT?M-I-?442"????????????B???????gpNfj.L???	Eaj?B-?-?b???? ş?         x   x?3?4?t??,JT?,I?46ճ05?<?A?OG??D?????q?N??+QH,?Q.)JM-Q02???U0447?2?4???L?E2???n????)?_?1p?6G)?q??qqq ?&t     