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

CREATE TABLE public.players (
	"_id" serial NOT NULL,
	"username" varchar NOT NULL UNIQUE,
  "password" varchar NOT NULL,
	"games" bigint DEFAULT 0,
	"wins" bigint DEFAULT 0,
	CONSTRAINT "players_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

-- ALTER TABLE public.people ADD CONSTRAINT "people_fk0" FOREIGN KEY ("species_id") REFERENCES  public.species("_id");
-- ALTER TABLE public.people ADD CONSTRAINT "people_fk1" FOREIGN KEY ("homeworld_id") REFERENCES  public.planets("_id");


