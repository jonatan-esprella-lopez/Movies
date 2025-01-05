import "./date-selector.css";

interface DateItem {
  day: string;
  date: number;
  month: string;
}

interface DateSelectorProps {
  selectedDate: number;
  onDateSelect: (date: number) => void;
}

const dateItems: DateItem[] = [
  { day: "Jueves", date: 24, month: "Octubre" },
  { day: "Viernes", date: 25, month: "Octubre" },
  { day: "Sábado", date: 26, month: "Octubre" },
  { day: "Domingo", date: 27, month: "Octubre" },
  { day: "Lunes", date: 28, month: "Octubre" },
  { day: "Martes", date: 29, month: "Octubre" },
  { day: "Miercoles", date: 30, month: "Octubre" },
];

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
