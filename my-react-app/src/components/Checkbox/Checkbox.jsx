function Checkbox({ id, checked, onChange, label }) {
  return (
    <div className="input-remember">
      <input type="checkbox" id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id}>{label}</label>
    </div>
  );
}

export default Checkbox;
