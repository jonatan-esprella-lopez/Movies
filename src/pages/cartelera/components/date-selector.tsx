import { dateItems } from "@/constants";
import { DateSelectorProps } from "../../../interfaces/cartelera.interface";
import "./date-selector.css";




export const DateSelector = ({ selectedDate, onDateSelect }: DateSelectorProps) => {
  return (
    <div className="date-selector-container">
      <button className="arrow left">{`<`}</button>
      <div className="dates">
        {dateItems.map((item) => (
          <div
            key={item.date}
            className={`date-item ${selectedDate === item.date ? "selected" : ""}`}
            onClick={() => onDateSelect(item.date)}
          >
            <p className="day">{item.day}</p>
            <p className="date">{item.date}</p>
            <p className="month">{item.month}</p>
          </div>
        ))}
      </div>
      <button className="arrow right">{`>`}</button>
    </div>
  );
};
