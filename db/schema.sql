--
-- PostgreSQL database dump
--

-- Dumped from database version 9.1.13
-- Dumped by pg_dump version 9.1.13
-- Started on 2015-02-20 17:43:30 EST

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 1981 (class 1262 OID 16384)
-- Name: stock; Type: DATABASE; Schema: -; Owner: postgres
--

CREATE DATABASE stock WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'en_AU.UTF-8' LC_CTYPE = 'en_AU.UTF-8';


ALTER DATABASE stock OWNER TO postgres;

\connect stock

SET statement_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 178 (class 3079 OID 11677)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 1984 (class 0 OID 0)
-- Dependencies: 178
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 162 (class 1259 OID 16387)
-- Dependencies: 5
-- Name: group; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE "group" (
    id integer NOT NULL,
    name text NOT NULL,
    picture bytea
);


ALTER TABLE public."group" OWNER TO postgres;

--
-- TOC entry 161 (class 1259 OID 16385)
-- Dependencies: 162 5
-- Name: Group_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "Group_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Group_id_seq" OWNER TO postgres;

--
-- TOC entry 1985 (class 0 OID 0)
-- Dependencies: 161
-- Name: Group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "Group_id_seq" OWNED BY "group".id;


--
-- TOC entry 177 (class 1259 OID 16494)
-- Dependencies: 5
-- Name: item; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE item (
    id integer NOT NULL,
    "productId" integer NOT NULL,
    amount integer NOT NULL,
    "storeDate" timestamp without time zone NOT NULL,
    expiry timestamp without time zone
);


ALTER TABLE public.item OWNER TO postgres;

--
-- TOC entry 175 (class 1259 OID 16490)
-- Dependencies: 5 177
-- Name: item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE item_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.item_id_seq OWNER TO postgres;

--
-- TOC entry 1986 (class 0 OID 0)
-- Dependencies: 175
-- Name: item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE item_id_seq OWNED BY item.id;


--
-- TOC entry 176 (class 1259 OID 16492)
-- Dependencies: 177 5
-- Name: item_productId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "item_productId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."item_productId_seq" OWNER TO postgres;

--
-- TOC entry 1987 (class 0 OID 0)
-- Dependencies: 176
-- Name: item_productId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "item_productId_seq" OWNED BY item."productId";


--
-- TOC entry 174 (class 1259 OID 16460)
-- Dependencies: 5
-- Name: product; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE product (
    id integer NOT NULL,
    "subgroupId" integer NOT NULL,
    "unitId" integer NOT NULL,
    "storeId" integer NOT NULL,
    name text NOT NULL,
    "estimatedLife" interval,
    picture bytea
);


ALTER TABLE public.product OWNER TO postgres;

--
-- TOC entry 170 (class 1259 OID 16452)
-- Dependencies: 174 5
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.product_id_seq OWNER TO postgres;

--
-- TOC entry 1988 (class 0 OID 0)
-- Dependencies: 170
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE product_id_seq OWNED BY product.id;


--
-- TOC entry 173 (class 1259 OID 16458)
-- Dependencies: 5 174
-- Name: product_storeId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "product_storeId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."product_storeId_seq" OWNER TO postgres;

--
-- TOC entry 1989 (class 0 OID 0)
-- Dependencies: 173
-- Name: product_storeId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "product_storeId_seq" OWNED BY product."storeId";


--
-- TOC entry 171 (class 1259 OID 16454)
-- Dependencies: 5 174
-- Name: product_subgroupId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "product_subgroupId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."product_subgroupId_seq" OWNER TO postgres;

--
-- TOC entry 1990 (class 0 OID 0)
-- Dependencies: 171
-- Name: product_subgroupId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "product_subgroupId_seq" OWNED BY product."subgroupId";


--
-- TOC entry 172 (class 1259 OID 16456)
-- Dependencies: 174 5
-- Name: product_unitId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "product_unitId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."product_unitId_seq" OWNER TO postgres;

--
-- TOC entry 1991 (class 0 OID 0)
-- Dependencies: 172
-- Name: product_unitId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "product_unitId_seq" OWNED BY product."unitId";


--
-- TOC entry 169 (class 1259 OID 16441)
-- Dependencies: 5
-- Name: store; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE store (
    id integer NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.store OWNER TO postgres;

--
-- TOC entry 168 (class 1259 OID 16439)
-- Dependencies: 169 5
-- Name: store_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE store_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.store_id_seq OWNER TO postgres;

--
-- TOC entry 1992 (class 0 OID 0)
-- Dependencies: 168
-- Name: store_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE store_id_seq OWNED BY store.id;


--
-- TOC entry 165 (class 1259 OID 16403)
-- Dependencies: 5
-- Name: subgroup; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE subgroup (
    id integer NOT NULL,
    "groupId" integer NOT NULL,
    name text NOT NULL,
    picture bytea
);


ALTER TABLE public.subgroup OWNER TO postgres;

--
-- TOC entry 164 (class 1259 OID 16401)
-- Dependencies: 165 5
-- Name: subgroup_groupId_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE "subgroup_groupId_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."subgroup_groupId_seq" OWNER TO postgres;

--
-- TOC entry 1993 (class 0 OID 0)
-- Dependencies: 164
-- Name: subgroup_groupId_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE "subgroup_groupId_seq" OWNED BY subgroup."groupId";


--
-- TOC entry 163 (class 1259 OID 16399)
-- Dependencies: 5 165
-- Name: subgroup_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE subgroup_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.subgroup_id_seq OWNER TO postgres;

--
-- TOC entry 1994 (class 0 OID 0)
-- Dependencies: 163
-- Name: subgroup_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE subgroup_id_seq OWNED BY subgroup.id;


--
-- TOC entry 167 (class 1259 OID 16426)
-- Dependencies: 5
-- Name: unit; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE unit (
    id integer NOT NULL,
    abbreviation text NOT NULL,
    name text NOT NULL
);


ALTER TABLE public.unit OWNER TO postgres;

--
-- TOC entry 166 (class 1259 OID 16424)
-- Dependencies: 5 167
-- Name: unit_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE unit_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.unit_id_seq OWNER TO postgres;

--
-- TOC entry 1995 (class 0 OID 0)
-- Dependencies: 166
-- Name: unit_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE unit_id_seq OWNED BY unit.id;


--
-- TOC entry 1828 (class 2604 OID 16390)
-- Dependencies: 162 161 162
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY "group" ALTER COLUMN id SET DEFAULT nextval('"Group_id_seq"'::regclass);


--
-- TOC entry 1837 (class 2604 OID 16497)
-- Dependencies: 177 175 177
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY item ALTER COLUMN id SET DEFAULT nextval('item_id_seq'::regclass);


--
-- TOC entry 1838 (class 2604 OID 16498)
-- Dependencies: 176 177 177
-- Name: productId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY item ALTER COLUMN "productId" SET DEFAULT nextval('"item_productId_seq"'::regclass);


--
-- TOC entry 1833 (class 2604 OID 16463)
-- Dependencies: 170 174 174
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY product ALTER COLUMN id SET DEFAULT nextval('product_id_seq'::regclass);


--
-- TOC entry 1834 (class 2604 OID 16464)
-- Dependencies: 174 171 174
-- Name: subgroupId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY product ALTER COLUMN "subgroupId" SET DEFAULT nextval('"product_subgroupId_seq"'::regclass);


--
-- TOC entry 1835 (class 2604 OID 16465)
-- Dependencies: 172 174 174
-- Name: unitId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY product ALTER COLUMN "unitId" SET DEFAULT nextval('"product_unitId_seq"'::regclass);


--
-- TOC entry 1836 (class 2604 OID 16466)
-- Dependencies: 173 174 174
-- Name: storeId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY product ALTER COLUMN "storeId" SET DEFAULT nextval('"product_storeId_seq"'::regclass);


--
-- TOC entry 1832 (class 2604 OID 16444)
-- Dependencies: 168 169 169
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY store ALTER COLUMN id SET DEFAULT nextval('store_id_seq'::regclass);


--
-- TOC entry 1829 (class 2604 OID 16406)
-- Dependencies: 163 165 165
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subgroup ALTER COLUMN id SET DEFAULT nextval('subgroup_id_seq'::regclass);


--
-- TOC entry 1830 (class 2604 OID 16407)
-- Dependencies: 164 165 165
-- Name: groupId; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subgroup ALTER COLUMN "groupId" SET DEFAULT nextval('"subgroup_groupId_seq"'::regclass);


--
-- TOC entry 1831 (class 2604 OID 16429)
-- Dependencies: 166 167 167
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY unit ALTER COLUMN id SET DEFAULT nextval('unit_id_seq'::regclass);


--
-- TOC entry 1840 (class 2606 OID 16397)
-- Dependencies: 162 162 1978
-- Name: group_id_PK; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "group"
    ADD CONSTRAINT "group_id_PK" PRIMARY KEY (id);


--
-- TOC entry 1843 (class 2606 OID 16421)
-- Dependencies: 162 162 1978
-- Name: group_name_UNIQUE; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY "group"
    ADD CONSTRAINT "group_name_UNIQUE" UNIQUE (name);


--
-- TOC entry 1869 (class 2606 OID 16500)
-- Dependencies: 177 177 1978
-- Name: item_id_PK; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY item
    ADD CONSTRAINT "item_id_PK" PRIMARY KEY (id);


--
-- TOC entry 1861 (class 2606 OID 16471)
-- Dependencies: 174 174 1978
-- Name: product_id_PK; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY product
    ADD CONSTRAINT "product_id_PK" PRIMARY KEY (id);


--
-- TOC entry 1864 (class 2606 OID 16473)
-- Dependencies: 174 174 1978
-- Name: product_name_UNIQUE; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY product
    ADD CONSTRAINT "product_name_UNIQUE" UNIQUE (name);


--
-- TOC entry 1857 (class 2606 OID 16449)
-- Dependencies: 169 169 1978
-- Name: store_id_PK; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY store
    ADD CONSTRAINT "store_id_PK" PRIMARY KEY (id);


--
-- TOC entry 1859 (class 2606 OID 16451)
-- Dependencies: 169 169 1978
-- Name: store_name_UNIQUE; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY store
    ADD CONSTRAINT "store_name_UNIQUE" UNIQUE (name);


--
-- TOC entry 1846 (class 2606 OID 16412)
-- Dependencies: 165 165 1978
-- Name: subgroup_id_PK; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY subgroup
    ADD CONSTRAINT "subgroup_id_PK" PRIMARY KEY (id);


--
-- TOC entry 1849 (class 2606 OID 16423)
-- Dependencies: 165 165 1978
-- Name: subgroup_name_UNIQUE; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY subgroup
    ADD CONSTRAINT "subgroup_name_UNIQUE" UNIQUE (name);


--
-- TOC entry 1851 (class 2606 OID 16436)
-- Dependencies: 167 167 1978
-- Name: unit_abbreviation_UNIQUE; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY unit
    ADD CONSTRAINT "unit_abbreviation_UNIQUE" UNIQUE (abbreviation);


--
-- TOC entry 1853 (class 2606 OID 16434)
-- Dependencies: 167 167 1978
-- Name: unit_id_PK; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY unit
    ADD CONSTRAINT "unit_id_PK" PRIMARY KEY (id);


--
-- TOC entry 1855 (class 2606 OID 16438)
-- Dependencies: 167 167 1978
-- Name: unit_name_UNIQUE; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY unit
    ADD CONSTRAINT "unit_name_UNIQUE" UNIQUE (name);


--
-- TOC entry 1841 (class 1259 OID 16398)
-- Dependencies: 162 1978
-- Name: group_name_IDX; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "group_name_IDX" ON "group" USING btree (name);


--
-- TOC entry 1870 (class 1259 OID 16510)
-- Dependencies: 177 1978
-- Name: item_productId_IDX; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "item_productId_IDX" ON item USING btree ("productId");


--
-- TOC entry 1862 (class 1259 OID 16509)
-- Dependencies: 174 1978
-- Name: product_name_IDX; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "product_name_IDX" ON product USING btree (name);


--
-- TOC entry 1865 (class 1259 OID 16508)
-- Dependencies: 174 1978
-- Name: product_storeId_IDX; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "product_storeId_IDX" ON product USING btree ("storeId");


--
-- TOC entry 1866 (class 1259 OID 16506)
-- Dependencies: 174 1978
-- Name: product_subgroupId_IDX; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "product_subgroupId_IDX" ON product USING btree ("subgroupId");


--
-- TOC entry 1867 (class 1259 OID 16507)
-- Dependencies: 174 1978
-- Name: product_unitId_IDX; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "product_unitId_IDX" ON product USING btree ("unitId");


--
-- TOC entry 1844 (class 1259 OID 16418)
-- Dependencies: 165 1978
-- Name: subgroup_groupId_IDX; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "subgroup_groupId_IDX" ON subgroup USING btree ("groupId");


--
-- TOC entry 1847 (class 1259 OID 16419)
-- Dependencies: 165 1978
-- Name: subgroup_name_IDX; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX "subgroup_name_IDX" ON subgroup USING btree (name);


--
-- TOC entry 1875 (class 2606 OID 16501)
-- Dependencies: 1860 177 174 1978
-- Name: item_productId_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY item
    ADD CONSTRAINT "item_productId_FK" FOREIGN KEY ("productId") REFERENCES product(id);


--
-- TOC entry 1874 (class 2606 OID 16484)
-- Dependencies: 1856 169 174 1978
-- Name: product_storeId_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY product
    ADD CONSTRAINT "product_storeId_FK" FOREIGN KEY ("storeId") REFERENCES store(id);


--
-- TOC entry 1872 (class 2606 OID 16474)
-- Dependencies: 174 1845 165 1978
-- Name: product_subgroupId_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY product
    ADD CONSTRAINT "product_subgroupId_FK" FOREIGN KEY ("subgroupId") REFERENCES subgroup(id);


--
-- TOC entry 1873 (class 2606 OID 16479)
-- Dependencies: 1852 167 174 1978
-- Name: product_unitId_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY product
    ADD CONSTRAINT "product_unitId_FK" FOREIGN KEY ("unitId") REFERENCES unit(id);


--
-- TOC entry 1871 (class 2606 OID 16413)
-- Dependencies: 162 1839 165 1978
-- Name: subgroup_groupId_FK; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY subgroup
    ADD CONSTRAINT "subgroup_groupId_FK" FOREIGN KEY ("groupId") REFERENCES "group"(id);


--
-- TOC entry 1983 (class 0 OID 0)
-- Dependencies: 5
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2015-02-20 17:43:31 EST

--
-- PostgreSQL database dump complete
--

