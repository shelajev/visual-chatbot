import Button from "react-bootstrap/Button";

export const SettingOptions = ({ options, labelFn, selectedOption, onSelect }) => {
  if (!options)
    return null;

  return (
    <div className="d-flex flex-wrap">
      { options.map((option, index) => (
        <SettingOptionCard
          key={index}
          label={labelFn(option)}
          selected={selectedOption === option}
          onSelect={() => onSelect(option)}
        />
      ))}
    </div>
  );
}

const SettingOptionCard = ({ label, selected, onSelect }) => {
  return (
    <Button 
      onClick={onSelect} 
      variant={selected ? "primary" : "light"}
      className={"border p-2 me-3 mb-2"}
    >
      {label}
    </Button>
  );
}