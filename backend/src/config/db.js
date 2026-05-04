const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const connectDB = async () => {
  const binaryDir = path.join(process.cwd(), 'mongodb_binaries');
  if (!fs.existsSync(binaryDir)) fs.mkdirSync(binaryDir);

  try {
    const connUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    
    if (!connUri) {
      throw new Error('No MongoDB URI provided.');
    }

    const conn = await mongoose.connect(connUri, { serverSelectionTimeoutMS: 10000 });
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`⚠️ Primary Connection Failed: ${error.message}`);
    console.log('🔄 Attempting local fallback...');
    
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create({
        instance: { dbName: 'whatsapp-clone' },
        binary: {
          downloadDir: binaryDir,
          version: '6.0.5',
          checkMD5: false
        }
      });
      
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      console.log(`🚀 GUARANTEED DATABASE STARTED! You can now chat locally.`);
      console.log(`📝 Note: Data will stay active as long as the server is running.`);
    } catch (memError) {
      console.error(`❌ Critical Fallback Error: ${memError.message}`);
      console.log('💡 Final attempt: Please ensure your internet is on so it can download the 70MB local database binary once.');
      process.exit(1);
    }
  }
};

module.exports = connectDB;
