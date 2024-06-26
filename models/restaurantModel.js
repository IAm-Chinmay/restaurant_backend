// restaurantModel.js
const mongoose = require('mongoose');


const menuSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  isSpecial: Boolean
});

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: Date,
  tableNumber: Number
});

const tableSchema = new mongoose.Schema({
  // tableId: { type: String, unique: true },
  // number: Number,
  isReserved: { type: Boolean, default: false }
});

const floorSchema = new mongoose.Schema({
  floorNumber: Number,
  numberOfSeats: Number,
  tables: [tableSchema]
});

// const restaurantSchema = new mongoose.Schema({
//   name: String,
//   address: String, // Adding address field
//   tables: Number,
//   menu: [menuSchema],
//   reservations: [reservationSchema]
// });

//newly added rating
const restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  email: String,
  password: String,
  phoneNumber: String,

  role: { type: String, enum: ['restaurant_owner', 'admin'], default: 'restaurant_owner' },
  floors: [floorSchema], // Reference to floors collection
  menu: [menuSchema],
  image: String,

  ratings: [{ user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, rating: Number }], // Update ratings schema
  averageRating: Number,

  reservations: [reservationSchema]
},{timestamps:true});



const Restaurant = mongoose.model('Restaurant', restaurantSchema);
const  Floor = mongoose.model('Floor', floorSchema);
const Table =  mongoose.model('Table', tableSchema)
module.exports = { Restaurant, Floor , Table };
// module.exports = Restaurant;