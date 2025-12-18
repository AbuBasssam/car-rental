import React, { useState } from "react";
import CarPhoto from "../../assets/light hero.png";
import Header from "./Header.jsx";
import CategoryFilter from "./CategoryFilter";
import CarsGrid from "./CarsGrid";

const MostRentedCars = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredId, setHoveredId] = useState(null);

  const categories = [
    { id: 0, name: "All", key: "all" },
    { id: 1, name: "Sedan", key: "sedan" },
    { id: 2, name: "SUV", key: "suv" },
    { id: 3, name: "Sport", key: "sport" },
    { id: 4, name: "Luxury", key: "luxury" },
    { id: 5, name: "Electric", key: "electric" },
  ];

  const carsData = {
    sedan: [
      {
        id: 1,
        category: "Sedan",
        name: "تويوتا كامري",
        image: CarPhoto,
        year: 2024,
        price: 150,
        transmission: "أوتوماتيك",
        fuel: "بنزين",
        seats: 5,
        bags: 3,
        accessible: true,
      },
      {
        id: 2,
        category: "Sedan",
        name: "هوندا أكورد",
        image: CarPhoto,
        year: 2024,
        price: 140,
        transmission: "أوتوماتيك",
        fuel: "بنزين",
        seats: 5,
        bags: 3,
        accessible: false,
      },
      {
        id: 3,
        category: "Sedan",
        name: "نيسان ألتيما",
        image: CarPhoto,
        year: 2023,
        price: 130,
        transmission: "أوتوماتيك",
        fuel: "بنزين",
        seats: 5,
        bags: 2,
        accessible: true,
      },
      {
        id: 4,
        category: "Sedan",
        name: "مازدا 6",
        image: CarPhoto,
        year: 2024,
        price: 145,
        transmission: "أوتوماتيك",
        fuel: "بنزين",
        seats: 5,
        bags: 3,
        accessible: false,
      },
      {
        id: 5,
        category: "Sedan",
        name: "شيفروليه ماليبو",
        image: CarPhoto,
        year: 2023,
        price: 135,
        transmission: "أوتوماتيك",
        fuel: "بنزين",
        seats: 5,
        bags: 2,
        accessible: true,
      },
    ],
    suv: [
      {
        id: 6,
        category: "Suv",
        name: "تويوتا راف 4",
        image: CarPhoto,
        year: 2024,
        price: 200,
        transmission: "أوتوماتيك",
        fuel: "بنزين",
        seats: 7,
        bags: 4,
        accessible: true,
      },
      {
        id: 7,
        category: "Suv",
        name: "هوندا CR-V",
        image: CarPhoto,
        year: 2024,
        price: 190,
        transmission: "أوتوماتيك",
        fuel: "بنزين",
        seats: 5,
        bags: 4,
        accessible: true,
      },
      {
        id: 8,
        category: "Suv",
        name: "نيسان إكس تريل",
        image: CarPhoto,
        year: 2023,
        price: 180,
        transmission: "أوتوماتيك",
        fuel: "بنزين",
        seats: 7,
        bags: 3,
        accessible: false,
      },
      {
        id: 9,
        category: "Suv",
        name: "مازدا CX-5",
        image: CarPhoto,
        year: 2024,
        price: 185,
        transmission: "أوتوماتيك",
        fuel: "بنزين",
        seats: 5,
        bags: 3,
        accessible: true,
      },
      {
        id: 10,
        category: "Suv",
        name: "فورد إكسبلورر",
        image: CarPhoto,
        year: 2024,
        price: 210,
        transmission: "أوتوماتيك",
        fuel: "بنزين",
        seats: 7,
        bags: 5,
        accessible: true,
      },
    ],
  };

  //   Get current cars based on selected category
  const getCurrentCars = () => {
    if (selectedCategory === "all") {
      return Object.values(carsData).flat();
    }
    return carsData[selectedCategory] || [];
  };

  const currentCars = getCurrentCars();

  return (
    <div className="min-h-screen px-4 py-12 font-body transition-colors duration-300 ease-in-out bg-mercury dark:bg-mirage">
      <div className="max-w-350 mx-auto">
        <Header />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <CarsGrid
          cars={currentCars}
          hoveredId={hoveredId}
          onHoverChange={setHoveredId}
          selectedCategoryName={
            categories.find((cat) => cat.key === selectedCategory)?.name || ""
          }
        />
      </div>
    </div>
  );
};

export default MostRentedCars;
