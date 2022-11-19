import TextField from "@mui/material/TextField";

export default function CustomInput({
  label,
  type,
  value,
  onChange,
  name,
  className,
}) {
  return (
    <TextField
      style={{ width: "100%" }}
      label={label}
      size="small"
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      className={className}
    />
  );
}
