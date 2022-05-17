/* eslint-disable react-hooks/exhaustive-deps */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  Grid,
  DialogActions,
  Typography,
  LinearProgress,
  Autocomplete,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { debounce } from "lodash";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TimePicker } from "@mui/x-date-pickers";
import {
  createEntry,
  deleteEntry,
  getAutoCompleteFromNutritionix,
  getCalorieFromNutritionix,
  updateEntry,
} from "../../Services/api";
import {
  formatDate,
  formatTime,
  loggedInUser,
  stringToDate,
  validateInput,
  validUserCheck,
} from "../../Utils/utils";
import React from "react";

export function ManageEntryDialog(props: {
  onComplete: () => void;
  open: boolean;
  onClose: () => void;
  entry?: any;
  createForm: boolean; // true if "CREATE" form else "UPDATE" or "DELETE" form
  admin: boolean;
}) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingAutoComplete, setLoadingAutoComplete] = useState(false);
  const [userIdError, setUserIdError] = useState(false);
  const [userId, setUserId] = useState("");
  const [foodName, setFoodName] = useState("");
  const [calories, setCalories] = useState("");
  const [date, setDate] = useState<Date | null>(new Date());
  const [time, setTime] = useState<Date | null>(new Date());
  const [autoComplete, setAutoComplete] = useState<any>([]);

  useEffect(() => {
    const user = loggedInUser();
    if (props.open && user) {
      if (props.admin) {
        if (props.createForm) {
          setUserId("");
          setFoodName("");
          setCalories("");
          setDate(new Date());
          setTime(new Date());
        } else {
          setUserId(props.entry.userId);
          setFoodName(props.entry.foodName);
          setCalories(props.entry.calorieValue);
          const _date = stringToDate(
            `${props.entry.entryDate} ${props.entry.entryTime}`
          );
          setDate(_date);
          setTime(_date);
        }
      } else {
        setUserId(user.id);
      }
    }
  }, [props.open]);

  const showError = () => {
    setError(true);
    setTimeout(() => {
      setError(false);
    }, 4000);
  };

  const showUserIdError = () => {
    setUserIdError(true);
    setTimeout(() => {
      setUserIdError(false);
    }, 4000);
  };

  const onActionClick = async (type: string) => {
    setLoading(true);
    if (type === "DELETE") {
      deleteEntry(props.entry.id).then(() => {
        setLoading(false);
        props.onComplete();
        props.onClose();
      });
    } else {
      const needExistingUserCheck = userId && props.admin && props.createForm;
      if (needExistingUserCheck) {
        const existingUser = await validUserCheck(parseInt(userId));
        if (existingUser) {
          showUserIdError();
          setLoading(false);
          return;
        }
      }

      if (validateInput(userId, date, time, foodName, calories)) {
        const entry = {
          userId: userId,
          foodName: foodName,
          entryDate: formatDate(date as Date),
          entryTime: formatTime(time as Date),
          calorieValue: calories,
        };
        if (type === "UPDATE") {
          updateEntry(entry, props.entry.id).then(() => {
            props.onComplete();
            props.onClose();
            setLoading(false);
          });
        } else if (type === "CREATE") {
          createEntry(entry).then(() => {
            props.onComplete();
            props.onClose();
            setLoading(false);
          });
        }
      } else {
        showError();
        setLoading(false);
      }
    }
  };

  const fetchAutoComplete = (_foodName: string) => {
    console.log("Debounced");
    getAutoCompleteFromNutritionix(_foodName).then((data: any) => {
      console.log(data);
      if (data && data.common) {
        const commonFoods =
          data.common && data.common.map((i: any) => i.food_name);
        const brandedFoods =
          data.branded && data.branded.map((i: any) => i.food_name);
        setAutoComplete([...commonFoods, ...brandedFoods]);
        setLoadingAutoComplete(false)
      }
    });
  };

  const debouncedFunction = useCallback(debounce(fetchAutoComplete, 2000), []);

  const handleFoodOnChange = (e: any) => {
    setFoodName(e.target.value);
    setLoadingAutoComplete(true)
    debouncedFunction(e.target.value);
  };

  const handleFoodOnBlur = () => {
    getCalorieFromNutritionix(foodName).then((data: any) => {
      if (data && data.foods) {
        const _calories = data.foods[0].nf_calories;
        setCalories(_calories);
      }
    });
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
          <Grid item xs={12}>
            {loading && <LinearProgress />}
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              type="number"
              label={"User ID"}
              disabled={!props.admin || (props.admin && !props.createForm)}
              value={userId}
              onChange={(e) => setUserId(parseInt(e.target.value) as any)}
            />
          </Grid>
          <Grid item xs={12}>
            <Autocomplete
              freeSolo
              options={autoComplete}
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  helperText={"Eg: 1 Cup of Ice cream, Fish Stick"}
                  label={"What did you eat?"}
                  value={foodName}
                  onChange={handleFoodOnChange}
                  onBlur={() => handleFoodOnBlur()}
                  InputProps={{
                    ...params.InputProps,
                    endAdornment: (
                      <React.Fragment>
                        {loadingAutoComplete ? <CircularProgress color="inherit" size={20} /> : null}
                        {params.InputProps.endAdornment}
                      </React.Fragment>
                    ),
                  }}
                />
              )}
            />
            {/* <TextField
              fullWidth
              helperText={"Eg: 1 Cup of Ice cream"}
              label={"What did you eat?"}
              value={foodName}
              onChange={handleFoodOnChange}
              onBlur={() => handleFoodOnBlur()}
            /> */}
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
          {error && (
            <Grid item xs={12}>
              <Typography
                sx={{ color: "#B00020", float: "right" }}
                color="text.secondary"
                gutterBottom
              >
                {`Invalid Input! Please Enter Valid Values`}
              </Typography>
            </Grid>
          )}
          {userIdError && (
            <Grid item xs={12}>
              <Typography
                sx={{ color: "#B00020", float: "right" }}
                color="text.secondary"
                gutterBottom
              >
                {`User with User ID ${userId} does not exist!`}
              </Typography>
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => props.onClose()}>Cancel</Button>
        {!props.createForm && (
          <Button onClick={() => onActionClick("DELETE")}>Delete</Button>
        )}
        {props.createForm ? (
          <Button onClick={() => onActionClick("CREATE")}>Save</Button>
        ) : (
          <Button onClick={() => onActionClick("UPDATE")}>Update</Button>
        )}
      </DialogActions>
    </Dialog>
  );
}
