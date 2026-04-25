CREATE TABLE t_p25741584_mobile_web_app_mvd.officers (
  id SERIAL PRIMARY KEY,
  tab_number VARCHAR(30) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(120) NOT NULL,
  rank VARCHAR(80) NOT NULL,
  department VARCHAR(120) NOT NULL,
  uid VARCHAR(30) UNIQUE NOT NULL,
  access_level SMALLINT DEFAULT 2,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_login TIMESTAMPTZ
);

INSERT INTO t_p25741584_mobile_web_app_mvd.officers
  (tab_number, password_hash, full_name, rank, department, uid, access_level)
VALUES
  ('МСК-77-4421', md5('1234'), 'Петров Андрей Владимирович', 'Майор полиции', 'ОРО УВД по Москве', '77-OPD-00412', 2),
  ('МСК-77-0001', md5('admin'), 'Иванов Сергей Михайлович', 'Подполковник полиции', 'ГУРО МВД России', '77-OPD-00001', 3);
