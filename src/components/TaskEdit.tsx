import React, { useState, useEffect } from "react";
import { produce } from "immer";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ColorPicker from "material-ui-color-picker";
import "./TaskEdit.css";
import { Campaign } from "../types";

interface TaskEditProps {
  data: Campaign[];
  campaignData: Campaign;
  isOpen: boolean;
  onChildClick: (isOpen: boolean) => void;
  setTopics: (topics: Campaign[]) => void;
}

/**
 * Modal that lets the user edit a single campaign
 * @param data Contains all campaign data
 * @param campaignData Campaign data of the single campaign to update
 * @param isOpen Describes wether the modal is opened
 * @param onChildClick Callback on child click
 * @param setTopics Handler to update campaigns
 */
export const TaskEdit = (props: TaskEditProps) => {
  const [changedCampaign, setChangedCampaign] = useState<Campaign>(
    props.campaignData
  );

  const handleClose = () => {
    props.onChildClick(false);
  };

  useEffect(() => {
    setChangedCampaign(props.campaignData);
  }, [props.campaignData]);

  /**
   * Saves updated campaign in top level state.
   */
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

  /**
   * Changes local version of the campaign that shall be updated
   * @param value New value of the field
   * @param updatedKey Which key of the campaign object shall be updated
   */
  const changeCampaignData = (value: string, updatedKey: keyof Campaign) => {
    setChangedCampaign({ ...changedCampaign, [updatedKey]: value });
  };

  return (
    props.campaignData && (
      <div>
        <Dialog
          open={props.isOpen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
          className="campaign-dialog"
        >
          <DialogTitle id="form-dialog-title">
            {props.campaignData.campaign}
          </DialogTitle>
          <DialogContent>
            <TextField
              required
              autoFocus
              margin="dense"
              id="name"
              value={changedCampaign.campaign}
              label={`Change the name for the ${props.campaignData.campaign} campaign`}
              onChange={event =>
                changeCampaignData(event.currentTarget.value, "campaign")
              }
              type="text"
              fullWidth
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="startDate"
              value={changedCampaign.startTime}
              label=""
              onChange={event =>
                changeCampaignData(event.currentTarget.value, "startTime")
              }
              type="date"
              fullWidth
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="EndDate"
              value={changedCampaign.endTime}
              label=""
              onChange={event =>
                changeCampaignData(event.currentTarget.value, "endTime")
              }
              type="date"
              fullWidth
            />
            <DialogContentText>
              Pick new color for the campaign:
            </DialogContentText>
            <ColorPicker
              className="color-picker"
              name="color"
              style={{ backgroundColor: changedCampaign.color }}
              defaultValue={changedCampaign.color}
              value={changedCampaign.color}
              onChange={color => changeCampaignData(color, "color")}
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
    )
  );
};
