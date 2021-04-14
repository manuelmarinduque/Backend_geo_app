create database if not exists proyecto_saas;

use proyecto_saas;

create table rol (
	id_rol int not null auto_increment,
    nombre_rol varchar(50) not null,
    estado boolean default true,
	primary key (id_rol)
);

insert into rol (nombre_rol) values ('Administrador');
insert into rol (nombre_rol) values ('Normal');

create table empresa (
	id_empresa int not null auto_increment,
    nombre_empresa varchar(50) not null,
    direccion varchar(50) not null,
    telefono varchar(50) not null,
    ciudad varchar(50) not null,
    departamento varchar(50) not null,
    estado boolean default true,
	primary key (id_empresa)
);

create table sede (
	id_sede int not null auto_increment,
	nombre_sede varchar(50) not null,
    id_empresa int not null,
	direccion varchar(50) not null,
	latitud double not null,
	longitud double not null,
    telefono varchar(50) not null,
    ciudad varchar(50) not null,
	estado boolean default true,
	primary key (id_sede),
    foreign key (id_empresa) references empresa (id_empresa) on delete cascade
);

create table usuario (
	id_usuario int not null auto_increment,
    nombre_usuario varchar(506) not null,
	numero_documento int not null unique,
    tipo_documento varchar(50) not null,
	password varchar(506) not null,
    id_rol int default 2,
    id_empresa int,
    id_sede int,
	genero varchar(50) not null,
	nacionalidad varchar(50) not null,
	direccion varchar(50) not null,
	numero_celular varchar(50) not null,
	estado boolean default true,
	primary key (id_usuario),
    foreign key (id_rol) references rol (id_rol) on delete cascade,
    foreign key (id_empresa) references empresa (id_empresa) on delete cascade,
    foreign key (id_sede) references sede (id_sede) on delete cascade
);

create table profesor (
	id_profesor int not null auto_increment,
    nombre_profesor varchar(50) not null,
	numero_documento int not null unique,
    direccion_residencia varchar(50) not null,
    numero_celular varchar(50) not null,
	genero varchar(50) not null,
	nacionalidad varchar(50) not null,
	fecha_ingreso varchar(50) not null,
    tipo_contrato varchar(50) not null,
    especialidad varchar(50) not null,
    id_sede int not null,
	estado boolean default true,
	primary key (id_profesor),
    foreign key (id_sede) references sede (id_sede) on delete cascade
);

create table grupo (
	id_grupo int not null auto_increment,
    codigo_grupo varchar(50) not null,
    semestre int default 1,
    cupo_estudiantes int default 0,
    total_estudiantes int default 0,
    id_sede int not null,
    estado boolean default true,
	primary key (id_grupo),
    foreign key (id_sede) references sede (id_sede) on delete cascade
);

create table curso (
	id_curso int not null auto_increment,
    nombre_curso varchar(50) not null,
    codigo_curso varchar(50) not null,
    descripcion varchar(500) not null,
    creditos int default 1,
    id_sede int not null,
    estado boolean default true,
	primary key (id_curso),
    foreign key (id_sede) references sede (id_sede) on delete cascade
);

create table asignacion (
	id_asignacion int not null auto_increment,
    horario varchar(50) not null,
    id_profesor int not null,
    id_curso int not null,
    id_grupo int not null,
    id_sede int not null,
    estado boolean default true,
	primary key (id_asignacion),
    foreign key (id_profesor) references profesor (id_profesor) on delete cascade,
    foreign key (id_curso) references curso (id_curso) on delete cascade,
    foreign key (id_grupo) references grupo (id_grupo) on delete cascade,
    foreign key (id_sede) references sede (id_sede) on delete cascade
);

insert into empresa (nombre_empresa,direccion,telefono,ciudad,departamento) values
('Univalle','Barrio melendez','018000250021','Cali','Valle del cauca');



insert into sede(nombre_sede,id_empresa,direccion,latitud,longitud,telefono,ciudad) VALUES
('campus Bolivar',1,'calle 14 #7-134',4.421756311890677, -76.04747754791613,'2509193','zarzal'),
('sede victoria',1,'cra 35 #33-60',4.081414965382459, -76.18281670350552,'2241816','Tuluá'),
('sede principe',1,'cra 22 42',4.073505121965987, -76.50397329418186,'2241816','Tuluá'),
('sede villa campestre',1,'calle 43 # 43-33',4.070735646509457, -76.19046167565901,'2241816','Tuluá'),
('sede Buga',1,'calle 13 # 5-21',3.9011141492507626, -76.30065056612486,'2370000','Buga'),
('sede yumbo',1,'calle 3N # 2N-17B',3.5899459396538433, -76.49357088707909,'6699323','Yumbo'),
('Sede palmira',1,'carrera 31 Av la carbonera',3.555550922739351, -76.29862871837057,'2716949','Palmira'),
('san fernando',1,'calle 4B # 36b - 37',3.432105275509166, -76.54788843084134,'3212100','Cali'),
('Melendez',1,'calle 13 # 100-00',3.3765770544303666, -76.53326348876882,'3212100','Cali'),
('Norte del Cauca',1,'Cra 13 # 18 -445',3.0232705035885086, -76.48164436895054,'','santander de quilichao'),
('Sede pacifico',1,'Av. simon bolivar km9',3.8831974812456536, -77.00663350476478,'2403669','Buenaventura'),
('Sede Cartago',1,'Cra 19a',4.733990591608602, -75.90941703597983,'2135131','Cartago'),
('sede Caicedonia',1,'cra 14# 4-48',4.329747111428853, -75.82736516754866,'2160070','Caicedonia');
