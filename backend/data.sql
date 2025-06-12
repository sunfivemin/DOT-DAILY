-- DB 생성 
CREATE DATABASE dotdaily;

-- 📁 스티커 카테고리
CREATE TABLE sticker_categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(50) NOT NULL UNIQUE
);

-- 🎨 스티커 정의
CREATE TABLE stickers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  category_id INT NOT NULL,
  label VARCHAR(50) NOT NULL,
  emoji VARCHAR(10),
  `key` VARCHAR(50) NOT NULL UNIQUE,
  FOREIGN KEY (category_id) REFERENCES sticker_categories(id) ON DELETE CASCADE
);

-- 👤 사용자 정보
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  nickname VARCHAR(50)
);

-- 🔐 계정 정보
CREATE TABLE accounts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  provider ENUM('local', 'google', 'kakao', 'github') NOT NULL,
  provider_id VARCHAR(255),
  password_hash VARCHAR(255),
  refresh_token TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ✅ 투두 리스트
CREATE TABLE todos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  title VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  status ENUM('pending', 'success', 'retry', 'archive') DEFAULT 'pending',
  priority INT,
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
