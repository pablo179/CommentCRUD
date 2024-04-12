create table Comments (
    id int not null PRIMARY KEY AUTO_INCREMENT,
    email varchar(255) NOT NULL,
    comment varchar(255) NULL
);

insert into Comments (id, email, comment) values (1, 'Darth.Vader@empire.gov', "If you only knew the power of the Dark Side.\n Obi-Wan never told you what happened to your father.");
insert into Comments (id, email, comment) values (2, 'Skywalker.Luke@rebels.net
', "He told me enough!\n He told me you killed him!");
insert into Comments (id, email, comment) values (3, "Lord.Vader@imperialcommand.com", "No. I am your father.");
insert into Comments (id, email, comment) values (4, "JediKnightLuke@forceusers.com", "No... That's not true. That's impossible!");
insert into Comments (id, email, comment) values (5, "DVader@sithlord.net", "Search your feelings, you know it to be true!");
insert into Comments (id, email, comment) values (6, "Luke.Skywalker@resistance.org", "Noooooo!");