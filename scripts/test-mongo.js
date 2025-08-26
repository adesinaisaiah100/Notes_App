const fs = require('fs');
const mongoose = require('mongoose');

function loadMongoUri() {
  try {
    const env = fs.readFileSync('.env.local', 'utf8');
    const m = env.match(/^MONGODB_URI=(.+)$/m);
    if (!m) return null;
    return m[1].trim().replace(/^"(.*)"$/, '$1');
  } catch (e) {
    return null;
  }
}

const uri = loadMongoUri();
if (!uri) {
  console.error('MONGODB_URI not found in .env.local');
  process.exit(1);
}

async function run() {
  try {
  // mask the password portion for logging by replacing :<password>@ with :***@
  const masked = uri.replace(/:[^@]+@/, ':***@');
    console.log('Connecting to MongoDB (masked):', masked);
    await mongoose.connect(uri, { maxPoolSize: 5, serverSelectionTimeoutMS: 5000 });
    const dbName = mongoose.connection.db.databaseName;
    console.log('Connected to database:', dbName);

    const cols = await mongoose.connection.db.listCollections().toArray();
    console.log('Collections:', cols.map(c => c.name));

    const notes = await mongoose.connection.db.collection('notes').find({}).limit(5).toArray();
    console.log('Sample notes found:', notes.length);
    if (notes.length) console.log(JSON.stringify(notes, null, 2));

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Mongo test error:');
    console.error(err && err.message ? err.message : err);
    process.exit(2);
  }
}

run();
