-- CreateTable
CREATE TABLE users (
    user_id INTEGER NOT NULL AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password TEXT NOT NULL,
    name VARCHAR(100),
    role VARCHAR(30) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT users_pkey PRIMARY KEY (user_id)
);

-- CreateTable
CREATE TABLE books (
    book_id INTEGER NOT NULL AUTO_INCREMENT,
    isbn VARCHAR(13) NOT NULL,
    name VARCHAR(200) NOT NULL,
    author_id INTEGER NOT NULL,
    description TEXT,
    cover_image VARCHAR(255),
    file_path VARCHAR(500),
    price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    published_date DATE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT books_pkey PRIMARY KEY (book_id)
);

-- CreateTable
CREATE TABLE book_requests (
    request_id INTEGER NOT NULL AUTO_INCREMENT,
    book_id INTEGER,
    author_id INTEGER NOT NULL,
    action VARCHAR(20) NOT NULL,
    details TEXT,
    status VARCHAR(20) NOT NULL DEFAULT 'pending',
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT book_requests_pkey PRIMARY KEY (request_id),
    CONSTRAINT book_requests_author_id_fkey FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT book_requests_book_id_fkey FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE book_categories (
    category_id INTEGER NOT NULL AUTO_INCREMENT,
    category_name VARCHAR(255) NOT NULL,

    CONSTRAINT book_categories_pkey PRIMARY KEY (category_id)
);

-- CreateTable
CREATE TABLE book_category_links (
    book_id INTEGER NOT NULL,
    category_id INTEGER NOT NULL,

    CONSTRAINT book_category_links_pkey PRIMARY KEY (book_id, category_id)
);

-- CreateTable
CREATE TABLE ratings (
    rating_id INTEGER NOT NULL AUTO_INCREMENT,
    book_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    rating INTEGER NOT NULL,
    review TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT ratings_pkey PRIMARY KEY (rating_id)
);

-- CreateTable
CREATE TABLE comments (
    comments_id INTEGER NOT NULL AUTO_INCREMENT,
    book_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT comments_pkey PRIMARY KEY (comments_id)
);

-- CreateTable
CREATE TABLE payments (
    pay_id INTEGER NOT NULL AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) NOT NULL,
    paid_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT payments_pkey PRIMARY KEY (pay_id)
);

-- CreateTable
CREATE TABLE user_books (
    id INTEGER NOT NULL AUTO_INCREMENT,
    user_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    purchased_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT user_books_pkey PRIMARY KEY (id)
);

-- CreateIndex
-- CREATE UNIQUE INDEX users_username_key ON users(username);

-- -- CreateIndex
-- CREATE UNIQUE INDEX users_email_key ON users(email);

-- -- CreateIndex
-- CREATE INDEX category_id ON book_category_links(category_id);

-- -- CreateIndex
-- CREATE INDEX book_id ON ratings(book_id);

-- -- CreateIndex
-- CREATE INDEX user_id ON ratings(user_id);

-- -- CreateIndex
-- CREATE UNIQUE INDEX user_books_user_id_book_id_key ON user_books(user_id, book_id);

-- AddForeignKey
ALTER TABLE books ADD CONSTRAINT books_author_id_fkey FOREIGN KEY (author_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE book_category_links ADD CONSTRAINT book_category_links_book_id_fkey FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE book_category_links ADD CONSTRAINT book_category_links_category_id_fkey FOREIGN KEY (category_id) REFERENCES book_categories(category_id) ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE ratings ADD CONSTRAINT ratings_book_id_fkey FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE ratings ADD CONSTRAINT ratings_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE comments ADD CONSTRAINT comments_book_id_fkey FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE comments ADD CONSTRAINT comments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE payments ADD CONSTRAINT payments_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE payments ADD CONSTRAINT payments_book_id_fkey FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE user_books ADD CONSTRAINT user_books_user_id_fkey FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE user_books ADD CONSTRAINT user_books_book_id_fkey FOREIGN KEY (book_id) REFERENCES books(book_id) ON DELETE CASCADE ON UPDATE CASCADE;