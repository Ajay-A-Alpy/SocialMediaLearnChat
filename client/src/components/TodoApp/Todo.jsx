import {Box, Grid, List, Typography} from "@mui/material";
import React from "react";
import "../TodoApp/Todo.css";
import TextField from "@mui/material/TextField";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {useState, useRef} from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
function Todo() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const clear = useRef();
  return (
    <Grid container>
      <Grid item>
        <Box className="Todo">
          <Typography className="Todo_title">My Notes</Typography>
          <Box sx={{display: "flex", justifyContent: "stretch"}}>
            <TextField
              label="Add notes"
              id=""
              sx={{height: "1rem", marginTop: "1rem"}}
              value={input}
              ref={clear}
              onChange={(e) => {
                setInput(e.target.value);
              }}
            />
            <AddCircleIcon
              sx={{fontSize: "3rem", color: "blue", marginTop: "1rem"}}
              onClick={() => {
                setTodos([...todos, input]);
                clear.current.value = "";
              }}
            ></AddCircleIcon>
          </Box>
          <Box className="Todo_body">
            {todos.map((t, i) => {
              return (
                <Box className="todo_list">
                  <Typography key={t}>{i + 1 + "          " + t}</Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
}

export default Todo;
