CREATE TABLE IF NOT EXISTS `vacantes` (
  `id` int(11) NOT NULL,
  `fecha` varchar(255) NOT NULL,
  `puesto` varchar(255) NOT NULL,
  `lugar` varchar(255) NOT NULL,
  `tiempo` varchar(255) NOT NULL
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;