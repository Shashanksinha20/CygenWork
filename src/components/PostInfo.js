import React, { useState, useEffect } from "react";
import axios from "axios";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MuiAlert from '@material-ui/lab/Alert';
import SearchBar from "material-ui-search-bar";
import Box from '@material-ui/core/Box';
import {
  Container,
  Paper,
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  IconButton,
  TablePagination,
  Snackbar
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CustomizedDialogs from "./Dialog";
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    maxwidth: "100vw",
    backgroundColor: theme.palette.grey[300],
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
}));

const useSearchStyle = makeStyles((theme) => ({
  
    root: {
      
        margin: theme.spacing(1),
        width: '25ch',
    }
}))

function App() {
  const [Users, setUsers] = useState([]);
  const [Posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setrowsPerPage] = useState(5);
  const [showSnackBar, setShowSnackBar] = useState(false);
  const [snackBarType, setSnackBarType] = useState("success");

  useEffect(() => {

    // axios.
    // get(`https://jsonplaceholder.typicode.com/users`)
    // .then(firstResponse => {
    //   setUsers(firstResponse.data)
    // })
    // .catch(err =>{
    //   console.log(err)
    // })
    // axios.
    // get(`https://jsonplaceholder.typicode.com/posts`)
    // .then(secondResponse => {
    //   setPosts(secondResponse.data)
    // })
    // .catch(err =>{
    //   console.log(err)
    // })


    axios
      .all([
        axios.get(`https://jsonplaceholder.typicode.com/users`),
        axios.get(`https://jsonplaceholder.typicode.com/posts`),
      ])
      .then(
        axios.spread((firstResponse, secondResponse) => {
          setUsers(firstResponse.data);
          setPosts(secondResponse.data);
          //console.log({ f: firstResponse.data, s: secondResponse.data });
          // console.log(firstResponse.data,secondResponse.data);
        })
      )
      .catch((error) => console.log(error));
  }, []);

  const updatePost = async (id, title, body) => {
    try {
      const obj = Posts.find((post) => post.id === id);
      const newObj = { ...obj, title, body };

      const p = await axios.put(
        "https://jsonplaceholder.typicode.com/posts/" + id,
        newObj
      );
      setPosts(Posts.map((post) => (post.id === id ? p.data : post)));

      //snakbar show post update  successful
      setSnackBarType("success");
      setShowSnackBar(true);
      // console.log(p);
    } catch (err) {
      console.log({ err });
      setSnackBarType("error");
      setShowSnackBar(true);
      //snakbar show post update failed
    } finally {
      setOpen(false);
    }

    // console.log({id,title,body})
  };

  const onChangePage = (event, nextPage) => {
    setPage(nextPage);
  };

  const onChangeRowsPerPage = (event) => {
    setrowsPerPage(event.target.value);
  };

  const getUsersName = (id) => {
    if (id) {
      const requiredUsersArr = Users.find((user) => user.id === id);
      return requiredUsersArr.name;
    }
    return "";
  };
  const classes = useStyles();
  const searchClasses = useSearchStyle();

  return (
    
      <Container className={classes.root}>
        <TableContainer component={Paper}>
          <div style={{ width: "100%" }}>
            <Box display="flex" p={1} bgcolor="background.paper">
              <Box p={1} flexGrow={1} bgcolor="white.300">
                <h3>Posts</h3>
              </Box>
              <Box p={1} bgcolor="white.300">
                <SearchBar className = {searchClasses.root}/>
              </Box>
            </Box>
          </div>

          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Posts ID</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Users</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Posts.slice(
                page * rowsPerPage,
                page * rowsPerPage + rowsPerPage
              ).map((el, id) => (
                <TableRow key={el.id}>
                  <TableCell>{el.id}</TableCell>
                  <TableCell>{el.title}</TableCell>
                  <TableCell>{getUsersName(el.userId)}</TableCell>

                  <TableCell>
                    <IconButton
                      onClick={() => {
                        setSelected(id);
                        setOpen(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <TablePagination
            rowsPerPageOptions={[5, 10, 15, 25, 50]}
            count={Posts.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={onChangePage}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        </TableContainer>
        <CustomizedDialogs
          open={open}
          setOpen={setOpen}
          post={Posts[selected] ? Posts[selected] : {}}
          updatePost={updatePost}
        />
        <Snackbar
          open={showSnackBar}
          autoHideDuration={2300}
          onClose={setShowSnackBar}
        >
          <Alert onClose={setShowSnackBar} severity={snackBarType}>
            {snackBarType === "success"
              ? "Post Updated Successfully"
              : "Error message"}
          </Alert>
        </Snackbar>
      </Container>
    
  );
}

export default App;
