import React, { useEffect, useState } from "react";
import "./Tutorials.css";
import { Card, p, Button, Spacer } from "@nextui-org/react";

export default function Tutorials({ isDark }) {
  const [backgroundColor, setBackgroundColor] = useState("");

  useEffect(() => {
    if (isDark === "true") {
      setBackgroundColor("#16181a");
    } else if (isDark === "false") {
      setBackgroundColor("#fff");
    }
  }, [backgroundColor]);

  const handleInputFocus = (e) => {
    e.target.parentNode.classList.add("active-label");
  };

  const handleInputBlur = (e) => {
    if (e.target.value === "") {
      e.target.parentNode.classList.remove("active-label");
    }
  };

  return (
    <div>
      <section>
        <Card css={{ padding: "10px 15px" }}>
          <p size={20} css={{ fontWeight: "$bold" }}>
            Tutorials Management System
          </p>
        </Card>
      </section>

      <section className="tutorials-section1">
        <Card className="card">Test 1</Card>
        <Card className="card">Test 1</Card>
        <Card className="card">Test 1</Card>
        <Card className="card">Test 1</Card>
      </section>

      <section className="tutorials-section2">
        <section style={{ width: "60.35vw", height: "50vh" }}>
          <Card css={{ padding: "15px 15px", height: "100%" }}>
            <form className="primary-form">
              <div
                className="input-container"
                style={{ marginTop: "0px", display: "none" }}
              >
                <input
                  className="primary-form-element"
                  type="text"
                  id="fullName"
                  name="fullName"
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                  required
                />
                <label
                  style={{ backgroundColor: `${backgroundColor}` }}
                  className="primary-form-element"
                  htmlFor="username"
                >
                  Full Name
                </label>
              </div>
            </form>
          </Card>
        </section>
        <section style={{ width: "19vw", height: "50vh" }}>
          <Card css={{ padding: "15px 15px", height: "100%" }}>
            <a href="/tutorials/add-new">
              <Button bordered color="primary" css={{ width: "100%" }}>
                Add New Tutorial
              </Button>
            </a>
            <Spacer y={1} />
            <Button bordered color="primary">
              Test
            </Button>
            <Spacer />
            <Button bordered color="primary">
              Test
            </Button>
            <Spacer />
            <Button bordered color="primary">
              Test
            </Button>
          </Card>
        </section>
      </section>
    </div>
  );
}
