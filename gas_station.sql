create database if not exists gas_station;

use gas_station;

create table gas_station (
	id int(11) not null auto_increment,
    name varchar(256) not null,
    address varchar(256) not null,
	phone varchar(256) not null,
	latitude double not null,
	longitude double not null,
    is_active bool default true,
    primary key(id)
);

insert into gas_station (name, address, phone, latitude, longitude) values
('Bomba Terpel', 'Via a Rio Frio, Tuluá, Valle del Cauca', '318316628', 4.087822, -76.215742),
('EDS San Fernando', 'Riofrío-Trujllo #3 Oeste-2 a 3 Oeste-250,, Tuluá, Valle del Cauca', '3152106540', 4.087649, -76.215521),
('Estacion de Gasolina', 'Dg. 23, Tuluá, Valle del Cauca', '3217574120', 4.097343, -76.208127),
('Bomba de Gasolina', 'Tv. 12, Tuluá, Valle del Cauca', '3012301415', 4.094995, -76.203071),
('Estacion de servicio el Prado', 'Cra. 20 #2541, Tuluá, Valle del Cauca', '2242612', 4.086822, -76.201457),
('Esso', 'Cra. 20 #27a-28, Tuluá, Valle del Cauca', '2249998', 4.084477, -76.201979),
('Terpel San Cristobal', 'Cl. 28, Tuluá, Valle del Cauca', '2305814', 4.081648, -76.195684),
('Gas station Professionals', 'Cl. 34 #3177, Tuluá, Valle del Cauca', '2263540', 4.077729, -76.196227),
('Esso El Pedregal', 'a 42-72, Cra 27A #42-2, Tuluá, Valle del Cauca', '3115478971', 4.068819, -76.197046),
('Natural Gas Station', 'Cl. 42d, Tuluá, Valle del Cauca', '3102547310', 4.070043, -76.192967),
('Estacion de servicio Texaco', 'Cl. 32, Cra. 40 #Esquina, Tuluá, Valle del Cauca', '2301415', 4.076881, -76.18898),
('Terpel Tulua', 'Cl. 28, Tulua, Valle del Cauca', '3147896541', 4.084171, -76.186332),
('Gasolinera verde', 'Cra. 30 #16a-16, Tuluá, Valle del Cauca', '3217456320', 4.089571, -76.191843),
('Estacion De Servicio Biomax San Antonio', 'Cra. 30 #56 # 18, Bogotá', '2333344', 4.089731, -76.192014),
('Gasolinera ESSO', 'a 29-104,, Cl. 18 #292, Tuluá, Valle del Cauca', '3226641837', 4.089853, -76.191598),
('Gasolineria Terpel', 'a 30-106 Cl. 17 #302, Tuluá, Valle del Cauca', '3124501210', 4.09032, -76.190728),
('Estacion De Servicio Terpel Entre Rios', 'Cra. 30 #163, Tuluá, Valle del Cauca', '3157412030', 4.090856, -76.190004),
('Esso', 'Cr 40 Cl 13 Esquina, Tulua, Valle del Cauca', '2243078', 4.092181, -76.178804),
('Gasolineria Mobil', 'a 40-80,, Cl. 13 #40-2, Tuluá, Valle del Cauca', '3105400010', 4.092037, -76.178721);

select * from gas_station;

create table user (
	id int(11) not null auto_increment,
	doc_number int(20) not null,
    password varchar(256) not null,
    doc_type varchar(20) not null,
    full_name varchar(256) not null,
    genre varchar(20) not null,
    nacionality varchar(20) not null,
    address varchar(256) not null,
	phone varchar(256) not null,
    is_active bool default true,
    primary key(id)
);

select * from usuario;
