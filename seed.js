const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const Book = require('./models/bookModel');
const Member = require('./models/memberModel');
const Loan = require('./models/loanModel');

dotenv.config();

const seedData = async () => {
  try {
    // Connect to MongoDB
    await connectDB();
    console.log('🌱 Connected to MongoDB for seeding...');

    // Clear existing data
    await Book.deleteMany();
    await Member.deleteMany();
    await Loan.deleteMany();

    console.log('🗑️  Existing data cleared.');

    // Sample Books
    const books = await Book.insertMany([
      { isbn: '9780000000001', title: 'Node.js for Beginners', author: 'Jane Doe', copies: 5 },
      { isbn: '9780000000002', title: 'MongoDB Essentials', author: 'John Smith', copies: 3 },
      { isbn: '9780000000003', title: 'Express.js in Action', author: 'Anna Cruz', copies: 4 },
    ]);

    // Sample Members
    const members = await Member.insertMany([
      { name: 'Jane_Corro', email: 'janeC@example.com', joinedAt: new Date('2023-01-15') },
      { name: 'Jane Corro', email: 'janexample.com', joinedAt: new Date('2023-05-10') },
    ]);

    // Sample Loans (connects book + member IDs)
    const loans = await Loan.insertMany([
      {
        memberId: members[0]._id,
        bookId: books[0]._id,
        loanedAt: new Date('2025-10-01'),
        dueAt: new Date('2025-10-20'),
        returnedAt: null,
      },
      {
        memberId: members[1]._id,
        bookId: books[1]._id,
        loanedAt: new Date('2025-10-10'),
        dueAt: new Date('2025-10-25'),
        returnedAt: null,
      },
    ]);

    console.log('📚 Sample data successfully added!');
    console.log('✅ Books:', books.length, '✅ Members:', members.length, '✅ Loans:', loans.length);

    // Close connection
    mongoose.connection.close();
    console.log('🔌 Database connection closed.');
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
