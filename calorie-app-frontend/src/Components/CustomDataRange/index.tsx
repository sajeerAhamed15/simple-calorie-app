import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Grid, Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { formatDate } from "../../Utils/utils";
import "./styles.scss";

export default function CustomDateRange(props: {
  onSearch: (date1: string, date2: string) => void;
}) {
  const today = new Date();
  const lastMonth = new Date();
  lastMonth.setMonth(lastMonth.getMonth() - 1);
  const [value1, setValue1] = React.useState<Date | null>(lastMonth);
  const [value2, setValue2] = React.useState<Date | null>(today);

  const search = () => {
    if (value1 && value2 && value1 < value2) {
      props.onSearch(formatDate(value1), formatDate(value2));
    } else {
      console.log("Invalid Dates");
    }
  };

  React.useEffect(() => {
    if (value1 && value2 && props.onSearch) {
      props.onSearch(formatDate(value1), formatDate(value2));
    }
  }, []);

  return (
    <div className="data-range">
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={0}>
          <Grid item xs={4}>
            <DatePicker
              className="grid-item"
              label="From"
              value={value1}
              onChange={(newValue: any) => {
                setValue1(newValue);
              }}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={4}>
            <DatePicker
              className="grid-item"
              label="To"
              value={value2}
              onChange={(newValue: any) => {
                setValue2(newValue);
              }}
              renderInput={(params: any) => <TextField {...params} />}
            />
          </Grid>
          <Grid item xs={2}>
            <Button
              className="grid-item"
              onClick={search}
              variant="contained"
              endIcon={<SearchIcon />}
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </LocalizationProvider>
    </div>
  );
}
