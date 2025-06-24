-- DB 생성 
CREATE DATABASE dotdaily;

-- 🎨 스티커 정의
CREATE TABLE stickers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  label VARCHAR(50) NOT NULL,
  emoji VARCHAR(10),
  `key` VARCHAR(50) NOT NULL UNIQUE,
);

-- ✅ 투두 리스트
CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  status ENUM('pending', 'success', 'retry', 'archive') DEFAULT 'pending',
  priority ENUM('MUST_TODAY', 'GOOD_TODAY', ' DONT_FORGET') DEFAULT 'GOOD_TODAY',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ✍️ 하루 회고 메모
CREATE TABLE daily_reviews (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  date DATE NOT NULL,
  sticker_id INT NOT NULL,
  memo TEXT,
  compare_note VARCHAR(255),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uniq_user_date (user_id, date),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (sticker_id) REFERENCES stickers(id) ON DELETE SET NULL
);
