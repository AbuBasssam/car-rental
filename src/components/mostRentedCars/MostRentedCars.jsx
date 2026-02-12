import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import CarPhoto from "../../assets/light hero.png";
import Header from "./Header.jsx";
import CategoryFilter from "./CategoryFilter";
import CarsGrid from "./CarsGrid";
import { mostRentedCarsKeys } from "../../utils/localeKeys.js";

const MostRentedCars = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [hoveredId, setHoveredId] = useState(null);

  const categories = [
    { id: 0, name: t(mostRentedCarsKeys.all), key: "all" },
    { id: 1, name: t(mostRentedCarsKeys.sedan), key: "sedan" },
    { id: 2, name: t(mostRentedCarsKeys.suv), key: "suv" },
    { id: 3, name: t(mostRentedCarsKeys.sport), key: "sport" },
    { id: 4, name: t(mostRentedCarsKeys.luxury), key: "luxury" },
    { id: 5, name: t(mostRentedCarsKeys.electric), key: "electric" },
  ];

  const carsData = {
    sedan: [
      {
        id: 1,
        category: t(mostRentedCarsKeys.sedan),
        name: "تويوتا كامري",
        image: CarPhoto,
        year: 2024,
        price: 150,
        transmission: t(mostRentedCarsKeys.automatic),
        fuel: t(mostRentedCarsKeys.petrol),
        seats: 5,
        bags: 3,
        accessible: true,
      },
      {
        id: 2,
        category: t(mostRentedCarsKeys.sedan),
        name: "هوندا أكورد",
        image: CarPhoto,
        year: 2024,
        price: 140,
        transmission: t(mostRentedCarsKeys.automatic),
        fuel: t(mostRentedCarsKeys.petrol),
        seats: 5,
        bags: 3,
        accessible: false,
      },
      {
        id: 3,
        category: t(mostRentedCarsKeys.sedan),
        name: "نيسان ألتيما",
        image: CarPhoto,
        year: 2023,
        price: 130,
        transmission: t(mostRentedCarsKeys.automatic),
        fuel: t(mostRentedCarsKeys.petrol),
        seats: 5,
        bags: 2,
        accessible: true,
      },
      {
        id: 4,
        category: t(mostRentedCarsKeys.sedan),
        name: "مازدا 6",
        image: CarPhoto,
        year: 2024,
        price: 145,
        transmission: t(mostRentedCarsKeys.automatic),
        fuel: t(mostRentedCarsKeys.petrol),
        seats: 5,
        bags: 3,
        accessible: false,
      },
      {
        id: 5,
        category: t(mostRentedCarsKeys.sedan),
        name: "شيفروليه ماليبو",
        image: CarPhoto,
        year: 2023,
        price: 135,
        transmission: t(mostRentedCarsKeys.automatic),
        fuel: t(mostRentedCarsKeys.petrol),
        seats: 5,
        bags: 2,
        accessible: true,
      },
    ],
    suv: [
      {
        id: 6,
        category: t(mostRentedCarsKeys.suv),
        name: "تويوتا راف 4",
        image: CarPhoto,
        year: 2024,
        price: 200,
        transmission: t(mostRentedCarsKeys.automatic),
        fuel: t(mostRentedCarsKeys.petrol),
        seats: 7,
        bags: 4,
        accessible: true,
      },
      {
        id: 7,
        category: t(mostRentedCarsKeys.suv),
        name: "هوندا CR-V",
        image: CarPhoto,
        year: 2024,
        price: 190,
        transmission: t(mostRentedCarsKeys.automatic),
        fuel: t(mostRentedCarsKeys.petrol),
        seats: 5,
        bags: 4,
        accessible: true,
      },
      {
        id: 8,
        category: t(mostRentedCarsKeys.suv),
        name: "نيسان إكس تريل",
        image: CarPhoto,
        year: 2023,
        price: 180,
        transmission: t(mostRentedCarsKeys.automatic),
        fuel: t(mostRentedCarsKeys.petrol),
        seats: 7,
        bags: 3,
        accessible: false,
      },
      {
        id: 9,
        category: t(mostRentedCarsKeys.suv),
        name: "مازدا CX-5",
        image: CarPhoto,
        year: 2024,
        price: 185,
        transmission: t(mostRentedCarsKeys.automatic),
        fuel: t(mostRentedCarsKeys.petrol),
        seats: 5,
        bags: 3,
        accessible: true,
      },
      {
        id: 10,
        category: t(mostRentedCarsKeys.suv),
        name: "فورد إكسبلورر",
        image: CarPhoto,
        year: 2024,
        price: 210,
        transmission: t(mostRentedCarsKeys.automatic),
        fuel: t(mostRentedCarsKeys.petrol),
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
