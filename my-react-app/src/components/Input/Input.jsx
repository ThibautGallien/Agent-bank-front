// my-react-app/src/components/Input/Input.jsx
function Input({
  label,
  type,
  id,
  value,
  onChange,
  placeholder,
  disabled = false,
}) {
  return (
    <div className="input-wrapper">
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
}

export default Input;
