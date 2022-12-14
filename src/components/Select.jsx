const Select = ({ label, options, handleChange }) => {
  return (
    <>
      <label htmlFor="select">{label}</label>
      <select
        name="select"
        className="p-1 rounded bg-white text-black text-center"
        onChange={(e) => {
          handleChange(e);
        }}
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option.toUpperCase()}
          </option>
        ))}
      </select>
    </>
  );
};

export default Select;
