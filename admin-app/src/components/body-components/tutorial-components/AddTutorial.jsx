import React from "react";
import "./Tutorials.css";
import { Card, p, Spacer, Button } from "@nextui-org/react";
import { useState } from "react";
import axios from "axios";

export default function AddTutorial({ isDark }) {
  const [tutorialTitle, setTutorialTitle] = useState("");
  const [tutorialCategory, setTutorialCategory] = useState("");

  const handleInputFocus = (e) => {
    e.target.parentNode.classList.add("active-label");
  };

  const handleInputBlur = (e) => {
    if (e.target.value === "") {
      e.target.parentNode.classList.remove("active-label");
    }
  };

  const [isCategoryListDisplay, setIsCategoryListDisplay] = useState(false);

  const categoryList = ["Beginner", "Intermediate", "Advanced"];

  const [inputCategory, setInputCategory] = useState("Select a Category");
  const [inputCategorySearch, setInputCategorySearch] = useState("");

  const filteredCategoryList = categoryList.filter((categoryItem) =>
    categoryItem.toLowerCase().includes(inputCategorySearch.toLowerCase())
  );

  const handleCategorySuggestionClick = (categoryItem) => {
    setInputCategory(categoryItem);
    setIsCategoryListDisplay(false);
  };

  const onsubmit = () => {
    // const data = {
    //   tutorial_id: "test02",
    //   tutorial_title: tutorialTitle,
    //   tutorial_category: inputCategory,
    // };
    // axios
    //   .post("http://localhost:5000/admin/tutorials/addNewTutorial", data)
    //   .then((res) => {
    //     if (res.data.success) {
    //       setTutorialTitle("");
    //       setTutorialCategory("");
    //     }
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  };

  return (
    <div>
      <section>
        <Card css={{ padding: "10px 15px" }}>
          <p size={20} css={{ fontWeight: "$bold" }}>
            Add New Tutorial
          </p>
        </Card>
      </section>
      <Spacer y={1} />
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Card css={{ padding: "30px 15px", height: "500px", width: "49%" }}>
          <div className="input-container" style={{ marginTop: "0px" }}>
            <input
              className="primary-form-element"
              type="text"
              id="tutorialTitle"
              name="tutorialTitle"
              value={tutorialTitle}
              onChange={(e) => setTutorialTitle(e.target.value)}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              required
            />
            <label
              className={`primary-form-element ${isDark ? "dark" : "light"}`}
              htmlFor="tutorialTitle"
            >
              Tutorial Title
            </label>
          </div>
          <Spacer y={1.5} />
          <div
            className="input-container"
            style={{ marginTop: "0px", width: "200px" }}
          >
            <a
              onClick={() => {
                setIsCategoryListDisplay(!isCategoryListDisplay);
              }}
            >
              <input
                className="primary-form-element"
                style={{ cursor: "default" }}
                type="text"
                id="videoQuality"
                name="videoQuality"
                value={inputCategory}
                readOnly
                required
              />
              {isCategoryListDisplay && (
                <span>
                  <i class="fa-solid fa-sort-up drop-up"></i>
                </span>
              )}
              {!isCategoryListDisplay && (
                <span>
                  <i class="fa-solid fa-caret-down drop-down"></i>
                </span>
              )}
            </a>
            <label
              className={`active-primary-form-lable ${
                isDark ? "dark" : "light"
              }`}
            >
              Tutorial Category
            </label>
            {isCategoryListDisplay && (
              <div
                className={`dropdown-content ${
                  isDark ? "dropdown-content-dark" : "dropdown-content-light"
                }`}
              >
                <div className="">
                  <input
                    type="text"
                    className="dropdown-content"
                    placeholder="Search..."
                    value={inputCategorySearch}
                    onChange={(e) => setInputCategorySearch(e.target.value)}
                  />
                </div>
                {isCategoryListDisplay &&
                  filteredCategoryList.map((categoryItem, index) => (
                    <div
                      className={`dropdown-content-item ${
                        isDark
                          ? "dropdown-content-item-dark"
                          : "dropdown-content-item-light"
                      }`}
                      key={index}
                      onClick={() =>
                        handleCategorySuggestionClick(categoryItem)
                      }
                    >
                      {categoryItem}
                    </div>
                  ))}
              </div>
            )}
          </div>
          <Spacer y={1.5} />
          <section className="center" style={{ justifyContent: "center" }}>
            <div className="center">
              <Button
                auto
                color={"warning"}
                css={{ color: "black", zIndex: "0" }}
              >
                Reset
              </Button>
              <Spacer />
              <Button auto css={{ zIndex: "0" }} onClick={onsubmit}>
                Add
              </Button>
            </div>
          </section>
        </Card>
        <Card
          css={{ padding: "30px 15px", height: "500px", width: "49%" }}
        ></Card>
      </section>
    </div>
  );
}
