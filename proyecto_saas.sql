create database if not exists proyecto_saas;

use proyecto_saas;

create table rol (
	id_rol int not null auto_increment,
    nombre_rol varchar(25) not null,
    estado boolean default true,
	primary key (id_rol)
);

create table empresa (
	id_empresa int not null auto_increment,
    nombre_empresa varchar(25) not null,
    direccion varchar(25) not null,
    telefono varchar(25) not null,
    ciudad varchar(25) not null,
    departamento varchar(25) not null,
    estado boolean default true,
	primary key (id_empresa)
);

create table sede (
	id_sede int not null auto_increment,
	nombre_sede varchar(25) not null,
    id_empresa int not null,
	direccion varchar(25) not null,
	latitud double not null,
	longitud double not null,
    telefono varchar(25) not null,
    ciudad varchar(25) not null,
	estado boolean default true,
	primary key (id_sede),
    foreign key (id_empresa) references empresa (id_empresa) on delete cascade
);

create table usuario (
	id_usuario int not null auto_increment,
    nombre_usuario varchar(256) not null,
	numero_documento int not null unique,
    tipo_documento varchar(20) not null,
	password varchar(256) not null,
    id_rol int not null,
    id_empresa int,
    id_sede int,
	genero varchar(20) not null,
	nacionalidad varchar(20) not null,
	direccion varchar(256) not null,
	numero_celular varchar(256) not null,
	estado boolean default true,
	primary key (id_usuario),
    foreign key (id_rol) references rol (id_rol) on delete cascade,
    foreign key (id_empresa) references empresa (id_empresa) on delete cascade,
    foreign key (id_sede) references sede (id_sede) on delete cascade
);

create table profesor (
	id_profesor int not null auto_increment,
    nombre_profesor varchar(25) not null,
	numero_documento int not null unique,
    direccion_residencia varchar(25) not null,
    numero_celular varchar(256) not null,
	genero varchar(20) not null,
	nacionalidad varchar(20) not null,
	fecha_ingreso varchar(20) not null,
    tipo_contrato varchar(20) not null,
    especialidad varchar(20) not null,
    id_sede int not null,
	estado boolean default true,
	primary key (id_profesor),
    foreign key (id_sede) references sede (id_sede) on delete cascade
);

create table grupo (
	id_grupo int not null auto_increment,
    codigo_grupo varchar(20) not null,
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
    nombre_curso varchar(20) not null,
    codigo_curso varchar(20) not null,
    descripcion varchar(200) not null,
    creditos int default 1,
    id_sede int not null,
    estado boolean default true,
	primary key (id_curso),
    foreign key (id_sede) references sede (id_sede) on delete cascade
);

create table asignacion (
	id_asignacion int not null auto_increment,
    horario varchar(20) not null,
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
