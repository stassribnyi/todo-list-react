import {
  Container,
  createTheme,
  ThemeProvider,
  CssBaseline,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  TextField,
} from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { useState } from "react";

import { Add, Delete } from "@mui/icons-material";

const theme = createTheme();

function App() {
  const [todos, setTodos] = useState<
    Array<
      Readonly<{
        complete: boolean;
        title: string;
        id: string;
      }>
    >
  >([
    {
      id: "1",
      complete: false,
      title: "first item",
    },
    {
      id: "2",
      complete: false,
      title: "second item",
    },
    {
      id: "3",
      complete: false,
      title: "third item",
    },
    {
      id: "4",
      complete: false,
      title: "fourth item",
    },
  ]);

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) => ({
        ...todo,
        complete: todo.id === id ? !todo.complete : todo.complete,
      }))
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <Container
        maxWidth="lg"
        component="main"
        sx={{ display: "flex", flexDirection: "column", my: 16, gap: 4 }}
      >
        <Box
          component="form"
          sx={{ display: "flex", gap: 2 }}
          noValidate
          autoComplete="off"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const formProps = Object.fromEntries(formData) as Record<
              string,
              string
            >;

            if (formProps.title?.trim()) {
              setTodos((prev) => [
                ...prev,
                {
                  id: `${Math.max(...todos.map((x) => Number(x.id))) + 1}`,
                  complete: false,
                  title: formProps.title.trim(),
                },
              ]);

              (e.target as HTMLFormElement).reset();
            }
          }}
        >
          <TextField name="title" label="Outlined" variant="outlined" />
          <IconButton
            type="submit"
            aria-label="Add Todo"
            sx={{ width: "48px", height: "48px" }}
          >
            <Add />
          </IconButton>
        </Box>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {todos.map((todo) => {
            const labelId = `checkbox-list-label-${todo.id}`;

            return (
              <ListItem
                key={todo.id}
                secondaryAction={
                  <IconButton
                    edge="end"
                    aria-label="Delete Todo"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <Delete />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={() => handleToggle(todo.id)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={todo.complete}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <Box sx={{ position: "relative" }}>
                    <Box
                      sx={{
                        position: "absolute",
                        top: "50%",
                        borderTop: "2px solid #333",
                        width: todo.complete ? "100%" : "0",
                        transition: "width 0.25s ease-in",
                      }}
                    />
                    <ListItemText id={labelId} primary={todo.title} />
                  </Box>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Container>
    </ThemeProvider>
  );
}

export default App;
