CREATE TABLE "Addresses" (
	id SERIAL PRIMARY KEY,
	city VARCHAR(50) NOT NULL,
	street VARCHAR(50) NOT NULL,
	buildingNumber INTEGER NOT NULL
);

CREATE TABLE "Locations" (
	id SERIAL PRIMARY KEY,
	addressid INTEGER REFERENCES "Addresses"(Id) NOT NULL,
	exist BOOLEAN NOT NULL
);

CREATE TABLE "TypesOfDepartments" (
	id SERIAL PRIMARY KEY,
	name VARCHAR(50) NOT NULL
);

INSERT INTO "TypesOfDepartments" (Name)
VALUES
('Manufactory'),
('Office'),
('Shop'),
('Warehouse');

CREATE TABLE "Departments" (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	typeid INTEGER REFERENCES "TypesOfDepartments"(Id) NOT NULL,
	exist BOOLEAN NOT NULL 
);

CREATE TABLE "WorkAreas" (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	departmentid INTEGER REFERENCES "Departments"(Id) NOT NULL,
	exist BOOLEAN NOT NULL 
);

CREATE TABLE "WorkPlaces" (
	id SERIAL PRIMARY KEY,
	name VARCHAR(100) NOT NULL,
	workareaid INTEGER REFERENCES "Departments"(Id) NOT NULL,
	locationid INTEGER REFERENCES "Locations"(Id) NOT NULL,
	floor INTEGER NOT NULL,
	comment TEXT,
	exist BOOLEAN NOT NULL 
);