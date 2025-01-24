import React, { useState } from "react";
import Widget from "./Widget";
import customerOpinions from "../../mocks/customerOpinions";
import styles from "./CustomersOpinionsWidget.module.css";
import EmptyJewelIcon from "../../assets/jewel.png";
import RedJewelIcon from "../../assets/jewel-red.png";

const CustomersOpinionsWidget: React.FC = () => {
  const [selectedCriterion, setSelectedCriterion] = useState<string>("");

  const sortOpinions = () => {
    switch (selectedCriterion) {
      case "latest":
        return [...customerOpinions].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
      case "highestRating":
        return [...customerOpinions].sort((a, b) => b.rating - a.rating);
      case "lowestRating":
        return [...customerOpinions].sort((a, b) => a.rating - b.rating);
      default:
        return customerOpinions;
    }
  };

  const sortedOpinions = sortOpinions();

  return (
    <Widget title={"Opinie klientów"}>
      <div className={styles.controlSection}>
        <div className={styles.inputGroup}>
          <label>Wybierz kategorię sortowania:</label>
          <select
            value={selectedCriterion}
            onChange={(e) => setSelectedCriterion(e.target.value)}
            className={styles.select}
          >
            <option value="">Wybierz kategorię sortowania</option>
            <option value="latest">Najnowsze</option>
            <option value="highestRating">Najwyższe oceny</option>
            <option value="lowestRating">Najniższe oceny</option>
          </select>
        </div>
      </div>
      <div className={styles.opinionsContainer}>
        {sortedOpinions.map((opinion) => (
          <div key={opinion.id} className={styles.opinion}>
            <img src={opinion.customerIcon} alt={`${opinion.username} avatar`} className={styles.userIcon} />
            <div className={styles.opinionContent}>
              <h4>{opinion.username}</h4>
              <p>{opinion.opinion}</p>
              <div className={styles.rating}>
                {[...Array(5)].map((_, index) => (
                  <img
                    key={index}
                    src={index < opinion.rating ? RedJewelIcon : EmptyJewelIcon}
                    className={styles.jewelIcon}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Widget>
  );
};

export default CustomersOpinionsWidget;
