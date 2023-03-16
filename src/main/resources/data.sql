insert into app_user (id, username, hashed_password)
values ('ec835780-80a4-4315-aa37-8662cfe6a1dd', 'user', '$2a$10$xdbKoM48VySZqVSU/cSlVeJn0Z04XCZ7KZBjUBC00eKo5uLswyOpe');
insert into user_roles (user_id, roles)
values ('ec835780-80a4-4315-aa37-8662cfe6a1dd', 'USER');
insert into app_user (id, username, hashed_password)
values ('7c1857e0-4bce-4733-8c36-3d5f77e1f234', 'admin',
        '$2a$10$jpLNVNeA7Ar/ZQ2DKbKCm.MuT2ESe.Qop96jipKMq7RaUgCoQedV.');
insert into user_roles (user_id, roles)
values ('7c1857e0-4bce-4733-8c36-3d5f77e1f234', 'USER');
insert into user_roles (user_id, roles)
values ('7c1857e0-4bce-4733-8c36-3d5f77e1f234', 'ADMIN');
