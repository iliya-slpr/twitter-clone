import React, { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import axios from "axios";
import swal from "sweetalert";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
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
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function CustomizedDialogs(props) {
  const [open, setOpen] = useState(false);
  const [newName, setNewName] = useState(null);
  const [newBio, setNewBio] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onNameChanger = (event) => {
    setNewName(event.target.value);
    console.log(newName);
  };
  const onBioChanger = (event) => {
    setNewBio(event.target.value);
    console.log(newBio);
  };
  const onSubmit = () => {
    if (newBio || newName) {
      const url = "http://pazapp.ir/account/update_profile";
      const formData = new FormData();
      if (newBio) {
        formData.append("bio", newBio);
      }
      if (newName) {
        formData.append("username", newName);
      }
      const config = {
        headers: { Authorization: document.cookie.slice(14) },
      };
      console.log(formData);
      axios.post(url, formData, config).then((res) => {
        props.onHide();
        swal("info", "update successfully", "info");

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      });
    }
  };
  return (
    <div>
      <Dialog
        onClose={props.onHide}
        aria-labelledby="customized-dialog-title"
        open={props.show}
      >
        <DialogTitle id="customized-dialog-title" onClose={props.onHide}>
          Modal title
        </DialogTitle>
        <DialogContent dividers>
          <form>
            <input
              type="name"
              onChange={onNameChanger}
              placeholder="new name..."
            />
            <input
              type="name"
              onChange={onBioChanger}
              placeholder="new Bio..."
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onSubmit} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
