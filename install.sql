SET foreign_key_checks = 0;

DROP TABLE IF EXISTS `users`; 
CREATE TABLE `users` (
  id int auto_increment PRIMARY KEY, 
  instagram_id int, 
  timestamp int
) ENGINE=InnoDB DEFAULT CHARSET=utf8 DEFAULT COLLATE utf8_unicode_ci;

DROP TABLE IF EXISTS `user_tokens`; 
CREATE TABLE `user_tokens` (
  id int auto_increment PRIMARY KEY, 
  user_id int, 
  access_token varchar(255), 
  timestamp int, 
  expires int,
  FOREIGN KEY (user_id) REFERENCES users(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 DEFAULT COLLATE utf8_unicode_ci;

SET foreign_key_checks = 1;