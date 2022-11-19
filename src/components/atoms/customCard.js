import { Card } from "@mui/material";

export default function CustomCard({ children, styles, onClick, className }) {
  return (
    <Card
      style={{ ...{ padding: 20, borderRadius: 10 }, ...styles }}
      onClick={onClick}
      className={className}
    >
      {children}
    </Card>
  );
}
