import React,{ useEffect }from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

import {
  FormControl,
  Input,
  FormLabel
} from "@material-ui/core";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2)
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500]
  }
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1)
  }
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const [title, setTitle] = React.useState(props.post.title? props.post.title: "");
    const [body, setBody] = React.useState(props.post.body? props.post.body: "");
    const [changed, setChanged] = React.useState(false)

    
  const handleClickClose = () => {
    props.setOpen(false);
  };
  const handleUpdatePost = () => {
    props.updatePost(props.post.id, title, body);
    // props.setOpen(false);
  };

  useEffect(() => {
    setTitle(props.post.title);
    setBody(props.post.body);

    
  }, [props.post])

  


  useEffect(() => {
    if(title !== props.post.title || body !== props.post.body){
      setChanged(true)
    }
    else{
      setChanged(false)
    }
    
  }, [title,body])

  

  return (
    <>
      <Dialog
        onClose={handleClickClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle id="customized-dialog-title" onClose={handleClickClose}>
          Post Details
        </DialogTitle>

        <DialogContent>
          <FormControl fullWidth>
            <FormLabel component="legend">Title</FormLabel>
            <Input
              multiline
              value={title}
              rows={2}
              onChange = {(event) => setTitle(event.target.value)}
            />
          </FormControl>
          {/* <Divider /> */}

          <FormControl fullWidth>
            <FormLabel component="legend">Body</FormLabel>
            <Input
              multiline
              rows={2}
              value={body} 
              onChange = {(event) => setBody(event.target.value)}
            />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleUpdatePost}
            variant="contained"
            color="primary"
            disabled = {!changed}
          >
            UPDATE
          </Button>
          <Button variant="contained" color="secondary"
          onClick={handleClickClose}>
            CANCEL
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
