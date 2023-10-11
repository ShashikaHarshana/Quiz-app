import React from "react";
import { Card, p, Col } from "@nextui-org/react";
import styles from "./Quiz.css";
import { useNavigate } from "react-router-dom";

export default function Quiz({ isDark }) {
  const navigate = useNavigate();

  const handleInputFocus = (e) => {
    if (isDark === "false") {
      e.target.parentNode.classList.add("active-dark");
    } else if (isDark === "true") {
      e.target.parentNode.classList.add("active-light");
    }
  };

  const handleInputBlur = (e) => {
    if (e.target.value === "") {
      if (isDark === "false") {
        e.target.parentNode.classList.remove("active-dark");
      } else if (isDark === "true") {
        e.target.parentNode.classList.remove("active-light");
      }
    }
  };

  const handlePress = (type) => {
    navigate({ pathname: "/quizzes/test", search: `?type=${type}` });
  };

  return (
    <div>
      <section>
        <p size={20} css={{ fontWeight: "$bold" }}>
          Hi welcome to Quiz Management Dashboard !!!
        </p>
      </section>

      <section>
        <Card
          isPressable
          isHoverable
          variant="bordered"
          onPress={() => handlePress("mcq")}
        >
          <Card.Body>
            <p size={20} css={{ fontWeight: "$bold" }}>
              Multiple Choice Questions
            </p>
          </Card.Body>
        </Card>
      </section>

      <section>
        <Card
          isPressable
          isHoverable
          variant="bordered"
          onPress={() => handlePress("dnd")}
        >
          <Card.Body>
            <p size={20} css={{ fontWeight: "$bold" }}>
              Drag And Drop Questions
            </p>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
}
