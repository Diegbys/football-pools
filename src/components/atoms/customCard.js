import { Card } from "@mui/material";

export default function CustomCard({ children, styles, onClick }) {
  return (
    <Card
      style={{ ...{ padding: 20, borderRadius: 10 }, ...styles }}
      onClick={onClick}
    >
      {children}
    </Card>
  );
}
