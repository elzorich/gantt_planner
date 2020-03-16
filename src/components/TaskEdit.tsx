import React, { useState, useEffect } from "react";
import { produce } from "immer";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export interface Campaign {
  campaign: string;
  type: string;
  startTime: string;
  endTime: string;
  details: string;
  color: string;
  contents: Array<any>;
}

interface TaskEditProps {
  data: Campaign[];
  campaignData: Campaign;
  isOpen: boolean;
  onChildClick: (isOpen: boolean) => void;
  setTopics: (topics: Campaign[]) => void;
}

export const TaskEdit = (props: TaskEditProps) => {
  const [changedCampaign, setChangedCampaign] = useState<Campaign>(
    props.campaignData
  );
  console.log(changedCampaign);

  const handleClose = () => {
    props.onChildClick(false);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChangedCampaign({
      ...changedCampaign,
      campaign: event.currentTarget.value
    });
  };

  const saveCampaign = () => {
    const updatedTopics = produce(props.data, draftState => {
      const index = props.data.findIndex(
        topic => topic.campaign === props?.campaignData?.campaign
      );

      draftState.splice(index, 1, changedCampaign);
    });

    props.setTopics(updatedTopics);
    props.onChildClick(false);
  };

  const changeCampaignData = (value: string, updatedKey: keyof Campaign) => {
    setChangedCampaign({ ...changedCampaign, [updatedKey]: value });
  };

  return (
    <div>
      <Dialog
        open={props.isOpen}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          {props.campaignData.campaign}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            onChange={event =>
              changeCampaignData(event.currentTarget.value, "campaign")
            }
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="startDate"
            label=""
            onChange={event =>
              changeCampaignData(event.currentTarget.value, "startTime")
            }
            type="date"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="EndDate"
            label=""
            onChange={event =>
              changeCampaignData(event.currentTarget.value, "endTime")
            }
            type="date"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            id="color"
            label="Color"
            onChange={event =>
              changeCampaignData(event.currentTarget.value, "color")
            }
            type="text"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={saveCampaign} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
