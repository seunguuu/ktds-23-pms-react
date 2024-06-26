import React from "react";
import styles from "../project.module.css";

const ProjectSubChart = ({ totalTasks, completedTasks, plusStyles }) => {
  let completionRatio = 100;
  if (totalTasks && totalTasks !== 0) {
    completionRatio = (completedTasks / totalTasks) * 100;
  }

  return (
    <div style={plusStyles} className={styles.barContainer}>
      <div className={styles.barContainerSpan}>
        {completedTasks} / {totalTasks} ({Math.round(completionRatio)}%)
      </div>
      <div
        className={styles.bar}
        style={{
          width: `${completionRatio ? completionRatio : 100}%`,
          backgroundColor: `${completionRatio === 0 ? "#e0e0e0" : ""}`,
        }}
      ></div>
    </div>
  );
};

export default ProjectSubChart;
