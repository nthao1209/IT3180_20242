// prisma/seed.ts
import { PrismaClient, Prisma } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

const bookCategoriesData: Prisma.book_categoriesCreateInput[] = [
  { category_name: 'Fiction' },
  { category_name: 'Science Fiction' },
  { category_name: 'Fantasy' },
  { category_name: 'Mystery' },
  { category_name: 'Non-Fiction' },
  { category_name: 'History' },
  { category_name: 'Biography' },
];


const booksData = [
  {
    isbn: '9780743273565',
    name: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    description: 'A novel about the American dream.',
    published_date: 1925,
    price: 12.99,
    state: true,
    file_path: '/ebooks/the-great-gatsby.epub', // Đường dẫn đến file EPUB
    totalPages: 180,                         // Số trang giả định
    photos: [{ url: '/default-book-cover.png' }], // Sử dụng ảnh cục bộ
    categories: ['Fiction', 'Mystery'],
  },
  {
    isbn: '9780061120084',
    name: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    description: 'A novel about justice and prejudice in the American South.',
    published_date: 1960,
    price: 10.50,
    state: true,
    file_path: '/ebooks/to-kill-a-mockingbird.epub',
    totalPages: 324,
    photos: [{ url: '/default-book-cover.png' }],
    categories: ['Fiction'],
  },
  {
    isbn: '9780307474278',
    name: '1984',
    author: 'George Orwell',
    description: 'A dystopian novel set in Airstrip One, a province of the superstate Oceania.',
    published_date: 1949,
    price: 9.99,
    state: false,
    file_path: '/ebooks/1984.epub',
    totalPages: 328,
    photos: [{ url: '/default-book-cover.png' }],
    categories: ['Science Fiction', 'Fiction'],
  },
  {
    isbn: '9780547928227',
    name: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    description: 'A fantasy novel about the adventures of hobbit Bilbo Baggins.',
    published_date: 1937,
    price: 14.00,
    state: true,
    file_path: '/ebooks/the-hobbit.epub',
    totalPages: 310,
    photos: [{ url: '/default-book-cover.png' }],
    categories: ['Fantasy', 'Fiction'],
  },
  {
     isbn: '9780141187761',
     name: 'Sapiens: A Brief History of Humankind',
     author: 'Yuval Noah Harari',
     description: 'A book that explores the history of Homo sapiens.',
     published_date: 2011,
     price: 18.75,
     state: true,
     file_path: '/ebooks/sapiens.epub',
     totalPages: 464,
     photos: [{ url: '/default-book-cover.png' }],
     categories: ['Non-Fiction', 'History'],
   },
];

async function main() {
  console.log(`Start seeding ...`);

  console.log('Deleting old data (ensure correct order)...');
  await prisma.reading_sessions.deleteMany({}); 
  await prisma.book_category_links.deleteMany({});
  await prisma.book_photos.deleteMany({});
  await prisma.ratings.deleteMany({});
  await prisma.comments.deleteMany({});
  await prisma.liked_books.deleteMany({});
  await prisma.payments.deleteMany({});
  await prisma.user_books.deleteMany({});
  
  await prisma.books.deleteMany({});
  await prisma.users.deleteMany({}); 
  await prisma.book_categories.deleteMany({});
  console.log('Old data deleted.');


  console.log(`Creating book categories...`);
  const createdCategories = [];
  for (const catData of bookCategoriesData) {
    const category = await prisma.book_categories.create({ data: catData });
    createdCategories.push(category);
    console.log(`Created category: ${category.category_name}`);
  }

 
  console.log(`Creating books...`);
  for (const bookData of booksData) {
    const { photos, categories, ...restOfBookData } = bookData;
    const createdBook = await prisma.books.create({
      data: {
        ...restOfBookData,
       
      },
    });
    console.log(`Created book: ${createdBook.name}`);

    if (photos && photos.length > 0) {
      for (const photo of photos) {
        await prisma.book_photos.create({
          data: { book_id: createdBook.book_id, url: photo.url },
        });
      }
    }
    if (categories && categories.length > 0) {
      for (const catName of categories) {
        const category = createdCategories.find(c => c.category_name === catName);
        if (category) {
          await prisma.book_category_links.create({
            data: { book_id: createdBook.book_id, category_id: category.category_id },
          });
        }
      }
    }
  }


  console.log('Creating sample users...');
  const user1 = await prisma.users.upsert({
    where: { email: 'reader@example.com' },
    update: {},
    create: {
      email: 'reader@example.com',
      username: 'readeruser',
      name: 'Book Reader',
      role: 'USER', 
      password: await bcrypt.hash('password123', 10),
    },
  });
  console.log(`Created/Ensured user: ${user1.email}`);


  const gatsbyBook = await prisma.books.findFirst({ where: { name: 'The Great Gatsby' } });
  if (gatsbyBook && user1) {
    await prisma.reading_sessions.upsert({
        where: { user_id_book_id: { user_id: user1.user_id, book_id: gatsbyBook.book_id } },
        update: {  last_location: null },
        create: {
            user_id: user1.user_id,
            book_id: gatsbyBook.book_id,
            last_location: null, 
        }
    });
    console.log(`Created reading session for ${user1.email} and ${gatsbyBook.name}`);
  }


  console.log(`Seeding finished.`);

  console.log('Creating sample user...');
  const userEmail = 'test@example.com'; 
  const userPassword = 'password123';   

  try {
    const existingUser = await prisma.users.findUnique({
      where: { email: userEmail },
    });

    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(userPassword, 10);
      await prisma.users.create({
        data: {
          email: userEmail,
          username: 'testuser', 
          name: 'Test User',
          role: 'USER', 
          password: hashedPassword,
          
        },
      });
      console.log(`Created user: ${userEmail} with password: ${userPassword}`);
    } else {
      console.log(`User ${userEmail} already exists.`);
    }
  } catch (error) {
    console.error(`Error creating/updating user ${userEmail}:`, error);
  }
  

  console.log(`Seeding finished.`);
}



main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });