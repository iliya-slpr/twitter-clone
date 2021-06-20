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
  const [file, setFile] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const onFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const onFileUpload = () => {
    if (file) {
      const url = "http://pazapp.ir/account/update_profile";
      const formData = new FormData();
      formData.append("image", file, file.name);
      const config = {
        headers: { Authorization: document.cookie.slice(14) },
      };
      axios.post(url, formData, config).then((res) => {
        props.onHide();
        swal("info", "upload successfully", "info");
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
            <input type="file" onChange={onFileChange} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onFileUpload} color="primary">
            Save changes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
