import React from 'react';
import "./submitPageModal.css";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import {Constants, ToastType} from "../../common/Constants";
import * as Utils from "../../common/Utils";

class SubmitPageModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
            titleError: false,
            imgError: false,
            addressError: false
        }
    }

    handleClickOpen = () => {
        this.setState({open: true})
    };

    handleClose = () => {
        this.setState({open: false})
    };

    handlePageSubmit = () => {
        return this.validateFields() ? false : Utils.submitPage(
            () => {
                this.props.openToast(Constants.pageSubmitted, ToastType.success);
                this.handleClose();
            },
            () => this.props.openToast(Constants.genericError, ToastType.error));
    };

    validateFields() {
        if (Utils.isNotEmpty(this.state.title)) {
            this.setState({
                titleErrorText: Constants.titleCantBeEmpty,
                titleError: true
            });
            return true;
        } else {
            this.setState({
                titleError: false,
                titleErrorText: undefined
            });
        }
        if (Utils.isNotEmpty(this.state.address)) {
            this.setState({
                addressErrorText: Constants.addressCantBeEmpty,
                addressError: true
            });
            return true;
        } else {
            this.setState({
                addressError: false,
                addressErrorText: undefined
            })
        }

        if (Utils.isNotEmpty(this.state.img)) {
            this.setState({
                imgErrorText: Constants.imageCantBeEmpty,
                imgError: true
            });
            return true;
        } else if (Utils.isImage(this.state.img)) {
            this.setState({
                imgErrorText: Constants.imageFormatError,
                imgError: true
            });
            return true;
        } else {
            this.setState({
                imgError: false,
                imgErrorText: undefined
            })
        }
    }

    render() {
        return (
            <div>
                <Fab variant="extended" aria-label="add" className={"my-button"} onClick={this.handleClickOpen}>
                    <AddIcon/>
                    Submit your page
                </Fab>

                <Dialog open={this.state.open} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Submit your page</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To submit your page, provide all the informations below:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="title"
                            label={Constants.title}
                            type="text"
                            fullWidth
                            error={this.state.titleError}
                            onChange={(title) => this.setState({
                                title: title.target.value
                            })}
                            helperText={this.state.titleErrorText}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="url"
                            label={Constants.pageAddress}
                            type="text"
                            fullWidth
                            error={this.state.addressError}
                            onChange={(address) => this.setState({
                                address: address.target.value
                            })}
                            helperText={this.state.addressErrorText}
                        />
                        <TextField
                            autoFocus
                            margin="dense"
                            id="img"
                            label={Constants.imageUrl}
                            type="text"
                            fullWidth
                            error={this.state.imgError}
                            onChange={(img) => this.setState({
                                img: img.target.value
                            })}
                            helperText={this.state.imgErrorText}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} style={{color: "orangered"}}>
                            Cancel
                        </Button>
                        <Button onClick={this.handlePageSubmit} style={{color: "orangered"}}>
                            Submit
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
};

export default SubmitPageModal
