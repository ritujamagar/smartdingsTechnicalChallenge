import React, { useState } from "react";
import { Card, Input, Row, Col } from "antd";
import { ReactComponent as BackgroundSvg } from "./../img/background.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";
import { data } from "./../utils/globals";
import "./ShoppingWindow.css";

const ShoppingWindow = () => {
  // useState to store clicked card title when card expand button in clicked
  const [clickedCardTitle, setClickedCardTitle] = useState(null);
  // useState to store searched text
  const [searchedText, setSearchedText] = useState("");
  // useState to store filtered data after text search
  const [filteredData, setFilteredData] = useState(data);

  return (
    <div className="container">
      <BackgroundSvg />
      <div className="list-container">
        <h1>Shopping Windows</h1>
        {/* search input */}
        <Input
          placeholder="Search"
          size="large"
          bordered={false}
          value={searchedText}
          onChange={(e) => {
            e.preventDefault();
            setSearchedText(e.target.value);
            if (e.target.value !== "") {
              const filtered = filteredData.filter((item) => {
                const title = item.title.toLowerCase();
                return title.indexOf(e.target.value.toLowerCase()) > -1;
              });
              setFilteredData(filtered);
            } else {
              setFilteredData(data);
            }
          }}
        />
        {/* shopping window item mappping */}
        {filteredData.map((item) => {
          return (
            <div key={item.title}>
              <Card bordered={false} className="list-item">
                <div className="row">
                  <div className="column left">
                    <div style={{ fontWeight: "bold", fontSize: 18 }}>
                      {item.title}
                    </div>
                    <div
                      style={{
                        marginTop: 5,
                      }}
                    >
                      {item.accessories}
                    </div>
                  </div>
                  <div className="column right">
                    <div
                      className="expand-button"
                      onClick={() => {
                        if (item.title !== clickedCardTitle) {
                          setClickedCardTitle(item.title);
                        } else {
                          setClickedCardTitle(null);
                        }
                      }}
                    >
                      <Row>
                        <Col
                          style={{
                            marginRight: 10,
                            marginBottom: 18,
                          }}
                        >
                          {item.title !== clickedCardTitle ? (
                            <FontAwesomeIcon
                              size="lg"
                              icon={faAngleDown}
                              color="#05f7bb"
                            />
                          ) : (
                            <FontAwesomeIcon
                              size="lg"
                              icon={faAngleUp}
                              color="#05f7bb"
                            />
                          )}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </div>
              </Card>
              {/* expanded card */}
              {item.title === clickedCardTitle ? (
                <div className="expanded-card">{item.description}</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShoppingWindow;
