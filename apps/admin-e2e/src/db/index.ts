import * as path from 'path';
import { Database } from 'sqlite3';

export const teardown = () => {
  const db = new Database(path.join(__dirname, '../../../../tmp/test.sqlite3'));

  db.each(
    "select 'delete from ' || name as query from sqlite_master where type = 'table'",
    (err, row) => db.run(row.query)
  );

  return true;
};

export const seed = () => {
  const db = new Database(path.join(__dirname, '../../../../tmp/test.sqlite3'));

  db.run(
    "INSERT INTO `users` (`id`, `username`, `password`, `roles`) VALUES ('f60d593d-9ea9-4add-8f6c-5d86dd8c9f87', 'admin', '$2a$04$J.qvJcqZRPBlGFKWIxPOYOsPRXpkZmTyTHScEF3Kq5/QXV.8oMcfy', 'ROLE_ADMIN')"
  );
  db.run(
    "INSERT INTO `users` (`id`, `username`, `password`, `roles`) VALUES ('f60d593d-9ea9-4add-8f6c-5d86dd8c9f88', 'user', '$2a$04$J.qvJcqZRPBlGFKWIxPOYOsPRXpkZmTyTHScEF3Kq5/QXV.8oMcfy', 'ROLE_USER')"
  );

  return true;
};
