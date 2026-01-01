const mongoose = require('mongoose');
const Car = require('./models/car');
require('dotenv').config();

const sampleCars = [
  { id: 1, name: "Chevy Corvette Convertible", make: "Chevy", category: "Sport", price: 150000, stock: 5, year: 1963, image: "/images/Chevy-Corvette-Convertible-1963.jpg" },
  { id: 2, name: "Ford Roush Mustang", make: "Ford", category: "Muscle", price: 30000, stock: 4, year: 2012, image: "/images/Ford-Roush-Mustang.jpg" },
  { id: 3, name: "Dodge Chalenger RT", make: "Dodge", category: "Muscle", price: 82500, stock: 3, year: 1971, image: "/images/Dodge-Chalenger-RT-1971.jpg" },
  { id: 4, name: "Plymouth Hemi Cuda", make: "Plymouth", category: "Muscle", price: 400000, stock: 3, year: 1971, image: "/images/Plymouth-Hemi-Cuda-1971.jpg" },
  { id: 5, name: "De Tomaso P72", make: "De Tomaso", category: "Supercar", price: 1600000, stock: 6, year: 2020, image: "/images/De-Tomaso-P72-2020.jpg" },
  { id: 6, name: "Acura NSX", make: "Acura", category: "Exotic", price: 235000, stock: 7, year: 2022, image: "/images/Acura-NSX-2022.jpg" },
  { id: 7, name: "Koenigsegg Regera", make: "Koenigsegg", category: "Hypercar", price: 3000000, stock: 4, year: 2019, image: "/images/Koenigsegg-Regera-2019.jpg" },
  { id: 8, name: "Rimac C Two", make: "Rimac", category: "Hypercar", price: 2000000, stock: 3, year: 2020, image: "/images/Rimac-C-Two-2020.jpg" },
  { id: 9, name: "Maserati Gran Turismo Mc", make: "Maserati", category: "Exotic", price: 40000, stock: 3, year: 2015, image: "/images/Maserati-Gran-Turismo-Mc-2015.jpg" },
  { id: 10, name: "Mercedes Benz AMG GT Bussink Speed Legend", make: "Mercedes-Benz", category: "Hypercar", price: 2000000, stock: 2, year: 2022, image: "/images/Mercedes-Benz-AMG-GT-Bussink-Speed-Legend-2022.jpg" },
  { id: 11, name: "Lamborghini Countach LPI 800-4", make: "Lamborghini", category: "Hypercar", price: 2500000, stock: 2, year: 2022, image: "/images/Lamborghini-Countach-LPI-800-4-2022.jpg" },
  { id: 12, name: "Ferrari 812 Superfast Mansory", make: "Ferrari", category: "Hypercar", price: 700000, stock: 1, year: 2022, image: "/images/Ferrari-812-Superfast-Mansory-2022.jpg" },
  { id: 13, name: "Mosler MT900S", make: "Mosler", category: "Supercar", price: 250000, stock: 3, year: 2002, image: "/images/Mosler-MT900S-2002.jpg" },
  { id: 14, name: "Porsche Marc Philipp Gemballa Marsien", make: "Porsche", category: "Supercar", price: 800000, stock: 4, year: 2022, image: "/images/Porshe-Marc-Philipp-Gemballa-Marsien-2022.jpg" },
  { id: 15, name: "Pininfarina Battista", make: "Pininfarina", category: "Hypercar", price: 2200000, stock: 2, year: 2022, image: "/images/Pinifarina-Battista-2022.jpg" },
  { id: 16, name: "Jaguar F Type Convertible", make: "Jaguar", category: "Sport", price: 70000, stock: 5, year: 2022, image: "/images/Jaguar-F-Type-Convertible-2022.jpg" },
  { id: 17, name: "Zagato Iso Rivolta GTZ", make: "Zagato", category: "Supercar", price: 1350000, stock: 2, year: 2021, image: "/images/Zagato-Iso-Rivolta-GTZ-2021.jpg" },
  { id: 18, name: "Chevy Corvette", make: "Chevy", category: "Muscle", price: 150000, stock: 6, year: 2021, image: "/images/Chevy-Corvette-1958.jpg" },
  { id: 19, name: "Plymouth Barracuda", make: "Plymouth", category: "Muscle", price: 45000, stock: 6, year: 1968, image: "/images/Plymouth-Barracuda-1968.jpg" },
  { id: 20, name: "Ford Mustang Cobra", make: "Ford", category: "Muscle", price: 60000, stock: 5, year: 1969, image: "/images/Ford-Mustang-Cobra-1969.jpg" },
  { id: 21, name: "Dodge Polara", make: "Dodge", category: "Muscle", price: 27000, stock: 4, year: 1964, image: "/images/Dodge-Polara-1964.jpg" },
  { id: 22, name: "Mercury Cougar", make: "Mercury", category: "Muscle", price: 68000, stock: 4, year: 1970, image: "/images/Mercury-Cougar-1970.jpg" },
  { id: 23, name: "Plymouth GTX", make: "Plymouth", category: "Muscle", price: 70000, stock: 6, year: 1971, image: "/images/Plymouth-GTX-1971.jpg" },
  { id: 24, name: "Pontiac GTO", make: "Pontiac", category: "Muscle", price: 70000, stock: 5, year: 1969, image: "/images/Pontiac-GTO-1969.jpg" },
  { id: 25, name: "Dodge Coronet", make: "Dodge", category: "Muscle", price: 45000, stock: 5, year: 1970, image: "/images/Dodge-Coronet-1970.jpg" },
  { id: 26, name: "Oldsmobile 88", make: "Oldsmobile", category: "Muscle", price: 28000, stock: 1, year: 1950, image: "/images/Oldsmobile-88-1950.jpg" },
  { id: 27, name: "Wally Stroupe Camaro SS", make: "Chevy", category: "Muscle", price: 55000, stock: 1, year: 1969, image: "/images/Wally-Stroupe-Camaro-ss-1969.jpg" },
  { id: 28, name: "Mercedes-Benz S-Class", make: "Mercedes-Benz", category: "Luxury", price: 120000, stock: 4, year: 2024, image: "/images/Mercedes-Benz-S-Class-2024.jpg" },
  { id: 29, name: "BMW 7 Series", make: "BMW", category: "Luxury", price: 115000, stock: 5, year: 2025, image: "/images/BMW-7-Series-2025.jpg" },
  { id: 30, name: "Porsche Panamera Turbo S", make: "Porsche", category: "Luxury", price: 160000, stock: 3, year: 2023, image: "/images/Porsche-Panamera-Turbo-S-2023.jpg" },
  { id: 31, name: "Mercedes-Maybach GLS 600", make: "Mercedes-Maybach", category: "Luxury SUV", price: 170000, stock: 2, year: 2024, image: "/images/Mercedes-Maybach-GLS-600-2024.jpg" },
  { id: 32, name: "Rolls-Royce Ghost", make: "Rolls-Royce", category: "Luxury", price: 320000, stock: 1, year: 2025, image: "/images/Rolls-Royce-Ghost-2025.jpg" },
  { id: 33, name: "Rolls-Royce Cullinan", make: "Rolls-Royce", category: "Luxury SUV", price: 370000, stock: 1, year: 2023, image: "/images/Rolls-Royce-Cullinan-2023.jpg" },
  { id: 34, name: "Bentley Continental GT", make: "Bentley", category: "Luxury", price: 250000, stock: 2, year: 2023, image: "/images/Bentley-Continental-GT-2023.jpg" },
  { id: 35, name: "Bentley Bentayga", make: "Bentley", category: "Luxury SUV", price: 225000, stock: 3, year: 2024, image: "/images/Bentley-Bentayga-2024.jpg" },
  { id: 36, name: "BMW X7 M60i", make: "BMW", category: "Luxury SUV", price: 110000, stock: 4, year: 2023, image: "/images/BMW-X7-M60i-2023.jpg" },
  { id: 37, name: "Mercedes-Benz GLE 580", make: "Mercedes-Benz", category: "Luxury SUV", price: 95000, stock: 4, year: 2025, image: "/images/Mercedes-Benz-GLE-580-2025.jpg" },
  { id: 38, name: "Porsche Cayenne Turbo GT", make: "Porsche", category: "Luxury SUV", price: 180000, stock: 2, year: 2024, image: "/images/Porsche-Cayenne-Turbo-GT-2024.jpg" },
  { id: 39, name: "Lucid Air Sapphire", make: "Lucid", category: "Luxury", price: 179000, stock: 2, year: 2025, image: "/images/Lucid-Air-Sapphire-2025.jpg" },
  { id: 40, name: "Nissan 350Z", make: "Nissan", category: "Sport", price: 20000, stock: 5, year: 2009, image: "/images/Nissan-350Z-2009.jpg" },
  { id: 41, name: "BMW i7", make: "BMW", category: "Luxury", price: 140000, stock: 3, year: 2024, image: "/images/BMW-i7-2024.jpg" },
  { id: 42, name: "Mercedes-Benz EQS 580", make: "Mercedes-Benz", category: "Luxury", price: 130000, stock: 4, year: 2023, image: "/images/Mercedes-Benz-EQS-580-2023.jpg" },
  { id: 43, name: "Porsche Taycan Turbo S", make: "Porsche", category: "Luxury", price: 185000, stock: 2, year: 2025, image: "/images/Porsche-Taycan-Turbo-S-2025.jpg" },
  { id: 44, name: "Range Rover SV", make: "Land Rover", category: "Luxury SUV", price: 220000, stock: 2, year: 2024, image: "/images/Range-Rover-SV-2024.jpg" },
  { id: 45, name: "Jaguar I-Pace HSE", make: "Jaguar", category: "Luxury SUV", price: 82000, stock: 5, year: 2023, image: "/images/Jaguar-I-Pace-HSE-2023.jpg" },
  { id: 46, name: "Audi A8 L", make: "Audi", category: "Luxury", price: 105000, stock: 4, year: 2025, image: "/images/Audi-A8-L-2025.jpg" },
  { id: 47, name: "Audi Q8 e-tron", make: "Audi", category: "Luxury SUV", price: 95000, stock: 5, year: 2024, image: "/images/Audi-Q8-e-tron-2024.jpg" },
  { id: 48, name: "Genesis G90", make: "Genesis", category: "Luxury", price: 99000, stock: 5, year: 2023, image: "/images/Genesis-G90-2023.jpg" },
  { id: 49, name: "Lexus LS 500", make: "Lexus", category: "Luxury", price: 89000, stock: 6, year: 2024, image: "/images/Lexus-LS-500-2024.jpg" },
  { id: 50, name: "Lexus LX 600", make: "Lexus", category: "Luxury SUV", price: 107000, stock: 3, year: 2025, image: "/images/Lexus-LX-600-2025.jpg" },
  { id: 51, name: "Audi RCQ 8", make: "Audi", category: "Luxury SUV", price: 172600, stock: 3, year: 2025, image: "/images/Audi-RCQ8-2025.jpg" }
];



async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB for seeding');
    
    await Car.deleteMany({});
    console.log('Cleared existing cars');
    
    await Car.insertMany(sampleCars);
    console.log(`Inserted ${sampleCars.length} cars`);
    
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
}

seedDatabase();