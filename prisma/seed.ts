// prisma/seed.ts
import { PrismaClient, Prisma, Gender } from '@prisma/client'; // Thêm Gender từ @prisma/client
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Dữ liệu mẫu cho book_categories (giữ nguyên hoặc tùy chỉnh)
const bookCategoriesData: Prisma.book_categoriesCreateInput[] = [
  { category_name: 'Fiction' },
  { category_name: 'Science Fiction' },
  { category_name: 'Fantasy' },
  { category_name: 'Mystery' },
  { category_name: 'Non-Fiction' },
  { category_name: 'History' },
  { category_name: 'Biography' },
  { category_name: 'Technology' },
  { category_name: 'Romance' },
];

async function main() {
  console.log(`Start seeding ...`);

  // 1. Xóa dữ liệu cũ (THEO ĐÚNG THỨ TỰ ĐỂ TRÁNH LỖI KHÓA NGOẠI)
  console.log('Deleting old data (ensure correct order)...');
  // Các bảng phụ thuộc vào 'users' hoặc 'books' hoặc 'book_categories' cần được xóa trước
  await prisma.reading_sessions.deleteMany({});
  await prisma.book_category_links.deleteMany({});
  await prisma.book_photos.deleteMany({});
  await prisma.ratings.deleteMany({});
  await prisma.replies.deleteMany({}); // Xóa replies trước comments
  await prisma.comments.deleteMany({});
  await prisma.liked_books.deleteMany({});
  await prisma.payments.deleteMany({});
  await prisma.user_books.deleteMany({});
  await prisma.book_requests.deleteMany({}); // Xóa book_requests trước books và users

  // Sau đó mới xóa các bảng chính mà các bảng khác phụ thuộc vào
  await prisma.books.deleteMany({});
  await prisma.users.deleteMany({});
  await prisma.book_categories.deleteMany({});
  console.log('Old data deleted.');

  // 2. Tạo User mẫu (bao gồm các trường mới)
  console.log('Creating sample users...');
  const hashedPassword = await bcrypt.hash('password123', 10);

  const user1 = await prisma.users.upsert({
    where: { email: 'author1@example.com' },
    update: {}, // Không cập nhật gì nếu đã tồn tại, chỉ đảm bảo nó có
    create: {
      email: 'author1@example.com',
      username: 'authorone',
      name: 'Author One',
      password: hashedPassword,
      role: 'AUTHOR', // Hoặc 'USER' tùy theo logic của bạn
      date_of_birth: new Date('1980-01-15T00:00:00.000Z'), // ISO string cho ngày
      gender: Gender.Nam, // Sử dụng enum Gender
    },
  });
  console.log(`Created/Ensured user: ${user1.name} (ID: ${user1.user_id})`);

  const user2 = await prisma.users.upsert({
    where: { email: 'reader1@example.com' },
    update: {},
    create: {
      email: 'reader1@example.com',
      username: 'readerone',
      name: 'Reader One',
      password: hashedPassword, // Có thể dùng chung mật khẩu cho user mẫu
      role: 'USER',
      date_of_birth: new Date('1995-05-20T00:00:00.000Z'),
      gender: Gender.N_,
    },
  });
  console.log(`Created/Ensured user: ${user2.name} (ID: ${user2.user_id})`);

  // 3. Tạo book_categories (giữ nguyên logic hoặc tùy chỉnh)
  console.log(`Creating book categories...`);
  const createdCategoriesMap = new Map<string, number>();
  for (const catData of bookCategoriesData) {
    const category = await prisma.book_categories.create({ data: catData });
    createdCategoriesMap.set(category.category_name, category.category_id);
    console.log(`Created category: ${category.category_name} (ID: ${category.category_id})`);
  }

  // 4. Dữ liệu sách mẫu (cập nhật để dùng author_id)
  // Giả sử bạn sẽ đặt file EPUB trong public/ebooks/
  const booksDataSeed = [
    {
      isbn: '9780743273565',
      name: 'The Great Gatsby',
      author_id: user1.user_id, // SỬ DỤNG user_id của user1 làm tác giả
      description: 'A novel about the American dream and its disillusionment in the Jazz Age.',
      published_date: 1925,
      price: 12.99,
      state: true,
      file_path: '/ebooks/the-great-gatsby.epub',
      totalPages: 180,
      cover_image: '/covers/gatsby.jpg', // Ví dụ đường dẫn ảnh bìa chính
      photos_urls: [], // Ảnh phụ
      category_names: ['Fiction', 'Mystery'], // Tên category để link
    },
    {
      isbn: '9780061120084',
      name: 'To Kill a Mockingbird',
      author_id: user1.user_id, // user1 cũng là tác giả sách này
      description: 'A novel about justice and prejudice in the American South, through the eyes of a child.',
      published_date: 1960,
      price: 10.50,
      state: true,
      file_path: '/ebooks/to-kill-a-mockingbird.epub',
      totalPages: 324,
      cover_image: '/covers/mockingbird.jpg',
      photos_urls: [],
      category_names: ['Fiction', 'History'],
    },
    {
      isbn: '9780307474278',
      name: '1984',
      author_id: user1.user_id, // user1 là tác giả
      description: 'A dystopian novel set in Airstrip One, a province of the superstate Oceania, under totalitarian rule.',
      published_date: 1949,
      price: 9.99,
      state: false,
      file_path: '/ebooks/1984.epub',
      totalPages: 328,
      cover_image: '/covers/1984.jpg',
      photos_urls: [],
      category_names: ['Science Fiction', 'Fiction'],
    },
  ];

  // 5. Tạo books và các liên kết
  console.log(`Creating books...`);
  for (const bookSeed of booksDataSeed) {
    const { photos_urls, category_names, ...bookData } = bookSeed;

    const createdBook = await prisma.books.create({
      data: bookData, // Dữ liệu sách đã bao gồm author_id
    });
    console.log(`Created book: ${createdBook.name} (ID: ${createdBook.book_id}) by author ID: ${createdBook.author_id}`);

    // Tạo book_photos
    if (photos_urls && photos_urls.length > 0) {
      for (const photoUrl of photos_urls) {
        await prisma.book_photos.create({
          data: { book_id: createdBook.book_id, url: photoUrl },
        });
      }
      console.log(`Added ${photos_urls.length} photos for book: ${createdBook.name}`);
    }

    // Tạo book_category_links
    if (category_names && category_names.length > 0) {
      for (const catName of category_names) {
        const categoryId = createdCategoriesMap.get(catName);
        if (categoryId) {
          await prisma.book_category_links.create({
            data: { book_id: createdBook.book_id, category_id: categoryId },
          });
        } else {
          console.warn(`Category "${catName}" not found for book "${createdBook.name}"`);
        }
      }
      console.log(`Linked book "${createdBook.name}" to categories: ${category_names.join(', ')}`);
    }
  }

  // 6. (Tùy chọn) Tạo reading_session mẫu
  const gatsbyBook = await prisma.books.findFirst({ where: { name: 'The Great Gatsby' } });
  if (gatsbyBook && user2) { // user2 (Reader One) đọc sách
    await prisma.reading_sessions.upsert({
        where: { user_id_book_id: { user_id: user2.user_id, book_id: gatsbyBook.book_id } },
        update: { last_location: null }, // Hoặc một CFI mẫu nếu bạn có
        create: {
            user_id: user2.user_id,
            book_id: gatsbyBook.book_id,
            last_location: null,
        }
    });
    console.log(`Created/Updated reading session for ${user2.email} and ${gatsbyBook.name}`);
  }

  console.log(`Seeding finished.`);
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });