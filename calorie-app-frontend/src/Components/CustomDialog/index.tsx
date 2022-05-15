import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  DialogActions,
} from "@mui/material";
import { useState } from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import { createEntry } from "../../Services/api";
import { formatDate, formatTime, loggedInUser } from "../../Utils/utils";

export function CustomDialog(props: {
  onSave: () => void;
  open: boolean;
  onClose: () => void;
}) {
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<Date | null>(new Date());

  const saveEntry = () => {
    if (date && time && foodName && calories && parseFloat(calories) > 0) {
      const entry = {
        userId: loggedInUser().id,
        foodName: foodName,
        entryDate: formatDate(date),
        entryTime: formatTime(time),
        calorieValue: calories,
      };
      createEntry(entry).then(() => {
        props.onSave();
        props.onClose();
      });
    }
  };

  return (
    <Dialog
      open={props.open}
      onClose={() => props.onClose()}
      fullWidth
      maxWidth="md"
    >
      <DialogTitle>Add a New Entry</DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label={"Name of the Food"}
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              type="number"
              fullWidth
              label={"Amount of Calories (Kcal)"}
              value={calories}
              onChange={(e) => setCalories(e.target.value)}
            />
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={date}
                onChange={(newValue: any) => {
                  setDate(newValue);
                }}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <TimePicker
                label="Date"
                value={time}
                onChange={(newValue: any) => {
                  setTime(newValue);
                }}
                renderInput={(params: any) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose()}>Cancel</Button>
        <Button onClick={saveEntry}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
