import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./styles.scss";

export function CustomCard(props: {
  text1: string;
  text2: string;
  text3?: string;
}) {
  return (
    <div className="custom-card">
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            className="title"
            sx={{ fontSize: 20 }}
            color="text.secondary"
            gutterBottom
          >
            {props.text1}
          </Typography>
          <Typography
            className="subTitle"
            sx={{ mb: 1.5 }}
            color="text.secondary"
          >
            {props.text2}
          </Typography>
          {props.text3 && (
            <Typography
              className="subTitle"
              sx={{ mb: 1.5 }}
              color="text.secondary"
            >
              {props.text3}
            </Typography>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
